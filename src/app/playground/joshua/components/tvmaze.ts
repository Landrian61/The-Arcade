// ─────────────────────────────────────────────────────────────────
// TVMaze API — Free, No Auth Required
// ─────────────────────────────────────────────────────────────────
// Perfect for TanStack Query practice: searching, filtering, caching.
// KEY RULE: Always THROW errors. Never return error objects.
// ─────────────────────────────────────────────────────────────────

const BASE_URL = 'https://api.tvmaze.com'

// ── Types ────────────────────────────────────────────────────────

export interface TVMazeShow {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: string
  runtime: number | null
  averageRuntime: number | null
  premiered: string | null
  ended: string | null
  officialSite: string | null
  schedule: { time: string; days: string[] }
  rating: { average: number | null }
  weight: number
  network: {
    id: number
    name: string
    country?: { name: string; code: string }
  } | null
  webChannel: { id: number; name: string } | null
  image: { medium: string; original: string } | null
  summary: string | null
  updated: number
}

export interface TVMazeSearchResult {
  score: number
  show: TVMazeShow
}

export interface TVMazeCastMember {
  person: {
    id: number
    name: string
    image: { medium: string; original: string } | null
  }
  character: {
    id: number
    name: string
    image: { medium: string; original: string } | null
  }
}

export interface TVMazeEpisode {
  id: number
  name: string
  season: number
  number: number | null
  airdate: string
  runtime: number | null
  image: { medium: string; original: string } | null
  summary: string | null
  rating: { average: number | null }
}

// ── Fetcher Functions ─────────────────────────────────────────────

export async function fetchShowsByPage(page: number = 0): Promise<TVMazeShow[]> {
  const res = await fetch(`${BASE_URL}/shows?page=${page}`)
  if (!res.ok) throw new Error(`Failed to fetch shows: ${res.status}`)
  return res.json()
}

export async function searchShows(query: string): Promise<TVMazeSearchResult[]> {
  const res = await fetch(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`
  )
  if (!res.ok) throw new Error(`Search failed: ${res.status}`)
  return res.json()
}

export async function fetchShowDetails(id: number): Promise<TVMazeShow> {
  const res = await fetch(`${BASE_URL}/shows/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch show: ${res.status}`)
  return res.json()
}

export async function fetchShowCast(id: number): Promise<TVMazeCastMember[]> {
  const res = await fetch(`${BASE_URL}/shows/${id}/cast`)
  if (!res.ok) throw new Error(`Failed to fetch cast: ${res.status}`)
  return res.json()
}

export async function fetchShowEpisodes(id: number): Promise<TVMazeEpisode[]> {
  const res = await fetch(`${BASE_URL}/shows/${id}/episodes`)
  if (!res.ok) throw new Error(`Failed to fetch episodes: ${res.status}`)
  return res.json()
}

// ── Utility ───────────────────────────────────────────────────────

export function stripHtml(html: string | null): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}
