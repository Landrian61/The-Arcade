'use client'

import { useState, useEffect } from 'react'
import { useArcadeStore } from '@/store/useArcadeStore'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  LinearProgress,
  Chip,
  useTheme,
  alpha,
} from '@mui/material'
import { Add, Remove, Refresh, LocalCafe, WaterDrop, Favorite } from '@mui/icons-material'
import { keyframes } from '@mui/system'

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px) rotate(-2deg); }
  75% { transform: translateX(3px) rotate(2deg); }
`

const glow = keyframes`
  0% { box-shadow: 0 0 5px currentColor; }
  50% { box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
  100% { box-shadow: 0 0 5px currentColor; }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

// Goals
const WATER_GOAL = 8 // glasses
const COFFEE_LIMIT = 4 // cups recommended max

export default function YapyekoPage() {
  const { arcadeScore, incrementScore } = useArcadeStore()
  const theme = useTheme()

  const [waterCount, setWaterCount] = useState(0)
  const [coffeeCount, setCoffeeCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [lastAction, setLastAction] = useState<'water' | 'coffee' | null>(null)

  useEffect(() => setMounted(true), [])

  const addWater = () => {
    setWaterCount((prev) => prev + 1)
    setLastAction('water')
    incrementScore()
    setTimeout(() => setLastAction(null), 500)
  }

  const removeWater = () => {
    if (waterCount > 0) setWaterCount((prev) => prev - 1)
  }

  const addCoffee = () => {
    setCoffeeCount((prev) => prev + 1)
    setLastAction('coffee')
    incrementScore()
    setTimeout(() => setLastAction(null), 500)
  }

  const removeCoffee = () => {
    if (coffeeCount > 0) setCoffeeCount((prev) => prev - 1)
  }

  const resetDay = () => {
    setWaterCount(0)
    setCoffeeCount(0)
  }

  const waterProgress = Math.min((waterCount / WATER_GOAL) * 100, 100)
  const coffeeProgress = Math.min((coffeeCount / COFFEE_LIMIT) * 100, 100)
  const isOverCaffeinated = coffeeCount > COFFEE_LIMIT

  if (!mounted) return null

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: 4,
        fontFamily: 'var(--font-outfit)',
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'var(--font-permanent-marker)',
              color: '#eae2b7',
              mb: 1,
              animation: `${float} 3s ease-in-out infinite`,
            }}
          >
            Potion Inventory
          </Typography>
          <Typography sx={{ color: alpha('#eae2b7', 0.7), fontSize: '1.1rem' }}>
            Track your daily elixirs, adventurer!
          </Typography>
          <Chip
            icon={<Favorite sx={{ color: '#d62828' }} />}
            label={`Arcade Score: ${arcadeScore}`}
            sx={{
              mt: 2,
              backgroundColor: alpha('#fcbf49', 0.2),
              color: '#fcbf49',
              fontWeight: 600,
            }}
          />
        </Box>

        {/* Potions Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
          }}
        >
          {/* Water Card */}
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.15) 0%, rgba(0, 119, 182, 0.25) 100%)',
              backdropFilter: 'blur(10px)',
              border: '2px solid',
              borderColor: waterProgress >= 100 ? '#00b4d8' : alpha('#00b4d8', 0.3),
              borderRadius: 4,
              overflow: 'visible',
              transition: 'all 0.3s ease',
              animation: lastAction === 'water' ? `${pulse} 0.3s ease` : 'none',
              ...(waterProgress >= 100 && {
                animation: `${glow} 2s ease-in-out infinite`,
                color: '#00b4d8',
              }),
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <WaterDrop sx={{ fontSize: 40, color: '#00b4d8', mr: 2 }} />
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ color: '#eae2b7', fontWeight: 600 }}
                  >
                    Elixir of Vitality
                  </Typography>
                  <Typography sx={{ color: alpha('#eae2b7', 0.6), fontSize: '0.9rem' }}>
                    +10 HP per glass
                  </Typography>
                </Box>
              </Box>

              {/* Water Visual */}
              <Box
                sx={{
                  position: 'relative',
                  width: 120,
                  height: 160,
                  margin: '0 auto 24px',
                  border: '4px solid',
                  borderColor: alpha('#00b4d8', 0.5),
                  borderRadius: '0 0 20px 20px',
                  borderTop: 'none',
                  overflow: 'hidden',
                  background: alpha('#000', 0.3),
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${waterProgress}%`,
                    background: 'linear-gradient(180deg, #48cae4 0%, #0077b6 100%)',
                    transition: 'height 0.5s ease',
                    borderRadius: '0 0 16px 16px',
                  }}
                />
                <Typography
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '2rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {waterCount}
                </Typography>
              </Box>

              {/* Progress */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: alpha('#eae2b7', 0.7), fontSize: '0.85rem' }}>
                    Progress
                  </Typography>
                  <Typography sx={{ color: '#00b4d8', fontWeight: 600 }}>
                    {waterCount} / {WATER_GOAL} glasses
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={waterProgress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: alpha('#00b4d8', 0.2),
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #48cae4, #0077b6)',
                      borderRadius: 5,
                    },
                  }}
                />
              </Box>

              {/* Controls */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton
                  onClick={removeWater}
                  disabled={waterCount === 0}
                  sx={{
                    backgroundColor: alpha('#00b4d8', 0.2),
                    color: '#00b4d8',
                    '&:hover': { backgroundColor: alpha('#00b4d8', 0.3) },
                    '&:disabled': { opacity: 0.3 },
                  }}
                >
                  <Remove />
                </IconButton>
                <Button
                  variant="contained"
                  onClick={addWater}
                  startIcon={<WaterDrop />}
                  sx={{
                    backgroundColor: '#00b4d8',
                    '&:hover': { backgroundColor: '#0077b6' },
                    px: 3,
                  }}
                >
                  Drink Water
                </Button>
                <IconButton
                  onClick={addWater}
                  sx={{
                    backgroundColor: alpha('#00b4d8', 0.2),
                    color: '#00b4d8',
                    '&:hover': { backgroundColor: alpha('#00b4d8', 0.3) },
                  }}
                >
                  <Add />
                </IconButton>
              </Box>

              {waterProgress >= 100 && (
                <Typography
                  sx={{
                    textAlign: 'center',
                    mt: 2,
                    color: '#00b4d8',
                    fontWeight: 600,
                  }}
                >
                  🎉 Quest Complete! Stay hydrated!
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Coffee Card */}
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.2) 0%, rgba(101, 67, 33, 0.3) 100%)',
              backdropFilter: 'blur(10px)',
              border: '2px solid',
              borderColor: isOverCaffeinated ? '#d62828' : alpha('#c9a227', 0.3),
              borderRadius: 4,
              overflow: 'visible',
              transition: 'all 0.3s ease',
              animation: lastAction === 'coffee'
                ? `${shake} 0.3s ease`
                : isOverCaffeinated
                ? `${shake} 0.5s ease-in-out infinite`
                : 'none',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LocalCafe sx={{ fontSize: 40, color: '#c9a227', mr: 2 }} />
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ color: '#eae2b7', fontWeight: 600 }}
                  >
                    Potion of Haste
                  </Typography>
                  <Typography sx={{ color: alpha('#eae2b7', 0.6), fontSize: '0.9rem' }}>
                    +20 Speed, -5 Sleep
                  </Typography>
                </Box>
              </Box>

              {/* Coffee Visual */}
              <Box
                sx={{
                  position: 'relative',
                  width: 120,
                  height: 160,
                  margin: '0 auto 24px',
                  border: '4px solid',
                  borderColor: isOverCaffeinated ? '#d62828' : alpha('#c9a227', 0.5),
                  borderRadius: '0 0 20px 20px',
                  borderTop: 'none',
                  overflow: 'hidden',
                  background: alpha('#000', 0.3),
                  transition: 'border-color 0.3s ease',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${coffeeProgress}%`,
                    background: isOverCaffeinated
                      ? 'linear-gradient(180deg, #d62828 0%, #8B0000 100%)'
                      : 'linear-gradient(180deg, #c9a227 0%, #6F4E37 100%)',
                    transition: 'height 0.5s ease, background 0.3s ease',
                    borderRadius: '0 0 16px 16px',
                  }}
                />
                <Typography
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '2rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {coffeeCount}
                </Typography>
              </Box>

              {/* Status */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: alpha('#eae2b7', 0.7), fontSize: '0.85rem' }}>
                    Caffeine Level
                  </Typography>
                  <Typography
                    sx={{
                      color: isOverCaffeinated ? '#d62828' : '#c9a227',
                      fontWeight: 600,
                    }}
                  >
                    {coffeeCount} / {COFFEE_LIMIT} cups
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={coffeeProgress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: alpha('#c9a227', 0.2),
                    '& .MuiLinearProgress-bar': {
                      background: isOverCaffeinated
                        ? 'linear-gradient(90deg, #d62828, #8B0000)'
                        : 'linear-gradient(90deg, #c9a227, #6F4E37)',
                      borderRadius: 5,
                    },
                  }}
                />
              </Box>

              {/* Controls */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton
                  onClick={removeCoffee}
                  disabled={coffeeCount === 0}
                  sx={{
                    backgroundColor: alpha('#c9a227', 0.2),
                    color: '#c9a227',
                    '&:hover': { backgroundColor: alpha('#c9a227', 0.3) },
                    '&:disabled': { opacity: 0.3 },
                  }}
                >
                  <Remove />
                </IconButton>
                <Button
                  variant="contained"
                  onClick={addCoffee}
                  startIcon={<LocalCafe />}
                  sx={{
                    backgroundColor: '#c9a227',
                    color: '#1a1a2e',
                    '&:hover': { backgroundColor: '#a68b1f' },
                    px: 3,
                  }}
                >
                  Brew Coffee
                </Button>
                <IconButton
                  onClick={addCoffee}
                  sx={{
                    backgroundColor: alpha('#c9a227', 0.2),
                    color: '#c9a227',
                    '&:hover': { backgroundColor: alpha('#c9a227', 0.3) },
                  }}
                >
                  <Add />
                </IconButton>
              </Box>

              {isOverCaffeinated && (
                <Typography
                  sx={{
                    textAlign: 'center',
                    mt: 2,
                    color: '#d62828',
                    fontWeight: 600,
                  }}
                >
                  ⚠️ Warning: Jitter debuff active!
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Reset Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={resetDay}
            startIcon={<Refresh />}
            sx={{
              borderColor: alpha('#eae2b7', 0.3),
              color: '#eae2b7',
              '&:hover': {
                borderColor: '#eae2b7',
                backgroundColor: alpha('#eae2b7', 0.1),
              },
            }}
          >
            New Day (Reset Inventory)
          </Button>
        </Box>

        {/* Tips */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: alpha('#eae2b7', 0.05),
            borderRadius: 3,
            border: `1px solid ${alpha('#eae2b7', 0.1)}`,
          }}
        >
          <Typography sx={{ color: '#fcbf49', fontWeight: 600, mb: 1 }}>
            📜 Adventurer&apos;s Tips
          </Typography>
          <Typography sx={{ color: alpha('#eae2b7', 0.7), fontSize: '0.9rem' }}>
            • Drink 8 glasses of water daily for maximum HP regeneration<br />
            • Limit coffee to 4 cups to avoid the Jitter debuff<br />
            • Each potion consumed adds +1 to your Arcade Score!
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
