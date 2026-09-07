// Extends Vitest's `expect` with jest-dom matchers (`toBeInTheDocument`, etc.)
// for any test that renders a component. Loaded automatically for every test
// file — see `vitest.config.mts`.
import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// `vitest.config.mts` doesn't enable `test.globals`, so React Testing
// Library's own auto-cleanup (which relies on a global `afterEach`) never
// registers — without this, one test's render leaks into the next.
afterEach(() => {
  cleanup();
});
