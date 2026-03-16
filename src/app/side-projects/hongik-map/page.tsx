/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRestaurantStore } from '@/store/useRestaurantStore';
import { supabase } from '@/utils/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HongikMapHome() {
    const [recentReviews, setRecentReviews] = useState<any[]>([]);
    const [topReviews, setTopReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                // 최근 리뷰 3개
                const { data: recentData, error: recentError } = await supabase
                    .from('reviews')
                    .select('*')
                    .eq('status', 'APPROVED')
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (recentError) throw recentError;

                // 좋아요 많은순
                const { data: allApprovedData, error: topError } =
                    await supabase
                        .from('reviews')
                        .select('*')
                        .eq('status', 'APPROVED');

                if (topError) throw topError;

                const sortedByLikes = (allApprovedData || [])
                    .sort((a, b) => {
                        const aLikes = a.liked_users ? a.liked_users.length : 0;
                        const bLikes = b.liked_users ? b.liked_users.length : 0;

                        // 좋아요 수가 같으면 최신순으로 정렬
                        if (bLikes === aLikes) {
                            return (
                                new Date(b.created_at).getTime() -
                                new Date(a.created_at).getTime()
                            );
                        }
                        return bLikes - aLikes;
                    })
                    .slice(0, 3);

                setRecentReviews(recentData || []);
                setTopReviews(sortedByLikes);
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
            <section className="bg-[#5478FF] px-4 pt-2 pb-6 shadow-md rounded-b-3xl">
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

            <section className="px-4 mt-8">
                <h2 className="text-lg font-bold mb-4">이번 주 리뷰 TOP 3</h2>

                {isLoading ? (
                    <div className="text-center py-10 text-gray-400">
                        데이터를 불러오는 중...
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {topReviews.map((store) => {
                            const likeCount = store.liked_users
                                ? store.liked_users.length
                                : 0;

                            return (
                                <div
                                    key={store.id}
                                    className="bg-white p-4 rounded-lg shadow-sm flex gap-4"
                                >
                                    {/* 썸네일 영역 추가 */}
                                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg shrink-0 overflow-hidden flex items-center justify-center">
                                        {store.image_urls &&
                                        store.image_urls.length > 0 ? (
                                            <Image
                                                src={store.image_urls[0]}
                                                alt="가게 사진"
                                                sizes="64px"
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span className="text-xl">🍽️</span>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-center flex-1">
                                        <Link
                                            href={`/side-projects/hongik-map/store/${encodeURIComponent(store.restaurant_id)}`}
                                        >
                                            <h3 className="font-bold text-gray-900 line-clamp-1">
                                                {store.restaurant_name}
                                            </h3>
                                            {/* 별점 대신 좋아요 수 표시 */}
                                            <p className="text-sm text-gray-500 mt-1 font-medium">
                                                {likeCount}명이 이 리뷰를
                                                좋아했어요.
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            <section className="px-4 mt-8">
                <h2 className="text-lg font-bold mb-4">
                    가장 최근 올라온 리뷰를 둘러보세요!
                </h2>

                {isLoading ? (
                    <div className="text-center py-10 text-gray-400">
                        데이터를 불러오는 중...
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {recentReviews.map((review) => {
                            return (
                                <div
                                    key={review.id}
                                    className="bg-white p-4 rounded-lg shadow-sm flex gap-4"
                                >
                                    {/* 썸네일 영역 추가 */}
                                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg shrink-0 overflow-hidden flex items-center justify-center">
                                        {review.image_urls &&
                                        review.image_urls.length > 0 ? (
                                            <Image
                                                src={review.image_urls[0]}
                                                alt="리뷰 사진"
                                                fill
                                                sizes="64px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span className="text-xl">🍽️</span>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-center flex-1">
                                        <Link
                                            href={`/side-projects/hongik-map/store/${encodeURIComponent(review.restaurant_id)}`}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-gray-900 line-clamp-1">
                                                    {review.restaurant_name}
                                                </h3>
                                            </div>
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {review.content}
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}
