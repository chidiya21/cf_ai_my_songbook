import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import { Env } from './types';
import { BookingWorkflow } from './durable-objects/booking-workflow';

// Import services
import { CalendarService } from './services/calendar';
import { AIService } from './services/ai';
import { PhotoService } from './services/photos';
import { MemoryService } from './services/memory';

// Import pages
import { HomePage } from './pages/home';
import { AboutPage } from './pages/about';
import { PortfolioPage } from './pages/portfolio';
import { ServicesPage } from './pages/services';
import { SchedulePage } from './pages/schedule';
import { ContactPage } from './pages/contact';

const app = new Hono<{ Bindings: Env }>();

// Middleware
app.use('*', cors());

// Serve static files
app.get('/static/*', serveStatic({ root: './' }));

// Home page
app.get('/', (c) => {
  return c.html(HomePage());
});

// About page
app.get('/about', (c) => {
  return c.html(AboutPage());
});

// Portfolio page
app.get('/portfolio', (c) => {
  return c.html(PortfolioPage());
});

// Services page
app.get('/services', (c) => {
  return c.html(ServicesPage());
});

// Schedule page
app.get('/schedule', (c) => {
  return c.html(SchedulePage());
});

// Contact page
app.get('/contact', (c) => {
  return c.html(ContactPage());
});

// API Routes

// Get available time slots
app.get('/api/availability', async (c) => {
  try {
    const date = c.req.query('date');
    const serviceType = c.req.query('serviceType');

    if (!date) {
      return c.json({ success: false, error: 'Date parameter required' }, 400);
    }

    const calendar = new CalendarService(c.env);
    const availability = await calendar.getAvailability(date, serviceType);

    return c.json({ success: true, data: availability });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return c.json({ success: false, error: 'Failed to fetch availability' }, 500);
  }
});

// Create booking
app.post('/api/schedule', async (c) => {
  try {
    const body = await c.req.json();
    const calendar = new CalendarService(c.env);

    const event = await calendar.createBooking(body);

    return c.json({ success: true, data: event, message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error creating booking:', error);
    return c.json({ success: false, error: 'Failed to create booking' }, 500);
  }
});

// Chat endpoint - create new session
app.post('/api/chat/session', async (c) => {
  try {
    const id = c.env.BOOKING_WORKFLOW.newUniqueId();
    const stub = c.env.BOOKING_WORKFLOW.get(id);

    const sessionId = await stub.fetch(new Request('http://internal/init', {
      method: 'POST'
    })).then(r => r.json());

    return c.json({ success: true, data: { sessionId: id.toString() } });
  } catch (error) {
    console.error('Error creating chat session:', error);
    return c.json({ success: false, error: 'Failed to create session' }, 500);
  }
});

// Send message to chat
app.post('/api/chat/message', async (c) => {
  try {
    const { sessionId, message } = await c.req.json();

    if (!sessionId || !message) {
      return c.json({ success: false, error: 'sessionId and message required' }, 400);
    }

    const id = c.env.BOOKING_WORKFLOW.idFromString(sessionId);
    const stub = c.env.BOOKING_WORKFLOW.get(id);

    const response = await stub.fetch(new Request('http://internal/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })).then(r => r.json());

    return c.json({ success: true, data: response });
  } catch (error) {
    console.error('Error sending message:', error);
    return c.json({ success: false, error: 'Failed to send message' }, 500);
  }
});

// Get photos by category
app.get('/api/photos/:category', async (c) => {
  try {
    const category = c.req.param('category');
    const photoService = new PhotoService(c.env);

    const photos = await photoService.getPhotosByCategory(category);

    return c.json({ success: true, data: photos });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return c.json({ success: false, error: 'Failed to fetch photos' }, 500);
  }
});

// Get all photos
app.get('/api/photos', async (c) => {
  try {
    const photoService = new PhotoService(c.env);
    const photos = await photoService.getAllPhotos();

    return c.json({ success: true, data: photos });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return c.json({ success: false, error: 'Failed to fetch photos' }, 500);
  }
});

// Upload photo (admin endpoint - add authentication in production)
app.post('/api/photos/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!file || !category) {
      return c.json({ success: false, error: 'File and category required' }, 400);
    }

    const photoService = new PhotoService(c.env);
    const photo = await photoService.uploadPhoto(file, {
      category,
      title,
      description
    });

    return c.json({ success: true, data: photo, message: 'Photo uploaded successfully' });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return c.json({ success: false, error: 'Failed to upload photo' }, 500);
  }
});

// Get services info
app.get('/api/services', (c) => {
  const services = [
    {
      id: 'portrait',
      name: 'Portrait Photography',
      description: 'Professional portrait sessions capturing your unique personality',
      duration: 60,
      highlights: ['Professional lighting', 'Multiple outfit changes', 'Digital retouching']
    },
    {
      id: 'event',
      name: 'Event Photography',
      description: 'Comprehensive coverage of your special events',
      duration: 240,
      highlights: ['Full event coverage', 'Candid moments', 'Edited gallery']
    },
    {
      id: 'wedding',
      name: 'Wedding Photography',
      description: 'Beautiful memories of your wedding day',
      duration: 480,
      highlights: ['Full day coverage', 'Engagement session', 'Premium album']
    },
    {
      id: 'commercial',
      name: 'Commercial Photography',
      description: 'Professional imagery for your business needs',
      duration: 120,
      highlights: ['Product shots', 'Brand photography', 'Commercial rights']
    }
  ];

  return c.json({ success: true, data: services });
});

// Health check
app.get('/api/health', (c) => {
  return c.json({ success: true, status: 'healthy', timestamp: Date.now() });
});

// Export the Durable Object class
export { BookingWorkflow };

// Export the app
export default app;
