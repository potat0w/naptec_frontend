import AccordionList from "@/components/AccordionList";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | Naptec",
  description:
    "Learn how Naptec home care works, from your first conversation through meeting your team and starting your care plan.",
};

const serif = { fontFamily: "var(--font-cormorant), ui-serif, serif" } as const;

const steps = [
  {
    id: "tell-us-about-you",
    title: "Tell us about you",
    content: (
      <p>
        We listen to health, routines, and what matters most so we can shape the
        right level of support.
      </p>
    ),
  },
  {
    id: "meet-your-team",
    title: "Meet your team",
    content: (
      <p>
        Get to know the caregivers who will visit, with clear handovers and a
        single point of contact for questions.
      </p>
    ),
  },
  {
    id: "start-your-plan",
    title: "Start your plan",
    content: (
      <p>
        We agree visit patterns and goals together, then refine as life changes so
        care stays relevant and reassuring.
      </p>
    ),
  },
];

export default function HowItWorksPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="bg-[#3B2A8F] px-4 py-4 sm:px-6 lg:px-8">
        <form
          action="/enquire"
          method="get"
          className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-stretch"
        >
          <label htmlFor="how-it-works-postcode" className="sr-only">
            Postcode or area
          </label>
          <div className="relative flex flex-1 items-center">
            <svg
              className="pointer-events-none absolute left-4 h-5 w-5 text-white/70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s7-4.5 7-10a7 7 0 10-14 0c0 5.5 7 10 7 10z"
              />
              <circle cx="12" cy="11" r="2.5" />
            </svg>
            <input
              id="how-it-works-postcode"
              name="postcode"
              type="text"
              placeholder="Enter your postcode or area"
              className="min-h-[3rem] w-full rounded-full border-0 bg-white/10 py-3 pl-12 pr-5 text-white placeholder:text-white/60 outline-none ring-1 ring-white/20 focus:bg-white/15 focus:ring-2 focus:ring-white/40"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#3B2A8F] transition-colors hover:bg-white/90"
          >
            Find care
          </button>
        </form>
      </div>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-[#3B2A8F]">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-neutral-300">
                /
              </li>
              <li className="font-medium text-neutral-800">How it works</li>
            </ol>
          </nav>

          <h1
            className="mt-8 text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl"
            style={serif}
          >
            How it works
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600">
            Share your needs, meet your care team, and start a plan that fits your
            routine, with clear communication at every step.
          </p>

          <div className="mt-14">
            <AccordionList badge="How it works" items={steps} />
          </div>
        </div>
      </section>
    </main>
  );
}
