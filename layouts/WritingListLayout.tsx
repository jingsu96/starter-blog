'use client';

import { useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WritingLink } from '@/components/lab/writing-link';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { cn, groupPostsByTopic, useGlobalStore } from '@/lib/utils';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/lab/ui/accordion';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader } from '@/components/lab/ui/drawer';
import ReadingProgress from '@/components/lab/reading-progress';
import useMobileDetect from '@/hooks/useMobileDetect';

const CollapsibleList = ({
  topic,
  posts,
  slug,
}: {
  activeTopic: boolean;
  topic: string;
  posts: any[];
  slug: string;
}) => {
  return (
    <AccordionItem value={topic} className="my-2">
      <AccordionTrigger
        className={cn(
          'flex w-full items-center justify-between rounded-lg px-2 py-2 text-lg font-bold text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
        )}
      >
        <h2>{topic}</h2>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-1 pt-2">
        {posts?.map?.((post) => <WritingLink key={post.slug} post={post} isActive={post.slug === slug} />)}
      </AccordionContent>
    </AccordionItem>
  );
};

export function TopicAccordion({
  slug,
  writingList,
  className,
}: {
  slug: string;
  writingList: any[];
  className?: string;
}) {
  if (!writingList.length || !slug) {
    return null;
  }

  const postIndex = writingList.findIndex((p) => p.slug === slug);
  const currentTopic = writingList.find((post) => post.slug === slug)?.topic;
  const groupedPost = groupPostsByTopic(writingList, postIndex);

  return (
    <ul
      className={cn(
        'mx-auto mt-6 flex h-[calc(100vh-70px)] min-w-[22rem] flex-1 flex-col gap-1 text-sm xl:px-2 3xl:px-[10px]',
        className
      )}
    >
      <Accordion className="w-full" type="single" collapsible defaultValue={currentTopic}>
        {groupedPost
          ?.map?.(({ topic, posts }: { topic: string; posts: any[] }) => {
            if (!topic) {
              return posts?.map?.((post) => (
                <WritingLink key={post.slug} post={post} isActive={post.slug === slug} className="my-1" />
              ));
            }

            const activeTopic = posts.some((post) => post.slug === slug);

            return <CollapsibleList key={topic} activeTopic={activeTopic} topic={topic} posts={posts} slug={slug} />;
          })
          .flat()}
      </Accordion>
    </ul>
  );
}

const WritingListLayout = ({ filteredPosts, slug, classname }) => {
  const { setHasReadingList, isReadingListOpen, onReadingListOpen } = useGlobalStore();
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [init, setInit] = useState(true);

  useLayoutEffect(() => {
    setHasReadingList(true);
    setInit(false);

    return () => {
      setHasReadingList(false);
      onReadingListOpen(false);
    };
  }, []);

  return (
    <>
      <div className={classname}>
        <AnimatePresence mode="wait" initial={false}>
          {isSidebarVisible && (
            <motion.div
              className="flex max-h-[100vh] w-full min-w-[22rem] max-w-[22rem] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 "
              initial={{ display: 'none', minWidth: 0, width: 0 }}
              animate={{ display: 'flex', minWidth: '22rem' }}
              exit={{ display: 'none', minWidth: 0, width: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <TopicAccordion slug={slug} writingList={filteredPosts} />
            </motion.div>
          )}
        </AnimatePresence>
        <button
          className={cn(
            'absolute left-[-15px] top-[50%] hidden rounded-full border border-gray-300 bg-bg-alt p-1 lg:flex'
          )}
          onClick={() => setSidebarVisible((prev) => !prev)}
        >
          {isSidebarVisible ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>
      {/* {!isSidebarVisible && <ReadingProgress className="hidden xl:flex" />}{' '} */}
      {!init && (
        <Drawer open={isReadingListOpen} onOpenChange={onReadingListOpen}>
          <DrawerContent className="h-4/5 border-none bg-bg-alt shadow-jt1 outline-none">
            <DrawerHeader className="relative inline-flex items-center justify-center">
              <h2 className="text-lg font-semibold leading-none tracking-tight">主題列表</h2>
              <DrawerClose onClick={() => onReadingListOpen(false)} className="absolute right-6">
                <X size={16} />
              </DrawerClose>
            </DrawerHeader>
            <div className="overflow-y-auto px-4">
              <TopicAccordion slug={slug} writingList={filteredPosts} className="h-auto" />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default WritingListLayout;
