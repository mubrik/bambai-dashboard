'use client';
import * as React from 'react';
/* import {ReactQueryStreamedHydration} from '@tanstack/react-query-next-experimental'; */
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {getQueryClient} from './getQueryClient';

export default function ReactQueryProvider(props: {children: React.ReactNode}) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      {/* <ReactQueryStreamedHydration></ReactQueryStreamedHydration> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
