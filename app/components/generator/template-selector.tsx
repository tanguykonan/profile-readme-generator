import type { Template } from '@/lib/types';
import styles from './template-selector.module.css';

interface TemplateSelectorProps {
  templates: Template[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function TemplateSelector({
  templates,
  selectedId,
  onSelect,
}: TemplateSelectorProps) {
  return (
    <div>
      <p className={styles.heading}>Choose a Template</p>
      <div className={styles.grid}>
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.id)}
            aria-pressed={t.id === selectedId}
            className={[
              styles.card,
              t.id === selectedId ? styles.selected : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className={styles.cardTitle}>{t.title}</span>
            <span className={styles.cardDesc}>{t.description}</span>
            <span className={styles.cardMeta}>
              {t.sections.length} sections · {t.defaultTone}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
