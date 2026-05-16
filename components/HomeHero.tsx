import { containerClass } from "@/lib/layout";
import Image from "next/image";
import Link from "next/link";

const heroImage =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=85&w=2000&auto=format&fit=crop";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#faf8f4]">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full bg-[#3B2A8F]/[0.06] blur-3xl lg:h-[36rem] lg:w-[36rem]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#b8c99a]/20 blur-3xl"
        aria-hidden
      />

      <div className="relative flex flex-col lg:grid lg:min-h-[min(88vh,820px)] lg:grid-cols-2">
        <div
          className={`${containerClass} relative z-10 order-2 flex flex-col justify-center py-10 sm:py-14 lg:order-1 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:py-20 xl:pr-8`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#3B2A8F]">
            Personalised home care
          </p>
          <h1
            className="mt-4 max-w-lg text-[2.75rem] font-normal leading-[1.08] text-neutral-900 sm:text-5xl lg:text-[3.5rem] xl:text-6xl"
            style={serif}
          >
            Home care{" "}
            <em className="font-medium italic text-[#3B2A8F]">your way</em>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-600 sm:text-lg sm:leading-[1.7]">
            Quality, reliable care so your loved one can stay independent in the
            place they love — with caregivers who take the time to listen.
          </p>

          <div className="mt-9 sm:mt-10">
            <Link
              href="/enquire"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#3B2A8F] py-3.5 pl-7 pr-4 text-sm font-semibold tracking-wide text-white shadow-[0_8px_32px_-10px_rgba(59,42,143,0.55)] transition-all duration-200 hover:bg-[#2d1f6d] hover:shadow-[0_12px_36px_-10px_rgba(59,42,143,0.65)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Enquire Now
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>

          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500">
            <span className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#3B2A8F]"
                aria-hidden
              />
              CQC-regulated care
            </span>
            <span className="hidden h-3 w-px bg-neutral-300 sm:block" aria-hidden />
            <Link
              href="tel:03308228465"
              className="font-medium text-neutral-700 transition-colors hover:text-[#3B2A8F]"
            >
              03308 228465
            </Link>
          </p>
        </div>

        <div className="relative order-1 mx-4 aspect-[5/4] overflow-hidden rounded-2xl sm:mx-6 sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:order-2 lg:mx-0 lg:aspect-auto lg:w-[54%] lg:max-w-none lg:rounded-none">
          <Image
            src={heroImage}
            alt="Care professional sharing a warm conversation with a client at home"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#2a2048]/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#faf8f4] lg:via-[#faf8f4]/40 lg:to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-[#faf8f4] to-transparent lg:block"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
