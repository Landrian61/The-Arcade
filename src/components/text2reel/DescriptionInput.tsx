'use client'

import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'
import { useText2ReelStore } from '@/store/useText2ReelStore'

function FieldInfo({ field }: { field: any }) {
    return (
        <>
            {field.state.meta.touchedErrors ? (
                <em className="text-red-500 text-sm absolute -bottom-6 left-0">{field.state.meta.touchedErrors}</em>
            ) : null}
        </>
    )
}

interface DescriptionInputProps {
    onSubmit: (data: { description: string }) => void
}

export default function DescriptionInput({ onSubmit }: DescriptionInputProps) {
    const { isLoading } = useText2ReelStore()

    const form = useForm({
        defaultValues: {
            description: '',
        },
        onSubmit: async ({ value }) => {
            onSubmit(value)
        },
    })

    return (
        <div className="w-full">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <form.Field
                    name="description"
                    validators={{
                        onChange: ({ value }) =>
                            !value ? 'A description is required' : undefined,
                    }}
                >
                    {(field) => (
                        <div className="relative">
                            <textarea
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="Describe your video idea... (e.g., 'A futuristic tech intro with neon colors')"
                                className="w-full h-32 bg-[#0f0518] text-white p-4 rounded-xl border border-white/20 focus:border-[#f77f00] focus:ring-1 focus:ring-[#f77f00] outline-none transition-all placeholder:text-gray-600 resize-none font-sans text-lg"
                                disabled={isLoading}
                            />
                            <FieldInfo field={field} />

                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="text-xs text-gray-500 uppercase tracking-wider font-bold py-1">Try:</span>
                                {[
                                    "A futuristic tech intro with neon colors",
                                    "A calm nature scene with forests and rain",
                                    "A high-energy gym workout intro",
                                    "A spooky halloween intro with pumpkins"
                                ].map((prompt) => (
                                    <button
                                        key={prompt}
                                        type="button"
                                        onClick={() => field.handleChange(prompt)}
                                        className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-3 py-1 rounded-full transition-colors cursor-pointer"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </form.Field>
                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                    >
                        {isLoading ? 'Generating Scenes...' : 'Generate Scenes'}
                    </button>
                </div>
            </form>
        </div>
    )
}
