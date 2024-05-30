import { memo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useSandpack, useActiveCode, SandpackCodeEditor, SandpackLayout } from '@codesandbox/sandpack-react';
import { cn } from '@/lib/utils';

import { NavigationBar } from './NavigationBar';
import { Preview } from './Preview';

export const CustomPreset = memo(function CustomPreset({
  showDevTools,
  onDevToolsLoad,
  devToolsLoaded,
  providedFiles,
}) {
  const { sandpack } = useSandpack();
  const { code } = useActiveCode();
  const { activeFile } = sandpack;
  const lineCountRef = useRef({});
  if (!lineCountRef.current[activeFile]) {
    lineCountRef.current[activeFile] = code.split('\n').length;
  }
  const lineCount = lineCountRef.current[activeFile];
  const isExpandable = lineCount > 16;
  return (
    <SandboxShell
      showDevTools={showDevTools}
      onDevToolsLoad={onDevToolsLoad}
      devToolsLoaded={devToolsLoaded}
      providedFiles={providedFiles}
      isExpandable={isExpandable}
    />
  );
});

const SandboxShell = memo(function SandboxShell({ providedFiles, lintErrors, isExpandable }) {
  const containerRef = useRef();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <div
        className="rounded-lg shadow-jt2"
        ref={containerRef}
        style={{
          contain: 'content',
        }}
      >
        <NavigationBar providedFiles={providedFiles} />
        <SandpackLayout
          className={cn(
            'flex',
            !(isExpandable || isExpanded) && 'overflow-hidden rounded-b-lg',
            isExpanded && 'sp-layout-expanded'
          )}
        >
          <SandpackCodeEditor
            showLineNumbers
            showInlineErrors
            style={{ backgroundColor: 'transparent' }}
            showTabs={false}
            showRunButton={false}
          />
          <Preview className="order-last xl:order-2" isExpanded={isExpanded} lintErrors={lintErrors} />
          {(isExpandable || isExpanded) && (
            <button
              translate="yes"
              className="sandpack-expand bg-wash border-b-1 dark:border-card-dark dark:bg-card-dark relative top-0 z-10 flex w-full items-center justify-between p-1 text-base lg:order-last"
              onClick={() => {
                const nextIsExpanded = !isExpanded;
                flushSync(() => {
                  setIsExpanded(nextIsExpanded);
                });
                if (!nextIsExpanded && containerRef.current !== null) {
                  if (containerRef.current.scrollIntoViewIfNeeded) {
                    containerRef.current.scrollIntoViewIfNeeded();
                  } else {
                    containerRef.current.scrollIntoView({
                      block: 'nearest',
                      inline: 'nearest',
                    });
                  }
                }
              }}
            >
              <span className="flex p-2 text-sm leading-[20px] text-indigo-1 focus:outline-none">
                {isExpanded ? 'Show less' : 'Show more'}
              </span>
            </button>
          )}
        </SandpackLayout>
      </div>
    </>
  );
});
