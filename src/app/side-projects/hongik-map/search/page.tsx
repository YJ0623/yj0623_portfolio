'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // 뒤로가기 기능을 위해 필요!

export default function SearchPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('검색어:', searchQuery);
    }

    return (
        <main className="min-h-screen bg-white">
            <form onSubmit={handleSearch} className="flex items-center px-4 py-3 border-b">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="text-gray-500 hover:text-gray-700 transition"
                >
                    뒤로가기
                </button>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="가게 이름이나 키워드를 입력하세요"
                    className="flex-1 mx-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    검색
                </button>
            </form>
            <section className="px-4 py-6">
                <h2 className="text-lg font-bold mb-4">검색 결과</h2>
            </section>
        </main>
    );
}