import Link from "next/link";

const serif = { fontFamily: "var(--font-cormorant), ui-serif, serif" } as const;

export default function GetInTouch() {
  return (
    <section aria-label="Get in touch" className="w-full">
      <div className="h-2 bg-[#e8ebe4] sm:h-2.5" />
      <div className="bg-[#faf8f4] px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            className="text-[2rem] font-normal leading-[1.2] text-neutral-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]"
            style={serif}
          >
            Get in touch <em className="italic">today</em> to
            <br />
            see how we can help
          </h2>
          <Link
            href="/enquire"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-[#3B2A8F] px-12 py-4 text-sm font-medium tracking-wide text-white transition-[filter] hover:brightness-95 sm:mt-12"
          >
            Get in touch
          </Link>
        </div>
      </div>
      <div className="h-2 bg-[#e8ebe4] sm:h-2.5" />
    </section>
  );
}
