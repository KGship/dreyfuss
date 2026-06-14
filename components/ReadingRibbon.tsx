"use client";

import { useEffect, useState } from "react";

// Fixed vertical scroll-progress ribbon down the left edge.
export function ReadingRibbon() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="ribbon">
      <div className="ribbon-progress" style={{ height: pct + "%" }} />
    </div>
  );
}
