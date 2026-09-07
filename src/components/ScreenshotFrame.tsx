import type { ReactNode } from "react";

/**
 * A fixed-size box that letterboxes an image via `object-contain`, so screens
 * of differing aspect ratios (portrait modals, wide browser dialogs,
 * landscape app views) frame consistently instead of sizing to each image's
 * native dimensions. `heightClassName` sets the box's height (e.g.
 * `"h-[46dvh] max-h-[460px]"`); the image inside should use
 * `max-h-full max-w-full object-contain` to letterbox within it.
 */
export function ScreenshotFrame({
  heightClassName,
  className = "",
  children,
}: {
  heightClassName: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex w-full items-center justify-center overflow-hidden border border-line-700 bg-ink-900 ${heightClassName} ${className}`}
    >
      {children}
    </div>
  );
}
