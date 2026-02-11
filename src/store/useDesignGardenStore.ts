import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface GardenComponent {
    id: string
    name: string
    type: 'button' | 'card' | 'badge' | 'switch' | 'hero' | 'navbar' | 'modal'
    versions: {
        id: string
        name: string
        variant: 'contained' | 'outlined' | 'text' | 'soft' | 'solid' | 'default' | 'dark' | 'parallax'
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
        id: 'hero-01',
        name: 'Zoom Scroll Hero',
        type: 'hero',
        isPublished: true,
        position: { x: 50, y: 50 }, // Center
        versions: [
            { id: 'v1.0', name: 'Dark Mode', variant: 'dark' }, // Default
            { id: 'v1.1', name: 'Light Mode', variant: 'default' },
        ]
    },
    {
        id: 'navbar-01',
        name: 'Scroll Navbar',
        type: 'navbar',
        isPublished: true,
        position: { x: 30, y: 70 }, // Bottom left area
        versions: [
            { id: 'v1.0', name: 'Light Mode', variant: 'default' }, // Default
            { id: 'v1.1', name: 'Dark Mode', variant: 'dark' },
        ]
    },
    {
        id: 'modal-01',
        name: 'Auth Modal',
        type: 'modal',
        isPublished: true,
        position: { x: 70, y: 30 }, // Top right area
        versions: [
            { id: 'v1.0', name: 'Light Mode', variant: 'default' },
            { id: 'v1.1', name: 'Dark Mode', variant: 'dark' },
        ]
    }
]

// Create store with persistence - saves to localStorage automatically
export const useDesignGardenStore = create<DesignGardenStore>()(
    persist(
        (set) => ({
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

            // Toggle publish status - this will now persist across page reloads
            togglePublish: (id) => set((state) => ({
                components: state.components.map(c =>
                    c.id === id ? { ...c, isPublished: !c.isPublished } : c
                )
            })),

            togglePreview: (isOpen) => set({ isPreviewOpen: isOpen }),
        }),
        {
            name: 'design-garden-storage-v4', // bump version to load new modal component updates
            // Only persist components array (publish status, etc)
            partialize: (state) => ({ components: state.components })
        }
    )
)
