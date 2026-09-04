# Project screenshots

Drop screenshots here, then reference them from `src/lib/projects.ts` in each
project's `screens` array.

Naming: `<slug>-<n>.png` — e.g. `work-search-log-1.png`, `cairn-2.png`.

The first screen in the array is the one shown on the project's panel in the stack;
the rest appear when the panel is opened. Two or three per project is plenty.

Record the real pixel dimensions in `projects.ts` — `next/image` needs them to
reserve space and avoid layout shift.
