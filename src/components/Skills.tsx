import { SKILLS, type SkillBand } from "@/lib/resume";

const TONE: Record<
  SkillBand["tone"],
  { label: string; rule: string; tag: string }
> = {
  deep: {
    label: "text-paper-dim",
    rule: "bg-line-700",
    tag: "border border-line-600 text-paper",
  },
  gold: {
    label: "text-gold-dim",
    rule: "bg-line-700",
    tag: "border border-gold-line text-gold",
  },
  plain: {
    label: "text-paper-mute",
    rule: "bg-line-800",
    tag: "border border-line-700 text-paper-dim",
  },
  dashed: {
    label: "text-paper-faint",
    rule: "bg-line-800",
    tag: "border border-dashed border-line-700 text-paper-faint",
  },
};

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-line-800 bg-ink-800"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-6 px-12 py-24">
        <div className="col-span-12 lg:col-span-3">
          <h2 id="skills-heading" className="label">
            04 &nbsp;/&nbsp; SKILLS
          </h2>
          <div className="mt-5 h-0.5 w-11 bg-gold" />
          <p className="mt-5.5 max-w-[26ch] font-read text-[17px] font-light leading-relaxed text-paper-mute">
            Grouped by how much I would want to be judged on them. Same honesty
            as the projects.
          </p>
        </div>

        <div className="col-span-12 flex flex-col gap-9.5 lg:col-span-9">
          {SKILLS.map((band) => {
            const tone = TONE[band.tone];
            return (
              <div key={band.label}>
                <div className="flex items-center gap-3.5">
                  <span
                    className={`font-mono text-[11.5px] font-semibold tracking-[0.22em] ${tone.label}`}
                  >
                    {band.label.toUpperCase()}
                  </span>
                  {band.note && (
                    <span className="font-mono text-[11px] tracking-[0.12em] text-paper-faint">
                      {band.note.toUpperCase()}
                    </span>
                  )}
                  <span className={`h-px grow ${tone.rule}`} />
                </div>

                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {band.items.map((item) => (
                    <li
                      key={item}
                      className={`px-3.5 py-1.5 font-mono text-[11.5px] font-semibold tracking-[0.1em] ${tone.tag}`}
                    >
                      {item.toUpperCase()}
                    </li>
                  ))}
                </ul>

                {band.caption && (
                  <p className="mt-4 max-w-[62ch] font-read text-base font-light leading-relaxed text-paper-mute">
                    {band.caption}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
