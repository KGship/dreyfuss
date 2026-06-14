import type { CSSProperties, ReactNode } from "react";

// ---------- Engraving placeholder slot ----------
export function Engraving({
  glyph = "❦",
  label = "ENGRAVING",
  caption = "",
  height = "100%",
}: {
  glyph?: string;
  label?: string;
  caption?: string;
  height?: string;
}) {
  return (
    <div className="engraving" style={{ height, width: "100%" }}>
      <span className="engraving-glyph">{glyph}</span>
      <div className="engraving-label">
        <span>{label}</span>
        <span>·&nbsp;&nbsp;·&nbsp;&nbsp;·</span>
        <span>{caption}</span>
      </div>
    </div>
  );
}

// ---------- Dingbat divider ----------
export function Dingbat({
  glyph = "❦",
  style,
}: {
  glyph?: string;
  style?: CSSProperties;
}) {
  return (
    <div className="dingbat" style={style}>
      <span className="dingbat-ornament">{glyph}</span>
    </div>
  );
}

// ---------- Section emblem ----------
export function Emblem({ letter }: { letter: ReactNode }) {
  return (
    <div className="emblem">
      <span className="emblem-glyph">{letter}</span>
    </div>
  );
}
