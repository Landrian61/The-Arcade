'use client'

import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import DescriptionInput from '@/components/text2reel/DescriptionInput'
import SceneTable from '@/components/text2reel/SceneTable'
import VideoPreview from '@/components/text2reel/VideoPreview'
import { useText2ReelStore } from '@/store/useText2ReelStore'

const queryClient = new QueryClient()

function Text2ReelContent() {
    const { setScenes, setIsLoading } = useText2ReelStore()

    const mutation = useMutation({
        mutationFn: async (description: string) => {
            const res = await fetch('/playground/shakiran/text2reel/api/generate-scenes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: description }),
            })
            if (!res.ok) throw new Error('Failed to generate scenes')
            return res.json()
        },
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: (data) => {
            setScenes(data.scenes)
            setIsLoading(false)
        },
        onError: () => {
            setIsLoading(false)
            alert('Failed to generate scenes. Please try again.')
        }
    })

    return (
        <div className="min-h-screen bg-[#0f0518] text-[#eae2b7] font-sans p-8">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-extrabold mb-4 text-[#f77f00] font-[family-name:var(--font-permanent-marker)]">
                    Text2Reel
                </h1>
                <p className="text-xl text-gray-400">
                    Turn your stories into social media videos instantly.
                </p>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Inputs & Controls */}
                <div className="space-y-8">
                    <section className="bg-[#1e1b2e] p-6 rounded-2xl border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-[#fcbf49]">1. Describe Your Vision</h2>
                        <DescriptionInput onSubmit={(data) => mutation.mutate(data.description)} />
                    </section>

                    <section className="bg-[#1e1b2e] p-6 rounded-2xl border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-[#fcbf49]">2. Edit Scenes</h2>
                        <SceneTable />
                    </section>
                </div>

                {/* Right Column: Preview */}
                <div className="lg:sticky lg:top-8 h-fit">
                    <section className="bg-[#1e1b2e] p-6 rounded-2xl border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-[#fcbf49]">3. Preview Result</h2>
                        <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden border border-gray-800 shadow-inner">
                            <VideoPreview />
                        </div>
                        {/* Download button could go here in v2 */}
                    </section>
                </div>
            </main>
        </div>
    )
}

export default function Text2ReelPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <Text2ReelContent />
        </QueryClientProvider>
    )
}
