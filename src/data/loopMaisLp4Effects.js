// Efeitos extraídos da LP4 Benefícios Corporativos da Loop+ (pasta "LoopMais/lp4-beneficios-corporativos", widget lp4-widget.html)
// Paleta original: branco com faixas roxas em degradê radial (#76058f > #43096a > #220b52 > #1a0638), laranja #fc5304 (degradê até #ff7a33),
// laranja claro #ffb48a, texto #1d1d1d / #5d5866, linha #e7e0ef, fundo suave #f7f4fb. Fontes: Baloo 2 Bold (títulos) e Montserrat (corpo).
const B = { client: "Loop+", badge: "Loop+" };

export const loopMaisLp4Effects = [
  // 1 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-loop-arrow-button",
    name: "Botão com Seta que Dá uma Volta e Anel no Contorno",
    category: "botoes",
    categoryLabel: "Botões & CTAs",
    description: "No hover a seta do botão dá uma volta completa (o 'loop' da marca) presa num ponto acima dela, o fundo escurece um tom e um anel fino percorre todo o contorno do botão, a 6px de distância. Ao enviar, a mesma seta vira um ícone girando de carregamento.",
    tags: ["Arrow Loop", "Stroke Ring", "Hover", "Loading State"],
    defaultSection: "Hero Principal",
    previewType: "lm4-loop-btn",
    tech: ["Tailwind CSS", "React", "SVG pathLength"],
    frameworks: {
      react: `// O anel usa pathLength="1": dasharray 1 e dashoffset 1 = escondido; dashoffset 0 = desenhado inteiro.
const CSS = '@keyframes lp4Loop{to{transform:rotate(360deg)}}' +
  '.lp4-btn:hover .lp4-arr,.lp4-btn:focus-visible .lp4-arr{animation:lp4Loop .9s cubic-bezier(.22,1,.36,1)}' +
  '.lp4-btn:hover .lp4-ring,.lp4-btn:focus-visible .lp4-ring{stroke-dashoffset:0}' +
  '.lp4-btn.is-loading .lp4-arr{animation:lp4Loop .9s linear infinite;transform-origin:50% 50%}' +
  '@media (prefers-reduced-motion:reduce){.lp4-btn .lp4-arr{animation:none!important}}';

export function LoopArrowButton({ children = 'Quero conhecer', loading = false, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className={'lp4-btn group relative isolate inline-flex h-14 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#fc5304_0%,#ff7a33_100%)] pl-[30px] pr-[26px] font-["Baloo_2",sans-serif] text-[17px] font-bold leading-none text-white transition-transform duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] active:scale-[.97] focus-visible:outline-none ' + (loading ? 'is-loading' : '')}>
      <style>{CSS}</style>
      {/* tom mais escuro que aparece no hover */}
      <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(135deg,#e04600_0%,#fc5304_100%)] opacity-0 transition-opacity duration-[450ms] group-hover:opacity-100 group-focus-visible:opacity-100" />
      <span className="relative">{children}</span>
      <span className="relative grid h-[22px] w-[22px] place-items-center">
        {/* o eixo da volta fica acima da seta (transform-origin 50% -40%) */}
        <svg className="lp4-arr h-5 w-5 [transform-origin:50%_-40%]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
      <svg className="pointer-events-none absolute -inset-1.5 h-[calc(100%+12px)] w-[calc(100%+12px)]" aria-hidden="true">
        <rect className="lp4-ring transition-[stroke-dashoffset] duration-900 ease-[cubic-bezier(.22,1,.36,1)]" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="34"
          fill="none" stroke="#fc5304" strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset="1" />
      </svg>
    </button>
  );
}`,
      tailwind: `<button type="button" class="lp4-btn group relative isolate inline-flex h-14 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#fc5304_0%,#ff7a33_100%)] pl-[30px] pr-[26px] font-['Baloo_2',sans-serif] text-[17px] font-bold leading-none text-white active:scale-[.97]">
  <span aria-hidden="true" class="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(135deg,#e04600_0%,#fc5304_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
  <span class="relative">Quero conhecer</span>
  <svg class="lp4-arr h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  <svg class="pointer-events-none absolute -inset-1.5 h-[calc(100%+12px)] w-[calc(100%+12px)]" aria-hidden="true">
    <rect class="lp4-ring" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="34" fill="none" stroke="#fc5304" stroke-width="2" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
  </svg>
</button>
<style>
  .lp4-arr{transform-origin:50% -40%}
  .lp4-ring{transition:stroke-dashoffset .9s cubic-bezier(.22,1,.36,1)}
  .lp4-btn:hover .lp4-arr,.lp4-btn:focus-visible .lp4-arr{animation:lp4Loop .9s cubic-bezier(.22,1,.36,1)}
  .lp4-btn:hover .lp4-ring,.lp4-btn:focus-visible .lp4-ring{stroke-dashoffset:0}
  @keyframes lp4Loop{to{transform:rotate(360deg)}}
  @media (prefers-reduced-motion:reduce){.lp4-arr{animation:none!important}}
</style>`,
    },
  },

  // 2 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-title-pen-strokes",
    name: "Traços de Caneta no Título (Rabisco, Assinatura e Círculo)",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "Um trecho do título ganha um traço feito à mão que se desenha, fica parado um tempo e some, em loop: rabisco ondulado embaixo, traço de assinatura mais solto ou um círculo de caneta em volta da palavra. Cada título usa um só, e o loop pausa quando o título sai da tela.",
    tags: ["Hand Drawn", "SVG Stroke", "Underline", "Circle", "Loop"],
    defaultSection: "Títulos de Seção",
    previewType: "lm4-pen",
    tech: ["Tailwind CSS", "React", "SVG pathLength", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const SHAPES = {
  scribble: { box: 'left-[-3%] bottom-[-.32em] w-[106%] h-[.42em]', vb: '0 0 200 20', d: 'M2 12 C 30 2, 60 2, 80 10 S 100 19, 100 10 S 120 1, 140 10 S 170 19, 198 8' },
  sign: { box: 'left-[-4%] bottom-[-.42em] w-[112%] h-[.62em]', vb: '0 0 200 24', d: 'M4 16 C 22 4, 30 22, 44 12 S 62 4, 70 14 S 86 22, 96 10 C 104 2, 112 20, 124 14 C 140 6, 160 18, 196 6' },
  circle: { box: 'left-[-9%] top-[-16%] w-[118%] h-[132%]', vb: '0 0 200 80', d: 'M120 6 C 60 2, 6 14, 6 40 C 6 66, 70 76, 120 72 C 172 68, 196 54, 194 36 C 192 16, 150 4, 96 8' },
};
const CSS = '@keyframes lp4Draw{0%{stroke-dashoffset:1;opacity:1}45%,82%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}' +
  '@media (prefers-reduced-motion:reduce){.lp4-pen path{animation:none!important;stroke-dashoffset:0!important}}';

// Uso: <h2>Benefícios que <PenStroke kind="scribble">fidelizam</PenStroke></h2>
export function PenStroke({ children, kind = 'scribble', color = '#fc5304' }) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting), { rootMargin: '60px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const s = SHAPES[kind];
  return (
    <span ref={ref} className="lp4-pen relative isolate inline-block whitespace-nowrap">
      <style>{CSS}</style>
      {children}
      <svg aria-hidden="true" viewBox={s.vb} preserveAspectRatio="none" className={'pointer-events-none absolute -z-10 max-w-none overflow-visible ' + s.box}>
        <path d={s.d} pathLength="1" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'lp4Draw 3.4s cubic-bezier(.22,1,.36,1) infinite', animationPlayState: run ? 'running' : 'paused' }} />
      </svg>
    </span>
  );
}`,
      tailwind: `<h2 class="font-['Baloo_2',sans-serif] text-4xl font-bold text-[#1d1d1d]">
  Benefícios que
  <span class="lp4-pen relative isolate inline-block whitespace-nowrap">fidelizam
    <svg aria-hidden="true" viewBox="0 0 200 20" preserveAspectRatio="none" class="pointer-events-none absolute bottom-[-.32em] left-[-3%] -z-10 h-[.42em] w-[106%] max-w-none overflow-visible">
      <path d="M2 12 C 30 2, 60 2, 80 10 S 100 19, 100 10 S 120 1, 140 10 S 170 19, 198 8" pathLength="1"/>
    </svg>
  </span>
</h2>
<style>
  .lp4-pen path{fill:none;stroke:#fc5304;stroke-width:3;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;animation:lp4Draw 3.4s cubic-bezier(.22,1,.36,1) infinite}
  @keyframes lp4Draw{0%{stroke-dashoffset:1;opacity:1}45%,82%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
  @media (prefers-reduced-motion:reduce){.lp4-pen path{animation:none;stroke-dashoffset:0}}
</style>
<!-- Assinatura: viewBox 0 0 200 24, caixa bottom-[-.42em] h-[.62em] w-[112%], d="M4 16 C 22 4, 30 22, 44 12 S 62 4, 70 14 S 86 22, 96 10 C 104 2, 112 20, 124 14 C 140 6, 160 18, 196 6"
     Círculo: viewBox 0 0 200 80, caixa top-[-16%] left-[-9%] w-[118%] h-[132%], d="M120 6 C 60 2, 6 14, 6 40 C 6 66, 70 76, 120 72 C 172 68, 196 54, 194 36 C 192 16, 150 4, 96 8" -->`,
    },
  },

  // 3 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-title-letter-loops",
    name: "Letras do Destaque em Loop (Onda, Degrau e Bagunça que se Arruma)",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "O trecho em destaque do título é quebrado em letras e cada uma anima com atraso próprio: em onda (sobe e desce em sequência), em degrau (sobe e fica um tempo lá em cima) ou bagunçada (cada letra começa torta e deslocada e se arruma no lugar). Leitor de tela lê a palavra inteira.",
    tags: ["Split Letters", "Wave", "Stagger", "Tidy Up", "Loop"],
    defaultSection: "Hero Principal",
    previewType: "lm4-letters",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `const CSS = '@keyframes lp4Wave{0%,45%,100%{transform:translateY(0)}18%{transform:translateY(-.2em)}}' +
  '@keyframes lp4Step{0%{transform:translateY(0)}10%,62%{transform:translateY(-.16em)}76%,100%{transform:translateY(0)}}' +
  '@keyframes lp4Tidy{0%,12%{transform:translateY(var(--y)) rotate(var(--r))}40%,84%{transform:none}100%{transform:translateY(var(--y)) rotate(var(--r))}}' +
  '@media (prefers-reduced-motion:reduce){.lp4-ch{animation:none!important;transform:none!important}}';
const ANIM = {
  wave: (i) => 'lp4Wave 2.6s cubic-bezier(.22,1,.36,1) ' + (i * 0.08) + 's infinite',
  step: (i) => 'lp4Step 3.6s cubic-bezier(.22,1,.36,1) ' + (i * 0.14) + 's infinite',
  tidy: () => 'lp4Tidy 4s cubic-bezier(.22,1,.36,1) infinite',
};

// Uso: <h1>Um clube com <LetterLoop kind="wave">a sua marca</LetterLoop></h1>
export function LetterLoop({ children, kind = 'wave', className = 'text-[#fc5304]' }) {
  const text = String(children);
  return (
    <span className={'inline-block whitespace-nowrap ' + className}>
      <style>{CSS}</style>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split('').map((c, i) => {
          // número pseudoaleatório fixo por letra: a bagunça é sempre a mesma em cada render
          const r = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
          return (
            <span key={i} className="lp4-ch inline-block"
              style={{ '--r': (r * 26 - 13).toFixed(1) + 'deg', '--y': (r * 0.24 - 0.12).toFixed(2) + 'em', animation: ANIM[kind](i) }}>
              {c === ' ' ? '\\u00a0' : c}
            </span>
          );
        })}
      </span>
    </span>
  );
}`,
      tailwind: `<!-- Cada letra num <span class="ch" style="--i:N">. Para a "bagunça", dê --r (graus) e --y (em) diferentes a cada letra. -->
<h1 class="font-['Baloo_2',sans-serif] text-5xl font-bold text-[#1d1d1d]">
  Um clube com
  <span class="lp4-wave inline-block whitespace-nowrap text-[#fc5304]" aria-label="a sua marca"><span aria-hidden="true"><span class="ch" style="--i:0">a</span><span class="ch" style="--i:1">&nbsp;</span><span class="ch" style="--i:2">s</span><span class="ch" style="--i:3">u</span><span class="ch" style="--i:4">a</span><span class="ch" style="--i:5">&nbsp;</span><span class="ch" style="--i:6">m</span><span class="ch" style="--i:7">a</span><span class="ch" style="--i:8">r</span><span class="ch" style="--i:9">c</span><span class="ch" style="--i:10">a</span></span></span>
</h1>
<style>
  .lp4-wave .ch{display:inline-block;animation:lp4Wave 2.6s cubic-bezier(.22,1,.36,1) infinite;animation-delay:calc(var(--i)*.08s)}
  .lp4-step .ch{display:inline-block;animation:lp4Step 3.6s cubic-bezier(.22,1,.36,1) infinite;animation-delay:calc(var(--i)*.14s)}
  .lp4-tidy .ch{display:inline-block;animation:lp4Tidy 4s cubic-bezier(.22,1,.36,1) infinite}
  @keyframes lp4Wave{0%,45%,100%{transform:translateY(0)}18%{transform:translateY(-.2em)}}
  @keyframes lp4Step{0%{transform:translateY(0)}10%,62%{transform:translateY(-.16em)}76%,100%{transform:translateY(0)}}
  @keyframes lp4Tidy{0%,12%{transform:translateY(var(--y)) rotate(var(--r))}40%,84%{transform:none}100%{transform:translateY(var(--y)) rotate(var(--r))}}
  @media (prefers-reduced-motion:reduce){.ch{animation:none!important}}
</style>`,
    },
  },

  // 4 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-title-highlight-loops",
    name: "Destaques em Loop: Marca-texto, Barra, Cupom Serrilhado e Digitação",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "Família de destaques para uma palavra do título, cada um em loop curto: marca-texto que pinta da esquerda para a direita, barra de progresso em degradê que enche embaixo, borda tracejada de cupom correndo em volta, eco do contorno que cresce e some, e digitação com cursor piscando. Tudo em CSS puro, sem JS.",
    tags: ["Highlighter", "Progress Bar", "Marching Ants", "Typewriter", "Echo"],
    defaultSection: "Títulos de Seção",
    previewType: "lm4-highlights",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `const CSS = [
  '@keyframes lp4Mark{0%{transform:scaleX(0);opacity:1}35%,80%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}',
  '@keyframes lp4Bar{0%{transform:scaleX(0);opacity:1}55%,85%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}',
  '@keyframes lp4March{to{stroke-dashoffset:-26}}',
  '@keyframes lp4Echo{0%{transform:scale(1);opacity:.9}70%,100%{transform:scale(1.22);opacity:0}}',
  '@keyframes lp4Type{0%{transform:scaleX(1)}38%,82%{transform:scaleX(0)}92%,100%{transform:scaleX(1)}}',
  '@keyframes lp4Caret{50%{opacity:0}}',
  '@media (prefers-reduced-motion:reduce){.lp4-hl,.lp4-hl *{animation:none!important}}',
].join('');
const EASE = 'cubic-bezier(.22,1,.36,1)';

// kind: 'mark' | 'bar' | 'ticket' | 'echo' | 'type'. bg = cor do fundo da seção (a digitação "apaga" com ela).
export function Highlight({ children, kind = 'mark', bg = '#ffffff' }) {
  const base = 'lp4-hl relative isolate inline-block whitespace-nowrap';
  return (
    <span className={base + (kind === 'echo' || kind === 'type' ? ' text-[#fc5304]' : '')}>
      <style>{CSS}</style>
      {kind === 'mark' && <span aria-hidden="true" className="absolute inset-x-[-.08em] bottom-[.1em] -z-10 h-[.42em] origin-left rounded bg-[#fc5304]/25" style={{ animation: 'lp4Mark 3.4s ' + EASE + ' infinite' }} />}
      {kind === 'bar' && <span aria-hidden="true" className="absolute inset-x-0 bottom-[-.1em] h-[.16em] origin-left rounded-md bg-[linear-gradient(90deg,#fc5304,#76058f)]" style={{ animation: 'lp4Bar 3.6s ' + EASE + ' infinite' }} />}
      {kind === 'ticket' && (
        <svg aria-hidden="true" className="absolute inset-x-[-.14em] inset-y-[-.04em] -z-10 h-[calc(100%+.08em)] w-[calc(100%+.28em)] overflow-visible">
          <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="8" fill="none" stroke="#ffb48a" strokeWidth="2" strokeDasharray="7 6" style={{ animation: 'lp4March 1.2s linear infinite' }} />
        </svg>
      )}
      {kind === 'echo' && <span aria-hidden="true" className="pointer-events-none absolute inset-0 text-transparent [-webkit-text-stroke:1px_#fc5304]" style={{ animation: 'lp4Echo 2.8s ' + EASE + ' infinite' }}>{children}</span>}
      {kind === 'type' && (
        <>
          <span aria-hidden="true" className="absolute inset-y-0 left-0 right-[-.06em] origin-right" style={{ background: bg, animation: 'lp4Type 4.4s steps(9,end) infinite' }} />
          <span aria-hidden="true" className="absolute inset-y-[.12em] right-[-.12em] w-[3px] rounded-sm bg-[#fc5304]" style={{ animation: 'lp4Caret .8s steps(1) infinite' }} />
        </>
      )}
      {children}
    </span>
  );
}`,
      tailwind: `<h2 class="font-['Baloo_2',sans-serif] text-4xl font-bold">
  Gestão <span class="hl-mark">simples</span>, dados <span class="hl-bar">em tempo real</span>
</h2>
<style>
  .hl-mark,.hl-bar{position:relative;isolation:isolate;display:inline-block;white-space:nowrap}
  .hl-mark::before{content:"";position:absolute;left:-.08em;right:-.08em;bottom:.1em;height:.42em;z-index:-1;border-radius:4px;background:rgba(252,83,4,.24);transform-origin:left;transform:scaleX(0);animation:lp4Mark 3.4s cubic-bezier(.22,1,.36,1) infinite}
  .hl-bar::after{content:"";position:absolute;left:0;right:0;bottom:-.1em;height:.16em;border-radius:6px;background:linear-gradient(90deg,#fc5304,#76058f);transform-origin:left;transform:scaleX(0);animation:lp4Bar 3.6s cubic-bezier(.22,1,.36,1) infinite}
  /* Digitação: um bloco da cor do fundo encolhe em degraus (steps) e o cursor pisca */
  .hl-type{position:relative;display:inline-block;color:#fc5304}
  .hl-type::before{content:"";position:absolute;inset:0 -.06em 0 0;background:#fff;transform-origin:right;animation:lp4Type 4.4s steps(9,end) infinite}
  .hl-type::after{content:"";position:absolute;right:-.12em;top:.12em;bottom:.12em;width:3px;border-radius:2px;background:#fc5304;animation:lp4Caret .8s steps(1) infinite}
  @keyframes lp4Mark{0%{transform:scaleX(0);opacity:1}35%,80%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}
  @keyframes lp4Bar{0%{transform:scaleX(0);opacity:1}55%,85%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}
  @keyframes lp4Type{0%{transform:scaleX(1)}38%,82%{transform:scaleX(0)}92%,100%{transform:scaleX(1)}}
  @keyframes lp4Caret{50%{opacity:0}}
  @media (prefers-reduced-motion:reduce){.hl-mark::before,.hl-bar::after,.hl-type::before,.hl-type::after{animation:none;transform:none}}
</style>`,
    },
  },

  // 5 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-scramble-title",
    name: "Título que se Decifra ao Aparecer",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "Quando o título do card entra inteiro na tela, as letras aparecem embaralhadas (A-Z, #, %, &, +) e vão se fixando da esquerda para a direita em 0,9s até formar o texto certo. Roda uma vez só, espaços nunca embaralham e o leitor de tela recebe o texto final desde o começo.",
    tags: ["Scramble", "Decode", "Text Reveal", "IntersectionObserver"],
    defaultSection: "Títulos dos Cards",
    previewType: "lm4-scramble",
    tech: ["React", "requestAnimationFrame", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&+*';

export function ScrambleTitle({ text, as: Tag = 'h3', duration = 900, className = '' }) {
  const ref = useRef(null);
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0, timer = 0;
    const run = () => {
      let t0 = 0;
      const f = (ts) => {
        if (!t0) t0 = ts;
        const k = (ts - t0) / duration;
        let s = '';
        for (let i = 0; i < text.length; i++) {
          s += text[i] === ' ' || i / text.length < k ? text[i] : CH[Math.floor(Math.random() * CH.length)];
        }
        setOut(s);
        if (k < 1) raf = requestAnimationFrame(f); else setOut(text);
      };
      raf = requestAnimationFrame(f);
    };
    // threshold 1: só começa quando o título inteiro está visível
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { io.disconnect(); timer = setTimeout(run, 250); }
    }, { threshold: 1 });
    io.observe(ref.current);
    return () => { io.disconnect(); clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [text, duration]);
  return (
    <Tag ref={ref} aria-label={text} className={'font-["Baloo_2",sans-serif] font-bold ' + className}>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}`,
      tailwind: `<h3 data-scramble class="font-['Baloo_2',sans-serif] text-xl font-bold text-[#1d1d1d]">Baixo engajamento</h3>
<script>
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&+*';
  function run(h) {
    var fin = h.textContent, t0 = 0;
    h.setAttribute('aria-label', fin);
    function f(ts) {
      if (!t0) t0 = ts;
      var k = (ts - t0) / 900, s = '';
      for (var i = 0; i < fin.length; i++) s += (fin[i] === ' ' || i / fin.length < k) ? fin[i] : CH[Math.floor(Math.random() * CH.length)];
      h.textContent = s;
      if (k < 1) requestAnimationFrame(f); else { h.textContent = fin; h.removeAttribute('aria-label'); }
    }
    requestAnimationFrame(f);
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); setTimeout(function () { run(e.target); }, 250); } });
  }, { threshold: 1 });
  document.querySelectorAll('[data-scramble]').forEach(function (h) { io.observe(h); });
})();
</script>`,
    },
  },

  // 6 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-hero-infinity-dive",
    name: "Infinito 3D com Módulos em Órbita e Mergulho na Rolagem",
    category: "hero",
    categoryLabel: "Hero (Primeira Seção)",
    description: "Tela cheia escura com um símbolo de infinito gigante em 3D atrás do título, desenhado como uma fita com espessura e degradê. Os módulos (cards com ícone) circulam pela fita, encolhem e escurecem quando passam pelo fundo. O mouse inclina o infinito; ao rolar, a seção fica presa e a câmera mergulha no cruzamento da fita até ela cobrir a tela. No celular o infinito fica no meio, atrás do texto, sem os módulos.",
    tags: ["3D Projection", "Lemniscate", "Orbit", "Scroll Pin", "Zoom Dive"],
    defaultSection: "Hero Principal",
    previewType: "lm4-infinity",
    tech: ["React", "SVG", "requestAnimationFrame", "Sticky"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

// Infinito (lemniscata de Bernoulli) com leve sobe-e-desce no cruzamento: um laço passa por cima do outro.
const cur = (t) => { const s = Math.sin(t), c = Math.cos(t), d = 1 + s * s; return [c / d, (s * c / d) * 1.25, 0.1 * s]; };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function InfinityHero({ title = 'Benefícios corporativos que conectam pessoas', modules = ['Clube', 'Farmácias', 'Convênios', 'Rede', 'Indicadores', 'Assinatura'] }) {
  const wrap = useRef(null), stick = useRef(null), face = useRef(null), base = useRef(null), fill = useRef(null);
  const pods = useRef([]);
  useEffect(() => {
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let W = 0, H = 0, A = 0, mob = false, mx = 0, my = 0, tmx = 0, tmy = 0, phase = 0, last = 0, raf = 0, dv = 0;
    const size = () => { W = stick.current.clientWidth; H = stick.current.clientHeight; mob = W < 641; A = mob ? W * 0.46 : Math.min(W * 0.37, H * 0.78); };
    // projeção: gira em Y (mouse), inclina em X (60° parado, de frente no mergulho), perspectiva 2600, zoom no cruzamento
    const proj = (p, th, rx, zm, fx, fy) => {
      const x = p[0] * A, y = p[1] * A, z = p[2] * A;
      const x1 = x * Math.cos(th) + z * Math.sin(th), z1 = -x * Math.sin(th) + z * Math.cos(th);
      const y2 = y * Math.cos(rx) - z1 * Math.sin(rx), z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
      const s = 2600 / Math.max(80, 2600 - z2);
      const bx = W / 2 + x1 * s, by = H * 0.52 + y2 * s;
      return [W / 2 + (bx - fx) * zm, H / 2 + (by - fy) * zm, s, z2];
    };
    const band = (th, rx, zm, fx, fy, dz) => {
      const L = [], R = [], wd = mob ? 0.05 : 0.045;
      for (let i = 0; i <= 180; i++) {
        const t = (i / 180) * Math.PI * 2, a = cur(t), b = cur(t + 0.002);
        const tx = b[0] - a[0], ty = b[1] - a[1], l = Math.hypot(tx, ty) || 1, nx = (-ty / l) * wd, ny = (tx / l) * wd;
        const p = proj([a[0] + nx, a[1] + ny, a[2] + dz], th, rx, zm, fx, fy), q = proj([a[0] - nx, a[1] - ny, a[2] + dz], th, rx, zm, fx, fy);
        L.push(p[0].toFixed(1) + ' ' + p[1].toFixed(1)); R.unshift(q[0].toFixed(1) + ' ' + q[1].toFixed(1));
      }
      return 'M' + L.join('L') + 'L' + R.join('L') + 'Z';
    };
    const frame = (now) => {
      const dt = last ? Math.min(48, now - last) : 16; last = now;
      if (!RM) phase += dt * 0.00018 * (1 + dv * 3);
      mx += (tmx - mx) * 0.07; my += (tmy - my) * 0.07;
      const th = mx * 0.22, rx = ((mob ? 36 : 60) - my * 10 - dv * 24) * Math.PI / 180;
      const zmax = (1.15 * (W + H)) / (2 * 0.045 * A), zm = Math.pow(zmax, dv);
      const c = proj(cur(Math.PI * 1.5), th, rx, 1, W / 2, H / 2); // cruzamento: ponto de foco do mergulho
      const fx = c[0], fy = c[1];
      face.current.setAttribute('d', band(th, rx, zm, fx, fy, 0));
      base.current.setAttribute('d', band(th, rx, zm, fx, fy, -0.035));
      fill.current.style.opacity = clamp((dv - 0.55) / 0.35, 0, 1);
      pods.current.forEach((el, i) => {
        if (!el) return;
        const q = proj(cur(phase + (i * Math.PI * 2) / modules.length), th, rx, zm, fx, fy), fly = dv * dv;
        el.style.transform = 'translate3d(' + q[0].toFixed(1) + 'px,' + q[1].toFixed(1) + 'px,0) translate(-50%,-50%) scale(' + (q[2] * (1 + fly * 1.6)).toFixed(3) + ')';
        el.style.opacity = clamp(1 - fly * 1.6, 0, 1) * (1 - clamp(-q[3] / (A * 0.5) * 0.6, 0, 0.7));
        el.style.zIndex = q[3] > 0 ? 3 : 1; // na frente do título só quando está na metade de cá
      });
      raf = requestAnimationFrame(frame);
    };
    const onScroll = () => {
      const r = wrap.current.getBoundingClientRect(), track = wrap.current.offsetHeight - innerHeight;
      dv = RM ? 0 : ease(clamp(-r.top / track / 0.9, 0, 1)); // chega ao fim do zoom em 90% e segura a tela roxa
    };
    const onMove = (e) => { const r = stick.current.getBoundingClientRect(); tmx = clamp((e.clientX - r.left) / r.width - 0.5, -0.6, 0.6); tmy = clamp((e.clientY - r.top) / r.height - 0.5, -0.6, 0.6); };
    size(); onScroll(); raf = requestAnimationFrame(frame);
    addEventListener('resize', size); addEventListener('scroll', onScroll, { passive: true });
    if (fine && !RM) stick.current.addEventListener('pointermove', onMove);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); removeEventListener('scroll', onScroll); };
  }, [modules.length]);

  return (
    // altura extra = trecho de rolagem do mergulho (1.1 tela)
    <section ref={wrap} className="relative h-[210svh] bg-[#1a0638]">
      <div ref={stick} className="sticky top-0 h-svh overflow-hidden bg-[radial-gradient(120%_90%_at_70%_110%,#76058f_0%,#43096a_38%,#220b52_72%,#1a0638_100%)]">
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs><linearGradient id="lp4-inf-g" x1="0" x2="1"><stop offset="0" stopColor="#fc5304" /><stop offset=".5" stopColor="#b03ac8" /><stop offset="1" stopColor="#ff7a33" /></linearGradient></defs>
          <path ref={base} fill="#4a1478" />
          <path ref={face} fill="url(#lp4-inf-g)" />
        </svg>
        <div ref={fill} className="absolute inset-0 bg-[#43096a] opacity-0" aria-hidden="true" />
        {modules.map((m, i) => (
          <div key={m} ref={(el) => (pods.current[i] = el)} aria-hidden="true"
            className="absolute left-0 top-0 hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 font-['Baloo_2',sans-serif] text-sm font-bold text-white backdrop-blur-md will-change-transform md:block">{m}</div>
        ))}
        <div className="relative z-[2] mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center">
          <h1 className="font-['Baloo_2',sans-serif] text-[clamp(32px,4vw,60px)] font-bold leading-[1.05] text-white">{title}</h1>
          <a href="#contato" className="mt-8 rounded-full bg-[linear-gradient(135deg,#fc5304,#ff7a33)] px-8 py-4 font-bold text-white">Quero conhecer</a>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<!-- Versão HTML: mesma lógica do React, em script único. Ajuste textos e módulos no HTML. -->
<section id="inf" class="relative h-[210svh] bg-[#1a0638]">
  <div class="inf-stick sticky top-0 h-svh overflow-hidden bg-[radial-gradient(120%_90%_at_70%_110%,#76058f_0%,#43096a_38%,#220b52_72%,#1a0638_100%)]">
    <svg class="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs><linearGradient id="inf-g" x1="0" x2="1"><stop offset="0" stop-color="#fc5304"/><stop offset=".5" stop-color="#b03ac8"/><stop offset="1" stop-color="#ff7a33"/></linearGradient></defs>
      <path class="inf-base" fill="#4a1478"/><path class="inf-face" fill="url(#inf-g)"/>
    </svg>
    <div class="inf-fill absolute inset-0 bg-[#43096a] opacity-0" aria-hidden="true"></div>
    <div class="inf-pod absolute left-0 top-0 hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur-md md:block" aria-hidden="true">Clube</div>
    <div class="inf-pod absolute left-0 top-0 hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur-md md:block" aria-hidden="true">Farmácias</div>
    <div class="inf-pod absolute left-0 top-0 hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur-md md:block" aria-hidden="true">Convênios</div>
    <div class="inf-pod absolute left-0 top-0 hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur-md md:block" aria-hidden="true">Indicadores</div>
    <div class="relative z-[2] mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h1 class="font-['Baloo_2',sans-serif] text-[clamp(32px,4vw,60px)] font-bold leading-[1.05] text-white">Benefícios corporativos que conectam pessoas</h1>
      <a href="#contato" class="mt-8 rounded-full bg-[linear-gradient(135deg,#fc5304,#ff7a33)] px-8 py-4 font-bold text-white">Quero conhecer</a>
    </div>
  </div>
</section>
<script>
(function () {
  var sec = document.getElementById('inf'), st = sec.querySelector('.inf-stick'), face = sec.querySelector('.inf-face'), base = sec.querySelector('.inf-base'), fill = sec.querySelector('.inf-fill'), pods = [].slice.call(sec.querySelectorAll('.inf-pod'));
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches, W, H, A, mob, mx = 0, my = 0, tmx = 0, tmy = 0, ph = 0, last = 0, dv = 0;
  function cl(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function cur(t) { var s = Math.sin(t), c = Math.cos(t), d = 1 + s * s; return [c / d, s * c / d * 1.25, .1 * s]; }
  function size() { W = st.clientWidth; H = st.clientHeight; mob = W < 641; A = mob ? W * .46 : Math.min(W * .37, H * .78); }
  function proj(p, th, rx, zm, fx, fy) {
    var x = p[0] * A, y = p[1] * A, z = p[2] * A, x1 = x * Math.cos(th) + z * Math.sin(th), z1 = -x * Math.sin(th) + z * Math.cos(th);
    var y2 = y * Math.cos(rx) - z1 * Math.sin(rx), z2 = y * Math.sin(rx) + z1 * Math.cos(rx), s = 2600 / Math.max(80, 2600 - z2);
    return [W / 2 + (W / 2 + x1 * s - fx) * zm, H / 2 + (H * .52 + y2 * s - fy) * zm, s, z2];
  }
  function band(th, rx, zm, fx, fy, dz) {
    var L = [], R = [], wd = mob ? .05 : .045;
    for (var i = 0; i <= 180; i++) {
      var t = i / 180 * Math.PI * 2, a = cur(t), b = cur(t + .002), tx = b[0] - a[0], ty = b[1] - a[1], l = Math.hypot(tx, ty) || 1, nx = -ty / l * wd, ny = tx / l * wd;
      var p = proj([a[0] + nx, a[1] + ny, a[2] + dz], th, rx, zm, fx, fy), q = proj([a[0] - nx, a[1] - ny, a[2] + dz], th, rx, zm, fx, fy);
      L.push(p[0].toFixed(1) + ' ' + p[1].toFixed(1)); R.unshift(q[0].toFixed(1) + ' ' + q[1].toFixed(1));
    }
    return 'M' + L.join('L') + 'L' + R.join('L') + 'Z';
  }
  function frame(now) {
    var dt = last ? Math.min(48, now - last) : 16; last = now; if (!RM) ph += dt * .00018 * (1 + dv * 3);
    mx += (tmx - mx) * .07; my += (tmy - my) * .07;
    var th = mx * .22, rx = ((mob ? 36 : 60) - my * 10 - dv * 24) * Math.PI / 180, zm = Math.pow(1.15 * (W + H) / (2 * .045 * A), dv), c = proj(cur(Math.PI * 1.5), th, rx, 1, W / 2, H / 2);
    face.setAttribute('d', band(th, rx, zm, c[0], c[1], 0)); base.setAttribute('d', band(th, rx, zm, c[0], c[1], -.035));
    fill.style.opacity = cl((dv - .55) / .35, 0, 1);
    pods.forEach(function (el, i) {
      var q = proj(cur(ph + i * Math.PI * 2 / pods.length), th, rx, zm, c[0], c[1]), fly = dv * dv;
      el.style.transform = 'translate3d(' + q[0].toFixed(1) + 'px,' + q[1].toFixed(1) + 'px,0) translate(-50%,-50%) scale(' + (q[2] * (1 + fly * 1.6)).toFixed(3) + ')';
      el.style.opacity = cl(1 - fly * 1.6, 0, 1) * (1 - cl(-q[3] / (A * .5) * .6, 0, .7)); el.style.zIndex = q[3] > 0 ? 3 : 1;
    });
    requestAnimationFrame(frame);
  }
  function onScroll() { var r = sec.getBoundingClientRect(), tr = sec.offsetHeight - innerHeight, p = cl(-r.top / tr / .9, 0, 1); dv = RM ? 0 : (p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2); }
  size(); onScroll(); requestAnimationFrame(frame);
  addEventListener('resize', size); addEventListener('scroll', onScroll, { passive: true });
  if (!RM && matchMedia('(hover: hover)').matches) st.addEventListener('pointermove', function (e) { var r = st.getBoundingClientRect(); tmx = cl((e.clientX - r.left) / r.width - .5, -.6, .6); tmy = cl((e.clientY - r.top) / r.height - .5, -.6, .6); });
})();
</script>`,
    },
  },

  // 7 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-gapless-marquee",
    name: "Faixa em Degradê com Itens que Nunca Abrem Buraco",
    category: "divisas",
    categoryLabel: "Divisas & Faixas",
    description: "Faixa de texto correndo entre seções, com losangos laranja entre as palavras. O script mede o grupo original e repete os itens quantas vezes for preciso para cobrir a tela (com sobra), e calcula a duração pela largura: em qualquer tela a velocidade é a mesma (70px/s) e a emenda nunca aparece. Refaz a conta quando a fonte carrega ou a largura muda.",
    tags: ["Marquee", "Seamless Loop", "Auto Fill", "Ticker"],
    defaultSection: "Entre Seções",
    previewType: "lm4-marquee",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export function GaplessMarquee({ items = ['Clube de vantagens', 'Farmácias', 'Convênios', 'Rede de parceiros', 'Indicadores', 'Assinatura'], speed = 70 }) {
  const probe = useRef(null);
  const [reps, setReps] = useState(2), [dur, setDur] = useState(36);
  useEffect(() => {
    const build = () => {
      const setW = probe.current.scrollWidth || 1;
      const r = Math.max(1, Math.ceil((innerWidth + 60) / setW)); // grupos para cobrir a tela
      setReps(r * 2); // o dobro: a animação anda exatamente meia faixa e volta sem salto
      setDur((setW * r) / speed);
    };
    build();
    document.fonts?.ready.then(build);
    addEventListener('resize', build);
    return () => removeEventListener('resize', build);
  }, [speed, items.length]);
  const group = (k, hidden) => items.map((t, i) => (
    <span key={k + '-' + i} aria-hidden={hidden || undefined}
      className="inline-flex items-center gap-7 whitespace-nowrap pr-7 font-['Baloo_2',sans-serif] text-[22px] font-bold leading-tight text-white after:h-3 after:w-3 after:rotate-45 after:rounded-[3px] after:bg-[linear-gradient(135deg,#fc5304,#ff7a33)] after:content-['']">{t}</span>
  ));
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(120%_90%_at_70%_110%,#76058f_0%,#43096a_38%,#220b52_72%,#1a0638_100%)] py-[22px]">
      <style>{'@keyframes lp4Marq{to{transform:translateX(-50%)}}@media (prefers-reduced-motion:reduce){.lp4-marq{animation:none!important}}'}</style>
      {/* medidor invisível de um grupo */}
      <div ref={probe} className="invisible absolute flex w-max" aria-hidden="true">{group('p', true)}</div>
      <div className="lp4-marq flex w-max will-change-transform" style={{ animation: 'lp4Marq ' + dur.toFixed(1) + 's linear infinite' }}>
        {Array.from({ length: reps }, (_, k) => group(k, k > 0))}
      </div>
    </div>
  );
}`,
      tailwind: `<div class="relative overflow-hidden bg-[radial-gradient(120%_90%_at_70%_110%,#76058f_0%,#43096a_38%,#220b52_72%,#1a0638_100%)] py-[22px]">
  <div class="lp4-marq flex w-max">
    <span>Clube de vantagens</span><span>Farmácias</span><span>Convênios</span><span>Rede de parceiros</span><span>Indicadores</span><span>Assinatura</span>
  </div>
</div>
<style>
  .lp4-marq span{display:inline-flex;align-items:center;gap:28px;padding-right:28px;white-space:nowrap;font:700 22px/1.2 "Baloo 2",sans-serif;color:#fff}
  .lp4-marq span::after{content:"";width:12px;height:12px;border-radius:3px;background:linear-gradient(135deg,#fc5304,#ff7a33);transform:rotate(45deg)}
  .lp4-marq{animation:lp4Marq var(--md,36s) linear infinite}
  @keyframes lp4Marq{to{transform:translateX(-50%)}}
  @media (prefers-reduced-motion:reduce){.lp4-marq{animation:none}}
</style>
<script>
(function () {
  var tr = document.querySelector('.lp4-marq'), base = [].slice.call(tr.children).map(function (n) { return n.cloneNode(true); }), lastW = 0;
  function build() {
    if (innerWidth === lastW) return; lastW = innerWidth;
    tr.innerHTML = ''; base.forEach(function (n) { tr.appendChild(n.cloneNode(true)); });
    var setW = tr.scrollWidth || 1, reps = Math.max(1, Math.ceil((innerWidth + 60) / setW));
    tr.innerHTML = '';
    for (var k = 0; k < reps * 2; k++) base.forEach(function (n) { var c = n.cloneNode(true); if (k) c.setAttribute('aria-hidden', 'true'); tr.appendChild(c); });
    tr.style.setProperty('--md', (setW * reps / 70).toFixed(1) + 's');
  }
  build();
  if (document.fonts) document.fonts.ready.then(function () { lastW = 0; build(); });
  addEventListener('resize', build);
})();
</script>`,
    },
  },

  // 8 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-sticky-stack-odometer",
    name: "Cards Presos que se Empilham com Número de Odômetro",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "Os cards de 'desafios' ficam presos no topo, cada um 26px abaixo do anterior, e o próximo sobe por cima. O card coberto encolhe 5% por card que o cobre e escurece com uma camada clara. Quando cada card chega, o número dele gira como um odômetro (duas voltas inteiras) e assenta no valor certo; ao voltar por cima ele reseta sem animar.",
    tags: ["Sticky Stack", "Odometer", "Scroll Driven", "Scale Down"],
    defaultSection: "Seção de Desafios",
    previewType: "lm4-stack",
    tech: ["Tailwind CSS", "React", "Position Sticky"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const STEP = 26, TOP = 120;

export function StickyStackOdometer({ cards = [
  { n: 1, title: 'Benefício que ninguém usa', text: 'Pacotes genéricos que o colaborador esquece no primeiro mês.' },
  { n: 2, title: 'Gestão espalhada', text: 'Planilhas, e-mails e fornecedores sem conversa entre si.' },
  { n: 3, title: 'Custo sem retorno', text: 'O investimento sobe e a percepção de valor não acompanha.' },
  { n: 4, title: 'Sem dados', text: 'Não dá para saber o que funciona e o que pode sair.' },
] }) {
  const refs = useRef([]), odos = useRef([]), dims = useRef([]);
  useEffect(() => {
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let q = 0;
    const tick = () => {
      q = 0;
      const vh = innerHeight, els = refs.current;
      const tops = els.map((c) => c.getBoundingClientRect().top);
      els.forEach((c, i) => {
        const st = TOP + i * STEP, h = c.offsetHeight;
        // número: gira quando o card passa de 45% do caminho até a posição presa
        const od = odos.current[i], arrived = !RM && tops[i] < st + (vh - st) * 0.45;
        if (arrived && !od.rolled) { od.rolled = true; od.style.transition = ''; od.style.transform = 'translateY(-21.6em)'; }
        else if (!arrived && od.rolled && tops[i] > vh * 0.92) { od.rolled = false; od.style.transition = 'none'; od.style.transform = ''; }
        // quanto os de baixo já cobriram este card (cada um que encosta soma 1)
        let cover = 0;
        for (let j = i + 1; j < els.length; j++) cover += clamp(1 - (tops[j] - (TOP + j * STEP)) / Math.max(1, h), 0, 1);
        cover = RM ? 0 : Math.min(cover, 3);
        c.style.transform = cover > 0.001 ? 'scale(' + (1 - cover * 0.05).toFixed(4) + ')' : '';
        dims.current[i].style.opacity = (Math.min(cover, 1) * 0.55).toFixed(3);
      });
    };
    const onScroll = () => { if (!q) q = requestAnimationFrame(tick); };
    tick(); addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="mx-auto max-w-3xl">
      <style>{'.lp4-odo{transition:transform 1.5s cubic-bezier(.2,.9,.25,1.04)}'}</style>
      {cards.map((c, i) => (
        <article key={c.n} ref={(el) => (refs.current[i] = el)}
          className="sticky origin-top will-change-transform" style={{ top: TOP + i * STEP, marginBottom: (cards.length - 1 - i) * STEP + 40 }}>
          <div className="relative isolate grid grid-cols-[auto_1fr] items-center gap-7 overflow-hidden rounded-[30px] border border-[#e7e0ef] bg-white p-7">
            {/* número em coluna: valor + 20 dígitos seguintes; -21.6em = 20 linhas de 1.08em => volta ao mesmo dígito */}
            <span className="block h-[1.08em] overflow-hidden font-['Baloo_2',sans-serif] text-7xl font-bold leading-[1.08]" aria-label={String(c.n).padStart(2, '0')}>
              <span ref={(el) => (odos.current[i] = el)} className="lp4-odo block" aria-hidden="true">
                {[c.n, ...Array.from({ length: 20 }, (_, k) => (c.n + 1 + k) % 10)].map((d, k) => (
                  <b key={k} className="block h-[1.08em] bg-[linear-gradient(170deg,#ff7a33_10%,#fc5304_45%,#9a1fb8_100%)] bg-clip-text text-transparent">{d}</b>
                ))}
              </span>
            </span>
            <div>
              <h3 className="font-['Baloo_2',sans-serif] text-2xl font-bold text-[#1d1d1d]">{c.title}</h3>
              <p className="mt-2 text-[#5d5866]">{c.text}</p>
            </div>
            <i ref={(el) => (dims.current[i] = el)} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] rounded-[inherit] bg-[#f4eff9] opacity-0" />
          </div>
        </article>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="lp4-pains mx-auto max-w-3xl">
  <article class="lp4-pain" style="--i:0"><div class="lp4-pain__in">
    <span class="lp4-odo" data-d="1"></span>
    <div><h3>Benefício que ninguém usa</h3><p>Pacotes genéricos que o colaborador esquece no primeiro mês.</p></div><i class="lp4-dim"></i>
  </div></article>
  <article class="lp4-pain" style="--i:1"><div class="lp4-pain__in">
    <span class="lp4-odo" data-d="2"></span>
    <div><h3>Gestão espalhada</h3><p>Planilhas, e-mails e fornecedores sem conversa entre si.</p></div><i class="lp4-dim"></i>
  </div></article>
  <article class="lp4-pain" style="--i:2"><div class="lp4-pain__in">
    <span class="lp4-odo" data-d="3"></span>
    <div><h3>Custo sem retorno</h3><p>O investimento sobe e a percepção de valor não acompanha.</p></div><i class="lp4-dim"></i>
  </div></article>
</div>
<style>
  .lp4-pain{position:sticky;top:calc(120px + var(--i)*26px);margin-bottom:calc((2 - var(--i))*26px + 40px);transform-origin:50% 0}
  .lp4-pain__in{position:relative;isolation:isolate;display:grid;grid-template-columns:auto 1fr;align-items:center;gap:28px;padding:28px;border-radius:30px;background:#fff;border:1px solid #e7e0ef;overflow:hidden}
  .lp4-pain h3{font:700 24px/1.2 "Baloo 2",sans-serif;color:#1d1d1d;margin:0}.lp4-pain p{margin:8px 0 0;color:#5d5866}
  .lp4-dim{position:absolute;inset:0;z-index:5;border-radius:inherit;background:#f4eff9;opacity:0;pointer-events:none}
  .lp4-odo{display:block;height:1.08em;overflow:hidden;font:700 72px/1.08 "Baloo 2",sans-serif}
  .lp4-odo>span{display:block;transition:transform 1.5s cubic-bezier(.2,.9,.25,1.04)}
  .lp4-odo b{display:block;height:1.08em;background:linear-gradient(170deg,#ff7a33 10%,#fc5304 45%,#9a1fb8 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
</style>
<script>
(function () {
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cards = [].slice.call(document.querySelectorAll('.lp4-pain'));
  var odos = cards.map(function (c) {
    var o = c.querySelector('.lp4-odo'), d = +o.dataset.d, h = '<span><b>' + d + '</b>';
    for (var i = 0; i < 20; i++) h += '<b>' + ((d + 1 + i) % 10) + '</b>';
    o.innerHTML = h + '</span>'; o.setAttribute('aria-label', d); return o.firstChild;
  });
  function cl(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function tick() {
    var vh = innerHeight, tops = cards.map(function (c) { return c.getBoundingClientRect().top; });
    cards.forEach(function (c, i) {
      var st = 120 + i * 26, od = odos[i], arrived = !RM && tops[i] < st + (vh - st) * .45;
      if (arrived && !od.rolled) { od.rolled = true; od.style.transition = ''; od.style.transform = 'translateY(-21.6em)'; }
      else if (!arrived && od.rolled && tops[i] > vh * .92) { od.rolled = false; od.style.transition = 'none'; od.style.transform = ''; }
      var cover = 0; for (var j = i + 1; j < cards.length; j++) cover += cl(1 - (tops[j] - (120 + j * 26)) / c.offsetHeight, 0, 1);
      cover = RM ? 0 : Math.min(cover, 3);
      c.style.transform = cover > .001 ? 'scale(' + (1 - cover * .05) + ')' : '';
      c.querySelector('.lp4-dim').style.opacity = Math.min(cover, 1) * .55;
    });
  }
  var q = 0; tick(); addEventListener('scroll', function () { if (!q) q = requestAnimationFrame(function () { q = 0; tick(); }); }, { passive: true });
})();
</script>`,
    },
  },

  // 9 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-pinned-3d-carousel",
    name: "Carrossel 3D Preso na Rolagem com Contador 01/06",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "A seção fica parada e a rolagem passa os cards um a um pelo centro: o do meio fica de frente, os vizinhos recuam no eixo Z, giram 22° e escurecem por uma camada (sem ficar transparentes, para o card de trás não vazar). Um contador grande mostra 01/06 e os pontinhos levam direto ao card. Em tela de toque vira um deslize 2D mais leve.",
    tags: ["3D Carousel", "Scroll Pin", "Coverflow", "Counter", "Dots Nav"],
    defaultSection: "Seção de Soluções",
    previewType: "lm4-carousel3d",
    tech: ["Tailwind CSS", "React", "CSS 3D Transforms", "Sticky"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function Pinned3DCarousel({ items = ['Clube de vantagens', 'Benefícios em farmácias', 'Rede de parceiros', 'Gestão de convênios', 'Experiência digital', 'Indicadores'] }) {
  const sec = useRef(null), cards = useRef([]), dims = useRef([]);
  const [k, setK] = useState(0);
  const n = items.length;
  useEffect(() => {
    const touch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let q = 0;
    const tick = () => {
      q = 0;
      const r = sec.current.getBoundingClientRect(), track = sec.current.offsetHeight - innerHeight;
      const p = clamp(-r.top / track, 0, 1), t = clamp((p - 0.05) / 0.9, 0, 1) * (n - 1); // margem parada no começo e no fim
      const small = innerWidth < 641, gap = small ? 150 : 330, dep = small ? 200 : 260;
      cards.current.forEach((c, i) => {
        const d = i - t, a = Math.abs(d), dc = clamp(d, -2, 2);
        c.style.transform = touch || small
          ? 'translate3d(' + (dc * gap * 1.05).toFixed(1) + 'px,' + (Math.min(a, 2) * 10).toFixed(1) + 'px,0) scale(' + (1 - Math.min(a, 2) * 0.1).toFixed(3) + ')'
          : 'translate3d(' + (dc * gap + (d - dc) * gap * 0.4).toFixed(1) + 'px,' + (Math.min(a, 2) * 14).toFixed(1) + 'px,' + (-Math.min(a, 2.6) * dep).toFixed(1) + 'px) rotateY(' + (-dc * 22).toFixed(2) + 'deg)';
        c.style.opacity = touch || small ? (a > 1.6 ? 0 : 1) : clamp(2.6 - a, 0, 1);
        c.style.zIndex = 100 - Math.round(a * 10);
        c.style.pointerEvents = a < 0.5 ? '' : 'none';
        dims.current[i].style.opacity = (Math.min(a, 2) * 0.27).toFixed(2);
      });
      setK(Math.round(t));
    };
    const onScroll = () => { if (!q) q = requestAnimationFrame(tick); };
    tick(); addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); };
  }, [n]);
  const goTo = (i) => {
    const top = sec.current.getBoundingClientRect().top + scrollY, track = sec.current.offsetHeight - innerHeight;
    scrollTo({ top: top + track * (0.05 + (0.9 * i) / (n - 1)) + 2, behavior: 'smooth' });
  };
  return (
    // 2.6 telas de rolagem para 6 cards
    <section ref={sec} className="relative h-[360vh] bg-[radial-gradient(120%_90%_at_70%_110%,#76058f_0%,#43096a_38%,#220b52_72%,#1a0638_100%)]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden">
        <div className="relative h-[360px] w-full [perspective:1400px]">
          {items.map((t, i) => (
            <article key={t} ref={(el) => (cards.current[i] = el)} tabIndex={0} onFocus={() => goTo(i)}
              className="absolute left-1/2 top-0 -ml-[160px] flex h-[340px] w-[320px] flex-col justify-end overflow-hidden rounded-[26px] bg-[linear-gradient(160deg,#3d0a63,#1f0745)] p-6 text-white will-change-transform [transform-style:preserve-3d]">
              <span className="absolute right-5 top-4 font-['Baloo_2',sans-serif] text-sm font-bold tracking-[.14em] text-white/45">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-['Baloo_2',sans-serif] text-2xl font-bold">{t}</h3>
              <i ref={(el) => (dims.current[i] = el)} aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#1a0638] opacity-0" />
            </article>
          ))}
        </div>
        <nav className="mt-8 flex items-center gap-5 text-white" aria-label="Soluções">
          <span className="font-['Baloo_2',sans-serif] text-white/60"><b className="text-3xl text-white">{String(k + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}</span>
          <span className="flex gap-2">
            {items.map((t, i) => (
              <button key={t} onClick={() => goTo(i)} aria-label={t} aria-current={i === k}
                className={'h-2 rounded-full transition-all ' + (i === k ? 'w-7 bg-[#fc5304]' : 'w-2 bg-white/30')} />
            ))}
          </span>
        </nav>
      </div>
    </section>
  );
}`,
      tailwind: `<section class="c3d relative h-[360vh] bg-[radial-gradient(120%_90%_at_70%_110%,#76058f_0%,#43096a_38%,#220b52_72%,#1a0638_100%)]">
  <div class="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden">
    <div class="relative h-[360px] w-full [perspective:1400px]">
      <article class="c3d-card"><h3>Clube de vantagens</h3><i></i></article>
      <article class="c3d-card"><h3>Benefícios em farmácias</h3><i></i></article>
      <article class="c3d-card"><h3>Rede de parceiros</h3><i></i></article>
      <article class="c3d-card"><h3>Gestão de convênios</h3><i></i></article>
      <article class="c3d-card"><h3>Experiência digital</h3><i></i></article>
      <article class="c3d-card"><h3>Indicadores</h3><i></i></article>
    </div>
    <p class="mt-8 font-['Baloo_2',sans-serif] text-white/60"><b class="c3d-n text-3xl text-white">01</b> / 06</p>
  </div>
</section>
<style>
  .c3d-card{position:absolute;left:50%;top:0;margin-left:-160px;width:320px;height:340px;display:flex;flex-direction:column;justify-content:flex-end;padding:24px;border-radius:26px;overflow:hidden;color:#fff;background:linear-gradient(160deg,#3d0a63,#1f0745);transform-style:preserve-3d}
  .c3d-card h3{font:700 24px/1.2 "Baloo 2",sans-serif;margin:0}
  .c3d-card i{position:absolute;inset:0;background:#1a0638;opacity:0;pointer-events:none}
</style>
<script>
(function () {
  var sec = document.querySelector('.c3d'), cards = [].slice.call(sec.querySelectorAll('.c3d-card')), num = sec.querySelector('.c3d-n'), n = cards.length;
  var touch = !matchMedia('(hover: hover) and (pointer: fine)').matches;
  function cl(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function tick() {
    var r = sec.getBoundingClientRect(), p = cl(-r.top / (sec.offsetHeight - innerHeight), 0, 1), t = cl((p - .05) / .9, 0, 1) * (n - 1);
    var small = innerWidth < 641, gap = small ? 150 : 330, dep = small ? 200 : 260;
    cards.forEach(function (c, i) {
      var d = i - t, a = Math.abs(d), dc = cl(d, -2, 2);
      c.style.transform = (touch || small) ? 'translate3d(' + dc * gap * 1.05 + 'px,' + Math.min(a, 2) * 10 + 'px,0) scale(' + (1 - Math.min(a, 2) * .1) + ')'
        : 'translate3d(' + (dc * gap + (d - dc) * gap * .4) + 'px,' + Math.min(a, 2) * 14 + 'px,' + (-Math.min(a, 2.6) * dep) + 'px) rotateY(' + (-dc * 22) + 'deg)';
      c.style.opacity = (touch || small) ? (a > 1.6 ? 0 : 1) : cl(2.6 - a, 0, 1);
      c.style.zIndex = 100 - Math.round(a * 10);
      c.querySelector('i').style.opacity = Math.min(a, 2) * .27;
    });
    num.textContent = '0' + (Math.round(t) + 1);
  }
  var q = 0; tick(); addEventListener('scroll', function () { if (!q) q = requestAnimationFrame(function () { q = 0; tick(); }); }, { passive: true });
})();
</script>`,
    },
  },

  // 10 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-spotlight-border-sparks",
    name: "Cards com Holofote na Borda e Faíscas no Hover",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "Um holofote laranja segue o mouse por toda a grade de cards: a borda de cada card acende na parte mais perto do cursor (até 240px de distância) e um brilho suave aparece por dentro. Ao entrar num card, 14 faíscas pequenas sobem de pontos aleatórios e somem. Em toque e com movimento reduzido nada disso roda.",
    tags: ["Spotlight Border", "Mouse Glow", "Particles", "Bento"],
    defaultSection: "Seção de Soluções",
    previewType: "lm4-spotlight",
    tech: ["Tailwind CSS", "React", "CSS Mask"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const CSS = '.lp4-bc::before{content:"";position:absolute;inset:0;z-index:2;border-radius:inherit;padding:1.5px;pointer-events:none;' +
  'background:radial-gradient(300px circle at var(--mx,-999px) var(--my,-999px),rgba(255,150,90,calc(var(--gl,0)*.95)),transparent 65%),rgba(255,255,255,.13);' +
  '-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}' +
  '.lp4-bc::after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(460px circle at var(--mx,-999px) var(--my,-999px),rgba(252,83,4,.2),transparent 60%);opacity:var(--gl,0)}' +
  '.lp4-pt{position:absolute;z-index:1;width:4px;height:4px;border-radius:50%;background:#ffb48a;box-shadow:0 0 8px #fc5304;pointer-events:none;animation:lp4Pt 1.8s cubic-bezier(.22,1,.36,1) forwards}' +
  '@keyframes lp4Pt{0%{transform:translate(0,0) scale(0);opacity:0}20%{opacity:1;transform:translate(calc(var(--dx)*.2),calc(var(--dy)*.2)) scale(1)}100%{transform:translate(var(--dx),var(--dy)) scale(.3);opacity:0}}';

export function SpotlightBento({ items = ['Clube de vantagens', 'Farmácias', 'Rede de parceiros', 'Convênios'] }) {
  const grid = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const g = grid.current, cards = [...g.querySelectorAll('.lp4-bc')];
    const move = (e) => cards.forEach((c) => {
      const r = c.getBoundingClientRect();
      const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right), dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
      c.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px');
      c.style.setProperty('--gl', Math.max(0, 1 - Math.hypot(dx, dy) / 240).toFixed(3));
    });
    const leave = () => cards.forEach((c) => c.style.setProperty('--gl', '0'));
    const sparks = (e) => {
      for (let i = 0; i < 14; i++) {
        const p = document.createElement('i');
        p.className = 'lp4-pt';
        p.style.left = (Math.random() * 100).toFixed(1) + '%'; p.style.top = (Math.random() * 100).toFixed(1) + '%';
        p.style.setProperty('--dx', (Math.random() * 80 - 40).toFixed(0) + 'px'); p.style.setProperty('--dy', (Math.random() * -90 - 20).toFixed(0) + 'px');
        p.style.animationDelay = (Math.random() * 0.5).toFixed(2) + 's';
        p.addEventListener('animationend', () => p.remove());
        e.currentTarget.appendChild(p);
      }
    };
    g.addEventListener('pointermove', move); g.addEventListener('pointerleave', leave);
    cards.forEach((c) => c.addEventListener('pointerenter', sparks));
    return () => { g.removeEventListener('pointermove', move); g.removeEventListener('pointerleave', leave); cards.forEach((c) => c.removeEventListener('pointerenter', sparks)); };
  }, []);
  return (
    <div ref={grid} className="grid gap-4 sm:grid-cols-2">
      <style>{CSS}</style>
      {items.map((t) => (
        <article key={t} className="lp4-bc relative isolate flex min-h-[220px] flex-col justify-end overflow-hidden rounded-[26px] bg-[linear-gradient(160deg,#3d0a63,#1f0745)] p-7 text-white">
          <h3 className="font-['Baloo_2',sans-serif] text-xl font-bold">{t}</h3>
        </article>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="lp4-bento grid gap-4 sm:grid-cols-2">
  <article class="lp4-bc"><h3>Clube de vantagens</h3></article>
  <article class="lp4-bc"><h3>Farmácias</h3></article>
  <article class="lp4-bc"><h3>Rede de parceiros</h3></article>
  <article class="lp4-bc"><h3>Convênios</h3></article>
</div>
<style>
  .lp4-bc{--gl:0;position:relative;isolation:isolate;display:flex;flex-direction:column;justify-content:flex-end;min-height:220px;padding:28px;border-radius:26px;overflow:hidden;color:#fff;background:linear-gradient(160deg,#3d0a63,#1f0745)}
  .lp4-bc h3{font:700 20px/1.25 "Baloo 2",sans-serif;margin:0}
  .lp4-bc::before{content:"";position:absolute;inset:0;z-index:2;border-radius:inherit;padding:1.5px;pointer-events:none;background:radial-gradient(300px circle at var(--mx,-999px) var(--my,-999px),rgba(255,150,90,calc(var(--gl)*.95)),transparent 65%),rgba(255,255,255,.13);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
  .lp4-bc::after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(460px circle at var(--mx,-999px) var(--my,-999px),rgba(252,83,4,.2),transparent 60%);opacity:var(--gl)}
  .lp4-pt{position:absolute;z-index:1;left:var(--x);top:var(--y);width:4px;height:4px;border-radius:50%;background:#ffb48a;box-shadow:0 0 8px #fc5304;pointer-events:none;animation:lp4Pt 1.8s cubic-bezier(.22,1,.36,1) forwards}
  @keyframes lp4Pt{0%{transform:translate(0,0) scale(0);opacity:0}20%{opacity:1;transform:translate(calc(var(--dx)*.2),calc(var(--dy)*.2)) scale(1)}100%{transform:translate(var(--dx),var(--dy)) scale(.3);opacity:0}}
</style>
<script>
(function () {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var g = document.querySelector('.lp4-bento'), cs = [].slice.call(g.querySelectorAll('.lp4-bc'));
  g.addEventListener('pointermove', function (e) {
    cs.forEach(function (c) {
      var r = c.getBoundingClientRect(), dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right), dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
      c.style.setProperty('--gl', Math.max(0, 1 - Math.hypot(dx, dy) / 240).toFixed(3));
    });
  });
  g.addEventListener('pointerleave', function () { cs.forEach(function (c) { c.style.setProperty('--gl', 0); }); });
  cs.forEach(function (c) {
    c.addEventListener('pointerenter', function () {
      for (var i = 0; i < 14; i++) {
        var p = document.createElement('i'); p.className = 'lp4-pt';
        p.style.setProperty('--x', Math.random() * 100 + '%'); p.style.setProperty('--y', Math.random() * 100 + '%');
        p.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px'); p.style.setProperty('--dy', (Math.random() * -90 - 20) + 'px');
        p.style.animationDelay = (Math.random() * .5) + 's';
        p.addEventListener('animationend', function () { this.remove(); }); c.appendChild(p);
      }
    });
  });
})();
</script>`,
    },
  },

  // 11 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-brand-color-phone",
    name: "Celular 3D com a Cor da Marca Trocando em 3 Passos",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "Mockup de celular com espessura de verdade (camadas empilhadas no eixo Z), girado cerca de -30° e inclinado pelo mouse e pela rolagem. Ao lado, três passos (sua marca, benefícios, assinatura) avançam com a rolagem ou no clique, com barra de progresso. A cor do app troca sozinha a cada 2,6s entre amostras; clicar numa amostra fixa a cor.",
    tags: ["3D Phone", "Thickness Layers", "Brand Swatches", "Steps", "Mouse Tilt"],
    defaultSection: "Seção White Label",
    previewType: "lm4-phone",
    tech: ["Tailwind CSS", "React", "CSS 3D Transforms"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const SWATCHES = ['#fc5304', '#76058f', '#0e9f6e', '#1d4ed8'];
const STEPS = ['Sua marca', 'Benefícios', 'Assinatura'];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function BrandPhone() {
  const box = useRef(null), stage = useRef(null);
  const [color, setColor] = useState(0), [manual, setManual] = useState(false), [step, setStep] = useState(0), [prog, setProg] = useState(0);
  // cor muda sozinha enquanto a pessoa não escolheu uma
  useEffect(() => {
    if (manual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setColor((c) => (c + 1) % SWATCHES.length), 2600);
    return () => clearInterval(t);
  }, [manual]);
  useEffect(() => {
    let mx = 0, my = 0, sp = 0;
    const put = () => {
      const small = innerWidth < 641;
      stage.current.style.transform = 'rotateY(' + ((small ? -22 : -34 + sp * 12) + mx * (small ? 10 : 24)).toFixed(1) + 'deg) rotateX(' + ((small ? 8 : 10) - my * (small ? 6 : 14)).toFixed(1) + 'deg)';
    };
    const onScroll = () => {
      const r = box.current.getBoundingClientRect(), p = clamp((innerHeight * 0.8 - r.top) / (innerHeight * 0.75), 0, 1);
      sp = p; setProg(p); setStep(p < 0.36 ? 0 : p < 0.7 ? 1 : 2); put();
    };
    const onMove = (e) => { const r = box.current.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width - 0.5; my = (e.clientY - r.top) / r.height - 0.5; put(); };
    const onLeave = () => { mx = my = 0; put(); };
    onScroll(); addEventListener('scroll', onScroll, { passive: true });
    box.current.addEventListener('pointermove', onMove); box.current.addEventListener('pointerleave', onLeave);
    return () => removeEventListener('scroll', onScroll);
  }, []);
  const brand = SWATCHES[color];
  return (
    <div ref={box} className="grid items-center gap-12 md:grid-cols-2">
      <div>
        <div className="h-1 overflow-hidden rounded bg-[#e7e0ef]"><i className="block h-full origin-left bg-[#fc5304]" style={{ transform: 'scaleX(' + ((step + 1) / 3) + ')', transition: 'transform .6s' }} /></div>
        <ol className="mt-6 grid gap-3">
          {STEPS.map((s, i) => (
            <li key={s}><button onClick={() => setStep(i)} aria-pressed={i === step}
              className={'w-full rounded-2xl border px-5 py-4 text-left font-["Baloo_2",sans-serif] text-lg font-bold transition ' + (i === step ? 'border-[#fc5304] text-[#1d1d1d]' : 'border-[#e7e0ef] text-[#5d5866]')}>{String(i + 1).padStart(2, '0')} {s}</button></li>
          ))}
        </ol>
        <div className="mt-6 flex gap-2" role="group" aria-label="Cor da marca">
          {SWATCHES.map((c, i) => (
            <button key={c} aria-label={'Cor ' + c} aria-pressed={i === color} onClick={() => { setManual(true); setColor(i); }}
              className={'h-9 w-9 rounded-full ring-offset-2 transition ' + (i === color ? 'ring-2 ring-[#1d1d1d]' : '')} style={{ background: c }} />
          ))}
        </div>
      </div>
      <div className="grid place-items-center [perspective:1600px]">
        <div ref={stage} className="relative h-[460px] w-[230px] transition-transform duration-150 [transform-style:preserve-3d]">
          {/* espessura: 10 camadas iguais empurradas para trás em Z */}
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} aria-hidden="true" className="absolute inset-0 rounded-[38px] bg-[#2a1640]" style={{ transform: 'translateZ(' + -(i + 1) * 1.2 + 'px)' }} />
          ))}
          <div className="absolute inset-0 overflow-hidden rounded-[38px] border-[6px] border-[#1d1d1d] bg-white">
            <div className="h-28 p-5 text-white transition-colors duration-700" style={{ background: brand }}>
              <b className="font-['Baloo_2',sans-serif] text-lg">{step === 0 ? 'SUA MARCA' : step === 1 ? 'Benefícios' : 'Assinatura'}</b>
            </div>
            <div className="grid gap-2 p-4">
              {[0, 1, 2, 3].map((i) => <span key={i} className="h-12 rounded-xl border border-[#e7e0ef]" style={{ borderLeft: '4px solid ' + brand }} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `<div class="bp grid place-items-center [perspective:1600px]">
  <div class="bp-stage relative h-[460px] w-[230px] [transform-style:preserve-3d]" style="transform:rotateY(-34deg) rotateX(10deg)">
    <div class="bp-depth"></div>
    <div class="absolute inset-0 overflow-hidden rounded-[38px] border-[6px] border-[#1d1d1d] bg-white">
      <div class="bp-top h-28 p-5 font-bold text-white transition-colors duration-700">SUA MARCA</div>
      <div class="grid gap-2 p-4"><span class="bp-row"></span><span class="bp-row"></span><span class="bp-row"></span></div>
    </div>
  </div>
  <div class="mt-6 flex gap-2"><button class="bp-sw" style="--c:#fc5304"></button><button class="bp-sw" style="--c:#76058f"></button><button class="bp-sw" style="--c:#0e9f6e"></button></div>
</div>
<style>
  .bp{--brand:#fc5304}
  .bp-top{background:var(--brand)}
  .bp-row{height:48px;border-radius:12px;border:1px solid #e7e0ef;border-left:4px solid var(--brand);transition:border-color .7s}
  .bp-sw{width:36px;height:36px;border-radius:50%;background:var(--c)}
  /* espessura: sombras empilhadas atrás simulam as camadas em Z */
  .bp-depth{position:absolute;inset:0;border-radius:38px;background:#2a1640;transform:translateZ(-12px)}
</style>
<script>
(function () {
  var bp = document.querySelector('.bp'), st = bp.querySelector('.bp-stage'), sws = [].slice.call(bp.querySelectorAll('.bp-sw')), k = 0, manual = false;
  function set(i) { k = i; bp.style.setProperty('--brand', sws[i].style.getPropertyValue('--c')); }
  sws.forEach(function (b, i) { b.addEventListener('click', function () { manual = true; set(i); }); });
  setInterval(function () { if (!manual) set((k + 1) % sws.length); }, 2600);
  bp.addEventListener('pointermove', function (e) { var r = bp.getBoundingClientRect(), mx = (e.clientX - r.left) / r.width - .5, my = (e.clientY - r.top) / r.height - .5; st.style.transform = 'rotateY(' + (-34 + mx * 24) + 'deg) rotateX(' + (10 - my * 14) + 'deg)'; });
  bp.addEventListener('pointerleave', function () { st.style.transform = 'rotateY(-34deg) rotateX(10deg)'; });
})();
</script>`,
    },
  },

  // 12 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-swipe-card-stack",
    name: "Pilha de Cards para Arrastar (ou Avançar Sozinha)",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "Cards empilhados com leve leque (cada um 12px para o lado, 14px para baixo, 2,4° girado e 4% menor). O da frente pode ser arrastado: passou de 70px, ele voa girando para o lado e vai para o fim da pilha; menos que isso, volta. Enquanto a pessoa não mexe, a pilha avança sozinha a cada 3,2s, só quando está visível.",
    tags: ["Card Stack", "Swipe", "Drag", "Tinder Style", "Autoplay"],
    defaultSection: "Seção de Benefícios",
    previewType: "lm4-swipe",
    tech: ["Tailwind CSS", "React", "Pointer Events"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export function SwipeStack({ items = ['Desconto em medicamentos', 'Entrega em casa', 'Rede nacional', 'App próprio'] }) {
  const [order, setOrder] = useState(items.map((_, i) => i));
  const [fly, setFly] = useState(null); // { dir }
  const [dx, setDx] = useState(0);
  const touched = useRef(false), drag = useRef(null), box = useRef(null);
  const next = (dir = 1) => {
    if (fly) return;
    setFly({ dir });
    setTimeout(() => { setOrder((o) => [...o.slice(1), o[0]]); setFly(null); setDx(0); }, 420);
  };
  // avança sozinho só enquanto visível e sem interação
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let vis = false;
    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting), { threshold: 0.2 });
    io.observe(box.current);
    const t = setInterval(() => { if (vis && !touched.current && !document.hidden) next(1); }, 3200);
    return () => { io.disconnect(); clearInterval(t); };
  });
  return (
    <div ref={box} className="relative mx-auto h-[300px] w-[280px] select-none">
      {order.map((ci, pos) => {
        const front = pos === 0;
        let tf = pos ? 'translate(' + pos * 12 + 'px,' + pos * 14 + 'px) rotate(' + pos * 2.4 + 'deg) scale(' + (1 - pos * 0.04) + ')' : '';
        if (front && fly) tf = 'translate(' + (fly.dir < 0 ? -120 : 120) + '%,-20px) rotate(' + (fly.dir < 0 ? -16 : 16) + 'deg)';
        else if (front && dx) tf = 'translateX(' + dx + 'px) rotate(' + (dx / 18).toFixed(2) + 'deg)';
        return (
          <article key={ci}
            onPointerDown={front ? (e) => { drag.current = { x: e.clientX }; e.currentTarget.setPointerCapture(e.pointerId); } : undefined}
            onPointerMove={front ? (e) => drag.current && setDx(e.clientX - drag.current.x) : undefined}
            onPointerUp={front ? () => { if (!drag.current) return; drag.current = null; touched.current = true; if (Math.abs(dx) > 70) next(dx < 0 ? -1 : 1); else setDx(0); } : undefined}
            className={'absolute inset-0 flex touch-pan-y flex-col justify-end rounded-[24px] border border-[#e7e0ef] bg-white p-6 ' + (front && drag.current ? '' : 'transition-[transform,opacity] duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)]') + (front ? ' cursor-grab active:cursor-grabbing' : '')}
            style={{ zIndex: 10 - pos, transform: tf, opacity: pos > 2 || (front && fly) ? 0 : 1 }}>
            <h3 className="font-['Baloo_2',sans-serif] text-xl font-bold text-[#1d1d1d]">{items[ci]}</h3>
          </article>
        );
      })}
      <button onClick={() => { touched.current = true; next(1); }} className="absolute -bottom-16 left-1/2 -translate-x-1/2 rounded-full border border-[#e7e0ef] px-5 py-2.5 text-sm font-bold text-[#c24100]">Próximo</button>
    </div>
  );
}`,
      tailwind: `<div class="sw relative mx-auto h-[300px] w-[280px] select-none">
  <article class="sw-c"><h3>Desconto em medicamentos</h3></article>
  <article class="sw-c"><h3>Entrega em casa</h3></article>
  <article class="sw-c"><h3>Rede nacional</h3></article>
  <article class="sw-c"><h3>App próprio</h3></article>
  <button class="sw-next absolute -bottom-16 left-1/2 -translate-x-1/2 rounded-full border border-[#e7e0ef] px-5 py-2.5 text-sm font-bold text-[#c24100]">Próximo</button>
</div>
<style>
  .sw-c{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:24px;border-radius:24px;border:1px solid #e7e0ef;background:#fff;touch-action:pan-y;transition:transform .42s cubic-bezier(.22,1,.36,1),opacity .42s}
  .sw-c.is-drag{transition:none}
  .sw-c h3{font:700 20px/1.2 "Baloo 2",sans-serif;color:#1d1d1d;margin:0}
</style>
<script>
(function () {
  var box = document.querySelector('.sw'), cards = [].slice.call(box.querySelectorAll('.sw-c')), ord = cards.map(function (_, i) { return i; }), busy = false, touched = false;
  function lay() { ord.forEach(function (ci, pos) { var c = cards[ci]; c.style.zIndex = 10 - pos; c.style.transform = pos ? 'translate(' + pos * 12 + 'px,' + pos * 14 + 'px) rotate(' + pos * 2.4 + 'deg) scale(' + (1 - pos * .04) + ')' : ''; c.style.opacity = pos > 2 ? 0 : 1; }); }
  function next(dir) {
    if (busy) return; busy = true; var f = cards[ord[0]];
    f.style.transform = 'translate(' + (dir < 0 ? -120 : 120) + '%,-20px) rotate(' + (dir < 0 ? -16 : 16) + 'deg)'; f.style.opacity = 0;
    setTimeout(function () { ord.push(ord.shift()); f.style.transition = 'none'; lay(); void f.offsetWidth; f.style.transition = ''; busy = false; }, 420);
  }
  lay();
  box.querySelector('.sw-next').addEventListener('click', function () { touched = true; next(1); });
  setInterval(function () { if (!touched && !document.hidden) next(1); }, 3200);
  var sx = 0, dx = 0, drag = null;
  cards.forEach(function (c) {
    c.addEventListener('pointerdown', function (e) { if (cards[ord[0]] !== c || busy) return; drag = c; sx = e.clientX; dx = 0; c.classList.add('is-drag'); c.setPointerCapture(e.pointerId); });
    c.addEventListener('pointermove', function (e) { if (drag !== c) return; dx = e.clientX - sx; c.style.transform = 'translateX(' + dx + 'px) rotate(' + dx / 18 + 'deg)'; });
    function up() { if (drag !== c) return; drag = null; c.classList.remove('is-drag'); touched = true; if (Math.abs(dx) > 70) next(dx < 0 ? -1 : 1); else lay(); }
    c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);
  });
})();
</script>`,
    },
  },

  // 13 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-coupon-tickets-drop",
    name: "Cupons com Recorte que Descem da Fenda um a um",
    category: "oferta",
    categoryLabel: "Oferta & Preço",
    description: "Lista de cupons brancos com ícone em degradê laranja à esquerda, linha tracejada e dois recortes redondos de verdade (feitos com máscara, então o fundo aparece por eles). Cada cupom fica escondido atrás de uma fenda clara e desce conforme a rolagem, em sequência, com 16% de atraso entre um e outro.",
    tags: ["Coupon", "Ticket Notch", "CSS Mask", "Scroll Driven", "Stagger"],
    defaultSection: "Seção de Parceiros e Descontos",
    previewType: "lm4-tickets",
    tech: ["Tailwind CSS", "React", "CSS Mask"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
// dois furos de 11px na altura da linha tracejada (x = 70px), no topo e na base
const MASK = 'radial-gradient(circle 11px at 70px 0,transparent 98%,#000) top/100% 51% no-repeat,radial-gradient(circle 11px at 70px 100%,transparent 98%,#000) bottom/100% 51% no-repeat';

export function CouponTickets({ items = ['20% em farmácias parceiras', 'Frete grátis no app', 'Academias com desconto', 'Cinema pela metade'] }) {
  const box = useRef(null), tix = useRef([]);
  useEffect(() => {
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tick = () => {
      const r = box.current.getBoundingClientRect(), vh = innerHeight;
      const p = RM ? 1 : clamp((0.95 * vh - r.top) / (0.6 * vh), 0, 1); // 0 com o topo em 95% da tela, 1 em 35%
      tix.current.forEach((t, i) => {
        const q = easeOut(clamp((p - i * 0.16) / 0.45, 0, 1));
        t.style.transform = q >= 1 ? '' : 'translateY(' + (-(1 - q) * 108).toFixed(1) + '%)';
      });
    };
    tick(); addEventListener('scroll', tick, { passive: true });
    return () => removeEventListener('scroll', tick);
  }, []);
  return (
    <div ref={box} className="flex flex-col gap-3 rounded-[28px] bg-[radial-gradient(120%_90%_at_70%_110%,#76058f_0%,#43096a_38%,#220b52_72%,#1a0638_100%)] p-8">
      {items.map((t, i) => (
        // fenda: a linha clara no topo de cada linha; o cupom sai de dentro dela
        <div key={t} className="relative overflow-hidden pt-1.5 before:absolute before:inset-x-[4%] before:top-0 before:h-[3px] before:rounded before:bg-white/20 before:content-['']">
          <div ref={(el) => (tix.current[i] = el)} className="grid min-h-[76px] grid-cols-[70px_1fr] rounded-[14px] bg-white will-change-transform" style={{ WebkitMask: MASK, mask: MASK }}>
            <span className="grid place-items-center rounded-l-[14px] bg-[linear-gradient(135deg,#fc5304,#ff7a33)] text-2xl font-bold text-white">%</span>
            <span className="flex items-center border-l-2 border-dashed border-[#e1d7ec] px-5 font-['Baloo_2',sans-serif] text-[17px] font-bold text-[#1d1d1d]">{t}</span>
          </div>
        </div>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="tix flex flex-col gap-3 rounded-[28px] bg-[#43096a] p-8">
  <div class="tix-row"><div class="tix-t"><span class="tix-ico">%</span><span class="tix-txt">20% em farmácias parceiras</span></div></div>
  <div class="tix-row"><div class="tix-t"><span class="tix-ico">%</span><span class="tix-txt">Frete grátis no app</span></div></div>
  <div class="tix-row"><div class="tix-t"><span class="tix-ico">%</span><span class="tix-txt">Academias com desconto</span></div></div>
</div>
<style>
  .tix-row{position:relative;overflow:hidden;padding-top:6px}
  .tix-row::before{content:"";position:absolute;top:0;left:4%;right:4%;height:3px;border-radius:3px;background:rgba(255,255,255,.22)}
  .tix-t{display:grid;grid-template-columns:70px 1fr;min-height:76px;border-radius:14px;background:#fff;
    -webkit-mask:radial-gradient(circle 11px at 70px 0,transparent 98%,#000) top/100% 51% no-repeat,radial-gradient(circle 11px at 70px 100%,transparent 98%,#000) bottom/100% 51% no-repeat;
    mask:radial-gradient(circle 11px at 70px 0,transparent 98%,#000) top/100% 51% no-repeat,radial-gradient(circle 11px at 70px 100%,transparent 98%,#000) bottom/100% 51% no-repeat}
  .tix-ico{display:grid;place-items:center;border-radius:14px 0 0 14px;background:linear-gradient(135deg,#fc5304,#ff7a33);color:#fff;font-weight:700;font-size:24px}
  .tix-txt{display:flex;align-items:center;padding:12px 20px;border-left:2px dashed #e1d7ec;font:700 17px/1.2 "Baloo 2",sans-serif;color:#1d1d1d}
</style>
<script>
(function () {
  var box = document.querySelector('.tix'), ts = [].slice.call(box.querySelectorAll('.tix-t'));
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function cl(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function tick() {
    var r = box.getBoundingClientRect(), vh = innerHeight, p = RM ? 1 : cl((.95 * vh - r.top) / (.6 * vh), 0, 1);
    ts.forEach(function (t, i) { var q = cl((p - i * .16) / .45, 0, 1); q = 1 - Math.pow(1 - q, 3); t.style.transform = q >= 1 ? '' : 'translateY(' + (-(1 - q) * 108) + '%)'; });
  }
  tick(); addEventListener('scroll', tick, { passive: true });
})();
</script>`,
    },
  },

  // 14 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-pinned-flow-panel",
    name: "Fluxo em 4 Etapas Preso na Tela com Painel que Muda",
    category: "etapas",
    categoryLabel: "Etapas & Linha do Tempo",
    description: "Bloco preso no meio da tela: em cima, 4 etapas ligadas por uma linha que enche em degradê laranja; embaixo, a tela de um painel (sidebar, trilha de navegação e título). Cada trecho de rolagem acende a próxima etapa, troca o item ativo da sidebar, preenche a trilha e muda o título do painel. A última etapa fica visível antes de soltar.",
    tags: ["Scroll Pin", "Stepper", "Progress Line", "Dashboard Mockup"],
    defaultSection: "Seção Como Funciona",
    previewType: "lm4-flow",
    tech: ["Tailwind CSS", "React", "Sticky"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function PinnedFlowPanel({ steps = ['Identificar', 'Cadastrar', 'Publicar', 'Acompanhar'] }) {
  const sec = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const tick = () => {
      const r = sec.current.getBoundingClientRect();
      setP(clamp(-r.top / (sec.current.offsetHeight - innerHeight), 0, 1));
    };
    tick(); addEventListener('scroll', tick, { passive: true });
    return () => removeEventListener('scroll', tick);
  }, []);
  // 4.3: a última etapa acende antes do fim, então ela fica um pouco na tela antes de soltar
  const k = Math.min(3, Math.floor(p * 4.3)), fill = clamp((p * 4.3) / 3, 0, 1);
  return (
    <section ref={sec} className="relative h-[250vh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center px-6">
        <div className="relative mx-auto grid w-full max-w-[920px] grid-cols-4 gap-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-[30px] h-[3px] rounded bg-[#e7e0ef]">
            <div className="absolute inset-0 origin-left rounded bg-[linear-gradient(135deg,#fc5304,#ff7a33)]" style={{ transform: 'scaleX(' + fill.toFixed(3) + ')' }} />
          </div>
          {steps.map((s, i) => (
            <div key={s} className="relative flex flex-col items-center gap-3 text-center">
              <span className={'grid h-[62px] w-[62px] place-items-center rounded-full border-2 font-bold transition-all duration-500 ' + (i <= k ? 'scale-[1.06] border-[#fc5304] bg-[linear-gradient(135deg,#fc5304,#ff7a33)] text-white' : 'border-[#e7e0ef] bg-white text-[#a597b8]')}>{i + 1}</span>
              <h3 className={'font-["Baloo_2",sans-serif] text-lg font-bold transition-colors ' + (i <= k ? 'text-[#1d1d1d]' : 'text-[#5d5866]')}>{s}</h3>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 grid h-[300px] w-full max-w-[760px] grid-cols-[150px_1fr] overflow-hidden rounded-3xl border border-[#e7e0ef] bg-white">
          <aside className="grid content-start gap-2 bg-[#f7f4fb] p-4">
            {steps.map((s, i) => <i key={s} className={'h-8 rounded-lg transition-colors ' + (i === k ? 'bg-[#fc5304]' : 'bg-[#ece6f3]')} />)}
          </aside>
          <div className="p-6">
            <div className="flex gap-1.5">{steps.map((s, i) => <i key={s} className={'h-1.5 w-10 rounded transition-colors ' + (i <= k ? 'bg-[#fc5304]' : 'bg-[#ece6f3]')} />)}</div>
            <h4 key={k} className="mt-5 font-['Baloo_2',sans-serif] text-2xl font-bold text-[#1d1d1d] motion-safe:animate-[lp4In_.5s_cubic-bezier(.22,1,.36,1)]">{steps[k]}</h4>
            <style>{'@keyframes lp4In{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:none}}'}</style>
            <div className="mt-4 grid gap-2">{[0, 1, 2].map((i) => <span key={i} className="h-10 rounded-xl bg-[#f7f4fb]" />)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<section class="flow relative h-[250vh]">
  <div class="sticky top-0 flex h-svh flex-col justify-center px-6">
    <div class="relative mx-auto grid w-full max-w-[920px] grid-cols-4 gap-4">
      <div class="absolute left-[12.5%] right-[12.5%] top-[30px] h-[3px] rounded bg-[#e7e0ef]"><div class="flow-fill absolute inset-0 origin-left scale-x-0 rounded bg-[#fc5304]"></div></div>
      <div class="flow-st"><span>1</span><h3>Identificar</h3></div>
      <div class="flow-st"><span>2</span><h3>Cadastrar</h3></div>
      <div class="flow-st"><span>3</span><h3>Publicar</h3></div>
      <div class="flow-st"><span>4</span><h3>Acompanhar</h3></div>
    </div>
    <h4 class="flow-title mx-auto mt-12 font-['Baloo_2',sans-serif] text-2xl font-bold">Identificar</h4>
  </div>
</section>
<style>
  .flow-st{position:relative;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center}
  .flow-st span{display:grid;place-items:center;width:62px;height:62px;border-radius:50%;background:#fff;border:2px solid #e7e0ef;color:#a597b8;font-weight:700;transition:all .5s cubic-bezier(.22,1,.36,1)}
  .flow-st h3{font:700 18px/1.2 "Baloo 2",sans-serif;color:#5d5866;margin:0;transition:color .5s}
  .flow-st.on span{border-color:#fc5304;background:linear-gradient(135deg,#fc5304,#ff7a33);color:#fff;transform:scale(1.06)}
  .flow-st.on h3{color:#1d1d1d}
</style>
<script>
(function () {
  var sec = document.querySelector('.flow'), sts = [].slice.call(sec.querySelectorAll('.flow-st')), fill = sec.querySelector('.flow-fill'), title = sec.querySelector('.flow-title'), last = -1;
  function cl(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function tick() {
    var r = sec.getBoundingClientRect(), p = cl(-r.top / (sec.offsetHeight - innerHeight), 0, 1), k = Math.min(3, Math.floor(p * 4.3));
    fill.style.transform = 'scaleX(' + cl(p * 4.3 / 3, 0, 1) + ')';
    if (k === last) return; last = k;
    sts.forEach(function (s, i) { s.classList.toggle('on', i <= k); });
    title.textContent = sts[k].querySelector('h3').textContent;
  }
  tick(); addEventListener('scroll', tick, { passive: true });
})();
</script>`,
    },
  },

  // 15 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-core-lines-cards",
    name: "Núcleo que Lança Linhas e Acende os Cards",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "Um núcleo redondo no centro com dois anéis girando (um tracejado lento, um laranja rápido) e quatro cards em volta. Com a rolagem, uma linha curva sai do núcleo até cada card, um depois do outro, e o card acende (borda clara e ícone em degradê) quando a linha chega. As curvas são recalculadas pela posição real dos cards; no celular viram um trilho pela esquerda.",
    tags: ["Connector Lines", "SVG Path", "Scroll Driven", "Hub", "Integrations"],
    defaultSection: "Seção de Tecnologia",
    previewType: "lm4-core",
    tech: ["Tailwind CSS", "React", "SVG pathLength"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function CoreLinesCards({ items = ['Integração por API', 'Login único', 'Dados criptografados', 'LGPD'] }) {
  const box = useRef(null), core = useRef(null), cards = useRef([]), lines = useRef([]);
  useEffect(() => {
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const measure = () => {
      const b = box.current.getBoundingClientRect(), cr = core.current.getBoundingClientRect();
      const cx = cr.left + cr.width / 2 - b.left, cy = cr.top + cr.height / 2 - b.top;
      cards.current.forEach((c, i) => {
        const r = c.getBoundingClientRect(), left = r.left - b.left < cx;
        const x = left ? r.right - b.left : r.left - b.left, y = r.top + r.height / 2 - b.top, mx = (x + cx) / 2;
        lines.current[i].setAttribute('d', 'M' + cx + ' ' + cy + 'C' + mx + ' ' + cy + ' ' + mx + ' ' + y + ' ' + x + ' ' + y);
      });
    };
    const tick = () => {
      const r = box.current.getBoundingClientRect(), vh = innerHeight;
      const p = RM ? 1 : clamp((0.85 * vh - r.top) / (0.65 * vh), 0, 1);
      cards.current.forEach((c, i) => {
        const q = clamp((p - i * 0.12) / 0.45, 0, 1);
        lines.current[i].style.strokeDashoffset = (1 - q).toFixed(3);
        c.classList.toggle('is-on', q >= 0.98);
      });
    };
    measure(); tick();
    addEventListener('resize', measure); addEventListener('scroll', tick, { passive: true });
    return () => { removeEventListener('resize', measure); removeEventListener('scroll', tick); };
  }, []);
  const pos = ['md:col-start-1 md:row-start-1', 'md:col-start-3 md:row-start-1', 'md:col-start-1 md:row-start-2', 'md:col-start-3 md:row-start-2'];
  return (
    <div ref={box} className="relative grid gap-7 rounded-[32px] bg-[radial-gradient(120%_90%_at_70%_110%,#76058f_0%,#43096a_38%,#220b52_72%,#1a0638_100%)] p-10 md:grid-cols-[1fr_220px_1fr] md:grid-rows-2 md:items-center">
      <style>{'@keyframes lp4Spin{to{transform:rotate(360deg)}}.lp4-tc.is-on{border-color:rgba(255,180,138,.65);background:rgba(67,9,106,.6)}.lp4-tc.is-on .lp4-ti{background:linear-gradient(135deg,#fc5304,#ff7a33);color:#fff;border-color:transparent}'}</style>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {items.map((t, i) => <path key={t} ref={(el) => (lines.current[i] = el)} pathLength="1" fill="none" stroke="rgba(255,180,138,.7)" strokeWidth="2" strokeDasharray="1" strokeDashoffset="1" />)}
      </svg>
      <div ref={core} className="relative z-[1] grid aspect-square place-items-center md:col-start-2 md:row-span-2">
        <span className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-white/30 motion-safe:animate-[lp4Spin_26s_linear_infinite]" />
        <span className="absolute inset-[16%] rounded-full border-[1.5px] border-[#fc5304]/50 border-b-transparent border-l-transparent motion-safe:animate-[lp4Spin_6s_linear_infinite]" />
        <span className="grid aspect-square w-[46%] place-items-center rounded-full bg-[linear-gradient(135deg,#fc5304,#ff7a33)] text-3xl font-bold text-white">+</span>
      </div>
      {items.map((t, i) => (
        <div key={t} ref={(el) => (cards.current[i] = el)} className={'lp4-tc relative z-[1] flex items-center gap-4 rounded-[20px] border border-white/15 bg-[#1a0638]/55 p-5 text-white transition-colors duration-500 ' + pos[i]}>
          <span className="lp4-ti grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border border-white/20 text-[#ffb48a] transition-colors duration-500">◆</span>
          <h3 className="font-['Baloo_2',sans-serif] text-lg font-bold">{t}</h3>
        </div>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="core relative grid items-center gap-7 rounded-[32px] bg-[#43096a] p-10 md:grid-cols-[1fr_220px_1fr] md:grid-rows-2">
  <svg class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true"><path pathLength="1"/><path pathLength="1"/><path pathLength="1"/><path pathLength="1"/></svg>
  <div class="core-hub relative grid aspect-square place-items-center md:col-start-2 md:row-span-2">
    <span class="core-r1"></span><span class="core-r2"></span><span class="core-in">+</span>
  </div>
  <div class="core-c md:col-start-1 md:row-start-1">Integração por API</div>
  <div class="core-c md:col-start-3 md:row-start-1">Login único</div>
  <div class="core-c md:col-start-1 md:row-start-2">Dados criptografados</div>
  <div class="core-c md:col-start-3 md:row-start-2">LGPD</div>
</div>
<style>
  .core svg path{fill:none;stroke:rgba(255,180,138,.7);stroke-width:2;stroke-dasharray:1;stroke-dashoffset:1}
  .core-r1{position:absolute;inset:0;border-radius:50%;border:1.5px dashed rgba(255,255,255,.28);animation:cSpin 26s linear infinite}
  .core-r2{position:absolute;inset:16%;border-radius:50%;border:1.5px solid rgba(252,83,4,.5);border-left-color:transparent;border-bottom-color:transparent;animation:cSpin 6s linear infinite}
  .core-in{display:grid;place-items:center;width:46%;aspect-ratio:1;border-radius:50%;background:linear-gradient(135deg,#fc5304,#ff7a33);color:#fff;font-size:30px;font-weight:700}
  .core-c{position:relative;z-index:1;padding:22px;border:1px solid rgba(255,255,255,.16);border-radius:20px;background:rgba(26,6,56,.55);color:#fff;font:700 18px/1.25 "Baloo 2",sans-serif;transition:border-color .6s,background .6s}
  .core-c.on{border-color:rgba(255,180,138,.65);background:rgba(67,9,106,.6)}
  @keyframes cSpin{to{transform:rotate(360deg)}}
  @media (prefers-reduced-motion:reduce){.core-r1,.core-r2{animation:none}}
</style>
<script>
(function () {
  var box = document.querySelector('.core'), hub = box.querySelector('.core-hub'), cs = [].slice.call(box.querySelectorAll('.core-c')), ls = [].slice.call(box.querySelectorAll('svg path'));
  function cl(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function measure() {
    var b = box.getBoundingClientRect(), cr = hub.getBoundingClientRect(), cx = cr.left + cr.width / 2 - b.left, cy = cr.top + cr.height / 2 - b.top;
    cs.forEach(function (c, i) { var r = c.getBoundingClientRect(), left = r.left - b.left < cx, x = left ? r.right - b.left : r.left - b.left, y = r.top + r.height / 2 - b.top, mx = (x + cx) / 2; ls[i].setAttribute('d', 'M' + cx + ' ' + cy + 'C' + mx + ' ' + cy + ' ' + mx + ' ' + y + ' ' + x + ' ' + y); });
  }
  function tick() {
    var r = box.getBoundingClientRect(), p = cl((.85 * innerHeight - r.top) / (.65 * innerHeight), 0, 1);
    cs.forEach(function (c, i) { var q = cl((p - i * .12) / .45, 0, 1); ls[i].style.strokeDashoffset = 1 - q; c.classList.toggle('on', q >= .98); });
  }
  measure(); tick(); addEventListener('resize', measure); addEventListener('scroll', tick, { passive: true });
})();
</script>`,
    },
  },

  // 16 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-draggable-3d-dashboard",
    name: "Painel de Indicadores em 3D que se Abre em Camadas e Gira ao Arrastar",
    category: "numeros",
    categoryLabel: "Números & Contadores",
    description: "Painel ilustrativo inclinado 10° que, ao chegar na tela, se abre em camadas (cada bloco sobe em Z) enquanto as barras enchem, a linha do gráfico se desenha e o anel completa. Dá para arrastar e girar o painel; ao soltar ele volta ao lugar com mola. Abas trocam todos os dados de uma vez e clicar num bloco troca só os dados dele.",
    tags: ["3D Dashboard", "Drag Rotate", "Spring", "Charts", "Tabs"],
    defaultSection: "Seção de Indicadores",
    previewType: "lm4-dash",
    tech: ["Tailwind CSS", "React", "CSS 3D Transforms", "SVG"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const BARS = [[34, 56, 44, 72, 60, 84, 68, 92], [60, 42, 78, 52, 88, 64, 46, 80], [28, 48, 62, 58, 74, 70, 90, 96]];
const LINE = [[118, 112, 88, 96, 70, 52, 60, 38, 30], [104, 82, 96, 70, 78, 50, 58, 44, 26], [124, 104, 108, 80, 62, 72, 46, 34, 20]];
const DON = [0.56, 0.42, 0.7];
const curve = (ys) => { const w = 400 / (ys.length - 1); let d = 'M0 ' + ys[0]; for (let i = 1; i < ys.length; i++) { const x0 = (i - 1) * w, x1 = i * w; d += ' C' + (x0 + w / 2) + ' ' + ys[i - 1] + ' ' + (x1 - w / 2) + ' ' + ys[i] + ' ' + x1 + ' ' + ys[i]; } return d; };

export function Dashboard3D() {
  const stage = useRef(null), panel = useRef(null);
  const [tab, setTab] = useState(0), [bars, setBars] = useState(0), [open, setOpen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOpen(true), { threshold: 0.35 });
    io.observe(stage.current);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => io.disconnect();
    // giro com mola: arrasta livre, solta e volta para rotateX(10deg) rotateY(0)
    let rx = 10, ry = 0, vx = 0, vy = 0, drag = null, run = false;
    const apply = () => (panel.current.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)');
    const loop = () => {
      if (!drag) { vx += (10 - rx) * 0.05; vy += (0 - ry) * 0.05; vx *= 0.78; vy *= 0.78; rx += vx; ry += vy; }
      apply();
      if (drag || Math.abs(10 - rx) + Math.abs(ry) + Math.abs(vx) + Math.abs(vy) > 0.02) requestAnimationFrame(loop); else run = false;
    };
    const kick = () => { if (!run) { run = true; requestAnimationFrame(loop); } };
    const st = stage.current;
    const down = (e) => { if (e.target.closest('button')) return; drag = { x: e.clientX, y: e.clientY, rx, ry }; st.setPointerCapture(e.pointerId); kick(); };
    const move = (e) => { if (!drag) return; ry = Math.max(-60, Math.min(60, drag.ry + (e.clientX - drag.x) * 0.25)); rx = Math.max(-20, Math.min(50, drag.rx - (e.clientY - drag.y) * 0.18)); vx = vy = 0; };
    const up = () => { drag = null; kick(); };
    st.addEventListener('pointerdown', down); st.addEventListener('pointermove', move); st.addEventListener('pointerup', up); st.addEventListener('pointercancel', up);
    apply();
    return () => { io.disconnect(); st.removeEventListener('pointerdown', down); st.removeEventListener('pointermove', move); st.removeEventListener('pointerup', up); };
  }, []);
  const z = (n) => ({ transform: 'translateZ(' + (open ? n : 0) + 'px)', transition: 'transform .9s cubic-bezier(.22,1,.36,1)' });
  return (
    <div ref={stage} className="grid cursor-grab touch-pan-y place-items-center py-10 [perspective:1400px] active:cursor-grabbing">
      <div ref={panel} className="grid w-full max-w-[640px] gap-4 rounded-[28px] border border-[#e7e0ef] bg-white p-6 [transform-style:preserve-3d]" style={{ transform: 'rotateX(10deg)' }}>
        <div className="flex gap-2" style={z(20)}>
          {['Uso', 'Economia', 'Adesão'].map((t, i) => (
            <button key={t} onClick={() => { setTab(i); setBars(i); }} aria-pressed={i === tab}
              className={'rounded-full px-4 py-1.5 text-sm font-bold ' + (i === tab ? 'bg-[#fc5304] text-white' : 'bg-[#f7f4fb] text-[#5d5866]')}>{t}</button>
          ))}
        </div>
        <svg viewBox="0 0 400 140" className="h-36 w-full rounded-2xl bg-[#f7f4fb]" style={z(40)} aria-hidden="true">
          <path d={curve(LINE[tab]) + ' V140 H0 Z'} fill="rgba(252,83,4,.12)" style={{ transition: 'd .6s' }} />
          <path d={curve(LINE[tab])} fill="none" stroke="#fc5304" strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={open ? 0 : 1} style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1), d .6s' }} />
        </svg>
        <div className="grid grid-cols-[1fr_120px] gap-4" style={z(60)}>
          <button onClick={() => setBars((b) => (b + 1) % 3)} className="flex h-32 items-end gap-2 rounded-2xl bg-[#f7f4fb] p-4" aria-label="Trocar dados das barras">
            {BARS[bars].map((h, i) => <i key={i} className="flex-1 origin-bottom rounded-t-md bg-[linear-gradient(#ff7a33,#76058f)]" style={{ height: h + '%', transform: 'scaleY(' + (open ? 1 : 0.04) + ')', transition: 'transform .9s cubic-bezier(.22,1,.36,1) ' + i * 0.05 + 's, height .6s' }} />)}
          </button>
          <svg viewBox="0 0 42 42" className="h-32 w-full -rotate-90" aria-hidden="true">
            <circle cx="21" cy="21" r="15.9" fill="none" stroke="#ece6f3" strokeWidth="5" />
            <circle cx="21" cy="21" r="15.9" fill="none" stroke="#fc5304" strokeWidth="5" pathLength="1" strokeDasharray={(open ? DON[tab] : 0) + ' 1'} style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(.22,1,.36,1)' }} />
          </svg>
        </div>
        <p className="text-center text-xs text-[#5d5866]" style={z(10)}>Arraste para girar</p>
      </div>
    </div>
  );
}`,
      tailwind: `<div class="d3 grid cursor-grab place-items-center py-10 [perspective:1400px]">
  <div class="d3-panel grid w-full max-w-[640px] gap-4 rounded-[28px] border border-[#e7e0ef] bg-white p-6 [transform-style:preserve-3d]" style="transform:rotateX(10deg)">
    <div class="d3-layer h-36 rounded-2xl bg-[#f7f4fb]" style="--z:40px"></div>
    <div class="d3-layer flex h-32 items-end gap-2 rounded-2xl bg-[#f7f4fb] p-4" style="--z:60px">
      <i style="height:34%"></i><i style="height:56%"></i><i style="height:44%"></i><i style="height:72%"></i><i style="height:60%"></i><i style="height:84%"></i>
    </div>
  </div>
</div>
<style>
  .d3-layer{transition:transform .9s cubic-bezier(.22,1,.36,1)}
  .d3.is-ex .d3-layer{transform:translateZ(var(--z))}
  .d3-layer i{flex:1;border-radius:6px 6px 0 0;background:linear-gradient(#ff7a33,#76058f);transform-origin:bottom;transform:scaleY(.04);transition:transform .9s cubic-bezier(.22,1,.36,1)}
  .d3.is-ex .d3-layer i{transform:none}
</style>
<script>
(function () {
  var st = document.querySelector('.d3'), pn = st.querySelector('.d3-panel'), rx = 10, ry = 0, vx = 0, vy = 0, drag = null, run = false;
  new IntersectionObserver(function (es) { if (es[0].isIntersecting) st.classList.add('is-ex'); }, { threshold: .35 }).observe(st);
  function apply() { pn.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)'; }
  function loop() { if (!drag) { vx += (10 - rx) * .05; vy += -ry * .05; vx *= .78; vy *= .78; rx += vx; ry += vy; } apply(); if (drag || Math.abs(10 - rx) + Math.abs(ry) + Math.abs(vx) + Math.abs(vy) > .02) requestAnimationFrame(loop); else run = false; }
  function kick() { if (!run) { run = true; requestAnimationFrame(loop); } }
  st.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY, rx: rx, ry: ry }; st.setPointerCapture(e.pointerId); kick(); });
  st.addEventListener('pointermove', function (e) { if (!drag) return; ry = Math.max(-60, Math.min(60, drag.ry + (e.clientX - drag.x) * .25)); rx = Math.max(-20, Math.min(50, drag.rx - (e.clientY - drag.y) * .18)); });
  st.addEventListener('pointerup', function () { drag = null; kick(); });
})();
</script>`,
    },
  },

  // 17 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-ring-orb-steps",
    name: "Anel com Ponto que Percorre as Etapas de Implantação",
    category: "etapas",
    categoryLabel: "Etapas & Linha do Tempo",
    description: "Bloco preso na rolagem com um anel grande: um traço em degradê preenche o anel conforme a página desce e um ponto brilhante corre na frente dele. As 5 etapas ficam distribuídas em volta e acendem quando o ponto passa; o número da etapa atual aparece grande no centro e em marca d'água atrás. No celular a lista vira uma linha embaixo do anel.",
    tags: ["Progress Ring", "Orbit Dot", "Scroll Pin", "Steps", "SVG"],
    defaultSection: "Seção de Implantação",
    previewType: "lm4-ring",
    tech: ["Tailwind CSS", "React", "SVG pathLength", "Sticky"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function RingOrbSteps({ steps = ['Diagnóstico', 'Configuração', 'Lançamento', 'Engajamento', 'Acompanhamento'] }) {
  const sec = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const tick = () => { const r = sec.current.getBoundingClientRect(); setP(clamp(-r.top / (sec.current.offsetHeight - innerHeight), 0, 1)); };
    tick(); addEventListener('scroll', tick, { passive: true });
    return () => removeEventListener('scroll', tick);
  }, []);
  const n = steps.length, a = Math.min(n - 1, Math.floor(p * n));
  const R = 150, C = 190; // raio e centro no viewBox 380
  const pt = (i) => { const ang = (i / n) * Math.PI * 2 - Math.PI / 2; return [C + Math.cos(ang) * R, C + Math.sin(ang) * R]; };
  const orb = p * 360 - 90;
  return (
    <section ref={sec} className="relative h-[190vh] bg-[#f7f4fb]">
      <div className="sticky top-0 grid h-svh place-items-center">
        <span aria-hidden="true" className="pointer-events-none absolute font-['Baloo_2',sans-serif] text-[40vh] font-bold leading-none text-[#76058f]/5">{String(a + 1).padStart(2, '0')}</span>
        <svg viewBox="0 0 380 380" className="relative w-[min(80vw,420px)]" aria-hidden="true">
          <defs><linearGradient id="lp4-rg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#fc5304" /><stop offset="1" stopColor="#76058f" /></linearGradient></defs>
          <circle cx={C} cy={C} r={R} fill="none" stroke="#e7e0ef" strokeWidth="6" />
          <circle cx={C} cy={C} r={R} fill="none" stroke="url(#lp4-rg)" strokeWidth="6" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - p} transform={'rotate(-90 ' + C + ' ' + C + ')'} />
          {steps.map((s, i) => { const [x, y] = pt(i); return <circle key={s} cx={x} cy={y} r="11" fill={i <= a ? '#fc5304' : '#fff'} stroke={i <= a ? '#fc5304' : '#e7e0ef'} strokeWidth="3" style={{ transition: 'fill .4s, stroke .4s' }} />; })}
          <circle cx={C + Math.cos(orb * Math.PI / 180) * R} cy={C + Math.sin(orb * Math.PI / 180) * R} r="8" fill="#fff" stroke="#fc5304" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 8px rgba(252,83,4,.8))' }} />
          <text x={C} y={C - 4} textAnchor="middle" className="fill-[#1d1d1d] font-['Baloo_2',sans-serif] text-[64px] font-bold">{String(a + 1).padStart(2, '0')}</text>
          <text x={C} y={C + 34} textAnchor="middle" className="fill-[#c24100] text-[16px] font-bold">{steps[a]}</text>
        </svg>
        <ol className="absolute bottom-10 flex flex-wrap justify-center gap-2 px-4">
          {steps.map((s, i) => <li key={s} className={'rounded-full px-3 py-1 text-xs font-bold transition ' + (i === a ? 'bg-[#fc5304] text-white' : i < a ? 'bg-white text-[#1d1d1d]' : 'bg-white/60 text-[#a597b8]')}>{s}</li>)}
        </ol>
      </div>
    </section>
  );
}`,
      tailwind: `<section class="ring relative h-[190vh] bg-[#f7f4fb]">
  <div class="sticky top-0 grid h-svh place-items-center">
    <svg viewBox="0 0 380 380" class="w-[min(80vw,420px)]" aria-hidden="true">
      <circle cx="190" cy="190" r="150" fill="none" stroke="#e7e0ef" stroke-width="6"/>
      <circle class="ring-prog" cx="190" cy="190" r="150" fill="none" stroke="#fc5304" stroke-width="6" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" transform="rotate(-90 190 190)"/>
      <circle class="ring-orb" r="8" fill="#fff" stroke="#fc5304" stroke-width="3"/>
      <text class="ring-num" x="190" y="200" text-anchor="middle" font-size="64" font-weight="700" fill="#1d1d1d">01</text>
    </svg>
  </div>
</section>
<script>
(function () {
  var sec = document.querySelector('.ring'), pr = sec.querySelector('.ring-prog'), orb = sec.querySelector('.ring-orb'), num = sec.querySelector('.ring-num');
  function tick() {
    var r = sec.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / (sec.offsetHeight - innerHeight))), a = (p * 360 - 90) * Math.PI / 180;
    pr.style.strokeDashoffset = 1 - p;
    orb.setAttribute('cx', 190 + Math.cos(a) * 150); orb.setAttribute('cy', 190 + Math.sin(a) * 150);
    num.textContent = '0' + (Math.min(4, Math.floor(p * 5)) + 1);
  }
  tick(); addEventListener('scroll', tick, { passive: true });
})();
</script>`,
    },
  },

  // 18 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-plus-texture-spotlight",
    name: "Textura de '+' com Foco de Luz que Segue o Mouse",
    category: "fundos",
    categoryLabel: "Fundos & Texturas",
    description: "Fundo das seções com uma grade bem fina de sinais de '+' (o '+' da marca) quase invisível. Um foco de 460px segue o mouse com atraso suave e, onde ele passa, os '+' ficam maiores e laranja. A grade é alinhada pela posição na página, então continua sem emenda de uma seção para outra. Desligado no toque e com movimento reduzido.",
    tags: ["Pattern", "Spotlight", "Mouse Follow", "Lerp", "Brand Texture"],
    defaultSection: "Fundo Geral",
    previewType: "lm4-plus",
    tech: ["Tailwind CSS", "React", "SVG Data URI"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const plus = (stroke, op, w, a, b) => 'url("data:image/svg+xml,' + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28'><path d='M14 " + a + "v" + b + "M" + a + " 14h" + b + "' stroke='" + stroke + "' stroke-opacity='" + op + "' stroke-width='" + w + "' stroke-linecap='round'/></svg>") + '")';
const FAINT = plus('#76058f', 0.065, 1.3, 11.5, 5);
const LIT = plus('#fc5304', 0.42, 1.6, 10.5, 7);

export function PlusTexture({ children, className = 'bg-white' }) {
  const sec = useRef(null), spot = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const R = 230;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, on = false;
    const apply = () => {
      const lx = x - R, ly = y - R;
      spot.current.style.transform = 'translate3d(' + lx.toFixed(1) + 'px,' + ly.toFixed(1) + 'px,0)';
      // o fundo do foco anda ao contrário: os '+' acesos ficam alinhados com os apagados
      spot.current.style.backgroundPosition = (-lx).toFixed(1) + 'px ' + (-ly).toFixed(1) + 'px, 0 0';
    };
    const tick = () => { raf = 0; x += (tx - x) * 0.16; y += (ty - y) * 0.16; apply(); if (Math.abs(tx - x) + Math.abs(ty - y) > 0.5) raf = requestAnimationFrame(tick); };
    const move = (e) => {
      const r = sec.current.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top;
      if (!on) { on = true; x = tx; y = ty; spot.current.style.opacity = 1; }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => { on = false; spot.current.style.opacity = 0; };
    const el = sec.current;
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section ref={sec} className={'relative isolate overflow-hidden ' + className}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: FAINT, backgroundSize: '28px 28px' }} />
      <i ref={spot} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 -z-10 h-[460px] w-[460px] opacity-0 transition-opacity duration-500"
        style={{ backgroundImage: LIT + ', radial-gradient(closest-side, rgba(252,83,4,.035), transparent)', backgroundSize: '28px 28px, 100% 100%',
          WebkitMaskImage: 'radial-gradient(closest-side,#000,transparent)', maskImage: 'radial-gradient(closest-side,#000,transparent)' }} />
      {children}
    </section>
  );
}`,
      tailwind: `<section class="pt relative isolate overflow-hidden bg-white py-32">
  <div class="pt-tex" aria-hidden="true"><i></i></div>
  <h2 class="relative text-center font-['Baloo_2',sans-serif] text-4xl font-bold">Seção com textura</h2>
</section>
<style>
  .pt-tex{position:absolute;inset:0;z-index:-1;pointer-events:none;overflow:hidden;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Cpath d='M14 11.5v5M11.5 14h5' stroke='%2376058f' stroke-opacity='.065' stroke-width='1.3' stroke-linecap='round'/%3E%3C/svg%3E");background-size:28px 28px}
  .pt-tex i{position:absolute;left:0;top:0;width:460px;height:460px;opacity:0;transition:opacity .5s;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Cpath d='M14 10.5v7M10.5 14h7' stroke='%23fc5304' stroke-opacity='.42' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E");background-size:28px 28px;-webkit-mask-image:radial-gradient(closest-side,#000,transparent);mask-image:radial-gradient(closest-side,#000,transparent)}
  .pt-tex.is-on i{opacity:1}
</style>
<script>
(function () {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var sec = document.querySelector('.pt'), tex = sec.querySelector('.pt-tex'), sp = tex.firstElementChild, R = 230, x = 0, y = 0, tx = 0, ty = 0, raf = 0, on = false;
  function apply() { var lx = x - R, ly = y - R; sp.style.transform = 'translate3d(' + lx + 'px,' + ly + 'px,0)'; sp.style.backgroundPosition = (-lx) + 'px ' + (-ly) + 'px'; }
  function tick() { raf = 0; x += (tx - x) * .16; y += (ty - y) * .16; apply(); if (Math.abs(tx - x) + Math.abs(ty - y) > .5) raf = requestAnimationFrame(tick); }
  sec.addEventListener('pointermove', function (e) { var r = sec.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; if (!on) { on = true; x = tx; y = ty; tex.classList.add('is-on'); } if (!raf) raf = requestAnimationFrame(tick); });
  sec.addEventListener('pointerleave', function () { on = false; tex.classList.remove('is-on'); });
})();
</script>`,
    },
  },

  // 19 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-twisted-ribbon-scroll",
    name: "Fita Torcida que se Desenrola pela Página com a Rolagem",
    category: "fundos",
    categoryLabel: "Fundos & Texturas",
    description: "Uma fita larga e clara serpenteia pela página inteira atrás do conteúdo, a partir da segunda seção. A largura afina até zero a cada torção e a face troca de cor (lilás e pêssego), como uma fita de verdade virando. A rolagem revela a fita até um pouco abaixo do meio da tela; no fim da página ela aparece inteira. A curva é soma de três senos, então nunca fica repetitiva.",
    tags: ["Ribbon", "SVG Path", "Scroll Reveal", "Clip Path", "Background"],
    defaultSection: "Fundo Geral",
    previewType: "lm4-ribbon",
    tech: ["React", "SVG", "clip-path"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
// centro da fita em cada altura y: soma de 3 senos com períodos diferentes
const cx = (y, W, A) => W / 2 + A * (0.55 * Math.sin(y / 270 + 0.7) + 0.3 * Math.sin(y / 143 + 2.1) + 0.15 * Math.sin(y / 83 + 0.3));

// Envolva as seções: <RibbonBackground><section>...</section>...</RibbonBackground>
export function RibbonBackground({ children, colors = ['#e4cde9', '#fed9c8'] }) {
  const box = useRef(null), svg = useRef(null);
  useEffect(() => {
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let H = 0;
    const build = () => {
      const W = box.current.clientWidth; H = box.current.offsetHeight;
      const small = W < 641, A = W * (small ? 0.3 : 0.27), RW = small ? 18 : 32, P = small ? 460 : 640;
      let html = '';
      for (let k = 0; k * P < H; k++) {
        const L = [], R = [];
        for (let y = k * P; y <= (k + 1) * P + 0.01; y += 8) {
          const x = cx(y, W, A), dx = (cx(y + 1, W, A) - cx(y - 1, W, A)) / 2, n = 1 / Math.sqrt(1 + dx * dx);
          const w = (RW * Math.sin((Math.PI * (y - k * P)) / P)) / 2; // afina para 0 nas pontas de cada trecho = torção
          L.push((x + n * w).toFixed(1) + ' ' + (y - dx * n * w).toFixed(1)); R.unshift((x - n * w).toFixed(1) + ' ' + (y + dx * n * w).toFixed(1));
        }
        html += '<path fill="' + colors[k % 2] + '" d="M' + L.join('L') + 'L' + R.join('L') + 'Z"/>';
      }
      svg.current.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svg.current.innerHTML = html;
      reveal();
    };
    const reveal = () => {
      const max = document.documentElement.scrollHeight - innerHeight, v = max > 0 ? clamp(scrollY / max, 0, 1) : 1;
      const top = box.current.getBoundingClientRect().top + scrollY;
      const ry = RM ? H : scrollY + innerHeight * (0.62 + 0.38 * v) - top; // perto do fim revela até embaixo
      const c = clamp(H - ry, 0, H);
      svg.current.style.clipPath = 'inset(0 0 ' + c.toFixed(0) + 'px 0)';
    };
    build();
    const ro = new ResizeObserver(build); ro.observe(box.current);
    addEventListener('scroll', reveal, { passive: true });
    return () => { ro.disconnect(); removeEventListener('scroll', reveal); };
  }, [colors]);
  return (
    <div ref={box} className="relative isolate">
      <svg ref={svg} aria-hidden="true" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
      {children}
    </div>
  );
}`,
      tailwind: `<div class="rib-box relative isolate">
  <svg class="rib pointer-events-none absolute inset-0 -z-10 h-full w-full" preserveAspectRatio="none" aria-hidden="true"></svg>
  <!-- suas seções aqui (fundo transparente para a fita aparecer) -->
</div>
<script>
(function () {
  var box = document.querySelector('.rib-box'), svg = box.querySelector('.rib'), H = 0, cols = ['#e4cde9', '#fed9c8'];
  function cl(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function cx(y, W, A) { return W / 2 + A * (.55 * Math.sin(y / 270 + .7) + .3 * Math.sin(y / 143 + 2.1) + .15 * Math.sin(y / 83 + .3)); }
  function build() {
    var W = box.clientWidth; H = box.offsetHeight; var small = W < 641, A = W * (small ? .3 : .27), RW = small ? 18 : 32, P = small ? 460 : 640, html = '';
    for (var k = 0; k * P < H; k++) {
      var L = [], R = [];
      for (var y = k * P; y <= (k + 1) * P + .01; y += 8) {
        var x = cx(y, W, A), dx = (cx(y + 1, W, A) - cx(y - 1, W, A)) / 2, n = 1 / Math.sqrt(1 + dx * dx), w = RW * Math.sin(Math.PI * (y - k * P) / P) / 2;
        L.push((x + n * w).toFixed(1) + ' ' + (y - dx * n * w).toFixed(1)); R.unshift((x - n * w).toFixed(1) + ' ' + (y + dx * n * w).toFixed(1));
      }
      html += '<path fill="' + cols[k % 2] + '" d="M' + L.join('L') + 'L' + R.join('L') + 'Z"/>';
    }
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.innerHTML = html; reveal();
  }
  function reveal() {
    var max = document.documentElement.scrollHeight - innerHeight, v = max > 0 ? cl(scrollY / max, 0, 1) : 1, top = box.getBoundingClientRect().top + scrollY;
    var ry = scrollY + innerHeight * (.62 + .38 * v) - top; svg.style.clipPath = 'inset(0 0 ' + cl(H - ry, 0, H) + 'px 0)';
  }
  build(); new ResizeObserver(build).observe(box); addEventListener('scroll', reveal, { passive: true });
})();
</script>`,
    },
  },

  // 20 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-blur-reveal-reverse",
    name: "Entrada com Desfoque que Volta Quando o Bloco Sai por Baixo",
    category: "entradas",
    categoryLabel: "Entradas na Rolagem",
    description: "Blocos entram subindo 30px e saindo de um desfoque de 12px; variantes para entrar pela esquerda, pela direita, crescendo, dando as cartas (girado -5° e de baixo) ou virando em 3D. A entrada desfaz só quando o bloco sai inteiro por baixo da tela (rolando para cima), nunca enquanto ainda está à vista. Uma rede de segurança revela tudo que já passou numa rolagem rápida.",
    tags: ["Scroll Reveal", "Blur In", "Reversible", "Variants", "Safety Net"],
    defaultSection: "Qualquer Seção",
    previewType: "lm4-blur",
    tech: ["Tailwind CSS", "React", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const FROM = {
  up: 'translateY(30px)', left: 'translateX(-40px)', right: 'translateX(40px)', scale: 'scale(.92)',
  deal: 'translateY(70px) rotate(-5deg) scale(.94)', flip: 'perspective(900px) rotateX(-38deg) translateY(60px)',
};

export function BlurReveal({ children, from = 'up', delay = 0, as: Tag = 'div', className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(true); return; }
    const el = ref.current;
    const inIO = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { rootMargin: '0px 0px -8% 0px' });
    // saída: só quando sai inteiro por baixo (top > 0 = está abaixo da tela)
    const outIO = new IntersectionObserver(([e]) => { if (!e.isIntersecting && e.boundingClientRect.top > 0) setShown(false); }, { threshold: 0 });
    inIO.observe(el); outIO.observe(el);
    // rede de segurança: rolagem muito rápida pode pular o observer
    const net = () => { const r = el.getBoundingClientRect(); if (r.bottom < 0 || (r.top < innerHeight * 0.96 && r.bottom > 0)) setShown(true); };
    addEventListener('scroll', net, { passive: true });
    return () => { inIO.disconnect(); outIO.disconnect(); removeEventListener('scroll', net); };
  }, []);
  return (
    <Tag ref={ref} className={className}
      style={{
        opacity: shown ? 1 : 0, filter: shown ? 'none' : 'blur(12px)', transform: shown ? 'none' : FROM[from],
        transformOrigin: from === 'flip' ? '50% 100%' : undefined,
        transition: 'opacity .8s cubic-bezier(.22,1,.36,1), transform .95s cubic-bezier(.22,1,.36,1), filter .9s cubic-bezier(.22,1,.36,1)',
        transitionDelay: delay + 's',
      }}>
      {children}
    </Tag>
  );
}`,
      tailwind: `<div data-rv class="rounded-3xl border border-[#e7e0ef] p-8">Sobe e desfoca</div>
<div data-rv="left" style="--d:.1s" class="rounded-3xl border border-[#e7e0ef] p-8">Vem da esquerda</div>
<div data-rv="deal" style="--d:.2s" class="rounded-3xl border border-[#e7e0ef] p-8">Dando as cartas</div>
<style>
  .js [data-rv]{opacity:0;filter:blur(12px);transform:translateY(30px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .95s cubic-bezier(.22,1,.36,1),filter .9s cubic-bezier(.22,1,.36,1);transition-delay:var(--d,0s)}
  .js [data-rv="left"]{transform:translateX(-40px)}
  .js [data-rv="right"]{transform:translateX(40px)}
  .js [data-rv="scale"]{transform:scale(.92)}
  .js [data-rv="deal"]{transform:translateY(70px) rotate(-5deg) scale(.94)}
  .js [data-rv="flip"]{transform:perspective(900px) rotateX(-38deg) translateY(60px);transform-origin:50% 100%}
  .js [data-rv].shown{opacity:1;filter:none;transform:none}
  @media (prefers-reduced-motion:reduce){.js [data-rv]{opacity:1;filter:none;transform:none;transition:none}}
</style>
<script>
(function () {
  document.documentElement.classList.add('js');
  var els = [].slice.call(document.querySelectorAll('[data-rv]'));
  var inIO = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('shown'); }); }, { rootMargin: '0px 0px -8% 0px' });
  var outIO = new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting && e.boundingClientRect.top > 0) e.target.classList.remove('shown'); }); }, { threshold: 0 });
  els.forEach(function (el) { inIO.observe(el); outIO.observe(el); });
  addEventListener('scroll', function () { els.forEach(function (el) { if (el.classList.contains('shown')) return; var r = el.getBoundingClientRect(); if (r.bottom < 0 || (r.top < innerHeight * .96 && r.bottom > 0)) el.classList.add('shown'); }); }, { passive: true });
})();
</script>`,
    },
  },

  // 21 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lm4-option-ring-check",
    name: "Cards de Interesse com Anel que se Desenha ao Marcar",
    category: "formularios",
    categoryLabel: "Formulários & Quiz",
    description: "Opções de múltipla escolha em cards com ícone. Ao marcar, a borda fica laranja, o ícone ganha fundo em degradê e um anel fino se desenha em volta do card inteiro, a 5px de distância. É um checkbox nativo escondido por baixo: funciona no teclado, tem foco visível e o leitor de tela lê o estado.",
    tags: ["Checkbox Card", "Stroke Ring", "Form", "Accessible"],
    defaultSection: "Formulário",
    previewType: "lm4-option",
    tech: ["Tailwind CSS", "React", "SVG pathLength"],
    frameworks: {
      react: `import { useState } from 'react';

export function OptionRingCards({ options = ['Clube de vantagens', 'Benefícios em farmácias', 'Gestão de convênios', 'Indicadores'], name = 'interesses' }) {
  const [sel, setSel] = useState([]);
  const toggle = (o) => setSel((s) => (s.includes(o) ? s.filter((x) => x !== o) : [...s, o]));
  return (
    <fieldset className="grid gap-2.5 sm:grid-cols-2">
      <legend className="mb-2 font-['Baloo_2',sans-serif] text-base font-bold text-[#1d1d1d]">O que interessa para a sua empresa?</legend>
      {options.map((o) => {
        const on = sel.includes(o);
        return (
          <label key={o} className="relative block">
            <input type="checkbox" name={name} value={o} checked={on} onChange={() => toggle(o)} className="peer absolute h-px w-px opacity-0" />
            <span className={'relative flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border-[1.5px] px-3.5 py-3 font-["Baloo_2",sans-serif] text-[15px] font-bold leading-tight text-[#1d1d1d] transition-colors peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#fc5304]/45 ' + (on ? 'border-[#fc5304] bg-[#fffaf7]' : 'border-[#e7e0ef] bg-white')}>
              <i className={'grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[11px] not-italic transition-colors ' + (on ? 'bg-[linear-gradient(135deg,#fc5304,#ff7a33)] text-white' : 'bg-[#f2edf7] text-[#76058f]')}>✓</i>
              {o}
              <svg aria-hidden="true" className="pointer-events-none absolute -inset-[5px] h-[calc(100%+10px)] w-[calc(100%+10px)] overflow-visible">
                <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="20" fill="none" stroke="#fc5304" strokeWidth="2" pathLength="1" strokeDasharray="1"
                  style={{ strokeDashoffset: on ? 0 : 1, transition: 'stroke-dashoffset .8s cubic-bezier(.22,1,.36,1)' }} />
              </svg>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}`,
      tailwind: `<fieldset class="grid gap-2.5 sm:grid-cols-2">
  <legend class="mb-2 font-bold">O que interessa para a sua empresa?</legend>
  <label class="oc"><input type="checkbox" name="int" value="clube"><span><i>✓</i>Clube de vantagens<svg aria-hidden="true"><rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="20" pathLength="1"/></svg></span></label>
  <label class="oc"><input type="checkbox" name="int" value="farmacias"><span><i>✓</i>Benefícios em farmácias<svg aria-hidden="true"><rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="20" pathLength="1"/></svg></span></label>
</fieldset>
<style>
  .oc{position:relative;display:block}
  .oc input{position:absolute;opacity:0;width:1px;height:1px}
  .oc span{position:relative;display:flex;align-items:center;gap:12px;min-height:64px;padding:12px 14px;border:1.5px solid #e7e0ef;border-radius:16px;background:#fff;cursor:pointer;font:700 15px/1.25 "Baloo 2",sans-serif;color:#1d1d1d;transition:border-color .3s,background .3s}
  .oc i{display:grid;place-items:center;width:38px;height:38px;flex:0 0 38px;border-radius:11px;background:#f2edf7;color:#76058f;font-style:normal;transition:background .3s,color .3s}
  .oc svg{position:absolute;inset:-5px;width:calc(100% + 10px);height:calc(100% + 10px);pointer-events:none;overflow:visible}
  .oc rect{fill:none;stroke:#fc5304;stroke-width:2;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .8s cubic-bezier(.22,1,.36,1)}
  .oc input:checked+span{border-color:#fc5304;background:#fffaf7}
  .oc input:checked+span i{background:linear-gradient(135deg,#fc5304,#ff7a33);color:#fff}
  .oc input:checked+span rect{stroke-dashoffset:0}
  .oc input:focus-visible+span{outline:3px solid rgba(252,83,4,.45);outline-offset:2px}
</style>`,
    },
  },
];
