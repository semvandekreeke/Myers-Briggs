"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy hook. Observes the given section ids and returns whichever is
 * currently most prominent in the viewport, so the report navigation can
 * highlight the active section as the user scrolls.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  // Stable dependency so the observer is only rebuilt when the ids truly change,
  // not on every re-render (the `ids` array reference changes each render).
  const key = ids.join("|");

  useEffect(() => {
    const sectionIds = key.split("|").filter(Boolean);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the entry nearest the top of the viewport that's intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        // Trigger when a section reaches the upper third of the viewport.
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
