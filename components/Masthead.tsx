import Link from "next/link";
import { toRoman } from "@/lib/roman";
import { TodayDate } from "./TodayDate";

// The letterpress nameplate. Volume/issue are dated in Roman numerals,
// the wordmark is set in Cinzel and returns the reader to the cover.
export function Masthead() {
  const volume = toRoman(8);
  const issue = toRoman(143);

  return (
    <header className="masthead">
      <div className="container-wide">
        <div className="masthead-top">
          <span>
            Vol. {volume} · No. {issue}
          </span>
          <div className="masthead-top-center">
            <span>An Editorial Publication, Published Weekly</span>
          </div>
          <span className="right">Established MMXIX</span>
        </div>

        <Link href="/" className="masthead-title" aria-label="The Dreyfuss Effect — home">
          The Dreyfuss Effect
        </Link>

        <div className="masthead-sub">
          Reports, Reflections, <span className="amp">&amp;</span> Reckonings from the long present
        </div>

        <div className="masthead-meta">
          <TodayDate />
          <span className="center">
            <span className="diamond" />
            ❦ &nbsp; Sapientia est Veritas &nbsp; ❦
            <span className="diamond" />
          </span>
          <span className="right">Reading Time · Approx. 47 min</span>
        </div>
      </div>
    </header>
  );
}
