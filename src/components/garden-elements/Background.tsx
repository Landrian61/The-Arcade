import { Box } from '@mui/material'
import { keyframes } from '@mui/system'
import { useArcadeStore } from '@/store/useArcadeStore'
import { FilterVintage, Yard, Agriculture, Grass, EmojiNature, WaterDrop } from '@mui/icons-material'
import { useEffect, useState } from 'react'

// Animation Keyframes
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg) scale(1); }
  33% { transform: translateY(-30px) rotate(10deg) scale(1.1); }
  66% { transform: translateY(10px) rotate(-10deg) scale(0.9); }
  100% { transform: translateY(0px) rotate(0deg) scale(1); }
`

const blink = keyframes`
  0%, 100% { opacity: 0.5; filter: drop-shadow(0 0 0 rgba(0,0,0,0)); }
  50% { opacity: 1; color: #fcbf49 !important; filter: drop-shadow(0 0 15px #fcbf49); transform: scale(1.2); }
`

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-5px, 5px); }
  40% { transform: translate(-5px, -5px); }
  60% { transform: translate(5px, 5px); }
  80% { transform: translate(5px, -5px); }
  100% { transform: translate(0); }
`

const Background = () => {
    const { globalChaosMode } = useArcadeStore()
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        setHydrated(true)
    }, [])

    // Garden symbols pool
    const icons = [FilterVintage, Yard, Agriculture, Grass, EmojiNature, WaterDrop]

    // Generate random particles
    // Adjusted to 50 for balanced background
    const particles = Array.from({ length: 50 }).map((_, i) => {
        const IconComponent = icons[i % icons.length]

        // Random scatter direction (fly away 100-200px)
        const angle = Math.random() * Math.PI * 2
        const distance = 100 + Math.random() * 200
        const scatterX = Math.cos(angle) * distance
        const scatterY = Math.sin(angle) * distance

        return {
            id: i,
            left: `${Math.random() * 50 + 50}%`, // Focus on right side (50% - 100%)
            top: `${Math.random() * 100}%`,
            duration: `${20 + Math.random() * 30}s`,
            blinkDuration: `${2 + Math.random() * 4}s`,
            delay: `${Math.random() * 10}s`,
            size: 20 + Math.random() * 40,
            Icon: IconComponent,
            color: `rgba(255, 255, 255, ${0.4 + Math.random() * 0.5})`, // Brighter base opacity
            rotation: Math.random() * 360,
            scatterX,
            scatterY
        }
    })

    if (!hydrated) return null

    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                background: globalChaosMode
                    ? 'linear-gradient(45deg, #1a0033 0%, #330000 100%)'
                    : 'linear-gradient(180deg, #31004a 0%, #33007b 40%, #4c00a4 100%)',
                overflow: 'hidden',
                transition: 'background 1s ease',
            }}
        >
            {/* Ambient Gradient Blobs */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-20%',
                    left: '20%',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(171, 0, 255, 0.2) 0%, transparent 70%)',
                    animation: `${float} 25s ease-in-out infinite`,
                    filter: 'blur(100px)',
                    pointerEvents: 'none',
                }}
            />

            {/* Interactive Particles */}
            {particles.map((p) => (
                <Box
                    key={p.id}
                    sx={{
                        position: 'absolute',
                        left: p.left,
                        top: p.top,
                        color: globalChaosMode ? 'rgba(255, 0, 0, 0.4)' : p.color,
                        // Combine float and blink animations
                        animation: globalChaosMode
                            ? `${glitch} 0.2s infinite`
                            : `${float} ${p.duration} ease-in-out infinite, ${blink} ${p.blinkDuration} ease-in-out infinite`,
                        animationDelay: p.delay,
                        transform: `rotate(${p.rotation}deg)`,
                        transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
                        cursor: 'crosshair',
                        '&:hover': {
                            // Scatter effect: move away and fade slightly
                            transform: `translate(${p.scatterX}px, ${p.scatterY}px) rotate(${p.rotation + 180}deg) scale(0.5)`,
                            opacity: 0,
                            color: '#fcbf49',
                        }
                    }}
                >
                    <p.Icon sx={{ fontSize: p.size }} />
                </Box>
            ))}
        </Box>
    )
}

export default Background
