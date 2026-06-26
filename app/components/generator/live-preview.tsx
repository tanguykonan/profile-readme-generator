'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import remarkGfm from 'remark-gfm';
import styles from './live-preview.module.css';

const ReactMarkdown = dynamic(() => import('react-markdown'), {
  ssr: false,
  loading: () => (
    <div className={styles.loadingShim}>
      <div className={styles.shimLine} style={{ width: '60%' }} />
      <div className={styles.shimLine} style={{ width: '40%' }} />
      <div className={styles.shimLine} style={{ width: '80%' }} />
    </div>
  ),
});

interface LivePreviewProps {
  markdown: string;
}

type Tab = 'preview' | 'raw';

export function LivePreview({ markdown }: LivePreviewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('preview');

  return (
    <div className={styles.container}>
      {/* Tab bar */}
      <div className={styles.tabs} role="tablist" aria-label="Preview mode">
        <button
          id="tab-preview"
          role="tab"
          type="button"
          aria-selected={activeTab === 'preview'}
          aria-controls="panel-preview"
          className={[styles.tab, activeTab === 'preview' ? styles.activeTab : ''].join(' ')}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
        <button
          id="tab-raw"
          role="tab"
          type="button"
          aria-selected={activeTab === 'raw'}
          aria-controls="panel-raw"
          className={[styles.tab, activeTab === 'raw' ? styles.activeTab : ''].join(' ')}
          onClick={() => setActiveTab('raw')}
        >
          Markdown
        </button>
      </div>

      {/* Preview panel */}
      <div
        id="panel-preview"
        role="tabpanel"
        aria-labelledby="tab-preview"
        className={styles.panel}
        hidden={activeTab !== 'preview'}
      >
        {markdown.trim() ? (
          <div className="markdown-preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        ) : (
          <p className={styles.empty}>
            Fill in your details on the left to see your README preview here.
          </p>
        )}
      </div>

      {/* Raw panel */}
      <div
        id="panel-raw"
        role="tabpanel"
        aria-labelledby="tab-raw"
        className={styles.panel}
        hidden={activeTab !== 'raw'}
      >
        <pre className={styles.rawPre}>
          <code className={styles.rawCode}>{markdown || '# Your README will appear here…'}</code>
        </pre>
      </div>
    </div>
  );
}
