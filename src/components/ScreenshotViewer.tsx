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
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
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

  const screen = screens[index];

  function goPrev() {
    setIndex((current) => (current - 1 + screens.length) % screens.length);
  }

  function goNext() {
    setIndex((current) => (current + 1) % screens.length);
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
      case "Escape":
        setIsOpen(false);
        break;
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
        className:
          "border-b border-gold pb-1 font-mono text-xs font-semibold tracking-[0.16em] text-gold",
        content: <>VIEW SCREENS &nbsp;→</>,
      };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setIndex(0);
          setIsOpen(true);
        }}
        aria-label={trigger.label}
        className={trigger.className}
      >
        {trigger.content}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink-900/90 p-8"
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
            className="relative flex w-full max-w-6xl flex-col border border-line-700 bg-ink-800 p-6"
          >
            <div className="flex items-center justify-between">
              <h2 id={titleId} className="label">
                {name.toUpperCase()} &nbsp;/&nbsp; SCREENS
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close screenshot viewer"
                className="font-mono text-xs font-semibold tracking-[0.16em] text-paper-faint transition-colors hover:text-paper"
              >
                CLOSE ✕
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <NavButton
                onClick={goPrev}
                disabled={screens.length < 2}
                label="Previous screenshot"
                glyph="←"
              />

              <ScreenshotFrame size="overlay" className="flex-1">
                <Image
                  key={screen.src}
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  className="max-h-full max-w-full object-contain"
                />
              </ScreenshotFrame>

              <NavButton
                onClick={goNext}
                disabled={screens.length < 2}
                label="Next screenshot"
                glyph="→"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="label tracking-[0.18em]">
                {screen.caption.toUpperCase()}
              </span>
              <span className="label text-[11px] tracking-[0.12em]">
                {index + 1} / {screens.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
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
      className="font-mono text-lg text-paper-dim transition-colors hover:text-gold disabled:pointer-events-none disabled:opacity-30"
    >
      {glyph}
    </button>
  );
}
