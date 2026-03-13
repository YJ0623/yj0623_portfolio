'use client';

import { useState } from 'react';
import BottomSheet from '@/src/components/map/BottomSheet';
import NaverMap from '@/src/components/map/NaverMap';
import StoreListPage from '@/src/components/map/StoreListPage';

export default function MapTab() {
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

    return (
        <main className="relative w-full h-screen overflow-hidden bg-gray-50 pb-[72px]">
            
            <div className="absolute flex top-0 w-full items-center justify-between z-50 bg-white p-1 shadow-md">
                <button
                    onClick={() => setViewMode('map')}
                    className={`w-1/2 px-5 py-1.5 rounded-full text-sm font-bold transition-colors ${viewMode === 'map' ? 'bg-[#5478FF] text-white' : 'text-gray-700'}`}
                >
                    지도
                </button>
                <button 
                    onClick={() => setViewMode('list')}
                    className={`w-1/2 px-5 py-1.5 rounded-full text-sm font-bold transition-colors ${viewMode === 'list' ? 'bg-[#5478FF] text-white' : 'text-gray-700'}`}
                >
                    리스트
                </button>
            </div>

            {viewMode === 'map' ? (
                <>
                    <NaverMap />
                    <BottomSheet />
                </>
            ) : (
                <>
                <StoreListPage/>
                </>
            )}
            
        </main>
    );
}