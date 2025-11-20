// app/testimonials/[id]/page.tsx
import Container from "@/components/ui/Container";
import { fetchTestimonial } from "@/lib/api";
import { API_BASE_URL } from "@/lib/api";
import type { Testimonial } from "@/lib/types";
import Image from "next/image";

export default async function TestimonialDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t: Testimonial = await fetchTestimonial(id);

  const fullImage = t.image ? `${API_BASE_URL}/${t.image}` : undefined;

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800 animate-slide-up">
          <div className="mb-4 flex flex-col gap-1">
            <div className="flex items-center gap-3">
              {fullImage ? (
                <div className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-zinc-200 dark:ring-zinc-800">
                  <Image src={fullImage} alt={t.clientName} fill className="object-cover" unoptimized />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-full bg-muted-100" />
              )}
              <div>
                <div className="text-base font-medium">{t.clientName}</div>
                {t.User?.email && <div className="text-xs text-zinc-500">{t.User.email}</div>}
              </div>
            </div>
            {(t.position || t.company) && (
              <div className="text-xs text-zinc-500">
                {t.position && <span>{t.position}</span>}
                {t.position && t.company && <span> • </span>}
                {t.company && <span>{t.company}</span>}
              </div>
            )}
          </div>

          <div className="mb-3 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < Math.max(0, Math.min(5, t.rating)) ? "★" : "☆"}</span>
            ))}
          </div>

          <p className="text-sm text-zinc-700 dark:text-zinc-300">{t.content}</p>
        </div>
      </Container>
    </main>
  );
}
