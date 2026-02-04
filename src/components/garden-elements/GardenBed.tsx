import { Box } from '@mui/material'
import React from 'react'
import { useDesignGardenStore } from '@/store/useDesignGardenStore'

interface Props {
    children: React.ReactNode
}

const GardenBed = ({ children }: { children: React.ReactNode }) => {
    const { selectComponent } = useDesignGardenStore()

    const handleBackgroundClick = (e: React.MouseEvent) => {
        // Only deselect if clicking directly on the garden background, not on children
        if (e.target === e.currentTarget) {
            selectComponent(null)
        }
    }

    return (
        <Box
            onClick={handleBackgroundClick}
            sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '900px',
                flexGrow: 1,
                minHeight: '400px', // Reduced from 500px
                aspectRatio: '16/10',
                borderRadius: '32px',
                overflow: 'hidden',
                backgroundImage: 'url("/images/garden.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 20px 80px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 1,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(49, 0, 74, 0.2)',
                    zIndex: 0,
                }
            }}
        >
            <Box sx={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
                {children}
            </Box>
        </Box>
    )
}

export default GardenBed
