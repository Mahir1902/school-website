import { client } from '@/sanity/lib/client'
import { statsQuery } from '@/sanity/lib/queries'
import StatsClient from './StatsClient'

export default async function Stats() {
  const stats = await client.fetch(statsQuery, {}, {
    next: { revalidate: 604800 } // ISR: revalidate every week
  })

  return <StatsClient stats={stats} />
}
