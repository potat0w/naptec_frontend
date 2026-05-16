"use client";

import { useAuth } from "@/components/AuthProvider";
import FormFieldError from "@/components/FormFieldError";
import { formErrorClass, formLabelClass } from "@/lib/auth/form-styles";
import { addBooking, type BookingRequest } from "@/lib/auth/bookings-storage";
import { btnPrimary } from "@/lib/layout";
import { formValuesFromForm, inputErrorClass, validateWithSchema } from "@/lib/validation/helpers";
import { bookCareSchema } from "@/lib/validation/schemas";
import { MapPin } from "lucide-react";
import { useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-2xl border border-surface-card bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-[border-color,box-shadow] placeholder:text-neutral-400 focus:border-brand focus:ring-2 focus:ring-brand/15";

type CareFor = "loved-one" | "me";

type BookCareFormProps = {
  onSuccess?: (booking: BookingRequest) => void;
};

export default function BookCareForm({ onSuccess }: BookCareFormProps) {
  const { user, updateProfile } = useAuth();
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

    if (!user) {
      setError("Please sign in to request a caregiver.");
      setPending(false);
      return;
    }

    const booking: BookingRequest = {
      id: crypto.randomUUID(),
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      telephone: user.phone,
      addressLine1: validation.values.addressLine1,
      addressLine2: validation.values.addressLine2,
      city: validation.values.city,
      postcode: validation.values.postcode,
      careFor: validation.values.careFor as CareFor,
      preferredDate: validation.values.preferredDate,
      careNotes: validation.values.careNotes,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    addBooking(booking);
    updateProfile({
      addressLine1: validation.values.addressLine1,
      addressLine2: validation.values.addressLine2,
      city: validation.values.city,
      postcode: validation.values.postcode,
    });
    setPending(false);
    setSubmitted(true);
    onSuccess?.(booking);
  };

  if (!user) return null;

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand/20 bg-brand/5 p-6">
        <p
          className="text-xl font-normal text-neutral-900"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Booking request received
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Thanks, {user.firstName}. We&apos;ll match a Care Professional for your home visit and
          contact you at {user.email}.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className={`mt-6 ${btnPrimary}`}
        >
          Request another visit
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-surface-card bg-white p-6 shadow-[0_8px_32px_-16px_rgba(63,45,98,0.1)]">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
        <MapPin className="h-5 w-5 text-brand" />
        Request a home visit
      </h2>
      <p className="mt-1 text-sm text-muted">
        Where should the caregiver visit? We&apos;ll use your saved contact details.
      </p>

      {error ? (
        <p className={`mt-4 ${formErrorClass}`} role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-5 rounded-xl bg-surface-alt/80 px-4 py-3 text-sm text-body">
        <p className="font-medium text-neutral-900">
          {user.firstName} {user.lastName}
        </p>
        <p className="mt-0.5">{user.email}</p>
        <p>{user.phone || "Add your phone in account details"}</p>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className={formLabelClass}>Street address *</span>
          <input
            type="text"
            name="addressLine1"
            defaultValue={user.addressLine1}
            placeholder="e.g. 14 Oak Lane"
            className={inputErrorClass(Boolean(fieldErrors.addressLine1), inputClass)}
          />
          <FormFieldError message={fieldErrors.addressLine1} />
        </label>
        <label className="block">
          <span className={formLabelClass}>Flat, building (optional)</span>
          <input
            type="text"
            name="addressLine2"
            defaultValue={user.addressLine2}
            placeholder="e.g. Flat 2"
            className={inputClass}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={formLabelClass}>Town / city *</span>
            <input
              type="text"
              name="city"
              defaultValue={user.city}
              placeholder="e.g. Manchester"
              className={inputErrorClass(Boolean(fieldErrors.city), inputClass)}
            />
            <FormFieldError message={fieldErrors.city} />
          </label>
          <label className="block">
            <span className={formLabelClass}>Postcode *</span>
            <input
              type="text"
              name="postcode"
              defaultValue={user.postcode}
              placeholder="e.g. M20 3AB"
              className={inputErrorClass(Boolean(fieldErrors.postcode), inputClass)}
            />
            <FormFieldError message={fieldErrors.postcode} />
          </label>
        </div>
        <label className="block">
          <span className={formLabelClass}>Preferred start date (optional)</span>
          <input type="date" name="preferredDate" className={inputClass} />
        </label>
        <label className="block">
          <span className={formLabelClass}>Care needs (optional)</span>
          <textarea
            name="careNotes"
            rows={3}
            placeholder="e.g. morning visits, medication reminders, mobility support"
            className={`${inputClass} resize-y rounded-2xl`}
          />
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className={formLabelClass}>Who is the care for? *</legend>
        <FormFieldError message={fieldErrors.careFor} />
        <div className="mt-3 flex flex-wrap gap-6">
          {(
            [
              { value: "loved-one" as const, label: "A loved one" },
              { value: "me" as const, label: "Myself" },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-body"
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
                    : "border-surface-card-hover bg-white"
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

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={pending || !user.phone}
          className={`${btnPrimary} disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {pending ? "Submitting…" : "Request caregiver"}
        </button>
      </div>
      {!user.phone ? (
        <p className="mt-2 text-right text-xs text-amber-700">
          Add your phone number in account details before booking.
        </p>
      ) : null}
    </form>
  );
}
