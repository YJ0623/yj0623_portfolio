'use client';

import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

interface Review {
    id: string;
    restaurant_name: string;
    rating: number;
    content: string;
    image_urls: string[] | null;
    created_at: string;
}

export default function StoreDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const unwrappedParams = use(params);
    const router = useRouter();
    const storeId = decodeURIComponent(unwrappedParams.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [reviews, setReviews] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    {
        /* supabase 사용 코드 */
    }
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data, error } = await supabase
                    .from('reviews')
                    .select('*')
                    .eq('restaurant_id', storeId)
                    .eq('status', 'APPROVED')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setReviews(data || []);
            } catch (error) {
                console.error('리뷰 불러오기 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, [storeId]);

    const storeName = reviews.length > 0 ? reviews[0].restaurant_name : storeId;

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            {/* 상단 헤더 */}
            <header className="flex items-center p-4 border-b sticky top-0 bg-white z-10 shadow-sm">
                <button
                    onClick={() => router.back()}
                    className="mr-4 text-gray-500 hover:text-black font-bold"
                >
                    ← 뒤로가기
                </button>
                <h1 className="font-bold text-lg truncate flex-1">
                    {storeName}
                </h1>
            </header>

            <div className="p-4">
                {/* 1. 로딩 중일 때 */}
                {isLoading ? (
                    <div className="text-center py-20 text-gray-400">
                        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        리뷰를 불러오는 중입니다...
                    </div>
                ) : /* 2. 리뷰가 없을 때 (혹은 아직 PENDING 상태일 때) */
                reviews.length === 0 ? (
                    <div className="mt-10 p-8 bg-white rounded-xl text-center shadow-sm border border-gray-100">
                        <span className="text-4xl mb-4 block">📭</span>
                        <p className="text-gray-500 font-medium">
                            아직 등록된 리뷰가 없습니다.
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            첫 번째 리뷰를 남겨보세요!
                        </p>
                    </div>
                ) : (
                    /* 3. 리뷰가 있을 때 리스트 렌더링 */
                    <div className="flex flex-col gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-2">
                            <h2 className="font-bold text-gray-800">
                                방문자 리뷰{' '}
                                <span className="text-blue-600">
                                    {reviews.length}
                                </span>
                            </h2>
                        </div>

                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                            >
                                {/* 작성일 & 별점 */}
                                <div className="flex justify-between items-center mb-3">
                                    <div className="text-yellow-400 text-lg tracking-widest">
                                        {'★'.repeat(review.rating)}
                                        {'☆'.repeat(5 - review.rating)}
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {new Date(
                                            review.created_at
                                        ).toLocaleDateString('ko-KR')}
                                    </span>
                                </div>

                                {/* 리뷰 내용 */}
                                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">
                                    {review.content}
                                </p>

                                {/* 💡 첨부된 사진이 있다면 가로 스크롤로 보여주기! */}
                                {review.image_urls &&
                                    review.image_urls.length > 0 && (
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {review.image_urls.map(
                                                (url, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200"
                                                    >
                                                        {/* 주의: next/image 대신 일반 img 태그를 사용했습니다. 
                                                    (외부 URL인 Supabase 스토리지를 띄우려면 next.config.js 설정이 필요하기 때문입니다) */}
                                                        <img
                                                            src={url}
                                                            alt={`리뷰 사진 ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
