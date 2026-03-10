// app/components/map/BottomSheet.tsx
'use client';

import { useRestaurantStore } from "@/store/useRestaurantStore";

export default function BottomSheet() {
    const selectedRestaurant = useRestaurantStore((state) => state.selectedRestaurant);
    const clearRestaurant = useRestaurantStore((state) => state.clearRestaurant);

    if (!selectedRestaurant) return null;

    return (
        <div className="absolute bottom-20 left-4 right-4 bg-white z-40 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl border border-gray-100">
            
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{selectedRestaurant.name}</h3>
                    <p className="text-sm text-gray-500">
                        {/* 수정 필요 */}
                        리뷰 12개 · ⭐ 4.5
                    </p>
                </div>
                <button 
                    onClick={clearRestaurant}
                    className="p-2 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                    ✕
                </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-3 rounded-xl font-semibold text-sm hover:bg-blue-100 transition-colors">
                    상세 보기
                </button>
            </div>
        </div>
    )
}