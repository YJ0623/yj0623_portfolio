/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRestaurantStore } from '@/store/useRestaurantStore';
import { supabase } from '@/utils/supabase';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        naver: any;
    }
}

export default function NaverMap() {
    const mapElement = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const mapInstance = useRef<any>(null);
    const searchMarker = useRef<any>(null);
    const [dbMarkers, setDbMarkers] = useState<any[]>([]);
    const { selectedRestaurant, setSelectedRestaurant } = useRestaurantStore();

    // 네이버지도 api에서 mapx, mapy를 전달할 때에는 네이버만의 규격에 맞춘 1천만이 넘어가는 숫자를 제공합니다.
    // 따라서 geocoding을 이용하지 않고 해당 좌표를 변환하기 위한 함수를 따로 작성하였습니다.
    const getLatLng = (lat: number, lng: number) => {
        // 1. 최신 스펙: 1천만 이상 (위경도 * 10,000,000)
        if (lat > 10000000) {
            return new window.naver.maps.LatLng(lat / 10000000, lng / 10000000);
        } 
        // 2. 과거 스펙: 1천 이상 ~ 1천만 미만 (TM128)
        else if (lat > 1000) {
            const tm128 = new window.naver.maps.Point(lng, lat);
            return window.naver.maps.TransCoord.fromTM128ToLatLng(tm128);
        } 
        // 3. 정상 위경도 (37.xxx, 126.xxx)
        return new window.naver.maps.LatLng(lat, lng);
    };

    useEffect(() => {
        const fetchMarkers = async () => {
            const { data, error } = await supabase
                .from('reviews')
                .select('restaurant_id, restaurant_name, lat, lng')
                .eq('status', 'APPROVED');

            // 가게 ID 기준으로 중복 제거
            if (data) {
                const uniqueRestaurants = Array.from(
                    new Map(
                        data.map((item) => [item.restaurant_id, item])
                    ).values()
                );
                setDbMarkers(uniqueRestaurants);
            }
        };

        fetchMarkers();
    }, []);

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

        mapInstance.current = new naver.maps.Map(
            mapElement.current,
            mapOptions
        );
    }, [isLoaded]);

    useEffect(() => {
        if (!mapElement.current || !isLoaded || dbMarkers.length === 0) return;

        dbMarkers.forEach((place) => {
            const position = getLatLng(Number(place.lat), Number(place.lng));

            const marker = new window.naver.maps.Marker({
                position: position,
                map: mapInstance.current,
                title: place.restaurant_name,
                cursor: 'pointer',
                clickable: true,
            });

            window.naver.maps.Event.addListener(marker, 'click', () => {
                setSelectedRestaurant({
                    id: place.restaurant_id,
                    name: place.restaurant_name,
                    lat: Number(place.lat),
                    lng: Number(place.lng),
                });
                
                mapInstance.current.panTo(position);
            });
        });
    }, [isLoaded, dbMarkers]);

    useEffect(() => {
        if (!mapInstance.current || !window.naver || !selectedRestaurant) return;

        const targetLatLng = getLatLng(Number(selectedRestaurant.lat), Number(selectedRestaurant.lng));

        mapInstance.current.panTo(targetLatLng);

        if (searchMarker.current) {
            searchMarker.current.setMap(null);
        }

        searchMarker.current = new window.naver.maps.Marker({
            position: targetLatLng,
            map: mapInstance.current,
        });

    }, [selectedRestaurant, isLoaded]);
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