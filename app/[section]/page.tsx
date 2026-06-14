import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Dingbat, Emblem } from "@/components/Ornaments";
import { SectionList, type RowArticle } from "@/components/SectionList";
import { getArticlesBySection } from "@/lib/content";
import { SECTIONS, SECTION_SLUGS, getSection, isSectionSlug } from "@/lib/sections";

export function generateStaticParams() {
  return SECTION_SLUGS.map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const s = getSection(section);
  if (!s) return {};
  return {
    title: `${s.title} — The Dreyfuss Effect`,
    description: s.blurb,
  };
}

function toRow(a: ReturnType<typeof getArticlesBySection>[number]): RowArticle {
  return {
    id: a.id,
    section: a.section,
    titleHtml: a.titleHtml,
    dek: a.dek,
    author: a.author,
    date: a.date,
    sortDate: a.sortDate,
    readTime: a.readTime,
    popularity: a.popularity,
    kicker: a.kicker,
    glyph: a.glyph,
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!isSectionSlug(section)) notFound();

  const data = SECTIONS[section];
  const rows = getArticlesBySection(section).map(toRow);
  const others = SECTION_SLUGS.filter((s) => s !== section);

  return (
    <main>
      {/* Hero */}
      <section className="container">
        <div className="section-hero">
          <Emblem letter={data.emblem} />
          <h1 className="section-title">{data.title}</h1>
          <div className="dateline" style={{ color: "var(--crimson)" }}>
            {data.kicker}
          </div>
          <p className="section-blurb">{data.blurb}</p>
          <div style={{ marginTop: 28 }}>
            <Dingbat glyph="❦" />
          </div>
        </div>
      </section>

      {/* Toolbar + list (client sort) */}
      <section className="container">
        <SectionList articles={rows} />

        {/* Cross-section navigation */}
        <div style={{ padding: "56px 0 24px", textAlign: "center" }}>
          <Dingbat glyph="❦" />
          <div
            className="dateline"
            style={{ marginTop: 24, marginBottom: 18, color: "var(--crimson)" }}
          >
            Continue Reading In
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            {others.map((s) => (
              <Link key={s} className="btn-ghost" href={`/${s}`}>
                {SECTIONS[s].title} &nbsp;→
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
