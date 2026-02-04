import { create } from 'zustand'

export interface GardenComponent {
    id: string
    name: string
    type: 'button' | 'card' | 'badge' | 'switch'
    versions: {
        id: string
        name: string
        variant: 'contained' | 'outlined' | 'text' | 'soft' | 'solid'
        color?: string
    }[]
    isPublished: boolean
    position: { x: number; y: number }
}

interface DesignGardenStore {
    components: GardenComponent[]
    activeComponentId: string | null
    activeVersionId: string | null
    isPreviewOpen: boolean

    // Actions
    selectComponent: (id: string | null) => void
    setVersion: (versionId: string) => void
    togglePublish: (id: string) => void
    togglePreview: (isOpen: boolean) => void
}

const INITIAL_COMPONENTS: GardenComponent[] = [
    {
        id: 'btn-01',
        name: 'Action Button',
        type: 'button',
        isPublished: true,
        position: { x: 20, y: 50 },
        versions: [
            { id: 'v1.0', name: 'v1.0 (Solid)', variant: 'contained' },
            { id: 'v1.1', name: 'v1.1 (Soft)', variant: 'soft' },
            { id: 'v2.0', name: 'v2.0 (Glass)', variant: 'outlined' },
        ]
    },
    {
        id: 'badge-01',
        name: 'Status Badge',
        type: 'badge',
        isPublished: false,
        position: { x: 50, y: 45 },
        versions: [
            { id: 'v1', name: 'Classic', variant: 'contained' },
            { id: 'v2', name: 'Dot Only', variant: 'outlined' },
        ]
    },
    {
        id: 'card-01',
        name: 'Info Card',
        type: 'card',
        isPublished: true,
        position: { x: 80, y: 50 },
        versions: [
            { id: 'v1', name: 'Elevated', variant: 'contained' },
            { id: 'v2', name: 'Flat', variant: 'outlined' },
        ]
    },
]

export const useDesignGardenStore = create<DesignGardenStore>((set) => ({
    components: INITIAL_COMPONENTS,
    activeComponentId: null,
    activeVersionId: null,
    isPreviewOpen: false,

    selectComponent: (id) => set((state) => {
        // When selecting a new component, select its first version by default
        if (id && id !== state.activeComponentId) {
            const comp = state.components.find(c => c.id === id)
            return {
                activeComponentId: id,
                activeVersionId: comp?.versions[0].id || null,
                isPreviewOpen: true
            }
        }
        // If deselecting
        if (id === null) {
            return { activeComponentId: null, isPreviewOpen: false }
        }
        return {}
    }),

    setVersion: (versionId) => set({ activeVersionId: versionId }),

    togglePublish: (id) => set((state) => ({
        components: state.components.map(c =>
            c.id === id ? { ...c, isPublished: !c.isPublished } : c
        )
    })),

    togglePreview: (isOpen) => set({ isPreviewOpen: isOpen }),
}))
