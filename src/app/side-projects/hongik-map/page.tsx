'use client';

import Link from 'next/link';

// 목데이터, 수정 필요
const TOP_RANKING = [
    {
        id: 1,
        name: '홍대 맛집 A',
        likes: 120,
        imageUrl: '/images/restaurant-a.jpg',
    },
    {
        id: 2,
        name: '홍대 맛집 B',
        likes: 95,
        imageUrl: '/images/restaurant-b.jpg',
    },
    {
        id: 3,
        name: '홍대 맛집 C',
        likes: 80,
        imageUrl: '/images/restaurant-c.jpg',
    },
];

const RECENT_REVIEWS = [
    {
        id: 1,
        restaurantName: '홍대 맛집 D',
        reviewerName: '김철수',
        reviewText: '여기 진짜 맛있어요! 강추합니다!',
        rating: 5,
    },
    {
        id: 2,
        restaurantName: '홍대 맛집 E',
        reviewerName: '이영희',
        reviewText: '가격 대비 맛이 괜찮았어요.',
        rating: 4,
    },
    {
        id: 3,
        restaurantName: '홍대 맛집 F',
        reviewerName: '박민수',
        reviewText: '음식이 좀 짰지만 분위기는 좋았어요.',
        rating: 3,
    },
];

export default function HongikMapHome() {
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
                    <span className='text-black font-semibold'>어떤 가게를 찾으세요?</span>
                </Link>
            </section>

            <section className="px-4 mt-8">
                <h2 className="text-lg font-bold mb-4">이번 주 리뷰 TOP 3</h2>
                <div className="flex flex-col gap-3">
                    {TOP_RANKING.map((store) => (
                        <div
                            key={store.id}
                            className="bg-white p-4 rounded-lg shadow-sm"
                        >
                            <h3 className="font-bold">{store.name}</h3>
                            <p className="text-gray-600">
                                좋아요: {store.likes}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-4 mt-8">
                <h2 className="text-lg font-bold mb-4">
                    방금 올라온 핫한 리뷰
                </h2>
                <div className="flex flex-col gap-4">
                    {RECENT_REVIEWS.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white p-4 rounded-lg shadow-sm"
                        >
                            <h3 className="font-bold">
                                {review.restaurantName}
                            </h3>
                            <p className="text-gray-600">
                                {review.reviewerName} 님의 리뷰:{' '}
                                {review.reviewText}
                            </p>
                            <p>평점: {review.rating}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
