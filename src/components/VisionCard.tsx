'use client';
import { useVisionStore, VisionItem } from '@/store/useVisionStore';
import { useDraggable } from '@dnd-kit/core';
import React, { useRef } from 'react';

interface VisionCardProps {
    item: VisionItem;
}

export const VisionCard = ({ item }: VisionCardProps) => {
    const { removeItem, bringToFront, updateRotation, updateSize } =
        useVisionStore();
    const contentRef = useRef<HTMLDivElement>(null);

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: item.id,
    });

    const dragStyle = transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined;

    const handleRotateStart = (e: React.PointerEvent) => {
        e.stopPropagation();
        bringToFront(item.id);

        if (!contentRef.current) return;

        const rect = contentRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const startRadians = Math.atan2(
            e.clientX - centerY,
            e.clientX - centerX,
        )

        const startDegree = startRadians * (180 / Math.PI);

        const initialItemRotation = item.rotation;

        const onPointerMove = (moveEvent: PointerEvent) => {
            const currentRadians = Math.atan2(
                moveEvent.clientY - centerY,
                moveEvent.clientX - centerX,
            )
            
            const currentDegree = currentRadians * (180 / Math.PI);

            const deltaDegree = currentDegree - startDegree;

            updateRotation(item.id, initialItemRotation + deltaDegree);
        };

        const onPointerUp = () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
    };

    const handleResizeStart = (e: React.PointerEvent) => {
        e.stopPropagation();
        bringToFront(item.id);

        const startX = e.clientX;
        const startWidth = item.width;

        const onPointerMove = (moveEvent: PointerEvent) => {
            const deltaX = moveEvent.clientX - startX;

            const newWidth = Math.max(100, startWidth + deltaX);
            updateSize(item.id, newWidth);
        };

        const onPointerUp = () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
    };

    return (
        <div
            // dnd-kit에 움직일 요소 설정
            ref={setNodeRef}
            // 마우스 클릭, 드래그 이벤트 연결
            {...listeners}
            {...attributes}
            style={{
                position: 'absolute',
                left: `${item.x}px`,
                top: `${item.y}px`,
                width: `${item.width}px`,
                transform: dragStyle,
                zIndex: item.zIndex,
            }}
            className="absolute touch-none cursor-grab active:cursor-grabbing"
        >
            <div
                ref={contentRef}
                style={{
                    width: `${item.width}px`,
                    transform: `rotate(${item.rotation}deg)`,
                }}
                className="group relative border-2 border-transparent hover:border-[#8A7650] bg-white shadow-lg p-2"
            >
                <div className="absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            removeItem(item.id);
                        }}
                        className="bg-white text-black text-xs px-2 py-1 rounded border shadow-sm"
                    >
                        삭제
                    </button>
                </div>

                <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-auto pointer-events-none select-none"
                />

                <div onPointerDown={handleRotateStart} className='absolute -bottom-3 -left-3 w-6 h-6 bg-[#8A7650] rounded-full border-2 border-white cursor-alias opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs'>
                    ↻
                </div>

                <div onPointerDown={handleResizeStart} className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#8A7650] rounded-full border-2 border-white cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity"/>
            </div>
        </div>
    );
};
