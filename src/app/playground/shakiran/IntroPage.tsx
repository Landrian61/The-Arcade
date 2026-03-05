'use client'

import { useState } from 'react'
import { Box, Typography, Button, IconButton } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowForward, LocalFlorist, SmartToy, ArrowBack } from '@mui/icons-material'
import Link from 'next/link'

interface IntroPageProps {
    onEnterGarden: () => void
    initialView?: 'intro' | 'projects'
}

export default function IntroPage({ onEnterGarden, initialView = 'intro' }: IntroPageProps) {
    const [view, setView] = useState<'intro' | 'projects'>(initialView)

    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            position: 'relative',
            overflow: 'hidden',
            bgcolor: '#0f0518',
            background: {
                xs: 'none', // Mobile uses video background
                md: 'radial-gradient(circle at 30% 50%, #2e1065 0%, #0f0518 100%)' // Original desktop gradient
            },
            p: { xs: 2, md: 4 }
        }}>
            {/* Mobile-Only Background Video */}
            <Box sx={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                opacity: 0.8,
                display: { xs: 'block', md: 'none' } // Hidden on desktop
            }}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                >
                    <source src="/kiran/hero.mp4" type="video/mp4" />
                </video>
                <Box sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(15, 5, 24, 0.7) 0%, rgba(15, 5, 24, 0.85) 100%)',
                    backdropFilter: 'blur(3px)'
                }} />
            </Box>

            {/* Left Content Side */}
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 10,
                p: { xs: 4, md: 8 },
                color: '#fff'
            }}>
                <AnimatePresence mode="wait">
                    {view === 'intro' ? (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                textAlign: 'center',
                                // Conditional styles for glass effect on mobile only
                            }}
                        >
                            <Box sx={{
                                p: { xs: 5, md: 0 },
                                borderRadius: { xs: '40px', md: 0 },
                                background: { xs: 'rgba(255, 255, 255, 0.03)', md: 'none' },
                                border: { xs: '1px solid rgba(255, 255, 255, 0.05)', md: 'none' },
                                backdropFilter: { xs: 'blur(30px) saturate(180%)', md: 'none' },
                                boxShadow: { xs: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', md: 'none' }
                            }}>
                                <Typography variant="h2" sx={{
                                    fontFamily: '"Playfair Display", serif',
                                    fontWeight: 600,
                                    color: '#fff',
                                    lineHeight: 1.2,
                                    mb: 6,
                                    textShadow: '0 0 40px rgba(124, 58, 237, 0.5)',
                                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' }
                                }}>
                                    Welcome to <br />
                                    <span style={{ color: '#a78bfa', fontStyle: 'italic' }}>Shakiran&rsquo;s Playground</span>
                                </Typography>

                                <Box sx={{
                                    p: 4,
                                    border: '1px solid rgba(124, 58, 237, 0.3)',
                                    borderRadius: '24px',
                                    bgcolor: 'rgba(15, 23, 42, 0.6)',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 0 80px rgba(124, 58, 237, 0.15)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2
                                }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={() => setView('projects')}
                                        sx={{
                                            bgcolor: '#7c3aed',
                                            color: '#fff',
                                            py: 1.5,
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)',
                                            '&:hover': {
                                                bgcolor: '#8b5cf6',
                                                transform: 'translateY(-1px)',
                                                boxShadow: '0 0 50px rgba(124, 58, 237, 0.6)'
                                            }
                                        }}
                                    >
                                        Explore Projects
                                    </Button>

                                    <Typography variant="caption" sx={{ color: '#94a3b8', mt: 1 }}>
                                        Experience my imagination through UI design
                                    </Typography>
                                </Box>

                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                    <Link href="/" style={{ textDecoration: 'none' }}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            color: 'rgba(255,255,255,0.5)',
                                            transition: 'all 0.2s',
                                            '&:hover': { color: '#a78bfa', transform: 'translateX(-4px)' }
                                        }}>
                                            <ArrowBack fontSize="small" />
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                Back to Arcade
                                            </Typography>
                                        </Box>
                                    </Link>
                                </Box>
                            </Box>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            style={{
                                width: '100%',
                            }}
                        >
                            <Box sx={{
                                width: '100%',
                                maxWidth: { xs: '750px', md: '600px' },
                                mx: 'auto',
                                p: { xs: 5, md: 0 },
                                borderRadius: { xs: '40px', md: 0 },
                                background: { xs: 'rgba(255, 255, 255, 0.03)', md: 'none' },
                                border: { xs: '1px solid rgba(255, 255, 255, 0.05)', md: 'none' },
                                backdropFilter: { xs: 'blur(30px) saturate(180%)', md: 'none' }
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 6 }}>
                                    <Button
                                        onClick={() => setView('intro')}
                                        startIcon={<ArrowBack />}
                                        sx={{
                                            color: 'rgba(255,255,255,0.5)',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            '&:hover': { color: '#a78bfa', bgcolor: 'transparent' }
                                        }}
                                    >
                                        Back
                                    </Button>
                                    <Typography variant="h4" sx={{
                                        fontWeight: 900,
                                        color: '#fff',
                                        textShadow: '0 0 30px rgba(124, 58, 237, 0.4)',
                                        textAlign: 'center'
                                    }}>
                                        Select Project
                                    </Typography>
                                    <Box sx={{ width: 64 }} />
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    {/* Project 1: UI Garden */}
                                    <motion.div
                                        whileHover={{ scale: 1.02, x: 10 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Box
                                            onClick={onEnterGarden}
                                            sx={{
                                                p: 3,
                                                borderRadius: '24px',
                                                border: '1px solid rgba(124, 58, 237, 0.3)',
                                                bgcolor: { xs: 'rgba(255, 255, 255, 0.05)', md: 'rgba(15, 23, 42, 0.6)' },
                                                backdropFilter: 'blur(10px)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 3,
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    borderColor: '#a78bfa',
                                                    boxShadow: '0 0 50px rgba(124, 58, 237, 0.3)',
                                                    bgcolor: 'rgba(124, 58, 237, 0.1)'
                                                }
                                            }}
                                        >
                                            <Box sx={{
                                                p: 2,
                                                borderRadius: '16px',
                                                bgcolor: 'rgba(124, 58, 237, 0.2)',
                                                color: '#a78bfa',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <LocalFlorist fontSize="large" />
                                            </Box>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                                                    UI Garden
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                    A living component library growing with code.
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </motion.div>

                                    {/* Text2Reel Project */}
                                    <motion.div
                                        whileHover={{ scale: 1.02, x: 10 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Link href="/playground/shakiran/text2reel" style={{ textDecoration: 'none' }}>
                                            <Box sx={{
                                                p: 3,
                                                borderRadius: '24px',
                                                border: '1px solid rgba(247, 154, 122, 0.3)',
                                                bgcolor: { xs: 'rgba(255, 255, 255, 0.05)', md: 'rgba(15, 23, 42, 0.6)' },
                                                backdropFilter: 'blur(10px)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 3,
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    borderColor: '#F79A7A',
                                                    boxShadow: '0 0 50px rgba(247, 154, 122, 0.3)',
                                                    bgcolor: 'rgba(247, 154, 122, 0.1)'
                                                }
                                            }}>
                                                <Box sx={{
                                                    p: 2,
                                                    borderRadius: '16px',
                                                    bgcolor: 'rgba(247, 154, 122, 0.2)',
                                                    color: '#F79A7A',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <SmartToy fontSize="large" />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                                                        Text2Reel
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                        AI-powered social media video generator.
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Link>
                                    </motion.div>
                                </Box>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>

            {/* Right Side - Desktop Video container */}
            <Box sx={{
                flex: 1,
                position: 'relative',
                borderRadius: '32px',
                overflow: 'hidden',
                display: { xs: 'none', md: 'block' }, // Restore split-screen
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                bgcolor: '#000',
                border: '1px solid rgba(255,255,255,0.1)',
                zIndex: 10
            }}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                >
                    <source src="/kiran/hero.mp4" type="video/mp4" />
                </video>
            </Box>
        </Box>
    )
}
