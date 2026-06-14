import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { SectionSlug } from "./sections";

export interface ArticleMeta {
  id: string;
  section: SectionSlug;
  title: string;
  titleHtml: string;
  dek: string;
  author: string;
  date: string;
  sortDate: string;
  readTime: string;
  popularity: number;
  kicker: string;
  glyph: string;
}

export interface Article extends ArticleMeta {
  /** Raw MDX body. Empty string for essays not yet typeset. */
  body: string;
  hasBody: boolean;
  /** Optional structured contents + companion reading for the right rail. */
  contents?: string[];
  companions?: string[];
}

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function read(id: string): Article {
  const fullPath = path.join(ARTICLES_DIR, `${id}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const body = content.trim();
  return {
    ...(data as ArticleMeta),
    body,
    hasBody: body.length > 0,
    contents: (data as { contents?: string[] }).contents,
    companions: (data as { companions?: string[] }).companions,
  };
}

let cache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (cache) return cache;
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));
  cache = files.map((f) => read(f.replace(/\.mdx$/, "")));
  return cache;
}

export function getArticle(id: string): Article | undefined {
  return getAllArticles().find((a) => a.id === id);
}

export function getArticlesBySection(section: SectionSlug): Article[] {
  return getAllArticles().filter((a) => a.section === section);
}

export function byNewest(a: ArticleMeta, b: ArticleMeta): number {
  return b.sortDate.localeCompare(a.sortDate);
}

export function byOldest(a: ArticleMeta, b: ArticleMeta): number {
  return a.sortDate.localeCompare(b.sortDate);
}

export function byPopularity(a: ArticleMeta, b: ArticleMeta): number {
  return b.popularity - a.popularity;
}

export function recentInSection(section: SectionSlug, limit = 3): Article[] {
  return getArticlesBySection(section).sort(byNewest).slice(0, limit);
}

export function relatedInSection(
  section: SectionSlug,
  excludeId: string,
  limit = 3,
): Article[] {
  return getArticlesBySection(section)
    .filter((a) => a.id !== excludeId)
    .sort(byPopularity)
    .slice(0, limit);
}
