'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import remarkGfm from 'remark-gfm';
import { Eye, Code2, Copy, Check, Download } from 'lucide-react';
import { useToast } from '../shared/toast';
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
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      success('Copié dans le presse-papier !', 'Collez-le dans votre fichier README.md sur GitHub.');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = markdown;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      success('Copié !');
      setTimeout(() => setCopied(false), 2000);
    }
  }, [markdown, success]);

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
    success('Téléchargé !', 'Le fichier README.md est enregistré.');
  }, [markdown, success]);

  return (
    <div className={styles.container}>
      {/* Top Toolbar: Tabs + Primary Actions */}
      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label="Mode d'affichage">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'preview'}
            className={[styles.tab, activeTab === 'preview' ? styles.activeTab : ''].join(' ')}
            onClick={() => setActiveTab('preview')}
          >
            <Eye size={15} /> Aperçu en direct
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'raw'}
            className={[styles.tab, activeTab === 'raw' ? styles.activeTab : ''].join(' ')}
            onClick={() => setActiveTab('raw')}
          >
            <Code2 size={15} /> Code Markdown
          </button>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.downloadBtn}
            onClick={handleDownload}
            title="Télécharger le fichier README.md"
          >
            <Download size={15} /> Télécharger .md
          </button>

          <button
            type="button"
            className={styles.copyBtn}
            onClick={handleCopy}
            title="Copier le code Markdown dans le presse-papier"
          >
            {copied ? (
              <>
                <Check size={16} /> Copié !
              </>
            ) : (
              <>
                <Copy size={16} /> Copier le Markdown
              </>
            )}
          </button>
        </div>
      </div>

      {/* Rendered Preview Panel */}
      <div
        role="tabpanel"
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
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>Votre README apparaîtra ici</p>
            <p className={styles.emptySubtitle}>
              Remplissez les champs à gauche pour voir le résultat se mettre à jour en direct.
            </p>
          </div>
        )}
      </div>

      {/* Raw Markdown Source Panel */}
      <div
        role="tabpanel"
        className={styles.panel}
        hidden={activeTab !== 'raw'}
      >
        <pre className={styles.rawPre}>
          <code className={styles.rawCode}>{markdown || '# Votre README apparaîtra ici...'}</code>
        </pre>
      </div>
    </div>
  );
}
