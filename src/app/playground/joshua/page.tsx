'use client'

import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Timer, LiveTv } from '@mui/icons-material'
import PomodoroTimer from './components/PomodoroTimer'
import NetflixBrowser from './components/NetflixBrowser'

type PageTab = 'pomodoro' | 'joshflix'

export default function JoshuaPage() {
  const [activeTab, setActiveTab] = useState<PageTab>('pomodoro')

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* Floating Tab Switcher */}
      <Box
        sx={{
          position: 'fixed',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 200,
          display: 'flex',
          gap: '2px',
          bgcolor: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(12px)',
          borderRadius: '10px',
          p: '3px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        <TabButton
          label="Pomodoro"
          icon={<Timer sx={{ fontSize: 16 }} />}
          active={activeTab === 'pomodoro'}
          onClick={() => setActiveTab('pomodoro')}
          activeColor="#f77f00"
        />
        <TabButton
          label="JoshFlix"
          icon={<LiveTv sx={{ fontSize: 16 }} />}
          active={activeTab === 'joshflix'}
          onClick={() => setActiveTab('joshflix')}
          activeColor="#E50914"
        />
      </Box>

      {/* Page Content */}
      {activeTab === 'pomodoro' && <PomodoroTimer />}
      {activeTab === 'joshflix' && <NetflixBrowser />}
    </Box>
  )
}

// ── Tab Button ───────────────────────────────────────────────────

function TabButton({
  label,
  icon,
  active,
  onClick,
  activeColor,
}: {
  label: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
  activeColor: string
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.7,
        px: 2,
        py: 0.8,
        borderRadius: '8px',
        cursor: 'pointer',
        bgcolor: active ? activeColor : 'transparent',
        color: active ? '#fff' : 'rgba(255,255,255,0.5)',
        transition: 'all 0.25s ease',
        '&:hover': {
          color: '#fff',
          bgcolor: active ? activeColor : 'rgba(255,255,255,0.1)',
        },
      }}
    >
      {icon}
      <Typography
        sx={{
          fontSize: '0.8rem',
          fontWeight: 600,
          fontFamily: 'var(--font-outfit)',
          lineHeight: 1,
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}
