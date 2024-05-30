import { ReactNode } from 'react';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog, Authors } from 'contentlayer/generated';
import Comments from '@/components/Comments';
import Link from '@/components/CustomLink';
import PageTitle from '@/components/PageTitle';
import SectionContainer from '@/components/SectionContainer';
import siteMetadata from '@/data/siteMetadata';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { FloatingHeader } from '@/components/lab/floating-header';
import WritingListLayout, { TopicAccordion } from './WritingListLayout';
import { WritingBreadcrumb } from '@/components/lab/writing-breadcrumb';

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`;
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`;

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface LayoutProps {
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
  children: ReactNode;
  filteredPosts: any;
}

export default function PostLayout({ content, next, prev, children, filteredPosts }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content;
  const basePath = path.split('/')[0];

  return (
    <SectionContainer className="relative">
      <ScrollTopAndComment />
      <FloatingHeader scrollTitle="Writing" />
      <WritingListLayout filteredPosts={filteredPosts} slug={slug} classname="hidden lg:flex" />
      <article id="jt-article" className="block h-auto flex-1 overflow-y-scroll pt-4 lg:flex lg:h-[100vh]">
        <div className="max-w-[750px] flex-1 px-6 lg:px-[5rem] xl:divide-y xl:divide-gray-200 xl:px-12 xl:dark:divide-gray-700 2xl:max-w-[1000px] 3xl:mx-auto 3xl:max-w-[1000px]">
          <header className="lg:pt-6 xl:pb-6">
            <WritingBreadcrumb path={path} className="flex w-full pb-4 lg:py-4" />
            <div className="sp">
              <div>
                <PageTitle className="!text-2xl font-bold">{title}</PageTitle>
              </div>
              <dl className="space-y-10 pt-2">
                <div>
                  <dt className="sr-only">文章發表於</dt>
                  <dd className="text-xs font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-4 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
              <div className="pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(path)} rel="nofollow">
                  Discuss on Twitter
                </Link>
                {` • `}
                <Link href={editUrl(filePath)}>View on GitHub</Link>
              </div>
              {siteMetadata.comments && (
                <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                  <Comments slug={slug} />
                </div>
              )}
              <footer>
                <div className="my-5 flex gap-3 text-sm font-medium leading-5 md:justify-between md:gap-0">
                  {(next || prev) && (
                    <>
                      {prev && prev.path && (
                        <div>
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Prev Post
                          </h2>
                          <div className="text-indigo-1  hover:text-indigo-2">
                            <Link href={`/${prev.path}`}>{prev.title}</Link>
                          </div>
                        </div>
                      )}
                      {next && next.path && (
                        <div>
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Next Post
                          </h2>
                          <div className="text-indigo-1  hover:text-indigo-2">
                            <Link href={`/${next.path}`}>{next.title}</Link>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="pt-4 xl:pt-8">
                  <Link href={`/${basePath}`} className="text-indigo-1  hover:text-indigo-2" aria-label="回到文章列表">
                    &larr; Back to Writing
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
