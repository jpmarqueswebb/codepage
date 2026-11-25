// Efeitos extraídos da landing page da Loop+ (pasta "LoopMais/rx-clube-de-vantagens": Clube de Vantagens White Label + formulário RX)
// Paleta: fundo branco com textura de pontinhos, laranja #fc5304 (degradê até #ff8040), laranja escuro #973101, roxo #2e035d / #6a2fae,
// texto #1d1d1d / #6b6b6b, borda #ebebeb. Fontes: Baloo 2 Bold (títulos) e Montserrat (corpo).
const B = { client: "Loop+", badge: "Loop+" };

export const loopMaisRxEffects = [
  // 1 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-shine-pill-button",
    name: "Botão Pílula com Reflexo de Vidro",
    category: "botoes",
    categoryLabel: "Botões & CTAs",
    description: "CTA em pílula com degradê laranja, caixa alta e sombra colorida. Um reflexo inclinado atravessa o botão a cada 3,4s, como brilho de vidro, e fica parado no resto do ciclo para não cansar. No hover o botão sobe 2px e a sombra cresce. Com movimento reduzido o reflexo é desligado.",
    tags: ["Shine Sweep", "Gradient Pill", "Glass Reflection", "Hover Lift"],
    defaultSection: "Hero Principal",
    previewType: "lmrx-shine-btn",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `// Reflexo: faixa skew de 40% da largura que sai de -60% e vai até 130% nos primeiros 35% do ciclo.
const KEYFRAMES = '@keyframes lmrxShine{0%{left:-60%}35%,100%{left:130%}}';

export function ShinePillButton({ href = '#', children = 'Quero conhecer a plataforma', large = false }) {
  return (
    <a href={href}
      className={'relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)] font-bold uppercase tracking-[0.02em] text-white shadow-[0_12px_28px_rgba(252,83,4,.28)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(252,83,4,.36)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fc5304] ' + (large ? 'px-9 py-[18px] text-base' : 'px-[30px] py-4 text-[15px]')}>
      <style>{KEYFRAMES}</style>
      <span aria-hidden="true"
        className="pointer-events-none absolute top-0 left-[-60%] h-full w-[40%] -skew-x-[20deg] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.55),transparent)] animate-[lmrxShine_3.4s_ease-in-out_infinite] motion-reduce:hidden" />
      <span className="relative">{children}</span>
    </a>
  );
}`,
      tailwind: `<a href="#" class="relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)] px-[30px] py-4 text-[15px] font-bold uppercase tracking-[0.02em] text-white shadow-[0_12px_28px_rgba(252,83,4,.28)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(252,83,4,.36)]">
  <span aria-hidden="true" class="lmrx-shine pointer-events-none absolute top-0 left-[-60%] h-full w-[40%] -skew-x-[20deg] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.55),transparent)]"></span>
  <span class="relative">Quero conhecer a plataforma</span>
</a>
<style>
  .lmrx-shine{animation:lmrxShine 3.4s ease-in-out infinite}
  @keyframes lmrxShine{0%{left:-60%}35%,100%{left:130%}}
  @media (prefers-reduced-motion:reduce){.lmrx-shine{display:none}}
</style>`,
    },
  },

  // 2 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-cta-hierarchy-trio",
    name: "Trio de CTAs em Hierarquia (Agenda, WhatsApp, Demo)",
    category: "botoes",
    categoryLabel: "Botões & CTAs",
    description: "Tela final do formulário com três CTAs em ênfase decrescente: o principal preenchido em laranja, o WhatsApp só contornado (não compete com a agenda) e a demonstração como texto sublinhado. O link do WhatsApp é montado na hora com mensagem pronta dizendo de onde a pessoa veio e a URL completa da página, para as UTMs não se perderem.",
    tags: ["CTA Hierarchy", "WhatsApp Link", "UTM Preserve", "Outline", "Text Button"],
    defaultSection: "Tela de Obrigado",
    previewType: "lmrx-cta-trio",
    tech: ["Tailwind CSS", "React", "wa.me"],
    frameworks: {
      react: `import { useEffect, useState } from 'react';

// whatsapp: número em formato internacional (ex.: 5511999999999). Vazio = botão fica com href="#".
export function CtaHierarchyTrio({
  scheduleHref = '#',
  demoHref = '#',
  whatsapp = '',
  origin = 'Vim do formulário RX da Loop+',
  note = 'Prefere falar antes de agendar? Nossa equipe também pode te atender pelo WhatsApp.',
}) {
  const [waHref, setWaHref] = useState('#');
  useEffect(() => {
    if (!whatsapp) return;
    // a URL inteira vai na mensagem: é o jeito de levar as UTMs junto num link de WhatsApp
    const msg = origin + '. Página: ' + location.href;
    setWaHref('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(msg));
  }, [whatsapp, origin]);

  const base = 'inline-flex w-full items-center justify-center rounded-full px-7 py-4 text-[15px] font-bold uppercase tracking-[0.02em] transition-[transform,box-shadow,border-color,color] duration-150';
  return (
    <div className="mx-auto grid max-w-[420px] gap-3 text-center">
      <a href={scheduleHref} data-track="schedule_click"
        className={base + ' bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)] text-white shadow-[0_12px_28px_rgba(252,83,4,.28)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(252,83,4,.36)]'}>
        Escolher data e horário
      </a>
      <p className="mt-2 text-sm text-[#6b6b6b]">{note}</p>
      <a href={waHref} target={waHref === '#' ? undefined : '_blank'} rel="noopener" data-track="whatsapp_click"
        className={base + ' border-2 border-[#ebebeb] text-[#1d1d1d] hover:-translate-y-0.5 hover:border-[#fc5304] hover:text-[#fc5304]'}>
        Falar com a Loop+ no WhatsApp
      </a>
      <a href={demoHref} data-track="demo_click"
        className="mt-1 inline-block justify-self-center py-2 text-sm font-semibold text-[#9a9a9a] underline underline-offset-4 transition-colors hover:text-[#fc5304]">
        Ver a plataforma funcionando
      </a>
    </div>
  );
}`,
      tailwind: `<div class="mx-auto grid max-w-[420px] gap-3 text-center">
  <a href="#" class="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)] px-7 py-4 text-[15px] font-bold uppercase tracking-[0.02em] text-white shadow-[0_12px_28px_rgba(252,83,4,.28)] transition duration-150 hover:-translate-y-0.5">Escolher data e horário</a>
  <p class="mt-2 text-sm text-[#6b6b6b]">Prefere falar antes de agendar? Nossa equipe também pode te atender pelo WhatsApp.</p>
  <a href="#" id="lmrx-wa" rel="noopener" class="inline-flex w-full items-center justify-center rounded-full border-2 border-[#ebebeb] px-7 py-4 text-[15px] font-bold uppercase tracking-[0.02em] text-[#1d1d1d] transition duration-150 hover:-translate-y-0.5 hover:border-[#fc5304] hover:text-[#fc5304]">Falar com a Loop+ no WhatsApp</a>
  <a href="#" class="mt-1 justify-self-center py-2 text-sm font-semibold text-[#9a9a9a] underline underline-offset-4 hover:text-[#fc5304]">Ver a plataforma funcionando</a>
</div>
<script>
  (function () {
    var WHATSAPP_NUMBER = ''; // ex.: 5511999999999
    if (!WHATSAPP_NUMBER) return;
    var a = document.getElementById('lmrx-wa');
    var msg = 'Vim do formulário RX da Loop+. Página: ' + location.href;
    a.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
    a.target = '_blank';
  })();
</script>`,
    },
  },

  // 3 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-scroll-flow-line",
    name: "Linha de Fundo que se Desenha com a Rolagem",
    category: "fundos",
    categoryLabel: "Fundos & Texturas",
    description: "Um traço grosso e sinuoso atravessa uma ou mais seções por trás do conteúdo. Um trilho clarinho mostra o caminho todo e a cor vai preenchendo de cima para baixo, sempre até a altura da 'linha de leitura' (60% da tela). O preenchimento usa um retângulo de clip-path que cresce, e não stroke-dasharray: assim a espessura fica igual em todo o traço mesmo com o SVG esticado.",
    tags: ["Scroll Draw", "SVG Path", "clip-path", "non-scaling-stroke", "Background Line"],
    defaultSection: "Seções do Meio",
    previewType: "lmrx-flow-line",
    tech: ["Tailwind CSS", "React", "SVG", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useId, useRef } from 'react';

// Envolva as seções que a linha deve atravessar. O conteúdo fica por cima (z-1).
// Deixe os cards sobre a linha com fundo sólido ou vidro: fundo translúcido demais parece que a linha passa por cima.
export function ScrollFlowLine({
  children,
  d = 'M -30 90 C 250 170 320 360 540 420 S 920 540 950 750 S 780 1010 430 1110 S 60 1300 150 1560 S 700 1800 1120 2060',
  viewBox = '0 0 1000 2000',
  color = '#6a2fae',
  track = 'rgba(46,3,93,.09)',
  width = 16,
  mark = 0.6, // linha de leitura: fração da altura da tela
}) {
  const svg = useRef(null), rect = useRef(null);
  const clipId = 'flow' + useId().replace(/[^a-zA-Z0-9]/g, '');

  useEffect(() => {
    const S = svg.current, R = rect.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { R.setAttribute('height', '100000'); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = S.getBoundingClientRect();
      if (r.height <= 0) return;
      const vbH = S.viewBox.baseVal.height;
      // Y (em unidades do viewBox) que está agora na linha de leitura
      R.setAttribute('height', String(Math.max(0, ((innerHeight * mark - r.top) / r.height) * vbH)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [mark]);

  const stroke = { fill: 'none', strokeWidth: width, strokeLinecap: 'round', vectorEffect: 'non-scaling-stroke' };
  return (
    <div className="relative">
      <svg ref={svg} viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true" focusable="false"
        className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-visible lg:block">
        <defs>
          <clipPath id={clipId}>
            <rect ref={rect} x="-2000" y="0" width="6000" height="0" style={{ transition: 'height .1s linear' }} />
          </clipPath>
        </defs>
        <path d={d} stroke={track} {...stroke} />
        <path d={d} stroke={color} clipPath={'url(#' + clipId + ')'} {...stroke} />
      </svg>
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}`,
      tailwind: `<div class="relative" data-flow>
  <svg viewBox="0 0 1000 2000" preserveAspectRatio="none" aria-hidden="true" class="pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-visible lg:block">
    <defs><clipPath id="lmrx-flow-clip"><rect data-flow-clip x="-2000" y="0" width="6000" height="0" style="transition:height .1s linear"/></clipPath></defs>
    <path d="M -30 90 C 250 170 320 360 540 420 S 920 540 950 750 S 780 1010 430 1110 S 60 1300 150 1560 S 700 1800 1120 2060" fill="none" stroke="rgba(46,3,93,.09)" stroke-width="16" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    <path d="M -30 90 C 250 170 320 360 540 420 S 920 540 950 750 S 780 1010 430 1110 S 60 1300 150 1560 S 700 1800 1120 2060" fill="none" stroke="#6a2fae" stroke-width="16" stroke-linecap="round" vector-effect="non-scaling-stroke" clip-path="url(#lmrx-flow-clip)"/>
  </svg>
  <div class="relative z-[1]">
    <section class="py-40">...</section>
    <section class="py-40">...</section>
  </div>
</div>
<script>
  (function () {
    var wraps = [].slice.call(document.querySelectorAll('[data-flow]')).map(function (w) {
      return { svg: w.querySelector('svg'), rect: w.querySelector('[data-flow-clip]') };
    });
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wraps.forEach(function (w) { w.rect.setAttribute('height', '100000'); });
      return;
    }
    var ticking = false;
    function update() {
      ticking = false;
      wraps.forEach(function (w) {
        var r = w.svg.getBoundingClientRect();
        if (r.height <= 0) return;
        var y = ((innerHeight * 0.6 - r.top) / r.height) * w.svg.viewBox.baseVal.height;
        w.rect.setAttribute('height', Math.max(0, y));
      });
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
  })();
</script>`,
    },
  },

  // 4 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-wave-divider-stroke",
    name: "Divisa em Onda com Contorno Laranja",
    category: "divisas",
    categoryLabel: "Divisas & Faixas",
    description: "Divisas entre seções desenhadas em SVG: ondas suaves (topo ou base) e uma diagonal mais alta para o fechamento. A versão do hero ganha só um traço laranja de 4px seguindo a curva, em vez de trocar a cor do fundo. O traço usa non-scaling-stroke, então continua com a mesma espessura em qualquer largura de tela.",
    tags: ["Wave Divider", "SVG", "Section Edge", "Stroke Accent", "Slant"],
    defaultSection: "Divisas de Seção",
    previewType: "lmrx-wave",
    tech: ["Tailwind CSS", "React", "SVG"],
    frameworks: {
      react: `// position: 'bottom' (onda na base da seção) | 'top' (onda no topo) | 'slant' (diagonal no topo, mais alta)
// fill = cor da seção VIZINHA (a onda "invade" esta seção com a cor da próxima). stroke opcional.
const SHAPES = {
  bottom: { fill: 'M0,40 C180,110 360,110 600,72 C840,34 1020,0 1200,24 C1320,40 1390,64 1440,80 L1440,120 L0,120 Z', line: 'M0,40 C180,110 360,110 600,72 C840,34 1020,0 1200,24 C1320,40 1390,64 1440,80' },
  top: { fill: 'M0,0 L1440,0 L1440,36 C1260,92 1080,110 840,82 C600,54 420,10 240,26 C140,35 60,56 0,74 Z', line: 'M1440,36 C1260,92 1080,110 840,82 C600,54 420,10 240,26 C140,35 60,56 0,74' },
  slant: { fill: 'M0,0 L1440,0 L1440,10 C1040,58 560,96 0,120 Z', line: 'M1440,10 C1040,58 560,96 0,120' },
};

export function WaveDivider({ position = 'bottom', fill = '#ffffff', stroke, strokeWidth = 4 }) {
  const s = SHAPES[position] || SHAPES.bottom;
  const tall = position === 'slant';
  return (
    <div aria-hidden="true" className={'pointer-events-none absolute inset-x-0 z-[3] leading-[0] ' + (position === 'bottom' ? '-bottom-px' : '-top-px')}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={'block w-full ' + (tall ? 'h-[70px] sm:h-[120px]' : 'h-[52px] sm:h-[90px]')}>
        <path d={s.fill} fill={fill} />
        {stroke && <path d={s.line} fill="none" stroke={stroke} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />}
      </svg>
    </div>
  );
}

// Uso: <section className="relative ..."> ... <WaveDivider position="bottom" fill="#fff" stroke="#fc5304" /></section>`,
      tailwind: `<section class="relative bg-white pb-32 pt-24">
  <!-- conteúdo do hero -->
  <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 -bottom-px z-[3] leading-[0]">
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" class="block h-[52px] w-full sm:h-[90px]">
      <path d="M0,40 C180,110 360,110 600,72 C840,34 1020,0 1200,24 C1320,40 1390,64 1440,80 L1440,120 L0,120 Z" fill="#ffffff"/>
      <path d="M0,40 C180,110 360,110 600,72 C840,34 1020,0 1200,24 C1320,40 1390,64 1440,80" fill="none" stroke="#fc5304" stroke-width="4" vector-effect="non-scaling-stroke"/>
    </svg>
  </div>
</section>

<!-- Diagonal (fechamento roxo): no topo da seção, com a cor da seção de cima -->
<section class="relative bg-[#2e035d] pt-[180px]">
  <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 -top-px z-[3] leading-[0]">
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" class="block h-[70px] w-full sm:h-[120px]">
      <path d="M0,0 L1440,0 L1440,10 C1040,58 560,96 0,120 Z" fill="#ffffff"/>
    </svg>
  </div>
</section>`,
    },
  },

  // 5 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-pattern-textures",
    name: "Texturas de Fundo: Pontinhos, Interrogações e Marca d'Água",
    category: "fundos",
    categoryLabel: "Fundos & Texturas",
    description: "Três texturas leves usadas na página. A primeira é uma grade de pontinhos roxos de 1px a cada 22px sobre o branco. A segunda é um padrão de '?' em SVG com 3,5% de opacidade na seção roxa que antecede o FAQ. A terceira é uma palavra gigante em marca d'água vazando pela borda. Como background-image não é herdado, cada seção com cor própria redeclara a textura.",
    tags: ["Dot Grid", "SVG Pattern", "Watermark", "Texture", "Purple Gradient"],
    defaultSection: "Fundos de Seção",
    previewType: "lmrx-textures",
    tech: ["Tailwind CSS", "React", "CSS Gradients", "SVG Data URI"],
    frameworks: {
      react: `const DOTS = { backgroundImage: 'radial-gradient(circle, rgba(46,3,93,.08) 1px, transparent 1px)', backgroundSize: '22px 22px' };
const QUESTION = {
  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27140%27 height=%27140%27 viewBox=%270 0 140 140%27%3E%3Ctext x=%2714%27 y=%2752%27 font-family=%27Arial, sans-serif%27 font-size=%2748%27 font-weight=%27700%27 fill=%27%23ffffff%27%3E%3F%3C/text%3E%3Ctext x=%2782%27 y=%27118%27 font-family=%27Arial, sans-serif%27 font-size=%2748%27 font-weight=%27700%27 fill=%27%23ffffff%27%3E%3F%3C/text%3E%3C/svg%3E")',
  backgroundSize: '140px 140px',
};

// variant: 'dots' (fundo branco pontilhado) | 'question' (roxo com "?") | 'watermark' (roxo com palavra gigante)
export function TexturedSection({ variant = 'dots', watermark = 'Loop+', className = '', children }) {
  const purple = variant !== 'dots';
  return (
    <section className={'relative overflow-hidden py-24 sm:py-36 ' + (purple ? 'bg-[linear-gradient(180deg,#2e035d_0%,#45137d_100%)] text-white ' : 'bg-white text-[#1d1d1d] ') + className}
      style={variant === 'dots' ? DOTS : undefined}>
      {variant === 'question' && <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-[.035]" style={QUESTION} />}
      {variant === 'watermark' && (
        <span aria-hidden="true" className="pointer-events-none absolute -left-5 bottom-5 z-0 select-none font-['Baloo_2',sans-serif] text-[130px] font-bold leading-[.8] tracking-[-0.04em] text-white opacity-5 sm:bottom-[100px] sm:text-[220px]">
          {watermark}
        </span>
      )}
      <div className="relative z-[1] mx-auto max-w-[1280px] px-6">{children}</div>
    </section>
  );
}`,
      tailwind: `<!-- Pontinhos -->
<section class="relative bg-white py-36 bg-[radial-gradient(circle,rgba(46,3,93,.08)_1px,transparent_1px)] bg-[length:22px_22px]">...</section>

<!-- Interrogações (seção roxa antes do FAQ) -->
<section class="relative overflow-hidden bg-[linear-gradient(180deg,#2e035d_0%,#45137d_100%)] py-36 text-white">
  <div aria-hidden="true" class="lmrx-q pointer-events-none absolute inset-0 opacity-[.035]"></div>
  <div class="relative z-[1] mx-auto max-w-[1280px] px-6">...</div>
</section>

<!-- Marca d'água -->
<section class="relative overflow-hidden bg-[linear-gradient(180deg,#2e035d_0%,#45137d_100%)] py-36 text-white">
  <span aria-hidden="true" class="pointer-events-none absolute -left-5 bottom-[100px] select-none text-[220px] font-bold leading-[.8] tracking-[-0.04em] opacity-5">Loop+</span>
  <div class="relative z-[1] mx-auto max-w-[1280px] px-6">...</div>
</section>
<style>
  .lmrx-q{background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27140%27 height=%27140%27 viewBox=%270 0 140 140%27%3E%3Ctext x=%2714%27 y=%2752%27 font-family=%27Arial, sans-serif%27 font-size=%2748%27 font-weight=%27700%27 fill=%27%23ffffff%27%3E%3F%3C/text%3E%3Ctext x=%2782%27 y=%27118%27 font-family=%27Arial, sans-serif%27 font-size=%2748%27 font-weight=%27700%27 fill=%27%23ffffff%27%3E%3F%3C/text%3E%3C/svg%3E");background-size:140px 140px}
</style>`,
    },
  },

  // 6 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-reveal-stagger",
    name: "Entrada Suave em Cascata",
    category: "entradas",
    categoryLabel: "Entradas na Rolagem",
    description: "Títulos, textos, imagens, botões e cards sobem 28px enquanto aparecem (0,7s) na primeira vez que entram na tela. Em grupos de irmãos, como os 4 cards ou os itens do FAQ, cada um entra 80ms depois do anterior, com atraso máximo de 0,32s. Sem JavaScript ou com movimento reduzido, tudo já aparece visível: a classe que esconde só é aplicada pelo script.",
    tags: ["Scroll Reveal", "Stagger", "IntersectionObserver", "Fade Up", "Progressive Enhancement"],
    defaultSection: "Todas as Seções",
    previewType: "lmrx-reveal",
    tech: ["Tailwind CSS", "React", "IntersectionObserver"],
    frameworks: {
      react: `import { Children, useEffect, useRef, useState } from 'react';

// Começa visível (SSR / sem JS) e só esconde no cliente se puder animar.
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const ref = useRef(null);
  const [state, setState] = useState('static'); // static | hidden | shown
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight - 60 && r.bottom > 0) return; // já está na tela: não esconde
    setState('hidden');
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setState('shown'); io.disconnect(); }
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const anim = state === 'static' ? '' : 'transition-[opacity,transform] duration-700 ease-out ' + (state === 'hidden' ? 'translate-y-7 opacity-0' : 'translate-y-0 opacity-100');
  return <Tag ref={ref} className={anim + ' ' + className} style={{ transitionDelay: delay + 's' }}>{children}</Tag>;
}

// Escalona os filhos: 0, 0.08, 0.16 ... até 0.32s
export function RevealGroup({ children, step = 0.08, max = 0.32, className = '' }) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => <Reveal delay={Math.min(i * step, max)}>{child}</Reveal>)}
    </div>
  );
}`,
      tailwind: `<h2 data-reveal class="text-[34px] font-bold">Para quem faz sentido</h2>
<div class="grid gap-6 sm:grid-cols-2" data-stagger>
  <div data-reveal class="rounded-2xl border border-[#ebebeb] bg-white p-9">Empresas com clientes</div>
  <div data-reveal class="rounded-2xl border border-[#ebebeb] bg-white p-9">Associações e sindicatos</div>
  <div data-reveal class="rounded-2xl border border-[#ebebeb] bg-white p-9">Cooperativas</div>
  <div data-reveal class="rounded-2xl border border-[#ebebeb] bg-white p-9">Empresas que atendem outras empresas</div>
</div>
<style>
  .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease;transition-delay:var(--reveal-delay,0s)}
  .reveal.is-visible{opacity:1;transform:none}
</style>
<script>
  (function () {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    document.querySelectorAll('[data-stagger]').forEach(function (g) {
      [].forEach.call(g.querySelectorAll(':scope > [data-reveal]'), function (el, i) {
        el.style.setProperty('--reveal-delay', Math.min(i * 0.08, 0.32) + 's');
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  })();
</script>`,
    },
  },

  // 7 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-glass-icon-cards",
    name: "Cards de Vidro com Ícone Pulsante",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "Grade 2x2 de cards em glassmorphism: branco a 72% com blur de 14px, para a linha decorativa de fundo aparecer suave por trás. Cada card tem um quadrado com degradê laranja e um ícone de traço branco que pulsa devagar (2,6s). No hover o card sobe 4px e a sombra aumenta.",
    tags: ["Glassmorphism", "Backdrop Blur", "Icon Pulse", "Hover Lift", "Grid 2x2"],
    defaultSection: "Para Quem Faz Sentido",
    previewType: "lmrx-glass-cards",
    tech: ["Tailwind CSS", "React", "backdrop-filter", "SVG"],
    frameworks: {
      react: `const KEYFRAMES = '@keyframes lmrxPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}';
const ic = { fill: 'none', stroke: '#fff', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

const DEFAULT_ITEMS = [
  { title: 'Empresas com clientes', text: 'Ofereça vantagens contínuas para quem já compra de você.', icon: <><path d="M4 21V7l8-4 8 4v14" {...ic} /><path d="M9 21v-6h6v6" {...ic} /></> },
  { title: 'Associações e sindicatos', text: 'Amplie o valor percebido por associados e representados.', icon: <><circle cx="9" cy="8" r="3" {...ic} /><circle cx="17" cy="9" r="2.4" {...ic} /><path d="M3.5 20c0-3.3 2.5-6 5.5-6s5.5 2.7 5.5 6" {...ic} /><path d="M15.5 14.5c2.3.2 4 2.4 4 5.5" {...ic} /></> },
  { title: 'Cooperativas', text: 'Fortaleça o relacionamento com cooperados.', icon: <><path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" {...ic} /><path d="M9 12l2 2 4-4" {...ic} /></> },
  { title: 'Empresas que atendem outras empresas', text: 'Ative benefícios para redes, comunidades e operações B2B que desejam oferecer mais valor aos seus públicos.', icon: <><circle cx="12" cy="12" r="9" {...ic} /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" {...ic} /></> },
];

export function GlassIconCards({ items = DEFAULT_ITEMS }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <style>{KEYFRAMES}</style>
      {items.map((it) => (
        <article key={it.title}
          className="rounded-2xl border border-[#ebebeb] bg-white/70 p-9 shadow-[0_2px_10px_rgba(29,29,29,.06)] backdrop-blur-[14px] transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(29,29,29,.1)]">
          <div className="mb-[22px] flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)]">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[30px] w-[30px] animate-[lmrxPulse_2.6s_ease-in-out_infinite] motion-reduce:animate-none">{it.icon}</svg>
          </div>
          <h3 className="mb-3 font-['Baloo_2',sans-serif] text-xl font-bold leading-tight text-[#1d1d1d]">{it.title}</h3>
          <p className="m-0 text-base text-[#6b6b6b]">{it.text}</p>
        </article>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="grid gap-6 sm:grid-cols-2">
  <article class="rounded-2xl border border-[#ebebeb] bg-white/70 p-9 shadow-[0_2px_10px_rgba(29,29,29,.06)] backdrop-blur-[14px] transition duration-150 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(29,29,29,.1)]">
    <div class="mb-[22px] flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)]">
      <svg class="lmrx-pulse h-[30px] w-[30px]" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V7l8-4 8 4v14"/><path d="M9 21v-6h6v6"/></svg>
    </div>
    <h3 class="mb-3 text-xl font-bold text-[#1d1d1d]">Empresas com clientes</h3>
    <p class="text-base text-[#6b6b6b]">Ofereça vantagens contínuas para quem já compra de você.</p>
  </article>
  <!-- repita para os outros 3 cards -->
</div>
<style>
  .lmrx-pulse{animation:lmrxPulse 2.6s ease-in-out infinite}
  @keyframes lmrxPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}
  @media (prefers-reduced-motion:reduce){.lmrx-pulse{animation:none}}
</style>`,
    },
  },

  // 8 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-tilted-phone-frame",
    name: "Mockup Inclinado com Moldura em Degradê Cônico",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "A imagem do app fica numa moldura grossa feita de padding com conic-gradient (laranja, roxo, laranja), inclinada -3°, com sombra profunda e um brilho laranja desfocado atrás. No hover a moldura endireita e sobe 6px. A proporção da moldura é a mesma da imagem (aspect-ratio), então o object-fit: cover não corta nada.",
    tags: ["Conic Gradient Border", "Tilt", "Glow", "Mockup", "aspect-ratio"],
    defaultSection: "Produto",
    previewType: "lmrx-phone-frame",
    tech: ["Tailwind CSS", "React", "CSS Gradients"],
    frameworks: {
      react: `// ratio: largura / altura REAL da imagem (ex.: 617 / 1004). Se trocar a imagem, troque o ratio.
// radius: arredondamento da imagem; mantenha baixo se a foto tem conteúdo encostado nos cantos.
export function TiltedPhoneFrame({ src = '/img/produto-app.webp', alt = 'Aplicativo do clube de vantagens', ratio = 617 / 1004, radius = 6 }) {
  return (
    <div className="group relative flex min-h-[420px] items-center justify-center lg:min-h-[540px]">
      <div aria-hidden="true" className="absolute h-[420px] w-[420px] max-w-full rounded-full bg-[radial-gradient(circle,rgba(252,83,4,.35),rgba(46,3,93,0)_70%)] blur-[40px]" />
      <div className="relative z-[1] w-[280px] max-w-full -rotate-3 rounded-[36px] bg-[conic-gradient(from_180deg,#fc5304,#6a2fae,#fc5304)] p-3 shadow-[0_40px_80px_rgba(0,0,0,.35)] transition-transform duration-[400ms] ease-out group-hover:-translate-y-1.5 group-hover:rotate-0 motion-reduce:transition-none lg:w-[360px]"
        style={{ aspectRatio: String(ratio) }}>
        <img src={src} alt={alt} loading="lazy" className="block h-full w-full object-cover" style={{ borderRadius: radius }} />
      </div>
    </div>
  );
}`,
      tailwind: `<div class="group relative flex min-h-[540px] items-center justify-center">
  <div aria-hidden="true" class="absolute h-[420px] w-[420px] max-w-full rounded-full bg-[radial-gradient(circle,rgba(252,83,4,.35),rgba(46,3,93,0)_70%)] blur-[40px]"></div>
  <div class="relative z-[1] aspect-[617/1004] w-[360px] max-w-full -rotate-3 rounded-[36px] bg-[conic-gradient(from_180deg,#fc5304,#6a2fae,#fc5304)] p-3 shadow-[0_40px_80px_rgba(0,0,0,.35)] transition-transform duration-[400ms] ease-out group-hover:-translate-y-1.5 group-hover:rotate-0">
    <img src="produto-app.webp" alt="Aplicativo do clube de vantagens" class="block h-full w-full rounded-[6px] object-cover">
  </div>
</div>`,
    },
  },

  // 9 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-gradient-ring-photo",
    name: "Foto Redonda com Anel em Degradê e Bolhas",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "Foto circular dentro de um anel de 12px em conic-gradient (laranja e roxo). Atrás dela ficam duas bolhas de profundidade: uma laranja pequena na frente, embaixo à esquerda, e uma roxa grande e desfocada atrás, no alto à direita. É uma composição estática, que entra com a animação de revelação da página.",
    tags: ["Gradient Ring", "Circle Photo", "Decorative Blobs", "Depth"],
    defaultSection: "Espelho do Problema",
    previewType: "lmrx-ring-photo",
    tech: ["Tailwind CSS", "React", "CSS Gradients"],
    frameworks: {
      react: `export function GradientRingPhoto({ src = '/img/espelho-cliente.webp', alt = '', position = 'center 12%', className = '' }) {
  return (
    <div className={'relative isolate mx-auto w-full max-w-[460px] ' + className}>
      {/* bolha grande desfocada atrás (roxa) */}
      <span aria-hidden="true" className="absolute -right-[70px] -top-16 -z-10 h-[300px] w-[300px] rounded-full bg-[linear-gradient(135deg,#2e035d_0%,#4a1584_100%)] opacity-[.16] blur-[6px] sm:h-[430px] sm:w-[430px]" />
      {/* bolha pequena na frente (laranja) */}
      <span aria-hidden="true" className="absolute -bottom-10 -left-[46px] -z-10 h-[140px] w-[140px] rounded-full bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)] opacity-[.22] sm:h-[200px] sm:w-[200px]" />
      <div className="aspect-square rounded-full bg-[conic-gradient(from_180deg,#fc5304,#6a2fae,#fc5304)] p-3 shadow-[0_12px_32px_rgba(29,29,29,.1)]">
        <img src={src} alt={alt} loading="lazy" className="block h-full w-full rounded-full object-cover" style={{ objectPosition: position }} />
      </div>
    </div>
  );
}`,
      tailwind: `<div class="relative isolate mx-auto w-full max-w-[460px]">
  <span aria-hidden="true" class="absolute -right-[70px] -top-16 -z-10 h-[430px] w-[430px] rounded-full bg-[linear-gradient(135deg,#2e035d_0%,#4a1584_100%)] opacity-[.16] blur-[6px]"></span>
  <span aria-hidden="true" class="absolute -bottom-10 -left-[46px] -z-10 h-[200px] w-[200px] rounded-full bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)] opacity-[.22]"></span>
  <div class="aspect-square rounded-full bg-[conic-gradient(from_180deg,#fc5304,#6a2fae,#fc5304)] p-3 shadow-[0_12px_32px_rgba(29,29,29,.1)]">
    <img src="espelho-cliente.webp" alt="" class="block h-full w-full rounded-full object-cover object-[center_12%]">
  </div>
</div>`,
    },
  },

  // 10 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-gradient-border-video",
    name: "Vídeo com Borda Fina em Degradê",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "Moldura de vídeo em loop com borda de 2px em degradê (laranja, roxo, laranja) e cantos de 32px. Ela usa border transparente com o fundo pintado em border-box, e não padding, para a borda ficar nítida e uniforme mesmo fina, sem sumir nas retas. A moldura tem a proporção do vídeo (2:1). O vídeo é mudo, toca inline e não captura cliques.",
    tags: ["Gradient Border", "border-box", "Video Loop", "Demo", "Shadow"],
    defaultSection: "Prova / Demonstração",
    previewType: "lmrx-video-border",
    tech: ["Tailwind CSS", "React", "HTML5 Video"],
    frameworks: {
      react: `// ratio = proporção real do vídeo (2160x1080 → 2). Assim o object-fit: cover não corta nada.
export function GradientBorderVideo({ src = '/video/demo.webm', poster, ratio = 2, label = 'Demonstração da plataforma' }) {
  return (
    <div className="relative mx-auto max-w-[760px] rounded-[32px] border-2 border-transparent shadow-[0_30px_70px_rgba(0,0,0,.25)] [background:linear-gradient(135deg,#fc5304,#6a2fae,#fc5304)_border-box]"
      style={{ aspectRatio: String(ratio) }}>
      <video src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-label={label}
        className="pointer-events-none block h-full w-full rounded-[30px] bg-[#042454] object-cover" />
    </div>
  );
}`,
      tailwind: `<div class="relative mx-auto aspect-[2/1] max-w-[760px] rounded-[32px] border-2 border-transparent shadow-[0_30px_70px_rgba(0,0,0,.25)] [background:linear-gradient(135deg,#fc5304,#6a2fae,#fc5304)_border-box]">
  <video src="demo.webm" autoplay muted loop playsinline preload="metadata" aria-label="Demonstração da plataforma" class="pointer-events-none block h-full w-full rounded-[30px] bg-[#042454] object-cover"></video>
</div>`,
    },
  },

  // 11 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-scroll-timeline",
    name: "Linha do Tempo Alternada que Enche com a Rolagem",
    category: "etapas",
    categoryLabel: "Etapas & Linha do Tempo",
    description: "Jornada em passos numa linha vertical central. Um degradê laranja-roxo preenche a linha conforme a leitura avança (60% da tela). Os cards se alternam entre esquerda e direita e entram uma única vez, deslizando na diagonal a partir do seu lado. Quando cada passo entra, o ponto da linha acende em laranja. Abaixo de 768px a linha vai para a esquerda e todos os cards se alinham nela.",
    tags: ["Scroll Timeline", "Progress Fill", "Alternating", "Dot Activate", "Steps"],
    defaultSection: "Como Funciona",
    previewType: "lmrx-timeline",
    tech: ["Tailwind CSS", "React", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const ic = { fill: 'none', stroke: '#fff', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
const DEFAULT_STEPS = [
  { title: 'Você apresenta sua necessidade, sua base e o objetivo da operação', icon: <path d="M21 11.5a8.5 8.5 0 1 1-4.06-7.24L21 3l-1.2 3.88A8.46 8.46 0 0 1 21 11.5z" {...ic} /> },
  { title: 'A Loop+ configura a plataforma para a sua operação.', icon: <><circle cx="12" cy="12" r="3" {...ic} /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" {...ic} /></> },
  { title: 'O clube recebe identidade e ambiente personalizados para a sua marca.', icon: <><rect x="4" y="2" width="16" height="20" rx="3" {...ic} /><path d="M9 6h6M9 18h.01" {...ic} /></> },
  { title: 'Sua empresa ativa a base e acompanha a evolução do clube.', icon: <path d="M4 19V10M11 19V5M18 19v-7M3 19h18" {...ic} /> },
];

export function ScrollTimeline({ steps = DEFAULT_STEPS }) {
  const track = useRef(null), fill = useRef(null);
  const [seen, setSeen] = useState(() => steps.map(() => false));

  useEffect(() => {
    const T = track.current, F = fill.current;
    const items = Array.from(T.querySelectorAll('[data-tl-item]'));
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      F.style.height = '100%';
      setSeen(items.map(() => true));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = T.getBoundingClientRect();
      F.style.height = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height)) * 100 + '%';
      setSeen((prev) => {
        let changed = false;
        const next = items.map((el, i) => {
          const v = prev[i] || el.getBoundingClientRect().top < innerHeight * 0.85; // entra uma vez só
          if (v !== prev[i]) changed = true;
          return v;
        });
        return changed ? next : prev;
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [steps.length]);

  return (
    <div ref={track} className="relative mx-auto max-w-[1080px]">
      <div aria-hidden="true" className="absolute bottom-2.5 left-[10.5px] top-2.5 w-1 overflow-hidden rounded bg-[#ebebeb] md:left-1/2 md:-ml-0.5">
        <div ref={fill} className="absolute inset-x-0 top-0 h-0 bg-[linear-gradient(180deg,#fc5304,#2e035d)] transition-[height] duration-150 ease-linear" />
      </div>
      {steps.map((s, i) => {
        const right = i % 2 === 1, on = seen[i];
        return (
          <div key={i} data-tl-item
            className={'relative mb-14 w-full pl-12 transition-[opacity,transform] duration-500 ease-out last:mb-0 md:w-[calc(50%-50px)] md:pl-0 ' + (right ? 'md:ml-auto ' : '') +
              (on ? 'translate-x-0 translate-y-0 opacity-100' : 'translate-y-6 opacity-0 ' + (right ? 'translate-x-6' : '-translate-x-6'))}>
            <span aria-hidden="true"
              className={'absolute left-0 top-[30px] flex h-[25px] w-[25px] items-center justify-center rounded-full border-[3px] bg-white transition-colors duration-300 ' + (right ? 'md:left-[-64px] ' : 'md:left-auto md:right-[-64px] ') + (on ? 'border-[#fc5304]' : 'border-[#ebebeb]')}>
              <i className={'h-[11px] w-[11px] rounded-full transition-transform duration-300 ' + (on ? 'scale-110 bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)]' : 'bg-[#ebebeb]')} />
            </span>
            <div className="flex flex-col items-start justify-center gap-4 rounded-3xl border border-[#ebebeb] bg-white px-8 py-[27px] shadow-[0_2px_10px_rgba(29,29,29,.06)] transition-[box-shadow,transform] duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(29,29,29,.1)]">
              <div className="flex h-[65px] w-[65px] shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)]">
                <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">{s.icon}</svg>
              </div>
              <h3 className="m-0 font-['Baloo_2',sans-serif] text-xl font-bold leading-tight text-[#1d1d1d]">{s.title}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}`,
      tailwind: `<div class="relative mx-auto max-w-[1080px]" data-timeline>
  <div class="absolute bottom-2.5 left-[10.5px] top-2.5 w-1 overflow-hidden rounded bg-[#ebebeb] md:left-1/2 md:-ml-0.5">
    <div data-timeline-fill class="absolute inset-x-0 top-0 h-0 bg-[linear-gradient(180deg,#fc5304,#2e035d)] transition-[height] duration-150 ease-linear"></div>
  </div>
  <div data-timeline-item class="tl-item tl-left relative mb-14 w-full pl-12 md:w-[calc(50%-50px)] md:pl-0">
    <span class="tl-dot absolute left-0 top-[30px] flex h-[25px] w-[25px] items-center justify-center rounded-full border-[3px] border-[#ebebeb] bg-white md:left-auto md:right-[-64px]"><i></i></span>
    <div class="rounded-3xl border border-[#ebebeb] bg-white px-8 py-[27px] shadow-[0_2px_10px_rgba(29,29,29,.06)]"><h3 class="text-xl font-bold">Você apresenta sua necessidade, sua base e o objetivo da operação</h3></div>
  </div>
  <div data-timeline-item class="tl-item tl-right relative mb-14 w-full pl-12 last:mb-0 md:ml-auto md:w-[calc(50%-50px)] md:pl-0">
    <span class="tl-dot absolute left-0 top-[30px] flex h-[25px] w-[25px] items-center justify-center rounded-full border-[3px] border-[#ebebeb] bg-white md:left-[-64px]"><i></i></span>
    <div class="rounded-3xl border border-[#ebebeb] bg-white px-8 py-[27px] shadow-[0_2px_10px_rgba(29,29,29,.06)]"><h3 class="text-xl font-bold">A Loop+ configura a plataforma para a sua operação.</h3></div>
  </div>
</div>
<style>
  .tl-item{opacity:0;transition:opacity .5s ease,transform .5s ease}
  .tl-left{transform:translate(-24px,24px)}
  .tl-right{transform:translate(24px,24px)}
  .tl-item.is-visible{opacity:1;transform:none}
  .tl-dot{transition:border-color .3s ease}
  .tl-dot i{width:11px;height:11px;border-radius:50%;background:#ebebeb;transition:background .3s ease,transform .3s ease}
  .tl-item.is-visible .tl-dot{border-color:#fc5304}
  .tl-item.is-visible .tl-dot i{background:linear-gradient(135deg,#fc5304,#ff8040);transform:scale(1.1)}
</style>
<script>
  (function () {
    var tls = [].map.call(document.querySelectorAll('[data-timeline]'), function (t) {
      return { t: t, fill: t.querySelector('[data-timeline-fill]'), items: [].slice.call(t.querySelectorAll('[data-timeline-item]')) };
    });
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      tls.forEach(function (e) { e.fill.style.height = '100%'; e.items.forEach(function (i) { i.classList.add('is-visible'); }); });
      return;
    }
    var ticking = false;
    function update() {
      ticking = false;
      tls.forEach(function (e) {
        var r = e.t.getBoundingClientRect();
        e.fill.style.height = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height)) * 100 + '%';
        e.items.forEach(function (i) {
          if (!i.classList.contains('is-visible') && i.getBoundingClientRect().top < innerHeight * 0.85) i.classList.add('is-visible');
        });
      });
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
  })();
</script>`,
    },
  },

  // 12 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-hide-on-scroll-header",
    name: "Header de Vidro que Some ao Rolar",
    category: "navegacao",
    categoryLabel: "Header, Rodapé & Pop-up",
    description: "Header fixo com branco translúcido (62%) e blur forte de 22px com saturação, para o conteúdo passar desfocado por trás. Ao rolar para baixo mais de 6px ele sobe, some e desfoca; ao rolar para cima, volta. Perto do topo da página fica sempre visível. Com movimento reduzido ele nunca se esconde.",
    tags: ["Sticky Header", "Hide on Scroll", "Glass", "Backdrop Blur", "Scroll Direction"],
    defaultSection: "Cabeçalho",
    previewType: "lmrx-header",
    tech: ["Tailwind CSS", "React", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export function HideOnScrollHeader({
  logo = <b className="font-['Baloo_2',sans-serif] text-2xl text-[#2e035d]">Loop+</b>,
  links = [{ label: 'Produto', href: '#produto' }, { label: 'Como funciona', href: '#como-funciona' }, { label: 'Dúvidas', href: '#faq' }],
  cta = { label: 'Quero conhecer', href: '#' },
  threshold = 6,
}) {
  const ref = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let lastY = scrollY, ticking = false;
    const update = () => {
      const y = Math.max(0, scrollY), delta = y - lastY;
      if (y <= ref.current.offsetHeight) setHidden(false);
      else if (delta > threshold) setHidden(true);
      else if (delta < -threshold) setHidden(false);
      lastY = y;
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [threshold]);

  return (
    <header ref={ref}
      className={'sticky top-0 z-[100] border-b border-[rgba(235,235,235,.7)] bg-white/60 backdrop-blur-[22px] backdrop-saturate-[1.6] transition-[transform,opacity,filter] duration-[350ms] ease-out ' + (hidden ? '-translate-y-full opacity-0 blur-[6px]' : '')}>
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between gap-6 px-6">
        <a href="/" aria-label="Início">{logo}</a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => <a key={l.href} href={l.href} className="text-[15px] font-semibold text-[#1d1d1d] transition-colors hover:text-[#fc5304]">{l.label}</a>)}
        </nav>
        <a href={cta.href} className="rounded-full bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)] px-5 py-3 text-xs font-bold uppercase tracking-[0.02em] text-white">{cta.label}</a>
      </div>
    </header>
  );
}`,
      tailwind: `<header id="lmrx-header" class="sticky top-0 z-[100] border-b border-[rgba(235,235,235,.7)] bg-white/60 backdrop-blur-[22px] backdrop-saturate-[1.6] transition-[transform,opacity,filter] duration-[350ms] ease-out">
  <div class="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between gap-6 px-6">
    <a href="/" class="text-2xl font-bold text-[#2e035d]">Loop+</a>
    <nav class="hidden items-center gap-8 md:flex">
      <a href="#produto" class="text-[15px] font-semibold hover:text-[#fc5304]">Produto</a>
      <a href="#como-funciona" class="text-[15px] font-semibold hover:text-[#fc5304]">Como funciona</a>
    </nav>
    <a href="#" class="rounded-full bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)] px-5 py-3 text-xs font-bold uppercase text-white">Quero conhecer</a>
  </div>
</header>
<style>.is-hidden{transform:translateY(-100%);opacity:0;filter:blur(6px)}</style>
<script>
  (function () {
    var h = document.getElementById('lmrx-header');
    if (!h || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var lastY = scrollY, ticking = false;
    function update() {
      var y = Math.max(0, scrollY), d = y - lastY;
      if (y <= h.offsetHeight) h.classList.remove('is-hidden');
      else if (d > 6) h.classList.add('is-hidden');
      else if (d < -6) h.classList.remove('is-hidden');
      lastY = y; ticking = false;
    }
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  })();
</script>`,
    },
  },

  // 13 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-step-logo-carousel",
    name: "Carrossel de Logos Passo a Passo (Sem Corte)",
    category: "depoimentos",
    categoryLabel: "Depoimentos & Prova Social",
    description: "Carrossel manual de logos parceiras: cada clique na seta avança exatamente uma logo, com transição de 0,4s. Não roda sozinho nem dá loop, e as setas ficam desativadas nas pontas. A largura da janela é calculada para caber N logos inteiras (4 no desktop, 2 no celular), então nunca aparece meia logo na borda.",
    tags: ["Logo Carousel", "Step Slider", "No Partial Items", "Arrows", "Partners"],
    defaultSection: "Marcas Parceiras",
    previewType: "lmrx-logo-carousel",
    tech: ["Tailwind CSS", "React", "matchMedia"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const Arrow = ({ dir, ...p }) => (
  <button type="button" aria-label={dir === 'prev' ? 'Logos anteriores' : 'Próximas logos'} {...p}
    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#ebebeb] bg-white text-[#1d1d1d] transition-[border-color,color,opacity] duration-150 hover:border-[#fc5304] hover:text-[#fc5304] disabled:cursor-default disabled:opacity-35 disabled:hover:border-[#ebebeb] disabled:hover:text-[#1d1d1d]">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
    </svg>
  </button>
);

// logos: [{ src, alt }]. Sem src, desenha um quadrado de exemplo.
export function StepLogoCarousel({ logos = Array.from({ length: 8 }, (_, i) => ({ alt: 'Parceiro ' + (i + 1) })), desktop = 4, mobile = 2 }) {
  const track = useRef(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(desktop);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const mq = matchMedia('(max-width: 640px)');
    // distância de uma logo para a outra medida no DOM (largura + margem): continua certa se o CSS mudar
    const measure = () => {
      const it = track.current.children;
      setCount(mq.matches ? mobile : desktop);
      setStep(it.length > 1 ? it[1].offsetLeft - it[0].offsetLeft : it[0] ? it[0].getBoundingClientRect().width : 0);
    };
    measure();
    addEventListener('resize', measure);
    return () => removeEventListener('resize', measure);
  }, [desktop, mobile]);

  const max = Math.max(0, logos.length - count);
  const i = Math.min(index, max);
  return (
    <div className="flex items-center justify-center gap-4">
      <Arrow dir="prev" disabled={i <= 0} onClick={() => setIndex(Math.max(0, i - 1))} />
      {/* janela = N logos inteiras; flex: 0 0 auto para o width calculado valer */}
      <div className="flex-[0_0_auto] overflow-hidden" style={step ? { width: Math.min(logos.length, count) * step } : undefined}>
        <div ref={track} className="flex transition-transform duration-[400ms] ease-out motion-reduce:transition-none" style={{ transform: 'translateX(' + -(i * step) + 'px)' }}>
          {logos.map((l, k) => (
            <div key={k} className="mr-4 h-[88px] w-[88px] shrink-0 sm:mr-6 sm:h-[120px] sm:w-[120px]">
              {l.src
                ? <img src={l.src} alt={l.alt} loading="lazy" className="h-full w-full rounded-[22px] object-cover" />
                : <div role="img" aria-label={l.alt} className="grid h-full w-full place-items-center rounded-[22px] bg-[linear-gradient(135deg,#2e035d,#6a2fae)] font-bold text-white">{k + 1}</div>}
            </div>
          ))}
        </div>
      </div>
      <Arrow dir="next" disabled={i >= max} onClick={() => setIndex(Math.min(max, i + 1))} />
    </div>
  );
}`,
      tailwind: `<div class="flex items-center justify-center gap-4" data-logo-carousel>
  <button type="button" data-prev aria-label="Logos anteriores" class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#ebebeb] hover:border-[#fc5304] hover:text-[#fc5304] disabled:opacity-35">‹</button>
  <div data-viewport class="flex-[0_0_auto] overflow-hidden">
    <div data-track class="flex transition-transform duration-[400ms] ease-out">
      <img src="logo01.webp" alt="" class="mr-6 h-[120px] w-[120px] shrink-0 rounded-[22px]">
      <img src="logo02.webp" alt="" class="mr-6 h-[120px] w-[120px] shrink-0 rounded-[22px]">
      <img src="logo03.webp" alt="" class="mr-6 h-[120px] w-[120px] shrink-0 rounded-[22px]">
      <img src="logo04.webp" alt="" class="mr-6 h-[120px] w-[120px] shrink-0 rounded-[22px]">
      <img src="logo05.webp" alt="" class="mr-6 h-[120px] w-[120px] shrink-0 rounded-[22px]">
      <img src="logo06.webp" alt="" class="mr-6 h-[120px] w-[120px] shrink-0 rounded-[22px]">
    </div>
  </div>
  <button type="button" data-next aria-label="Próximas logos" class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#ebebeb] hover:border-[#fc5304] hover:text-[#fc5304] disabled:opacity-35">›</button>
</div>
<script>
  (function () {
    var c = document.querySelector('[data-logo-carousel]');
    var vp = c.querySelector('[data-viewport]'), track = c.querySelector('[data-track]');
    var prev = c.querySelector('[data-prev]'), next = c.querySelector('[data-next]');
    var items = [].slice.call(track.children), index = 0;
    function step() { return items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : items[0].getBoundingClientRect().width; }
    function visible() { return matchMedia('(max-width: 640px)').matches ? 2 : 4; }
    function max() { return Math.max(0, items.length - visible()); }
    function render() {
      vp.style.width = Math.min(items.length, visible()) * step() + 'px';
      if (index > max()) index = max();
      track.style.transform = 'translateX(' + -(index * step()) + 'px)';
      prev.disabled = index <= 0;
      next.disabled = index >= max();
    }
    prev.addEventListener('click', function () { index = Math.max(0, index - 1); render(); });
    next.addEventListener('click', function () { index = Math.min(max(), index + 1); render(); });
    addEventListener('resize', render);
    render();
  })();
</script>`,
    },
  },

  // 14 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-faq-plus-rotate",
    name: "FAQ Nativo com '+' que Vira 'x'",
    category: "faq",
    categoryLabel: "FAQ",
    description: "Acordeão feito com details/summary nativo, que funciona sem JavaScript e é acessível por teclado. A pergunta fica em Baloo 19px, bem maior que a resposta. Um '+' laranja à direita gira 45° e vira 'x' ao abrir, e o marcador padrão do navegador é escondido.",
    tags: ["FAQ", "Accordion", "details/summary", "No JS", "Rotate Icon"],
    defaultSection: "Dúvidas Frequentes",
    previewType: "lmrx-faq",
    tech: ["Tailwind CSS", "React", "HTML details"],
    frameworks: {
      react: `const DEFAULT_ITEMS = [
  { q: 'O que é White Label?', a: 'É uma estrutura tecnológica que opera com a identidade da sua empresa, marca, cores, domínio e experiência, sem expor a Loop+ ao usuário final.' },
  { q: 'Preciso desenvolver um app?', a: 'Não. A Loop+ já possui infraestrutura web e mobile. Aplicativos iOS e Android personalizados com a marca da empresa entram a partir da faixa de 1.000 usuários.' },
  { q: 'Serve para pequenas e médias empresas?', a: 'Sim. A Loop+ atende operações de diferentes portes, desde que exista uma base real para relacionamento.' },
];

export function FaqPlusRotate({ items = DEFAULT_ITEMS }) {
  return (
    <div className="mx-auto max-w-[760px]">
      {items.map((it) => (
        <details key={it.q} className="group mb-2">
          <summary className="flex cursor-pointer list-none items-center justify-between px-1 py-[22px] font-['Baloo_2',sans-serif] text-[19px] font-bold text-[#1d1d1d] [&::-webkit-details-marker]:hidden">
            {it.q}
            <span aria-hidden="true" className="ml-4 shrink-0 text-[22px] leading-none text-[#fc5304] transition-transform duration-200 group-open:rotate-45">+</span>
          </summary>
          <p className="m-0 px-1 pb-[22px] text-base text-[#6b6b6b]">{it.a}</p>
        </details>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="mx-auto max-w-[760px]">
  <details class="group mb-2">
    <summary class="flex cursor-pointer list-none items-center justify-between px-1 py-[22px] text-[19px] font-bold text-[#1d1d1d] [&::-webkit-details-marker]:hidden">
      O que é White Label?
      <span aria-hidden="true" class="ml-4 shrink-0 text-[22px] leading-none text-[#fc5304] transition-transform duration-200 group-open:rotate-45">+</span>
    </summary>
    <p class="px-1 pb-[22px] text-base text-[#6b6b6b]">É uma estrutura tecnológica que opera com a identidade da sua empresa, marca, cores, domínio e experiência, sem expor a Loop+ ao usuário final.</p>
  </details>
  <!-- repita para cada pergunta -->
</div>`,
    },
  },

  // 15 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-rx-quiz-stepper",
    name: "Formulário RX em Etapas com Avanço Automático",
    category: "formularios",
    categoryLabel: "Formulários & Quiz",
    description: "Diagnóstico de várias perguntas numa tela só, com uma barra de progresso fina em degradê no topo que cresce a cada etapa. Ao marcar uma opção, a pergunta avança sozinha 280ms depois. Se a opção for 'Outro', abre um campo curto com botão 'Continuar', que só avança se tiver texto. Cada etapa entra com fade-up de 0,35s e existe um botão 'Voltar'. As respostas ficam no sessionStorage, então recarregar a página não perde nada.",
    tags: ["Multi-step Form", "Auto Advance", "Progress Bar", "Other Field", "Quiz"],
    defaultSection: "Formulário / Qualificação",
    previewType: "lmrx-quiz",
    tech: ["Tailwind CSS", "React", "sessionStorage"],
    frameworks: {
      react: `import { useEffect, useState } from 'react';

const KEYFRAMES = '@keyframes lmrxUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}';
const DEFAULT_QUESTIONS = [
  { name: 'base_publico', title: 'Qual é a principal base com quem sua empresa quer fortalecer o relacionamento?', options: ['Clientes', 'Associados / representados', 'Cooperados', 'Colaboradores', 'Empresas / rede B2B', 'Outro'] },
  { name: 'tamanho_base', title: 'Qual é o tamanho aproximado dessa base hoje?', options: ['Até 500', '501 a 1.000', '1.001 a 5.000', 'Mais de 5.000', 'Ainda não sei / preciso estimar'] },
  { name: 'dor_principal', title: 'Qual é o principal desafio que você quer resolver com essa base?', options: ['Fortalecer relacionamento e retenção', 'Reativar uma base pouco engajada', 'Gerar mais valor percebido para a base', 'Criar uma nova fonte de receita / recorrência', 'Outro'] },
];
const KEY = 'lmrx_quiz';

export function RxQuizStepper({ questions = DEFAULT_QUESTIONS, onComplete, done = <p className="text-lg font-bold text-[#1d1d1d]">Recebemos suas respostas!</p> }) {
  const [step, setStep] = useState(0); // 0..questions.length (o último é a tela final)
  const [answers, setAnswers] = useState({});
  const [other, setOther] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    try { setAnswers(JSON.parse(sessionStorage.getItem(KEY)) || {}); } catch { /* sem storage */ }
  }, []);
  const save = (next) => { setAnswers(next); try { sessionStorage.setItem(KEY, JSON.stringify(next)); } catch { /* sem storage */ } return next; };

  const total = questions.length + 1;
  const q = questions[step];
  // ans: respostas já atualizadas (o state ainda não mudou neste clique)
  const goTo = (n, ans = answers) => { setStep(n); setOther(''); setError(false); if (n === questions.length && onComplete) onComplete(ans); };

  const pick = (value) => {
    const next = save({ ...answers, [q.name]: value });
    if (value === 'Outro') return; // abre o campo, não avança
    setTimeout(() => goTo(step + 1, next), 280);
  };
  const confirmOther = () => {
    if (other.trim().length < 2) { setError(true); return; }
    goTo(step + 1, save({ ...answers, [q.name]: 'Outro', [q.name + '_outro']: other.trim() }));
  };

  return (
    <div className="mx-auto w-full max-w-[560px] overflow-hidden rounded-3xl border border-[#ebebeb] bg-white shadow-[0_12px_32px_rgba(29,29,29,.1)]">
      <style>{KEYFRAMES}</style>
      <div className="h-1.5 bg-[#ebebeb]" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={step + 1}>
        <div className="h-full bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)] transition-[width] duration-[350ms] ease-out" style={{ width: ((step + 1) / total) * 100 + '%' }} />
      </div>
      <div key={step} className="p-6 sm:p-10 animate-[lmrxUp_.35s_ease] motion-reduce:animate-none">
        {q ? (
          <>
            <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#fc5304]">Pergunta {step + 1} de {questions.length}</p>
            <h2 className="mb-6 font-['Baloo_2',sans-serif] text-2xl font-bold leading-tight text-[#1d1d1d]">{q.title}</h2>
            <div className="grid gap-3" role="radiogroup">
              {q.options.map((o) => (
                <label key={o} className="flex cursor-pointer items-center justify-between rounded-[10px] border-[1.5px] border-[#ebebeb] px-5 py-4 text-[15px] font-semibold text-[#1d1d1d] transition-colors duration-150 has-[:checked]:border-[#fc5304] has-[:checked]:bg-[rgba(252,83,4,.06)] has-[:checked]:text-[#973101] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#fc5304]/40">
                  <input type="radio" name={q.name} value={o} checked={answers[q.name] === o} onChange={() => pick(o)} className="peer sr-only" />
                  {o}
                  <span aria-hidden="true" className="h-[18px] w-[18px] shrink-0 rounded-full border-[1.5px] border-[#ebebeb] peer-checked:border-[#fc5304] peer-checked:bg-[#fc5304] peer-checked:shadow-[inset_0_0_0_3px_#fff]" />
                </label>
              ))}
            </div>
            {answers[q.name] === 'Outro' && (
              <div className="mt-4">
                <input autoFocus value={other} onChange={(e) => setOther(e.target.value)} placeholder="Conte rapidinho"
                  className={'w-full rounded-[10px] border-[1.5px] px-4 py-3.5 text-[15px] outline-none focus:border-[#fc5304] ' + (error ? 'border-[#d81c1c]' : 'border-[#ebebeb]')} />
                {error && <small className="mt-1.5 block text-[12.5px] text-[#d81c1c]">Escreva pelo menos 2 letras.</small>}
                <button type="button" onClick={confirmOther} className="mt-3 w-full rounded-full bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)] px-7 py-3.5 text-sm font-bold uppercase text-white">Continuar</button>
              </div>
            )}
            <button type="button" onClick={() => goTo(step - 1)} className={'mt-7 p-2 text-sm font-bold text-[#6b6b6b] ' + (step > 0 ? '' : 'invisible')}>Voltar</button>
          </>
        ) : done}
      </div>
    </div>
  );
}`,
      tailwind: `<div id="lmrx-quiz" class="mx-auto w-full max-w-[560px] overflow-hidden rounded-3xl border border-[#ebebeb] bg-white">
  <div class="h-1.5 bg-[#ebebeb]"><div data-bar class="h-full w-0 bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)] transition-[width] duration-[350ms]"></div></div>
  <div class="p-10">
    <div class="q-stage is-active" data-stage="1">
      <h2 class="mb-6 text-2xl font-bold">Qual é a principal base com quem sua empresa quer fortalecer o relacionamento?</h2>
      <div class="grid gap-3">
        <label class="q-opt"><input type="radio" name="base" value="Clientes" class="sr-only">Clientes<span></span></label>
        <label class="q-opt"><input type="radio" name="base" value="Cooperados" class="sr-only">Cooperados<span></span></label>
        <label class="q-opt"><input type="radio" name="base" value="Outro" class="sr-only">Outro<span></span></label>
      </div>
      <div class="q-specify mt-4" hidden>
        <input type="text" placeholder="Conte rapidinho" class="w-full rounded-[10px] border-[1.5px] border-[#ebebeb] px-4 py-3.5">
        <button type="button" class="q-continue mt-3 w-full rounded-full bg-[#fc5304] px-7 py-3.5 text-sm font-bold uppercase text-white">Continuar</button>
      </div>
    </div>
    <div class="q-stage" data-stage="2">
      <h2 class="mb-6 text-2xl font-bold">Qual é o tamanho aproximado dessa base hoje?</h2>
      <div class="grid gap-3">
        <label class="q-opt"><input type="radio" name="tamanho" value="Até 500" class="sr-only">Até 500<span></span></label>
        <label class="q-opt"><input type="radio" name="tamanho" value="Mais de 5.000" class="sr-only">Mais de 5.000<span></span></label>
      </div>
    </div>
    <div class="q-stage" data-stage="3"><p class="text-lg font-bold">Recebemos suas respostas!</p></div>
    <button type="button" data-back class="invisible mt-7 p-2 text-sm font-bold text-[#6b6b6b]">Voltar</button>
  </div>
</div>
<style>
  .q-stage{display:none}
  .q-stage.is-active{display:block;animation:lmrxUp .35s ease}
  @keyframes lmrxUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  .q-opt{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border:1.5px solid #ebebeb;border-radius:10px;font-weight:600;cursor:pointer;transition:border-color .15s,background .15s}
  .q-opt span{width:18px;height:18px;border-radius:50%;border:1.5px solid #ebebeb}
  .q-opt:has(:checked){border-color:#fc5304;background:rgba(252,83,4,.06);color:#973101}
  .q-opt:has(:checked) span{border-color:#fc5304;background:#fc5304;box-shadow:inset 0 0 0 3px #fff}
  @media (prefers-reduced-motion:reduce){.q-stage.is-active{animation:none}}
</style>
<script>
  (function () {
    var root = document.getElementById('lmrx-quiz');
    var stages = [].slice.call(root.querySelectorAll('.q-stage'));
    var bar = root.querySelector('[data-bar]'), back = root.querySelector('[data-back]');
    var current = 1;
    function goTo(n) {
      stages.forEach(function (s) { s.classList.toggle('is-active', Number(s.dataset.stage) === n); });
      bar.style.width = (n / stages.length) * 100 + '%';
      back.classList.toggle('invisible', !(n > 1 && n < stages.length));
      current = n;
    }
    function advance() { if (current < stages.length) goTo(current + 1); }
    back.addEventListener('click', function () { if (current > 1) goTo(current - 1); });
    root.querySelectorAll('.q-opt input').forEach(function (input) {
      input.addEventListener('change', function () {
        var spec = input.closest('.q-stage').querySelector('.q-specify');
        if (spec) {
          spec.hidden = input.value !== 'Outro';
          if (!spec.hidden) { spec.querySelector('input').focus(); return; }
        }
        setTimeout(advance, 280);
      });
    });
    root.querySelectorAll('.q-continue').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var field = btn.parentNode.querySelector('input');
        if (field.value.trim().length < 2) { field.style.borderColor = '#d81c1c'; return; }
        advance();
      });
    });
    goTo(1);
  })();
</script>`,
    },
  },

  // 16 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-radio-option-cards",
    name: "Opções de Resposta com Rádio Personalizado",
    category: "formularios",
    categoryLabel: "Formulários & Quiz",
    description: "Opções de múltipla escolha em forma de cartão inteiro clicável. O rádio nativo fica invisível (mas acessível) e um círculo desenhado à direita mostra a escolha. Quando marcada, a opção ganha borda laranja, fundo laranja a 6% e texto laranja escuro. O círculo fica cheio, com um anel branco interno feito com box-shadow inset.",
    tags: ["Radio Cards", "Custom Radio", ":has(:checked)", "Form UX", "Accessible"],
    defaultSection: "Formulário / Qualificação",
    previewType: "lmrx-radio-cards",
    tech: ["Tailwind CSS", "React", "CSS :has()"],
    frameworks: {
      react: `export function RadioOptionCards({ name = 'opcao', options = ['Clientes', 'Cooperados', 'Colaboradores'], value, onChange }) {
  return (
    <div className="grid gap-3" role="radiogroup">
      {options.map((o) => (
        <label key={o}
          className="flex cursor-pointer items-center justify-between rounded-[10px] border-[1.5px] border-[#ebebeb] px-5 py-4 text-[15px] font-semibold text-[#1d1d1d] transition-[border-color,background-color] duration-150 hover:border-[#fda57b] has-[:checked]:border-[#fc5304] has-[:checked]:bg-[rgba(252,83,4,.06)] has-[:checked]:text-[#973101] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#fc5304]/40">
          <input type="radio" name={name} value={o} checked={value === undefined ? undefined : value === o}
            onChange={() => onChange && onChange(o)} className="peer sr-only" />
          {o}
          <span aria-hidden="true" className="h-[18px] w-[18px] shrink-0 rounded-full border-[1.5px] border-[#ebebeb] transition-colors peer-checked:border-[#fc5304] peer-checked:bg-[#fc5304] peer-checked:shadow-[inset_0_0_0_3px_#fff]" />
        </label>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="grid gap-3" role="radiogroup">
  <label class="flex cursor-pointer items-center justify-between rounded-[10px] border-[1.5px] border-[#ebebeb] px-5 py-4 text-[15px] font-semibold text-[#1d1d1d] transition duration-150 hover:border-[#fda57b] has-[:checked]:border-[#fc5304] has-[:checked]:bg-[rgba(252,83,4,.06)] has-[:checked]:text-[#973101]">
    <input type="radio" name="opcao" value="Clientes" class="peer sr-only">
    Clientes
    <span aria-hidden="true" class="h-[18px] w-[18px] shrink-0 rounded-full border-[1.5px] border-[#ebebeb] peer-checked:border-[#fc5304] peer-checked:bg-[#fc5304] peer-checked:shadow-[inset_0_0_0_3px_#fff]"></span>
  </label>
  <!-- repita para cada opção -->
</div>`,
    },
  },

  // 17 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmrx-whatsapp-mask",
    name: "Campo de WhatsApp com Máscara ao Digitar",
    category: "formularios",
    categoryLabel: "Formulários & Quiz",
    description: "Campo de telefone que formata enquanto a pessoa digita: guarda só os números (até 11) e monta (11) 99999-9999 ou (11) 9999-9999 conforme o tamanho. A borda fica laranja no foco e vermelha com mensagem curta quando o número está incompleto ao sair do campo. Abre o teclado numérico no celular.",
    tags: ["Input Mask", "Phone BR", "Validation", "Form UX", "inputMode tel"],
    defaultSection: "Formulário / Identificação",
    previewType: "lmrx-whatsapp-mask",
    tech: ["Tailwind CSS", "React", "Regex"],
    frameworks: {
      react: `import { useId, useState } from 'react';

export function formatWhatsApp(raw) {
  const d = raw.replace(/\\D/g, '').slice(0, 11);
  if (d.length > 10) return d.replace(/(\\d{2})(\\d{5})(\\d{0,4})/, '($1) $2-$3');
  if (d.length > 6) return d.replace(/(\\d{2})(\\d{4})(\\d{0,4})/, '($1) $2-$3');
  if (d.length > 2) return d.replace(/(\\d{2})(\\d{0,5})/, '($1) $2');
  if (d.length > 0) return '(' + d;
  return '';
}

export function WhatsAppInput({ label = 'WhatsApp', name = 'whatsapp', value, onChange }) {
  const id = useId();
  const [inner, setInner] = useState('');
  const [touched, setTouched] = useState(false);
  const v = value === undefined ? inner : value;
  const digits = v.replace(/\\D/g, '').length;
  const invalid = touched && digits < 10;
  const set = (raw) => { const f = formatWhatsApp(raw); if (value === undefined) setInner(f); if (onChange) onChange(f); };
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-[13.5px] font-bold text-[#1d1d1d]">{label}</label>
      <input id={id} name={name} type="tel" inputMode="tel" autoComplete="tel" placeholder="(11) 99999-9999"
        value={v} onChange={(e) => set(e.target.value)} onBlur={() => setTouched(true)} aria-invalid={invalid}
        className={'w-full rounded-[10px] border-[1.5px] bg-white px-4 py-3.5 text-[15px] text-[#1d1d1d] outline-none transition-colors duration-150 focus:border-[#fc5304] ' + (invalid ? 'border-[#d81c1c]' : 'border-[#ebebeb]')} />
      {invalid && <small className="mt-1.5 block text-[12.5px] text-[#d81c1c]">Informe um WhatsApp válido com DDD.</small>}
    </div>
  );
}`,
      tailwind: `<label for="lmrx-wpp" class="mb-2 block text-[13.5px] font-bold text-[#1d1d1d]">WhatsApp</label>
<input id="lmrx-wpp" type="tel" inputmode="tel" autocomplete="tel" placeholder="(11) 99999-9999" class="w-full rounded-[10px] border-[1.5px] border-[#ebebeb] px-4 py-3.5 text-[15px] outline-none transition-colors focus:border-[#fc5304]">
<script>
  (function () {
    var el = document.getElementById('lmrx-wpp');
    el.addEventListener('input', function () {
      var d = el.value.replace(/\\D/g, '').slice(0, 11), f = d;
      if (d.length > 10) f = d.replace(/(\\d{2})(\\d{5})(\\d{0,4})/, '($1) $2-$3');
      else if (d.length > 6) f = d.replace(/(\\d{2})(\\d{4})(\\d{0,4})/, '($1) $2-$3');
      else if (d.length > 2) f = d.replace(/(\\d{2})(\\d{0,5})/, '($1) $2');
      else if (d.length > 0) f = '(' + d;
      el.value = f;
    });
    el.addEventListener('blur', function () {
      el.style.borderColor = el.value.replace(/\\D/g, '').length < 10 ? '#d81c1c' : '';
    });
  })();
</script>`,
    },
  },
];
