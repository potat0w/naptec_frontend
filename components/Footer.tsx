import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/SocialIcons";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com", icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: LinkedInIcon },
  { label: "YouTube", href: "https://www.youtube.com", icon: YouTubeIcon },
] as const;

const whatWeDoLinks = [
  { label: "Domiciliary Care", href: "/what-we-do/domiciliary-care" },
  { label: "Companionship", href: "/what-we-do/companionship" },
  { label: "Home Help & Housekeeping", href: "/what-we-do/home-help-and-housekeeping" },
  { label: "Personal Care", href: "/what-we-do/personal-care" },
  { label: "Specialist Care", href: "/what-we-do/specialist-care" },
  { label: "Dementia", href: "/what-we-do/dementia-and-alzheimers" },
  { label: "Cancer", href: "/what-we-do/cancer" },
  { label: "Neurological", href: "/what-we-do/neurological" },
  { label: "Palliative", href: "/what-we-do/palliative" },
  { label: "Live-In Care", href: "/what-we-do/live-in-care" },
];

const howItWorksLinks = [
  { label: "Tell us about you", href: "/how-it-works#tell-us-about-you" },
  { label: "Meet your team", href: "/how-it-works#meet-your-team" },
  { label: "Start your plan", href: "/how-it-works#start-your-plan" },
];

const enquireLinks = [
  { label: "Care Enquiry", href: "/enquire" },
  { label: "Contact Us", href: "/enquire" },
];

const whyUsLinks = [
  { label: "Our Story", href: "/why-us/our-story" },
  { label: "Our Caregivers", href: "/why-us/our-caregivers" },
  { label: "AI-Powered Reporting", href: "/why-us/ai-powered-reporting" },
  { label: "Trust & Safety", href: "/why-us/trust-and-safety" },
];

const adviceLinks = [
  { label: "Advice & Support", href: "/advice-and-care" },
  { label: "News & Events", href: "/advice-and-care/news-events" },
  { label: "Cost Of Care", href: "/advice-and-care/cost-of-care" },
  { label: "FAQs", href: "/advice-and-care/faqs" },
  { label: "How To Age Well", href: "/advice-and-care/how-to-age-well" },
  { label: "Articles", href: "/advice-and-care/articles" },
];

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">
        {title}
      </h3>
      {children}
    </div>
  );
}

function FooterLinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-sm text-white/75 transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#2a2048] text-white">
      <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 lg:py-16">

        {/* Top section: brand + all nav columns in one unified grid */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1fr] lg:gap-x-10 lg:gap-y-0">

          {/* Brand / Contact — spans full width on mobile, own column on lg */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo1.png"
                alt="Naptec"
                width={140}
                height={48}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <h3 className="mt-10 text-xs font-bold uppercase tracking-[0.14em] text-white">
              National Office
            </h3>
            <a
              href="tel:03308228465"
              className="mt-4 block text-2xl font-semibold tracking-tight text-white transition-colors hover:text-white/90"
            >
              03308 228465
            </a>
            <p className="mt-2 text-xs text-white/55">
              Calls may be recorded for quality and training purposes.
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">
              Unit 2, Walnut Tree Business Centre, Walnut Tree Farm, Lower
              Stretton, Warrington, Cheshire WA4 4PG
            </p>
            <a
              href="mailto:hello@naptec.co.uk"
              className="mt-4 inline-block text-sm text-white/75 underline underline-offset-4 transition-colors hover:text-white"
            >
              hello@naptec.co.uk
            </a>
            <Link
              href="/recruitment"
              className="mt-6 inline-block text-sm font-semibold text-white transition-colors hover:text-white/85"
            >
              Apply to be a Care Professional
            </Link>
            <div className="mt-8 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-[1.125rem] w-[1.125rem]" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav column 1 — What We Do */}
          <FooterColumn title="What We Do">
            <FooterLinkList links={whatWeDoLinks} />
          </FooterColumn>

          {/* Nav column 2 — How It Works + Enquire (both small, natural pairing) */}
          <div className="space-y-10">
            <FooterColumn title="How It Works">
              <FooterLinkList links={howItWorksLinks} />
            </FooterColumn>
            <FooterColumn title="Enquire Now">
              <FooterLinkList links={enquireLinks} />
            </FooterColumn>
          </div>

          {/* Nav column 3 — Why Us */}
          <FooterColumn title="Why Us">
            <FooterLinkList links={whyUsLinks} />
          </FooterColumn>

          {/* Nav column 4 — Advice & Support */}
          <FooterColumn title="Advice & Support">
            <FooterLinkList links={adviceLinks} />
          </FooterColumn>

        </div>

      </div>
    </footer>
  );
}