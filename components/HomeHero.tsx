import { containerClass } from "@/lib/layout";
import Image from "next/image";
import Link from "next/link";

const heroImage =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=85&w=2000&auto=format&fit=crop";

const serif = { fontFamily: "var(--font-cormorant), ui-serif, serif" } as const;

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

          <form
            action="/enquire"
            method="get"
            className="mt-9 max-w-lg rounded-2xl border border-neutral-200/80 bg-white p-2 shadow-[0_8px_40px_-12px_rgba(42,32,72,0.18)] sm:mt-10 sm:p-2.5"
          >
            <p className="px-3 pt-2 text-xs font-medium text-neutral-500 sm:px-4 sm:pt-2.5">
              Find care near you
            </p>
            <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label htmlFor="hero-postcode" className="sr-only">
                Postcode or area
              </label>
              <input
                id="hero-postcode"
                name="postcode"
                type="text"
                placeholder="Enter postcode or area"
                className="min-h-[3rem] flex-1 rounded-xl border-0 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none ring-1 ring-neutral-200/80 placeholder:text-neutral-400 focus:bg-white focus:ring-2 focus:ring-[#3B2A8F]/25 sm:min-h-[3.25rem] sm:text-base"
              />
              <button
                type="submit"
                className="min-h-[3rem] shrink-0 rounded-xl bg-[#3B2A8F] px-8 text-sm font-semibold tracking-wide text-white transition-[filter,transform] hover:brightness-95 active:scale-[0.99] sm:min-h-[3.25rem]"
              >
                Find care
              </button>
            </div>
          </form>

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
