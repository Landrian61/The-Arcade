'use client'

import { Box, alpha } from '@mui/material'
import { keyframes } from '@mui/system'
import { forwardRef, ReactNode } from 'react'

const scanlineMove = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
`

const crtFlicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 0.98; }
  20%, 24%, 55% { opacity: 0.94; }
`

const glowPulse = keyframes`
  0%, 100% {
    box-shadow:
      inset 0 0 60px rgba(0, 255, 0, 0.08),
      0 0 40px rgba(0, 255, 0, 0.15),
      0 0 80px rgba(0, 255, 0, 0.08);
  }
  50% {
    box-shadow:
      inset 0 0 80px rgba(0, 255, 0, 0.12),
      0 0 60px rgba(0, 255, 0, 0.2),
      0 0 100px rgba(0, 255, 0, 0.1);
  }
`

const screenShake = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  10% { transform: translate(-3px, 2px) rotate(-0.5deg); }
  20% { transform: translate(3px, -2px) rotate(0.5deg); }
  30% { transform: translate(-2px, -1px) rotate(0deg); }
  40% { transform: translate(2px, 1px) rotate(0.3deg); }
  50% { transform: translate(-1px, 1px) rotate(-0.3deg); }
  60% { transform: translate(1px, -1px) rotate(0.2deg); }
  70% { transform: translate(-1px, 0) rotate(0deg); }
  80% { transform: translate(1px, 0) rotate(-0.1deg); }
  90% { transform: translate(0, 0) rotate(0deg); }
`

interface CRTMonitorProps {
  children: ReactNode
  glowColor?: string
  scanlines?: boolean
  flicker?: boolean
  curvature?: boolean
  chromaticAberration?: boolean
  shake?: boolean
  width?: string | number
  height?: string | number
}

export const CRTMonitor = forwardRef<HTMLDivElement, CRTMonitorProps>(
  (
    {
      children,
      glowColor = '#00ff00',
      scanlines = true,
      flicker = true,
      curvature = true,
      chromaticAberration = false,
      shake = false,
      width = '100%',
      height = 'auto',
    },
    ref
  ) => {
    return (
      <Box
        ref={ref}
        sx={{
          position: 'relative',
          width,
          height,
          minHeight: '400px',
          bgcolor: '#0a0a0a',
          borderRadius: curvature ? '16px' : '8px',
          overflow: 'hidden',
          border: '8px solid #1a1a1a',
          borderTopColor: '#2a2a2a',
          borderLeftColor: '#252525',
          boxShadow: `
            inset 0 0 100px ${alpha('#000', 0.6)},
            0 0 40px ${alpha(glowColor, 0.2)},
            0 0 80px ${alpha(glowColor, 0.1)},
            0 10px 40px rgba(0, 0, 0, 0.5)
          `,
          animation: shake
            ? `${screenShake} 0.3s ease-out, ${glowPulse} 4s ease-in-out infinite`
            : `${glowPulse} 4s ease-in-out infinite`,
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
            '& *': { animation: 'none !important' },
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            animation: flicker ? `${crtFlicker} 0.15s infinite` : 'none',
          }}
        >
          {children}
        </Box>

        {scanlines && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 10,
              background: `repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.12) 0px,
                rgba(0, 0, 0, 0.12) 1px,
                transparent 1px,
                transparent 2px
              )`,
              animation: `${scanlineMove} 0.08s linear infinite`,
            }}
          />
        )}

        {curvature && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 11,
              background: `radial-gradient(
                ellipse 100% 100% at 50% 50%,
                transparent 50%,
                ${alpha('#000', 0.5)} 100%
              )`,
            }}
          />
        )}

        {curvature && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: '10%',
              right: '10%',
              height: '20%',
              background: `linear-gradient(
                to bottom,
                ${alpha('#fff', 0.06)} 0%,
                transparent 100%
              )`,
              borderRadius: '50% 50% 0 0 / 40%',
              pointerEvents: 'none',
              zIndex: 12,
            }}
          />
        )}

        {chromaticAberration && (
          <>
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255, 0, 0, 0.02)',
                transform: 'translateX(-2px)',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
                zIndex: 13,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 255, 255, 0.02)',
                transform: 'translateX(2px)',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
                zIndex: 13,
              }}
            />
          </>
        )}

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${alpha(glowColor, 0.3)}, transparent)`,
            pointerEvents: 'none',
            zIndex: 14,
          }}
        />
      </Box>
    )
  }
)

CRTMonitor.displayName = 'CRTMonitor'

export default CRTMonitor
