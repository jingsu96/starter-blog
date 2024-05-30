import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn, upperFirst } from '@/lib/utils';
import { formatDate } from 'pliny/utils/formatDate';
import siteMetadata from '@/data/siteMetadata';
import { Badge } from './lab/ui/badge';

const ListItem = ({ date, title, path, tags }: { date: string; title: string; path: string; tags: string[] }) => {
  return (
    <Link href={`/${path}`} className={cn('group relative flex items-center justify-between overflow-hidden py-3')}>
      <div className="flex flex-col items-start md:flex-row md:items-center">
        <div className="mb-2 flex flex-row items-center md:mb-0 md:flex-col md:items-start">
          <time
            dateTime={date}
            className="mr-2 flex whitespace-nowrap text-xs font-extrabold uppercase text-orange-400 md:mb-2 md:mr-0 md:min-w-[7rem]"
          >
            {formatDate(date, siteMetadata.locale)}
          </time>
          <Badge className="overflow-hidden text-ellipsis whitespace-nowrap">{upperFirst(tags[0])}</Badge>
        </div>
        <div className="order-0 flex w-full overflow-hidden text-ellipsis whitespace-nowrap leading-6 md:order-1 md:pl-4">
          <h2 className="dark:group-hover:text-neutral-300 truncate font-normal group-hover:text-indigo-1 dark:text-white">
            {title}
          </h2>
        </div>
      </div>
      <ChevronRight className="translate-x-8 text-slate-600 transition-transform delay-0 duration-200 ease-in-out group-hover:translate-x-0" />
    </Link>
  );
};

export default ListItem;
