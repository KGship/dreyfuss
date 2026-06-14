"use client";

import { useState, type FormEvent } from "react";

// Cream double-ruled subscribe block used on the cover.
export function InlineSubscribe() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    // Fire-and-display: confirmation shows regardless; endpoint is best-effort.
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "inline" }),
      });
    } catch {
      /* the reader still sees their confirmation */
    }
  }

  return (
    <section className="container" style={{ padding: "64px 0" }}>
      <div className="inline-subscribe">
        <div className="inline-subscribe-grid">
          <div>
            <div className="kicker">The Weekly Letter</div>
            <h3>
              One essay. <span className="italic">Sunday morning.</span>
            </h3>
            <p className="inline-subscribe-sub">
              The week&rsquo;s best essay. No algorithms, no advertisements, no charges.
            </p>
          </div>
          {!sent ? (
            <form onSubmit={onSubmit}>
              <div className="subscribe-form" style={{ background: "var(--paper)" }}>
                <input
                  type="email"
                  required
                  placeholder="reader@correspondence.address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Subscribe</button>
              </div>
              <div className="dateline" style={{ marginTop: 14, textAlign: "right" }}>
                Free, always · Unsubscribe in two clicks
              </div>
            </form>
          ) : (
            <div className="inline-subscribe-confirm">
              <div className="inline-subscribe-confirm-glyph">❦</div>
              <p>Welcome. Sunday will find you.</p>
              <div className="dateline">A confirmation has been dispatched to {email}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
