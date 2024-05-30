import React from 'react';
import {
  FileTabs,
  useSandpack,
  useSandpackNavigation,
  UnstyledOpenInCodeSandboxButton,
} from '@codesandbox/sandpack-react';

import { FilesDropdown } from './FilesDropdown';
import { ExternalLink, RotateCcw } from 'lucide-react';

export function NavigationBar() {
  const { sandpack } = useSandpack();
  const [dropdownActive, setDropdownActive] = React.useState(false);
  const { visibleFiles, clients } = sandpack;
  const clientId = Object.keys(clients)[0];
  const { refresh } = useSandpackNavigation(clientId);

  const resizeHandler = React.useCallback(() => {
    const width = window.innerWidth || document.documentElement.clientWidth;
    if (!dropdownActive && width < 640) {
      setDropdownActive(true);
    }
    if (dropdownActive && width >= 640) {
      setDropdownActive(false);
    }
  }, [dropdownActive]);

  React.useEffect(() => {
    if (visibleFiles?.length > 1) {
      resizeHandler();
      window.addEventListener('resize', resizeHandler);
      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    }
    return;
  }, [visibleFiles?.length, resizeHandler]);

  const handleReset = () => {
    sandpack.resetAllFiles();
    refresh();
  };

  return (
    <div className="relative z-10 flex items-center justify-between rounded-b-none rounded-t-lg bg-bg-alt text-indigo-2">
      <div className="px-4 lg:px-6">{dropdownActive ? <FilesDropdown /> : <FileTabs />}</div>
      <div className="flex grow items-center justify-end px-3 text-right" translate="yes">
        <RotateCcw
          size={16}
          className="mx-1 mr-4 inline-flex cursor-pointer items-center text-indigo-1 transition duration-100 ease-in hover:text-indigo-2"
          onClick={handleReset}
        />
        <UnstyledOpenInCodeSandboxButton className="mx-1 ml-3 inline-flex items-center text-indigo-1 transition duration-100 ease-in hover:text-indigo-2 md:ml-1">
          <ExternalLink size={16} />
        </UnstyledOpenInCodeSandboxButton>
      </div>
    </div>
  );
}
