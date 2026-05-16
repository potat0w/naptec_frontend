"use client";

import { useAuth } from "@/components/AuthProvider";
import AuthSubmitButton from "@/components/AuthSubmitButton";
import { authInputClass, authLabelClass, headingFont } from "@/lib/auth/form-styles";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function SignupForm() {
  const { signup, ready } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/book";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setPending(true);

    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setPending(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setPending(false);
      return;
    }

    const result = signup({
      firstName: String(form.get("firstName") ?? ""),
      lastName: String(form.get("lastName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
    });

    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <>
      <p
        className="text-2xl font-normal text-neutral-900 sm:text-[1.65rem]"
        style={headingFont}
      >
        Your details
      </p>
      <p className="mt-1.5 text-sm text-neutral-500">
        We&apos;ll use this to set up your booking.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        {error ? (
          <p
            className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={authLabelClass}>First name *</span>
            <input
              type="text"
              name="firstName"
              required
              autoComplete="given-name"
              className={authInputClass}
            />
          </label>
          <label className="block">
            <span className={authLabelClass}>Last name *</span>
            <input
              type="text"
              name="lastName"
              required
              autoComplete="family-name"
              className={authInputClass}
            />
          </label>
        </div>

        <label className="block">
          <span className={authLabelClass}>Email *</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className={authInputClass}
          />
        </label>

        <label className="block">
          <span className={authLabelClass}>Phone *</span>
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            className={authInputClass}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={authLabelClass}>Password *</span>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              autoComplete="new-password"
              className={authInputClass}
            />
          </label>
          <label className="block">
            <span className={authLabelClass}>Confirm password *</span>
            <input
              type="password"
              name="confirmPassword"
              required
              minLength={8}
              autoComplete="new-password"
              className={authInputClass}
            />
          </label>
        </div>

        <AuthSubmitButton pending={pending} disabled={!ready}>
          {pending ? "Creating account…" : "Create account"}
        </AuthSubmitButton>
      </form>
    </>
  );
}
