import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function PageTitle({ children, className }: Props) {
  return (
    <h1
      className={cn(
        'break-words text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14',
        className
      )}
    >
      {children}
    </h1>
  );
}
