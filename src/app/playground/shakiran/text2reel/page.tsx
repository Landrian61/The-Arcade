'use client'

import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import Image from 'next/image'
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
        <div className="min-h-screen relative text-[#FFD9CC] font-sans overflow-x-hidden">
            {/* Background Image with Overlay */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/kiran/text2reel.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f0518]/90 via-[#0f0518]/70 to-[#0f0518]/95" />
            </div>

            <div className="relative z-10 px-8 pt-8 pb-8">
                <header className="mb-8 flex flex-col items-center text-center">
                    <div className="relative w-full max-w-[600px] h-64 mb-4 hover:scale-[1.02] transition-transform duration-700">
                        <Image
                            src="/kiran/logo.png"
                            alt="Text2Reel Logo"
                            fill
                            className="object-contain drop-shadow-[0_15px_40px_rgba(247,154,122,0.6)]"
                            priority
                        />
                    </div>
                    <p className="text-xl text-[#FFD9CC] max-w-2xl px-6 relative z-10 drop-shadow-md italic">
                        AI-powered social media video generator. Turn your vision into reality with cinematic precision.
                    </p>
                </header>

                <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Inputs & Controls */}
                    <div className="space-y-8">
                        <section className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-[#F79A7A]/20 shadow-2xl">
                            <h2 className="text-2xl font-bold mb-6 text-[#FFD9CC] flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#F79A7A] text-black flex items-center justify-center text-sm">1</span>
                                Describe Your Vision
                            </h2>
                            <DescriptionInput onSubmit={(data) => mutation.mutate(data.description)} />
                        </section>

                        <section className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-[#F79A7A]/20 shadow-2xl">
                            <h2 className="text-2xl font-bold mb-6 text-[#FFD9CC] flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#F79A7A] text-black flex items-center justify-center text-sm">2</span>
                                Edit Scenes
                            </h2>
                            <SceneTable />
                        </section>
                    </div>

                    {/* Right Column: Preview */}
                    <div className="lg:sticky lg:top-8 h-fit">
                        <section className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-[#F79A7A]/20 shadow-2xl">
                            <h2 className="text-2xl font-bold mb-6 text-[#FFD9CC] flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#F79A7A] text-black flex items-center justify-center text-sm">3</span>
                                Preview Result
                            </h2>
                            <div className="aspect-[9/16] bg-black rounded-2xl overflow-hidden border border-[#F79A7A]/30 shadow-inner group relative">
                                <VideoPreview />
                                <div className="absolute inset-0 border-[1px] border-[#F79A7A]/10 pointer-events-none rounded-2xl" />
                            </div>
                        </section>
                    </div>
                </main>
            </div>
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
