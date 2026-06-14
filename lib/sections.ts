// The three editorial sections. Slugs double as the top-level routes.
export type SectionSlug = "science" | "history" | "commerce";

export interface Section {
  slug: SectionSlug;
  title: string;
  kicker: string;
  emblem: string;
  blurb: string;
}

export const SECTIONS: Record<SectionSlug, Section> = {
  science: {
    slug: "science",
    title: "Science",
    kicker: "Of the Natural World",
    emblem: "S",
    blurb:
      "Reports from the uncharted universe. Where collaboration and curiosity measure mystery. The more we investigate, the greater our license to interpolate.",
  },
  history: {
    slug: "history",
    title: "History",
    kicker: "Of Times Past",
    emblem: "H",
    blurb:
      "Reflections from the distant past and disputed present. Wisdom lies where truth and repetition meet. The pursuit of tomorrow begins with the study of yesterday.",
  },
  commerce: {
    slug: "commerce",
    title: "Commerce",
    kicker: "Of Trade",
    emblem: "C",
    blurb:
      "Reckonings of Industry and Ingenuity. Exploration exhibits the nuance behind class and capital. Transaction turns character and currency into consequence.",
  },
};

export const SECTION_SLUGS: SectionSlug[] = ["science", "history", "commerce"];

export function isSectionSlug(value: string): value is SectionSlug {
  return value === "science" || value === "history" || value === "commerce";
}

export function getSection(slug: string): Section | undefined {
  return isSectionSlug(slug) ? SECTIONS[slug] : undefined;
}
