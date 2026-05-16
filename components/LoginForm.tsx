"use client";

import { useAuth } from "@/components/AuthProvider";
import AuthSubmitButton from "@/components/AuthSubmitButton";
import { authInputClass, authLabelClass, headingFont } from "@/lib/auth/form-styles";
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
      <p
        className="text-2xl font-normal text-neutral-900 sm:text-[1.65rem]"
        style={headingFont}
      >
        Sign in
      </p>
      <p className="mt-1.5 text-sm text-neutral-500">
        Welcome back — continue to your booking.
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
