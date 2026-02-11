// ─────────────────────────────────────────────────────────────────
// TANSTACK QUERY — STEP 5: Dependent Queries
// ─────────────────────────────────────────────────────────────────
//
// A "dependent query" runs only after some prerequisite data is available.
// This is one of TanStack's most useful patterns.
//
// Here: we don't fetch movie details until the user clicks a movie card
// and we have an imdbID. Before that, the query stays dormant.
//
// NOTICE the queryKey structure:
//   ['movies', 'detail', 'tt0468569']
//                ↑ different from search's 'search'
//
// This means search and detail results are stored in SEPARATE cache slots.
// Clicking a movie you've already viewed → instant result from cache!
//
// The !! (double-bang) trick:
//   !!null  → false  (query disabled, no fetch)
//   !!'tt0468569' → true  (query enabled, fetch runs)
// ─────────────────────────────────────────────────────────────────

import { useQuery } from '@tanstack/react-query'
import { getMovieDetail } from '@/lib/api/omdb'

export function useMovieDetail(imdbID: string | null) {
  return useQuery({
    queryKey: ['movies', 'detail', imdbID],

    // The `!` asserts imdbID is non-null here — safe because `enabled` below
    // guarantees this function only runs when imdbID is a real string.
    queryFn: () => getMovieDetail(imdbID!),

    // Only fetch when we actually have an ID to look up.
    // When the user closes the dialog, imdbID becomes null → query disables.
    enabled: !!imdbID,

    // Movie details are stable — cache them for 10 minutes.
    // Re-opening the same movie dialog = instant, no extra API call.
    staleTime: 1000 * 60 * 10,
  })
}
