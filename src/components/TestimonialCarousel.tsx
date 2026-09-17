"use client";

import { useState, type KeyboardEvent } from "react";
import type { Testimonial } from "@/lib/testimonials";

/**
 * Manual-only cycling — prev/next plus dot indicators, no autoplay. The dots
 * reuse the tier meter's lit-gold/dim-dashed language (`TierMeter.tsx`)
 * rather than inventing a new indicator style. Arrow keys work as soon as
 * anything inside (a nav button, a dot) has focus, since the handler sits on
 * the wrapping div and keydown bubbles up to it.
 */
export function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];
  const canCycle = testimonials.length > 1;

  function goPrev() {
    setIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  }

  function goNext() {
    setIndex((current) => (current + 1) % testimonials.length);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") goPrev();
    if (event.key === "ArrowRight") goNext();
  }

  return (
    <div className="mt-11 lg:mt-14" onKeyDown={onKeyDown}>
      <div className="flex items-start gap-3 sm:gap-6">
        <NavButton
          onClick={goPrev}
          disabled={!canCycle}
          label="Previous recommendation"
          glyph="←"
        />

        <div
          aria-live="polite"
          className="min-h-[220px] max-w-[68ch] flex-1 sm:min-h-[180px]"
        >
          <blockquote className="font-read text-[clamp(1.15rem,2vw,1.5rem)] font-light leading-[1.5] text-paper">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 font-mono text-[11.5px] tracking-[0.1em] text-paper-faint">
            <span className="font-semibold text-gold">
              {testimonial.name.toUpperCase()}
            </span>
            {" — "}
            {testimonial.title.toUpperCase()}
            {testimonial.company && ` · ${testimonial.company.toUpperCase()}`}
            {testimonial.relationship && (
              <span className="mt-1 block text-paper-ghost">
                {testimonial.relationship}
              </span>
            )}
          </figcaption>
        </div>

        <NavButton
          onClick={goNext}
          disabled={!canCycle}
          label="Next recommendation"
          glyph="→"
        />
      </div>

      {canCycle && (
        <div
          role="group"
          aria-label="Choose a recommendation"
          className="mt-8 flex items-center gap-2.5 pl-[calc(2rem+0.75rem)] sm:pl-[calc(2rem+1.5rem)]"
        >
          {testimonials.map((t, i) =>
            i === index ? (
              <button
                key={t.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show recommendation from ${t.name}`}
                aria-current
                className="h-[3px] w-6 shrink-0"
                style={{
                  background: "var(--color-gold)",
                  boxShadow: "0 0 7px rgba(232,201,140,.65)",
                }}
              />
            ) : (
              <button
                key={t.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show recommendation from ${t.name}`}
                className="h-0 w-6 shrink-0 border-t-[1.5px] border-dashed border-line-700 transition-colors hover:border-line-600"
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

function NavButton({
  onClick,
  disabled,
  label,
  glyph,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  glyph: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-8 shrink-0 items-center justify-center font-mono text-lg text-paper-dim transition-colors hover:text-gold disabled:pointer-events-none disabled:opacity-30"
    >
      {glyph}
    </button>
  );
}
