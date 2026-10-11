import { getTestimonials } from '@/lib/content'
import TestimonialsClient from './TestimonialsClient'

export default function Testimonials() {
  return <TestimonialsClient testimonials={getTestimonials()} />
}
