"use client";

import { useEffect, useState } from "react";

function format(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Today's full date, computed at render — as in the prototype masthead.
export function TodayDate() {
  const [date, setDate] = useState(() => format(new Date()));
  useEffect(() => {
    setDate(format(new Date()));
  }, []);
  return <span suppressHydrationWarning>{date}</span>;
}
