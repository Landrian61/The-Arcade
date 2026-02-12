// ─────────────────────────────────────────────────────────────────
// TanStack Query hooks for the Netflix clone
// ─────────────────────────────────────────────────────────────────
// Demonstrates: queryKey design, dependent queries, enabled gates,
// parallel fetching with Promise.all, and client-side data transforms.
// ─────────────────────────────────────────────────────────────────

import { useQuery } from '@tanstack/react-query'
import {
  fetchShowsByPage,
  searchShows,
  fetchShowDetails,
  fetchShowCast,
  fetchShowEpisodes,
  TVMazeShow,
} from './tvmaze'

// ── Genre category definitions ───────────────────────────────────

const GENRE_CATEGORIES = [
  { key: 'trending', title: 'Trending Now', genres: null },
  { key: 'action', title: 'Action & Adventure', genres: ['Action', 'Adventure'] },
  { key: 'comedy', title: 'Comedy', genres: ['Comedy'] },
  { key: 'drama', title: 'Drama', genres: ['Drama'] },
  { key: 'scifi', title: 'Sci-Fi & Fantasy', genres: ['Science-Fiction', 'Fantasy'] },
  { key: 'crime', title: 'Crime', genres: ['Crime'] },
  { key: 'thriller', title: 'Thriller', genres: ['Thriller'] },
  { key: 'horror', title: 'Horror', genres: ['Horror'] },
  { key: 'romance', title: 'Romance', genres: ['Romance'] },
] as const

// ── Types ────────────────────────────────────────────────────────

export interface CatalogRow {
  key: string
  title: string
  shows: TVMazeShow[]
}

interface CatalogData {
  hero: TVMazeShow
  rows: CatalogRow[]
}

// ── Data transform ───────────────────────────────────────────────

function organizeCatalog(allShows: TVMazeShow[]): CatalogData {
  const validShows = allShows.filter(
    (s) => s.image?.original && s.rating?.average && s.rating.average > 0
  )

  const sortedByRating = [...validShows].sort(
    (a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0)
  )

  const hero = sortedByRating[0]

  const rows: CatalogRow[] = GENRE_CATEGORIES.map((cat) => {
    let filtered: TVMazeShow[]

    if (cat.genres === null) {
      // Trending = top rated with images
      filtered = sortedByRating.slice(0, 20)
    } else {
      filtered = validShows
        .filter((s) => s.genres.some((g) => (cat.genres as readonly string[]).includes(g)))
        .sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0))
        .slice(0, 20)
    }

    return { key: cat.key, title: cat.title, shows: filtered }
  }).filter((row) => row.shows.length >= 4)

  return { hero, rows }
}

// ── Hooks ────────────────────────────────────────────────────────

/**
 * Fetches the full Netflix catalog: hero show + genre-organized rows.
 * Uses Promise.all to fetch multiple pages in parallel.
 */
export function useNetflixCatalog() {
  return useQuery({
    queryKey: ['netflix', 'catalog'],
    queryFn: async () => {
      const [page0, page1] = await Promise.all([
        fetchShowsByPage(0),
        fetchShowsByPage(1),
      ])
      return organizeCatalog([...page0, ...page1])
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  })
}

/**
 * Search shows. Enabled gate: only runs when query >= 2 chars.
 * queryKey includes the search term so each search is cached separately.
 */
export function useShowSearch(query: string) {
  return useQuery({
    queryKey: ['netflix', 'search', query],
    queryFn: () => searchShows(query),
    enabled: query.trim().length >= 2,
    staleTime: 1000 * 60 * 2,
  })
}

/**
 * Dependent query: only fetches when a show ID is provided.
 * Used when opening the detail modal.
 */
export function useShowDetails(id: number | null) {
  return useQuery({
    queryKey: ['netflix', 'show', id],
    queryFn: () => fetchShowDetails(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  })
}

/**
 * Dependent query for cast data.
 * Runs alongside useShowDetails when modal opens.
 */
export function useShowCast(id: number | null) {
  return useQuery({
    queryKey: ['netflix', 'cast', id],
    queryFn: () => fetchShowCast(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  })
}

/**
 * Dependent query for episode data.
 * Episodes are grouped by season in the component.
 */
export function useShowEpisodes(id: number | null) {
  return useQuery({
    queryKey: ['netflix', 'episodes', id],
    queryFn: () => fetchShowEpisodes(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  })
}
