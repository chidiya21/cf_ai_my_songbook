// Cloudflare Workers Environment Bindings
export interface Env {
  AI: Ai;
  PHOTOS: R2Bucket;
  CHAT_MEMORY: KVNamespace;
  BOOKING_WORKFLOW: DurableObjectNamespace;
  GOOGLE_CALENDAR_ID: string;
  GOOGLE_CLIENT_EMAIL: string;
  GOOGLE_PRIVATE_KEY: string;
}

// Google Calendar Types
export interface CalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
  }>;
}

export interface Availability {
  date: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

// Booking Types
export interface BookingRequest {
  name: string;
  email: string;
  phone?: string;
  serviceType: ServiceType;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface BookingSession {
  id: string;
  state: 'initiated' | 'collecting_info' | 'checking_availability' | 'confirming' | 'completed' | 'cancelled';
  booking?: Partial<BookingRequest>;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

// Service Types
export type ServiceType =
  | 'portrait'
  | 'event'
  | 'wedding'
  | 'commercial'
  | 'photojournalism'
  | 'landscape'
  | 'theatre'
  | 'storytelling';

export interface PhotoService {
  id: ServiceType;
  name: string;
  description: string;
  duration: number; // in minutes
  price?: string;
  highlights: string[];
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ChatMemory {
  sessionId: string;
  messages: ChatMessage[];
  context: Record<string, any>;
  createdAt: number;
  updatedAt: number;
}

// Photo Gallery Types
export interface Photo {
  id: string;
  filename: string;
  category: ServiceType | 'featured';
  title?: string;
  description?: string;
  uploadedAt: number;
  metadata?: {
    width?: number;
    height?: number;
    size?: number;
  };
}

export interface GalleryResponse {
  photos: Photo[];
  total: number;
  category?: string;
}

// AI Response Types
export interface AIResponse {
  text: string;
  action?: 'schedule' | 'check_availability' | 'get_info' | 'none';
  extractedData?: Partial<BookingRequest>;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
