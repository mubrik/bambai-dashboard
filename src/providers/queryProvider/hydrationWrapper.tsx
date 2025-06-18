import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';

export function HydrationWrapper ({children, queryClient}: {children: React.ReactNode, queryClient: QueryClient}) {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}
