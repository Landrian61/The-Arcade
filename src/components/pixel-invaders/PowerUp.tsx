'use client'

import { Box, Typography } from '@mui/material'
import { keyframes } from '@mui/system'

const float = keyframes`
  0%, 100% { transform: translate(-50%, -50%) translateY(0) rotate(0deg); }
  50% { transform: translate(-50%, -50%) translateY(-3px) rotate(5deg); }
`

const sparkle = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`

type PowerUpType = 'rapidFire' | 'shield' | 'multiShot' | 'slowMotion'

interface PowerUpProps {
  id: string
  type: PowerUpType
  position: { x: number; y: number }
}

const powerUpConfig: Record<
  PowerUpType,
  { symbol: string; color: string; label: string }
> = {
  rapidFire: { symbol: '>>>', color: '#ff6600', label: 'RAPID' },
  shield: { symbol: '(O)', color: '#00aaff', label: 'SHIELD' },
  multiShot: { symbol: '***', color: '#ffff00', label: 'MULTI' },
  slowMotion: { symbol: '~~~', color: '#aa00ff', label: 'SLOW' },
}

export default function PowerUp({ id, type, position }: PowerUpProps) {
  const config = powerUpConfig[type]

  return (
    <Box
      sx={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        animation: `${float} 1s ease-in-out infinite`,
        zIndex: 35,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '50%',
          border: `2px solid ${config.color}`,
          opacity: 0.5,
          animation: `${sparkle} 0.8s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          width: '24px',
          height: '24px',
          bgcolor: 'rgba(0, 0, 0, 0.8)',
          border: `2px solid ${config.color}`,
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 10px ${config.color}, inset 0 0 5px ${config.color}`,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: '8px',
            fontWeight: 'bold',
            color: config.color,
            textShadow: `0 0 4px ${config.color}`,
            lineHeight: 1,
          }}
        >
          {config.symbol}
        </Typography>
      </Box>
      <Typography
        sx={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          mt: 0.5,
          fontFamily: 'monospace',
          fontSize: '6px',
          fontWeight: 'bold',
          color: config.color,
          textShadow: `0 0 2px ${config.color}`,
          whiteSpace: 'nowrap',
        }}
      >
        {config.label}
      </Typography>
    </Box>
  )
}
