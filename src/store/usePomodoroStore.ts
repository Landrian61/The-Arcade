import { create } from 'zustand'

type TimerMode = 'focus' | 'shortBreak' | 'longBreak'

interface Habit {
  id: string
  name: string
  completedToday: boolean
  streak: number
}

const DURATIONS: Record<TimerMode, number> = {
  focus: 1 * 60,
  shortBreak: 1 * 60,
  longBreak: 5 * 60,
}

interface PomodoroStore {
  timerSeconds: number
  timerMode: TimerMode
  isRunning: boolean
  sessionsCompleted: number
  arcadeScore: number
  habits: Habit[]

  tick: () => void
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  switchMode: (mode: TimerMode) => void
  completeSession: () => void
  addHabit: (name: string) => void
  toggleHabit: (id: string) => void
  removeHabit: (id: string) => void
}

export const usePomodoroStore = create<PomodoroStore>((set, get) => ({
  timerSeconds: DURATIONS.focus,
  timerMode: 'focus',
  isRunning: false,
  sessionsCompleted: 0,
  arcadeScore: 0,
  habits: [
    { id: '1', name: 'Review pull requests', completedToday: false, streak: 3 },
    { id: '2', name: 'Write unit tests', completedToday: false, streak: 7 },
    { id: '3', name: 'Read documentation', completedToday: false, streak: 1 },
  ],

  tick: () => {
    const { timerSeconds, isRunning } = get()
    if (!isRunning) return
    if (timerSeconds <= 1) {
      set({ timerSeconds: 0, isRunning: false })
      get().completeSession()
      return
    }
    set({ timerSeconds: timerSeconds - 1 })
  },

  startTimer: () => set({ isRunning: true }),
  pauseTimer: () => set({ isRunning: false }),

  resetTimer: () => {
    const { timerMode } = get()
    set({ timerSeconds: DURATIONS[timerMode], isRunning: false })
  },

  switchMode: (mode) => set({
    timerMode: mode,
    timerSeconds: DURATIONS[mode],
    isRunning: false,
  }),

  completeSession: () => {
    const { timerMode, habits } = get()
    if (timerMode === 'focus') {
      const totalStreak = habits
        .filter((h) => h.completedToday)
        .reduce((sum, h) => sum + h.streak, 0)
      set((s) => ({
        sessionsCompleted: s.sessionsCompleted + 1,
        arcadeScore: totalStreak > 0 ? s.arcadeScore + totalStreak : s.arcadeScore,
      }))
    }
  },

  addHabit: (name) => set((s) => ({
    habits: [...s.habits, {
      id: Date.now().toString(),
      name,
      completedToday: false,
      streak: 0,
    }],
  })),

  toggleHabit: (id) => set((s) => ({
    habits: s.habits.map((h) =>
      h.id === id
        ? { ...h, completedToday: !h.completedToday }
        : h
    ),
  })),

  removeHabit: (id) => set((s) => ({
    habits: s.habits.filter((h) => h.id !== id),
  })),
}))
