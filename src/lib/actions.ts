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
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const message = formData.get("message") as string | null;

  if (!name || !email || !message) {
    return { status: "error", message: "All fields are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Oak Cooper <contact@send.oakcooper.com>",
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) throw error;

    return { status: "success", message: "Message sent successfully." };
  } catch (error) {
    console.error("Failed to send contact message:", error);
    return { status: "error", message: "Failed to send message." };
  }
}
