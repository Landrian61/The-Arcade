'use client'

import { Box } from '@mui/material'
import { keyframes } from '@mui/system'

const thrusterFlame = keyframes`
  0%, 100% { height: 6px; opacity: 0.8; }
  50% { height: 10px; opacity: 1; }
`

const invulnerabilityFlash = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`

const idleHover = keyframes`
  0%, 100% { transform: translate(-50%, -50%) translateY(0); }
  50% { transform: translate(-50%, -50%) translateY(-2px); }
`

interface PlayerProps {
  position: { x: number; y: number }
  isInvulnerable: boolean
}

const PX = 3

export default function Player({ position, isInvulnerable }: PlayerProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        width: `${PX * 9}px`,
        height: `${PX * 8}px`,
        animation: isInvulnerable
          ? `${invulnerabilityFlash} 0.15s infinite`
          : `${idleHover} 2s ease-in-out infinite`,
        transition: 'left 0.05s linear',
        zIndex: 50,
        filter: 'drop-shadow(0 0 8px rgba(252, 191, 73, 0.6))',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: `${PX}px`,
          height: `${PX}px`,
          background: 'transparent',
          boxShadow: `
            ${PX * 4}px 0 0 #fcbf49,
            ${PX * 3}px ${PX}px 0 #fcbf49,
            ${PX * 4}px ${PX}px 0 #eae2b7,
            ${PX * 5}px ${PX}px 0 #fcbf49,
            ${PX * 3}px ${PX * 2}px 0 #f77f00,
            ${PX * 4}px ${PX * 2}px 0 #fcbf49,
            ${PX * 5}px ${PX * 2}px 0 #f77f00,
            ${PX * 2}px ${PX * 3}px 0 #f77f00,
            ${PX * 3}px ${PX * 3}px 0 #fcbf49,
            ${PX * 4}px ${PX * 3}px 0 #eae2b7,
            ${PX * 5}px ${PX * 3}px 0 #fcbf49,
            ${PX * 6}px ${PX * 3}px 0 #f77f00,
            ${PX}px ${PX * 4}px 0 #d62828,
            ${PX * 2}px ${PX * 4}px 0 #f77f00,
            ${PX * 3}px ${PX * 4}px 0 #fcbf49,
            ${PX * 4}px ${PX * 4}px 0 #fcbf49,
            ${PX * 5}px ${PX * 4}px 0 #fcbf49,
            ${PX * 6}px ${PX * 4}px 0 #f77f00,
            ${PX * 7}px ${PX * 4}px 0 #d62828,
            0 ${PX * 5}px 0 #d62828,
            ${PX}px ${PX * 5}px 0 #d62828,
            ${PX * 2}px ${PX * 5}px 0 #f77f00,
            ${PX * 3}px ${PX * 5}px 0 #f77f00,
            ${PX * 4}px ${PX * 5}px 0 #f77f00,
            ${PX * 5}px ${PX * 5}px 0 #f77f00,
            ${PX * 6}px ${PX * 5}px 0 #f77f00,
            ${PX * 7}px ${PX * 5}px 0 #d62828,
            ${PX * 8}px ${PX * 5}px 0 #d62828,
            0 ${PX * 6}px 0 #003049,
            ${PX}px ${PX * 6}px 0 #d62828,
            ${PX * 2}px ${PX * 6}px 0 #f77f00,
            ${PX * 6}px ${PX * 6}px 0 #f77f00,
            ${PX * 7}px ${PX * 6}px 0 #d62828,
            ${PX * 8}px ${PX * 6}px 0 #003049,
            0 ${PX * 7}px 0 #003049,
            ${PX * 8}px ${PX * 7}px 0 #003049
          `,
          imageRendering: 'pixelated',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '6px',
          height: '6px',
          background: 'linear-gradient(180deg, #fcbf49 0%, #f77f00 40%, #d62828 70%, transparent 100%)',
          animation: `${thrusterFlame} 0.08s infinite`,
          filter: 'blur(0.5px)',
          borderRadius: '0 0 2px 2px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-4px',
          left: '25%',
          transform: 'translateX(-50%)',
          width: '4px',
          height: '4px',
          background: 'linear-gradient(180deg, #f77f00 0%, #d62828 60%, transparent 100%)',
          animation: `${thrusterFlame} 0.1s infinite 0.05s`,
          filter: 'blur(0.5px)',
          borderRadius: '0 0 1px 1px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-4px',
          left: '75%',
          transform: 'translateX(-50%)',
          width: '4px',
          height: '4px',
          background: 'linear-gradient(180deg, #f77f00 0%, #d62828 60%, transparent 100%)',
          animation: `${thrusterFlame} 0.1s infinite 0.03s`,
          filter: 'blur(0.5px)',
          borderRadius: '0 0 1px 1px',
        }}
      />
    </Box>
  )
}
