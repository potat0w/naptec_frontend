"use client";

import { useAuth } from "@/components/AuthProvider";
import AuthSubmitButton from "@/components/AuthSubmitButton";
import {
  authInputClass,
  authLabelClass,
  formErrorClass,
  formSectionSubtitleClass,
  formSectionTitleClass,
  headingFont,
} from "@/lib/auth/form-styles";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginForm() {
  const { login, ready } = useAuth();
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
    const result = login(
      String(form.get("email") ?? ""),
      String(form.get("password") ?? "")
    );

    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <>
      <div className="pb-2">
        <p className={formSectionTitleClass} style={headingFont}>
          Sign in
        </p>
        <p className={formSectionSubtitleClass}>
          Welcome back — continue to your booking.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-2 space-y-2">
        {error ? (
          <p className={formErrorClass} role="alert">
            {error}
          </p>
        ) : null}

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
          <span className={authLabelClass}>Password *</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className={authInputClass}
          />
        </label>

        <AuthSubmitButton pending={pending} disabled={!ready}>
          {pending ? "Signing in…" : "Sign in"}
        </AuthSubmitButton>
      </form>
    </>
  );
}
