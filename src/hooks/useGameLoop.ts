import { useEffect, useRef, useCallback } from 'react'

export function useGameLoop(callback: (deltaTime: number) => void, isRunning: boolean = true) {
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!isRunning) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
        requestRef.current = undefined
      }
      previousTimeRef.current = undefined
      return
    }

    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = (time - previousTimeRef.current) / 16.67
        callbackRef.current(deltaTime)
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isRunning])
}

export function useKeyboardInput() {
  const keysPressed = useRef<Set<string>>(new Set())

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase())
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase())
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const isKeyPressed = useCallback((key: string) => {
    return keysPressed.current.has(key.toLowerCase())
  }, [])

  return { isKeyPressed, keysPressed: keysPressed.current }
}
