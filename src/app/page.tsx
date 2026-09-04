import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { Contact } from "@/components/Contact";

/**
 * One long scroll. Claim first, evidence after: who I am and what I have done,
 * then the projects that let you check it.
 *
 * Every component below is a Server Component — no "use client" anywhere yet, so
 * this whole page ships as static HTML with zero JavaScript. The two interactive
 * pieces (the collapsing menu, the screenshot viewer) are the only islands that
 * will need the client.
 */
export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Work />
      <Contact />
    </main>
  );
}
