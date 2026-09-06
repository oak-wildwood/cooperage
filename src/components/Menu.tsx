"use client";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useCollapsedPastHero } from "@/hooks/useCollapsedPastHero";

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

export function Menu() {
  const collapsed = useCollapsedPastHero("top");
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-line-800 bg-ink-800/90 backdrop-blur transition-[padding,box-shadow] duration-300 ${
        collapsed ? "py-2 shadow-lg shadow-black/20" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-12">
        <a href="#top" className="label text-paper hover:text-gold">
          OAK COOPER
        </a>

        <nav className="flex gap-7">
          {SECTIONS.map(({ id, label }) => {
            const isActive = id === activeSection;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`label transition-colors hover:text-gold ${
                  isActive ? "text-gold" : "text-paper-faint"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
