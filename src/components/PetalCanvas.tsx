import React, { useEffect, useRef } from 'react';
import {
  PETAL_COLORS,
  Petal,
  calculateWindFromPointer,
  createRandomPetal,
  updatePetalPosition,
} from '../utils/petalPhysics';

interface PetalCanvasProps {
  petalDensity?: 'low' | 'medium' | 'high';
}

export const PetalCanvas: React.FC<PetalCanvasProps> = ({ petalDensity = 'medium' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const pointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const windVelocityRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Density mapping - rich and lively
  const countMap: Record<string, number> = {
    low: 28,
    medium: 48,
    high: 72,
  };
  const count = countMap[petalDensity] || 48;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize petals across the screen
    petalsRef.current = Array.from({ length: count }, (_, index) =>
      createRandomPetal(index, width, height, false)
    );

    // Track mouse/touch for interactive breeze
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      windVelocityRef.current = calculateWindFromPointer(
        clientX,
        clientY,
        pointerPosRef.current.x,
        width
      );
      pointerPosRef.current = { x: clientX, y: clientY };
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Decay interactive wind back to calm
      windVelocityRef.current *= 0.94;

      const currentPetals = petalsRef.current;
      for (let i = 0; i < currentPetals.length; i++) {
        const petal = updatePetalPosition(
          currentPetals[i],
          width,
          height,
          windVelocityRef.current
        );
        currentPetals[i] = petal;
        const colors = PETAL_COLORS[petal.colorType];

        ctx.save();
        ctx.globalAlpha = petal.opacity;
        ctx.translate(petal.x, petal.y);
        ctx.rotate((petal.rotation * Math.PI) / 180);

        // 3D perspective squish based on oscillation
        const scaleX = Math.cos((petal.flip * Math.PI) / 180);
        ctx.scale(scaleX, 1);

        // Draw organic curved petal
        ctx.beginPath();
        ctx.fillStyle = colors.primary;
        ctx.shadowColor = colors.shadow;
        ctx.shadowBlur = 6;

        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          petal.size * 0.45,
          -petal.size * 0.75,
          petal.size * 1.05,
          -petal.size * 0.4,
          petal.size * 0.95,
          petal.size * 0.5
        );
        ctx.bezierCurveTo(
          petal.size * 0.85,
          petal.size * 1.1,
          petal.size * 0.2,
          petal.size * 1.0,
          0,
          0
        );

        ctx.fill();

        // Delicate inner vein highlight for realism
        ctx.beginPath();
        ctx.strokeStyle = colors.highlight;
        ctx.lineWidth = 1;
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(
          petal.size * 0.4,
          petal.size * 0.1,
          petal.size * 0.7,
          petal.size * 0.4
        );
        ctx.stroke();

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 select-none"
      aria-hidden="true"
    />
  );
};
