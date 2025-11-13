"use client";
import React, { useRef, useEffect, useCallback } from "react";

interface SpiralProps {
  spiralColor: string;
  defaultDistortion?: number;
  hoverDistortion?: number;
  clickDistortion?: number;
  strokeWidth?: number;
  onHover?: (isHovering: boolean) => void;
}

const Spiral: React.FC<SpiralProps> = ({
  spiralColor,
  defaultDistortion = 0.8,
  hoverDistortion = 1.5,
  clickDistortion = 3.5,
  strokeWidth = 2,
  onHover,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({
    ctx: null as CanvasRenderingContext2D | null,
    width: 0,
    height: 0,
    time: 0,
    animationFrameId: null as number | null,
    mouseX: 0,
    mouseY: 0,
    cursorX: 0,
    cursorY: 0,
    cursorVelX: 0,
    cursorVelY: 0,
    isMouseHovering: false,
    isMouseDown: false,
  });

  const cursorSpring = 0.3;
  const cursorFriction = 0.8;
  const spiralDensity = 6;
  const animationSpeed = 0.5;
  const tendrilCount = 3;

  const getCurrentDistortion = useCallback(() => {
    if (stateRef.current.isMouseDown) return clickDistortion;
    if (stateRef.current.isMouseHovering) return hoverDistortion;
    return defaultDistortion;
  }, [defaultDistortion, hoverDistortion, clickDistortion]);

  const drawSpiral = (
    centerX: number,
    centerY: number,
    radius: number,
    density: number,
    distortion: number,
    rotation: number,
    color: string,
    baseLineWidth: number,
  ) => {
    if (!stateRef.current.ctx) return;
    const { ctx } = stateRef.current;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = baseLineWidth;

    const maxRadius = radius;
    const angleStep = 0.05;

    for (let angle = 0; angle < Math.PI * 2 * density; angle += angleStep) {
      const currentRadius = (angle / (Math.PI * 2 * density)) * maxRadius;
      const distortedAngle =
        angle +
        Math.sin(angle * 3 + stateRef.current.time * 0.2) * distortion * 0.1 +
        Math.cos(angle * 2 + stateRef.current.time * 0.1) * distortion * 0.05;

      const distortedRadius =
        currentRadius *
        (1 +
          Math.sin(angle * 5 + stateRef.current.time * 0.3) *
            distortion *
            0.03);

      const x = centerX + Math.cos(distortedAngle + rotation) * distortedRadius;
      const y = centerY + Math.sin(distortedAngle + rotation) * distortedRadius;

      if (angle === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.stroke();
  };

  const drawTendrils = useCallback(
    (
      centerX: number,
      centerY: number,
      count: number,
      timeVal: number,
      maxLength: number,
    ) => {
      if (!stateRef.current.ctx) return;
      const { ctx } = stateRef.current;
      const angleStep = (Math.PI * 2) / count;

      for (let i = 0; i < count; i++) {
        const baseAngle = i * angleStep + timeVal * 0.2;
        const length = maxLength * (0.5 + Math.sin(timeVal * 0.3 + i) * 0.5);

        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0)";
        ctx.lineWidth =
          strokeWidth * (1 + Math.sin(timeVal * 0.5 + i * 2) * 0.2);

        let x = centerX;
        let y = centerY;
        ctx.moveTo(x, y);

        const currentDistortion = getCurrentDistortion();
        for (let j = 0; j < length; j += 3) {
          const distortion = j * 0.02 * currentDistortion;
          const angle =
            baseAngle +
            Math.sin(j * 0.1 + timeVal * 0.5) * distortion +
            Math.cos(j * 0.05 + timeVal * 0.3) * distortion;

          x += Math.cos(angle) * 3;
          y += Math.sin(angle) * 3;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    },
    [strokeWidth, getCurrentDistortion],
  );

  const animateRef = useRef<(() => void) | null>(null);

  const animate = useCallback(() => {
    if (!stateRef.current.ctx || !canvasRef.current) return;
    stateRef.current.animationFrameId = requestAnimationFrame(() =>
      animateRef.current?.(),
    );
    stateRef.current.ctx.clearRect(
      0,
      0,
      stateRef.current.width,
      stateRef.current.height,
    );

    stateRef.current.time += 0.01 * animationSpeed;

    const dx = stateRef.current.mouseX - stateRef.current.cursorX;
    const dy = stateRef.current.mouseY - stateRef.current.cursorY;
    stateRef.current.cursorVelX += dx * cursorSpring;
    stateRef.current.cursorVelY += dy * cursorSpring;
    stateRef.current.cursorVelX *= cursorFriction;
    stateRef.current.cursorVelY *= cursorFriction;
    stateRef.current.cursorX += stateRef.current.cursorVelX;
    stateRef.current.cursorY += stateRef.current.cursorVelY;

    const centerX = stateRef.current.width / 2;
    const centerY = stateRef.current.height / 2;
    const cursorDistX =
      (stateRef.current.cursorX - centerX) / (stateRef.current.width / 2);
    const cursorDistY =
      (stateRef.current.cursorY - centerY) / (stateRef.current.height / 2);
    const cursorDist = Math.sqrt(
      cursorDistX * cursorDistX + cursorDistY * cursorDistY,
    );

    const mainRadius =
      Math.min(stateRef.current.width, stateRef.current.height) * 0.4;
    const mainDistortion = getCurrentDistortion() * (1 + cursorDist * 0.5);
    const mainRotation =
      stateRef.current.time * 0.1 + Math.atan2(cursorDistY, cursorDistX) * 0.2;

    for (let i = 0; i < 3; i++) {
      const radius = mainRadius * (0.6 + i * 0.2);
      const density = spiralDensity * (0.8 + i * 0.1);
      const rotation = mainRotation + (i * Math.PI) / 4;
      const alpha = 0.7 - i * 0.2;
      const color = `rgba(${spiralColor},${alpha.toFixed(2)})`;
      const lineWidth = strokeWidth * (1 - i * 0.25);

      drawSpiral(
        centerX,
        centerY,
        radius,
        density,
        mainDistortion,
        rotation,
        color,
        lineWidth,
      );
    }

    drawTendrils(
      stateRef.current.cursorX,
      stateRef.current.cursorY,
      tendrilCount,
      stateRef.current.time,
      100,
    );
  }, [
    spiralColor,
    strokeWidth,
    getCurrentDistortion,
    drawSpiral,
    drawTendrils,
  ]);

  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    stateRef.current.ctx = canvas.getContext("2d");
    const container = canvas.parentElement;

    const onResize = () => {
      if (!canvas || !stateRef.current.ctx) return;
      stateRef.current.width = canvas.clientWidth;
      stateRef.current.height = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = stateRef.current.width * dpr;
      canvas.height = stateRef.current.height * dpr;
      stateRef.current.ctx!.scale(dpr, dpr);

      stateRef.current.mouseX = stateRef.current.width / 2;
      stateRef.current.mouseY = stateRef.current.height / 2;
      stateRef.current.cursorX = stateRef.current.mouseX;
      stateRef.current.cursorY = stateRef.current.mouseY;
    };

    const onMouseEnter = () => {
      stateRef.current.isMouseHovering = true;
      onHover?.(true);
    };
    const onMouseLeave = () => {
      stateRef.current.isMouseHovering = false;
      stateRef.current.isMouseDown = false;
      onHover?.(false);
    };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouseX = e.clientX - rect.left;
      stateRef.current.mouseY = e.clientY - rect.top;
    };
    const onMouseDown = () => {
      if (stateRef.current.isMouseHovering) stateRef.current.isMouseDown = true;
    };
    const onMouseUp = () => {
      stateRef.current.isMouseDown = false;
    };

    onResize();
    if (container) {
      container.addEventListener("mouseenter", onMouseEnter);
      container.addEventListener("mouseleave", onMouseLeave);
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mousedown", onMouseDown);
      container.addEventListener("mouseup", onMouseUp);
    }
    window.addEventListener("resize", onResize);

    stateRef.current.animationFrameId = requestAnimationFrame(() =>
      animateRef.current?.(),
    );

    return () => {
      if (stateRef.current.animationFrameId)
        cancelAnimationFrame(stateRef.current.animationFrameId);
      window.removeEventListener("resize", onResize);
      if (container) {
        container.removeEventListener("mouseenter", onMouseEnter);
        container.removeEventListener("mouseleave", onMouseLeave);
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mousedown", onMouseDown);
        container.removeEventListener("mouseup", onMouseUp);
      }
    };
  }, [animate, onHover]);

  return (
    <div className="spiral-container">
      {/* Inline styles instead of external CSS */}
      <style jsx>{`
        .spiral-container {
          width: 100%;
          height: auto;
          position: relative;
          overflow: hidden;
          cursor: default;
          aspect-ratio: 1 / 1;
        }
        .spiral-canvas {
          width: 100%;
          height: 100%;
          display: block;
          user-select: none;
          -webkit-user-select: none;
        }
      `}</style>
      <canvas ref={canvasRef} className="spiral-canvas"></canvas>
    </div>
  );
};

export default Spiral;
