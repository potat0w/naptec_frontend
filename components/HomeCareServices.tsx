import {
  bodyText,
  btnPrimary,
  cardTitle,
  containerClass,
  labelEyebrow,
  sectionBgWhite,
  sectionPy,
  sectionTitle,
} from "@/lib/layout";
import { slugify } from "@/lib/slugify";
import {
  CalendarHeart,
  ChevronRight,
  HeartPulse,
  Home,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

type ServiceLine = { label: string; href: string };

type ServiceCard = {
  key: string;
  title: string;
  href: string;
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
    href: "/what-we-do/domiciliary-care",
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
    href: "/what-we-do/specialist-care",
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
    href: "/what-we-do/live-in-care",
    Icon: Users,
    services: null,
    description:
      "When your loved one needs frequent support, our live-in care solutions can help them stay independent and comfortable at home.",
  },
  {
    key: "domiciliary",
    title: "Domiciliary Care",
    href: "/what-we-do/domiciliary-care",
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
  {
    key: "respite",
    title: "Respite Care",
    href: "/what-we-do/respite-care",
    Icon: CalendarHeart,
    services: null,
    description:
      "Respite care gives family carers time to rest while your loved one receives consistent, compassionate support from a trusted Naptec caregiver at home.",
  },
];

function ServiceCardBlock({ card }: { card: ServiceCard }) {
  const Icon = card.Icon;

  return (
    <article className="flex h-full min-h-[360px] flex-col bg-surface-card p-8 sm:min-h-[380px] sm:p-10">
      <Icon
        className="mx-auto h-10 w-10 shrink-0 text-brand sm:h-11 sm:w-11"
        strokeWidth={1.5}
        aria-hidden
      />
      <h3 className={`mt-6 shrink-0 text-center ${cardTitle}`}>
        {card.title}
      </h3>

      {card.description ? (
        <p className="mt-5 flex-1 text-center text-sm leading-[1.65] text-body">
          {card.description}
        </p>
      ) : (
        <ul className="mt-5 flex-1 text-center">
          {card.services?.map((item) => (
            <li
              key={item.label}
              className="py-[0.35rem] text-sm leading-[1.65] text-body"
            >
              <Link href={item.href} className="transition-colors hover:text-brand">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        href={card.href}
        className="mt-auto inline-flex items-center justify-center gap-1 self-center pt-8 text-xs font-bold uppercase tracking-[0.14em] text-brand transition-colors hover:text-brand-dark"
      >
        Learn more
        <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
      </Link>
    </article>
  );
}

export default function HomeCareServices() {
  return (
    <section
      className={`${sectionBgWhite} ${sectionPy}`}
      aria-labelledby="home-care-services-heading"
    >
      <div className={containerClass}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:items-start lg:gap-6">
          <div className="flex flex-col items-start self-start">
            <p className={labelEyebrow}>Our services</p>
            <h2 id="home-care-services-heading" className={`mt-4 ${sectionTitle}`}>
              Our Home Care Services
            </h2>
            <p className={`mt-7 max-w-md ${bodyText}`}>
              We can help you make an informed, compassionate choice for your
              loved one, with bespoke packages to suit their domiciliary care
              needs.
            </p>
            <Link
              href="/what-we-do/domiciliary-care"
              className={`mt-8 w-fit ${btnPrimary}`}
            >
              View services
            </Link>
          </div>

          {cards.map((card) => (
            <ServiceCardBlock key={card.key} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
