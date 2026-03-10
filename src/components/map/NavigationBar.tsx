'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
    { name: '홈', href: '/side-projects/hongik-map' },
    { name: '지도', href: '/side-projects/hongik-map/map' },
    { name: '리뷰 쓰기', href: '/side-projects/hongik-map/write' },
];

export const NavigationBar = () => {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 w-full z-50 bg-white flex items-center h-[72px] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] rounded-t-2xl px-2 pb-safe">
            {NAV_ITEMS.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors ${pathname === item.href ? 'text-blue-600 font-bold' : 'text-gray-400 font-medium hover:text-gray-600'}`}
                >
                    <span className="text-sm">{item.name}</span>
                </Link>
            ))}
        </div>
    );
};
