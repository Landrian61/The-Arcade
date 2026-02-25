'use client'

import { useRef, useState, useCallback } from 'react'
import { TVMazeShow, stripHtml } from './tvmaze'

interface ContentRowProps {
  title: string
  shows: TVMazeShow[]
  onShowSelect: (show: TVMazeShow) => void
  isTopTen?: boolean
}

export default function ContentRow({ title, shows, onShowSelect, isTopTen = false }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }, [])

  return (
    <div
      className="nfx-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', marginBottom: '3vw', zIndex: hovered ? 5 : 1 }}
    >
      {/* Row Title */}
      <h3
        style={{
          color: '#e5e5e5',
          fontSize: 'clamp(1.1rem, 1.4vw, 1.5rem)',
          fontWeight: 700,
          fontFamily: 'var(--font-outfit)',
          padding: '0 4%',
          margin: '0 0 0.5rem 0',
        }}
      >
        {title}
      </h3>

      <div style={{ position: 'relative' }}>
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 55,
            background: 'rgba(20,20,20,0.7)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s',
            zIndex: 10,
            borderRadius: '0 4px 4px 0',
            color: '#fff',
            fontSize: '2.5rem',
          }}
        >
          &#8249;
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 55,
            background: 'rgba(20,20,20,0.7)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s',
            zIndex: 10,
            borderRadius: '4px 0 0 4px',
            color: '#fff',
            fontSize: '2.5rem',
          }}
        >
          &#8250;
        </button>

        {/* Scroll track */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: isTopTen ? 12 : 8,
            overflowX: 'auto',
            overflowY: 'visible',
            scrollbarWidth: 'none',
            padding: '1rem 4% 5rem',
          }}
          className="nfx-scroll-hide"
        >
          {shows.map((show, index) =>
            isTopTen ? (
              <TopTenCard
                key={show.id}
                show={show}
                rank={index + 1}
                onSelect={() => onShowSelect(show)}
              />
            ) : (
              <LandscapeCard
                key={show.id}
                show={show}
                onSelect={() => onShowSelect(show)}
              />
            )
          )}
        </div>
      </div>

      {/* Inline style for scrollbar hide — scoped via className */}
      <style>{`
        .nfx-scroll-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Landscape Card — the main Netflix-style thumbnail card
// ─────────────────────────────────────────────────────────────────

function LandscapeCard({ show, onSelect }: { show: TVMazeShow; onSelect: () => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const matchPercent = show.rating.average ? Math.round(show.rating.average * 10) : null
  const desc = stripHtml(show.summary)
  const shortDesc = desc.length > 100 ? desc.slice(0, 100) + '...' : desc

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      style={{
        flex: '0 0 auto',
        width: 'clamp(200px, 18vw, 320px)',
        cursor: 'pointer',
        position: 'relative',
        borderRadius: isHovered ? '6px 6px 0 0' : 6,
        overflow: isHovered ? 'visible' : 'hidden',
        transform: isHovered ? 'scale(1.25)' : 'scale(1)',
        transformOrigin: 'center bottom',
        transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 120ms',
        zIndex: isHovered ? 20 : 1,
        boxShadow: isHovered ? '0 8px 40px rgba(0,0,0,0.7)' : 'none',
      }}
    >
      {/* Landscape image — cropped from the original poster */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          borderRadius: isHovered ? '6px 6px 0 0' : 6,
          background: '#2a2a2a',
          position: 'relative',
        }}
      >
        <img
          src={show.image?.original || show.image?.medium || ''}
          alt={show.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            display: 'block',
            transition: 'opacity 0.3s',
          }}
        />
        {/* Title overlay at bottom of image */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px 12px 10px',
            background: 'linear-gradient(to top, rgba(24,24,24,0.95) 0%, transparent 100%)',
          }}
        >
          <span
            style={{
              color: '#fff',
              fontSize: 'clamp(0.75rem, 0.85vw, 0.95rem)',
              fontWeight: 700,
              fontFamily: 'var(--font-outfit)',
              textShadow: '0 1px 4px rgba(0,0,0,0.8)',
            }}
          >
            {show.name}
          </span>
        </div>
      </div>

      {/* Hover info panel — appears below the card */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#181818',
            padding: '14px 14px 16px',
            borderRadius: '0 0 6px 6px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
            animation: 'nfxSlideDown 200ms ease-out',
          }}
        >
          {/* Action buttons row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            {/* Play */}
            <button style={actionBtnWhite} aria-label="Play">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            {/* Add to list */}
            <button style={actionBtnOutline} aria-label="Add to My List">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            {/* Like */}
            <button style={actionBtnOutline} aria-label="Like">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
            </button>
            <div style={{ flex: 1 }} />
            {/* Expand */}
            <button style={actionBtnOutline} aria-label="More Info" onClick={onSelect}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>

          {/* Meta line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            {matchPercent && (
              <span style={{ color: '#46d369', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-outfit)' }}>
                {matchPercent}% Match
              </span>
            )}
            {show.premiered && (
              <span style={{ color: '#bcbcbc', fontSize: '0.75rem', fontFamily: 'var(--font-outfit)' }}>
                {show.premiered.split('-')[0]}
              </span>
            )}
            {show.runtime && (
              <span
                style={{
                  color: '#bcbcbc',
                  fontSize: '0.65rem',
                  border: '1px solid #808080',
                  borderRadius: 3,
                  padding: '1px 5px',
                  fontFamily: 'var(--font-outfit)',
                }}
              >
                {show.runtime}m
              </span>
            )}
          </div>

          {/* Description */}
          {shortDesc && (
            <p
              style={{
                color: '#b3b3b3',
                fontSize: '0.72rem',
                lineHeight: 1.4,
                margin: '0 0 8px',
                fontFamily: 'var(--font-outfit)',
              }}
            >
              {shortDesc}
            </p>
          )}

          {/* Genre tags */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {show.genres.slice(0, 3).map((g, i) => (
              <span key={g} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {i > 0 && (
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#646464', display: 'inline-block' }} />
                )}
                <span style={{ color: '#ddd', fontSize: '0.68rem', fontFamily: 'var(--font-outfit)' }}>{g}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Keyframes for info panel slide */}
      <style>{`
        @keyframes nfxSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Top 10 Card — portrait poster with large rank number
// ─────────────────────────────────────────────────────────────────

function TopTenCard({ show, rank, onSelect }: { show: TVMazeShow; rank: number; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      style={{
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'flex-end',
        cursor: 'pointer',
        position: 'relative',
        // paddingLeft: rank > 9 ? 60 : 44,
        transition: 'transform 300ms ease',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.08)' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)' }}
    >
  

      {/* Poster */}
      <div
        style={{
          width: 'clamp(110px, 11vw, 175px)',
          aspectRatio: '2 / 3',
          borderRadius: 6,
          overflow: 'hidden',
          position: 'relative',
          zIndex: 2,
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          background: '#2a2a2a',
        }}
      >
        <img
          src={show.image?.medium || ''}
          alt={show.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Shared button styles
// ─────────────────────────────────────────────────────────────────

const actionBtnBase: React.CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  flexShrink: 0,
}

const actionBtnWhite: React.CSSProperties = {
  ...actionBtnBase,
  background: '#fff',
  border: 'none',
  color: '#000',
}

const actionBtnOutline: React.CSSProperties = {
  ...actionBtnBase,
  background: 'rgba(42,42,42,0.6)',
  border: '2px solid rgba(255,255,255,0.5)',
  color: '#fff',
}
