import FaqTestimonials from "@/components/FaqTestimonials";
import GetInTouch from "@/components/GetInTouch";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import { containerClass } from "@/lib/layout";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | Naptec",
  description:
    "Learn how Naptec home care works — from finding your local team to meeting your Care Professionals and starting care at home.",
};

const serif = { fontFamily: "var(--font-cormorant), ui-serif, serif" } as const;

export default function HowItWorksPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="bg-[#3B2A8F] px-4 py-4 sm:px-6 lg:px-8">
        <form
          action="/enquire"
          method="get"
          className={`${containerClass} flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-stretch`}
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

      <section className="bg-white px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
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
            className="mt-8 text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            style={serif}
          >
            How it works
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600">
            Whatever care your loved one needs, we will work quickly to find a
            bespoke solution that is right for you. Care needs can change over
            time, so we are always ready to adapt — and just a phone call away
            when you need us.
          </p>
        </div>
      </section>

      <HowItWorksSteps />

      <GetInTouch />

      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <h2
              className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl"
              style={serif}
            >
              Confused about home care? We can help.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600">
              <p>
                We know you want the best for your loved one. When it comes to
                arranging home care, we have made it straightforward with
                personalised, attentive support that adapts as needs change.
              </p>
              <p>
                Organising care should not feel like a leap in the dark. By
                taking time to listen and understand your circumstances, we help
                your loved one live more independently at home while giving you
                peace of mind.
              </p>
              <p>
                From warm companionship to specialist, practical care that puts
                their preferences first, we are changing how families think about
                home care. Whatever questions you have, we are here to help — with
                no pressure until you feel ready.
              </p>
            </div>
            <Link
              href="/advice-and-care/faqs"
              className="mt-8 inline-block text-sm font-medium text-[#3B2A8F] underline underline-offset-4 transition-colors hover:text-[#2d1f6d]"
            >
              Discover more
            </Link>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#f2f2f2]">
            <Image
              src="https://images.unsplash.com/photo-1516307365426-b304ed83931e?w=1200&q=80"
              alt="Older adult receiving supportive home care"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <FaqTestimonials />
    </main>
  );
}
