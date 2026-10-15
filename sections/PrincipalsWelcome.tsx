import Image from "next/image";
import principalImage from "@/assets/principals_message.jpg";
import Reveal from "@/components/heritage/Reveal";

const letter = [
  "Hello and welcome! On behalf of our entire team, I’m delighted you’ve found your way to Singapore International School Dhaka.",
  "At SIS, we’re passionate about creating a place where students feel excited to learn, confident to ask questions, and supported to be themselves. We combine strong academics with a genuine focus on character because we believe education is about preparing young people for life, not just exams.",
  "Our community is warm, our classrooms are engaging, and our doors are always open. Whether you’re exploring schools for your child or already part of the SISD family, we’re so glad you’re here.",
  "I look forward to meeting you.",
];

export default function PrincipalsWelcome() {
  return (
    <section id="principal" className="scroll-mt-24 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal from="left" className="mx-auto w-full max-w-sm pb-4 pr-4">
          <div className="relative">
            <div aria-hidden="true" className="h-mount absolute inset-0 rounded-3xl bg-primary" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-xl ring-1 ring-border">
              <Image src={principalImage} alt="Principal at Singapore International School" fill sizes="(max-width: 1024px) 90vw, 400px" className="object-cover" />
            </div>
          </div>
        </Reveal>
        <Reveal from="right" className="min-w-0 rounded-3xl bg-muted p-8 md:p-12">
          <h2 className="font-inglobal text-3xl text-primary md:text-5xl">Principal&apos;s Welcome</h2>
          <div className="mt-6 space-y-4 font-proximaNova text-lg leading-relaxed text-foreground/80">
            {letter.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-8 font-inglobal text-xl italic text-primary">With warm regards</p>
          <p className="mt-1 font-poppins text-sm font-semibold text-secondary-ink">Principal, SIS Dhaka</p>
        </Reveal>
      </div>
    </section>
  );
}
