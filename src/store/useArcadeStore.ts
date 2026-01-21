import { create } from 'zustand'

// ZUSTAND STATE MANAGEMENT
// 1. Define the interface for your state and actions
interface ArcadeStore {
  globalChaosMode: boolean // State variable
  arcadeScore: number      // State variable
  quotes: string[]
  currentQuoteIndex: number
  // Actions: Functions to modify the state
  toggleChaos: () => void
  incrementScore: () => void
  resetScore: () => void
  nextQuote: () => void
}

// 2. Create the store
// 'set' is a function supplied by Zustand to update the state
export const useArcadeStore = create<ArcadeStore>((set) => ({
  // Initial State Values
  globalChaosMode: false,
  arcadeScore: 0,
  quotes: [
    "First, solve the problem. Then, write the code. - John Johnson",
    "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
    "Java is to JavaScript what car is to Carpet. - Chris Heilmann",
    "Knowledge is power. - Francis Bacon",
    "Code is like humor. When you have to explain it, it’s bad. - Cory House",
    "Fix the cause, not the symptom. - Steve Maguire",
    "Optimism is an occupational hazard of programming: feedback is the treatment. - Kent Beck",
    "Simplicity is the soul of efficiency. - Austin Freeman"
  ],
  currentQuoteIndex: 0,

  // Action Implementations
  // standard pattern: set((state) => ({ property: newValue }))
  toggleChaos: () => set((state) => ({ globalChaosMode: !state.globalChaosMode })),
  incrementScore: () => set((state) => ({ arcadeScore: state.arcadeScore + 1 })),
  resetScore: () => set({ arcadeScore: 0 }),
  nextQuote: () => set((state) => ({ currentQuoteIndex: (state.currentQuoteIndex + 1) % state.quotes.length })),
}))





