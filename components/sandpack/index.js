import React from 'react';
import ReactDOM from 'react-dom';
import { createFileMap } from './utils';
import SandpackRoot from './SandpackRoot';

const SandpackGlimmer = ({ code }) => (
  <div className="sandpack sandpack--playground my-8">
    <div className="sp-wrapper">
      <div className="rounded-lg shadow-jt2">
        <div className="bg-wash dark:border-border-dark dark:bg-card-dark relative z-10 flex h-10 items-center justify-between rounded-b-none rounded-t-lg border-b border-border">
          <div className="px-4 lg:px-6">
            <div className="sp-tabs"></div>
          </div>
          <div className="flex grow items-center justify-end px-3 text-right"></div>
        </div>
        <div className="sp-layout flex min-h-[216px] flex-wrap items-stretch">
          <div className="sp-stack sp-editor h-auto max-h-[406px] overflow-auto">
            <div className="sp-code-editor">
              <div className="sp-cm sp-pristine">
                <div className="cm-editor">
                  <div>
                    <div className="cm-gutters sticky min-h-[192px] pl-9">
                      <div className="cm-gutter cm-lineNumbers sp-pre-placeholder whitespace-pre">{code}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sp-stack order-last h-auto max-h-[406px] xl:order-2">
            <div className="bg-card dark:bg-wash-dark relative h-full overflow-auto rounded-b-lg p-0 sm:p-2 md:p-4 lg:rounded-b-none lg:p-8"></div>
          </div>
          {code.split('\n').length > 16 && (
            <div className="bg-wash border-b-1 dark:border-card-dark dark:bg-card-dark relative top-0 z-10 order-2 flex h-[45px] w-full items-center justify-between rounded-t-none p-1 text-base xl:order-last"></div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(function SandpackWrapper(props) {
  const codeSnippet = createFileMap(React.Children.toArray(props.children));

  // To set the active file in the fallback we have to find the active file first.
  // If there are no active files we fallback to App.js as default.
  let activeCodeSnippet = Object.keys(codeSnippet).filter(
    (fileName) => codeSnippet[fileName]?.active === true && codeSnippet[fileName]?.hidden === false
  );
  let activeCode;
  if (!activeCodeSnippet.length) {
    activeCode = codeSnippet['/App.js']?.code;
  } else {
    activeCode = codeSnippet[activeCodeSnippet[0]]?.code;
  }

  return (
    // <React.Suspense fallback={<SandpackGlimmer code={activeCode} />}>
    <SandpackRoot {...props} />
    // </React.Suspense>
  );
});
