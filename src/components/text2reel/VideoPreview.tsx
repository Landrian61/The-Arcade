'use client'

import { Player } from '@remotion/player'
import { VideoComposition } from './VideoComposition'
import { useText2ReelStore } from '@/store/useText2ReelStore'

export default function VideoPreview() {
    const { scenes } = useText2ReelStore()

    // Calculate total duration
    const totalDurationInSeconds = scenes.reduce((acc, scene) => acc + scene.duration, 0)
    // Default to 1 second minimum to avoid division by zero or errors if empty
    const durationInFrames = Math.max(1, Math.ceil(totalDurationInSeconds * 30))

    return (
        <div className="w-full h-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
            {scenes.length > 0 ? (
                <Player
                    component={VideoComposition}
                    inputProps={{ scenes }}
                    durationInFrames={durationInFrames}
                    fps={30}
                    compositionWidth={1080}
                    compositionHeight={1920}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                    controls
                    autoPlay={false}
                    loop
                />
            ) : (
                <div className="text-gray-500 font-mono text-center p-8">
                    <p>Waiting for scenes...</p>
                </div>
            )}
        </div>
    )
}
