"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

const serif = { fontFamily: "var(--font-cormorant), ui-serif, serif" } as const;

type CareFor = "loved-one" | "me";

type EnquireContentProps = {
  titleId?: string;
  onClose?: () => void;
};

export default function EnquireContent({ titleId, onClose }: EnquireContentProps) {
  const [careFor, setCareFor] = useState<CareFor>("me");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-16">
      <div>
        <h1
          id={titleId}
          className="text-4xl font-normal leading-tight text-gray-900 sm:text-5xl"
          style={serif}
        >
          How can <em className="italic">we</em> help?
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-gray-600">
          Whatever your situation, Naptec can provide quality care to enable your
          loved one to stay where they belong: at home. Share your details here
          and one of our friendly advisors will reach out to answer your
          questions.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          Wondering what care options you have? We&apos;re here to help.
        </p>
        <p className="mt-10 text-sm text-gray-600">Call Naptec on:</p>
        <a
          href="tel:03308228465"
          className="mt-1 block text-3xl font-semibold tracking-tight text-gray-900 transition-colors hover:text-[#3B2A8F]"
        >
          03308 228465
        </a>
        <div className="mt-16 border-t border-gray-200 pt-8">
          <a
            href="mailto:hello@naptec.co.uk"
            className="text-sm text-gray-600 underline underline-offset-4 transition-colors hover:text-[#3B2A8F]"
          >
            Click here for any other non-care related enquiries
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        {submitted ? (
          <div className="flex flex-1 flex-col justify-center py-8">
            <p className="text-3xl font-normal text-gray-900" style={serif}>
              Thank you
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              We&apos;ve received your details. A friendly advisor will be in
              touch shortly.
            </p>
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="mt-8 w-fit rounded-full bg-[#3B2A8F] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#2d1f6e]"
              >
                Close
              </button>
            ) : (
              <Link
                href="/"
                className="mt-8 w-fit rounded-full bg-[#3B2A8F] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#2d1f6e]"
              >
                Back to home
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">First name</span>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="First Name *"
                  className="w-full rounded-full border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition-[border-color,box-shadow] placeholder:text-gray-400 focus:border-[#3B2A8F] focus:ring-2 focus:ring-[#3B2A8F]/15"
                />
              </label>
              <label className="block">
                <span className="sr-only">Last name</span>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Last Name *"
                  className="w-full rounded-full border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition-[border-color,box-shadow] placeholder:text-gray-400 focus:border-[#3B2A8F] focus:ring-2 focus:ring-[#3B2A8F]/15"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address *"
                className="w-full rounded-full border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition-[border-color,box-shadow] placeholder:text-gray-400 focus:border-[#3B2A8F] focus:ring-2 focus:ring-[#3B2A8F]/15"
              />
            </label>
            <label className="mt-4 block">
              <span className="sr-only">Telephone</span>
              <input
                type="tel"
                name="telephone"
                required
                placeholder="Telephone *"
                className="w-full rounded-full border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition-[border-color,box-shadow] placeholder:text-gray-400 focus:border-[#3B2A8F] focus:ring-2 focus:ring-[#3B2A8F]/15"
              />
            </label>

            <fieldset className="mt-8">
              <legend className="text-sm text-gray-700">
                Are you looking for care for yourself or a loved one? *
              </legend>
              <div className="mt-4 flex flex-wrap gap-8">
                {(
                  [
                    { value: "loved-one" as const, label: "It's for a loved one" },
                    { value: "me" as const, label: "It's for me" },
                  ] as const
                ).map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3 text-sm text-gray-800"
                  >
                    <input
                      type="radio"
                      name="careFor"
                      value={option.value}
                      checked={careFor === option.value}
                      onChange={() => setCareFor(option.value)}
                      className="sr-only"
                    />
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        careFor === option.value
                          ? "border-[#3B2A8F] bg-[#3B2A8F]"
                          : "border-gray-300 bg-white"
                      }`}
                      aria-hidden
                    >
                      {careFor === option.value ? (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      ) : null}
                    </span>
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-10 flex justify-end">
              <button
                type="submit"
                className="rounded-full bg-[#b8c99a] px-12 py-3.5 text-sm font-medium text-white transition-[filter] hover:brightness-95"
              >
                Next
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
