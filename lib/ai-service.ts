/**
 * AI Assistant Service.
 *
 * Provides intelligent text polishing, bio enhancement, and skill suggestions.
 * Integrates with Groq Cloud LLMs (llama-3.3-70b-versatile) when an API key is configured,
 * and seamlessly falls back to a high-quality offline rule-based heuristic engine.
 */

import type { AIEnhanceRequest, AIEnhanceResponse, Tone } from "./types";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

/**
 * System prompt tailored for profile README generation.
 */
function buildSystemPrompt(tone: Tone = "professional"): string {
  const toneGuide = {
    professional: "Keep the tone authoritative, concise, confident, and professional. Focus on impact, quantifiable outcomes, and modern best practices.",
    direct: "Keep the tone punchy, minimal, direct, and straightforward. Eliminate fluff, buzzwords, and redundant phrases.",
    creative: "Keep the tone engaging, warm, modern, and developer-friendly with subtle personality and enthusiasm.",
  }[tone];

  return `You are an expert developer advocate and career coach specializing in creating world-class GitHub profile READMEs and developer resumes.
Your goal is to optimize the provided input to be compelling, technically precise, and formatted in clean Markdown.
Guidelines:
- ${toneGuide}
- Never include introductory conversational fluff like "Here is your bio:" or "Sure, I can help with that".
- Return ONLY the enhanced content directly.
- Maintain strict Markdown compatibility.`;
}

/**
 * Calls Groq Cloud API.
 */
async function callGroqAPI(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 600,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Groq API returned ${res.status}: ${errorText}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("Empty response returned by Groq");
  }
  return content;
}

/**
 * Intelligent offline fallback engine when no AI API key is configured.
 */
function enhanceOffline(request: AIEnhanceRequest): string | string[] {
  const { action, text = "", role = "Developer", tone = "professional" } = request;

  switch (action) {
    case "enhance-bio": {
      const clean = text.trim().replace(/^(I am|I'm|Je suis)\s+/i, "");
      const prefix = {
        professional: `Results-driven ${role} specialized in`,
        direct: `${role} building`,
        creative: `Passionate ${role} crafting`,
      }[tone];

      if (!clean) {
        return `${prefix} high-performance, scalable web applications with modern architecture and developer empathy.`;
      }

      // Polish existing bio
      let polished = clean.charAt(0).toUpperCase() + clean.slice(1);
      if (!polished.endsWith(".")) polished += ".";
      return `${prefix} ${polished.toLowerCase().replace(/^[a-z]/, (c) => c.toLowerCase())} Dedicated to engineering clean code, accessibility, and high developer velocity.`;
    }

    case "enhance-project": {
      const clean = text.trim();
      if (!clean) {
        return "A scalable, production-ready full-stack application built with modern web standards, comprehensive test coverage, and automated CI/CD deployment.";
      }
      return `${clean.replace(/\.$/, "")}. Engineered for high performance, modular architecture, and seamless user experience.`;
    }

    case "suggest-skills": {
      const roleLower = role.toLowerCase();
      if (roleLower.includes("front") || roleLower.includes("ui") || roleLower.includes("web")) {
        return [
          "TypeScript",
          "React",
          "Next.js",
          "Tailwind CSS",
          "JavaScript (ES6+)",
          "HTML5 / CSS3",
          "Redux Toolkit",
          "Figma",
          "Jest & Playwright",
          "Vite",
        ];
      }
      if (roleLower.includes("data") || roleLower.includes("ai") || roleLower.includes("machine") || roleLower.includes("ml")) {
        return [
          "Python",
          "PyTorch",
          "TensorFlow",
          "LangChain",
          "Hugging Face",
          "FastAPI",
          "Pandas & NumPy",
          "SQL & PostgreSQL",
          "Docker",
          "scikit-learn",
        ];
      }
      if (roleLower.includes("back") || roleLower.includes("cloud") || roleLower.includes("devops")) {
        return [
          "Node.js",
          "TypeScript",
          "Go",
          "PostgreSQL",
          "Redis",
          "Docker & Kubernetes",
          "AWS / GCP",
          "CI/CD & GitHub Actions",
          "GraphQL & REST",
          "Prisma / Drizzle",
        ];
      }
      // General fullstack
      return [
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "Tailwind CSS",
        "Docker",
        "Git & GitHub",
        "REST / GraphQL",
        "Jest",
      ];
    }

    case "generate-summary": {
      return `Experienced ${role} focused on delivering reliable software products, scalable cloud infrastructure, and impactful user experiences.`;
    }

    default:
      return text;
  }
}

/**
 * Main AI Enhancement handler.
 */
export async function enhanceContent(request: AIEnhanceRequest): Promise<AIEnhanceResponse> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    const offlineResult = enhanceOffline(request);
    return {
      result: offlineResult,
      success: true,
      source: "offline",
    };
  }

  const tone = request.tone || "professional";
  const systemPrompt = buildSystemPrompt(tone);

  try {
    let userPrompt = "";

    switch (request.action) {
      case "enhance-bio":
        userPrompt = `Please enhance and polish this developer bio for a GitHub profile README.\nRole/Title: ${request.role || "Software Developer"}\nOriginal Bio:\n"${request.text || ""}"\nMake it engaging, professional, and highlight technical strengths in 2-3 sentences.`;
        break;

      case "enhance-project":
        userPrompt = `Enhance this project description for a GitHub profile README:\n"${request.text || ""}"\nMake it concise, highlight the technology and problem solved in 1-2 impactful sentences.`;
        break;

      case "suggest-skills":
        userPrompt = `Suggest the top 10 most relevant, modern, and in-demand technical skills/tools for the role: "${request.role || "Full-Stack Developer"}". Return ONLY a comma-separated list of skill names (e.g. TypeScript, React, Next.js, Node.js).`;
        break;

      case "generate-summary":
        userPrompt = `Generate a compelling 2-sentence developer summary for someone with role: "${request.role || "Software Engineer"}" and skills: "${(request.skills || []).join(", ")}".`;
        break;
    }

    const aiOutput = await callGroqAPI(apiKey, systemPrompt, userPrompt);

    if (request.action === "suggest-skills") {
      const skillsList = aiOutput
        .split(",")
        .map((s) => s.trim().replace(/^[-*•]\s*/, ""))
        .filter(Boolean);
      return {
        result: skillsList.length > 0 ? skillsList : enhanceOffline(request),
        success: true,
        source: "groq",
      };
    }

    return {
      result: aiOutput,
      success: true,
      source: "groq",
    };
  } catch (err) {
    console.warn("Groq API error, falling back to offline enhancer:", err);
    return {
      result: enhanceOffline(request),
      success: true,
      source: "offline",
      error: err instanceof Error ? err.message : "Unknown AI error",
    };
  }
}
