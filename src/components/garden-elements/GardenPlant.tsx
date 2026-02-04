import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { GardenComponent, useDesignGardenStore } from '@/store/useDesignGardenStore'
import { useArcadeStore } from '@/store/useArcadeStore'

interface Props {
    component: GardenComponent
}

// Map component types to simple visual representations (SVG or CSS shapes)
const PlantIcon = ({ type, isActive, isPublished }: { type: string; isActive: boolean; isPublished: boolean }) => {
    const color = isActive ? '#ab00ff' : '#fcbf49'

    return (
        <Box sx={{
            position: 'relative',
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Pulsing ring */}
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: `2px solid ${color}`,
                }}
            />
            {/* Core dot */}
            <Box sx={{
                width: 12,
                height: 12,
                bgcolor: color,
                borderRadius: '50%',
                boxShadow: `0 0 10px ${color}`,
            }} />
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
                y: isActive ? -5 : 0,
            }}
            whileHover={{ scale: 1.2 }}
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                selectComponent(isActive ? null : component.id)
            }}
            sx={{
                position: 'absolute',
                left: `${component.position.x}%`,
                top: `${component.position.y}%`,
                cursor: 'pointer',
                zIndex: isActive ? 100 : 5,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                }}
            >
                <PlantIcon type={component.type} isActive={isActive} isPublished={component.isPublished} />

                <Box sx={{
                    textAlign: 'center',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    backdropFilter: 'blur(4px)',
                    border: isActive ? '1px solid #ab00ff' : '1px solid transparent'
                }}>
                    <Typography variant="caption" sx={{ color: '#fff', fontSize: '0.6rem', fontWeight: 'bold' }}>
                        {component.name}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default GardenPlant
