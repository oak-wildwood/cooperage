"use client";

import { useActionState, useState } from "react";
import { sendContactMessage, type ContactFormState } from "@/lib/actions";

const initialState: ContactFormState = { status: "idle", message: "" };

const fieldClass =
  "w-full border border-line-700 bg-transparent px-4 py-3 font-mono text-sm text-paper outline-none transition-colors placeholder:text-paper-ghost focus:border-gold";

function ContactFormFields({ onSent }: { onSent: () => void }) {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="mt-11 max-w-[46ch] space-y-5">
        <p
          role="status"
          aria-live="polite"
          className="font-mono text-sm tracking-[0.02em] text-gold"
        >
          {state.message}
        </p>
        <button
          type="button"
          onClick={onSent}
          className="inline-flex h-11.5 items-center border border-line-700 px-5.5 font-mono text-xs font-semibold tracking-[0.13em] text-paper transition-colors hover:border-line-600 hover:text-gold"
        >
          SEND ANOTHER MESSAGE
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-11 max-w-[46ch] space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="name" className="label block">
          NAME
        </label>
        <input id="name" name="name" type="text" required className={fieldClass} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="label block">
          EMAIL
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={fieldClass}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="label block">
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={fieldClass}
        />
      </div>

      <div className="flex items-center gap-5">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11.5 items-center bg-gold px-5.5 font-mono text-xs font-semibold tracking-[0.13em] text-ink-800 transition-colors hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "SENDING…" : "SEND MESSAGE"}
        </button>

        {state.status === "error" && (
          <p
            role="status"
            aria-live="polite"
            className="font-mono text-[11.5px] tracking-[0.1em] text-paper-dim"
          >
            ERROR — {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

export function ContactForm() {
  // useActionState has no reset API, so the only clean way back to a blank
  // form after a successful submission is a remount: bumping this key
  // re-runs useActionState from scratch inside ContactFormFields, which
  // resets its state to `initialState` with nothing left to keep in sync.
  const [formInstance, setFormInstance] = useState(0);

  return (
    <ContactFormFields
      key={formInstance}
      onSent={() => setFormInstance((n) => n + 1)}
    />
  );
}
