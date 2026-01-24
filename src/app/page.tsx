'use client'

import { useArcadeStore } from '@/store/useArcadeStore'
import { Box, Container, Typography, Card, CardContent, Button, Grid, Chip, useTheme, alpha } from '@mui/material'
import { PlayArrow, Settings, SportsEsports, RocketLaunch, ErrorOutline, WarningAmber, AutoStories } from '@mui/icons-material'
import Link from 'next/link'
import { keyframes } from '@mui/system'
import { useState, useEffect } from 'react'

// Animations
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`

const glitch = keyframes`
  0% { transform: translate(0); text-shadow: -2px 0 red, 2px 0 blue; }
  2% { transform: translate(-2px, 2px); text-shadow: 2px 0 red, -2px 0 blue; }
  4% { transform: translate(2px, -2px); text-shadow: -2px 0 red, 2px 0 blue; }
  6% { transform: translate(0); text-shadow: -2px 0 red, 2px 0 blue; }
  100% { transform: translate(0); text-shadow: -2px 0 red, 2px 0 blue; }
`

const chaosShake = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); filter: hue-rotate(0deg); }
  25% { transform: translate(5px, 5px) rotate(5deg); filter: hue-rotate(90deg) invert(0.2); }
  50% { transform: translate(-5px, -5px) rotate(-5deg); filter: hue-rotate(180deg) invert(0.5); }
  75% { transform: translate(5px, -5px) rotate(5deg); filter: hue-rotate(270deg) invert(0.8); }
  100% { transform: translate(0, 0) rotate(0deg); filter: hue-rotate(360deg); }
`

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`

// Components
const players = [
  {
    name: 'Landrian',
    route: '/playground/landrian',
    description: 'Digital Graffiti Artist & Code Wizard',
    color: '#d62828',
    icon: <SportsEsports sx={{ fontSize: 40 }} />
  },
  {
    name: 'Template',
    route: '/playground/template',
    description: 'Your Canvas Awaits. Copy to Start.',
    color: '#f77f00',
    icon: <RocketLaunch sx={{ fontSize: 40 }} />
  },
  {
    name: 'Chrisppa',
    route: '/playground/chrisppa',
    description: 'My Diary.',
    color: '#f77f00',
    icon: <AutoStories sx={{ fontSize: 40 }} />
  },
]

export default function Lobby() {
  // ZUSTAND CONSUMPTION
  // We use the hook to select specific pieces of state and actions we need.
  // This component will re-render ONLY when these specific values change.
  const { globalChaosMode, arcadeScore, toggleChaos } = useArcadeStore()

  const theme = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch for randomness
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: globalChaosMode
          ? '#000'
          : 'linear-gradient(135deg, #003049 0%, #021a29 100%)',
        transition: 'background 0.3s ease',
        overflowX: 'hidden',
        position: 'relative',
        color: '#eae2b7',
        fontFamily: 'var(--font-outfit)',
      }}
    >
      {/* CHAOS MODE OVERLAYS */}
      {globalChaosMode && (
        <>
          {/* Glitchy Background */}
          <Box sx={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)',
            opacity: 0.05,
            pointerEvents: 'none',
            animation: `${scanline} 0.2s linear infinite`,
            zIndex: 0
          }} />
           <Box sx={{
            position: 'absolute', inset: 0,
            background: 'url("https://media.giphy.com/media/xT9IgkC8G3a7a93tOE/giphy.gif")', // Static/Noise gif or similar pattern
            opacity: 0.1,
            backgroundSize: 'cover',
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
            zIndex: 0
          }} />
        </>
      )}

      {/* Decorative Background Elements (Normal Mode) */}
      {!globalChaosMode && (
        <>
          <Box sx={{
            position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(214, 40, 40, 0.15) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(60px)',
          }} />
          <Box sx={{
            position: 'absolute', bottom: '-20%', right: '-10%', width: '700px', height: '700px',
            background: 'radial-gradient(circle, rgba(247, 127, 0, 0.1) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(80px)',
          }} />
        </>
      )}

      <Container maxWidth="lg" sx={{ 
        pt: 12, pb: 12, position: 'relative', zIndex: 1, 
        animation: globalChaosMode ? `${chaosShake} 0.5s infinite` : 'none',
        filter: globalChaosMode ? 'contrast(2) brightness(1.5)' : 'none'
      }}>
        
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          {/* TITLE */}
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '4rem', md: '9rem' },
                color: globalChaosMode ? '#ff00ff' : '#fcbf49',
                mb: 1,
                textShadow: globalChaosMode 
                   ? '4px 4px 0 #00ffff, -4px -4px 0 #ff0000' 
                   : '0 0 30px rgba(252, 191, 73, 0.3), 4px 4px 0px #d62828',
                fontFamily: 'var(--font-permanent-marker)',
                letterSpacing: '4px',
                animation: globalChaosMode 
                   ? `${glitch} 0.3s infinite` 
                   : `${float} 6s ease-in-out infinite`,
                position: 'relative',
                zIndex: 2,
              }}
            >
              {globalChaosMode ? "SYSTEM FAILURE" : "THE ARCADE"}
            </Typography>
            {/* Clone for glitch effect layers */}
            {globalChaosMode && (
               <Typography variant="h1" sx={{
                 position: 'absolute', top: 0, left: -5, opacity: 0.7, color: '#00ffff',
                 fontSize: { xs: '4rem', md: '9rem' },
                 fontFamily: 'var(--font-permanent-marker)',
                 animation: `${glitch} 0.4s infinite reverse`,
                 zIndex: 1
               }}>
                  SYSTEM FAILURE
               </Typography>
            )}
          </Box>

          <Typography
            variant="h5"
            sx={{
              color: globalChaosMode ? '#00ff00' : '#eae2b7',
              mb: 6,
              fontFamily: globalChaosMode ? 'Courier New' : 'var(--font-outfit)',
              letterSpacing: globalChaosMode ? '5px' : '2px',
              fontWeight: 300,
              textTransform: 'uppercase',
              opacity: 0.8,
            }}
          >
            {globalChaosMode ? "ERROR: REALITY CORRUPTED" : "Select Your Player"}
          </Typography>

          {/* Stats Bar */}
          <Box 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 3, 
              mb: 6,
              background: globalChaosMode ? 'black' : 'rgba(255, 255, 255, 0.05)',
              border: globalChaosMode ? '2px solid red' : '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              padding: '12px 24px',
              borderRadius: '50px',
              boxShadow: globalChaosMode ? '0 0 20px red' : '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
              transform: globalChaosMode ? 'rotate(-2deg)' : 'none'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
               <Typography variant="overline" sx={{ color: '#f77f00', fontWeight: 'bold', fontSize: '0.9rem' }}>
                 High Score
               </Typography>
               <Typography variant="h6" sx={{ color: '#eae2b7', fontWeight: 'bold' }}>
                 {arcadeScore.toString().padStart(4, '0')}
               </Typography>
            </Box>

            <Box sx={{ width: '1px', height: '24px', bgcolor: 'rgba(255,255,255,0.2)' }} />

            <Button
              variant="text"
              startIcon={globalChaosMode ? <WarningAmber /> : <Settings />}
              onClick={toggleChaos}
              sx={{
                color: globalChaosMode ? '#ff0000' : alpha('#eae2b7', 0.7),
                fontWeight: globalChaosMode ? 'bold' : 'normal',
                '&:hover': {
                  color: globalChaosMode ? '#ff0000' : '#fcbf49',
                  background: 'transparent',
                  textShadow: globalChaosMode ? '0 0 10px red' : 'none'
                },
              }}
            >
              {globalChaosMode ? "ABORT CHAOS" : "Chaos Mode"}
            </Button>
          </Box>
        </Box>

        <Grid container spacing={6} justifyContent="center">
          {players.map((player) => (
            <Grid 
              item xs={12} sm={6} md={5} key={player.name}
              sx={{
                transform: globalChaosMode ? `rotate(${Math.random() * 20 - 10}deg)` : 'none',
                transition: 'all 0.5s ease'
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  background: globalChaosMode ? '#111' : 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: globalChaosMode ? '2px solid red' : `1px solid ${alpha(player.color, 0.3)}`,
                  borderRadius: '24px',
                  overflow: 'visible',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    background: `linear-gradient(135deg, ${alpha(player.color, 0.1)} 0%, ${alpha(player.color, 0.05)} 100%)`,
                    border: `1px solid ${player.color}`,
                    boxShadow: `0 20px 50px -10px ${alpha(player.color, 0.3)}`,
                    '& .play-button': {
                       transform: 'scale(1.1)',
                       background: player.color,
                       color: '#fff',
                       boxShadow: `0 0 20px ${alpha(player.color, 0.6)}`
                    }
                  },
                }}
              >
                <CardContent sx={{ p: 5, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <Box 
                    sx={{
                      mb: 3,
                      p: 2,
                      borderRadius: '50%',
                      background: alpha(player.color, 0.1),
                      color: player.color,
                      display: 'inline-flex',
                    }}
                  >
                    {globalChaosMode ? <ErrorOutline sx={{ fontSize: 40, color: 'red' }} /> : player.icon}
                  </Box>
                  
                  <Typography
                    variant="h3"
                    sx={{
                      color: globalChaosMode ? 'red' : '#eae2b7',
                      mb: 1,
                      fontFamily: 'var(--font-permanent-marker)',
                      letterSpacing: '1px',
                    }}
                  >
                    {globalChaosMode ? "UNKNOWN" : player.name}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: alpha('#eae2b7', 0.7),
                      mb: 4,
                      lineHeight: 1.6,
                      fontSize: '1.1rem',
                      fontFamily: 'var(--font-outfit)',
                      flexGrow: 1,
                    }}
                  >
                     {globalChaosMode ? "??? ?? ?????? ????" : player.description}
                  </Typography>

                  <Link href={player.route} style={{ textDecoration: 'none', width: '100%' }}>
                    <Button
                      className="play-button"
                      variant="contained"
                      fullWidth
                      endIcon={globalChaosMode ? <WarningAmber /> : <PlayArrow />}
                      sx={{
                        bgcolor: globalChaosMode ? 'red' : 'rgba(255,255,255,0.1)',
                        color: globalChaosMode ? 'black' : player.color,
                        borderRadius: '12px',
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        border: globalChaosMode ? '2px solid black' : `1px solid ${alpha(player.color, 0.2)}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                           bgcolor: player.color,
                        }
                      }}
                    >
                       {globalChaosMode ? "ENTER AT RISK" : "Enter World"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
