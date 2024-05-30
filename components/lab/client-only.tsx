'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function ClientOnly({ fallback = null, children }: { fallback: React.ReactNode; children: React.ReactNode }) {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true,
  );

  return isServer ? <>{fallback}</> : <>{children}</>;
}
