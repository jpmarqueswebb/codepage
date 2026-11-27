import React, { useState, useRef, useEffect } from 'react';
import { vivianePreviews } from './VivianePreviews';
import { vivianeVendasPreviews } from './VivianeVendasPreviews';
import { uromedPreviews } from './UromedPreviews';
import { dimasPreviews } from './DimasPreviews';
import { golgotaPreviews } from './GolgotaPreviews';
import { partiuProPreviews } from './PartiuProPreviews';
import { joaoPedroPreviews } from './JoaoPedroPreviews';
import { loopMaisRxPreviews } from './LoopMaisRxPreviews';
import { loopMaisLp4Previews } from './LoopMaisLp4Previews';
import { loopMaisAulaPreviews } from './LoopMaisAulaPreviews';
import { loopMaisSitePreviews } from './LoopMaisSitePreviews';
import { Sparkles, ArrowRight, Check, Play, Eye } from 'lucide-react';

export function EffectPreview({ effect, interactive = true }) {
  const type = effect.previewType;

  const Vivi = vivianePreviews[type] || vivianeVendasPreviews[type] || uromedPreviews[type] || dimasPreviews[type] || golgotaPreviews[type] || partiuProPreviews[type] || joaoPedroPreviews[type] || loopMaisRxPreviews[type] || loopMaisLp4Previews[type] || loopMaisAulaPreviews[type] || loopMaisSitePreviews[type];
  if (Vivi) return <Vivi />;

  // --- 1. Canvas Filaments (Marcelo Cabral) ---
  if (type === 'canvas-filaments') {
    return <FilamentsPreview />;
  }

  // --- 2. Glare Tilt Card ---
  if (type === 'glare-card') {
    return <GlareCardPreview />;
  }

  // --- 3. Laser Border Beam ---
  if (type === 'laser-border') {
    return <LaserBorderPreview />;
  }

  // --- 4. Magnetic Shimmer Button ---
  if (type === 'magnetic-button') {
    return <MagneticButtonPreview />;
  }

  // --- 5. Marquee Rail ---
  if (type === 'marquee-rail') {
    return <MarqueePreview />;
  }

  // --- 6. Text Scramble Reveal ---
  if (type === 'text-scramble') {
    return <TextScramblePreview />;
  }

  // --- 7. Dot Surface Spotlight ---
  if (type === 'dot-spotlight') {
    return <DotSpotlightPreview />;
  }

  // --- 8. Floating Dock ---
  if (type === 'floating-dock') {
    return <FloatingDockPreview />;
  }

  // --- 9. Starfield Canvas ---
  if (type === 'starfield-canvas') {
    return <StarfieldPreview />;
  }

  // --- 10. Text Shimmer ---
  if (type === 'text-shimmer') {
    return <TextShimmerPreview />;
  }

  // --- 11. Radar Badge ---
  if (type === 'radar-badge') {
    return <RadarBadgePreview />;
  }

  // --- 12. FAQ Accordion ---
  if (type === 'faq-accordion') {
    return <FaqAccordionPreview />;
  }

  // --- 13. Before/After Slider ---
  if (type === 'before-after') {
    return <BeforeAfterPreview />;
  }

  // Default fallback preview
  return (
    <div className="relative w-full h-44 flex items-center justify-center bg-black rounded-xl border border-white/10 p-4">
      <div className="text-center">
        <Sparkles className="w-6 h-6 text-white mx-auto mb-2 animate-pulse" />
        <span className="text-xs font-mono text-neutral-400">Preview Interativo</span>
      </div>
    </div>
  );
}

// Mini Canvas Filaments
function FilamentsPreview() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let w = (canvas.width = canvas.parentElement.offsetWidth || 300);
    let h = (canvas.height = canvas.parentElement.offsetHeight || 176);

    const mouse = { x: w / 2, y: h / 2 };
    const points = Array.from({ length: 22 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
    }));

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', onMove);

    const render = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse pull
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x += (dx / dist) * 0.4;
          p.y += (dy / dist) * 0.4;
        }

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 70) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - d / 70) * 0.35})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      frameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      canvas.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="relative w-full h-44 overflow-hidden rounded-xl bg-black border border-white/10 group">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
      <div className="absolute bottom-2.5 left-3 pointer-events-none z-10 flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        Passe o mouse no canvas
      </div>
    </div>
  );
}

// 3D Tilt Card Preview
function GlareCardPreview() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -((y - rect.height / 2) / (rect.height / 2)) * 14;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 14;
    setRotate({ x: rx, y: ry });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.4 });
  };

  const handleLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare(g => ({ ...g, opacity: 0 }));
  };

  return (
    <div 
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-full h-44 flex items-center justify-center bg-black rounded-xl border border-white/10 p-3 [perspective:800px] cursor-pointer overflow-hidden"
    >
      <div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative w-full max-w-[240px] rounded-xl bg-neutral-900/90 border border-white/20 p-4 shadow-xl overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 120px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.6), transparent 80%)`,
          }}
        />
        <div className="relative z-10 flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">3D TILT</span>
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
        </div>
        <p className="text-xs font-bold text-white tracking-tight">Reflexo Acrílico Puro</p>
        <p className="text-[11px] text-neutral-400 mt-1">Interaja inclinando o ponteiro.</p>
      </div>
    </div>
  );
}

// Laser Border Preview
function LaserBorderPreview() {
  return (
    <div className="relative w-full h-44 flex items-center justify-center bg-black rounded-xl border border-white/10 p-4 overflow-hidden">
      <div className="relative p-[1.5px] overflow-hidden rounded-xl w-full max-w-[240px] shadow-2xl">
        <div 
          className="absolute inset-[-150%] animate-[spin_3.5s_linear_infinite] pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0 330deg, #ffffff 360deg)',
          }}
        />
        <div className="relative z-10 rounded-xl bg-[#08080a] p-4 text-center border border-white/10">
          <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">LASER BEAM</span>
          <p className="text-xs font-bold text-white mt-1">Borda Neon Contínua</p>
          <div className="mt-2.5 mx-auto h-1 w-12 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}

// Magnetic Button Preview
function MagneticButtonPreview() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * 0.35, y: y * 0.35 });
  };

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 800);
  };

  return (
    <div 
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="relative w-full h-44 flex flex-col items-center justify-center bg-black rounded-xl border border-white/10 p-4"
    >
      <button
        onClick={handleClick}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: offset.x === 0 ? 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' : 'none',
        }}
        className="relative group overflow-hidden px-5 py-2.5 rounded-lg bg-white text-black font-bold text-xs tracking-tight shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)] active:scale-95 transition-shadow cursor-pointer"
      >
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 transition-transform bg-gradient-to-r from-transparent via-neutral-300/40 to-transparent pointer-events-none" />
        <span className="relative z-10 flex items-center gap-1.5">
          {clicked ? <Check className="w-3.5 h-3.5 text-black" /> : null}
          {clicked ? "Ação Disparada!" : "Garantir Vaga"}
          {!clicked && <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />}
        </span>
      </button>
      <span className="text-[10px] font-mono text-neutral-500 mt-3">Aproxime o mouse (efeito magnético)</span>
    </div>
  );
}

// Marquee Rail Preview
function MarqueePreview() {
  const items = ["Mariana S. (-14kg)", "Carlos E. (+6kg)", "Beatriz L. (Definição)", "Lucas M. (Consultoria VIP)"];

  return (
    <div className="relative w-full h-44 flex flex-col justify-center bg-black rounded-xl border border-white/10 overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-black to-transparent" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-3 px-2">
        {[...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-white/10 bg-neutral-900/90 px-3.5 py-2 text-xs text-white shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
            <span className="font-medium">{text}</span>
          </div>
        ))}
      </div>
      <span className="text-center text-[10px] font-mono text-neutral-500 mt-4">Loop infinito em 60fps • Pare no hover</span>
    </div>
  );
}

// Text Scramble Preview
function TextScramblePreview() {
  const original = "NOIR ALTA PERFORMANCE";
  const [text, setText] = useState(original);
  const chars = "ABCDEF0123456789!@#$%^&*()_+<>";

  const trigger = () => {
    let iter = 0;
    const interval = setInterval(() => {
      setText(
        original
          .split("")
          .map((c, idx) => {
            if (idx < iter) return original[idx];
            if (c === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iter >= original.length) clearInterval(interval);
      iter += 1 / 2;
    }, 28);
  };

  return (
    <div 
      onMouseEnter={trigger}
      className="relative w-full h-44 flex flex-col items-center justify-center bg-black rounded-xl border border-white/10 p-4 cursor-pointer group"
    >
      <div className="text-center space-y-1">
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Passe o cursor</span>
        <p className="font-mono text-base font-extrabold text-white tracking-wider bg-white/5 border border-white/10 px-4 py-2 rounded-lg group-hover:border-white/30 transition-colors">
          {text}
        </p>
      </div>
    </div>
  );
}

// Dot Spotlight Preview
function DotSpotlightPreview() {
  const [pos, setPos] = useState({ x: 120, y: 70 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMove}
      className="relative w-full h-44 bg-black rounded-xl border border-white/10 overflow-hidden flex items-center justify-center cursor-none"
    >
      {/* Background Dots */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />
      {/* Spotlight Mask */}
      <div
        className="absolute inset-0 transition-opacity duration-150"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
          maskImage: `radial-gradient(circle 90px at ${pos.x}px ${pos.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(circle 90px at ${pos.x}px ${pos.y}px, black, transparent)`,
        }}
      />
      <div className="relative z-10 pointer-events-none text-center">
        <span className="text-xs font-bold text-white bg-black/70 px-3 py-1 rounded border border-white/15 backdrop-blur-sm">
          Spotlight Revelado
        </span>
      </div>
    </div>
  );
}

// Floating Dock Preview
function FloatingDockPreview() {
  const [active, setActive] = useState(0);
  const tabs = ["Hero", "Provas", "Oferta", "FAQ"];

  return (
    <div className="relative w-full h-44 flex items-center justify-center bg-black rounded-xl border border-white/10 p-4">
      <div className="flex items-center gap-1 rounded-full border border-white/15 bg-neutral-950/80 p-1.5 backdrop-blur-xl shadow-xl">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
              active === idx
                ? 'bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

// Starfield Canvas Preview
function StarfieldPreview() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let w = (canvas.width = canvas.parentElement.offsetWidth || 300);
    let h = (canvas.height = canvas.parentElement.offsetHeight || 176);

    const stars = Array.from({ length: 80 }, () => ({
      x: (Math.random() - 0.5) * w * 2,
      y: (Math.random() - 0.5) * h * 2,
      z: Math.random() * w,
    }));

    const render = () => {
      ctx.fillStyle = '#020202';
      ctx.fillRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.z -= 3;
        if (s.z <= 0) {
          s.z = w;
          s.x = (Math.random() - 0.5) * w * 2;
          s.y = (Math.random() - 0.5) * h * 2;
        }

        const k = 100 / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;

        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          const alpha = 1 - s.z / w;
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.6, alpha * 2), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative w-full h-44 bg-black rounded-xl border border-white/10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[11px] font-mono tracking-widest text-white/90 bg-black/60 px-2.5 py-1 rounded border border-white/10 backdrop-blur-sm">
          STARFIELD WARP
        </span>
      </div>
    </div>
  );
}

// Text Shimmer Preview
function TextShimmerPreview() {
  return (
    <div className="relative w-full h-44 flex items-center justify-center bg-black rounded-xl border border-white/10 p-4">
      <h3 className="text-xl md:text-2xl font-black tracking-tight animate-text-shimmer text-center">
        TRANSFORMAÇÃO NOIR
      </h3>
    </div>
  );
}

// Radar Badge Preview
function RadarBadgePreview() {
  return (
    <div className="relative w-full h-44 flex flex-col items-center justify-center bg-black rounded-xl border border-white/10 p-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-neutral-950 px-4 py-1.5 shadow-[0_0_20px_rgba(255,255,255,0.08)]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="font-mono text-xs font-semibold text-neutral-200">
          Últimas 3 Vagas Disponíveis
        </span>
      </div>
      <span className="text-[10px] font-mono text-neutral-500 mt-3">Indicador pulsante de urgência</span>
    </div>
  );
}

// FAQ Accordion Preview
function FaqAccordionPreview() {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative w-full h-44 flex items-center justify-center bg-black rounded-xl border border-white/10 p-4">
      <div className="w-full max-w-[260px] rounded-lg border border-white/20 bg-neutral-900/80 p-3 shadow-lg">
        <button 
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between text-left text-xs font-bold text-white"
        >
          <span>Acesso imediato?</span>
          <span className={`transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
        </button>
        {open && (
          <p className="mt-2 text-[11px] text-neutral-400 leading-relaxed border-t border-white/10 pt-2">
            Sim, login liberado imediatamente após a confirmação.
          </p>
        )}
      </div>
    </div>
  );
}

// Before/After Slider Preview
function BeforeAfterPreview() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      className="relative w-full h-44 bg-neutral-950 rounded-xl border border-white/10 overflow-hidden select-none cursor-ew-resize flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
        <span className="text-xs font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded border border-white/10">DEPOIS (+6kg)</span>
      </div>
      <div 
        className="absolute inset-0 bg-black flex items-center justify-center border-r border-white"
        style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }}
      >
        <span className="text-xs font-mono font-bold text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-white/10">ANTES</span>
      </div>
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_#fff]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white text-black font-bold flex items-center justify-center text-[10px] shadow-lg">
          ↔
        </div>
      </div>
    </div>
  );
}
