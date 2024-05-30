import Link from '@/components/CustomLink';

import { ScrollArea } from '@/components/lab/scroll-area';
import { WritingList } from '@/components/lab/writing-list';
import { FloatingHeader } from '@/components/lab/floating-header';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import { components } from '@/components/MDXComponents';
import Image from '@/components/Image';
import { WORK_EXPERIENCE } from '@/lib/constants';

const MAX_DISPLAY = 5;

export default function Home({ posts: items, authors }) {
  return (
    <ScrollArea useScrollAreaId={true}>
      <FloatingHeader scrollTitle="Home" />
      <section className="mx-auto max-w-[840px] px-4 pt-10 md:m-auto">
        <div className="grid grid-cols-1 gap-x-16 gap-y-1 sm:grid-cols-3">
          {/* ABOUT ME */}
          <div className="sm:col-span-2 sm:row-span-2">
            <h1 className="text-m mb-m font-bold leading-tight text-[#ff0a78] dark:text-[#ff0a78] sm:text-lg">
              ABOUT ME
            </h1>
            <div className="py-4 sm:pl-0 [&>p]:mb-4">
              <MDXLayoutRenderer code={authors.body.code} components={components} />
            </div>
          </div>

          {/* WORK EXPERIENCE */}
          <div className="flex flex-col justify-center">
            <h1 className="text-m mb-1 font-bold leading-tight text-[#ff0a78] dark:text-[#ff0a78] sm:text-lg">
              WORK EXPERIENCE
            </h1>
            <div className="p-4 sm:pl-2">
              <ol className="relative border-l border-gray-200 dark:border-gray-700">
                {WORK_EXPERIENCE.map((company) => (
                  <li key={company.name} className="mb-6 ml-6">
                    <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full shadow-jt1">
                      <Image
                        src={company.image}
                        height={24}
                        width={24}
                        alt={company.name}
                        className="rounded-full shadow-lg"
                      />
                    </span>
                    <h2 className="mt-1 text-lg font-bold leading-tight">
                      <Link href={company.link}>{company.name}</Link>
                    </h2>
                    {company.experience.map((exp) => (
                      <div key={exp.period} className="flex-col pt-5 sm:flex">
                        <h3 className="mb-1 flex items-center whitespace-nowrap text-base font-semibold text-gray-900 dark:text-white sm:text-sm md:text-sm lg:text-base">
                          {exp.title} {exp.level ? '- ' + exp.level : null}
                        </h3>
                        <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                          {exp.period}
                        </time>
                      </div>
                    ))}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="my-4 lg:my-4">
          <h1 className="text-m mb-m font-bold leading-tight text-[#ff0a78] dark:text-[#ff0a78] sm:text-lg">
            Latest Writings
          </h1>
          <WritingList items={items} maxDisplay={MAX_DISPLAY} />
        </div>
      </section>
    </ScrollArea>
  );
}
