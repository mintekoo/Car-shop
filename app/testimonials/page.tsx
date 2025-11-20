// app/testimonials/page.tsx
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchTestimonials } from "@/lib/api";
import { API_BASE_URL } from "@/lib/api";
import type { Testimonial } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

function getPageParam(sp: { [key: string]: string | string[] | undefined }, key: string) {
  const raw = sp?.[key];
  const str = Array.isArray(raw) ? raw[0] : raw;
  const n = Number(str || "1");
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export default async function TestimonialsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await props.searchParams;
  const page = getPageParam(sp, "page");
  const resp = await fetchTestimonials({ page });
  const data = resp?.testimonials ?? [];

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-12 sm:py-16 lg:py-20">
        <SectionHeader title="What our customers say" subtitle="Real reviews from happy drivers." />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((t: Testimonial) => {
            const fullImage = t.image ? `${API_BASE_URL}/${t.image}` : "/user-placeholder.svg";

            return (
              <Link
                href={`/testimonials/${t.id}`}
                key={t.id}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200 transition duration-standard ease-standard hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-950 dark:ring-zinc-800 animate-fade-in"
              >
                <div className="mb-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-zinc-200 dark:ring-zinc-800">
                      <Image src={fullImage} alt={t.clientName} fill className="object-cover" unoptimized />
                    </div>
                    <div className="text-sm font-medium">{t.clientName}</div>
                    {t.User?.email && <span className="text-xs text-zinc-500">• {t.User.email}</span>}
                  </div>
                  {(t.position || t.company) && (
                    <div className="text-xs text-zinc-500">
                      {t.position && <span>{t.position}</span>}
                      {t.position && t.company && <span> • </span>}
                      {t.company && <span>{t.company}</span>}
                    </div>
                  )}
                </div>

                <div className="mb-2 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < Math.max(0, Math.min(5, t.rating)) ? "★" : "☆"}</span>
                  ))}
                </div>

                <p className="text-sm text-zinc-700 dark:text-zinc-300">{t.content}</p>

                <button className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md py-2 text-sm font-medium">
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
