"use client";

import Container from "@/components/ui/Container";
import { About as BackendAbout } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface AboutSectionProps {
  abouts: BackendAbout[];
}

export default function AboutSection({ abouts }: AboutSectionProps) {
  return (
    <section id="about" className="py-14 sm:py-16 lg:py-20 bg-background dark:bg-backgroundDark">
      <Container className="max-w-7xl">
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
  // const publishDate = about.createdAt ? new Date(about.createdAt).toLocaleDateString() : "";

  return (
    <Link href={`/abouts/${about.id}`} className="group block animate-fade-in">
      <div className="mx-auto max-w-4xl rounded-2xl ring-1 ring-zinc-200 overflow-hidden mb-6">
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

      <div className="mx-auto max-w-4xl space-y-2">
        <h3 className="text-2xl font-semibold sm:text-3xl">{about.title}</h3>
        {/* {publishDate && (
          <time className="text-sm text-zinc-500 block">
            Published on {publishDate}
          </time>
        )}
        {about.description && <p className="text-lg italic">{about.description}</p>}

        {about.mission && (
          <section className="mt-4">
            <h4 className="text-primary text-xl font-semibold border-b pb-1 mb-1 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
              Our Mission
            </h4>
            <p className="">{about.mission}</p>
          </section>
        )}

        {about.vision && (
          <section className="mt-4">
            <h4 className="text-primary text-xl font-semibold border-b pb-1 mb-1 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
              Our Vision
            </h4>
            <p className="">{about.vision}</p>
          </section>
        )}

        {about.values && (
          <section className="mt-4">
            <h4 className="text-primary text-xl font-semibold border-b pb-1 mb-1 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
              Our Values
            </h4>
            <p className="">{about.values}</p>
          </section>
        )} */}
        <div className="flex items-start gap-2 p-4">
        <Link href={`/abouts`} className="flex-1">
          <Button size="lg" className="w-full">Learn More</Button>
        </Link>
      </div>
      </div>
    </Link>
  );
}
