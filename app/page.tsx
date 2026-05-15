import CqcSection from "@/components/CqcSection";
import GetInTouch from "@/components/GetInTouch";
import RecruitmentCta from "@/components/RecruitmentCta";
import HomeCareServices from "@/components/HomeCareServices";
import NewsEvents from "@/components/NewsEvents";
import PopularServices from "@/components/PopularServices";
import Testimonials from "@/components/Testimonials";
import TrustBar from "@/components/TrustBar";
import WhyUs from "@/components/WhyUs";
import { containerClass } from "@/lib/layout";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naptec | Home care built around your family",
  description:
    "Personalised, reliable home care from Naptec so your loved one can stay independent in the place they love.",
};

const heroImage =
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=85&w=2000&auto=format&fit=crop";

const serif = { fontFamily: "var(--font-cormorant), ui-serif, serif" } as const;

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden bg-[#f5f2eb]">
        <div className={`${containerClass} grid lg:min-h-[min(85vh,780px)] lg:grid-cols-2 lg:gap-8`}>
          <div className="flex flex-col justify-center py-12 sm:py-16 lg:py-20">
            <h1
              className="max-w-xl text-4xl font-medium italic leading-[1.12] tracking-tight text-neutral-900 sm:text-5xl xl:text-6xl"
              style={serif}
            >
              Home care
              <br />
              your way
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg">
              Your loved one deserves personalised, quality, reliable home care.
              Our experienced caregivers help them continue to live independently
              in the place they love. We&apos;ve helped many families, and we&apos;re
              here when you need us.
            </p>
            <form
              action="/enquire"
              method="get"
              className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <label htmlFor="hero-postcode" className="sr-only">
                Postcode or area
              </label>
              <input
                id="hero-postcode"
                name="postcode"
                type="text"
                placeholder="Enter a postcode or area"
                className="min-h-[3.25rem] flex-1 rounded-full border border-neutral-200 bg-white px-5 py-3 text-neutral-900 shadow-sm outline-none placeholder:text-neutral-400 focus:border-[#3B2A8F] focus:ring-2 focus:ring-[#3B2A8F]/20"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[#3B2A8F] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#2d1f6d]"
              >
                Find care
              </button>
            </form>
          </div>

          <div className="relative min-h-[240px] sm:min-h-[320px] lg:min-h-0 lg:min-h-[480px]">
            <div className="absolute inset-0 overflow-hidden rounded-sm lg:rounded-none lg:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]">
              <Image
                src={heroImage}
                alt="A caregiver and an older adult sharing a moment at home"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />
      <CqcSection />
      <PopularServices />
      <HomeCareServices />
      <WhyUs />
      <Testimonials />
      <GetInTouch />
      <RecruitmentCta />
      <NewsEvents />
    </main>
  );
}
