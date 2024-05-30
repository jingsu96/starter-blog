'use client';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TocItem = {
  value: string;
  url: string;
  depth: number;
};

export type Toc = TocItem[];

export interface TOCInlineProps {
  toc: Toc;
  fromHeading?: number;
  toHeading?: number;
  asDisclosure?: boolean;
  exclude?: string | string[];
  collapse?: boolean;
  ulClassName?: string;
  liClassName?: string;
}

export interface NestedTocItem extends TocItem {
  children?: NestedTocItem[];
}

const createNestedList = (items: TocItem[]): NestedTocItem[] => {
  const nestedList: NestedTocItem[] = [];
  const stack: NestedTocItem[] = [];

  items.forEach((item) => {
    const newItem: NestedTocItem = { ...item };

    while (stack.length > 0 && stack[stack.length - 1].depth >= newItem.depth) {
      stack.pop();
    }

    const parent = stack.length > 0 ? stack[stack.length - 1] : null;

    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(newItem);
    } else {
      nestedList.push(newItem);
    }

    stack.push(newItem);
  });

  return nestedList;
};

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * `asDisclosure` will wrap the TOC in a `details` element with a `summary` element.
 * `collapse` will collapse the TOC when `AsDisclosure` is true.
 *
 * If you are using tailwind css and want to revert to the default HTML list style, set `ulClassName="[&_ul]:list-[revert]"`
 * @param {TOCInlineProps} {
 *   toc,
 *   fromHeading = 1,
 *   toHeading = 6,
 *   asDisclosure = false,
 *   exclude = '',
 *   collapse = false,
 *   ulClassName = '',
 *   liClassName = '',
 * }
 *
 */
const TOCInline = ({
  toc,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
  collapse = false,
  ulClassName = 'list-none',
  liClassName = 'list-none no-underline',
}: TOCInlineProps) => {
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i');

  const filteredToc = toc.filter(
    (heading) => heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  );

  const createList = (items: NestedTocItem[] | undefined) => {
    if (!items || items.length === 0) {
      return null;
    }

    return (
      <ul className={ulClassName}>
        {items.map((item, index) => (
          <li key={index} className={liClassName}>
            <a href={item.url} className="!text-indigo-1 no-underline	">
              {item.value}
            </a>
            {createList(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  const nestedList = createNestedList(filteredToc);

  return (
    <>
      {asDisclosure ? (
        <Collapsible.Root className={cn('flex flex-col rounded-lg bg-bg-alt py-1 dark:bg-bg-elv', 'CollapsibleRoot')}>
          <Collapsible.Trigger className="mx-6 py-2 text-start text-lg font-bold transition-all [&[data-state=open]>div>svg]:rotate-180">
            <div className="flex items-center justify-between">
              文章目錄
              <ChevronDown className="transition-transform duration-200" aria-hidden />
            </div>
          </Collapsible.Trigger>
          <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            {createList(nestedList)}
          </Collapsible.Content>
        </Collapsible.Root>
      ) : (
        createList(nestedList)
      )}
    </>
  );
};

export default TOCInline;
