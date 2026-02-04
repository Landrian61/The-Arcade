import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { GardenComponent, useDesignGardenStore } from '@/store/useDesignGardenStore'
import { useArcadeStore } from '@/store/useArcadeStore'

interface Props {
    component: GardenComponent
}

// Map component types to simple visual representations (SVG or CSS shapes)
const PlantIcon = ({ type, isActive }: { type: string; isActive: boolean }) => {
    const color = isActive ? '#ab00ff' : '#8300c4'

    if (type === 'button') {
        return (
            <Box sx={{
                width: 40, height: 40, borderRadius: '50%', border: `2px solid ${color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Box sx={{ width: 20, height: 20, bgcolor: color, borderRadius: 1 }} />
            </Box>
        )
    }
    if (type === 'badge') {
        return (
            <Box sx={{
                width: 40, height: 40, borderRadius: '50%', border: `2px solid ${color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Box sx={{ width: 10, height: 10, bgcolor: color, borderRadius: '50%' }} />
            </Box>
        )
    }
    // Default Card Icon
    return (
        <Box sx={{
            width: 40, height: 40, borderRadius: '50%', border: `2px solid ${color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <Box sx={{ width: 20, height: 14, border: `2px solid ${color}`, borderRadius: 1 }} />
        </Box>
    )
}

const GardenPlant = ({ component }: Props) => {
    const { activeComponentId, selectComponent } = useDesignGardenStore()
    const { globalChaosMode } = useArcadeStore()

    const isActive = activeComponentId === component.id

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: isActive ? -10 : 0,
                rotate: globalChaosMode ? [0, -2, 2, 0] : 0
            }}
            transition={{ type: 'spring', damping: 12 }}
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                selectComponent(isActive ? null : component.id)
            }}
            sx={{
                position: 'absolute',
                left: `${component.position.x}%`,
                top: `${component.position.y}%`,
                cursor: 'pointer',
                zIndex: isActive ? 10 : 1,
                filter: isActive ? 'drop-shadow(0 0 15px rgba(171, 0, 255, 0.6))' : 'none',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    p: 1.5,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '16px',
                    border: isActive ? '1px solid #ab00ff' : '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        transform: 'scale(1.05)'
                    }
                }}
            >
                <PlantIcon type={component.type} isActive={isActive} />

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#fff', fontWeight: 'bold', display: 'block' }}>
                        {component.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
                        <Box sx={{
                            width: 6, height: 6, borderRadius: '50%',
                            bgcolor: component.isPublished ? '#00ff00' : '#888'
                        }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem' }}>
                            {component.isPublished ? 'Live' : 'Draft'}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Stem connection to ground (visual only) */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -50,
                    left: '50%',
                    width: 2,
                    height: 50,
                    background: `linear-gradient(to top, transparent, ${isActive ? '#ab00ff' : 'rgba(255,255,255,0.2)'})`,
                    transform: 'translateX(-50%)',
                    zIndex: -1,
                }}
            />
        </Box>
    )
}

export default GardenPlant
