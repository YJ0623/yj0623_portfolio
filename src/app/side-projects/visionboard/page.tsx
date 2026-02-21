'use client';

import { useVisionStore } from '@/store/useVisionStore';
import { useEffect, useState, useRef } from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { VisionCard } from '@/src/components/VisionCard';

export default function VisionBoard() {
    const { items, addItem, updatePosition, bringToFront } = useVisionStore();
    const [isMounted, setIsMounted] = useState(false);

    const [inputUrl, setInputUrl] = useState('');
    const [inputTitle, setInputTitle] = useState('');
    
    // 🌟 파일 업로드 중인지 확인하는 상태 (버튼 비활성화용)
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

    // 🚀 S3 Pre-signed URL을 이용한 찐 업로드 로직!
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
        <div className="relative w-full h-screen overflow-hidden bg-[#F9F9F9]">
            <div className="absolute top-4 left-4 z-50 bg-white p-4 rounded-xl shadow-md flex gap-2 items-center border border-gray-200">
                <input 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading} // 업로드 중이면 버튼 막기
                    className={`${
                        isUploading ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#D1C7B7] hover:bg-[#c2b6a3]'
                    } text-black px-4 py-2 rounded-lg transition-colors text-sm font-semibold whitespace-nowrap`}
                >
                    {isUploading ? '업로드 중... ⏳' : '📁 PC 이미지'}
                </button>

                <div className="w-px h-6 bg-gray-300 mx-2" />

                <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="이미지 주소 (URL)"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-52 text-sm outline-none focus:border-[#8A7650]"
                />
                <input
                    type="text"
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)}
                    placeholder="제목 (선택)"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-32 text-sm outline-none focus:border-[#8A7650]"
                />
                <button
                    onClick={handleAddUrl}
                    className="bg-[#8A7650] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#705e3f] transition-colors text-sm whitespace-nowrap"
                >
                    URL 추가
                </button>
            </div>

            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                {items.map((item) => (
                    <VisionCard key={item.id} item={item} />
                ))}
            </DndContext>
        </div>
    );
}