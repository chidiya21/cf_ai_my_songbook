import { DurableObject } from 'cloudflare:workers';
import { Env, BookingSession, ChatMessage, BookingRequest } from '../types';
import { AIService } from '../services/ai';
import { CalendarService } from '../services/calendar';
import { MemoryService } from '../services/memory';
import { v4 as uuidv4 } from 'uuid';

export class BookingWorkflow extends DurableObject<Env> {
  private session: BookingSession | null = null;
  private aiService: AIService;
  private calendarService: CalendarService;
  private memoryService: MemoryService;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.aiService = new AIService(env);
    this.calendarService = new CalendarService(env);
    this.memoryService = new MemoryService(env);
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      switch (path) {
        case '/init':
          return await this.initSession();
        case '/message':
          return await this.handleMessage(request);
        case '/status':
          return await this.getStatus();
        case '/confirm':
          return await this.confirmBooking(request);
        case '/cancel':
          return await this.cancelBooking();
        default:
          return new Response('Not found', { status: 404 });
      }
    } catch (error) {
      console.error('Error in BookingWorkflow:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  private async initSession(): Promise<Response> {
    const sessionId = uuidv4();
    this.session = {
      id: sessionId,
      state: 'initiated',
      messages: [
        {
          id: uuidv4(),
          role: 'assistant',
          content: 'Hello! I\'m here to help you schedule a photography session with Shriya. What type of photography service are you interested in?',
          timestamp: Date.now()
        }
      ],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    await this.ctx.storage.put('session', this.session);
    await this.memoryService.saveMemory(sessionId, this.session.messages, {});

    return new Response(JSON.stringify({ sessionId }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  private async handleMessage(request: Request): Promise<Response> {
    const { message } = await request.json<{ message: string }>();

    if (!this.session) {
      this.session = await this.ctx.storage.get<BookingSession>('session') || null;
      if (!this.session) {
        return new Response(JSON.stringify({ error: 'Session not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: message,
      timestamp: Date.now()
    };
    this.session.messages.push(userMessage);

    // Update state based on conversation
    await this.updateSessionState();

    // Get AI response
    const aiResponse = await this.aiService.chat(
      this.session.messages,
      this.session.state,
      this.session.booking
    );

    // Add assistant message
    const assistantMessage: ChatMessage = {
      id: uuidv4(),
      role: 'assistant',
      content: aiResponse.text,
      timestamp: Date.now()
    };
    this.session.messages.push(assistantMessage);

    // Extract and update booking data if AI found any
    if (aiResponse.extractedData) {
      this.session.booking = {
        ...this.session.booking,
        ...aiResponse.extractedData
      };
    }

    // Handle specific actions
    if (aiResponse.action === 'check_availability' && this.session.booking?.preferredDate) {
      const availability = await this.calendarService.getAvailability(
        this.session.booking.preferredDate,
        this.session.booking.serviceType
      );

      const availabilityMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: this.formatAvailability(availability),
        timestamp: Date.now()
      };
      this.session.messages.push(availabilityMessage);
    }

    // Update session
    this.session.updatedAt = Date.now();
    await this.ctx.storage.put('session', this.session);
    await this.memoryService.saveMemory(
      this.session.id,
      this.session.messages,
      { booking: this.session.booking }
    );

    return new Response(JSON.stringify({
      message: assistantMessage.content,
      state: this.session.state,
      booking: this.session.booking
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  private async updateSessionState(): Promise<void> {
    if (!this.session || !this.session.booking) return;

    const { name, email, serviceType, preferredDate, preferredTime } = this.session.booking;

    if (this.session.state === 'initiated' && serviceType) {
      this.session.state = 'collecting_info';
    } else if (this.session.state === 'collecting_info' && name && email) {
      this.session.state = 'checking_availability';
    } else if (this.session.state === 'checking_availability' && preferredDate && preferredTime) {
      this.session.state = 'confirming';
    }
  }

  private async confirmBooking(request: Request): Promise<Response> {
    if (!this.session || !this.session.booking) {
      return new Response(JSON.stringify({ error: 'No booking to confirm' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const booking = this.session.booking as BookingRequest;

    try {
      // Check for conflicts
      const availability = await this.calendarService.getAvailability(
        booking.preferredDate,
        booking.serviceType
      );

      const requestedSlot = availability.slots.find(
        slot => slot.start === booking.preferredTime
      );

      if (!requestedSlot || !requestedSlot.available) {
        return new Response(JSON.stringify({
          error: 'Time slot no longer available',
          message: 'This time slot has been booked. Please choose another time.'
        }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Create booking
      const event = await this.calendarService.createBooking(booking);

      this.session.state = 'completed';
      this.session.updatedAt = Date.now();

      const confirmationMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: `Your booking has been confirmed! You'll receive a confirmation email at ${booking.email}. Looking forward to working with you!`,
        timestamp: Date.now()
      };
      this.session.messages.push(confirmationMessage);

      await this.ctx.storage.put('session', this.session);

      return new Response(JSON.stringify({
        success: true,
        event,
        message: confirmationMessage.content
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error confirming booking:', error);
      return new Response(JSON.stringify({
        error: 'Failed to confirm booking'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  private async cancelBooking(): Promise<Response> {
    if (!this.session) {
      return new Response(JSON.stringify({ error: 'Session not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    this.session.state = 'cancelled';
    this.session.updatedAt = Date.now();

    await this.ctx.storage.put('session', this.session);

    return new Response(JSON.stringify({
      success: true,
      message: 'Booking cancelled'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  private async getStatus(): Promise<Response> {
    if (!this.session) {
      this.session = await this.ctx.storage.get<BookingSession>('session') || null;
    }

    return new Response(JSON.stringify(this.session), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  private formatAvailability(availability: any): string {
    const availableSlots = availability.slots.filter((s: any) => s.available);

    if (availableSlots.length === 0) {
      return 'Unfortunately, there are no available slots for that date. Would you like to try a different date?';
    }

    const slotList = availableSlots
      .map((slot: any) => `- ${slot.start}`)
      .join('\n');

    return `Here are the available time slots for ${availability.date}:\n\n${slotList}\n\nWhich time works best for you?`;
  }
}
