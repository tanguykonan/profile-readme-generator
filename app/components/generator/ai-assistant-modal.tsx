'use client';

import { useState } from 'react';
import { Sparkles, Check, RefreshCw, Wand2 } from 'lucide-react';
import type { AIAction, Tone } from '@/lib/types';
import { Modal } from '../shared/modal';
import { Button } from '../ui/button/button';
import { useToast } from '../shared/toast';
import styles from './ai-assistant.module.css';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAction?: AIAction;
  initialText?: string;
  role?: string;
  tone?: Tone;
  onApply: (action: AIAction, result: string | string[]) => void;
}

export function AIAssistantModal({
  isOpen,
  onClose,
  initialAction = 'enhance-bio',
  initialText = '',
  role = 'Développeur Full-Stack',
  tone = 'professional',
  onApply,
}: AIAssistantModalProps) {
  const [action, setAction] = useState<AIAction>(initialAction);
  const [inputRole, setInputRole] = useState(role);
  const [inputText, setInputText] = useState(initialText);
  const [selectedTone, setSelectedTone] = useState<Tone>(tone);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | string[] | null>(null);

  const { success, error } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          text: inputText,
          role: inputRole,
          tone: selectedTone,
        }),
      });

      if (!res.ok) {
        throw new Error(`Erreur serveur (${res.status})`);
      }

      const data = await res.json();
      if (data.success) {
        setResult(data.result);
        success('Génération réussie !');
      } else {
        throw new Error(data.error || 'Impossible de générer le texte');
      }
    } catch (err) {
      error('Échec de la génération', err instanceof Error ? err.message : 'Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (result !== null) {
      onApply(action, result);
      onClose();
      success('Appliqué à votre profil !');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assistant de Rédaction IA"
      subtitle="Améliorez rapidement votre bio ou obtenez des suggestions pertinentes."
      maxWidth="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          {result !== null ? (
            <Button variant="primary" icon={<Check size={16} />} onClick={handleApply}>
              Insérer dans le profil
            </Button>
          ) : (
            <Button
              variant="primary"
              icon={<Sparkles size={16} />}
              loading={loading}
              onClick={handleGenerate}
            >
              Générer
            </Button>
          )}
        </>
      }
    >
      <div className={styles.modalContent}>
        {/* Action tabs */}
        <div className={styles.tabList} role="tablist">
          <button
            type="button"
            className={[styles.tabBtn, action === 'enhance-bio' ? styles.tabActive : ''].join(' ')}
            onClick={() => {
              setAction('enhance-bio');
              setResult(null);
            }}
          >
            <Sparkles size={14} /> Améliorer la Bio
          </button>
          <button
            type="button"
            className={[styles.tabBtn, action === 'suggest-skills' ? styles.tabActive : ''].join(' ')}
            onClick={() => {
              setAction('suggest-skills');
              setResult(null);
            }}
          >
            <Wand2 size={14} /> Suggérer des compétences
          </button>
          <button
            type="button"
            className={[styles.tabBtn, action === 'enhance-project' ? styles.tabActive : ''].join(' ')}
            onClick={() => {
              setAction('enhance-project');
              setResult(null);
            }}
          >
            <RefreshCw size={14} /> Améliorer un projet
          </button>
        </div>

        {/* Input Parameters */}
        <div className={styles.formSection}>
          <div className={styles.fieldRow}>
            <div className={styles.fieldCol}>
              <label htmlFor="ai-role" className={styles.label}>
                Votre rôle / Spécialité
              </label>
              <input
                id="ai-role"
                type="text"
                value={inputRole}
                onChange={(e) => setInputRole(e.target.value)}
                placeholder="ex. Lead Developer Frontend"
                className={styles.input}
              />
            </div>

            <div className={styles.fieldCol}>
              <label htmlFor="ai-tone" className={styles.label}>
                Ton
              </label>
              <select
                id="ai-tone"
                value={selectedTone}
                onChange={(e) => setSelectedTone(e.target.value as Tone)}
                className={styles.select}
              >
                <option value="professional">Professionnel</option>
                <option value="direct">Direct & Percutant</option>
                <option value="creative">Créatif</option>
              </select>
            </div>
          </div>

          {action !== 'suggest-skills' && (
            <div className={styles.fieldGroup}>
              <label htmlFor="ai-text" className={styles.label}>
                {action === 'enhance-bio' ? 'Votre texte actuel ou brouillon' : 'Description brute du projet'}
              </label>
              <textarea
                id="ai-text"
                rows={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  action === 'enhance-bio'
                    ? 'Écrivez quelques mots sur vous ou votre parcours...'
                    : 'Expliquez ce que fait votre projet, les technologies utilisées...'
                }
                className={styles.textarea}
              />
            </div>
          )}
        </div>

        {/* Result Area */}
        {result !== null && (
          <div className={styles.resultBox}>
            <div className={styles.resultHeader}>
              <span className={styles.resultTitle}>
                <Sparkles size={14} /> Proposition générée
              </span>
            </div>

            {Array.isArray(result) ? (
              <div className={styles.skillsTagList}>
                {result.map((s, idx) => (
                  <span key={idx} className={styles.skillTag}>
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <div className={styles.resultText}>{result}</div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
