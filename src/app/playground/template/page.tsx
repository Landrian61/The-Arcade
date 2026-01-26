'use client'

import { Box, Container, Typography, Card, CardContent } from '@mui/material'
import { useArcadeStore } from '@/store/useArcadeStore'

export default function TemplatePage() {
  const { arcadeScore } = useArcadeStore()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #eae2b7 0%, #fcbf49 100%)',
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '4rem' },
              color: '#003049',
              mb: 2,
              fontFamily: 'var(--font-permanent-marker)',
            }}
          >
            Your Playground
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#d62828',
              fontFamily: 'var(--font-outfit)',
            }}
          >
            Copy this template to create your own page
          </Typography>
        </Box>

        <Card
          sx={{
            background: '#ffffff',
            borderRadius: 3,
            padding: 4,
            boxShadow: '0 8px 32px rgba(0, 48, 73, 0.2)',
          }}
        >
          <CardContent>
            <Typography variant="h5" sx={{ color: '#003049', mb: 2 }}>
              Instructions:
            </Typography>
            <Typography variant="body1" sx={{ color: '#003049', mb: 2 }}>
              1. Copy this folder and rename it to your name/username
            </Typography>
            <Typography variant="body1" sx={{ color: '#003049', mb: 2 }}>
              2. Update the route in the Lobby page (src/app/page.tsx)
            </Typography>
            <Typography variant="body1" sx={{ color: '#003049', mb: 2 }}>
              3. Build something awesome!
            </Typography>
            <Typography variant="body1" sx={{ color: '#003049' }}>
              Current Arcade Score: <strong>{arcadeScore}</strong>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}







