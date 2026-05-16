import Image from "next/image";
import type { ReactNode } from "react";
import { headingFont } from "@/lib/layout";

type FormSplitLayoutProps = {
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  titleId?: string;
  subtitle?: string;
  aside?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  formPanelClassName?: string;
  formPanelAlign?: "start" | "center";
};

export default function FormSplitLayout({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  titleId,
  subtitle,
  aside,
  children,
  footer,
  formPanelClassName = "pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-14",
  formPanelAlign = "start",
}: FormSplitLayoutProps) {
  const panelAlignClass =
    formPanelAlign === "center" ? "justify-center" : "justify-start";
  return (
    <div className="flex min-h-full flex-1 flex-col lg:grid lg:min-h-[min(100vh,920px)] lg:grid-cols-2">
      <div className="relative aspect-[5/4] min-h-[220px] sm:aspect-[16/10] lg:aspect-auto lg:min-h-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-brand-deeper/85 via-brand-deeper/40 to-brand-deeper/25 lg:bg-gradient-to-r lg:from-brand-deeper/75 lg:via-brand-deeper/45 lg:to-brand-deeper/20"
          aria-hidden
        />
        <div className="relative flex h-full flex-col justify-end p-6 text-white sm:p-10 lg:p-12">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
              {eyebrow}
            </p>
          ) : null}
          <h1
            id={titleId}
            className="mt-3 max-w-md text-3xl font-normal leading-tight sm:text-4xl lg:text-[2.75rem]"
            style={headingFont}
          >
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-sm text-base leading-relaxed text-white/90">
              {subtitle}
            </p>
          ) : null}
          {aside ? <div className="mt-8 space-y-4">{aside}</div> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col bg-white">
        <div
          className={`flex flex-1 flex-col ${panelAlignClass} px-6 sm:px-10 lg:px-14 ${formPanelClassName}`}
        >
          <div className="mx-auto w-full max-w-md">{children}</div>
        </div>
        {footer ? (
          <div className="border-t border-surface-card px-6 py-5 sm:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-md">{footer}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
