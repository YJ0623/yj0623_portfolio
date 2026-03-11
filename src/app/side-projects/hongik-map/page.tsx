/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HongikMapHome() {
    const [recentReviews, setRecentReviews] = useState<any[]>([]);
    const [topReviews, setTopReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const { data: recentData, error: recentError } = await supabase
                    .from('reviews')
                    .select('*')
                    .eq('status', 'APPROVED')
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (recentError) throw recentError;

                const { data: topData, error: topError } = await supabase
                    .from('reviews')
                    .select('*')
                    .eq('status', 'APPROVED')
                    .order('rating', { ascending: false })
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (topError) throw topError;

                setRecentReviews(recentData || []);
                setTopReviews(topData || []);
            } catch (error) {
                console.error('홈 데이터 불러오기 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            <section className="bg-blue-500 px-4 pt-6 pb-6 shadow-md rounded-b-3xl">
                <h1 className="font-bold text-white text-lg mb-4 ml-1">
                    홍대생들의 찐 맛집을 공유해주세요!
                </h1>

                <Link
                    href="/side-projects/hongik-map/search"
                    className="flex items-center w-full bg-white px-4 py-3.5 text-gray-500 rounded-2xl text-sm font-medium shadow-sm hover:bg-gray-50 transition"
                >
                    <span className="text-lg mr-2">🔍</span>
                    <span className="text-black font-semibold">
                        어떤 가게를 찾으세요?
                    </span>
                </Link>
            </section>

            {/* 리뷰에 달린 좋아요 수로 바꿔야 합니다. */}
            <section className="px-4 mt-8">
                <h2 className="text-lg font-bold mb-4">이번 주 리뷰 TOP 3</h2>

                {isLoading ? (
                    <div className="text-center py-10 text-gray-400">데이터를 불러오는 중...</div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {topReviews.map((store) => (
                            <div
                                key={store.id}
                                className="bg-white p-4 rounded-lg shadow-sm"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold">{store.restaurant_name}</h3>
                                    <span className="text-yellow-500 text-sm tracking-widest">
                                        {'★'.repeat(store.rating)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="px-4 mt-8">
                <h2 className="text-lg font-bold mb-4">
                    가장 최근 올라온 리뷰를 둘러보세요
                </h2>
                
                {isLoading ? (
                    <div className="text-center py-10 text-gray-400">데이터를 불러오는 중...</div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {recentReviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white p-4 rounded-lg shadow-sm"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold">{review.restaurant_name}</h3>
                                    <span className="text-yellow-500 text-sm tracking-widest">
                                        {'★'.repeat(review.rating)}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    {review.content}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}