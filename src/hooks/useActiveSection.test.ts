import { describe, expect, it } from "vitest";
import { computeActiveSection } from "./useActiveSection";

describe("computeActiveSection", () => {
  it("returns null when there are no sections", () => {
    expect(
      computeActiveSection([], { scrollY: 0, viewportHeight: 1000, documentHeight: 1000 }),
    ).toBeNull();
  });

  it("returns null above the first section", () => {
    const sections = [{ id: "about", top: 500, bottom: 1000 }];
    expect(
      computeActiveSection(sections, { scrollY: 0, viewportHeight: 1000, documentHeight: 2000 }),
    ).toBeNull();
  });

  it("returns the section whose box contains the reference line", () => {
    const sections = [
      { id: "about", top: -500, bottom: 50 },
      { id: "experience", top: 50, bottom: 600 },
      { id: "skills", top: 600, bottom: 1200 },
    ];
    expect(
      computeActiveSection(sections, {
        scrollY: 500,
        viewportHeight: 1000,
        documentHeight: 3000,
        referenceLine: 96,
      }),
    ).toBe("experience");
  });

  it("respects a custom reference line", () => {
    const sections = [
      { id: "about", top: -500, bottom: 50 },
      { id: "experience", top: 50, bottom: 600 },
    ];
    expect(
      computeActiveSection(sections, {
        scrollY: 0,
        viewportHeight: 1000,
        documentHeight: 3000,
        referenceLine: 10,
      }),
    ).toBe("about");
  });

  // The exact scenario that broke two earlier implementations: a very tall
  // section (a sticky panel stack) immediately followed by a short one. At
  // the bottom of the page there's no scroll distance left to move the
  // reference line inside the short section, so its bounding box never
  // contains the line — the terminal case has to be handled explicitly.
  it("activates the last section once the page is scrolled to the bottom, even if the line never reaches it", () => {
    const sections = [
      { id: "work", top: -5045, bottom: 613 },
      { id: "contact", top: 613, bottom: 1142 },
    ];
    expect(
      computeActiveSection(sections, {
        scrollY: 8344.5,
        viewportHeight: 1142,
        documentHeight: 9486,
      }),
    ).toBe("contact");
  });

  it("does not force the last section before the page has actually reached bottom", () => {
    const sections = [
      { id: "work", top: -5045, bottom: 613 },
      { id: "contact", top: 613, bottom: 1142 },
    ];
    expect(
      computeActiveSection(sections, {
        scrollY: 8000,
        viewportHeight: 1142,
        documentHeight: 9486,
      }),
    ).toBe("work");
  });
});
