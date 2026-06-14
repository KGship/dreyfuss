// ============================================================
// SECTION — landing page with sort and article list
// ============================================================

function Section({ slug, go }) {
  const section = window.DATA.sections[slug];
  const all = window.DATA.articles.filter(a => a.section === slug);

  const [sort, setSort] = React.useState("newest");
  const sorted = React.useMemo(() => {
    const arr = [...all];
    if (sort === "newest") arr.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
    else if (sort === "oldest") arr.sort((a, b) => a.sortDate.localeCompare(b.sortDate));
    else if (sort === "popular") arr.sort((a, b) => b.popularity - a.popularity);
    return arr;
  }, [all, sort]);

  return (
    <main>
      {/* Hero */}
      <section className="container">
        <div className="section-hero">
          <Emblem letter={section.emblem} />
          <h1 className="section-title">{section.title}</h1>
          <div className="dateline" style={{ color: "var(--crimson)" }}>{section.kicker}</div>
          <p className="section-blurb">{section.blurb}</p>
          <div style={{ marginTop: 28 }}>
            <Dingbat glyph="❦" />
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="container">
        <div className="section-toolbar">
          <div className="count">
            <em>{sorted.length}</em> essays in this section
          </div>
          <div className="sort-group">
            <span className="sort-label">Sort by</span>
            {[
              { id: "newest", label: "Most Recent" },
              { id: "oldest", label: "From the Beginning" },
              { id: "popular", label: "Most Read" },
            ].map(o => (
              <button
                key={o.id}
                className={"sort-btn" + (sort === o.id ? " active" : "")}
                onClick={() => setSort(o.id)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="article-list">
          {sorted.map((a, i) => (
            <article
              key={a.id}
              className="article-row"
              onClick={() => go("article", { id: a.id, section: a.section })}
            >
              <div>
                <div className="num">№ {toRoman(i + 1)}</div>
                <div className="num-sub">{a.kicker}</div>
              </div>
              <div>
                <div className="dateline" style={{ marginBottom: 8, color: "var(--crimson)" }}>
                  {a.kicker}
                </div>
                <h3 dangerouslySetInnerHTML={{ __html: a.titleHtml }} />
                <p className="dek">{a.dek}</p>
                <div className="meta">
                  <span>By {a.author}</span>
                  <span className="diamond" style={{ background: "var(--gold)" }}></span>
                  <span>{a.date}</span>
                  <span className="diamond" style={{ background: "var(--gold)" }}></span>
                  <span>{a.readTime} read</span>
                </div>
              </div>
              <div className="art-side">
                <Engraving glyph={a.glyph} label={"PLATE · " + toRoman(i + 1)} caption={a.kicker} height="180px" />
              </div>
            </article>
          ))}
        </div>

        {/* Cross-section navigation */}
        <div style={{ padding: "56px 0 24px", textAlign: "center" }}>
          <Dingbat glyph="❦" />
          <div className="dateline" style={{ marginTop: 24, marginBottom: 18, color: "var(--crimson)" }}>
            Continue Reading In
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            {Object.values(window.DATA.sections).filter(s => s.slug !== slug).map(s => (
              <button key={s.slug} className="btn-ghost" onClick={() => go("section", { section: s.slug })}>
                {s.title}  →
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { Section });
