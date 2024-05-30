'use client';

import { memo, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';
import { ArrowLeftIcon, RadioIcon, List } from 'lucide-react';

import { Button } from '@/components/lab/ui/button';
import ThemeSwitch from '@/components/ThemeSwitch';
import SearchButton from '../SearchButton';
import { useGlobalStore } from '@/lib/utils';
const MobileDrawer = dynamic(() => import('@/components/lab/mobile-drawer').then((mod) => mod.MobileDrawer));

const SCROLL_AREA_ID = 'scroll-area';
const MOBILE_SCROLL_THRESHOLD = 20;

export const FloatingHeader = memo(
  ({
    scrollTitle,
    title,
    goBackLink,
    bookmarks,
    currentBookmark,
    children,
  }: {
    scrollTitle?: string;
    title?: string;
    goBackLink?: string;
    bookmarks?: any;
    currentBookmark?: any;
    children?: React.ReactNode;
  }) => {
    const [transformValues, setTransformValues] = useState({
      translateY: 0,
      opacity: scrollTitle ? 0 : 1,
    });
    const hasReadingList = useGlobalStore((state) => state.hasReadingList);
    const onReadingListOpen = useGlobalStore((state) => state.onReadingListOpen);
    const pathname = usePathname();
    const isWritingIndexPage = pathname === '/writing';
    const isWritingPath = pathname.startsWith('/writing');
    const isBookmarksIndexPage = pathname === '/bookmarks';
    const isBookmarkPath = pathname.startsWith('/bookmarks');

    return (
      <header className="sticky inset-x-0 top-0 z-10 mx-auto flex h-12 w-full shrink-0 items-center overflow-hidden bg-bg-primary text-sm font-medium shadow-jt2 lg:hidden">
        <div className="flex size-full items-center px-3">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex flex-1 items-center gap-1 ">
              <div className="flex h-16 items-center">
                {goBackLink ? (
                  <Button variant="ghost" size="icon" className="shrink-0 bg-bg-primary" asChild>
                    <Link href={goBackLink} title="Go back">
                      <ArrowLeftIcon size={16} />
                    </Link>
                  </Button>
                ) : (
                  <MobileDrawer />
                )}
              </div>
              <div className="flex flex-1 items-center justify-between">
                {scrollTitle && <span className="line-clamp-2 font-semibold tracking-tight">{scrollTitle}</span>}
                {title && (
                  <Balancer ratio={0.35}>
                    <span className="line-clamp-2 font-semibold tracking-tight">{title}</span>
                  </Balancer>
                )}
                <div className="inline-flex items-center">
                  <SearchButton />
                  <ThemeSwitch className="ml-4 inline-flex h-4 w-4 items-center" />
                  <div className="flex items-center gap-2">
                    {(isWritingIndexPage || isBookmarksIndexPage) && (
                      <Button variant="outline" size="xs" asChild>
                        <a href="/feed.xml" title="RSS feed" target="_blank" rel="noopener noreferrer" className="ml-4">
                          <RadioIcon size={16} className="mr-2" />
                          RSS feed
                        </a>
                      </Button>
                    )}
                  </div>
                  {hasReadingList && (
                    <List size={20} onClick={() => onReadingListOpen(true)} className="ml-4 inline-flex items-center" />
                  )}
                </div>
              </div>
            </div>
            {/* {scrollTitle && isWritingPath && <div className="flex min-w-[50px] justify-end">{children}</div>} */}
          </div>
        </div>
      </header>
    );
  },
);

FloatingHeader.displayName = 'FloatingHeader';
