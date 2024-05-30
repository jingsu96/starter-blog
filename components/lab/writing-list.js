'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import { cn, dateWithDayAndMonthFormatter, dateWithMonthAndYearFormatter } from '@/lib/utils';

export const WritingList = ({ items, maxDisplay }) => {
  const groupedByYear = useMemo(() => {
    return items
      .filter((p) => !p.draft)
      .slice(0, maxDisplay)
      .reduce((acc, post) => {
        const year = new Date(post.date).getFullYear();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(post);
        return acc;
      }, {});
  }, [items, maxDisplay]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="text-sm">
        <div className="grid grid-cols-6 py-4 font-bold text-text-1">
          <span className="col-span-1 hidden text-left md:grid">Year</span>
          <span className="col-span-6 md:col-span-5">
            <span className="grid grid-cols-4 items-center md:grid-cols-8">
              <span className="col-span-1 text-left">Date</span>
              <span className="col-span-2 md:col-span-6">Article</span>
              <span className="col-span-1 text-right">Reading Time</span>
            </span>
          </span>
        </div>
        <div className="group/list-wrapper">
          {Object.entries(groupedByYear)
            .sort((a, b) => b[0] - a[0])
            .map(([year, items], index) => {
              return (
                <ul className="group/list list-none" key={year}>
                  {items?.map?.((item, itemIndex) => {
                    const { title, slug, date, readingTime } = item;
                    const dateObj = new Date(date);
                    const dateWithDayAndMonth = dateWithDayAndMonthFormatter.format(dateObj);
                    const dateWithMonthAndYear = dateWithMonthAndYearFormatter.format(dateObj);

                    return (
                      <li
                        key={slug}
                        className="group/list-item grid grid-cols-6 p-0 group-hover/list-wrapper:text-gray-300 dark:group-hover/list-wrapper:text-gray-800"
                      >
                        <span
                          className={cn(
                            'group/list:text-black pointer-events-none col-span-1 hidden items-center tabular-nums transition-colors duration-300 group-hover/list:text-gray-900 dark:group-hover/list:text-gray-100 md:grid',
                            itemIndex === 0 && 'border-t border-gray-200',
                          )}
                        >
                          {itemIndex === 0 ? year : ''}
                        </span>
                        <Link
                          href={`/writing/${slug}`}
                          className="col-span-6 group-hover/list-item:text-gray-900 dark:group-hover/list-item:text-gray-200 md:col-span-5"
                        >
                          <span className="grid grid-cols-4 items-center gap-2 border-t border-gray-200 py-4 md:grid-cols-8">
                            <span className="col-span-1 text-left tabular-nums">
                              <time dateTime={date} className="hidden md:block">
                                {dateWithDayAndMonth}
                              </time>
                              <time dateTime={date} className="md:hidden">
                                {dateWithMonthAndYear}
                              </time>
                            </span>
                            <span className="col-span-2 line-clamp-4 md:col-span-6">{title}</span>
                            <span className="col-span-1 text-right md:block">{readingTime.text}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
        </div>
      </div>
    </LazyMotion>
  );
};
