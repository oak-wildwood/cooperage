"use client";
import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useCollapsedPastHero } from "@/hooks/useCollapsedPastHero";
import { useEscapeToClose } from "@/hooks/useEscapeToClose";

/**
 * The collapsing top bar. Static shell is done — jump links work with zero JS
 * because `scroll-behavior: smooth` is already set globally (globals.css:50).
 *
 * All scroll-driven state lives in `src/hooks` — this component is just the
 * markup, which is what makes it a small, obvious "use client" island rather
 * than a large one: the effects and their DOM reads are testable in
 * isolation, independent of this render.
 *
 * Local section list on purpose, not imported from @/lib/projects — anything
 * this file imports ships to the browser, and this data is tiny and static
 * anyway.
 */
const SECTIONS = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "skills", label: "SKILLS" },
  { id: "work", label: "WORK" },
  { id: "contact", label: "CONTACT" },
];

const SECTION_IDS = SECTIONS.map(({ id }) => id);

// Shared by all three hamburger bars — only the transition/transform varies
// between them, per bar, below.
const HAMBURGER_BAR = "absolute h-px w-6 bg-paper";

export function Menu() {
  const collapsed = useCollapsedPastHero("top");
  const activeSection = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);

  // Below `lg` there's no room for the full link row, so it collapses into a
  // toggle. Locking scroll while it's open keeps the page from moving behind
  // the dropdown.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEscapeToClose(open, () => setOpen(false));

  // Computed once and rendered into both the desktop row and the mobile
  // list below, rather than re-deriving `isActive` in each.
  const sectionLinks = SECTIONS.map(({ id, label }) => ({
    id,
    label,
    isActive: id === activeSection,
  }));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-line-800 bg-ink-800/90 backdrop-blur transition-[padding,box-shadow] duration-300 ${
        collapsed ? "py-2 shadow-lg shadow-black/20" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between section-x">
        <a
          href="#top"
          className="label text-paper hover:text-gold"
          onClick={() => setOpen(false)}
        >
          OAK COOPER
        </a>

        <nav className="hidden gap-7 lg:flex">
          {sectionLinks.map(({ id, label, isActive }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`label transition-colors hover:text-gold ${
                isActive ? "text-gold" : "text-paper-faint"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative -mr-2.5 flex h-11 w-11 shrink-0 items-center justify-center lg:hidden"
        >
          <span
            className={`${HAMBURGER_BAR} transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-[5px]"
            }`}
          />
          <span
            className={`${HAMBURGER_BAR} transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`${HAMBURGER_BAR} transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-[5px]"
            }`}
          />
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Section"
        className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul
            className={`flex flex-col border-t section-x transition-colors duration-300 ${
              open ? "border-line-800" : "border-transparent"
            }`}
          >
            {sectionLinks.map(({ id, label, isActive }) => (
              <li
                key={id}
                className="border-b border-line-800 last:border-none"
              >
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`label flex h-14 items-center text-[13px] transition-colors ${
                    isActive ? "text-gold" : "text-paper-faint"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
