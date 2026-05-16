"use client";

import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

type AuthNavProps = {
  className?: string;
  buttonClassName?: string;
  onNavigate?: () => void;
};

export default function AuthNav({
  className = "",
  buttonClassName = "",
  onNavigate,
}: AuthNavProps) {
  const { user, ready, logout } = useAuth();

  if (!ready) return null;

  if (user) {
    return (
      <button
        type="button"
        onClick={() => {
          logout();
          onNavigate?.();
        }}
        className={`text-sm font-medium text-neutral-600 transition-colors hover:text-[#3B2A8F] ${className}`}
      >
        Sign out
      </button>
    );
  }

  return (
    <Link
      href="/signup?callbackUrl=/book"
      onClick={onNavigate}
      className={
        buttonClassName ||
        `inline-flex items-center justify-center rounded-full bg-[#3B2A8F] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_4px_20px_-6px_rgba(59,42,143,0.45)] transition-all duration-200 hover:bg-[#2d1f6d] hover:shadow-[0_6px_24px_-6px_rgba(59,42,143,0.55)] ${className}`
      }
    >
      Sign up
    </Link>
  );
}
