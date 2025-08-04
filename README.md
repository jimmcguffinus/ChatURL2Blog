# ChatURL2Blog

Transform any public ChatGPT share URL into a **beautiful, readable blog post or podcast-style transcript**.
Built with **Next.js + Cloudflare AI + shadcn/ui + Tailwind CSS**.

---

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ 
- Cloudflare AI Token

### Installation

1. **Clone and install dependencies:**
```bash
git clone <your-repo>
cd ChatURL2Blog
npm install
```

2. **Set up environment variables:**
```bash
cp env.example .env.local
```
Edit `.env.local` and add your Cloudflare AI token:
```
CLOUDFLARE_AI_TOKEN=your_cloudflare_ai_token_here
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## ✨ **Features**

### **Core Functionality**
- **URL Input**: Paste any ChatGPT share URL
- **Dual Modes**: Blog or Transcript output
- **Custom Speakers**: Rename "Human" and "AI" speakers
- **Real-time Preview**: See results instantly
- **Export Options**: Download as HTML, PDF, or Markdown

### **Modern UI/UX**
- **shadcn/ui Components**: Beautiful, accessible components
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered transitions
- **Toast Notifications**: User feedback and error handling
- **Progress Indicators**: Real-time transformation status

### **AI-Powered**
- **Cloudflare AI**: Fast, reliable content transformation
- **Smart Parsing**: Extracts conversation content automatically
- **Structured Output**: Clean, formatted results
- **HTML Formatting**: Rich text with proper markup

---

## 🛠 **Tech Stack**

### **Frontend**
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Modern component library
- **Framer Motion**: Smooth animations
- **Lucide React**: Beautiful icons

### **Backend**
- **Cloudflare AI**: AI-powered content transformation
- **Next.js API Routes**: Serverless API endpoints
- **Edge Runtime**: Fast, global deployment

### **Development**
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **TypeScript**: Type checking

---

## 📁 **Project Structure**

```
ChatURL2Blog/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── components/        # UI components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # shadcn/ui components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript definitions
└── docs/                 # Documentation files
```

---

## 🎨 **UI Components**

### **Built with shadcn/ui**
- **Button**: Multiple variants and sizes
- **Input**: Form inputs with validation
- **Card**: Content containers
- **RadioGroup**: Mode selection
- **Progress**: Loading indicators
- **Toast**: User notifications
- **Badge**: Status indicators

### **Custom Components**
- **TransformForm**: Main input form
- **ProgressIndicator**: Multi-step progress
- **BlogPreview**: Blog mode output
- **TranscriptView**: Transcript mode output

---

## 🔧 **Configuration**

### **Environment Variables**
```env
CLOUDFLARE_AI_TOKEN=your_cloudflare_ai_token_here
NODE_ENV=development
```

### **Tailwind Configuration**
- Custom color palette
- Animation utilities
- Responsive breakpoints
- shadcn/ui integration

---

## 🚀 **Deployment**

### **Cloudflare Pages**
```bash
npm run build
```

### **Vercel**
```bash
vercel --prod
```

### **Netlify**
```bash
npm run build
```

---

## 📖 **Usage**

1. **Enter ChatGPT URL**: Paste a public ChatGPT share link
2. **Customize Settings**: 
   - Rename speakers (default: Human/AI)
   - Choose output mode (Blog/Transcript)
   - Select view style (Vertical/Cards)
3. **Transform**: Click "Transform Chat" button
4. **Preview**: See results in real-time
5. **Export**: Download or share your content

---

## 🔮 **Roadmap**

### **Phase 2 Features**
- **Library View**: Save and manage transformations
- **Slide Cards**: Full-screen conversation view
- **Advanced Export**: PDF generation, custom templates
- **User Accounts**: Personal transformation history
- **API Access**: Programmatic transformation

### **Enhancements**
- **Dark Mode**: Theme switching
- **Keyboard Shortcuts**: Power user features
- **Bulk Processing**: Multiple URLs at once
- **Custom Templates**: Personalized output styles

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📄 **License**

MIT License - see LICENSE file for details

---

## 🙏 **Acknowledgments**

- **shadcn/ui** for the beautiful component library
- **Cloudflare AI** for powerful AI capabilities
- **Next.js** for the excellent React framework
- **Tailwind CSS** for the utility-first styling

---

**Built with ❤️ using modern web technologies** 