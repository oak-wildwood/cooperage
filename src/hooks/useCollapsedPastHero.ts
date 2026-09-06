import { useEffect, useState } from "react";

/**
 * True once the element with the given id has scrolled out of view — e.g.
 * for collapsing a sticky header once the hero section is behind it.
 */
export function useCollapsedPastHero(sentinelId: string): boolean {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCollapsed(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [sentinelId]);

  return collapsed;
}
