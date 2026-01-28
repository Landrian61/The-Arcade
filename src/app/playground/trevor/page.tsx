'use client'

import { useEffect, useState, useCallback } from 'react'
import { Box, Typography, Button, IconButton, alpha } from '@mui/material'
import { keyframes } from '@mui/system'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import Link from 'next/link'

import { usePixelInvadersStore } from '@/store/usePixelInvadersStore'
import { useArcadeStore } from '@/store/useArcadeStore'
import CRTMonitor from '@/components/pixel-invaders/CRTMonitor'
import GameCanvas from '@/components/pixel-invaders/GameCanvas'
import TitleScreen from '@/components/pixel-invaders/TitleScreen'
import GameOverScreen from '@/components/pixel-invaders/GameOverScreen'
import ControlPad from '@/components/pixel-invaders/ControlPad'

// Neon sign flicker
const neonFlicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor;
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
`

// Pause overlay animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

export default function PixelInvadersPage() {
  const [mounted, setMounted] = useState(false)
  const [showPauseMenu, setShowPauseMenu] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  // Game store
  const gameState = usePixelInvadersStore((s) => s.gameState)
  const startGame = usePixelInvadersStore((s) => s.startGame)
  const pauseGame = usePixelInvadersStore((s) => s.pauseGame)
  const resumeGame = usePixelInvadersStore((s) => s.resumeGame)
  const resetGame = usePixelInvadersStore((s) => s.resetGame)
  const soundEnabled = usePixelInvadersStore((s) => s.soundEnabled)
  const toggleSound = usePixelInvadersStore((s) => s.toggleSound)
  const crtEffectsEnabled = usePixelInvadersStore((s) => s.crtEffectsEnabled)
  const movePlayer = usePixelInvadersStore((s) => s.movePlayer)
  const fireProjectile = usePixelInvadersStore((s) => s.fireProjectile)
  const player = usePixelInvadersStore((s) => s.player)

  // Arcade store for global score
  const arcadeScore = useArcadeStore((s) => s.arcadeScore)

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), [])

  // Handle start game with space key on title screen
  useEffect(() => {
    if (gameState !== 'idle') return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        startGame()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, startGame])

  // Screen shake when player loses a life
  useEffect(() => {
    if (player.isInvulnerable && gameState === 'playing') {
      setIsShaking(true)
      const timeout = setTimeout(() => setIsShaking(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [player.isInvulnerable, gameState])

  // Handle pause
  const handlePause = useCallback(() => {
    pauseGame()
    setShowPauseMenu(true)
  }, [pauseGame])

  const handleResume = useCallback(() => {
    setShowPauseMenu(false)
    resumeGame()
  }, [resumeGame])

  const handleRestart = useCallback(() => {
    setShowPauseMenu(false)
    resetGame()
    startGame()
  }, [resetGame, startGame])

  const handleHome = useCallback(() => {
    resetGame()
  }, [resetGame])

  if (!mounted) return null

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a0a1a 100%)',
        display: 'flex',
        flexDirection: 'column',
        color: '#eae2b7',
        fontFamily: 'var(--font-outfit)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid rgba(0, 255, 0, 0.1)',
        }}
      >
        {/* Back button */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{
              color: alpha('#00ff00', 0.7),
              fontFamily: 'monospace',
              '&:hover': { color: '#00ff00', bgcolor: alpha('#00ff00', 0.1) },
            }}
          >
            Lobby
          </Button>
        </Link>

        {/* Title */}
        <Typography
          sx={{
            fontFamily: 'var(--font-permanent-marker), monospace',
            fontSize: { xs: '1rem', sm: '1.5rem' },
            color: '#00ff00',
            animation: `${neonFlicker} 4s infinite`,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          PIXEL INVADERS
        </Typography>

        {/* Controls */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {/* Arcade Score */}
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: '12px',
              color: alpha('#fcbf49', 0.8),
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Arcade: {arcadeScore}
          </Typography>

          {/* Sound toggle */}
          <IconButton onClick={toggleSound} sx={{ color: alpha('#00ff00', 0.7) }}>
            {soundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>

          {/* Pause button (only when playing) */}
          {gameState === 'playing' && (
            <IconButton onClick={handlePause} sx={{ color: alpha('#00ff00', 0.7) }}>
              <PauseIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Main Game Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 1, sm: 2, md: 4 },
          py: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: 700, md: 900, lg: 1000 },
            height: { xs: 'calc(100vh - 140px)', sm: 'calc(100vh - 120px)' },
            maxHeight: { xs: 500, sm: 600, md: 700, lg: 750 },
            position: 'relative',
          }}
        >
          <CRTMonitor
            glowColor="#00ff00"
            scanlines={crtEffectsEnabled}
            flicker={crtEffectsEnabled}
            curvature={crtEffectsEnabled}
            shake={isShaking}
            width="100%"
            height="100%"
          >
            {/* Game States */}
            {gameState === 'idle' && <TitleScreen onStart={startGame} />}

            {(gameState === 'playing' || gameState === 'paused') && (
              <>
                <GameCanvas onPause={handlePause} />

                {/* Mobile Controls */}
                <ControlPad
                  onMoveLeft={() => movePlayer('left')}
                  onMoveRight={() => movePlayer('right')}
                  onFire={fireProjectile}
                  disabled={gameState === 'paused'}
                />
              </>
            )}

            {gameState === 'gameOver' && <GameOverScreen onRestart={handleRestart} onHome={handleHome} />}

            {/* Pause Overlay */}
            {showPauseMenu && gameState === 'paused' && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: alpha('#000', 0.9),
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                  zIndex: 300,
                  animation: `${fadeIn} 0.2s ease`,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'var(--font-permanent-marker), monospace',
                    fontSize: '2.5rem',
                    color: '#fcbf49',
                    textShadow: '0 0 10px #fcbf49',
                  }}
                >
                  PAUSED
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    onClick={handleResume}
                    sx={{
                      fontFamily: 'var(--font-permanent-marker), monospace',
                      fontSize: '1rem',
                      px: 4,
                      bgcolor: '#00ff00',
                      color: '#000',
                      '&:hover': { bgcolor: '#00cc00' },
                    }}
                  >
                    RESUME
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={handleRestart}
                    sx={{
                      fontFamily: 'monospace',
                      color: '#f77f00',
                      borderColor: '#f77f00',
                      '&:hover': { bgcolor: alpha('#f77f00', 0.1) },
                    }}
                  >
                    RESTART
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={handleHome}
                    sx={{
                      fontFamily: 'monospace',
                      color: alpha('#fff', 0.6),
                      borderColor: alpha('#fff', 0.3),
                      '&:hover': { bgcolor: alpha('#fff', 0.05) },
                    }}
                  >
                    QUIT TO MENU
                  </Button>
                </Box>

                <Typography sx={{ fontFamily: 'monospace', fontSize: '11px', color: alpha('#fff', 0.4), mt: 2 }}>
                  Press ESC or P to resume
                </Typography>
              </Box>
            )}
          </CRTMonitor>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: 'center',
          py: 1,
          borderTop: '1px solid rgba(0, 255, 0, 0.1)',
        }}
      >
        <Typography sx={{ fontFamily: 'monospace', fontSize: '10px', color: alpha('#00ff00', 0.4) }}>
          [←][→] Move • [SPACE] Fire • [ESC] Pause
        </Typography>
      </Box>
    </Box>
  )
}
