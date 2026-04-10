export const SITE_NAME = "WarmupReps";
export const SITE_URL = "https://www.warmupreps.com";
export const DEFAULT_TITLE = "Warmup Set Calculator and Barbell Plate Calculator";
export const DEFAULT_DESCRIPTION =
  "WarmupReps helps you calculate warmup sets, target lifts, and plate loading for popular strength training programs.";

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, SITE_URL).toString();
}

export function buildCanonical(pathname = "/") {
  return {
    canonical: pathname
  };
}

export function buildOpenGraph({ title, description, pathname = "/" }) {
  return {
    title,
    description,
    url: absoluteUrl(pathname),
    siteName: SITE_NAME,
    type: "website"
  };
}

export function buildTwitter({ title, description }) {
  return {
    card: "summary",
    title,
    description
  };
}

export function buildIndexableMetadata({ title, description, pathname = "/" }) {
  return {
    title,
    description,
    alternates: buildCanonical(pathname),
    openGraph: buildOpenGraph({ title, description, pathname }),
    twitter: buildTwitter({ title, description })
  };
}

export function buildNoIndexMetadata({ title, description, pathname = "/" }) {
  return {
    ...buildIndexableMetadata({ title, description, pathname }),
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false
      }
    }
  };
}
