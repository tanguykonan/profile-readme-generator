/**
 * Core type definitions for the Profile README Generator.
 *
 * These types mirror the Sanity schema described in prompt.md,
 * making it straightforward to swap the local data source for
 * a real GROQ query later.
 */

/* ------------------------------------------------------------------ */
/*  Template schema                                                    */
/* ------------------------------------------------------------------ */

/** A single section inside a template (e.g. "bio", "skills"). */
export interface TemplateSection {
  /** Machine key used as form field name and in Markdown generation. */
  key: string;
  /** Human-readable label shown in the form. */
  label: string;
  /** Placeholder / helper text for the input. */
  placeholder: string;
  /** Whether the user must fill this section. */
  required: boolean;
  /**
   * Input type hint for the form renderer.
   * - "text"      → single-line input
   * - "textarea"  → multi-line textarea
   * - "list"      → comma-separated values (skills, tags)
   * - "projects"  → repeatable group (name + description + url)
   * - "links"     → repeatable group (label + url)
   */
  type: "text" | "textarea" | "list" | "projects" | "links";
}

/** A README template definition. */
export interface Template {
  id: string;
  title: string;
  description: string;
  sections: TemplateSection[];
  defaultTone: Tone;
  exampleOutput: string;
}

/* ------------------------------------------------------------------ */
/*  Generator options                                                  */
/* ------------------------------------------------------------------ */

export type Tone = "professional" | "direct" | "creative";
export type DetailLevel = "concise" | "detailed";

export interface GeneratorOptions {
  tone: Tone;
  detailLevel: DetailLevel;
}

/* ------------------------------------------------------------------ */
/*  Form data                                                          */
/* ------------------------------------------------------------------ */

/** A single project entry. */
export interface ProjectEntry {
  name: string;
  description: string;
  url: string;
}

/** A single social / contact link entry. */
export interface LinkEntry {
  label: string;
  url: string;
}

/**
 * Form data keyed by the section `key`.
 * Values are either simple strings, string arrays, or structured arrays.
 */
export type FormData = Record<
  string,
  string | string[] | ProjectEntry[] | LinkEntry[]
>;

/* ------------------------------------------------------------------ */
/*  Tech Badges                                                        */
/* ------------------------------------------------------------------ */

export type BadgeCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "database"
  | "cloud_devops"
  | "tools_os"
  | "ai_data";

export type BadgeStyle = "flat" | "flat-square" | "for-the-badge" | "plastic";

export interface TechBadge {
  id: string;
  name: string;
  category: BadgeCategory;
  slug: string;
  color: string;
  logoColor: string;
}

/* ------------------------------------------------------------------ */
/*  GitHub Widgets                                                     */
/* ------------------------------------------------------------------ */

export type GitHubTheme =
  | "default"
  | "github_dark"
  | "dracula"
  | "tokyonight"
  | "radical"
  | "nord"
  | "merko"
  | "gruvbox"
  | "catppuccin_mocha"
  | "onedark"
  | "cobalt"
  | "synthwave";

export interface GitHubWidgetsConfig {
  username: string;
  showStats: boolean;
  showLanguages: boolean;
  showStreak: boolean;
  showTrophies: boolean;
  theme: GitHubTheme;
  hideBorder: boolean;
  showIcons: boolean;
}

/* ------------------------------------------------------------------ */
/*  AI Assistant                                                       */
/* ------------------------------------------------------------------ */

export type AIAction =
  | "enhance-bio"
  | "enhance-project"
  | "suggest-skills"
  | "generate-summary";

export interface AIEnhanceRequest {
  action: AIAction;
  text?: string;
  role?: string;
  tone?: Tone;
  skills?: string[];
  context?: Record<string, unknown>;
}

export interface AIEnhanceResponse {
  result: string | string[];
  success: boolean;
  source?: "groq" | "offline";
  error?: string;
}

