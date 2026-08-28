/**
 * Ready-to-use profile presets for rapid testing and onboarding.
 */

import type { FormData, Tone, DetailLevel, GitHubWidgetsConfig, BadgeStyle } from "./types";

export interface ProfilePreset {
  id: string;
  name: string;
  role: string;
  badge: string;
  description: string;
  templateId: string;
  tone: Tone;
  detailLevel: DetailLevel;
  badgeStyle: BadgeStyle;
  selectedBadges: string[];
  widgets: GitHubWidgetsConfig;
  data: FormData;
}

export const PROFILE_PRESETS: ProfilePreset[] = [
  {
    id: "fullstack",
    name: "Alexandre Dupont",
    role: "Senior Full-Stack Engineer",
    badge: "Fullstack Lead",
    description: "Modern web architecture, scalable APIs, and DevOps enthusiast.",
    templateId: "detailed",
    tone: "professional",
    detailLevel: "detailed",
    badgeStyle: "for-the-badge",
    selectedBadges: ["typescript", "react", "nextjs", "nodejs", "postgresql", "docker", "aws", "tailwind", "prisma"],
    widgets: {
      username: "alexandredupont",
      showStats: true,
      showLanguages: true,
      showStreak: true,
      showTrophies: false,
      theme: "tokyonight",
      hideBorder: false,
      showIcons: true,
    },
    data: {
      name: "Alexandre Dupont",
      role: "Senior Full-Stack Engineer",
      bio: "Full-stack engineer with 7+ years of experience crafting high-performance web applications and distributed cloud systems. Passionate about developer tooling, TypeScript ecosystem, and accessible interfaces.",
      skills: "TypeScript, React, Next.js, Node.js, PostgreSQL, Docker, AWS, Tailwind CSS",
      projects: [
        {
          name: "CloudScale Platform",
          description: "An open-source serverless management dashboard serving 15K+ monthly active developers. Built with Next.js App Router and PostgreSQL.",
          url: "https://github.com/alexandredupont/cloudscale",
        },
        {
          name: "FastCache Redis CLI",
          description: "Blazing fast Rust-based command line caching helper with interactive TUI interface.",
          url: "https://github.com/alexandredupont/fastcache",
        },
      ],
      achievements: "- Reduced server response latency by 55% across 20+ microservices.\n- Maintained open-source repositories with over 3,000+ GitHub stars.\n- Mentored 12+ junior and mid-level developers.",
      testimonials: "\"Alexandre delivers robust architecture and exceptional code quality under tight deadlines.\" — CTO at ScaleTech",
      currentWork: "Building real-time collaborative workspace tools with WebSockets and CRDTs.",
      contact: [
        { label: "LinkedIn", url: "https://linkedin.com/in/alexandredupont" },
        { label: "Portfolio", url: "https://alexandredupont.dev" },
        { label: "Email", url: "mailto:alexandre@example.com" },
      ],
      badges: "",
    },
  },
  {
    id: "frontend",
    name: "Sophie Martin",
    role: "Creative Frontend & UI/UX Developer",
    badge: "Frontend & UI/UX",
    description: "Design systems, smooth web animations, and delightful user experiences.",
    templateId: "standard",
    tone: "creative",
    detailLevel: "concise",
    badgeStyle: "for-the-badge",
    selectedBadges: ["javascript", "typescript", "react", "nextjs", "vuejs", "tailwind", "figma", "sass"],
    widgets: {
      username: "sophiemartin",
      showStats: true,
      showLanguages: true,
      showStreak: false,
      showTrophies: true,
      theme: "dracula",
      hideBorder: true,
      showIcons: true,
    },
    data: {
      name: "Sophie Martin",
      role: "Creative Frontend & UI/UX Developer",
      bio: "Crafting beautiful, accessible, and delightful interactive interfaces with modern web standards and fluid motion design.",
      skills: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Figma, Design Systems",
      projects: [
        {
          name: "Aura UI Design System",
          description: "Accessible component library focused on micro-interactions and dark mode elegance.",
          url: "https://github.com/sophiemartin/aura-ui",
        },
        {
          name: "3D Canvas Portfolio",
          description: "Interactive WebGL showcase featured on Awwwards and SiteInspire.",
          url: "https://github.com/sophiemartin/canvas-3d",
        },
      ],
      contact: [
        { label: "Portfolio", url: "https://sophiemartin.design" },
        { label: "Twitter / X", url: "https://x.com/sophiemartin" },
        { label: "GitHub", url: "https://github.com/sophiemartin" },
      ],
      badges: "",
    },
  },
  {
    id: "ai_data",
    name: "Thomas Moreau",
    role: "AI & Machine Learning Engineer",
    badge: "AI & Data Science",
    description: "Deep learning models, NLP pipelines, and scalable LLM orchestration.",
    templateId: "detailed",
    tone: "professional",
    detailLevel: "detailed",
    badgeStyle: "for-the-badge",
    selectedBadges: ["python", "pytorch", "tensorflow", "openai", "huggingface", "langchain", "docker", "fastapi"],
    widgets: {
      username: "thomasmoreau",
      showStats: true,
      showLanguages: true,
      showStreak: true,
      showTrophies: false,
      theme: "catppuccin_mocha",
      hideBorder: false,
      showIcons: true,
    },
    data: {
      name: "Thomas Moreau",
      role: "AI & Machine Learning Engineer",
      bio: "Specializing in Large Language Model (LLM) fine-tuning, retrieval-augmented generation (RAG), and production deployment of computer vision models.",
      skills: "Python, PyTorch, LangChain, Hugging Face, FastAPI, Docker, PostgreSQL, CUDA",
      projects: [
        {
          name: "DocMind RAG Engine",
          description: "Enterprise semantic document search engine processing millions of PDF vectors with hybrid search.",
          url: "https://github.com/thomasmoreau/docmind",
        },
        {
          name: "VisionFast Inference",
          description: "Quantized real-time object detection pipeline running at 120 FPS on edge hardware.",
          url: "https://github.com/thomasmoreau/visionfast",
        },
      ],
      achievements: "- Published 2 research papers at NeurIPS Workshop on efficient LLM inference.\n- Reduced vector database indexing time by 70%.",
      currentWork: "Exploring multi-modal reasoning and local model quantization with Ollama.",
      contact: [
        { label: "Google Scholar", url: "https://scholar.google.com" },
        { label: "LinkedIn", url: "https://linkedin.com/in/thomasmoreau" },
        { label: "GitHub", url: "https://github.com/thomasmoreau" },
      ],
      badges: "",
    },
  },
];
