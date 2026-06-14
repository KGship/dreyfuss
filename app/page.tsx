import Link from "next/link";
import { Dingbat, Emblem, Engraving } from "@/components/Ornaments";
import { InlineSubscribe } from "@/components/InlineSubscribe";
import { renderTitle } from "@/components/RichTitle";
import { getArticle, recentInSection } from "@/lib/content";
import { SECTIONS, SECTION_SLUGS } from "@/lib/sections";

// ===== Cover / front page =====
export default function HomePage() {
  const hero = getArticle("octopus-mind")!;
  const second = getArticle("tulip")!;
  const third = getArticle("clerk-byzantine")!;

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="container-wide">
        <div className="hero-grid">
          <div className="hero-lead">
            <div className="kicker">The Lead Essay · Vol. VIII</div>
            <Link href={`/${hero.section}/${hero.id}`} style={{ cursor: "pointer" }}>
              <h2 className="hero-headline">{renderTitle(hero.titleHtml)}</h2>
            </Link>
            <p className="hero-dek">{hero.dek}</p>
            <div className="hero-byline">
              By <span style={{ color: "var(--ink)" }}>{hero.author}</span>
              &nbsp;·&nbsp; {hero.readTime} read &nbsp;·&nbsp; {hero.date}
            </div>
            <Link className="btn-ghost" href={`/${hero.section}/${hero.id}`}>
              Read the Essay &nbsp;→
            </Link>
          </div>
          <div className="hero-art">
            <Engraving
              glyph="✦"
              label="PLATE I · CEPHALOPODA"
              caption="Naples, 1873"
              height="100%"
            />
          </div>
        </div>

        {/* Two secondary leads */}
        <div className="secondary-leads">
          <div className="secondary-lead">
            <div className="kicker" style={{ color: "var(--gold)" }}>
              Of Commerce
            </div>
            <Link href={`/${second.section}/${second.id}`}>
              <h3>{renderTitle(second.titleHtml)}</h3>
            </Link>
            <p>{second.dek}</p>
            <div className="dateline">
              By {second.author} · {second.date}
            </div>
          </div>
          <div className="secondary-lead last">
            <div className="kicker" style={{ color: "var(--gold)" }}>
              Of History
            </div>
            <Link href={`/${third.section}/${third.id}`}>
              <h3>{renderTitle(third.titleHtml)}</h3>
            </Link>
            <p>{third.dek}</p>
            <div className="dateline">
              By {third.author} · {third.date}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRI-COL by section ===== */}
      <section className="container-wide">
        <div className="tri-col">
          {SECTION_SLUGS.map((slug) => {
            const section = SECTIONS[slug];
            return (
              <div className="col" key={slug}>
                <Emblem letter={section.emblem} />
                <h3 className="col-kicker">{section.title}</h3>
                <div className="col-kicker-sub">{section.kicker}</div>

                {recentInSection(slug).map((a) => (
                  <div className="col-story" key={a.id}>
                    <Link href={`/${a.section}/${a.id}`}>
                      <h4 className="col-story-headline">{renderTitle(a.titleHtml)}</h4>
                    </Link>
                    <p className="col-story-dek">{a.dek}</p>
                    <div className="col-story-meta">
                      {a.author} · {a.date}
                    </div>
                  </div>
                ))}

                <div style={{ textAlign: "center", paddingTop: 8 }}>
                  <Link className="btn-ghost" href={`/${slug}`}>
                    All of {section.title} &nbsp;→
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== From the Editors / pull quote ===== */}
      <section className="container-wide">
        <div className="editors-quote">
          <Dingbat glyph="❦ ❦ ❦" />
          <blockquote>
            &ldquo;The shortest path between two truths is the longer essay.&rdquo;
          </blockquote>
          <div className="byline">
            From the Editors&rsquo; Note, Volume <span className="smcps">i</span>
          </div>
          <Dingbat glyph="❦" style={{ marginTop: 28 }} />
        </div>
      </section>

      {/* ===== Inline subscribe ===== */}
      <InlineSubscribe />
    </main>
  );
}
