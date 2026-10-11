import { getStats } from '@/lib/content'
import StatsClient from './StatsClient'

export default function Stats() {
  return <StatsClient stats={getStats()} />
}
