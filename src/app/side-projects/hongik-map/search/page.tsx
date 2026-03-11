'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // 뒤로가기 기능을 위해 필요!
import { useRestaurantStore } from '@/store/useRestaurantStore';

export default function SearchPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const setSelectedRestaurant = useRestaurantStore(
        (state) => state.setSelectedRestaurant
    );

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`/api/search?query=${searchQuery}`);
        const data = await res.json();

        setSearchResults(data.items || []);
    };

    return (
        <main className="min-h-screen bg-white">
            <form
                onSubmit={handleSearch}
                className="flex items-center flex-nowrap px-4 py-3 border-b"
            >
                <button
                    type="button"
                    onClick={() => router.push('/side-projects/hongik-map')}
                    className="text-gray-500 text-[12px] hover:text-gray-700 transition shrink-0"
                >
                    뒤로가기
                </button>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="가게 이름을 입력하세요"
                    className="flex-1 mx-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-[#5478FF] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-[12px] shrink-0"
                >
                    검색
                </button>
            </form>
            <section className="px-4 py-6">
                <h2 className="text-lg font-bold mb-4">검색 결과</h2>
                <div className="flex flex-col">
                    {searchResults.map((place, index) => {
                        const cleanTitle = place.title.replace(/<[^>]*>?/g, '');

                        return (
                            <div
                                key={index}
                                className="border-b py-4 flex justify-between items-center hover:bg-gray-50"
                            >
                                <div className="flex-1 pr-4">
                                    <h3 className="font-bold text-gray-900">
                                        {cleanTitle}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {place.roadAddress || place.address}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {place.category}
                                    </p>
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedRestaurant({
                                            id:
                                                place.roadAddress ||
                                                place.address,
                                            name: cleanTitle,
                                            lat: Number(place.mapy),
                                            lng: Number(place.mapx),
                                        });

                                        router.push(
                                            '/side-projects/hongik-map/map'
                                        );
                                    }}
                                    className="px-4 py-2 bg-blue-50 text-[#5478FF] text-sm rounded-lg font-semibold whitespace-nowrap"
                                >
                                    지도에서 보기
                                </button>
                            </div>
                        );
                    })}
                    {searchResults.length === 0 && (
                        <p className="text-center text-gray-500 py-10">
                            홍대 주변의 맛집을 검색해보세요!
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}
