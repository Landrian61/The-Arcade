// ─────────────────────────────────────────────────────────────────
// TANSTACK QUERY — STEP 3: The API / fetcher layer
// ─────────────────────────────────────────────────────────────────
//
// These are plain async functions — no React, no hooks, no TanStack.
// TanStack Query wraps these functions with:
//   caching · background refetching · deduplication · error handling
//
// KEY RULE: Always THROW errors. Never return { error: ... }.
//   TanStack catches thrown errors and exposes them via `isError` + `error`.
//   If you return an error object instead, TanStack sees "success" data.
//
// NEXT_PUBLIC_ prefix: env vars prefixed with NEXT_PUBLIC_ are exposed
// to the browser. Required since we fetch directly from client components.
// ─────────────────────────────────────────────────────────────────

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com'

// ── Types ────────────────────────────────────────────────────────

export interface MovieSearchResult {
  Title: string
  Year: string
  imdbID: string
  Type: 'movie' | 'series' | 'episode'
  Poster: string // URL string, or "N/A" if not available
}

export interface MovieDetail {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Poster: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Awards: string
  Country: string
  Language: string
  BoxOffice: string
  Response: 'True' | 'False'
  Error?: string
}

// OMDb wraps search results in this envelope
interface OmdbSearchEnvelope {
  Search: MovieSearchResult[]
  totalResults: string
  Response: 'True' | 'False'
  Error?: string
}

// ── Fetcher Functions ─────────────────────────────────────────────

/**
 * Search movies by title keyword.
 * This becomes the `queryFn` for useMovieSearch.
 */
export async function searchMovies(query: string): Promise<MovieSearchResult[]> {
  if (!API_KEY) {
    throw new Error(
      'OMDb API key missing. Add NEXT_PUBLIC_OMDB_API_KEY to your .env.local file.'
    )
  }

  const url = `${BASE_URL}/?s=${encodeURIComponent(query)}&type=movie&apikey=${API_KEY}`
  const res = await fetch(url)

  // Step 1: Check for HTTP-level errors (network issues, 4xx/5xx)
  if (!res.ok) {
    throw new Error(`Network error: ${res.status} ${res.statusText}`)
  }

  const data: OmdbSearchEnvelope = await res.json()

  // Step 2: Check for OMDb API-level errors
  // OMDb returns { Response: "False", Error: "Movie not found!" } on failure
  if (data.Response === 'False') {
    throw new Error(data.Error ?? 'Search failed')
  }

  return data.Search
}

/**
 * Fetch full details for a single movie by its IMDb ID.
 * This becomes the `queryFn` for useMovieDetail.
 */
export async function getMovieDetail(imdbID: string): Promise<MovieDetail> {
  if (!API_KEY) {
    throw new Error('OMDb API key missing.')
  }

  const url = `${BASE_URL}/?i=${imdbID}&plot=full&apikey=${API_KEY}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Network error: ${res.status} ${res.statusText}`)
  }

  const data: MovieDetail = await res.json()

  if (data.Response === 'False') {
    throw new Error(data.Error ?? 'Movie not found')
  }

  return data
}
