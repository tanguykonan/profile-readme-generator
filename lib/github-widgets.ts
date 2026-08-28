/**
 * GitHub Widgets and Cards Generator.
 *
 * Generates URLs and Markdown embed code for popular GitHub profile cards:
 * - GitHub Readme Stats (general profile stats)
 * - GitHub Top Languages
 * - GitHub Streak Stats
 * - GitHub Profile Trophies
 */

import type { GitHubWidgetsConfig, GitHubTheme } from "./types";

export const GITHUB_THEMES: { id: GitHubTheme; label: string; previewBg: string }[] = [
  { id: "default", label: "Default", previewBg: "#ffffff" },
  { id: "github_dark", label: "GitHub Dark", previewBg: "#0d1117" },
  { id: "tokyonight", label: "Tokyo Night", previewBg: "#1a1b26" },
  { id: "dracula", label: "Dracula", previewBg: "#282a36" },
  { id: "radical", label: "Radical", previewBg: "#141321" },
  { id: "nord", label: "Nord", previewBg: "#2e3440" },
  { id: "merko", label: "Merko", previewBg: "#0a0f0d" },
  { id: "gruvbox", label: "Gruvbox", previewBg: "#282828" },
  { id: "catppuccin_mocha", label: "Catppuccin Mocha", previewBg: "#1e1e2e" },
  { id: "onedark", label: "One Dark", previewBg: "#282c34" },
  { id: "cobalt", label: "Cobalt", previewBg: "#193549" },
  { id: "synthwave", label: "Synthwave", previewBg: "#2b213a" },
];

export const DEFAULT_WIDGETS_CONFIG: GitHubWidgetsConfig = {
  username: "",
  showStats: true,
  showLanguages: true,
  showStreak: false,
  showTrophies: false,
  theme: "tokyonight",
  hideBorder: false,
  showIcons: true,
};

/**
 * Builds the GitHub Stats Card URL.
 */
export function getStatsCardUrl(config: GitHubWidgetsConfig): string {
  if (!config.username) return "";
  const params = new URLSearchParams({
    username: config.username,
    show_icons: config.showIcons ? "true" : "false",
    theme: config.theme,
    hide_border: config.hideBorder ? "true" : "false",
    count_private: "true",
  });
  return `https://github-readme-stats.vercel.app/api?${params.toString()}`;
}

/**
 * Builds the GitHub Top Languages Card URL.
 */
export function getLanguagesCardUrl(config: GitHubWidgetsConfig): string {
  if (!config.username) return "";
  const params = new URLSearchParams({
    username: config.username,
    layout: "compact",
    theme: config.theme,
    hide_border: config.hideBorder ? "true" : "false",
  });
  return `https://github-readme-stats.vercel.app/api/top-langs/?${params.toString()}`;
}

/**
 * Builds the GitHub Streak Stats Card URL.
 */
export function getStreakCardUrl(config: GitHubWidgetsConfig): string {
  if (!config.username) return "";
  const params = new URLSearchParams({
    user: config.username,
    theme: config.theme,
    hide_border: config.hideBorder ? "true" : "false",
  });
  return `https://github-readme-streak-stats.herokuapp.com/?${params.toString()}`;
}

/**
 * Builds the GitHub Profile Trophy URL.
 */
export function getTrophyUrl(config: GitHubWidgetsConfig): string {
  if (!config.username) return "";
  const params = new URLSearchParams({
    username: config.username,
    theme: config.theme === "default" ? "flat" : config.theme,
    margin_w: "10",
  });
  return `https://github-profile-trophy.vercel.app/?${params.toString()}`;
}

/**
 * Generates the full Markdown block for configured GitHub widgets in pure Markdown.
 */
export function renderGitHubWidgets(config: GitHubWidgetsConfig): string {
  if (!config.username || !config.username.trim()) return "";

  const cards: string[] = [];

  if (config.showTrophies) {
    const trophyUrl = getTrophyUrl(config);
    cards.push(`[![GitHub Trophies](${trophyUrl})](https://github.com/${config.username})`);
  }

  if (config.showStats) {
    const statsUrl = getStatsCardUrl(config);
    cards.push(`[![GitHub Stats](${statsUrl})](https://github.com/${config.username})`);
  }

  if (config.showLanguages) {
    const langsUrl = getLanguagesCardUrl(config);
    cards.push(`[![Top Languages](${langsUrl})](https://github.com/${config.username})`);
  }

  if (config.showStreak) {
    const streakUrl = getStreakCardUrl(config);
    cards.push(`[![GitHub Streak](${streakUrl})](https://github.com/${config.username})`);
  }

  if (cards.length === 0) return "";

  return `## GitHub Analytics\n\n${cards.join("\n\n")}`;
}
