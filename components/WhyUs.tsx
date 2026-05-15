"use client";

import { containerClass, sectionPy, sectionTitle } from "@/lib/layout";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

const serif = { fontFamily: "var(--font-cormorant), ui-serif, serif" } as const;

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1200&q=80",
    alt: "Caregiver and client sharing a moment",
    titleParts: [
      { text: "Finding the " },
      { text: "perfect", italic: true },
      { text: " match" },
    ],
    body: "At Naptec, care is more than a service — it's a relationship. We tailor every care plan to the individual, matching clients with caregivers who share their values, ensuring every visit brings connection, comfort, and quality care. Every visit lasts at least an hour, creating space for genuine connection and meaningful moments.",
    href: "/why-us/our-caregivers",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
    alt: "Caregiver training session",
    titleParts: [
      { text: "Industry " },
      { text: "leading", italic: true },
      { text: " training" },
    ],
    body: "We only recruit those with a true passion for care: empathetic, committed individuals who want to make a difference. Our caregivers receive industry-leading training and ongoing development, including clinical skills, so they can confidently support even the most complex care needs at home.",
    href: "/why-us/ai-powered-reporting",
  },
  {
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
    alt: "Caregiver in the community",
    titleParts: [
      { text: "Global experts, " },
      { text: "local", italic: true },
      { text: " service" },
    ],
    body: "Naptec is rooted in the communities we serve. Every office is run by people who live locally and care deeply, combining national standards with a personal, neighbourhood approach to home care.",
    href: "/why-us/our-story",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628901751?w=1200&q=80",
    alt: "Award recognition",
    titleParts: [{ text: "Awards" }],
    body: "We're proud to be recommended by families we support and recognised for excellence in home care. Our commitment to innovation and supporting our teams helps us deliver outstanding care every day.",
    href: "/why-us/trust-and-safety",
  },
];

export default function WhyUs() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const go = useCallback((delta: number) => {
    setCurrentSlide((s) => (s + delta + slides.length) % slides.length);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className={`overflow-hidden bg-white ${sectionPy}`} aria-label="Why us">
      <div className={`${containerClass} mb-10 flex items-end justify-between gap-6 lg:mb-12`}>
        <h2 className={sectionTitle}>Why us?</h2>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B2A8F] text-white transition-colors hover:bg-[#2d1f6d]"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="overflow-hidden rounded-2xl bg-[#e8ebe4] shadow-sm">
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:min-h-[420px]">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority={currentSlide === 0}
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
              <h3
                className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl"
                style={serif}
              >
                {slide.titleParts.map((part, i) =>
                  part.italic ? (
                    <em key={i} className="italic">
                      {part.text}
                    </em>
                  ) : (
                    <span key={i}>{part.text}</span>
                  ),
                )}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-neutral-600 sm:text-base">
                {slide.body}
              </p>
              <Link
                href={slide.href}
                className="mt-8 inline-flex w-fit rounded-full bg-[#3B2A8F] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2d1f6d]"
              >
                Discover More
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${i === currentSlide ? "w-8 bg-[#3B2A8F]" : "w-2 bg-neutral-300"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </article>
    </section>
  );
}
