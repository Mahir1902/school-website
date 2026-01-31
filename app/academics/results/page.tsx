import type { Metadata } from "next";
import PageHero from "@/components/academics/PageHero";
import hero1 from "@/assets/hero-1.jpg";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Student Results",
  description:
    "Examination results for students of Singapore International School, Dhaka.",
};

export default function ResultsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <PageHero
        title="Student Results"
        subtitle="Examination Results & Achievements"
        backgroundImage={hero1}
        height="small"
      />

      {/* Empty State */}
      <section className="max-w-3xl mx-auto py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <FileText className="w-12 h-12 text-primary/50" />
          </div>

          <h2 className="text-2xl md:text-3xl font-orpheus text-primary mb-4">
            Results Will Be Posted Here
          </h2>

          <p className="text-lg text-foreground/70 font-proximaNova mb-8 max-w-2xl">
            Examination results will be published on this page following the
            completion of assessment periods. Please check back after
            examinations for updated results.
          </p>

          <div className="bg-primary/5 border border-border rounded-lg p-6 max-w-xl w-full">
            <h3 className="font-orpheus text-primary mb-3">Result Publications</h3>
            <ul className="space-y-2 text-left text-foreground/70 font-proximaNova text-sm">
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>
                  <strong>CA Results:</strong> Posted after each Continual
                  Assessment (every 4-5 weeks)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>
                  <strong>Mid-Year Results:</strong> Published after first
                  semester examinations (May)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>
                  <strong>Final Results:</strong> Published after second semester
                  examinations (December)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>
                  <strong>External Examinations:</strong> Edexcel results
                  available through British Council portal
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="bg-card border border-border rounded-lg p-8 max-w-3xl mx-auto">
        <h3 className="text-xl font-orpheus text-primary mb-4 text-center">
          Accessing Your Results
        </h3>
        <div className="space-y-4 text-foreground/70 font-proximaNova">
          <p>
            <strong>Internal Assessments:</strong> Students and parents can
            access CA and CPA results through regular progress reports
            distributed by the school. Report cards are provided at the end of
            each semester.
          </p>
          <p>
            <strong>Edexcel Examinations:</strong> Results for iPrimary, iLower
            Secondary, IGCSE, and A-Level examinations are available through the
            Edexcel Online Results Portal. Students will receive their login
            credentials from the school office.
          </p>
          <p>
            <strong>Certificates:</strong> Original certificates for external
            examinations are distributed through the school office once received
            from Pearson Edexcel UK.
          </p>
        </div>
      </section>
    </div>
  );
}
