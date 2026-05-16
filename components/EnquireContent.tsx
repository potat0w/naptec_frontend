"use client";

import FormSplitLayout from "@/components/FormSplitLayout";
import {
  careHomes,
  enquiryTypes,
  type EnquiryType,
} from "@/lib/enquire-options";
import {
  formCheckboxClass,
  formInputClass,
  formLabelClass,
  formRequiredClass,
  formSelectClass,
  formTextareaClass,
  headingFont,
} from "@/lib/auth/form-styles";
import { images } from "@/lib/images";
import { btnPrimary, btnSecondary } from "@/lib/layout";
import Link from "next/link";
import { useState, type FormEvent } from "react";

type EnquireContentProps = {
  titleId?: string;
  onClose?: () => void;
};

function radioPillClass(selected: boolean) {
  return selected
    ? "border-brand bg-brand text-white shadow-[0_8px_24px_-10px_rgba(100,69,150,0.45)]"
    : "border-surface-card bg-surface-alt/60 text-body hover:border-brand/35 hover:bg-white";
}

export default function EnquireContent({ titleId, onClose }: EnquireContentProps) {
  const [enquiryType, setEnquiryType] = useState<EnquiryType>("email");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const form = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitted ? (
        <div className="py-4 text-center sm:text-left">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand sm:mx-0"
            aria-hidden
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <p
            className="mt-6 text-3xl font-normal text-neutral-900"
            style={headingFont}
          >
            Thank you
          </p>
          <p className="mt-4 text-sm leading-relaxed text-body">
            We&apos;ve received your enquiry. A member of our team will be in
            touch shortly.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className={`w-full sm:w-fit ${btnPrimary}`}
              >
                Close
              </button>
            ) : (
              <Link href="/" className={`w-full sm:w-fit ${btnPrimary}`}>
                Back to home
              </Link>
            )}
            <Link href="/book" className={`w-full sm:w-fit ${btnSecondary}`}>
              Book a caregiver
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="border-b border-surface-card pb-6">
            <p
              className="text-xl font-normal text-neutral-900 sm:text-2xl"
              style={headingFont}
            >
              Your enquiry
            </p>
            <p className="mt-1.5 text-sm text-muted">
              Tell us how we can help — fields marked * are required.
            </p>
          </div>

          <label className="block">
            <span className={formLabelClass}>
              Care home <span className={formRequiredClass}>*</span>
            </span>
            <select
              name="careHome"
              required
              defaultValue=""
              className={`${formSelectClass} text-neutral-500 [&:valid]:text-neutral-900`}
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
            <legend className={formLabelClass}>
              Please select enquiry type:{" "}
              <span className={formRequiredClass}>*</span>
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {enquiryTypes.map((type) => (
                <label
                  key={type.value}
                  className={`flex cursor-pointer items-center justify-center rounded-2xl border px-3 py-3.5 text-center text-sm font-medium transition-all duration-200 ${radioPillClass(enquiryType === type.value)}`}
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
            <span className={formLabelClass}>
              Full name <span className={formRequiredClass}>*</span>
            </span>
            <input
              type="text"
              name="fullName"
              required
              autoComplete="name"
              className={formInputClass}
            />
          </label>

          <label className="block">
            <span className={formLabelClass}>
              Phone number <span className={formRequiredClass}>*</span>
            </span>
            <input
              type="tel"
              name="phone"
              required
              autoComplete="tel"
              className={formInputClass}
            />
          </label>

          <label className="block">
            <span className={formLabelClass}>
              Email address <span className={formRequiredClass}>*</span>
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className={formInputClass}
            />
          </label>

          <label className="block">
            <span className={formLabelClass}>Message</span>
            <textarea name="message" rows={4} className={formTextareaClass} />
          </label>

          <fieldset className="space-y-4 rounded-2xl border border-surface-card/80 bg-surface-alt/40 px-4 py-5 sm:px-5">
            <legend className="sr-only">Consent</legend>
            <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-body">
              <input
                type="checkbox"
                name="privacyConsent"
                required
                value="yes"
                className={formCheckboxClass}
              />
              <span>
                I confirm I have read the{" "}
                <a
                  href="#privacy-notice"
                  className="font-medium text-brand underline underline-offset-2 transition-colors hover:text-brand-dark"
                >
                  privacy notice
                </a>{" "}
                <span className={formRequiredClass}>*</span>
              </span>
            </label>
            <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-body">
              <input
                type="checkbox"
                name="marketingConsent"
                value="yes"
                className={formCheckboxClass}
              />
              <span>
                I would like to be kept up-to-date with news from our homes,
                future offers and services
              </span>
            </label>
          </fieldset>

          <div className="pt-1">
            <button
              type="submit"
              className={`w-full sm:w-auto sm:min-w-[12rem] ${btnPrimary}`}
            >
              Send enquiry
            </button>
          </div>
        </>
      )}
    </form>
  );

  const privacyFooter = (
    <p
      id="privacy-notice"
      className="scroll-mt-28 text-xs leading-relaxed text-muted"
    >
      Naptec processes your personal data to respond to your enquiry. For more
      information on how we use your data, please contact us at{" "}
      <a
        href="mailto:hello@naptec.co.uk"
        className="text-brand underline underline-offset-2 transition-colors hover:text-brand-dark"
      >
        hello@naptec.co.uk
      </a>
      .
    </p>
  );

  return (
    <FormSplitLayout
      imageSrc={images.handsCare}
      imageAlt="Care professional holding hands with a client"
      titleId={titleId}
      eyebrow="Get in touch"
      title="Start a care enquiry"
      subtitle="Select your enquiry type, home of interest and complete the form. Our team will be in touch shortly."
      aside={
        <>
          <p className="text-sm leading-relaxed text-white/90">
            Looking to contact a relative?{" "}
            <a
              href="tel:03308228465"
              className="font-medium text-white underline underline-offset-4 transition-colors hover:text-white/80"
            >
              Contact the home team
            </a>
          </p>
          <p className="text-sm leading-relaxed text-white/90">
            Want to apply for a job?{" "}
            <Link
              href="/recruitment/apply"
              className="font-medium text-white underline underline-offset-4 transition-colors hover:text-white/80"
            >
              Contact recruitment
            </Link>
            . Recruitment enquiries via this form will not receive a response.
          </p>
          <p className="text-sm text-white/80">
            Call Naptec on{" "}
            <a
              href="tel:03308228465"
              className="font-semibold text-white transition-colors hover:text-white/90"
            >
              03308 228465
            </a>
          </p>
        </>
      }
      footer={privacyFooter}
    >
      {form}
    </FormSplitLayout>
  );
}
