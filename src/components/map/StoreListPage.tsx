/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { supabase } from '@/utils/supabase';
import { useEffect, useRef, useState } from 'react';

const PAGE_SIZE = 5;

export default function StoreListPage() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const observerTargetRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!hasMore) return;
            setIsLoading(true);

            const from = page * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            try {
                const { data, error } = await supabase
                    .from('reviews')
                    .select('*')
                    .eq('status', 'APPROVED')
                    .order('created_at', { ascending: false })
                    .order('id', { ascending: false })
                    .range(from, to);

                if (error) throw error;

                if (data) {
                    if (data.length < PAGE_SIZE) {
                        setHasMore(false);
                    }

                    setReviews((prev) => {
                        const newReviews = data.filter(
                            (d) => !prev.some((p) => p.id === d.id)
                        );
                        return [...prev, ...newReviews];
                    });
                }
            } catch (error) {
                console.error('리뷰 불러오기 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, [page]);

    // 스크롤 감지
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // 타겟이 살짝 보이고, 로딩 중이 아니고, 더 부를 게 남았다면 페이지 증가!
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 0.1 }
        );

        if (observerTargetRef.current) {
            observer.observe(observerTargetRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [hasMore, isLoading]);

    return (
        <main className="h-screen overflow-auto bg-gray-50 mt-10 pb-24 p-4">
            <h1 className="text-xl font-bold mb-6">홍익인의 맛집 리스트</h1>

            <div className="flex flex-col gap-4">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                    >
                        <h2 className="font-bold text-lg mb-1">
                            {review.restaurant_name}
                        </h2>
                        <span className="text-yellow-500 tracking-widest block mb-2">
                            {'★'.repeat(review.rating)}
                        </span>
                        <p className="text-gray-600 line-clamp-2">
                            {review.content}
                        </p>
                    </div>
                ))}
            </div>

            {/* 스크롤 감지 구역 */}
            <div
                ref={observerTargetRef}
                className="py-8 flex justify-center items-center h-20"
            >
                {isLoading && (
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                )}
                {!hasMore && reviews.length > 0 && (
                    <p className="text-gray-400 text-sm">
                        마지막 리뷰입니다. 🥳
                    </p>
                )}
            </div>
        </main>
    );
}
