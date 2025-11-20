"use client";

import React from "react";
import { Users } from "lucide-react";

const clientsData = [
    "International NGOs",
    "Embassies & Diplomatic Missions",
    "Government Agencies",
    "Private Corporations",
];

export default function Clients() {
    return (
        <section className="py-16 bg-white dark:bg-zinc-950">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-10">
                    Clients & Past Performance
                </h2>
                <p className="text-zinc-700 dark:text-zinc-400 mb-8">
                    Adinas Car Rental has successfully provided transport services to numerous reputable organizations, including:
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                    {clientsData.map((client, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <Users className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                            <span className="text-zinc-700 dark:text-zinc-400">{client}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
