/**
 * LinkedIn recommendations, lightly trimmed for reading on screen (same
 * spirit as resume.ts — whole sentences cut, never word-level edits, since
 * these are direct quotes from real people). Display order is deliberate:
 * reorder this array to change it, don't add a rank field.
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  /** Current role/title — the recommender's present-day stature. */
  title: string;
  /** The company where Oak and this person actually worked together, not
   * wherever they work now. Omit rather than guess when that company isn't
   * one Oak lists (e.g. a short stint left off the resume on purpose). */
  company?: string;
  relationship?: string;
  linkedinUrl?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "brendan-butts",
    name: "Brendan Butts",
    title: "Director of Engineering",
    company: "ACV MAX",
    relationship: "Managed Oak directly, 2023–2026",
    quote:
      "Oak was a highly reliable senior engineer who consistently demonstrated strong technical judgment, clear communication, and effective collaboration in our remote-first environment. He played a significant role in several complex initiatives, including our Vue 2 to Vue 3 migration, the transition from New Relic to Datadog, and our migration from Vercel to AWS EKS. Oak would be a strong addition to any team looking for a senior engineer who combines technical breadth, product and UX awareness, strong remote communication, and a practical approach to modern cloud and AI technologies. I highly recommend him.",
  },
  {
    id: "chad-dunbar",
    name: "Chad Dunbar",
    title: "Staff Product Designer",
    company: "ACV MAX",
    relationship: "Worked with Oak on the same team",
    quote:
      "I thoroughly enjoyed collaborating with Oak. As a product designer, having a front-end developer like Oak as a partner was invaluable for delivering high quality quickly across the entire product process. He brought exceptional user experience insight to design reviews, consistently offering smart ideas on how to implement concepts as intended. Whenever technical limitations came up, he proactively suggested creative alternatives that kept the experience seamless, accessible, and low-friction. I would welcome the opportunity to work with Oak again, and any team would be lucky to have him.",
  },
  {
    id: "kathryn-petralia",
    name: "Kathryn Petralia",
    title: "COO",
    company: "Kabbage",
    relationship: "Senior to Oak, didn't manage him directly",
    quote:
      "Oak is a smart, enthusiastic developer whose combination of curiosity and personality is a fantastic addition to a development team. Oak worked with several team leads during his time at Kabbage, and with each move he was excited about the challenges of learning new tools, techniques and technology. It was a pleasure to work with Oak, and I would absolutely work with him again if given the opportunity.",
  },
  {
    id: "victor-harris",
    name: "Victor Harris",
    title: "Data & Analytics Executive",
    company: "FNC",
    relationship: "Managed Oak directly for 8 years",
    quote:
      "I managed Oak for 8 years at FNC, spanning numerous web/database architecture projects. He has strong technical/systems/programming competencies and was a key contributor to the team. He delivered and produced software projects and R&D initiatives on-time and as expected. Oak's wide-array of technical prowess will readily benefit any organization he supports. I enjoyed mentoring, managing and working-with Oak and look forward to working with him again in the future.",
  },
  {
    id: "gleb-bahmutov",
    name: "Gleb Bahmutov",
    title: "Senior Director of Engineering",
    relationship: "Worked with Oak on the same team",
    quote:
      "I had great pleasure working with Oak, and I did appreciate his desire to find the root cause of the customer's problems and then go and fix it. He did help our clients, and he did help improve our documentation which I believe has 10x multiplier effect. Oak's personality is great, and he makes everyone comfortable very quickly.",
  },
];
