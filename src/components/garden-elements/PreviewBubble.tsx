import { Box, Typography, Button, IconButton, Chip, Tabs, Tab } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { useDesignGardenStore } from '@/store/useDesignGardenStore'
import { Close, ContentCopy, Download } from '@mui/icons-material'
import { useState, useEffect, useRef } from 'react'

const PreviewBubble = () => {
    const { activeComponentId, components, selectComponent } = useDesignGardenStore()
    const [showCode, setShowCode] = useState(false)
    const [selectedVersion, setSelectedVersion] = useState<string>('')
    const previewRef = useRef<HTMLDivElement>(null)

    const activeComponent = components.find(c => c.id === activeComponentId)

    // Auto-scroll to preview when component is selected
    useEffect(() => {
        if (activeComponent && previewRef.current) {
            setTimeout(() => {
                previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)
        }
    }, [activeComponent])

    // Set default selected version and reset code view when component changes
    useEffect(() => {
        if (activeComponent) {
            if (!selectedVersion || !activeComponent.versions.find(v => v.id === selectedVersion)) {
                setSelectedVersion(activeComponent.versions[0]?.id || '')
            }
            setShowCode(false) // Reset to preview view when component changes
        }
    }, [activeComponent, selectedVersion])

    const currentVersion = activeComponent?.versions.find(v => v.id === selectedVersion) || activeComponent?.versions[0]

    // Generate sample code for the component
    const generateCode = () => {
        if (!activeComponent || !currentVersion) return ''
        const componentName = activeComponent.name.replace(/\s+/g, '')
        return `import { ${componentName} } from '@/components/ui/${activeComponent.type}s'

// Example usage
export default function Example() {
  return (
    <${componentName} 
      variant="${currentVersion.variant}"
      ${activeComponent.type === 'button' ? 'onClick={() => console.log("clicked")}' : ''}
    >
      ${activeComponent.type === 'button' ? 'Click Me' : activeComponent.type === 'badge' ? 'New' : 'Content'}
    </${componentName}>
  )
}`
    }

    const handleCopyCode = () => {
        if (generateCode()) {
            navigator.clipboard.writeText(generateCode())
        }
        // Could add a toast notification here
    }

    const handleDownloadCode = () => {
        const code = generateCode()
        if (!code || !activeComponent || !currentVersion) return

        const guidelines = `# ${activeComponent.name} - Usage Guidelines

## Installation
\`\`\`bash
npm install @your-design-system/components
\`\`\`

## Import
\`\`\`tsx
import { ${activeComponent.name.replace(/\s+/g, '')} } from '@/components/ui/${activeComponent.type}s'
\`\`\`

## Props
- \`variant\`: "${currentVersion.variant}" | other variants available
- \`children\`: ReactNode - Content to display
${activeComponent.type === 'button' ? '- `onClick`: () => void - Click handler' : ''}

## Example Code
\`\`\`tsx
${code}
\`\`\`

## Best Practices
- Use semantic HTML for accessibility
- Ensure proper contrast ratios for text
- Test with keyboard navigation
- Add appropriate ARIA labels

## Version
Current: ${currentVersion.name}
Status: ${activeComponent.isPublished ? 'Published ✅' : 'Draft 🚧'}
`

        const blob = new Blob([guidelines], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${activeComponent.name.replace(/\s+/g, '-').toLowerCase()}-guide.md`
        a.click()
        URL.revokeObjectURL(url)
    }

    // Render live preview based on component type
    const renderLivePreview = () => {
        if (!activeComponent || !currentVersion) return null

        const baseStyle = {
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s',
        }

        const variantStyles = {
            contained: {
                background: 'linear-gradient(135deg, #ab00ff 0%, #8300c4 100%)',
                color: '#fff',
                border: 'none',
            },
            outlined: {
                background: 'transparent',
                color: '#ab00ff',
                border: '2px solid #ab00ff',
            },
            soft: {
                background: 'rgba(171, 0, 255, 0.1)',
                color: '#ab00ff',
                border: '1px solid rgba(171, 0, 255, 0.3)',
            }
        }

        const style = { ...baseStyle, ...variantStyles[currentVersion.variant as keyof typeof variantStyles] }

        if (activeComponent.type === 'button') {
            return <button style={style}>Click Me</button>
        }
        if (activeComponent.type === 'badge') {
            return <span style={{ ...style, padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem' }}>New</span>
        }
        if (activeComponent.type === 'card') {
            return (
                <div style={{
                    padding: '24px',
                    background: '#fff',
                    borderRadius: '16px',
                    color: '#333',
                    boxShadow: currentVersion.variant === 'contained' ? '0 10px 30px rgba(0,0,0,0.1)' : 'none',
                    border: currentVersion.variant === 'outlined' ? '2px solid #ddd' : 'none',
                    maxWidth: '300px'
                }}>
                    <h3 style={{ margin: '0 0 12px 0', color: '#31004a' }}>Card Title</h3>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}>
                        This is a sample card component with some content to demonstrate how it looks.
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <AnimatePresence mode="wait">
            {activeComponent && (
                <Box
                    ref={previewRef}
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    sx={{
                        width: '100%',
                        maxWidth: '1400px',
                        mt: 4,
                        mb: 4,
                    }}
                >
                    {/* Two-Panel Layout */}
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '400px 1fr' },
                        gap: 3,
                        position: 'relative'
                    }}>
                        {/* Left Panel - Component Info */}
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            sx={{
                                background: 'linear-gradient(135deg, rgba(49, 0, 74, 0.95) 0%, rgba(31, 0, 48, 0.98) 100%)',
                                borderRadius: '24px',
                                padding: 3,
                                border: '2px solid rgba(252, 191, 73, 0.3)',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                                position: 'relative',
                                height: 'fit-content'
                            }}
                        >
                            {/* Close Button */}
                            <IconButton
                                onClick={() => {
                                    selectComponent(null)
                                    setShowCode(false)
                                }}
                                size="small"
                                sx={{
                                    position: 'absolute',
                                    top: 12,
                                    right: 12,
                                    color: '#fcbf49',
                                    '&:hover': { background: 'rgba(252, 191, 73, 0.1)' }
                                }}
                            >
                                <Close fontSize="small" />
                            </IconButton>

                            {/* Header */}
                            <Box sx={{ mb: 2, pr: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <Typography variant="h5" sx={{
                                        fontFamily: 'var(--font-permanent-marker)',
                                        color: '#fcbf49',
                                        textShadow: '0 2px 10px rgba(252, 191, 73, 0.3)'
                                    }}>
                                        {activeComponent.name}
                                    </Typography>
                                    <Chip
                                        label={activeComponent.isPublished ? 'Published' : 'Draft'}
                                        size="small"
                                        sx={{
                                            background: activeComponent.isPublished ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                            color: activeComponent.isPublished ? '#00ff00' : 'rgba(255, 255, 255, 0.7)',
                                            border: `1px solid ${activeComponent.isPublished ? '#00ff00' : 'rgba(255, 255, 255, 0.3)'}`,
                                            fontSize: '0.7rem'
                                        }}
                                    />
                                </Box>
                                <Typography variant="caption" sx={{
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    fontFamily: 'var(--font-outfit)',
                                    textTransform: 'uppercase',
                                    letterSpacing: 1
                                }}>
                                    {activeComponent.type}
                                </Typography>
                            </Box>

                            {/* Versions */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" sx={{
                                    color: '#fff',
                                    mb: 1.5,
                                    fontFamily: 'var(--font-outfit)',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem'
                                }}>
                                    Select Version
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {activeComponent.versions.map((version) => (
                                        <Box
                                            key={version.id}
                                            onClick={() => setSelectedVersion(version.id)}
                                            sx={{
                                                background: selectedVersion === version.id ? 'rgba(252, 191, 73, 0.2)' : 'rgba(252, 191, 73, 0.05)',
                                                border: `2px solid ${selectedVersion === version.id ? 'rgba(252, 191, 73, 0.6)' : 'rgba(252, 191, 73, 0.2)'}`,
                                                borderRadius: '12px',
                                                padding: 1.5,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                '&:hover': {
                                                    background: 'rgba(252, 191, 73, 0.15)',
                                                    borderColor: 'rgba(252, 191, 73, 0.5)',
                                                }
                                            }}
                                        >
                                            <Typography variant="body2" sx={{
                                                color: '#fcbf49',
                                                fontWeight: 'bold',
                                                fontFamily: 'var(--font-outfit)',
                                            }}>
                                                {version.name}
                                            </Typography>
                                            <Typography variant="caption" sx={{
                                                color: 'rgba(255, 255, 255, 0.5)',
                                                textTransform: 'uppercase',
                                                fontSize: '0.7rem'
                                            }}>
                                                {version.variant}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>

                            {/* Action Button */}
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => setShowCode(!showCode)}
                                sx={{
                                    background: 'linear-gradient(135deg, #fcbf49 0%, #f77f00 100%)',
                                    color: '#31004a',
                                    fontWeight: 'bold',
                                    py: 1.5,
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #ffd166 0%, #fcbf49 100%)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 20px rgba(252, 191, 73, 0.4)'
                                    }
                                }}
                            >
                                {showCode ? 'Hide Code' : 'Use This Component'}
                            </Button>
                        </Box>

                        {/* Right Panel - Live Preview / Code */}
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            sx={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                                borderRadius: '24px',
                                padding: 4,
                                border: '2px solid rgba(252, 191, 73, 0.2)',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                                minHeight: '400px',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Tabs
                                value={showCode ? 1 : 0}
                                onChange={(_, v) => setShowCode(v === 1)}
                                sx={{
                                    mb: 3,
                                    '& .MuiTab-root': {
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        fontFamily: 'var(--font-outfit)',
                                        fontWeight: 'bold',
                                        '&.Mui-selected': {
                                            color: '#fcbf49'
                                        }
                                    },
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: '#fcbf49'
                                    }
                                }}
                            >
                                <Tab label="Live Preview" />
                                <Tab label="Code" />
                            </Tabs>

                            {!showCode ? (
                                /* Live Preview */
                                <Box sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    borderRadius: '16px',
                                    padding: 4,
                                    border: '1px dashed rgba(0, 0, 0, 0.1)'
                                }}>
                                    {renderLivePreview()}
                                </Box>
                            ) : (
                                /* Code View */
                                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{
                                        background: '#1e1e1e',
                                        borderRadius: '12px',
                                        padding: 3,
                                        fontFamily: 'monospace',
                                        fontSize: '0.9rem',
                                        color: '#d4d4d4',
                                        overflowX: 'auto',
                                        flexGrow: 1
                                    }}>
                                        <pre style={{ margin: 0 }}>{generateCode()}</pre>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<ContentCopy />}
                                            onClick={handleCopyCode}
                                            sx={{
                                                borderColor: '#fcbf49',
                                                color: '#fcbf49',
                                                '&:hover': {
                                                    borderColor: '#ffd166',
                                                    background: 'rgba(252, 191, 73, 0.1)'
                                                }
                                            }}
                                        >
                                            Copy Code
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<Download />}
                                            onClick={handleDownloadCode}
                                            sx={{
                                                background: 'linear-gradient(135deg, #fcbf49 0%, #f77f00 100%)',
                                                color: '#31004a',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #ffd166 0%, #fcbf49 100%)'
                                                }
                                            }}
                                        >
                                            Download with Guide
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            )
            }
        </AnimatePresence >
    )
}

export default PreviewBubble
