// app/components/map/BottomSheet.tsx
'use client';

import { useRestaurantStore } from "@/store/useRestaurantStore";
import Image from "next/image";
import Link from "next/link";

export default function BottomSheet() {
    const selectedRestaurant = useRestaurantStore((state) => state.selectedRestaurant);
    const clearRestaurant = useRestaurantStore((state) => state.clearRestaurant);

    if (!selectedRestaurant) return null;

    const reviewCount = 0; 
    const rating = 0.0;
    const imageUrl = null;

    return (
        <div className="absolute bottom-20 left-4 right-4 bg-white z-40 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl border border-gray-100">
            <button 
                onClick={clearRestaurant}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
            >
                ✕
            </button>
            
            <div className="flex gap-4 mb-4">
                {/* 썸네일 영역 */}
                <div className="flex w-20 h-20 bg-gray-100 rounded-xl shrink-0 overflow-hidden items-center justify-center">
                    {imageUrl ? (
                        <Image src={imageUrl} alt="가게 사진" className="object-cover" width={80} height={80}/>
                    ) : (
                        <span className="text-2xl">🍽️</span>
                    )}
                </div>

                <div className="flex flex-col justify-center flex-1 pr-6">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                        {selectedRestaurant.name}
                    </h3>
                    
                    {reviewCount > 0 ? (
                        <p className="text-sm text-gray-600 mt-1 font-medium">
                            ⭐ {rating.toFixed(1)} <span className="text-gray-400 font-normal">({reviewCount}개의 리뷰)</span>
                        </p>
                    ) : (
                        <p className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-md flex items-center justify-start mt-2 font-medium">
                            아직 리뷰가 없는 가게에요.<br/> 처음으로 리뷰를 남겨주세요!
                        </p>
                    )}
                </div>
            </div>
            
            <div className="border-t border-gray-100 pt-3">
                <Link 
                    href={`/side-projects/hongik-map/store/${encodeURIComponent(selectedRestaurant.id)}`}
                    className="block w-full text-center bg-blue-50 text-blue-600 py-3 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors"
                >
                    가게 상세 및 리뷰 전체보기
                </Link>
            </div>
        </div>
    )
}