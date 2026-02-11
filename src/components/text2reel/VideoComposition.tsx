'use client'

import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion'
import type { Scene } from '@/store/useText2ReelStore'

interface VideoCompositionProps {
    scenes: Scene[]
}

export const VideoComposition = ({ scenes }: VideoCompositionProps) => {
    const { fps } = useVideoConfig()

    let accumulatedFrames = 0

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            {scenes.map((scene, index) => {
                const durationInFrames = Math.floor(scene.duration * fps)
                const fromFrame = accumulatedFrames
                accumulatedFrames += durationInFrames

                return (
                    <Sequence key={index} from={fromFrame} durationInFrames={durationInFrames}>
                        <AbsoluteFill
                            style={{
                                backgroundColor: scene.color,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '40px',
                            }}
                        >
                            <h1
                                style={{
                                    color: 'white',
                                    fontFamily: 'var(--font-outfit), sans-serif',
                                    fontWeight: '900',
                                    fontSize: '80px',
                                    textAlign: 'center',
                                    textShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(247,154,122,0.3)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                }}
                            >
                                {scene.text}
                            </h1>
                        </AbsoluteFill>
                    </Sequence>
                )
            })}
        </AbsoluteFill>
    )
}
