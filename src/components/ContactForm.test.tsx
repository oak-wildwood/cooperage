import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockSendContactMessage } = vi.hoisted(() => ({
  mockSendContactMessage: vi.fn(),
}));

vi.mock("@/lib/actions", () => ({
  sendContactMessage: mockSendContactMessage,
}));

import { ContactForm } from "./ContactForm";

function fillForm() {
  fireEvent.change(screen.getByLabelText("NAME"), {
    target: { value: "Ada Lovelace" },
  });
  fireEvent.change(screen.getByLabelText("EMAIL"), {
    target: { value: "ada@example.com" },
  });
  fireEvent.change(screen.getByLabelText("MESSAGE"), {
    target: { value: "Hello there" },
  });
}

describe("ContactForm", () => {
  beforeEach(() => {
    mockSendContactMessage.mockReset();
  });

  it("shows the fields initially", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("NAME")).toBeInTheDocument();
    expect(screen.getByLabelText("EMAIL")).toBeInTheDocument();
    expect(screen.getByLabelText("MESSAGE")).toBeInTheDocument();
  });

  it("replaces the form with a success message, then brings it back on reset", async () => {
    mockSendContactMessage.mockResolvedValueOnce({
      status: "success",
      message: "Message sent successfully.",
    });
    render(<ContactForm />);
    fillForm();

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Message sent successfully.")).toBeInTheDocument();
    });
    expect(screen.queryByLabelText("NAME")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /send another message/i }));

    expect(screen.getByLabelText("NAME")).toBeInTheDocument();
    expect(screen.queryByText("Message sent successfully.")).not.toBeInTheDocument();
  });

  it("shows an inline error and keeps the form visible when sending fails", async () => {
    mockSendContactMessage.mockResolvedValueOnce({
      status: "error",
      message: "Failed to send message.",
    });
    render(<ContactForm />);
    fillForm();

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
    });
    expect(screen.getByLabelText("NAME")).toBeInTheDocument();
  });
});
