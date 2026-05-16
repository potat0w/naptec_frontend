"use client";

import {
  careHomes,
  enquiryTypes,
  type EnquiryType,
} from "@/lib/enquire-options";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

const inputClass =
  "w-full rounded-full border border-neutral-200 bg-white px-5 py-3.5 text-sm text-neutral-900 outline-none transition-[border-color,box-shadow] placeholder:text-neutral-400 focus:border-[#3B2A8F] focus:ring-2 focus:ring-[#3B2A8F]/15";

const selectClass =
  "w-full appearance-none rounded-full border border-neutral-200 bg-white bg-[length:1rem] bg-[right_1.25rem_center] bg-no-repeat px-5 py-3.5 pr-12 text-sm text-neutral-900 outline-none transition-[border-color,box-shadow] focus:border-[#3B2A8F] focus:ring-2 focus:ring-[#3B2A8F]/15 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]";

const labelClass = "mb-1.5 block text-sm font-medium text-neutral-800";

type EnquireContentProps = {
  titleId?: string;
  onClose?: () => void;
};

export default function EnquireContent({ titleId, onClose }: EnquireContentProps) {
  const [enquiryType, setEnquiryType] = useState<EnquiryType>("email");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:px-8 lg:py-16">
      <div>
        <h1
          id={titleId}
          className="text-4xl font-normal leading-tight text-neutral-900 sm:text-5xl"
          style={serif}
        >
          Start a care enquiry
        </h1>
        <p className="mt-6 text-base leading-relaxed text-neutral-600">
          Select your enquiry type, home of interest and complete the form. One
          of our dedicated, friendly team will be in touch shortly.
        </p>

        <div className="mt-10 space-y-6 border-t border-neutral-200 pt-8 text-sm leading-relaxed text-neutral-600">
          <p>
            Looking to contact a relative?{" "}
            <a
              href="tel:03308228465"
              className="font-medium text-[#3B2A8F] underline underline-offset-4 hover:text-[#2d1f6d]"
            >
              Contact the home team
            </a>
          </p>
          <p>
            Want to apply for a job &amp; join our team?{" "}
            <Link
              href="/recruitment/apply"
              className="font-medium text-[#3B2A8F] underline underline-offset-4 hover:text-[#2d1f6d]"
            >
              Contact our recruitment team
            </Link>
            . Kindly note that we will not respond to any recruitment enquiries
            made via this form.
          </p>
        </div>

        <p className="mt-10 text-sm text-neutral-600">Call Naptec on:</p>
        <a
          href="tel:03308228465"
          className="mt-1 block text-2xl font-semibold tracking-tight text-neutral-900 transition-colors hover:text-[#3B2A8F] sm:text-3xl"
        >
          03308 228465
        </a>
      </div>

      <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitted ? (
            <div className="py-6">
              <p className="text-3xl font-normal text-neutral-900" style={serif}>
                Thank you
              </p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                We&apos;ve received your enquiry. A member of our team will be
                in touch shortly.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                {onClose ? (
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-fit rounded-full bg-[#3B2A8F] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#2d1f6d]"
                  >
                    Close
                  </button>
                ) : (
                  <Link
                    href="/"
                    className="w-fit rounded-full bg-[#3B2A8F] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#2d1f6d]"
                  >
                    Back to home
                  </Link>
                )}
                <Link
                  href="/book"
                  className="w-fit rounded-full border border-[#3B2A8F] px-8 py-3.5 text-sm font-medium text-[#3B2A8F] transition-colors hover:bg-[#3B2A8F]/5"
                >
                  Book a caregiver
                </Link>
              </div>
            </div>
          ) : (
            <>
              <label className="block">
                <span className={labelClass}>
                  Care home <span className="text-[#3B2A8F]">*</span>
                </span>
                <select
                  name="careHome"
                  required
                  defaultValue=""
                  className={`${selectClass} text-neutral-500 [&:valid]:text-neutral-900`}
                >
                  <option value="" disabled>
                    Please select a care home…
                  </option>
                  {careHomes.map((home) => (
                    <option key={home.value} value={home.value}>
                      {home.label}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset>
                <legend className={labelClass}>
                  Please select enquiry type:{" "}
                  <span className="text-[#3B2A8F]">*</span>
                </legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {enquiryTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3.5 text-center text-sm font-medium transition-colors ${
                        enquiryType === type.value
                          ? "border-[#3B2A8F] bg-[#3B2A8F] text-white"
                          : "border-neutral-200 bg-neutral-50/50 text-neutral-800 hover:border-[#3B2A8F]/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="enquiryType"
                        value={type.value}
                        checked={enquiryType === type.value}
                        onChange={() => setEnquiryType(type.value)}
                        className="sr-only"
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className={labelClass}>
                  Full name <span className="text-[#3B2A8F]">*</span>
                </span>
                <input
                  type="text"
                  name="fullName"
                  required
                  autoComplete="name"
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className={labelClass}>
                  Phone number <span className="text-[#3B2A8F]">*</span>
                </span>
                <input
                  type="tel"
                  name="phone"
                  required
                  autoComplete="tel"
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className={labelClass}>
                  Email address <span className="text-[#3B2A8F]">*</span>
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className={labelClass}>Message</span>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full resize-y rounded-2xl border border-neutral-200 bg-white px-5 py-3.5 text-sm text-neutral-900 outline-none transition-[border-color,box-shadow] placeholder:text-neutral-400 focus:border-[#3B2A8F] focus:ring-2 focus:ring-[#3B2A8F]/15"
                />
              </label>

              <fieldset className="space-y-4 border-t border-neutral-100 pt-6">
                <legend className="sr-only">Consent</legend>
                <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-neutral-700">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    required
                    value="yes"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 text-[#3B2A8F] focus:ring-[#3B2A8F]/25"
                  />
                  <span>
                    I confirm I have read the{" "}
                    <a
                      href="#privacy-notice"
                      className="font-medium text-[#3B2A8F] underline underline-offset-2 hover:text-[#2d1f6d]"
                    >
                      privacy notice
                    </a>{" "}
                    <span className="text-[#3B2A8F]">*</span>
                  </span>
                </label>
                <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-neutral-700">
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    value="yes"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 text-[#3B2A8F] focus:ring-[#3B2A8F]/25"
                  />
                  <span>
                    I would like to be kept up-to-date with news from our homes,
                    future offers and services
                  </span>
                </label>
              </fieldset>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#3B2A8F] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_-8px_rgba(59,42,143,0.45)] transition-all hover:bg-[#2d1f6d] hover:shadow-[0_10px_32px_-8px_rgba(59,42,143,0.5)] sm:w-auto sm:min-w-[12rem]"
                >
                  Send enquiry
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      <p
        id="privacy-notice"
        className="scroll-mt-28 text-xs leading-relaxed text-neutral-500 lg:col-span-2"
      >
        Naptec processes your personal data to respond to your enquiry. For more
        information on how we use your data, please contact us at{" "}
        <a
          href="mailto:hello@naptec.co.uk"
          className="text-[#3B2A8F] underline underline-offset-2"
        >
          hello@naptec.co.uk
        </a>
        .
      </p>
    </div>
  );
}
