import React from 'react';
import { cn } from '@/lib/utils';

import { useSandpack } from '@codesandbox/sandpack-react';
import * as Select from '@radix-ui/react-select';

const getFileName = (filePath) => {
  const lastIndexOfSlash = filePath.lastIndexOf('/');
  return filePath.slice(lastIndexOfSlash + 1);
};

export function FilesDropdown() {
  const { sandpack } = useSandpack();
  const { visibleFiles, setActiveFile, activeFile } = sandpack;
  return (
    <Select.Root value={activeFile} onValueChange={setActiveFile}>
      <Select.Trigger
        className={cn(
          'text-link dark:text-link-dark border-link dark:border-link-dark text-md -mb-px mt-px flex h-full items-center truncate border-b-2 px-1 py-2 leading-tight !shadow-none dark:text-[#149eca]'
        )}
      >
        {getFileName(activeFile)}
      </Select.Trigger>
      <Select.Content position="popper" className="border-border-1 overflow-hidden rounded-sm border">
        {visibleFiles.map((filePath) => (
          <Select.Item key={filePath} value={filePath} className="bg-bg-elv p-2">
            {getFileName(filePath)}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
