import Link from "next/link";
import type { ReactNode } from "react";
import { headingFont } from "@/lib/auth/form-styles";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  alternateLabel: string;
  alternateHref: string;
  alternateLinkText: string;
  callbackUrl?: string;
};

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  alternateLabel,
  alternateHref,
  alternateLinkText,
  callbackUrl,
}: AuthShellProps) {
  const alternate = callbackUrl
    ? `${alternateHref}?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : alternateHref;

  return (
    <main className="flex flex-1 flex-col bg-[#faf8f4]">
      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center lg:py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3B2A8F]">
            {eyebrow}
          </p>
          <h1
            className="mt-3 text-4xl font-normal leading-tight text-neutral-900 sm:text-5xl"
            style={headingFont}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-600">
            {subtitle}
          </p>
          <p className="mt-10 text-sm text-neutral-600">
            Just want advice first?{" "}
            <Link
              href="/enquire"
              className="font-medium text-[#3B2A8F] underline underline-offset-4 hover:text-[#2d1f6d]"
            >
              Send an enquiry
            </Link>{" "}
            — no account needed.
          </p>
          <p className="mt-8 text-sm text-neutral-600">Call Naptec on:</p>
          <a
            href="tel:03308228465"
            className="mt-1 block text-2xl font-semibold tracking-tight text-neutral-900 transition-colors hover:text-[#3B2A8F] sm:text-3xl"
          >
            03308 228465
          </a>
        </div>

        <div className="flex flex-col justify-center">
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-[0_12px_48px_-20px_rgba(42,32,72,0.15)] sm:p-8">
            {children}
            <p className="mt-8 border-t border-neutral-100 pt-6 text-center text-sm text-neutral-600">
              {alternateLabel}{" "}
              <Link
                href={alternate}
                className="font-semibold text-[#3B2A8F] transition-colors hover:text-[#2d1f6d]"
              >
                {alternateLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
