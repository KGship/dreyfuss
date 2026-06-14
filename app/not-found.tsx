import Link from "next/link";
import { Dingbat } from "@/components/Ornaments";

export default function NotFound() {
  return (
    <main>
      <section className="container-narrow" style={{ padding: "96px 0", textAlign: "center" }}>
        <div className="kicker">Errata</div>
        <h1
          style={{
            fontFamily: "var(--serif-mast)",
            fontSize: "clamp(56px, 8vw, 104px)",
            lineHeight: 0.96,
            margin: "14px 0 18px",
            fontWeight: 400,
          }}
        >
          A <em style={{ color: "var(--crimson)", fontFamily: "var(--serif-display)" }}>missing</em> page.
        </h1>
        <p
          style={{
            fontFamily: "var(--serif-display)",
            fontStyle: "italic",
            fontSize: 22,
            color: "var(--ink-soft)",
            maxWidth: "40ch",
            margin: "0 auto 28px",
          }}
        >
          The leaf you sought has been mislaid in the bindery. Allow us to return you to the
          cover.
        </p>
        <Dingbat glyph="❦" />
        <div style={{ marginTop: 28 }}>
          <Link className="btn-ghost" href="/">
            Return to the Cover &nbsp;→
          </Link>
        </div>
      </section>
    </main>
  );
}
