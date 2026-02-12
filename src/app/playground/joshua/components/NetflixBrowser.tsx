'use client'

import { useState, useCallback } from 'react'
import { useNetflixCatalog, useShowSearch } from './useNetflixData'
import { TVMazeShow } from './tvmaze'
import NetflixNavbar from './NetflixNavbar'
import HeroBanner from './HeroBanner'
import ContentRow from './ContentRow'
import ShowModal from './ShowModal'

export default function NetflixBrowser() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedShowId, setSelectedShowId] = useState<number | null>(null)

  const { data: catalog, isLoading, isError, error } = useNetflixCatalog()
  const { data: searchResults, isLoading: isSearching } = useShowSearch(searchQuery)

  const isSearchMode = searchQuery.trim().length >= 2

  const handleShowSelect = useCallback((show: TVMazeShow) => {
    setSelectedShowId(show.id)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedShowId(null)
  }, [])

  return (
    <div style={{ background: '#141414', minHeight: '100vh', color: '#fff', fontFamily: 'var(--font-outfit)' }}>
      {/* Navbar */}
      <NetflixNavbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Loading State */}
      {isLoading && <LoadingSkeleton />}

      {/* Error State */}
      {isError && (
        <div style={{ paddingTop: 120, textAlign: 'center', padding: '120px 4% 40px' }}>
          <h2 style={{ color: '#E50914', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 8px' }}>
            Unable to load content
          </h2>
          <p style={{ color: '#808080', fontSize: '0.95rem', margin: 0 }}>
            {(error as Error)?.message || 'Something went wrong. Please try again.'}
          </p>
        </div>
      )}

      {/* Search Results */}
      {isSearchMode && !isLoading && (
        <div style={{ paddingTop: 100, padding: '100px 4% 40px' }}>
          <p style={{ color: '#808080', fontSize: '0.9rem', marginBottom: 24, fontFamily: 'var(--font-outfit)' }}>
            {isSearching
              ? 'Searching...'
              : searchResults && searchResults.length > 0
                ? `Results for "${searchQuery}"`
                : `No results for "${searchQuery}"`}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 10,
            }}
          >
            {searchResults?.map((result) => (
              <SearchCard key={result.show.id} show={result.show} onSelect={() => handleShowSelect(result.show)} />
            ))}
          </div>
        </div>
      )}

      {/* Browse Mode */}
      {!isSearchMode && !isLoading && !isError && catalog && (
        <>
          <HeroBanner show={catalog.hero} onMoreInfo={() => handleShowSelect(catalog.hero)} />

          <div style={{ marginTop: '-6vw', position: 'relative', zIndex: 3, paddingBottom: 60 }}>
            {catalog.rows.map((row, index) => (
              <ContentRow
                key={row.key}
                title={row.title}
                shows={row.shows}
                onShowSelect={handleShowSelect}
                isTopTen={index === 0}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', padding: '40px 4%' }}>
            <p style={{ color: '#606060', fontSize: '0.75rem', margin: 0 }}>
              Built with TanStack Query + TVMaze API
            </p>
          </div>
        </>
      )}

      {/* Show Detail Modal */}
      <ShowModal showId={selectedShowId} onClose={handleCloseModal} />
    </div>
  )
}

// ── Search Card — landscape thumbnail ────────────────────────────

function SearchCard({ show, onSelect }: { show: TVMazeShow; onSelect: () => void }) {
  if (!show.image) return null

  return (
    <div
      onClick={onSelect}
      style={{
        cursor: 'pointer',
        borderRadius: 6,
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        position: 'relative',
        background: '#1a1a1a',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.5)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      {/* Landscape thumbnail */}
      <div style={{ width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', background: '#2a2a2a' }}>
        <img
          src={show.image.original || show.image.medium}
          alt={show.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            display: 'block',
          }}
        />
      </div>

      {/* Info below */}
      <div style={{ padding: '10px 12px 14px' }}>
        <p style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600, margin: '0 0 4px', fontFamily: 'var(--font-outfit)' }}>
          {show.name}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {show.rating.average && (
            <span style={{ color: '#46d369', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-outfit)' }}>
              {Math.round(show.rating.average * 10)}%
            </span>
          )}
          {show.premiered && (
            <span style={{ color: '#808080', fontSize: '0.72rem', fontFamily: 'var(--font-outfit)' }}>
              {show.premiered.split('-')[0]}
            </span>
          )}
          {show.genres.slice(0, 2).map((g) => (
            <span key={g} style={{ color: '#808080', fontSize: '0.68rem', fontFamily: 'var(--font-outfit)' }}>
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Loading Skeleton ─────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div>
      {/* Hero skeleton */}
      <div
        style={{
          height: '85vh',
          maxHeight: 850,
          background: 'linear-gradient(to right, #1a1a1a 8%, #252525 18%, #1a1a1a 33%)',
          backgroundSize: '800px 100%',
          animation: 'nfxShimmer 1.5s linear infinite',
        }}
      />

      {/* Row skeletons */}
      {[1, 2, 3].map((row) => (
        <div key={row} style={{ padding: '32px 4% 0' }}>
          <div
            style={{
              width: 180,
              height: 22,
              borderRadius: 4,
              marginBottom: 12,
              background: 'linear-gradient(to right, #1a1a1a 8%, #252525 18%, #1a1a1a 33%)',
              backgroundSize: '800px 100%',
              animation: 'nfxShimmer 1.5s linear infinite',
            }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: '0 0 auto',
                  width: 'clamp(200px, 18vw, 320px)',
                  aspectRatio: '16 / 9',
                  borderRadius: 6,
                  background: 'linear-gradient(to right, #1a1a1a 8%, #252525 18%, #1a1a1a 33%)',
                  backgroundSize: '800px 100%',
                  animation: 'nfxShimmer 1.5s linear infinite',
                }}
              />
            ))}
          </div>
        </div>
      ))}

      <style>{`
        @keyframes nfxShimmer {
          0% { background-position: -468px 0; }
          100% { background-position: 468px 0; }
        }
      `}</style>
    </div>
  )
}
