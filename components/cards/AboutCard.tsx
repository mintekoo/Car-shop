// components/cards/AboutCard.tsx
import Image from "next/image";
import Link from "next/link";

export type AboutCardType = {
    id: string;
    title: string;
    description: string;
    imageUrl?: string | null;
    createdAt?: string;
};

export default function AboutCard({ about }: { about: AboutCardType }) {
    return (
        <Link
            href={`/abouts/${about.id}`}
            className="group block rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-950 dark:ring-zinc-800"
        >
            <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-zinc-100 dark:bg-zinc-900">
                {about.imageUrl ? (
                    <Image
                        src={about.imageUrl}
                        alt={about.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-zinc-400">
                        No Image
                    </div>
                )}
            </div>

            <div className="space-y-3 p-4">
                {about.createdAt && (
                    <time className="text-xs text-zinc-500">{about.createdAt}</time>
                )}
                <h3 className="text-base font-semibold leading-6">{about.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                    {about.description}
                </p>
                <button className="mt-2 w-full rounded-md bg-gray-200 py-2 text-sm font-medium hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                    View Details
                </button>
            </div>
        </Link>
    );
}
