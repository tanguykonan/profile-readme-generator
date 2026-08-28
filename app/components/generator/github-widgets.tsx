'use client';

import { Palette } from 'lucide-react';
import type { GitHubWidgetsConfig, GitHubTheme } from '@/lib/types';
import { GITHUB_THEMES, getStatsCardUrl, getLanguagesCardUrl } from '@/lib/github-widgets';
import styles from './github-widgets.module.css';

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface GitHubWidgetsProps {
  config: GitHubWidgetsConfig;
  onChange: (config: GitHubWidgetsConfig) => void;
}

export function GitHubWidgets({ config, onChange }: GitHubWidgetsProps) {
  const update = <K extends keyof GitHubWidgetsConfig>(key: K, value: GitHubWidgetsConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className={styles.container}>
      {/* Username input */}
      <div className={styles.usernameRow}>
        <label htmlFor="github-username" className={styles.label}>
          <GithubIcon size={16} /> GitHub Username
        </label>
        <input
          id="github-username"
          type="text"
          placeholder="e.g. torvalds"
          value={config.username}
          onChange={(e) => update('username', e.target.value.trim())}
          className={styles.input}
        />
      </div>

      {config.username && (
        <>
          {/* Card toggles */}
          <div className={styles.togglesGrid}>
            <label className={styles.toggleItem}>
              <input
                type="checkbox"
                checked={config.showStats}
                onChange={(e) => update('showStats', e.target.checked)}
                className={styles.checkbox}
              />
              <span>General Stats Card</span>
            </label>

            <label className={styles.toggleItem}>
              <input
                type="checkbox"
                checked={config.showLanguages}
                onChange={(e) => update('showLanguages', e.target.checked)}
                className={styles.checkbox}
              />
              <span>Top Languages Card</span>
            </label>

            <label className={styles.toggleItem}>
              <input
                type="checkbox"
                checked={config.showStreak}
                onChange={(e) => update('showStreak', e.target.checked)}
                className={styles.checkbox}
              />
              <span>Streak Stats Card</span>
            </label>

            <label className={styles.toggleItem}>
              <input
                type="checkbox"
                checked={config.showTrophies}
                onChange={(e) => update('showTrophies', e.target.checked)}
                className={styles.checkbox}
              />
              <span>GitHub Trophies</span>
            </label>
          </div>

          {/* Theme selector */}
          <div className={styles.themeSection}>
            <label htmlFor="github-theme-select" className={styles.themeLabel}>
              <Palette size={15} /> Card Theme
            </label>
            <div className={styles.themeGrid}>
              {GITHUB_THEMES.map((th) => (
                <button
                  key={th.id}
                  type="button"
                  className={[
                    styles.themeBtn,
                    config.theme === th.id ? styles.themeActive : '',
                  ].join(' ')}
                  onClick={() => update('theme', th.id as GitHubTheme)}
                >
                  <span className={styles.colorDot} style={{ backgroundColor: th.previewBg }} />
                  {th.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live mini preview */}
          {config.username && (config.showStats || config.showLanguages) && (
            <div className={styles.previewBox}>
              <p className={styles.previewTitle}>Live Widget Preview</p>
              <div className={styles.previewImgs}>
                {config.showStats && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={getStatsCardUrl(config)}
                    alt="GitHub Stats"
                    className={styles.cardPreview}
                    loading="lazy"
                  />
                )}
                {config.showLanguages && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={getLanguagesCardUrl(config)}
                    alt="Top Languages"
                    className={styles.cardPreview}
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
