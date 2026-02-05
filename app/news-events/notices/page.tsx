import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { activeNoticesQuery } from "@/sanity/lib/queries";
import PageHero from "@/components/newsEvents/PageHero";
import NoticeCard from "@/components/newsEvents/NoticeCard";
import { Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Notices",
  description: "View important notices and announcements from Singapore International School"
};

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function NoticesPage() {
  const notices = await client.fetch(activeNoticesQuery);

  return (
    <div className="space-y-8">
      {/* Page Hero */}
      <PageHero
        title="Important Notices"
        subtitle="Stay informed with the latest announcements and important information"
        height="medium"
      />

      {/* Notice Count */}
      <div className="pb-4 border-b border-border">
        <p className="font-proximaNova text-foreground/70">
          {notices.length} active {notices.length === 1 ? "notice" : "notices"}
        </p>
      </div>

      {/* Notices List */}
      {notices.length > 0 ? (
        <div className="space-y-4">
          {notices.map((notice: any) => (
            <NoticeCard key={notice._id} notice={notice} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <Bell className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
          <h3 className="font-orpheus font-bold text-xl text-foreground/70 mb-2">
            No Active Notices
          </h3>
          <p className="font-proximaNova text-foreground/60">
            There are currently no active notices. Check back later for updates.
          </p>
        </div>
      )}
    </div>
  );
}
