import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScreenshotViewer } from "./ScreenshotViewer";
import type { Project } from "@/lib/projects";

const project: Project = {
  slug: "fixture-project",
  name: "Fixture Project",
  tier: "polished",
  year: "2026",
  blurb: "A fixture used only in tests.",
  stack: ["Test"],
  screens: [
    { src: "/screens/fixture-1.png", alt: "First screen", caption: "First screen", width: 800, height: 600 },
    { src: "/screens/fixture-2.png", alt: "Second screen", caption: "Second screen", width: 800, height: 600 },
    { src: "/screens/fixture-3.png", alt: "Third screen", caption: "Third screen", width: 800, height: 600 },
  ],
};

function openViewer() {
  fireEvent.click(screen.getByRole("button", { name: /view screens/i }));
}

describe("ScreenshotViewer", () => {
  it("is closed until the trigger is clicked", () => {
    render(<ScreenshotViewer project={project} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens a labelled dialog on the first screen and moves focus into it", () => {
    render(<ScreenshotViewer project={project} />);
    openViewer();

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveFocus();
    expect(screen.getByText("FIRST SCREEN")).toBeInTheDocument();
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("moves to the next and previous screen with arrow keys, wrapping around", () => {
    render(<ScreenshotViewer project={project} />);
    openViewer();
    const dialog = screen.getByRole("dialog");

    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(screen.getByText("2 / 3")).toBeInTheDocument();

    fireEvent.keyDown(dialog, { key: "ArrowLeft" });
    fireEvent.keyDown(dialog, { key: "ArrowLeft" });
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
    expect(screen.getByText("THIRD SCREEN")).toBeInTheDocument();
  });

  it("closes on Escape and returns focus to the trigger", () => {
    render(<ScreenshotViewer project={project} />);
    const trigger = screen.getByRole("button", { name: /view screens/i });
    fireEvent.click(trigger);

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on backdrop click and reopens fresh on the first screen", () => {
    const { container } = render(<ScreenshotViewer project={project} />);
    openViewer();
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "ArrowRight" });
    expect(screen.getByText("2 / 3")).toBeInTheDocument();

    const backdrop = container.querySelector(".fixed.inset-0");
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop as Element);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    openViewer();
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });
});
