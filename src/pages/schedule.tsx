import { Layout } from '../components/Layout';
import { html } from 'hono/html';
import { colors, spacing, typography } from '../utils/styles';

export const SchedulePage = () => {
  return Layout({
    title: 'Schedule',
    currentPath: '/schedule',
    children: html`
      <style>
        .schedule-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: ${spacing['4xl']} ${spacing.lg};
        }

        .schedule-header {
          text-align: center;
          margin-bottom: ${spacing['3xl']};
        }

        .schedule-header h1 {
          font-size: ${typography.fontSize['5xl']};
          margin-bottom: ${spacing.md};
        }

        .schedule-header p {
          font-size: ${typography.fontSize.lg};
          color: ${colors.textSecondary};
          max-width: 600px;
          margin: 0 auto;
        }

        .schedule-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: ${spacing['3xl']};
        }

        .chat-section {
          background-color: ${colors.backgroundLight};
          border: 1px solid ${colors.border};
          border-radius: 12px;
          padding: ${spacing.xl};
          display: flex;
          flex-direction: column;
          height: 600px;
        }

        .chat-header {
          padding-bottom: ${spacing.md};
          border-bottom: 1px solid ${colors.border};
          margin-bottom: ${spacing.md};
        }

        .chat-header h2 {
          font-size: ${typography.fontSize.xl};
          margin-bottom: ${spacing.sm};
        }

        .chat-header p {
          font-size: ${typography.fontSize.sm};
          color: ${colors.textSecondary};
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: ${spacing.md};
          display: flex;
          flex-direction: column;
          gap: ${spacing.md};
        }

        .message {
          max-width: 80%;
          padding: ${spacing.md};
          border-radius: 8px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .message.assistant {
          background-color: ${colors.background};
          border: 1px solid ${colors.border};
          align-self: flex-start;
        }

        .message.user {
          background-color: ${colors.primary};
          align-self: flex-end;
        }

        .chat-input-container {
          padding-top: ${spacing.md};
          border-top: 1px solid ${colors.border};
          margin-top: ${spacing.md};
        }

        .chat-input {
          display: flex;
          gap: ${spacing.md};
        }

        .chat-input input {
          flex: 1;
          padding: ${spacing.md};
          background-color: ${colors.background};
          border: 1px solid ${colors.border};
          border-radius: 8px;
          color: ${colors.text};
          font-size: ${typography.fontSize.base};
        }

        .chat-input input:focus {
          outline: none;
          border-color: ${colors.primary};
        }

        .chat-input button {
          padding: ${spacing.md} ${spacing.xl};
          background-color: ${colors.primary};
          color: ${colors.text};
          border-radius: 8px;
          font-weight: ${typography.fontWeight.semibold};
          transition: all 0.2s ease;
        }

        .chat-input button:hover {
          background-color: ${colors.primaryHover};
        }

        .chat-input button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .form-section {
          background-color: ${colors.backgroundLight};
          border: 1px solid ${colors.border};
          border-radius: 12px;
          padding: ${spacing.xl};
        }

        .form-section h2 {
          font-size: ${typography.fontSize.xl};
          margin-bottom: ${spacing.lg};
        }

        .form-group {
          margin-bottom: ${spacing.lg};
        }

        .form-group label {
          display: block;
          margin-bottom: ${spacing.sm};
          font-weight: ${typography.fontWeight.medium};
          color: ${colors.textSecondary};
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: ${spacing.md};
          background-color: ${colors.background};
          border: 1px solid ${colors.border};
          border-radius: 8px;
          color: ${colors.text};
          font-size: ${typography.fontSize.base};
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: ${colors.primary};
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .submit-btn {
          width: 100%;
          padding: ${spacing.md};
          background-color: ${colors.primary};
          color: ${colors.text};
          border-radius: 8px;
          font-weight: ${typography.fontWeight.semibold};
          font-size: ${typography.fontSize.base};
          transition: all 0.2s ease;
        }

        .submit-btn:hover {
          background-color: ${colors.primaryHover};
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(124, 58, 237, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .success-message {
          background-color: ${colors.success}20;
          border: 1px solid ${colors.success};
          color: ${colors.success};
          padding: ${spacing.md};
          border-radius: 8px;
          margin-bottom: ${spacing.lg};
          display: none;
        }

        .success-message.show {
          display: block;
        }

        @media (max-width: 768px) {
          .schedule-content {
            grid-template-columns: 1fr;
          }

          .chat-section {
            height: 500px;
          }
        }
      </style>

      <div class="schedule-container">
        <div class="schedule-header">
          <h1>Schedule a Photography Session</h1>
          <p>Use our AI-powered assistant to find the perfect time for your session, or fill out the booking form directly.</p>
        </div>

        <div class="schedule-content">
          <div class="chat-section">
            <div class="chat-header">
              <h2>AI Scheduling Assistant</h2>
              <p>Chat with our assistant to book your session</p>
            </div>

            <div class="chat-messages" id="chatMessages">
              <div class="message assistant">
                Hello! I'm here to help you schedule a photography session with Shriya. What type of photography service are you interested in?
              </div>
            </div>

            <div class="chat-input-container">
              <div class="chat-input">
                <input
                  type="text"
                  id="messageInput"
                  placeholder="Type your message..."
                  autocomplete="off"
                />
                <button id="sendBtn">Send</button>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h2>Direct Booking Form</h2>
            <div class="success-message" id="successMessage">
              Your booking has been successfully submitted! You'll receive a confirmation email shortly.
            </div>

            <form id="bookingForm">
              <div class="form-group">
                <label for="name">Full Name *</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" />
              </div>

              <div class="form-group">
                <label for="serviceType">Service Type *</label>
                <select id="serviceType" name="serviceType" required>
                  <option value="">Select a service</option>
                  <option value="portrait">Portrait Photography</option>
                  <option value="event">Event Photography</option>
                  <option value="wedding">Wedding Photography</option>
                  <option value="commercial">Commercial Photography</option>
                  <option value="photojournalism">Photojournalism</option>
                  <option value="landscape">Landscape Photography</option>
                  <option value="theatre">Theatre Photography</option>
                  <option value="storytelling">Storytelling Photography</option>
                </select>
              </div>

              <div class="form-group">
                <label for="preferredDate">Preferred Date *</label>
                <input type="date" id="preferredDate" name="preferredDate" required />
              </div>

              <div class="form-group">
                <label for="preferredTime">Preferred Time *</label>
                <input type="time" id="preferredTime" name="preferredTime" required />
              </div>

              <div class="form-group">
                <label for="notes">Additional Notes</label>
                <textarea id="notes" name="notes" placeholder="Tell me more about your session needs..."></textarea>
              </div>

              <button type="submit" class="submit-btn" id="submitBtn">Book Session</button>
            </form>
          </div>
        </div>
      </div>

      <script>
        let sessionId = null;

        // Initialize chat session
        async function initChat() {
          try {
            const response = await fetch('/api/chat/session', { method: 'POST' });
            const data = await response.json();
            if (data.success) {
              sessionId = data.data.sessionId;
            }
          } catch (error) {
            console.error('Error initializing chat:', error);
          }
        }

        // Send message
        async function sendMessage(message) {
          if (!message.trim() || !sessionId) return;

          const messagesContainer = document.getElementById('chatMessages');

          // Add user message
          const userMsg = document.createElement('div');
          userMsg.className = 'message user';
          userMsg.textContent = message;
          messagesContainer.appendChild(userMsg);

          // Disable input
          const input = document.getElementById('messageInput');
          const sendBtn = document.getElementById('sendBtn');
          input.disabled = true;
          sendBtn.disabled = true;

          try {
            const response = await fetch('/api/chat/message', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sessionId, message })
            });

            const data = await response.json();

            if (data.success) {
              const assistantMsg = document.createElement('div');
              assistantMsg.className = 'message assistant';
              assistantMsg.textContent = data.data.message;
              messagesContainer.appendChild(assistantMsg);
              messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
          } catch (error) {
            console.error('Error sending message:', error);
            const errorMsg = document.createElement('div');
            errorMsg.className = 'message assistant';
            errorMsg.textContent = 'Sorry, I encountered an error. Please try again.';
            messagesContainer.appendChild(errorMsg);
          } finally {
            input.disabled = false;
            sendBtn.disabled = false;
            input.value = '';
            input.focus();
          }
        }

        // Event listeners
        document.getElementById('sendBtn').addEventListener('click', () => {
          const message = document.getElementById('messageInput').value;
          sendMessage(message);
        });

        document.getElementById('messageInput').addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            const message = document.getElementById('messageInput').value;
            sendMessage(message);
          }
        });

        // Form submission
        document.getElementById('bookingForm').addEventListener('submit', async (e) => {
          e.preventDefault();

          const submitBtn = document.getElementById('submitBtn');
          submitBtn.disabled = true;
          submitBtn.textContent = 'Booking...';

          const formData = new FormData(e.target);
          const booking = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            serviceType: formData.get('serviceType'),
            preferredDate: formData.get('preferredDate'),
            preferredTime: formData.get('preferredTime'),
            notes: formData.get('notes')
          };

          try {
            const response = await fetch('/api/schedule', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(booking)
            });

            const data = await response.json();

            if (data.success) {
              document.getElementById('successMessage').classList.add('show');
              e.target.reset();
              setTimeout(() => {
                document.getElementById('successMessage').classList.remove('show');
              }, 5000);
            } else {
              alert('Error: ' + (data.error || 'Failed to book session'));
            }
          } catch (error) {
            console.error('Error booking session:', error);
            alert('Failed to book session. Please try again.');
          } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Book Session';
          }
        });

        // Initialize on load
        initChat();
      </script>
    `
  });
};
