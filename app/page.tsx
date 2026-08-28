"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { templates } from "@/lib/templates";
import { generateMarkdown } from "@/lib/generate-markdown";
import { PROFILE_PRESETS } from "@/lib/presets";
import { DEFAULT_WIDGETS_CONFIG } from "@/lib/github-widgets";
import { TECH_BADGES } from "@/lib/badge-catalog";
import type {
  FormData,
  Tone,
  DetailLevel,
  ProjectEntry,
  LinkEntry,
  BadgeStyle,
  GitHubWidgetsConfig,
  AIAction,
} from "@/lib/types";
import { ProfileForm } from "./components/generator/profile-form";
import { LivePreview } from "./components/generator/live-preview";
import { AIAssistantModal } from "./components/generator/ai-assistant-modal";
import { Modal } from "./components/shared/modal";
import { Button } from "./components/ui/button/button";
import { useToast } from "./components/shared/toast";
import { Sparkles, RotateCcw, FileText } from "lucide-react";
import styles from "./page.module.css";

const STORAGE_KEY = "readme_profile_data_v2";

const defaultFormData: FormData = {
  name: "",
  role: "",
  bio: "",
  skills: "",
  projects: [{ name: "", description: "", url: "" }],
  contact: [
    { label: "GitHub", url: "" },
    { label: "LinkedIn", url: "" },
  ],
};

export default function Home() {
  const { success, info } = useToast();

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [tone] = useState<Tone>("professional");
  const [detailLevel] = useState<DetailLevel>("concise");
  const [selectedBadges, setSelectedBadges] = useState<string[]>([
    "typescript",
    "react",
    "nextjs",
    "nodejs",
    "tailwind",
  ]);
  const [badgeStyle, setBadgeStyle] = useState<BadgeStyle>("for-the-badge");
  const [widgets, setWidgets] = useState<GitHubWidgetsConfig>(DEFAULT_WIDGETS_CONFIG);

  // Modals state
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiAction, setAiAction] = useState<AIAction>("enhance-bio");
  const [aiInitialText, setAiInitialText] = useState("");
  const [resetModalOpen, setResetModalOpen] = useState(false);

  /* Autosave in localStorage */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formData) setFormData(parsed.formData);
        if (Array.isArray(parsed.selectedBadges)) setSelectedBadges(parsed.selectedBadges);
        if (parsed.badgeStyle) setBadgeStyle(parsed.badgeStyle);
        if (parsed.widgets) setWidgets(parsed.widgets);
      }
    } catch (e) {
      console.warn("Autosave load error:", e);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const payload = {
          formData,
          selectedBadges,
          badgeStyle,
          widgets,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (e) {
        console.warn("Autosave write error:", e);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [formData, selectedBadges, badgeStyle, widgets]);

  /* Handlers */
  const handleLoadExample = useCallback(() => {
    const preset = PROFILE_PRESETS[0];
    setFormData(preset.data);
    setSelectedBadges(preset.selectedBadges);
    setBadgeStyle(preset.badgeStyle);
    setWidgets(preset.widgets);
    success("Exemple chargé !", "Le profil a été pré-rempli avec des données réelles.");
  }, [success]);

  const handleConfirmReset = useCallback(() => {
    setFormData(defaultFormData);
    setSelectedBadges([]);
    setWidgets(DEFAULT_WIDGETS_CONFIG);
    localStorage.removeItem(STORAGE_KEY);
    setResetModalOpen(false);
    info("Formulaire réinitialisé");
  }, [info]);

  const handleOpenAI = useCallback((action: AIAction = "enhance-bio", initialText = "") => {
    setAiAction(action);
    setAiInitialText(initialText);
    setAiModalOpen(true);
  }, []);

  const handleApplyAI = useCallback(
    (action: AIAction, result: string | string[]) => {
      if (action === "enhance-bio" && typeof result === "string") {
        setFormData((prev) => ({ ...prev, bio: result }));
      } else if (action === "enhance-project" && typeof result === "string") {
        setFormData((prev) => {
          const currentProjects = (prev.projects as ProjectEntry[]) || [];
          if (currentProjects.length > 0) {
            const next = [...currentProjects];
            next[0] = { ...next[0], description: result };
            return { ...prev, projects: next };
          }
          return prev;
        });
      } else if (action === "suggest-skills" && Array.isArray(result)) {
        const skillsString = result.join(", ");
        setFormData((prev) => ({
          ...prev,
          skills: prev.skills ? `${prev.skills}, ${skillsString}` : skillsString,
        }));

        const matchedBadgeIds = result
          .map((s) => {
            const normalized = s.toLowerCase().trim();
            return TECH_BADGES.find(
              (b) =>
                b.name.toLowerCase() === normalized ||
                b.slug.toLowerCase() === normalized
            )?.id;
          })
          .filter((id): id is string => Boolean(id));

        if (matchedBadgeIds.length > 0) {
          setSelectedBadges((prev) => Array.from(new Set([...prev, ...matchedBadgeIds])));
        }
      }
    },
    []
  );

  /* Generated Markdown */
  const markdown = useMemo(
    () =>
      generateMarkdown(
        templates[1], // clean standard template
        formData,
        { tone, detailLevel },
        { selectedBadges, badgeStyle, widgets }
      ),
    [formData, tone, detailLevel, selectedBadges, badgeStyle, widgets]
  );

  return (
    <div className={styles.workspace}>
      {/* Top Workspace Header */}
      <header className={styles.workspaceHeader}>
        <div className={styles.brandTitle}>
          <FileText size={20} className={styles.brandIcon} />
          <h1>Générateur de README GitHub</h1>
        </div>

        <div className={styles.headerButtons}>
          <button
            type="button"
            className={styles.exampleBtn}
            onClick={handleLoadExample}
          >
            <Sparkles size={15} /> Remplir avec un exemple
          </button>

          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => setResetModalOpen(true)}
          >
            <RotateCcw size={15} /> Vider
          </button>
        </div>
      </header>

      {/* 2-Column Workstation */}
      <main className={styles.workstationGrid}>
        {/* Left: Input Form */}
        <section className={styles.formColumn}>
          <ProfileForm
            template={templates[1]}
            data={formData}
            onChange={setFormData}
            selectedBadges={selectedBadges}
            badgeStyle={badgeStyle}
            onBadgesChange={setSelectedBadges}
            onBadgeStyleChange={setBadgeStyle}
            widgets={widgets}
            onWidgetsChange={setWidgets}
            onOpenAI={handleOpenAI}
          />
        </section>

        {/* Right: Live Preview */}
        <section className={styles.previewColumn}>
          <LivePreview markdown={markdown} />
        </section>
      </main>

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialAction={aiAction}
        initialText={aiInitialText}
        role={(formData.role as string) || "Développeur Full-Stack"}
        tone={tone}
        onApply={handleApplyAI}
      />

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Vider le formulaire ?"
        subtitle="Cette action efface tous les champs saisis pour repartir de zéro."
        maxWidth="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setResetModalOpen(false)}>
              Annuler
            </Button>
            <Button variant="primary" onClick={handleConfirmReset}>
              Oui, vider tout
            </Button>
          </>
        }
      >
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "0.9375rem" }}>
          Êtes-vous sûr de vouloir réinitialiser tous les champs ?
        </p>
      </Modal>
    </div>
  );
}
