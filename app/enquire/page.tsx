import EnquireContent from "@/components/EnquireContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enquire | Naptec",
  description:
    "Start a care enquiry with Naptec. Select your enquiry type and home of interest — our team will be in touch shortly.",
};

export default function EnquirePage() {
  return <EnquireContent />;
}
