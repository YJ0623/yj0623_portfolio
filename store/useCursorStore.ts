import { create } from "zustand";

type CursorVariant = 'default' | 'hover' | 'clicked';

interface CursorState {
    variant: CursorVariant;
    setVariant: (variant: CursorVariant) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
    variant: 'default',
    setVariant: (variant) => set({ variant }),
}));