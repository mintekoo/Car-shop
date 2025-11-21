import React from "react";
import Image from "next/image";
import Link from "next/link";

export type Product = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  tags?: string[];
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <article className="group rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-950 dark:ring-zinc-800">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-6">{product.name}</h3>
          {/* <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {product.price}
          </span> */}
        </div>
        {product.tags && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:ring-blue-900/50"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="pt-2">
          <Link href={`/cars/${product.id}`} passHref>
            <button className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md py-2 text-sm font-medium">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}
