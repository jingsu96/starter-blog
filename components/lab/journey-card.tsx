import dynamic from 'next/dynamic';
import Image from '../Image';

const MarkdownRenderer = dynamic(() =>
  import('@/components/lab/markdown-renderer').then((mod) => mod.MarkdownRenderer)
);

export const JourneyCard = ({
  title,
  description,
  image,
  index,
}: {
  title: string;
  description?: string;
  image?: {
    url: string;
    title?: string;
    description?: string;
    width: number;
    height: number;
    alt?: string;
  };
  index: number;
}) => (
  <div className="word-break-word flex flex-col">
    <span className="font-semibold tracking-tight">{title}</span>
    {description && <MarkdownRenderer>{description}</MarkdownRenderer>}
    {image?.url && (
      <div className="mt-2.5 overflow-hidden rounded-xl bg-white">
        <Image
          src={image.url}
          alt={image.title || image.description || ''}
          width={image.width}
          height={image.height}
          loading={index < 1 ? 'eager' : 'lazy'}
          className="animate-reveal"
        />
      </div>
    )}
  </div>
);
