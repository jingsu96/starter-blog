'use client';

import { useEffect, useState, useLayoutEffect } from 'react';
import { useTheme } from 'next-themes';
import * as Select from '@radix-ui/react-select';
import { cn } from '@/lib/utils';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeSwitch = ({ className, offSet = 4 }: { className?: string; offSet?: number }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    // set meta name theme-color based on theme
    const metaThemeColor = document.querySelector('meta[name=theme-color]');

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', resolvedTheme === 'dark' ? '#1b1b1f' : '#FFF');
    }
  }, [resolvedTheme]);

  return mounted ? (
    <div className={cn(className)}>
      <Select.Root value={theme} onValueChange={setTheme}>
        <Select.Trigger className="m-[-4px] p-[4px] focus:outline-none [&:has(:focus-visible)]:ring-1">
          {resolvedTheme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
        </Select.Trigger>
        <Select.Portal>
          <Select.Content position="popper" className="rounded-md bg-bg-primary shadow-jt2" sideOffset={offSet}>
            {['light', 'dark', 'system'].map((value) => (
              <Select.Item key={value} value={value} className="hover:bg-bg-alt focus:outline-none">
                <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm">
                  <div className="mr-2">
                    {value === 'light' ? (
                      <Sun size={16} />
                    ) : value === 'dark' ? (
                      <Moon size={16} />
                    ) : (
                      <Monitor size={16} />
                    )}
                  </div>
                  <Select.ItemText>
                    {value === 'light' ? 'Light' : value === 'dark' ? 'Dark' : 'System'}
                  </Select.ItemText>
                </button>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  ) : (
    <div className={cn(className, 'h-4 w-4')} />
  );
};

export default ThemeSwitch;
