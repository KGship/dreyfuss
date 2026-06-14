// ============================================================
// ARTICLE — reader with sidenotes, share rail, related
// ============================================================

function Article({ id, go, toast }) {
  const article = window.DATA.articles.find(a => a.id === id);
  const body = window.DATA.bodies[id] || window.DATA.bodies["octopus-mind"];
  const section = window.DATA.sections[article.section];

  const [shareOpen, setShareOpen] = React.useState(false);

  // Scroll to top on mount
  React.useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const related = window.DATA.articles
    .filter(a => a.section === article.section && a.id !== id)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  return (
    <main className="article-reader">
      <ReadingRibbon />

      <section className="container">
        <div className="article-hero">
          <div className="kicker">
            <span style={{ cursor: "pointer" }} onClick={() => go("section", { section: article.section })}>
              {section.title}
            </span>
            <span style={{ margin: "0 14px", opacity: 0.4 }}>·</span>
            <span style={{ color: "var(--gold)" }}>{article.kicker}</span>
          </div>
          <h1 className="article-headline" dangerouslySetInnerHTML={{ __html: article.titleHtml }} />
          <p className="article-dek">{article.dek}</p>
          <div className="article-meta-row">
            <span style={{ color: "var(--ink)" }}>By {article.author}</span>
            <span className="diamond"></span>
            <span>{article.date}</span>
            <span className="diamond"></span>
            <span>{article.readTime} read</span>
          </div>
        </div>
      </section>

      {/* Body with rails */}
      <section className="container-wide" style={{ marginTop: 40 }}>
        <div className="article-with-rails">
          {/* Center — body */}
          <div>
            {/* Horizontal share bar */}
            <div className="share-bar">
              <span className="share-bar-label">Share this essay</span>
              <div className="share-bar-actions">
                <button className="share-pill" onClick={() => {
                  navigator.clipboard && navigator.clipboard.writeText("https://dreyfuss.press/" + article.section + "/" + article.id).catch(() => {});
                  toast("Link copied to clipboard");
                }}><span className="share-pill-glyph">§</span> Copy Link</button>
                <button className="share-pill" onClick={() => {
                  window.location.href = `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent("https://dreyfuss.press/" + article.section + "/" + article.id)}`;
                }}><span className="share-pill-glyph">✉</span> Email</button>
                <button className="share-pill" onClick={() => window.print()}><span className="share-pill-glyph">⎙</span> Print as PDF</button>
                <button className="share-pill" onClick={() => setShareOpen(true)}><span className="share-pill-glyph">❦</span> More</button>
              </div>
            </div>

            <div className="article-body">
              <BodyRenderer blocks={body} hero={article} />

              {/* Editor's note */}
              <div style={{
                marginTop: 56,
                padding: "28px 32px",
                background: "var(--cream)",
                border: "1px solid var(--ink)",
                fontFamily: "var(--serif-display)",
                fontStyle: "italic",
                fontSize: 17,
                lineHeight: 1.5,
                color: "var(--ink-soft)",
                position: "relative"
              }}>
                <div className="dateline" style={{ marginBottom: 8, color: "var(--crimson)", fontStyle: "normal" }}>
                  An Editor’s Note
                </div>
                {article.author} is a contributing essayist to <em>The Dreyfuss Effect</em>.
                Their previous essays for this publication may be found in our <a onClick={() => go("section", { section: article.section })} style={{ borderBottom: "1px solid var(--crimson)", cursor: "pointer", color: "var(--crimson)" }}>{section.title}</a> archive.
                Correspondence and corrections: <span style={{ fontFamily: "var(--mono)", fontSize: 14, fontStyle: "normal" }}>editors@dreyfuss.press</span>.
              </div>
            </div>
          </div>

          {/* Right rail — marginalia */}
          <aside>
            <div style={{ position: "sticky", top: 120, fontFamily: "var(--serif-display)", fontStyle: "italic", color: "var(--ink-mute)", fontSize: 14, lineHeight: 1.5, paddingTop: 12 }}>
              <div className="dateline" style={{ color: "var(--gold)", marginBottom: 14, fontStyle: "normal" }}>In this essay</div>
              <ol style={{ paddingLeft: 20, margin: 0, fontFamily: "var(--serif-display)" }}>
                <li style={{ marginBottom: 10 }}>The architecture of disagreement</li>
                <li style={{ marginBottom: 10 }}>The problem of the second self</li>
                <li>What we mean by knowing</li>
              </ol>
              <div style={{ marginTop: 28, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-mute)", fontStyle: "normal", fontFamily: "var(--sans-meta)" }}>
                Companion reading
              </div>
              <p style={{ marginTop: 8 }}>
                Godfrey-Smith, P. <em>Other Minds</em> (2016).<br/>
                Montgomery, S. <em>The Soul of an Octopus</em> (2015).
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="container">
        <div className="related">
          <div className="related-head">
            <h3 className="related-title">More from {section.title}</h3>
            <button className="btn-ghost" onClick={() => go("section", { section: article.section })}>
              The Full Archive  →
            </button>
          </div>
          <div className="related-grid">
            {related.map(a => (
              <div className="related-card" key={a.id} onClick={() => go("article", { id: a.id, section: a.section })}>
                <div className="dateline" style={{ color: "var(--crimson)", marginBottom: 4 }}>{a.kicker}</div>
                <h4 dangerouslySetInnerHTML={{ __html: a.titleHtml }} />
                <p className="dek">{a.dek}</p>
                <div className="meta dateline" style={{ marginTop: 12 }}>{a.author} · {a.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {shareOpen && <ShareModal article={article} onClose={() => setShareOpen(false)} toast={toast} />}
    </main>
  );
}

// ---------- Body renderer ----------
function BodyRenderer({ blocks, hero }) {
  // Show a small engraving inset after the second paragraph
  const out = [];
  let pCount = 0;
  blocks.forEach((b, idx) => {
    if (typeof b === "string") {
      pCount++;
      // Inject sidenote spans into the first paragraph
      let html = b
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
        .replace(/_([^_]+)_/g, "<em>$1</em>");
      if (pCount === 1) {
        html = html.replace("five hundred million neurons",
          `<span class="sidenote" data-popover="More than a dog. Fewer than a human. The number, however, was never the point.">five hundred million neurons</span>`);
      }
      if (pCount === 3) {
        html = html.replace("the lights are on",
          `<span class="sidenote" data-popover="A phrase borrowed from the neurologist Antonio Damasio, who used it to describe consciousness as a kind of household economy.">the lights are on</span>`);
      }
      // If it's a blockquote (starts with <blockquote>), pass through
      if (html.trim().startsWith("<blockquote>")) {
        out.push(<div key={idx} dangerouslySetInnerHTML={{ __html: html }} />);
      } else {
        out.push(<SidenoteParagraph key={idx} html={html} first={pCount === 1} />);
      }

      // After 2nd paragraph, insert a figure
      if (pCount === 2) {
        out.push(
          <figure key={"fig-" + idx} style={{ margin: "32px -20px", textAlign: "center" }}>
            <Engraving glyph={hero.glyph} label={"FIGURE I · " + hero.kicker.toUpperCase()} caption="From the author's notebook" height="280px" />
            <figcaption style={{
              fontFamily: "var(--serif-display)",
              fontStyle: "italic",
              fontSize: 14,
              color: "var(--ink-mute)",
              marginTop: 10,
              textWrap: "balance"
            }}>
              Fig. I. — A specimen at rest, after Riccieri, plate from <em>Tavole della Stazione Zoologica</em>, Naples, 1873.
            </figcaption>
          </figure>
        );
      }
    } else if (b.type === "h2") {
      out.push(<h2 key={idx}>{b.text}</h2>);
    } else if (b.type === "break") {
      out.push(<div key={idx} className="section-break">❦ &nbsp; ❦ &nbsp; ❦</div>);
    }
  });
  return <>{out}</>;
}

function SidenoteParagraph({ html, first }) {
  const ref = React.useRef(null);
  const [popover, setPopover] = React.useState(null); // {x, y, text, num}

  React.useEffect(() => {
    if (!ref.current) return;
    const nodes = ref.current.querySelectorAll(".sidenote");
    let n = 0;
    const handlers = [];
    nodes.forEach((el) => {
      n++;
      const num = n;
      const text = el.getAttribute("data-popover");
      const enter = () => {
        const r = el.getBoundingClientRect();
        const pr = ref.current.getBoundingClientRect();
        setPopover({
          top: r.top - pr.top - 8,
          left: pr.width + 28,
          text, num
        });
      };
      const leave = () => setPopover(null);
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      handlers.push({ el, enter, leave });
    });
    return () => handlers.forEach(({ el, enter, leave }) => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    });
  }, [html]);

  return (
    <div style={{ position: "relative" }}>
      <p ref={ref} className={first ? "lede" : undefined} dangerouslySetInnerHTML={{ __html: html }} />
      {popover && (
        <div className="sidenote-popover" style={{ top: popover.top, left: popover.left }} data-num={popover.num}>
          {popover.text}
        </div>
      )}
    </div>
  );
}

// ---------- Share Modal ----------
function ShareModal({ article, onClose, toast }) {
  const url = "https://dreyfuss.press/" + article.section + "/" + article.id;
  const inputRef = React.useRef(null);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="dateline" style={{ textAlign: "center", color: "var(--crimson)", marginBottom: 6 }}>
          Pass it Along
        </div>
        <h3>Share this essay</h3>
        <p style={{ textAlign: "center", fontFamily: "var(--serif-display)", fontStyle: "italic", color: "var(--ink-soft)", margin: "8px 0 0" }}>
          “{article.title}”
        </p>
        <div className="share-options">
          <button className="share-option" onClick={() => {
            window.location.href = `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(url)}`;
          }}>
            <span className="glyph">✉</span> Email
          </button>
          <button className="share-option" onClick={() => { window.print(); }}>
            <span className="glyph">⎙</span> Print as PDF
          </button>
          <button className="share-option" onClick={() => toast("Shared to LinkedIn")}>
            <span className="glyph">in</span> LinkedIn
          </button>
          <button className="share-option" onClick={() => toast("Shared to X")}>
            <span className="glyph">×</span> Post on X
          </button>
        </div>
        <div className="share-link-row">
          <input ref={inputRef} defaultValue={url} readOnly />
          <button onClick={() => {
            if (inputRef.current) { inputRef.current.select(); }
            navigator.clipboard && navigator.clipboard.writeText(url).catch(() => {});
            toast("Link copied to clipboard");
          }}>Copy</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Article, BodyRenderer, SidenoteParagraph, ShareModal });
