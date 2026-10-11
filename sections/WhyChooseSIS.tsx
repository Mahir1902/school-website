import { BookOpen, GraduationCap, Heart, Laptop, Trophy, Users } from "lucide-react";
import Reveal from "@/components/heritage/Reveal";
import SectionHead from "@/components/heritage/SectionHead";

const features = [
  { icon: GraduationCap, title: "Internationally Recognised Curriculum", description: "Pearson Edexcel approved centre offering Cambridge & Edexcel O' Levels and A' Levels, plus International PLSC examinations — opening doors to universities worldwide." },
  { icon: Users, title: "Personalised Attention", description: "Small class sizes ensure meaningful teacher-student interaction. Pre-school classrooms have two dedicated teachers, plus student attendants on every floor for extra care." },
  { icon: Laptop, title: "Future-Ready Learning", description: "Compulsory computer education from Class 1, a dedicated Robotics Club, STEM Expo participation, and audio-visual learning integrated into everyday lessons." },
  { icon: Trophy, title: "Sports & Activities", description: "Football turf, basketball court, table tennis, badminton, chess, karate, music, drama, debate, and art — we nurture talents beyond the classroom." },
  { icon: BookOpen, title: "Value for Families", description: "Free textbooks for pre-school students and over 50% of books provided at no cost for primary level. School-owned transport available for added convenience." },
  { icon: Heart, title: "Character & Values", description: "Arabic and Quranic studies woven into the curriculum, regular cultural celebrations, and a philosophy rooted in \"Everyone Counts\" — building well-rounded individuals." },
];

export default function WhyChooseSIS() {
  return (
    <section className="bg-muted px-4 py-16 md:px-8 md:py-24">
      <SectionHead title="Why Choose SIS?" sub="Discover what makes Singapore International School the ideal choice for your child's educational journey" />
      <div className="mx-auto flex max-w-5xl flex-col gap-10 md:gap-14">
        {features.map(({ icon: Icon, title, description }, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={title} from={flip ? "right" : "left"} className={`flex flex-col items-center gap-6 text-center md:flex-row md:gap-10 md:text-left ${flip ? "md:flex-row-reverse md:text-right" : ""}`}>
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-secondary ring-offset-4 ring-offset-muted">
                <Icon className="h-11 w-11" aria-hidden="true" />
              </div>
              <div className="min-w-0 max-w-2xl">
                <h3 className="font-inglobal text-2xl text-primary">{title}</h3>
                <p className="mt-2 font-proximaNova text-lg leading-relaxed text-foreground/75">{description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
