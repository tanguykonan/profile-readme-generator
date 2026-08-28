/**
 * Tech Badges Catalog & Shields.io Markdown Generator.
 *
 * Provides a comprehensive list of 80+ popular technologies with official
 * SimpleIcons slugs, brand colors, and Shields.io URL builders.
 */

import type { TechBadge, BadgeCategory, BadgeStyle } from "./types";

export const BADGE_CATEGORIES: { id: BadgeCategory; label: string }[] = [
  { id: "languages", label: "Languages" },
  { id: "frontend", label: "Frontend & UI" },
  { id: "backend", label: "Backend & Frameworks" },
  { id: "database", label: "Databases & ORM" },
  { id: "cloud_devops", label: "Cloud & DevOps" },
  { id: "tools_os", label: "Tools & OS" },
  { id: "ai_data", label: "AI & Data Science" },
];

export const TECH_BADGES: TechBadge[] = [
  /* ---------------- Languages ---------------- */
  { id: "typescript", name: "TypeScript", category: "languages", slug: "typescript", color: "3178C6", logoColor: "white" },
  { id: "javascript", name: "JavaScript", category: "languages", slug: "javascript", color: "F7DF1E", logoColor: "black" },
  { id: "python", name: "Python", category: "languages", slug: "python", color: "3776AB", logoColor: "white" },
  { id: "rust", name: "Rust", category: "languages", slug: "rust", color: "000000", logoColor: "white" },
  { id: "go", name: "Go", category: "languages", slug: "go", color: "00ADD8", logoColor: "white" },
  { id: "java", name: "Java", category: "languages", slug: "openjdk", color: "ED8B00", logoColor: "white" },
  { id: "cplusplus", name: "C++", category: "languages", slug: "cplusplus", color: "00599C", logoColor: "white" },
  { id: "csharp", name: "C#", category: "languages", slug: "csharp", color: "239120", logoColor: "white" },
  { id: "php", name: "PHP", category: "languages", slug: "php", color: "777BB4", logoColor: "white" },
  { id: "ruby", name: "Ruby", category: "languages", slug: "ruby", color: "CC342D", logoColor: "white" },
  { id: "swift", name: "Swift", category: "languages", slug: "swift", color: "F05138", logoColor: "white" },
  { id: "kotlin", name: "Kotlin", category: "languages", slug: "kotlin", color: "7F52FF", logoColor: "white" },
  { id: "html5", name: "HTML5", category: "languages", slug: "html5", color: "E34F26", logoColor: "white" },
  { id: "css3", name: "CSS3", category: "languages", slug: "css3", color: "1572B6", logoColor: "white" },
  { id: "sql", name: "SQL", category: "languages", slug: "sqlite", color: "003B57", logoColor: "white" },

  /* ---------------- Frontend ---------------- */
  { id: "react", name: "React", category: "frontend", slug: "react", color: "61DAFB", logoColor: "black" },
  { id: "nextjs", name: "Next.js", category: "frontend", slug: "nextdotjs", color: "000000", logoColor: "white" },
  { id: "vuejs", name: "Vue.js", category: "frontend", slug: "vuedotjs", color: "4FC08D", logoColor: "white" },
  { id: "nuxt", name: "Nuxt.js", category: "frontend", slug: "nuxtdotjs", color: "00DC82", logoColor: "white" },
  { id: "angular", name: "Angular", category: "frontend", slug: "angular", color: "DD0031", logoColor: "white" },
  { id: "svelte", name: "Svelte", category: "frontend", slug: "svelte", color: "FF3E00", logoColor: "white" },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", slug: "tailwindcss", color: "06B6D4", logoColor: "white" },
  { id: "sass", name: "Sass", category: "frontend", slug: "sass", color: "CC6699", logoColor: "white" },
  { id: "astro", name: "Astro", category: "frontend", slug: "astro", color: "BC52EE", logoColor: "white" },
  { id: "remix", name: "Remix", category: "frontend", slug: "remix", color: "000000", logoColor: "white" },
  { id: "redux", name: "Redux", category: "frontend", slug: "redux", color: "764ABC", logoColor: "white" },
  { id: "figma", name: "Figma", category: "frontend", slug: "figma", color: "F24E1E", logoColor: "white" },
  { id: "shadcn", name: "shadcn/ui", category: "frontend", slug: "shadcnui", color: "000000", logoColor: "white" },

  /* ---------------- Backend ---------------- */
  { id: "nodejs", name: "Node.js", category: "backend", slug: "nodedotjs", color: "5FA04E", logoColor: "white" },
  { id: "express", name: "Express", category: "backend", slug: "express", color: "000000", logoColor: "white" },
  { id: "nestjs", name: "NestJS", category: "backend", slug: "nestjs", color: "E0234E", logoColor: "white" },
  { id: "fastapi", name: "FastAPI", category: "backend", slug: "fastapi", color: "009688", logoColor: "white" },
  { id: "django", name: "Django", category: "backend", slug: "django", color: "092E20", logoColor: "white" },
  { id: "flask", name: "Flask", category: "backend", slug: "flask", color: "000000", logoColor: "white" },
  { id: "spring", name: "Spring Boot", category: "backend", slug: "springboot", color: "6DB33F", logoColor: "white" },
  { id: "laravel", name: "Laravel", category: "backend", slug: "laravel", color: "FF2D20", logoColor: "white" },
  { id: "dotnet", name: ".NET", category: "backend", slug: "dotnet", color: "512BD4", logoColor: "white" },
  { id: "graphql", name: "GraphQL", category: "backend", slug: "graphql", color: "E10098", logoColor: "white" },
  { id: "apollo", name: "Apollo GraphQL", category: "backend", slug: "apollographql", color: "311C87", logoColor: "white" },
  { id: "trpc", name: "tRPC", category: "backend", slug: "trpc", color: "2596BE", logoColor: "white" },
  { id: "grpc", name: "gRPC", category: "backend", slug: "grpc", color: "244C5A", logoColor: "white" },

  /* ---------------- Databases ---------------- */
  { id: "postgresql", name: "PostgreSQL", category: "database", slug: "postgresql", color: "4169E1", logoColor: "white" },
  { id: "mongodb", name: "MongoDB", category: "database", slug: "mongodb", color: "47A248", logoColor: "white" },
  { id: "mysql", name: "MySQL", category: "database", slug: "mysql", color: "4479A1", logoColor: "white" },
  { id: "redis", name: "Redis", category: "database", slug: "redis", color: "DC382D", logoColor: "white" },
  { id: "prisma", name: "Prisma", category: "database", slug: "prisma", color: "2D3748", logoColor: "white" },
  { id: "drizzle", name: "Drizzle ORM", category: "database", slug: "drizzle", color: "C5F74F", logoColor: "black" },
  { id: "supabase", name: "Supabase", category: "database", slug: "supabase", color: "3ECF8E", logoColor: "white" },
  { id: "firebase", name: "Firebase", category: "database", slug: "firebase", color: "FFCA28", logoColor: "black" },
  { id: "sqlite", name: "SQLite", category: "database", slug: "sqlite", color: "003B57", logoColor: "white" },
  { id: "elasticsearch", name: "Elasticsearch", category: "database", slug: "elasticsearch", color: "005571", logoColor: "white" },

  /* ---------------- Cloud & DevOps ---------------- */
  { id: "docker", name: "Docker", category: "cloud_devops", slug: "docker", color: "2496ED", logoColor: "white" },
  { id: "kubernetes", name: "Kubernetes", category: "cloud_devops", slug: "kubernetes", color: "326CE5", logoColor: "white" },
  { id: "aws", name: "AWS", category: "cloud_devops", slug: "amazonwebservices", color: "232F3E", logoColor: "white" },
  { id: "gcp", name: "Google Cloud", category: "cloud_devops", slug: "googlecloud", color: "4285F4", logoColor: "white" },
  { id: "azure", name: "Microsoft Azure", category: "cloud_devops", slug: "microsoftazure", color: "0078D4", logoColor: "white" },
  { id: "vercel", name: "Vercel", category: "cloud_devops", slug: "vercel", color: "000000", logoColor: "white" },
  { id: "cloudflare", name: "Cloudflare", category: "cloud_devops", slug: "cloudflare", color: "F38020", logoColor: "white" },
  { id: "githubactions", name: "GitHub Actions", category: "cloud_devops", slug: "githubactions", color: "2088FF", logoColor: "white" },
  { id: "terraform", name: "Terraform", category: "cloud_devops", slug: "terraform", color: "7B42BC", logoColor: "white" },
  { id: "ansible", name: "Ansible", category: "cloud_devops", slug: "ansible", color: "EE0000", logoColor: "white" },
  { id: "nginx", name: "Nginx", category: "cloud_devops", slug: "nginx", color: "009639", logoColor: "white" },
  { id: "linux", name: "Linux", category: "cloud_devops", slug: "linux", color: "FCC624", logoColor: "black" },

  /* ---------------- Tools & OS ---------------- */
  { id: "git", name: "Git", category: "tools_os", slug: "git", color: "F05032", logoColor: "white" },
  { id: "github", name: "GitHub", category: "tools_os", slug: "github", color: "181717", logoColor: "white" },
  { id: "gitlab", name: "GitLab", category: "tools_os", slug: "gitlab", color: "FC6D26", logoColor: "white" },
  { id: "vscode", name: "VS Code", category: "tools_os", slug: "visualstudiocode", color: "007ACC", logoColor: "white" },
  { id: "postman", name: "Postman", category: "tools_os", slug: "postman", color: "FF6C37", logoColor: "white" },
  { id: "jest", name: "Jest", category: "tools_os", slug: "jest", color: "C21325", logoColor: "white" },
  { id: "cypress", name: "Cypress", category: "tools_os", slug: "cypress", color: "69D3A7", logoColor: "white" },
  { id: "playwright", name: "Playwright", category: "tools_os", slug: "playwright", color: "2EAD33", logoColor: "white" },
  { id: "vite", name: "Vite", category: "tools_os", slug: "vite", color: "646CFF", logoColor: "white" },
  { id: "webpack", name: "Webpack", category: "tools_os", slug: "webpack", color: "8DD6F9", logoColor: "black" },

  /* ---------------- AI & Data Science ---------------- */
  { id: "openai", name: "OpenAI", category: "ai_data", slug: "openai", color: "412991", logoColor: "white" },
  { id: "pytorch", name: "PyTorch", category: "ai_data", slug: "pytorch", color: "EE4C2C", logoColor: "white" },
  { id: "tensorflow", name: "TensorFlow", category: "ai_data", slug: "tensorflow", color: "FF6F00", logoColor: "white" },
  { id: "pandas", name: "Pandas", category: "ai_data", slug: "pandas", color: "150458", logoColor: "white" },
  { id: "numpy", name: "NumPy", category: "ai_data", slug: "numpy", color: "013243", logoColor: "white" },
  { id: "scikit", name: "Scikit-Learn", category: "ai_data", slug: "scikitlearn", color: "F7931E", logoColor: "white" },
  { id: "huggingface", name: "Hugging Face", category: "ai_data", slug: "huggingface", color: "FFD21E", logoColor: "black" },
  { id: "langchain", name: "LangChain", category: "ai_data", slug: "langchain", color: "1C3C3C", logoColor: "white" },
];

/**
 * Builds the Shields.io URL for a given badge and visual style.
 */
export function generateBadgeUrl(badge: TechBadge, style: BadgeStyle = "for-the-badge"): string {
  const formattedName = encodeURIComponent(badge.name);
  return `https://img.shields.io/badge/${formattedName}-${badge.color}?style=${style}&logo=${badge.slug}&logoColor=${badge.logoColor}`;
}

/**
 * Builds the Markdown string for a single badge image.
 */
export function generateBadgeMarkdown(badge: TechBadge, style: BadgeStyle = "for-the-badge"): string {
  const url = generateBadgeUrl(badge, style);
  return `![${badge.name}](${url})`;
}

/**
 * Filters the badge catalog by search keyword and category.
 */
export function searchBadges(query: string, category?: BadgeCategory): TechBadge[] {
  let list = TECH_BADGES;

  if (category) {
    list = list.filter((b) => b.category === category);
  }

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    list = list.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.slug.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
  }

  return list;
}
