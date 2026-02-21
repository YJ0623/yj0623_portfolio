import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface VisionItem {
    id: string;
    url: string;
    title: string;
    x: number;
    y: number;
    rotation: number;
    zIndex: number;
    width: number;
}

interface VisionStore {
    items: VisionItem[];

    addItem: (data: Omit<VisionItem, 'id' | 'x' | 'y' | 'rotation' | 'zIndex' | 'width'>) => void;
    removeItem: (id: string) => void;
    updatePosition: (id: string, x: number, y: number) => void;
    updateRotation: (id: string, rotation: number) => void;
    updateSize: (id: string, width: number) => void;
    bringToFront: (id: string) => void;
}

let nextZindex = 1;

export const useVisionStore = create<VisionStore>()(
    persist(
        (set) => ({
        items: [],

        addItem: (data) => set((state) => {
            const isClient = typeof window !== 'undefined';
            const centerX = isClient ? window.innerWidth / 2 - 100 : 200;
            const centerY = isClient ? window.innerHeight / 2 - 100 : 200;

            return {
                items: [
                    ...state.items,
                    {
                        ...data,
                        id: crypto.randomUUID(),
                        x: centerX + (Math.random() * 50 - 25),
                        y: centerY + (Math.random() * 50 - 25),
                        rotation: Math.random() * 20 - 10,
                        zIndex: nextZindex++,
                        width: 200,
                    }
                ],
            };
        }),

        removeItem: (id) => set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        })),

        updatePosition: (id, x, y) => set((state) => ({
            items: state.items.map((item) => item.id === id ? { ...item, x, y} : item)
        })),

        updateRotation: (id, rotation) => set((state) => ({
            items: state.items.map((item) => item.id === id ? { ...item, rotation } : item)
        })),

        updateSize: (id, width) => set((state) => ({
            items: state.items.map((item) => item.id === id ? { ...item, width } : item),
        })),

        bringToFront: (id) => set((state) => {
            nextZindex++;
            return {
                items: state.items.map((item) => item.id === id ? { ...item, zIndex: nextZindex }: item),
            }
        }),
    }),
    {
        name: 'vision-board-storage',
    }
)
);