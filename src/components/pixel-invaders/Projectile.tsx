'use client'

import { Box, Typography } from '@mui/material'
import { keyframes } from '@mui/system'

const projectileGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 4px #00ff00) drop-shadow(0 0 8px #00ff00);
  }
  50% {
    filter: drop-shadow(0 0 6px #00ff00) drop-shadow(0 0 12px #00ff00);
  }
`

const trail = keyframes`
  0% { opacity: 0.8; transform: translateY(0) scaleY(1); }
  100% { opacity: 0; transform: translateY(8px) scaleY(2); }
`

interface ProjectileProps {
  id: string
  position: { x: number; y: number }
  isPlayer: boolean
  type: string
}

export default function Projectile({ id, position, isPlayer, type }: ProjectileProps) {
  const color = isPlayer ? '#00ff00' : '#ff0000'
  const glowColor = isPlayer ? 'rgba(0, 255, 0, 0.8)' : 'rgba(255, 0, 0, 0.8)'

  return (
    <Box
      sx={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 45,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: isPlayer ? '100%' : '-100%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2px',
          height: '12px',
          background: `linear-gradient(${isPlayer ? '180deg' : '0deg'}, ${color}, transparent)`,
          animation: `${trail} 0.2s linear infinite`,
          opacity: 0.6,
        }}
      />
      <Typography
        sx={{
          fontFamily: 'monospace',
          fontSize: '10px',
          fontWeight: 'bold',
          color: color,
          textShadow: `0 0 4px ${glowColor}, 0 0 8px ${glowColor}`,
          animation: `${projectileGlow} 0.3s ease-in-out infinite`,
          lineHeight: 1,
          letterSpacing: '-1px',
          userSelect: 'none',
        }}
      >
        {type}
      </Typography>
    </Box>
  )
}
