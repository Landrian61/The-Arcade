'use client'

import { useEffect, useCallback, useRef } from 'react'
import { Box } from '@mui/material'
import { usePixelInvadersStore, selectActivePowerUps } from '@/store/usePixelInvadersStore'
import { useGameLoop, useKeyboardInput } from '@/hooks/useGameLoop'
import Player from './Player'
import Enemy from './Enemy'
import Projectile from './Projectile'
import PowerUp from './PowerUp'
import HUD from './HUD'

interface GameCanvasProps {
  onPause?: () => void
}

export default function GameCanvas({ onPause }: GameCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)

  const gameState = usePixelInvadersStore((s) => s.gameState)
  const player = usePixelInvadersStore((s) => s.player)
  const enemies = usePixelInvadersStore((s) => s.enemies)
  const projectiles = usePixelInvadersStore((s) => s.projectiles)
  const powerUps = usePixelInvadersStore((s) => s.powerUps)
  const score = usePixelInvadersStore((s) => s.score)
  const wave = usePixelInvadersStore((s) => s.wave)
  const combo = usePixelInvadersStore((s) => s.combo)

  const movePlayer = usePixelInvadersStore((s) => s.movePlayer)
  const fireProjectile = usePixelInvadersStore((s) => s.fireProjectile)
  const tick = usePixelInvadersStore((s) => s.tick)
  const handleCollision = usePixelInvadersStore((s) => s.handleCollision)
  const collectPowerUp = usePixelInvadersStore((s) => s.collectPowerUp)
  const pauseGame = usePixelInvadersStore((s) => s.pauseGame)

  const { isKeyPressed } = useKeyboardInput()
  const activePowerUps = selectActivePowerUps(usePixelInvadersStore.getState())

  const isColliding = useCallback(
    (
      a: { position: { x: number; y: number } },
      b: { position: { x: number; y: number }; width: number; height: number }
    ) => {
      return Math.abs(a.position.x - b.position.x) < b.width / 2 + 1 && Math.abs(a.position.y - b.position.y) < b.height / 2 + 2
    },
    []
  )

  const isCollidingWithPlayer = useCallback(
    (item: { position: { x: number; y: number } }, playerPos: { position: { x: number; y: number } }) => {
      return Math.abs(item.position.x - playerPos.position.x) < 5 && Math.abs(item.position.y - playerPos.position.y) < 5
    },
    []
  )

  const checkCollisions = useCallback(() => {
    projectiles
      .filter((p) => p.isPlayer)
      .forEach((projectile) => {
        enemies.forEach((enemy) => {
          if (isColliding(projectile, enemy)) {
            handleCollision(projectile.id, enemy.id)
          }
        })
      })

    powerUps.forEach((powerUp) => {
      if (isCollidingWithPlayer(powerUp, player)) {
        collectPowerUp(powerUp.id)
      }
    })
  }, [projectiles, enemies, powerUps, player, handleCollision, collectPowerUp, isColliding, isCollidingWithPlayer])

  const gameLoopCallback = useCallback(
    (deltaTime: number) => {
      if (gameState !== 'playing') return

      if (isKeyPressed('arrowleft') || isKeyPressed('a')) {
        movePlayer('left')
      }
      if (isKeyPressed('arrowright') || isKeyPressed('d')) {
        movePlayer('right')
      }
      if (isKeyPressed(' ') || isKeyPressed('arrowup') || isKeyPressed('w')) {
        fireProjectile()
      }

      tick(deltaTime)
      checkCollisions()
    },
    [gameState, isKeyPressed, movePlayer, fireProjectile, tick, checkCollisions]
  )

  useGameLoop(gameLoopCallback, gameState === 'playing')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return

      if (e.key === 'Escape' || e.key === 'p') {
        e.preventDefault()
        pauseGame()
        onPause?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, pauseGame, onPause])

  return (
    <Box
      ref={canvasRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '400px',
        background: `
          linear-gradient(180deg,
            #000510 0%,
            #001020 30%,
            #001530 60%,
            #002040 100%
          )
        `,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(1px 1px at 20px 30px, white, transparent),
            radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 90px 40px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 160px 120px, white, transparent),
            radial-gradient(1px 1px at 200px 50px, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 220px 150px, white, transparent),
            radial-gradient(1px 1px at 260px 90px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 300px 130px, white, transparent),
            radial-gradient(1px 1px at 340px 60px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 380px 180px, white, transparent),
            radial-gradient(1px 1px at 420px 100px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 460px 140px, white, transparent),
            radial-gradient(1px 1px at 500px 70px, rgba(255,255,255,0.5), transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '500px 200px',
          opacity: 0.6,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        },
      }}
    >
      <HUD score={score} wave={wave} lives={player.lives} combo={combo} activePowerUps={activePowerUps} />
      <Player position={player.position} isInvulnerable={player.isInvulnerable} />
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} {...enemy} />
      ))}
      {projectiles.map((projectile) => (
        <Projectile key={projectile.id} {...projectile} />
      ))}
      {powerUps.map((powerUp) => (
        <PowerUp key={powerUp.id} {...powerUp} />
      ))}
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.3), transparent)',
          boxShadow: '0 0 10px rgba(255, 0, 0, 0.2)',
        }}
      />
    </Box>
  )
}
