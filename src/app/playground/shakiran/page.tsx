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
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
      }}
      onClick={() => selectComponent(null)} // Click background to deselect
    >
      <Background />

      {/* Back to Arcade - Bottom Left */}
      <Box sx={{ position: 'absolute', bottom: 40, left: 40, zIndex: 20 }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            opacity: 0.7,
            transition: 'opacity 0.3s',
            '&:hover': { opacity: 1 }
          }}>
            <ArrowBack fontSize="small" />
            <Typography variant="caption">BACK TO ARCADE</Typography>
          </Box>
        </Link>
      </Box>

      {/* Title - Centered Top */}
      <Box sx={{
        position: 'absolute',
        top: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        textAlign: 'center'
      }}>
        <Typography variant="h2" sx={{
          fontFamily: 'var(--font-permanent-marker)',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          mb: 0
        }}>
          Shakiran&apos;s Design Garden
        </Typography>
      </Box>

      {/* Main Interactive Area */}
      <GardenBed>
        <Box sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 10
        }}>
          {/* Plants */}
          {components.map(comp => (
            <GardenPlant key={comp.id} component={comp} />
          ))}

          {/* Context Bubble */}
          <PreviewBubble />
        </Box>
      </GardenBed>

      {/* Character Anchor */}
      <Character />

      {/* Subtitle - Below Character */}
      <Box sx={{
        position: 'fixed',
        right: '5%',
        bottom: '5%',
        zIndex: 50,
        textAlign: 'center',
        maxWidth: '300px'
      }}>
        <Typography variant="body1" sx={{
          fontFamily: 'var(--font-outfit)',
          opacity: 0.9,
          color: '#fff',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}>
          A living interface system where components grow, evolve, and share state.
        </Typography>
      </Box>

    </Box>
  )
}
