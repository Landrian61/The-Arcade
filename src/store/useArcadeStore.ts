import { create } from 'zustand'

interface ArcadeStore {
  globalChaosMode: boolean
  arcadeScore: number
  toggleChaos: () => void
  incrementScore: () => void
  resetScore: () => void
}

export const useArcadeStore = create<ArcadeStore>((set) => ({
  globalChaosMode: false,
  arcadeScore: 0,
  toggleChaos: () => set((state) => ({ globalChaosMode: !state.globalChaosMode })),
  incrementScore: () => set((state) => ({ arcadeScore: state.arcadeScore + 1 })),
  resetScore: () => set({ arcadeScore: 0 }),
}))





