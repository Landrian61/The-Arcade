
export const ZOOM_SCROLL_HERO_CODE = `import { useRef, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

export const ZoomScrollHero = () => {
    const [scale, setScale] = useState(1.3)

    useEffect(() => {
        const handleScroll = () => {
            // Check window scroll position
            const scrolled = window.scrollY
            const maxScroll = window.innerHeight

            // Calculate zoom: 1.3 (top) -> 1.0 (after 100vh)
            const progress = Math.min(scrolled / maxScroll, 1)
            setScale(1.3 - (progress * 0.3))
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <Box sx={{ height: '200vh', position: 'relative' }}>
            <Box sx={{
                position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {/* Scalable Background */}
                <Box sx={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #020617 100%)',
                    transform: \`scale(\${scale})\`,
                    transition: 'transform 0.1s ease-out',
                }} />
                
                {/* Content */}
                <Typography variant="h1" sx={{ 
                    position: 'relative', zIndex: 10, color: 'white', fontWeight: 900 
                }}>
                    Hero Title
                </Typography>
            </Box>
        </Box>
    )
}
`

export const SCROLL_NAVBAR_CODE = `import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    // Listen for window scroll to toggle state
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <>
            {/* 1. Navbar Background (Fades in on scroll) */}
            <Box sx={{ 
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
                // Appears only when scrolled
                height: isScrolled ? '80px' : '0px',
                background: isScrolled ? 'rgba(2, 6, 23, 0.9)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'transparent',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }} />

            {/* 2. Floating Interaction Layer */}
            <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50, pointerEvents: 'none' }}>
                
                {/* Logo: Shrinks/Moves on scroll */}
                <Box sx={{ 
                    position: 'absolute', 
                    top: isScrolled ? '20px' : '40px', 
                    left: isScrolled ? '24px' : '40px',
                    transition: 'all 0.3s ease',
                    pointerEvents: 'auto',
                    cursor: 'pointer'
                }}>
                     <svg width="48" height="48" viewBox="0 0 50 50" style={{ height: isScrolled ? '40px' : '48px' }}>
                        {/* DK Logo Paths */}
                        <path d="M10 5V45M10 25H30M30 5L30 25L45 45" stroke="#d946ef" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 5H30C35 5 38 8 38 15C38 22 35 25 30 25H10" stroke="#ab00ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Box>

                {/* Navigation Pill: Blends into navbar on scroll */}
                <Box sx={{
                    position: 'absolute',
                    top: isScrolled ? '24px' : '36px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'auto',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    
                    // Glass Pill style when top, Transparent when scrolled
                    ...(isScrolled ? {
                        background: 'transparent', padding: 0
                    } : {
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(12px)',
                        padding: '12px 40px',
                        borderRadius: '999px',
                        border: '1px solid rgba(255,255,255,0.2)'
                    })
                }}>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        {['Home', 'Work', 'Projects', 'Garden'].map((item) => (
                            <Typography key={item} sx={{ 
                                fontWeight: 700, 
                                color: '#1e293b',
                                cursor: 'pointer',
                                '&:hover': { color: '#d946ef' }
                            }}>
                                {item}
                            </Typography>
                        ))}
                    </Box>
                </Box>

                {/* Right Actions: Avatar & Theme */}
                <Box sx={{ 
                    position: 'absolute', 
                    top: isScrolled ? '20px' : '40px', 
                    right: isScrolled ? '24px' : '40px',
                    display: 'flex', gap: 2, pointerEvents: 'auto',
                    transition: 'all 0.3s ease'
                }}>
                     <Box sx={{
                         width: isScrolled ? 40 : 48,
                         height: isScrolled ? 40 : 48,
                         borderRadius: '50%',
                         backgroundImage: 'url(/avatar.png)',
                         backgroundSize: 'cover',
                         border: '2px solid #d946ef'
                     }} />
                </Box>

            </Box>
        </>
    )
}
`

export const AUTH_MODAL_CODE = `import { useState } from 'react'
import { Dialog, DialogContent, Box, Tabs, Tab, TextField, Button, alpha } from '@mui/material'

export const AuthModal = ({ variant = 'light' }) => {
    const [open, setOpen] = useState(false)
    const [tabValue, setTabValue] = useState(0)
    const isDark = variant === 'dark'

    const handleTabChange = (_event, newValue) => {
        setTabValue(newValue)
    }

    return (
        <Box sx={{ display: 'inline-block' }}>
            {/* Trigger Button */}
            <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                    py: 1.5, px: 4, borderRadius: '12px',
                    backgroundColor: '#7c3aed',
                    fontSize: '1rem', fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)',
                    '&:hover': {
                        backgroundColor: '#6d28d9',
                        boxShadow: '0 6px 20px rgba(124, 58, 237, 0.5)',
                    },
                }}
            >
                Login / Sign Up
            </Button>

            {/* Modal with Tabs */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '24px',
                        background: isDark
                            ? 'linear-gradient(135deg, rgba(30, 27, 75, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)'
                            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    },
                }}
            >
                <DialogContent sx={{ p: 4 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                        <Tabs value={tabValue} onChange={handleTabChange} centered
                            sx={{
                                '& .MuiTab-root': {
                                    fontSize: '1rem', fontWeight: 500,
                                    textTransform: 'none', minWidth: 120,
                                    color: isDark ? alpha('#fff', 0.6) : alpha('#000', 0.6),
                                    '&.Mui-selected': { color: '#7c3aed', fontWeight: 600 },
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#7c3aed', height: 3,
                                    borderRadius: '3px 3px 0 0',
                                },
                            }}
                        >
                            <Tab label="Sign In" />
                            <Tab label="Sign Up" />
                        </Tabs>
                    </Box>

                    {/* Sign In Form */}
                    {tabValue === 0 && (
                        <Box component="form">
                            <TextField fullWidth label="Email address" type="email" required
                                sx={{ mb: 2.5, /* ... styling ... */ }} />
                            <TextField fullWidth label="Password" type="password" required
                                sx={{ mb: 3, /* ... styling ... */ }} />
                            <Button type="submit" fullWidth variant="contained"
                                sx={{ py: 1.5, borderRadius: '12px', backgroundColor: '#7c3aed' }}>
                                Sign In
                            </Button>
                        </Box>
                    )}

                    {/* Sign Up Form */}
                    {tabValue === 1 && (
                        <Box component="form">
                            <TextField fullWidth label="Full Name" required sx={{ mb: 2.5 }} />
                            <TextField fullWidth label="Phone Number (Optional)" sx={{ mb: 2.5 }} />
                            <TextField fullWidth label="Email address" type="email" required sx={{ mb: 2.5 }} />
                            <TextField fullWidth label="Password" type="password" required sx={{ mb: 2.5 }} />
                            <TextField fullWidth label="Confirm Password" type="password" required sx={{ mb: 3 }} />
                            <Button type="submit" fullWidth variant="contained"
                                sx={{ py: 1.5, borderRadius: '12px', backgroundColor: '#7c3aed' }}>
                                Create Account
                            </Button>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    )
}
`