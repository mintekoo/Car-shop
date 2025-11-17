// app/cars/page.tsx (Updated to use fetchProductsByCategory when filtering)
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import PaginationRouter from "@/components/navigation/PaginationRouter";
import { fetchProducts, fetchProductsByCategory } from "@/lib/api";
import { API_BASE_URL } from "@/lib/api";
import type { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

// function toOwnerName(p: Product) {
//   return `${p.User.firstName} ${p.User.lastName}`.trim();
// }

function ProductCardInline({ p }: { p: Product }) {
  let images: string[] = [];
  if (typeof p.images === "string") {
    try {
      images = JSON.parse(p.images);
      if (typeof images === "string") {
        images = JSON.parse(images);
      }
    } catch {
      images = [];
    }
  } else if (Array.isArray(p.images)) {
    images = p.images;
  }
  const cover = images?.[0];
  const fullCover = cover ? `${API_BASE_URL}/${cover}` : "/window.svg";

  return (
    <Link
      href={`/cars/${p.id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition-[transform,box-shadow] duration-standard ease-standard hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-950 dark:ring-zinc-800 animate-fade-in"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {fullCover ? (
          <Image
            src={fullCover}
            alt={p.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="h-full w-full bg-muted-100" />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-foreground shadow-sm ring-1 ring-black/5 dark:bg-black/60 dark:text-foregroundDark">
          {p.status}
        </span>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-6">{p.title}</h3>
          <span className="rounded-full bg-muted-50 px-2 py-1 text-xs font-medium text-muted-700 dark:bg-zinc-800 dark:text-zinc-300">
            ETB {p.pricePerDay}/day
          </span>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {p.make} {p.model} • {p.year}
        </p>
        {/* <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <span className="rounded-full bg-primary-50 px-2 py-0.5 text-primary-700 ring-1 ring-primary-100">
            {p.Category?.name ?? "Uncategorized"}
          </span>
          <span>Owner: {toOwnerName(p)}</span>
        </div> */}
      </div>
      <div className="mt-4 flex justify-between gap-2 px-4 pb-4">
        {/* Know More / View Details */}
          <button className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md py-2 text-sm font-medium">
            View Details
          </button>
      </div>

    </Link>

  );
}

function getPageParam(sp: { [key: string]: string | string[] | undefined }, key: string) {
  const raw = sp?.[key];
  const str = Array.isArray(raw) ? raw[0] : raw;
  const n = Number(str || "1");
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function getStrParam(sp: { [key: string]: string | string[] | undefined }, key: string) {
  const raw = sp?.[key];
  return Array.isArray(raw) ? raw[0] : raw;
}

export default async function CarsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await props.searchParams;
  const page = getPageParam(sp, "page");
  const categoryId = getStrParam(sp, "categoryId");

  let resp;
  if (categoryId) {
    // Use dedicated category endpoint
    resp = await fetchProductsByCategory(categoryId, { page });
  } else {
    // Use general paginated endpoint
    resp = await fetchProducts({ page });
  }

  const data = resp?.products ?? [];
  const meta = resp?.meta ?? { currentPage: page, totalPages: 1 };

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-12 sm:py-16 lg:py-20">
        <SectionHeader
          title="Explore Our Premium Vehicles"
          subtitle="Choose from a curated selection of high-quality cars ready for your next journey."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((p) => (
            <ProductCardInline key={p.id} p={p} />
          ))}
        </div>
        <PaginationRouter currentPage={meta.currentPage} totalPages={meta.totalPages} />
      </Container>
    </main>
  );
}