'use client';

import React, { useEffect, useRef } from 'react';
import { Particle } from '@/types/blackhole';

export default function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const particles: Particle[] = [];

        for (let i = 0; i < 100; i++) {
            particles.push({
                angle: Math.random() * 2 * Math.PI,
                distance: Math.random() * (canvas.width / 2),
                speed: 0.5 + Math.random() * 2,
                size: Math.random() * 2.5,
            });
        }

        let animationFrameId: number;

        const render = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ffffff';

            particles.forEach((p) => {
                p.angle += 0.02;
                p.distance -= p.speed;

                if (p.distance < 10) {
                    p.distance = canvas.width / 1.5;
                    p.angle = Math.random() * 2 * Math.PI;
                }

                const x = centerX + Math.cos(p.angle) * p.distance;
                const y = centerY + Math.sin(p.angle) * p.distance;

                ctx.beginPath();
                ctx.arc(x, y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full absolute inset-0 bg-black"
        />
    );
}
