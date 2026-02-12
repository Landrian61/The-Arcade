'use client'

import { TVMazeShow, stripHtml } from './tvmaze'

interface HeroBannerProps {
  show: TVMazeShow
  onMoreInfo: () => void
}

export default function HeroBanner({ show, onMoreInfo }: HeroBannerProps) {
  const description = stripHtml(show.summary)
  const truncatedDesc =
    description.length > 220 ? description.slice(0, 220) + '...' : description

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '85vh',
        maxHeight: '850px',
        minHeight: '450px',
        overflow: 'hidden',
      }}
    >
      {/* Blurred expanded background — fills the entire hero */}
      <div
        style={{
          position: 'absolute',
          inset: '-20px',
          backgroundImage: `url(${show.image?.original})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 15%',
          filter: 'blur(20px) brightness(0.35)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Sharp poster — positioned on the right */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '4%',
          bottom: 0,
          width: '45%',
          maxWidth: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={show.image?.original || ''}
          alt=""
          style={{
            maxHeight: '80%',
            maxWidth: '100%',
            objectFit: 'contain',
            borderRadius: 8,
            boxShadow: '0 12px 60px rgba(0,0,0,0.6)',
            opacity: 0.45,
          }}
        />
      </div>

      {/* Left-to-right vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(20,20,20,0.98) 0%, rgba(20,20,20,0.7) 35%, rgba(20,20,20,0.2) 65%, rgba(20,20,20,0.05) 100%)',
        }}
      />

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '45%',
          background: 'linear-gradient(to top, #141414 0%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 4%',
          maxWidth: 650,
        }}
      >
        {/* Network badge */}
        {show.network && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 4, height: 22, background: '#E50914', borderRadius: 2 }} />
            <span
              style={{
                color: '#ccc',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-outfit)',
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              {show.network.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            color: '#fff',
            fontSize: 'clamp(2.2rem, 4vw, 4rem)',
            fontWeight: 800,
            fontFamily: 'var(--font-outfit)',
            lineHeight: 1.05,
            margin: '0 0 14px',
            textShadow: '2px 4px 12px rgba(0,0,0,0.7)',
          }}
        >
          {show.name}
        </h1>

        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
          {show.rating.average && (
            <span style={{ color: '#46d369', fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-outfit)' }}>
              {Math.round(show.rating.average * 10)}% Match
            </span>
          )}
          {show.premiered && (
            <span style={{ color: '#bcbcbc', fontSize: '0.95rem', fontFamily: 'var(--font-outfit)' }}>
              {show.premiered.split('-')[0]}
            </span>
          )}
          {show.runtime && (
            <span
              style={{
                color: '#bcbcbc',
                fontSize: '0.8rem',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: 3,
                padding: '2px 8px',
                fontFamily: 'var(--font-outfit)',
              }}
            >
              {show.runtime} min
            </span>
          )}
          {show.genres.slice(0, 2).map((g) => (
            <span
              key={g}
              style={{
                color: '#bcbcbc',
                fontSize: '0.8rem',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 3,
                padding: '2px 8px',
                fontFamily: 'var(--font-outfit)',
              }}
            >
              {g}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          style={{
            color: '#e0e0e0',
            fontSize: 'clamp(0.85rem, 1.1vw, 1.1rem)',
            fontFamily: 'var(--font-outfit)',
            lineHeight: 1.55,
            margin: '0 0 28px',
            textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            maxWidth: 550,
          }}
        >
          {truncatedDesc}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: 4,
              padding: '10px 28px',
              fontSize: '1.05rem',
              fontWeight: 700,
              fontFamily: 'var(--font-outfit)',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.75)' }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = '#fff' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>
          <button
            onClick={onMoreInfo}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(109,109,110,0.7)',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '10px 28px',
              fontSize: '1.05rem',
              fontWeight: 700,
              fontFamily: 'var(--font-outfit)',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = 'rgba(109,109,110,0.4)' }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = 'rgba(109,109,110,0.7)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}
