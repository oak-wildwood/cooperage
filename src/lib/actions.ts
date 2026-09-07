"use server";

import { Resend } from "resend";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // TODO(oak) 1. Read `name`, `email`, `message` off `formData` with
  // `formData.get(...)`. Each comes back typed as `FormDataEntryValue | null`
  // (string | File | null), not `string` — narrow/cast before using them.

  // TODO(oak) 2. Validate. The form's `required`/`type="email"` attributes
  // are a UX nicety, not a security boundary: this function is a POST
  // endpoint anyone can hit directly, with or without the form in front of
  // it. Re-check non-empty name/message and a plausible email shape here.
  // On failure, return `{ status: "error", message: "..." }` — don't throw,
  // since a thrown error renders the framework's generic error UI instead of
  // the inline message this form is built to show.

  // TODO(oak) 3. Send the email: `await resend.emails.send({ ... })`.
  //   - `from`: must be a sender/domain verified in your Resend account —
  //     their sandbox domain works for testing before you verify one.
  //   - `to`: CONTACT_TO_EMAIL from env (see .env.example) — where you want
  //     this to land.
  //   - `replyTo`: the visitor's submitted address, so replying in your
  //     inbox goes straight to them instead of to Resend's sending address.
  //   - Wrap the call in try/catch. Resend can reject the request (bad key,
  //     unverified domain, rate limit) and that should become a friendly
  //     error state, not an unhandled rejection.

  // TODO(oak) 4. Return `{ status: "success", message: "..." }` once the
  // send call resolves.

  return { status: "error", message: "Not implemented yet." };
}
