import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import HeroProductsCarousel from "./HeroProductsCarousel";
import type { Product } from "@/lib/types";

interface HeroProps {
  featuredProducts: Product[];
}

export default function Hero({ featuredProducts }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 " />
      </div>

      <Container className="py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200">
              Premium Cars, Premium Service
            </span>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Find your next car with confidence
            </h1>

            <p className="max-w-prose text-zinc-600">
              Elevate your travel experience with Adinas.
            </p>

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Link href="/cars" passHref>
                <Button size="lg" variant="primary" >
                  Browse Cars
                </Button>
              </Link>
              <Link href="/blogs" passHref>
                <Button size="lg" variant="ghost">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full">
            <HeroProductsCarousel products={featuredProducts} />
          </div>
        </div>
      </Container>
    </section>
  );
}
