import React from "react";
import Image from "next/image";
import Link from "next/link";

export type BlogCardType = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  date?: string;
  author?: string;
  category?: string;
};

export default function BlogCard({ blog }: { blog: BlogCardType }) {
  return (
    <article className="group rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-950 dark:ring-zinc-800">
      {blog.imageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="space-y-3 p-4">
        {blog.date && <time className="text-xs text-zinc-500">{blog.date}</time>}
        <h3 className="text-base font-semibold leading-6">{blog.title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">{blog.excerpt}</p>
        {/* <div className="flex items-center justify-between text-xs text-zinc-500">
          {blog.author && <span>By {blog.author}</span>}
          {blog.category && <span>{blog.category}</span>}
        </div> */}
        <Link href={`/blogs/${blog.id}`} className="text-sm font-medium text-blue-600 hover:underline">
          Read more →
        </Link>
      </div>
    </article>
  );
}
