"use client";

import Link from "next/link";
import { CategoryMenuItem } from "@/app/types/categories";

type NavigationProps = {
  items: CategoryMenuItem[];
};

export default function Navigation({ items = [] }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 bg-stone-800 text-stone-100 shadow-md">
      <ul className="flex justify-center gap-8 py-3 text-sm uppercase tracking-widest font-semibold">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/category/${item.slug}`} className="hover:text-stone-200">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
