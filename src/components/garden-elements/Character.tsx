import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useDesignGardenStore } from '@/store/useDesignGardenStore'
import { Face2 } from '@mui/icons-material'
import Image from 'next/image'

const Character = () => {
    const { activeComponentId, isPreviewOpen } = useDesignGardenStore()

    // Dynamic message based on state
    const getMessage = () => {
        return "Welcome to my garden! Click a component to explore how it works and see its versions!"
    }

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                zIndex: 50,
            }}
        >
            {/* Speech Bubble - Always Visible */}
            <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                sx={{
                    position: 'relative',
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#31004a',
                    padding: '12px 20px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    maxWidth: '250px',
                    textAlign: 'center',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '10px solid transparent',
                        borderRight: '10px solid transparent',
                        borderTop: '10px solid rgba(255, 255, 255, 0.95)',
                    }
                }}
            >
                <Typography variant="body2" sx={{ fontWeight: 'bold', fontFamily: 'var(--font-outfit)' }}>
                    {getMessage()}
                </Typography>
            </Box>

            {/* Character Avatar */}
            <Box
                component={motion.div}
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                }}
                sx={{
                    width: 300,
                    height: 420,
                    position: 'relative',
                }}
            >
                {/* Character Image */}
                <Image
                    src="/images/devkiran.png"
                    alt="Shakiran Character"
                    fill
                    style={{
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                    }}
                />

            </Box>

            {/* Identity Label */}
            <Box sx={{
                mt: 2,
                textAlign: 'center',
                background: 'rgba(0,0,0,0.3)',
                padding: '8px 16px',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)'
            }}>
                <Typography variant="h6" sx={{ color: '#fff', fontFamily: 'var(--font-outfit)', fontSize: '1rem' }}>
                    SHAKIRAN
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', letterSpacing: 1 }}>
                    UI GARDENER
                </Typography>
            </Box>
        </Box>
    )
}

export default Character
