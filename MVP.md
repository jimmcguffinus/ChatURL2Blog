# ChatURL2Blog – MVP

## Product Vision
ChatURL2Blog transforms public ChatGPT share URLs into clean, beautiful, and shareable content.
Users can choose between:
- **Blog Mode**: Structured sections with title, subtitle, summary, tags, and sections.
- **Transcript Mode**: A clean podcast-style conversation layout with custom speaker names.
The app runs serverlessly on Cloudflare Pages + Functions, with a modern Next.js frontend.

---

## MVP Goals

1. **Rapid Transformation**  
   Convert a ChatGPT share URL into a formatted blog or transcript within minutes.
2. **Customizable Speakers**  
   Users can rename "Human" and "AI" speakers.
3. **View Modes**  
   - Blog: Standard scrolling structured article
   - Transcript: Vertical scrolling (Phase 1) and Slide Cards (Phase 2)
4. **LLM Integration**  
   Use Gemini 2.5 Pro for:
   - Parsing and structuring text
   - Generating clean HTML and JSON
5. **Ease of Use**  
   Minimal form: URL, speaker names, mode selection, and generate button.

---

## Target Tech Stack

- **Frontend:** Next.js, TailwindCSS, lucide-react, deployed on Cloudflare Pages
- **Backend:** Cloudflare Pages Functions or Workers
- **LLM:** Gemini 2.5 Pro API (JSON + HTML outputs)
- **Persistence:**  
  - Phase 1: In-memory (no DB)
  - Phase 2: Cloudflare D1 / KV for saving library items

---

## Phase 1 Features (Core MVP)

- **UI:**
  - Input fields:
    - ChatGPT share URL
    - Speaker 1 and Speaker 2 names (default Human/AI)
    - Mode: Blog or Transcript
    - View style (vertical default)
  - Progress indicator with 4 steps:
    - Fetching
    - Analyzing
    - Structuring
    - Polishing
- **Backend:**
  - Fetch HTML content from ChatGPT share URL
  - Parse conversation into plain text
  - Call Gemini with a system prompt that:
    - Structures the conversation
    - Returns JSON and HTML
  - Return structured JSON and HTML to frontend
- **Output Rendering:**
  - Blog Mode: 
    - BlogPreview component showing title, summary, tags, and sections
  - Transcript Mode: 
    - Vertical scrolling view with alternating backgrounds for speakers
- **Deployment:**  
  Cloudflare Pages (frontend) and Functions (backend)

---

## Phase 2 Enhancements

- **Slide Card View:**
  - Swipeable, full-screen exchange view
- **Library:**
  - Store results in Cloudflare D1 or KV
  - Allow users to re-open, edit, and export content
- **Export:**
  - Allow HTML/PDF downloads
- **User Accounts:**
  - OAuth sign-in to save work
- **Additional Modes:**
  - Mixed Mode (Transcript + Blog hybrid)
- **Advanced Styling:**
  - More layout themes and style customization

---

## Value Proposition

- **For Users:**  
  Turn raw ChatGPT conversations into something **presentable, professional, and reusable**.
- **For Non-Coders:**  
  No editing required; fully automatic formatting.
- **For Speed:**  
  Prototype-friendly, immediate results using Cloudflare edge and AI.

---

## Key Differentiators

- Custom speaker names for transcripts
- Choice of blog vs transcript mode
- Two visual modes: vertical scrolling and slide cards
- Edge-first deployment for speed
- Fast prototyping with vibe coding philosophy 