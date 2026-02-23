import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { newsByCategoryQuery } from "@/sanity/lib/queries";
import PageHero from "@/components/newsEvents/PageHero";
import NewsCard from "@/components/newsEvents/NewsCard";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Celebrate student and school achievements at Singapore International School"
};

export const revalidate = 60;

export default async function AchievementsPage() {
  const achievements = await client.fetch(newsByCategoryQuery, {
    category: "achievements",
    start: 0,
    end: 50 // Show all achievements (no pagination)
  });

  return (
    <div className="space-y-8">
      <PageHero
        title="Achievements"
        subtitle="Celebrating our students' and school's accomplishments"
        height="medium"
      />

      {achievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((news: any) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <Newspaper className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
          <h3 className="font-orpheus font-bold text-xl text-foreground/70 mb-2">
            No Achievements Yet
          </h3>
          <p className="font-proximaNova text-foreground/60">
            Check back soon for news about our students' achievements
          </p>
        </div>
      )}
    </div>
  );
}
