import { Metadata } from "next";
import Breadcrumb from "@/components/newsEvents/Breadcrumb";

export const metadata: Metadata = {
  title: {
    template: "%s | Singapore International School",
    default: "News & Events | Singapore International School"
  },
  description: "Stay updated with the latest news, events, announcements, and highlights from Singapore International School"
};

export default function NewsEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background pt-24 md:pt-28">
      <Breadcrumb />
      <main className="py-8 md:py-12 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {children}
      </main>
      {/* Spacer for footer */}
      <div className="h-16" />
    </div>
  );
}
