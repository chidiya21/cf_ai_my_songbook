import { Env, ChatMessage, AIResponse, BookingRequest } from '../types';

export class AIService {
  private env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  async chat(
    messages: ChatMessage[],
    sessionState: string,
    currentBooking?: Partial<BookingRequest>
  ): Promise<AIResponse> {
    try {
      const systemPrompt = this.buildSystemPrompt(sessionState, currentBooking);

      const formattedMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        }))
      ];

      const response = await this.env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
        messages: formattedMessages,
        max_tokens: 500,
        temperature: 0.7
      });

      const aiText = response.response || '';

      // Extract booking information from the conversation
      const extractedData = this.extractBookingData(
        messages[messages.length - 1].content,
        currentBooking
      );

      // Determine action
      const action = this.determineAction(aiText, sessionState, currentBooking);

      return {
        text: aiText,
        action,
        extractedData
      };
    } catch (error) {
      console.error('Error in AI chat:', error);
      return {
        text: 'I apologize, but I\'m having trouble processing your request. Could you please rephrase that?',
        action: 'none'
      };
    }
  }

  async analyzeInquiry(message: string): Promise<{
    intent: 'booking' | 'question' | 'general';
    topic?: string;
    response: string;
  }> {
    try {
      const systemPrompt = `You are a helpful assistant for Shriya Sateesh's photography portfolio website.
Analyze the user's message and determine if they want to:
1. Book a photography session (intent: booking)
2. Ask a question about services, pricing, or portfolio (intent: question)
3. General conversation (intent: general)

Photography services offered:
- Portrait Photography
- Event Photography
- Wedding Photography
- Commercial Photography
- Photojournalism
- Landscape Photography
- Theatre Photography
- Storytelling Photography

Provide a helpful, friendly response.`;

      const response = await this.env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7
      });

      const aiResponse = response.response || '';

      // Simple intent detection
      const lowerMessage = message.toLowerCase();
      let intent: 'booking' | 'question' | 'general' = 'general';

      if (
        lowerMessage.includes('book') ||
        lowerMessage.includes('schedule') ||
        lowerMessage.includes('appointment') ||
        lowerMessage.includes('session')
      ) {
        intent = 'booking';
      } else if (
        lowerMessage.includes('price') ||
        lowerMessage.includes('cost') ||
        lowerMessage.includes('how much') ||
        lowerMessage.includes('service') ||
        lowerMessage.includes('portfolio')
      ) {
        intent = 'question';
      }

      return {
        intent,
        response: aiResponse
      };
    } catch (error) {
      console.error('Error analyzing inquiry:', error);
      return {
        intent: 'general',
        response: 'Thank you for your message! How can I help you today?'
      };
    }
  }

  private buildSystemPrompt(
    sessionState: string,
    currentBooking?: Partial<BookingRequest>
  ): string {
    let prompt = `You are a friendly and professional scheduling assistant for Shriya Sateesh, a professional photographer.

Your role is to help clients book photography sessions. Be conversational, warm, and helpful.

Photography services available:
1. Portrait Photography (1 hour)
2. Event Photography (4 hours)
3. Wedding Photography (8 hours)
4. Commercial Photography (2 hours)
5. Photojournalism (3 hours)
6. Landscape Photography (2 hours)
7. Theatre Photography (3 hours)
8. Storytelling Photography (1.5 hours)

Current session state: ${sessionState}
`;

    if (currentBooking) {
      prompt += '\n\nInformation collected so far:\n';
      if (currentBooking.serviceType) prompt += `Service: ${currentBooking.serviceType}\n`;
      if (currentBooking.name) prompt += `Name: ${currentBooking.name}\n`;
      if (currentBooking.email) prompt += `Email: ${currentBooking.email}\n`;
      if (currentBooking.phone) prompt += `Phone: ${currentBooking.phone}\n`;
      if (currentBooking.preferredDate) prompt += `Date: ${currentBooking.preferredDate}\n`;
      if (currentBooking.preferredTime) prompt += `Time: ${currentBooking.preferredTime}\n`;
    }

    switch (sessionState) {
      case 'initiated':
        prompt += '\n\nAsk about the type of photography service they need.';
        break;
      case 'collecting_info':
        prompt += '\n\nCollect their name, email, and phone number (optional).';
        break;
      case 'checking_availability':
        prompt += '\n\nAsk for their preferred date and time.';
        break;
      case 'confirming':
        prompt += '\n\nSummarize the booking details and ask for confirmation.';
        break;
    }

    return prompt;
  }

  private extractBookingData(
    userMessage: string,
    currentBooking?: Partial<BookingRequest>
  ): Partial<BookingRequest> {
    const extracted: Partial<BookingRequest> = {};
    const lowerMessage = userMessage.toLowerCase();

    // Extract service type
    const services = ['portrait', 'event', 'wedding', 'commercial', 'photojournalism', 'landscape', 'theatre', 'storytelling'];
    for (const service of services) {
      if (lowerMessage.includes(service)) {
        extracted.serviceType = service as any;
        break;
      }
    }

    // Extract email
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const emailMatch = userMessage.match(emailRegex);
    if (emailMatch) {
      extracted.email = emailMatch[0];
    }

    // Extract phone
    const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
    const phoneMatch = userMessage.match(phoneRegex);
    if (phoneMatch) {
      extracted.phone = phoneMatch[0];
    }

    // Extract date (simple patterns)
    const datePatterns = [
      /\b(\d{4}-\d{2}-\d{2})\b/, // YYYY-MM-DD
      /\b(\d{1,2}\/\d{1,2}\/\d{4})\b/, // MM/DD/YYYY
    ];

    for (const pattern of datePatterns) {
      const match = userMessage.match(pattern);
      if (match) {
        extracted.preferredDate = match[1];
        break;
      }
    }

    // Extract time (simple patterns)
    const timeRegex = /\b(\d{1,2}:\d{2}\s?(?:am|pm)?)\b/i;
    const timeMatch = userMessage.match(timeRegex);
    if (timeMatch) {
      extracted.preferredTime = timeMatch[1];
    }

    // Try to extract name (if no name yet and message doesn't have other info)
    if (!currentBooking?.name && !extracted.email && !extracted.phone) {
      const words = userMessage.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        // Might be a name
        const possibleName = words.join(' ');
        if (!/\d/.test(possibleName)) {
          // No numbers, likely a name
          extracted.name = possibleName;
        }
      }
    }

    return extracted;
  }

  private determineAction(
    aiResponse: string,
    sessionState: string,
    currentBooking?: Partial<BookingRequest>
  ): 'schedule' | 'check_availability' | 'get_info' | 'none' {
    const lowerResponse = aiResponse.toLowerCase();

    if (sessionState === 'checking_availability' && currentBooking?.preferredDate) {
      return 'check_availability';
    }

    if (sessionState === 'confirming') {
      return 'schedule';
    }

    if (
      lowerResponse.includes('available') ||
      lowerResponse.includes('availability') ||
      lowerResponse.includes('time slots')
    ) {
      return 'check_availability';
    }

    return 'none';
  }
}
