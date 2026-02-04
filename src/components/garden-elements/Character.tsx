import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useDesignGardenStore } from '@/store/useDesignGardenStore'
import { Face2 } from '@mui/icons-material'

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
                animate={{ opacity: isPreviewOpen ? 1 : 0, y: isPreviewOpen ? 0 : 10 }}
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
                    width: 250,
                    height: 350,
                    position: 'relative',
                }}
            >
                {/* Simple Geometric Character Representation (Ghibli-esque style would ideally be an image) */}
                {/* Here we use a stylized composition */}

                {/* Body/Dress */}
                <Box sx={{
                    position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                    width: 140, height: 200,
                    background: '#ab00ff',
                    borderRadius: '80px 80px 0 0',
                    boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.2)'
                }} />

                {/* Head */}
                <Box sx={{
                    position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)',
                    width: 100, height: 110,
                    background: '#ffddc1',
                    borderRadius: '50px',
                    zIndex: 2,
                }}>
                    {/* Eyes */}
                    <Box sx={{ position: 'absolute', top: 45, left: 25, width: 12, height: 12, borderRadius: '50%', bgcolor: '#000' }} />
                    <Box sx={{ position: 'absolute', top: 45, right: 25, width: 12, height: 12, borderRadius: '50%', bgcolor: '#000' }} />
                    {/* Smile */}
                    <Box sx={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', width: 20, height: 10, borderBottom: '3px solid #000', borderRadius: '50%' }} />
                </Box>

                {/* Hair */}
                <Box sx={{
                    position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
                    width: 120, height: 120,
                    background: '#33007b',
                    borderRadius: '60px 60px 0 0',
                    zIndex: 1,
                }} />

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
