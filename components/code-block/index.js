'use client';

import { memo } from 'react';
import InlineCode from './InlineCode';
import CodeBlock from './CodeBlock';

export default memo(function CodeBlockWrapper(props) {
  if (!props?.className) {
    return <InlineCode {...props}></InlineCode>;
  }

  return <CodeBlock {...props} />;
});
