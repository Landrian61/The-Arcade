'use client'

import { useRef, useEffect, useCallback } from 'react'
import { Box, IconButton, alpha } from '@mui/material'
import { keyframes } from '@mui/system'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import AdjustIcon from '@mui/icons-material/Adjust'

const buttonPress = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.9); }
  100% { transform: scale(1); }
`

const fireGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000, inset 0 0 10px rgba(255, 0, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000, inset 0 0 20px rgba(255, 0, 0, 0.5);
  }
`

interface ControlPadProps {
  onMoveLeft: () => void
  onMoveRight: () => void
  onFire: () => void
  disabled?: boolean
}

export default function ControlPad({ onMoveLeft, onMoveRight, onFire, disabled = false }: ControlPadProps) {
  const leftIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const rightIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const fireIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const startMoveLeft = useCallback(() => {
    if (disabled) return
    onMoveLeft()
    leftIntervalRef.current = setInterval(() => {
      onMoveLeft()
    }, 50)
  }, [onMoveLeft, disabled])

  const stopMoveLeft = useCallback(() => {
    if (leftIntervalRef.current) {
      clearInterval(leftIntervalRef.current)
      leftIntervalRef.current = null
    }
  }, [])

  const startMoveRight = useCallback(() => {
    if (disabled) return
    onMoveRight()
    rightIntervalRef.current = setInterval(() => {
      onMoveRight()
    }, 50)
  }, [onMoveRight, disabled])

  const stopMoveRight = useCallback(() => {
    if (rightIntervalRef.current) {
      clearInterval(rightIntervalRef.current)
      rightIntervalRef.current = null
    }
  }, [])

  const startFire = useCallback(() => {
    if (disabled) return
    onFire()
    fireIntervalRef.current = setInterval(() => {
      onFire()
    }, 100)
  }, [onFire, disabled])

  const stopFire = useCallback(() => {
    if (fireIntervalRef.current) {
      clearInterval(fireIntervalRef.current)
      fireIntervalRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      stopMoveLeft()
      stopMoveRight()
      stopFire()
    }
  }, [stopMoveLeft, stopMoveRight, stopFire])

  const buttonStyle = {
    width: { xs: 56, sm: 64 },
    height: { xs: 56, sm: 64 },
    bgcolor: alpha('#003049', 0.8),
    border: '2px solid',
    borderColor: alpha('#00ff00', 0.5),
    color: '#00ff00',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.1s ease',
    '&:hover': {
      bgcolor: alpha('#003049', 0.9),
      borderColor: '#00ff00',
    },
    '&:active': {
      animation: `${buttonPress} 0.1s ease`,
      bgcolor: alpha('#00ff00', 0.2),
    },
    '&:disabled': {
      color: alpha('#00ff00', 0.3),
      borderColor: alpha('#00ff00', 0.2),
    },
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: 'flex', md: 'none' }, // Only show on mobile/tablet
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        p: 2,
        pb: 3,
        pointerEvents: 'none',
        zIndex: 150,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          pointerEvents: 'auto',
        }}
      >
        <IconButton
          disabled={disabled}
          onTouchStart={(e) => {
            e.preventDefault()
            startMoveLeft()
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
            stopMoveLeft()
          }}
          onMouseDown={startMoveLeft}
          onMouseUp={stopMoveLeft}
          onMouseLeave={stopMoveLeft}
          sx={{
            ...buttonStyle,
            borderRadius: '12px 4px 4px 12px',
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: 36 }} />
        </IconButton>
        <IconButton
          disabled={disabled}
          onTouchStart={(e) => {
            e.preventDefault()
            startMoveRight()
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
            stopMoveRight()
          }}
          onMouseDown={startMoveRight}
          onMouseUp={stopMoveRight}
          onMouseLeave={stopMoveRight}
          sx={{
            ...buttonStyle,
            borderRadius: '4px 12px 12px 4px',
          }}
        >
          <ChevronRightIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </Box>
      <Box sx={{ pointerEvents: 'auto' }}>
        <IconButton
          disabled={disabled}
          onTouchStart={(e) => {
            e.preventDefault()
            startFire()
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
            stopFire()
          }}
          onMouseDown={startFire}
          onMouseUp={stopFire}
          onMouseLeave={stopFire}
          sx={{
            width: { xs: 72, sm: 80 },
            height: { xs: 72, sm: 80 },
            bgcolor: alpha('#d62828', 0.8),
            border: '3px solid #ff0000',
            color: '#fff',
            borderRadius: '50%',
            backdropFilter: 'blur(8px)',
            animation: disabled ? 'none' : `${fireGlow} 1.5s ease-in-out infinite`,
            transition: 'all 0.1s ease',
            '&:hover': {
              bgcolor: alpha('#d62828', 0.9),
            },
            '&:active': {
              animation: `${buttonPress} 0.1s ease`,
              bgcolor: '#ff0000',
            },
            '&:disabled': {
              animation: 'none',
              color: alpha('#fff', 0.3),
              borderColor: alpha('#ff0000', 0.3),
              bgcolor: alpha('#d62828', 0.3),
            },
          }}
        >
          <AdjustIcon sx={{ fontSize: { xs: 36, sm: 40 } }} />
        </IconButton>
      </Box>
    </Box>
  )
}
