'use client'

import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import Image from 'next/image'
import DescriptionInput from '@/components/text2reel/DescriptionInput'
import SceneTable from '@/components/text2reel/SceneTable'
import VideoPreview from '@/components/text2reel/VideoPreview'
import { useText2ReelStore } from '@/store/useText2ReelStore'

const queryClient = new QueryClient()

import Link from 'next/link'
import { ArrowBack } from '@mui/icons-material'

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
        <div className="min-h-screen lg:h-screen relative text-[#FFD9CC] font-sans overflow-y-auto lg:overflow-hidden flex flex-col pb-8 lg:pb-0">
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

            {/* Navigation & Header */}
            <div className="relative z-20 px-8 pt-4 flex items-center justify-between">
                <Link
                    href="/playground/shakiran"
                    className="flex items-center gap-2 text-[#F79A7A] hover:text-white transition-colors group"
                >
                    <ArrowBack className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold text-sm">Back to Projects</span>
                </Link>

                <header className="flex flex-col items-center text-center absolute left-1/2 -translate-x-1/2">
                    <div className="relative w-[280px] h-16 hover:scale-[1.02] transition-transform duration-700">
                        <Image
                            src="/kiran/logo.png"
                            alt="Text2Reel Logo"
                            fill
                            className="object-contain drop-shadow-[0_8px_25px_rgba(247,154,122,0.4)]"
                            priority
                        />
                    </div>
                </header>

                <div className="w-32" /> {/* Spacer to center the logo */}
            </div>

            <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 py-4 overflow-hidden mt-4">
                {/* Left Column: Inputs & Controls */}
                <div className="flex flex-col space-y-4 overflow-hidden">
                    <section className="bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-[#F79A7A]/20 shadow-2xl flex-shrink-0">
                        <h2 className="text-xl font-bold mb-4 text-[#FFD9CC] flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-[#F79A7A] text-black flex items-center justify-center text-xs">1</span>
                            Describe Your Vision
                        </h2>
                        <DescriptionInput onSubmit={(data) => mutation.mutate(data.description)} />
                    </section>

                    <section className="bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-[#F79A7A]/20 shadow-2xl flex-1 overflow-hidden flex flex-col">
                        <h2 className="text-xl font-bold mb-4 text-[#FFD9CC] flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-[#F79A7A] text-black flex items-center justify-center text-xs">2</span>
                            Edit Scenes
                        </h2>
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <SceneTable />
                        </div>
                    </section>
                </div>

                {/* Right Column: Preview */}
                <div className="min-h-[500px] lg:h-full lg:overflow-hidden">
                    <section className="bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-[#F79A7A]/20 shadow-2xl h-full flex flex-col">
                        <h2 className="text-xl font-bold mb-4 text-[#FFD9CC] flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-[#F79A7A] text-black flex items-center justify-center text-xs">3</span>
                            Preview Result
                        </h2>
                        <div className="flex-1 bg-black rounded-2xl overflow-hidden border border-[#F79A7A]/30 shadow-inner group relative min-h-[400px]">
                            <VideoPreview />
                            <div className="absolute inset-0 border-[1px] border-[#F79A7A]/10 pointer-events-none rounded-2xl" />
                        </div>
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
