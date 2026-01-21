import { client } from '@/sanity/lib/client'
import { testimonialsQuery } from '@/sanity/lib/queries'
import TestimonialsClient from './TestimonialsClient'

export default async function Testimonials() {
  const testimonials = await client.fetch(testimonialsQuery, {}, {
    next: { revalidate: 86400 } // ISR: revalidate every 24 hours
  })

  return <TestimonialsClient testimonials={testimonials} />
}
