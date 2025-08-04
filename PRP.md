# Project Requirements Prompt (PRP)

## Project Name
ChatURL2Blog

---

## Problem Statement
Raw ChatGPT share URLs contain unformatted conversations that are hard to read and share. 
There is no simple way to transform these into structured, beautiful, and reusable content.

---

## Objective
Build a Cloudflare + Next.js application that:
- Fetches a ChatGPT shared conversation from a public URL
- Extracts and cleans the conversation text
- Uses an LLM (Gemini 2.5 Pro) to produce:
  - **Blog Mode:** Structured, polished blog posts
  - **Transcript Mode:** Two-person podcast-style transcripts with clean formatting
- Outputs JSON and HTML for preview, sharing, and export.

---

## Key Requirements

### Inputs
- ChatGPT share URL
- Speaker 1 name (default: Human)
- Speaker 2 name (default: AI)
- Mode selection:
  - Blog Mode
  - Transcript Mode
- View style selection:
  - Vertical scroll
  - Slide cards (Phase 2)

### Outputs
- Blog Mode:
  - Title, subtitle, summary, tags, sections (HTML + JSON)
- Transcript Mode:
  - Cleanly formatted conversation with alternating backgrounds (HTML + JSON)

---

## Features
1. **Frontend**
   - Built with Next.js + TailwindCSS + lucide-react
   - Pages:
     - Generate
     - Library (Phase 2)
   - Components:
     - Input form
     - ProgressIndicator
     - BlogPreview
     - TranscriptPreview

2. **Backend**
   - Cloudflare Pages Functions (or Workers)
   - Responsibilities:
     - Fetch ChatGPT HTML
     - Parse conversation text
     - Call Gemini 2.5 Pro with system prompts:
       - Blog Mode prompt
       - Transcript Mode prompt
     - Return JSON + HTML

3. **Modes**
   - Blog Mode: Structured sections, tags, summaries
   - Transcript Mode: Clean conversation with optional custom speaker names

4. **Storage**
   - Phase 1: In-memory
   - Phase 2: Cloudflare D1 / KV for persistent Library

5. **Exports (Phase 2)**
   - Downloadable HTML or PDF

---

## Non-Functional Requirements
- **Performance:** 
  - Generate results in < 30 seconds
- **Scalability:**
  - Cloudflare edge-first deployment
- **Ease of Use:**
  - Minimal form and clean UX
- **Extensibility:**
  - Future modes, themes, and persistence

---

## Constraints
- Must be deployable on Cloudflare Pages and Functions
- Use Gemini 2.5 Pro API for summarization and formatting
- Public links only (no private ChatGPT links)
- Must sanitize output for safe rendering

---

## Deliverables
- Functional MVP with:
  - Input form
  - Blog and Transcript generation
  - Vertical scrolling output
  - Edge deployment on Cloudflare
- Documentation:
  - PRD
  - MVP Plan
  - README.md

---

## Future Enhancements
- Slide card view
- Export (HTML/PDF)
- Persistent Library
- OAuth authentication
- Browser extension
- Additional content modes

---

## Dependencies
- Next.js
- TailwindCSS
- lucide-react
- Cloudflare Pages + Functions
- Gemini 2.5 Pro API
- Cursor IDE for vibe coding

---

## Risks
- Dependency on external LLM API (cost/availability)
- Parsing edge cases with ChatGPT share pages
- Rapid prototyping may require refactoring for production-grade quality

---

**Author:**  
PRP crafted based on context and requirements discussed in the planning session. 