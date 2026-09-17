import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";

/**
 * One long scroll. Claim first, evidence after: who I am and what I have done,
 * then the projects that let you check it.
 *
 * Every component below is a Server Component — no "use client" at this level, so
 * this whole page ships as static HTML by default. The interactive pieces (the
 * collapsing menu, the screenshot viewer, the recommendations carousel) are
 * self-contained client islands mounted a level down, inside otherwise-static
 * sections.
 */
export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Work />
      <Testimonials />
      <Contact />
    </main>
  );
}
