import { Box } from '@mui/material'
import React from 'react'

interface Props {
    children: React.ReactNode
}

const GardenBed = ({ children }: Props) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                left: '5%',
                top: '60%',
                transform: 'translateY(-50%)',
                width: '60%',
                maxWidth: '900px',
                aspectRatio: '16/10',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 20px 80px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 1,
            }}
        >
            <Box sx={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
                {children}
            </Box>
        </Box>
    )
}

export default GardenBed
