import type { ReactNode } from "react";

type AuthSubmitButtonProps = {
  children: ReactNode;
  pending?: boolean;
  disabled?: boolean;
};

export default function AuthSubmitButton({
  children,
  pending = false,
  disabled = false,
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="group mt-2 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#3B2A8F] py-3.5 pl-6 pr-5 text-sm font-semibold text-white shadow-[0_8px_28px_-8px_rgba(59,42,143,0.5)] transition-all duration-200 hover:bg-[#2d1f6d] hover:shadow-[0_12px_32px_-8px_rgba(59,42,143,0.55)] hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
    >
      {children}
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </button>
  );
}
