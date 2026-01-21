import { groq } from 'next-sanity'

// Fetch latest 3 news articles
export const newsQuery = groq`
  *[_type == "newsArticle"] | order(publishedDate desc)[0...3] {
    _id,
    title,
    slug,
    publishedDate,
    excerpt,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    category
  }
`

// Fetch active testimonials in order
export const testimonialsQuery = groq`
  *[_type == "testimonial" && active == true] | order(order asc) {
    _id,
    name,
    role,
    quote,
    initials
  }
`

// Fetch statistics in order
export const statsQuery = groq`
  *[_type == "statistic"] | order(order asc) {
    _id,
    value,
    suffix,
    label
  }
`
