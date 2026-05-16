"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const formPaths = ["/signup", "/login", "/enquire", "/book"];

function isFormPath(pathname: string) {
  return formPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideChrome = isFormPath(pathname);

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
