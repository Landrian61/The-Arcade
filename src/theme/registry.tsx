'use client'

import * as React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
// Note: Font names with spaces are converted to underscores in next/font/google
// If fonts don't load, verify they exist in Google Fonts or use alternative fonts
import { Outfit, Permanent_Marker, Rubik_Glitch } from 'next/font/google'

const outfit = Outfit({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

const permanentMarker = Permanent_Marker({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-permanent-marker',
})

const rubikGlitch = Rubik_Glitch({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik-glitch',
})

const theme = createTheme({
  palette: {
    primary: {
      main: '#003049', // Deep Space Blue
      contrastText: '#eae2b7', // Vanilla Custard
    },
    secondary: {
      main: '#f77f00', // Vivid Tangerine
      contrastText: '#003049', // Deep Space Blue
    },
    error: {
      main: '#d62828', // Flag Red
    },
    warning: {
      main: '#fcbf49', // Sunflower Gold
    },
    background: {
      default: '#eae2b7', // Vanilla Custard
      paper: '#ffffff',
    },
    text: {
      primary: '#003049', // Deep Space Blue
      secondary: '#d62828', // Flag Red
    },
  },
  typography: {
    fontFamily: outfit.style.fontFamily,
    h1: {
      fontFamily: permanentMarker.style.fontFamily,
    },
    h2: {
      fontFamily: permanentMarker.style.fontFamily,
    },
    h3: {
      fontFamily: permanentMarker.style.fontFamily,
    },
    h4: {
      fontFamily: permanentMarker.style.fontFamily,
    },
    h5: {
      fontFamily: permanentMarker.style.fontFamily,
    },
    h6: {
      fontFamily: permanentMarker.style.fontFamily,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: outfit.style.fontFamily,
        },
      },
    },
  },
})

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`${outfit.variable} ${permanentMarker.variable} ${rubikGlitch.variable}`}>
        {children}
      </div>
    </ThemeProvider>
  )
}

