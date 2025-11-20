"use client";

import React from "react";
import { Check } from "lucide-react";
import VerticalDualCarousel from "@/components/ui/VerticalDualCarousel";

const differentiatorsData = [
    { title: "Proven Track Record", description: "Successfully mobilized over 1,000 vehicles." },
    { title: "Industry Expertise", description: "10+ years serving international clients." },
    { title: "Reliable & Safe Operations", description: "Well-maintained fleet and trained drivers." },
    { title: "Technology-Driven Service", description: "Real-time tracking & automated fleet systems." },
    { title: "Cost-Effective Solutions", description: "Top-tier service with competitive pricing." },
    { title: "24/7 Customer Support", description: "Always-on dedicated assistance." },
];

export default function Differentiators() {
    return (
        <section className="py-16 bg-white dark:bg-zinc-950">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-center mb-10 text-zinc-900 dark:text-zinc-100">
                    Key Differentiators
                </h2>

                <VerticalDualCarousel>
                    {differentiatorsData.map((item, i) => (
                        <div
                            key={i}
                            className="
                flex items-start gap-4 p-4 
                rounded-2xl
                bg-white dark:bg-zinc-950
                shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800
                transition-transform duration-300
                hover:-translate-y-0.5 hover:shadow-md
              "
                        >
                            <Check className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />

                            <div>
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                    {item.title}
                                </h3>
                                <p className="text-zinc-700 dark:text-zinc-400 mt-1">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </VerticalDualCarousel>
            </div>
        </section>
    );
}
