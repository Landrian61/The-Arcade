'use client'

import { useArcadeStore } from '@/store/useArcadeStore'
import { Box, Container, Typography, Card, CardContent, Button, Grid, Chip } from '@mui/material'
import { PlayArrow, Settings } from '@mui/icons-material'
import Link from 'next/link'

const players = [
  {
    name: 'Landrian',
    route: '/playground/landrian',
    description: 'Digital Graffiti Artist',
    color: '#d62828',
  },
  {
    name: 'Template',
    route: '/playground/template',
    description: 'Copy this to start your own',
    color: '#f77f00',
  },
]

export default function Lobby() {
  const { globalChaosMode, arcadeScore, toggleChaos } = useArcadeStore()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: globalChaosMode
          ? 'linear-gradient(45deg, #003049 25%, #d62828 25%, #d62828 50%, #003049 50%, #003049 75%, #d62828 75%)'
          : 'linear-gradient(135deg, #003049 0%, #1a4d6b 100%)',
        backgroundSize: globalChaosMode ? '40px 40px' : '100% 100%',
        animation: globalChaosMode ? 'chaos 0.5s linear infinite' : 'none',
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              color: '#fcbf49',
              mb: 2,
              textShadow: '4px 4px 0px #d62828, 8px 8px 0px #f77f00',
              fontFamily: 'var(--font-permanent-marker)',
            }}
          >
            THE ARCADE
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: '#eae2b7',
              mb: 4,
              fontFamily: 'var(--font-outfit)',
            }}
          >
            Frontend Team Playground
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            <Chip
              label={`High Score: ${arcadeScore}`}
              sx={{
                bgcolor: '#f77f00',
                color: '#003049',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                padding: '8px 16px',
              }}
            />
            <Button
              variant="contained"
              startIcon={<Settings />}
              onClick={toggleChaos}
              sx={{
                bgcolor: globalChaosMode ? '#d62828' : '#fcbf49',
                color: '#003049',
                '&:hover': {
                  bgcolor: globalChaosMode ? '#b02020' : '#e0a830',
                },
              }}
            >
              {globalChaosMode ? 'Disable Chaos' : 'Enable Chaos'}
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {players.map((player) => (
            <Grid item xs={12} sm={6} md={4} key={player.name}>
              <Card
                sx={{
                  height: '100%',
                  background: `linear-gradient(135deg, ${player.color}15 0%, ${player.color}05 100%)`,
                  border: `2px solid ${player.color}`,
                  borderRadius: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 24px ${player.color}40`,
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    sx={{
                      color: player.color,
                      mb: 2,
                      fontFamily: 'var(--font-permanent-marker)',
                    }}
                  >
                    {player.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#003049',
                      mb: 3,
                      minHeight: '60px',
                    }}
                  >
                    {player.description}
                  </Typography>
                  <Link href={player.route} style={{ textDecoration: 'none', width: '100%' }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<PlayArrow />}
                      sx={{
                        bgcolor: player.color,
                        color: '#fff',
                        '&:hover': {
                          bgcolor: player.color,
                          opacity: 0.9,
                        },
                      }}
                    >
                      Enter Playground
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: '#eae2b7',
              fontStyle: 'italic',
            }}
          >
            Insert coin to start your own playground
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

