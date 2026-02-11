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
                                    fontFamily: 'sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '60px',
                                    textAlign: 'center',
                                    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
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
