'use client';
import { useCursorStore } from "@/store/useCursorStore";
import { useEffect, useRef } from "react";
// Zustand import는 생략해도 무방합니다. (로직이 중요하므로)

export default function InteractiveCursor() {
    const { variant } = useCursorStore();
    
    // 1. 좌표를 기억할 공간 2개 만들기 (target, current)
    const target = useRef({ x: 0, y: 0 });
    const current = useRef({ x: 0, y: 0 });
    // DOM을 조작할 조명(div) Ref 만들기
    const domRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // 2. 마우스 움직임 감지 함수 만들기 (target 좌표 업데이트)
        const handleMouseMove =(e: MouseEvent) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
        }
        // window에 이벤트 리스너 달기
        window.addEventListener('mousemove', handleMouseMove);

        let animationFrameId: number;

        const render = () => {
            // 4. Lerp 공식 적용하기 (current x, y 좌표 업데이트)
            current.current.x += (target.current.x - current.current.x) * 0.1;
            current.current.y += (target.current.y - current.current.y) * 0.1;

            // Ref의 style.transform 변경하기
            if (domRef.current) {
                domRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
            }

            // 3. 무한 루프 돌리기 (requestAnimationFrame)
            animationFrameId = requestAnimationFrame(render);
        };
        
        // 루프 최초 실행 (시동 걸기)
        render();
        return () => {
            // 5. 방 빼기 (이벤트 리스너 해제, 애니메이션 취소)
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
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
    }
  };

    return (
        // 조명 UI 그리기 (ref 달아주기)
        <div ref={domRef}
            className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 ${getCursorStyle()}`}
            // CSS로 부드러움 추가 (transform 제외)
            style={{ 
                transitionProperty: "width, height, background-color, opacity, filter",
                transitionDuration: "200ms",
                transitionTimingFunction: "ease-out"
            }}>
        </div>
    )
}