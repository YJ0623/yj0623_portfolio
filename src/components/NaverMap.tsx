'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

// dummy data
const RESTAURANTS = [
    { id: 1, name: '카미야 (돈카츠)', lat: 37.5532, lng: 126.9235 },
    { id: 2, name: '칸다소바 (마제소바)', lat: 37.5485, lng: 126.9205 },
    { id: 3, name: '윤씨밀방 (함박스테이크)', lat: 37.5492, lng: 126.923 },
    { id: 4, name: '우동카덴 (우동)', lat: 37.5513, lng: 126.9145 },
    { id: 5, name: '진진 (중식당)', lat: 37.5555, lng: 126.915 },
];

export default function NaverMap() {
    const mapElement = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded || !mapElement.current || !window.naver) return;

        const center = new window.naver.maps.LatLng(37.5502, 126.9248);
        const mapOptions: naver.maps.MapOptions = {
            center: center,
            zoom: 15,
            minZoom: 10,
        };

        const map = new window.naver.maps.Map(mapElement.current, mapOptions);

        RESTAURANTS.forEach((shop) => {
            const position = new window.naver.maps.LatLng(shop.lat, shop.lng);
            const marker = new window.naver.maps.Marker({
                map: map,
                position: position,
                title: shop.name,
            });

            window.naver.maps.Event.addListener(marker, 'click', () => {
                console.log(`클릭된 맛집: ${shop.name}`);
            });
        });
    }, [isLoaded]);

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
                onReady={() => setIsLoaded(true)}
            />
            {!isLoaded && (
                <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
                    지도를 불러오는 중입니다...
                </div>
            )}

            <div ref={mapElement} className="w-full h-screen relative" />
        </>
    );
}
