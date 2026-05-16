import {
  cardBase,
  cardTitle,
  containerClass,
  sectionBgWhite,
  sectionPy,
  sectionTitle,
} from "@/lib/layout";
import Link from "next/link";

const services = [
  {
    title: "Dementia Care",
    description:
      "Caring for someone with dementia takes a physical, emotional and mental toll. But with years of experience, Naptec is here to help you with whatever you need.",
    href: "/what-we-do/dementia-and-alzheimers",
  },
  {
    title: "Personal Care",
    description:
      "With Naptec you can feel confident that our caregivers will assist with your care and support needs discreetly and with dignity.",
    href: "/what-we-do/personal-care",
  },
  {
    title: "Live-In Care",
    description:
      "Our live-in care solutions help older adults stay independent and comfortable in their own home for longer.",
    href: "/what-we-do/live-in-care",
  },
] as const;

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function PopularServices() {
  return (
    <section
      className={`${sectionBgWhite} ${sectionPy}`}
      aria-labelledby="popular-services-heading"
    >
      <div className={containerClass}>
        <h2 id="popular-services-heading" className={sectionTitle}>
          Popular Services
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-12">
          {services.map((item) => (
            <article
              key={item.title}
              className={`${cardBase} flex min-h-[300px] flex-col sm:min-h-[320px]`}
            >
              <h3 className={`mb-4 ${cardTitle}`}>{item.title}</h3>
              <p className="mb-8 flex-1 text-sm leading-relaxed text-body">
                {item.description}
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href={item.href}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark"
                  aria-label={`Discover more about ${item.title}`}
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </Link>
                <Link
                  href={item.href}
                  className="text-sm text-neutral-800 underline underline-offset-4 transition-colors hover:text-brand"
                >
                  Discover more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
