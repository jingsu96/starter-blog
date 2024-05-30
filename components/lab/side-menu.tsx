'use client';

import dynamic from 'next/dynamic';
import { useRouter, usePathname } from 'next/navigation';
import { RadioIcon } from 'lucide-react';

import { ScrollArea } from '@/components/lab/scroll-area';
import { Button } from '@/components/lab/ui/button';
import { LoadingSpinner } from '@/components/lab/loading-spinner';

import { useKeyPress } from '@/hooks/useKeyPress';
import { cn } from '@/lib/utils';

const keyCodePathnameMapping = {
  Digit1: '/',
  Digit2: '/writing',
  // Digit3: '/journey',
  // Digit4: '/stack',
  // Digit5: '/workspace',
  // Digit6: '/bookmarks',
};

export const SideMenu = ({
  children,
  title,
  bookmarks = [],
  isInner,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  bookmarks?: any[];
  isInner?: boolean;
  className?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  useKeyPress(onKeyPress, Object.keys(keyCodePathnameMapping));

  function onKeyPress(event) {
    const key = event.code;
    const targetPathname = keyCodePathnameMapping[key];
    if (targetPathname && targetPathname !== pathname) router.push(targetPathname);
  }

  const isWritingPath = pathname.startsWith('/writing');
  const isBookmarksPath = pathname.startsWith('/bookmarks');
  const currentBookmark = bookmarks.find((bookmark) => `/bookmarks/${bookmark.slug}` === pathname);

  return (
    <ScrollArea
      className={cn(
        'hidden w-full flex-1 bg-bg-alt shadow-jt1 lg:flex lg:flex-col',
        isInner ? 'lg:min-w-80 lg:max-w-80 xl:min-w-96 xl:max-w-96' : 'lg:min-w-60 lg:max-w-60 xl:min-w-72 xl:max-w-72',
        className,
      )}
    >
      {title && (
        <div className="sticky top-0 z-10 border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-tight">{title}</span>
            <div className="flex items-center gap-2">
              {(isWritingPath || isBookmarksPath) && (
                <Button variant="outline" size="xs" asChild>
                  <a href="/feed.xml" title="RSS feed" target="_blank" rel="noopener noreferrer">
                    <RadioIcon size={16} className="mr-2" />
                    RSS feed
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="bg-bg-alt p-3">{children}</div>
    </ScrollArea>
  );
};
