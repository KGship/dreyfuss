"use client";

import { useState, type FormEvent } from "react";
import { useToast } from "./Toast";

// Essay-pitch form. Submits to the stub /api/submit endpoint.
export function SubmitForm() {
  const toast = useToast();
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setPending(true);
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast("Pitch received. We will reply within fourteen days.");
      form.reset();
    } catch {
      toast("The post is slow today — please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="submit-form" style={{ padding: 0, marginTop: 40 }} onSubmit={onSubmit}>
      <h3>Pitch us here</h3>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" type="text" placeholder="Cordelia Marwood" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@correspondence.address"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="section">Section</label>
        <select id="section" name="section" defaultValue="" required>
          <option value="" disabled>
            Please select
          </option>
          <option value="science">Science</option>
          <option value="history">History</option>
          <option value="commerce">Commerce</option>
          <option value="other">I am not yet sure</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="title">Working title</label>
        <input id="title" name="title" type="text" placeholder="On the Lyric Life of —" />
      </div>
      <div className="field">
        <label htmlFor="pitch">The pitch — two paragraphs</label>
        <textarea
          id="pitch"
          name="pitch"
          placeholder="Tell us what the essay would argue, and why you are the person to write it…"
        />
      </div>
      <button type="submit" className="btn-primary" disabled={pending}>
        Send the Pitch &nbsp;→
      </button>
    </form>
  );
}
