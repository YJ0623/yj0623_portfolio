'use client';

import { useRestaurantStore } from "@/store/useRestaurantStore";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BottomSheet() {
    const selectedRestaurant = useRestaurantStore((state) => state.selectedRestaurant);
    const clearRestaurant = useRestaurantStore((state) => state.clearRestaurant);

    const [reviewCount, setReviewCount] = useState(0);
    const [rating, setRating] = useState(0.0);
    const [category, setCategory] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedRestaurant) return;

        const fetchStoreStats = async () => {
            const { data, error } = await supabase
                .from('reviews')
                .select('rating, image_urls, category')
                .eq('restaurant_id', selectedRestaurant.id)
                .eq('status', 'APPROVED');

            if (data && data.length > 0) {
                setReviewCount(data.length);

                const totalRating = data.reduce((acc, curr) => acc + curr.rating, 0);
                setRating(Number((totalRating / data.length).toFixed(1)));

                const reviewWithImage = data.find(r => r.image_urls && r.image_urls.length > 0);
                setImageUrl(reviewWithImage ? reviewWithImage.image_urls[0] : null);

                const reviewWithCategory = data.find(r => r.category);
                setCategory(reviewWithCategory ? reviewWithCategory.category : null);
            } else {
                setReviewCount(0);
                setRating(0.0);
                setImageUrl(null);
                setCategory(null);
            }
        };

        fetchStoreStats();
    }, [selectedRestaurant]);

    if (!selectedRestaurant) return null;

    return (
        <div className="absolute bottom-20 left-4 right-4 bg-white z-40 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl border border-gray-100">
            <button
                onClick={clearRestaurant}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
            >
                ✕
            </button>
            
            <div className="flex gap-4 mb-4">
                <div className="flex w-20 h-20 bg-gray-100 rounded-xl shrink-0 overflow-hidden items-center justify-center">
                    {imageUrl ? (
                        <img src={imageUrl} alt="가게 사진" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-2xl">🍽️</span>
                    )}
                </div>

                <div className="flex flex-col justify-center flex-1 pr-6">
                    <h3 className="flex flex-row items-end text-[18px] font-bold text-gray-900 line-clamp-1">
                        {selectedRestaurant.name}
                        {category && (
                            <span className="text-[11px] text-gray-400 px-1 py-0.5 rounded-md whitespace-nowrap shrink-0">
                                {category}
                            </span>
                        )}
                    </h3>
                    
                    
                    {reviewCount > 0 ? (
                        <p className="text-sm text-gray-600 mt-1 font-medium">
                            ⭐ {rating.toFixed(1)} <span className="text-gray-400 font-normal">({reviewCount}개의 리뷰)</span>
                        </p>
                    ) : (
                        <p className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-md flex items-center justify-start mt-2 font-medium break-keep">
                            아직 리뷰가 없는 가게에요.<br/> 처음으로 리뷰를 남겨주세요!
                        </p>
                    )}
                </div>
            </div>
            
            <div className="border-t border-gray-100 pt-3">
                {reviewCount > 0 ? (
                    <Link 
                        href={`/side-projects/hongik-map/store/${encodeURIComponent(selectedRestaurant.id)}`}
                        className="block w-full text-center bg-blue-50 text-blue-600 py-3 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors"
                    >
                        리뷰 전체보기
                    </Link>
                ) : (
                    <Link 
                        href="/side-projects/hongik-map/write"
                        className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
                    >
                        ✍️ 첫 리뷰 쓰러가기
                    </Link>
                )}
            </div>
        </div>
    )
}