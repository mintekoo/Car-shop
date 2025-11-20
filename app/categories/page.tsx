// app/categories/page.tsx
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchCategories } from "@/lib/api";
import type { Category } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  // Fetch categories from API
  const resp = await fetchCategories();
  const categories: Category[] = resp?.categories ?? [];

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-12 sm:py-16 lg:py-20">
        <SectionHeader
          title="Browse by Our Fleet"
          subtitle="Explore vehicles by type and purpose."
        />

        {categories.length === 0 ? (
          <p className="text-center text-zinc-500">No categories available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/cars?categoryId=${c.id}`}
                className="group relative isolate overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200 transition duration-standard ease-standard hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-950 dark:ring-zinc-800 animate-fade-in block"
              >
                {/* Background image */}
                <div className="absolute inset-0 -z-10">
                  {c.image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${c.image}`}
                      alt={c.name}
                      fill
                      className="object-cover opacity-10 transition group-hover:opacity-20"
                      unoptimized
                    />
                  ) : (
                    <div className="h-full w-full bg-muted-100" />
                  )}
                </div>

                {/* Category content */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold">{c.name}</h3>
                    {c.description && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                        {c.description}
                      </p>
                    )}
                  </div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary-500 text-white shadow-sm transition group-hover:bg-secondary-600">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
