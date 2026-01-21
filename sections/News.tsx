import { client } from '@/sanity/lib/client'
import { newsQuery } from '@/sanity/lib/queries'
import NewsClient from './NewsClient'

export default async function News() {
  const newsItems = await client.fetch(newsQuery, {}, {
    next: { revalidate: 3600 } // ISR: revalidate every hour
  })

  return <NewsClient newsItems={newsItems} />
}
