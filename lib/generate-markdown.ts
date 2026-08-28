/**
 * Clean & Professional Markdown generation engine.
 *
 * Produces clean, elegant GitHub Markdown without generic AI emojis or unparsed HTML entities.
 */

import type {
  Template,
  FormData,
  GeneratorOptions,
  ProjectEntry,
  LinkEntry,
  Tone,
  BadgeStyle,
  GitHubWidgetsConfig,
  TechBadge,
} from "./types";
import { TECH_BADGES, generateBadgeMarkdown } from "./badge-catalog";
import { renderGitHubWidgets } from "./github-widgets";

/* ------------------------------------------------------------------ */
/*  Tone intros (clean, professional typography)                       */
/* ------------------------------------------------------------------ */

const toneIntros: Record<Tone, (name: string, role: string) => string> = {
  professional: (name, role) => `# ${name} — ${role}`,
  direct: (name, role) => `# ${name} | ${role}`,
  creative: (name, role) => `# ${name} // ${role}`,
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
  options: GeneratorOptions,
  label: string = "Tech Stack",
  selectedBadges?: string[],
  badgeStyle: BadgeStyle = "for-the-badge"
): string {
  const items = toStringList(skills);
  const heading = `## ${label}`;

  let badgeMarkdown = "";
  if (selectedBadges && selectedBadges.length > 0) {
    const badgesToRender = selectedBadges
      .map((id) => TECH_BADGES.find((b) => b.id === id))
      .filter((b): b is TechBadge => b !== undefined);

    if (badgesToRender.length > 0) {
      badgeMarkdown = badgesToRender
        .map((b) => generateBadgeMarkdown(b, badgeStyle))
        .join(" ");
    }
  }

  const listMarkdown =
    items.length > 0 ? items.map((s) => `- ${s}`).join("\n") : "";

  if (!badgeMarkdown && !listMarkdown) return "";

  if (badgeMarkdown && listMarkdown) {
    return `${heading}\n\n${badgeMarkdown}\n\n${listMarkdown}`;
  }
  return `${heading}\n\n${badgeMarkdown || listMarkdown}`;
}

function renderProjects(
  projects: ProjectEntry[],
  options: GeneratorOptions,
  label: string = "Featured Projects"
): string {
  const valid = Array.isArray(projects)
    ? projects.filter((p) => p && typeof p === "object" && p.name && p.name.trim())
    : [];
  if (valid.length === 0) return "";

  const heading = `## ${label}`;

  const entries = valid.map((p) => {
    let block = `### ${p.name.trim()}`;
    if (p.description && p.description.trim()) {
      block +=
        options.detailLevel === "concise"
          ? `\n${p.description.trim().split("\n")[0]}`
          : `\n${p.description.trim()}`;
    }
    if (p.url && p.url.trim()) {
      block += `\n[View Project →](${p.url.trim()})`;
    }
    return block;
  });

  return `${heading}\n\n${entries.join("\n\n")}`;
}

function renderLinks(
  links: LinkEntry[],
  options: GeneratorOptions,
  label: string = "Connect with Me"
): string {
  const valid = Array.isArray(links)
    ? links.filter((l) => l && typeof l === "object" && l.url && l.url.trim())
    : [];
  if (valid.length === 0) return "";

  const heading = `## ${label}`;
  const list = valid
    .map((l) => {
      const linkText = l.label && l.label.trim() ? l.label.trim() : l.url.trim();
      return `- [${linkText}](${l.url.trim()})`;
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

  let body = value.trim();

  // For concise mode, take only first paragraph (except for bio/badges)
  if (options.detailLevel === "concise" && key !== "badges") {
    const firstParagraph = body.split("\n\n")[0];
    body = firstParagraph;
  }

  // Bio is the intro summary directly under the title without a section header
  if (key === "bio") {
    return body;
  }

  // Badges are embedded directly
  if (key === "badges") {
    return body;
  }

  const heading = `## ${label}`;

  // For testimonials, wrap in blockquote if not already
  if (key === "testimonials" && !body.startsWith(">")) {
    body = body
      .split("\n")
      .map((line) => (line.trim().startsWith(">") ? line : `> ${line}`))
      .join("\n");
  }

  return `${heading}\n\n${body}`;
}

/* ------------------------------------------------------------------ */
/*  Main generator                                                     */
/* ------------------------------------------------------------------ */

export interface GeneratorExtraOptions {
  selectedBadges?: string[];
  badgeStyle?: BadgeStyle;
  widgets?: GitHubWidgetsConfig;
}

export function generateMarkdown(
  template: Template,
  data: FormData,
  options: GeneratorOptions,
  extras?: GeneratorExtraOptions
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

    // Skip empty non-required sections (unless selectedBadges are present for skills)
    const hasBadges = section.key === "skills" && extras?.selectedBadges && extras.selectedBadges.length > 0;
    if (!isNonEmpty(value) && !hasBadges) continue;

    switch (section.type) {
      case "list":
        parts.push(
          renderSkills(
            (value as string | string[]) || "",
            options,
            section.label,
            extras?.selectedBadges,
            extras?.badgeStyle
          )
        );
        break;

      case "projects":
        parts.push(
          renderProjects(value as ProjectEntry[], options, section.label)
        );
        break;

      case "links":
        parts.push(
          renderLinks(value as LinkEntry[], options, section.label)
        );
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

  // 3. Append GitHub Widgets if configured
  if (extras?.widgets && extras.widgets.username) {
    const widgetMarkdown = renderGitHubWidgets(extras.widgets);
    if (widgetMarkdown) {
      parts.push(widgetMarkdown);
    }
  }

  // Filter out empty parts and join with double newlines
  return parts.filter(Boolean).join("\n\n") + "\n";
}
