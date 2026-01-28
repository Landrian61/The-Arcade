'use client'

import { Box, Typography, Button, alpha, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { keyframes } from '@mui/system'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { usePixelInvadersStore } from '@/store/usePixelInvadersStore'

const blink = keyframes`
  0%, 40% { opacity: 1; }
  50%, 90% { opacity: 0; }
  100% { opacity: 1; }
`

const glowPulse = keyframes`
  0%, 100% {
    text-shadow:
      0 0 10px #00ff00,
      0 0 20px #00ff00,
      0 0 30px #00ff00;
    filter: brightness(1);
  }
  50% {
    text-shadow:
      0 0 15px #00ff00,
      0 0 30px #00ff00,
      0 0 45px #00ff00,
      0 0 60px #00ff00;
    filter: brightness(1.1);
  }
`

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`

const scanlineSweep = keyframes`
  0% { top: -10%; }
  100% { top: 110%; }
`

const buttonGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5), 0 0 30px rgba(0, 255, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 25px rgba(0, 255, 0, 0.7), 0 0 50px rgba(0, 255, 0, 0.4);
  }
`

interface TitleScreenProps {
  onStart: () => void
}

export default function TitleScreen({ onStart }: TitleScreenProps) {
  const highScores = usePixelInvadersStore((s) => s.highScores)
  const difficulty = usePixelInvadersStore((s) => s.difficulty)
  const setDifficulty = usePixelInvadersStore((s) => s.setDifficulty)
  const totalGamesPlayed = usePixelInvadersStore((s) => s.totalGamesPlayed)
  const totalEnemiesDefeated = usePixelInvadersStore((s) => s.totalEnemiesDefeated)

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        background: 'radial-gradient(ellipse at center, #001a0a 0%, #000a05 50%, #000000 100%)',
        zIndex: 200,
        overflow: 'hidden',
        p: 2,
        py: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.4), transparent)',
          animation: `${scanlineSweep} 4s linear infinite`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(1px 1px at 10% 20%, rgba(0, 255, 0, 0.8), transparent),
            radial-gradient(1px 1px at 30% 70%, rgba(0, 255, 0, 0.6), transparent),
            radial-gradient(1px 1px at 50% 40%, rgba(0, 255, 0, 0.4), transparent),
            radial-gradient(1px 1px at 70% 80%, rgba(0, 255, 0, 0.7), transparent),
            radial-gradient(1px 1px at 90% 30%, rgba(0, 255, 0, 0.5), transparent),
            radial-gradient(1px 1px at 15% 90%, rgba(0, 255, 0, 0.6), transparent),
            radial-gradient(1px 1px at 85% 50%, rgba(0, 255, 0, 0.4), transparent),
            radial-gradient(1px 1px at 25% 35%, rgba(0, 255, 0, 0.5), transparent),
            radial-gradient(1px 1px at 65% 15%, rgba(0, 255, 0, 0.6), transparent)
          `,
          opacity: 0.8,
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ textAlign: 'center', animation: `${float} 4s ease-in-out infinite`, zIndex: 2 }}>
        <Typography
          sx={{
            fontFamily: 'var(--font-permanent-marker), "Courier New", monospace',
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
            fontWeight: 'bold',
            color: '#00ff00',
            letterSpacing: { xs: '4px', sm: '8px', md: '10px' },
            animation: `${glowPulse} 3s ease-in-out infinite`,
            lineHeight: 1.1,
            mb: 0.5,
          }}
        >
          PIXEL
        </Typography>
        <Typography
          sx={{
            fontFamily: 'var(--font-permanent-marker), "Courier New", monospace',
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
            fontWeight: 'bold',
            color: '#00ff00',
            letterSpacing: { xs: '4px', sm: '8px', md: '10px' },
            animation: `${glowPulse} 3s ease-in-out infinite 0.5s`,
            lineHeight: 1.1,
          }}
        >
          INVADERS
        </Typography>
      </Box>

      <Typography
        sx={{
          fontFamily: 'monospace',
          fontSize: { xs: '10px', sm: '12px' },
          color: '#00ff00',
          textTransform: 'uppercase',
          letterSpacing: '6px',
          opacity: 0.8,
          zIndex: 2,
        }}
      >
        Debug the Invasion
      </Typography>

      <FormControl
        size="small"
        sx={{
          minWidth: 140,
          zIndex: 2,
          '& .MuiOutlinedInput-root': {
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '14px',
            '& fieldset': { borderColor: alpha('#00ff00', 0.4) },
            '&:hover fieldset': { borderColor: alpha('#00ff00', 0.7) },
            '&.Mui-focused fieldset': { borderColor: '#00ff00' },
          },
          '& .MuiInputLabel-root': {
            color: alpha('#00ff00', 0.6),
            fontFamily: 'monospace',
            fontSize: '12px',
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#00ff00' },
          '& .MuiSelect-icon': { color: alpha('#00ff00', 0.6) },
        }}
      >
        <InputLabel>Difficulty</InputLabel>
        <Select
          value={difficulty}
          label="Difficulty"
          onChange={(e) => setDifficulty(e.target.value as 'easy' | 'normal' | 'hard' | 'insane')}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: '#001a0a',
                border: '1px solid',
                borderColor: alpha('#00ff00', 0.4),
                '& .MuiMenuItem-root': {
                  color: '#00ff00',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  '&:hover': { bgcolor: alpha('#00ff00', 0.1) },
                  '&.Mui-selected': {
                    bgcolor: alpha('#00ff00', 0.15),
                    '&:hover': { bgcolor: alpha('#00ff00', 0.2) },
                  },
                },
              },
            },
          }}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
          <MenuItem value="insane">Insane</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        size="large"
        startIcon={<PlayArrowIcon />}
        onClick={onStart}
        sx={{
          fontFamily: 'var(--font-permanent-marker), monospace',
          fontSize: { xs: '1rem', sm: '1.2rem' },
          px: { xs: 3, sm: 5 },
          py: 1.5,
          bgcolor: '#00ff00',
          color: '#000',
          borderRadius: '4px',
          animation: `${buttonGlow} 2s ease-in-out infinite`,
          zIndex: 2,
          '&:hover': {
            bgcolor: '#00dd00',
            transform: 'scale(1.05)',
          },
          transition: 'transform 0.2s ease, background-color 0.2s ease',
        }}
      >
        START GAME
      </Button>

      <Typography
        sx={{
          fontFamily: 'monospace',
          fontSize: { xs: '11px', sm: '13px' },
          color: '#00ff00',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          animation: `${blink} 1.5s ease-in-out infinite`,
          opacity: 0.9,
          zIndex: 2,
        }}
      >
        Press SPACE or Click to Start
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: { xs: 2, sm: 4 },
          flexWrap: 'wrap',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <Typography sx={{ fontFamily: 'monospace', fontSize: { xs: '9px', sm: '11px' }, color: alpha('#00ff00', 0.5) }}>
          [A][D] Move
        </Typography>
        <Typography sx={{ fontFamily: 'monospace', fontSize: { xs: '9px', sm: '11px' }, color: alpha('#00ff00', 0.5) }}>
          [SPACE] Fire
        </Typography>
        <Typography sx={{ fontFamily: 'monospace', fontSize: { xs: '9px', sm: '11px' }, color: alpha('#00ff00', 0.5) }}>
          [ESC] Pause
        </Typography>
      </Box>

      {highScores.length > 0 && (
        <Box
          sx={{
            bgcolor: alpha('#000', 0.6),
            border: `1px solid ${alpha('#00ff00', 0.3)}`,
            borderRadius: '4px',
            p: 1.5,
            minWidth: 180,
            zIndex: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
            <EmojiEventsIcon sx={{ color: '#00ff00', fontSize: 16 }} />
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: '#00ff00',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              High Scores
            </Typography>
          </Box>
          {highScores.slice(0, 5).map((entry, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'monospace',
                fontSize: '10px',
                color: index === 0 ? '#00ff00' : alpha('#00ff00', 0.6),
                py: 0.25,
              }}
            >
              <span>
                {index + 1}. {entry.name}
              </span>
              <span>{entry.score.toString().padStart(6, '0')}</span>
            </Box>
          ))}
        </Box>
      )}

      {(totalGamesPlayed > 0 || totalEnemiesDefeated > 0) && (
        <Box sx={{ mt: 2, display: 'flex', gap: 3, zIndex: 2 }}>
          <Typography sx={{ fontFamily: 'monospace', fontSize: '9px', color: alpha('#00ff00', 0.4) }}>
            Games: {totalGamesPlayed}
          </Typography>
          <Typography sx={{ fontFamily: 'monospace', fontSize: '9px', color: alpha('#00ff00', 0.4) }}>
            Bugs Squashed: {totalEnemiesDefeated}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
