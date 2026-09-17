import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { TESTIMONIALS } from "@/lib/testimonials";

export function Testimonials() {
  return (
    <section
      id="recommendations"
      aria-labelledby="recommendations-heading"
      className="border-t border-line-700 bg-ink-800"
    >
      <div className="mx-auto max-w-[1600px] section-x py-16 lg:py-24">
        <span className="label">06 &nbsp;/&nbsp; RECOMMENDATIONS</span>
        <div className="mt-5 h-0.5 w-11 bg-gold" />
        <h2
          id="recommendations-heading"
          className="mt-7 max-w-[20ch] text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.045em]"
        >
          What it&rsquo;s like to work with me.
        </h2>

        <TestimonialCarousel testimonials={TESTIMONIALS} />
      </div>
    </section>
  );
}
