import { Box, Typography, Button, Chip, Stack, Switch, FormControlLabel } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { useDesignGardenStore, GardenComponent } from '@/store/useDesignGardenStore'
import { AutoAwesome, Visibility, Save } from '@mui/icons-material'

const PreviewBubble = () => {
    const {
        activeComponentId,
        components,
        activeVersionId,
        setVersion,
        togglePublish,
        isPreviewOpen
    } = useDesignGardenStore()

    const activeComponent = components.find(c => c.id === activeComponentId)
    const activeVer = activeComponent?.versions.find(v => v.id === activeVersionId)

    // Demo renders for different component types
    const renderPreview = (comp: GardenComponent) => {
        if (!activeVer) return null

        // Simulate variant styles
        const style = {
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            border: activeVer.variant === 'outlined' ? '1px solid #ab00ff' : 'none',
            background: activeVer.variant === 'contained' ? '#ab00ff' : 'rgba(171,0,255,0.1)',
            color: activeVer.variant === 'contained' ? '#fff' : '#ab00ff',
            fontWeight: 'bold',
        }

        if (comp.type === 'button') {
            return <button style={style as any}>Click Me</button>
        }
        if (comp.type === 'badge') {
            return (
                <span style={{
                    ...style,
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem'
                }}>
                    New
                </span>
            )
        }
        if (comp.type === 'card') {
            return (
                <div style={{
                    padding: 20,
                    background: '#fff',
                    borderRadius: 12,
                    color: '#333',
                    boxShadow: activeVer.variant === 'contained' ? '0 10px 20px rgba(0,0,0,0.1)' : 'none',
                    border: activeVer.variant === 'outlined' ? '1px solid #ddd' : 'none'
                }}>
                    <h4 style={{ margin: '0 0 8px 0' }}>Card Title</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Some sample content.</p>
                </div>
            )
        }
        return null
    }

    return (
        <AnimatePresence>
            {activeComponent && isPreviewOpen && (
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    sx={{
                        position: 'absolute',
                        left: '50%', // Centers relative to the interactive zone, adjusted by page layout
                        top: '30%',
                        transform: 'translate(-50%, -50%)',
                        width: 350,
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        p: 4,
                        zIndex: 100,
                        pointerEvents: 'auto',
                    }}
                >
                    {/* Header */}
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                        <Box>
                            <Typography variant="h6" sx={{ color: '#fff', fontFamily: 'var(--font-outfit)' }}>
                                {activeComponent.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                {activeComponent.type.toUpperCase()} • {activeVersionId}
                            </Typography>
                        </Box>
                        <Chip
                            label={activeComponent.isPublished ? "PUBLISHED" : "DRAFT"}
                            size="small"
                            sx={{
                                bgcolor: activeComponent.isPublished ? '#00ff00' : 'rgba(255,255,255,0.1)',
                                color: activeComponent.isPublished ? '#000' : '#fff',
                                fontWeight: 'bold'
                            }}
                        />
                    </Stack>

                    {/* Preview Area */}
                    <Box sx={{
                        height: 150,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(255,255,255,0.05)',
                        borderRadius: '16px',
                        mb: 3,
                        border: '1px dashed rgba(255,255,255,0.2)'
                    }}>
                        {renderPreview(activeComponent)}
                    </Box>

                    {/* Controls */}
                    <Stack gap={2}>
                        <Box>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1, display: 'block' }}>
                                VERSIONS
                            </Typography>
                            <Stack direction="row" gap={1} flexWrap="wrap">
                                {activeComponent.versions.map(v => (
                                    <Chip
                                        key={v.id}
                                        label={v.id}
                                        onClick={() => setVersion(v.id)}
                                        clickable
                                        sx={{
                                            bgcolor: activeVersionId === v.id ? '#ab00ff' : 'transparent',
                                            border: '1px solid #ab00ff',
                                            color: '#fff',
                                            '&:hover': { bgcolor: '#8300c4' }
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={activeComponent.isPublished}
                                    onChange={() => togglePublish(activeComponent.id)}
                                    color="secondary"
                                />
                            }
                            label={<Typography sx={{ color: '#fff' }}>Publish to System</Typography>}
                        />
                    </Stack>

                </Box>
            )}
        </AnimatePresence>
    )
}

export default PreviewBubble
