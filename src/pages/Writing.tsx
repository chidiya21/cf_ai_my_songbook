import { html } from 'hono/html';

export const WritingPage = () => {
  return html`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Writing - Songbook</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg-dark: #3d3232;
      --paper-cream: #f5f0e8;
      --paper-yellow: #fef9c3;
      --text-dark: #2c2c2c;
      --nav-inactive: #8b7b7b;
      --spiral-metal: #5a5a5a;
      --shadow-subtle: rgba(0, 0, 0, 0.15);
    }

    body {
      font-family: 'Courier New', monospace;
      background: var(--bg-dark);
      color: var(--text-dark);
      min-height: 100vh;
    }

    /* Navigation */
    nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      padding: 1rem 2rem;
      background: var(--bg-dark);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
    }

    .logo {
      position: absolute;
      left: 2rem;
      width: 50px;
      height: 50px;
    }

    .logo img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .nav-links a {
      color: var(--nav-inactive);
      text-decoration: none;
      padding: 0.5rem 1.5rem;
      border-radius: 20px;
      transition: all 0.3s;
      font-size: 0.95rem;
    }

    .nav-links a.active {
      background: var(--paper-cream);
      color: var(--text-dark);
    }

    .nav-links a:hover:not(.active) {
      color: white;
    }

    /* Main content area */
    main {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      transition: margin-right 0.3s ease;
    }

    main.sidebar-open {
      margin-right: 400px;
    }

    .notebook-container {
      max-width: 900px;
      margin: 0 auto;
      perspective: 1000px;
    }

    .notebook {
      background-image: url('/SongbookBackground.svg');
      background-size: contain;
      background-position: center top;
      background-repeat: no-repeat;
      position: relative;
      height: auto;
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      padding: 4rem 3rem 3rem 3rem;
    }

    .notebook-content {
      max-width: 700px;
      margin: 0 auto;
      position: relative;
    }

    /* Title input */
    .title-input {
      background: transparent;
      border: none;
      font-family: 'Courier New', monospace;
      font-size: 1.5rem;
      font-weight: bold;
      width: 100%;
      margin-bottom: 1rem;
      padding: 0.5rem;
      color: var(--text-dark);
      outline: none;
    }

    .title-input::placeholder {
      color: rgba(0, 0, 0, 0.3);
    }

    /* Date display */
    .note-date {
      text-align: right;
      font-size: 0.85rem;
      color: #888;
      margin-bottom: 2rem;
      padding-right: 0.5rem;
    }

    /* Lyrics editor */
    .lyrics-editor {
      min-height: 500px;
    }

    .lyrics-editor textarea {
      width: 100%;
      height: 100%;
      min-height: 500px;
      background: transparent;
      border: none;
      font-family: 'Courier New', monospace;
      font-size: 1rem;
      line-height: 1.8;
      color: var(--text-dark);
      resize: vertical;
      outline: none;
      padding: 0.5rem;
    }

    .lyrics-editor textarea::placeholder {
      color: rgba(0, 0, 0, 0.3);
    }

    /* Auto-save indicator */
    .save-indicator {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 0.75rem;
      color: #999;
      padding: 0.25rem 0.5rem;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 4px;
    }

    .save-indicator.saving {
      color: #666;
    }

    .save-indicator.saved {
      color: #4a9d5f;
    }

    /* AI Chat Button */
    .ai-chat-btn {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 60px;
      height: 60px;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: transform 0.2s, filter 0.2s, opacity 0.3s;
      z-index: 1001;
      padding: 0;
      opacity: 1;
    }

    .ai-chat-btn.hidden {
      opacity: 0;
      pointer-events: none;
    }

    .ai-chat-btn:hover {
      transform: scale(1.1);
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    }

    .ai-chat-btn img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    /* Chat Sidebar */
    .chat-sidebar {
      position: fixed;
      right: -400px;
      top: 0;
      width: 400px;
      height: 100vh;
      background: white;
      box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
      transition: right 0.3s ease;
      z-index: 1000;
      display: flex;
      flex-direction: column;
    }

    .chat-sidebar.open {
      right: 0;
    }

    .chat-sidebar-header {
      padding: 1.5rem;
      border-bottom: 2px solid #e5e5e5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--paper-yellow);
    }

    .chat-sidebar-header h3 {
      font-size: 1.1rem;
      color: var(--text-dark);
    }

    .close-chat-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-dark);
      padding: 0.25rem;
      line-height: 1;
    }

    .close-chat-btn:hover {
      color: #666;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      background: #fafafa;
    }

    .chat-message {
      margin-bottom: 1rem;
      padding: 0.75rem;
      border-radius: 8px;
      max-width: 85%;
    }

    .chat-message.user {
      background: #e5e5e5;
      margin-left: auto;
    }

    .chat-message.assistant {
      background: white;
      border: 1px solid #e5e5e5;
    }

    .chat-input-area {
      padding: 1rem;
      border-top: 2px solid #e5e5e5;
      background: white;
    }

    .chat-input-container {
      display: flex;
      gap: 0.5rem;
    }

    .chat-input-container textarea {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid #e5e5e5;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      resize: none;
      min-height: 60px;
      max-height: 120px;
    }

    .chat-input-container button {
      padding: 0.75rem 1.5rem;
      background: var(--bg-dark);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.9rem;
      transition: background 0.2s;
      align-self: flex-end;
    }

    .chat-input-container button:hover {
      background: #2a2020;
    }

    .chat-input-container button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  </style>
</head>
<body>
  <nav>
    <div class="logo">
      <img src="/SongbookLogo.svg" alt="Songbook" />
    </div>
    <ul class="nav-links">
      <li><a href="/writing" class="active">Writing</a></li>
      <li><a href="/pages">Pages</a></li>
      <li><a href="/recordings">Recordings</a></li>
      <li><a href="/chat">Chat</a></li>
      <li><a href="/profile">Profile</a></li>
    </ul>
  </nav>

  <main>
    <div class="notebook-container">
      <div class="notebook">
        <div class="notebook-content">
          <!-- Save indicator -->
          <div class="save-indicator" id="saveIndicator">
            All changes saved
          </div>

          <!-- Title input -->
          <input
            type="text"
            class="title-input"
            id="noteTitle"
            placeholder="Song Title"
          />

          <!-- Date display -->
          <div class="note-date" id="noteDate">November 15, 2025</div>

          <!-- Lyrics editor -->
          <div class="lyrics-editor">
            <textarea
              id="lyricsContent"
              placeholder="Start writing your lyrics here...

Ask the AI for help with:
  - Finding perfect rhymes
  - Rewriting lines to be more poetic
  - Brainstorming creative ideas
  - Improving flow and rhythm"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Chat Button -->
    <button class="ai-chat-btn" onclick="toggleChatSidebar()" title="Open AI Co-Writer">
      <img src="/SongbookChatIcon.svg" alt="AI Chat" />
    </button>

    <!-- Chat Sidebar -->
    <div class="chat-sidebar" id="chatSidebar">
      <div class="chat-sidebar-header">
        <h3>✍️ AI Co-Writer</h3>
        <button class="close-chat-btn" onclick="toggleChatSidebar()">&times;</button>
      </div>
      <div class="chat-messages" id="chatMessages">
        <!-- Messages will appear here -->
      </div>
      <div class="chat-input-area">
        <div class="chat-input-container">
          <textarea
            id="chatInput"
            placeholder="Ask for help with rhymes, rewrites, ideas..."
            rows="2"
          ></textarea>
          <button id="sendChatBtn" onclick="sendChatMessage()">Send</button>
        </div>
      </div>
    </div>
  </main>

  <script>
    let saveTimeout;
    const titleInput = document.getElementById('noteTitle');
    const lyricsTextarea = document.getElementById('lyricsContent');
    const saveIndicator = document.getElementById('saveIndicator');

    // Load existing note
    async function loadNote() {
      try {
        const response = await fetch('/api/note/current');
        if (response.ok) {
          const data = await response.json();
          if (data.title) titleInput.value = data.title;
          if (data.content) lyricsTextarea.value = data.content;
        }
      } catch (error) {
        console.error('Error loading note:', error);
      }
    }

    // Auto-save function
    async function saveNote() {
      saveIndicator.textContent = 'Saving...';
      saveIndicator.className = 'save-indicator saving';

      try {
        const response = await fetch('/api/note/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: titleInput.value,
            content: lyricsTextarea.value
          })
        });

        if (response.ok) {
          saveIndicator.textContent = 'All changes saved';
          saveIndicator.className = 'save-indicator saved';
        }
      } catch (error) {
        console.error('Error saving note:', error);
        saveIndicator.textContent = 'Error saving';
      }
    }

    // Debounced save
    function debouncedSave() {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(saveNote, 1000);
    }

    titleInput?.addEventListener('input', debouncedSave);
    lyricsTextarea?.addEventListener('input', debouncedSave);

    // Update date
    const dateEl = document.getElementById('noteDate');
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    // Load note on page load
    loadNote();

    // Chat Sidebar Functions
    function toggleChatSidebar() {
      const sidebar = document.getElementById('chatSidebar');
      const chatBtn = document.querySelector('.ai-chat-btn');
      const mainEl = document.querySelector('main');

      sidebar.classList.toggle('open');
      chatBtn.classList.toggle('hidden');
      mainEl.classList.toggle('sidebar-open');
    }

    async function sendChatMessage() {
      const chatInput = document.getElementById('chatInput');
      const chatMessages = document.getElementById('chatMessages');
      const sendBtn = document.getElementById('sendChatBtn');
      const message = chatInput.value.trim();

      if (!message) return;

      // Add user message to UI
      const userMsg = document.createElement('div');
      userMsg.className = 'chat-message user';
      userMsg.textContent = message;
      chatMessages.appendChild(userMsg);

      chatInput.value = '';
      sendBtn.disabled = true;

      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Send to API
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });

        const data = await response.json();

        // Add assistant response
        const assistantMsg = document.createElement('div');
        assistantMsg.className = 'chat-message assistant';
        assistantMsg.textContent = data.response;
        chatMessages.appendChild(assistantMsg);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMsg = document.createElement('div');
        errorMsg.className = 'chat-message assistant';
        errorMsg.textContent = 'Sorry, I encountered an error. Please try again.';
        chatMessages.appendChild(errorMsg);
      } finally {
        sendBtn.disabled = false;
      }
    }

    // Allow Enter to send (Shift+Enter for new line)
    document.getElementById('chatInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessage();
      }
    });
  </script>
</body>
</html>`;
};
