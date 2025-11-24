"use client";

import Image from "next/image";

export type PartnerCardType = {
    id: string | number;
    name: string;
    contact?: string[];
    imageUrl?: string | null;
};

export default function PartnerCard({ partner }: { partner: PartnerCardType }) {
    return (
        <div className="group rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-950 dark:ring-zinc-800 h-[350px] flex flex-col">
            {/* Image */}
            <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-zinc-100 dark:bg-zinc-900">
                {partner.imageUrl ? (
                    <Image
                        src={partner.imageUrl}
                        alt={partner.name}
                        fill
                        unoptimized
                        className="object-contain transition-transform duration-500 group-hover:scale-105 p-2 bg-white"
                        sizes="100%"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-zinc-400">
                        No Image
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>

                <div className="flex-1 overflow-y-auto text-sm">
                    {partner.contact && partner.contact.length > 0 ? (
                        <ul className="space-y-1 text-muted-700 dark:text-zinc-400">
                            {partner.contact.map((c, i) => (
                                <li key={i}>{c}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted-400">No contact info</p>
                    )}
                </div>
            </div>
        </div>
    );
}
