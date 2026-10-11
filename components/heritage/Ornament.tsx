import Reveal from "./Reveal";

// Alpana-inspired divider: a central lotus-like bloom with curling tendrils, stroke only, drawn on scroll.
export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <Reveal draw className={`flex justify-center ${className}`}>
      <svg viewBox="0 0 320 40" className="h-8 w-64 text-primary md:h-10 md:w-80" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
        <path pathLength={1} d="M4 20 H110 C120 20 124 10 132 10 C140 10 142 20 150 20" />
        <path pathLength={1} d="M316 20 H210 C200 20 196 30 188 30 C180 30 178 20 170 20" />
        <path pathLength={1} d="M160 6 C150 14 150 26 160 34 C170 26 170 14 160 6 Z" />
        <path pathLength={1} d="M160 20 C146 8 136 12 140 20 C136 28 146 32 160 20 C174 32 184 28 180 20 C184 12 174 8 160 20 Z" />
        <circle pathLength={1} cx="160" cy="20" r="2.5" />
        <circle pathLength={1} cx="96" cy="20" r="2" />
        <circle pathLength={1} cx="224" cy="20" r="2" />
      </svg>
    </Reveal>
  );
}
