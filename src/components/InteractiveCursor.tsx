'use client';

import { useEffect, useRef } from "react";
import { useCursorStore } from "@/store/useCursorStore";

export default function InteractiveCursor() {
    const { variant } = useCursorStore();

    const target = useRef({ x: 0, y: 0 });
    const current = useRef({ x: 0, y: 0 });
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
        };

        window.addEventListener("mousemove", onMouseMove);

        const render = () => {
            current.current.x += (target.current.x - current.current.x) * 0.1;
            current.current.y += (target.current.y - current.current.y) * 0.1;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
            }

            requestAnimationFrame(render);

            return () => {
                window.removeEventListener("mousemove", onMouseMove);
            };
        }
    }, []);

    const getCursorStyle = () => {
        switch (variant) {
            case 'hover':
                return 'w-20 h-20 bg-amber-300 opacity-50 blur-xl';
            case 'clicked':
                return 'w-8 h-8 bg-red-500 opacity-80';
            case 'default':
            default:
                return 'w-10 h-10 bg-white opacity-40 blur-md';
            
        };
    };

    return (
        <div ref={cursorRef} className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 transition-all duration-200 ${getCursorStyle()}`}/>
    )
}