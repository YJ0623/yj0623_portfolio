/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import imageCompression from 'browser-image-compression';
import { supabase } from '@/utils/supabase';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ReviewWritePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [content, setContent] = useState('');
    const [photos, setPhotos] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    useEffect(() => {
        const newUrls = photos.map((file) => URL.createObjectURL(file));
        setPreviewUrls(newUrls);

        return () => {
            newUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [photos]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/search?query=${searchQuery}`);
        const data = await res.json();
        setSearchResults(data.items || []);
    };

    const handleRemovePhoto = (indexToRemove: number) => {
        setPhotos(photos.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmitReview = async () => {
        if (rating === 0) {
            alert('별점을 선택해주세요!');
            return;
        }
        if (content.trim() === '') {
            alert('리뷰 내용을 작성해 주세요!');
            return;
        }

        const cleanTitle = selectedPlace.title.replace(/<[^>]*>?/g, '');
        const addressId = selectedPlace.roadAddress || selectedPlace.address;

        try {
            let uploadedUrls: string[] = [];

            if (photos.length > 0) {
                const uploadPromises = photos.map(async (file) => {
                    const options = {
                        maxSizeMB: 1, 
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };
                    const compressedFile = await imageCompression(file, options);
                    const fileExt = compressedFile.name.split('.').pop();
                    const randomString = Math.random()
                        .toString(36)
                        .substring(2, 9);
                    const uniqueFileName = `${Date.now()}_${randomString}.${fileExt}`;

                    const { data, error: uploadError } = await supabase.storage
                        .from('review_photos')
                        .upload(uniqueFileName, compressedFile);

                    if (uploadError) throw uploadError;

                    const { data: publicUrlData } = supabase.storage
                        .from('review_photos')
                        .getPublicUrl(uniqueFileName);

                    return publicUrlData.publicUrl;
                });

                uploadedUrls = await Promise.all(uploadPromises);
            }
            const { error: dbError } = await supabase.from('reviews').insert([
                {
                    restaurant_id: addressId,
                    restaurant_name: cleanTitle,
                    rating: rating,
                    content: content,
                    status: 'PENDING',
                    image_urls: uploadedUrls,
                    lat: Number(selectedPlace.mapy),
                    lng: Number(selectedPlace.mapx),
                },
            ]);

            if (dbError) throw dbError;
            alert(
                '리뷰를 등록해주셔서 감사합니다! 리뷰는 검수 후 바로 등록됩니다.'
            );

            setSelectedPlace(null);
            setRating(0);
            setContent('');
            setPhotos([]);
            router.push('/side-projects/hongik-map');
        } catch (error) {
            console.error(error);
            alert('리뷰 등록 중 오류가 발생했습니다. 관리자에게 문의해주세요.');
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        const combinedFiles = [...photos, ...files];

        if (files.length > 3) {
            alert('사진은 최대 3장까지만 업로드 가능합니다!');
            setPhotos(combinedFiles.slice(0, 3));
        } else {
            setPhotos(combinedFiles);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            {!selectedPlace ? (
                <div className="bg-white min-h-screen">
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center px-4 py-3 border-b border-gray-300"
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
                        <label className="block font-bold mb-2 text-gray-800">
                            별점{' '}
                            <span className="text-blue-500">
                                {rating > 0 ? `${rating}점` : ''}
                            </span>
                        </label>

                        <div
                            className="flex gap-1"
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            {[1, 2, 3, 4, 5].map((num) => {
                                const displayScore =
                                    hoverRating > 0 ? hoverRating : rating;

                                // 보여줄 이미지 결정 로직
                                let starImage = '/star_empty.png'; // 텅 빈 별 이미지 경로
                                if (displayScore >= num) {
                                    starImage = '/star_full.png'; // 꽉 찬 별 이미지 경로
                                } else if (displayScore >= num - 0.5) {
                                    starImage = '/star_half.png'; // 반쪽 별 이미지 경로
                                }

                                return (
                                    <div
                                        key={num}
                                        className="relative w-10 h-10"
                                    >
                                        {/* 1. 눈에 보이는 별 이미지 */}
                                        <img
                                            src={starImage}
                                            alt={`${num}점 별`}
                                            className="w-full h-full object-contain pointer-events-none transition-all duration-200"
                                        />

                                        {/* 2. 투명한 왼쪽 클릭 영역 (0.5점) */}
                                        <div
                                            className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
                                            onMouseEnter={() =>
                                                setHoverRating(num - 0.5)
                                            }
                                            onClick={() => setRating(num - 0.5)}
                                        />

                                        {/* 3. 투명한 오른쪽 클릭 영역 (1.0점) */}
                                        <div
                                            className="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-10"
                                            onMouseEnter={() =>
                                                setHoverRating(num)
                                            }
                                            onClick={() => setRating(num)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
                        <label className="block font-bold mb-2">
                            사진 첨부 (최대 3장)
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="block w-full text-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                        />

                        {photos.length > 0 && (
                            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 pt-3 pr-3">
                                {photos.map((file, index) => (
                                    <div
                                        key={index}
                                        className="relative w-24 h-24 flex-shrink-0"
                                    >
                                        {previewUrls[index] && (
                                            <Image
                                                src={previewUrls[index]}
                                                alt="미리보기"
                                                className="mt-2 object-cover rounded-lg border border-gray-200"
                                                width={96}
                                                height={96}
                                            />
                                        )}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemovePhoto(index)
                                            }
                                            className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm hover:bg-red-600 transition"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
                        <label className="block font-bold mb-2">
                            리뷰를 남겨주세요!
                            <p className="text-sm text-gray-500">
                                *단, 허위 사실을 게시하거나 비방 목적으로 게시할
                                시 <br /> 별도의 안내 없이 삭제됩니다.
                            </p>
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-32 p-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                            placeholder="음식 맛, 분위기, 친절도 등을 자유롭게 적어주세요!"
                        />
                    </div>

                    <button
                        className="w-full bg-[#111FA2] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition"
                        onClick={handleSubmitReview}
                    >
                        리뷰 등록하기
                    </button>
                </div>
            )}
        </main>
    );
}
