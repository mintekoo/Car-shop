"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
// import ThemeToggle from "@/components/theme/ThemeToggle";

// Define your navigation links
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Products" },
  { href: "/categories", label: "Our Fleet" },
  { href: "/blogs", label: "Blog" },
  { href: "/abouts", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/partners", label: "Partners" },
  { href: "/galleries", label: "Gallery" },
  { href: "/contacts", label: "Contact Us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // 3. State for mobile menu visibility

  // Toggle function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 dark:bg-black/60 border-b border-zinc-200/60 dark:border-zinc-800/60">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-10 w-25 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
            ADINAS
          </span>
          <span className="text-lg font-semibold">Car Rental</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons and Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* <Link
            href="#login"
            className="hidden md:block rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Login
          </Link>
          <Link
            href="/cars"
            className="hidden md:block rounded-full bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
          >
            Shop Now
          </Link>
          <ThemeToggle /> */}

          {/* Hamburger Button for Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu (Conditionally Rendered) */}
      <div
        className={`md:hidden absolute w-full bg-white dark:bg-black border-b border-zinc-200/60 dark:border-zinc-800/60 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
      >
        <nav className="flex flex-col items-start gap-4 p-4 text-base">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMenu} // Close menu on link click
              className="w-full py-2 hover:text-primary-600 transition-colors border-b border-zinc-100 dark:border-zinc-800"
            >
              {link.label}
            </Link>
          ))}
          {/* <Link
            href="#login"
            onClick={toggleMenu}
            className="w-full mt-2 rounded-full border border-zinc-300 px-4 py-2 text-sm text-center hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Login
          </Link>
          <Link
            href="/cars"
            onClick={toggleMenu}
            className="w-full rounded-full bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 text-center"
          >
            Shop Now
          </Link> */}
        </nav>
      </div>
    </header>
  );
}