import Markdown, { type Components } from 'react-markdown';
import Image from 'next/image';

/**
 * Markdown renderer for rich-text bodies edited in Pages CMS.
 * Raw HTML in the source is not rendered (react-markdown default).
 */
const components: Components = {
  p: ({ children }) => (
    <p className="font-proximaNova text-foreground/80 mb-4 leading-relaxed">{children}</p>
  ),
  h2: ({ children }) => (
    <h2 className="font-inglobal font-bold text-3xl text-primary mt-8 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-inglobal font-bold text-2xl text-primary mt-6 mb-3">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-inglobal font-bold text-xl text-primary mt-4 mb-2">{children}</h4>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary/30 pl-4 italic text-foreground/70 my-4">
      {children}
    </blockquote>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:text-secondary underline transition-colors"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-2 mb-4 font-proximaNova">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 font-proximaNova">{children}</ol>
  ),
  // Images inserted in the editor. Rendered as a block (span keeps the HTML valid inside <p>).
  img: ({ src, alt }) =>
    typeof src === 'string' && src ? (
      <span className="block relative w-full h-[400px] my-6 rounded-lg overflow-hidden">
        {src.startsWith('/media/') ? (
          <Image
            src={src}
            alt={alt || 'Content image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt || 'Content image'} className="absolute inset-0 w-full h-full object-cover" />
        )}
      </span>
    ) : null,
};

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none">
      <Markdown components={components}>{content}</Markdown>
    </div>
  );
}
