'use client'

import { Box } from '@mui/material'
import { keyframes } from '@mui/system'

const enemyWobble = keyframes`
  0%, 100% { transform: translate(-50%, -50%) rotate(-2deg); }
  50% { transform: translate(-50%, -50%) rotate(2deg); }
`

const glitchEffect = keyframes`
  0%, 90%, 100% { transform: translate(-50%, -50%) skewX(0deg); }
  92% { transform: translate(-50%, -50%) skewX(5deg) translateX(2px); }
  94% { transform: translate(-50%, -50%) skewX(-5deg) translateX(-2px); }
  96% { transform: translate(-50%, -50%) skewX(3deg); }
  98% { transform: translate(-50%, -50%) skewX(0deg); }
`

const deathFlash = keyframes`
  0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.5); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
`

type EnemyType = 'bug' | 'glitch' | 'virus'

interface EnemyProps {
  id: string
  type: EnemyType
  position: { x: number; y: number }
  health: number
  isDying?: boolean
}

const PX = 3

const BugSprite = () => (
  <Box
    sx={{
      width: `${PX}px`,
      height: `${PX}px`,
      background: 'transparent',
      boxShadow: `
        ${PX * 2}px 0 0 #d62828,
        ${PX * 5}px 0 0 #d62828,
        ${PX * 3}px ${PX}px 0 #d62828,
        ${PX * 4}px ${PX}px 0 #d62828,
        ${PX * 2}px ${PX * 2}px 0 #d62828,
        ${PX * 3}px ${PX * 2}px 0 #ff6b6b,
        ${PX * 4}px ${PX * 2}px 0 #ff6b6b,
        ${PX * 5}px ${PX * 2}px 0 #d62828,
        ${PX}px ${PX * 3}px 0 #d62828,
        ${PX * 2}px ${PX * 3}px 0 #ff6b6b,
        ${PX * 3}px ${PX * 3}px 0 #ffffff,
        ${PX * 4}px ${PX * 3}px 0 #ffffff,
        ${PX * 5}px ${PX * 3}px 0 #ff6b6b,
        ${PX * 6}px ${PX * 3}px 0 #d62828,
        0 ${PX * 4}px 0 #d62828,
        ${PX}px ${PX * 4}px 0 #d62828,
        ${PX * 2}px ${PX * 4}px 0 #ff6b6b,
        ${PX * 3}px ${PX * 4}px 0 #ff6b6b,
        ${PX * 4}px ${PX * 4}px 0 #ff6b6b,
        ${PX * 5}px ${PX * 4}px 0 #ff6b6b,
        ${PX * 6}px ${PX * 4}px 0 #d62828,
        ${PX * 7}px ${PX * 4}px 0 #d62828,
        0 ${PX * 5}px 0 #d62828,
        ${PX * 2}px ${PX * 5}px 0 #d62828,
        ${PX * 3}px ${PX * 5}px 0 #d62828,
        ${PX * 4}px ${PX * 5}px 0 #d62828,
        ${PX * 5}px ${PX * 5}px 0 #d62828,
        ${PX * 7}px ${PX * 5}px 0 #d62828,
        ${PX}px ${PX * 6}px 0 #d62828,
        ${PX * 3}px ${PX * 6}px 0 #d62828,
        ${PX * 4}px ${PX * 6}px 0 #d62828,
        ${PX * 6}px ${PX * 6}px 0 #d62828
      `,
      imageRendering: 'pixelated',
      filter: 'drop-shadow(0 0 4px rgba(214, 40, 40, 0.8))',
    }}
  />
)

const GlitchSprite = () => (
  <Box
    sx={{
      width: `${PX}px`,
      height: `${PX}px`,
      background: 'transparent',
      boxShadow: `
        ${PX}px 0 0 #00ffff,
        ${PX * 2}px 0 0 #00ffff,
        ${PX * 5}px 0 0 #00ffff,
        ${PX * 6}px 0 0 #00ffff,
        0 ${PX}px 0 #00ffff,
        ${PX * 3}px ${PX}px 0 #00ffff,
        ${PX * 4}px ${PX}px 0 #00ffff,
        ${PX * 7}px ${PX}px 0 #00ffff,
        0 ${PX * 2}px 0 #00ffff,
        ${PX}px ${PX * 2}px 0 #00cccc,
        ${PX * 2}px ${PX * 2}px 0 #00ffff,
        ${PX * 3}px ${PX * 2}px 0 #ffffff,
        ${PX * 4}px ${PX * 2}px 0 #ffffff,
        ${PX * 5}px ${PX * 2}px 0 #00ffff,
        ${PX * 6}px ${PX * 2}px 0 #00cccc,
        ${PX * 7}px ${PX * 2}px 0 #00ffff,
        0 ${PX * 3}px 0 #00ffff,
        ${PX}px ${PX * 3}px 0 #00ffff,
        ${PX * 2}px ${PX * 3}px 0 #00ffff,
        ${PX * 3}px ${PX * 3}px 0 #00ffff,
        ${PX * 4}px ${PX * 3}px 0 #00ffff,
        ${PX * 5}px ${PX * 3}px 0 #00ffff,
        ${PX * 6}px ${PX * 3}px 0 #00ffff,
        ${PX * 7}px ${PX * 3}px 0 #00ffff,
        ${PX}px ${PX * 4}px 0 #00ffff,
        ${PX * 2}px ${PX * 4}px 0 #00cccc,
        ${PX * 3}px ${PX * 4}px 0 #00ffff,
        ${PX * 4}px ${PX * 4}px 0 #00ffff,
        ${PX * 5}px ${PX * 4}px 0 #00cccc,
        ${PX * 6}px ${PX * 4}px 0 #00ffff,
        ${PX * 2}px ${PX * 5}px 0 #00ffff,
        ${PX * 5}px ${PX * 5}px 0 #00ffff,
        ${PX}px ${PX * 6}px 0 #00ffff,
        ${PX * 6}px ${PX * 6}px 0 #00ffff
      `,
      imageRendering: 'pixelated',
      filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.8))',
    }}
  />
)

const VirusSprite = () => (
  <Box
    sx={{
      width: `${PX}px`,
      height: `${PX}px`,
      background: 'transparent',
      boxShadow: `
        ${PX * 3}px 0 0 #9900ff,
        ${PX}px ${PX}px 0 #9900ff,
        ${PX * 3}px ${PX}px 0 #cc66ff,
        ${PX * 5}px ${PX}px 0 #9900ff,
        ${PX * 2}px ${PX * 2}px 0 #9900ff,
        ${PX * 3}px ${PX * 2}px 0 #ff00ff,
        ${PX * 4}px ${PX * 2}px 0 #9900ff,
        0 ${PX * 3}px 0 #9900ff,
        ${PX}px ${PX * 3}px 0 #cc66ff,
        ${PX * 2}px ${PX * 3}px 0 #ff00ff,
        ${PX * 3}px ${PX * 3}px 0 #ffffff,
        ${PX * 4}px ${PX * 3}px 0 #ff00ff,
        ${PX * 5}px ${PX * 3}px 0 #cc66ff,
        ${PX * 6}px ${PX * 3}px 0 #9900ff,
        ${PX * 2}px ${PX * 4}px 0 #9900ff,
        ${PX * 3}px ${PX * 4}px 0 #ff00ff,
        ${PX * 4}px ${PX * 4}px 0 #9900ff,
        ${PX}px ${PX * 5}px 0 #9900ff,
        ${PX * 3}px ${PX * 5}px 0 #cc66ff,
        ${PX * 5}px ${PX * 5}px 0 #9900ff,
        ${PX * 3}px ${PX * 6}px 0 #9900ff
      `,
      imageRendering: 'pixelated',
      filter: 'drop-shadow(0 0 4px rgba(153, 0, 255, 0.8))',
    }}
  />
)

const sprites: Record<EnemyType, React.ReactNode> = {
  bug: <BugSprite />,
  glitch: <GlitchSprite />,
  virus: <VirusSprite />,
}

const animations: Record<EnemyType, string> = {
  bug: `${enemyWobble} 0.8s ease-in-out infinite`,
  glitch: `${glitchEffect} 2s ease-in-out infinite`,
  virus: `${enemyWobble} 1.2s ease-in-out infinite`,
}

export default function Enemy({ id, type, position, health, isDying = false }: EnemyProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        width: `${PX * 8}px`,
        height: `${PX * 7}px`,
        animation: isDying ? `${deathFlash} 0.3s ease-out forwards` : animations[type],
        zIndex: 40,
        opacity: health > 1 ? 1 : 0.9,
      }}
    >
      {sprites[type]}
      {health > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '2px',
          }}
        >
          {Array.from({ length: health }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: '3px',
                height: '3px',
                bgcolor: type === 'bug' ? '#ff6b6b' : type === 'glitch' ? '#00ffff' : '#ff00ff',
                borderRadius: '50%',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
