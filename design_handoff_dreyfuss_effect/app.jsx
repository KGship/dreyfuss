// ============================================================
// APP — router/state, tweaks panel, mount
// ============================================================

const { useState, useEffect, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#7a1b2b", "#f4ecd8", "#b08d3a"],
  "headlineFont": "Cormorant Garamond",
  "mastFont": "IM Fell English",
  "bodyFont": "EB Garamond",
  "density": "regular",
  "night": false,
  "paperTexture": true
}/*EDITMODE-END*/;

function App() {
  const [route, setRoute] = useState({ name: "home" });
  const [toastMsg, setToastMsg] = useState(null);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const go = (name, params = {}) => {
    setRoute({ name, ...params });
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToastMsg(null), 2400);
  };

  // ---- Apply tweaks to root vars / body classes ----
  useEffect(() => {
    const root = document.documentElement;
    if (Array.isArray(t.palette)) {
      root.style.setProperty("--crimson", t.palette[0]);
      root.style.setProperty("--paper", t.palette[1]);
      root.style.setProperty("--gold", t.palette[2]);
      root.style.setProperty("--crimson-deep", shade(t.palette[0], -0.25));
      root.style.setProperty("--crimson-bright", shade(t.palette[0], 0.15));
      root.style.setProperty("--cream", shade(t.palette[1], -0.04));
      root.style.setProperty("--paper-warm", shade(t.palette[1], -0.08));
      root.style.setProperty("--paper-shadow", shade(t.palette[1], -0.14));
      root.style.setProperty("--gold-bright", shade(t.palette[2], 0.18));
      root.style.setProperty("--gold-soft", shade(t.palette[2], 0.32));
    }
    root.style.setProperty("--serif-display", `"${t.headlineFont}", "EB Garamond", Garamond, serif`);
    root.style.setProperty("--serif-mast", `"${t.mastFont}", "IM Fell DW Pica", "Cormorant Garamond", serif`);
    root.style.setProperty("--serif-body", `"${t.bodyFont}", Garamond, "Times New Roman", serif`);

    document.body.classList.toggle("night", !!t.night);
    document.body.classList.toggle("dense", t.density === "dense");
    document.body.classList.toggle("airy", t.density === "airy");
    document.body.classList.toggle("paper-noise", !!t.paperTexture);
  }, [t]);

  // ---- Route render ----
  let view;
  if (route.name === "home") view = <Home go={go} />;
  else if (route.name === "section") view = <Section slug={route.section} go={go} />;
  else if (route.name === "article") view = <Article id={route.id} go={go} toast={showToast} />;
  else if (route.name === "about") view = <About go={go} />;
  else if (route.name === "contact") view = <Contact go={go} toast={showToast} />;
  else if (route.name === "subscribe") view = <Subscribe go={go} />;
  else view = <Home go={go} />;

  return (
    <div className="shell">
      <Masthead go={go} />
      <Nav route={route} go={go} />
      {view}
      <Colophon go={go} />
      <Toast msg={toastMsg} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakColor
            label="Palette"
            value={t.palette}
            onChange={(v) => setTweak("palette", v)}
            options={[
              ["#7a1b2b", "#f4ecd8", "#b08d3a"],
              ["#5a1220", "#efe6d2", "#c9a24a"],
              ["#3b2a23", "#ece1c8", "#a87b3a"],
              ["#1f2a44", "#e9e3d0", "#a78a3a"],
              ["#2f3b2e", "#ece2c8", "#a07a32"],
              ["#7a1b2b", "#1a1410", "#c9a24a"]
            ]}
          />
          <TweakToggle
            label="Library Night"
            value={t.night}
            onChange={(v) => setTweak("night", v)}
          />
          <TweakToggle
            label="Paper Texture"
            value={t.paperTexture}
            onChange={(v) => setTweak("paperTexture", v)}
          />
        </TweakSection>

        <TweakSection label="Typography">
          <TweakSelect
            label="Masthead"
            value={t.mastFont}
            onChange={(v) => setTweak("mastFont", v)}
            options={[
              { value: "IM Fell English", label: "IM Fell English" },
              { value: "IM Fell DW Pica", label: "IM Fell DW Pica" },
              { value: "UnifrakturMaguntia", label: "Blackletter" },
              { value: "Cinzel", label: "Cinzel (Roman caps)" },
              { value: "Cormorant Garamond", label: "Cormorant Garamond" }
            ]}
          />
          <TweakSelect
            label="Headlines"
            value={t.headlineFont}
            onChange={(v) => setTweak("headlineFont", v)}
            options={[
              { value: "Cormorant Garamond", label: "Cormorant Garamond" },
              { value: "EB Garamond", label: "EB Garamond" },
              { value: "Playfair Display", label: "Playfair Display" },
              { value: "DM Serif Display", label: "DM Serif Display" },
              { value: "IM Fell English", label: "IM Fell English" }
            ]}
          />
          <TweakSelect
            label="Body"
            value={t.bodyFont}
            onChange={(v) => setTweak("bodyFont", v)}
            options={[
              { value: "EB Garamond", label: "EB Garamond" },
              { value: "Cormorant Garamond", label: "Cormorant Garamond" },
              { value: "Spectral", label: "Spectral" },
              { value: "Lora", label: "Lora" },
              { value: "Crimson Pro", label: "Crimson Pro" }
            ]}
          />
        </TweakSection>

        <TweakSection label="Reading">
          <TweakRadio
            label="Density"
            value={t.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { value: "dense", label: "Dense" },
              { value: "regular", label: "Regular" },
              { value: "airy", label: "Airy" }
            ]}
          />
        </TweakSection>

        <TweakSection label="Jump to">
          <TweakButton label="Read Sample Essay" onClick={() => go("article", { id: "octopus-mind", section: "science" })} />
          <TweakButton label="Section Landing" secondary onClick={() => go("section", { section: "history" })} />
          <TweakButton label="About" secondary onClick={() => go("about")} />
          <TweakButton label="Contact / Submit" secondary onClick={() => go("contact")} />
          <TweakButton label="Subscribe" secondary onClick={() => go("subscribe")} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

// ---------- Helper: lighten/darken hex ----------
function shade(hex, amt) {
  if (!hex || !hex.startsWith("#")) return hex;
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map(x => x + x).join("") : h;
  let r = parseInt(full.slice(0, 2), 16);
  let g = parseInt(full.slice(2, 4), 16);
  let b = parseInt(full.slice(4, 6), 16);
  const adj = (c) => {
    if (amt >= 0) return Math.round(c + (255 - c) * amt);
    return Math.round(c * (1 + amt));
  };
  r = adj(r); g = adj(g); b = adj(b);
  return "#" + [r, g, b].map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, "0")).join("");
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
