# Project Prompts Log as per Cloudflare assignment guidlines. 

This file contains a record of all major prompts and requests made during the development of this AI-powered songwriting notebook.

---

## 2025-11-15 (Initial Setup)

**PROMPT:** Hi! I'm building an AI-powered songwriting notebook using Cloudflare.

The app will include:
- A main Writing page with a notebook-style lyric editor.
- A floating chat bubble that opens an AI co-writer chat drawer.
- A full Chat page with long-form conversation history.
- A Pages/Recordings/Profile nav (UI from my Figma reference).

The project will use:
- Cloudflare Workers (backend + routes)
- Workers AI (Llama 3.3) for lyric help, brainstorming, rewriting, and idea generation
- Durable Objects for session memory, chat history per note, and workflow coordination
- KV for storing notes, titles, timestamps, and basic metadata
- R2 for audio/voice memo uploads

UI Notes:
- The Figma design I provided shows the Writing page aesthetic, but does not include every page.
- You can create or extend layouts as needed to complete the app.
- 
We will use Hono for routing and JSX-rendered pages.

Thank you!

---

## 2025-11-15 (Docker Setup)

**PROMPT:** I would like to Dockerize my app using Docker and docker-compose so it can run easily in any environment. Please add a Dockerfile and a docker-compose.yml, update the README with instructions for building and running the container, and ensure it works with our current Node, Wrangler, and Cloudflare Workers setup. Thanks!

---

## 2025-11-15 (Fixing Hono)

**PROMPT:** Right now all the files in the pages folder use React <Layout> and is not-fully compatible. Please make them fully Hono-compatibale with html templates.

---

## 2025-11-16 (Added Images)

**PROMPT:** I have now also added images in the imgs folder to use as a background for the writing feature, the logo, the chat button on the right of the writing page for AI-assisted writing, and a profile photo. Please integrate them, they are svgs, thanks!

---

## 2025-11-16 (Text Selection)

**PROMPT:** Can you add text selection so that the AI co-writer can have context for the lyric help? Thanks!

---

## 2025-11-16 (Context Additon)

**PROMPT:** Change the backend AI chat API to also use a context field, since before only the message field was being sent, in order for the AI co-writer to work. Also, please add appropriate error handling.
