import type { ReactNode } from "react";

/** The two places this frame is used: a project panel's cover slot, and the
 * screenshot viewer's overlay. Heights live here, not at each call site, so
 * adding a third consumer doesn't mean inventing another magic number. */
const SIZES = {
  cover: "h-[46dvh] max-h-[460px]",
  // Below `sm` the frame sizes to whatever the current screen actually
  // renders at (capped for safety) instead of reserving a fixed 70vh —
  // most of these screenshots are landscape desktop app UI, and a fixed
  // portrait-viewport-height box around one leaves most of the box empty.
  // `sm` and up keeps the original fixed box: at that width the frame
  // rarely spans the full viewport height anyway, so there's no dead space
  // to reclaim, and a fixed size means screens don't jump around while
  // cycling through a project's shots.
  overlay: "max-h-[60vh] sm:h-[70vh] sm:max-h-[760px]",
} as const;

export type ScreenshotFrameSize = keyof typeof SIZES;

/** The cover slot's height, reused by `ProjectPanel`'s empty-screens
 * placeholder so panels don't jump in height between projects with and
 * without screens. */
export const coverFrameHeightClassName = SIZES.cover;

/**
 * A fixed-size box that letterboxes an image via `object-contain`, so screens
 * of differing aspect ratios (portrait modals, wide browser dialogs,
 * landscape app views) frame consistently instead of sizing to each image's
 * native dimensions. The image inside should use
 * `max-h-full max-w-full object-contain` to letterbox within it.
 */
export function ScreenshotFrame({
  size,
  className = "",
  children,
}: {
  size: ScreenshotFrameSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex w-full items-center justify-center overflow-hidden border border-line-700 bg-ink-900 ${SIZES[size]} ${className}`}
    >
      {children}
    </div>
  );
}
