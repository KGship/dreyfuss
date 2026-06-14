"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Engraving } from "./Ornaments";
import { renderTitle } from "./RichTitle";
import { toRoman } from "@/lib/roman";

export interface RowArticle {
  id: string;
  section: string;
  titleHtml: string;
  dek: string;
  author: string;
  date: string;
  sortDate: string;
  readTime: string;
  popularity: number;
  kicker: string;
  glyph: string;
}

type Sort = "newest" | "oldest" | "popular";

const SORTS: { id: Sort; label: string }[] = [
  { id: "newest", label: "Most Recent" },
  { id: "oldest", label: "From the Beginning" },
  { id: "popular", label: "Most Read" },
];

export function SectionList({ articles }: { articles: RowArticle[] }) {
  const [sort, setSort] = useState<Sort>("newest");

  const sorted = useMemo(() => {
    const arr = [...articles];
    if (sort === "newest") arr.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
    else if (sort === "oldest") arr.sort((a, b) => a.sortDate.localeCompare(b.sortDate));
    else if (sort === "popular") arr.sort((a, b) => b.popularity - a.popularity);
    return arr;
  }, [articles, sort]);

  return (
    <>
      <div className="section-toolbar">
        <div className="count">
          <em>{sorted.length}</em> essays in this section
        </div>
        <div className="sort-group">
          <span className="sort-label">Sort by</span>
          {SORTS.map((o) => (
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

      <div className="article-list">
        {sorted.map((a, i) => (
          <Link
            key={a.id}
            href={`/${a.section}/${a.id}`}
            className="article-row"
            style={{ color: "inherit" }}
          >
            <div>
              <div className="num">№ {toRoman(i + 1)}</div>
              <div className="num-sub">{a.kicker}</div>
            </div>
            <div>
              <div className="dateline" style={{ marginBottom: 8, color: "var(--crimson)" }}>
                {a.kicker}
              </div>
              <h3>{renderTitle(a.titleHtml)}</h3>
              <p className="dek">{a.dek}</p>
              <div className="meta">
                <span>By {a.author}</span>
                <span className="diamond" style={{ background: "var(--gold)" }} />
                <span>{a.date}</span>
                <span className="diamond" style={{ background: "var(--gold)" }} />
                <span>{a.readTime} read</span>
              </div>
            </div>
            <div className="art-side">
              <Engraving
                glyph={a.glyph}
                label={"PLATE · " + toRoman(i + 1)}
                caption={a.kicker}
                height="180px"
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
