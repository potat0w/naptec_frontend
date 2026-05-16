"use client";

import {
  accentItalic,
  btnPrimary,
  containerClass,
  sectionBgSurface,
  sectionPy,
} from "@/lib/layout";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function GetInTouch() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("git-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Get in touch"
      className={`${sectionBgSurface} ${sectionPy} text-center`}
    >
      <div className={`${containerClass} git-reveal flex flex-col items-center`}>
        <div className="mb-8 flex items-center gap-4 opacity-0 transition-all duration-700 [.git-visible_&]:opacity-100">
          <span className="h-px w-12 bg-brand/30" aria-hidden />
          <span className="h-1.5 w-1.5 rotate-45 bg-brand/50" aria-hidden />
          <span className="h-px w-12 bg-brand/30" aria-hidden />
        </div>

        <h2 className="max-w-3xl text-4xl font-normal leading-tight text-neutral-900 opacity-0 transition-all duration-700 delay-100 sm:text-5xl lg:text-[3.25rem] [.git-visible_&]:opacity-100">
          Get in touch <em className={accentItalic}>today</em> to
          <span className="mt-2 block text-3xl text-body sm:text-4xl">
            see how we can help
          </span>
        </h2>

        <div className="mt-10 opacity-0 transition-all duration-700 delay-200 [.git-visible_&]:opacity-100">
          <Link href="/enquire" className={btnPrimary}>
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
