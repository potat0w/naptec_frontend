import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | Naptec",
  description: "Articles and guides from Naptec on home care and family support.",
};

export default function ArticlesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="border-b border-neutral-100 bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Articles
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            In-depth reads on choosing care, supporting relatives, and making the
            most of life at home with Naptec by your side.
          </p>
          <p className="mt-4 text-neutral-600">
            New articles will appear here as we publish them. Check back or ask
            your Naptec contact for topics you would like covered.
          </p>
        </div>
      </section>
    </main>
  );
}
