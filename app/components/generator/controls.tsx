'use client';

import { useState, useCallback } from 'react';
import { Copy, Download, FileCode, CheckCheck } from 'lucide-react';
import type { Tone, DetailLevel } from '@/lib/types';
import { Button } from '../ui/button/button';
import styles from './controls.module.css';

interface ControlsProps {
  tone: Tone;
  detailLevel: DetailLevel;
  onToneChange: (t: Tone) => void;
  onDetailChange: (d: DetailLevel) => void;
  markdown: string;
}

export function Controls({
  tone,
  detailLevel,
  onToneChange,
  onDetailChange,
  markdown,
}: ControlsProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');

  /* ---------------------------------------------------------------- */
  /*  Copy to clipboard                                                */
  /* ---------------------------------------------------------------- */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      // Fallback: select all text in a textarea
      const ta = document.createElement('textarea');
      ta.value = markdown;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    }
  }, [markdown]);

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
  }, [markdown]);

  /* ---------------------------------------------------------------- */
  /*  Export HTML                                                      */
  /* ---------------------------------------------------------------- */
  const handleExportHtml = useCallback(() => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>README</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 780px; margin: 40px auto; padding: 0 20px; color: #1c1917; line-height: 1.7; }
    h1 { font-size: 1.75rem; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px; }
    h2 { font-size: 1.25rem; margin-top: 32px; }
    h3 { font-size: 1.05rem; }
    a { color: #0d9488; }
    blockquote { border-left: 3px solid #0d9488; padding: 8px 16px; margin: 16px 0; background: #f5f5f4; border-radius: 0 4px 4px 0; }
    code { background: #f5f5f4; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
    pre { background: #f5f5f4; padding: 16px; border-radius: 8px; overflow-x: auto; }
    pre code { background: none; padding: 0; }
    ul { padding-left: 24px; }
  </style>
</head>
<body>
  <p><em>Rendered from Markdown — for the raw source, use the .md file.</em></p>
  <pre><code>${markdown.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
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
  }, [markdown]);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className={styles.bar}>
      {/* Tone selector */}
      <div className={styles.field}>
        <label htmlFor="tone-select" className={styles.fieldLabel}>Tone</label>
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
        <span className={styles.fieldLabel} id="detail-label">Detail</span>
        <div
          className={styles.toggleGroup}
          role="group"
          aria-labelledby="detail-label"
        >
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
  );
}
