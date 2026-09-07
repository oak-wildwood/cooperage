/**
 * The work, and how finished each piece actually is.
 *
 * The maturity tier is the point of this section: showing unfinished work with the
 * unfinished part labelled is the claim the whole site makes. Design for the tiers,
 * not for these five projects — the roster will churn, the axis won't.
 */

export type Tier = "polished" | "building" | "prototype" | "planned";

export const TIERS: Record<
  Tier,
  { label: string; note: string; steps: number }
> = {
  polished: { label: "Polished", note: "Shipped. In use. Finished.", steps: 4 },
  building: { label: "In progress", note: "Real, and still moving.", steps: 3 },
  prototype: { label: "Prototype", note: "A sketch that runs.", steps: 2 },
  planned: { label: "Planned", note: "Not built yet.", steps: 1 },
};

export type Screen = {
  /** Path under /public/screens/. */
  src: string;
  /** Describes the UI for someone who can't see it — not "screenshot of app". */
  alt: string;
  /** Shown under the image while cycling. */
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  /** For names that don't say what the thing is on their own (Cairn,
   * cooperage) — a plain-language gloss shown next to the name. Most
   * projects don't need one. */
  tagline?: string;
  tier: Tier;
  year: string;
  blurb: string;
  stack: string[];
  repo?: string;
  live?: string;
  /** Empty is legitimate — a prototype with nothing to show says so. */
  screens: Screen[];
};

export const PROJECTS: Project[] = [
  {
    slug: "work-search-log",
    name: "Work Search Log",
    tier: "polished",
    year: "2026",
    blurb:
      "A private log for job-search activity — built to satisfy the record most US unemployment agencies can demand at any time, for any week of a benefit year.",
    stack: ["Vue 3", "TypeScript", "Vitest", "Accessibility"],
    repo: "https://github.com/oak-wildwood/work-search-log",
    screens: [
      {
        src: "/screens/wsl/home.png",
        alt: "Work Search Log's main view: this week's activity count, a form to log a new activity, and a collapsible history grouped by week.",
        caption: "This week, at a glance",
        width: 1453,
        height: 1198,
      },
      {
        src: "/screens/wsl/settings.png",
        alt: "The preferences panel, with state, the weekly activity requirement, and a theme toggle.",
        caption: "Set once per claim",
        width: 850,
        height: 1075,
      },
      {
        src: "/screens/wsl/print.png",
        alt: "The browser print dialog over a formatted, print-ready copy of the work search record.",
        caption: "A record TWC can ask for",
        width: 2268,
        height: 1492,
      },
    ],
  },
  {
    slug: "cairn",
    name: "Cairn",
    tagline: "IFS Parts Map",
    tier: "polished",
    year: "2026",
    blurb:
      "A radial map for Internal Family Systems parts work. Self fixed at the center, parts placed around it by role, connected by lines that show how they relate.",
    stack: ["Svelte", "D3", "TypeScript", "SVG"],
    repo: "https://github.com/oak-wildwood/cairn",
    screens: [
      {
        src: "/screens/cairn/detail.png",
        alt: "The radial parts map with a part's detail panel open, showing its role, triggers, fears, and connections to other parts.",
        caption: "Self at the center, parts placed by role",
        width: 3518,
        height: 2382,
      },
      {
        src: "/screens/cairn/add.png",
        alt: "The 'Add a part' form, with role options — manager, firefighter, exile — and fields for trigger and positive intention.",
        caption: "Naming a part on your terms",
        width: 1444,
        height: 1566,
      },
      {
        src: "/screens/cairn/export.png",
        alt: "The map mid-export, cycling through each part to build a shareable image.",
        caption: "Exporting the whole map",
        width: 2640,
        height: 1792,
      },
      {
        src: "/screens/cairn/export-pdf.png",
        alt: "The exported map as a paginated PDF, one part's detail per page.",
        caption: "One part per page, ready to print",
        width: 3518,
        height: 2398,
      },
    ],
  },
  {
    slug: "postmarked",
    name: "Postmarked",
    tier: "building",
    year: "2026",
    blurb:
      "A postcard tracker my household opens every day — address book, photos, and where each card is on its way to. Built for us, kept because it works.",
    stack: ["Vue 3", "Pinia", "Firebase", "PWA"],
    screens: [],
  },
  {
    slug: "cooperage",
    name: "cooperage",
    tagline: "Dev Portfolio",
    tier: "building",
    year: "2026",
    blurb:
      "This site. Next 16 and React Server Components, written in the open — the repository is as much the exhibit as the page you are reading.",
    stack: ["Next 16", "RSC", "Tailwind v4", "TypeScript"],
    repo: "https://github.com/oak-wildwood/cooperage",
    screens: [
      {
        src: "/screens/cooperage/home.png",
        alt: "cooperage's hero section: name, role, a quick-reference panel, and the start of the About section below.",
        caption: "The repository is as much the exhibit",
        width: 3530,
        height: 1978,
      },
    ],
  },
  {
    slug: "recipe-site",
    name: "Recipe Site",
    tier: "planned",
    year: "—",
    blurb:
      "A place for the recipes that already work. Angular on purpose: twelve years of it in production and nothing public to point at.",
    stack: ["Angular", "TypeScript", "Signals"],
    screens: [],
  },
];
