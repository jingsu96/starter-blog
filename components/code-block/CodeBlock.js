'use client';
// import Pre from '@/components/Pre';

import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Prism, Highlight, themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils/';
import { Copy, Check } from 'lucide-react';
import { useMounted } from '@/hooks/useMounted';
const { github, nightOwl } = themes;

const CodeBlock = function CodeBlock({ children, className = 'language-js' }) {
  const { theme, resolvedTheme } = useTheme();

  // e.g. "language-js"
  const language = className.substring(9);
  const textInput = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [codeTheme, setCodeTheme] = useState(null);

  const mounted = useMounted();

  useLayoutEffect(() => {
    setCodeTheme(resolvedTheme === 'dark' ? nightOwl : github);
  }, [resolvedTheme, mounted]);

  const onEnter = () => {
    setHovered(true);
  };
  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };

  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput.current.textContent);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div key={theme} ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className="relative">
      {hovered && (
        <button aria-label="Copy code" type="button" className={`absolute right-2 top-2 h-8 w-8`} onClick={onCopy}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      )}
      <Highlight
        theme={
          typeof window === 'undefined'
            ? { plain: { backgroundColor: 'transparent', color: 'inherit' }, styles: github.styles }
            : codeTheme
        }
        prism={Prism}
        code={children}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={cn(className, '!bg-[#F2F7FC] text-sm dark:!bg-[#0D1B24] ')} style={style}>
            {tokens.map((line, i) => {
              if (i === tokens.length - 1) {
                return null;
              }
              return (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={token} className={cn(className, 'text-sm')} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
