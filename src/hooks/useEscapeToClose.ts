import { useEffect, useRef } from "react";

/**
 * Closes an open overlay (dropdown, dialog) on Escape. Shared by `Menu`'s
 * mobile nav and `ScreenshotViewer`'s lightbox — both dismiss the same way,
 * so the listener lives once rather than being re-authored per component.
 *
 * `onClose` is read from a ref rather than listed as an effect dependency, so
 * passing an inline closure doesn't tear down and re-attach the listener on
 * every render — only an `active` transition does that.
 */
export function useEscapeToClose(active: boolean, onClose: () => void): void {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!active) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCloseRef.current();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);
}
