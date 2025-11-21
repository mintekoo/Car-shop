// app/cars/[id]/page.tsx
import Container from "@/components/ui/Container";
import { fetchProduct } from "@/lib/api";
import { API_BASE_URL } from "@/lib/api";
import type { Product } from "@/lib/types";
import Image from "next/image";
import BookingSection from "@/components/form/BookingSection";

function parseArrayField(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[];
  if (typeof value !== "string") return [];
  try {
    let parsed: unknown = JSON.parse(value);
    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed);
    }
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

function getFullImageUrl(img: string): string {
  return img.startsWith("http") ? img : `${API_BASE_URL}/${img}`;
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product: Product = await fetchProduct(id);

  const rawImages = parseArrayField(product.images);
  const images = rawImages.length
    ? rawImages.map(getFullImageUrl)
    : ["https://via.placeholder.com/800x450?text=No+Image"];

  const features = parseArrayField(product.features);

  // const categoryName = product.Category?.name ?? "Uncategorized";
  // const ownerName = `${product.User?.firstName ?? ""} ${product.User?.lastName ?? ""}`.trim() || "Unknown Owner";

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-semibold sm:text-3xl">{product.title}</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {product.make} {product.model} • {product.year}
             {/* • {categoryName} */}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4 animate-fade-in">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted-50 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
              {images[0] ? (
                <Image
                  src={images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  loading="eager"
                  unoptimized
                />
              ) : null}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {images.slice(1, 9).map((src, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-zinc-200 dark:ring-zinc-800">
                  <Image
                    src={src}
                    alt={`${product.title} thumb ${i}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
          <aside className="space-y-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800 animate-slide-up">
            <div className="flex items-center justify-between">
              {/* <div>
                <div className="text-sm text-zinc-500">Price per day</div>
                <div className="text-2xl font-semibold">ETB {product.pricePerDay}</div>
              </div> */}
              <span className="rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700 ring-1 ring-primary-100">
                {product.status}
              </span>
            </div>
            {/* <div>
              <div className="text-sm font-medium">Owner</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {ownerName}
                {product.location ? ` • ${product.location}` : ""}
              </div>
            </div> */}
            {features.length ? (
              <div>
                <div className="text-sm font-medium">Features</div>
                <ul className="mt-1 list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                  {features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {product.description && (
              <div>
                <div className="text-sm font-medium">About this car</div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{product.description}</p>
              </div>
            )}
              <BookingSection productId={product.id} />
          </aside>
        </div>
      </Container>
    </main>
  );
}
