"use client";

import { useAuth } from "@/components/AuthProvider";
import FormFieldError from "@/components/FormFieldError";
import { formErrorClass } from "@/lib/auth/form-styles";
import { btnPrimary } from "@/lib/layout";
import { formValuesFromForm, inputErrorClass, validateWithSchema } from "@/lib/validation/helpers";
import { bookCareSchema } from "@/lib/validation/schemas";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

const inputClass =
  "w-full rounded-full border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition-[border-color,box-shadow] placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/15";

type CareFor = "loved-one" | "me";

export default function BookCareContent() {
  const { user } = useAuth();
  const [careFor, setCareFor] = useState<CareFor>("me");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setPending(true);

    const validation = await validateWithSchema(bookCareSchema, {
      ...formValuesFromForm(e.currentTarget),
      careFor,
    });

    if (!validation.success) {
      setError(validation.message);
      setFieldErrors(validation.fieldErrors);
      setPending(false);
      return;
    }

    setPending(false);
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
            className="font-medium text-brand underline underline-offset-4 transition-colors hover:text-brand-dark"
          >
            Send a general enquiry
          </Link>{" "}
          — no account needed.
        </p>
        <p className="mt-10 text-sm text-gray-600">Call Naptec on:</p>
        <a
          href="tel:03308228465"
          className="mt-1 block text-3xl font-semibold tracking-tight text-gray-900 transition-colors hover:text-brand"
        >
          03308 228465
        </a>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col">
        {error ? (
          <p className={`mb-4 ${formErrorClass}`} role="alert">
            {error}
          </p>
        ) : null}

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
            <Link href="/" className={`mt-8 w-fit ${btnPrimary}`}>
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
                  defaultValue={user?.firstName}
                  placeholder="First Name *"
                  aria-invalid={Boolean(fieldErrors.firstName)}
                  className={inputErrorClass(Boolean(fieldErrors.firstName), inputClass)}
                />
                <FormFieldError message={fieldErrors.firstName} />
              </label>
              <label className="block">
                <span className="sr-only">Last name</span>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={user?.lastName}
                  placeholder="Last Name *"
                  aria-invalid={Boolean(fieldErrors.lastName)}
                  className={inputErrorClass(Boolean(fieldErrors.lastName), inputClass)}
                />
                <FormFieldError message={fieldErrors.lastName} />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                placeholder="Email Address *"
                aria-invalid={Boolean(fieldErrors.email)}
                className={inputErrorClass(Boolean(fieldErrors.email), inputClass)}
              />
              <FormFieldError message={fieldErrors.email} />
            </label>
            <label className="mt-4 block">
              <span className="sr-only">Telephone</span>
              <input
                type="tel"
                name="telephone"
                defaultValue={user?.phone}
                placeholder="Telephone *"
                aria-invalid={Boolean(fieldErrors.telephone)}
                className={inputErrorClass(Boolean(fieldErrors.telephone), inputClass)}
              />
              <FormFieldError message={fieldErrors.telephone} />
            </label>

            <fieldset className="mt-8">
              <legend className="text-sm text-gray-700">
                Who is the care for? *
              </legend>
              <FormFieldError message={fieldErrors.careFor} />
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
                          ? "border-brand bg-brand"
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
                disabled={pending}
                className={`${btnPrimary} disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {pending ? "Submitting…" : "Request caregiver"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
