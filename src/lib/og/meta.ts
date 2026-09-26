/**
 * Per-route share metadata (Open Graph + X/Twitter) for TanStack route head().
 *
 * TanStack Router dedupes `meta` by name/property with the deepest route
 * winning, so a child route's og:image replaces the root default instead of
 * duplicating it. Images must be absolute; crawlers do not run JS, and this is
 * all in the server-rendered <head>.
 *
 * Per-page images are pre-generated 1200x630 crops of each page's cover
 * (scripts/og/render-page-covers.mjs → public/og/*.jpg + covers.json). A page
 * missing from covers.json falls back to the default card.
 */
import covers from "./covers.json";

export const SITE_ORIGIN = "https://carlos-cano.vercel.app";
/**
 * Default share card: portrait + "Portfolio" (scripts/og/render-default-card.mjs).
 * All share images are 2400x1260 JPEGs (1200x630 at 2x). Versioned file names
 * make LinkedIn/X fetch fresh copies instead of their cached ones.
 */
export const DEFAULT_OG_IMAGE = "/og-portfolio-v2.jpg";
export const DEFAULT_OG_IMAGE_ALT =
  "Portrait of Carlos Cano beside the word “Portfolio” and his circle mark";
const OG_IMAGE_WIDTH = "2400";
const OG_IMAGE_HEIGHT = "1260";

type MetaTag = { name?: string; property?: string; content: string };

/** Public path of the pre-generated cover crop for `key`, or the default card. */
export function ogCover(key: string): string {
  return (covers as Record<string, string>)[key] ?? DEFAULT_OG_IMAGE;
}

function absolute(path: string): string {
  return path.startsWith("http") ? path : `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function shareMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  /** Alt text for the share image; defaults to the default card's alt. */
  imageAlt?: string;
  type?: "website" | "article";
}): MetaTag[] {
  const url = absolute(path);
  const img = absolute(image);
  const alt = image === DEFAULT_OG_IMAGE || !imageAlt ? DEFAULT_OG_IMAGE_ALT : imageAlt;
  return [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:site_name", content: "Carlos Cano" },
    { property: "og:image", content: img },
    { property: "og:image:width", content: OG_IMAGE_WIDTH },
    { property: "og:image:height", content: OG_IMAGE_HEIGHT },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:alt", content: alt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
    { name: "twitter:image:alt", content: alt },
  ];
}
