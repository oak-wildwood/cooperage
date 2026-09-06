import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Native tsconfig `paths` resolution (e.g. `@/*`) — supersedes the
    // `vite-tsconfig-paths` plugin as of Vite's Rolldown-based build.
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
