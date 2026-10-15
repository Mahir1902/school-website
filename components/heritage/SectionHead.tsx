import Reveal from "./Reveal";

export default function SectionHead({ title, sub, light = false }: { title: string; sub?: string; light?: boolean }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
      <h2 className={`font-inglobal text-3xl md:text-4xl lg:text-5xl ${light ? "text-primary-foreground" : "text-primary"}`}>{title}</h2>
      {sub && <p className={`mx-auto mt-4 max-w-2xl font-proximaNova text-lg md:text-xl ${light ? "text-primary-foreground/85" : "text-foreground/70"}`}>{sub}</p>}
    </Reveal>
  );
}
