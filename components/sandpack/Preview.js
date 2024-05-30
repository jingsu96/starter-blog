/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {
  useSandpack,
  LoadingOverlay,
  SandpackStack,
  SandpackConsole,
  useSandpackConsole,
} from '@codesandbox/sandpack-react';
import { cn } from '@/lib/utils';

import { computeViewportSize } from './utils';

function useDebounced(value) {
  const ref = React.useRef(null);
  const [saved, setSaved] = React.useState(value);
  React.useEffect(() => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      setSaved(value);
    }, 300);
  }, [value]);
  return saved;
}

export function Preview({ customStyle, isExpanded, className }) {
  const { sandpack, listen } = useSandpack();
  const [isReady, setIsReady] = React.useState(false);
  const [iframeComputedHeight, setComputedAutoHeight] = React.useState(null);

  let {
    error: rawError,
    registerBundler,
    unregisterBundler,
    errorScreenRegisteredRef,
    loadingScreenRegisteredRef,
    status,
  } = sandpack;

  if (rawError && rawError.message === '_csbRefreshUtils.prelude is not a function') {
    // Work around a noisy internal error.
    rawError = null;
  }
  // It changes too fast, causing flicker.
  const error = useDebounced(rawError);

  const clientId = React.useId();
  const iframeRef = React.useRef(null);

  // SandpackPreview immediately registers the custom screens/components so the bundler does not render any of them
  // TODO: why are we doing this during render?
  // errorScreenRegisteredRef.current = true;
  // loadingScreenRegisteredRef.current = true;

  React.useEffect(() => {
    const iframeElement = iframeRef.current;
    registerBundler(iframeElement, clientId);
  }, []);

  React.useEffect(() => {
    const unsubscribe = listen((message) => {
      if (message.type === 'resize') {
        setComputedAutoHeight(message.height);
      } else if (message.type === 'start') {
        if (message.firstLoad) {
          setIsReady(false);
        }
      } else if (message.type === 'done') {
        setIsReady(true);
      }
    }, clientId.current);

    return () => {
      setIsReady(false);
      setComputedAutoHeight(null);
      unsubscribe();
    };
  }, [status === 'idle']);

  const viewportStyle = computeViewportSize('auto', 'portrait');
  const overrideStyle = error
    ? {
        // Don't collapse errors
        maxHeight: undefined,
      }
    : null;
  const hideContent = error || !iframeComputedHeight || !isReady;

  const iframeWrapperPosition = () => {
    if (hideContent) {
      return { position: 'relative' };
    }

    if (isExpanded) {
      return { position: 'sticky', top: 'calc(2em + 64px)' };
    }

    return {};
  };

  return (
    <>
      <SandpackStack>
        <div
          className={cn(
            className,
            'md:bg-card md:dark:bg-wash-dark relative h-full p-0 sm:p-2 md:rounded-b-lg md:p-4 lg:rounded-b-none lg:p-8',
            !isExpanded && (error || isReady) ? 'overflow-auto' : null
          )}
        >
          <div style={iframeWrapperPosition()}>
            <iframe
              ref={iframeRef}
              className={cn(
                'w-full max-w-full rounded-t-none transition-opacity sm:rounded-lg md:shadow-md',
                hideContent ? 'pointer-events-none absolute opacity-0 duration-75' : 'opacity-100 duration-150'
              )}
              title="Sandbox Preview"
              style={{
                height: iframeComputedHeight || '15px',
                zIndex: isExpanded ? 'initial' : -1,
              }}
            />
          </div>
          {error && (
            <div className={cn('border-red-40', 'p-2', isExpanded ? 'sticky top-8' : null)}>
              <pre className="text-secondary whitespace-pre-wrap break-words">{error.message}</pre>
            </div>
          )}
          <LoadingOverlay clientId={clientId.current} loading={!isReady && iframeComputedHeight === null} />
        </div>
        {/* <SandpackConsole visible={!error} clientId={clientId} /> */}
      </SandpackStack>
    </>
  );
}
