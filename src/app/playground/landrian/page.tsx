'use client'

import { useArcadeStore } from '@/store/useArcadeStore'
import { Box, Container, Typography, Fab, Card, CardContent, Button, useTheme, alpha, Tabs, Tab, Avatar, Chip } from '@mui/material'
import { FormatPaint, MusicNote, Favorite, Code, Brush, Psychology, Lightbulb, Refresh, SportsEsports, Movie } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { keyframes } from '@mui/system'
import MovieBrowser from './components/MovieBrowser'

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

const glow = keyframes`
  0% { box-shadow: 0 0 5px #f77f00, 0 0 10px #f77f00; }
  50% { box-shadow: 0 0 20px #fcbf49, 0 0 30px #fcbf49; }
  100% { box-shadow: 0 0 5px #f77f00, 0 0 10px #f77f00; }
`

const graffitiFont = 'var(--font-permanent-marker)'
const cleanFont = 'var(--font-outfit)'
const glitchFont = 'var(--font-rubik-glitch)'

export default function LandrianPage() {
  // ZUSTAND: Destructuring state and actions from our store
  const { arcadeScore, incrementScore, quotes, currentQuoteIndex, nextQuote } = useArcadeStore()

  const [sprayActive, setSprayActive] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState(0)
  const theme = useTheme()

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSpray = () => {
    setSprayActive(true)
    incrementScore()
    setTimeout(() => setSprayActive(false), 300)
  }

  // Common glassmorphism style
  const glassCardStyle = (borderColor: string) => ({
    background: alpha(theme.palette.primary.main, 0.7), // Darker base
    backdropFilter: 'blur(16px)',
    border: `1px solid ${borderColor}`,
    borderRadius: '24px',
    boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.5)`,
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    height: '100%',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: `0 15px 45px 0 ${alpha(borderColor, 0.3)}`,
      borderColor: '#eae2b7',
    }
  })

  // Specific style for the Quote section to make it pop
  const quoteCardStyle = {
    background: 'linear-gradient(135deg, rgba(214, 40, 40, 0.9) 0%, rgba(247, 127, 0, 0.9) 100%)',
    backdropFilter: 'blur(20px)',
    border: '2px solid #fcbf49',
    borderRadius: '24px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    color: '#eae2b7',
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        color: '#eae2b7',
        fontFamily: cleanFont,
      }}
    >
      {/* Background Image Layer */}
      <Box
        component="div"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -2,
          backgroundImage: `url('https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1974&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5) contrast(1.2) sepia(0.2)',
          transform: `scale(1.1) translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
        }}
      />

      <Container maxWidth="xl" sx={{ pt: 10, pb: 12, position: 'relative', zIndex: 1, px: { xs: 2, md: 6 } }}>

        {/* ── Tab Navigation ── */}
        <Tabs
          value={activeTab}
          onChange={(_, val: number) => setActiveTab(val)}
          sx={{
            mb: 6,
            borderBottom: '2px solid rgba(247,127,0,0.3)',
            '& .MuiTabs-indicator': { bgcolor: '#f77f00', height: 3 },
            '& .MuiTab-root': {
              color: 'rgba(234,226,183,0.5)',
              fontFamily: graffitiFont,
              fontSize: '1rem',
              textTransform: 'none',
              '&.Mui-selected': { color: '#fcbf49' },
            },
          }}
        >
          <Tab label="Playground" icon={<SportsEsports />} iconPosition="start" />
          <Tab label="Movie Vault" icon={<Movie />} iconPosition="start" />
        </Tabs>

        {/* ── Movie Vault Tab ── */}
        {activeTab === 1 && (
          <Box
            sx={{
              background: 'rgba(0,16,28,0.7)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(247,127,0,0.3)',
              borderRadius: 4,
              p: { xs: 3, md: 4 },
            }}
          >
            <MovieBrowser />
          </Box>
        )}

        {/* ── Playground Tab ── */}
        {activeTab === 0 && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '350px 1fr' }, gap: 6 }}>
          
          {/* LEFT COLUMN: Profile & Bio */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
             {/* Profile Card */}
             <Card sx={{ ...glassCardStyle('#eae2b7'), textAlign: 'center', p: 4, position: 'relative' }}>
                <Box sx={{ 
                   position: 'absolute', 
                   top: 0, left: 0, right: 0, height: '100px', 
                   background: 'linear-gradient(90deg, #d62828, #f77f00)',
                   zIndex: 0
                }} />
                <Avatar 
                  sx={{ 
                    width: 120, height: 120, 
                    margin: '40px auto 20px', 
                    border: '4px solid #eae2b7',
                    bgcolor: '#003049',
                    fontSize: '3rem',
                    fontFamily: graffitiFont,
                    zIndex: 1,
                    position: 'relative'
                  }}
                >L</Avatar>
                
                <Typography variant="h4" sx={{ fontFamily: graffitiFont, color: '#fcbf49', mb: 1 }}>Landrian</Typography>
                <Typography variant="subtitle1" sx={{ color: '#eae2b7', opacity: 0.8, mb: 3 }}>Frontend Architect & Artist</Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 3 }}>
                   <Chip icon={<Code style={{ color: '#003049' }} />} label="Dev" sx={{ bgcolor: '#fcbf49', color: '#003049', fontWeight: 'bold' }} />
                   <Chip icon={<Brush style={{ color: '#d62828' }} />} label="Art" sx={{ bgcolor: '#eae2b7', color: '#d62828', fontWeight: 'bold' }} />
                   <Chip icon={<SportsEsports style={{ color: '#f77f00' }} />} label="Gamer" sx={{ bgcolor: '#003049', color: '#f77f00', border: '1px solid #f77f00', fontWeight: 'bold' }} />
                </Box>

                <Typography variant="body1" sx={{ textAlign: 'left', lineHeight: 1.7, color: 'rgba(234, 226, 183, 0.9)' }}>
                   A software developer with a soul for creativity. Landrian bridges the gap between logic and imagination, turning lines of code into visual experiences. Passionate about gaming interactions, digital graffiti, and solving complex problems with elegant solutions.
                </Typography>
             </Card>


          </Box>

          {/* RIGHT COLUMN: Interactive Area */}
          <Box>
            {/* Header Title */}
            <Box sx={{ textAlign: 'left', mb: 6, pl: 2, borderLeft: '8px solid #f77f00' }}>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: glitchFont,
                  fontSize: { xs: '4rem', md: '7rem' },
                  color: '#fcbf49',
                  textShadow: `4px 4px 0px #d62828`,
                  lineHeight: 0.8,
                  opacity: 0.9,
                }}
              >
                LANDRIAN
              </Typography>
              <Typography variant="h4" sx={{ fontFamily: graffitiFont, color: '#eae2b7', mt: 1, ml: 1 }}>
                Digital Playground
              </Typography>
            </Box>

            {/* Stats & Wisdom Row */}
            <Box sx={{ mb: 6, display: 'flex', flexDirection: { xs: 'column', xl: 'row' }, gap: 4, alignItems: 'stretch' }}>
              
              {/* Reputation Score Card */}
              <Box sx={{
                background: '#003049',
                p: 3,
                borderRadius: '16px',
                border: '2px solid #555',
                width: { xs: '100%', xl: '300px' },
                flexShrink: 0,
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Typography variant="overline" sx={{ color: '#f77f00', letterSpacing: 2 }}>Reputation Score</Typography>
                <Typography variant="h2" sx={{ fontFamily: graffitiFont, color: '#eae2b7', animation: sprayActive ? `${glow} 0.2s` : 'none', my: 2 }}>
                  {arcadeScore}
                </Typography>
                 <Box sx={{ position: 'absolute', top: 15, right: 15, width: 10, height: 10, borderRadius: '50%', bgcolor: '#0f0', boxShadow: '0 0 5px #0f0' }} />
              </Box>

              {/* Inspiration Station (Quotes) - Now Horizontal */}
              <Card sx={{ ...quoteCardStyle, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 3, height: '100%' }}>
                  
                  {/* Icon Section */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '120px' }}>
                    <Lightbulb sx={{ fontSize: 40, color: '#fcbf49', mb: 1, filter: 'drop-shadow(0 0 10px #fcbf49)' }} />
                    <Typography variant="h6" sx={{ fontFamily: graffitiFont, transform: 'rotate(-2deg)', lineHeight: 1 }}>
                      DEV WISDOM
                    </Typography>
                  </Box>
                  
                  {/* Quote Text Section */}
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: { xs: 'center', md: 'left' }, borderLeft: { md: '2px solid rgba(252, 191, 73, 0.3)' }, pl: { md: 3 } }}>
                    <Typography variant="h6" sx={{ fontStyle: 'italic', fontFamily: cleanFont, fontWeight: 300, mb: 1, fontSize: '1.1rem' }}>
                      &quot;{quotes[currentQuoteIndex]?.split(' - ')[0] || 'Loading wisdom...'}&quot;
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#003049', fontWeight: 'bold', bgcolor: '#fcbf49', px: 1, py: 0.2, borderRadius: '4px', alignSelf: { xs: 'center', md: 'flex-start' } }}>
                      - {quotes[currentQuoteIndex]?.split(' - ')[1] || "System"}
                    </Typography>
                  </Box>

                  {/* Button Section */}
                  <Box>
                    <Button 
                      variant="contained" 
                      onClick={nextQuote}
                      startIcon={<Refresh />}
                      sx={{ 
                        bgcolor: '#003049', 
                        color: '#eae2b7',
                        borderRadius: '50px',
                        px: 3,
                        whiteSpace: 'nowrap',
                        '&:hover': { bgcolor: '#021a29' }
                      }}
                    >
                      New Vibe
                    </Button>
                  </Box>

                </CardContent>
              </Card>

            </Box>

            {/* Interactive Cards */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
              <Card sx={glassCardStyle('#f77f00')}>
                <CardContent sx={{ p: 4 }}>
                  <FormatPaint sx={{ fontSize: 40, color: '#f77f00', mb: 2 }} />
                  <Typography variant="h5" sx={{ fontFamily: graffitiFont, color: '#eae2b7', mb: 2 }}>Graffiti Wall</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(234, 226, 183, 0.7)' }}>
                     Make your mark on the virtual wall. Every tag adds to your legend.
                  </Typography>
                </CardContent>
              </Card>

               <Card sx={glassCardStyle('#d62828')}>
                <CardContent sx={{ p: 4 }}>
                  <MusicNote sx={{ fontSize: 40, color: '#d62828', mb: 2 }} />
                  <Typography variant="h5" sx={{ fontFamily: graffitiFont, color: '#eae2b7', mb: 2 }}>Audio Vibes</Typography>
                   <Typography variant="body2" sx={{ color: 'rgba(234, 226, 183, 0.7)' }}>
                     Select the soundtrack for your coding session. Lo-fi, Synth, or Rock.
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={glassCardStyle('#fcbf49')}>
                <CardContent sx={{ p: 4 }}>
                  <Psychology sx={{ fontSize: 40, color: '#fcbf49', mb: 2 }} />
                  <Typography variant="h5" sx={{ fontFamily: graffitiFont, color: '#eae2b7', mb: 2 }}>Problem Solver</Typography>
                   <Typography variant="body2" sx={{ color: 'rgba(234, 226, 183, 0.7)' }}>
                     Tackle algorithmic challenges designed to twist your mind.
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={glassCardStyle('#eae2b7')}>
                <CardContent sx={{ p: 4 }}>
                  <Favorite sx={{ fontSize: 40, color: '#eae2b7', mb: 2 }} />
                  <Typography variant="h5" sx={{ fontFamily: graffitiFont, color: '#eae2b7', mb: 2 }}>Community</Typography>
                   <Typography variant="body2" sx={{ color: 'rgba(234, 226, 183, 0.7)' }}>
                     Connect with other creators in the network.
                  </Typography>
                </CardContent>
              </Card>
            </Box>

          </Box>
        </Box>
        )} {/* end activeTab === 0 */}

        {/* Floating Actions */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 40,
            right: 40,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            zIndex: 100,
          }}
        >
          <Fab
            onClick={handleSpray}
            sx={{
              bgcolor: '#d62828',
              color: '#eae2b7',
              width: 80,
              height: 80,
              border: '4px solid #eae2b7',
              transform: sprayActive ? 'scale(0.9) rotate(15deg)' : 'scale(1)',
              transition: 'all 0.1s ease',
              boxShadow: '0 0 20px #d62828',
              '&:hover': {
                bgcolor: '#b01e1e',
                boxShadow: '0 0 40px #d62828',
              }
            }}
          >
            <FormatPaint sx={{ fontSize: 35 }} />
          </Fab>
        </Box>

      </Container>
    </Box>
  )
}
