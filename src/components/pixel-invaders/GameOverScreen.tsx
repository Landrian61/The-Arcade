'use client'

import { useState } from 'react'
import { Box, Typography, Button, TextField, alpha } from '@mui/material'
import { keyframes } from '@mui/system'
import ReplayIcon from '@mui/icons-material/Replay'
import HomeIcon from '@mui/icons-material/Home'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { usePixelInvadersStore, selectIsTopScore } from '@/store/usePixelInvadersStore'

const glowPulse = keyframes`
  0%, 100% {
    text-shadow:
      0 0 10px #ff0000,
      0 0 20px #ff0000,
      0 0 30px #ff0000;
  }
  50% {
    text-shadow:
      0 0 15px #ff0000,
      0 0 30px #ff0000,
      0 0 45px #ff0000;
  }
`

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`

const trophyBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`

const buttonGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.4), 0 0 20px rgba(0, 255, 0, 0.2);
  }
  50% {
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.6), 0 0 30px rgba(0, 255, 0, 0.3);
  }
`

interface GameOverScreenProps {
  onRestart: () => void
  onHome: () => void
}

export default function GameOverScreen({ onRestart, onHome }: GameOverScreenProps) {
  const [playerName, setPlayerName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const score = usePixelInvadersStore((s) => s.score)
  const wave = usePixelInvadersStore((s) => s.wave)
  const maxCombo = usePixelInvadersStore((s) => s.maxCombo)
  const highScores = usePixelInvadersStore((s) => s.highScores)
  const submitHighScore = usePixelInvadersStore((s) => s.submitHighScore)
  const isTopScore = selectIsTopScore(usePixelInvadersStore.getState())

  const handleSubmitScore = () => {
    if (playerName.trim()) {
      submitHighScore(playerName.trim().toUpperCase().slice(0, 10))
      setSubmitted(true)
    }
  }

  const qualifiesForHighScore = highScores.length < 10 || score > (highScores[highScores.length - 1]?.score || 0)

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'radial-gradient(ellipse at center, #1a0505 0%, #0a0000 50%, #000000 100%)',
        zIndex: 200,
        p: 2,
        pt: 3,
        overflowY: 'auto',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'var(--font-permanent-marker), "Courier New", monospace',
          fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
          color: '#ff0000',
          textTransform: 'uppercase',
          letterSpacing: { xs: '2px', sm: '4px' },
          animation: `${glowPulse} 2s ease-in-out infinite`,
          mb: 1.5,
          textAlign: 'center',
        }}
      >
        Game Over
      </Typography>

      {isTopScore && score > 0 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1.5,
            animation: `${fadeIn} 0.5s ease-out`,
          }}
        >
          <EmojiEventsIcon
            sx={{
              color: '#fcbf49',
              fontSize: { xs: 20, sm: 24 },
              animation: `${trophyBounce} 1s ease-in-out infinite`,
            }}
          />
          <Typography
            sx={{
              fontFamily: 'var(--font-permanent-marker), monospace',
              fontSize: { xs: '0.9rem', sm: '1.1rem' },
              color: '#fcbf49',
              textShadow: '0 0 10px rgba(252, 191, 73, 0.5)',
            }}
          >
            NEW HIGH SCORE!
          </Typography>
          <EmojiEventsIcon
            sx={{
              color: '#fcbf49',
              fontSize: { xs: 20, sm: 24 },
              animation: `${trophyBounce} 1s ease-in-out infinite 0.5s`,
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          mb: 2,
          animation: `${fadeIn} 0.5s ease-out 0.2s both`,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: { xs: '10px', sm: '11px' },
              color: alpha('#fff', 0.5),
              textTransform: 'uppercase',
              letterSpacing: '3px',
            }}
          >
            Final Score
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-permanent-marker), monospace',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              color: '#00ff00',
              textShadow: '0 0 15px rgba(0, 255, 0, 0.5)',
              letterSpacing: '4px',
            }}
          >
            {score.toString().padStart(6, '0')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: { xs: 3, sm: 5 } }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontSize: { xs: '9px', sm: '10px' },
                color: alpha('#fff', 0.4),
                textTransform: 'uppercase',
              }}
            >
              Wave Reached
            </Typography>
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                fontWeight: 'bold',
                color: '#f77f00',
                textShadow: '0 0 8px rgba(247, 127, 0, 0.5)',
              }}
            >
              {wave}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontSize: { xs: '9px', sm: '10px' },
                color: alpha('#fff', 0.4),
                textTransform: 'uppercase',
              }}
            >
              Max Combo
            </Typography>
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                fontWeight: 'bold',
                color: '#00ffff',
                textShadow: '0 0 8px rgba(0, 255, 255, 0.5)',
              }}
            >
              x{Math.min(Math.floor(maxCombo / 5) + 1, 4)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {qualifiesForHighScore && !submitted && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
            mb: 2,
            p: 2,
            bgcolor: alpha('#000', 0.5),
            border: `1px solid ${alpha('#00ff00', 0.4)}`,
            borderRadius: '4px',
            animation: `${fadeIn} 0.5s ease-out 0.4s both`,
          }}
        >
          <Typography sx={{ fontFamily: 'monospace', fontSize: { xs: '11px', sm: '12px' }, color: '#00ff00' }}>
            Enter your name for the leaderboard:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
              placeholder="AAA"
              inputProps={{ maxLength: 10 }}
              size="small"
              sx={{
                width: { xs: 100, sm: 120 },
                '& .MuiOutlinedInput-root': {
                  color: '#00ff00',
                  fontFamily: 'monospace',
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  '& fieldset': { borderColor: alpha('#00ff00', 0.4) },
                  '&:hover fieldset': { borderColor: alpha('#00ff00', 0.7) },
                  '&.Mui-focused fieldset': { borderColor: '#00ff00' },
                },
                '& input': { textAlign: 'center', textTransform: 'uppercase', py: 1 },
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmitScore()
              }}
            />
            <Button
              variant="contained"
              onClick={handleSubmitScore}
              disabled={!playerName.trim()}
              sx={{
                bgcolor: '#00ff00',
                color: '#000',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                fontSize: { xs: '12px', sm: '14px' },
                px: 2,
                '&:hover': { bgcolor: '#00dd00' },
                '&:disabled': { bgcolor: alpha('#00ff00', 0.2), color: alpha('#000', 0.5) },
              }}
            >
              SAVE
            </Button>
          </Box>
        </Box>
      )}

      {highScores.length > 0 && submitted && (
        <Box
          sx={{
            bgcolor: alpha('#000', 0.5),
            border: `1px solid ${alpha('#00ff00', 0.3)}`,
            borderRadius: '4px',
            p: 1.5,
            mb: 2,
            minWidth: { xs: 200, sm: 240 },
            animation: `${fadeIn} 0.5s ease-out`,
          }}
        >
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: '11px',
              color: '#00ff00',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              mb: 1,
              textAlign: 'center',
            }}
          >
            Leaderboard
          </Typography>
          {highScores.slice(0, 5).map((entry, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'monospace',
                fontSize: { xs: '10px', sm: '11px' },
                color: entry.score === score && submitted ? '#00ff00' : index === 0 ? '#fcbf49' : alpha('#fff', 0.6),
                py: 0.3,
                borderBottom: index < 4 ? `1px solid ${alpha('#fff', 0.1)}` : 'none',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <span style={{ width: 18 }}>{index + 1}.</span>
                <span>{entry.name}</span>
              </Box>
              <span>{entry.score.toString().padStart(6, '0')}</span>
            </Box>
          ))}
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          animation: `${fadeIn} 0.5s ease-out 0.6s both`,
        }}
      >
        <Button
          variant="contained"
          startIcon={<ReplayIcon />}
          onClick={onRestart}
          sx={{
            fontFamily: 'var(--font-permanent-marker), monospace',
            fontSize: { xs: '0.85rem', sm: '1rem' },
            px: { xs: 2, sm: 3 },
            py: 1,
            bgcolor: '#00ff00',
            color: '#000',
            animation: `${buttonGlow} 2s ease-in-out infinite`,
            '&:hover': {
              bgcolor: '#00dd00',
              transform: 'scale(1.05)',
            },
            transition: 'transform 0.2s ease, background-color 0.2s ease',
          }}
        >
          PLAY AGAIN
        </Button>
        <Button
          variant="outlined"
          startIcon={<HomeIcon />}
          onClick={onHome}
          sx={{
            fontFamily: 'monospace',
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            px: { xs: 2, sm: 3 },
            py: 1,
            color: alpha('#fff', 0.7),
            borderColor: alpha('#fff', 0.3),
            '&:hover': {
              borderColor: alpha('#fff', 0.5),
              bgcolor: alpha('#fff', 0.05),
            },
          }}
        >
          LOBBY
        </Button>
      </Box>
    </Box>
  )
}
