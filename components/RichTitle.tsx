import { Fragment, type ReactNode } from "react";

// Editorial headlines ship as a tiny, fixed markup vocabulary in `titleHtml`:
//   <br/> line breaks and <em>…</em> accent words, plus a few HTML entities.
// Rather than dangerouslySetInnerHTML, we parse that constrained grammar into
// real React nodes — safe by construction, no raw HTML injection.

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// Split a line on <em>…</em>, returning text and emphasized segments.
function parseInline(line: string, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /<em>(.*?)<\/em>/gis;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(decodeEntities(line.slice(lastIndex, match.index)));
    }
    nodes.push(<em key={`${keyBase}-em-${i}`}>{decodeEntities(match[1])}</em>);
    lastIndex = regex.lastIndex;
    i += 1;
  }
  if (lastIndex < line.length) {
    nodes.push(decodeEntities(line.slice(lastIndex)));
  }
  return nodes;
}

export function renderTitle(titleHtml: string): ReactNode {
  const lines = titleHtml.split(/<br\s*\/?>/i);
  return lines.map((line, idx) => (
    <Fragment key={`line-${idx}`}>
      {idx > 0 && <br />}
      {parseInline(line, `l${idx}`)}
    </Fragment>
  ));
}
