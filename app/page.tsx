"use client";

import { useState, useCallback, useMemo } from "react";
import { templates } from "@/lib/templates";
import { generateMarkdown } from "@/lib/generate-markdown";
import type {
  FormData,
  Tone,
  DetailLevel,
  Template,
  ProjectEntry,
  LinkEntry,
} from "@/lib/types";
import { TemplateSelector } from "./components/generator/template-selector";
import { ProfileForm } from "./components/generator/profile-form";
import { LivePreview } from "./components/generator/live-preview";
import { Controls } from "./components/generator/controls";
import styles from "./page.module.css";

/**
 * Initialise empty form data for a given template.
 * Each section gets a default value matching its type.
 */
function initFormData(template: Template): FormData {
  const data: FormData = {};
  for (const section of template.sections) {
    switch (section.type) {
      case "text":
      case "textarea":
      case "list":
        data[section.key] = "";
        break;
      case "projects":
        data[section.key] = [{ name: "", description: "", url: "" }] as ProjectEntry[];
        break;
      case "links":
        data[section.key] = [{ label: "", url: "" }] as LinkEntry[];
        break;
    }
  }
  return data;
}

export default function Home() {
  /* ---------------------------------------------------------------- */
  /*  State                                                            */
  /* ---------------------------------------------------------------- */

  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id);
  const [formData, setFormData] = useState<FormData>(() =>
    initFormData(templates[0])
  );
  const [tone, setTone] = useState<Tone>(templates[0].defaultTone);
  const [detailLevel, setDetailLevel] = useState<DetailLevel>("concise");

  const selectedTemplate = useMemo(
    () => templates.find((t) => t.id === selectedTemplateId) ?? templates[0],
    [selectedTemplateId]
  );

  /* ---------------------------------------------------------------- */
  /*  Handlers                                                         */
  /* ---------------------------------------------------------------- */

  const handleTemplateSelect = useCallback(
    (id: string) => {
      setSelectedTemplateId(id);
      const tmpl = templates.find((t) => t.id === id) ?? templates[0];
      setFormData(initFormData(tmpl));
      setTone(tmpl.defaultTone);
    },
    []
  );

  const handleFormChange = useCallback((data: FormData) => {
    setFormData(data);
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Generated markdown                                               */
  /* ---------------------------------------------------------------- */

  const markdown = useMemo(
    () =>
      generateMarkdown(selectedTemplate, formData, { tone, detailLevel }),
    [selectedTemplate, formData, tone, detailLevel]
  );

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Profile README Generator</h1>
        <p className={styles.heroSubtitle}>
          Create a professional GitHub profile README in seconds.
          Choose a template, fill in your details, and export.
        </p>
      </section>

      {/* Template selection */}
      <section className={styles.section}>
        <TemplateSelector
          templates={templates}
          selectedId={selectedTemplateId}
          onSelect={handleTemplateSelect}
        />
      </section>

      {/* Controls */}
      <section className={styles.section}>
        <Controls
          tone={tone}
          detailLevel={detailLevel}
          onToneChange={setTone}
          onDetailChange={setDetailLevel}
          markdown={markdown}
        />
      </section>

      {/* Editor: form + preview side-by-side */}
      <section className={styles.editorSection}>
        <div className={styles.editorGrid}>
          <div className={styles.formPanel}>
            <h2 className={styles.panelHeading}>Your Details</h2>
            <ProfileForm
              template={selectedTemplate}
              data={formData}
              onChange={handleFormChange}
            />
          </div>
          <div className={styles.previewPanel}>
            <h2 className={styles.panelHeading}>Preview</h2>
            <LivePreview markdown={markdown} />
          </div>
        </div>
      </section>
    </div>
  );
}
