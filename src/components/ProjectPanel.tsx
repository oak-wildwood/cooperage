import Image from "next/image";
import { coverFrameHeightClassName, ScreenshotFrame } from "./ScreenshotFrame";
import { ScreenshotViewer } from "./ScreenshotViewer";
import { TierMeter } from "./TierMeter";
import type { Project } from "@/lib/projects";

/**
 * One panel in the stack.
 *
 * `sticky top-0` is the whole effect: each panel pins at the top of the viewport
 * and the next one scrolls up over it, later siblings painting over earlier ones.
 * No JavaScript, no scroll listener, no animation library. Height is slightly
 * under the viewport so a sliver of the panel beneath always shows.
 *
 * That pinning is `lg:` and up only. It exists to stage the reveal against the
 * next panel's screenshot, and the screenshot column is itself `hidden` below
 * `lg` — so below that breakpoint there's nothing to reveal, and pinning would
 * only risk clipping a mobile viewport's worth of stacked text inside a fixed
 * 92dvh box. Mobile gets plain document flow instead.
 */
export function ProjectPanel({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cover = project.screens[0];
  const polished = project.tier === "polished";

  return (
    <section
      aria-labelledby={`project-${project.slug}`}
      className="w-full border-t border-line-700 bg-ink-800 lg:sticky lg:top-0 lg:h-panel lg:overflow-hidden"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 items-center gap-6 section-x py-12 lg:h-full lg:py-14">
        <div className="col-span-12 flex flex-col lg:col-span-5">
          <div className="flex items-center justify-between">
            <span className="label">
              {String(index + 1).padStart(2, "0")} &nbsp;/&nbsp; WORK
            </span>
            <span className="label tracking-[0.18em]">{project.year}</span>
          </div>

          <div className="mt-4.5 h-px bg-line-700" />

          <div className="mt-6.5">
            <TierMeter tier={project.tier} />
          </div>

          <h3
            id={`project-${project.slug}`}
            className={`mt-6.5 text-[clamp(2.5rem,4.4vw,4rem)] font-medium leading-[0.98] tracking-[-0.04em] ${
              polished ? "text-paper" : "text-paper-dim"
            }`}
          >
            {project.name}
          </h3>

          {project.tagline && (
            <p className="mt-1.5 font-mono text-sm text-paper-faint">
              {project.tagline}
            </p>
          )}

          <p className="mt-6 max-w-[44ch] font-read text-[18px] font-light leading-relaxed text-paper-mute">
            {project.blurb}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className={`px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-[0.1em] ${
                  polished
                    ? "border border-line-700 text-paper-dim"
                    : "border border-dashed border-line-700 text-paper-faint"
                }`}
              >
                {tech.toUpperCase()}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex items-center gap-6">
            {project.screens.length > 0 ? (
              <ScreenshotViewer project={project} />
            ) : (
              <span className="action-label text-paper-ghost">
                NO SCREENS YET
              </span>
            )}
            {project.repo && (
              <a
                href={project.repo}
                className="action-label text-paper-faint transition-colors hover:text-paper"
              >
                SOURCE &nbsp;↗
              </a>
            )}
          </div>
        </div>

        <div className="col-span-12 hidden justify-end lg:col-span-7 lg:flex">
          <figure className="w-full max-w-[620px]">
            {cover ? (
              <ScreenshotViewer project={project}>
                <ScreenshotFrame size="cover" className="group cursor-zoom-in">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    width={cover.width}
                    height={cover.height}
                    className="max-h-full max-w-full object-contain transition-opacity group-hover:opacity-90"
                    priority={index === 0}
                  />
                </ScreenshotFrame>
              </ScreenshotViewer>
            ) : (
              <div
                className={`flex w-full items-center justify-center border-[1.5px] border-dashed border-line-700 bg-white/[0.012] ${coverFrameHeightClassName}`}
              >
                <span className="label text-paper-ghost">AWAITING SCREENS</span>
              </div>
            )}
            <figcaption className="mt-3.5 flex items-center justify-between">
              <span className="label tracking-[0.18em]">
                {cover ? cover.caption.toUpperCase() : "—"}
              </span>
              <span className="label text-[11px] tracking-[0.12em]">
                {project.screens.length > 0
                  ? `1 / ${project.screens.length}`
                  : "0 / 0"}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
