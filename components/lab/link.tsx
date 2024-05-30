import NextLink from 'next/link';

import { isExternalLink } from '@/lib/utils';
import CustomLink from '../CustomLink';

export const Link = ({ href = '#', ...rest }) => {
  const isExternal = isExternalLink(href);
  if (isExternal) {
    return (
      <CustomLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="link main-link break-words after:content-['_↗']"
        {...rest}
      />
    );
  }

  return <NextLink href={href} className="link main-link" {...rest} />;
};
