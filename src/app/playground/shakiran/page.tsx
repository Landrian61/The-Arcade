'use client'

import { Box, Container, Typography } from '@mui/material'
import { useArcadeStore } from '@/store/useArcadeStore'
import { useDesignGardenStore } from '@/store/useDesignGardenStore'
import Background from '@/components/garden-elements/Background'
import GardenBed from '@/components/garden-elements/GardenBed'
import GardenPlant from '@/components/garden-elements/GardenPlant'
import PreviewBubble from '@/components/garden-elements/PreviewBubble'
import Character from '@/components/garden-elements/Character'
import { ArrowBack } from '@mui/icons-material'
import Link from 'next/link'

export default function ShakiranPlayground() {
  const { components, selectComponent } = useDesignGardenStore()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%', // Changed from 100vw to avoid potential scrollbar width issues
        position: 'relative',
        overflowX: 'hidden', // Keep this to prevent horizontal scroll from animations
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: 2, // Reduced from 4
        gap: 2 // Reduced from 4
      }}
    >
      <Background />

      {/* Header Section - Natural Flow */}
      <Box sx={{
        zIndex: 10,
        textAlign: 'left', // Left align
        mt: 1,
        width: '100%',
        maxWidth: '1200px', // Constrain width to align with content
        alignSelf: 'center',
        pl: { xs: 2, md: 4 }
      }}>
        <Typography variant="h2" sx={{
          fontFamily: 'var(--font-permanent-marker)',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          whiteSpace: 'nowrap',
          mb: 1,
          fontSize: { xs: '2rem', md: '3rem' }
        }}>
          Shakiran&apos;s Design Garden
        </Typography>

        {/* Subtitle with container */}
        <Box sx={{
          display: 'inline-block',
          padding: '8px 20px', // Reduced from 12px 32px
          borderRadius: '16px', // Reduced from 30px
          background: 'linear-gradient(135deg, rgba(252, 191, 73, 0.9) 0%, rgba(247, 127, 0, 0.9) 100%)',
          boxShadow: '0 4px 15px rgba(252, 191, 73, 0.3)', // Changed shadow
          maxWidth: '800px',
          mb: 1 // Added margin bottom
        }}>
          <Typography variant="body2" sx={{ // Changed variant from h6 to body2
            fontFamily: 'var(--font-outfit)',
            fontWeight: 'bold',
            color: '#31004a',
            fontSize: { xs: '0.8rem', md: '0.9rem' }, // Smaller text
            lineHeight: 1.4
          }}>
            A living interface system where components grow, evolve, and share state.
          </Typography>
        </Box>
      </Box>

      {/* Main Content Layout - Grid/Flex */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2, // Reduced from 4
        width: '100%',
        maxWidth: '1600px',
        margin: '0 auto',
        flexGrow: 1,
        zIndex: 10,
        py: 2 // Reduced from 4
      }}>

        {/* Garden and Character Row */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3, // Reduced from 8
          width: '100%'
        }}>
          {/* Garden Container */}
          <GardenBed>
            <Box sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              zIndex: 10
            }}>
              {components.map(comp => (
                <GardenPlant key={comp.id} component={comp} />
              ))}
            </Box>
          </GardenBed>

          {/* Character with Back Button */}
          <Box sx={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            mt: { xs: 0, lg: -16 } // Move character up on desktop to avoid collision
          }}>
            <Character />

            {/* Back to Arcade Button */}
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #fcbf49 0%, #f77f00 100%)', // Yellow/Orange
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'transform 0.2s, background 0.2s',
                boxShadow: '0 4px 12px rgba(252, 191, 73, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  background: 'linear-gradient(135deg, #ffd166 0%, #fcbf49 100%)' // Lighter yellow hover
                }
              }}>
                <ArrowBack fontSize="small" sx={{ color: '#31004a' }} />
                <Typography variant="button" sx={{
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  fontSize: '0.85rem',
                  color: '#31004a' // Purple text
                }}>
                  Back to Arcade
                </Typography>
              </Box>
            </Link>
          </Box>
        </Box>

        {/* Component Details Panel - Appears below when component is selected */}
        <PreviewBubble />

      </Box>

    </Box>
  )
}
