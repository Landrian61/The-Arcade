'use client'

import { Box, Typography, Chip, alpha } from '@mui/material'
import { keyframes } from '@mui/system'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import BoltIcon from '@mui/icons-material/Bolt'
import ShieldIcon from '@mui/icons-material/Shield'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo'

const scoreFlip = keyframes`
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(90deg); }
  100% { transform: rotateX(0deg); }
`

const comboPulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`

const neonFlicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 4px currentColor, 0 0 8px currentColor;
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
`

interface HUDProps {
  score: number
  wave: number
  lives: number
  combo: number
  activePowerUps: { type: string; expiresAt: number }[]
}

export default function HUD({ score, wave, lives, combo, activePowerUps }: HUDProps) {
  const comboMultiplier = Math.min(Math.floor(combo / 5) + 1, 4)

  const powerUpIcons: Record<string, React.ReactNode> = {
    rapidFire: <BoltIcon sx={{ fontSize: 14 }} />,
    shield: <ShieldIcon sx={{ fontSize: 14 }} />,
    multiShot: <AutoAwesomeIcon sx={{ fontSize: 14 }} />,
    slowMotion: <SlowMotionVideoIcon sx={{ fontSize: 14 }} />,
  }

  const powerUpColors: Record<string, string> = {
    rapidFire: '#ff6600',
    shield: '#00aaff',
    multiShot: '#ffff00',
    slowMotion: '#aa00ff',
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        p: 1.5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: '10px',
            color: '#00ff00',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            animation: `${neonFlicker} 4s infinite`,
          }}
        >
          Score
        </Typography>
        <Typography
          sx={{
            fontFamily: 'var(--font-permanent-marker), monospace',
            fontSize: { xs: '20px', sm: '28px' },
            color: '#00ff00',
            textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00',
            letterSpacing: '2px',
            animation: `${scoreFlip} 0.3s ease-out`,
          }}
          key={score} // Re-trigger animation on score change
        >
          {score.toString().padStart(6, '0')}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: alpha('#f77f00', 0.2),
            border: '1px solid #f77f00',
            borderRadius: '4px',
            px: 1.5,
            py: 0.25,
          }}
        >
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: '10px',
              color: '#f77f00',
              textTransform: 'uppercase',
            }}
          >
            Wave
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-permanent-marker), monospace',
              fontSize: '16px',
              color: '#fcbf49',
              textShadow: '0 0 5px #f77f00',
            }}
          >
            {wave}
          </Typography>
        </Box>

        {combo > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              animation: `${comboPulse} 0.5s ease-in-out infinite`,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontSize: '10px',
                color: comboMultiplier >= 3 ? '#ff0000' : comboMultiplier >= 2 ? '#f77f00' : '#fcbf49',
                textTransform: 'uppercase',
              }}
            >
              Combo
            </Typography>
            <Chip
              label={`x${comboMultiplier}`}
              size="small"
              sx={{
                height: '18px',
                fontSize: '10px',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                bgcolor:
                  comboMultiplier >= 4
                    ? alpha('#ff0000', 0.3)
                    : comboMultiplier >= 3
                    ? alpha('#f77f00', 0.3)
                    : comboMultiplier >= 2
                    ? alpha('#fcbf49', 0.3)
                    : 'transparent',
                color: comboMultiplier >= 3 ? '#ff0000' : comboMultiplier >= 2 ? '#f77f00' : '#fcbf49',
                border: `1px solid ${
                  comboMultiplier >= 3 ? '#ff0000' : comboMultiplier >= 2 ? '#f77f00' : '#fcbf49'
                }`,
                boxShadow:
                  comboMultiplier >= 3
                    ? '0 0 10px rgba(255, 0, 0, 0.5)'
                    : comboMultiplier >= 2
                    ? '0 0 10px rgba(247, 127, 0, 0.5)'
                    : 'none',
              }}
            />
          </Box>
        )}

        {activePowerUps.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
            {activePowerUps.map((powerUp, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  bgcolor: alpha(powerUpColors[powerUp.type] || '#fff', 0.2),
                  border: `1px solid ${powerUpColors[powerUp.type] || '#fff'}`,
                  borderRadius: '4px',
                  color: powerUpColors[powerUp.type] || '#fff',
                  boxShadow: `0 0 5px ${powerUpColors[powerUp.type] || '#fff'}`,
                }}
              >
                {powerUpIcons[powerUp.type]}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: '10px',
            color: '#d62828',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            animation: `${neonFlicker} 4s infinite 1s`,
          }}
        >
          Lives
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Box key={i}>
              {i < lives ? (
                <FavoriteIcon
                  sx={{
                    fontSize: { xs: 18, sm: 22 },
                    color: '#d62828',
                    filter: 'drop-shadow(0 0 4px #d62828)',
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{
                    fontSize: { xs: 18, sm: 22 },
                    color: alpha('#d62828', 0.3),
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
