import Container from "@/components/ui/Container";
import TestimonialCard, { TestimonialCardType } from "@/components/cards/TestimonialCard";
import { Testimonial as BackendTestimonial } from "@/lib/types";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";

function mapBackendTestimonial(t: BackendTestimonial): TestimonialCardType {
  const fullImage = t.image
    ? t.image.startsWith("http")
      ? t.image
      : `${API_BASE_URL}/${t.image}`
    : undefined;

  return {
    id: t.id.toString(),
    name: t.clientName,
    content: t.content,
    rating: t.rating,
    imageUrl: fullImage,
    email: t.User?.email || undefined,
    position: t.position || undefined,
    company: t.company || undefined,
  };
}

interface TestimonialsSectionProps {
  testimonials: BackendTestimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const cardTestimonials = testimonials.map(mapBackendTestimonial);

  return (
    <section id="testimonials" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">What customers say</h2>
          <Link href="/testimonials" className="text-sm font-medium text-primary-600 hover:underline">
            Read all
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cardTestimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </Container>
    </section>
  );
}
