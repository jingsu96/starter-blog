'use client';

import React, { useState, useLayoutEffect } from 'react';
import {
  SandpackProvider,
  SandpackConsole,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
} from '@codesandbox/sandpack-react';
import { CustomPreset } from './CustomPreset';
import { createFileMap } from './utils';
import { aquaBlue } from '@codesandbox/sandpack-themes';
import { CustomTheme } from './Themes';
import { useTheme } from 'next-themes';
import { NavigationBar } from './NavigationBar';
import { useMounted } from '@/hooks/useMounted';

const sandboxStyle = `
* {
  box-sizing: border-box;
}

body {
  font-family: Roboto, sans-serif;
  margin: 20px;
  padding: 0;
  background: #fff;
}

h1 {
  margin-top: 0;
  font-size: 22px;
  color: #ff0a78;
}

h2 {
  margin-top: 0;
  font-size: 20px;
  color: #ff0a78;
}

h3 {
  margin-top: 0;
  font-size: 18px;
  color: #ff0a78;
}

h4 {
  margin-top: 0;
  font-size: 16px;
  color: #ff0a78;
}

h5 {
  margin-top: 0;
  font-size: 14px;
  color: #ff0a78;
}

h6 {
  margin-top: 0;
  font-size: 12px;
  color: #ff0a78;
}

ul {
  padding-left: 20px;
}
`.trim();

function SandpackRoot(props) {
  let {
    children,
    setup,
    autorun = true,
    showDevTools = false,
    lang = 'react',
    activeFile = '/App.js',
    showTerminal,
  } = props;
  const [devToolsLoaded, setDevToolsLoaded] = useState(false);
  const mounted = useMounted();
  let codeSnippets = React.Children.toArray(children);
  let isSingleFile = true;

  const { theme, resolvedTheme } = useTheme();
  const [codeTheme, setCodeTheme] = useState(null);
  const files = createFileMap(codeSnippets, props.lang);

  useLayoutEffect(() => {
    setCodeTheme(resolvedTheme === 'dark' ? CustomTheme : aquaBlue);
  }, [resolvedTheme, mounted]);

  if (lang === 'react') {
    files['/styles.css'] = {
      code: [sandboxStyle, files['/styles.css']?.code ?? ''].join('\n\n'),
      hidden: true,
    };
  }

  return (
    <div className="sandpack my-8" translate="no" key={theme}>
      {['vanilla', 'node', 'static'].includes(props.lang) ? (
        <SandpackProvider
          template={props.lang}
          files={
            mounted
              ? {
                  ...files,
                }
              : {}
          }
          autorun={autorun}
          initMode="user-visible"
          initModeObserverOptions={{ rootMargin: '1400px 0px' }}
          theme={codeTheme}
          options={{
            recompileMode: 'delayed',
            recompileDelay: 300,
            activeFile,
          }}
        >
          <NavigationBar />
          <SandpackLayout>
            <SandpackCodeEditor showLineNumbers showInlineErrors showTabs={false} showRunButton={false} />
            {mounted && <SandpackPreview style={showTerminal && { display: 'none' }} />}
            {showTerminal && <SandpackConsole standalone={true} />}
          </SandpackLayout>
        </SandpackProvider>
      ) : (
        <SandpackProvider
          key={theme}
          template={'react'}
          autorun={autorun}
          files={files}
          options={{
            autorun,
            initMode: 'user-visible',
            initModeObserverOptions: { rootMargin: '1400px 0px' },
            activeFile: activeFile, // used to be activePath
          }}
        >
          <CustomPreset
            lang={props.lang}
            isSingleFile={isSingleFile}
            showDevTools={showDevTools}
            onDevToolsLoad={() => setDevToolsLoaded(true)}
            devToolsLoaded={devToolsLoaded}
          />
        </SandpackProvider>
      )}
    </div>
  );
}

SandpackRoot.displayName = 'Sandpack';

export default SandpackRoot;
