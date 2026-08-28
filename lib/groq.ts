/**
 * GROQ integration layer for Sanity CMS templates.
 *
 * This module provides standard GROQ queries and fetching helpers to retrieve
 * templates dynamically from a Sanity CMS instance, with automatic fallback
 * to local templates when CMS credentials are not configured.
 */

import { templates as localTemplates } from "./templates";
import type { Template } from "./types";

/**
 * Standard GROQ query to retrieve all active README templates
 * ordered by their display priority.
 */
export const TEMPLATES_GROQ_QUERY = `*[_type == "readmeTemplate"] | order(order asc) {
  "id": _id,
  title,
  description,
  defaultTone,
  exampleOutput,
  sections[] {
    key,
    label,
    placeholder,
    required,
    type
  }
}`;

/**
 * GROQ query to retrieve a single template by its identifier.
 */
export const TEMPLATE_BY_ID_GROQ_QUERY = `*[_type == "readmeTemplate" && _id == $id][0] {
  "id": _id,
  title,
  description,
  defaultTone,
  exampleOutput,
  sections[] {
    key,
    label,
    placeholder,
    required,
    type
  }
}`;

/**
 * Fetches templates from Sanity CMS via GROQ if configured,
 * or returns the built-in local templates as default.
 *
 * @returns Promise resolving to an array of README templates.
 */
export async function getTemplates(): Promise<Template[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

  if (!projectId) {
    // Graceful fallback to local statically-defined templates
    return localTemplates;
  }

  try {
    const encodedQuery = encodeURIComponent(TEMPLATES_GROQ_QUERY);
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodedQuery}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // ISR cache for 1 hour
    });

    if (!res.ok) {
      console.warn(`Failed to fetch templates from GROQ: ${res.statusText}`);
      return localTemplates;
    }

    const data = await res.json();
    if (Array.isArray(data.result) && data.result.length > 0) {
      return data.result as Template[];
    }
    return localTemplates;
  } catch (error) {
    console.warn("GROQ fetch failed, using local templates fallback:", error);
    return localTemplates;
  }
}
