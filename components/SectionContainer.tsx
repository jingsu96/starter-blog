import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionContainer({ children, className }: Props) {
  return <section className={cn('lg:flex lg:flex-1', className)}>{children}</section>;
}
