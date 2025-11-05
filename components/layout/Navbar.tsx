"use client";

import Link from "next/link";
import React from "react";
import Container from "@/components/ui/Container";
// import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 dark:bg-black/60 border-b border-zinc-200/60 dark:border-zinc-800/60">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
            CS
          </span>
          <span className="text-lg font-semibold">CarShop</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <Link href="/cars" className="hover:text-primary-600 transition-colors">Products</Link>
          <Link href="/categories" className="hover:text-primary-600 transition-colors">Categories</Link>
          <Link href="/blogs" className="hover:text-primary-600 transition-colors">Blog</Link>
          <Link href="/testimonials" className="hover:text-primary-600 transition-colors">Testimonials</Link>
          {/* <Link href="/bookings" className="hover:text-primary-600 transition-colors">Bookings</Link> */}
        </nav>
        <div className="flex items-center gap-3">
          {/* <Link
            href="#login"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Login
          </Link>
          <Link
            href="/cars"
            className="rounded-full bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
          >
            Shop Now
          </Link> */}
          {/* <ThemeToggle /> */}
        </div>
      </Container>
    </header>
  );
}


