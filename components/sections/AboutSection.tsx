"use client";

import Container from "@/components/ui/Container";
import { About as BackendAbout } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface AboutSectionProps {
  abouts: BackendAbout[];
}

export default function AboutSection({ abouts }: AboutSectionProps) {
  return (
    <section id="about" className="py-14 m-20 sm:py-16 lg:py-20 bg-background dark:bg-backgroundDark">
      <Container>
        <div className="mb-10 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">About Us</h2>
          <Link href="/abouts" className="text-sm font-medium text-primary-600 hover:underline">
            Read all
          </Link>
        </div>

        <div className="space-y-12">
          {abouts.map((about) => (
            <AboutItem key={about.id} about={about} />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface AboutItemProps {
  about: BackendAbout;
}

function AboutItem({ about }: AboutItemProps) {
  const fullImage = about.image ? `${API_BASE_URL}/${about.image}` : "/window.svg";
  const publishDate = about.createdAt ? new Date(about.createdAt).toLocaleDateString() : "";

  return (
    <Link href={`/abouts/${about.id}`} className="group block animate-fade-in">
      <div className="rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 overflow-hidden mb-4">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={fullImage}
            alt={about.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-semibold sm:text-3xl">{about.title}</h3>
        {publishDate && (
          <time className="text-sm text-zinc-500 dark:text-zinc-400 block">
            Published on {publishDate}
          </time>
        )}
        {about.description && <p className="text-lg text-zinc-700 dark:text-zinc-300 italic">{about.description}</p>}

        {about.mission && (
          <section className="mt-4">
            <h4 className="text-xl font-semibold border-b pb-1 mb-1 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
              Our Mission
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300">{about.mission}</p>
          </section>
        )}

        {about.vision && (
          <section className="mt-4">
            <h4 className="text-xl font-semibold border-b pb-1 mb-1 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
              Our Vision
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300">{about.vision}</p>
          </section>
        )}

        {about.values && (
          <section className="mt-4">
            <h4 className="text-xl font-semibold border-b pb-1 mb-1 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
              Our Values
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300">{about.values}</p>
          </section>
        )}
      </div>
    </Link>
  );
}
