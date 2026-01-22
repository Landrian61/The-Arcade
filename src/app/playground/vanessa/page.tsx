'use client'

import { useArcadeStore } from '@/store/useArcadeStore'
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Fab, 
  Button,
  useTheme,
  alpha,
  Avatar,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material'
import { 
  AutoAwesome, 
  RocketLaunch, 
  Psychology, 
  Code, 
  Palette,
  Star,
  FlashOn,
  Explore,
  Speed,
  TrendingUp
} from '@mui/icons-material'
import { useState, useEffect, useRef, useCallback } from 'react'
import { keyframes } from '@mui/system'

// ========== ANIMATIONS ==========
const cosmicFloat = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
  25% { transform: translate(10px, -15px) rotate(5deg) scale(1.05); }
  50% { transform: translate(-10px, -20px) rotate(-5deg) scale(0.95); }
  75% { transform: translate(15px, -10px) rotate(3deg) scale(1.02); }
`

const particleGlow = keyframes`
  0%, 100% { 
    opacity: 0.3;
    transform: scale(1);
    box-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
  }
  50% { 
    opacity: 1;
    transform: scale(1.2);
    box-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor;
  }
`

const hexagonRotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const glitchText = keyframes`
  0%, 100% { 
    transform: translate(0);
    text-shadow: 0 0 20px #fcbf49, 0 0 40px #f77f00;
  }
  20% { 
    transform: translate(-2px, 2px);
    text-shadow: -2px 0 #d62828, 2px 0 #f77f00;
  }
  40% { 
    transform: translate(2px, -2px);
    text-shadow: 2px 0 #fcbf49, -2px 0 #d62828;
  }
  60% { 
    transform: translate(-2px, -2px);
    text-shadow: -2px 0 #f77f00, 2px 0 #fcbf49;
  }
  80% { 
    transform: translate(2px, 2px);
    text-shadow: 2px 0 #d62828, -2px 0 #f77f00;
  }
`

const energyPulse = keyframes`
  0%, 100% { 
    opacity: 0.6;
    transform: scale(1);
    filter: brightness(1);
  }
  50% { 
    opacity: 1;
    transform: scale(1.1);
    filter: brightness(1.5);
  }
`

const matrixRain = keyframes`
  0% { transform: translateY(-100vh); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
`

// ========== PARTICLE SYSTEM ==========
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
}

export default function VanessaPage() {
  const { arcadeScore, incrementScore, globalChaosMode } = useArcadeStore()
  const theme = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [orbPosition, setOrbPosition] = useState({ x: 50, y: 50 })
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [energyLevel, setEnergyLevel] = useState(0)
  const animationFrameRef = useRef<number>()

  const colors = ['#fcbf49', '#f77f00', '#d62828', '#003049', '#eae2b7']

  // Initialize particles
  useEffect(() => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random(),
        maxLife: Math.random() * 100 + 50
      })
    }
    setParticles(newParticles)
  }, [])

  // Mouse tracking for interactive orb
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setOrbPosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Particle animation
  useEffect(() => {
    const animate = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.vx + window.innerWidth) % window.innerWidth,
        y: (p.y + p.vy + window.innerHeight) % window.innerHeight,
        life: (p.life + 1) % p.maxLife
      })))
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Energy pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyLevel(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw connections between particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            ctx.strokeStyle = alpha(p1.color, 0.2 * (1 - distance / 150))
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      // Draw particles
      particles.forEach(p => {
        const opacity = Math.sin((p.life / p.maxLife) * Math.PI)
        ctx.fillStyle = alpha(p.color, opacity * 0.8)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(draw)
    }
    draw()

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [particles])

  const handleEnergyBoost = () => {
    incrementScore()
    setEnergyLevel(100)
    // Create burst of particles
    const burst: Particle[] = []
    for (let i = 0; i < 20; i++) {
      burst.push({
        x: mousePos.x,
        y: mousePos.y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: 30
      })
    }
    setParticles(prev => [...prev, ...burst])
  }

  const cards = [
    {
      icon: <Code sx={{ fontSize: 40 }} />,
      title: 'Code Alchemy',
      description: 'Transforming ideas into digital reality',
      color: '#fcbf49',
      gradient: 'linear-gradient(135deg, rgba(252, 191, 73, 0.2) 0%, rgba(247, 127, 0, 0.2) 100%)'
    },
    {
      icon: <AutoAwesome sx={{ fontSize: 40 }} />,
      title: 'Creative Vision',
      description: 'Where imagination meets innovation',
      color: '#f77f00',
      gradient: 'linear-gradient(135deg, rgba(247, 127, 0, 0.2) 0%, rgba(214, 40, 40, 0.2) 100%)'
    },
    {
      icon: <Psychology sx={{ fontSize: 40 }} />,
      title: 'Mind Forge',
      description: 'Crafting solutions to complex problems',
      color: '#d62828',
      gradient: 'linear-gradient(135deg, rgba(214, 40, 40, 0.2) 0%, rgba(0, 48, 73, 0.2) 100%)'
    },
    {
      icon: <Palette sx={{ fontSize: 40 }} />,
      title: 'Visual Symphony',
      description: 'Designing experiences that resonate',
      color: '#003049',
      gradient: 'linear-gradient(135deg, rgba(0, 48, 73, 0.2) 0%, rgba(234, 226, 183, 0.2) 100%)'
    }
  ]

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: globalChaosMode
          ? '#000'
          : 'radial-gradient(ellipse at center, #021a29 0%, #000000 100%)',
        color: '#eae2b7',
        fontFamily: 'var(--font-outfit)',
      }}
    >
      {/* Canvas for particle system */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Animated background orbs */}
      <Box
        sx={{
          position: 'fixed',
          top: `${orbPosition.y}%`,
          left: `${orbPosition.x}%`,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(252, 191, 73, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s ease-out',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          top: `${100 - orbPosition.y}%`,
          left: `${100 - orbPosition.x}%`,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(247, 127, 0, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.4s ease-out',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Hexagonal grid overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(252, 191, 73, 0.03) 50px, rgba(252, 191, 73, 0.03) 51px),
            repeating-linear-gradient(60deg, transparent, transparent 50px, rgba(247, 127, 0, 0.03) 50px, rgba(247, 127, 0, 0.03) 51px),
            repeating-linear-gradient(120deg, transparent, transparent 50px, rgba(214, 40, 40, 0.03) 50px, rgba(214, 40, 40, 0.03) 51px)
          `,
          zIndex: 0,
          pointerEvents: 'none',
          animation: `${hexagonRotate} 120s linear infinite`
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, pt: 8, pb: 12 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8, position: 'relative' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '4rem', md: '8rem' },
              fontFamily: 'var(--font-rubik-glitch)',
              color: '#fcbf49',
              textShadow: `
                0 0 20px rgba(252, 191, 73, 0.5),
                0 0 40px rgba(247, 127, 0, 0.3),
                0 0 60px rgba(214, 40, 40, 0.2),
                4px 4px 0px #d62828
              `,
              mb: 2,
              animation: `${glitchText} 3s ease-in-out infinite`,
              position: 'relative',
              display: 'inline-block'
            }}
          >
            VANESSA
          </Typography>
          
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'var(--font-permanent-marker)',
              color: '#eae2b7',
              mb: 4,
              opacity: 0.9,
              textShadow: '0 0 10px rgba(234, 226, 183, 0.5)'
            }}
          >
            Digital Dimension Explorer
          </Typography>

          {/* Stats Bar */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              p: 3,
              background: 'rgba(0, 48, 73, 0.3)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(252, 191, 73, 0.3)',
              borderRadius: '50px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Star sx={{ color: '#fcbf49', fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontFamily: 'var(--font-permanent-marker)', color: '#fcbf49' }}>
                {arcadeScore.toString().padStart(4, '0')}
              </Typography>
            </Box>
            <Box sx={{ width: '1px', height: '30px', bgcolor: 'rgba(252, 191, 73, 0.3)' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlashOn sx={{ color: '#f77f00', fontSize: 28 }} />
              <Box sx={{ width: '100px', height: '8px', bgcolor: 'rgba(0, 48, 73, 0.5)', borderRadius: '4px', overflow: 'hidden' }}>
                <Box
                  sx={{
                    width: `${energyLevel}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #f77f00, #fcbf49)',
                    borderRadius: '4px',
                    boxShadow: '0 0 10px rgba(247, 127, 0, 0.8)',
                    animation: `${energyPulse} 2s ease-in-out infinite`
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Interactive Cards Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 4,
            mb: 6
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              sx={{
                background: activeCard === index
                  ? card.gradient
                  : 'rgba(0, 48, 73, 0.2)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${alpha(card.color, activeCard === index ? 0.6 : 0.2)}`,
                borderRadius: '24px',
                overflow: 'visible',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                position: 'relative',
                transform: activeCard === index ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: activeCard === index
                  ? `0 20px 50px -10px ${alpha(card.color, 0.4)}`
                  : '0 8px 32px rgba(0, 0, 0, 0.3)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${alpha(card.color, 0.1)} 0%, transparent 100%)`,
                  borderRadius: '24px',
                  opacity: activeCard === index ? 1 : 0,
                  transition: 'opacity 0.4s ease'
                }
              }}
            >
              <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                <Box
                  sx={{
                    mb: 3,
                    color: card.color,
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '16px',
                    background: alpha(card.color, 0.1),
                    transform: activeCard === index ? 'rotate(5deg) scale(1.1)' : 'rotate(0) scale(1)',
                    transition: 'all 0.4s ease',
                    animation: activeCard === index ? `${cosmicFloat} 2s ease-in-out infinite` : 'none'
                  }}
                >
                  {card.icon}
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: 'var(--font-permanent-marker)',
                    color: '#eae2b7',
                    mb: 2,
                    textShadow: activeCard === index ? `0 0 20px ${alpha(card.color, 0.8)}` : 'none',
                    transition: 'all 0.4s ease'
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: alpha('#eae2b7', 0.7),
                    lineHeight: 1.6,
                    fontSize: '1rem'
                  }}
                >
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Feature Showcase */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: 4,
            mb: 6
          }}
        >
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(252, 191, 73, 0.15) 0%, rgba(247, 127, 0, 0.15) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(252, 191, 73, 0.3)',
              borderRadius: '24px',
              p: 4,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(252, 191, 73, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                animation: `${cosmicFloat} 4s ease-in-out infinite`
              }}
            />
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Explore sx={{ fontSize: 48, color: '#fcbf49' }} />
                <Typography variant="h4" sx={{ fontFamily: 'var(--font-permanent-marker)', color: '#fcbf49' }}>
                  Explore
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: '#eae2b7', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Journey through digital realms where code becomes art and ideas transform into reality. 
                Every interaction is a step into the unknown, every creation a new dimension.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(214, 40, 40, 0.15) 0%, rgba(0, 48, 73, 0.15) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(214, 40, 40, 0.3)',
              borderRadius: '24px',
              p: 4,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                bottom: -50,
                left: -50,
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(214, 40, 40, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                animation: `${cosmicFloat} 5s ease-in-out infinite reverse`
              }}
            />
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Speed sx={{ fontSize: 48, color: '#d62828' }} />
                <Typography variant="h4" sx={{ fontFamily: 'var(--font-permanent-marker)', color: '#d62828' }}>
                  Accelerate
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: '#eae2b7', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Push boundaries, break limits, and accelerate innovation. 
                In this space, speed meets precision, and every moment is an opportunity to evolve.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Floating Action Button */}
        <Fab
          onClick={handleEnergyBoost}
          sx={{
            position: 'fixed',
            bottom: 40,
            right: 40,
            width: 80,
            height: 80,
            bgcolor: '#f77f00',
            color: '#fff',
            border: '4px solid #fcbf49',
            boxShadow: `
              0 0 20px rgba(247, 127, 0, 0.6),
              0 0 40px rgba(252, 191, 73, 0.4),
              inset 0 0 20px rgba(255, 255, 255, 0.1)
            `,
            zIndex: 100,
            animation: `${particleGlow} 2s ease-in-out infinite`,
            '&:hover': {
              bgcolor: '#fcbf49',
              transform: 'scale(1.1) rotate(15deg)',
              boxShadow: `
                0 0 30px rgba(252, 191, 73, 0.8),
                0 0 60px rgba(247, 127, 0, 0.6),
                inset 0 0 30px rgba(255, 255, 255, 0.2)
              `
            },
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          <RocketLaunch sx={{ fontSize: 40 }} />
        </Fab>
      </Container>
    </Box>
  )
}
