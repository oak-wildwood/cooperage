import type { ReactNode } from "react";

/** The two places this frame is used: a project panel's cover slot, and the
 * screenshot viewer's overlay. Heights live here, not at each call site, so
 * adding a third consumer doesn't mean inventing another magic number. */
const SIZES = {
  cover: "h-[46dvh] max-h-[460px]",
  overlay: "h-[70vh] max-h-[760px]",
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
