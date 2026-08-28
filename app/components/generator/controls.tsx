'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  Copy,
  Download,
  FileCode,
  CheckCheck,
  Sparkles,
  HelpCircle,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import type { Tone, DetailLevel } from '@/lib/types';
import { PROFILE_PRESETS } from '@/lib/presets';
import { Button } from '../ui/button/button';
import { useToast } from '../shared/toast';
import styles from './controls.module.css';

interface ControlsProps {
  tone: Tone;
  detailLevel: DetailLevel;
  onToneChange: (t: Tone) => void;
  onDetailChange: (d: DetailLevel) => void;
  markdown: string;
  onLoadPreset: (presetId: string) => void;
  onReset: () => void;
  onOpenGuide: () => void;
  onOpenAI: () => void;
}

function convertMarkdownToHtml(md: string): string {
  const lines = md.split(/\r?\n/);
  const htmlParts: string[] = [];
  let inList = false;
  let inBlockquote = false;

  const escapeHtml = (text: string) =>
    text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const formatInline = (text: string) => {
    let str = escapeHtml(text);
    str = str.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;height:auto;" />');
    str = str.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    str = str.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    str = str.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    str = str.replace(/`([^`]+)`/g, '<code>$1</code>');
    return str;
  };

  const closeListIfOpen = () => {
    if (inList) {
      htmlParts.push('</ul>');
      inList = false;
    }
  };

  const closeBlockquoteIfOpen = () => {
    if (inBlockquote) {
      htmlParts.push('</blockquote>');
      inBlockquote = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      closeListIfOpen();
      closeBlockquoteIfOpen();
      continue;
    }

    if (line.startsWith('### ')) {
      closeListIfOpen();
      closeBlockquoteIfOpen();
      htmlParts.push(`<h3>${formatInline(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      closeListIfOpen();
      closeBlockquoteIfOpen();
      htmlParts.push(`<h2>${formatInline(line.slice(3))}</h2>`);
    } else if (line.startsWith('# ')) {
      closeListIfOpen();
      closeBlockquoteIfOpen();
      htmlParts.push(`<h1>${formatInline(line.slice(2))}</h1>`);
    } else if (line.startsWith('>')) {
      closeListIfOpen();
      if (!inBlockquote) {
        htmlParts.push('<blockquote>');
        inBlockquote = true;
      }
      const quoteContent = line.replace(/^>\s*/, '');
      htmlParts.push(`<p>${formatInline(quoteContent)}</p>`);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      closeBlockquoteIfOpen();
      if (!inList) {
        htmlParts.push('<ul>');
        inList = true;
      }
      htmlParts.push(`<li>${formatInline(line.slice(2))}</li>`);
    } else {
      closeListIfOpen();
      closeBlockquoteIfOpen();
      htmlParts.push(`<p>${formatInline(line)}</p>`);
    }
  }

  closeListIfOpen();
  closeBlockquoteIfOpen();

  return htmlParts.join('\n');
}

export function Controls({
  tone,
  detailLevel,
  onToneChange,
  onDetailChange,
  markdown,
  onLoadPreset,
  onReset,
  onOpenGuide,
  onOpenAI,
}: ControlsProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');
  const { success } = useToast();

  /* ---------------------------------------------------------------- */
  /*  Stats                                                            */
  /* ---------------------------------------------------------------- */
  const stats = useMemo(() => {
    const words = markdown.trim().split(/\s+/).filter(Boolean).length;
    const chars = markdown.length;
    const readTimeMinutes = Math.max(1, Math.ceil(words / 180));
    return { words, chars, readTimeMinutes };
  }, [markdown]);

  /* ---------------------------------------------------------------- */
  /*  Copy to clipboard                                                */
  /* ---------------------------------------------------------------- */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopyState('copied');
      success('Copied to clipboard!', 'Paste it directly into your GitHub README.md');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = markdown;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopyState('copied');
      success('Copied to clipboard!');
      setTimeout(() => setCopyState('idle'), 2000);
    }
  }, [markdown, success]);

  /* ---------------------------------------------------------------- */
  /*  Download .md                                                     */
  /* ---------------------------------------------------------------- */
  const handleDownload = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    success('Downloaded README.md');
  }, [markdown, success]);

  /* ---------------------------------------------------------------- */
  /*  Export HTML                                                      */
  /* ---------------------------------------------------------------- */
  const handleExportHtml = useCallback(() => {
    const bodyContent = convertMarkdownToHtml(markdown);
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GitHub Profile README</title>
  <style>
    :root {
      color-scheme: light dark;
      --bg: #ffffff;
      --text: #1c1917;
      --border: #e7e5e4;
      --accent: #0d9488;
      --quote-bg: #f5f5f4;
      --code-bg: #f5f5f4;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0c0a09;
        --text: #e7e5e4;
        --border: #292524;
        --accent: #2dd4bf;
        --quote-bg: #1c1917;
        --code-bg: #1c1917;
      }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 0 24px;
      background: var(--bg);
      color: var(--text);
      line-height: 1.7;
    }
    h1 {
      font-size: 1.85rem;
      font-weight: 700;
      border-bottom: 2px solid var(--border);
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    h2 {
      font-size: 1.35rem;
      font-weight: 600;
      margin-top: 32px;
      margin-bottom: 14px;
    }
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-top: 20px;
      margin-bottom: 8px;
    }
    p {
      margin: 0 0 16px;
    }
    a {
      color: var(--accent);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    ul {
      padding-left: 24px;
      margin: 0 0 16px;
    }
    li {
      margin: 6px 0;
    }
    blockquote {
      border-left: 4px solid var(--accent);
      padding: 8px 16px;
      margin: 16px 0;
      background: var(--quote-bg);
      border-radius: 0 6px 6px 0;
    }
    blockquote p {
      margin: 0;
    }
    code {
      background: var(--code-bg);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.9em;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
${bodyContent}
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    success('Exported README.html');
  }, [markdown, success]);

  return (
    <div className={styles.barContainer}>
      <div className={styles.bar}>
        {/* Presets dropdown */}
        <div className={styles.field}>
          <label htmlFor="preset-select" className={styles.fieldLabel}>
            <BookOpen size={14} /> Demo Presets
          </label>
          <select
            id="preset-select"
            className={styles.select}
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) {
                onLoadPreset(e.target.value);
                e.target.value = '';
              }
            }}
          >
            <option value="" disabled>
              Load sample profile...
            </option>
            {PROFILE_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.badge} ({p.name})
              </option>
            ))}
          </select>
        </div>

        {/* Tone selector */}
        <div className={styles.field}>
          <label htmlFor="tone-select" className={styles.fieldLabel}>
            Tone
          </label>
          <select
            id="tone-select"
            className={styles.select}
            value={tone}
            onChange={(e) => onToneChange(e.target.value as Tone)}
          >
            <option value="professional">Professional</option>
            <option value="direct">Direct</option>
            <option value="creative">Creative</option>
          </select>
        </div>

        {/* Detail level toggle */}
        <div className={styles.field}>
          <span className={styles.fieldLabel} id="detail-label">
            Detail
          </span>
          <div className={styles.toggleGroup} role="group" aria-labelledby="detail-label">
            <button
              type="button"
              className={[styles.toggleBtn, detailLevel === 'concise' ? styles.toggleActive : ''].join(' ')}
              onClick={() => onDetailChange('concise')}
              aria-pressed={detailLevel === 'concise'}
            >
              Concise
            </button>
            <button
              type="button"
              className={[styles.toggleBtn, detailLevel === 'detailed' ? styles.toggleActive : ''].join(' ')}
              onClick={() => onDetailChange('detailed')}
              aria-pressed={detailLevel === 'detailed'}
            >
              Detailed
            </button>
          </div>
        </div>

        {/* Quick Tools */}
        <div className={styles.toolButtons}>
          <Button
            variant="ghost"
            size="sm"
            icon={<Sparkles size={14} />}
            onClick={onOpenAI}
            title="Open AI Profile Assistant"
          >
            AI Assistant
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={<HelpCircle size={14} />}
            onClick={onOpenGuide}
            title="How to publish to GitHub"
          >
            Guide
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={<RotateCcw size={14} />}
            onClick={onReset}
            title="Reset profile"
          >
            Reset
          </Button>
        </div>

        {/* Spacer */}
        <div className={styles.spacer} />

        {/* Export actions */}
        <div className={styles.actions}>
          <Button
            variant="ghost"
            size="sm"
            icon={<FileCode size={15} />}
            onClick={handleExportHtml}
            aria-label="Export as HTML file"
          >
            HTML
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<Download size={15} />}
            onClick={handleDownload}
            aria-label="Download README.md file"
          >
            Download .md
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={copyState === 'copied' ? <CheckCheck size={15} /> : <Copy size={15} />}
            onClick={handleCopy}
            aria-label="Copy Markdown to clipboard"
          >
            {copyState === 'copied' ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>

      {/* Sub-bar: stats and meta */}
      <div className={styles.statsBar}>
        <div className={styles.statsMetrics}>
          <span>{stats.words} words</span>
          <span>·</span>
          <span>{stats.chars} characters</span>
          <span>·</span>
          <span>~{stats.readTimeMinutes} min read</span>
        </div>
        <div className={styles.autoSaveNotice}>
          <span>Autosaved locally</span>
        </div>
      </div>
    </div>
  );
}
