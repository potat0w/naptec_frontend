"use client";

import { useAuth } from "@/components/AuthProvider";
import { btnPrimary } from "@/lib/layout";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

type CareFor = "loved-one" | "me";

export default function BookCareContent() {
  const { user } = useAuth();
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
          className="text-4xl font-normal leading-tight text-gray-900 sm:text-5xl"
          style={serif}
        >
          Book a <em className="italic">caregiver</em>
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-gray-600">
          Signed in as{" "}
          <span className="font-medium text-gray-900">
            {user?.firstName} {user?.lastName}
          </span>
          . Tell us about the care you need and we&apos;ll match you with a Care
          Professional and arrange a home visit.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          Just looking for advice first?{" "}
          <Link
            href="/enquire"
            className="font-medium text-[#3B2A8F] underline underline-offset-4 hover:text-[#2d1f6d]"
          >
            Send a general enquiry
          </Link>{" "}
          — no account needed.
        </p>
        <p className="mt-10 text-sm text-gray-600">Call Naptec on:</p>
        <a
          href="tel:03308228465"
          className="mt-1 block text-3xl font-semibold tracking-tight text-gray-900 transition-colors hover:text-[#3B2A8F]"
        >
          03308 228465
        </a>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        {submitted ? (
          <div className="flex flex-1 flex-col justify-center py-8">
            <p className="text-3xl font-normal text-gray-900" style={serif}>
              Booking request received
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Thanks, {user?.firstName}. We&apos;ll be in touch to confirm your
              caregiver match and home visit. (Demo — nothing was sent to a
              server.)
            </p>
            <Link
              href="/"
              className={`mt-8 w-fit ${btnPrimary}`}
            >
              Back to home
            </Link>
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
                  defaultValue={user?.firstName}
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
                  defaultValue={user?.lastName}
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
                defaultValue={user?.email}
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
                defaultValue={user?.phone}
                placeholder="Telephone *"
                className="w-full rounded-full border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition-[border-color,box-shadow] placeholder:text-gray-400 focus:border-[#3B2A8F] focus:ring-2 focus:ring-[#3B2A8F]/15"
              />
            </label>

            <fieldset className="mt-8">
              <legend className="text-sm text-gray-700">
                Who is the care for? *
              </legend>
              <div className="mt-4 flex flex-wrap gap-8">
                {(
                  [
                    { value: "loved-one" as const, label: "A loved one" },
                    { value: "me" as const, label: "Myself" },
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
                className={btnPrimary}
              >
                Request caregiver
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
