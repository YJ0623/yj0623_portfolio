'use client';
 
import { useVisionStore } from '@/store/useVisionStore';
import { useEffect, useState, useRef } from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { VisionCard } from '@/src/components/VisionCard';
import Image from 'next/image';
import background_image from '../../assets/background_brown.jpg';
import Link from 'next/link';
 
export default function VisionBoard() {
    const { items, addItem, updatePosition, bringToFront } = useVisionStore();
    // 초기 마운트 상태 관리
    const [isMounted, setIsMounted] = useState(false);
 
    // url 직접 입력 관리
    const [inputUrl, setInputUrl] = useState('');
    const [inputTitle, setInputTitle] = useState('');
 
    // 파일 업로드중 여부 체크
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
 
    useEffect(() => {
        setIsMounted(true);
    }, []);
 
    if (!isMounted) return null;
 
    const handleDragStart = (event: DragStartEvent) => {
        if (event.active && event.active.id) {
            bringToFront(event.active.id as string);
        }
    };
 
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, delta } = event;
        if (active && active.id) {
            const id = active.id as string;
            const item = items.find((i) => i.id === id);
            if (item) {
                updatePosition(id, item.x + delta.x, item.y + delta.y);
            }
        }
    };
 
    const handleAddUrl = () => {
        if (!inputUrl.trim()) return alert('이미지 URL을 입력해주세요!');
        addItem({ url: inputUrl, title: inputTitle || '나의 목표' });
        setInputUrl('');
        setInputTitle('');
    };
 
    // s3 업로드 로직
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
 
        try {
            setIsUploading(true); // 로딩 시작 (버튼 비활성화)
 
            // 1. Next.js 서버에 "S3 직통 업로드 URL(허가증) 좀 줘!" 요청
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filename: file.name,
                    contentType: file.type, // 예: image/png, image/jpeg
                }),
            });
 
            if (!res.ok) throw new Error('URL 발급에 실패했습니다.');
 
            // url: S3에 업로드할 때 쓸 일회용 주소 / finalImageUrl: 영구 저장될 주소
            const { url, finalImageUrl } = await res.json();
 
            // 2. 발급받은 URL로 브라우저가 S3에 직접 파일 쏘기! (PUT 메서드 사용)
            const uploadRes = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': file.type,
                },
                body: file, // 파일 데이터 원본을 그대로 바디에 싣습니다.
            });
 
            if (!uploadRes.ok) throw new Error('S3 업로드에 실패했습니다.');
 
            // 3. 업로드 성공 시, 영구 주소를 Zustand 스토어에 저장!
            addItem({
                url: finalImageUrl,
                title: inputTitle || file.name,
            });
 
            setInputTitle('');
        } catch (error) {
            console.error(error);
            alert('이미지 업로드 중 오류가 발생했습니다.');
        } finally {
            setIsUploading(false); // 로딩 끝
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // 다음 업로드를 위해 input 초기화
            }
        }
    };
 
    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#F9F9F9] p-3 sm:p-5">
            {/* 헤더 영역 - 반응형 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-0">
                <Link
                    href="/side-projects"
                    className="font-semibold text-base sm:text-lg md:text-xl z-50 relative hover:opacity-70 transition-opacity"
                >
                    ← Back
                </Link>
                <h1 className="font-gveret text-3xl sm:text-4xl md:text-5xl lg:text-7xl z-10 text-center flex-1">
                    Vision Board
                </h1>
                <div className="w-12 sm:w-16" /> {/* 모바일에서 레이아웃 균형 유지 */}
            </div>
 
            {/* 배경 이미지 */}
            <Image
                src={background_image}
                alt="배경화면"
                className="object-cover z-0"
                fill
            />
 
            {/* 컨트롤 패널 - 완전 반응형 */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:right-4 sm:left-auto sm:w-auto z-50 bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-200">
                {/* 파일 업로드 input (숨김) */}
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                />
 
                {/* 모바일: 세로 레이아웃 / 태블릿 이상: 가로 레이아웃 */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
                    {/* 파일 업로드 버튼 */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className={`${
                            isUploading
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-[#D1C7B7] hover:bg-[#c2b6a3]'
                        } text-black px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm font-semibold whitespace-nowrap w-full sm:w-auto min-h-[44px] sm:min-h-[40px] flex items-center justify-center`}
                    >
                        {isUploading ? '업로드 중... ⏳' : '📸 이미지 업로드'}
                    </button>
 
                    {/* 데스크톱 구분선 (모바일에서 숨김) */}
                    <div className="hidden sm:block w-px h-6 bg-gray-300 mx-1" />
 
                    {/* 입력 필드 영역 - 반응형 그리드 */}
                    <div className="flex flex-col sm:flex-row gap-2 flex-1 w-full sm:w-auto">
                        <input
                            type="text"
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                            placeholder="이미지 주소 (URL)"
                            className="border border-gray-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm outline-none focus:border-[#8A7650] focus:ring-1 focus:ring-[#8A7650] w-full sm:w-44 md:w-56 min-h-[44px] sm:min-h-[40px]"
                        />
                        <input
                            type="text"
                            value={inputTitle}
                            onChange={(e) => setInputTitle(e.target.value)}
                            placeholder="제목 (선택)"
                            className="border border-gray-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm outline-none focus:border-[#8A7650] focus:ring-1 focus:ring-[#8A7650] w-full sm:w-32 min-h-[44px] sm:min-h-[40px]"
                        />
                    </div>
 
                    {/* URL 추가 버튼 */}
                    <button
                        onClick={handleAddUrl}
                        className="bg-[#8A7650] text-white font-bold px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg hover:bg-[#705e3f] transition-colors text-xs sm:text-sm whitespace-nowrap w-full sm:w-auto min-h-[44px] sm:min-h-[40px] flex items-center justify-center"
                    >
                        + URL 추가
                    </button>
                </div>
 
                {/* 모바일 팁 (선택사항) */}
                <p className="sm:hidden text-xs text-gray-500 mt-2 text-center">
                    💡 카드를 드래그해서 배치하세요
                </p>
            </div>
 
            {/* Vision Card들 */}
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                {items.map((item) => (
                    <VisionCard key={item.id} item={item} />
                ))}
            </DndContext>
        </div>
    );
}