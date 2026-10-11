import { getAllNews } from "@/lib/content";
import PageHero from "@/components/newsEvents/PageHero";
import NewsList from "./NewsList";

export default function NewsHub() {
  return (
    <div className="space-y-8">
      {/* Page Hero */}
      <PageHero
        title="Latest News"
        subtitle="Stay informed with updates and stories from our school community"
        height="medium"
      />

      <NewsList allNews={getAllNews()} />
    </div>
  );
}
