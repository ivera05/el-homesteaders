import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/app/components/Navigation";
import {ShoppingCartIcon} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: "E&L Homesteaders | Freeze-Dried Treats",
  description:
    "Artisanal freeze-dried candies, fruits, and Mexican specialties.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f5f5dc] text-slate-800 antialiased">
        {/* Header Section */}
        <header className="bg-white px-6 py-4 flex justify-between items-center border-b border-stone-200">
          <div className="text-2xl font-bold tracking-tight text-stone-700">
            E&L HOMESTEADERS
          </div>
          <div className="flex gap-6 text-sm font-medium text-stone-500">
            <button className="hover:text-stone-800">Login</button>
            <button className="hover:text-stone-800">Register</button>
            <button className="hover:text-stone-800 flex items-center gap-1">
              <ShoppingCartIcon className="w-5 h-5 text-stone-500" /> (0)
            </button>
          </div>
        </header>

        {/* Sticky Nav Component */}
        <Navigation />

        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-stone-100 py-10 mt-20 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <div className="flex gap-6 mb-4">
              {/* Placeholder Social Icons */}
              <div className="w-6 h-6 bg-stone-300 rounded-full cursor-pointer hover:bg-stone-400" />
              <div className="w-6 h-6 bg-stone-300 rounded-full cursor-pointer hover:bg-stone-400" />
              <div className="w-6 h-6 bg-stone-300 rounded-full cursor-pointer hover:bg-stone-400" />
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
