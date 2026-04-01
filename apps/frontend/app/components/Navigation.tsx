'use client';

import Link from "next/link";

export default function Navigation() {
  const navItems = ['Home', 'Fruits', 'Mexican Candies', 'Others'];

  return (
    <nav className="sticky top-0 z-50 bg-stone-800 text-stone-100 shadow-md">
      <ul className="flex justify-center gap-8 py-3 text-sm uppercase tracking-widest font-semibold">
        {navItems.map((item) => (
          <li key={item}>
            <Link href={`/${item.toLowerCase()}`} className="hover:text-stone-200">{item}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
