import { cn } from '@/lib/utils/';

function InlineCode({ isLink, ...props }) {
  return (
    <code
      className={cn(
        'overflow-wrap letter-spacing-[-0.5] font-size-[17px] sm:text-md dark:bg-code-inline-rgba relative box-border inline break-words rounded bg-[#737d8c2b] px-[6px] py-[4.5px] align-baseline font-mono	text-sm font-medium leading-normal text-[#0a0a0a] antialiased dark:text-white',
        {
          'bg-gray-30 bg-opacity-10': !isLink,
          'bg-highlight dark:bg-highlight-dark': isLink,
        }
      )}
      {...props}
    />
  );
}

InlineCode.displayName = 'InlineCode';

export default InlineCode;
