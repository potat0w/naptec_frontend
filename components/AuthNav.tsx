"use client";

import { useAuth } from "@/components/AuthProvider";
import { btnPrimary } from "@/lib/layout";
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
        `${btnPrimary} ${className}`
      }
    >
      Sign up
    </Link>
  );
}
