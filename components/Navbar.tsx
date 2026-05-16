"use client";

import AuthNav from "@/components/AuthNav";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { slugify } from "@/lib/slugify";

const whatWeDoColumns = [
  {
    title: "Domiciliary Care",
    href: "/what-we-do/domiciliary-care",
    items: [
      "Companionship",
      "Home Help & Housekeeping",
      "Personal Care",
      "Overnight Care",
      "Day Care",
      "Respite Care",
    ],
  },
  {
    title: "Specialist Care",
    href: "/what-we-do/specialist-care",
    items: [
      "Dementia & Alzheimer's",
      "Cancer",
      "Parkinson's Care",
      "Neurological",
      "Palliative",
      "Postoperative & Recovery",
      "Arthritis & Mobility",
    ],
  },
  {
    title: "Live In Care",
    href: "/what-we-do/live-in-care",
    items: [] as const,
  },
] as const;

const whyUsLinks = [
  { label: "Our Story", href: "/why-us/our-story" },
  { label: "Our Caregivers", href: "/why-us/our-caregivers" },
  { label: "AI-Powered Reporting", href: "/why-us/ai-powered-reporting" },
  { label: "Trust & Safety", href: "/why-us/trust-and-safety" },
] as const;

const adviceAndCareLinks = [
  { label: "Advice & Support", href: "/advice-and-care" },
  { label: "News & Events", href: "/advice-and-care/news-events" },
  { label: "Cost Of Care", href: "/advice-and-care/cost-of-care" },
  { label: "FAQs", href: "/advice-and-care/faqs" },
  { label: "How To Age Well", href: "/advice-and-care/how-to-age-well" },
  { label: "Articles", href: "/advice-and-care/articles" },
] as const;

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const onAuthPage =
    pathname === "/login" || pathname === "/signup" || pathname === "/book";
  const [hash, setHash] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<
    "what" | "why" | "advice" | null
  >(null);
  const [whatMegaOpen, setWhatMegaOpen] = useState(false);
  const whatMegaCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const megaPanelRef = useRef<HTMLDivElement>(null);
  const mobileMenuId = useId();

  const cancelWhatMegaClose = useCallback(() => {
    if (whatMegaCloseTimerRef.current !== null) {
      clearTimeout(whatMegaCloseTimerRef.current);
      whatMegaCloseTimerRef.current = null;
    }
  }, []);

  const scheduleWhatMegaClose = useCallback(() => {
    cancelWhatMegaClose();
    whatMegaCloseTimerRef.current = setTimeout(() => {
      setWhatMegaOpen(false);
      whatMegaCloseTimerRef.current = null;
    }, 120);
  }, [cancelWhatMegaClose]);

  useEffect(() => () => cancelWhatMegaClose(), [cancelWhatMegaClose]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) setMobileAccordion(null);
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileAccordion(null);
  }, []);

  const isWhatActive = useMemo(
    () => (pathname ?? "").startsWith("/what-we-do"),
    [pathname],
  );
  const isWhyActive = useMemo(
    () => (pathname ?? "").startsWith("/why-us"),
    [pathname],
  );
  const isAdviceActive = useMemo(
    () => (pathname ?? "").startsWith("/advice-and-care"),
    [pathname],
  );
  const isProcessActive = useMemo(
    () => (pathname ?? "").startsWith("/how-it-works"),
    [pathname],
  );
  const linkBase =
    "text-xs font-semibold uppercase tracking-[0.14em] text-neutral-800 transition-colors duration-200 hover:text-[#3B2A8F]";
  const linkActive = "text-[#3B2A8F]";

  return (
    <header
      className={`relative sticky top-0 z-50 border-b border-neutral-100 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md shadow-neutral-900/10" : "shadow-none"
      }`}
    >
      <nav className="relative z-50 w-full" aria-label="Primary">
        <div className="relative mx-auto flex h-16 w-full items-center gap-3 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="relative z-10 flex min-w-0 items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="flex min-w-0 items-center"
            onClick={closeMobile}
          >
            <Image
              src="/logo1.png"
              alt="Naptec"
              width={280}
              height={70}
              className="h-11 w-auto shrink-0 object-contain sm:h-12 md:h-14"
              priority
            />
          </Link>
        </div>

        <div className="hidden min-w-0 flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-8 xl:gap-10">
            <li
              className="relative"
              onMouseEnter={() => {
                cancelWhatMegaClose();
                setWhatMegaOpen(true);
              }}
              onMouseLeave={scheduleWhatMegaClose}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1 ${linkBase} ${
                  isWhatActive ? linkActive : ""
                }`}
                aria-haspopup="true"
                aria-expanded={whatMegaOpen}
                aria-controls="naptec-mega-what-we-do"
                onFocus={() => {
                  cancelWhatMegaClose();
                  setWhatMegaOpen(true);
                }}
                onBlur={(e) => {
                  const rel = e.relatedTarget;
                  if (
                    rel &&
                    megaPanelRef.current &&
                    megaPanelRef.current.contains(rel)
                  ) {
                    return;
                  }
                  scheduleWhatMegaClose();
                }}
              >
                What We Do
                <ChevronDown
                  className={`h-4 w-4 text-neutral-500 transition-transform duration-200 ${
                    whatMegaOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </li>

            <li className="group/why relative">
              <button
                type="button"
                className={`inline-flex items-center gap-1 ${linkBase} ${
                  isWhyActive ? linkActive : ""
                }`}
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="naptec-menu-why-us"
              >
                Why Us
                <ChevronDown className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-hover/why:rotate-180" />
              </button>
              <div
                id="naptec-menu-why-us"
                role="menu"
                aria-label="Why us"
                className="pointer-events-none invisible absolute left-1/2 top-full z-50 min-w-[16rem] -translate-x-1/2 -translate-y-1 pt-3 opacity-0 transition-all duration-200 ease-out group-hover/why:pointer-events-auto group-hover/why:visible group-hover/why:translate-y-0 group-hover/why:opacity-100 group-focus-within/why:pointer-events-auto group-focus-within/why:visible group-focus-within/why:translate-y-0 group-focus-within/why:opacity-100"
              >
                <div className="rounded-xl border border-neutral-100 bg-white p-2 shadow-xl shadow-neutral-900/10">
                  <ul className="py-1">
                    {whyUsLinks.map((item) => (
                      <li key={item.href} role="none">
                        <Link
                          role="menuitem"
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-[#3B2A8F]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/how-it-works"
                className={`${linkBase} ${isProcessActive ? linkActive : ""}`}
              >
                How It Works
              </Link>
            </li>

            <li className="group/advice relative">
              <button
                type="button"
                className={`inline-flex items-center gap-1 ${linkBase} ${
                  isAdviceActive ? linkActive : ""
                }`}
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="naptec-menu-advice-care"
              >
                Advice & Care
                <ChevronDown className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-hover/advice:rotate-180" />
              </button>
              <div
                id="naptec-menu-advice-care"
                role="menu"
                aria-label="Advice and care"
                className="pointer-events-none invisible absolute right-0 top-full z-50 min-w-[16rem] -translate-y-1 pt-3 opacity-0 transition-all duration-200 ease-out group-hover/advice:pointer-events-auto group-hover/advice:visible group-hover/advice:translate-y-0 group-hover/advice:opacity-100 group-focus-within/advice:pointer-events-auto group-focus-within/advice:visible group-focus-within/advice:translate-y-0 group-focus-within/advice:opacity-100"
              >
                <div className="rounded-xl border border-neutral-100 bg-white p-2 shadow-xl shadow-neutral-900/10">
                  <ul className="py-1">
                    {adviceAndCareLinks.map((item) => (
                      <li key={item.href} role="none">
                        <Link
                          role="menuitem"
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-[#3B2A8F]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="relative z-10 ml-auto flex flex-none items-center gap-3 lg:gap-4">
          {!onAuthPage ? (
            <AuthNav className="hidden lg:inline-flex" />
          ) : null}

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 text-neutral-800 transition-colors hover:bg-neutral-50 lg:hidden"
            aria-controls={mobileMenuId}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${
                  mobileOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${
                  mobileOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

        <div
          ref={megaPanelRef}
          id="naptec-mega-what-we-do"
          role="region"
          aria-label="What we do services"
          className={`absolute left-0 top-full z-50 hidden w-full border-t border-gray-100 bg-white shadow-lg transition-[opacity,transform,visibility] duration-300 ease-out lg:block ${
            whatMegaOpen
              ? "pointer-events-auto visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-2 opacity-0"
          }`}
          onMouseEnter={() => {
            cancelWhatMegaClose();
            setWhatMegaOpen(true);
          }}
          onMouseLeave={scheduleWhatMegaClose}
          onFocusCapture={() => {
            cancelWhatMegaClose();
            setWhatMegaOpen(true);
          }}
        >
          <div className="mx-auto grid w-full grid-cols-3 gap-16 px-4 py-10 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            {whatWeDoColumns.map((column) => (
              <div key={column.title} className="min-w-0">
                <Link
                  href={column.href}
                  className="mb-4 block text-sm font-bold uppercase tracking-widest text-[#3B2A8F]"
                >
                  {column.title}
                </Link>
                {column.items.length > 0 ? (
                  <ul>
                    {column.items.map((item) => (
                      <li key={item}>
                        <Link
                          href={`/what-we-do/${slugify(item)}`}
                          className="block py-1 text-sm text-gray-600 transition-colors duration-200 hover:text-[#3B2A8F]"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <div
        id={mobileMenuId}
        className={`lg:hidden ${
          mobileOpen
            ? "pointer-events-auto max-h-[calc(100vh-4rem)] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        } overflow-hidden border-t border-neutral-100 bg-white shadow-inner transition-[max-height,opacity] duration-300 ease-out`}
        aria-hidden={!mobileOpen}
      >
        <div className="mx-auto w-full space-y-3 px-4 py-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div
            className={`rounded-xl border px-3 transition-colors duration-200 ${
              mobileAccordion === "what"
                ? "border-[#3B2A8F]/20 bg-[#3B2A8F]/5"
                : "border-neutral-100 bg-white"
            }`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-900"
              aria-expanded={mobileAccordion === "what"}
              aria-controls="mobile-accordion-what"
              onClick={() =>
                setMobileAccordion((cur) => (cur === "what" ? null : "what"))
              }
            >
              What We Do
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 ${
                  mobileAccordion === "what" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id="mobile-accordion-what"
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                mobileAccordion === "what"
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="space-y-6 pb-4 pt-1">
                  {whatWeDoColumns.map((column) => (
                    <div key={column.title}>
                      <Link
                        href={column.href}
                        className="text-sm font-semibold text-[#3B2A8F]"
                        onClick={closeMobile}
                      >
                        {column.title}
                      </Link>
                      {column.items.length > 0 ? (
                        <ul className="mt-2 space-y-2">
                          {column.items.map((item) => (
                            <li key={item}>
                              <Link
                                href={`/what-we-do/${slugify(item)}`}
                                className="text-sm text-neutral-700"
                                onClick={closeMobile}
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border px-3 transition-colors duration-200 ${
              mobileAccordion === "why"
                ? "border-[#3B2A8F]/20 bg-[#3B2A8F]/5"
                : "border-neutral-100 bg-white"
            }`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-900"
              aria-expanded={mobileAccordion === "why"}
              aria-controls="mobile-accordion-why"
              onClick={() =>
                setMobileAccordion((cur) => (cur === "why" ? null : "why"))
              }
            >
              Why Us
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 ${
                  mobileAccordion === "why" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id="mobile-accordion-why"
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                mobileAccordion === "why"
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <ul className="space-y-1 pb-4 pt-1">
                  {whyUsLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-lg py-2 text-sm font-medium text-neutral-800"
                        onClick={closeMobile}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Link
            href="/how-it-works"
            className="block py-3 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-900"
            onClick={closeMobile}
          >
            How It Works
          </Link>

          <div
            className={`rounded-xl border px-3 transition-colors duration-200 ${
              mobileAccordion === "advice"
                ? "border-[#3B2A8F]/20 bg-[#3B2A8F]/5"
                : "border-neutral-100 bg-white"
            }`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-900"
              aria-expanded={mobileAccordion === "advice"}
              aria-controls="mobile-accordion-advice"
              onClick={() =>
                setMobileAccordion((cur) => (cur === "advice" ? null : "advice"))
              }
            >
              Advice &amp; Care
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 ${
                  mobileAccordion === "advice" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id="mobile-accordion-advice"
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                mobileAccordion === "advice"
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <ul className="space-y-1 pb-4 pt-1">
                  {adviceAndCareLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-lg py-2 text-sm font-medium text-neutral-800"
                        onClick={closeMobile}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {!onAuthPage ? (
            <AuthNav
              className="mt-4 w-full lg:hidden"
              buttonClassName="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#3B2A8F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_4px_20px_-6px_rgba(59,42,143,0.45)] transition-colors duration-200 hover:bg-[#2d1f6d]"
              onNavigate={closeMobile}
            />
          ) : null}
        </div>
      </div>
    </header>
  );
}
