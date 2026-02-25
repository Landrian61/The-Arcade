'use client'

// ─────────────────────────────────────────────────────────────────
// TANSTACK QUERY — STEP 6: The UI layer
// ─────────────────────────────────────────────────────────────────
//
// This component uses our two custom hooks. Notice:
//   - No useState for loading/error — TanStack gives us that for free
//   - No useEffect for fetching — TanStack handles all that
//   - The component is purely declarative: it describes what to SHOW
//     based on the state TanStack provides
//
// Debounce pattern:
//   searchInput  → updates on every keystroke (controlled input)
//   debouncedQuery → updates 500ms after the user stops typing
//   useMovieSearch(debouncedQuery) → only queries with the debounced value
//   This prevents hammering the API on every keypress.
// ─────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import {
  Box, Typography, TextField, InputAdornment, Card, CardMedia,
  CardContent, CircularProgress, Skeleton, Dialog, DialogContent,
  DialogTitle, Chip, IconButton, Alert, Divider,
} from '@mui/material'
import { Search, Star, Close, Movie as MovieIcon } from '@mui/icons-material'
import { useMovieSearch } from '@/hooks/useMovieSearch'
import { useMovieDetail } from '@/hooks/useMovieDetail'
import type { MovieSearchResult } from '@/lib/api/omdb'

// Landrian brand palette
const C = {
  bg: 'rgba(0, 24, 40, 0.95)',
  card: 'rgba(0, 34, 54, 0.9)',
  accent: '#f77f00',
  gold: '#fcbf49',
  cream: '#eae2b7',
  red: '#d62828',
}

// ── Movie Detail Dialog ───────────────────────────────────────────
// Demonstrates a dependent useQuery: only fires when imdbID is set.

function MovieDetailDialog({
  imdbID,
  onClose,
}: {
  imdbID: string | null
  onClose: () => void
}) {
  // LESSON: useMovieDetail uses enabled: !!imdbID
  // When the dialog opens (imdbID set) → query fires.
  // When closed (imdbID = null) → query stays dormant.
  // Open the same movie again → instant from cache (no spinner!).
  const { data: movie, isLoading, isError } = useMovieDetail(imdbID)

  return (
    <Dialog
      open={!!imdbID}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#001828',
          border: `2px solid ${C.accent}`,
          borderRadius: 3,
          color: C.cream,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: C.gold,
          borderBottom: `1px solid rgba(247,127,0,0.3)`,
          pb: 2,
          fontFamily: 'var(--font-permanent-marker)',
        }}
      >
        {isLoading ? 'Loading...' : movie?.Title ?? 'Movie Details'}
        <IconButton onClick={onClose} sx={{ color: C.cream }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* isLoading: first-time fetch, no cache yet */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: C.accent }} />
          </Box>
        )}

        {/* isError: queryFn threw an error */}
        {isError && (
          <Alert severity="error" sx={{ bgcolor: 'rgba(214,40,40,0.15)', color: C.cream }}>
            Failed to load movie details. Check your API key or try again.
          </Alert>
        )}

        {/* data: successful fetch or cache hit */}
        {movie && (
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
            {/* Poster */}
            <Box sx={{ flexShrink: 0 }}>
              {movie.Poster !== 'N/A' ? (
                <Box
                  component="img"
                  src={movie.Poster}
                  alt={movie.Title}
                  sx={{
                    width: 200,
                    borderRadius: 2,
                    border: `2px solid ${C.accent}`,
                    display: 'block',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 200, height: 300, bgcolor: C.card,
                    borderRadius: 2, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    border: `2px solid ${C.accent}`,
                  }}
                >
                  <MovieIcon sx={{ fontSize: 60, color: C.accent }} />
                </Box>
              )}
            </Box>

            {/* Details */}
            <Box sx={{ flex: 1 }}>
              {/* Genre chips */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                {movie.Genre?.split(', ').map((g) => (
                  <Chip
                    key={g} label={g} size="small"
                    sx={{ bgcolor: C.accent, color: '#000', fontWeight: 'bold' }}
                  />
                ))}
                {movie.imdbRating !== 'N/A' && (
                  <Chip
                    icon={<Star sx={{ color: '#000 !important' }} />}
                    label={movie.imdbRating}
                    size="small"
                    sx={{ bgcolor: C.gold, color: '#000', fontWeight: 'bold' }}
                  />
                )}
              </Box>

              <Typography variant="body2" sx={{ color: C.cream, opacity: 0.7, mb: 2 }}>
                {movie.Year} · {movie.Runtime} · {movie.Rated}
              </Typography>

              <Typography variant="body1" sx={{ color: C.cream, lineHeight: 1.8, mb: 2 }}>
                {movie.Plot}
              </Typography>

              <Divider sx={{ borderColor: 'rgba(234,226,183,0.2)', my: 2 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {movie.Director !== 'N/A' && (
                  <Typography variant="body2" sx={{ color: C.cream }}>
                    <strong style={{ color: C.gold }}>Director:</strong> {movie.Director}
                  </Typography>
                )}
                {movie.Actors !== 'N/A' && (
                  <Typography variant="body2" sx={{ color: C.cream }}>
                    <strong style={{ color: C.gold }}>Stars:</strong> {movie.Actors}
                  </Typography>
                )}
                {movie.Awards !== 'N/A' && (
                  <Typography variant="body2" sx={{ color: C.cream }}>
                    <strong style={{ color: C.gold }}>Awards:</strong> {movie.Awards}
                  </Typography>
                )}
                {movie.BoxOffice !== 'N/A' && movie.BoxOffice && (
                  <Typography variant="body2" sx={{ color: C.cream }}>
                    <strong style={{ color: C.gold }}>Box Office:</strong> {movie.BoxOffice}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ── Movie Card ────────────────────────────────────────────────────

function MovieCard({ movie, onClick }: { movie: MovieSearchResult; onClick: () => void }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        bgcolor: C.card,
        border: `1px solid rgba(247,127,0,0.25)`,
        borderRadius: 3,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-6px)',
          border: `1px solid ${C.accent}`,
          boxShadow: `0 12px 30px rgba(247,127,0,0.3)`,
        },
      }}
    >
      {movie.Poster !== 'N/A' ? (
        <CardMedia
          component="img"
          image={movie.Poster}
          alt={movie.Title}
          sx={{ height: 260, objectFit: 'cover' }}
        />
      ) : (
        <Box
          sx={{
            height: 260,
            bgcolor: '#001020',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MovieIcon sx={{ fontSize: 60, color: C.accent, opacity: 0.4 }} />
        </Box>
      )}
      <CardContent sx={{ p: 1.5, pb: '12px !important' }}>
        <Typography
          variant="body2"
          sx={{
            color: C.cream,
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {movie.Title}
        </Typography>
        <Typography variant="caption" sx={{ color: C.gold }}>
          {movie.Year}
        </Typography>
      </CardContent>
    </Card>
  )
}

// ── Main MovieBrowser ─────────────────────────────────────────────

export default function MovieBrowser() {
  const [searchInput, setSearchInput] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null)

  // DEBOUNCE: wait 500ms after the user stops typing before updating the query.
  // The cleanup function cancels the previous timer on each keystroke,
  // so the API only gets called when the user pauses.
  useEffect(() => {
    if (searchInput.trim() === '') {
      setDebouncedQuery('')
      return
    }
    const timer = setTimeout(() => setDebouncedQuery(searchInput.trim()), 500)
    return () => clearTimeout(timer)
  }, [searchInput])

  // LESSON: Destructure exactly what you need from useQuery's return value.
  //   data       → the MovieSearchResult[] array (undefined while loading)
  //   isLoading  → true on first fetch (no cache yet) → show skeleton
  //   isFetching → true on any fetch including background refetches → show subtle spinner
  //   isError    → true if queryFn threw → show error message
  //   error      → the thrown Error object
  const { data: movies, isLoading, isFetching, isError, error } = useMovieSearch(debouncedQuery)

  const showSkeletons = isLoading && debouncedQuery.length >= 2
  const hasResults = !isLoading && !isError && movies && movies.length > 0
  const noResults = !isLoading && !isError && movies?.length === 0 && debouncedQuery.length >= 2

  return (
    <Box sx={{ color: C.cream }}>
      {/* ── Header ── */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'var(--font-rubik-glitch)',
            color: C.gold,
            textShadow: `2px 2px 0 ${C.red}`,
            mb: 0.5,
          }}
        >
          MOVIE VAULT
        </Typography>
        <Typography variant="body2" sx={{ color: C.cream, opacity: 0.5, mb: 3 }}>
          Powered by TanStack Query — results are cached. Search &quot;batman&quot; twice and watch the DevTools.
        </Typography>

        {/* ── Search Input ── */}
        <TextField
          fullWidth
          placeholder='Search movies... (try "Inception", "Batman", "Spider-Man")'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: C.accent }} />
              </InputAdornment>
            ),
            // isFetching shows a subtle spinner even during background refetches
            endAdornment: isFetching ? (
              <InputAdornment position="end">
                <CircularProgress size={18} sx={{ color: C.accent }} />
              </InputAdornment>
            ) : null,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: C.card,
              color: C.cream,
              borderRadius: 3,
              '& fieldset': { borderColor: 'rgba(247,127,0,0.35)' },
              '&:hover fieldset': { borderColor: C.accent },
              '&.Mui-focused fieldset': { borderColor: C.gold },
            },
            '& input::placeholder': { color: 'rgba(234,226,183,0.35)' },
          }}
        />

        {/* Hint when query is too short */}
        {searchInput.length > 0 && searchInput.length < 2 && (
          <Typography variant="caption" sx={{ color: C.accent, mt: 0.75, display: 'block' }}>
            TanStack tip: query is <em>disabled</em> until you type 2+ characters (see DevTools)
          </Typography>
        )}
      </Box>

      {/* ── Error State ── */}
      {isError && (
        <Alert severity="error" sx={{ bgcolor: 'rgba(214,40,40,0.15)', color: C.cream, mb: 3 }}>
          {(error as Error)?.message ?? 'Something went wrong'}
        </Alert>
      )}

      {/* ── Empty State ── */}
      {!debouncedQuery && (
        <Box sx={{ textAlign: 'center', py: 10, opacity: 0.3 }}>
          <MovieIcon sx={{ fontSize: 90, color: C.accent, mb: 2 }} />
          <Typography variant="h6">Search to explore the vault</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Open the TanStack DevTools panel (bottom-right) to watch queries live
          </Typography>
        </Box>
      )}

      {/* ── Loading Skeletons ── */}
      {showSkeletons && (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: 2.5 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Box key={i}>
              <Skeleton variant="rectangular" height={260} sx={{ bgcolor: C.card, borderRadius: 2 }} />
              <Skeleton variant="text" sx={{ bgcolor: C.card, mt: 1 }} />
              <Skeleton variant="text" width="55%" sx={{ bgcolor: C.card }} />
            </Box>
          ))}
        </Box>
      )}

      {/* ── Movie Grid ── */}
      {hasResults && (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: 2.5 }}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => setSelectedMovieId(movie.imdbID)}
            />
          ))}
        </Box>
      )}

      {/* ── No Results ── */}
      {noResults && (
        <Box sx={{ textAlign: 'center', py: 8, opacity: 0.45 }}>
          <Typography variant="h6">No movies found for &quot;{debouncedQuery}&quot;</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>Try a different search term</Typography>
        </Box>
      )}

      {/* ── Movie Detail Dialog ── */}
      <MovieDetailDialog
        imdbID={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </Box>
  )
}
