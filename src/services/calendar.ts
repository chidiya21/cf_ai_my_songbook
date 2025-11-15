import { google } from 'googleapis';
import { Env, CalendarEvent, Availability, TimeSlot, BookingRequest, ServiceType } from '../types';

export class CalendarService {
  private env: Env;
  private calendar: any;

  constructor(env: Env) {
    this.env = env;
    this.initializeCalendar();
  }

  private initializeCalendar() {
    const auth = new google.auth.JWT({
      email: this.env.GOOGLE_CLIENT_EMAIL,
      key: this.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    this.calendar = google.calendar({ version: 'v3', auth });
  }

  async getAvailability(date: string, serviceType?: string): Promise<Availability> {
    try {
      const targetDate = new Date(date);
      const startOfDay = new Date(targetDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(targetDate);
      endOfDay.setHours(23, 59, 59, 999);

      // Fetch existing events for the day
      const response = await this.calendar.events.list({
        calendarId: this.env.GOOGLE_CALENDAR_ID,
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      });

      const bookedEvents = response.data.items || [];

      // Define business hours (9 AM - 6 PM)
      const businessStartHour = 9;
      const businessEndHour = 18;

      // Service duration in minutes
      const serviceDuration = this.getServiceDuration(serviceType as ServiceType);

      // Generate time slots
      const slots: TimeSlot[] = [];
      const slotInterval = 60; // 1-hour intervals

      for (let hour = businessStartHour; hour < businessEndHour; hour++) {
        const slotStart = new Date(targetDate);
        slotStart.setHours(hour, 0, 0, 0);

        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotEnd.getMinutes() + serviceDuration);

        // Check if slot is available
        const isBooked = bookedEvents.some((event: any) => {
          const eventStart = new Date(event.start.dateTime);
          const eventEnd = new Date(event.end.dateTime);

          return (
            (slotStart >= eventStart && slotStart < eventEnd) ||
            (slotEnd > eventStart && slotEnd <= eventEnd) ||
            (slotStart <= eventStart && slotEnd >= eventEnd)
          );
        });

        slots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          available: !isBooked
        });
      }

      return {
        date: date,
        slots
      };
    } catch (error) {
      console.error('Error fetching availability:', error);
      throw new Error('Failed to fetch availability');
    }
  }

  async createBooking(booking: BookingRequest): Promise<CalendarEvent> {
    try {
      const startDateTime = new Date(`${booking.preferredDate}T${booking.preferredTime}`);
      const duration = this.getServiceDuration(booking.serviceType);
      const endDateTime = new Date(startDateTime);
      endDateTime.setMinutes(endDateTime.getMinutes() + duration);

      const event: CalendarEvent = {
        summary: `${booking.serviceType.charAt(0).toUpperCase() + booking.serviceType.slice(1)} Photography - ${booking.name}`,
        description: this.formatEventDescription(booking),
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'America/New_York' // Adjust to your timezone
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'America/New_York'
        },
        attendees: [
          {
            email: booking.email,
            displayName: booking.name
          }
        ]
      };

      const response = await this.calendar.events.insert({
        calendarId: this.env.GOOGLE_CALENDAR_ID,
        requestBody: event,
        sendUpdates: 'all' // Send email notifications
      });

      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw new Error('Failed to create booking');
    }
  }

  async updateBooking(eventId: string, updates: Partial<BookingRequest>): Promise<CalendarEvent> {
    try {
      const event = await this.calendar.events.get({
        calendarId: this.env.GOOGLE_CALENDAR_ID,
        eventId
      });

      const updatedEvent = {
        ...event.data,
        description: this.formatEventDescription(updates as BookingRequest)
      };

      const response = await this.calendar.events.update({
        calendarId: this.env.GOOGLE_CALENDAR_ID,
        eventId,
        requestBody: updatedEvent,
        sendUpdates: 'all'
      });

      return response.data;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw new Error('Failed to update booking');
    }
  }

  async cancelBooking(eventId: string): Promise<void> {
    try {
      await this.calendar.events.delete({
        calendarId: this.env.GOOGLE_CALENDAR_ID,
        eventId,
        sendUpdates: 'all'
      });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw new Error('Failed to cancel booking');
    }
  }

  async getBooking(eventId: string): Promise<CalendarEvent> {
    try {
      const response = await this.calendar.events.get({
        calendarId: this.env.GOOGLE_CALENDAR_ID,
        eventId
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw new Error('Failed to fetch booking');
    }
  }

  private getServiceDuration(serviceType?: ServiceType): number {
    const durations: Record<ServiceType, number> = {
      portrait: 60,
      event: 240,
      wedding: 480,
      commercial: 120,
      photojournalism: 180,
      landscape: 120,
      theatre: 180,
      storytelling: 90
    };

    return serviceType ? durations[serviceType] : 60;
  }

  private formatEventDescription(booking: BookingRequest | Partial<BookingRequest>): string {
    let description = `Client Information:\n`;
    description += `Name: ${booking.name || 'N/A'}\n`;
    description += `Email: ${booking.email || 'N/A'}\n`;
    description += `Phone: ${booking.phone || 'N/A'}\n`;
    description += `\nService: ${booking.serviceType || 'N/A'}\n`;

    if (booking.notes) {
      description += `\nNotes:\n${booking.notes}`;
    }

    return description;
  }
}
