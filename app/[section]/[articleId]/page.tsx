import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ReadingRibbon } from "@/components/ReadingRibbon";
import { ShareBar } from "@/components/ShareBar";
import { renderTitle } from "@/components/RichTitle";
import { mdxComponents } from "@/components/mdx";
import { getAllArticles, getArticle, relatedInSection } from "@/lib/content";
import { SECTIONS, isSectionSlug } from "@/lib/sections";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ section: a.section, articleId: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; articleId: string }>;
}): Promise<Metadata> {
  const { articleId } = await params;
  const article = getArticle(articleId);
  if (!article) return {};
  return { title: `${article.title} — The Dreyfuss Effect`, description: article.dek };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ section: string; articleId: string }>;
}) {
  const { section, articleId } = await params;
  if (!isSectionSlug(section)) notFound();

  const article = getArticle(articleId);
  if (!article || article.section !== section) notFound();

  const sectionData = SECTIONS[article.section];
  const related = relatedInSection(article.section, article.id);

  let body: React.ReactNode = null;
  if (article.hasBody) {
    const { content } = await compileMDX({
      source: article.body,
      components: mdxComponents,
      options: { parseFrontmatter: false },
    });
    body = content;
  }

  return (
    <main className="article-reader">
      <ReadingRibbon />

      <section className="container">
        <div className="article-hero">
          <div className="kicker">
            <Link href={`/${article.section}`} style={{ cursor: "pointer" }}>
              {sectionData.title}
            </Link>
            <span style={{ margin: "0 14px", opacity: 0.4 }}>·</span>
            <span style={{ color: "var(--gold)" }}>{article.kicker}</span>
          </div>
          <h1 className="article-headline">{renderTitle(article.titleHtml)}</h1>
          <p className="article-dek">{article.dek}</p>
          <div className="article-meta-row">
            <span style={{ color: "var(--ink)" }}>By {article.author}</span>
            <span className="diamond" />
            <span>{article.date}</span>
            <span className="diamond" />
            <span>{article.readTime} read</span>
          </div>
        </div>
      </section>

      {/* Body with rails */}
      <section className="container-wide" style={{ marginTop: 40 }}>
        <div className="article-with-rails">
          <div>
            <ShareBar title={article.title} section={article.section} id={article.id} />

            {article.hasBody ? (
              <div className="article-body">
                {body}

                <div className="editor-note">
                  <div className="dateline">An Editor&rsquo;s Note</div>
                  {article.author} is a contributing essayist to{" "}
                  <em>The Dreyfuss Effect</em>. Their previous essays for this publication may
                  be found in our{" "}
                  <Link href={`/${article.section}`}>{sectionData.title}</Link> archive.
                  Correspondence and corrections:{" "}
                  <span className="mono">editors@dreyfuss.press</span>.
                </div>
              </div>
            ) : (
              <div className="article-stub">
                <div className="article-stub-glyph">❦</div>
                <h2>This essay is being typeset.</h2>
                <p>
                  The full text of &ldquo;{article.title}&rdquo; is forthcoming. In the
                  meantime, more from our {sectionData.title} archive awaits below.
                </p>
              </div>
            )}
          </div>

          {/* Right rail — marginalia (only where the essay supplies it) */}
          {article.hasBody && article.contents && article.contents.length > 0 && (
            <aside>
              <div className="article-rail">
                <div className="dateline">In this essay</div>
                <ol>
                  {article.contents.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ol>
                {article.companions && article.companions.length > 0 && (
                  <>
                    <div className="rail-label">Companion reading</div>
                    <p className="rail-reading">
                      {article.companions.map((c, i) => (
                        <span key={i}>
                          {renderTitle(c)}
                          {i < article.companions!.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </>
                )}
              </div>
            </aside>
          )}
        </div>
      </section>

      {/* Related */}
      <section className="container">
        <div className="related">
          <div className="related-head">
            <h3 className="related-title">More from {sectionData.title}</h3>
            <Link className="btn-ghost" href={`/${article.section}`}>
              The Full Archive &nbsp;→
            </Link>
          </div>
          <div className="related-grid">
            {related.map((a) => (
              <Link className="related-card" key={a.id} href={`/${a.section}/${a.id}`}>
                <div className="dateline" style={{ color: "var(--crimson)", marginBottom: 4 }}>
                  {a.kicker}
                </div>
                <h4>{renderTitle(a.titleHtml)}</h4>
                <p className="dek">{a.dek}</p>
                <div className="meta dateline" style={{ marginTop: 12 }}>
                  {a.author} · {a.date}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
