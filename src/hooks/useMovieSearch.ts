// ─────────────────────────────────────────────────────────────────
// TANSTACK QUERY — STEP 4: useQuery + queryKey
// ─────────────────────────────────────────────────────────────────
//
// useQuery is the core hook. It:
//   1. Calls your queryFn to fetch data
//   2. Caches the result under the queryKey
//   3. Returns { data, isLoading, isFetching, isError, error, refetch }
//
// CONCEPT: queryKey
//   An array that uniquely addresses a piece of cached data.
//   Think of it like a URL path in a filing cabinet:
//
//   ['movies', 'search', 'batman']    → one cache entry
//   ['movies', 'search', 'inception'] → different cache entry
//   ['movies', 'detail', 'tt0468569'] → yet another entry (detail, not search)
//
//   When `query` changes, TanStack sees a new key → runs a fresh fetch.
//   When you search 'batman' a second time → cache hit → instant result!
//
// CONCEPT: enabled
//   Boolean that controls whether the query actually runs.
//   When false, the query stays in "disabled" state (no fetch, no loading).
//   Here: only fetch when the user has typed at least 2 characters.
//
// CONCEPT: isLoading vs isFetching
//   isLoading  → true only during the FIRST load (no data in cache yet)
//   isFetching → true whenever a fetch is in progress, INCLUDING background
//                refetches when stale data is being refreshed in the background
//
//   Use isLoading for skeletons/placeholders.
//   Use isFetching for subtle spinners that show even during refreshes.
// ─────────────────────────────────────────────────────────────────

import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '@/lib/api/omdb'

export function useMovieSearch(query: string) {
  return useQuery({
    // The cache key. Array format: [domain, sub-domain, variable-part]
    // TanStack deep-compares this array — if any element changes, new fetch.
    queryKey: ['movies', 'search', query],

    // The async function that does the actual fetching.
    // TanStack calls this automatically when the query is due.
    queryFn: () => searchMovies(query),

    // Gate: only run when query is meaningful (2+ chars typed)
    // Try removing this and watch DevTools fire on every keystroke!
    enabled: query.trim().length >= 2,

    // Search results stay fresh for 2 minutes.
    // Within this window, re-mounting the component won't re-fetch.
    staleTime: 1000 * 60 * 2,
  })
}
