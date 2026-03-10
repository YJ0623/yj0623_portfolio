/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const mapInstance = useRef<any>(null);
    const searchMarker = useRef<any>(null);
    const { selectedRestaurant, setSelectedRestaurant, clearRestaurant } =
        useRestaurantStore();

    useEffect(() => {
        if (!mapElement.current || !isLoaded || !window.naver) return;

        if (mapInstance.current) return;

        const mapOptions = {
            center: new naver.maps.LatLng(37.5518, 126.925),
            zoom: 18,
            logoControl: false,
            mapDataControl: false,
            scaleControl: false,
        };

        const map = new naver.maps.Map(mapElement.current, mapOptions);
        mapInstance.current = map;

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

    useEffect(() => {
        if (!mapInstance.current || !window.naver || !selectedRestaurant)
            return;

        let targetLatLng;
        const rawLat = selectedRestaurant.lat;
        const rawLng = selectedRestaurant.lng;

        if (rawLat > 10000000) {
            targetLatLng = new window.naver.maps.LatLng(
                rawLat / 10000000,
                rawLng / 10000000
            );
        } else if (rawLat > 1000) {
            const tm128 = new window.naver.maps.Point(rawLng, rawLat);
            targetLatLng =
                window.naver.maps.TransCoord.fromTM128ToLatLng(tm128);
        } else {
            targetLatLng = new window.naver.maps.LatLng(rawLat, rawLng);
        }

        mapInstance.current.panTo(targetLatLng);

        if (searchMarker.current) {
            searchMarker.current.setMap(null);
        }

        searchMarker.current = new window.naver.maps.Marker({
            position: targetLatLng,
            map: mapInstance.current,
        });
    }, [isLoaded, selectedRestaurant]);

    return (
        <div className="relative w-full h-screen">
            <Script
                strategy="afterInteractive"
                src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
                onReady={() => setIsLoaded(true)}
            />
            <div ref={mapElement} className="w-full h-screen relative" />
        </div>
    );
}
