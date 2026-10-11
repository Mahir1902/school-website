import { getTestimonials } from "@/lib/content";
import SectionHead from "@/components/heritage/SectionHead";
import TestimonialsClient from "./TestimonialsClient";

export default function Testimonials() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <SectionHead title="What Our Community Says" sub="Hear from our students and parents about their SIS experience" />
      <TestimonialsClient items={getTestimonials()} />
    </section>
  );
}
