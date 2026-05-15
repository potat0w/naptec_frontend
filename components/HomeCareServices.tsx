"use client";

import {
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Home,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { containerClass, headingSerif, sectionPy, sectionTitle } from "@/lib/layout";
import { slugify } from "@/lib/slugify";
import Link from "next/link";
import { useCallback, useRef } from "react";

type ServiceLine = { label: string; href: string };

type ServiceCard = {
  key: string;
  title: string;
  Icon: LucideIcon;
  services: readonly ServiceLine[] | null;
  description: string | null;
};

function line(label: string, slug?: string): ServiceLine {
  return {
    label,
    href: `/what-we-do/${slug ?? slugify(label)}`,
  };
}

const cards: ServiceCard[] = [
  {
    key: "home-care",
    title: "Home Care",
    Icon: Home,
    services: [
      line("Companionship", "companionship"),
      line("Home Help & Housekeeping", "home-help-and-housekeeping"),
      line("Personal Care", "personal-care"),
      line("Overnight Care", "overnight-care"),
      line("Day Care", "day-care"),
      line("Respite Care", "respite-care"),
    ],
    description: null,
  },
  {
    key: "specialist",
    title: "Specialist Care",
    Icon: HeartPulse,
    services: [
      line("Dementia & Alzheimer's", "dementia-and-alzheimers"),
      line("Cancer", "cancer"),
      line("Parkinson's Care", "parkinsons"),
      line("Neurological", "neurological"),
      line("Palliative", "palliative"),
      line("Postoperative & Recovery", "postoperative-and-recovery"),
      line("Arthritis & Mobility", "arthritis-and-mobility"),
    ],
    description: null,
  },
  {
    key: "live-in",
    title: "Live-In Care",
    Icon: Users,
    services: null,
    description:
      "When your loved one needs frequent support, our live-in care solutions can help them stay independent and comfortable at home.",
  },
  {
    key: "domiciliary",
    title: "Domiciliary Care",
    Icon: User,
    services: [
      line("Companionship", "companionship"),
      line("Meal Preparation", "meal-preparation"),
      line("Home Help", "home-help-and-housekeeping"),
      line("Personal Care", "personal-care"),
      line("Overnight Care", "overnight-care"),
    ],
    description: null,
  },
];

const cardTitleClass = `${headingSerif} text-[1.75rem] leading-tight sm:text-[2rem] lg:text-[2.125rem]`;

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
                className="group relative flex w-[min(82vw,360px)] shrink-0 snap-start flex-col rounded-xl border border-neutral-200/80 bg-[#f4f4f2] p-8 transition-colors duration-300 hover:border-[#3B2A8F] hover:bg-[#3B2A8F] sm:w-[min(38vw,400px)] sm:p-9 xl:w-auto xl:min-w-0 xl:p-10"
              >
                <Icon
                  className="h-9 w-9 text-[#3B2A8F] transition-colors duration-300 group-hover:text-white sm:h-10 sm:w-10"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3
                  className={`mt-5 text-[#3B2A8F] transition-colors duration-300 group-hover:text-white sm:mt-6 ${cardTitleClass}`}
                >
                  {card.title}
                </h3>
                <hr
                  className="my-5 w-10 border-t-2 border-[#3B2A8F]/25 transition-colors duration-300 group-hover:border-white/40 sm:my-6"
                  aria-hidden
                />
                {card.description ? (
                  <p className="text-[0.9375rem] leading-[1.85] text-neutral-700 transition-colors duration-300 group-hover:text-white/95 sm:text-base sm:leading-[1.9]">
                    {card.description}
                  </p>
                ) : (
                  <ul className="space-y-0 text-[0.9375rem] leading-[2] sm:text-base sm:leading-[2.1]">
                    {card.services?.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="text-neutral-800 transition-colors duration-300 hover:underline group-hover:text-white"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
