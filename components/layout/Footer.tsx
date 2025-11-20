import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

export default function Footer() {
  const productLinks = [
    { name: "Products", href: "/cars" },
    { name: "Our Fleet", href: "/categories" },
  ];

  const companyLinks = [
    { name: "Blog", href: "/blogs" },
    { name: "About", href: "/abouts" },
    { name: "Service", href: "/services" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  const legalLinks = [
    { name: "Privacy", href: "#privacy" },
    { name: "Terms", href: "#terms" },
    { name: "Contact", href: "#contact" },
  ];



  const contactInfo = [
    {
      icon: MapPin,
      text: "Addis Ababa, around Pushkin Square",
    },
    {
      icon: Phone,
      text: "0911 510313 / 0977 777717 / 911 323333",
      href: "tel:0911510313", // clickable first phone for simplicity
    },
    {
      icon: Mail,
      text: "soliyano10@gmail.com",
      href: "mailto:soliyano10@gmail.com",
    },
    {
      icon: Mail,
      text: "adinascarrent@gmail.com",
      href: "mailto:adinascarrent@gmail.com",
    },
    {
      icon: Globe,
      text: "www.adinascarrent.com",
      href: "https://adinascarrent.com",
    },
  ];

  return (
    <footer className="mt-16 border-t border-zinc-200/70 dark:border-zinc-800/60 bg-white/60 dark:bg-black/40">
      <Container className="py-12 flex flex-col gap-10 md:gap-16">
        {/* Top: Brand + Multi-column Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand / About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-10 w-20 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                ADINAS
              </span>
              <span className="text-lg font-semibold">Car Rental</span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Adinas Car Rental – Your trusted partner in safe, reliable, and efficient transport solutions..
            </p>
          </div>

          {/* Products */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Products</h3>
            <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Company</h3>
            <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Legal</h3>
            <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Contact</h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-2">
                  <info.icon className="w-4 h-4 mt-1 text-primary-600 flex-shrink-0" />
                  {info.href ? (
                    <a
                      href={info.href}
                      className="hover:text-primary-600 transition-colors underline"
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span>{info.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom: Copyright */}
        <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-6 text-sm text-zinc-600 dark:text-zinc-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Addinas Car Rental. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary-600 transition-colors">
              Twitter
            </Link>
            <Link href="#" className="hover:text-primary-600 transition-colors">
              LinkedIn
            </Link>
            <Link href="#" className="hover:text-primary-600 transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
