'use client';

import { useCallback } from 'react';
import {
  Plus,
  Trash2,
  Sparkles,
  User,
  Cpu,
  FolderGit2,
  Share2,
  BarChart3,
} from 'lucide-react';
import type {
  Template,
  FormData,
  ProjectEntry,
  LinkEntry,
  BadgeStyle,
  GitHubWidgetsConfig,
  AIAction,
} from '@/lib/types';
import { BadgePicker } from './badge-picker';
import { GitHubWidgets } from './github-widgets';
import styles from './profile-form.module.css';

interface ProfileFormProps {
  template: Template;
  data: FormData;
  onChange: (data: FormData) => void;
  selectedBadges: string[];
  badgeStyle: BadgeStyle;
  onBadgesChange: (ids: string[]) => void;
  onBadgeStyleChange: (style: BadgeStyle) => void;
  widgets: GitHubWidgetsConfig;
  onWidgetsChange: (config: GitHubWidgetsConfig) => void;
  onOpenAI: (action: AIAction, text?: string) => void;
}

export function ProfileForm({
  template,
  data,
  onChange,
  selectedBadges,
  badgeStyle,
  onBadgesChange,
  onBadgeStyleChange,
  widgets,
  onWidgetsChange,
  onOpenAI,
}: ProfileFormProps) {
  const set = useCallback(
    (key: string, value: FormData[string]) => {
      onChange({ ...data, [key]: value });
    },
    [data, onChange]
  );

  /* Project Handlers */
  const getProjects = (key: string): ProjectEntry[] => {
    const val = data[key];
    if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'object') {
      return val as ProjectEntry[];
    }
    return [{ name: '', description: '', url: '' }];
  };

  const updateProject = (key: string, idx: number, field: keyof ProjectEntry, value: string) => {
    const current = getProjects(key);
    const next = [...current];
    next[idx] = { ...next[idx], [field]: value };
    set(key, next);
  };

  const addProject = (key: string) => {
    set(key, [...getProjects(key), { name: '', description: '', url: '' }]);
  };

  const removeProject = (key: string, idx: number) => {
    const next = getProjects(key).filter((_, i) => i !== idx);
    set(key, next.length ? next : [{ name: '', description: '', url: '' }]);
  };

  /* Link Handlers */
  const getLinks = (key: string): LinkEntry[] => {
    const val = data[key];
    if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'object') {
      return val as LinkEntry[];
    }
    return [{ label: '', url: '' }];
  };

  const updateLink = (key: string, idx: number, field: keyof LinkEntry, value: string) => {
    const current = getLinks(key);
    const next = [...current];
    next[idx] = { ...next[idx], [field]: value };
    set(key, next);
  };

  const addLink = (key: string) => {
    set(key, [...getLinks(key), { label: '', url: '' }]);
  };

  const removeLink = (key: string, idx: number) => {
    const next = getLinks(key).filter((_, i) => i !== idx);
    set(key, next.length ? next : [{ label: '', url: '' }]);
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()} noValidate>
      {/* 1. IDENTITÉ & BIO */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <User size={18} />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>1. Identité & Présentation</h3>
            <p className={styles.sectionDesc}>Votre nom, votre titre et votre présentation générale.</p>
          </div>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label htmlFor="field-name" className={styles.label}>
                Nom complet <span className={styles.required}>*</span>
              </label>
              <input
                id="field-name"
                type="text"
                className={styles.input}
                value={(data.name as string) || ''}
                onChange={(e) => set('name', e.target.value)}
                placeholder="ex. Alex Dupont"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="field-role" className={styles.label}>
                Titre / Poste <span className={styles.required}>*</span>
              </label>
              <input
                id="field-role"
                type="text"
                className={styles.input}
                value={(data.role as string) || ''}
                onChange={(e) => set('role', e.target.value)}
                placeholder="ex. Lead Developer Fullstack"
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.labelRow}>
              <label htmlFor="field-bio" className={styles.label}>
                Bio / À propos
              </label>
              <button
                type="button"
                className={styles.aiButton}
                onClick={() => onOpenAI('enhance-bio', (data.bio as string) || '')}
              >
                <Sparkles size={13} /> Améliorer avec l&apos;IA
              </button>
            </div>
            <textarea
              id="field-bio"
              className={styles.textarea}
              value={(data.bio as string) || ''}
              onChange={(e) => set('bio', e.target.value)}
              placeholder="Décrivez votre passion, vos années d'expérience et ce que vous construisez..."
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* 2. TECHNOLOGIES & BADGES */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <Cpu size={18} />
          </div>
          <div className={styles.sectionHeaderFlex}>
            <div>
              <h3 className={styles.sectionTitle}>2. Stack & Technologies</h3>
              <p className={styles.sectionDesc}>Sélectionnez vos technologies pour afficher des badges nets.</p>
            </div>
          </div>
        </div>

        <div className={styles.cardBody}>
          <BadgePicker
            selectedIds={selectedBadges}
            style={badgeStyle}
            onChange={onBadgesChange}
            onStyleChange={onBadgeStyleChange}
          />

          <div className={styles.fieldGroup} style={{ marginTop: '12px' }}>
            <label htmlFor="field-skills" className={styles.label}>
              Compétences ou technologies supplémentaires (texte brut)
            </label>
            <input
              id="field-skills"
              type="text"
              className={styles.input}
              value={(data.skills as string) || ''}
              onChange={(e) => set('skills', e.target.value)}
              placeholder="ex. Architecture microservices, GraphQL, CI/CD, Agile"
            />
          </div>
        </div>
      </div>

      {/* 3. PROJETS PHARES */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <FolderGit2 size={18} />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>3. Projets phares</h3>
            <p className={styles.sectionDesc}>Mettez en avant vos meilleurs dépôts, SaaS ou contributions.</p>
          </div>
        </div>

        <div className={styles.cardBody}>
          {getProjects('projects').map((project, idx) => (
            <div key={idx} className={styles.projectItemCard}>
              <div className={styles.itemHeader}>
                <span className={styles.itemBadge}>Projet {idx + 1}</span>
                <div className={styles.itemActions}>
                  <button
                    type="button"
                    className={styles.aiButtonSmall}
                    onClick={() => onOpenAI('enhance-project', project.description)}
                  >
                    <Sparkles size={12} /> Améliorer la description
                  </button>
                  {getProjects('projects').length > 1 && (
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removeProject('projects', idx)}
                      aria-label={`Supprimer projet ${idx + 1}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.projectFields}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Nom du projet (ex. Next.js SaaS Starter)"
                  value={project.name}
                  onChange={(e) => updateProject('projects', idx, 'name', e.target.value)}
                />
                <textarea
                  className={styles.textarea}
                  placeholder="Ce que fait le projet, la stack utilisée et l'impact..."
                  value={project.description}
                  onChange={(e) => updateProject('projects', idx, 'description', e.target.value)}
                  rows={2}
                />
                <input
                  type="url"
                  className={styles.input}
                  placeholder="URL du dépôt ou démo (https://github.com/...)"
                  value={project.url}
                  onChange={(e) => updateProject('projects', idx, 'url', e.target.value)}
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            className={styles.addBtn}
            onClick={() => addProject('projects')}
          >
            <Plus size={15} /> Ajouter un projet
          </button>
        </div>
      </div>

      {/* 4. LIENS & RÉSEAUX */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <Share2 size={18} />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>4. Liens & Contact</h3>
            <p className={styles.sectionDesc}>Où vous trouver (LinkedIn, Portfolio, GitHub, Twitter...)</p>
          </div>
        </div>

        <div className={styles.cardBody}>
          {getLinks('contact').map((link, idx) => (
            <div key={idx} className={styles.linkRowItem}>
              <input
                type="text"
                className={styles.input}
                placeholder="Libellé (ex. LinkedIn, Portfolio)"
                value={link.label}
                onChange={(e) => updateLink('contact', idx, 'label', e.target.value)}
              />
              <input
                type="url"
                className={styles.input}
                placeholder="https://..."
                value={link.url}
                onChange={(e) => updateLink('contact', idx, 'url', e.target.value)}
              />
              {getLinks('contact').length > 1 && (
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeLink('contact', idx)}
                  aria-label={`Supprimer lien ${idx + 1}`}
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className={styles.addBtn}
            onClick={() => addLink('contact')}
          >
            <Plus size={15} /> Ajouter un lien
          </button>
        </div>
      </div>

      {/* 5. GITHUB STATS & ANALYTICS */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <BarChart3 size={18} />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>5. Cartes de Statistiques GitHub</h3>
            <p className={styles.sectionDesc}>Affichez vos statistiques réelles GitHub en direct.</p>
          </div>
        </div>

        <div className={styles.cardBody}>
          <GitHubWidgets config={widgets} onChange={onWidgetsChange} />
        </div>
      </div>
    </form>
  );
}
