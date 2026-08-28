'use client';

import { CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { Modal } from '../shared/modal';
import { Button } from '../ui/button/button';
import styles from './github-guide.module.css';

interface GitHubGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GitHubGuideModal({ isOpen, onClose }: GitHubGuideModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="How to publish your GitHub Profile README"
      subtitle="Follow these 4 simple steps to display this README directly on your GitHub profile."
      maxWidth="lg"
      footer={
        <Button variant="primary" onClick={onClose}>
          Got it!
        </Button>
      }
    >
      <div className={styles.stepsList}>
        {/* Step 1 */}
        <div className={styles.stepItem}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <h4 className={styles.stepTitle}>Create a Special Repository</h4>
            <p className={styles.stepDesc}>
              Head over to GitHub and create a new repository whose name matches your <strong>GitHub username</strong> exactly (e.g. <code>github.com/new</code>).
            </p>
            <a
              href="https://github.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalLink}
            >
              <ExternalLink size={14} /> Open GitHub New Repository
            </a>
          </div>
        </div>

        {/* Step 2 */}
        <div className={styles.stepItem}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <h4 className={styles.stepTitle}>Make it Public with a README</h4>
            <p className={styles.stepDesc}>
              Ensure the repository is set to <strong>Public</strong> and check the box <strong>&ldquo;Add a README file&rdquo;</strong>. GitHub will display a special cat badge confirming it is a profile repository.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className={styles.stepItem}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepContent}>
            <h4 className={styles.stepTitle}>Copy & Paste Your Markdown</h4>
            <p className={styles.stepDesc}>
              Click <strong>&ldquo;Copy&rdquo;</strong> in this generator, edit the <code>README.md</code> in your GitHub repo, and paste the entire Markdown content.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className={styles.stepItem}>
          <div className={styles.stepNumber}>4</div>
          <div className={styles.stepContent}>
            <h4 className={styles.stepTitle}>Commit Changes & Celebrate!</h4>
            <p className={styles.stepDesc}>
              Click <strong>Commit changes</strong>. Visit your GitHub profile at <code>https://github.com/your-username</code> to see your brand new professional profile live!
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
