export const initialEffects = [
  {
    id: "marcelo-login-filaments",
    name: "Filamentos Quânticos (Canvas Marcelo Cabral)",
    category: "marcelo-cabral",
    categoryLabel: "Efeitos Marcelo Cabral",
    badge: "Marcelo Cabral",
    description: "Fundo em Canvas interativo com filamentos e partículas orgânicas que flutuam e se curvam dinamicamente na direção do ponteiro do mouse.",
    tags: ["Canvas", "WebGL/2D", "Hero", "Mouse Reactive", "Noir"],
    defaultSection: "Hero ou Fundo da Página de Captura",
    previewType: "canvas-filaments",
    tech: ["HTML5 Canvas", "Vanilla JS / React", "Performance Optimized"],
    frameworks: {
      react: `// Hook & Componente de Fundo com Filamentos Interativos
import React, { useEffect, useRef } from 'react';

export function FilamentBackground({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleResize = () => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const points = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 1.5 + 0.5,
    }));

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Linhas conectoras estilo filamento
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Atração suave ao mouse
        const dxMouse = mouse.x - p1.x;
        const dyMouse = mouse.y - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          p1.x += (dxMouse / distMouse) * 0.6;
          p1.y += (dyMouse / distMouse) * 0.6;
        }

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.25;
            ctx.strokeStyle = \`rgba(255, 255, 255, \${alpha})\`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Ponto de luz
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={\`pointer-events-none absolute inset-0 w-full h-full z-0 \${className}\`}
    />
  );
}`,
      tailwind: `<!-- Container com Canvas de Filamentos e Conteúdo Sobreposto -->
<div class="relative w-full min-h-[500px] bg-black overflow-hidden flex items-center justify-center">
  <canvas id="filament-canvas" class="absolute inset-0 w-full h-full pointer-events-none"></canvas>
  <div class="relative z-10 text-center max-w-2xl px-6">
    <span class="inline-block px-3 py-1 text-xs font-mono tracking-widest text-neutral-400 uppercase border border-neutral-800 rounded-full mb-4 bg-neutral-950/80">
      Tecnologia Noir
    </span>
    <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
      Interatividade de Alta Precisão
    </h1>
  </div>
</div>`
    }
  },
  {
    id: "glare-tilt-card",
    name: "Card Tilt 3D com Glare Radial (ReactBits)",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    badge: "ReactBits Preset",
    description: "Card com cálculo de rotação 3D baseado no cursor do mouse e efeito de brilho radial (glare) reflexivo em superfície de acrílico preto puro.",
    tags: ["3D Tilt", "Glare", "Micro-interaction", "Card", "Perspective"],
    defaultSection: "Cards de Benefícios ou Diferenciais",
    previewType: "glare-card",
    tech: ["CSS 3D Transforms", "Pointer Events", "Tailwind CSS"],
    frameworks: {
      react: `import React, { useRef, useState } from 'react';

export function GlareTiltCard({ title, desc, tag = "PREMIUM" }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotX, y: rotY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className="inline-block w-full max-w-sm"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: \`rotateX(\${rotate.x}deg) rotateY(\${rotate.y}deg)\`,
          transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative group overflow-hidden rounded-2xl bg-[#09090b] border border-white/10 p-7 shadow-2xl transition-all duration-300 hover:border-white/30"
      >
        {/* Camada de Glare Radial */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: \`radial-gradient(circle 260px at \${glare.x}% \${glare.y}%, rgba(255,255,255,0.4), transparent 80%)\`,
          }}
        />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
              {tag}
            </span>
            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
          <p className="text-sm text-neutral-400 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `<!-- HTML + CSS para Glare Tilt Card -->
<div class="perspective-[1000px] w-full max-w-sm">
  <div class="relative group rounded-2xl bg-neutral-950 border border-white/10 p-7 transition-all duration-300 hover:border-white/30 hover:-translate-y-1">
    <div class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    <div class="relative z-10">
      <span class="text-xs font-mono text-neutral-400 border border-white/10 px-2.5 py-1 rounded bg-white/5 uppercase">Destaque</span>
      <h3 class="text-xl font-bold text-white mt-4">Card de Alto Impacto</h3>
      <p class="text-sm text-neutral-400 mt-2">Profundidade 3D com reflexo acrílico puro.</p>
    </div>
  </div>
</div>`
    }
  },
  {
    id: "laser-border-beam",
    name: "Laser Border Beam (Borda Neon Noir)",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    badge: "Trending Noir",
    description: "Feixe de laser luminoso de alta intensidade contornando a borda perimétrica de um card preto de forma contínua e hipnótica.",
    tags: ["Border Animation", "Laser", "Glow", "CSS Keyframes", "Cyber"],
    defaultSection: "Card de Preços / Oferta Principal",
    previewType: "laser-border",
    tech: ["CSS conic-gradient", "Tailwind CSS", "Hardware-Accelerated"],
    frameworks: {
      react: `import React from 'react';

export function LaserBorderCard({ children, className = '' }) {
  return (
    <div className={\`relative p-[1px] overflow-hidden rounded-2xl bg-neutral-900 \${className}\`}>
      {/* Feixe giratório de luz */}
      <div 
        className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0 340deg, #ffffff 360deg)',
        }}
      />
      {/* Conteúdo interno com isolamento de fundo */}
      <div className="relative z-10 h-full w-full rounded-2xl bg-[#09090b] p-8 border border-white/5">
        {children || (
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Oferta Premium</span>
            <h4 className="text-2xl font-bold text-white">Acesso Total</h4>
            <p className="text-sm text-neutral-400">Contorno com laser fluido em 60fps sem sobrecarga de renderização.</p>
            <button className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors">
              Adquirir Agora
            </button>
          </div>
        )}
      </div>
    </div>
  );
}`,
      tailwind: `<!-- Card com Laser Border Beam via Tailwind -->
<div class="relative p-[1px] overflow-hidden rounded-2xl group">
  <div class="absolute inset-[-200%] animate-[spin_5s_linear_infinite] [background:conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] pointer-events-none"></div>
  <div class="relative z-10 rounded-2xl bg-black p-8 border border-white/10">
    <h3 class="text-xl font-bold text-white">Card com Borda Laser</h3>
    <p class="text-sm text-neutral-400 mt-2">Destaque luminoso perimétrico.</p>
  </div>
</div>`
    }
  },
  {
    id: "magnetic-shimmer-button",
    name: "Botão Magnético com Liquid Shimmer",
    category: "buttons-ctas",
    categoryLabel: "Botões & Ações",
    badge: "High Conversion",
    description: "Botão branco sólido com atração magnética suave ao cursor, reflexo de luz líquida passando internamente e feedback tátil de clique.",
    tags: ["Magnetic", "Shimmer", "Button", "High Conversion", "Tactile"],
    defaultSection: "Botão de Compra / CTA do Hero",
    previewType: "magnetic-button",
    tech: ["Pointer Physics", "CSS Gradient Shimmer", "Audio Feedback Ready"],
    frameworks: {
      react: `import React, { useRef, useState } from 'react';

export function MagneticShimmerButton({ label = "Garantir Vaga Agora", onClick }) {
  const btnRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    // Deslocamento magnético amortecido
    setOffset({ x: x * 0.28, y: y * 0.28 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: \`translate3d(\${offset.x}px, \${offset.y}px, 0)\`,
        transition: offset.x === 0 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
      }}
      className="relative group overflow-hidden px-8 py-4 rounded-xl bg-white text-black font-bold tracking-tight text-base shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_50px_rgba(255,255,255,0.45)] active:scale-95 transition-shadow cursor-pointer select-none"
    >
      {/* Feixe de Shimmer Líquido */}
      <span className="absolute inset-0 w-full h-full transform -translate-x-full group-hover:animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-black/15 to-transparent pointer-events-none" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {label}
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
    </button>
  );
}`,
      tailwind: `<!-- Botão Shimmer com Tailwind CSS -->
<button class="relative group overflow-hidden px-8 py-4 rounded-xl bg-white text-black font-bold tracking-tight text-base shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-95 transition-all">
  <span class="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 transition-transform bg-gradient-to-r from-transparent via-neutral-400/30 to-transparent"></span>
  <span class="relative z-10 flex items-center gap-2">
    Quero Me Inscrever Agora
    <span class="transition-transform group-hover:translate-x-1">→</span>
  </span>
</button>`
    }
  },
  {
    id: "infinite-marquee-rail",
    name: "Marquee Infinito de Prova Social (Marcelo Cabral)",
    category: "marcelo-cabral",
    categoryLabel: "Efeitos Marcelo Cabral",
    badge: "Marcelo Cabral",
    description: "Carrossel contínuo estilo ticker/rail com aceleração fluida, pausa ao posicionar o mouse e gradientes de fade-out nas bordas esquerda e direita.",
    tags: ["Marquee", "Social Proof", "Testimonials", "Smooth Rail", "Infinite"],
    defaultSection: "Seção de Depoimentos ou Prova Social",
    previewType: "marquee-rail",
    tech: ["CSS Transform Animation", "GPU-Optimized", "Tailwind CSS"],
    frameworks: {
      react: `import React from 'react';

export function InfiniteMarquee({ items, speed = 25 }) {
  const defaultItems = [
    { name: "Mariana S.", result: "-14kg em 12 semanas", tag: "Aluna Verificada" },
    { name: "Carlos Eduardo", result: "Definição muscular e disposição", tag: "Consultoria VIP" },
    { name: "Beatriz Lima", result: "Recuperei minha autoestima", tag: "Plano Anual" },
    { name: "Lucas Mendes", result: "+6kg de massa magra", tag: "Mentoria Elite" },
  ];

  const list = items || defaultItems;

  return (
    <div className="relative w-full overflow-hidden bg-black py-8">
      {/* Máscaras de Gradiente Noir nas Extremidades */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6">
        {[...list, ...list].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#09090b] px-6 py-4 shadow-lg transition-colors hover:border-white/30"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-bold text-sm">
              {item.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-sm">{item.name}</span>
                <span className="text-[10px] font-mono uppercase text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  {item.tag}
                </span>
              </div>
              <p className="text-xs text-neutral-300 mt-0.5">{item.result}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      tailwind: `<!-- Marquee Infinito com Tailwind CSS -->
<div class="relative w-full overflow-hidden bg-black py-6">
  <div class="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-black to-transparent"></div>
  <div class="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-black to-transparent"></div>
  <div class="flex w-max animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused] gap-6">
    <!-- Repita os cards aqui -->
    <div class="rounded-xl border border-white/10 bg-neutral-950 px-6 py-4 text-white">Depoimento 1</div>
    <div class="rounded-xl border border-white/10 bg-neutral-950 px-6 py-4 text-white">Depoimento 2</div>
  </div>
</div>`
    }
  },
  {
    id: "cyber-text-scramble",
    name: "Cyber Text Scramble (Decodificação de Título)",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    badge: "Noir Signature",
    description: "Animação de decodificação de caracteres estilo terminal/hacker que embaralha glifos aleatórios e resolve as letras do título com precisão matemática.",
    tags: ["Typography", "Matrix Scramble", "Hacker", "Title Reveal", "Glitch"],
    defaultSection: "Título Principal do Hero (H1)",
    previewType: "text-scramble",
    tech: ["JavaScript String Shuffling", "RequestAnimationFrame", "Custom Hook"],
    frameworks: {
      react: `import React, { useState, useEffect } from 'react';

const CHARS = "ABCDEF0123456789!@#$%^&*()_+<>[]{}";

export function TextScramble({ text = "METODOLOGIA INOVADORA", autoStart = true }) {
  const [display, setDisplay] = useState(text);

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);
  };

  useEffect(() => {
    if (autoStart) scramble();
  }, [text]);

  return (
    <span
      onMouseEnter={scramble}
      className="inline-block font-mono font-extrabold tracking-tight text-white cursor-pointer select-none"
    >
      {display}
    </span>
  );
}`,
      tailwind: `<!-- Texto com Efeito de Scramble (gatilho via JS) -->
<h1 id="scramble-title" class="font-mono text-4xl md:text-6xl font-extrabold text-white tracking-tight">
  METODOLOGIA INOVADORA
</h1>`
    }
  },
  {
    id: "dot-surface-spotlight",
    name: "Superfície de Pontos com Spotlight Reveal (Marcelo Cabral)",
    category: "marcelo-cabral",
    categoryLabel: "Efeitos Marcelo Cabral",
    badge: "Marcelo Cabral",
    description: "Malha sutil de micro-pontos brancos em fundo preto absoluto que se acendem dinamicamente sob a posição do mouse criando um cone de iluminação.",
    tags: ["Dot Matrix", "Spotlight", "Cursor Light", "Background", "Grid"],
    defaultSection: "Fundo de Seção ou Divisor de Conteúdo",
    previewType: "dot-spotlight",
    tech: ["CSS Radial-Gradient Mask", "Mouse Coordinate Hook", "Tailwind CSS"],
    frameworks: {
      react: `import React, { useState } from 'react';

export function DotSpotlightSurface({ children }) {
  const [mousePos, setMousePos] = useState({ x: 200, y: 150 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[380px] bg-black overflow-hidden rounded-2xl border border-white/10 p-8"
    >
      {/* Camada Base de Pontos Suaves */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Camada Iluminada pelo Spotlight do Cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.95) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          maskImage: \`radial-gradient(circle 240px at \${mousePos.x}px \${mousePos.y}px, black, transparent)\`,
          WebkitMaskImage: \`radial-gradient(circle 240px at \${mousePos.x}px \${mousePos.y}px, black, transparent)\`,
        }}
      />
      <div className="relative z-10 max-w-lg">
        {children || (
          <div>
            <span className="text-xs font-mono uppercase text-neutral-400">Micro-interação</span>
            <h3 className="text-2xl font-bold text-white mt-2">Feixe de Revelação</h3>
            <p className="text-sm text-neutral-400 mt-2">Mova o cursor para revelar a densidade geométrica dos pontos em alta fidelidade.</p>
          </div>
        )}
      </div>
    </div>
  );
}`,
      tailwind: `<!-- Grid de Pontos com Spotlight em Tailwind -->
<div class="relative w-full h-80 bg-black overflow-hidden rounded-2xl border border-white/10 [background-image:radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:24px_24px]">
  <div class="relative z-10 p-8 text-white">Conteúdo do Card</div>
</div>`
    }
  },
  {
    id: "obsidian-floating-dock",
    name: "Obsidian Glass Floating Dock (Menu Flutuante)",
    category: "navigation",
    categoryLabel: "Modais & Menus",
    badge: "Apple Noir",
    description: "Menu de navegação em cápsula flutuante (dock) com efeito de vidro acrílico obsidian, desfoque de 24px, ampliação suave dos ícones e indicador ativo.",
    tags: ["Floating Nav", "Dock", "Glassmorphism", "Navigation", "Micro-interaction"],
    defaultSection: "Barra de Navegação Fixa / Floating Menu",
    previewType: "floating-dock",
    tech: ["Backdrop Blur", "Flexbox Spring Scaling", "Tailwind CSS"],
    frameworks: {
      react: `import React, { useState } from 'react';

export function FloatingDock({ items }) {
  const [active, setActive] = useState(0);

  const defaultItems = [
    { label: "Início", icon: "✦" },
    { label: "Método", icon: "◈" },
    { label: "Resultados", icon: "◉" },
    { label: "Preços", icon: "❖" },
    { label: "Contato", icon: "✉" },
  ];

  const navs = items || defaultItems;

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/80 px-4 py-2.5 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.06)]">
      {navs.map((item, idx) => (
        <button
          key={idx}
          onClick={() => setActive(idx)}
          className={\`group relative flex items-center justify-center rounded-full px-3.5 py-2 text-xs font-medium transition-all duration-300 \${
            active === idx
              ? 'bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
              : 'text-neutral-400 hover:text-white hover:bg-white/10'
          }\`}
        >
          <span className="mr-1.5 text-sm">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}`,
      tailwind: `<!-- Dock Flutuante em Tailwind CSS -->
<nav class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-black/75 px-4 py-2 backdrop-blur-xl shadow-2xl">
  <a href="#hero" class="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs">Início</a>
  <a href="#beneficios" class="px-4 py-2 rounded-full text-neutral-400 hover:text-white text-xs transition-colors">Benefícios</a>
  <a href="#oferta" class="px-4 py-2 rounded-full text-neutral-400 hover:text-white text-xs transition-colors">Garantir Vaga</a>
</nav>`
    }
  },
  {
    id: "starfield-warp-canvas",
    name: "Starfield Warp / Chuva de Meteoros",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    badge: "Cinematic Noir",
    description: "Animação de velocidade estelar com traços de luz branca de alta velocidade cortando a escuridão absoluta do Hero.",
    tags: ["Starfield", "Warp", "Meteors", "Hero Background", "Cinematic"],
    defaultSection: "Hero Principal / Fundo de Abertura",
    previewType: "starfield-canvas",
    tech: ["HTML5 Canvas 2D", "Perspective Projection", "Zero Dependencies"],
    frameworks: {
      react: `import React, { useEffect, useRef } from 'react';

export function StarfieldWarp() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const stars = Array.from({ length: 180 }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
    }));

    const render = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= 4.5;
        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 180 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.8, (1 - star.z / width) * 2.5);
          const alpha = (1 - star.z / width);
          ctx.fillStyle = \`rgba(255, 255, 255, \${alpha})\`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}`,
      tailwind: `<!-- Canvas Starfield para Fundo do Hero -->
<div class="relative w-full h-[600px] bg-black overflow-hidden flex items-center justify-center">
  <canvas id="starfield" class="absolute inset-0 w-full h-full pointer-events-none"></canvas>
  <div class="relative z-10 text-center text-white">
    <h1 class="text-5xl font-black tracking-tight">O Futuro Começa Agora</h1>
  </div>
</div>`
    }
  },
  {
    id: "silver-text-shimmer",
    name: "Liquid Silver Text Shimmer",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    badge: "High Contrast",
    description: "Tipografia com animação reflexiva de prata líquida, passando um brilho branco intenso da esquerda para a direita de forma contínua.",
    tags: ["Shimmer", "Typography", "Liquid Silver", "Headline", "Luxury"],
    defaultSection: "Subtítulo de Impacto ou Frase de Efeito",
    previewType: "text-shimmer",
    tech: ["CSS Background-Clip", "Animated Gradient Stops", "Tailwind CSS"],
    frameworks: {
      react: `export function SilverShimmerText({ children = "TRANSFORMAÇÃO COMPROVADA EM RESULTADOS" }) {
  return (
    <span className="inline-block font-extrabold tracking-tight text-transparent bg-clip-text animate-text-shimmer">
      {children}
    </span>
  );
}`,
      tailwind: `<!-- Texto com Efeito Prata Líquida via Tailwind -->
<h2 class="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-600 via-white to-neutral-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite]">
  CONSTRUA UMA NOVA REALIDADE
</h2>`
    }
  },
  {
    id: "radar-pulse-badge",
    name: "Pulse Radar CTA Badge",
    category: "buttons-ctas",
    categoryLabel: "Botões & Ações",
    badge: "Live Indicator",
    description: "Pílula de notificação com ping de radar luminoso em tempo real, indicando vagas ativas, status do servidor ou oferta por tempo limitado.",
    tags: ["Badge", "Radar Pulse", "Status Indicator", "Urgency", "Hero"],
    defaultSection: "Topo do Hero / Acima do H1",
    previewType: "radar-badge",
    tech: ["CSS Ring Ping", "Tailwind CSS", "Semantic HTML"],
    frameworks: {
      react: `export function RadarBadge({ text = "Turma de Novembro: 3 Vagas Restantes", live = true }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-neutral-950/80 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.06)]">
      <span className="relative flex h-2 w-2">
        {live && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        )}
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      <span className="font-mono text-xs font-semibold tracking-wide text-neutral-300">
        {text}
      </span>
    </div>
  );
}`,
      tailwind: `<!-- Badge de Radar em Tailwind CSS -->
<div class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black px-4 py-1.5">
  <span class="relative flex h-2 w-2">
    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
    <span class="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
  </span>
  <span class="text-xs font-mono font-medium text-white">Vagas Abertas</span>
</div>`
    }
  },
  {
    id: "faq-neon-accordion",
    name: "Acordeão FAQ Neon Noir",
    category: "navigation",
    categoryLabel: "Modais & Menus",
    badge: "UX Essential",
    description: "Lista de perguntas frequentes com abertura e fechamento suaves, barra lateral de luz branca ativada no item aberto e tipografia refinada.",
    tags: ["FAQ", "Accordion", "Smooth Transition", "Noir Border", "Accessible"],
    defaultSection: "Seção de Perguntas Frequentes (FAQ)",
    previewType: "faq-accordion",
    tech: ["Accessible ARIA", "CSS Grid Height Transition", "Tailwind CSS"],
    frameworks: {
      react: `import React, { useState } from 'react';

export function NoirFAQ({ items }) {
  const [openIdx, setOpenIdx] = useState(0);

  const defaultItems = [
    { q: "Como funciona o acesso imediato?", a: "Assim que a inscrição é confirmada, você recebe login e senha com acesso completo a todo o conteúdo e suporte exclusivo." },
    { q: "Qual a metodologia aplicada?", a: "Trabalhamos com periodização científica adaptada ao seu estilo de vida e objetivos individuais, sem enrolação." },
    { q: "Existe garantia incondicional?", a: "Sim, oferecemos 15 dias de garantia total. Se achar que não é para você, basta um clique para receber 100% de volta." },
  ];

  const list = items || defaultItems;

  return (
    <div className="w-full max-w-2xl space-y-3">
      {list.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className={\`group relative overflow-hidden rounded-xl border transition-all duration-300 \${
              isOpen ? 'border-white/40 bg-neutral-900/80 shadow-[0_0_20px_rgba(255,255,255,0.06)]' : 'border-white/10 bg-neutral-950/60 hover:border-white/20'
            }\`}
          >
            {/* Barra lateral de luz neon no item ativo */}
            {isOpen && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_#fff]" />}
            <button
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
              className="flex w-full items-center justify-between p-5 text-left font-semibold text-white tracking-tight"
            >
              <span>{item.q}</span>
              <span className={\`text-lg transition-transform duration-300 \${isOpen ? 'rotate-45 text-white' : 'text-neutral-500'}\`}>
                +
              </span>
            </button>
            <div
              className={\`grid transition-all duration-300 ease-in-out \${
                isOpen ? 'grid-rows-[1fr] opacity-100 px-5 pb-5' : 'grid-rows-[0fr] opacity-0 px-5 pb-0'
              }\`}
            >
              <div className="overflow-hidden text-sm text-neutral-400 leading-relaxed">
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}`,
      tailwind: `<!-- Item de FAQ com Tailwind CSS -->
<details class="group rounded-xl border border-white/10 bg-neutral-950 p-5 text-white open:border-white/40 transition-colors">
  <summary class="cursor-pointer font-semibold list-none flex justify-between items-center">
    <span>Pergunta Frequente</span>
    <span class="group-open:rotate-45 transition-transform">+</span>
  </summary>
  <p class="mt-3 text-sm text-neutral-400">Resposta clara e objetiva com suporte a transição fluida.</p>
</details>`
    }
  },
  {
    id: "before-after-slider",
    name: "Comparador Antes/Depois Interativo",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    badge: "High Proof",
    description: "Slider interativo de revelação comparativa entre imagem de 'Antes' e 'Depois' com divisor central arrastável de alto impacto visual.",
    tags: ["Before After", "Interactive Slider", "Proof", "Transformation", "Touch"],
    defaultSection: "Seção de Resultados ou Provas dos Alunos",
    previewType: "before-after",
    tech: ["Pointer Drag Events", "CSS Clip-Path", "Mobile Touch Friendly"],
    frameworks: {
      react: `import React, { useState, useRef } from 'react';

export function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      className="relative w-full max-w-lg h-72 rounded-2xl overflow-hidden select-none border border-white/15 bg-neutral-950 cursor-ew-resize"
    >
      {/* Imagem/Estado DEPOIS (fundo total) */}
      <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center p-6 text-center">
        <div>
          <span className="text-xs font-mono uppercase bg-white text-black px-2 py-0.5 rounded font-bold">DEPOIS</span>
          <p className="text-xl font-bold text-white mt-2">Corpo Definido & Alta Performance</p>
        </div>
      </div>

      {/* Imagem/Estado ANTES (cortado com clip-path) */}
      <div
        className="absolute inset-0 bg-neutral-950 flex items-center justify-center p-6 text-center border-r border-white"
        style={{ clipPath: \`polygon(0 0, \${sliderPos}% 0, \${sliderPos}% 100%, 0 100%)\` }}
      >
        <div>
          <span className="text-xs font-mono uppercase bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded font-bold">ANTES</span>
          <p className="text-xl font-bold text-neutral-400 mt-2">Fadiga Constante & Sem Foco</p>
        </div>
      </div>

      {/* Linha Divisória e Alça */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_#fff]"
        style={{ left: \`\${sliderPos}%\` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs shadow-[0_0_15px_rgba(255,255,255,0.6)]">
          ↔
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `<!-- Estrutura de Comparador com Tailwind -->
<div class="relative w-full h-64 rounded-2xl overflow-hidden border border-white/15 bg-neutral-950">
  <div class="absolute inset-0 flex items-center justify-center text-white">DEPOIS</div>
  <div class="absolute inset-0 flex items-center justify-center text-neutral-400 bg-neutral-900 w-1/2 border-r border-white">ANTES</div>
</div>`
    }
  }
];
