'use client'

import { useState, useEffect, useMemo } from 'react'
import { Box, Typography, IconButton, CircularProgress, Button } from '@mui/material'
import { Close, PlayArrow, Add, ThumbUpOffAlt, VolumeOff } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { useShowDetails, useShowCast, useShowEpisodes } from './useNetflixData'
import { stripHtml, TVMazeEpisode } from './tvmaze'

interface ShowModalProps {
  showId: number | null
  onClose: () => void
}

export default function ShowModal({ showId, onClose }: ShowModalProps) {
  const { data: show, isLoading: showLoading } = useShowDetails(showId)
  const { data: cast } = useShowCast(showId)
  const { data: episodes } = useShowEpisodes(showId)
  const [selectedSeason, setSelectedSeason] = useState(1)

  // Group episodes by season
  const seasons = useMemo(() => {
    if (!episodes) return {}
    return episodes.reduce<Record<number, TVMazeEpisode[]>>((acc, ep) => {
      if (!acc[ep.season]) acc[ep.season] = []
      acc[ep.season].push(ep)
      return acc
    }, {})
  }, [episodes])

  const seasonNumbers = Object.keys(seasons)
    .map(Number)
    .sort((a, b) => a - b)

  // Reset season when opening new show
  useEffect(() => {
    setSelectedSeason(1)
  }, [showId])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showId])

  const description = show ? stripHtml(show.summary) : ''
  const matchPercent = show?.rating.average
    ? Math.round(show.rating.average * 10)
    : null

  return (
    <AnimatePresence>
      {showId && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              zIndex: 1000,
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.96 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: '2%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1001,
              width: '95%',
              maxWidth: '850px',
            }}
          >
            <Box
              sx={{
                bgcolor: '#181818',
                borderRadius: '8px',
                overflow: 'hidden',
                maxHeight: '96vh',
                overflowY: 'auto',
                boxShadow: '0 8px 60px rgba(0,0,0,0.7)',
                scrollbarWidth: 'thin',
                scrollbarColor: '#555 transparent',
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
                '&::-webkit-scrollbar-thumb': {
                  background: '#555',
                  borderRadius: '3px',
                },
              }}
            >
              {showLoading ? (
                <Box
                  sx={{
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress sx={{ color: '#E50914' }} />
                </Box>
              ) : show ? (
                <>
                  {/* Hero Section */}
                  <Box sx={{ position: 'relative', width: '100%', height: { xs: '250px', md: '400px' } }}>
                    {/* Background Image */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${show.image?.original})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 20%',
                      }}
                    />

                    {/* Gradient */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '60%',
                        background: 'linear-gradient(to top, #181818 0%, transparent 100%)',
                      }}
                    />

                    {/* Side gradient */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to right, rgba(24,24,24,0.6) 0%, transparent 40%)',
                      }}
                    />

                    {/* Close Button */}
                    <IconButton
                      onClick={onClose}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: '#181818',
                        color: '#fff',
                        zIndex: 5,
                        width: 36,
                        height: 36,
                        '&:hover': { bgcolor: '#333' },
                      }}
                    >
                      <Close sx={{ fontSize: 20 }} />
                    </IconButton>

                    {/* Volume Icon */}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 40,
                        right: 16,
                        border: '1px solid #808080',
                        color: '#fff',
                        zIndex: 5,
                        width: 36,
                        height: 36,
                      }}
                    >
                      <VolumeOff sx={{ fontSize: 20 }} />
                    </IconButton>

                    {/* Content on hero */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 20,
                        left: 24,
                        right: 80,
                        zIndex: 4,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#fff',
                          fontSize: { xs: '1.5rem', md: '2.2rem' },
                          fontWeight: 800,
                          fontFamily: 'var(--font-outfit)',
                          lineHeight: 1.1,
                          mb: 2,
                          textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
                        }}
                      >
                        {show.name}
                      </Typography>

                      {/* Buttons */}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          startIcon={<PlayArrow />}
                          sx={{
                            bgcolor: '#fff',
                            color: '#000',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            fontFamily: 'var(--font-outfit)',
                            px: 3,
                            py: 0.7,
                            borderRadius: '4px',
                            textTransform: 'none',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.75)' },
                          }}
                        >
                          Play
                        </Button>
                        <IconButton
                          sx={{
                            border: '2px solid #808080',
                            color: '#fff',
                            '&:hover': { borderColor: '#fff' },
                          }}
                        >
                          <Add />
                        </IconButton>
                        <IconButton
                          sx={{
                            border: '2px solid #808080',
                            color: '#fff',
                            '&:hover': { borderColor: '#fff' },
                          }}
                        >
                          <ThumbUpOffAlt />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>

                  {/* Details Section */}
                  <Box sx={{ p: { xs: 2.5, md: 4 }, pt: { xs: 1, md: 1 } }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 2, md: 4 },
                      }}
                    >
                      {/* Left column */}
                      <Box sx={{ flex: 2 }}>
                        {/* Meta row */}
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, flexWrap: 'wrap' }}
                        >
                          {matchPercent && (
                            <Typography
                              sx={{
                                color: '#46d369',
                                fontSize: '0.95rem',
                                fontWeight: 700,
                                fontFamily: 'var(--font-outfit)',
                              }}
                            >
                              {matchPercent}% Match
                            </Typography>
                          )}
                          {show.premiered && (
                            <Typography
                              sx={{ color: '#bcbcbc', fontSize: '0.9rem', fontFamily: 'var(--font-outfit)' }}
                            >
                              {show.premiered.split('-')[0]}
                              {show.ended ? ` - ${show.ended.split('-')[0]}` : ''}
                            </Typography>
                          )}
                          {show.runtime && (
                            <Typography
                              sx={{ color: '#bcbcbc', fontSize: '0.9rem', fontFamily: 'var(--font-outfit)' }}
                            >
                              {show.runtime}m
                            </Typography>
                          )}
                          {episodes && (
                            <Box
                              sx={{
                                border: '1px solid #808080',
                                borderRadius: '3px',
                                px: 0.8,
                                py: 0.1,
                              }}
                            >
                              <Typography
                                sx={{
                                  color: '#bcbcbc',
                                  fontSize: '0.75rem',
                                  fontFamily: 'var(--font-outfit)',
                                }}
                              >
                                {seasonNumbers.length} Season{seasonNumbers.length !== 1 ? 's' : ''}
                              </Typography>
                            </Box>
                          )}
                        </Box>

                        {/* Status badge */}
                        {show.status && (
                          <Box
                            sx={{
                              display: 'inline-block',
                              bgcolor:
                                show.status === 'Running'
                                  ? 'rgba(70, 211, 105, 0.15)'
                                  : 'rgba(255,255,255,0.08)',
                              border:
                                show.status === 'Running'
                                  ? '1px solid rgba(70, 211, 105, 0.3)'
                                  : '1px solid rgba(255,255,255,0.15)',
                              borderRadius: '4px',
                              px: 1,
                              py: 0.3,
                              mb: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                color: show.status === 'Running' ? '#46d369' : '#bcbcbc',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                fontFamily: 'var(--font-outfit)',
                              }}
                            >
                              {show.status}
                            </Typography>
                          </Box>
                        )}

                        <Typography
                          sx={{
                            color: '#ddd',
                            fontSize: '0.95rem',
                            fontFamily: 'var(--font-outfit)',
                            lineHeight: 1.6,
                          }}
                        >
                          {description}
                        </Typography>
                      </Box>

                      {/* Right column */}
                      <Box sx={{ flex: 1, minWidth: '180px' }}>
                        {cast && cast.length > 0 && (
                          <Box sx={{ mb: 1.5 }}>
                            <Typography
                              component="span"
                              sx={{ color: '#777', fontSize: '0.85rem', fontFamily: 'var(--font-outfit)' }}
                            >
                              Cast:{' '}
                            </Typography>
                            <Typography
                              component="span"
                              sx={{ color: '#ddd', fontSize: '0.85rem', fontFamily: 'var(--font-outfit)' }}
                            >
                              {cast
                                .slice(0, 5)
                                .map((c) => c.person.name)
                                .join(', ')}
                            </Typography>
                          </Box>
                        )}
                        <Box sx={{ mb: 1.5 }}>
                          <Typography
                            component="span"
                            sx={{ color: '#777', fontSize: '0.85rem', fontFamily: 'var(--font-outfit)' }}
                          >
                            Genres:{' '}
                          </Typography>
                          <Typography
                            component="span"
                            sx={{ color: '#ddd', fontSize: '0.85rem', fontFamily: 'var(--font-outfit)' }}
                          >
                            {show.genres.join(', ')}
                          </Typography>
                        </Box>
                        {show.language && (
                          <Box sx={{ mb: 1.5 }}>
                            <Typography
                              component="span"
                              sx={{ color: '#777', fontSize: '0.85rem', fontFamily: 'var(--font-outfit)' }}
                            >
                              Language:{' '}
                            </Typography>
                            <Typography
                              component="span"
                              sx={{ color: '#ddd', fontSize: '0.85rem', fontFamily: 'var(--font-outfit)' }}
                            >
                              {show.language}
                            </Typography>
                          </Box>
                        )}
                        {show.network && (
                          <Box>
                            <Typography
                              component="span"
                              sx={{ color: '#777', fontSize: '0.85rem', fontFamily: 'var(--font-outfit)' }}
                            >
                              Network:{' '}
                            </Typography>
                            <Typography
                              component="span"
                              sx={{ color: '#ddd', fontSize: '0.85rem', fontFamily: 'var(--font-outfit)' }}
                            >
                              {show.network.name}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>

                    {/* Episodes Section */}
                    {episodes && seasonNumbers.length > 0 && (
                      <Box sx={{ mt: 4 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2,
                          }}
                        >
                          <Typography
                            sx={{
                              color: '#fff',
                              fontSize: '1.3rem',
                              fontWeight: 700,
                              fontFamily: 'var(--font-outfit)',
                            }}
                          >
                            Episodes
                          </Typography>

                          {/* Season Selector */}
                          <Box
                            component="select"
                            value={selectedSeason}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                              setSelectedSeason(Number(e.target.value))
                            }
                            sx={{
                              bgcolor: '#242424',
                              color: '#fff',
                              border: '1px solid #808080',
                              borderRadius: '4px',
                              px: 1.5,
                              py: 0.8,
                              fontSize: '0.85rem',
                              fontFamily: 'var(--font-outfit)',
                              fontWeight: 600,
                              outline: 'none',
                              cursor: 'pointer',
                              '&:hover': { borderColor: '#fff' },
                            }}
                          >
                            {seasonNumbers.map((s) => (
                              <option key={s} value={s}>
                                Season {s}
                              </option>
                            ))}
                          </Box>
                        </Box>

                        {/* Episode List */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          {(seasons[selectedSeason] || []).map((ep) => (
                            <EpisodeCard key={ep.id} episode={ep} />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Cast Section with Avatars */}
                    {cast && cast.length > 0 && (
                      <Box sx={{ mt: 4 }}>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            fontFamily: 'var(--font-outfit)',
                            mb: 2,
                          }}
                        >
                          Cast
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 2,
                            overflowX: 'auto',
                            pb: 1,
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': { display: 'none' },
                          }}
                        >
                          {cast.slice(0, 12).map((member) => (
                            <Box
                              key={member.person.id}
                              sx={{
                                flex: '0 0 auto',
                                textAlign: 'center',
                                width: '80px',
                              }}
                            >
                              <Box
                                sx={{
                                  width: 64,
                                  height: 64,
                                  borderRadius: '50%',
                                  mx: 'auto',
                                  mb: 0.5,
                                  overflow: 'hidden',
                                  bgcolor: '#333',
                                }}
                              >
                                {member.person.image ? (
                                  <Box
                                    component="img"
                                    src={member.person.image.medium}
                                    alt={member.person.name}
                                    loading="lazy"
                                    sx={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                    }}
                                  />
                                ) : (
                                  <Box
                                    sx={{
                                      width: '100%',
                                      height: '100%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: '#808080',
                                      fontSize: '1.2rem',
                                      fontWeight: 700,
                                    }}
                                  >
                                    {member.person.name[0]}
                                  </Box>
                                )}
                              </Box>
                              <Typography
                                sx={{
                                  color: '#ddd',
                                  fontSize: '0.7rem',
                                  fontFamily: 'var(--font-outfit)',
                                  lineHeight: 1.2,
                                }}
                              >
                                {member.person.name}
                              </Typography>
                              <Typography
                                sx={{
                                  color: '#808080',
                                  fontSize: '0.6rem',
                                  fontFamily: 'var(--font-outfit)',
                                }}
                              >
                                {member.character.name}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Bottom spacing */}
                    <Box sx={{ height: '24px' }} />
                  </Box>
                </>
              ) : null}
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Episode Card ─────────────────────────────────────────────────

function EpisodeCard({ episode }: { episode: TVMazeEpisode }) {
  const description = stripHtml(episode.summary)
  const truncated = description.length > 150 ? description.slice(0, 150) + '...' : description

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        borderBottom: '1px solid #333',
        transition: 'background 0.2s',
        borderRadius: '4px',
        '&:hover': { bgcolor: '#2a2a2a' },
      }}
    >
      {/* Episode Number */}
      <Box
        sx={{
          flex: '0 0 auto',
          width: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{ color: '#808080', fontSize: '1.1rem', fontFamily: 'var(--font-outfit)', fontWeight: 500 }}
        >
          {episode.number ?? '-'}
        </Typography>
      </Box>

      {/* Episode Thumbnail */}
      {episode.image && (
        <Box
          sx={{
            flex: '0 0 auto',
            width: { xs: '100px', md: '130px' },
            height: { xs: '56px', md: '73px' },
            borderRadius: '4px',
            overflow: 'hidden',
            bgcolor: '#333',
            position: 'relative',
          }}
        >
          <Box
            component="img"
            src={episode.image.medium}
            alt={episode.name}
            loading="lazy"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 1 },
              bgcolor: 'rgba(0,0,0,0.5)',
            }}
          >
            <PlayArrow sx={{ color: '#fff', fontSize: 30 }} />
          </Box>
        </Box>
      )}

      {/* Episode Info */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography
            sx={{
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 600,
              fontFamily: 'var(--font-outfit)',
              mb: 0.5,
            }}
          >
            {episode.name}
          </Typography>
          {episode.runtime && (
            <Typography
              sx={{
                color: '#808080',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-outfit)',
                flex: '0 0 auto',
                ml: 1,
              }}
            >
              {episode.runtime}m
            </Typography>
          )}
        </Box>
        <Typography
          sx={{
            color: '#999',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-outfit)',
            lineHeight: 1.4,
            display: { xs: 'none', sm: '-webkit-box' },
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {truncated}
        </Typography>
      </Box>
    </Box>
  )
}
