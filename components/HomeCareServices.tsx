"use client";

import {
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Home,
  MapPin,
  User,
  Users,
} from "lucide-react";
import { containerClass, headingSerif, sectionPy, sectionTitle } from "@/lib/layout";
import { useCallback, useRef } from "react";

const cards = [
  {
    key: "home-care",
    title: "Home Care",
    Icon: Home,
    services: [
      "Companionship",
      "Home Help & Housekeeping",
      "Personal Care",
      "Overnight Care",
      "Day Care",
      "Respite Care",
    ] as const,
    description: null as string | null,
    badge: false,
  },
  {
    key: "specialist",
    title: "Specialist Care",
    Icon: HeartPulse,
    services: [
      "Dementia & Alzheimer's",
      "Cancer",
      "Parkinson's Care",
      "Neurological",
      "Palliative",
      "Postoperative & Recovery",
      "Arthritis & Mobility",
    ] as const,
    description: null,
    badge: false,
  },
  {
    key: "live-in",
    title: "Live-In Care",
    Icon: Users,
    services: null,
    description:
      "When your loved one needs frequent support, our live-in care solutions can help them stay independent and comfortable at home.",
    badge: true,
  },
  {
    key: "domiciliary",
    title: "Domiciliary Care",
    Icon: User,
    services: [
      "Companionship",
      "Meal Preparation",
      "Home Help",
      "Personal Care",
      "Overnight Care",
    ] as const,
    description: null,
    badge: false,
  },
] as const;

const cardTitleClass = `${headingSerif} text-[1.75rem] leading-tight text-[#3B2A8F] sm:text-[2rem] lg:text-[2.125rem]`;

export default function HomeCareServices() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.firstElementChild;
    const step =
      first instanceof HTMLElement
        ? first.offsetWidth + 24
        : el.clientWidth * 0.9;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return (
    <section
      className={`overflow-hidden bg-white ${sectionPy}`}
      aria-labelledby="home-care-services-heading"
    >
      <div className={containerClass}>
        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="home-care-services-heading" className={sectionTitle}>
              Our Home Care Services
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:mt-5 sm:text-lg sm:leading-relaxed">
              We can help you make an informed, compassionate choice for your
              loved one, with bespoke packages to suit their domiciliary care
              needs.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 xl:hidden">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8e8e4] text-neutral-700 transition-[filter] hover:brightness-95"
              aria-label="Previous service"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B2A8F] text-white transition-[filter] hover:brightness-95"
              aria-label="Next service"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="-mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-6 sm:mt-12 sm:gap-6 sm:px-6 lg:mx-0 lg:px-0 xl:mt-14 xl:grid xl:grid-cols-4 xl:gap-6 xl:overflow-visible xl:snap-none [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card) => {
            const Icon = card.Icon;
            return (
              <article
                key={card.key}
                className="relative flex w-[min(82vw,360px)] shrink-0 snap-start flex-col rounded-xl bg-[#f4f4f2] p-8 sm:w-[min(38vw,400px)] sm:p-9 xl:w-auto xl:min-w-0 xl:p-10"
              >
                {card.badge ? (
                  <div className="mb-5 flex w-fit max-w-[calc(100%-0.5rem)] items-center gap-1.5 rounded-full bg-[#3B2A8F] px-3.5 py-2 text-xs font-medium text-white sm:absolute sm:right-5 sm:top-5 sm:mb-0">
                    <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                    <span>Available in select locations</span>
                  </div>
                ) : null}
                <Icon
                  className="h-9 w-9 text-[#3B2A8F] sm:h-10 sm:w-10"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3
                  className={`mt-5 sm:mt-6 ${cardTitleClass} ${card.badge ? "sm:pr-28" : ""}`}
                >
                  {card.title}
                </h3>
                <hr
                  className="my-5 w-10 border-t-2 border-[#3B2A8F]/25 sm:my-6"
                  aria-hidden
                />
                {card.description ? (
                  <p className="text-[0.9375rem] leading-[1.85] text-neutral-700 sm:text-base sm:leading-[1.9]">
                    {card.description}
                  </p>
                ) : (
                  <div className="text-[0.9375rem] leading-[2] text-neutral-700 sm:text-base sm:leading-[2.1]">
                    {card.services?.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
