// ============================================================
// THE DREYFUSS EFFECT — shared components & ornaments
// ============================================================

// ---------- Roman numerals (for issue dating) ----------
function toRoman(n) {
  const map = [["M", 1000], ["CM", 900], ["D", 500], ["CD", 400], ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]];
  let out = "";
  for (const [r, v] of map) while (n >= v) {out += r;n -= v;}
  return out;
}

// ---------- Engraving placeholder slot ----------
function Engraving({ glyph = "❦", label = "ENGRAVING", caption = "", height = "100%" }) {
  return (
    <div className="engraving" style={{ height, width: "100%" }}>
      <span className="engraving-glyph">{glyph}</span>
      <div className="engraving-label">
        <span>{label}</span>
        <span>·  ·  ·</span>
        <span>{caption}</span>
      </div>
    </div>);

}

// ---------- Dingbat divider ----------
function Dingbat({ glyph = "❦", style }) {
  return (
    <div className="dingbat" style={style}>
      <span className="dingbat-ornament">{glyph}</span>
    </div>);

}

// ---------- Section emblem ----------
function Emblem({ letter }) {
  return (
    <div className="emblem">
      <span className="emblem-glyph">{letter}</span>
    </div>);

}

// ---------- Masthead ----------
function Masthead({ go }) {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const volume = toRoman(8);
  const issue = toRoman(143);
  return (
    <header className="masthead">
      <div className="container-wide">
        <div className="masthead-top">
          <span>Vol. {volume} · No. {issue}</span>
          <div className="masthead-top-center">
            <span>An Editorial Publication, Published Weekly</span>
          </div>
          <span className="right">Established MMXIX</span>
        </div>

        <h1 className="masthead-title" onClick={() => go("home")} style={{ cursor: "pointer", fontFamily: "Cinzel" }}>
          The Dreyfuss Effect
        </h1>
        <div className="masthead-sub">
          Reports, Reflections, <span className="amp">&amp;</span> Reckonings from the long present
        </div>

        <div className="masthead-meta">
          <span>{dateStr}</span>
          <span className="center">
            <span className="diamond"></span>
            ❦  &nbsp; Sapientia est Veritas &nbsp; ❦
            <span className="diamond"></span>
          </span>
          <span className="right">Reading Time · Approx. 47 min</span>
        </div>
      </div>
    </header>);

}

// ---------- Primary nav ----------
function Nav({ route, go }) {
  const items = [
  { id: "home", label: "Cover" },
  { id: "science", label: "Science" },
  { id: "history", label: "History" },
  { id: "commerce", label: "Commerce" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "subscribe", label: "Subscribe" }];

  const active = (id) => {
    if (id === "home") return route.name === "home";
    if (["science", "history", "commerce"].includes(id)) {
      return route.name === "section" && route.section === id ||
      route.name === "article" && route.section === id;
    }
    return route.name === id;
  };
  return (
    <nav className="nav">
      <div className="nav-inner">
        {items.map((it, i) =>
        <React.Fragment key={it.id}>
            {i > 0 && <span className="nav-sep"></span>}
            <a
            className={"nav-item" + (active(it.id) ? " active" : "")}
            onClick={() => {
              if (["science", "history", "commerce"].includes(it.id)) go("section", { section: it.id });else
              go(it.id);
            }}>
            
              {it.label}
            </a>
          </React.Fragment>
        )}
      </div>
    </nav>);

}

// ---------- Footer / Colophon ----------
function Colophon({ go }) {
  return (
    <footer className="colophon">
      <div className="container-wide">
        <div className="colophon-grid">
          <div>
            <div className="colophon-mast">The Dreyfuss Effect</div>
            <p className="colophon-tagline">
              An organization founded with conviction that, given time, thought becomes a kind of company.
            </p>
            <div className="socials">
              <a className="social" title="LinkedIn">in</a>
              <a className="social" title="Facebook">f</a>
              <a className="social" title="Instagram">◐</a>
              <a className="social" title="X (formerly Twitter)">×</a>
              <a className="social" title="RSS">≋</a>
            </div>
          </div>
          <div>
            <h5>Sections</h5>
            <ul>
              <li onClick={() => go("section", { section: "science" })}>Science</li>
              <li onClick={() => go("section", { section: "history" })}>History</li>
              <li onClick={() => go("section", { section: "commerce" })}>Commerce</li>
            </ul>
          </div>
          <div>
            <h5>Pages</h5>
            <ul>
              <li onClick={() => go("about")}>About</li>
              <li onClick={() => go("contact")}>Contact</li>
              <li onClick={() => go("subscribe")}>Subscription <em style={{ color: "var(--gold-soft)", opacity: 0.7 }}>· free</em></li>
            </ul>
          </div>
          <div>
            <h5>Office</h5>
            <ul style={{ opacity: 0.7, fontSize: 15 }}>
              <li style={{ cursor: "default" }}>4850 Tamiami Trail North</li>
              <li style={{ cursor: "default" }}>Suite 301</li>
              <li style={{ cursor: "default" }}>Naples, FL 34103</li>
              <li style={{ cursor: "default" }}>editors@dreyfuss.press</li>
            </ul>
          </div>
          <div>
            <h5>Policies</h5>
            <ul>
              <li onClick={() => go("home")}>Terms of Use</li>
              <li onClick={() => go("home")}>Disclaimer</li>
              <li onClick={() => go("home")}>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="colophon-fine">
          <span>© MMXXVI · The Dreyfuss Effect, LLC</span>
          <span>Set in IM Fell, Cormorant &amp; EB Garamond</span>
          <span>All rights gently reserved</span>
        </div>
      </div>
    </footer>);

}

// ---------- Reading ribbon (article-only) ----------
function ReadingRibbon() {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? h.scrollTop / max * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="ribbon">
      <div className="ribbon-progress" style={{ height: pct + "%" }}></div>
    </div>);

}

// ---------- Toast ----------
function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast">{msg}</div>;
}

Object.assign(window, { toRoman, Engraving, Dingbat, Emblem, Masthead, Nav, Colophon, ReadingRibbon, Toast });