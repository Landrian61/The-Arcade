'use client'

import { useEffect, useState, useRef } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  TextField,
  Checkbox,
  Chip,
  CircularProgress,
  Tabs,
  Tab,
  Tooltip,
  alpha,
} from '@mui/material'
import {
  PlayArrow,
  Pause,
  Replay,
  Add,
  Delete,
  Timer,
  EmojiEvents,
  LocalFireDepartment,
  CheckCircle,
  RocketLaunch,
  FitnessCenter,
} from '@mui/icons-material'
import { keyframes } from '@mui/system'
import { usePomodoroStore } from '@/store/usePomodoroStore'

// --- Animations ---
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.04); }
  100% { transform: scale(1); }
`

const glow = keyframes`
  0% { box-shadow: 0 0 10px rgba(247,127,0,0.3); }
  50% { box-shadow: 0 0 30px rgba(247,127,0,0.6), 0 0 60px rgba(247,127,0,0.2); }
  100% { box-shadow: 0 0 10px rgba(247,127,0,0.3); }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`

const neonFlicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 7px #f77f00, 0 0 20px #f77f00, 0 0 40px #f77f00;
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
`

// --- Fonts ---
const graffitiFont = 'var(--font-permanent-marker)'
const cleanFont = 'var(--font-outfit)'
const glitchFont = 'var(--font-rubik-glitch)'

// --- Helpers ---
function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

const MODE_LABELS = {
  focus: 'Focus',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
} as const

const MODE_DURATIONS = {
  focus: 1 * 60,
  shortBreak: 1 * 60,
  longBreak: 5 * 60,
}

const MODE_COLORS = {
  focus: { primary: '#f77f00', bg: 'linear-gradient(160deg, #001520 0%, #003049 40%, #00243a 100%)' },
  shortBreak: { primary: '#4caf50', bg: 'linear-gradient(160deg, #0a1f0a 0%, #1b3a1b 40%, #0f2e0f 100%)' },
  longBreak: { primary: '#2196f3', bg: 'linear-gradient(160deg, #0a1520 0%, #0d2744 40%, #0a1e3a 100%)' },
} as const

// --- Glass card style ---
const glassCard = (border: string) => ({
  background: 'rgba(0, 48, 73, 0.75)',
  backdropFilter: 'blur(16px)',
  border: `1px solid ${border}`,
  borderRadius: '24px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 12px 40px ${alpha(border, 0.25)}`,
  },
})

export default function JoshuaPage() {
  const {
    timerSeconds,
    timerMode,
    isRunning,
    sessionsCompleted,
    habits,
    tick,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
    addHabit,
    toggleHabit,
    removeHabit,
  } = usePomodoroStore()

  const arcadeScore = usePomodoroStore((s) => s.arcadeScore)

  const [newHabit, setNewHabit] = useState('')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Timer tick
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(tick, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, tick])

  const progress = (timerSeconds / MODE_DURATIONS[timerMode]) * 100

  const handleAddHabit = () => {
    const trimmed = newHabit.trim()
    if (!trimmed) return
    addHabit(trimmed)
    setNewHabit('')
  }

  const modeTabIndex = timerMode === 'focus' ? 0 : timerMode === 'shortBreak' ? 1 : 2
  const modeKeys: Array<'focus' | 'shortBreak' | 'longBreak'> = ['focus', 'shortBreak', 'longBreak']
  const modeColor = MODE_COLORS[timerMode]

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: modeColor.bg,
        color: '#eae2b7',
        fontFamily: cleanFont,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.6s ease',
      }}
    >
      {/* Background grid pattern */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          opacity: 0.04,
          backgroundImage:
            `linear-gradient(${modeColor.primary} 1px, transparent 1px), linear-gradient(90deg, ${modeColor.primary} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: 6, pb: 10 }}>
        {/* ─── Header ─── */}
        <Box sx={{ textAlign: 'center', mb: 6, animation: `${fadeIn} 0.6s ease-out` }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: glitchFont,
              fontSize: { xs: '3.5rem', md: '6rem' },
              color: '#fcbf49',
              textShadow: '4px 4px 0px #d62828',
              lineHeight: 1,
            }}
          >
            JOSHUA
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontFamily: graffitiFont,
              color: modeColor.primary,
              mt: 1,
              animation: `${neonFlicker} 4s infinite`,
              transition: 'color 0.6s ease',
            }}
          >
            {MODE_LABELS[timerMode]} Mode
          </Typography>
        </Box>

        {/* ─── Stats Row ─── */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            mb: 5,
            flexWrap: 'wrap',
            animation: `${fadeIn} 0.6s ease-out 0.1s both`,
          }}
        >
          {[
            { icon: <EmojiEvents sx={{ color: '#fcbf49' }} />, label: 'Sessions', value: sessionsCompleted },
            { icon: <LocalFireDepartment sx={{ color: '#d62828' }} />, label: 'Arcade Score', value: arcadeScore },
            {
              icon: <CheckCircle sx={{ color: '#4caf50' }} />,
              label: 'Habits Done',
              value: `${habits.filter((h) => h.completedToday).length}/${habits.length}`,
            },
          ].map((stat) => (
            <Box
              key={stat.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 3,
                py: 1.5,
                borderRadius: '50px',
                background: 'rgba(0,48,73,0.6)',
                border: '1px solid rgba(247,127,0,0.2)',
              }}
            >
              {stat.icon}
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(234,226,183,0.5)', fontSize: '0.7rem' }}>
                  {stat.label}
                </Typography>
                <Typography variant="h6" sx={{ fontFamily: graffitiFont, lineHeight: 1, color: '#eae2b7' }}>
                  {stat.value}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* ─── Main Grid ─── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            alignItems: 'start',
          }}
        >
          {/* ──── Timer Card ──── */}
          <Card
            sx={{
              ...glassCard('#f77f00'),
              animation: `${fadeIn} 0.6s ease-out 0.2s both`,
            }}
          >
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              {/* Mode Tabs */}
              <Tabs
                value={modeTabIndex}
                onChange={(_, v) => switchMode(modeKeys[v])}
                centered
                sx={{
                  mb: 4,
                  '& .MuiTab-root': {
                    color: 'rgba(234,226,183,0.5)',
                    fontFamily: cleanFont,
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    minWidth: 0,
                    px: 2,
                  },
                  '& .Mui-selected': {
                    color: '#f77f00 !important',
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#f77f00',
                    height: 3,
                    borderRadius: 2,
                  },
                }}
              >
                <Tab label="Focus" />
                <Tab label="Short Break" />
                <Tab label="Long Break" />
              </Tabs>

              {/* Circular Timer */}
              <Box sx={{ position: 'relative', display: 'inline-flex', mb: 4 }}>
                {/* Background ring */}
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={220}
                  thickness={3}
                  sx={{ color: 'rgba(247,127,0,0.12)', position: 'absolute' }}
                />
                {/* Progress ring */}
                <CircularProgress
                  variant="determinate"
                  value={progress}
                  size={220}
                  thickness={3}
                  sx={{
                    color: timerMode === 'focus' ? '#f77f00' : timerMode === 'shortBreak' ? '#4caf50' : '#2196f3',
                    transition: 'all 0.3s ease',
                    filter: isRunning ? 'drop-shadow(0 0 8px currentColor)' : 'none',
                    '& .MuiCircularProgress-circle': {
                      strokeLinecap: 'round',
                    },
                  }}
                />
                {/* Time display */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: graffitiFont,
                      fontSize: '3.5rem',
                      color: '#eae2b7',
                      lineHeight: 1,
                      animation: isRunning ? `${pulse} 2s ease-in-out infinite` : 'none',
                    }}
                  >
                    {formatTime(timerSeconds)}
                  </Typography>
                  <Chip
                    icon={<Timer sx={{ color: 'inherit', fontSize: 16 }} />}
                    label={MODE_LABELS[timerMode]}
                    size="small"
                    sx={{
                      mt: 1,
                      bgcolor: 'rgba(247,127,0,0.15)',
                      color: '#f77f00',
                      fontFamily: cleanFont,
                      fontWeight: 600,
                      fontSize: '0.7rem',
                    }}
                  />
                </Box>
              </Box>

              {/* Controls */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Tooltip title="Reset">
                  <IconButton
                    onClick={resetTimer}
                    sx={{
                      bgcolor: 'rgba(234,226,183,0.08)',
                      color: '#eae2b7',
                      width: 52,
                      height: 52,
                      '&:hover': { bgcolor: 'rgba(234,226,183,0.15)' },
                    }}
                  >
                    <Replay />
                  </IconButton>
                </Tooltip>

                <Button
                  variant="contained"
                  onClick={isRunning ? pauseTimer : startTimer}
                  startIcon={isRunning ? <Pause /> : <PlayArrow />}
                  sx={{
                    bgcolor: isRunning ? '#d62828' : '#f77f00',
                    color: '#003049',
                    fontFamily: graffitiFont,
                    fontSize: '1.1rem',
                    px: 5,
                    py: 1.5,
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    animation: isRunning ? 'none' : `${glow} 3s ease-in-out infinite`,
                    '&:hover': {
                      bgcolor: isRunning ? '#b01e1e' : '#e06f00',
                    },
                  }}
                >
                  {isRunning ? 'Pause' : 'Start'}
                </Button>
              </Box>

              {/* Session counter */}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: i < sessionsCompleted % 4 ? '#f77f00' : 'rgba(247,127,0,0.15)',
                      border: '1px solid rgba(247,127,0,0.3)',
                      transition: 'all 0.3s',
                      boxShadow: i < sessionsCompleted % 4 ? '0 0 8px #f77f00' : 'none',
                    }}
                  />
                ))}
                <Typography
                  variant="caption"
                  sx={{ color: 'rgba(234,226,183,0.4)', ml: 1, alignSelf: 'center', fontSize: '0.7rem' }}
                >
                  until long break
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* ──── Habit Tracker Card ──── */}
          <Card
            sx={{
              ...glassCard('#fcbf49'),
              animation: `${fadeIn} 0.6s ease-out 0.3s both`,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <FitnessCenter sx={{ color: '#fcbf49', fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontFamily: graffitiFont, color: '#fcbf49' }}>
                  Daily Habits
                </Typography>
              </Box>

              {/* Add habit input */}
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <TextField
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddHabit()}
                  placeholder="Add a new habit..."
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#eae2b7',
                      fontFamily: cleanFont,
                      borderRadius: '12px',
                      '& fieldset': { borderColor: 'rgba(252,191,73,0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(252,191,73,0.4)' },
                      '&.Mui-focused fieldset': { borderColor: '#fcbf49' },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(234,226,183,0.3)',
                    },
                  }}
                />
                <IconButton
                  onClick={handleAddHabit}
                  sx={{
                    bgcolor: '#fcbf49',
                    color: '#003049',
                    borderRadius: '12px',
                    width: 42,
                    height: 42,
                    '&:hover': { bgcolor: '#f0b030' },
                  }}
                >
                  <Add />
                </IconButton>
              </Box>

              {/* Habit list */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {habits.length === 0 && (
                  <Typography
                    sx={{ color: 'rgba(234,226,183,0.3)', textAlign: 'center', py: 4, fontStyle: 'italic' }}
                  >
                    No habits yet. Add one above!
                  </Typography>
                )}
                {habits.map((habit) => (
                  <Box
                    key={habit.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 1,
                      borderRadius: '14px',
                      background: habit.completedToday
                        ? 'rgba(76,175,80,0.1)'
                        : 'rgba(234,226,183,0.04)',
                      border: habit.completedToday
                        ? '1px solid rgba(76,175,80,0.3)'
                        : '1px solid rgba(234,226,183,0.06)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Checkbox
                      checked={habit.completedToday}
                      onChange={() => toggleHabit(habit.id)}
                      sx={{
                        color: 'rgba(234,226,183,0.3)',
                        '&.Mui-checked': { color: '#4caf50' },
                        p: 0.5,
                      }}
                    />
                    <Typography
                      sx={{
                        flex: 1,
                        color: habit.completedToday ? 'rgba(234,226,183,0.5)' : '#eae2b7',
                        textDecoration: habit.completedToday ? 'line-through' : 'none',
                        fontFamily: cleanFont,
                        fontSize: '0.95rem',
                        transition: 'all 0.2s',
                      }}
                    >
                      {habit.name}
                    </Typography>

                    {/* Streak badge */}
                    {habit.streak > 0 && (
                      <Chip
                        icon={<LocalFireDepartment sx={{ fontSize: 14, color: '#d62828 !important' }} />}
                        label={habit.streak}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(214,40,40,0.12)',
                          color: '#d62828',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          height: 26,
                          '& .MuiChip-icon': { ml: 0.5 },
                        }}
                      />
                    )}

                    <Tooltip title="Remove">
                      <IconButton
                        onClick={() => removeHabit(habit.id)}
                        size="small"
                        sx={{
                          color: 'rgba(234,226,183,0.2)',
                          '&:hover': { color: '#d62828' },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ))}
              </Box>

              {/* Motivational footer */}
              {habits.length > 0 && habits.every((h) => h.completedToday) && (
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(247,127,0,0.15), rgba(252,191,73,0.1))',
                    border: '1px solid rgba(247,127,0,0.2)',
                    textAlign: 'center',
                  }}
                >
                  <RocketLaunch sx={{ color: '#f77f00', fontSize: 28, mb: 0.5 }} />
                  <Typography sx={{ fontFamily: graffitiFont, color: '#fcbf49', fontSize: '1rem' }}>
                    All habits complete! You&apos;re on fire!
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}
