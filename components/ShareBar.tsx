"use client";

import { useRef, useState } from "react";
import { useToast } from "./Toast";

interface ShareInfo {
  title: string;
  section: string;
  id: string;
}

function articleUrl(info: ShareInfo): string {
  // Prefer the live origin; fall back to the canonical press domain.
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://dreyfuss.press";
  return `${origin}/${info.section}/${info.id}`;
}

export function ShareBar(props: ShareInfo) {
  const toast = useToast();
  const [open, setOpen] = useState(false);

  const copy = () => {
    const url = articleUrl(props);
    navigator.clipboard?.writeText(url).catch(() => {});
    toast("Link copied to clipboard");
  };
  const email = () => {
    const url = articleUrl(props);
    window.location.href = `mailto:?subject=${encodeURIComponent(
      props.title,
    )}&body=${encodeURIComponent(url)}`;
  };
  const print = () => window.print();

  return (
    <>
      <div className="share-bar">
        <span className="share-bar-label">Share this essay</span>
        <div className="share-bar-actions">
          <button className="share-pill" onClick={copy}>
            <span className="share-pill-glyph">§</span> Copy Link
          </button>
          <button className="share-pill" onClick={email}>
            <span className="share-pill-glyph">✉</span> Email
          </button>
          <button className="share-pill" onClick={print}>
            <span className="share-pill-glyph">⎙</span> Print as PDF
          </button>
          <button className="share-pill" onClick={() => setOpen(true)}>
            <span className="share-pill-glyph">❦</span> More
          </button>
        </div>
      </div>

      {open && <ShareModal {...props} onClose={() => setOpen(false)} />}
    </>
  );
}

function ShareModal({ title, section, id, onClose }: ShareInfo & { onClose: () => void }) {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const url = articleUrl({ title, section, id });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div
          className="dateline"
          style={{ textAlign: "center", color: "var(--crimson)", marginBottom: 6 }}
        >
          Pass it Along
        </div>
        <h3>Share this essay</h3>
        <p className="modal-title-cite">&ldquo;{title}&rdquo;</p>
        <div className="share-options">
          <button
            className="share-option"
            onClick={() => {
              window.location.href = `mailto:?subject=${encodeURIComponent(
                title,
              )}&body=${encodeURIComponent(url)}`;
            }}
          >
            <span className="glyph">✉</span> Email
          </button>
          <button className="share-option" onClick={() => window.print()}>
            <span className="glyph">⎙</span> Print as PDF
          </button>
          <button className="share-option" onClick={() => toast("Shared to LinkedIn")}>
            <span className="glyph">in</span> LinkedIn
          </button>
          <button className="share-option" onClick={() => toast("Shared to X")}>
            <span className="glyph">×</span> Post on X
          </button>
        </div>
        <div className="share-link-row">
          <input ref={inputRef} defaultValue={url} readOnly />
          <button
            onClick={() => {
              inputRef.current?.select();
              navigator.clipboard?.writeText(url).catch(() => {});
              toast("Link copied to clipboard");
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
