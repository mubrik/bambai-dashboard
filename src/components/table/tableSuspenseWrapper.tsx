import {Suspense} from 'react';
import {HydrationWrapper} from '@providers/queryProvider/hydrationWrapper';
import {TableSkeleton} from './tableSkeleton';
import type {QueryClient} from '@tanstack/react-query';

export function SuspenseTableWrapper({suspenseKey, children}: {suspenseKey?: string; children: React.ReactNode}) {
  return (
    <Suspense key={suspenseKey} fallback={<TableSkeleton />}>
      {children}
    </Suspense>
  );
}

export function HydrationTableWrapper({
  suspenseKey,
  queryClient,
  children,
}: {
  suspenseKey?: string;
  queryClient: QueryClient;
  children: React.ReactNode;
}) {
  return (
    <Suspense key={suspenseKey} fallback={<TableSkeleton />}>
      <HydrationWrapper queryClient={queryClient}>{children}</HydrationWrapper>
    </Suspense>
  );
}
