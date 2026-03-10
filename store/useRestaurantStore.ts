import { create } from "zustand";

export interface Restaurant {
    id: string;
    name: string;
    lat: number;
    lng: number;
}

interface RestaurantState {
    selectedRestaurant: Restaurant | null;
    setSelectedRestaurant: (restaurant: Restaurant | null) => void;
    clearRestaurant: () => void;
}

export const useRestaurantStore = create<RestaurantState>((set) => ({
    selectedRestaurant: null,
    setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
    clearRestaurant: () => set({ selectedRestaurant: null }),
}));