// app/services/page.tsx
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchServices, API_BASE_URL } from "@/lib/api";
import type { Service } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

function getPageParam(sp: { [key: string]: string | string[] | undefined }, key: string) {
    const raw = sp?.[key];
    const str = Array.isArray(raw) ? raw[0] : raw;
    const n = Number(str || "1");
    return Number.isFinite(n) && n > 0 ? n : 1;
}

export default async function ServicesPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const sp = await props.searchParams;
    const page = getPageParam(sp, "page");
    const resp = await fetchServices({ page });
    const data = resp?.services ?? [];

    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
            <Container className="py-12 sm:py-16 lg:py-20">
                <SectionHeader
                    title="Our Services"
                    subtitle="Discover the range of professional car rental services we provide."
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((s: Service) => {
                        const fullImage = s.image ? `${API_BASE_URL}/${s.image}` : "/window.svg";

                        return (
                            <Link
                                href={`/services/${s.id}`}
                                key={s.id}
                                className="flex flex-col justify-between group rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition-[transform,box-shadow] duration-standard ease-standard hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-950 dark:ring-zinc-800 animate-fade-in"
                            >
                                {/* Image */}
                                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                                    <Image
                                        src={fullImage}
                                        alt={s.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        unoptimized
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-y-3 p-4">
                                    {/* <time className="text-xs text-zinc-500">
                                        {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : ""}
                                    </time> */}
                                    <h3 className="text-base font-semibold leading-6">{s.name}</h3>
                                    <p className="line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                                        {s.description}
                                    </p>
                                    {/* <p className="text-sm font-medium text-primary">
                                        ETB {s.price.toFixed(0)}
                                    </p> */}
                                </div>

                                {/* View Details Button */}
                                <button className="mt-4 w-full bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md py-2 text-sm font-medium">
                                    View Details
                                </button>
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </main>
    );
}
