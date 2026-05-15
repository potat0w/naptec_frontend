import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import EnquireProvider from "@/components/EnquireProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Naptec",
  description: "Quality home care from Naptec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className={`${outfit.className} flex min-h-full flex-col bg-white text-neutral-900 antialiased`}
        suppressHydrationWarning
      >
        <EnquireProvider>
          <Navbar />
          {children}
          <Footer />
        </EnquireProvider>
      </body>
    </html>
  );
}
