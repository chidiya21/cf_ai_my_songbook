import { html } from 'hono/html';

export const ProfilePage = () => {
  return html`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profile - Songbook</title>
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
    }

    .profile-container {
      max-width: 700px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 8px var(--shadow-subtle);
    }

    .profile-header {
      text-align: center;
      padding-bottom: 2rem;
      border-bottom: 2px solid #e5e5e5;
      margin-bottom: 2rem;
    }

    .profile-avatar {
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }

    .profile-avatar img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .profile-section {
      margin-bottom: 2rem;
    }

    .profile-section h2 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: var(--text-dark);
    }

    .profile-field {
      margin-bottom: 1rem;
    }

    .profile-field label {
      display: block;
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 0.5rem;
    }

    .profile-field input,
    .profile-field textarea {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e5e5e5;
      border-radius: 8px;
      font-family: inherit;
      font-size: 0.95rem;
    }

    .profile-field textarea {
      resize: vertical;
      min-height: 100px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      text-align: center;
      padding: 1.5rem;
      background: #f9f9f9;
      border-radius: 8px;
    }

    .stat-card .number {
      font-size: 2rem;
      font-weight: bold;
      color: var(--bg-dark);
      margin-bottom: 0.5rem;
    }

    .stat-card .label {
      font-size: 0.85rem;
      color: #666;
    }

    .save-btn {
      width: 100%;
      padding: 1rem;
      background: var(--bg-dark);
      color: white;
      border: none;
      border-radius: 8px;
      font-family: inherit;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .save-btn:hover {
      background: #2a2020;
    }
  </style>
</head>
<body>
  <nav>
    <div class="logo">
      <img src="/SongbookLogo.svg" alt="Songbook" />
    </div>
    <ul class="nav-links">
      <li><a href="/writing">Writing</a></li>
      <li><a href="/pages">Pages</a></li>
      <li><a href="/recordings">Recordings</a></li>
      <li><a href="/chat">Chat</a></li>
      <li><a href="/profile" class="active">Profile</a></li>
    </ul>
  </nav>

  <main>
    <div class="profile-container">
      <div class="profile-header">
        <div class="profile-avatar">
          <img src="/SongbookProfileIcon.svg" alt="Profile" />
        </div>
        <h1>Your Songwriter Profile</h1>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="number" id="songCount">0</div>
          <div class="label">Songs</div>
        </div>
        <div class="stat-card">
          <div class="number" id="recordingCount">0</div>
          <div class="label">Recordings</div>
        </div>
        <div class="stat-card">
          <div class="number" id="chatCount">0</div>
          <div class="label">AI Chats</div>
        </div>
      </div>

      <div class="profile-section">
        <h2>Personal Info</h2>
        <div class="profile-field">
          <label>Display Name</label>
          <input type="text" id="displayName" placeholder="Your name" />
        </div>
        <div class="profile-field">
          <label>Bio</label>
          <textarea id="bio" placeholder="Tell us about your songwriting journey..."></textarea>
        </div>
      </div>

      <div class="profile-section">
        <h2>Preferences</h2>
        <div class="profile-field">
          <label>Favorite Genres</label>
          <input type="text" id="genres" placeholder="Pop, Rock, Country..." />
        </div>
        <div class="profile-field">
          <label>Writing Goals</label>
          <textarea id="goals" placeholder="What do you want to achieve with your songwriting?"></textarea>
        </div>
      </div>

      <button class="save-btn" onclick="saveProfile()">Save Profile</button>
    </div>
  </main>

  <script>
    async function loadProfile() {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json();

          if (data.displayName) document.getElementById('displayName').value = data.displayName;
          if (data.bio) document.getElementById('bio').value = data.bio;
          if (data.genres) document.getElementById('genres').value = data.genres;
          if (data.goals) document.getElementById('goals').value = data.goals;
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    }

    async function loadStats() {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const stats = await response.json();
          document.getElementById('songCount').textContent = stats.songs || 0;
          document.getElementById('recordingCount').textContent = stats.recordings || 0;
          document.getElementById('chatCount').textContent = stats.chats || 0;
        }
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }

    async function saveProfile() {
      const profileData = {
        displayName: document.getElementById('displayName').value,
        bio: document.getElementById('bio').value,
        genres: document.getElementById('genres').value,
        goals: document.getElementById('goals').value
      };

      try {
        const response = await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData)
        });

        if (response.ok) {
          alert('Profile saved successfully!');
        }
      } catch (error) {
        console.error('Error saving profile:', error);
        alert('Error saving profile. Please try again.');
      }
    }

    loadProfile();
    loadStats();
  </script>
</body>
</html>`;
};
