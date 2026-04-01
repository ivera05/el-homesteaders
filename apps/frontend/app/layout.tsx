import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/app/components/Navigation";
import Image from "next/image";
import { CategoryMenuItem } from "@/app/types/categories";
import { categoriesApi } from "@/app/api/categories";
import { randomUUID } from "node:crypto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "E&L Texas Homesteaders | Freeze-Dried Treats",
  description:
    "Artisanal freeze-dried candies, fruits, and Mexican specialties."
};

export default async function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode;
}) {
  const navItems: CategoryMenuItem[] = await categoriesApi.getMenu();
  const allNavItems = [
    ...navItems,
    { id: randomUUID(), name: "About", slug: "about" } as CategoryMenuItem,
  ];
  return (
    <html lang="en">
      <body className="bg-[#f5f5dc] text-slate-800 antialiased">
        {/* Header Section */}
        <header className="bg-white px-6 py-4 grid grid-cols-3 items-center border-b border-stone-200">
          <div />
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="E&L Texas Homesteaders Logo"
                width={180}
                height={50}
                loading="eager"
                className="w-40 h-auto"
              />
            </Link>
          </div>
          <div className="flex justify-end gap-6 text-sm font-medium text-stone-500">
            <button className="hover:text-stone-800">Login</button>
            <button className="hover:text-stone-800">Register</button>
            <button className="hover:text-stone-800 flex items-center gap-1">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="w-4 h-4 text-stone-500"
              />
              Cart (0)
            </button>
          </div>
        </header>

        {/* Sticky Nav Component */}
        <Navigation items={allNavItems} />

        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-stone-100 py-10 mt-20 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <div className="flex gap-6 mb-4">
              {/* Social Icons */}
              <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4 text-stone-500" />
              <FontAwesomeIcon icon={faInstagram} className="w-4 h-4 text-stone-500" />
              <FontAwesomeIcon icon={faTiktok} className="w-4 h-4 text-stone-500" />
            </div>
            <p className="text-stone-500 text-sm">
              © 2026 E&L Homesteaders. Built for quality.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
