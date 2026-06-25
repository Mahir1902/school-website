'use client';

import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

/**
 * Custom Portable Text renderer component
 * Provides styled rendering for Sanity Portable Text content
 * with project-specific design tokens and typography
 */

// Typing the object as PortableTextComponents lets each serializer's
// params (children/value) be inferred — no per-serializer annotations needed.
const components: PortableTextComponents = {
  block: {
    // Normal paragraph
    normal: ({ children }) => (
      <p className="font-proximaNova text-foreground/80 mb-4 leading-relaxed">
        {children}
      </p>
    ),
    // Heading 2
    h2: ({ children }) => (
      <h2 className="font-inglobal font-bold text-3xl text-primary mt-8 mb-4">
        {children}
      </h2>
    ),
    // Heading 3
    h3: ({ children }) => (
      <h3 className="font-inglobal font-bold text-2xl text-primary mt-6 mb-3">
        {children}
      </h3>
    ),
    // Heading 4
    h4: ({ children }) => (
      <h4 className="font-inglobal font-bold text-xl text-primary mt-4 mb-2">
        {children}
      </h4>
    ),
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/30 pl-4 italic text-foreground/70 my-4">
        {children}
      </blockquote>
    ),
  },
  marks: {
    // Links
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-secondary underline transition-colors"
      >
        {children}
      </a>
    ),
    // Strong (bold)
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    // Emphasis (italic)
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  list: {
    // Bullet list
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 font-proximaNova">
        {children}
      </ul>
    ),
    // Numbered list
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 font-proximaNova">
        {children}
      </ol>
    ),
  },
  types: {
    // Images embedded in content
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <div className="my-6">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || 'Content image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <p className="text-sm text-foreground/60 text-center mt-2 font-proximaNova italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

interface PortableTextContentProps {
  content: PortableTextBlock[];
}

export default function PortableTextContent({ content }: PortableTextContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
}
