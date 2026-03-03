'use client'

import { useArcadeStore } from '@/store/useArcadeStore'
import { Box, Container, Typography, Fab, Card, CardContent, Button, useTheme, alpha, Avatar, Chip, LinearProgress, Grid, IconButton } from '@mui/material'
import { AutoAwesome, MusicNote, Favorite, Code, Brush, Psychology, Lightbulb, Refresh, Palette, Star, CheckCircle, RadioButtonUnchecked, SelfImprovement, LocalCafe, Book, Celebration, EmojiEmotions, SentimentVeryDissatisfied, SentimentNeutral, InsertEmoticon } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { keyframes } from '@mui/system'

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`

const shimmer = keyframes`
  0% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2); }
  50% { box-shadow: 0 0 20px rgba(96, 165, 250, 0.5), 0 0 40px rgba(96, 165, 250, 0.3); }
  100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2); }
`

const sparkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.7; transform: scale(1.1) rotate(180deg); }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

const elegantSerif = 'Georgia, "Times New Roman", serif'
const modernSans = 'var(--font-outfit)'

// Mood options with navy/white color scheme
const moods = [
  { icon: <Celebration />, label: 'Energized', color: '#60a5fa', value: 'energized' },
  { icon: <InsertEmoticon />, label: 'Happy', color: '#93c5fd', value: 'happy' },
  { icon: <SentimentNeutral />, label: 'Calm', color: '#dbeafe', value: 'calm' },
  { icon: <SelfImprovement />, label: 'Focused', color: '#3b82f6', value: 'focused' },
]

// Daily habits
const initialHabits = [
  { id: 1, label: 'Morning Meditation', icon: <SelfImprovement />, completed: false },
  { id: 2, label: 'Code Practice (30min)', icon: <Code />, completed: false },
  { id: 3, label: 'Creative Time', icon: <Brush />, completed: false },
  { id: 4, label: 'Read Tech Article', icon: <Book />, completed: false },
]

// Project ideas
const projectIdeas = [
  "Build a personal portfolio with 3D elements",
  "Create an AI-powered mood journal",
  "Design a minimalist task manager",
  "Develop a book recommendation app",
  "Code a meditation timer with ambient sounds",
  "Make an aesthetic habit tracker",
  "Build a recipe organizer with filters",
  "Create a study planner with pomodoro",
]

export default function MarthaPage() {
  const { quotes, currentQuoteIndex, nextQuote } = useArcadeStore()
  
  const [currentMood, setCurrentMood] = useState<string | null>(null)
  const [habits, setHabits] = useState(initialHabits)
  const [studyMinutes, setStudyMinutes] = useState(0)
  const [isStudying, setIsStudying] = useState(false)
  const [currentProjectIdea, setCurrentProjectIdea] = useState(projectIdeas[0])
  const [sparkleActive, setSparkleActive] = useState(false)
  const [weekStreak, setWeekStreak] = useState(3)
  const [totalPoints, setTotalPoints] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const theme = useTheme()

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Study timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isStudying) {
      interval = setInterval(() => {
        setStudyMinutes(prev => {
          const newMinutes = prev + 1
          if (newMinutes % 5 === 0) {
            setTotalPoints(p => p + 10)
          }
          return newMinutes
        })
      }, 60000) // Every minute
    }
    return () => clearInterval(interval)
  }, [isStudying])

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        const newCompleted = !h.completed
        if (newCompleted) {
          setTotalPoints(p => p + 25)
          setSparkleActive(true)
          setTimeout(() => setSparkleActive(false), 400)
        } else {
          setTotalPoints(p => Math.max(0, p - 25))
        }
        return { ...h, completed: newCompleted }
      }
      return h
    }))
  }

  const selectMood = (moodValue: string) => {
    setCurrentMood(moodValue)
    setTotalPoints(p => p + 5)
  }

  const newProjectIdea = () => {
    const randomIdea = projectIdeas[Math.floor(Math.random() * projectIdeas.length)]
    setCurrentProjectIdea(randomIdea)
  }

  const toggleStudy = () => {
    setIsStudying(!isStudying)
    if (!isStudying) {
      setTotalPoints(p => p + 5)
    }
  }

  const completedHabits = habits.filter(h => h.completed).length
  const habitProgress = (completedHabits / habits.length) * 100

  const glassCardStyle = (borderColor: string, gradientStart: string, gradientEnd: string) => ({
    background: `linear-gradient(135deg, ${alpha(gradientStart, 0.15)} 0%, ${alpha(gradientEnd, 0.1)} 100%)`,
    backdropFilter: 'blur(20px)',
    border: `2px solid ${alpha(borderColor, 0.3)}`,
    borderRadius: '24px',
    boxShadow: `0 8px 32px 0 ${alpha(borderColor, 0.1)}, inset 0 1px 0 0 ${alpha('#fff', 0.1)}`,
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    height: '100%',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: `0 20px 60px 0 ${alpha(borderColor, 0.25)}, inset 0 1px 0 0 ${alpha('#fff', 0.2)}`,
      border: `2px solid ${alpha(borderColor, 0.6)}`,
    }
  })

  const quoteCardStyle = {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(96, 165, 250, 0.2) 50%, rgba(147, 197, 253, 0.15) 100%)',
    backdropFilter: 'blur(24px)',
    border: '2px solid rgba(147, 197, 253, 0.4)',
    borderRadius: '28px',
    boxShadow: '0 20px 60px rgba(59, 130, 246, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
    position: 'relative',
    overflow: 'hidden',
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        color: '#1e293b',
        fontFamily: modernSans,
      }}
    >
      {/* Background */}
      <Box
        component="div"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -2,
          backgroundImage: `url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4) contrast(1.2) saturate(0.8)',
          transform: `scale(1.05) translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.2) 0%, rgba(59, 130, 246, 0.15) 50%, rgba(147, 197, 253, 0.1) 100%)',
        }}
      />

      <Container maxWidth="xl" sx={{ pt: 10, pb: 12, position: 'relative', zIndex: 1, px: { xs: 2, md: 6 } }}>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '380px 1fr' }, gap: 6 }}>
          
          {/* LEFT COLUMN: Profile & Stats */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
             {/* Profile Card */}
             <Card sx={{ 
               ...glassCardStyle('rgba(147, 197, 253, 0.6)', '#3b82f6', '#93c5fd'), 
               textAlign: 'center', 
               p: 4, 
               position: 'relative',
               background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(96, 165, 250, 0.08) 100%)',
             }}>
                {/* Header accent */}
                <Box sx={{ 
                   position: 'absolute', 
                   top: 0, 
                   left: 0, 
                   right: 0, 
                   height: '120px', 
                   background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(96, 165, 250, 0.25), rgba(147, 197, 253, 0.2))',
                   zIndex: 0,
                }} />
                
                {/* Avatar */}
                <Avatar 
                  sx={{ 
                    width: 130, 
                    height: 130, 
                    margin: '50px auto 20px', 
                    border: '4px solid rgba(147, 197, 253, 0.8)',
                    bgcolor: 'rgba(59, 130, 246, 0.2)',
                    fontSize: '3.5rem',
                    fontFamily: elegantSerif,
                    fontStyle: 'italic',
                    fontWeight: 300,
                    zIndex: 1,
                    position: 'relative',
                    boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
                    color: '#dbeafe',
                  }}
                >M</Avatar>
                
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontFamily: elegantSerif, 
                    color: '#60a5fa', 
                    mb: 0.5,
                    fontWeight: 400,
                    letterSpacing: '0.5px',
                  }}
                >
                  Martha
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#93c5fd', 
                    opacity: 0.9, 
                    mb: 3,
                    fontStyle: 'italic',
                    fontSize: '0.95rem',
                  }}
                >
                  Creative Developer & Wellness Enthusiast
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 3 }}>
                   <Chip 
                     icon={<Star style={{ color: '#fbbf24' }} />} 
                     label={`${weekStreak} Day Streak`}
                     sx={{ 
                       bgcolor: 'rgba(251, 191, 36, 0.2)', 
                       color: '#ffffff', 
                       fontWeight: 600,
                       border: '1px solid rgba(251, 191, 36, 0.5)',
                       backdropFilter: 'blur(10px)',
                     }} 
                   />
                   <Chip 
                     icon={<Celebration style={{ color: '#60a5fa' }} />} 
                     label={`${totalPoints} Points`}
                     sx={{ 
                       bgcolor: 'rgba(96, 165, 250, 0.2)', 
                       color: '#ffffff', 
                       fontWeight: 600,
                       border: '1px solid rgba(96, 165, 250, 0.5)',
                       backdropFilter: 'blur(10px)',
                       animation: sparkleActive ? `${pulse} 0.3s` : 'none',
                     }} 
                   />
                </Box>

                <Typography 
                  variant="body2" 
                  sx={{ 
                    textAlign: 'center', 
                    lineHeight: 1.8, 
                    color: '#e2e8f0',
                    fontSize: '0.9rem',
                    fontStyle: 'italic',
                  }}
                >
                  Building beautiful things, one habit at a time. ✨
                </Typography>
             </Card>

             {/* Mood Tracker */}
             <Card sx={{ ...glassCardStyle('rgba(96, 165, 250, 0.6)', '#3b82f6', '#93c5fd'), p: 3 }}>
               <Typography variant="h6" sx={{ fontFamily: elegantSerif, color: '#f8fafc', mb: 2, fontStyle: 'italic' }}>
                 Today's Mood
               </Typography>
               <Grid container spacing={1.5}>
                 {moods.map(mood => (
                   <Grid item xs={6} key={mood.value}>
                     <Button
                       fullWidth
                       variant={currentMood === mood.value ? 'contained' : 'outlined'}
                       onClick={() => selectMood(mood.value)}
                       sx={{
                         py: 1.5,
                         bgcolor: currentMood === mood.value ? alpha(mood.color, 0.3) : 'transparent',
                         border: `2px solid ${alpha(mood.color, currentMood === mood.value ? 0.6 : 0.3)}`,
                         color: '#ffffff',
                         backdropFilter: 'blur(10px)',
                         '&:hover': {
                           bgcolor: alpha(mood.color, 0.2),
                           border: `2px solid ${alpha(mood.color, 0.5)}`,
                         }
                       }}
                     >
                       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                         <Box sx={{ color: mood.color }}>{mood.icon}</Box>
                         <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
                           {mood.label}
                         </Typography>
                       </Box>
                     </Button>
                   </Grid>
                 ))}
               </Grid>
             </Card>
          </Box>

          {/* RIGHT COLUMN: Interactive Area */}
          <Box>
            {/* Header Title */}
            <Box sx={{ textAlign: 'left', mb: 6, position: 'relative' }}>
              <Box sx={{ 
                position: 'absolute', 
                left: -20, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                width: '6px', 
                height: '80%', 
                background: 'linear-gradient(to bottom, #3b82f6, #93c5fd)',
                borderRadius: '3px',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
              }} />
              <Typography
                variant="h1"
                sx={{
                  fontFamily: elegantSerif,
                  fontSize: { xs: '3.5rem', md: '6rem' },
                  color: '#dbeafe',
                  textShadow: `3px 3px 0px rgba(59, 130, 246, 0.3), 6px 6px 20px rgba(59, 130, 246, 0.2)`,
                  lineHeight: 1,
                  fontWeight: 300,
                  fontStyle: 'italic',
                  letterSpacing: '2px',
                  pl: 3,
                }}
              >
                MY SPACE
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontFamily: modernSans, 
                  color: '#93c5fd', 
                  mt: 2, 
                  pl: 3,
                  fontWeight: 300,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                }}
              >
                Wellness & Productivity Hub
              </Typography>
            </Box>

            {/* Study Timer & Daily Progress */}
            <Box sx={{ mb: 6, display: 'flex', flexDirection: { xs: 'column', xl: 'row' }, gap: 4, alignItems: 'stretch' }}>
              
              {/* Study Timer */}
              <Box sx={{
                background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2) 0%, rgba(147, 197, 253, 0.15) 100%)',
                backdropFilter: 'blur(20px)',
                p: 4,
                borderRadius: '20px',
                border: '2px solid rgba(147, 197, 253, 0.4)',
                width: { xs: '100%', xl: '320px' },
                flexShrink: 0,
                boxShadow: '0 15px 45px rgba(96, 165, 250, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <LocalCafe sx={{ 
                  fontSize: 40, 
                  color: '#60a5fa', 
                  mb: 1.5,
                  animation: isStudying ? `${float} 2s ease-in-out infinite` : 'none',
                }} />
                <Typography 
                  variant="overline" 
                  sx={{ 
                    color: '#93c5fd', 
                    letterSpacing: 2,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                  }}
                >
                  Study Session
                </Typography>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontFamily: elegantSerif, 
                    color: '#dbeafe', 
                    my: 2,
                    fontWeight: 300,
                    fontSize: '3.5rem',
                  }}
                >
                  {studyMinutes}
                </Typography>
                <Typography variant="caption" sx={{ color: '#93c5fd', mb: 2 }}>minutes today</Typography>
                <Button
                  variant="contained"
                  onClick={toggleStudy}
                  sx={{
                    bgcolor: isStudying ? 'rgba(248, 250, 252, 0.2)' : 'rgba(59, 130, 246, 0.3)',
                    color: isStudying ? '#f8fafc' : '#ffffff',
                    px: 4,
                    py: 1,
                    borderRadius: '50px',
                    border: `1px solid ${isStudying ? 'rgba(248, 250, 252, 0.5)' : 'rgba(147, 197, 253, 0.5)'}`,
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: isStudying ? 'rgba(248, 250, 252, 0.3)' : 'rgba(59, 130, 246, 0.5)',
                    }
                  }}
                >
                  {isStudying ? 'Pause' : 'Start'}
                </Button>
              </Box>

              {/* Daily Inspiration */}
              <Card sx={{ ...quoteCardStyle, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CardContent sx={{ p: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 3, height: '100%' }}>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '140px' }}>
                    <Lightbulb sx={{ 
                      fontSize: 48, 
                      color: '#fbbf24', 
                      mb: 1.5, 
                      filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))',
                      animation: `${float} 3s ease-in-out infinite`,
                    }} />
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: elegantSerif, 
                        lineHeight: 1.2,
                        color: '#60a5fa',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        fontSize: '1.1rem',
                      }}
                    >
                      Daily Wisdom
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    textAlign: { xs: 'center', md: 'left' }, 
                    borderLeft: { md: '2px solid rgba(147, 197, 253, 0.3)' }, 
                    pl: { md: 3 } 
                  }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontStyle: 'italic', 
                        fontFamily: modernSans, 
                        fontWeight: 300, 
                        mb: 1.5, 
                        fontSize: '1.15rem',
                        color: '#f8fafc',
                        lineHeight: 1.6,
                      }}
                    >
                      &quot;{quotes[currentQuoteIndex]?.split(' - ')[0] || 'Loading wisdom...'}&quot;
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#ffffff', 
                        fontWeight: 600, 
                        bgcolor: 'rgba(147, 197, 253, 0.4)', 
                        px: 2, 
                        py: 0.5, 
                        borderRadius: '12px', 
                        alignSelf: { xs: 'center', md: 'flex-start' },
                        border: '1px solid rgba(147, 197, 253, 0.6)',
                        fontSize: '0.8rem',
                      }}
                    >
                      — {quotes[currentQuoteIndex]?.split(' - ')[1] || "System"}
                    </Typography>
                  </Box>

                  <Box>
                    <Button 
                      variant="contained" 
                      onClick={nextQuote}
                      startIcon={<Refresh />}
                      sx={{ 
                        bgcolor: 'rgba(59, 130, 246, 0.3)', 
                        color: '#ffffff',
                        borderRadius: '50px',
                        px: 3,
                        py: 1.2,
                        whiteSpace: 'nowrap',
                        border: '1px solid rgba(147, 197, 253, 0.4)',
                        backdropFilter: 'blur(10px)',
                        fontWeight: 500,
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        '&:hover': { 
                          bgcolor: 'rgba(59, 130, 246, 0.5)',
                          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                        }
                      }}
                    >
                      New Quote
                    </Button>
                  </Box>

                </CardContent>
              </Card>

            </Box>

            {/* Daily Habits */}
            <Card sx={{ ...glassCardStyle('rgba(59, 130, 246, 0.6)', '#3b82f6', '#93c5fd'), mb: 4, p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontFamily: elegantSerif, color: '#f8fafc', fontStyle: 'italic' }}>
                  Daily Habits
                </Typography>
                <Typography variant="body2" sx={{ color: '#93c5fd', fontWeight: 600 }}>
                  {completedHabits}/{habits.length} Complete
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={habitProgress} 
                sx={{ 
                  mb: 3, 
                  height: 8, 
                  borderRadius: 4,
                  bgcolor: 'rgba(147, 197, 253, 0.2)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #3b82f6, #93c5fd)',
                    borderRadius: 4,
                  }
                }} 
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {habits.map(habit => (
                  <Box 
                    key={habit.id}
                    onClick={() => toggleHabit(habit.id)}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      p: 2,
                      borderRadius: '16px',
                      bgcolor: habit.completed ? 'rgba(147, 197, 253, 0.2)' : 'rgba(147, 197, 253, 0.05)',
                      border: `2px solid ${habit.completed ? 'rgba(147, 197, 253, 0.5)' : 'rgba(147, 197, 253, 0.2)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(147, 197, 253, 0.15)',
                        transform: 'translateX(8px)',
                      }
                    }}
                  >
                    <IconButton sx={{ color: habit.completed ? '#60a5fa' : '#93c5fd' }}>
                      {habit.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                    </IconButton>
                    <Box sx={{ color: '#60a5fa' }}>{habit.icon}</Box>
                    <Typography 
                      sx={{ 
                        flex: 1, 
                        color: '#f8fafc',
                        textDecoration: habit.completed ? 'line-through' : 'none',
                        opacity: habit.completed ? 0.6 : 1,
                      }}
                    >
                      {habit.label}
                    </Typography>
                    {habit.completed && (
                      <Chip label="+25" size="small" sx={{ bgcolor: 'rgba(251, 191, 36, 0.3)', color: '#ffffff', fontWeight: 'bold' }} />
                    )}
                  </Box>
                ))}
              </Box>
            </Card>

            {/* Project Idea Generator */}
            <Card sx={{ ...glassCardStyle('rgba(96, 165, 250, 0.6)', '#3b82f6', '#93c5fd'), p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Palette sx={{ fontSize: 40, color: '#60a5fa' }} />
                <Typography variant="h5" sx={{ fontFamily: elegantSerif, color: '#f8fafc', fontStyle: 'italic' }}>
                  Project Spark
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ color: '#e2e8f0', mb: 3, lineHeight: 1.6, fontWeight: 400 }}>
                {currentProjectIdea}
              </Typography>
              <Button
                variant="contained"
                onClick={newProjectIdea}
                startIcon={<AutoAwesome />}
                sx={{
                  bgcolor: 'rgba(96, 165, 250, 0.3)',
                  color: '#ffffff',
                  borderRadius: '50px',
                  px: 4,
                  py: 1.2,
                  border: '1px solid rgba(147, 197, 253, 0.5)',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'rgba(96, 165, 250, 0.5)',
                  }
                }}
              >
                New Idea
              </Button>
            </Card>

          </Box>
        </Box>

        {/* Floating Action Button */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 40,
            right: 40,
            zIndex: 100,
          }}
        >
          <Fab
            onClick={() => {
              setSparkleActive(true)
              setTotalPoints(p => p + 1)
              setTimeout(() => setSparkleActive(false), 400)
            }}
            sx={{
              bgcolor: 'rgba(59, 130, 246, 0.3)',
              backdropFilter: 'blur(20px)',
              color: '#dbeafe',
              width: 75,
              height: 75,
              border: '3px solid rgba(147, 197, 253, 0.6)',
              transform: sparkleActive ? 'scale(0.85) rotate(15deg)' : 'scale(1)',
              transition: 'all 0.2s ease',
              boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)',
              '&:hover': {
                bgcolor: 'rgba(59, 130, 246, 0.5)',
                boxShadow: '0 15px 50px rgba(59, 130, 246, 0.6)',
                transform: 'scale(1.05)',
              }
            }}
          >
            <AutoAwesome sx={{ fontSize: 32, animation: `${sparkle} 2s ease-in-out infinite` }} />
          </Fab>
        </Box>

      </Container>
    </Box>
  )
}
