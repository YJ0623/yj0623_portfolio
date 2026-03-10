'use client';

import { useRestaurantStore } from '@/store/useRestaurantStore';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        naver: any;
    }
}

const mockupData = [
    {
        id: 'restaurant1',
        name: '맛집 1',
        lat: 37.5518,
        lng: 126.92,
    },
    {
        id: 'restaurant2',
        name: '맛집 2',
        lat: 37.5528,
        lng: 126.915,
    },
    {
        id: 'restaurant3',
        name: '맛집 3',
        lat: 37.5538,
        lng: 126.93,
    },
];

export default function NaverMap() {
    const mapElement = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const setSelectedRestaurant = useRestaurantStore((state) => state.setSelectedRestaurant);

    useEffect(() => {
        if (!mapElement.current || !isLoaded || !window.naver) return;

        const mapOptions = {
            center: new naver.maps.LatLng(37.5518, 126.925),
            zoom: 15,
            logoControl: false,
            mapDataControl: false,
            scaleControl: false,
        };

        const map = new naver.maps.Map(mapElement.current, mapOptions);

        mockupData.forEach((item) => {
            const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(item.lat, item.lng),
                map,
                title: item.name,
                cursor: 'pointer',
                clickable: true,
            });

            naver.maps.Event.addListener(marker, 'click', () => {
                setSelectedRestaurant(item);
            });
        });
    }, [isLoaded]);

    return (
        <div className="relative w-full h-screen">
            <Script
                strategy="afterInteractive"
                src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
                onReady={() => setIsLoaded(true)}
            />
            <div ref={mapElement} className="w-full h-screen relative" />
        </div>
    );
}
