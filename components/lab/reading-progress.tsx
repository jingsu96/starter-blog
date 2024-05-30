import { cn } from '@/lib/utils';

export default function ReadingProgress({ className }: { className?: string }) {
  return (
    <div className={cn('absolute right-4 top-10 h-fit space-y-4 rounded-lg bg-bg-elv p-4 shadow-jt2', className)}>
      <div className="sticky right-4 top-4">
        <div className="my-2 flex items-center space-x-4">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-bg-alt text-sm font-semibold">1</div>
          <div>
            <div className="text-sm font-semibold">Installation</div>
            <div className="text-xs text-gray-500">19 sec read</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-bg-alt text-sm font-semibold">2</div>
          <div>
            <div className="text-sm font-semibold">Import only what's needed</div>
            <div className="text-xs text-gray-500">2 min read</div>
          </div>
        </div>
      </div>
    </div>
  );
}
