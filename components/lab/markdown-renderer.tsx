// @ts-nocheck

import Markdown from 'markdown-to-jsx';

import { Link } from '@/components/lab/link';
import { TweetCard } from '@/components/lab/tweet-card/tweet-card';
import Image from '../Image';

export const MarkdownRenderer = ({ options, children, ...rest }: { options?: any; children: React.ReactNode }): any => {
  return (
    <Markdown
      options={{
        ...options,
        overrides: {
          // Extract `className` prop to make Link component work properly
          // eslint-disable-next-line no-unused-vars
          a: ({ className, ...rest }) => <Link {...rest} />,
          p: ({ children }) => <p className="mb-2 text-sm">{children}</p>,
          img: ({ alt, src }) => (
            <span className="mt-2 block overflow-hidden rounded-xl border">
              <Image
                alt={alt}
                src={`https:${src}`}
                width={400}
                height={300}
                loading="lazy"
                className="animate-reveal aspect-auto w-full object-cover"
              />
            </span>
          ),
          tweet: ({ id }) => <TweetCard id={id} />,
        },
      }}
      {...rest}
    />
  );
};
