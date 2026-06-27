/**
 * Built-in README templates.
 *
 * In production these would be fetched from Sanity via GROQ:
 *   const templates = await client.fetch(`*[_type == "readmeTemplate"]{ ... }`)
 *
 * The local array uses the exact same shape so switching is a one-line change.
 */

import type { Template } from "./types";

export const templates: Template[] = [
  /* ---------------------------------------------------------------- */
  /*  1 — Minimal                                                      */
  /* ---------------------------------------------------------------- */
  {
    id: "minimal",
    title: "Minimal",
    description:
      "A clean, concise README with just the essentials: who you are, what you do, and how to reach you.",
    defaultTone: "direct",
    sections: [
      {
        key: "name",
        label: "Full Name",
        placeholder: "Jane Doe",
        required: true,
        type: "text",
      },
      {
        key: "role",
        label: "Role / Title",
        placeholder: "Full-Stack Developer",
        required: true,
        type: "text",
      },
      {
        key: "bio",
        label: "Short Bio",
        placeholder:
          "Passionate developer focused on building accessible web applications…",
        required: true,
        type: "textarea",
      },
      {
        key: "skills",
        label: "Key Skills",
        placeholder: "TypeScript, React, Node.js, PostgreSQL",
        required: true,
        type: "list",
      },
      {
        key: "contact",
        label: "Contact Links",
        placeholder: "Add your email, website, or social profiles",
        required: true,
        type: "links",
      },
    ],
    exampleOutput: `# Jane Doe — Full-Stack Developer

Passionate developer focused on building accessible web applications with modern JavaScript.

## Skills

- TypeScript
- React
- Node.js
- PostgreSQL

## Contact

- [Email](mailto:jane@example.com)
- [LinkedIn](https://linkedin.com/in/janedoe)
`,
  },

  /* ---------------------------------------------------------------- */
  /*  2 — Standard                                                     */
  /* ---------------------------------------------------------------- */
  {
    id: "standard",
    title: "Standard",
    description:
      "A well-rounded profile README with bio, skills, featured projects, and contact information.",
    defaultTone: "professional",
    sections: [
      {
        key: "name",
        label: "Full Name",
        placeholder: "Jane Doe",
        required: true,
        type: "text",
      },
      {
        key: "role",
        label: "Role / Title",
        placeholder: "Full-Stack Developer",
        required: true,
        type: "text",
      },
      {
        key: "bio",
        label: "About Me",
        placeholder:
          "Write 2–3 sentences about yourself, your background, and what drives you…",
        required: true,
        type: "textarea",
      },
      {
        key: "skills",
        label: "Key Skills",
        placeholder: "TypeScript, React, Node.js, PostgreSQL, Docker",
        required: true,
        type: "list",
      },
      {
        key: "projects",
        label: "Featured Projects",
        placeholder: "Add your best projects with a short description and link",
        required: false,
        type: "projects",
      },
      {
        key: "contact",
        label: "Contact & Social Links",
        placeholder: "Add your email, website, or social profiles",
        required: true,
        type: "links",
      },
      {
        key: "badges",
        label: "Badges / Stats",
        placeholder:
          "GitHub stats badge URL, shields.io badges, or any Markdown badge code",
        required: false,
        type: "textarea",
      },
    ],
    exampleOutput: `# Jane Doe — Full-Stack Developer

Building performant, accessible web applications with a focus on developer experience and clean architecture.

## 🛠 Skills

- TypeScript / JavaScript
- React & Next.js
- Node.js & Express
- PostgreSQL & Redis
- Docker & CI/CD

## 🚀 Projects

### Project Alpha
A real-time collaboration tool for remote teams.
[View Project →](https://github.com/janedoe/project-alpha)

### Data Viz Dashboard
Interactive analytics dashboard built with D3.js and React.
[View Project →](https://github.com/janedoe/data-viz)

## 📫 Contact

- [Email](mailto:jane@example.com)
- [LinkedIn](https://linkedin.com/in/janedoe)
- [Portfolio](https://janedoe.dev)
`,
  },

  /* ---------------------------------------------------------------- */
  /*  3 — Detailed                                                     */
  /* ---------------------------------------------------------------- */
  {
    id: "detailed",
    title: "Detailed",
    description:
      "A comprehensive README with all sections: bio, skills, projects, achievements, testimonials, and badges.",
    defaultTone: "professional",
    sections: [
      {
        key: "name",
        label: "Full Name",
        placeholder: "Jane Doe",
        required: true,
        type: "text",
      },
      {
        key: "role",
        label: "Role / Title",
        placeholder: "Senior Full-Stack Developer",
        required: true,
        type: "text",
      },
      {
        key: "bio",
        label: "About Me",
        placeholder:
          "Write a detailed introduction: background, expertise areas, what you're passionate about…",
        required: true,
        type: "textarea",
      },
      {
        key: "skills",
        label: "Technical Skills",
        placeholder:
          "TypeScript, React, Next.js, Node.js, PostgreSQL, Docker, AWS",
        required: true,
        type: "list",
      },
      {
        key: "projects",
        label: "Featured Projects",
        placeholder: "Add your best projects with description and link",
        required: true,
        type: "projects",
      },
      {
        key: "achievements",
        label: "Achievements & Metrics",
        placeholder:
          "Quantifiable achievements: 'Reduced load time by 40%', 'Led a team of 8 engineers'…",
        required: false,
        type: "textarea",
      },
      {
        key: "testimonials",
        label: "Testimonials",
        placeholder:
          '"Jane is an exceptional developer…" — CTO at TechCorp',
        required: false,
        type: "textarea",
      },
      {
        key: "currentWork",
        label: "Currently Working On",
        placeholder:
          "What are you building or learning right now?",
        required: false,
        type: "textarea",
      },
      {
        key: "contact",
        label: "Contact & Social Links",
        placeholder: "Add your email, website, or social profiles",
        required: true,
        type: "links",
      },
      {
        key: "badges",
        label: "Badges / GitHub Stats",
        placeholder:
          "Paste shields.io badge Markdown or GitHub stats widget URLs",
        required: false,
        type: "textarea",
      },
    ],
    exampleOutput: `# Jane Doe — Senior Full-Stack Developer

Full-stack engineer with 8+ years of experience building scalable web applications. Passionate about performance, accessibility, and developer tooling.

## 🛠 Technical Skills

- TypeScript / JavaScript
- React, Next.js, Vue
- Node.js, Express, Fastify
- PostgreSQL, MongoDB, Redis
- Docker, Kubernetes, AWS
- CI/CD, GitHub Actions

## 🚀 Featured Projects

### Project Alpha
A real-time collaboration platform serving 10K+ daily active users.
[View Project →](https://github.com/janedoe/project-alpha)

### Open-Source CLI Tool
A developer productivity CLI with 2K+ GitHub stars.
[View Project →](https://github.com/janedoe/cli-tool)

## 📊 Achievements

- Reduced application load time by 40% through code-splitting and caching strategies
- Led a cross-functional team of 8 engineers to deliver a major product launch
- Speaker at ReactConf 2024

## 💬 Testimonials

> "Jane is an exceptional developer who consistently delivers high-quality work." — CTO at TechCorp

## 🔭 Currently Working On

Building an open-source design system and contributing to the Next.js ecosystem.

## 📫 Contact

- [Email](mailto:jane@example.com)
- [LinkedIn](https://linkedin.com/in/janedoe)
- [Twitter](https://twitter.com/janedoe)
- [Portfolio](https://janedoe.dev)
`,
  },
];
