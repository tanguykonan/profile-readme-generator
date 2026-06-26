/**
 * Markdown generation engine.
 *
 * Pure function that takes a template, form data, and generator options
 * and produces a clean Markdown string.
 *
 * This module is the plug-point for AI integration: replace the
 * deterministic string builder with an API call to an LLM and keep
 * the same signature.
 */

import type {
  Template,
  FormData,
  GeneratorOptions,
  ProjectEntry,
  LinkEntry,
  Tone,
} from "./types";

/* ------------------------------------------------------------------ */
/*  Tone presets                                                       */
/* ------------------------------------------------------------------ */

const toneIntros: Record<Tone, (name: string, role: string) => string> = {
  professional: (name, role) => `# ${name} — ${role}`,
  direct: (name, role) => `# ${name} | ${role}`,
  creative: (name, role) => `# 👋 Hey, I'm ${name} — ${role}`,
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isNonEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return false;
}

function toStringList(value: string | string[]): string[] {
  if (Array.isArray(value)) return value.filter((s) => s.trim());
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/* ------------------------------------------------------------------ */
/*  Section renderers                                                  */
/* ------------------------------------------------------------------ */

function renderSkills(
  skills: string | string[],
  options: GeneratorOptions
): string {
  const items = toStringList(skills);
  if (items.length === 0) return "";

  const heading = options.tone === "creative" ? "## 🛠 Skills" : "## Skills";
  const list = items.map((s) => `- ${s}`).join("\n");
  return `${heading}\n\n${list}`;
}

function renderProjects(
  projects: ProjectEntry[],
  options: GeneratorOptions
): string {
  const valid = projects.filter((p) => p.name.trim());
  if (valid.length === 0) return "";

  const heading =
    options.tone === "creative" ? "## 🚀 Projects" : "## Projects";

  const entries = valid.map((p) => {
    let block = `### ${p.name}`;
    if (p.description.trim()) {
      block +=
        options.detailLevel === "concise"
          ? `\n${p.description.trim().split("\n")[0]}`
          : `\n${p.description.trim()}`;
    }
    if (p.url.trim()) {
      block += `\n[View Project →](${p.url.trim()})`;
    }
    return block;
  });

  return `${heading}\n\n${entries.join("\n\n")}`;
}

function renderLinks(
  links: LinkEntry[],
  options: GeneratorOptions
): string {
  const valid = links.filter((l) => l.url.trim());
  if (valid.length === 0) return "";

  const heading =
    options.tone === "creative" ? "## 📫 Contact" : "## Contact";
  const list = valid
    .map((l) => {
      const label = l.label.trim() || l.url.trim();
      return `- [${label}](${l.url.trim()})`;
    })
    .join("\n");
  return `${heading}\n\n${list}`;
}

function renderTextSection(
  key: string,
  label: string,
  value: string,
  options: GeneratorOptions
): string {
  if (!isNonEmpty(value)) return "";

  const emojiMap: Record<string, string> = {
    achievements: "📊",
    testimonials: "💬",
    currentWork: "🔭",
    badges: "📈",
  };

  const emoji = options.tone === "creative" ? emojiMap[key] || "" : "";
  const heading = emoji ? `## ${emoji} ${label}` : `## ${label}`;

  let body = value.trim();

  // For testimonials, wrap in blockquote if not already
  if (key === "testimonials" && !body.startsWith(">")) {
    body = body
      .split("\n")
      .map((line) => `> ${line}`)
      .join("\n");
  }

  // For concise mode, take only first paragraph
  if (options.detailLevel === "concise") {
    const firstParagraph = body.split("\n\n")[0];
    body = firstParagraph;
  }

  return `${heading}\n\n${body}`;
}

/* ------------------------------------------------------------------ */
/*  Main generator                                                     */
/* ------------------------------------------------------------------ */

export function generateMarkdown(
  template: Template,
  data: FormData,
  options: GeneratorOptions
): string {
  const parts: string[] = [];

  const name = (data.name as string)?.trim() || "Your Name";
  const role = (data.role as string)?.trim() || "Your Role";

  // 1. Title
  parts.push(toneIntros[options.tone](name, role));

  // 2. Process each section in template order
  for (const section of template.sections) {
    const value = data[section.key];

    // Skip name and role (already used in title)
    if (section.key === "name" || section.key === "role") continue;

    // Skip empty non-required sections
    if (!isNonEmpty(value)) continue;

    switch (section.type) {
      case "list":
        parts.push(renderSkills(value as string | string[], options));
        break;

      case "projects":
        parts.push(renderProjects(value as ProjectEntry[], options));
        break;

      case "links":
        parts.push(renderLinks(value as LinkEntry[], options));
        break;

      case "text":
      case "textarea":
        parts.push(
          renderTextSection(
            section.key,
            section.label,
            value as string,
            options
          )
        );
        break;
    }
  }

  // Filter out empty parts and join with double newlines
  return parts.filter(Boolean).join("\n\n") + "\n";
}
