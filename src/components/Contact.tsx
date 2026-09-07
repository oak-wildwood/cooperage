import { PROFILE } from "@/lib/resume";
import { ContactForm } from "@/components/ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-line-700 bg-ink-800"
    >
      <div className="mx-auto max-w-[1600px] section-x py-16 lg:py-24">
        <span className="label">06 &nbsp;/&nbsp; CONTACT</span>

        <h2
          id="contact-heading"
          className="mt-7 max-w-[16ch] text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.045em]"
        >
          Let&rsquo;s talk.
        </h2>

        {PROFILE.available && (
          <div className="mt-7 flex items-center gap-2.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-gold"
              style={{ boxShadow: "0 0 7px rgba(232,201,140,.8)" }}
            />
            <span className="font-mono text-[11.5px] font-semibold tracking-[0.18em] text-gold">
              OPEN TO WORK — FRONTEND &amp; DESIGN ENGINEERING, REMOTE
            </span>
          </div>
        )}

        <div className="mt-11 flex flex-wrap gap-2.5">
          {[
            { href: PROFILE.linkedin, label: "LINKEDIN ↗" },
            { href: PROFILE.github, label: "GITHUB ↗" },
            { href: PROFILE.resume, label: "RESUME ↓" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex h-11.5 items-center border border-line-700 px-5.5 font-mono text-xs font-semibold tracking-[0.13em] text-paper transition-colors hover:border-line-600 hover:text-gold"
            >
              {label}
            </a>
          ))}
        </div>

        <ContactForm />

        <p className="mt-16 font-mono text-[11px] tracking-[0.12em] text-paper-ghost">
          BUILT WITH NEXT 16 AND REACT SERVER COMPONENTS. SOURCE ON{" "}
          <a
            href="https://github.com/oak-wildwood/cooperage"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line-700 underline-offset-2 transition-colors hover:text-gold hover:decoration-gold"
          >
            GITHUB
          </a>
          .
        </p>
      </div>
    </section>
  );
}
