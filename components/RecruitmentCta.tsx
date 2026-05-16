import { containerClass, sectionPy, sectionTitle } from "@/lib/layout";
import Image from "next/image";
import Link from "next/link";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

export default function RecruitmentCta() {
  return (
    <section
      className={`overflow-hidden bg-[#2a2048] text-white ${sectionPy}`}
      aria-labelledby="recruitment-cta-heading"
    >
      <div
        className={`${containerClass} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14`}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Careers at Naptec
          </p>
          <h2
            id="recruitment-cta-heading"
            className={`${sectionTitle} mt-3 text-white`}
          >
            Make a difference as a Care Professional
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Join our team with flexible roles, industry-leading training, and
            the chance to build meaningful relationships with clients in their
            own homes.
          </p>
          <Link
            href="/recruitment"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-10 py-3.5 text-sm font-semibold uppercase tracking-wide text-[#3B2A8F] transition-[filter] hover:brightness-95"
          >
            View careers &amp; apply
          </Link>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-white/10 lg:aspect-[5/4]">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80"
            alt="Naptec care professional with a client"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
