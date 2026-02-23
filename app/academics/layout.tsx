import type { Metadata } from "next";
import Breadcrumb from "@/components/academics/Breadcrumb";

export const metadata: Metadata = {
  title: {
    template: "%s | Singapore International School",
    default: "Academic Programs | Singapore International School",
  },
  description:
    "Explore our comprehensive academic programs from Pre-School to A-Levels, featuring Pearson Edexcel internationally recognized qualifications.",
};

export default function AcademicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background pt-24 md:pt-28">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Page Content */}
      <main className="py-8 md:py-12 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {children}
      </main>

      {/* Footer spacing */}
      <div className="h-16" />
    </div>
  );
}
