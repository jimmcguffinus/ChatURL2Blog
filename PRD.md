# Product Requirements Document (PRD)
## Product: ChatURL2Blog

---

## 1. Objective

ChatURL2Blog is a Cloudflare-based web application that allows users to transform ChatGPT share URLs into beautifully formatted blog posts or clean transcript pages. It enables anyone—technical or non-technical—to present AI conversations as polished content.

---

## 2. Goals and Success Metrics

### Goals:
- Allow a user to paste a ChatGPT share URL and:
  - Convert it into structured blog output
  - Convert it into a podcast-style transcript
- Provide custom naming of speakers
- Offer a clear, accessible web interface deployable at the edge.

### Success Metrics:
- Time to conversion: < 30 seconds
- First-month user adoption: 100+ unique users
- Positive user feedback on readability and usability

---

## 3. Features and Requirements

### 3.1 Core Features (Phase 1)
- Input form:
  - ChatGPT Share URL
  - Speaker 1 Name (default: Human)
  - Speaker 2 Name (default: AI)
  - Mode: Blog or Transcript
  - View: Vertical (default)
- Processing:
  - Fetch shared URL content
  - Extract conversation text
  - Send to Gemini API with system prompt:
    - Blog Mode: Generate structured blog JSON and HTML
    - Transcript Mode: Generate podcast-style JSON and HTML
- Output:
  - Blog Mode:
    - Title, subtitle, summary, tags, sections
  - Transcript Mode:
    - Alternating shaded blocks for each speaker
- UI:
  - Progress indicator with 4 animated steps
  - BlogPreview or TranscriptPreview rendering
- Deployment:
  - Next.js + TailwindCSS frontend on Cloudflare Pages
  - Backend Cloudflare Pages Functions

---

### 3.2 Phase 2 Features
- View Options:
  - Slide Cards: One message pair per screen
- Persistence:
  - Library view using Cloudflare D1 or KV
- Export Options:
  - HTML and PDF download
- Authentication:
  - OAuth login for saved work
- Advanced Modes:
  - Mixed Mode (Transcript + Blog hybrid)
  - Themed styling

---

## 4. User Stories

1. As a user, I want to paste a ChatGPT share URL so that I can transform it into a readable format.
2. As a user, I want to rename the speakers for a personalized transcript.
3. As a user, I want to choose between Blog Mode and Transcript Mode.
4. As a user, I want to pick between Vertical scrolling or Slide Card view.
5. As a user, I want to export the formatted output for reuse.

---

## 5. MVP Philosophy – Vibe Coding

- **Rapid prototyping:** Use AI-assisted coding to turn ideas into prototypes within hours.
- **Lower barrier:** Enables non-engineers to contribute to feature development through conversational design.
- **Iterative loops:** Fast feedback and pivots using live prototypes.
- **Cost-efficient:** Minimal resources in early stages; focus on market validation before hardening.

Risks:
- Code quality and security may need strengthening as the product matures.

---

## 6. Technical Architecture

### Frontend
- **Framework:** Next.js + TailwindCSS + lucide-react
- **Deployment:** Cloudflare Pages
- **View Components:** 
  - BlogPreview
  - TranscriptPreview
  - ProgressIndicator

### Backend
- **Framework:** Cloudflare Pages Functions (or Workers)
- **Responsibilities:**
  - Fetch ChatGPT shared HTML
  - Parse conversation text
  - Call Gemini 2.5 Pro API
  - Return structured JSON + HTML

### Data
- **Phase 1:** In-memory
- **Phase 2:** Cloudflare D1 / KV

---

## 7. Deliverables

- **MVP:** Core features, vertical view, no persistence
- **Phase 2:** Slide card view, library storage, export/download, OAuth
- **Documentation:** README.md, PRP, MVP doc, PRD doc

---

## 8. Risks

- **Dependency on Gemini API availability and cost**
- **Potential HTML parsing edge cases**
- **Scaling and database requirements as adoption grows**

---

## 9. Future Considerations

- Additional output formats:
  - Markdown
  - Embeddable widgets
- Browser extension for instant transformation
- Support for multi-speaker chats

---

## 10. Appendix: Flow

### Processing Flow
1. Paste ChatGPT URL
2. Select speaker names, mode, and view style
3. Progress animation
4. Backend:
   - Fetch HTML
   - Parse messages
   - Send to Gemini
   - Return JSON + HTML
5. Frontend renders preview

### Modes:
- **Blog Mode:** Structured blog article
- **Transcript Mode:** 
  - Vertical scrolling
  - Slide Cards (Phase 2)

---

**Product Owner:**  
Aligned with edge-first development and fast iteration through vibe coding. 