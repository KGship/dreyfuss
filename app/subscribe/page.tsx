import type { Metadata } from "next";
import { SubscribeHeroForm } from "@/components/SubscribeHeroForm";

export const metadata: Metadata = {
  title: "Subscribe — The Dreyfuss Effect",
  description: "One essay. Sunday morning. Always free.",
};

export default function SubscribePage() {
  return (
    <main>
      <section className="subscribe-hero">
        <div className="dateline" style={{ color: "var(--gold-bright)", marginBottom: 12 }}>
          The Weekly Letter
        </div>
        <h2>
          One essay. <span className="gold">Sunday morning.</span>
          <br />
          Always free.
        </h2>
        <p>A single piece of long-form writing, delivered at dawn.</p>

        <SubscribeHeroForm />

        <div className="subscribe-stat">
          17,400 readers in 64 countries · Unsubscribe in two clicks
        </div>
      </section>

      {/* What you'll get */}
      <section className="container" style={{ padding: "72px 0" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="kicker">What lands on Sunday</div>
          <h3
            style={{
              fontFamily: "var(--serif-mast)",
              fontSize: 48,
              margin: "12px 0 12px",
              lineHeight: 1,
              fontWeight: 400,
            }}
          >
            The editor&rsquo;s{" "}
            <em style={{ color: "var(--crimson)", fontFamily: "var(--serif-display)" }}>
              choice
            </em>
          </h3>
          <p
            style={{
              fontFamily: "var(--serif-display)",
              fontStyle: "italic",
              fontSize: 20,
              color: "var(--ink-soft)",
              maxWidth: "52ch",
              margin: "0 auto",
              textWrap: "pretty",
            }}
          >
            One click to subscribe. Free in perpetuity.
          </p>
        </div>
      </section>
    </main>
  );
}
