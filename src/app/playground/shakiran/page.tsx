'use client'

import { Box, Container, Typography } from '@mui/material'
import { useArcadeStore } from '@/store/useArcadeStore'
import { useDesignGardenStore } from '@/store/useDesignGardenStore'
import Background from '@/components/garden-elements/Background'
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

      {/* Header */}
      <Box sx={{ position: 'absolute', top: 40, left: 40, zIndex: 20 }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, opacity: 0.7, '&:hover': { opacity: 1 } }}>
            <ArrowBack fontSize="small" />
            <Typography variant="caption">BACK TO ARCADE</Typography>
          </Box>
        </Link>
        <Typography variant="h2" sx={{ fontFamily: 'var(--font-permanent-marker)', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
          Shakiran&apos;s Design Garden
        </Typography>
        <Typography variant="subtitle1" sx={{ fontFamily: 'var(--font-outfit)', opacity: 0.8, maxWidth: 400 }}>
          A living interface system where components grow, evolve, and share state.
        </Typography>
      </Box>

      {/* Main Interactive Area */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 'calc(100% - 300px)', // Leave room for character on right
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

      {/* Character Anchor */}
      <Character />

    </Box>
  )
}
