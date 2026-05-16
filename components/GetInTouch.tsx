"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const headingFont = {
  fontFamily: "var(--font-playfair), ui-serif, serif",
} as const;

export default function GetInTouch() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .git-section {
          position: relative;
          overflow: hidden;
          background: #f9f6ef;
        }

        .git-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59, 42, 143, 0.055) 0%, transparent 70%),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .git-divider {
          position: relative;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c8cfc2 20%, #c8cfc2 80%, transparent);
        }
        .git-divider::before,
        .git-divider::after {
          content: '';
          position: absolute;
          top: -1px;
          left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(59,42,143,0.07) 40%, rgba(59,42,143,0.07) 60%, transparent);
        }

        .git-inner {
          position: relative;
          z-index: 1;
          padding: 6rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .git-ornament {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.25rem;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .git-ornament-line {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #3B2A8F55);
        }
        .git-ornament-line:last-child {
          background: linear-gradient(270deg, transparent, #3B2A8F55);
        }
        .git-ornament-diamond {
          width: 5px;
          height: 5px;
          background: #3B2A8F;
          transform: rotate(45deg);
          opacity: 0.5;
        }

        .git-heading {
          font-size: clamp(2.4rem, 5.5vw, 4rem);
          font-weight: 300;
          line-height: 1.18;
          letter-spacing: -0.01em;
          color: #1a1714;
          margin: 0 0 0.15em;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.75s ease 0.1s, transform 0.75s ease 0.1s;
        }

        .git-heading em {
          font-style: italic;
          font-weight: 400;
          color: #3B2A8F;
          letter-spacing: 0.01em;
        }

        .git-subline {
          display: block;
          font-size: clamp(1.45rem, 3vw, 2.25rem);
          font-weight: 300;
          color: #4a4540;
          margin-top: 0.1em;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
        }

        .git-cta-wrap {
          margin-top: 3rem;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s;
        }

        .git-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6em;
          padding: 0.9em 2.6em;
          border-radius: 100px;
          background: #3B2A8F;
          color: #fff;
          font-family: var(--font-playfair), ui-serif, serif;
          font-size: 1.1rem;
          font-weight: 400;
          letter-spacing: 0.06em;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: color 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 20px rgba(59,42,143,0.18);
        }
        .git-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.09) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .git-cta:hover::before {
          transform: translateX(100%);
        }
        .git-cta:hover {
          box-shadow: 0 4px 28px rgba(59,42,143,0.3);
        }
        .git-cta-arrow {
          display: inline-block;
          opacity: 0.7;
          font-style: normal;
          transition: transform 0.3s ease;
        }
        .git-cta:hover .git-cta-arrow {
          transform: translateX(3px);
          opacity: 1;
        }

        /* Reveal */
        .git-visible .git-ornament,
        .git-visible .git-heading,
        .git-visible .git-subline,
        .git-visible .git-cta-wrap {
          opacity: 1;
          transform: none;
        }

        @media (min-width: 640px) {
          .git-inner { padding: 7rem 2rem; }
        }
        @media (min-width: 1024px) {
          .git-inner { padding: 8rem 2rem; }
        }
      `}</style>

      <section aria-label="Get in touch" className="w-full">
        <div className="git-divider" />

        <div className="git-section" ref={sectionRef}>
          <div className="git-inner">
            <div className="git-ornament">
              <span className="git-ornament-line" />
              <span className="git-ornament-diamond" />
              <span className="git-ornament-line" />
            </div>

            <h2 className="git-heading" ref={headingRef} style={headingFont}>
              Get in touch{" "}
              <em>today</em>
              {" "}to
              <span className="git-subline" style={headingFont}>
                see how we can help
              </span>
            </h2>

            <div className="git-cta-wrap">
              <Link href="/enquire" className="git-cta">
                Get in touch
                <em className="git-cta-arrow" aria-hidden="true">→</em>
              </Link>
            </div>
          </div>
        </div>

        <div className="git-divider" />
      </section>
    </>
  );
}