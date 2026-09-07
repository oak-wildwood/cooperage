import { ProjectPanel } from "./ProjectPanel";
import { PROJECTS } from "@/lib/projects";

/**
 * The stack lives inside this wrapper on purpose.
 *
 * A sticky element only sticks while its containing block is in view, so putting
 * the panels in their own <div> scopes the effect: the last panel releases when
 * this section ends, and the sections below scroll normally instead of being
 * covered by pinned panels.
 */
export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="bg-ink-800">
      <div className="mx-auto max-w-[1600px] section-x pt-20 pb-12 lg:pt-28 lg:pb-16">
        <span className="label">05 &nbsp;/&nbsp; SELECTED WORK</span>
        <div className="mt-5 h-0.5 w-11 bg-gold" />
        <h2
          id="work-heading"
          className="mt-7 max-w-[18ch] text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.045em]"
        >
          Things I built and use.
        </h2>
        <p className="mt-7 max-w-[54ch] font-read text-[18px] font-light leading-relaxed text-paper-mute">
          A few are finished. Some are not. Each one says which, because a
          portfolio that only shows finished work is telling you less than it
          appears to.
        </p>
      </div>

      <div>
        {PROJECTS.map((project, i) => (
          <ProjectPanel key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
