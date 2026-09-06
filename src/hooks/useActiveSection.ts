import { useEffect, useState } from "react";

// Vertical position, in px from the viewport top, used to decide which
// section is "active." A section is active while this line falls inside its
// bounding box. Roughly matches the collapsed header's height.
const REFERENCE_LINE = 96;

interface SectionRect {
  id: string;
  top: number;
  bottom: number;
}

interface ScrollState {
  scrollY: number;
  viewportHeight: number;
  documentHeight: number;
  referenceLine?: number;
}

/**
 * Which section id the reference line currently sits over. Pure function —
 * no DOM access — so it's unit-testable with plain numbers instead of a real
 * page and a real scroll position.
 *
 * A section wrapping a very tall scroll region (e.g. a sticky panel stack)
 * can dominate the reference line for most of the scroll, and a short final
 * section immediately after it may never contain the line at all — there's
 * no scroll distance left in the document to move the line into it. The
 * `atBottom` check handles that case explicitly rather than relying on the
 * line ever crossing into the last section.
 */
export function computeActiveSection(
  sections: SectionRect[],
  {
    scrollY,
    viewportHeight,
    documentHeight,
    referenceLine = REFERENCE_LINE,
  }: ScrollState,
): string | null {
  if (sections.length === 0) return null;

  const atBottom = scrollY + viewportHeight >= documentHeight - 1;
  if (atBottom) return sections[sections.length - 1].id;

  for (const { id, top, bottom } of sections) {
    if (top <= referenceLine && bottom > referenceLine) {
      return id;
    }
  }

  return null;
}

function readSectionRects(elements: HTMLElement[]): SectionRect[] {
  return elements.map((el) => {
    const { top, bottom } = el.getBoundingClientRect();
    return { id: el.id, top, bottom };
  });
}

/**
 * Tracks which of the given section ids is currently "active" as the page
 * scrolls, re-deriving it from a plain `scroll` listener rather than
 * `IntersectionObserver` — the observer only refires on intersection
 * *changes*, and near the bottom of a page nothing changes for the last
 * stretch of scroll, so it can't drive the `atBottom` case above.
 */
export function useActiveSection(ids: string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Resolved once per mount, not per scroll event — the elements these ids
    // point to don't change out from under a static nav for the mount's life.
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    function update() {
      setActiveSection(
        computeActiveSection(readSectionRects(elements), {
          scrollY: window.scrollY,
          viewportHeight: window.innerHeight,
          documentHeight: document.documentElement.scrollHeight,
        }),
      );
    }

    // Coalesces to one recompute per animation frame regardless of how many
    // scroll events fire in between — native `scroll` can fire far more often
    // than the page paints, and each recompute forces a layout read.
    let ticking = false;
    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }

    update(); // set the initial state — don't wait for the first scroll event
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // `ids` is expected to be a stable, module-level constant at call sites.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeSection;
}
