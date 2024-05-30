'use client';

import Link from 'next/link';
import Image from 'next/image';

import { NavigationLink } from '@/components/lab/navigation-link';
import { PROFILES, LINKS } from '@/lib/constants';
import ThemeSwitch from '@/components/ThemeSwitch';
import SearchButton from '../SearchButton';
import siteMetadata from '@/data/siteMetadata';

const Header = ({ from }) => {
  const { author, position } = siteMetadata;
  return (
    <div className="inline-flex justify-between">
      <Link href="/" className="link-card inline-flex items-center gap-2 p-2">
        <Image
          src="/static/images/logo.jpeg"
          alt={author}
          width={40}
          height={40}
          loading="lazy"
          className="rounded-full border shadow-sm"
        />
        <div className="flex flex-col">
          <span className="font-semibold tracking-tight">{author}</span>
          <span className="text-gray-600 dark:text-gray-300">{position}</span>
        </div>
      </Link>
      <div className="inline-flex gap-x-4">
        <SearchButton />
        <ThemeSwitch className={from === 'Drawer' ? 'flex' : 'hidden lg:flex'} offSet={-14} />
      </div>
    </div>
  );
};

export const MenuContent = ({ from }: { from?: string }) => {
  return (
    <div className="flex w-full flex-col text-sm">
      <div className="mb-2 flex flex-col gap-4">
        <Header from={from} />
        <div className="flex flex-col gap-1">
          {LINKS.map((link, linkIndex) => (
            <NavigationLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              shortcutNumber={linkIndex + 1}
            />
          ))}
        </div>
      </div>
      <hr />
      <div className="mt-4 flex flex-col gap-2 text-sm">
        <span className="px-2 text-xs font-medium leading-relaxed text-gray-600 dark:text-gray-200">Online</span>
        <div className="flex flex-col gap-1">
          {Object.values(PROFILES).map((profile) => (
            <NavigationLink key={profile.url} href={profile.url} label={profile.title} icon={profile.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};
