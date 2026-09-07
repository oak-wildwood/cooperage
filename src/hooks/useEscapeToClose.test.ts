import { fireEvent, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useEscapeToClose } from "./useEscapeToClose";

describe("useEscapeToClose", () => {
  it("calls onClose when Escape is pressed while active", () => {
    const onClose = vi.fn();
    renderHook(() => useEscapeToClose(true, onClose));

    fireEvent.keyDown(window, { key: "Escape" });

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("ignores Escape while inactive", () => {
    const onClose = vi.fn();
    renderHook(() => useEscapeToClose(false, onClose));

    fireEvent.keyDown(window, { key: "Escape" });

    expect(onClose).not.toHaveBeenCalled();
  });

  it("ignores keys other than Escape", () => {
    const onClose = vi.fn();
    renderHook(() => useEscapeToClose(true, onClose));

    fireEvent.keyDown(window, { key: "Enter" });

    expect(onClose).not.toHaveBeenCalled();
  });

  it("stops listening once inactive", () => {
    const onClose = vi.fn();
    const { rerender } = renderHook(
      ({ active }) => useEscapeToClose(active, onClose),
      { initialProps: { active: true } },
    );

    rerender({ active: false });
    fireEvent.keyDown(window, { key: "Escape" });

    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls the latest onClose without re-subscribing on every render", () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderHook(
      ({ onClose }) => useEscapeToClose(true, onClose),
      { initialProps: { onClose: first } },
    );

    // A new callback identity each render (as an inline closure would
    // produce) must not leave a stale listener calling the old one, or a
    // second listener calling both.
    rerender({ onClose: second });
    fireEvent.keyDown(window, { key: "Escape" });

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledOnce();
  });
});
