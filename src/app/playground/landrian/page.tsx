'use client'

import { useArcadeStore } from '@/store/useArcadeStore'
import { Box, Container, Typography, Fab, Card, CardContent } from '@mui/material'
import { FormatPaint } from '@mui/icons-material'
import { useState } from 'react'

export default function LandrianPage() {
  const { arcadeScore, incrementScore } = useArcadeStore()
  const [sprayActive, setSprayActive] = useState(false)

  const handleSpray = () => {
    setSprayActive(true)
    incrementScore()
    setTimeout(() => setSprayActive(false), 300)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#003049',
        position: 'relative',
        overflow: 'hidden',
        padding: 4,
      }}
    >
      {/* Graffiti wall background effects */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(214, 40, 40, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(247, 127, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(252, 191, 73, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            className="graffiti-text"
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              color: '#fcbf49',
              mb: 2,
              textShadow: `
                3px 3px 0px #d62828,
                6px 6px 0px #f77f00,
                9px 9px 0px #fcbf49,
                0 0 20px rgba(214, 40, 40, 0.5)
              `,
              transform: 'rotate(-2deg)',
            }}
          >
            LANDRIAN
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#eae2b7',
              fontFamily: 'var(--font-outfit)',
              textTransform: 'uppercase',
              letterSpacing: '4px',
            }}
          >
            Digital Graffiti Wall
          </Typography>
        </Box>

        {/* High Score Display */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 6,
          }}
        >
          <Card
            sx={{
              background: 'linear-gradient(135deg, #d62828 0%, #f77f00 100%)',
              borderRadius: 4,
              padding: 3,
              boxShadow: sprayActive
                ? '0 0 30px rgba(214, 40, 40, 0.8), 0 0 50px rgba(247, 127, 0, 0.6)'
                : '0 8px 32px rgba(214, 40, 40, 0.4)',
              transition: 'all 0.3s ease',
              transform: sprayActive ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  color: '#003049',
                  fontFamily: 'var(--font-outfit)',
                  fontWeight: 600,
                  mb: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                }}
              >
                High Score
              </Typography>
              <Typography
                variant="h2"
                className="graffiti-text"
                sx={{
                  color: '#fcbf49',
                  fontSize: { xs: '3rem', md: '4rem' },
                  textShadow: '2px 2px 0px #003049',
                }}
              >
                {arcadeScore}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Graffiti Art Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 4,
            mb: 6,
          }}
        >
          {[
            { text: 'CODE', color: '#d62828' },
            { text: 'ART', color: '#f77f00' },
            { text: 'CREATE', color: '#fcbf49' },
            { text: 'INSPIRE', color: '#eae2b7' },
          ].map((item, index) => (
            <Card
              key={index}
              sx={{
                background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}05 100%)`,
                border: `3px solid ${item.color}`,
                borderRadius: 3,
                padding: 4,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  background: `radial-gradient(circle, ${item.color}30 0%, transparent 70%)`,
                  borderRadius: '50%',
                },
              }}
            >
              <Typography
                variant="h3"
                className="graffiti-text"
                sx={{
                  color: item.color,
                  textAlign: 'center',
                  transform: `rotate(${index % 2 === 0 ? '-3deg' : '3deg'})`,
                  textShadow: `
                    2px 2px 0px ${item.color}80,
                    4px 4px 0px ${item.color}60
                  `,
                }}
              >
                {item.text}
              </Typography>
            </Card>
          ))}
        </Box>

        {/* Spray Can Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 1000,
          }}
        >
          <Fab
            color="primary"
            onClick={handleSpray}
            sx={{
              width: 80,
              height: 80,
              background: 'linear-gradient(135deg, #d62828 0%, #f77f00 100%)',
              boxShadow: sprayActive
                ? '0 0 40px rgba(214, 40, 40, 1), 0 0 60px rgba(247, 127, 0, 0.8)'
                : '0 8px 24px rgba(214, 40, 40, 0.5)',
              transition: 'all 0.3s ease',
              transform: sprayActive ? 'scale(1.2) rotate(15deg)' : 'scale(1)',
              '&:hover': {
                background: 'linear-gradient(135deg, #f77f00 0%, #fcbf49 100%)',
                transform: 'scale(1.1)',
              },
              '& .MuiSvgIcon-root': {
                fontSize: '2.5rem',
                color: '#fcbf49',
              },
            }}
          >
            <FormatPaint />
          </Fab>
        </Box>

        {/* Tag Signature */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 8,
            opacity: 0.7,
          }}
        >
          <Typography
            variant="body2"
            className="graffiti-text"
            sx={{
              color: '#eae2b7',
              fontSize: '1.5rem',
              transform: 'rotate(-5deg)',
            }}
          >
            - Andrew (Landrian)
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}





