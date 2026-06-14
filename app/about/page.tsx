import type { Metadata } from "next";
import { Dingbat } from "@/components/Ornaments";

export const metadata: Metadata = {
  title: "About — The Dreyfuss Effect",
  description:
    "A quiet press for the long present. Essays for readers who would rather not finish in a hurry.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="container">
        <div className="about-hero">
          <div className="kicker">On the Publication</div>
          <h1>
            About <em>The Dreyfuss Effect</em>
          </h1>
          <p className="standfirst">
            A quiet press for the long present. Essays for readers who would rather not finish
            in a hurry.
          </p>
          <div style={{ marginTop: 32 }}>
            <Dingbat glyph="❦" />
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "8px 0 8px" }}>
        <div className="about-cols">
          {/* Left — The Purpose */}
          <div className="about-col-main">
            <h3 className="about-col-head">The Purpose</h3>
            <hr className="rule" style={{ background: "var(--crimson)", margin: "0 0 22px" }} />
            <p>
              The Dreyfuss Effect was founded with the conviction that the fundamental
              questions of our time deserve more than a passing glance. In an age where
              information travels faster than understanding, our endeavour seeks to inspire
              careful consideration. We concern ourselves with science, history, and commerce,
              not because they encompass everything, but because they provide inspiration for
              impassioned and intellectual dissent. The Dreyfuss Effect is not intended for
              those who seek easy answers and comfortable conclusions, but for those who
              indulge in restlessness and rigor.
            </p>
          </div>

          {/* Right — stacked Publication + Podcast */}
          <div className="about-col-side">
            <div className="about-card">
              <div className="about-card-tag">Now Publishing</div>
              <h4 className="about-col-head">The Publication</h4>
              <hr className="rule" style={{ background: "var(--crimson)", margin: "0 0 16px" }} />
              <p>
                Our essays offer a blend of personal experience and informed analysis for those
                who may be short on time but refuse to be short on substance. Each piece
                contributes one voice to a busy conversation and one perspective to a busy
                world. We publish on Sunday mornings.
              </p>
            </div>
            <div className="about-card">
              <div className="about-card-tag gold">Coming Soon</div>
              <h4 className="about-col-head">The Podcast</h4>
              <hr className="rule" style={{ background: "var(--crimson)", margin: "0 0 16px" }} />
              <p>
                The Dreyfuss Effect Aloud brings science, history, and commerce to the table. It
                is an exercise in the collective inquiry, reasoning, and reconciliation of
                truth. Production begins this coming spring.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-narrow" style={{ padding: "56px 0 64px", textAlign: "center" }}>
        <Dingbat glyph="❦" />
        <p
          style={{
            fontFamily: "var(--serif-display)",
            fontStyle: "italic",
            fontSize: 22,
            color: "var(--ink-soft)",
            lineHeight: 1.5,
            marginTop: 24,
            textWrap: "pretty",
          }}
        >
          A name is not merely a title, but a declaration of intent. We chose the Dreyfuss
          Effect because it exemplifies our mission. A practical exchange of information, a
          deeper school of thought, a silent ripple.
        </p>
        <div className="dateline" style={{ color: "var(--crimson)", marginTop: 22 }}>
          The Editors
        </div>
      </section>
    </main>
  );
}
