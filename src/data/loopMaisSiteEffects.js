// Efeitos extraídos do site institucional da Loop+ (pasta "LoopMais/site-institucional": Início, Soluções, Quem Somos, Parceiros e Contato)
// Paleta original: branco com poucas seções roxas (degradê radial #76058f > #43096a > #220b52 > #1a0638), laranja #fc5304 (até #ff7a33),
// laranja claro #ffb48a, roxo #2e035d, texto #1d1d1d / #5d5866, linha #e7e0ef. Fontes: Baloo 2 Bold (títulos) e Montserrat (corpo).
const B = { client: "Loop+", badge: "Loop+" };

export const loopMaisSiteEffects = [
  // 1 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-infinity-arrow-button",
    name: "Botão com Seta que Desenha o Infinito e Círculo que Cobre",
    category: "botoes",
    categoryLabel: "Botões & CTAs",
    description: "Pílula com uma bolinha branca à direita. No hover a seta dentro da bolinha percorre um símbolo de infinito (com offset-path) e termina reta, deixando o rastro do ∞ desenhado, e um círculo da cor secundária nasce atrás da bolinha e cresce até cobrir o botão inteiro. O tamanho final do círculo é calculado pela largura do botão, então funciona em qualquer texto.",
    tags: ["Offset Path", "Infinity Loop", "Circle Fill", "Hover", "Pill Button"],
    defaultSection: "Hero Principal",
    previewType: "lmsi-inf-btn",
    tech: ["Tailwind CSS", "React", "CSS offset-path"],
    frameworks: {
      react: `import { useRef } from 'react';

// Caminho do ∞ dentro da bolinha de 40px: sai do centro, faz os dois laços e volta ao centro
const INF = 'M20 20 C 23.5 14.5, 31 14.5, 31 20 C 31 25.5, 23.5 25.5, 20 20 C 16.5 14.5, 9 14.5, 9 20 C 9 25.5, 16.5 25.5, 20 20';
const CSS = '@keyframes lmLoop{0%{offset-distance:0%;offset-rotate:auto 57.5deg}14%{offset-rotate:auto 0deg}86%{offset-rotate:auto 0deg}100%{offset-distance:100%;offset-rotate:auto 57.5deg}}' +
  '.lm-btn::before{content:"";position:absolute;z-index:-1;right:28px;top:50%;width:30px;height:30px;margin:-15px -15px 0 0;border-radius:50%;background:var(--fill-c,#2e035d);transform:scale(0);transition:transform .7s cubic-bezier(.22,1,.36,1)}' +
  '.lm-btn:hover::before,.lm-btn:focus-visible::before{transform:scale(var(--fill,40))}' +
  '.lm-btn:hover .lm-arr,.lm-btn:focus-visible .lm-arr{animation:lmLoop 1.05s cubic-bezier(.45,.05,.3,1)}' +
  '.lm-btn:hover .lm-trail,.lm-btn:focus-visible .lm-trail{stroke-dashoffset:0}' +
  '.lm-btn:hover .lm-ico,.lm-btn:focus-visible .lm-ico{color:#2e035d}';

export function InfinityButton({ href = '#', children = 'Fale com um especialista' }) {
  const ref = useRef(null);
  // diâmetro final = 2,1x a largura do botão (sempre cobre tudo)
  const size = () => ref.current.style.setProperty('--fill', String(Math.ceil((ref.current.offsetWidth * 2.1) / 30) + 1));
  return (
    <a ref={ref} href={href} onPointerEnter={size} onFocus={size}
      className="lm-btn relative isolate inline-flex min-h-14 items-center gap-3.5 overflow-hidden rounded-full bg-[linear-gradient(100deg,#fc5304,#ff7a33)] py-2 pl-7 pr-2 font-['Baloo_2',sans-serif] text-base font-bold text-white transition-transform active:scale-[.98]">
      <style>{CSS}</style>
      <span className="relative">{children}</span>
      <span className="lm-ico relative h-10 w-10 shrink-0 rounded-full bg-white text-[#fc5304] transition-colors">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 40 40" aria-hidden="true">
          <path className="lm-trail transition-[stroke-dashoffset] duration-[900ms]" d={INF} pathLength="1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".35" strokeDasharray="1" strokeDashoffset="1" />
        </svg>
        <svg className="lm-arr absolute left-0 top-0 h-3.5 w-3.5" style={{ offsetPath: "path('" + INF + "')", offsetDistance: '0%', offsetRotate: '0deg' }} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 7h10M8 3l4 4-4 4" />
        </svg>
      </span>
    </a>
  );
}`,
      tailwind: `<a href="#" class="lm-btn relative isolate inline-flex min-h-14 items-center gap-3.5 overflow-hidden rounded-full bg-[linear-gradient(100deg,#fc5304,#ff7a33)] py-2 pl-7 pr-2 font-bold text-white">
  <span class="relative">Fale com um especialista</span>
  <span class="lm-ico relative h-10 w-10 shrink-0 rounded-full bg-white text-[#fc5304]">
    <svg class="absolute inset-0 h-full w-full" viewBox="0 0 40 40" aria-hidden="true"><path class="lm-trail" d="M20 20 C 23.5 14.5, 31 14.5, 31 20 C 31 25.5, 23.5 25.5, 20 20 C 16.5 14.5, 9 14.5, 9 20 C 9 25.5, 16.5 25.5, 20 20" pathLength="1"/></svg>
    <svg class="lm-arr" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
  </span>
</a>
<style>
  .lm-btn::before{content:"";position:absolute;z-index:-1;right:28px;top:50%;width:30px;height:30px;margin:-15px -15px 0 0;border-radius:50%;background:#2e035d;transform:scale(0);transition:transform .7s cubic-bezier(.22,1,.36,1)}
  .lm-btn:hover::before{transform:scale(var(--fill,40))}
  .lm-trail{fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;opacity:.35;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .9s cubic-bezier(.22,1,.36,1)}
  .lm-arr{position:absolute;left:0;top:0;width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;offset-path:path("M20 20 C 23.5 14.5, 31 14.5, 31 20 C 31 25.5, 23.5 25.5, 20 20 C 16.5 14.5, 9 14.5, 9 20 C 9 25.5, 16.5 25.5, 20 20");offset-distance:0%;offset-rotate:0deg}
  .lm-btn:hover .lm-arr{animation:lmLoop 1.05s cubic-bezier(.45,.05,.3,1)}
  .lm-btn:hover .lm-trail{stroke-dashoffset:0}
  .lm-btn:hover .lm-ico{color:#2e035d}
  @keyframes lmLoop{0%{offset-distance:0%;offset-rotate:auto 57.5deg}14%{offset-rotate:auto 0deg}86%{offset-rotate:auto 0deg}100%{offset-distance:100%;offset-rotate:auto 57.5deg}}
</style>
<script>
  document.addEventListener('pointerover', function (e) { var b = e.target.closest && e.target.closest('.lm-btn'); if (b) b.style.setProperty('--fill', Math.ceil(b.offsetWidth * 2.1 / 30) + 1); }, { passive: true });
</script>`,
    },
  },

  // 2 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-title-3d-letters",
    name: "Letras do Destaque que Rolam ou Viram em 3D",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "O trecho em destaque do título é quebrado em letras e, em loop, cada letra rola para cima saindo de vista e volta por baixo (como um contador de aeroporto) ou dá uma volta completa no eixo X, uma depois da outra. Entre uma rodada e outra o texto fica parado e legível por mais da metade do tempo. O loop pausa fora da tela.",
    tags: ["Split Letters", "3D Flip", "Roll", "Stagger", "Loop"],
    defaultSection: "Títulos de Seção",
    previewType: "lmsi-letters3d",
    tech: ["Tailwind CSS", "React", "CSS 3D Transforms", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const CSS = '@keyframes fxRoll{0%,62%{transform:translateY(0)}70%{transform:translateY(-.5em) rotateX(80deg);opacity:0}71%{transform:translateY(.5em) rotateX(-80deg);opacity:0}80%,100%{transform:translateY(0);opacity:1}}' +
  '@keyframes fxFlip{0%,60%,100%{transform:rotateX(0)}72%{transform:rotateX(360deg)}}' +
  '@media (prefers-reduced-motion:reduce){.fx-ch{animation:none!important}}';

// kind: 'roll' | 'flip'
export function Letters3D({ children, kind = 'roll', className = 'text-[#fc5304]' }) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting), { rootMargin: '60px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const text = String(children);
  return (
    <span ref={ref} className={'relative inline-block whitespace-nowrap ' + (kind === 'flip' ? '[perspective:400px] ' : '') + className}>
      <style>{CSS}</style>
      <span className="sr-only">{text}</span>
      {text.split('').map((c, i) => (
        <span key={i} aria-hidden="true" className="fx-ch inline-block whitespace-pre [transform-origin:50%_60%]"
          style={{ animation: kind === 'flip' ? 'fxFlip 4.4s cubic-bezier(.22,1,.36,1) ' + i * 0.08 + 's infinite' : 'fxRoll 4.2s cubic-bezier(.22,1,.36,1) ' + i * 0.07 + 's infinite', animationPlayState: run ? 'running' : 'paused' }}>{c}</span>
      ))}
    </span>
  );
}`,
      tailwind: `<h2 class="text-4xl font-bold">Benefícios que <span class="fx fx-roll" aria-label="giram"><span class="ch" style="--i:0">g</span><span class="ch" style="--i:1">i</span><span class="ch" style="--i:2">r</span><span class="ch" style="--i:3">a</span><span class="ch" style="--i:4">m</span></span></h2>
<style>
  .fx{position:relative;display:inline-block;white-space:nowrap;color:#fc5304}
  .fx .ch{display:inline-block;white-space:pre}
  .fx-roll .ch{animation:fxRoll 4.2s cubic-bezier(.22,1,.36,1) infinite;animation-delay:calc(var(--i)*70ms)}
  .fx-flip{perspective:400px}.fx-flip .ch{transform-origin:50% 60%;animation:fxFlip 4.4s cubic-bezier(.22,1,.36,1) infinite;animation-delay:calc(var(--i)*80ms)}
  @keyframes fxRoll{0%,62%{transform:translateY(0)}70%{transform:translateY(-.5em) rotateX(80deg);opacity:0}71%{transform:translateY(.5em) rotateX(-80deg);opacity:0}80%,100%{transform:translateY(0);opacity:1}}
  @keyframes fxFlip{0%,60%,100%{transform:rotateX(0)}72%{transform:rotateX(360deg)}}
  @media (prefers-reduced-motion:reduce){.fx .ch{animation:none}}
</style>`,
    },
  },

  // 3 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-title-split-fill-shine",
    name: "Destaque que se Parte ao Meio, Enche de Cor ou Brilha",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "Mais três destaques para uma palavra do título, todos em CSS puro: 'partido' (a metade de cima desliza para a esquerda e a de baixo, em outra cor, para a direita, e se juntam de novo), 'enchendo' (a cor sobe de baixo para cima dentro das letras e desce) e 'brilho' (um reflexo claro atravessa as letras). Cada um com pausa longa legível.",
    tags: ["Split Text", "Text Fill", "Shine", "Clip Path", "Background Clip"],
    defaultSection: "Títulos de Seção",
    previewType: "lmsi-split",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `const CSS = [
  '.fx-split{position:relative;display:inline-block;color:transparent}',
  '.fx-split::before,.fx-split::after{content:attr(data-t);position:absolute;left:0;top:0}',
  '.fx-split::before{color:var(--c1);clip-path:inset(0 0 50% 0);animation:fxSA 3.6s cubic-bezier(.22,1,.36,1) infinite}',
  '.fx-split::after{color:var(--c2);clip-path:inset(50% 0 0 0);animation:fxSB 3.6s cubic-bezier(.22,1,.36,1) infinite}',
  '@keyframes fxSA{0%,55%,100%{transform:none}70%,80%{transform:translateX(-.18em)}}',
  '@keyframes fxSB{0%,55%,100%{transform:none}70%,80%{transform:translateX(.18em)}}',
  '.fx-fill{background:linear-gradient(to top,var(--c1) 50%,currentColor 50%);background-size:100% 200%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:fxFill 4s ease-in-out infinite}',
  '@keyframes fxFill{0%,10%{background-position:0 0}50%,60%{background-position:0 100%}100%{background-position:0 0}}',
  '.fx-shine{background:linear-gradient(100deg,var(--c1) 0 38%,#ffd0b5 48%,var(--c1) 58% 100%);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:fxShine 3.6s linear infinite}',
  '@keyframes fxShine{from{background-position:100% 0}to{background-position:-50% 0}}',
  '@media (prefers-reduced-motion:reduce){.fx-split::before,.fx-split::after,.fx-fill,.fx-shine{animation:none}}',
].join('');

// kind: 'split' | 'fill' | 'shine'. c1 = cor principal do destaque, c2 = cor da metade de baixo no 'split'.
export function TitleAccent({ children, kind = 'split', c1 = '#fc5304', c2 = '#76058f' }) {
  return (
    <span className={'fx-' + kind + ' inline-block whitespace-nowrap'} data-t={children} style={{ '--c1': c1, '--c2': c2 }}>
      <style>{CSS}</style>
      {children}
    </span>
  );
}`,
      tailwind: `<h2 class="text-4xl font-bold text-[#1d1d1d]">Uma solução <span class="fx-split" data-t="completa">completa</span>, sem <span class="fx-fill">planilha</span></h2>
<style>
  .fx-split{position:relative;display:inline-block;color:transparent}
  .fx-split::before,.fx-split::after{content:attr(data-t);position:absolute;left:0;top:0}
  .fx-split::before{color:#fc5304;clip-path:inset(0 0 50% 0);animation:fxSA 3.6s cubic-bezier(.22,1,.36,1) infinite}
  .fx-split::after{color:#76058f;clip-path:inset(50% 0 0 0);animation:fxSB 3.6s cubic-bezier(.22,1,.36,1) infinite}
  @keyframes fxSA{0%,55%,100%{transform:none}70%,80%{transform:translateX(-.18em)}}
  @keyframes fxSB{0%,55%,100%{transform:none}70%,80%{transform:translateX(.18em)}}
  .fx-fill{background:linear-gradient(to top,#fc5304 50%,currentColor 50%);background-size:100% 200%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:fxFill 4s ease-in-out infinite}
  @keyframes fxFill{0%,10%{background-position:0 0}50%,60%{background-position:0 100%}100%{background-position:0 0}}
</style>`,
    },
  },

  // 4 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-title-orbit-dot",
    name: "Anel que Orbita em Volta da Palavra em Destaque",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "Um pequeno anel vazado percorre uma elipse invisível em volta da palavra destacada, passando por cima e por baixo dela sem parar (5s por volta). A elipse é calculada pelo tamanho real da palavra e recalculada quando a fonte carrega ou a tela muda, então funciona com qualquer palavra.",
    tags: ["Offset Path", "Orbit", "Ellipse", "Accent", "Loop"],
    defaultSection: "Títulos de Seção",
    previewType: "lmsi-orbit",
    tech: ["Tailwind CSS", "React", "CSS offset-path", "ResizeObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export function OrbitAccent({ children, color = '#fc5304', ring = '#76058f' }) {
  const ref = useRef(null);
  const [path, setPath] = useState('');
  useEffect(() => {
    const set = () => {
      const w = ref.current.offsetWidth, h = ref.current.offsetHeight, rx = w / 2 + 10, ry = h / 2 + 2, cx = w / 2, cy = h / 2;
      // duas meias-elipses fecham a volta completa
      setPath("path('M " + (cx - rx) + ' ' + cy + ' A ' + rx + ' ' + ry + ' 0 1 0 ' + (cx + rx) + ' ' + cy + ' A ' + rx + ' ' + ry + ' 0 1 0 ' + (cx - rx) + ' ' + cy + "')");
    };
    set();
    document.fonts?.ready.then(set);
    const ro = new ResizeObserver(set); ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap" style={{ color }}>
      <style>{'@keyframes fxOrbit{from{offset-distance:0%}to{offset-distance:100%}}@media (prefers-reduced-motion:reduce){.fx-orb{animation:none!important}}'}</style>
      {children}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0">
        <i className="fx-orb absolute left-0 top-0 h-[.34em] w-[.34em] rounded-full border-[3px]" style={{ borderColor: ring, offsetPath: path, animation: 'fxOrbit 5s linear infinite' }} />
      </span>
    </span>
  );
}`,
      tailwind: `<h2 class="text-4xl font-bold">Um clube <span class="fx-orbit">completo</span></h2>
<style>
  .fx-orbit{position:relative;display:inline-block;white-space:nowrap;color:#fc5304}
  .fx-orbit__ring{position:absolute;inset:0;pointer-events:none}
  .fx-orbit__ring i{position:absolute;left:0;top:0;width:.34em;height:.34em;border:3px solid #76058f;border-radius:50%;offset-path:var(--orb);animation:fxOrbit 5s linear infinite}
  @keyframes fxOrbit{from{offset-distance:0%}to{offset-distance:100%}}
</style>
<script>
  document.querySelectorAll('.fx-orbit').forEach(function (el) {
    var ring = document.createElement('span'); ring.className = 'fx-orbit__ring'; ring.setAttribute('aria-hidden', 'true'); ring.appendChild(document.createElement('i')); el.appendChild(ring);
    function set() { var w = el.offsetWidth, h = el.offsetHeight, rx = w / 2 + 10, ry = h / 2 + 2, cx = w / 2, cy = h / 2; ring.firstChild.style.setProperty('--orb', "path('M " + (cx - rx) + ' ' + cy + ' A ' + rx + ' ' + ry + ' 0 1 0 ' + (cx + rx) + ' ' + cy + ' A ' + rx + ' ' + ry + ' 0 1 0 ' + (cx - rx) + ' ' + cy + "')"); }
    set(); addEventListener('resize', set); if (document.fonts) document.fonts.ready.then(set);
  });
</script>`,
    },
  },

  // 5 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-mega-header-drawer",
    name: "Header que Some ao Descer, com Submenu e Gaveta em Cascata",
    category: "navegacao",
    categoryLabel: "Header, Rodapé & Pop-up",
    description: "Header que ganha fundo depois de 8px de rolagem e se esconde ao descer (passado 260px), voltando ao subir; nunca some com um submenu aberto. No computador o submenu abre ao passar o mouse (com 160ms de tolerância para não fechar no caminho) e o clique leva à página; no toque, o 1º toque abre e o 2º navega. No celular a gaveta trava a rolagem da página, foca o botão de fechar e os itens entram em cascata. Esc fecha tudo.",
    tags: ["Smart Header", "Mega Menu", "Mobile Drawer", "Stagger", "Accessible"],
    defaultSection: "Header",
    previewType: "lmsi-header",
    tech: ["Tailwind CSS", "React", "ARIA"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const NAV = [
  { label: 'Início', href: '/' },
  { label: 'Soluções', href: '/nossas-solucoes/', sub: [['Clube de vantagens', '#'], ['Farmácias', '#'], ['Convênios', '#']] },
  { label: 'Quem Somos', href: '/sobre/' },
  { label: 'Contato', href: '/contato/', sub: [['Comercial', '#'], ['Suporte', '#'], ['Parcerias', '#']] },
];

export function SmartHeader() {
  const [scrolled, setScrolled] = useState(false), [hidden, setHidden] = useState(false), [open, setOpen] = useState(-1), [drawer, setDrawer] = useState(false);
  const t = useRef(0), closeBtn = useRef(null), fine = useRef(true);
  useEffect(() => {
    fine.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let last = 0;
    const on = () => {
      const y = scrollY; setScrolled(y > 8);
      if (Math.abs(y - last) > 6) { setHidden(y > last && y > 260); last = y; }
    };
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = drawer ? 'hidden' : '';
    if (drawer) setTimeout(() => closeBtn.current?.focus(), 60);
    const esc = (e) => { if (e.key === 'Escape') { setDrawer(false); setOpen(-1); } };
    addEventListener('keydown', esc);
    return () => removeEventListener('keydown', esc);
  }, [drawer]);
  return (
    <>
      <header className={'fixed inset-x-0 top-0 z-50 transition-[transform,background] duration-500 ' + (scrolled ? 'bg-white/95 backdrop-blur ' : '') + (hidden && open < 0 ? '-translate-y-full' : '')}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="/" className="font-['Baloo_2',sans-serif] text-2xl font-bold text-[#2e035d]">Loop+</a>
          <nav className="hidden gap-2 md:flex" aria-label="Principal">
            {NAV.map((n, i) => (
              <div key={n.label} className="relative"
                onMouseEnter={() => { if (fine.current && n.sub) { clearTimeout(t.current); setOpen(i); } }}
                onMouseLeave={() => { if (fine.current) t.current = setTimeout(() => setOpen(-1), 160); }}>
                <a href={n.href} aria-expanded={n.sub ? open === i : undefined}
                  onClick={(e) => { if (n.sub && !fine.current && open !== i) { e.preventDefault(); setOpen(i); } }}
                  onFocus={() => n.sub && setOpen(i)}
                  className="block rounded-full px-4 py-2 font-['Baloo_2',sans-serif] font-bold text-[#1d1d1d] hover:text-[#c24100]">{n.label}</a>
                {n.sub && (
                  <div className={'absolute left-0 top-full grid min-w-[220px] gap-1 rounded-2xl border border-[#e7e0ef] bg-white p-2 transition-all duration-300 ' + (open === i ? 'visible translate-y-1 opacity-100' : 'invisible -translate-y-1 opacity-0')}>
                    {n.sub.map(([l, h]) => <a key={l} href={h} className="rounded-xl px-4 py-2.5 text-sm hover:bg-[#f7f4fb]">{l}</a>)}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <button className="md:hidden" aria-expanded={drawer} aria-label="Abrir menu" onClick={() => setDrawer(true)}>☰</button>
        </div>
      </header>
      <div aria-hidden={!drawer} className={'fixed inset-0 z-[60] bg-[radial-gradient(120%_90%_at_70%_110%,#76058f,#43096a_38%,#220b52_72%,#1a0638)] p-6 text-white transition-[clip-path] duration-500 md:hidden ' + (drawer ? '[clip-path:circle(150%_at_100%_0)]' : 'pointer-events-none [clip-path:circle(0_at_100%_0)]')}>
        <button ref={closeBtn} onClick={() => setDrawer(false)} className="ml-auto block text-3xl" aria-label="Fechar menu">×</button>
        <ul className="mt-8 grid gap-2">
          {NAV.map((n, i) => (
            <li key={n.label} className="transition-all duration-500" style={{ transitionDelay: drawer ? 120 + i * 60 + 'ms' : '0ms', opacity: drawer ? 1 : 0, transform: drawer ? 'none' : 'translateY(16px)' }}>
              <a href={n.href} onClick={() => setDrawer(false)} className="block py-2 font-['Baloo_2',sans-serif] text-3xl font-bold">{n.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}`,
      tailwind: `<header class="hd fixed inset-x-0 top-0 z-50 transition-[transform,background] duration-500">
  <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
    <a href="/" class="text-2xl font-bold text-[#2e035d]">Loop+</a>
    <nav class="hidden gap-2 md:flex">
      <a href="/" class="px-4 py-2 font-bold">Início</a>
      <div class="hd-item relative"><a href="/nossas-solucoes/" class="hd-a block px-4 py-2 font-bold" aria-expanded="false">Soluções</a>
        <div class="hd-sub absolute left-0 top-full grid min-w-[220px] gap-1 rounded-2xl border border-[#e7e0ef] bg-white p-2"><a href="#" class="rounded-xl px-4 py-2.5 text-sm">Clube de vantagens</a><a href="#" class="rounded-xl px-4 py-2.5 text-sm">Farmácias</a></div>
      </div>
    </nav>
  </div>
</header>
<style>
  .hd.scrolled{background:rgba(255,255,255,.95);backdrop-filter:blur(8px)}
  .hd.hidden-up{transform:translateY(-100%)}
  .hd-sub{visibility:hidden;opacity:0;transform:translateY(-4px);transition:all .3s}
  .hd-item.open .hd-sub{visibility:visible;opacity:1;transform:translateY(4px)}
</style>
<script>
(function () {
  var hd = document.querySelector('.hd'), last = 0, fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  addEventListener('scroll', function () {
    var y = scrollY; hd.classList.toggle('scrolled', y > 8);
    if (Math.abs(y - last) > 6) { hd.classList.toggle('hidden-up', y > last && y > 260 && !hd.querySelector('.open')); last = y; }
  }, { passive: true });
  hd.querySelectorAll('.hd-item').forEach(function (it) {
    var a = it.querySelector('.hd-a'), t;
    function open(v) { it.classList.toggle('open', v); a.setAttribute('aria-expanded', v); }
    if (fine) { it.addEventListener('mouseenter', function () { clearTimeout(t); open(true); }); it.addEventListener('mouseleave', function () { t = setTimeout(function () { open(false); }, 160); }); }
    a.addEventListener('click', function (e) { if (fine || it.classList.contains('open')) return; e.preventDefault(); open(true); });
    it.addEventListener('keydown', function (e) { if (e.key === 'Escape') { open(false); a.focus(); } });
  });
})();
</script>`,
    },
  },

  // 6 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-hero-device-straighten",
    name: "Aparelho Inclinado que se Endireita com a Rolagem e Etiquetas que Seguem o Mouse",
    category: "hero",
    categoryLabel: "Hero (Primeira Seção)",
    description: "Hero com texto à esquerda e um aparelho à direita que começa inclinado em 3D (deitado para trás e girado) e vai ficando de frente conforme a página desce até metade do hero. Em volta, etiquetas em pílula com o ∞ flutuam devagar e, no computador, seguem o mouse em paralaxe: as pares para um lado, as ímpares para o outro, cada uma com intensidade diferente.",
    tags: ["3D Device", "Scroll Straighten", "Parallax Chips", "Mouse Follow", "Floating"],
    defaultSection: "Hero Principal",
    previewType: "lmsi-hero",
    tech: ["Tailwind CSS", "React", "CSS 3D Transforms"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);
const CHIPS = [['Clube de vantagens', 'left-[-2%] top-[14%]'], ['Farmácias', 'right-0 top-[4%]'], ['Convênios', 'right-[-4%] top-[52%]'], ['Indicadores', 'left-[4%] top-[64%]']];

export function DeviceHero({ title = 'Benefícios que fazem parte da rotina', children }) {
  const hero = useRef(null), stage = useRef(null), chips = useRef([]);
  useEffect(() => {
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onScroll = () => {
      const r = hero.current.getBoundingClientRect(); if (r.bottom < 0) return;
      const p = RM ? 1 : smooth(clamp(-r.top / (hero.current.offsetHeight * 0.55), 0, 1));
      stage.current.style.transform = 'rotateX(' + (28 * (1 - p)).toFixed(2) + 'deg) rotateY(' + (-18 * (1 - p)).toFixed(2) + 'deg) rotateZ(' + (6 * (1 - p)).toFixed(2) + 'deg) scale(' + (0.9 + 0.1 * p).toFixed(3) + ')';
    };
    let raf = 0, mx = 0, my = 0;
    const onMove = (e) => {
      mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        chips.current.forEach((c, i) => { const k = (i % 2 ? -1 : 1) * (14 + i * 5); c.style.translate = (mx * k).toFixed(1) + 'px ' + (my * k).toFixed(1) + 'px'; });
      });
    };
    onScroll(); addEventListener('scroll', onScroll, { passive: true });
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !RM) hero.current.addEventListener('mousemove', onMove);
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return (
    <section ref={hero} className="relative overflow-hidden bg-white px-6 pb-24 pt-32">
      <style>{'@keyframes lmBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}'}</style>
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="font-['Baloo_2',sans-serif] text-[clamp(28px,2.2vw+10px,38px)] font-bold leading-tight text-[#1d1d1d]">{title}</h1>
          {children}
        </div>
        <div className="relative [perspective:1600px]">
          <div ref={stage} className="mx-auto aspect-[9/16] w-[min(300px,70vw)] rounded-[40px] border-[8px] border-[#1d1d1d] bg-[linear-gradient(160deg,#fff,#f7f4fb)] transition-transform duration-100 [transform-style:preserve-3d]" style={{ transform: 'rotateX(28deg) rotateY(-18deg) rotateZ(6deg) scale(.9)' }}>
            <div className="h-24 rounded-t-[30px] bg-[linear-gradient(135deg,#fc5304,#ff7a33)]" />
          </div>
          {CHIPS.map(([t, pos], i) => (
            <span key={t} ref={(el) => (chips.current[i] = el)} className={'absolute z-[3] inline-flex items-center gap-2 rounded-full border border-[#e7e0ef] bg-white py-2.5 pl-3 pr-4 font-["Baloo_2",sans-serif] text-[15px] font-bold text-[#1d1d1d] ' + pos}
              style={{ animation: 'lmBob 6s ease-in-out ' + -i * 1.3 + 's infinite' }}>
              <span className="text-[#fc5304]" aria-hidden="true">∞</span>{t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<section class="dh relative overflow-hidden bg-white px-6 pb-24 pt-32">
  <div class="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
    <h1 class="text-4xl font-bold">Benefícios que fazem parte da rotina</h1>
    <div class="relative [perspective:1600px]">
      <div class="dh-dev mx-auto aspect-[9/16] w-[min(300px,70vw)] rounded-[40px] border-[8px] border-[#1d1d1d] bg-white"></div>
      <span class="dh-chip left-[-2%] top-[14%]">∞ Clube de vantagens</span>
      <span class="dh-chip right-0 top-[4%]">∞ Farmácias</span>
      <span class="dh-chip right-[-4%] top-[52%]">∞ Convênios</span>
    </div>
  </div>
</section>
<style>
  .dh-chip{position:absolute;z-index:3;padding:10px 16px 10px 12px;border-radius:999px;background:#fff;border:1px solid #e7e0ef;font-weight:700;animation:dhBob 6s ease-in-out infinite}
  @keyframes dhBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
</style>
<script>
(function () {
  var h = document.querySelector('.dh'), dev = h.querySelector('.dh-dev'), chips = [].slice.call(h.querySelectorAll('.dh-chip'));
  function cl(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function tick() { var r = h.getBoundingClientRect(), t = cl(-r.top / (h.offsetHeight * .55), 0, 1), p = t * t * (3 - 2 * t); dev.style.transform = 'rotateX(' + 28 * (1 - p) + 'deg) rotateY(' + -18 * (1 - p) + 'deg) rotateZ(' + 6 * (1 - p) + 'deg) scale(' + (.9 + .1 * p) + ')'; }
  tick(); addEventListener('scroll', tick, { passive: true });
  if (matchMedia('(hover: hover)').matches) h.addEventListener('mousemove', function (e) { var mx = e.clientX / innerWidth - .5, my = e.clientY / innerHeight - .5; chips.forEach(function (c, i) { var k = (i % 2 ? -1 : 1) * (14 + i * 5); c.style.translate = mx * k + 'px ' + my * k + 'px'; }); });
})();
</script>`,
    },
  },

  // 7 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-circle-open-photo",
    name: "Foto que se Abre de um Círculo com Anel Laranja em Volta",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "A foto começa recortada num círculo pequeno no centro, com um anel laranja fino 10px para fora. Conforme a página desce, o círculo cresce até a foto aparecer inteira (o raio final é a diagonal do quadro) e o anel acompanha o crescimento. No computador a foto fica presa ao lado do texto enquanto abre; no celular a conta é feita pela própria foto.",
    tags: ["Circle Reveal", "Clip Path", "Scroll Driven", "Ring", "Photo"],
    defaultSection: "Seção Sobre",
    previewType: "lmsi-circle",
    tech: ["Tailwind CSS", "React", "clip-path", "SVG"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);

export function CircleOpenPhoto({ src = '/equipe.jpg', alt = '' }) {
  const frame = useRef(null), photo = useRef(null), ring = useRef(null);
  useEffect(() => {
    const draw = () => {
      const vh = innerHeight, fr = frame.current.getBoundingClientRect();
      if (fr.top > vh * 1.2 || fr.bottom < -vh * 0.2) return;
      const q = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : smooth(clamp((vh * 0.95 - fr.top) / (vh * 0.6), 0, 1));
      const w = frame.current.offsetWidth, h = frame.current.offsetHeight, full = Math.sqrt(w * w + h * h) * 0.56, min = Math.min(w, h) * 0.3;
      const rad = min + (full - min) * q;
      photo.current.style.clipPath = 'circle(' + rad.toFixed(1) + 'px at 50% 46%)';
      ring.current.setAttribute('cx', w / 2); ring.current.setAttribute('cy', h * 0.46); ring.current.setAttribute('r', (rad + 10).toFixed(1));
      ring.current.style.opacity = String(1 - q * 0.9);
    };
    draw(); addEventListener('scroll', draw, { passive: true }); addEventListener('resize', draw);
    return () => { removeEventListener('scroll', draw); removeEventListener('resize', draw); };
  }, []);
  return (
    <div ref={frame} className="relative aspect-[4/5] w-full max-w-[520px] overflow-visible">
      <img ref={photo} src={src} alt={alt} className="absolute inset-0 h-full w-full rounded-[22px] object-cover will-change-[clip-path]" style={{ clipPath: 'circle(30% at 50% 46%)' }} />
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <circle ref={ring} fill="none" stroke="#fc5304" strokeWidth="2" />
      </svg>
    </div>
  );
}`,
      tailwind: `<div class="co relative aspect-[4/5] w-full max-w-[520px]">
  <img class="co-img absolute inset-0 h-full w-full rounded-[22px] object-cover" src="equipe.jpg" alt="" style="clip-path:circle(30% at 50% 46%)">
  <svg class="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true"><circle class="co-ring" fill="none" stroke="#fc5304" stroke-width="2"/></svg>
</div>
<script>
(function () {
  var f = document.querySelector('.co'), img = f.querySelector('.co-img'), ring = f.querySelector('.co-ring');
  function draw() {
    var vh = innerHeight, r = f.getBoundingClientRect(), t = Math.min(1, Math.max(0, (vh * .95 - r.top) / (vh * .6))), q = t * t * (3 - 2 * t);
    var w = f.offsetWidth, h = f.offsetHeight, full = Math.sqrt(w * w + h * h) * .56, min = Math.min(w, h) * .3, rad = min + (full - min) * q;
    img.style.clipPath = 'circle(' + rad + 'px at 50% 46%)';
    ring.setAttribute('cx', w / 2); ring.setAttribute('cy', h * .46); ring.setAttribute('r', rad + 10); ring.style.opacity = 1 - q * .9;
  }
  draw(); addEventListener('scroll', draw, { passive: true }); addEventListener('resize', draw);
})();
</script>`,
    },
  },

  // 8 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-whitelabel-configurator",
    name: "Configurador de Marca com Celular 3D que Gira e Mostra o Verso",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "Mini configurador ao lado de um celular 3D: digitar o nome muda o topo do app, o cartão, o verso e o endereço (o domínio troca com uma animação curta); escolher cores pinta o app; escolher a logomarca vira o celular para mostrar o verso. O celular segue o mouse pela página inteira, balança de leve sozinho e pode ser arrastado: ao soltar ele decide se fica de frente ou de costas pelo lado mais perto.",
    tags: ["Live Preview", "3D Phone", "Drag Rotate", "Brand Builder", "Interactive"],
    defaultSection: "Seção White Label",
    previewType: "lmsi-wl",
    tech: ["Tailwind CSS", "React", "CSS 3D Transforms", "Pointer Events"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const COLORS = [['#fc5304', '#ff7a33'], ['#76058f', '#b03ac8'], ['#0e9f6e', '#34d399'], ['#1d4ed8', '#60a5fa']];
const slug = (v) => v.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '') || 'suamarca';

export function WhiteLabelConfigurator() {
  const [name, setName] = useState('Sua Marca'), [c, setC] = useState(0), [back, setBack] = useState(false);
  const stage = useRef(null), phone = useRef(null), st = useRef({ base: -10, mx: 0, my: 0, rx: 4, ry: -10, drag: false, dragY: 0, sx: 0, sy: 0, baseRy: 0, back: false });
  st.current.back = back;
  useEffect(() => {
    const s = st.current, RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const move = (e) => {
      if (s.drag) return;
      const r = stage.current.getBoundingClientRect();
      s.mx = Math.max(-32, Math.min(32, ((e.clientX - (r.left + r.width / 2)) / (innerWidth * 0.5)) * 32));
      s.my = Math.max(-14, Math.min(14, (-(e.clientY - (r.top + r.height / 2)) / (innerHeight * 0.5)) * 14));
    };
    if (window.matchMedia('(hover: hover)').matches) document.addEventListener('mousemove', move, { passive: true });
    let raf;
    const loop = (t) => {
      const target = s.drag ? s.dragY : s.base + (s.back ? 180 : 0) + s.mx + (RM ? 0 : Math.sin(t / 1800) * 4);
      s.ry += (target - s.ry) * 0.08; s.rx += (4 + s.my - s.rx) * 0.08;
      phone.current.style.transform = 'rotateX(' + s.rx.toFixed(2) + 'deg) rotateY(' + s.ry.toFixed(2) + 'deg)';
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); document.removeEventListener('mousemove', move); };
  }, []);
  const down = (e) => { const s = st.current; s.drag = true; s.sx = e.clientX; s.sy = e.clientY; s.baseRy = s.ry; s.dragY = s.ry; e.currentTarget.setPointerCapture(e.pointerId); };
  const drag = (e) => { const s = st.current; if (!s.drag) return; s.dragY = s.baseRy + (e.clientX - s.sx) * 0.6; s.my = Math.max(-20, Math.min(20, -(e.clientY - s.sy) * 0.2)); };
  const up = () => {
    const s = st.current; if (!s.drag) return; s.drag = false;
    const a = (((s.dragY - s.base) % 360) + 360) % 360, b = a > 90 && a < 270; // lado mais perto
    s.base += Math.round((s.dragY - s.base - (b ? 180 : 0)) / 360) * 360; s.ry = s.dragY; s.my = 0; setBack(b);
  };
  const [c1, c2] = COLORS[c], up2 = name.toUpperCase() || 'SUA MARCA';
  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div className="grid gap-5">
        <label className="grid gap-2 font-bold">Nome do clube<input value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl border border-[#e7e0ef] px-4 font-normal" /></label>
        <div className="flex gap-2" role="radiogroup" aria-label="Cores">
          {COLORS.map(([a, b], i) => <button key={a} role="radio" aria-checked={i === c} onClick={() => setC(i)} className={'h-10 w-10 rounded-full ring-offset-2 ' + (i === c ? 'ring-2 ring-[#1d1d1d]' : '')} style={{ background: 'linear-gradient(135deg,' + a + ',' + b + ')' }} />)}
        </div>
        <button onClick={() => setBack((v) => !v)} className="w-max rounded-full border border-[#e7e0ef] px-5 py-2.5 text-sm font-bold">Girar para ver o verso</button>
        <p className="font-mono text-sm text-[#5d5866]">clube.<b className="text-[#1d1d1d]">{slug(name)}</b>.com.br</p>
      </div>
      <div ref={stage} className="grid place-items-center [perspective:1400px]">
        <div ref={phone} onPointerDown={down} onPointerMove={drag} onPointerUp={up} onPointerCancel={up} className="relative h-[460px] w-[230px] cursor-grab touch-pan-y [transform-style:preserve-3d] active:cursor-grabbing">
          <div className="absolute inset-0 overflow-hidden rounded-[38px] border-[6px] border-[#1d1d1d] bg-white [backface-visibility:hidden]">
            <div className="h-28 p-5 text-white transition-[background] duration-500" style={{ background: 'linear-gradient(135deg,' + c1 + ',' + c2 + ')' }}><b className="font-['Baloo_2',sans-serif] text-lg">{up2}</b></div>
            <div className="m-4 h-28 rounded-2xl p-4 text-white transition-[background] duration-500" style={{ background: c1 }}><small>Cartão do associado</small><b className="mt-6 block">{up2}</b></div>
          </div>
          <div className="absolute inset-0 grid place-items-center rounded-[38px] border-[6px] border-[#1d1d1d] text-white [backface-visibility:hidden] [transform:rotateY(180deg)]" style={{ background: 'linear-gradient(135deg,' + c1 + ',' + c2 + ')' }}>
            <span className="grid h-20 w-20 place-items-center rounded-full bg-white/20 font-['Baloo_2',sans-serif] text-4xl font-bold">{(name.trim()[0] || 'S').toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `<!-- Versão enxuta em HTML: nome e cor ao vivo + celular que gira para o verso -->
<div class="wl grid items-center gap-12 md:grid-cols-2" style="--brand:#fc5304">
  <div class="grid gap-4">
    <input class="wl-name h-12 rounded-xl border border-[#e7e0ef] px-4" value="Sua Marca" aria-label="Nome do clube">
    <div class="flex gap-2"><button class="wl-sw" style="--c:#fc5304"></button><button class="wl-sw" style="--c:#76058f"></button><button class="wl-sw" style="--c:#0e9f6e"></button></div>
    <button class="wl-flip w-max rounded-full border px-5 py-2.5 text-sm font-bold">Girar para ver o verso</button>
  </div>
  <div class="grid place-items-center [perspective:1400px]">
    <div class="wl-ph relative h-[460px] w-[230px] [transform-style:preserve-3d] transition-transform duration-700">
      <div class="wl-face absolute inset-0 overflow-hidden rounded-[38px] border-[6px] border-[#1d1d1d] bg-white"><div class="wl-top h-28 p-5 font-bold text-white">SUA MARCA</div></div>
      <div class="wl-face wl-back absolute inset-0 grid place-items-center rounded-[38px] border-[6px] border-[#1d1d1d] text-4xl font-bold text-white">S</div>
    </div>
  </div>
</div>
<style>
  .wl-sw{width:40px;height:40px;border-radius:50%;background:var(--c)}
  .wl-face{backface-visibility:hidden}.wl-back{transform:rotateY(180deg);background:var(--brand)}
  .wl-top{background:var(--brand);transition:background .5s}
  .wl.is-back .wl-ph{transform:rotateY(180deg)}
</style>
<script>
(function () {
  var wl = document.querySelector('.wl'), inp = wl.querySelector('.wl-name');
  inp.addEventListener('input', function () { var v = inp.value.trim() || 'Sua Marca'; wl.querySelector('.wl-top').textContent = v.toUpperCase(); wl.querySelector('.wl-back').textContent = v[0].toUpperCase(); });
  wl.querySelectorAll('.wl-sw').forEach(function (b) { b.addEventListener('click', function () { wl.style.setProperty('--brand', b.style.getPropertyValue('--c')); }); });
  wl.querySelector('.wl-flip').addEventListener('click', function () { wl.classList.toggle('is-back'); });
})();
</script>`,
    },
  },

  // 9 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-pinned-feature-list",
    name: "Lista Presa que Abre um Item por Vez e Troca a Foto",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "Lista de funcionalidades presa no meio da tela ao lado de uma foto. Cada trecho da rolagem abre o próximo item (o texto dele desdobra) e a foto troca: a nova entra por cima e a anterior sai na direção certa (para cima ao descer, para baixo ao voltar). Segmentos de progresso enchem embaixo, e clicar num item rola direto até o trecho dele.",
    tags: ["Scroll Pin", "Accordion", "Image Swap", "Progress Segments", "Features"],
    defaultSection: "Seção de Funcionalidades",
    previewType: "lmsi-features",
    tech: ["Tailwind CSS", "React", "Sticky"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// items: [{ title, text, img }]
export function PinnedFeatureList({ items }) {
  const sec = useRef(null), prev = useRef(0);
  const [cur, setCur] = useState(0), [dir, setDir] = useState(1);
  const n = items.length;
  useEffect(() => {
    const tick = () => {
      const r = sec.current.getBoundingClientRect(), dist = sec.current.offsetHeight - innerHeight;
      const k = Math.min(n - 1, Math.floor(clamp(-r.top / dist, 0, 1) * n));
      if (k !== prev.current) { setDir(k > prev.current ? 1 : -1); prev.current = k; setCur(k); }
    };
    tick(); addEventListener('scroll', tick, { passive: true });
    return () => removeEventListener('scroll', tick);
  }, [n]);
  const go = (k) => {
    const top = sec.current.getBoundingClientRect().top + scrollY, dist = sec.current.offsetHeight - innerHeight;
    scrollTo({ top: top + ((k + 0.5) / n) * dist, behavior: 'smooth' });
  };
  return (
    <section ref={sec} className="relative" style={{ height: 100 + n * 42 + 'vh' }}>
      <div className="sticky top-0 flex h-svh items-center">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <ul className="grid gap-2">
              {items.map((it, k) => (
                <li key={it.title} className={'rounded-2xl border px-5 transition-colors ' + (k === cur ? 'border-[#fc5304] bg-white' : 'border-transparent')}>
                  <button onClick={() => go(k)} aria-current={k === cur || undefined} className={'w-full py-4 text-left font-["Baloo_2",sans-serif] text-xl font-bold ' + (k === cur ? 'text-[#1d1d1d]' : 'text-[#5d5866]')}>{it.title}</button>
                  <div className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: k === cur ? '1fr' : '0fr' }}>
                    <p className="overflow-hidden pb-0 text-[#5d5866]"><span className="block pb-5">{it.text}</span></p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-1.5">{items.map((_, k) => <i key={k} className={'h-1 flex-1 rounded transition-colors ' + (k <= cur ? 'bg-[#fc5304]' : 'bg-[#e7e0ef]')} />)}</div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-[#f7f4fb]">
            {items.map((it, k) => (
              <img key={it.title} src={it.img} alt="" className="absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ opacity: k === cur ? 1 : 0, transform: k === cur ? 'none' : 'translateY(' + (k < cur ? -8 : 8) * dir + '%) scale(1.04)' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<section class="fs relative" style="height:226vh">
  <div class="sticky top-0 flex h-svh items-center">
    <div class="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
      <ul class="grid gap-2">
        <li class="fs-it"><button class="w-full py-4 text-left text-xl font-bold">Cashback</button><div class="fs-tx"><p>Parte do valor volta para o associado.</p></div></li>
        <li class="fs-it"><button class="w-full py-4 text-left text-xl font-bold">Cupons</button><div class="fs-tx"><p>Descontos exclusivos na rede.</p></div></li>
        <li class="fs-it"><button class="w-full py-4 text-left text-xl font-bold">Relatórios</button><div class="fs-tx"><p>Uso e economia em tempo real.</p></div></li>
      </ul>
      <div class="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-[#f7f4fb]"><img class="fs-img" src="1.jpg" alt=""><img class="fs-img" src="2.jpg" alt=""><img class="fs-img" src="3.jpg" alt=""></div>
    </div>
  </div>
</section>
<style>
  .fs-it{border:1px solid transparent;border-radius:16px;padding:0 20px;transition:border-color .4s}.fs-it.on{border-color:#fc5304}
  .fs-tx{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s}.fs-tx>p{overflow:hidden}.fs-it.on .fs-tx{grid-template-rows:1fr}
  .fs-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:translateY(8%) scale(1.04);transition:transform .7s cubic-bezier(.22,1,.36,1),opacity .7s}
  .fs-img.on{opacity:1;transform:none}
</style>
<script>
(function () {
  var s = document.querySelector('.fs'), its = [].slice.call(s.querySelectorAll('.fs-it')), ims = [].slice.call(s.querySelectorAll('.fs-img')), n = its.length;
  function tick() { var r = s.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / (s.offsetHeight - innerHeight))), k = Math.min(n - 1, Math.floor(p * n)); its.forEach(function (e, i) { e.classList.toggle('on', i === k); }); ims.forEach(function (e, i) { e.classList.toggle('on', i === k); }); }
  its.forEach(function (e, k) { e.querySelector('button').addEventListener('click', function () { var top = s.getBoundingClientRect().top + scrollY; scrollTo({ top: top + (k + .5) / n * (s.offsetHeight - innerHeight), behavior: 'smooth' }); }); });
  tick(); addEventListener('scroll', tick, { passive: true });
})();
</script>`,
    },
  },

  // 10 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-coupon-faq",
    name: "FAQ em Formato de Cupom que Destaca e Desdobra",
    category: "faq",
    categoryLabel: "FAQ",
    description: "Cada pergunta é um cupom: corpo com a pergunta, linha tracejada e um canhoto à direita com dois recortes redondos. Ao abrir, a borda fica laranja, o canhoto pinta de laranja, o ícone ∞ gira 190° e fica branco, e a resposta desdobra com transição suave de altura (grid 0fr para 1fr, sem medir em JS). Botão nativo com aria-expanded.",
    tags: ["Accordion", "Coupon", "Ticket Notch", "Grid Rows Transition", "Accessible"],
    defaultSection: "FAQ",
    previewType: "lmsi-coupon",
    tech: ["Tailwind CSS", "React", "CSS Grid"],
    frameworks: {
      react: `import { useState } from 'react';

function Coupon({ q, a }) {
  const [open, setOpen] = useState(false);
  const bc = open ? '#fc5304' : '#e7e0ef';
  return (
    <div className="group relative rounded-[22px] border-[1.5px] bg-white transition-colors duration-[400ms] hover:border-[#f6b99b]" style={{ borderColor: open ? bc : undefined }}>
      <h3>
        <button aria-expanded={open} onClick={() => setOpen(!open)} className="relative flex min-h-[84px] w-full items-stretch text-left font-['Baloo_2',sans-serif] text-[clamp(17px,.5vw+15px,20px)] font-bold text-[#1d1d1d]">
          <span className="flex-1 self-center px-[26px] py-[22px]">{q}</span>
          {/* canhoto: os dois meios-círculos brancos fazem os recortes do cupom */}
          <span className={'relative grid flex-[0_0_92px] place-items-center border-l-2 border-dashed transition-[background] duration-[400ms] ' + (open ? 'rounded-tr-[20.5px] border-white/60 bg-[#fc5304]' : 'rounded-r-[20.5px] border-[#e7e0ef] group-hover:bg-[#fff6f1]')}>
            <i className="absolute -left-[11px] -top-[11px] z-[1] h-5 w-5 rounded-full border-[1.5px] bg-white [clip-path:inset(50%_0_0_0)]" style={{ borderColor: bc }} />
            <i className="absolute -bottom-[11px] -left-[11px] z-[1] h-5 w-5 rounded-full border-[1.5px] bg-white [clip-path:inset(0_0_50%_0)]" style={{ borderColor: bc }} />
            <span aria-hidden="true" className={'text-2xl transition-transform duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)] ' + (open ? 'rotate-[-190deg] text-white' : 'text-[#fc5304]')}>∞</span>
          </span>
        </button>
      </h3>
      <div className="grid transition-[grid-template-rows] duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)]" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden"><p className="pb-[26px] pl-[26px] pr-[118px] text-[#5d5866] max-sm:pr-5">{a}</p></div>
      </div>
    </div>
  );
}

export function CouponFaq({ items = [['O app pode ter a marca da minha empresa?', 'Sim. O clube sai com nome, cores, logomarca e domínio da sua empresa.'], ['Quanto tempo leva para implantar?', 'Depende do escopo; o time acompanha cada etapa até o lançamento.']] }) {
  return <div className="mx-auto grid max-w-[860px] gap-4">{items.map(([q, a]) => <Coupon key={q} q={q} a={a} />)}</div>;
}`,
      tailwind: `<div class="mx-auto grid max-w-[860px] gap-4">
  <div class="cp"><h3><button class="cp-q" aria-expanded="false"><span>O app pode ter a marca da minha empresa?</span><span class="cp-stub"><i>∞</i></span></button></h3>
    <div class="cp-a"><div><p>Sim. O clube sai com nome, cores, logomarca e domínio da sua empresa.</p></div></div></div>
</div>
<style>
  .cp{--bc:#e7e0ef;position:relative;border-radius:22px;background:#fff;border:1.5px solid var(--bc);transition:border-color .4s}
  .cp:hover{--bc:#f6b99b}.cp.open{--bc:#fc5304}
  .cp h3{margin:0}
  .cp-q{display:flex;align-items:stretch;width:100%;min-height:84px;padding:0;border:0;background:none;text-align:left;font:700 19px "Baloo 2",sans-serif;cursor:pointer}
  .cp-q>span:first-child{flex:1;align-self:center;padding:22px 26px}
  .cp-stub{position:relative;flex:0 0 92px;display:grid;place-items:center;border-left:2px dashed #e7e0ef;border-radius:0 20.5px 20.5px 0;transition:background .4s}
  .cp-stub::before,.cp-stub::after{content:"";position:absolute;left:-11px;width:20px;height:20px;border-radius:50%;background:#fff;border:1.5px solid var(--bc);transition:border-color .4s;z-index:1}
  .cp-stub::before{top:-11px;clip-path:inset(50% 0 0 0)}.cp-stub::after{bottom:-11px;clip-path:inset(0 0 50% 0)}
  .cp-stub i{font-style:normal;font-size:24px;color:#fc5304;transition:transform .8s cubic-bezier(.22,1,.36,1)}
  .cp.open .cp-stub{background:#fc5304;border-left-color:rgba(255,255,255,.6);border-radius:0 20.5px 0 0}
  .cp.open .cp-stub i{transform:rotate(-190deg);color:#fff}
  .cp-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .6s cubic-bezier(.22,1,.36,1)}.cp-a>div{overflow:hidden}
  .cp.open .cp-a{grid-template-rows:1fr}.cp-a p{margin:0;padding:0 118px 26px 26px;color:#5d5866}
</style>
<script>
  document.querySelectorAll('.cp').forEach(function (c) { var b = c.querySelector('.cp-q'); b.addEventListener('click', function () { var v = !c.classList.contains('open'); c.classList.toggle('open', v); b.setAttribute('aria-expanded', v); }); });
</script>`,
    },
  },

  // 11 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-browser-tabs-typing",
    name: "Janela de Navegador que se Levanta com Abas que Digitam a URL",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "Mockup de navegador com uma aba para cada página/produto. Com a rolagem, a janela sai deitada (16° para trás e 93% do tamanho) e se levanta até ficar de frente. Clicar numa aba (ou usar as setas do teclado) troca a página com uma barra de carregamento e a URL é digitada letra por letra na barra de endereço.",
    tags: ["Browser Mockup", "Tabs", "Typewriter URL", "Scroll Tilt", "Loading Bar"],
    defaultSection: "Seção de Soluções",
    previewType: "lmsi-browser",
    tech: ["Tailwind CSS", "React", "ARIA Tabs"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);

// tabs: [{ label, url, content: <JSX> }]
export function BrowserTabs({ tabs }) {
  const box = useRef(null);
  const [cur, setCur] = useState(0), [typed, setTyped] = useState(tabs[0].url), [load, setLoad] = useState(0);
  useEffect(() => {
    const tick = () => {
      const r = box.current.getBoundingClientRect(), p = smooth(clamp((innerHeight * 1.05 - r.top) / (innerHeight * 0.6), 0, 1));
      box.current.style.transform = 'perspective(1400px) rotateX(' + ((1 - p) * 16).toFixed(2) + 'deg) scale(' + (0.93 + p * 0.07).toFixed(4) + ')';
    };
    tick(); addEventListener('scroll', tick, { passive: true });
    return () => removeEventListener('scroll', tick);
  }, []);
  const open = (i) => {
    if (i === cur) return;
    setCur(i); setLoad((l) => l + 1);
    const s = tabs[i].url; let n = 0; setTyped('');
    const t = setInterval(() => { n++; setTyped(s.slice(0, n)); if (n >= s.length) clearInterval(t); }, 28);
  };
  return (
    <div ref={box} className="origin-bottom overflow-hidden rounded-[22px] border border-[#e7e0ef] bg-white">
      <style>{'@keyframes lmLoad{from{transform:scaleX(0)}70%{transform:scaleX(.85)}to{transform:scaleX(1);opacity:0}}'}</style>
      <div className="flex items-end gap-1 bg-[#f7f4fb] px-3 pt-3" role="tablist">
        {tabs.map((t, i) => (
          <button key={t.label} role="tab" aria-selected={i === cur} tabIndex={i === cur ? 0 : -1} onClick={() => open(i)}
            onKeyDown={(e) => { const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { e.preventDefault(); open((cur + d + tabs.length) % tabs.length); } }}
            className={'rounded-t-xl px-4 py-2.5 text-sm font-bold transition-colors ' + (i === cur ? 'bg-white text-[#1d1d1d]' : 'text-[#5d5866] hover:bg-white/60')}>{t.label}</button>
        ))}
      </div>
      <div className="relative flex items-center gap-2 border-b border-[#e7e0ef] px-4 py-2.5">
        <span className="flex-1 truncate rounded-full bg-[#f7f4fb] px-4 py-1.5 font-mono text-[13px] text-[#5d5866]">{typed}<span className="ml-px inline-block h-3.5 w-px animate-pulse bg-[#fc5304] align-middle" /></span>
        <i key={load} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#fc5304]" style={{ animation: load ? 'lmLoad .9s ease forwards' : 'none', opacity: load ? 1 : 0 }} />
      </div>
      {tabs.map((t, i) => <div key={t.label} role="tabpanel" hidden={i !== cur} className="min-h-[320px] p-6">{t.content}</div>)}
    </div>
  );
}`,
      tailwind: `<div class="brw overflow-hidden rounded-[22px] border border-[#e7e0ef] bg-white">
  <div class="flex gap-1 bg-[#f7f4fb] px-3 pt-3" role="tablist">
    <button class="brw-tab on" role="tab" data-url="clube.suamarca.com.br">Clube</button>
    <button class="brw-tab" role="tab" data-url="loopmais.com.br/farmacias">Farmácias</button>
  </div>
  <div class="border-b border-[#e7e0ef] px-4 py-2.5"><span class="brw-typed block rounded-full bg-[#f7f4fb] px-4 py-1.5 font-mono text-[13px]">clube.suamarca.com.br</span></div>
  <div class="brw-page min-h-[320px] p-6">Página 1</div><div class="brw-page min-h-[320px] p-6" hidden>Página 2</div>
</div>
<style>.brw-tab{border-radius:12px 12px 0 0;padding:10px 16px;font-weight:700;color:#5d5866}.brw-tab.on{background:#fff;color:#1d1d1d}.brw{transform-origin:bottom}</style>
<script>
(function () {
  var b = document.querySelector('.brw'), tabs = [].slice.call(b.querySelectorAll('.brw-tab')), pages = [].slice.call(b.querySelectorAll('.brw-page')), typed = b.querySelector('.brw-typed'), tm;
  tabs.forEach(function (t, i) { t.addEventListener('click', function () {
    tabs.forEach(function (x, k) { x.classList.toggle('on', k === i); }); pages.forEach(function (p, k) { p.hidden = k !== i; });
    clearInterval(tm); var s = t.dataset.url, n = 0; typed.textContent = ''; tm = setInterval(function () { n++; typed.textContent = s.slice(0, n); if (n >= s.length) clearInterval(tm); }, 28);
  }); });
  function tick() { var r = b.getBoundingClientRect(), t = Math.min(1, Math.max(0, (innerHeight * 1.05 - r.top) / (innerHeight * .6))), p = t * t * (3 - 2 * t); b.style.transform = 'perspective(1400px) rotateX(' + (1 - p) * 16 + 'deg) scale(' + (.93 + p * .07) + ')'; }
  tick(); addEventListener('scroll', tick, { passive: true });
})();
</script>`,
    },
  },

  // 12 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-before-after-compare",
    name: "Comparador Antes e Depois que Segue o Mouse",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "Duas versões da mesma tela sobrepostas (ex.: app genérico x app com a sua marca) com uma divisória vertical. No computador a divisória segue o mouse; no toque e no teclado, um range nativo invisível por cima controla a posição (acessível). A posição fica entre 3% e 97% para nunca esconder um lado inteiro, e só começa a mexer quando a pessoa interage.",
    tags: ["Before After", "Image Compare", "Slider", "Range Input", "Accessible"],
    defaultSection: "Seção de Soluções",
    previewType: "lmsi-compare",
    tech: ["Tailwind CSS", "React", "clip-path"],
    frameworks: {
      react: `import { useState } from 'react';

export function CompareSlider({ before, after, labels = ['Genérico', 'Com a sua marca'] }) {
  const [x, setX] = useState(50);
  const set = (v) => setX(Math.max(3, Math.min(97, v)));
  const fine = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  return (
    <div className="relative aspect-[16/10] select-none overflow-hidden rounded-[26px] border border-[#e7e0ef]"
      onPointerMove={fine ? (e) => { const r = e.currentTarget.getBoundingClientRect(); set(((e.clientX - r.left) / r.width) * 100); } : undefined}>
      <div className="absolute inset-0">{before}</div>
      <div className="absolute inset-0" style={{ clipPath: 'inset(0 0 0 ' + x + '%)' }}>{after}</div>
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold">{labels[0]}</span>
      <span className="absolute right-4 top-4 rounded-full bg-[#fc5304] px-3 py-1 text-xs font-bold text-white">{labels[1]}</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: x + '%' }}>
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#fc5304]">⇆</span>
      </div>
      <input type="range" min="3" max="97" value={Math.round(x)} onChange={(e) => set(+e.target.value)} aria-label="Comparar antes e depois"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  );
}`,
      tailwind: `<div class="cmp relative aspect-[16/10] overflow-hidden rounded-[26px] border border-[#e7e0ef]" style="--x:50%">
  <img src="antes.jpg" alt="" class="absolute inset-0 h-full w-full object-cover">
  <img src="depois.jpg" alt="" class="cmp-after absolute inset-0 h-full w-full object-cover">
  <div class="cmp-line pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white"><span class="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#fc5304]">⇆</span></div>
  <input class="cmp-range absolute inset-0 h-full w-full cursor-ew-resize opacity-0" type="range" min="3" max="97" value="50" aria-label="Comparar antes e depois">
</div>
<style>.cmp-after{clip-path:inset(0 0 0 var(--x))}.cmp-line{left:var(--x)}</style>
<script>
(function () {
  var c = document.querySelector('.cmp'), r = c.querySelector('.cmp-range');
  function set(v) { v = Math.max(3, Math.min(97, v)); c.style.setProperty('--x', v + '%'); r.value = Math.round(v); }
  r.addEventListener('input', function () { set(+r.value); });
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) c.addEventListener('pointermove', function (e) { var b = c.getBoundingClientRect(); set((e.clientX - b.left) / b.width * 100); });
})();
</script>`,
    },
  },

  // 13 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-monthly-recurring-bars",
    name: "Gráfico Mês a Mês que Vira Receita Fixa com a Rolagem",
    category: "numeros",
    categoryLabel: "Números & Contadores",
    description: "Doze colunas, uma por mês. Cada uma mostra uma venda avulsa de altura irregular e, conforme a página desce, uma barra laranja de altura fixa (a assinatura) sobe em cada mês, um depois do outro. Embaixo, o mês atual rola como um letreiro e um ícone de ciclo dá uma volta inteira a cada mês novo. Mostra visualmente como a recorrência vira base estável.",
    tags: ["Bar Chart", "Recurring Revenue", "Scroll Driven", "Month Roll", "Storytelling"],
    defaultSection: "Seção de Assinatura",
    previewType: "lmsi-bars",
    tech: ["Tailwind CSS", "React"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const M = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const H = [0.55, 0.18, 0.82, 0.3, 0.12, 0.66, 0.24, 0.9, 0.36, 0.15, 0.7, 0.42]; // vendas avulsas: irregulares
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function RecurringBars() {
  const ref = useRef(null);
  const [f, setF] = useState(0);
  useEffect(() => {
    const tick = () => { const r = ref.current.getBoundingClientRect(); setF(clamp((innerHeight * 0.75 - r.top) / Math.max(1, r.height * 0.85), 0, 1) * 12); };
    tick(); addEventListener('scroll', tick, { passive: true });
    return () => removeEventListener('scroll', tick);
  }, []);
  const n = Math.min(12, Math.floor(f + 0.001)), mi = Math.max(0, Math.min(11, n - (n === 12 ? 1 : 0)));
  return (
    <div ref={ref} className="rounded-[26px] bg-[radial-gradient(120%_90%_at_70%_110%,#76058f,#43096a_38%,#220b52_72%,#1a0638)] p-8 text-white">
      <ol className="flex h-56 items-end gap-2">
        {M.map((m, k) => {
          const on = clamp(f - k, 0, 1);
          return (
            <li key={k} className="relative flex h-full flex-1 flex-col justify-end gap-1">
              <span className="w-full rounded-md bg-white/25" style={{ height: H[k] * 45 + '%' }} />
              <span className="w-full origin-bottom rounded-md bg-[linear-gradient(#ff7a33,#fc5304)]" style={{ height: '40%', transform: 'scaleY(' + on.toFixed(3) + ')' }} />
              <small className={'mt-1 text-center text-xs font-bold ' + (on > 0.5 ? 'text-[#ffb48a]' : 'text-white/50')}>{m}</small>
            </li>
          );
        })}
      </ol>
      <div className="mt-6 flex items-center gap-3">
        <span className="inline-block text-2xl text-[#ffb48a] transition-transform duration-700" style={{ transform: 'rotate(' + n * 360 + 'deg)' }} aria-hidden="true">⟳</span>
        <span className="block h-7 overflow-hidden font-['Baloo_2',sans-serif] text-xl font-bold">
          <span className="block transition-transform duration-500" style={{ transform: 'translateY(' + -mi * 1.75 + 'rem)' }}>
            {MONTHS.map((x) => <b key={x} className="block h-7 leading-7">{x}</b>)}
          </span>
        </span>
      </div>
    </div>
  );
}`,
      tailwind: `<div class="rb rounded-[26px] bg-[#43096a] p-8 text-white">
  <ol class="rb-cols flex h-56 items-end gap-2"></ol>
</div>
<style>
  .rb-cols li{position:relative;flex:1;height:100%;display:flex;flex-direction:column;justify-content:flex-end;gap:4px}
  .rb-s{border-radius:6px;background:rgba(255,255,255,.25);height:calc(var(--h)*45%)}
  .rb-r{height:40%;border-radius:6px;background:linear-gradient(#ff7a33,#fc5304);transform-origin:bottom;transform:scaleY(var(--on,0))}
  .rb-cols li small{text-align:center;font-size:12px;font-weight:700;color:rgba(255,255,255,.5)}.rb-cols li.on small{color:#ffb48a}
</style>
<script>
(function () {
  var box = document.querySelector('.rb'), ol = box.querySelector('.rb-cols'), H = [.55, .18, .82, .3, .12, .66, .24, .9, .36, .15, .7, .42], lis = [];
  'JFMAMJJASOND'.split('').forEach(function (m, k) { var li = document.createElement('li'); li.innerHTML = '<span class="rb-s" style="--h:' + H[k] + '"></span><span class="rb-r"></span><small>' + m + '</small>'; ol.appendChild(li); lis.push(li); });
  function tick() { var r = box.getBoundingClientRect(), f = Math.min(1, Math.max(0, (innerHeight * .75 - r.top) / (r.height * .85))) * 12; lis.forEach(function (li, k) { var on = Math.min(1, Math.max(0, f - k)); li.querySelector('.rb-r').style.setProperty('--on', on); li.classList.toggle('on', on > .5); }); }
  tick(); addEventListener('scroll', tick, { passive: true });
})();
</script>`,
    },
  },

  // 14 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-zoom-out-network",
    name: "Câmera que se Afasta do Clube e Revela a Rede",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "Grade 5x5 de parceiros com o clube no centro. A rolagem afasta a câmera (zoom de 2,7x até 1x) e os parceiros acendem em anéis: primeiro o anel de perto, depois o de fora, cada um na ordem do ângulo em volta do centro, com uma linha saindo do clube até ele. Cada bloco flutua com um atraso diferente para a rede parecer viva.",
    tags: ["Zoom Out", "Network", "Ring Reveal", "Connector Lines", "Scroll Driven"],
    defaultSection: "Seção de Rede de Parceiros",
    previewType: "lmsi-zoom",
    tech: ["Tailwind CSS", "React", "SVG"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);
// anel 0 = centro, 1 = vizinhos, 2 = borda; ord = posição angular (0..1) para acender em volta
const TILES = Array.from({ length: 25 }, (_, i) => {
  const r = Math.floor(i / 5), c = i % 5;
  return { r, c, ring: Math.max(Math.abs(r - 2), Math.abs(c - 2)), ord: (Math.atan2(r - 2, c - 2) + Math.PI) / (Math.PI * 2) };
});

export function ZoomOutNetwork({ labels = [] }) {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const tick = () => { const r = ref.current.getBoundingClientRect(); setP(clamp((innerHeight - r.top) / (innerHeight * 0.8), 0, 1)); };
    tick(); addEventListener('scroll', tick, { passive: true });
    return () => removeEventListener('scroll', tick);
  }, []);
  const z = 2.7 - smooth(p) * 1.7;
  const op = (t) => (t.ring ? smooth(clamp((p - (t.ring === 1 ? 0.12 + t.ord * 0.2 : 0.42 + t.ord * 0.3)) / 0.18, 0, 1)) : 1);
  return (
    <div ref={ref} className="relative aspect-square w-full max-w-[560px] overflow-hidden rounded-[28px] bg-[radial-gradient(120%_90%_at_70%_110%,#76058f,#43096a_38%,#220b52_72%,#1a0638)]">
      <style>{'@keyframes lmFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}'}</style>
      <div className="absolute inset-0 will-change-transform" style={{ transform: 'scale(' + z.toFixed(3) + ')' }}>
        <svg viewBox="0 0 500 500" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {TILES.filter((t) => t.ring).map((t, i) => (
            <line key={i} x1="250" y1="250" x2={50 + t.c * 100} y2={50 + t.r * 100} stroke="rgba(255,180,138,.5)" strokeWidth="1.5" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - op(t)} />
          ))}
        </svg>
        <ul className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-[4%] p-[4%]">
          {TILES.map((t, i) => (
            <li key={i} className={'grid place-items-center rounded-2xl text-[10px] font-bold ' + (t.ring ? 'bg-white text-[#2e035d]' : 'bg-[linear-gradient(135deg,#fc5304,#ff7a33)] text-white')}
              style={{ opacity: op(t), animation: 'lmFloat 6s ease-in-out ' + (-(i * 0.37) % 6).toFixed(2) + 's infinite' }}>
              {t.ring ? labels[i] || '' : 'Seu clube'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}`,
      tailwind: `<div class="zn relative aspect-square w-full max-w-[560px] overflow-hidden rounded-[28px] bg-[#43096a]">
  <div class="zn-cam absolute inset-0"><ul class="zn-grid absolute inset-0 grid grid-cols-5 grid-rows-5 gap-[4%] p-[4%]"></ul></div>
</div>
<style>.zn-grid li{border-radius:16px;background:#fff;opacity:var(--o,0)}.zn-grid li.core{background:#fc5304;opacity:1}</style>
<script>
(function () {
  var box = document.querySelector('.zn'), cam = box.querySelector('.zn-cam'), ul = box.querySelector('.zn-grid'), meta = [];
  function cl(v, a, b) { return Math.min(b, Math.max(a, v)); } function sm(t) { return t * t * (3 - 2 * t); }
  for (var i = 0; i < 25; i++) { var r = Math.floor(i / 5), c = i % 5, li = document.createElement('li'), ring = Math.max(Math.abs(r - 2), Math.abs(c - 2)); if (!ring) li.className = 'core'; ul.appendChild(li); meta.push({ el: li, ring: ring, ord: (Math.atan2(r - 2, c - 2) + Math.PI) / (Math.PI * 2) }); }
  function tick() {
    var p = cl((innerHeight - box.getBoundingClientRect().top) / (innerHeight * .8), 0, 1);
    cam.style.transform = 'scale(' + (2.7 - sm(p) * 1.7) + ')';
    meta.forEach(function (m) { if (!m.ring) return; var s = m.ring === 1 ? .12 + m.ord * .2 : .42 + m.ord * .3; m.el.style.setProperty('--o', sm(cl((p - s) / .18, 0, 1))); });
  }
  tick(); addEventListener('scroll', tick, { passive: true });
})();
</script>`,
    },
  },

  // 15 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-conveyor-belt-stations",
    name: "Esteira com Cartão que Muda de Carimbo em Cada Estação",
    category: "etapas",
    categoryLabel: "Etapas & Linha do Tempo",
    description: "Bloco preso na rolagem com uma esteira horizontal e 4 estações. Um cartão anda pela esteira conforme a página desce; ao chegar perto de cada estação ele dá uma pausa visual (sobe e cresce um pouco), a estação acende e o carimbo do cartão troca para o nome dela. As estações já passadas ficam acesas.",
    tags: ["Conveyor", "Scroll Pin", "Stations", "Stamp", "Process"],
    defaultSection: "Seção Como Funciona",
    previewType: "lmsi-belt",
    tech: ["Tailwind CSS", "React", "Sticky"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);

export function ConveyorBelt({ stations = ['Identificar', 'Cadastrar', 'Publicar', 'Acompanhar'] }) {
  const sec = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const tick = () => { const r = sec.current.getBoundingClientRect(); setP(smooth(clamp(-r.top / (sec.current.offsetHeight - innerHeight), 0, 1))); };
    tick(); addEventListener('scroll', tick, { passive: true });
    return () => removeEventListener('scroll', tick);
  }, []);
  const last = stations.length - 1, k = Math.min(last, Math.round(p * last)), near = Math.abs(p * last - k) < 0.18;
  return (
    <section ref={sec} className="relative h-[190vh]">
      <div className="sticky top-0 flex h-svh items-center px-6">
        <div className="relative mx-auto w-full max-w-5xl">
          <div className="absolute inset-x-[6%] top-[150px] h-3 rounded-full bg-[repeating-linear-gradient(90deg,#e7e0ef_0_14px,#f7f4fb_14px_28px)]" style={{ backgroundPosition: -p * 600 + 'px 0' }} />
          <div className="relative grid grid-cols-4 pt-[180px]">
            {stations.map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-2 text-center">
                <span className={'h-4 w-4 rounded-full border-2 transition-colors ' + (i <= p * last + 0.18 ? 'border-[#fc5304] bg-[#fc5304]' : 'border-[#e7e0ef] bg-white')} />
                <span className={'font-["Baloo_2",sans-serif] text-lg font-bold transition-colors ' + (i <= p * last + 0.18 ? 'text-[#1d1d1d]' : 'text-[#a597b8]')}>{s}</span>
              </div>
            ))}
          </div>
          {/* cartão: anda de 6% a 94% e "para" (sobe e cresce) quando está numa estação */}
          <div className="absolute top-0 w-[180px] -translate-x-1/2 transition-transform duration-300" style={{ left: 6 + p * 88 + '%', transform: 'translateX(-50%) translateY(' + (near ? -8 : 0) + 'px) scale(' + (near ? 1.05 : 1) + ')' }}>
            <div className="relative rounded-2xl border border-[#e7e0ef] bg-white p-4">
              <b className="block font-['Baloo_2',sans-serif] text-[#1d1d1d]">Convênio</b>
              <span className="mt-1 block h-2 w-24 rounded bg-[#f7f4fb]" />
              <span key={k} className="absolute -right-3 -top-3 rotate-[-8deg] rounded-lg border-2 border-[#fc5304] bg-white px-2 py-0.5 text-xs font-bold uppercase text-[#c24100] motion-safe:animate-[lmStamp_.35s_ease]">{stations[k]}</span>
            </div>
          </div>
          <style>{'@keyframes lmStamp{from{transform:rotate(-8deg) scale(1.6);opacity:0}to{transform:rotate(-8deg) scale(1);opacity:1}}'}</style>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<section class="belt relative h-[190vh]">
  <div class="sticky top-0 flex h-svh items-center px-6">
    <div class="relative mx-auto w-full max-w-5xl">
      <div class="absolute inset-x-[6%] top-[150px] h-3 rounded-full bg-[#e7e0ef]"></div>
      <div class="relative grid grid-cols-4 pt-[180px] text-center font-bold"><span class="belt-st">Identificar</span><span class="belt-st">Cadastrar</span><span class="belt-st">Publicar</span><span class="belt-st">Acompanhar</span></div>
      <div class="belt-card absolute top-0 w-[180px] rounded-2xl border border-[#e7e0ef] bg-white p-4"><b>Convênio</b><span class="belt-stamp">Identificar</span></div>
    </div>
  </div>
</section>
<style>
  .belt-st{color:#a597b8;transition:color .4s}.belt-st.on{color:#1d1d1d}
  .belt-card{transform:translateX(-50%);transition:transform .3s}.belt-card.near{transform:translateX(-50%) translateY(-8px) scale(1.05)}
  .belt-stamp{position:absolute;right:-12px;top:-12px;transform:rotate(-8deg);border:2px solid #fc5304;border-radius:8px;background:#fff;padding:2px 8px;font-size:12px;font-weight:700;text-transform:uppercase;color:#c24100}
</style>
<script>
(function () {
  var s = document.querySelector('.belt'), card = s.querySelector('.belt-card'), stamp = s.querySelector('.belt-stamp'), st = [].slice.call(s.querySelectorAll('.belt-st'));
  function tick() {
    var r = s.getBoundingClientRect(), t = Math.min(1, Math.max(0, -r.top / (s.offsetHeight - innerHeight))), p = t * t * (3 - 2 * t), k = Math.min(3, Math.round(p * 3));
    card.style.left = (6 + p * 88) + '%'; card.classList.toggle('near', Math.abs(p * 3 - k) < .18);
    st.forEach(function (e, i) { e.classList.toggle('on', i <= p * 3 + .18); }); stamp.textContent = st[k].textContent;
  }
  tick(); addEventListener('scroll', tick, { passive: true });
})();
</script>`,
    },
  },

  // 16 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-trail-steps-draw",
    name: "Trilha que se Desenha e Acende Cada Degrau",
    category: "etapas",
    categoryLabel: "Etapas & Linha do Tempo",
    description: "Três cartões em degrau (cada um mais alto que o anterior) ligados por uma trilha curva tracejada. Com a rolagem a trilha se desenha da esquerda para a direita e cada cartão acende (borda laranja e número preenchido) quando a linha passa por ele, em 16%, 50% e 84% do caminho. No celular a trilha vira vertical e cada degrau acende ao chegar a 80% da tela.",
    tags: ["Path Draw", "Steps", "Staircase", "Scroll Driven", "SVG"],
    defaultSection: "Seção Como Começar",
    previewType: "lmsi-trail",
    tech: ["Tailwind CSS", "React", "SVG pathLength"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const TH = [0.16, 0.5, 0.84];

export function TrailSteps({ steps = [['Conversa', 'Entendemos o momento da sua empresa.'], ['Proposta', 'Montamos o clube do seu jeito.'], ['Lançamento', 'Seu time começa a usar.']] }) {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const tick = () => { const r = ref.current.getBoundingClientRect(); setP(clamp((innerHeight * 0.95 - r.top) / (innerHeight * 0.6), 0, 1)); };
    tick(); addEventListener('scroll', tick, { passive: true });
    return () => removeEventListener('scroll', tick);
  }, []);
  return (
    <div ref={ref} className="relative mx-auto h-[460px] max-w-5xl">
      <svg viewBox="0 0 1000 460" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M40 420 C 200 420, 220 330, 330 300 S 520 230, 600 190 S 820 90, 960 60" fill="none" stroke="#e7e0ef" strokeWidth="3" strokeDasharray="8 10" vectorEffect="non-scaling-stroke" />
        <path d="M40 420 C 200 420, 220 330, 330 300 S 520 230, 600 190 S 820 90, 960 60" fill="none" stroke="#fc5304" strokeWidth="3" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - p} vectorEffect="non-scaling-stroke" />
      </svg>
      {steps.map(([t, d], i) => {
        const on = p >= TH[i];
        return (
          <article key={t} className={'absolute w-[min(280px,30%)] rounded-[22px] border-[1.5px] bg-white p-6 transition-all duration-500 ' + (on ? 'border-[#fc5304]' : 'border-[#e7e0ef]')}
            style={{ left: [4, 36, 68][i] + '%', top: [250, 140, 30][i] + 'px', transform: on ? 'none' : 'translateY(12px)' }}>
            <span className={'grid h-10 w-10 place-items-center rounded-full font-bold transition-colors ' + (on ? 'bg-[#fc5304] text-white' : 'bg-[#f7f4fb] text-[#a597b8]')}>{i + 1}</span>
            <h3 className="mt-3 font-['Baloo_2',sans-serif] text-xl font-bold text-[#1d1d1d]">{t}</h3>
            <p className="mt-1 text-sm text-[#5d5866]">{d}</p>
          </article>
        );
      })}
    </div>
  );
}`,
      tailwind: `<div class="trail relative mx-auto h-[460px] max-w-5xl">
  <svg viewBox="0 0 1000 460" preserveAspectRatio="none" class="absolute inset-0 h-full w-full" aria-hidden="true">
    <path d="M40 420 C 200 420, 220 330, 330 300 S 520 230, 600 190 S 820 90, 960 60" fill="none" stroke="#e7e0ef" stroke-width="3" stroke-dasharray="8 10" vector-effect="non-scaling-stroke"/>
    <path class="trail-p" d="M40 420 C 200 420, 220 330, 330 300 S 520 230, 600 190 S 820 90, 960 60" fill="none" stroke="#fc5304" stroke-width="3" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" vector-effect="non-scaling-stroke"/>
  </svg>
  <article class="trail-st" style="left:4%;top:250px"><b>1</b><h3>Conversa</h3></article>
  <article class="trail-st" style="left:36%;top:140px"><b>2</b><h3>Proposta</h3></article>
  <article class="trail-st" style="left:68%;top:30px"><b>3</b><h3>Lançamento</h3></article>
</div>
<style>
  .trail-st{position:absolute;width:min(280px,30%);padding:24px;border-radius:22px;border:1.5px solid #e7e0ef;background:#fff;transform:translateY(12px);transition:all .5s}
  .trail-st.on{border-color:#fc5304;transform:none}
  .trail-st b{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#f7f4fb;color:#a597b8;transition:all .5s}.trail-st.on b{background:#fc5304;color:#fff}
</style>
<script>
(function () {
  var t = document.querySelector('.trail'), path = t.querySelector('.trail-p'), sts = [].slice.call(t.querySelectorAll('.trail-st')), TH = [.16, .5, .84];
  function tick() { var p = Math.min(1, Math.max(0, (innerHeight * .95 - t.getBoundingClientRect().top) / (innerHeight * .6))); path.style.strokeDashoffset = 1 - p; sts.forEach(function (s, i) { s.classList.toggle('on', p >= TH[i]); }); }
  tick(); addEventListener('scroll', tick, { passive: true });
})();
</script>`,
    },
  },

  // 17 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-flying-card-stack",
    name: "Pilha de Cards que Voam para Cima com a Rolagem (Valores, Visão, Missão)",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "Três cards grandes empilhados no mesmo lugar, preso no meio da tela. Conforme a página desce, o card da frente sobe e gira um pouco para fora (pivô bem abaixo dele) revelando o de trás, que avança para a frente da pilha. O último card fica. Cada card tem uma cor diferente (branco, roxo, laranja) para a troca ficar clara.",
    tags: ["Card Stack", "Scroll Pin", "Fly Away", "Values", "Storytelling"],
    defaultSection: "Seção Quem Somos",
    previewType: "lmsi-vstack",
    tech: ["Tailwind CSS", "React", "Sticky"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);
const SKINS = ['bg-white text-[#2e035d] border border-[#e7e0ef]', 'bg-[radial-gradient(120%_90%_at_70%_110%,#76058f,#43096a_38%,#220b52_72%,#1a0638)] text-white', 'bg-[linear-gradient(135deg,#fc5304,#ff7a33)] text-white'];

export function FlyingStack({ cards = [['Valores', 'Gente primeiro, sempre.'], ['Visão', 'Ser o benefício que o colaborador usa todo dia.'], ['Missão', 'Conectar empresas, pessoas e vantagens reais.']] }) {
  const sec = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const tick = () => { const r = sec.current.getBoundingClientRect(); setP(clamp(-r.top / (sec.current.offsetHeight - innerHeight), 0, 1)); };
    tick(); addEventListener('scroll', tick, { passive: true });
    return () => removeEventListener('scroll', tick);
  }, []);
  // o[k] = quanto o card k já voou (0..1); o último nunca voa
  const o = cards.map((_, k) => (k === cards.length - 1 ? 0 : smooth(clamp(p * 2.2 - k * 1.05, 0, 1))));
  return (
    <section ref={sec} className="relative h-[210vh]">
      <div className="sticky top-0 grid h-svh place-items-center px-6">
        <div className="relative aspect-[16/10] w-full max-w-3xl">
          {cards.map(([t, d], k) => {
            const before = o.slice(0, k).reduce((a, b) => a + b, 0), depth = Math.max(0, k - before); // posição atual na pilha
            return (
              <article key={t} className={'absolute inset-0 flex origin-[50%_120%] flex-col justify-center gap-6 rounded-[34px] p-14 ' + SKINS[k % 3]}
                style={{ zIndex: cards.length - k, visibility: o[k] >= 0.999 ? 'hidden' : undefined,
                  transform: 'translateY(' + (depth * 18 - o[k] * 120) + '%) rotate(' + (-o[k] * 8) + 'deg) scale(' + (1 - depth * 0.05) + ')', opacity: 1 - o[k] }}>
                <h3 className="font-['Baloo_2',sans-serif] text-[clamp(30px,2vw+16px,38px)] font-bold">{t}</h3>
                <p className="max-w-[26ch] font-['Baloo_2',sans-serif] text-[clamp(22px,1.2vw+14px,30px)] font-bold leading-snug">{d}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<section class="vs relative h-[210vh]">
  <div class="sticky top-0 grid h-svh place-items-center px-6">
    <div class="relative aspect-[16/10] w-full max-w-3xl">
      <article class="vs-c" style="z-index:3;background:#fff;border:1px solid #e7e0ef;color:#2e035d"><h3>Valores</h3><p>Gente primeiro, sempre.</p></article>
      <article class="vs-c" style="z-index:2;background:#43096a;color:#fff"><h3>Visão</h3><p>Ser o benefício que o colaborador usa todo dia.</p></article>
      <article class="vs-c" style="z-index:1;background:#fc5304;color:#fff"><h3>Missão</h3><p>Conectar empresas, pessoas e vantagens reais.</p></article>
    </div>
  </div>
</section>
<style>
  .vs-c{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:24px;padding:56px;border-radius:34px;transform-origin:50% 120%}
  .vs-c h3{font:700 36px "Baloo 2",sans-serif;margin:0}.vs-c p{font:700 28px/1.3 "Baloo 2",sans-serif;max-width:26ch;margin:0}
</style>
<script>
(function () {
  var s = document.querySelector('.vs'), cs = [].slice.call(s.querySelectorAll('.vs-c'));
  function cl(v, a, b) { return Math.min(b, Math.max(a, v)); } function sm(t) { return t * t * (3 - 2 * t); }
  function tick() {
    var p = cl(-s.getBoundingClientRect().top / (s.offsetHeight - innerHeight), 0, 1), o = cs.map(function (_, k) { return k === cs.length - 1 ? 0 : sm(cl(p * 2.2 - k * 1.05, 0, 1)); });
    cs.forEach(function (c, k) { var b = 0; for (var j = 0; j < k; j++) b += o[j]; var d = Math.max(0, k - b); c.style.transform = 'translateY(' + (d * 18 - o[k] * 120) + '%) rotate(' + (-o[k] * 8) + 'deg) scale(' + (1 - d * .05) + ')'; c.style.opacity = 1 - o[k]; c.style.visibility = o[k] >= .999 ? 'hidden' : ''; });
  }
  tick(); addEventListener('scroll', tick, { passive: true });
})();
</script>`,
    },
  },

  // 18 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-logo-wall-columns",
    name: "Parede de Marcas em Colunas que Correm em Sentidos Opostos",
    category: "depoimentos",
    categoryLabel: "Depoimentos & Prova Social",
    description: "Logos de parceiros em três colunas verticais que correm sem parar, alternando para cima e para baixo com velocidades diferentes. Rolar a página dá um empurrão extra de velocidade que vai diminuindo sozinho. Cada coluna é duplicada (a cópia fica escondida do leitor de tela) e só anda quando está visível.",
    tags: ["Logo Wall", "Vertical Marquee", "Scroll Boost", "Social Proof", "Partners"],
    defaultSection: "Seção de Parceiros",
    previewType: "lmsi-wall",
    tech: ["Tailwind CSS", "React", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

function Column({ logos, speed }) {
  const col = useRef(null), track = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let half = track.current.scrollHeight / 2, y = speed < 0 ? -half : 0, last = 0, boost = 0, live = false, raf, lastY = scrollY;
    const io = new IntersectionObserver(([e]) => (live = e.isIntersecting)); io.observe(col.current);
    const onScroll = () => { boost = Math.min(4, boost + Math.abs(scrollY - lastY) * 0.03); lastY = scrollY; };
    const onResize = () => (half = track.current.scrollHeight / 2);
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onResize);
    const run = (t) => {
      const dt = last ? Math.min(50, t - last) : 16; last = t;
      if (live && !document.hidden && half) {
        y -= speed * (0.03 + boost * 0.04) * dt; boost *= 0.94;
        if (y <= -half) y += half; if (y > 0) y -= half;
        track.current.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0)';
      }
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('scroll', onScroll); removeEventListener('resize', onResize); };
  }, [speed]);
  const item = (l, k, hidden) => (
    <li key={k} aria-hidden={hidden || undefined} className="grid h-28 place-items-center rounded-2xl border border-[#e7e0ef] bg-white px-6">
      <img src={l.src} alt={hidden ? '' : l.name} className="max-h-12 w-auto opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
    </li>
  );
  return (
    <div ref={col} className="h-full overflow-hidden">
      <ul ref={track} className="grid gap-4 will-change-transform">
        {logos.map((l, i) => item(l, 'a' + i))}{logos.map((l, i) => item(l, 'b' + i, true))}
      </ul>
    </div>
  );
}

export function LogoWall({ logos }) {
  const cols = [0, 1, 2].map((c) => logos.filter((_, i) => i % 3 === c));
  return (
    <div className="grid h-[520px] grid-cols-3 gap-4 [mask-image:linear-gradient(transparent,#000_15%,#000_85%,transparent)]">
      <Column logos={cols[0]} speed={1} /><Column logos={cols[1]} speed={-1.3} /><Column logos={cols[2]} speed={0.8} />
    </div>
  );
}`,
      tailwind: `<div class="lw grid h-[520px] grid-cols-3 gap-4">
  <div class="lw-col" data-col="1"><ul class="lw-track"><li><img src="logo1.svg" alt="Parceiro 1"></li><li><img src="logo2.svg" alt="Parceiro 2"></li></ul></div>
  <div class="lw-col" data-col="-1.3"><ul class="lw-track"><li><img src="logo3.svg" alt="Parceiro 3"></li><li><img src="logo4.svg" alt="Parceiro 4"></li></ul></div>
  <div class="lw-col" data-col=".8"><ul class="lw-track"><li><img src="logo5.svg" alt="Parceiro 5"></li><li><img src="logo6.svg" alt="Parceiro 6"></li></ul></div>
</div>
<style>
  .lw{-webkit-mask-image:linear-gradient(transparent,#000 15%,#000 85%,transparent);mask-image:linear-gradient(transparent,#000 15%,#000 85%,transparent)}
  .lw-col{height:100%;overflow:hidden}.lw-track{display:grid;gap:16px;margin:0;padding:0;list-style:none}
  .lw-track li{display:grid;place-items:center;height:112px;border-radius:16px;border:1px solid #e7e0ef;background:#fff}.lw-track img{max-height:48px}
</style>
<script>
document.querySelectorAll('.lw-col').forEach(function (col) {
  var tr = col.querySelector('.lw-track'), sp = parseFloat(col.dataset.col) || 1;
  [].slice.call(tr.children).forEach(function (n) { var c = n.cloneNode(true); c.setAttribute('aria-hidden', 'true'); tr.appendChild(c); });
  var y = 0, half = tr.scrollHeight / 2, last = 0, boost = 0, lastY = scrollY; if (sp < 0) y = -half;
  addEventListener('scroll', function () { boost = Math.min(4, boost + Math.abs(scrollY - lastY) * .03); lastY = scrollY; }, { passive: true });
  (function run(t) { var dt = last ? Math.min(50, t - last) : 16; last = t; y -= sp * (.03 + boost * .04) * dt; boost *= .94; if (y <= -half) y += half; if (y > 0) y -= half; tr.style.transform = 'translate3d(0,' + y + 'px,0)'; requestAnimationFrame(run); })(0);
});
</script>`,
    },
  },

  // 19 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-logo-cylinder-marquee",
    name: "Faixa de Marcas Girando como um Cilindro",
    category: "depoimentos",
    categoryLabel: "Depoimentos & Prova Social",
    description: "Faixa horizontal de logos onde cada marca gira em Y conforme a posição: de frente no meio, virando de lado e encolhendo nas pontas, como se estivessem coladas num cilindro girando. A faixa anda sozinha, acelera com a velocidade da rolagem e desacelera para 25% quando o mouse passa por cima. A emenda usa o período exato entre o 1º item e a cópia dele.",
    tags: ["Logo Marquee", "3D Cylinder", "Scroll Boost", "Hover Slow", "Social Proof"],
    defaultSection: "Seção de Clientes",
    previewType: "lmsi-cylinder",
    tech: ["Tailwind CSS", "React", "CSS 3D Transforms", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function LogoCylinder({ logos }) {
  const box = useRef(null), track = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let setW = 0, x = 0, boost = 0, hover = false, live = false, last = 0, raf, lastY = scrollY, items = [], mids = [], W = 0;
    const measure = () => {
      items = [...track.current.children];
      setW = items[logos.length].offsetLeft - items[0].offsetLeft; // período exato (inclui o espaço entre itens)
      mids = items.map((c) => c.offsetLeft + c.offsetWidth / 2); W = box.current.offsetWidth;
    };
    measure(); addEventListener('resize', measure); addEventListener('load', measure);
    const io = new IntersectionObserver(([e]) => (live = e.isIntersecting), { rootMargin: '100px' }); io.observe(box.current);
    const onScroll = () => { boost = clamp(boost + Math.abs(scrollY - lastY) * 0.04, 0, 6); lastY = scrollY; };
    addEventListener('scroll', onScroll, { passive: true });
    const enter = () => (hover = true), leave = () => (hover = false);
    box.current.addEventListener('mouseenter', enter); box.current.addEventListener('mouseleave', leave);
    const loop = (t) => {
      const dt = last ? Math.min(50, t - last) : 16; last = t;
      if (live && !document.hidden && setW) {
        x -= (hover ? 0.25 : 1) * (0.045 + boost * 0.05) * dt; if (x <= -setW) x += setW;
        track.current.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
        items.forEach((it, j) => {
          const d = clamp((mids[j] + x - W / 2) / (W / 2), -1.3, 1.3), ad = Math.abs(d);
          it.style.transform = 'rotateY(' + (-d * 38).toFixed(1) + 'deg) scale(' + (1 - ad * ad * 0.18).toFixed(3) + ')';
          it.style.opacity = (1 - Math.max(0, ad - 0.55) * 1.6).toFixed(2);
        });
        boost *= 0.94;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('scroll', onScroll); removeEventListener('resize', measure); };
  }, [logos.length]);
  const all = [...logos, ...logos, ...logos];
  return (
    <div ref={box} className="overflow-hidden py-6 [perspective:900px]">
      <ul ref={track} className="flex w-max items-center gap-16 will-change-transform">
        {all.map((l, i) => (
          <li key={i} aria-hidden={i >= logos.length || undefined} className="shrink-0">
            <img src={l.src} alt={i >= logos.length ? '' : l.name} className="h-10 w-auto" />
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      tailwind: `<div class="cyl overflow-hidden py-6" style="perspective:900px">
  <ul class="cyl-t flex w-max items-center gap-16"><li><img src="logo1.svg" alt="Cliente 1" class="h-10"></li><li><img src="logo2.svg" alt="Cliente 2" class="h-10"></li><li><img src="logo3.svg" alt="Cliente 3" class="h-10"></li></ul>
</div>
<script>
(function () {
  var box = document.querySelector('.cyl'), tr = box.querySelector('.cyl-t'), base = [].slice.call(tr.children), n = base.length;
  for (var k = 0; k < 2; k++) base.forEach(function (b) { var c = b.cloneNode(true); c.setAttribute('aria-hidden', 'true'); tr.appendChild(c); });
  var items = [].slice.call(tr.children), setW, mids, W, x = 0, boost = 0, hover = false, last = 0, lastY = scrollY;
  function cl(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function measure() { setW = items[n].offsetLeft - items[0].offsetLeft; mids = items.map(function (c) { return c.offsetLeft + c.offsetWidth / 2; }); W = box.offsetWidth; }
  measure(); addEventListener('resize', measure); addEventListener('load', measure);
  addEventListener('scroll', function () { boost = cl(boost + Math.abs(scrollY - lastY) * .04, 0, 6); lastY = scrollY; }, { passive: true });
  box.addEventListener('mouseenter', function () { hover = true; }); box.addEventListener('mouseleave', function () { hover = false; });
  (function loop(t) {
    var dt = last ? Math.min(50, t - last) : 16; last = t; x -= (hover ? .25 : 1) * (.045 + boost * .05) * dt; if (x <= -setW) x += setW; tr.style.transform = 'translate3d(' + x + 'px,0,0)';
    items.forEach(function (it, j) { var d = cl((mids[j] + x - W / 2) / (W / 2), -1.3, 1.3), ad = Math.abs(d); it.style.transform = 'rotateY(' + (-d * 38) + 'deg) scale(' + (1 - ad * ad * .18) + ')'; it.style.opacity = 1 - Math.max(0, ad - .55) * 1.6; });
    boost *= .94; requestAnimationFrame(loop);
  })(0);
})();
</script>`,
    },
  },

  // 20 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-hub-sliding-highlight",
    name: "Destaque que Desliza até a Opção Apontada",
    category: "formularios",
    categoryLabel: "Formulários & Quiz",
    description: "Lista de caminhos de contato (comercial, suporte, parcerias). Um único bloco de destaque desliza suavemente até a opção que o mouse aponta ou que recebe foco pelo teclado, ajustando a altura à dela, em vez de cada item acender sozinho. Ao sair da lista o destaque some. Dá a sensação de um menu só, contínuo.",
    tags: ["Sliding Highlight", "Hover Indicator", "Keyboard Focus", "Menu", "Contact"],
    defaultSection: "Página de Contato",
    previewType: "lmsi-hub",
    tech: ["Tailwind CSS", "React"],
    frameworks: {
      react: `import { useRef, useState } from 'react';

export function SlidingHub({ options = [['Comercial', 'Quero levar o clube para a minha empresa'], ['Suporte', 'Já sou cliente e preciso de ajuda'], ['Parcerias', 'Quero ser parceiro da rede']] }) {
  const refs = useRef([]);
  const [hi, setHi] = useState(-1);
  const el = refs.current[hi];
  return (
    <div className="relative grid gap-1 rounded-[26px] border border-[#e7e0ef] bg-white p-2"
      onMouseLeave={() => setHi(-1)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setHi(-1); }}>
      {/* um só destaque para a lista toda: só muda posição e altura */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-2 rounded-[20px] bg-[#fff1e9] transition-[transform,height,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{ top: 0, transform: 'translateY(' + (el ? el.offsetTop : 8) + 'px)', height: el ? el.offsetHeight : 0, opacity: el ? 1 : 0 }} />
      {options.map(([t, d], i) => (
        <a key={t} href="#" ref={(n) => (refs.current[i] = n)} onMouseEnter={() => setHi(i)} onFocus={() => setHi(i)}
          className="relative flex items-center justify-between gap-4 rounded-[20px] px-6 py-5 outline-none">
          <span>
            <b className={'block font-["Baloo_2",sans-serif] text-xl transition-colors ' + (hi === i ? 'text-[#c24100]' : 'text-[#1d1d1d]')}>{t}</b>
            <span className="text-sm text-[#5d5866]">{d}</span>
          </span>
          <span aria-hidden="true" className={'text-xl text-[#fc5304] transition-transform duration-300 ' + (hi === i ? 'translate-x-1' : '')}>→</span>
        </a>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="hub relative grid gap-1 rounded-[26px] border border-[#e7e0ef] bg-white p-2">
  <span class="hub-glow" aria-hidden="true"></span>
  <a href="#" class="hub-opt"><b>Comercial</b><span>Quero levar o clube para a minha empresa</span></a>
  <a href="#" class="hub-opt"><b>Suporte</b><span>Já sou cliente e preciso de ajuda</span></a>
  <a href="#" class="hub-opt"><b>Parcerias</b><span>Quero ser parceiro da rede</span></a>
</div>
<style>
  .hub-glow{position:absolute;left:8px;right:8px;top:0;height:var(--gh,0);border-radius:20px;background:#fff1e9;opacity:0;pointer-events:none;transform:translateY(var(--gy,8px));transition:transform .5s cubic-bezier(.22,1,.36,1),height .5s,opacity .3s}
  .hub.is-hover .hub-glow{opacity:1}
  .hub-opt{position:relative;display:block;padding:20px 24px;border-radius:20px;outline:none}.hub-opt b{display:block;font:700 20px "Baloo 2",sans-serif}.hub-opt span{font-size:14px;color:#5d5866}
</style>
<script>
(function () {
  var hub = document.querySelector('.hub'), g = hub.querySelector('.hub-glow'), opts = [].slice.call(hub.querySelectorAll('.hub-opt'));
  function go(o) { if (!o) { hub.classList.remove('is-hover'); return; } g.style.setProperty('--gy', o.offsetTop + 'px'); g.style.setProperty('--gh', o.offsetHeight + 'px'); hub.classList.add('is-hover'); }
  opts.forEach(function (o) { o.addEventListener('mouseenter', function () { go(o); }); o.addEventListener('focus', function () { go(o); }); });
  hub.addEventListener('mouseleave', function () { go(null); });
  hub.addEventListener('focusout', function (e) { if (!hub.contains(e.relatedTarget)) go(null); });
})();
</script>`,
    },
  },

  // 21 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-footer-infinity-draw",
    name: "Rodapé Roxo com Infinito Gigante que se Desenha ao Chegar",
    category: "navegacao",
    categoryLabel: "Header, Rodapé & Pop-up",
    description: "Rodapé em degradê roxo com uma onda branca no topo e um símbolo de infinito enorme em traço fino ao fundo. Quando 20% do rodapé aparece, o ∞ se desenha de uma ponta à outra (uma vez só) em laranja claro, por trás das colunas de links, contato e redes. O ano do copyright se atualiza sozinho.",
    tags: ["Footer", "SVG Draw", "Brand Mark", "Wave Divider", "IntersectionObserver"],
    defaultSection: "Rodapé",
    previewType: "lmsi-footer",
    tech: ["Tailwind CSS", "React", "SVG pathLength"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const INF = 'M500 150 C 420 40, 160 40, 160 150 C 160 260, 420 260, 500 150 C 580 40, 840 40, 840 150 C 840 260, 580 260, 500 150';

export function InfinityFooter({ children }) {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <footer ref={ref} className="relative overflow-hidden bg-[radial-gradient(120%_90%_at_70%_110%,#76058f,#43096a_38%,#220b52_72%,#1a0638)] px-6 pb-10 pt-32 text-white">
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-14 w-full" aria-hidden="true">
        <path d="M0 0 H1440 V20 C 1200 60, 960 0, 720 26 S 240 56, 0 22 Z" fill="#fff" />
      </svg>
      <svg viewBox="0 0 1000 300" className="pointer-events-none absolute left-1/2 top-1/2 w-[min(1100px,140vw)] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <path d={INF} fill="none" stroke="rgba(255,180,138,.35)" strokeWidth="2" pathLength="1" strokeDasharray="1"
          style={{ strokeDashoffset: drawn ? 0 : 1, transition: 'stroke-dashoffset 3.2s cubic-bezier(.22,1,.36,1)' }} />
      </svg>
      <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-4">{children}</div>
      <p className="relative mx-auto mt-14 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/60">© {new Date().getFullYear()} Todos os direitos reservados.</p>
    </footer>
  );
}`,
      tailwind: `<footer class="ft relative overflow-hidden bg-[#43096a] px-6 pb-10 pt-32 text-white">
  <svg viewBox="0 0 1000 300" class="pointer-events-none absolute left-1/2 top-1/2 w-[min(1100px,140vw)] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
    <path class="ft-inf" d="M500 150 C 420 40, 160 40, 160 150 C 160 260, 420 260, 500 150 C 580 40, 840 40, 840 150 C 840 260, 580 260, 500 150" pathLength="1"/>
  </svg>
  <div class="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-4"><!-- colunas --></div>
  <p class="relative mx-auto mt-14 max-w-7xl text-sm text-white/60">© <span data-year></span> Todos os direitos reservados.</p>
</footer>
<style>
  .ft-inf{fill:none;stroke:rgba(255,180,138,.35);stroke-width:2;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 3.2s cubic-bezier(.22,1,.36,1)}
  .ft.is-drawn .ft-inf{stroke-dashoffset:0}
</style>
<script>
(function () {
  var ft = document.querySelector('.ft');
  new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { ft.classList.add('is-drawn'); o.disconnect(); } }, { threshold: .2 }).observe(ft);
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
</script>`,
    },
  },

  // 22 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmsi-tech-layers-list",
    name: "Camadas que se Abrem e Conversam com a Lista",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "Pilha de 4 camadas em perspectiva isométrica (app, gestão, integrações, segurança) ao lado de uma lista. Com a rolagem o espaço entre as camadas cresce, como um bolo se abrindo. Passar o mouse num item da lista acende a camada correspondente e vice-versa; sem mouse, o destaque passeia sozinho pelas camadas a cada 1,8s enquanto a seção está visível.",
    tags: ["Isometric Layers", "Exploded View", "Linked Hover", "Autoplay", "Tech Stack"],
    defaultSection: "Seção de Tecnologia",
    previewType: "lmsi-layers",
    tech: ["Tailwind CSS", "React", "CSS 3D Transforms"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);

export function TechLayers({ layers = ['App do associado', 'Painel de gestão', 'Integrações', 'Segurança e LGPD'] }) {
  const box = useRef(null), stack = useRef(null), hovering = useRef(false);
  const [hi, setHi] = useState(-1), [gap, setGap] = useState(16);
  useEffect(() => {
    const tick = () => { const r = stack.current.getBoundingClientRect(); setGap(16 + smooth(clamp((innerHeight * 0.95 - r.top) / (innerHeight * 0.7), 0, 1)) * (innerWidth > 960 ? 70 : 48)); };
    tick(); addEventListener('scroll', tick, { passive: true });
    let vis = false, cyc = layers.length - 1;
    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting), { rootMargin: '80px' }); io.observe(box.current);
    // passeio automático de cima para baixo enquanto ninguém interage
    const t = setInterval(() => { if (!vis || document.hidden || hovering.current) return; setHi(cyc); cyc = (cyc + layers.length - 1) % layers.length; }, 1800);
    return () => { removeEventListener('scroll', tick); io.disconnect(); clearInterval(t); };
  }, [layers.length]);
  return (
    <div ref={box} className="grid items-center gap-12 rounded-[28px] bg-[radial-gradient(120%_90%_at_70%_110%,#76058f,#43096a_38%,#220b52_72%,#1a0638)] p-10 text-white md:grid-cols-2"
      onMouseEnter={() => (hovering.current = true)} onMouseLeave={() => { hovering.current = false; setHi(-1); }}>
      <div ref={stack} className="relative mx-auto h-[360px] w-[280px] [perspective:1200px]">
        <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(58deg)_rotateZ(-38deg)]">
          {layers.map((l, k) => (
            <div key={l} className={'absolute inset-0 grid place-items-center rounded-3xl border text-sm font-bold transition-[transform,background,border-color] duration-500 ' + (hi === k ? 'border-[#ffb48a] bg-[linear-gradient(135deg,#fc5304,#ff7a33)]' : 'border-white/20 bg-white/10 backdrop-blur')}
              style={{ transform: 'translateZ(' + (layers.length - 1 - k) * gap + 'px)' }}>{l}</div>
          ))}
        </div>
      </div>
      <ul className="grid gap-2">
        {layers.map((l, k) => (
          <li key={l} onMouseEnter={() => setHi(k)} className={'cursor-default rounded-2xl border px-5 py-4 font-["Baloo_2",sans-serif] text-lg font-bold transition-colors ' + (hi === k ? 'border-[#ffb48a] bg-white/10' : 'border-white/10')}>{l}</li>
        ))}
      </ul>
    </div>
  );
}`,
      tailwind: `<div class="tl grid items-center gap-12 rounded-[28px] bg-[#43096a] p-10 text-white md:grid-cols-2">
  <div class="relative mx-auto h-[360px] w-[280px]" style="perspective:1200px">
    <div class="tl-stack absolute inset-0" style="transform-style:preserve-3d;transform:rotateX(58deg) rotateZ(-38deg);--lgap:16px">
      <div class="tl-l" style="--k:3">App do associado</div><div class="tl-l" style="--k:2">Painel de gestão</div><div class="tl-l" style="--k:1">Integrações</div><div class="tl-l" style="--k:0">Segurança e LGPD</div>
    </div>
  </div>
  <ul class="grid gap-2"><li data-layer="3">App do associado</li><li data-layer="2">Painel de gestão</li><li data-layer="1">Integrações</li><li data-layer="0">Segurança e LGPD</li></ul>
</div>
<style>
  .tl-l{position:absolute;inset:0;display:grid;place-items:center;border-radius:24px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);font-weight:700;transform:translateZ(calc(var(--k)*var(--lgap)));transition:transform .5s,background .5s}
  .tl-l.hi{background:linear-gradient(135deg,#fc5304,#ff7a33);border-color:#ffb48a}
  .tl li{padding:16px 20px;border-radius:16px;border:1px solid rgba(255,255,255,.1);font-weight:700;list-style:none}.tl li.hi{border-color:#ffb48a;background:rgba(255,255,255,.1)}
</style>
<script>
(function () {
  var tl = document.querySelector('.tl'), st = tl.querySelector('.tl-stack'), ls = [].slice.call(tl.querySelectorAll('.tl-l')), its = [].slice.call(tl.querySelectorAll('li'));
  function hi(k) { ls.forEach(function (l) { l.classList.toggle('hi', +l.style.getPropertyValue('--k') === k); }); its.forEach(function (i) { i.classList.toggle('hi', +i.dataset.layer === k); }); }
  its.forEach(function (i) { i.addEventListener('mouseenter', function () { hi(+i.dataset.layer); }); i.addEventListener('mouseleave', function () { hi(-1); }); });
  function tick() { var r = st.getBoundingClientRect(), t = Math.min(1, Math.max(0, (innerHeight * .95 - r.top) / (innerHeight * .7))), p = t * t * (3 - 2 * t); st.style.setProperty('--lgap', (16 + p * 70) + 'px'); }
  tick(); addEventListener('scroll', tick, { passive: true });
  var cyc = 3; setInterval(function () { if (document.hidden || tl.matches(':hover')) return; hi(cyc); cyc = (cyc + 3) % 4; }, 1800);
})();
</script>`,
    },
  },
];
