import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockSend } = vi.hoisted(() => ({ mockSend: vi.fn() }));

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: mockSend } };
  }),
}));

import { sendContactMessage, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle", message: "" };

function formDataFrom(fields: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value);
  }
  return formData;
}

function validFormData() {
  return formDataFrom({ name: "Ada", email: "ada@example.com", message: "Hello" });
}

describe("sendContactMessage", () => {
  beforeEach(() => {
    mockSend.mockReset();
    process.env.CONTACT_TO_EMAIL = "oak@oakcooper.com";
  });

  it("rejects when a required field is missing", async () => {
    const formData = formDataFrom({ name: "Ada", email: "ada@example.com", message: "" });

    const result = await sendContactMessage(initialState, formData);

    expect(result).toEqual({ status: "error", message: "All fields are required." });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects a malformed email address", async () => {
    const formData = formDataFrom({ name: "Ada", email: "not-an-email", message: "Hello" });

    const result = await sendContactMessage(initialState, formData);

    expect(result.status).toBe("error");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("sends with the visitor's address as replyTo and reports success", async () => {
    mockSend.mockResolvedValueOnce({ data: { id: "abc" }, error: null });
    const formData = validFormData();

    const result = await sendContactMessage(initialState, formData);

    expect(result.status).toBe("success");
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "oak@oakcooper.com",
        replyTo: "ada@example.com",
        text: expect.stringContaining("Hello"),
      }),
    );
  });

  it("returns an error state when Resend rejects the send", async () => {
    mockSend.mockResolvedValueOnce({
      data: null,
      error: { message: "domain not verified" },
    });
    const formData = validFormData();

    const result = await sendContactMessage(initialState, formData);

    expect(result).toEqual({ status: "error", message: "Failed to send message." });
  });

  it("returns an error state when the send call throws", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockSend.mockRejectedValueOnce(new Error("network down"));
    const formData = validFormData();

    const result = await sendContactMessage(initialState, formData);

    expect(result).toEqual({ status: "error", message: "Failed to send message." });
  });
});
