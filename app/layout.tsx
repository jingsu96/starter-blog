import 'css/tailwind.css';
import 'css/sandpack.css';
import 'pliny/search/algolia.css';

import { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { Analytics, AnalyticsConfig } from 'pliny/analytics';
import { SearchProvider, SearchConfig } from 'pliny/search';
import { draftMode } from 'next/headers';
import { EyeIcon } from 'lucide-react';

import SectionContainer from '@/components/SectionContainer';
import { MenuContent } from '@/components/lab/menu-content';
import { SideMenu } from '@/components/lab/side-menu';
import { TailwindIndicator } from '@/components/lab/tailwind-indicator';
import { SpeedInsights } from '@vercel/speed-insights/next';
import siteMetadata from '@/data/siteMetadata';

import { ThemeProviders } from './theme-providers';

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = draftMode();

  return (
    <html lang={siteMetadata.language} className={`${space_grotesk.variable} scroll-smooth`} suppressHydrationWarning>
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1b1b1f" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <ThemeProviders>
          <main vaul-drawer-wrapper="" className="min-h-[100vh] bg-bg-primary">
            {isEnabled && (
              <div className="absolute inset-x-0 bottom-0 z-50 flex h-12 w-full items-center justify-center bg-green-500 text-center text-sm font-medium text-white">
                <div className="flex items-center gap-2">
                  <EyeIcon size={16} />
                  <span>Draft mode is enabled</span>
                </div>
              </div>
            )}
            <div className="lg:flex">
              <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                <SideMenu className="relative hidden h-[100vh] max-h-[100vh] lg:flex">
                  <MenuContent />
                </SideMenu>
                <SectionContainer>{children}</SectionContainer>
              </SearchProvider>
            </div>
          </main>
        </ThemeProviders>
        <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
        <TailwindIndicator />
        <SpeedInsights />

        {/* 
        <Script
          src="https://unpkg.com/@tinybirdco/flock.js"
          data-host="https://api.tinybird.co"
          data-token={process.env.NEXT_PUBLIC_TINYBIRD_TOKEN}
          strategy="lazyOnload"
        /> */}
      </body>
    </html>
  );
}
