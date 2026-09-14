"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import type { Project } from "@/lib/projects";
import { useEscapeToClose } from "@/hooks/useEscapeToClose";
import { ScreenshotFrame } from "./ScreenshotFrame";

/**
 * Trigger + overlay for cycling through a project's screens. Self-contained,
 * like `Menu.tsx`: this file owns the open/closed state and the trigger that
 * flips it, so callers only need to mount it behind the existing
 * `screens.length > 0` guard.
 *
 * `children`, when given, replaces the default "VIEW SCREENS" text as the
 * trigger's content (used for the cover image in `ProjectPanel`) — each
 * instance is independent, so the text trigger and the image trigger for the
 * same project are two separate, self-contained mounts rather than one
 * shared piece of state.
 */
export function ScreenshotViewer({
  project,
  children,
}: {
  project: Project;
  children?: ReactNode;
}) {
  const { screens, name } = project;
  const hasMobile = screens.some((s) => (s.device ?? "mobile") === "mobile");
  const hasDesktop = screens.some((s) => s.device === "desktop");
  const showDeviceToggle = hasMobile && hasDesktop;
  const defaultDevice = hasMobile ? "mobile" : "desktop";

  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [device, setDevice] = useState<"mobile" | "desktop">(defaultDevice);
  // Tracked by src, not a single boolean, so flipping through screens that
  // were already loaded (including a revisit after closing and reopening —
  // this component stays mounted) doesn't re-show the pulse for images the
  // browser already has cached.
  const [loadedSrcs, setLoadedSrcs] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Runs only on open→close transitions (the guard skips the initial mount,
  // when isOpen starts false) — the cleanup is what returns focus to the
  // trigger, whether closed via Escape, the close button, or unmount.
  useEffect(() => {
    if (!isOpen) return;
    const trigger = triggerRef.current;
    dialogRef.current?.focus();
    return () => {
      trigger?.focus();
    };
  }, [isOpen]);

  // Locks scroll while the overlay is open, same as Menu.tsx's mobile
  // dropdown — otherwise the page behind the dialog scrolls with it.
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEscapeToClose(isOpen, () => setIsOpen(false));

  // Unfiltered when there's nothing to filter (the common case: one device,
  // no `device` tags at all) so untagged projects behave exactly as before.
  const visibleScreens = showDeviceToggle
    ? screens.filter((s) => (s.device ?? "mobile") === device)
    : screens;
  const screen = visibleScreens[index];
  const isLoaded = loadedSrcs.has(screen.src);

  function goPrev() {
    setIndex(
      (current) =>
        (current - 1 + visibleScreens.length) % visibleScreens.length,
    );
  }

  function goNext() {
    setIndex((current) => (current + 1) % visibleScreens.length);
  }

  function selectDevice(next: "mobile" | "desktop") {
    setDevice(next);
    setIndex(0);
  }

  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>("button");
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowLeft":
        goPrev();
        break;
      case "ArrowRight":
        goNext();
        break;
      case "Tab":
        trapFocus(event);
        break;
    }
  }

  const trigger = children
    ? {
        label: `View all screens for ${name}`,
        className: "block w-full text-left",
        content: children,
      }
    : {
        label: undefined,
        className: "action-label border-b border-gold pb-1 text-gold",
        content: <>VIEW SCREENS &nbsp;→</>,
      };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setIndex(0);
          setDevice(defaultDevice);
          setIsOpen(true);
        }}
        aria-label={trigger.label}
        className={trigger.className}
      >
        {trigger.content}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink-900/90 p-4 sm:p-8"
          onClick={() => setIsOpen(false)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            onKeyDown={onKeyDown}
            onClick={(event) => event.stopPropagation()}
            className="relative flex w-full max-w-6xl flex-col border border-line-700 bg-ink-800 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 id={titleId} className="label">
                {name.toUpperCase()} &nbsp;/&nbsp; SCREENS
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close screenshot viewer"
                className="action-label shrink-0 whitespace-nowrap text-paper-faint transition-colors hover:text-paper"
              >
                CLOSE ✕
              </button>
            </div>

            {showDeviceToggle && (
              <div
                role="group"
                aria-label="Screenshot device"
                className="mt-3 flex items-center gap-4 sm:mt-4"
              >
                <DeviceButton
                  label="MOBILE"
                  active={device === "mobile"}
                  onClick={() => selectDevice("mobile")}
                />
                <DeviceButton
                  label="DESKTOP"
                  active={device === "desktop"}
                  onClick={() => selectDevice("desktop")}
                />
              </div>
            )}

            <div className="mt-4 flex items-center gap-1.5 sm:mt-6 sm:gap-4">
              <NavButton
                onClick={goPrev}
                disabled={visibleScreens.length < 2}
                label="Previous screenshot"
                glyph="←"
              />

              <ScreenshotFrame size="overlay" className="relative flex-1">
                {!isLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-ink-600" />
                )}
                <Image
                  key={screen.src}
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  onLoad={() =>
                    setLoadedSrcs((prev) =>
                      prev.has(screen.src)
                        ? prev
                        : new Set(prev).add(screen.src),
                    )
                  }
                  className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </ScreenshotFrame>

              <NavButton
                onClick={goNext}
                disabled={visibleScreens.length < 2}
                label="Next screenshot"
                glyph="→"
              />
            </div>

            <div className="mt-4 flex items-start justify-between gap-3">
              <span className="label tracking-[0.18em]">
                {screen.caption.toUpperCase()}
              </span>
              <span className="label shrink-0 whitespace-nowrap text-[11px] tracking-[0.12em]">
                {index + 1} / {visibleScreens.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DeviceButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`action-label border-b pb-1 transition-colors ${
        active
          ? "border-gold text-gold"
          : "border-transparent text-paper-faint hover:text-paper-dim"
      }`}
    >
      {label}
    </button>
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
      className="flex h-11 w-8 shrink-0 items-center justify-center font-mono text-lg text-paper-dim transition-colors hover:text-gold disabled:pointer-events-none disabled:opacity-30 sm:h-auto sm:w-auto"
    >
      {glyph}
    </button>
  );
}
