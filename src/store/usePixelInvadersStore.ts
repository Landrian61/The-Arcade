import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useArcadeStore } from './useArcadeStore'

type GameState = 'idle' | 'playing' | 'paused' | 'gameOver'
type PowerUpType = 'rapidFire' | 'shield' | 'multiShot' | 'slowMotion'
type EnemyType = 'bug' | 'glitch' | 'virus'

interface Position {
  x: number
  y: number
}

interface Enemy {
  id: string
  type: EnemyType
  position: Position
  health: number
  points: number
  width: number
  height: number
}

interface Projectile {
  id: string
  position: Position
  velocity: number
  isPlayer: boolean
  type: string
}

interface PowerUp {
  id: string
  type: PowerUpType
  position: Position
  duration: number
}

interface Player {
  position: Position
  lives: number
  isInvulnerable: boolean
  activePowerUps: { type: PowerUpType; expiresAt: number }[]
}

interface HighScoreEntry {
  name: string
  score: number
  wave: number
  date: string
}

interface PixelInvadersState {
  gameState: GameState
  score: number
  wave: number
  combo: number
  maxCombo: number

  player: Player
  enemies: Enemy[]
  projectiles: Projectile[]
  powerUps: PowerUp[]

  soundEnabled: boolean
  crtEffectsEnabled: boolean
  difficulty: 'easy' | 'normal' | 'hard' | 'insane'

  highScores: HighScoreEntry[]
  totalGamesPlayed: number
  totalEnemiesDefeated: number
  bestWave: number

  lastFireTime: number
}

interface PixelInvadersActions {
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  endGame: () => void
  resetGame: () => void

  movePlayer: (direction: 'left' | 'right') => void
  fireProjectile: () => void

  tick: (deltaTime: number) => void
  spawnWave: (waveNumber: number) => void
  spawnPowerUp: (position: Position) => void

  handleCollision: (projectileId: string, enemyId: string) => void
  damagePlayer: () => void
  collectPowerUp: (powerUpId: string) => void

  addScore: (points: number) => void
  incrementCombo: () => void
  resetCombo: () => void
  submitHighScore: (name: string) => void

  toggleSound: () => void
  toggleCrtEffects: () => void
  setDifficulty: (difficulty: 'easy' | 'normal' | 'hard' | 'insane') => void
}

export const selectComboMultiplier = (state: PixelInvadersState) =>
  Math.min(Math.floor(state.combo / 5) + 1, 4)

export const selectActivePowerUps = (state: PixelInvadersState) =>
  state.player.activePowerUps.filter((p) => p.expiresAt > Date.now())

export const selectHasShield = (state: PixelInvadersState) =>
  selectActivePowerUps(state).some((p) => p.type === 'shield')

export const selectHasRapidFire = (state: PixelInvadersState) =>
  selectActivePowerUps(state).some((p) => p.type === 'rapidFire')

export const selectHasMultiShot = (state: PixelInvadersState) =>
  selectActivePowerUps(state).some((p) => p.type === 'multiShot')

export const selectFireRate = (state: PixelInvadersState) => {
  const hasRapidFire = selectHasRapidFire(state)
  return hasRapidFire ? 100 : 250
}

export const selectIsTopScore = (state: PixelInvadersState) =>
  state.highScores.length === 0 || state.score > state.highScores[0]?.score

const initialPlayer: Player = {
  position: { x: 50, y: 85 },
  lives: 3,
  isInvulnerable: false,
  activePowerUps: [],
}

const initialState: PixelInvadersState = {
  gameState: 'idle',
  score: 0,
  wave: 0,
  combo: 0,
  maxCombo: 0,
  player: initialPlayer,
  enemies: [],
  projectiles: [],
  powerUps: [],
  soundEnabled: true,
  crtEffectsEnabled: true,
  difficulty: 'normal',
  highScores: [],
  totalGamesPlayed: 0,
  totalEnemiesDefeated: 0,
  bestWave: 0,
  lastFireTime: 0,
}

export const usePixelInvadersStore = create<PixelInvadersState & PixelInvadersActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      startGame: () => {
        set({
          gameState: 'playing',
          score: 0,
          wave: 1,
          combo: 0,
          maxCombo: 0,
          player: { ...initialPlayer },
          enemies: [],
          projectiles: [],
          powerUps: [],
          lastFireTime: 0,
        })
        get().spawnWave(1)
        set((s) => ({ totalGamesPlayed: s.totalGamesPlayed + 1 }))
      },

      pauseGame: () => set({ gameState: 'paused' }),

      resumeGame: () => set({ gameState: 'playing' }),

      endGame: () => {
        const { score, wave, bestWave } = get()

        const arcadeStore = useArcadeStore.getState()
        const bonusPoints = Math.floor(score / 10)
        for (let i = 0; i < bonusPoints; i++) {
          arcadeStore.incrementScore()
        }

        set({
          gameState: 'gameOver',
          bestWave: Math.max(bestWave, wave),
        })
      },

      resetGame: () =>
        set({
          gameState: 'idle',
          score: 0,
          wave: 0,
          combo: 0,
          maxCombo: 0,
          player: { ...initialPlayer },
          enemies: [],
          projectiles: [],
          powerUps: [],
          lastFireTime: 0,
        }),

      movePlayer: (direction) =>
        set((state) => {
          if (state.gameState !== 'playing') return state

          const moveAmount = 3
          const newX =
            direction === 'left'
              ? Math.max(5, state.player.position.x - moveAmount)
              : Math.min(95, state.player.position.x + moveAmount)

          return {
            player: {
              ...state.player,
              position: { ...state.player.position, x: newX },
            },
          }
        }),

      fireProjectile: () => {
        const state = get()
        if (state.gameState !== 'playing') return

        const now = Date.now()
        const fireRate = selectFireRate(state)

        if (now - state.lastFireTime < fireRate) return

        const hasMultiShot = selectHasMultiShot(state)
        const projectileTypes = ['</>', '{}', '()']

        const newProjectiles: Projectile[] = [
          {
            id: `proj_${now}_c`,
            position: { x: state.player.position.x, y: state.player.position.y - 3 },
            velocity: -2.5,
            isPlayer: true,
            type: projectileTypes[Math.floor(Math.random() * projectileTypes.length)],
          },
        ]

        if (hasMultiShot) {
          newProjectiles.push(
            {
              ...newProjectiles[0],
              id: `proj_${now}_l`,
              position: { ...newProjectiles[0].position, x: newProjectiles[0].position.x - 4 },
            },
            {
              ...newProjectiles[0],
              id: `proj_${now}_r`,
              position: { ...newProjectiles[0].position, x: newProjectiles[0].position.x + 4 },
            }
          )
        }

        set({
          projectiles: [...state.projectiles, ...newProjectiles],
          lastFireTime: now,
        })
      },

      tick: (deltaTime) => {
        const state = get()
        if (state.gameState !== 'playing') return

        const updatedProjectiles = state.projectiles
          .map((p) => ({
            ...p,
            position: { ...p.position, y: p.position.y + p.velocity * deltaTime },
          }))
          .filter((p) => p.position.y > -5 && p.position.y < 105)

        const speedMultiplier = { easy: 0.8, normal: 1.5, hard: 2.5, insane: 4.0 }[state.difficulty]
        const baseSpeed = 0.08

        const updatedEnemies = state.enemies.map((e) => ({
          ...e,
          position: {
            ...e.position,
            y: e.position.y + baseSpeed * speedMultiplier * deltaTime,
          },
        }))

        const updatedPowerUps = state.powerUps
          .map((p) => ({
            ...p,
            position: { ...p.position, y: p.position.y + 0.02 * deltaTime },
          }))
          .filter((p) => p.position.y < 100)

        const enemyReachedBottom = updatedEnemies.some((e) => e.position.y >= 80)
        if (enemyReachedBottom) {
          get().damagePlayer()
          set({ enemies: updatedEnemies.filter((e) => e.position.y < 80) })
          return
        }

        if (updatedEnemies.length === 0 && state.wave > 0) {
          const nextWave = state.wave + 1
          set({ wave: nextWave })
          get().spawnWave(nextWave)
          return
        }

        const cleanedPowerUps = state.player.activePowerUps.filter((p) => p.expiresAt > Date.now())

        set({
          projectiles: updatedProjectiles,
          enemies: updatedEnemies,
          powerUps: updatedPowerUps,
          player: {
            ...state.player,
            activePowerUps: cleanedPowerUps,
          },
        })
      },

      spawnWave: (waveNumber) => {
        const enemyTypes: EnemyType[] = ['bug', 'glitch', 'virus']
        const rows = Math.min(2 + Math.floor(waveNumber / 3), 5)
        const cols = Math.min(4 + Math.floor(waveNumber / 2), 8)

        const enemies: Enemy[] = []

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            enemies.push({
              id: `enemy_${waveNumber}_${row}_${col}`,
              type: enemyTypes[row % enemyTypes.length],
              position: {
                x: 15 + col * (70 / cols),
                y: 5 + row * 8,
              },
              health: 1 + Math.floor(waveNumber / 5),
              points: 10 * (row + 1),
              width: 6,
              height: 6,
            })
          }
        }

        set({ enemies })
      },

      spawnPowerUp: (position) => {
        const types: PowerUpType[] = ['rapidFire', 'shield', 'multiShot', 'slowMotion']
        const powerUp: PowerUp = {
          id: `powerup_${Date.now()}`,
          type: types[Math.floor(Math.random() * types.length)],
          position: { ...position },
          duration: 10000,
        }
        set((s) => ({ powerUps: [...s.powerUps, powerUp] }))
      },

      handleCollision: (projectileId, enemyId) => {
        const state = get()
        const enemy = state.enemies.find((e) => e.id === enemyId)

        if (!enemy) return

        const updatedEnemies = state.enemies
          .map((e) => (e.id === enemyId ? { ...e, health: e.health - 1 } : e))
          .filter((e) => e.health > 0)

        const wasKilled = enemy.health <= 1

        if (wasKilled) {
          get().addScore(enemy.points)
          get().incrementCombo()

          // 15% chance to spawn power-up
          if (Math.random() < 0.15) {
            get().spawnPowerUp(enemy.position)
          }

          set((s) => ({ totalEnemiesDefeated: s.totalEnemiesDefeated + 1 }))
        }

        set({
          enemies: updatedEnemies,
          projectiles: state.projectiles.filter((p) => p.id !== projectileId),
        })
      },

      damagePlayer: () => {
        const state = get()
        if (state.player.isInvulnerable || selectHasShield(state)) {
          if (selectHasShield(state)) {
            set({
              player: {
                ...state.player,
                activePowerUps: state.player.activePowerUps.filter((p) => p.type !== 'shield'),
              },
            })
          }
          return
        }

        const newLives = state.player.lives - 1

        if (newLives <= 0) {
          get().endGame()
          return
        }

        set({
          player: {
            ...state.player,
            lives: newLives,
            isInvulnerable: true,
          },
          combo: 0,
        })

        setTimeout(() => {
          set((s) => ({
            player: { ...s.player, isInvulnerable: false },
          }))
        }, 2000)
      },

      collectPowerUp: (powerUpId) => {
        const state = get()
        const powerUp = state.powerUps.find((p) => p.id === powerUpId)

        if (!powerUp) return

        set({
          player: {
            ...state.player,
            activePowerUps: [
              ...state.player.activePowerUps,
              { type: powerUp.type, expiresAt: Date.now() + powerUp.duration },
            ],
          },
          powerUps: state.powerUps.filter((p) => p.id !== powerUpId),
        })
      },

      addScore: (points) => {
        const multiplier = selectComboMultiplier(get())
        set((s) => ({ score: s.score + points * multiplier }))
      },

      incrementCombo: () =>
        set((s) => ({
          combo: s.combo + 1,
          maxCombo: Math.max(s.maxCombo, s.combo + 1),
        })),

      resetCombo: () => set({ combo: 0 }),

      submitHighScore: (name) => {
        const { score, wave, highScores } = get()
        const newEntry: HighScoreEntry = {
          name,
          score,
          wave,
          date: new Date().toISOString(),
        }

        const updatedScores = [...highScores, newEntry].sort((a, b) => b.score - a.score).slice(0, 10)

        set({ highScores: updatedScores })
      },

      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),

      toggleCrtEffects: () => set((s) => ({ crtEffectsEnabled: !s.crtEffectsEnabled })),

      setDifficulty: (difficulty) => set({ difficulty }),
    }),
    {
      name: 'pixel-invaders-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        highScores: state.highScores,
        totalGamesPlayed: state.totalGamesPlayed,
        totalEnemiesDefeated: state.totalEnemiesDefeated,
        bestWave: state.bestWave,
        soundEnabled: state.soundEnabled,
        crtEffectsEnabled: state.crtEffectsEnabled,
        difficulty: state.difficulty,
      }),
    }
  )
)
