import type { Metadata } from "next";
import EnquireContent from "@/components/EnquireContent";

export const metadata: Metadata = {
  title: "Enquire | Naptec",
  description: "Get in touch with Naptec about home care for you or a loved one.",
};

export default function EnquirePage() {
  return (
    <main className="flex-1">
      <EnquireContent />
    </main>
  );
}
