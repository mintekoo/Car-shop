// app/blogs/page.tsx
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchBlogs } from "@/lib/api";
import { API_BASE_URL } from "@/lib/api";
import type { Blog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

function getPageParam(sp: { [key: string]: string | string[] | undefined }, key: string) {
  const raw = sp?.[key];
  const str = Array.isArray(raw) ? raw[0] : raw;
  const n = Number(str || "1");
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export default async function BlogsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await props.searchParams;
  const page = getPageParam(sp, "page");
  const resp = await fetchBlogs({ page });
  const data = resp?.blogs ?? [];

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-12 sm:py-16 lg:py-20">
        <SectionHeader title="Latest Articles" subtitle="News, tips, and stories from the road." />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.length > 0 ? (
            data.map((b: Blog) => {
              const fullMedia = b?.image ? `${API_BASE_URL}/${b.image}` : "/window.svg";
              const isVideo = fullMedia?.match(/\.(mp4|webm|mkv|ogg)$/i);

              return (
                <Link
                  href={`/blogs/${b.id}`}
                  key={b.id}
                  className="group rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-950 dark:ring-zinc-800 animate-fade-in"
                >
                  <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                    {isVideo ? (
                      <video
                        src={fullMedia}
                        controls
                        className="w-full h-full object-cover bg-black"
                      />
                    ) : (
                      <Image
                        src={fullMedia}
                        alt={b.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                    )}
                  </div>

                  <div className="space-y-3 p-4">
                    <time className="text-xs text-zinc-500">
                      {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : ""}
                    </time>

                    <h3 className="text-base font-semibold leading-6">{b.title}</h3>

                    <p className="line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                      {b.content}
                    </p>
                  </div>

                  <button className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md py-2 text-sm font-medium">
                    View Details
                  </button>
                </Link>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No blogs found.</p>
          )}
        </div>
      </Container>
    </main>
  );
}
