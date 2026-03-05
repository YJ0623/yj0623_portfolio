'use client';

import { useRef, useState } from 'react';

export default function BlackholeButton() {
    const buttonRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!buttonRef.current) return;

        const { left, top, width, height } =
            buttonRef.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const x = (e.clientX - centerX) * 0.3;
        const y = (e.clientY - centerY) * 0.3;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const handleClick = () => {
        alert("It's a magnetic magic!");
        console.log("It's a magnetic magic!");
    };

    return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-64 h-64"
    >
      <div
        className="absolute flex items-center justify-center w-32 h-32 rounded-full border border-gray-700 shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-transform duration-200 ease-out"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <div
          onClick={handleClick}
          className="w-[50px] h-[50px] bg-white rounded-full cursor-pointer hover:scale-110 transition-transform shadow-[0_0_30px_white]"
        />
      </div>
    </div>
  );
}
