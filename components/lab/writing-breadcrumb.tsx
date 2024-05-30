import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/lab/ui/breadcrumb';
import { upperFirst } from '@/lib/utils';
import { Home } from 'lucide-react';

type breadcrumbType = {
  name: string;
  url: string;
};

export const WritingBreadcrumb = ({ path, className }: { path: string; className?: string }) => {
  const parsedUrl = `/${path}`.split('/').reduce((acc: breadcrumbType[], name, idx) => {
    if (idx === 0) {
      acc.push({ name: name, url: name });
      return acc;
    }
    acc.push({ name, url: acc[idx - 1]?.url.concat(`/${name}`) });
    return acc;
  }, []);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="flex items-center font-semibold lg:mx-0">
        {parsedUrl.map(({ name, url }, idx) => {
          if (!name || !url || idx === parsedUrl.length - 1) return null;
          return (
            <>
              <BreadcrumbItem key={url}>
                <BreadcrumbLink href={url}>{name === 'writing' ? <Home size={16} /> : upperFirst(name)}</BreadcrumbLink>
              </BreadcrumbItem>
              {idx !== parsedUrl.length - 2 && <BreadcrumbSeparator key={idx} />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
