import { getAllNews } from '@/lib/content'
import NewsClient from './NewsClient'

export default function News() {
  return <NewsClient newsItems={getAllNews().slice(0, 3)} />
}
