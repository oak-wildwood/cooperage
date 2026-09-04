import { PROFILE } from "@/lib/resume";

const FACTS = [
  { k: "Most recent", v: "ACV Auctions", meta: "2022–26" },
  { k: "Depth", v: "Vue · Angular · TypeScript" },
  { k: "Also known for", v: "AI guardrails" },
  { k: "Based", v: "Remote" },
  { k: "Projects below", v: "5, tiered honestly", gold: true },
];

export function Hero() {
  return (
    <section id="top" className="bg-ink-800">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-6 px-12 pt-26 pb-24">
        <div className="col-span-12 lg:col-span-7">
          <span className="label">
            01 &nbsp;/&nbsp; {PROFILE.title.toUpperCase()}
          </span>

          <h1 className="mt-6.5 text-[clamp(3.5rem,7.5vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.05em]">
            Oak
            <br />
            Cooper
          </h1>

          <div
            className="mt-10 h-[3px] w-18 bg-gold"
            style={{ boxShadow: "0 0 10px rgba(232,201,140,.5)" }}
          />

          <p className="mt-8.5 max-w-[48ch] font-read text-[19px] font-light leading-[1.65] text-paper-dim">
            {PROFILE.claim}
          </p>

          {/* Every link a recruiter needs, before any scrolling happens. */}
          <div className="mt-11 flex flex-wrap gap-2.5">
            <a
              href="#work"
              className="inline-flex h-11.5 items-center bg-gold px-5.5 font-mono text-xs font-semibold tracking-[0.13em] text-ink-800 transition-colors hover:bg-gold-bright"
            >
              VIEW WORK
            </a>
            {[
              { href: PROFILE.github, label: "GITHUB" },
              { href: PROFILE.linkedin, label: "LINKEDIN" },
              { href: PROFILE.resume, label: "RESUME ↓" },
              { href: `mailto:${PROFILE.email}`, label: "EMAIL" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="inline-flex h-11.5 items-center border border-line-700 px-5.5 font-mono text-xs font-semibold tracking-[0.13em] text-paper transition-colors hover:border-line-600 hover:text-gold"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-12 pt-2.5 lg:col-span-5">
          <dl className="border-t border-line-700">
            {FACTS.map(({ k, v, meta, gold }) => (
              <div
                key={k}
                className="flex items-baseline justify-between border-b border-line-800 py-4.5"
              >
                <dt className="font-mono text-[11.5px] tracking-[0.15em] text-paper-faint">
                  {k.toUpperCase()}
                </dt>
                <dd
                  className={`text-[15px] ${gold ? "text-gold" : "text-paper"}`}
                >
                  {v}
                  {meta && <span className="text-paper-faint"> {meta}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
