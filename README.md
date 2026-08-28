# Profile README Generator ⚡

A modern, fast, and accessible web application built with **Next.js (App Router)**, **React 19**, and **AI Assistant** to generate clean, high-converting, professional GitHub profile `README.md` files in seconds.

---

## ✨ Features

- **⚡ AI Profile Assistant (`/api/ai/enhance`)**:
  - **Polish Bio**: Enhances developer introductions to highlight impact, technical authority, and clarity.
  - **AI Skill Suggestions**: Discovers and suggests in-demand tech stacks based on your role.
  - **Project Descriptions Polish**: Reformulates project bullet points (problem → solution → tech → impact).
  - **Hybrid AI Engine**: Leverages ultra-fast **Groq Cloud LLMs (Llama 3.3 70B)** when configured, with a smart heuristic offline engine as fallback.
- **🛡️ 80+ Interactive Tech Badges**:
  - Categorized catalog (Languages, Frontend, Backend, Databases, Cloud & DevOps, Tools & OS, AI & Data).
  - 4 Shields.io visual styles: `for-the-badge`, `flat-square`, `flat`, `plastic`.
  - Instant search and 1-click select/remove.
- **📊 GitHub Profile Analytics & Cards**:
  - GitHub General Stats Card
  - Top Languages Card
  - Streak Stats Card
  - Profile Trophies
  - 12 beautiful themes (*Tokyo Night*, *Dracula*, *GitHub Dark*, *Catppuccin Mocha*, *Nord*, *Radical*, etc.).
- **⚡ 1-Click Profile Presets**:
  - *Fullstack Lead* (Senior Architecture)
  - *Frontend & UI/UX* (Design Systems & Web Animations)
  - *AI & Data Scientist* (Deep Learning & NLP)
- **🔄 Smart Persistence & Autosave**:
  - Live automatic saving to `localStorage` with draft restoration.
  - Seamless template switching without losing typed fields.
- **📖 Step-by-Step GitHub Guide**:
  - Built-in visual walkthrough explaining how to create your `username/username` repository on GitHub.
- **📄 Export & Download Options**:
  - **Copy Markdown**: 1-click copy with toast notifications.
  - **Download .md**: Instant file download.
  - **Export HTML**: Standalone, responsive HTML file formatted with GitHub styling and auto dark/light mode (`prefers-color-scheme`).
- **🎨 Modern & Accessible Design**:
  - Dark / Light mode toggle.
  - Focus outlines and contrast ratios compliant with **WCAG AA**.
  - 100% responsive (Mobile, Tablet, Desktop).

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & State**: React 19, CSS Modules
- **AI Engine**: Groq Cloud API (`llama-3.3-70b-versatile`) + Offline fallback
- **Badges**: Shields.io + SimpleIcons
- **Widgets**: GitHub Readme Stats, Streak Stats, Profile Trophy
- **Markdown**: `react-markdown` + `remark-gfm`
- **Icons**: `lucide-react`
- **Typography**: `next/font` (Geist Sans & Geist Mono)
- **CMS Query Language**: GROQ (Sanity CMS)

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have Node.js 18.18+ or 20+ installed.

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/tanguykonan/profile-readme-generator.git
cd readme-ai-gen
npm install
```

### 3. Environment Setup (Optional)

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

```env
# Optional: Groq Cloud API key for ultra-fast Llama 3.3 AI features
GROQ_API_KEY=gsk_your_groq_api_key_here

# Optional: Sanity CMS GROQ Integration
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

*(Note: The app runs 100% out-of-the-box even without any API keys!)*

### 4. Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build

To build and run the optimized production application:

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── ai/
│   │       └── enhance/route.ts   # Next.js Route Handler for AI Assistant
│   ├── components/
│   │   ├── generator/
│   │   │   ├── ai-assistant-modal.tsx  # AI Assistant modal
│   │   │   ├── badge-picker.tsx        # 80+ Tech badges catalog & selector
│   │   │   ├── controls.tsx            # Presets, exports, metrics & actions
│   │   │   ├── github-guide-modal.tsx  # 4-step GitHub publishing guide
│   │   │   ├── github-widgets.tsx      # GitHub Stats & Streak cards builder
│   │   │   ├── live-preview.tsx        # Real-time Markdown / Preview
│   │   │   ├── profile-form.tsx        # Form with inline AI polish buttons
│   │   │   └── template-selector.tsx   # Minimal / Standard / Detailed
│   │   ├── shared/
│   │   │   ├── footer/                 # Responsive footer
│   │   │   ├── header/                 # Header with theme toggle
│   │   │   ├── modal.tsx               # Accessible dialog component (a11y)
│   │   │   ├── theme-provider.tsx      # Dark / Light theme provider
│   │   │   └── toast.tsx               # Contextual Toast notification system
│   │   └── ui/
│   │       ├── button/                 # Reusable button component
│   │       └── card/                   # Interactive card component
│   ├── error.tsx                       # Global Error Boundary
│   ├── globals.css                     # Design tokens & dark/light CSS variables
│   ├── layout.tsx                      # Root layout with ToastProvider
│   ├── loading.tsx                     # Loading skeleton
│   ├── not-found.tsx                   # 404 Page
│   ├── page.tsx                        # Main page with Autosave & State
│   ├── robots.ts                       # SEO robots.txt
│   └── sitemap.ts                      # SEO sitemap.xml
├── lib/
│   ├── ai-service.ts                   # AI logic (Groq API + offline engine)
│   ├── badge-catalog.ts                # 80+ Tech badges catalog & Shields.io generator
│   ├── generate-markdown.ts            # Markdown compilation engine
│   ├── github-widgets.ts               # GitHub widgets URLs & markdown generator
│   ├── groq.ts                         # Sanity GROQ query helper & template fetcher
│   ├── presets.ts                      # 1-click Profile presets (Fullstack, Frontend, AI)
│   ├── templates.ts                    # Statically bundled default templates
│   └── types.ts                        # Core TypeScript definitions
└── prompt.md                           # Product specifications
```

---

## 📜 License

MIT © Tanguy Konan
