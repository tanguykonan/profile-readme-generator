'use client';

import { useCallback } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Template, FormData, ProjectEntry, LinkEntry } from '@/lib/types';
import { Button } from '../ui/button/button';
import styles from './profile-form.module.css';

interface ProfileFormProps {
  template: Template;
  data: FormData;
  onChange: (data: FormData) => void;
}

export function ProfileForm({ template, data, onChange }: ProfileFormProps) {
  /* ---------------------------------------------------------------- */
  /*  Generic field updater                                            */
  /* ---------------------------------------------------------------- */
  const set = useCallback(
    (key: string, value: FormData[string]) => {
      onChange({ ...data, [key]: value });
    },
    [data, onChange]
  );

  /* ---------------------------------------------------------------- */
  /*  Project entry handlers                                           */
  /* ---------------------------------------------------------------- */
  const getProjects = (key: string): ProjectEntry[] =>
    (data[key] as ProjectEntry[]) ?? [];

  const updateProject = (key: string, idx: number, field: keyof ProjectEntry, value: string) => {
    const next = [...getProjects(key)];
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

  /* ---------------------------------------------------------------- */
  /*  Link entry handlers                                              */
  /* ---------------------------------------------------------------- */
  const getLinks = (key: string): LinkEntry[] =>
    (data[key] as LinkEntry[]) ?? [];

  const updateLink = (key: string, idx: number, field: keyof LinkEntry, value: string) => {
    const next = [...getLinks(key)];
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

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()} noValidate>
      {template.sections.map((section) => {
        const id = `field-${section.key}`;

        /* ---- text / textarea / list ---- */
        if (section.type === 'text' || section.type === 'textarea' || section.type === 'list') {
          const value = (data[section.key] as string) ?? '';
          return (
            <div key={section.key} className={styles.fieldGroup}>
              <label htmlFor={id} className={styles.label}>
                {section.label}
                {section.required && <span className={styles.required} aria-hidden="true"> *</span>}
              </label>
              {section.type === 'textarea' ? (
                <textarea
                  id={id}
                  className={styles.textarea}
                  value={value}
                  onChange={(e) => set(section.key, e.target.value)}
                  placeholder={section.placeholder}
                  rows={4}
                  required={section.required}
                  aria-required={section.required}
                />
              ) : (
                <input
                  id={id}
                  type="text"
                  className={styles.input}
                  value={value}
                  onChange={(e) => set(section.key, e.target.value)}
                  placeholder={section.placeholder}
                  required={section.required}
                  aria-required={section.required}
                />
              )}
              {section.type === 'list' && (
                <p className={styles.hint}>Separate each item with a comma</p>
              )}
            </div>
          );
        }

        /* ---- projects ---- */
        if (section.type === 'projects') {
          const projects = getProjects(section.key);
          return (
            <fieldset key={section.key} className={styles.fieldset}>
              <legend className={styles.legend}>
                {section.label}
                {section.required && <span className={styles.required} aria-hidden="true"> *</span>}
              </legend>

              {projects.map((project, idx) => (
                <div key={idx} className={styles.repeatGroup}>
                  <div className={styles.repeatHeader}>
                    <span className={styles.repeatIndex}>Project {idx + 1}</span>
                    {projects.length > 1 && (
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removeProject(section.key, idx)}
                        aria-label={`Remove project ${idx + 1}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Project name"
                    value={project.name}
                    onChange={(e) => updateProject(section.key, idx, 'name', e.target.value)}
                    aria-label={`Project ${idx + 1} name`}
                  />
                  <textarea
                    className={styles.textarea}
                    placeholder="Short description"
                    value={project.description}
                    onChange={(e) => updateProject(section.key, idx, 'description', e.target.value)}
                    rows={2}
                    aria-label={`Project ${idx + 1} description`}
                  />
                  <input
                    type="url"
                    className={styles.input}
                    placeholder="https://github.com/you/project"
                    value={project.url}
                    onChange={(e) => updateProject(section.key, idx, 'url', e.target.value)}
                    aria-label={`Project ${idx + 1} URL`}
                  />
                </div>
              ))}

              <Button
                type="button"
                variant="ghost"
                size="sm"
                icon={<Plus size={14} />}
                onClick={() => addProject(section.key)}
              >
                Add project
              </Button>
            </fieldset>
          );
        }

        /* ---- links ---- */
        if (section.type === 'links') {
          const links = getLinks(section.key);
          return (
            <fieldset key={section.key} className={styles.fieldset}>
              <legend className={styles.legend}>
                {section.label}
                {section.required && <span className={styles.required} aria-hidden="true"> *</span>}
              </legend>

              {links.map((link, idx) => (
                <div key={idx} className={styles.repeatGroup}>
                  <div className={styles.repeatHeader}>
                    <span className={styles.repeatIndex}>Link {idx + 1}</span>
                    {links.length > 1 && (
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removeLink(section.key, idx)}
                        aria-label={`Remove link ${idx + 1}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <div className={styles.linkRow}>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Label (e.g. LinkedIn)"
                      value={link.label}
                      onChange={(e) => updateLink(section.key, idx, 'label', e.target.value)}
                      aria-label={`Link ${idx + 1} label`}
                    />
                    <input
                      type="url"
                      className={styles.input}
                      placeholder="https://..."
                      value={link.url}
                      onChange={(e) => updateLink(section.key, idx, 'url', e.target.value)}
                      aria-label={`Link ${idx + 1} URL`}
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="ghost"
                size="sm"
                icon={<Plus size={14} />}
                onClick={() => addLink(section.key)}
              >
                Add link
              </Button>
            </fieldset>
          );
        }

        return null;
      })}
    </form>
  );
}
