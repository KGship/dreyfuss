"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const ITEMS = [
  { href: "/", label: "Cover", match: "home" },
  { href: "/science", label: "Science", match: "science" },
  { href: "/history", label: "History", match: "history" },
  { href: "/commerce", label: "Commerce", match: "commerce" },
  { href: "/about", label: "About", match: "about" },
  { href: "/contact", label: "Contact", match: "contact" },
  { href: "/subscribe", label: "Subscribe", match: "subscribe" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0]; // undefined on the cover

  const isActive = (match: string) => {
    if (match === "home") return segments.length === 0;
    // Section items stay lit on both the section landing and its articles.
    return first === match;
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        {ITEMS.map((it, i) => (
          <Fragment key={it.href}>
            {i > 0 && <span className="nav-sep" />}
            <Link
              href={it.href}
              className={"nav-item" + (isActive(it.match) ? " active" : "")}
            >
              {it.label}
            </Link>
          </Fragment>
        ))}
      </div>
    </nav>
  );
}
