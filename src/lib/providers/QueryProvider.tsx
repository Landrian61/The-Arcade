'use client'

// ─────────────────────────────────────────────────────────────────
// TANSTACK QUERY — STEP 2: QueryClientProvider
// ─────────────────────────────────────────────────────────────────
//
// What is QueryClient?
//   The central manager for all your queries. It holds the cache,
//   handles background refetches, and tracks loading/error states.
//
// Why a separate file?
//   Next.js App Router is Server-Component-first.
//   QueryClientProvider uses React Context, which requires
//   a Client Component. Wrapping it here keeps layout.tsx clean.
//
// Why useState instead of just `new QueryClient()`?
//   In Next.js (SSR), if you write `const qc = new QueryClient()`
//   at the module level, all users share the same instance.
//   Using useState ensures each user/request gets their own client.
// ─────────────────────────────────────────────────────────────────

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // staleTime: How long (ms) fetched data is considered "fresh".
            // While fresh → no background refetch, cache is served instantly.
            // After staleTime expires → next mount triggers a background refetch.
            staleTime: 1000 * 60 * 5, // 5 minutes

            // gcTime (formerly cacheTime): How long unused queries stay in memory
            // before being garbage collected. Even after a component unmounts,
            // the data sticks around for this long so navigating back is instant.
            gcTime: 1000 * 60 * 10, // 10 minutes

            // retry: How many times to retry on failure before showing an error.
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/*
        ReactQueryDevtools: A floating panel (bottom-right) that shows every
        query in your app — its key, status, cached data, and timing.
        Only renders in development. An essential learning tool!
      */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
