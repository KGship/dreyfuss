// ============================================================
// HOME — front page (newspaper-style with magazine hero)
// ============================================================

function Home({ go }) {
  const articles = window.DATA.articles;
  const sections = window.DATA.sections;
  const hero = articles.find(a => a.id === "octopus-mind");
  const second = articles.find(a => a.id === "tulip");
  const third = articles.find(a => a.id === "clerk-byzantine");

  const bySection = (s) =>
    articles
      .filter(a => a.section === s)
      .sort((a, b) => b.sortDate.localeCompare(a.sortDate))
      .slice(0, 3);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="container-wide">
        <div className="hero-grid">
          <div className="hero-lead">
            <div className="kicker">The Lead Essay · Vol. VIII</div>
            <h2
              className="hero-headline"
              onClick={() => go("article", { id: hero.id, section: hero.section })}
              style={{ cursor: "pointer" }}
              dangerouslySetInnerHTML={{ __html: hero.titleHtml }}
            />
            <p className="hero-dek">{hero.dek}</p>
            <div className="hero-byline">
              By <span style={{ color: "var(--ink)" }}>{hero.author}</span>
              &nbsp;·&nbsp; {hero.readTime} read &nbsp;·&nbsp; {hero.date}
            </div>
            <button className="btn-ghost" onClick={() => go("article", { id: hero.id, section: hero.section })}>
              Read the Essay  →
            </button>
          </div>
          <div className="hero-art">
            <Engraving glyph="✦" label="PLATE I · CEPHALOPODA" caption="Naples, 1873" height="100%" />
          </div>
        </div>

        {/* Two secondary leads */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderBottom: "1px solid var(--ink)" }}>
          <div style={{ padding: "36px 32px 36px 0", borderRight: "1px solid var(--rule)" }}>
            <div className="kicker" style={{ color: "var(--gold)" }}>Of Commerce</div>
            <h3
              style={{ fontFamily: "var(--serif-display)", fontSize: 38, lineHeight: 1.05, margin: "8px 0 12px", fontWeight: 500, cursor: "pointer", textWrap: "balance" }}
              onClick={() => go("article", { id: second.id, section: second.section })}
              dangerouslySetInnerHTML={{ __html: second.titleHtml }}
            />
            <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.5, margin: "0 0 10px" }}>
              {second.dek}
            </p>
            <div className="dateline">By {second.author} · {second.date}</div>
          </div>
          <div style={{ padding: "36px 0 36px 32px" }}>
            <div className="kicker" style={{ color: "var(--gold)" }}>Of History</div>
            <h3
              style={{ fontFamily: "var(--serif-display)", fontSize: 38, lineHeight: 1.05, margin: "8px 0 12px", fontWeight: 500, cursor: "pointer", textWrap: "balance" }}
              onClick={() => go("article", { id: third.id, section: third.section })}
              dangerouslySetInnerHTML={{ __html: third.titleHtml }}
            />
            <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.5, margin: "0 0 10px" }}>
              {third.dek}
            </p>
            <div className="dateline">By {third.author} · {third.date}</div>
          </div>
        </div>
      </section>

      {/* ===== TRI-COL by section ===== */}
      <section className="container-wide">
        <div className="tri-col">
          {["science", "history", "commerce"].map((slug) => (
            <div className="col" key={slug}>
              <Emblem letter={sections[slug].emblem} />
              <h3 className="col-kicker">{sections[slug].title}</h3>
              <div className="col-kicker-sub">{sections[slug].kicker}</div>

              {bySection(slug).map((a) => (
                <div className="col-story" key={a.id} onClick={() => go("article", { id: a.id, section: a.section })}>
                  <h4 className="col-story-headline" dangerouslySetInnerHTML={{ __html: a.titleHtml }} />
                  <p className="col-story-dek">{a.dek}</p>
                  <div className="col-story-meta">
                    {a.author} · {a.date}
                  </div>
                </div>
              ))}

              <div style={{ textAlign: "center", paddingTop: 8 }}>
                <button className="btn-ghost" onClick={() => go("section", { section: slug })}>
                  All of {sections[slug].title}  →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== From the Editors / pull quote ===== */}
      <section className="container-wide" style={{ padding: "56px 0", textAlign: "center", borderBottom: "1px solid var(--ink)" }}>
        <Dingbat glyph="❦ ❦ ❦" />
        <blockquote style={{
          fontFamily: "var(--serif-display)",
          fontStyle: "italic",
          fontSize: "clamp(28px, 3.4vw, 44px)",
          lineHeight: 1.32,
          color: "var(--ink)",
          maxWidth: "30ch",
          margin: "30px auto 20px",
          textWrap: "balance"
        }}>
          “The shortest path between two truths is the longer essay.”
        </blockquote>
        <div className="byline" style={{ fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          From the Editors’ Note, Volume <span className="smcps">i</span>
        </div>
        <Dingbat glyph="❦" style={{ marginTop: 28 }} />
      </section>

      {/* ===== Inline subscribe ===== */}
      <InlineSubscribe go={go} />
    </main>
  );
}

function InlineSubscribe({ go }) {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  return (
    <section className="container" style={{ padding: "64px 0" }}>
      <div style={{
        border: "1px solid var(--ink)",
        padding: "48px 40px",
        background: "var(--cream)",
        position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 6, border: "1px solid var(--gold)", pointerEvents: "none" }}></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <div className="kicker">The Weekly Letter</div>
            <h3 style={{ fontFamily: "var(--serif-mast)", fontSize: 44, margin: "10px 0 12px", lineHeight: 1.02 }}>
              One essay. <span className="italic" style={{ color: "var(--crimson)" }}>Sunday morning.</span>
            </h3>
            <p style={{ fontFamily: "var(--serif-display)", fontStyle: "italic", fontSize: 19, color: "var(--ink-soft)", margin: 0, lineHeight: 1.5 }}>
              The week’s best essay. No algorithms, no advertisements, no charges.
            </p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}>
            {!sent ? (
              <>
                <div className="subscribe-form" style={{ background: "var(--paper)" }}>
                  <input
                    type="email"
                    required
                    placeholder="reader@correspondence.address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit">Subscribe</button>
                </div>
                <div className="dateline" style={{ marginTop: 14, textAlign: "right" }}>
                  Free, always · Unsubscribe in two clicks
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <div style={{ fontFamily: "var(--serif-mast)", fontSize: 32, color: "var(--crimson)" }}>❦</div>
                <p style={{ fontFamily: "var(--serif-display)", fontSize: 20, fontStyle: "italic", color: "var(--ink)", margin: "8px 0" }}>
                  Welcome. Sunday will find you.
                </p>
                <div className="dateline">A confirmation has been dispatched to {email}</div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Home, InlineSubscribe });
