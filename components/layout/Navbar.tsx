"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/theme/ThemeToggle";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Car" },
  // { href: "/categories", label: "Our Fleet" },
  { href: "/blogs", label: "Blog" },
  { href: "/abouts", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  // { href: "/partners", label: "Partners" },
  { href: "/galleries", label: "Gallery" },
  { href: "/contacts", label: "Contact Us" },
  { href: "/rentals", label: "Register Car" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    ScrollTrigger.create({
      start: 0,
      end: 99999,
      onUpdate: (self) => {
        if (self.scroll() > 50) {
          gsap.to(navRef.current, {
            backgroundColor: "rgba(255,255,255,0.95)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            duration: 0.3,
          });
        } else {
          gsap.to(navRef.current, {
            backgroundColor: "transparent",
            boxShadow: "none",
            duration: 0.3,
          });
        }
      },
    });
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);


  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur ">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 ">
          <Image
            src="/logo.png"
            alt="Adinas Car Rent Logo"
            width={200}
            height={50}
            priority
            className="rounded-lg"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons + Theme Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/cars"
            className="hidden md:block rounded-full px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors bg-primary hover:bg-primary-hover"

          >
            Book Now
          </Link>

          <ThemeToggle />

          {/* Hamburger for Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full transition-all duration-300 ease-in-out ${isOpen ? "max-h-[95vh] opacity-100 py-4 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <nav className="flex flex-col items-start gap-4 p-4 text-base">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className="w-full py-2 border-b border-primary/30 text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {/* <Link
            href="#login"
            onClick={toggleMenu}
            className="w-full mt-2 rounded-full border border-primary px-4 py-2 text-sm text-center text-foreground hover:text-primary transition-colors"
          >
            Login
          </Link> */}
          <Link
            href="/cars"
            onClick={toggleMenu}
            className="w-full rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark text-center"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
