Titre: Prompt de conception — Générateur de README profil professionnel

Contexte
Ce prompt décrit précisément les exigences pour développer une application web (Next.js) qui génère des README de profil professionnel à partir d'entrées utilisateur et d'un moteur IA. Le projet utilisera GROQ pour interroger des templates / contenus (ex. Sanity) mais reste un service simple : pas d'authentification utilisateur ni de backend complet. L'utilisateur final doit pouvoir saisir ses informations, visualiser un aperçu et copier/télécharger le README en Markdown.

Objectif
- Fournir un brief clair et exécutable pour implémenter une application Next.js moderne, accessible et performante qui :
  - Permet de générer un README Markdown professionnel et prêt à copier
  - Offre une interface responsive, mode clair/sombre, sans thème "générique IA"
  - Utilise GROQ pour récupérer templates/boilerplates
  - Évite tout système d'authentification ou gestion d'utilisateurs

Contraintes principales
- Pas de système de login ni de stockage privé d'utilisateurs.
- L'app produit un fichier Markdown qu'on peut copier ou télécharger.
- Respecter les conventions recommandées par Next.js (App Router, Server Components, rendu statique/ISR quand pertinent).
- Interface moderne et professionnelle (pas de couleurs « IA » génériques).
- Priorité sur performance, accessibilité (WCAG) et SEO.

Fonctionnalités requises
- Page principale : formulaire guidé pour saisir sections du README (bio, rôle, compétences, projets, contact, badges, liens sociaux, CTA).
- Aperçu en temps réel du README (render Markdown côté client).
- Templates multiples paramétrables (récupérés via GROQ).
- Boutons : "Copier le Markdown", "Télécharger .md", "Exporter HTML" (optionnel).
- Mode sombre/clair, bascule persistante (localStorage).
- Option pour choisir niveau de détail (concise / complète) et ton (professionnel, direct, créatif).

UX / UI
- Design : moderne, neutre, typographie lisible, espace aéré, composants UI cohérents.
- Palette : neutre + accent configurable (éviter les gradients/éclairages « IA » stéréotypés).
- Responsive : mobile-first, adaptatif pour tablette et desktop.
- Accessibilité : éléments cliquables focusables, labels explicites, contraste conforme WCAG AA.

Architecture recommandée (Next.js)
- Utiliser App Router (routes sous `app/`).
- Server Components pour récupération initiale des templates via GROQ (fetch au build ou via route server-side).
- Client Components pour le formulaire, l'aperçu en direct et les actions (copier/télécharger).
- Génération :
  - Templates statiques (SSG) si rarement modifiés.
  - ISR ou revalidation si les templates évoluent dans le CMS.
- Utiliser les API Routes ou Server Actions légères uniquement pour opérations qui nécessitent serveur (ex. génération heavy), mais privilégier traitement côté client + modèle IA via un service externe si nécessaire.
- Configurer caching HTTP et en-têtes pour optimiser performances.

Intégration GROQ (Sanity)
- Usage attendu : récupérer la liste de templates et leurs champs par GROQ.
- Exemple de schéma de template (Sanity) :
  - id: string
  - title: string
  - description: string
  - sections: [{key: string, label: string, placeholder: string, required: boolean}]
  - defaultTone: string
  - exampleOutput: text

Composants clés
- `TemplateList` : affiche et sélectionne templates.
- `ProfileForm` : collecte inputs (server ou client selon besoin).
- `LivePreview` : affiche Markdown rendu (client-side) avec rendu sécurisé.
- `Controls` : mode clair/sombre, copier/télécharger, réglages de ton/détail.
- `Layout` : header minimal + footer, responsive.

Performance & SEO
- Privilégier SSG pour pages publiques (landing, templates list).
- Utiliser `next/image` pour optimiser images (si utilisées).
- Précharger polices critiques et minimiser CSS critique.
- Minimiser bundle JS : code-splitting, lazy-loading du renderer Markdown.

Qualité, tests et accessibilité
- Tests unitaires pour composants majeurs (React Testing Library).
- Tests d'intégration sommaires (ex. génération Markdown complète à partir d'un set d'inputs).
- Audit a11y (axe-core) et corrections documentées.

Format attendu du README généré (template Markdown)
- Sections recommandées et ordre :
  1. Titre (nom + rôle)
  2. Brève présentation (1–3 phrases)
  3. Compétences clés (liste courte)
  4. Expériences / Projets (titre + description + liens)
  5. Témoignages / Réalisations mesurables (facultatif)
  6. Contact & liens (email, site, réseaux)
  7. Badges / Statistiques (facultatif)

Prompt IA (exemple pour produire le Markdown final)
"Génère un README Markdown professionnel et concis en respectant ce modèle :
Titre : {{name}} — {{role}}
Résumé : 2–3 phrases qui mettent en avant compétences et valeur
Compétences : liste à puces
Projets : pour chaque projet inclure 'Nom — brève description — lien'
Contact : lister les moyens de contact
Utilise le ton {{tone}} et limite la longueur à {{length}}." 

Livrables & Critères d'acceptation
- Code source Next.js, structure propre et commentée.
- Fichier `prompt.md` (ce document).
- Démo fonctionnelle locale : app démarre et permet de : sélectionner template, remplir données, voir aperçu, copier/télécharger Markdown.
- Tests unitaires basiques et audit a11y minimal.

Notes finales pour le développeur
- Ne pas implémenter d'authentification : l'app est un outil public/one-shot.
- Documenter clairement comment ajouter/modifier templates dans le CMS (GROQ).
- Fournir instructions d'exécution et script `npm run dev` et `npm run build` dans le README du projet.

---
Si tu veux, je peux maintenant :
- scaffolder l'architecture Next.js recommandée (fichiers `app/`, components),
- produire le composant `ProfileForm` + `LivePreview`, ou
- générer les requêtes GROQ d'exemple à utiliser avec Sanity.
Indique ta préférence.
