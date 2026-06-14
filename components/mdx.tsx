import type { ReactNode } from "react";
import { Engraving } from "./Ornaments";

// ---- Sidenote: dotted phrase with a numbered margin popover (CSS-driven hover) ----
export function Sidenote({
  num,
  note,
  children,
}: {
  num: number;
  note: string;
  children: ReactNode;
}) {
  return (
    <span className="sidenote" tabIndex={0}>
      {children}
      <span className="sidenote-popover" data-num={num} role="note">
        {note}
      </span>
    </span>
  );
}

// ---- Figure: framed engraving plate with an italic caption ----
export function Figure({
  glyph = "❦",
  label = "FIGURE",
  caption = "",
}: {
  glyph?: string;
  label?: string;
  caption?: string;
}) {
  return (
    <figure>
      <Engraving glyph={glyph} label={label} caption={caption} height="280px" />
      <figcaption>
        Fig. I. — A specimen at rest, after Riccieri, plate from{" "}
        <em>Tavole della Stazione Zoologica</em>, Naples, 1873.
      </figcaption>
    </figure>
  );
}

// ---- Section break: the ❦ ❦ ❦ dinkus ----
export function SectionBreak() {
  return <div className="section-break">❦ &nbsp; ❦ &nbsp; ❦</div>;
}

export const mdxComponents = {
  Sidenote,
  Figure,
  SectionBreak,
};
