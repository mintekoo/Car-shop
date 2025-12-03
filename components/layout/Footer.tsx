"use client";

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
    { name: "Partners", href: "/partners" },
    { name: "Gallery", href: "/galleries" },
    { name: "Contact", href: "/contacts" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "Addis Ababa, around Pushkin Square" },
    { icon: Phone, text: "0911 510313 / 0977 777717 / 911 323333", href: "tel:0911510313" },
    { icon: Mail, text: "soliyano10@gmail.com", href: "mailto:soliyano10@gmail.com" },
    { icon: Mail, text: "adinascarrent@gmail.com", href: "mailto:adinascarrent@gmail.com" },
    { icon: Globe, text: "www.adinascarrent.com", href: "https://adinascarrent.com" },
  ];

  return (
    <footer className="mt-16 border-t bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Container className="py-12 flex flex-col gap-10 md:gap-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-10 w-20 items-center justify-center rounded-lg shadow-sm bg-red-600 text-white font-bold">
                ADINAS
              </span>
              <span className="text-lg font-semibold">
                Car Rental
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Adinas Car Rental – Your trusted partner in safe, reliable, and efficient transport solutions.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Products</h3>
            <ul className="space-y-1 text-sm">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="space-y-1 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-2">
                  <info.icon className="w-4 h-4 mt-1 flex-shrink-0 text-red-600 dark:text-red-500" />
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="underline text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">{info.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-6 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Adinas Car Rental. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">LinkedIn</Link>
            <Link href="#" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">GitHub</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
