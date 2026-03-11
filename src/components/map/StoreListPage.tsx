'use client';

import { supabase } from '@/utils/supabase';
import { useCallback, useEffect, useRef, useState } from 'react';

const PAGE_SIZE = 5; 

export default function StoreListPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [reviews, setReviews] = useState<any[]>([]);
    const [page, setPage] = useState(0); // 현재 페이지 번호
    const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 남았는지 여부
    const [isLoading, setIsLoading] = useState(false);
    
    // 💡 CCTV 역할을 할 Ref (이 녀석이 화면에 보이면 다음 페이지를 불러옵니다)
    const observerTargetRef = useRef<HTMLDivElement | null>(null);

    // ==========================================
    // 1️⃣ Supabase에서 페이지네이션으로 데이터 가져오기
    // ==========================================
    const fetchMoreReviews = useCallback(async (currentPage: number) => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);

        const from = currentPage * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        try {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('status', 'APPROVED')
                .order('created_at', { ascending: false })
                .range(from, to); // 💡 핵심! N번째부터 M번째까지만 가져와!

            if (error) throw error;

            if (data) {
                // 가져온 데이터가 PAGE_SIZE보다 적으면? -> 이제 끝났다는 뜻!
                if (data.length < PAGE_SIZE) {
                    setHasMore(false);
                }
                
                // 기존 리뷰 배열 뒤에 새로 가져온 배열을 이어붙이기
                setReviews((prev) => {
                    // 💡 혹시 모를 중복 렌더링 방지용 필터링
                    const newReviews = data.filter(d => !prev.some(p => p.id === d.id));
                    return [...prev, ...newReviews];
                });
            }
        } catch (error) {
            console.error('리뷰 불러오기 실패:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, hasMore]);

    // 페이지(page) 숫자가 바뀔 때마다 데이터를 새로 가져옵니다.
    useEffect(() => {
        fetchMoreReviews(page);
    }, [page]);

    // ==========================================
    // 2️⃣ 스크롤이 맨 밑에 닿았는지 감시하는 CCTV(Observer) 달기
    // ==========================================
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // 💡 타겟이 화면에 들어왔고, 더 불러올 데이터가 있고, 로딩 중이 아니라면?
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    setPage((prevPage) => prevPage + 1); // 페이지 +1 증가!
                }
            },
            { threshold: 1.0 } // 타겟이 100% 화면에 보일 때 작동
        );

        if (observerTargetRef.current) {
            observer.observe(observerTargetRef.current);
        }

        return () => {
            if (observerTargetRef.current) observer.disconnect();
        };
    }, [hasMore, isLoading]);

    return (
        <main className="min-h-screen bg-gray-50 mt-10 pb-24 p-4">
            <h1 className="text-xl font-bold mb-6">홍익인의 맛집 리스트</h1>

            <div className="flex flex-col gap-4">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="font-bold text-lg mb-1">{review.restaurant_name}</h2>
                        <span className="text-yellow-500 tracking-widest block mb-2">
                            {'★'.repeat(review.rating)}
                        </span>
                        <p className="text-gray-600 line-clamp-2">{review.content}</p>
                    </div>
                ))}
            </div>

            {/* ========================================== */}
            {/* 💡 3️⃣ 여기가 바로 CCTV 설치 구역입니다! (맨 밑바닥) */}
            {/* ========================================== */}
            <div ref={observerTargetRef} className="py-8 flex justify-center items-center h-20">
                {isLoading && (
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                )}
                {!hasMore && reviews.length > 0 && (
                    <p className="text-gray-400 text-sm">마지막 리뷰입니다. 🥳</p>
                )}
            </div>
        </main>
    );
}