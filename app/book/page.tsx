import BookCareContent from "@/components/BookCareContent";
import EnquireGate from "@/components/EnquireGate";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Book a caregiver | Naptec",
  description: "Book a Naptec Care Professional for home care.",
};

export default function BookPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center py-24">
            <p className="text-sm text-neutral-500">Loading…</p>
          </div>
        }
      >
        <EnquireGate>
          <BookCareContent />
        </EnquireGate>
      </Suspense>
    </main>
  );
}
