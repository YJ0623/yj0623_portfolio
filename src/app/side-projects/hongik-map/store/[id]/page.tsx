'use client';

import { useRouter } from 'next/navigation';

export default function StoreDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const storeId = params.id; 

    return (
        <main className="min-h-screen bg-white">
            <header className="flex items-center p-4 border-b sticky top-0 bg-white z-10">
                <button onClick={() => router.push('/side-projects/hongik-map/map')} className="mr-4 text-gray-500 hover:text-black">
                    ← 뒤로가기
                </button>
                <h1 className="font-bold text-lg">가게 상세</h1>
            </header>

            <div className="p-4">
                <p className="text-gray-500">현재 선택된 가게 ID:</p>
                <p className="font-bold text-2xl text-blue-600 break-all">{decodeURIComponent(storeId)}</p>
                
                <div className="mt-10 p-6 bg-gray-50 rounded-xl text-center text-gray-400">
                    리뷰 사진, 별점, 텍스트
                </div>
            </div>
        </main>
    );
}