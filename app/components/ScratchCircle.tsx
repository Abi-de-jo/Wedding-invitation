"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ScratchCircleProps {
  text: string;
  onDone: () => void;
}

function ScratchCircle({ text, onDone }: ScratchCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const doneRef = useRef(false);
  const animationRef = useRef<number | null>(null);
  const [done, setDone] = useState(false);

  const size = 300;
  const brush = 38;

   const drawCoin = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, size, size);
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2;

     const base = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    base.addColorStop(0, "#ffef73");
    base.addColorStop(0.2, "#ffe787");
    base.addColorStop(0.45, "#ffd968");
    base.addColorStop(0.7, "#f1ca5d");
    base.addColorStop(1, "#f5d78d");

    ctx.fillStyle = base;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Radial brushed metal effect
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    for (let i = 0; i < 240; i++) {
      const angle = (i / 240) * Math.PI * 2;
      const alpha = i % 4 === 0 ? 0.2 : i % 2 === 0 ? 0.1 : 0.05;
      ctx.strokeStyle = `rgba(255, 235, 120, ${alpha})`;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      ctx.stroke();
    }

     for (let i = 1; i <= 14; i++) {
      const radius = (r / 14) * i;
      const alpha = 0.08 + (i / 14) * 0.1;
      ctx.strokeStyle = `rgba(100, 65, 10, ${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

     const shine = ctx.createRadialGradient(cx * 0.6, cy * 0.45, 0, cx * 0.6, cy * 0.45, r * 0.6);
    shine.addColorStop(0, "rgba(255, 250, 210, 0.6)");
    shine.addColorStop(0.5, "rgba(255, 240, 150, 0.15)");
    shine.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = shine;
    ctx.fillRect(0, 0, size, size);
    ctx.restore();

     ctx.beginPath();
    ctx.arc(cx, cy, r - 1.5, 0, Math.PI * 2);
    const rim = ctx.createLinearGradient(0, 0, size, size);
    rim.addColorStop(0, "rgb(232, 225, 225)");
    rim.addColorStop(0.6, "rgb(234, 232, 228)");
    rim.addColorStop(1, "rgb(254, 254, 254)");
    ctx.strokeStyle = rim;
    ctx.lineWidth = 5;
    ctx.stroke();

     ctx.globalCompositeOperation = "destination-out";
  }, [size]);

   const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || doneRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const data = ctx.getImageData(0, 0, size, size).data;
    let cleared = 0;
    const step = 12;  

    for (let i = 3; i < data.length; i += step * 4) {
      if (data[i] === 0) cleared++;
    }

    const totalSamples = data.length / (step * 4);
    if (cleared / totalSamples > 0.55) {
      doneRef.current = true;
      setDone(true);
      onDone();
    }
  }, [size, onDone]);

  // Scratch effect with brush
  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || doneRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    // Draw brush stroke
    ctx.beginPath();
    ctx.arc(x, y, brush, 0, Math.PI * 2);
    ctx.fill();

    // Add subtle random noise for realistic scratch texture
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = brush * (0.3 + Math.random() * 0.7);
      const xOff = Math.cos(angle) * radius;
      const yOff = Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.arc(x + xOff, y + yOff, brush * 0.25, 0, Math.PI * 2);
      ctx.fill();
    }

    if (animationRef.current === null) {
      animationRef.current = requestAnimationFrame(() => {
        checkProgress();
        animationRef.current = null;
      });
    }
  }, [brush, checkProgress]);

  // Event handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawCoin(ctx);

    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();
      drawingRef.current = true;
      scratch(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!drawingRef.current) return;
      e.preventDefault();
      scratch(e.clientX, e.clientY);
    };

    const handlePointerUp = () => {
      drawingRef.current = false;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [drawCoin, scratch]);

  return (
    <div
      className="relative select-none rounded-full"
      style={{
        width: "clamp(110px, 28vw, 150px)",
        height: "clamp(110px, 28vw, 150px)",
        boxShadow: "0 12px 28px -8px rgb(251, 245, 236), inset 0 1px 2px rgba(255, 245, 180, 0.6)",
        borderRadius: "50%",
      }}
    >
      {/* Revealed text underneath */}
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-amber-50">
        <span
          className="font-bold text-amber-900 drop-shadow-sm"
          style={{
            fontFamily: "'Handlee', cursive",
            fontSize: "clamp(1.3rem, 6vw, 2rem)",
          }}
        >
          {text}
        </span>
      </div>

      {/* Scratchable coin layer */}
      {!done && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full rounded-full"
          style={{ touchAction: "none", display: "block" }}
        />
      )}

      {/* Completion glow effect */}
      {done && (
        <div
          className="absolute inset-0   rounded-full"
          style={{
            boxShadow: "0 0 0 4px rgb(254, 253, 250)), 0 0 20px 4px rgba(253, 251, 246, 0.97)",
          }}
        />
      )}
    </div>
  );
}

// Graffiti particles component
function GraffitiEffect({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    size: number; color: string; alpha: number;
  }>>([]);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

 

    particlesRef.current = [];
    let frame = 0;

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allDead = true;
      for (const p of particlesRef.current) {
        if (p.alpha > 0.02) allDead = false;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // gravity
        p.alpha *= 0.97;
        p.size *= 0.98;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgb(239, 237, 232))";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw additional splash text
      if (frame < 30) {
        ctx.save();
        ctx.font = `bold ${Math.min(48, frame * 2)}px "Handlee", cursive`;
        ctx.fillStyle = `rgba(230, 180, 34, ${1 - frame / 40})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "gold";
        ctx.textAlign = "center";
        ctx.fillText("✨ SCRATCHED! ✨", canvas.width / 2, canvas.height / 2 - 50);
        ctx.fillText("🎉 3/3 COMPLETE 🎉", canvas.width / 2, canvas.height / 2 + 30);
        ctx.restore();
      }

      frame++;

      if (!allDead && frame < 90) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationRef.current!);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ position: "fixed", top: 0, left: 0 }}
    />
  );
}

// Simple confetti effect
function triggerConfetti() {
  if (typeof window === 'undefined') return;
  
  const colors = ['#452829', '#452829', '#452829', '#452829', '#452829', '#452829', '#452829', '#452829', '#452829'];
  
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.cssText = `
      position: fixed;
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 10}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * window.innerWidth}px;
      top: -20px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events: none;
      z-index: 1000;
      animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
      opacity: ${Math.random() * 0.7 + 0.3};
    `;
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

export default function ScratchReveal({
  onAllScratched,
}: {
  onAllScratched?: () => void;
}) {
  const [scratchedCount, setScratchedCount] = useState(0);
  const [showGraffiti, setShowGraffiti] = useState(false);
  const totalCoins = 3;
  const allComplete = scratchedCount >= totalCoins;

  const handleCoinScratched = useCallback(() => {
    setScratchedCount((prev) => {
      const newCount = prev + 1;
      if (newCount === totalCoins) {
        // Trigger confetti immediately
        triggerConfetti();
        
        setTimeout(() => {
          setShowGraffiti(true);
          setTimeout(() => {
            onAllScratched?.();
          }, 800);
        }, 120);
      }
      return newCount;
    });
  }, [onAllScratched]);

  // Add CSS for confetti animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confettiFall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <GraffitiEffect active={showGraffiti} />
      <section className="flex min-h-screen flex-col items-center justify-center bg-[#f8f6f1] px-6 py-12">
        <div className="mb-12 text-center">
          <h2
            className="text-4xl font-bold text-[#5C2018] md:text-6xl"
            style={{ fontFamily: "'Handlee', cursive" }}
          >
            Reveal
          </h2>
          <p
            className="mt-3 text-sm uppercase tracking-[0.3em] text-[#5C2018]/70"
            style={{ fontFamily: "'Handlee', cursive" }}
          >
            Scratch each golden coin
          </p>
        </div>

        <div className="flex justify-center gap-8 md:gap-12">
          <ScratchCircle text="18" onDone={handleCoinScratched} />
          <ScratchCircle text="May" onDone={handleCoinScratched} />
          <ScratchCircle text="2026" onDone={handleCoinScratched} />
        </div>

        <div className="mt-12 text-center">
          <p
            className="text-xl font-bold text-[#5C2018]/80"
            style={{ fontFamily: "'Handlee', cursive" }}
          >
            {allComplete
              ? "🎉 We are getting married! 🎉"
              : `Scratch each disc · ${scratchedCount}/${totalCoins} completed`}
          </p>
        </div>
      </section>
    </>
  );
}