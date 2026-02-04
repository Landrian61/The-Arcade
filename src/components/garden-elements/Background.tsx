import { Box } from '@mui/material'
import { keyframes } from '@mui/system'
import { useArcadeStore } from '@/store/useArcadeStore'

// Animation Keyframes
const float = keyframes`
  0% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-20px) scale(1.1); }
  100% { transform: translateY(0px) scale(1); }
`

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`

const Background = () => {
    const { globalChaosMode } = useArcadeStore()

    // Generate random particles (petal-like or glitchy)
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${10 + Math.random() * 20}s`,
        delay: `${Math.random() * 5}s`,
        size: `${10 + Math.random() * 30}px`,
    }))

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
                    animation: `${float} 15s ease-in-out infinite`,
                    filter: 'blur(80px)',
                }}
            />

            {/* Particles */}
            {particles.map((p) => (
                <Box
                    key={p.id}
                    sx={{
                        position: 'absolute',
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        borderRadius: globalChaosMode ? '0%' : '50% 0 50% 0', // Square if chaos, petal if calm
                        background: globalChaosMode
                            ? 'rgba(255, 0, 0, 0.3)'
                            : 'rgba(255, 255, 255, 0.05)',
                        animation: globalChaosMode
                            ? `${glitch} 0.5s infinite`
                            : `${float} ${p.duration} ease-in-out infinite`,
                        animationDelay: p.delay,
                        transform: 'rotate(-45deg)',
                    }}
                />
            ))}
        </Box>
    )
}

export default Background
