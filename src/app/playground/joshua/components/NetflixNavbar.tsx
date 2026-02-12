'use client'

import { useState, useEffect } from 'react'
import { Box, Typography, IconButton, InputBase } from '@mui/material'
import { Search, Close, NotificationsNone, ArrowDropDown } from '@mui/icons-material'
import Link from 'next/link'

interface NetflixNavbarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

const NAV_LINKS = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List']

export default function NetflixNavbar({ searchQuery, onSearchChange }: NetflixNavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchToggle = () => {
    if (searchOpen && searchQuery) {
      onSearchChange('')
    }
    setSearchOpen(!searchOpen)
  }

  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        px: { xs: '4%', md: '4%' },
        background: scrolled
          ? 'rgb(20, 20, 20)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, transparent)',
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* Logo */}
      <Link href="/playground/joshua" style={{ textDecoration: 'none' }}>
        <Typography
          sx={{
            color: '#E50914',
            fontWeight: 900,
            fontSize: { xs: '1.4rem', md: '1.8rem' },
            letterSpacing: '2px',
            fontFamily: 'var(--font-outfit)',
            mr: { xs: 2, md: 5 },
            cursor: 'pointer',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            '&:hover': { opacity: 0.9 },
          }}
        >
          JOSHFLIX
        </Typography>
      </Link>

      {/* Nav Links - hidden on mobile */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2.5, flex: 1 }}>
        {NAV_LINKS.map((link, i) => (
          <Typography
            key={link}
            sx={{
              color: i === 0 ? '#fff' : '#e5e5e5',
              fontSize: '0.875rem',
              fontWeight: i === 0 ? 700 : 400,
              fontFamily: 'var(--font-outfit)',
              cursor: 'pointer',
              transition: 'color 0.3s',
              '&:hover': { color: '#b3b3b3' },
            }}
          >
            {link}
          </Typography>
        ))}
      </Box>

      {/* Mobile Browse */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flex: 1 }}>
        <Typography
          sx={{
            color: '#e5e5e5',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-outfit)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Browse <ArrowDropDown sx={{ fontSize: 20 }} />
        </Typography>
      </Box>

      {/* Right Side */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Search */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: searchOpen ? 'rgba(0,0,0,0.75)' : 'transparent',
            border: searchOpen ? '1px solid rgba(255,255,255,0.5)' : '1px solid transparent',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            width: searchOpen ? { xs: '200px', md: '270px' } : '36px',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <IconButton onClick={handleSearchToggle} sx={{ color: '#fff', p: '6px' }}>
            {searchOpen ? <Close sx={{ fontSize: 22 }} /> : <Search sx={{ fontSize: 22 }} />}
          </IconButton>
          {searchOpen && (
            <InputBase
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Titles, people, genres"
              sx={{
                color: '#fff',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-outfit)',
                flex: 1,
                pr: 1,
                '& input::placeholder': {
                  color: '#808080',
                  opacity: 1,
                },
              }}
            />
          )}
        </Box>

        {/* Notifications */}
        <IconButton sx={{ color: '#fff', display: { xs: 'none', sm: 'flex' } }}>
          <NotificationsNone sx={{ fontSize: 24 }} />
        </IconButton>

        {/* Profile */}
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '4px',
            background: 'linear-gradient(135deg, #E50914, #B20710)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            ml: 0.5,
          }}
        >
          <Typography sx={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700 }}>J</Typography>
        </Box>
      </Box>
    </Box>
  )
}
