import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useDesignGardenStore } from '@/store/useDesignGardenStore'
import { Face2 } from '@mui/icons-material'
import Image from 'next/image'

const Character = () => {
    const { activeComponentId, isPreviewOpen } = useDesignGardenStore()

    return (
        <Box
            sx={{
                position: 'fixed',
                right: '5%',
                bottom: '10%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 50,
            }}
        >
            {/* Speech Bubble */}
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: 20 }}
            >
                <Box sx={{
                    background: '#fff',
                    color: '#000',
                    padding: '12px 24px',
                    borderRadius: '24px 24px 0 24px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                    maxWidth: 200,
                    textAlign: 'center',
                    fontFamily: 'var(--font-permanent-marker)',
                }}>
                    {activeComponentId ? "That's a great choice! ✨" : "Welcome to the garden."}
                </Box>
            </motion.div>

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
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '100px',
                        background: 'linear-gradient(to top, rgba(49, 0, 74, 1) 0%, transparent 100%)',
                        pointerEvents: 'none',
                        zIndex: 1
                    }
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
