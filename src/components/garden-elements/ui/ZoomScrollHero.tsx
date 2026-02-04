import { useRef, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

interface ZoomScrollHeroProps {
    variant?: 'default' | 'parallax' | 'dark'
}

export const ZoomScrollHero = ({ variant = 'default' }: ZoomScrollHeroProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1.3)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Handle scroll events to update the zoom scale
        const handleScroll = () => {
            const scrollTop = container.scrollTop
            const scrollHeight = container.scrollHeight - container.clientHeight

            // Calculate zoom progress: 0 (top) to 1 (bottom)
            const progress = Math.min(scrollTop / scrollHeight, 1)

            // Scale from 1.3 (zoomed in) to 1.0 (normal) as user scrolls down
            const newScale = 1.3 - (progress * 0.3)
            setScale(newScale)
        }

        container.addEventListener('scroll', handleScroll)
        handleScroll() // Initialize on mount

        return () => container.removeEventListener('scroll', handleScroll)
    }, [])

    const isDark = variant === 'dark'

    return (
        <Box
            ref={containerRef}
            sx={{
                width: '100%',
                height: '500px', // Fixed height for preview window
                overflowY: 'scroll',
                overflowX: 'hidden',
                position: 'relative',
                '&::-webkit-scrollbar': { width: '8px' },
                '&::-webkit-scrollbar-track': { background: 'rgba(255,255,255,0.1)' },
                '&::-webkit-scrollbar-thumb': { background: '#fcbf49', borderRadius: '4px' }
            }}
        >
            {/* Scroll container - shorter height for quick effect demonstration */}
            <Box sx={{ height: '150vh', position: 'relative' }}>
                {/* Sticky viewport that stays in view while scrolling */}
                <Box
                    sx={{
                        position: 'sticky',
                        top: 0,
                        width: '100%',
                        height: '500px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}
                >
                    {/* Background with zoom effect - detailed pattern makes zoom very visible */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            // Detailed pattern background with circles - zoom effect is very visible
                            background: isDark
                                ? `
                                    radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
                                    radial-gradient(circle at 80% 80%, rgba(72, 52, 212, 0.5) 0%, transparent 50%),
                                    radial-gradient(circle at 40% 20%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
                                    repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,0.6) 50px, rgba(0,0,0,0.6) 51px),
                                    repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.6) 50px, rgba(0,0,0,0.6) 51px),
                                    linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)
                                `
                                : `
                                    radial-gradient(circle at 20% 50%, rgba(251, 207, 232, 0.9) 0%, transparent 50%),
                                    radial-gradient(circle at 80% 80%, rgba(191, 219, 254, 0.9) 0%, transparent 50%),
                                    radial-gradient(circle at 40% 20%, rgba(254, 202, 202, 0.9) 0%, transparent 50%),
                                    repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,0.5) 50px, rgba(0,0,0,0.5) 51px),
                                    repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.5) 50px, rgba(0,0,0,0.5) 51px),
                                    linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)
                                `,
                            transform: `scale(${scale})`, // Apply zoom transformation
                            transition: 'transform 0.1s ease-out',
                            transformOrigin: 'center center'
                        }}
                    />

                    {/* Content overlay - customizable text */}
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 10,
                            textAlign: 'center',
                            color: 'white',
                            maxWidth: '600px',
                            px: 3
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 900,
                                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                mb: 2,
                                textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                            }}
                        >
                            Your Hero Title
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 400,
                                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                                opacity: 0.9,
                                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                            }}
                        >
                            Scroll down to see the background zoom out smoothly
                        </Typography>
                    </Box>

                    {/* Scroll indicator */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '2rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'white',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            textAlign: 'center',
                            zIndex: 10,
                            background: 'rgba(0,0,0,0.3)',
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            backdropFilter: 'blur(10px)',
                            animation: 'bounce 2s infinite'
                        }}
                    >
                        ↓ Scroll Down ↓
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
