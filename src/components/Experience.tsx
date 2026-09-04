import { ROLES, EARLIER, PROFILE } from "@/lib/resume";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-line-800 bg-ink-800"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-6 px-12 py-24">
        <div className="col-span-12 lg:col-span-3">
          <h2 id="experience-heading" className="label">
            03 &nbsp;/&nbsp; EXPERIENCE
          </h2>
          <p className="mt-5 max-w-[24ch] font-read text-[16px] font-light leading-relaxed text-paper-faint">
            Twenty-five years. The last nine below; the rest on the resume.
          </p>
        </div>

        <div className="col-span-12 flex flex-col lg:col-span-9">
          {ROLES.map((role, i) => (
            <article
              key={role.company}
              className={`grid grid-cols-12 gap-6 py-7 ${
                i === 0
                  ? "border-t border-line-700"
                  : "border-t border-line-800"
              }`}
            >
              <div className="col-span-12 sm:col-span-3">
                <span
                  className={`font-mono text-[11.5px] tracking-[0.13em] ${
                    i === 0 ? "text-gold" : "text-paper-mute"
                  }`}
                >
                  {role.start} — {role.end}
                </span>
                <p className="mt-2 font-mono text-[11px] tracking-[0.1em] text-paper-faint">
                  {role.place.toUpperCase()}
                </p>
              </div>

              <div className="col-span-12 sm:col-span-9">
                <h3 className="text-2xl font-semibold tracking-[-0.02em]">
                  {role.title}
                </h3>
                <p
                  className={`mt-2 font-mono text-xs tracking-[0.13em] ${
                    i === 0 ? "text-gold-dim" : "text-paper-faint"
                  }`}
                >
                  {role.company.toUpperCase()}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {role.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-base leading-relaxed text-paper-mute"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line-800 pt-6.5">
            <p className="max-w-[48ch] font-read text-base font-light leading-relaxed text-paper-faint">
              {EARLIER}
            </p>
            <a
              href={PROFILE.resume}
              className="shrink-0 border-b border-gold pb-1 font-mono text-xs font-semibold tracking-[0.16em] text-gold"
            >
              FULL RESUME &nbsp;↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
