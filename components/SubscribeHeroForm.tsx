"use client";

import { useState, type FormEvent } from "react";

// Dark-hero email capture on the Subscribe view.
export function SubscribeHeroForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "subscribe" }),
      });
    } catch {
      /* the reader still sees their confirmation */
    }
  }

  if (sent) {
    return (
      <div className="subscribe-confirm">
        <div className="subscribe-confirm-glyph">❦</div>
        <p>Welcome to the readership.</p>
        <div className="dateline" style={{ color: "var(--gold-bright)", opacity: 0.85 }}>
          A confirmation has been dispatched to {email}
        </div>
      </div>
    );
  }

  return (
    <form className="subscribe-form" onSubmit={onSubmit}>
      <input
        type="email"
        required
        placeholder="reader@correspondence.address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Subscribe</button>
    </form>
  );
}
