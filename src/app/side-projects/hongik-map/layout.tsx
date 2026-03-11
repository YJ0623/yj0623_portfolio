import { Metadata } from "next";
import { NavigationBar } from "@/src/components/map/NavigationBar";

export const metadata: Metadata = {
    title: '홍익 맛집 지도',
    description: '홍대생들의 진짜 찐 맛집을 공유하고 확인해 보세요!',
    openGraph: {
        title: '홍익 맛집 지도',
        description: '홍대생들의 찐 맛집을 공유하고 확인해 보세요!',
        siteName: 'Hongik Map',
        locale: 'ko_KR',
        type: 'website',
        images: [
            {
                url: '/hongikMapImage',
                width: 800,
                height: 600,
                alt: '홍익 맛집 지도',
            },
        ],
    },
};

export default function HongikMapLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative min-h-screen">
            {children}
            <NavigationBar />
        </div>
    );
}