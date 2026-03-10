/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';

export default function ReviewWritePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/search?query=${searchQuery}`);
        const data = await res.json();
        setSearchResults(data.items || []);
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            {!selectedPlace ? (
                <div className="bg-white min-h-screen">
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center px-4 py-3 border-b"
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="리뷰를 작성할 가게를 검색하세요!"
                            className="flex-1 mx-4 px-4 py-2 border rounded-full border-gray-300"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            검색
                        </button>
                    </form>
                    {searchResults.map((place, index) => {
                        const cleanTitle = place.title.replace(/<[^>]*>?/g, '');
                        return (
                            <div
                                key={index}
                                className="border-b border-gray-300 py-4 px-4 flex justify-between items-center hover:bg-gray-50"
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
                                        setSelectedPlace(place);
                                    }}
                                    className="px-4 py-2 bg-blue-50 text-blue-600 text-sm rounded-lg font-semibold whitespace-nowrap"
                                >
                                    리뷰 작성하기
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="p-6">
                    <button
                        onClick={() => setSelectedPlace(null)}
                        className="text-sm text-gray-500 mb-6 flex items-center"
                    >
                        ← 다른 가게 찾기
                    </button>

                    <h1 className="text-2xl font-bold mb-2">
                        {selectedPlace.title.replace(/<[^>]*>?/g, '')}
                    </h1>
                    <p className="text-gray-500 mb-8">
                        이곳에 대한 솔직한 리뷰를 남겨주세요.
                    </p>

                    <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
                        <label className="block font-bold mb-2">별점</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setRating(num)}
                                    className={`px-4 py-2 rounded-lg font-bold ${rating === num ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}
                                >
                                    {num}점
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
                        <label className="block font-bold mb-2">
                            리뷰를 남겨주세요!
                            <p className='text-sm text-gray-500'>*단, 허위 사실을 게시하거나 비방 목적으로 게시할 시 <br/> 별도의 안내 없이 삭제됩니다.</p>
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-32 p-3 border border-gray-400 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                            placeholder="음식 맛, 분위기, 친절도 등을 자유롭게 적어주세요!"
                        />
                    </div>

                    <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition">
                        리뷰 등록하기
                    </button>
                </div>
            )}
        </main>
    );
}
