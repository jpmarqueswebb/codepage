// Efeitos extraídos da página de captura e da página de obrigado da aula para donos de academia da Loop+ (pasta "LoopMais/aula-academias")
// Paleta original: branco, laranja #fc5304 (degradê até #ff8040), roxo #2e035d / #6a2fae, faixas roxas em degradê radial
// (#76058f > #43096a > #220b52 > #1a0638), pêssego #ffb48f. Fontes: Baloo 2 Bold (títulos) e Montserrat (corpo).
const B = { client: "Loop+", badge: "Loop+" };

export const loopMaisAulaEffects = [
  // 1 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-slide-arrow-button",
    name: "Botão com Bolinha de Seta que Atravessa o Botão",
    category: "botoes",
    categoryLabel: "Botões & CTAs",
    description: "CTA em pílula com uma bolinha branca e seta laranja dentro, à direita. No hover a bolinha desliza até a ponta esquerda girando 45° e o espaçamento troca de lado, então o texto vai para a direita sem o botão mudar de largura. Tamanhos controlados por quatro variáveis (altura, ícone, folga e lateral).",
    tags: ["Sliding Icon", "Pill Button", "Padding Swap", "Hover"],
    defaultSection: "Hero Principal",
    previewType: "lmaa-slide-btn",
    tech: ["Tailwind CSS", "React", "CSS Custom Properties"],
    frameworks: {
      react: `// --b-h altura, --b-ico tamanho da bolinha, --b-gap folga da bolinha, --b-side lateral do texto
const CSS = '.lmc-btn{--b-h:62px;--b-ico:50px;--b-gap:6px;--b-side:32px;padding:0 calc(var(--b-ico) + var(--b-gap) + 22px) 0 var(--b-side);transition:padding .5s cubic-bezier(.22,1,.36,1)}' +
  '.lmc-btn:hover,.lmc-btn:focus-visible{padding:0 var(--b-side) 0 calc(var(--b-ico) + var(--b-gap) + 22px)}' +
  '.lmc-ico{right:var(--b-gap);width:var(--b-ico);height:var(--b-ico);margin-top:calc(var(--b-ico)/-2);transition:right .5s cubic-bezier(.22,1,.36,1),transform .5s cubic-bezier(.22,1,.36,1)}' +
  '.lmc-btn:hover .lmc-ico,.lmc-btn:focus-visible .lmc-ico{right:calc(100% - var(--b-ico) - var(--b-gap));transform:rotate(45deg)}' +
  '.lmc-btn--xl{--b-h:74px;--b-ico:62px;--b-side:40px;font-size:17px}' +
  '@media (prefers-reduced-motion:reduce){.lmc-btn,.lmc-ico{transition:none}}';

export function SlideArrowButton({ href = '#inscricao', children = 'Quero participar da aula', size = 'md' }) {
  return (
    <a href={href}
      className={'lmc-btn relative inline-flex h-[var(--b-h)] items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)] text-[15px] font-bold uppercase leading-tight tracking-[.03em] text-white ' + (size === 'xl' ? 'lmc-btn--xl' : '')}>
      <style>{CSS}</style>
      <span className="relative z-[1]">{children}</span>
      <span className="lmc-ico absolute top-1/2 grid place-items-center rounded-full bg-white text-[#fc5304]" aria-hidden="true">
        {/* seta para a direita: ao girar 45° ela aponta para cima/direita */}
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
      </span>
    </a>
  );
}`,
      tailwind: `<a href="#inscricao" class="lmc-btn relative inline-flex h-[var(--b-h)] items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#fc5304_0%,#ff8040_100%)] text-[15px] font-bold uppercase tracking-[.03em] text-white">
  <span class="relative z-[1]">Quero participar da aula</span>
  <span class="lmc-ico absolute top-1/2 grid place-items-center rounded-full bg-white text-[#fc5304]" aria-hidden="true">
    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>
  </span>
</a>
<style>
  .lmc-btn{--b-h:62px;--b-ico:50px;--b-gap:6px;--b-side:32px;padding:0 calc(var(--b-ico) + var(--b-gap) + 22px) 0 var(--b-side);transition:padding .5s cubic-bezier(.22,1,.36,1)}
  .lmc-btn:hover{padding:0 var(--b-side) 0 calc(var(--b-ico) + var(--b-gap) + 22px)}
  .lmc-ico{right:var(--b-gap);width:var(--b-ico);height:var(--b-ico);margin-top:calc(var(--b-ico)/-2);transition:right .5s cubic-bezier(.22,1,.36,1),transform .5s cubic-bezier(.22,1,.36,1)}
  .lmc-btn:hover .lmc-ico{right:calc(100% - var(--b-ico) - var(--b-gap));transform:rotate(45deg)}
</style>`,
    },
  },

  // 2 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-hero-photo-light",
    name: "Foto do Hero com Luz Editada em Camadas",
    category: "hero",
    categoryLabel: "Hero (Primeira Seção)",
    description: "A foto do apresentador ocupa 80% do hero à direita e ganha tratamento de luz só com CSS: gradação puxando as sombras para o roxo, vazamento de luz laranja no alto e roxo embaixo (respirando devagar), luz suave no rosto, feixes diagonais passando, partículas subindo na luz e um zoom lento (Ken Burns). Tudo se funde no branco da página pela esquerda e pela base, e o texto fica em cima.",
    tags: ["Light Leak", "Ken Burns", "Light Rays", "Dust Particles", "Photo Grade"],
    defaultSection: "Hero Principal",
    previewType: "lmaa-hero",
    tech: ["Tailwind CSS", "React", "mix-blend-mode", "CSS Keyframes"],
    frameworks: {
      react: `const CSS = '@keyframes lmcKen{from{transform:scale(1)}to{transform:scale(1.03)}}' +
  '@keyframes lmcLeakA{from{transform:translate(0,0) scale(1);opacity:.85}to{transform:translate(-60px,40px) scale(1.12);opacity:1}}' +
  '@keyframes lmcLeakB{from{transform:translate(0,0) scale(1);opacity:.7}to{transform:translate(-40px,-30px) scale(1.1);opacity:.95}}' +
  '@keyframes lmcRays{to{background-position:560px 0}}' +
  '@keyframes lmcDust{0%{opacity:0;transform:translate(0,0)}25%{opacity:.9}100%{opacity:0;transform:translate(-40px,-180px)}}' +
  '@media (prefers-reduced-motion:reduce){.lmc-photo *{animation:none!important}}';
const DUST = [[62, 30, 0], [70, 52, 1.4], [78, 22, 2.6], [84, 44, 3.8], [74, 66, 5]];

export function LitPhotoHero({ photo = '/hero.jpg', children }) {
  return (
    <section className="relative flex h-[800px] items-center overflow-hidden bg-white">
      <style>{CSS}</style>
      <div className="lmc-photo pointer-events-none absolute inset-y-0 right-0 w-full overflow-hidden md:w-[80%]" aria-hidden="true">
        <div className="absolute inset-0 origin-[70%_100%] bg-cover bg-[88%_center] [filter:saturate(1.08)_contrast(1.06)] motion-safe:animate-[lmcKen_22s_ease-in-out_infinite_alternate]" style={{ backgroundImage: 'url(' + photo + ')' }} />
        {/* gradação: sombras puxando para o roxo */}
        <div className="absolute inset-0 bg-[linear-gradient(200deg,rgba(74,21,132,.45)_0%,rgba(74,21,132,0)_55%)] mix-blend-soft-light" />
        {/* vazamentos de luz */}
        <div className="absolute -right-60 -top-[300px] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(252,98,20,.42)_0%,rgba(252,83,4,.16)_35%,rgba(252,83,4,0)_65%)] motion-safe:animate-[lmcLeakA_11s_ease-in-out_infinite_alternate]" />
        <div className="absolute -right-52 top-[36%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(130,30,200,.34)_0%,rgba(118,5,143,.12)_40%,rgba(118,5,143,0)_66%)] motion-safe:animate-[lmcLeakB_13s_ease-in-out_infinite_alternate]" />
        {/* luz no rosto */}
        <div className="absolute left-[58%] -top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,236,220,.35),rgba(255,236,220,0)_60%)] mix-blend-soft-light" />
        {/* feixes diagonais, só no canto de cima */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,210,180,0)_0_90px,rgba(255,210,180,.16)_90px_140px,rgba(255,210,180,0)_140px_280px)] bg-[length:560px_100%] mix-blend-screen [mask-image:radial-gradient(ellipse_70%_80%_at_92%_0%,#000_0%,transparent_70%)] motion-safe:animate-[lmcRays_16s_linear_infinite]" />
        {DUST.map(([l, t, d], i) => (
          <i key={i} className="absolute h-[5px] w-[5px] rounded-full bg-[#ffd2bd] opacity-0 mix-blend-screen" style={{ left: l + '%', top: t + '%', animation: 'lmcDust 7s ease-in-out ' + d + 's infinite' }} />
        ))}
        {/* fusão com o branco: esquerda, base e topo */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,#fff_10%,rgba(255,255,255,.82)_24%,rgba(255,255,255,0)_48%),linear-gradient(0deg,#fff_0%,rgba(255,255,255,.7)_10%,rgba(255,255,255,0)_30%),linear-gradient(180deg,#fff_0,#fff_70px,rgba(255,255,255,0)_150px)]" />
      </div>
      <div className="relative z-[2] mx-auto w-full max-w-6xl px-6">
        <div className="max-w-[560px]">{children}</div>
      </div>
    </section>
  );
}`,
      tailwind: `<section class="lit relative flex h-[800px] items-center overflow-hidden bg-white">
  <div class="lit-photo pointer-events-none absolute inset-y-0 right-0 w-full overflow-hidden md:w-[80%]" aria-hidden="true">
    <div class="lit-img"></div><div class="lit-grade"></div><div class="lit-leak-a"></div><div class="lit-leak-b"></div><div class="lit-rays"></div>
    <i class="lit-dust" style="left:62%;top:30%"></i><i class="lit-dust" style="left:78%;top:22%;animation-delay:2.6s"></i><i class="lit-dust" style="left:84%;top:44%;animation-delay:3.8s"></i>
    <div class="lit-fade"></div>
  </div>
  <div class="relative z-[2] mx-auto w-full max-w-6xl px-6"><div class="max-w-[560px]"><h1 class="text-4xl font-bold">Aula ao vivo para donos de academia</h1></div></div>
</section>
<style>
  .lit-photo>*{position:absolute}
  .lit-img{inset:0;background:url(hero.jpg) 88% center/cover no-repeat;filter:saturate(1.08) contrast(1.06);transform-origin:70% 100%;animation:lmcKen 22s ease-in-out infinite alternate}
  .lit-grade{inset:0;background:linear-gradient(200deg,rgba(74,21,132,.45) 0%,rgba(74,21,132,0) 55%);mix-blend-mode:soft-light}
  .lit-leak-a{width:760px;height:760px;right:-240px;top:-300px;border-radius:50%;background:radial-gradient(circle,rgba(252,98,20,.42) 0%,rgba(252,83,4,.16) 35%,rgba(252,83,4,0) 65%);animation:lmcLeakA 11s ease-in-out infinite alternate}
  .lit-leak-b{width:620px;height:620px;right:-200px;top:36%;border-radius:50%;background:radial-gradient(circle,rgba(130,30,200,.34) 0%,rgba(118,5,143,.12) 40%,rgba(118,5,143,0) 66%);animation:lmcLeakB 13s ease-in-out infinite alternate}
  .lit-rays{inset:0;background:repeating-linear-gradient(115deg,rgba(255,210,180,0) 0 90px,rgba(255,210,180,.16) 90px 140px,rgba(255,210,180,0) 140px 280px);background-size:560px 100%;mix-blend-mode:screen;-webkit-mask-image:radial-gradient(ellipse 70% 80% at 92% 0%,#000 0%,transparent 70%);mask-image:radial-gradient(ellipse 70% 80% at 92% 0%,#000 0%,transparent 70%);animation:lmcRays 16s linear infinite}
  .lit-dust{width:5px;height:5px;border-radius:50%;background:#ffd2bd;mix-blend-mode:screen;opacity:0;animation:lmcDust 7s ease-in-out infinite}
  .lit-fade{inset:0;background:linear-gradient(90deg,#fff 0%,#fff 10%,rgba(255,255,255,.82) 24%,rgba(255,255,255,0) 48%),linear-gradient(0deg,#fff 0%,rgba(255,255,255,.7) 10%,rgba(255,255,255,0) 30%),linear-gradient(180deg,#fff 0,#fff 70px,rgba(255,255,255,0) 150px)}
  @keyframes lmcKen{from{transform:scale(1)}to{transform:scale(1.03)}}
  @keyframes lmcLeakA{from{transform:translate(0,0) scale(1);opacity:.85}to{transform:translate(-60px,40px) scale(1.12);opacity:1}}
  @keyframes lmcLeakB{from{transform:translate(0,0) scale(1);opacity:.7}to{transform:translate(-40px,-30px) scale(1.1);opacity:.95}}
  @keyframes lmcRays{to{background-position:560px 0}}
  @keyframes lmcDust{0%{opacity:0;transform:translate(0,0)}25%{opacity:.9}100%{opacity:0;transform:translate(-40px,-180px)}}
  @media (prefers-reduced-motion:reduce){.lit-photo *{animation:none}}
</style>`,
    },
  },

  // 3 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-live-eyebrow",
    name: "Selo 'Aula ao Vivo' com Ícone de Transmissão e Brilho",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "Selo em pílula acima do título com degradê roxo, texto em caixa alta e um ícone de transmissão no lugar da bolinha: as duas ondas do sinal piscam alternadas. Um reflexo passa pelo selo a cada 4,5s. Sobre fundo roxo o selo vira vidro (fundo branco 10% com borda fina).",
    tags: ["Badge", "Eyebrow", "Live Signal", "Shine Sweep"],
    defaultSection: "Hero Principal",
    previewType: "lmaa-eyebrow",
    tech: ["Tailwind CSS", "React", "SVG"],
    frameworks: {
      react: `const CSS = '@keyframes lmcSweep{0%,55%{left:-40%}100%{left:140%}}@keyframes lmcCast{0%,100%{opacity:.25}50%{opacity:1}}' +
  '@media (prefers-reduced-motion:reduce){.lmc-eb *,.lmc-eb::after{animation:none!important}}';

export function LiveEyebrow({ children = 'Aula ao vivo e gratuita', onDark = false }) {
  return (
    <span className={'lmc-eb relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-[18px] py-2.5 text-sm font-bold uppercase leading-tight tracking-[.06em] text-white ' +
      (onDark ? 'border border-white/20 bg-white/10' : 'bg-[linear-gradient(135deg,#2e035d_0%,#5a1a9a_100%)]')}>
      <style>{CSS}</style>
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" style={{ animation: 'lmcCast 1.8s ease-in-out infinite' }} />
        <path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8" style={{ animation: 'lmcCast 1.8s ease-in-out .3s infinite' }} />
      </svg>
      {children}
      <span aria-hidden="true" className="absolute inset-y-0 left-[-40%] w-[30%] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.25),transparent)]" style={{ animation: 'lmcSweep 4.5s ease-in-out infinite' }} />
    </span>
  );
}`,
      tailwind: `<span class="eb relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[linear-gradient(135deg,#2e035d_0%,#5a1a9a_100%)] px-[18px] py-2.5 text-sm font-bold uppercase tracking-[.06em] text-white">
  <svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
    <path class="a1" d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7"/><path class="a2" d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8"/>
  </svg>
  Aula ao vivo e gratuita
</span>
<style>
  .eb::after{content:"";position:absolute;top:0;bottom:0;width:30%;left:-40%;background:linear-gradient(110deg,transparent,rgba(255,255,255,.25),transparent);animation:lmcSweep 4.5s ease-in-out infinite}
  .eb .a1,.eb .a2{animation:lmcCast 1.8s ease-in-out infinite}.eb .a2{animation-delay:.3s}
  @keyframes lmcSweep{0%,55%{left:-40%}100%{left:140%}}
  @keyframes lmcCast{0%,100%{opacity:.25}50%{opacity:1}}
</style>`,
    },
  },

  // 4 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-word-mask-rise",
    name: "Título que Sobe Palavra por Palavra por Trás de uma Máscara",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "Quando o título entra na tela, cada palavra sobe de baixo de uma máscara invisível, saindo levemente girada (4°) e assentando, com 45ms entre uma palavra e a próxima. Palavras com ênfase (em, strong) mantêm o estilo. A máscara tem uma folga embaixo para não cortar letras como g e p.",
    tags: ["Split Words", "Mask Reveal", "Stagger", "Headline"],
    defaultSection: "Títulos de Seção",
    previewType: "lmaa-words",
    tech: ["Tailwind CSS", "React", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

// Uso: <WordRise as="h2" text="Por que o aluno cancela" accent="cancela" />
export function WordRise({ text, accent = '', as: Tag = 'h2', delay = 0, className = '' }) {
  const ref = useRef(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setIn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIn(true); io.disconnect(); } }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const accents = accent.split(' ').filter(Boolean);
  return (
    <Tag ref={ref} aria-label={text} className={'font-["Baloo_2",sans-serif] font-bold ' + className}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true">
          {/* a folga de .12em embaixo evita cortar as letras que descem */}
          <span className="-mb-[.12em] inline-block overflow-hidden pb-[.12em] align-top">
            <span className={'inline-block transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] ' + (accents.includes(w) ? 'text-[#2e035d]' : '')}
              style={{ transform: inView ? 'none' : 'translateY(110%) rotate(4deg)', transitionDelay: i * 45 + delay + 'ms' }}>{w}</span>
          </span>{' '}
        </span>
      ))}
    </Tag>
  );
}`,
      tailwind: `<h2 data-split class="font-['Baloo_2',sans-serif] text-4xl font-bold">Por que o aluno <em class="not-italic text-[#2e035d]">cancela</em></h2>
<style>
  .js [data-split] .w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.12em;margin-bottom:-.12em}
  .js [data-split] .w>span{display:inline-block;transform:translateY(110%) rotate(4deg);transition:transform .9s cubic-bezier(.22,1,.36,1);transition-delay:calc(var(--i)*45ms)}
  .js [data-split].in .w>span{transform:none}
  @media (prefers-reduced-motion:reduce){.js [data-split] .w>span{transform:none;transition:none}}
</style>
<script>
(function () {
  document.documentElement.classList.add('js');
  document.querySelectorAll('[data-split]').forEach(function (el) {
    var i = 0;
    (function walk(node) {
      [].slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement('span'), s = document.createElement('span');
            w.className = 'w'; s.textContent = part; s.style.setProperty('--i', i++); w.appendChild(s); frag.appendChild(w);
          });
          child.parentNode.replaceChild(frag, child);
        } else if (child.nodeType === 1) walk(child);
      });
    })(el);
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { el.classList.add('in'); io.disconnect(); } });
    io.observe(el);
  });
})();
</script>`,
    },
  },

  // 5 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-guided-scroll-stage",
    name: "Rolagem Guiada com Palco Fixo que Troca as Cenas",
    category: "etapas",
    categoryLabel: "Etapas & Linha do Tempo",
    description: "Lista de tópicos à esquerda (cada um ocupa quase uma tela) e um palco de vidro preso à direita, com barra de janela, contador 01/04 e tracinhos de progresso. O tópico que cruza 55% da tela vira o ativo: o número dele passa de contorno para degradê, o ponto do trilho acende e o palco troca de cena com desfoque. Um trilho vertical enche junto com a rolagem.",
    tags: ["Scrollytelling", "Sticky Stage", "Scene Swap", "Progress Rail", "Outline Number"],
    defaultSection: "O Que Você Vai Aprender",
    previewType: "lmaa-guided",
    tech: ["Tailwind CSS", "React", "Sticky"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// steps: [{ title, note, scene: <JSX da cena> }]
export function GuidedStage({ steps }) {
  const list = useRef(null), items = useRef([]);
  const [cur, setCur] = useState(0), [rail, setRail] = useState(0);
  useEffect(() => {
    let q = 0;
    const tick = () => {
      q = 0;
      const vh = innerHeight, lr = list.current.getBoundingClientRect();
      setRail(clamp((vh * 0.55 - lr.top) / lr.height, 0, 1));
      let c = 0;
      items.current.forEach((s, k) => { if (s.getBoundingClientRect().top < vh * 0.55) c = k; });
      setCur(c);
    };
    const on = () => { if (!q) q = requestAnimationFrame(tick); };
    tick(); addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);
  return (
    <div className="grid gap-[72px] bg-[radial-gradient(120%_90%_at_70%_110%,#76058f,#43096a_38%,#220b52_72%,#1a0638)] px-6 py-24 text-white md:grid-cols-2">
      <div ref={list} className="relative pl-11">
        <div className="absolute bottom-[18vh] left-2 top-[18vh] w-[3px] rounded bg-white/10">
          <span className="absolute inset-0 origin-top rounded bg-[linear-gradient(180deg,#ff8040,#fc5304)]" style={{ transform: 'scaleY(' + rail.toFixed(3) + ')' }} />
        </div>
        {steps.map((s, i) => (
          <div key={i} ref={(el) => (items.current[i] = el)} className="relative flex min-h-[56vh] flex-col justify-center py-8">
            <span className={'absolute -left-11 top-1/2 -mt-2.5 h-[19px] w-[19px] rounded-full border-[3px] transition-all duration-300 ' + (i === cur ? 'border-[#ffd2bd] bg-[#fc5304] shadow-[0_0_0_8px_rgba(252,83,4,.2)]' : 'border-white/25 bg-[#2a0c52]')} />
            <span className={'mb-3.5 font-["Baloo_2",sans-serif] text-[84px] font-bold leading-[.9] transition-all duration-500 ' + (i === cur ? 'bg-[linear-gradient(135deg,#fc5304,#ff8040)] bg-clip-text text-transparent' : 'text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,.35)]')}>{String(i + 1).padStart(2, '0')}</span>
            <p className="font-['Baloo_2',sans-serif] text-[clamp(22px,2.1vw,28px)] font-bold leading-tight">{s.title}<small className="mt-2.5 block font-sans text-base font-normal text-[#ffb48f]">{s.note}</small></p>
            {/* no celular a cena aparece dentro do próprio tópico */}
            <div className="mt-6 md:hidden">{s.scene}</div>
          </div>
        ))}
      </div>
      <div className="relative hidden md:block">
        <div className="sticky top-[calc(50vh-240px)] h-[480px] overflow-hidden rounded-[28px] border border-white/15 bg-[linear-gradient(160deg,rgba(255,255,255,.1),rgba(255,255,255,.03))] backdrop-blur-[10px]">
          <div className="flex h-[52px] items-center gap-[7px] border-b border-white/10 px-5">
            {[0, 1, 2].map((d) => <i key={d} className="h-2.5 w-2.5 rounded-full bg-white/20" />)}
            <span className="ml-auto font-['Baloo_2',sans-serif] text-white/55"><b className="text-xl text-white">{String(cur + 1).padStart(2, '0')}</b> / {String(steps.length).padStart(2, '0')}</span>
            <span className="ml-3.5 flex gap-1.5">{steps.map((_, k) => <span key={k} className={'h-1 rounded transition-all duration-300 ' + (k <= cur ? 'w-[34px] bg-[#fc5304]' : 'w-[22px] bg-white/20')} />)}</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 top-[52px]">
            {steps.map((s, i) => (
              <div key={i} aria-hidden={i !== cur} className={'absolute inset-0 flex items-center justify-center p-8 transition-all duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] ' + (i === cur ? 'opacity-100' : 'pointer-events-none translate-y-[30px] scale-[.96] opacity-0 blur-[8px]')}>{s.scene}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `<div class="gs grid gap-[72px] bg-[#43096a] px-6 py-24 text-white md:grid-cols-2">
  <div class="gs-list relative pl-11">
    <div class="absolute bottom-[18vh] left-2 top-[18vh] w-[3px] rounded bg-white/10"><span class="gs-rail absolute inset-0 origin-top scale-y-0 rounded bg-[#fc5304]"></span></div>
    <div class="gs-step"><span class="gs-num">01</span><p>A conta que ninguém faz</p></div>
    <div class="gs-step"><span class="gs-num">02</span><p>Desconto só adia o cancelamento</p></div>
    <div class="gs-step"><span class="gs-num">03</span><p>Treino não é o único valor</p></div>
  </div>
  <div class="relative hidden md:block">
    <div class="sticky top-[calc(50vh-240px)] h-[480px] overflow-hidden rounded-[28px] border border-white/15 bg-white/5">
      <div class="gs-scene">Cena 1</div><div class="gs-scene">Cena 2</div><div class="gs-scene">Cena 3</div>
    </div>
  </div>
</div>
<style>
  .gs-step{position:relative;min-height:56vh;display:flex;flex-direction:column;justify-content:center}
  .gs-step::before{content:"";position:absolute;left:-44px;top:50%;width:19px;height:19px;margin-top:-9px;border-radius:50%;background:#2a0c52;border:3px solid rgba(255,255,255,.25);transition:all .4s}
  .gs-step.on::before{background:#fc5304;border-color:#ffd2bd;box-shadow:0 0 0 8px rgba(252,83,4,.2)}
  .gs-num{font:700 84px/.9 "Baloo 2",sans-serif;color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,.35);transition:all .5s}
  .gs-step.on .gs-num{-webkit-text-stroke-color:transparent;background:linear-gradient(135deg,#fc5304,#ff8040);-webkit-background-clip:text;background-clip:text}
  .gs-step p{font:700 26px/1.25 "Baloo 2",sans-serif}
  .gs-scene{position:absolute;inset:0;display:grid;place-items:center;opacity:0;transform:translateY(30px) scale(.96);filter:blur(8px);transition:all .6s cubic-bezier(.22,1,.36,1)}
  .gs-scene.on{opacity:1;transform:none;filter:none}
</style>
<script>
(function () {
  var list = document.querySelector('.gs-list'), steps = [].slice.call(document.querySelectorAll('.gs-step')), scenes = [].slice.call(document.querySelectorAll('.gs-scene')), rail = document.querySelector('.gs-rail');
  function tick() {
    var vh = innerHeight, lr = list.getBoundingClientRect(), cur = 0;
    rail.style.transform = 'scaleY(' + Math.min(1, Math.max(0, (vh * .55 - lr.top) / lr.height)) + ')';
    steps.forEach(function (s, k) { if (s.getBoundingClientRect().top < vh * .55) cur = k; });
    steps.forEach(function (s, k) { s.classList.toggle('on', k === cur); }); scenes.forEach(function (s, k) { s.classList.toggle('on', k === cur); });
  }
  tick(); addEventListener('scroll', tick, { passive: true });
})();
</script>`,
    },
  },

  // 6 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-live-loss-calculator",
    name: "Calculadora ao Vivo com Total que Pula",
    category: "numeros",
    categoryLabel: "Números & Contadores",
    description: "Calculadora em vidro: dois campos tracejados (quantos saem por mês e valor da mensalidade) que ficam sólidos e laranja ao focar. O total em degradê laranja mostra 'R$ ?' com o ponto de interrogação balançando até os dois campos terem número; aí calcula na hora, formata em real e o valor dá um pulinho a cada mudança. Os campos aceitam só números e vírgula.",
    tags: ["Calculator", "Live Total", "Input Mask", "Pop Animation", "Interactive"],
    defaultSection: "Seção de Problema",
    previewType: "lmaa-calc",
    tech: ["Tailwind CSS", "React", "Intl NumberFormat"],
    frameworks: {
      react: `import { useEffect, useState } from 'react';

const CSS = '@keyframes lmcQ{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.25) rotate(8deg)}}' +
  '@keyframes lmcPop{0%{transform:scale(.92)}60%{transform:scale(1.06)}100%{transform:scale(1)}}';
const num = (v) => parseFloat(v.replace(/\\./g, '').replace(',', '.')) || 0;

export function LossCalculator() {
  const [alunos, setAlunos] = useState(''), [mensal, setMensal] = useState(''), [bump, setBump] = useState(0);
  const total = num(alunos) * num(mensal);
  useEffect(() => { if (total) setBump((b) => b + 1); }, [total]);
  const Row = ({ label, sub, value, onChange, prefix, width = 'w-[84px]' }) => (
    <label className="flex min-h-[60px] cursor-text items-center justify-between gap-4 rounded-[14px] border border-white/10 bg-white/[.07] py-2.5 pl-[18px] pr-2.5 text-[15px] font-bold leading-tight text-white transition-colors hover:bg-white/10 focus-within:border-[#ff8040]/80">
      <span>{label}<small className="block text-xs font-normal text-white/60">{sub}</small></span>
      <span className="group flex h-10 shrink-0 items-center gap-1.5 rounded-[10px] border-[1.5px] border-dashed border-white/35 bg-white/[.12] px-3 transition-colors focus-within:border-solid focus-within:border-[#ff8040]">
        {prefix && <span className="text-sm text-white/70">{prefix}</span>}
        <input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} placeholder="0"
          className={'h-full bg-transparent text-right font-["Baloo_2",sans-serif] text-xl font-bold text-white caret-[#ff8040] outline-none placeholder:text-white/35 ' + width} />
      </span>
    </label>
  );
  return (
    <div className="flex w-full max-w-[380px] flex-col gap-2">
      <style>{CSS}</style>
      {Row({ label: 'Alunos que saem', sub: 'por mês', value: alunos, onChange: (v) => setAlunos(v.replace(/\\D/g, '')) })}
      <span className="self-center font-['Baloo_2',sans-serif] text-xl leading-none text-[#ff8040]">×</span>
      {Row({ label: 'Mensalidade', sub: 'valor médio', value: mensal, prefix: 'R$', onChange: (v) => setMensal(v.replace(/[^\\d,]/g, '').replace(/,(?=.*,)/g, '')) })}
      <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl bg-[linear-gradient(135deg,#fc5304,#ff8040)] px-5 py-[18px]">
        <span className="whitespace-nowrap font-['Baloo_2',sans-serif] text-[30px] leading-none text-white">= <small className="align-middle font-sans text-[13px] font-bold uppercase tracking-[.04em] text-white/85">por mês</small></span>
        <b key={bump} className="whitespace-nowrap font-['Baloo_2',sans-serif] text-[34px] leading-none text-white tabular-nums" style={{ animation: total ? 'lmcPop .35s cubic-bezier(.22,1,.36,1)' : undefined }} aria-live="polite">
          {total ? 'R$ ' + Math.round(total).toLocaleString('pt-BR') : <>R$ <em className="inline-block not-italic" style={{ animation: 'lmcQ .9s ease-in-out infinite' }}>?</em></>}
        </b>
      </div>
    </div>
  );
}`,
      tailwind: `<div data-calc class="flex w-full max-w-[380px] flex-col gap-2 rounded-3xl bg-[#43096a] p-6">
  <label class="calc-row"><span>Alunos que saem<small>por mês</small></span><span class="calc-f"><input data-a inputmode="numeric" placeholder="0"></span></label>
  <span class="self-center text-xl text-[#ff8040]">×</span>
  <label class="calc-row"><span>Mensalidade<small>valor médio</small></span><span class="calc-f">R$ <input data-m inputmode="decimal" placeholder="0"></span></label>
  <div class="mt-2 flex items-center justify-between rounded-2xl bg-[linear-gradient(135deg,#fc5304,#ff8040)] px-5 py-[18px] text-white"><span class="text-3xl">=</span><b data-t class="text-[34px] tabular-nums">R$ <em>?</em></b></div>
</div>
<style>
  .calc-row{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:60px;padding:10px 10px 10px 18px;border-radius:14px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:#fff;font-weight:700;cursor:text}
  .calc-row small{display:block;font-size:12px;font-weight:400;color:rgba(255,255,255,.6)}
  .calc-f{display:flex;align-items:center;gap:6px;height:40px;padding:0 12px;border-radius:10px;background:rgba(255,255,255,.12);border:1.5px dashed rgba(255,255,255,.35);color:rgba(255,255,255,.7)}
  .calc-row:focus-within .calc-f{border-style:solid;border-color:#ff8040}
  .calc-f input{width:84px;background:transparent;border:0;outline:none;text-align:right;font:700 20px "Baloo 2",sans-serif;color:#fff;caret-color:#ff8040}
  [data-t] em{font-style:normal;display:inline-block;animation:lmcQ .9s ease-in-out infinite}
  [data-t].bump{animation:lmcPop .35s cubic-bezier(.22,1,.36,1)}
  @keyframes lmcQ{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.25) rotate(8deg)}}
  @keyframes lmcPop{0%{transform:scale(.92)}60%{transform:scale(1.06)}100%{transform:scale(1)}}
</style>
<script>
(function () {
  var c = document.querySelector('[data-calc]'), a = c.querySelector('[data-a]'), m = c.querySelector('[data-m]'), t = c.querySelector('[data-t]');
  function num(v) { return parseFloat(v.replace(/\\./g, '').replace(',', '.')) || 0; }
  function up() {
    a.value = a.value.replace(/\\D/g, ''); m.value = m.value.replace(/[^\\d,]/g, '').replace(/,(?=.*,)/g, '');
    var x = num(a.value), y = num(m.value);
    if (!x || !y) { t.innerHTML = 'R$ <em>?</em>'; return; }
    t.textContent = 'R$ ' + Math.round(x * y).toLocaleString('pt-BR');
    t.classList.remove('bump'); void t.offsetWidth; t.classList.add('bump');
  }
  a.addEventListener('input', up); m.addEventListener('input', up);
})();
</script>`,
    },
  },

  // 7 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-pinned-horizontal-cards",
    name: "Seção Presa com Cards Passando de Lado e Contador",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "No computador a seção trava e a rolagem vertical empurra a fileira de cards para a esquerda. O título gigante fica por cima, com um esmaecido branco onde os cards somem. Ao lado do título, um contador 01/03 e uma barra que enche acompanham, e o card do meio fica em escala e opacidade cheias enquanto os outros recuam um pouco. No celular vira uma lista normal.",
    tags: ["Horizontal Scroll", "Scroll Pin", "Counter", "Progress Bar", "Focus Card"],
    defaultSection: "Para Quem É",
    previewType: "lmaa-hscroll",
    tech: ["Tailwind CSS", "React", "Sticky"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function PinnedHorizontalCards({ title = 'Para quem é', cards = ['Donos e sócios de academia', 'Quem perde alunos todo mês', 'Quem quer mais motivos para renovar'] }) {
  const sec = useRef(null), track = useRef(null), cardRefs = useRef([]);
  const [dist, setDist] = useState(0), [p, setP] = useState(0);
  useEffect(() => {
    const desk = window.matchMedia('(min-width: 961px)');
    const layout = () => {
      if (!desk.matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDist(0); return; }
      const first = cardRefs.current[0], last = cardRefs.current[cardRefs.current.length - 1];
      const trackW = last.offsetLeft - first.offsetLeft + last.offsetWidth; // offset* ignora o deslocamento atual
      setDist(Math.max(0, trackW - (innerWidth - track.current.getBoundingClientRect().left) + 60));
    };
    const tick = () => { const r = sec.current.getBoundingClientRect(); setP(clamp(-r.top / Math.max(1, r.height - innerHeight), 0, 1)); };
    layout(); tick();
    document.fonts?.ready.then(layout);
    addEventListener('resize', layout); addEventListener('scroll', tick, { passive: true });
    return () => { removeEventListener('resize', layout); removeEventListener('scroll', tick); };
  }, []);
  const n = cards.length, idx = Math.round(p * (n - 1));
  return (
    <section ref={sec} className="relative bg-white" style={{ height: dist ? 'calc(100vh + ' + dist + 'px)' : 'auto' }}>
      <div className={dist ? 'sticky top-0 flex h-svh items-center overflow-hidden' : 'py-24'}>
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-[120px]">
          {/* o lado do título fica por cima e esconde os cards que passam por baixo */}
          <div className="relative z-[2] before:absolute before:-bottom-[100vh] before:-right-[70px] before:-top-[100vh] before:-z-10 before:w-screen before:bg-white before:content-[''] after:absolute after:-bottom-[100vh] after:-right-[120px] after:-top-[100vh] after:-z-10 after:w-[50px] after:bg-[linear-gradient(90deg,#fff,rgba(255,255,255,0))] after:content-['']">
            <h2 className="whitespace-nowrap font-['Baloo_2',sans-serif] text-[clamp(46px,4.8vw,72px)] font-bold leading-[.95] tracking-[-.02em] text-[#1d1d1d]">{title}</h2>
            {dist > 0 && (
              <>
                <p className="mt-8 font-['Baloo_2',sans-serif] text-xl font-bold text-[#b3adbd]"><b className="text-[40px] text-[#1d1d1d]">{String(idx + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}</p>
                <div className="mt-3.5 h-[5px] w-[220px] overflow-hidden rounded bg-[#ebebeb]"><span className="block h-full origin-left rounded bg-[linear-gradient(135deg,#fc5304,#ff8040)]" style={{ transform: 'scaleX(' + (0.33 + 0.67 * p).toFixed(3) + ')' }} /></div>
              </>
            )}
          </div>
          <div ref={track} className={'flex gap-7 will-change-transform ' + (dist ? '' : 'flex-col')} style={{ transform: dist ? 'translate3d(' + (-p * dist).toFixed(1) + 'px,0,0)' : undefined }}>
            {cards.map((c, k) => {
              const a = 1 - clamp(Math.abs(k - p * (n - 1)), 0, 1);
              return (
                <article key={c} ref={(el) => (cardRefs.current[k] = el)} className="group shrink-0 lg:basis-[460px]"
                  style={dist ? { transform: 'scale(' + (0.95 + 0.05 * a) + ')', opacity: 0.8 + 0.2 * a } : undefined}>
                  <div className="h-full overflow-hidden rounded-[32px] border border-[#ebebeb] bg-white transition-[border-color,transform] duration-300 group-hover:-translate-y-1.5 group-hover:border-[#fc5304]/50">
                    <div className="h-[270px] bg-[radial-gradient(120%_90%_at_70%_110%,#76058f,#43096a_38%,#220b52_72%,#1a0638)]" />
                    <div className="px-8 pb-9 pt-7">
                      <span className="mb-2 block font-['Baloo_2',sans-serif] text-lg font-bold text-[#fc5304]">{String(k + 1).padStart(2, '0')}</span>
                      <p className="font-['Baloo_2',sans-serif] text-[25px] font-bold leading-tight text-[#1d1d1d]">{c}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<section class="hs relative bg-white">
  <div class="hs-pin">
    <div class="mx-auto grid w-full max-w-7xl items-center gap-[120px] px-6 lg:grid-cols-[auto_minmax(0,1fr)]">
      <div class="hs-side relative z-[2]">
        <h2 class="whitespace-nowrap font-['Baloo_2',sans-serif] text-7xl font-bold leading-[.95]">Para quem é</h2>
        <p class="mt-8 text-xl font-bold text-[#b3adbd]"><b class="hs-n text-[40px] text-[#1d1d1d]">01</b> / 03</p>
        <div class="mt-3.5 h-[5px] w-[220px] overflow-hidden rounded bg-[#ebebeb]"><span class="hs-bar block h-full origin-left bg-[#fc5304]" style="transform:scaleX(.33)"></span></div>
      </div>
      <div class="hs-track flex gap-7">
        <article class="hs-card basis-[460px] shrink-0 rounded-[32px] border border-[#ebebeb] p-8">Donos e sócios de academia</article>
        <article class="hs-card basis-[460px] shrink-0 rounded-[32px] border border-[#ebebeb] p-8">Quem perde alunos todo mês</article>
        <article class="hs-card basis-[460px] shrink-0 rounded-[32px] border border-[#ebebeb] p-8">Quem quer mais motivos para renovar</article>
      </div>
    </div>
  </div>
</section>
<style>
  .hs.on .hs-pin{position:sticky;top:0;height:100vh;display:flex;align-items:center;overflow:hidden}
  .hs.on .hs-side::before{content:"";position:absolute;z-index:-1;top:-100vh;bottom:-100vh;right:-70px;width:100vw;background:#fff}
  .hs.on .hs-side::after{content:"";position:absolute;z-index:-1;top:-100vh;bottom:-100vh;right:-120px;width:50px;background:linear-gradient(90deg,#fff,rgba(255,255,255,0))}
</style>
<script>
(function () {
  var sec = document.querySelector('.hs'), tr = sec.querySelector('.hs-track'), cs = [].slice.call(sec.querySelectorAll('.hs-card')), n = sec.querySelector('.hs-n'), bar = sec.querySelector('.hs-bar'), dist = 0;
  function cl(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function layout() {
    tr.style.transform = '';
    if (innerWidth < 961) { sec.classList.remove('on'); sec.style.height = ''; dist = 0; return; }
    sec.classList.add('on');
    var f = cs[0], l = cs[cs.length - 1], w = l.offsetLeft - f.offsetLeft + l.offsetWidth;
    dist = Math.max(0, w - (innerWidth - tr.getBoundingClientRect().left) + 60);
    sec.style.height = (innerHeight + dist) + 'px';
  }
  function tick() {
    if (!dist) return;
    var r = sec.getBoundingClientRect(), p = cl(-r.top / (r.height - innerHeight), 0, 1);
    tr.style.transform = 'translate3d(' + (-p * dist) + 'px,0,0)'; bar.style.transform = 'scaleX(' + (.33 + .67 * p) + ')';
    n.textContent = '0' + (Math.round(p * (cs.length - 1)) + 1);
    cs.forEach(function (c, k) { var a = 1 - cl(Math.abs(k - p * (cs.length - 1)), 0, 1); c.style.transform = 'scale(' + (.95 + .05 * a) + ')'; c.style.opacity = .8 + .2 * a; });
  }
  layout(); tick(); addEventListener('resize', function () { layout(); tick(); }); addEventListener('scroll', tick, { passive: true });
})();
</script>`,
    },
  },

  // 8 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-orbit-tags-core",
    name: "Núcleo Pulsante com Etiquetas em Órbita",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "Ilustração para o topo de um card: um círculo laranja no centro que pulsa com uma onda de radar saindo dele e um ícone que balança, cercado por duas órbitas tracejadas girando em sentidos opostos. Uma etiqueta branca viaja em cada órbita e gira ao contrário da órbita, então o texto fica sempre de pé.",
    tags: ["Orbit", "Counter Rotation", "Radar Ping", "Illustration"],
    defaultSection: "Cards de Público",
    previewType: "lmaa-orbit",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `const CSS = '@keyframes lmcSpin{to{transform:rotate(360deg)}}@keyframes lmcSpinR{to{transform:rotate(-360deg)}}' +
  '@keyframes lmcBeat{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}' +
  '@keyframes lmcPing{from{transform:scale(1);opacity:.8}to{transform:scale(1.6);opacity:0}}' +
  '@keyframes lmcTurn{0%,60%,100%{transform:rotate(0)}75%{transform:rotate(-14deg)}88%{transform:rotate(6deg)}}' +
  '@media (prefers-reduced-motion:reduce){.lmc-orb-art *{animation:none!important}}';

export function OrbitTags({ outer = 'Dono', inner = 'Sócio', icon = '★' }) {
  return (
    <div className="lmc-orb-art relative flex h-[270px] items-center justify-center overflow-hidden rounded-t-[32px] bg-[radial-gradient(120%_90%_at_70%_110%,#76058f,#43096a_38%,#220b52_72%,#1a0638)]">
      <style>{CSS}</style>
      {/* órbita externa (16s) e interna (11s, ao contrário); cada etiqueta gira ao contrário da sua órbita */}
      <div className="absolute left-1/2 top-1/2 -ml-[110px] -mt-[110px] h-[220px] w-[220px] rounded-full border-[1.5px] border-dashed border-white/30" style={{ animation: 'lmcSpin 16s linear infinite' }}>
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <span className="inline-block whitespace-nowrap rounded-full bg-white px-3.5 py-[7px] text-[13px] font-bold text-[#2e035d]" style={{ animation: 'lmcSpinR 16s linear infinite' }}>{outer}</span>
        </span>
      </div>
      <div className="absolute left-1/2 top-1/2 -ml-[75px] -mt-[75px] h-[150px] w-[150px] rounded-full border-[1.5px] border-dashed border-white/30" style={{ animation: 'lmcSpinR 11s linear infinite' }}>
        <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2">
          <span className="inline-block whitespace-nowrap rounded-full bg-white px-3.5 py-[7px] text-[13px] font-bold text-[#2e035d]" style={{ animation: 'lmcSpin 11s linear infinite' }}>{inner}</span>
        </span>
      </div>
      <div className="relative grid h-[92px] w-[92px] place-items-center rounded-full bg-[linear-gradient(135deg,#fc5304,#ff8040)] text-4xl text-white after:absolute after:-inset-2.5 after:rounded-full after:border-2 after:border-[#fc5304]/45 after:content-[''] after:[animation:lmcPing_2.4s_ease-out_infinite]" style={{ animation: 'lmcBeat 2.4s ease-in-out infinite' }}>
        <span className="origin-[30%_70%]" style={{ animation: 'lmcTurn 2.8s ease-in-out infinite' }} aria-hidden="true">{icon}</span>
      </div>
    </div>
  );
}`,
      tailwind: `<div class="ot relative flex h-[270px] items-center justify-center overflow-hidden rounded-t-[32px] bg-[#43096a]">
  <div class="ot-o ot-a"><span class="ot-chip"><span>Dono</span></span></div>
  <div class="ot-o ot-b"><span class="ot-chip"><span>Sócio</span></span></div>
  <div class="ot-core">★</div>
</div>
<style>
  .ot-o{position:absolute;left:50%;top:50%;border-radius:50%;border:1.5px dashed rgba(255,255,255,.28)}
  .ot-a{width:220px;height:220px;margin:-110px 0 0 -110px;animation:otS 16s linear infinite}
  .ot-b{width:150px;height:150px;margin:-75px 0 0 -75px;animation:otS 11s linear infinite reverse}
  .ot-chip{position:absolute;left:50%;top:0;transform:translate(-50%,-50%)}.ot-b .ot-chip{top:100%}
  .ot-chip span{display:inline-block;padding:7px 14px;border-radius:100px;background:#fff;color:#2e035d;font-size:13px;font-weight:700;white-space:nowrap}
  .ot-a .ot-chip span{animation:otS 16s linear infinite reverse}.ot-b .ot-chip span{animation:otS 11s linear infinite}
  .ot-core{position:relative;display:grid;place-items:center;width:92px;height:92px;border-radius:50%;background:linear-gradient(135deg,#fc5304,#ff8040);color:#fff;font-size:36px;animation:otB 2.4s ease-in-out infinite}
  .ot-core::after{content:"";position:absolute;inset:-10px;border-radius:50%;border:2px solid rgba(252,83,4,.45);animation:otP 2.4s ease-out infinite}
  @keyframes otS{to{transform:rotate(360deg)}}
  @keyframes otB{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
  @keyframes otP{from{transform:scale(1);opacity:.8}to{transform:scale(1.6);opacity:0}}
</style>`,
    },
  },

  // 9 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-strike-words-highlight",
    name: "Palavras Gigantes Riscadas e Frase com Marca-texto",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "Painel 'não é para': palavras enormes com contorno (feito por filtro SVG, sem text-stroke serrilhado) são riscadas por um traço inclinado em degradê, uma depois da outra, quando o painel entra na tela. No hover a palavra gira levemente. Logo abaixo, a frase de posicionamento ganha um marca-texto laranja que pinta da esquerda para a direita, 1s depois dos riscos.",
    tags: ["Strikethrough", "Outline Text", "SVG Filter", "Highlighter", "Reveal"],
    defaultSection: "Para Quem Não É",
    previewType: "lmaa-strike",
    tech: ["Tailwind CSS", "React", "SVG Filter", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export function StrikeWordsPanel({ words = ['Milagre', 'Fórmula pronta'], statement = 'É para quem quer', mark = 'reter alunos com estratégia.' }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const ease = 'cubic-bezier(.22,1,.36,1)';
  return (
    <div ref={ref} className="relative overflow-hidden rounded-[36px] bg-[radial-gradient(120%_90%_at_70%_110%,#76058f,#43096a_38%,#220b52_72%,#1a0638)] px-14 py-[70px] text-center">
      {/* contorno por filtro: dilata o texto e subtrai o original (borda limpa em qualquer tamanho) */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="lmc-outline"><feMorphology in="SourceAlpha" operator="dilate" radius="1.5" result="d" /><feComposite in="d" in2="SourceAlpha" operator="out" result="o" /><feFlood floodColor="#fff" /><feComposite in2="o" operator="in" /></filter>
      </svg>
      <div className="mb-10 mt-8 flex flex-wrap justify-center gap-x-14 gap-y-2.5">
        {words.map((w, i) => (
          <span key={w} className="relative inline-block font-['Baloo_2',sans-serif] text-[clamp(44px,6vw,88px)] font-bold leading-[1.05] transition-transform duration-[400ms] hover:-rotate-3 hover:scale-[1.04]">
            <span className="text-white [filter:url(#lmc-outline)]">{w}</span>
            <span aria-hidden="true" className="absolute inset-x-[-6%] top-1/2 -mt-[3px] h-[7px] origin-left rounded-md bg-[linear-gradient(135deg,#fc5304,#ff8040)]"
              style={{ transform: 'rotate(-5deg) scaleX(' + (on ? 1 : 0) + ')', transition: 'transform .7s ' + ease + ' ' + i * 0.25 + 's' }} />
          </span>
        ))}
      </div>
      <p className="font-['Baloo_2',sans-serif] text-[clamp(22px,2.4vw,32px)] font-bold leading-snug text-white">
        {statement}{' '}
        <mark className="bg-[linear-gradient(transparent_60%,rgba(252,83,4,.75)_60%)] bg-no-repeat text-white"
          style={{ backgroundSize: (on ? 100 : 0) + '% 100%', transition: 'background-size 1.2s ' + ease + ' 1s' }}>{mark}</mark>
      </p>
    </div>
  );
}`,
      tailwind: `<div class="nope relative overflow-hidden rounded-[36px] bg-[#43096a] px-14 py-[70px] text-center">
  <svg width="0" height="0" class="absolute" aria-hidden="true"><filter id="lmc-outline"><feMorphology in="SourceAlpha" operator="dilate" radius="1.5" result="d"/><feComposite in="d" in2="SourceAlpha" operator="out" result="o"/><feFlood flood-color="#fff"/><feComposite in2="o" operator="in"/></filter></svg>
  <div class="mb-10 mt-8 flex flex-wrap justify-center gap-x-14">
    <span class="strike" style="--d:0s"><span class="strike-t">Milagre</span></span>
    <span class="strike" style="--d:.25s"><span class="strike-t">Fórmula pronta</span></span>
  </div>
  <p class="text-3xl font-bold text-white">É para quem quer <mark>reter alunos com estratégia.</mark></p>
</div>
<style>
  .strike{position:relative;display:inline-block;font:700 clamp(44px,6vw,88px)/1.05 "Baloo 2",sans-serif;transition:transform .4s}
  .strike:hover{transform:rotate(-3deg) scale(1.04)}
  .strike-t{color:#fff;filter:url(#lmc-outline)}
  .strike::after{content:"";position:absolute;left:-6%;right:-6%;top:50%;height:7px;margin-top:-3px;border-radius:6px;background:linear-gradient(135deg,#fc5304,#ff8040);transform:rotate(-5deg) scaleX(0);transform-origin:left;transition:transform .7s cubic-bezier(.22,1,.36,1) var(--d)}
  .nope.in .strike::after{transform:rotate(-5deg) scaleX(1)}
  .nope mark{color:#fff;background:linear-gradient(transparent 60%,rgba(252,83,4,.75) 60%) no-repeat;background-size:0% 100%;transition:background-size 1.2s cubic-bezier(.22,1,.36,1) 1s}
  .nope.in mark{background-size:100% 100%}
</style>
<script>
  (function () { var n = document.querySelector('.nope'); var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { n.classList.add('in'); io.disconnect(); } }, { threshold: .3 }); io.observe(n); })();
</script>`,
    },
  },

  // 10 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-arch-portrait-conic",
    name: "Retrato em Arco com Moldura Girando, Blobs e Selo Flutuante",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "Foto do apresentador num arco (topo bem redondo, base com canto suave) dentro de uma moldura fina de degradê cônico que gira sem parar. Atrás, duas manchas orgânicas (roxa e laranja) mudam de forma devagar, e um selo branco com o logo flutua no canto. A foto ganha parallax leve na rolagem.",
    tags: ["Arch Frame", "Conic Border", "Blob Morph", "Floating Badge", "Parallax"],
    defaultSection: "Sobre o Apresentador",
    previewType: "lmaa-portrait",
    tech: ["Tailwind CSS", "React", "Conic Gradient"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const CSS = '@keyframes lmcSpin{to{transform:rotate(360deg)}}' +
  '@keyframes lmcMorph{0%,100%{border-radius:42% 58% 60% 40%/45% 45% 55% 55%;transform:rotate(0)}50%{border-radius:60% 40% 38% 62%/58% 38% 62% 42%;transform:rotate(25deg)}}' +
  '@keyframes lmcFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}' +
  '@media (prefers-reduced-motion:reduce){.lmc-pt *,.lmc-pt *::before{animation:none!important}}';

export function ArchPortrait({ photo = '/apresentador.jpg', name = 'Loop+', role = 'Clube de vantagens' }) {
  const img = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tick = () => {
      const r = img.current.parentElement.getBoundingClientRect();
      img.current.style.transform = 'translate3d(0,' + ((r.top + r.height / 2 - innerHeight / 2) * -0.06).toFixed(1) + 'px,0)';
    };
    tick(); addEventListener('scroll', tick, { passive: true });
    return () => removeEventListener('scroll', tick);
  }, []);
  return (
    <div className="lmc-pt relative mx-auto max-w-[480px]">
      <style>{CSS}</style>
      <div aria-hidden="true" className="absolute -right-[70px] -top-[50px] h-[380px] w-[380px] bg-[linear-gradient(135deg,#2e035d,#6a2fae)] opacity-[.16]" style={{ animation: 'lmcMorph 12s ease-in-out infinite' }} />
      <div aria-hidden="true" className="absolute -bottom-10 -left-[50px] h-[190px] w-[190px] bg-[linear-gradient(135deg,#fc5304,#ff8040)] opacity-[.22]" style={{ animation: 'lmcMorph 12s ease-in-out -4s infinite' }} />
      {/* moldura: um quadrado maior com degradê cônico gira por trás; o padding de 10px é a "borda" visível */}
      <div className="relative z-[1] overflow-hidden rounded-[240px_240px_30px_30px] p-2.5 before:absolute before:inset-[-50%] before:bg-[conic-gradient(from_0deg,#fc5304,#6a2fae,#2e035d,#ff8040,#fc5304)] before:content-[''] before:[animation:lmcSpin_7s_linear_infinite]">
        <div className="relative z-[1] aspect-[4/5] overflow-hidden rounded-[232px_232px_22px_22px] bg-[#efe7d8]">
          <img ref={img} src={photo} alt="" className="-ml-[9%] h-[118%] w-[112%] max-w-none object-cover object-[center_14%] will-change-transform" />
        </div>
      </div>
      <div className="absolute -right-[30px] bottom-14 z-[2] flex items-center gap-3 rounded-[18px] border border-[#ebebeb] bg-white px-5 py-3.5" style={{ animation: 'lmcFloat 6s ease-in-out 1s infinite' }}>
        <b className="block font-['Baloo_2',sans-serif] text-[17px] leading-none text-[#1d1d1d]">{name}<small className="block font-sans text-xs font-normal text-[#6b6b6b]">{role}</small></b>
      </div>
    </div>
  );
}`,
      tailwind: `<div class="ap relative mx-auto max-w-[480px]">
  <div class="ap-blob ap-a" aria-hidden="true"></div><div class="ap-blob ap-b" aria-hidden="true"></div>
  <div class="ap-frame"><div class="ap-img"><img src="apresentador.jpg" alt=""></div></div>
  <div class="ap-tag"><b>Loop+<small>Clube de vantagens</small></b></div>
</div>
<style>
  .ap-frame{position:relative;z-index:1;padding:10px;border-radius:240px 240px 30px 30px;overflow:hidden}
  .ap-frame::before{content:"";position:absolute;inset:-50%;background:conic-gradient(from 0deg,#fc5304,#6a2fae,#2e035d,#ff8040,#fc5304);animation:apSpin 7s linear infinite}
  .ap-img{position:relative;z-index:1;overflow:hidden;border-radius:232px 232px 22px 22px;aspect-ratio:4/5;background:#efe7d8}
  .ap-img img{width:112%;max-width:none;height:118%;margin-left:-9%;object-fit:cover;object-position:center 14%}
  .ap-blob{position:absolute;z-index:0;border-radius:42% 58% 60% 40%/45% 45% 55% 55%;animation:apMorph 12s ease-in-out infinite}
  .ap-a{width:380px;height:380px;top:-50px;right:-70px;background:linear-gradient(135deg,#2e035d,#6a2fae);opacity:.16}
  .ap-b{width:190px;height:190px;bottom:-40px;left:-50px;background:linear-gradient(135deg,#fc5304,#ff8040);opacity:.22;animation-delay:-4s}
  .ap-tag{position:absolute;z-index:2;right:-30px;bottom:56px;padding:14px 20px;border-radius:18px;background:#fff;border:1px solid #ebebeb;animation:apFloat 6s ease-in-out 1s infinite}
  .ap-tag b{display:block;font:700 17px/1.1 "Baloo 2",sans-serif}.ap-tag small{display:block;font:400 12px sans-serif;color:#6b6b6b}
  @keyframes apSpin{to{transform:rotate(360deg)}}
  @keyframes apMorph{0%,100%{border-radius:42% 58% 60% 40%/45% 45% 55% 55%;transform:rotate(0)}50%{border-radius:60% 40% 38% 62%/58% 38% 62% 42%;transform:rotate(25deg)}}
  @keyframes apFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
</style>`,
    },
  },

  // 11 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-bio-word-light",
    name: "Texto que Acende Palavra por Palavra com a Rolagem",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "Parágrafo longo (bio, manifesto) começa todo em cinza claro e cada palavra acende para a cor do texto conforme a página desce, como uma leitura guiada. O progresso vai de quando o topo do texto está em 85% da tela até o fim dele passar um pouco do meio. Voltando a rolagem, as palavras apagam de novo.",
    tags: ["Scroll Reading", "Word Highlight", "Text Reveal", "Scroll Driven"],
    defaultSection: "Sobre / Manifesto",
    previewType: "lmaa-bio",
    tech: ["Tailwind CSS", "React"],
    frameworks: {
      react: `import { useEffect, useMemo, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function WordLightParagraph({ text, className = 'text-lg leading-[1.8]' }) {
  const ref = useRef(null);
  const words = useMemo(() => text.split(/\\s+/), [text]);
  const [n, setN] = useState(words.length);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tick = () => {
      const r = ref.current.getBoundingClientRect(), vh = innerHeight;
      setN(Math.round(clamp((vh * 0.85 - r.top) / (r.height + vh * 0.25), 0, 1) * words.length));
    };
    tick(); addEventListener('scroll', tick, { passive: true });
    return () => removeEventListener('scroll', tick);
  }, [words.length]);
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, k) => (
        <span key={k} aria-hidden="true" className={'transition-colors duration-[350ms] ' + (k < n ? 'text-[#1d1d1d]' : 'text-[#c8c3d2]')}>{w + ' '}</span>
      ))}
    </p>
  );
}`,
      tailwind: `<p data-words class="text-lg leading-[1.8]">Há mais de dez anos ajudando academias a transformar benefício em motivo para o aluno ficar...</p>
<style>
  [data-words] .wd{color:#c8c3d2;transition:color .35s}
  [data-words] .wd.on{color:#1d1d1d}
</style>
<script>
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var p = document.querySelector('[data-words]'), parts = p.textContent.split(/\\s+/);
  p.setAttribute('aria-label', p.textContent); p.innerHTML = '';
  var ws = parts.map(function (t) { var s = document.createElement('span'); s.className = 'wd'; s.setAttribute('aria-hidden', 'true'); s.textContent = t + ' '; p.appendChild(s); return s; });
  function tick() {
    var r = p.getBoundingClientRect(), vh = innerHeight, k = Math.min(1, Math.max(0, (vh * .85 - r.top) / (r.height + vh * .25))), n = Math.round(k * ws.length);
    ws.forEach(function (w, i) { w.classList.toggle('on', i < n); });
  }
  tick(); addEventListener('scroll', tick, { passive: true });
})();
</script>`,
    },
  },

  // 12 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-stat-cards-spot",
    name: "Cards de Número com Contador, Luz do Mouse e Linha que Enche",
    category: "numeros",
    categoryLabel: "Números & Contadores",
    description: "Três cards de número com o valor em degradê laranja. Ao aparecer, o número conta de 0 até o valor (com prefixo e sufixo menor, ex.: +10 anos) com desaceleração forte no fim, e uma linha em degradê enche na base do card. No hover o card sobe 8px, a borda fica laranja e uma luz suave acompanha o mouse por dentro.",
    tags: ["Count Up", "Mouse Glow", "Stat Card", "Hover Lift", "Progress Line"],
    defaultSection: "Seção de Resultados",
    previewType: "lmaa-stats",
    tech: ["Tailwind CSS", "React", "IntersectionObserver", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

function StatCard({ k, to, prefix = '', suffix = '', text }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0), [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect(); setOn(true);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(to); return; }
      const t0 = performance.now();
      const step = (t) => { const p = Math.min((t - t0) / 1800, 1); setVal(Math.round(to * (1 - Math.pow(1 - p, 4)))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
    const move = (e) => { const r = el.getBoundingClientRect(); el.style.setProperty('--sx', e.clientX - r.left + 'px'); el.style.setProperty('--sy', e.clientY - r.top + 'px'); };
    el.addEventListener('pointermove', move);
    return () => { io.disconnect(); el.removeEventListener('pointermove', move); };
  }, [to]);
  return (
    <div ref={ref} className="group relative overflow-hidden rounded-[22px] border border-[#ebebeb] bg-white px-[22px] pb-6 pt-[26px] transition-[transform,border-color] duration-[350ms] hover:-translate-y-2 hover:border-[#fc5304]/45">
      <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(240px_circle_at_var(--sx,50%)_var(--sy,50%),rgba(252,83,4,.12),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />
      <small className="relative mb-0.5 block text-[13px] font-bold uppercase tracking-[.06em] text-[#6b6b6b]">{k}</small>
      <b className="relative block whitespace-nowrap bg-[linear-gradient(135deg,#fc5304,#ff8040)] bg-clip-text font-['Baloo_2',sans-serif] text-[clamp(40px,3.6vw,52px)] font-bold leading-none text-transparent">
        {prefix}{val}{suffix && <em className="text-[.5em] not-italic">{suffix}</em>}
      </b>
      <span className="relative mt-2.5 block text-sm leading-snug text-[#6b6b6b]">{text}</span>
      <i aria-hidden="true" className="absolute inset-x-[22px] bottom-0 h-[3px] origin-left rounded-t bg-[linear-gradient(135deg,#fc5304,#ff8040)] transition-transform delay-[400ms] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]" style={{ transform: 'scaleX(' + (on ? 1 : 0) + ')' }} />
    </div>
  );
}

export function StatCards({ items = [
  { k: 'Experiência', to: 10, prefix: '+', suffix: ' anos', text: 'no mercado de academias' },
  { k: 'Academias', to: 300, prefix: '+', text: 'atendidas em todo o país' },
  { k: 'Retenção', to: 30, suffix: '%', text: 'a mais em média' },
] }) {
  return <div className="grid gap-4 sm:grid-cols-3">{items.map((s) => <StatCard key={s.k} {...s} />)}</div>;
}`,
      tailwind: `<div class="grid gap-4 sm:grid-cols-3">
  <div class="stat" data-spot><small>Experiência</small><b data-count="10" data-prefix="+" data-suffix=" anos">0</b><span>no mercado de academias</span><i></i></div>
  <div class="stat" data-spot><small>Academias</small><b data-count="300" data-prefix="+">0</b><span>atendidas em todo o país</span><i></i></div>
</div>
<style>
  .stat{--sx:50%;--sy:50%;position:relative;overflow:hidden;padding:26px 22px 24px;border-radius:22px;background:#fff;border:1px solid #ebebeb;transition:transform .35s,border-color .35s}
  .stat::before{content:"";position:absolute;inset:0;background:radial-gradient(240px circle at var(--sx) var(--sy),rgba(252,83,4,.12),transparent 60%);opacity:0;transition:opacity .3s}
  .stat:hover{transform:translateY(-8px);border-color:rgba(252,83,4,.45)}.stat:hover::before{opacity:1}
  .stat small{position:relative;display:block;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#6b6b6b}
  .stat b{position:relative;display:block;font:700 clamp(40px,3.6vw,52px)/1 "Baloo 2",sans-serif;background:linear-gradient(135deg,#fc5304,#ff8040);-webkit-background-clip:text;background-clip:text;color:transparent}
  .stat b em{font-style:normal;font-size:.5em}
  .stat span{position:relative;display:block;margin-top:10px;font-size:14px;color:#6b6b6b}
  .stat i{position:absolute;left:22px;right:22px;bottom:0;height:3px;border-radius:3px 3px 0 0;background:linear-gradient(135deg,#fc5304,#ff8040);transform:scaleX(0);transform-origin:left;transition:transform 1.2s cubic-bezier(.22,1,.36,1) .4s}
  .stat.in i{transform:scaleX(1)}
</style>
<script>
(function () {
  document.querySelectorAll('.stat').forEach(function (c) {
    c.addEventListener('pointermove', function (e) { var r = c.getBoundingClientRect(); c.style.setProperty('--sx', e.clientX - r.left + 'px'); c.style.setProperty('--sy', e.clientY - r.top + 'px'); });
    var b = c.querySelector('[data-count]'), end = +b.dataset.count, pre = b.dataset.prefix || '', suf = b.dataset.suffix || '';
    var io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return; io.disconnect(); c.classList.add('in'); var t0 = performance.now();
      (function step(t) { var p = Math.min((t - t0) / 1800, 1); b.innerHTML = pre + Math.round(end * (1 - Math.pow(1 - p, 4))) + (suf ? '<em>' + suf + '</em>' : ''); if (p < 1) requestAnimationFrame(step); })(t0);
    }, { threshold: .5 });
    io.observe(c);
  });
})();
</script>`,
    },
  },

  // 13 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-countdown-rings",
    name: "Contagem Regressiva em Anéis que Esvaziam",
    category: "numeros",
    categoryLabel: "Números & Contadores",
    description: "Contagem até a data da aula em quatro anéis (dias, horas, minutos, segundos). Cada anel em degradê esvazia conforme a unidade diminui, cada número novo cai de cima com um pequeno tick, e os dois-pontos piscam a cada segundo. O relógio se alinha à virada exata do segundo, e quando a data passa a contagem some.",
    tags: ["Countdown", "Progress Ring", "Timer", "Urgency", "SVG"],
    defaultSection: "Seção de Inscrição",
    previewType: "lmaa-countdown",
    tech: ["Tailwind CSS", "React", "SVG"],
    frameworks: {
      react: `import { useEffect, useState } from 'react';

const pad = (n) => (n < 10 ? '0' : '') + n;
const UNITS = [['d', 'dias', 30], ['h', 'horas', 24], ['m', 'min', 60], ['s', 'seg', 60]];

export function CountdownRings({ date = '2026-12-04T14:00:00-03:00' }) {
  const target = new Date(date).getTime();
  const calc = () => { const s = Math.floor(Math.max(0, target - Date.now()) / 1000); return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60, done: s === 0 }; };
  const [v, setV] = useState(calc);
  useEffect(() => {
    let t;
    // agenda o próximo tick na virada exata do segundo (não acumula atraso)
    const tick = () => { setV(calc()); t = setTimeout(tick, 1000 - (Date.now() % 1000)); };
    tick();
    return () => clearTimeout(t);
  }, [target]);
  if (v.done) return null;
  return (
    <div className="flex max-w-[520px] items-center gap-2.5" role="timer" aria-label={v.d + ' dias, ' + v.h + ' horas e ' + v.m + ' minutos'}>
      <style>{'@keyframes lmcTick{from{transform:translateY(-60%);opacity:0}to{transform:none;opacity:1}}@keyframes lmcBlink{50%{opacity:0}}'}</style>
      <svg width="0" height="0" className="absolute" aria-hidden="true"><linearGradient id="lmc-ring-g" x1="0" x2="1"><stop offset="0" stopColor="#fc5304" /><stop offset="1" stopColor="#ff8040" /></linearGradient></svg>
      {UNITS.map(([k, label, max], i) => (
        <div key={k} className="contents">
          {i > 0 && <span className="font-['Baloo_2',sans-serif] text-[28px] text-white/35" style={{ animation: 'lmcBlink 1s steps(1) infinite' }} aria-hidden="true">:</span>}
          <div className="relative aspect-square max-w-[118px] flex-1" aria-hidden="true">
            <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90">
              <circle cx="20" cy="20" r="17" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)" strokeWidth="2" />
              <circle cx="20" cy="20" r="17" fill="none" stroke="url(#lmc-ring-g)" strokeWidth="2" strokeLinecap="round" pathLength="100" strokeDasharray="100"
                style={{ strokeDashoffset: 100 - Math.min(1, v[k] / max) * 100, transition: 'stroke-dashoffset .9s cubic-bezier(.22,1,.36,1)' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-full">
              <b key={v[k]} className="block font-['Baloo_2',sans-serif] text-[38px] font-bold leading-none text-white tabular-nums motion-safe:[animation:lmcTick_.5s_cubic-bezier(.22,1,.36,1)]">{pad(v[k])}</b>
              <small className="mt-1 text-[11px] font-bold uppercase tracking-[.1em] text-white/60">{label}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}`,
      tailwind: `<div data-countdown="2026-12-04T14:00:00-03:00" class="flex max-w-[520px] items-center gap-2.5 bg-[#43096a] p-6">
  <div class="cd" data-unit="d" data-max="30"><svg viewBox="0 0 40 40"><circle class="t" cx="20" cy="20" r="17"/><circle class="p" cx="20" cy="20" r="17" pathLength="100"/></svg><div><b>00</b><small>dias</small></div></div><span class="cd-sep">:</span>
  <div class="cd" data-unit="h" data-max="24"><svg viewBox="0 0 40 40"><circle class="t" cx="20" cy="20" r="17"/><circle class="p" cx="20" cy="20" r="17" pathLength="100"/></svg><div><b>00</b><small>horas</small></div></div><span class="cd-sep">:</span>
  <div class="cd" data-unit="m" data-max="60"><svg viewBox="0 0 40 40"><circle class="t" cx="20" cy="20" r="17"/><circle class="p" cx="20" cy="20" r="17" pathLength="100"/></svg><div><b>00</b><small>min</small></div></div><span class="cd-sep">:</span>
  <div class="cd" data-unit="s" data-max="60"><svg viewBox="0 0 40 40"><circle class="t" cx="20" cy="20" r="17"/><circle class="p" cx="20" cy="20" r="17" pathLength="100"/></svg><div><b>00</b><small>seg</small></div></div>
</div>
<style>
  .cd{position:relative;flex:1;aspect-ratio:1;max-width:118px}
  .cd svg{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)}
  .cd .t{fill:rgba(255,255,255,.05);stroke:rgba(255,255,255,.12);stroke-width:2}
  .cd .p{fill:none;stroke:#fc5304;stroke-width:2;stroke-linecap:round;stroke-dasharray:100;stroke-dashoffset:100;transition:stroke-dashoffset .9s cubic-bezier(.22,1,.36,1)}
  .cd>div{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:50%}
  .cd b{font:700 38px/1 "Baloo 2",sans-serif;color:#fff;font-variant-numeric:tabular-nums}
  .cd small{margin-top:4px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.6)}
  .cd b.tick{animation:cdTick .5s cubic-bezier(.22,1,.36,1)}
  .cd-sep{font:28px "Baloo 2",sans-serif;color:rgba(255,255,255,.35);animation:cdBlink 1s steps(1) infinite}
  @keyframes cdTick{from{transform:translateY(-60%);opacity:0}to{transform:none;opacity:1}}
  @keyframes cdBlink{50%{opacity:0}}
</style>
<script>
(function () {
  var box = document.querySelector('[data-countdown]'), end = new Date(box.dataset.countdown).getTime(), us = [].slice.call(box.querySelectorAll('[data-unit]'));
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tick() {
    var diff = Math.max(0, end - Date.now()), s = Math.floor(diff / 1000), v = { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
    if (!diff) { box.style.display = 'none'; return; }
    us.forEach(function (u) {
      var k = u.dataset.unit, b = u.querySelector('b'), t = pad(v[k]);
      if (b.textContent !== t) { b.textContent = t; b.classList.remove('tick'); void b.offsetWidth; b.classList.add('tick'); }
      u.querySelector('.p').style.strokeDashoffset = 100 - Math.min(1, v[k] / +u.dataset.max) * 100;
    });
    setTimeout(tick, 1000 - (Date.now() % 1000));
  }
  tick();
})();
</script>`,
    },
  },

  // 14 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-live-validation-form",
    name: "Formulário com Borda Girando, Barra de Progresso e Check por Campo",
    category: "formularios",
    categoryLabel: "Formulários & Quiz",
    description: "Formulário branco dentro de uma borda de 2px onde um brilho laranja gira em volta sem parar. No topo, uma barra enche conforme os campos ficam válidos. Cada campo tem um número que vira check verde e um selo verde que salta dentro do input quando o dado está certo. Fichas de escolha ganham check e fundo roxo ao marcar, e campo com erro balança e fica vermelho.",
    tags: ["Form Progress", "Live Validation", "Conic Border", "Chips", "Shake Error"],
    defaultSection: "Formulário de Inscrição",
    previewType: "lmaa-form",
    tech: ["Tailwind CSS", "React", "Conic Gradient"],
    frameworks: {
      react: `import { useState } from 'react';

const RULES = {
  nome: (v) => v.trim().length >= 2,
  whatsapp: (v) => v.replace(/\\D/g, '').length >= 10,
  email: (v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v.trim()),
  alunos: (v) => v !== '',
};
const CSS = '@keyframes lmcSpin{to{transform:rotate(360deg)}}@keyframes lmcShake{25%{transform:translateX(-5px)}50%{transform:translateX(5px)}75%{transform:translateX(-3px)}}' +
  '@keyframes lmcPop{0%{transform:scale(.92)}60%{transform:scale(1.06)}100%{transform:scale(1)}}';

export function LiveForm({ onSubmit }) {
  const [v, setV] = useState({ nome: '', whatsapp: '', email: '', alunos: '' });
  const [err, setErr] = useState({});
  const ok = (k) => RULES[k](v[k]);
  const done = Object.keys(RULES).filter(ok).length / Object.keys(RULES).length;
  const set = (k) => (e) => { setV({ ...v, [k]: e.target.value }); setErr({ ...err, [k]: false }); };
  const submit = (e) => {
    e.preventDefault();
    const bad = Object.fromEntries(Object.keys(RULES).map((k) => [k, !ok(k)]));
    setErr(bad);
    if (!Object.values(bad).some(Boolean)) onSubmit?.(v);
  };
  const Field = (k, n, label, type = 'text') => (
    <div className="mb-3.5" style={err[k] ? { animation: 'lmcShake .4s ease' } : undefined}>
      <label htmlFor={'lmc-' + k} className="mb-[7px] flex items-center gap-2 text-sm font-bold text-[#1d1d1d]">
        <i className={'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs not-italic transition-all ' + (ok(k) ? 'bg-[#22c55e] text-white' : 'bg-[#f3eef8] text-[#2e035d]')}>{ok(k) ? '✓' : n}</i>{label}
      </label>
      <div className="relative">
        <input id={'lmc-' + k} type={type} value={v[k]} onChange={set(k)} aria-invalid={!!err[k]}
          className={'block h-[54px] w-full rounded-[14px] border-[1.5px] px-4 pr-11 text-base outline-none transition focus:bg-white focus:shadow-[0_0_0_4px_rgba(106,47,174,.12)] ' + (err[k] ? 'border-[#d93a00] bg-[#fff6f2]' : 'border-transparent bg-[#f7f5fa] hover:bg-[#f2eff7] focus:border-[#6a2fae]')} />
        <span aria-hidden="true" className={'absolute right-3.5 top-1/2 -mt-[11px] grid h-[22px] w-[22px] place-items-center rounded-full bg-[#22c55e] text-xs text-white transition-all duration-[350ms] ease-[cubic-bezier(.3,1.6,.5,1)] ' + (ok(k) ? 'scale-100 opacity-100' : 'scale-[.4] opacity-0')}>✓</span>
      </div>
    </div>
  );
  return (
    <div className="relative overflow-hidden rounded-[30px] p-0.5 before:absolute before:inset-[-60%] before:bg-[conic-gradient(from_0deg,transparent_0_60%,#fc5304_75%,#ffb48f_80%,transparent_90%)] before:content-[''] before:[animation:lmcSpin_5s_linear_infinite]">
      <style>{CSS}</style>
      <form onSubmit={submit} noValidate className="relative overflow-hidden rounded-[28px] bg-white px-9 pb-9 text-[#1d1d1d]">
        <div className="-mx-9 mb-[30px] h-1.5 bg-[#f1edf6]"><span className="block h-full origin-left bg-[linear-gradient(135deg,#fc5304,#ff8040)] transition-transform duration-500" style={{ transform: 'scaleX(' + done + ')' }} /></div>
        {Field('nome', 1, 'Seu nome')}
        {Field('whatsapp', 2, 'WhatsApp', 'tel')}
        {Field('email', 3, 'E-mail', 'email')}
        <fieldset className="mb-[18px] mt-2" style={err.alunos ? { animation: 'lmcShake .4s ease' } : undefined}>
          <legend className="mb-2.5 flex items-center gap-2 text-sm font-bold"><i className={'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs not-italic ' + (ok('alunos') ? 'bg-[#22c55e] text-white' : 'bg-[#f3eef8] text-[#2e035d]')}>{ok('alunos') ? '✓' : 4}</i>Quantos alunos?</legend>
          <div className="flex flex-wrap gap-2">
            {['Até 100', '100 a 300', '300 a 600', '+600'].map((o) => (
              <label key={o} className="cursor-pointer">
                <input type="radio" name="alunos" value={o} checked={v.alunos === o} onChange={set('alunos')} className="peer absolute h-px w-px opacity-0" />
                <span className="inline-flex items-center rounded-full border-[1.5px] border-[#e6e1ee] bg-white px-4 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 peer-checked:border-transparent peer-checked:bg-[linear-gradient(135deg,#2e035d,#5a1a9a)] peer-checked:text-white peer-checked:[animation:lmcPop_.35s] peer-focus-visible:shadow-[0_0_0_4px_rgba(106,47,174,.25)]">
                  {v.alunos === o && <span className="mr-[7px]" aria-hidden="true">✓</span>}{o}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <button className="h-[66px] w-full rounded-full bg-[linear-gradient(135deg,#fc5304,#ff8040)] font-bold uppercase tracking-[.03em] text-white">Garantir minha vaga</button>
      </form>
    </div>
  );
}`,
      tailwind: `<div class="lf-wrap">
  <form class="lf" novalidate>
    <div class="lf-bar"><span></span></div>
    <div class="lf-field" data-field="nome"><label><i>1</i>Seu nome</label><div class="lf-in"><input name="nome"><span class="lf-ok">✓</span></div></div>
    <div class="lf-field" data-field="email"><label><i>2</i>E-mail</label><div class="lf-in"><input name="email" type="email"><span class="lf-ok">✓</span></div></div>
    <button class="h-[66px] w-full rounded-full bg-[linear-gradient(135deg,#fc5304,#ff8040)] font-bold uppercase text-white">Garantir minha vaga</button>
  </form>
</div>
<style>
  .lf-wrap{position:relative;padding:2px;border-radius:30px;overflow:hidden}
  .lf-wrap::before{content:"";position:absolute;inset:-60%;background:conic-gradient(from 0deg,transparent 0 60%,#fc5304 75%,#ffb48f 80%,transparent 90%);animation:lfSpin 5s linear infinite}
  .lf{position:relative;padding:0 36px 36px;border-radius:28px;background:#fff;overflow:hidden}
  .lf-bar{height:6px;margin:0 -36px 30px;background:#f1edf6}.lf-bar span{display:block;height:100%;transform-origin:left;transform:scaleX(0);background:linear-gradient(135deg,#fc5304,#ff8040);transition:transform .5s}
  .lf-field{margin-bottom:14px}.lf-field label{display:flex;align-items:center;gap:8px;margin-bottom:7px;font-size:14px;font-weight:700}
  .lf-field label i{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#f3eef8;color:#2e035d;font-style:normal;font-size:12px;transition:all .3s}
  .lf-field.ok label i{background:#22c55e;color:#fff}
  .lf-in{position:relative}.lf-in input{display:block;width:100%;height:54px;padding:0 44px 0 16px;border-radius:14px;border:1.5px solid transparent;background:#f7f5fa;outline:none;transition:all .2s}
  .lf-in input:focus{background:#fff;border-color:#6a2fae;box-shadow:0 0 0 4px rgba(106,47,174,.12)}
  .lf-ok{position:absolute;right:14px;top:50%;margin-top:-11px;width:22px;height:22px;border-radius:50%;background:#22c55e;color:#fff;font-size:12px;display:grid;place-items:center;opacity:0;transform:scale(.4);transition:all .35s cubic-bezier(.3,1.6,.5,1)}
  .lf-field.ok .lf-ok{opacity:1;transform:scale(1)}
  .lf-field.bad input{border-color:#d93a00;background:#fff6f2}.lf-field.bad{animation:lfShake .4s ease}
  @keyframes lfSpin{to{transform:rotate(360deg)}}
  @keyframes lfShake{25%{transform:translateX(-5px)}50%{transform:translateX(5px)}75%{transform:translateX(-3px)}}
</style>
<script>
(function () {
  var f = document.querySelector('.lf'), bar = f.querySelector('.lf-bar span');
  var rules = { nome: function (v) { return v.trim().length >= 2; }, email: function (v) { return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v.trim()); } };
  function upd() {
    var n = 0, keys = Object.keys(rules);
    keys.forEach(function (k) { var box = f.querySelector('[data-field="' + k + '"]'), ok = rules[k](f.elements[k].value); box.classList.toggle('ok', ok); if (ok) { n++; box.classList.remove('bad'); } box.querySelector('i').textContent = ok ? '✓' : keys.indexOf(k) + 1; });
    bar.style.transform = 'scaleX(' + n / keys.length + ')';
  }
  f.addEventListener('input', upd);
  f.addEventListener('submit', function (e) { e.preventDefault(); Object.keys(rules).forEach(function (k) { var box = f.querySelector('[data-field="' + k + '"]'); if (!rules[k](f.elements[k].value)) { box.classList.remove('bad'); void box.offsetWidth; box.classList.add('bad'); } }); });
})();
</script>`,
    },
  },

  // 15 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-crossed-bands-scroll-speed",
    name: "Faixas Cruzadas que Aceleram com a Velocidade da Rolagem",
    category: "divisas",
    categoryLabel: "Divisas & Faixas",
    description: "Duas faixas inclinadas em X entre seções (a da frente em degradê laranja, a de trás roxa, mais fina), cada uma com texto em caixa alta correndo. A velocidade base é constante e cresce conforme a pessoa rola mais rápido, voltando ao normal suavemente. A largura do grupo é medida sem a rotação e com casas decimais, então a emenda nunca dá pulo.",
    tags: ["Crossed Bands", "Marquee", "Scroll Velocity", "Divider", "Seamless"],
    defaultSection: "Entre Seções",
    previewType: "lmaa-bands",
    tech: ["Tailwind CSS", "React", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

function Band({ items, speed, className, textClass, trackRef }) {
  return (
    <div className={'absolute left-[-5%] top-1/2 flex w-[110%] items-center overflow-hidden ' + className}>
      <div ref={trackRef} className="flex items-center whitespace-nowrap will-change-transform">
        {[0, 1, 2, 3].map((k) => (
          <div key={k} data-group={k === 0 ? '' : undefined} aria-hidden={k > 0 || undefined} className="flex flex-none items-center">
            {items.map((t, i) => <span key={i} className={'inline-flex items-center gap-7 pr-7 font-["Baloo_2",sans-serif] font-bold uppercase tracking-[.02em] text-white ' + textClass}>{t}<b className="text-white/60">✦</b></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CrossedBands({ front = ['Aula ao vivo', 'Retenção', 'Donos de academia'], back = ['Gratuita', 'Sexta 14h', 'Online'] }) {
  const a = useRef(null), b = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tracks = [{ el: a.current, speed: 1, x: 0, w: 0 }, { el: b.current, speed: -0.7, x: 0, w: 0 }];
    const measure = () => tracks.forEach((t) => {
      const band = t.el.parentElement, prev = band.style.transform;
      band.style.transform = 'none'; // a faixa é inclinada: mede sem a rotação
      t.w = t.el.querySelector('[data-group]').getBoundingClientRect().width;
      band.style.transform = prev;
    });
    measure(); document.fonts?.ready.then(measure); addEventListener('resize', measure);
    let lastY = scrollY, vel = 0, lastT = 0, raf = 0;
    const loop = (now) => {
      const dt = lastT ? Math.min((now - lastT) / 16.67, 3) : 1; lastT = now;
      vel = vel * 0.9 + (scrollY - lastY) * 0.1; lastY = scrollY;
      tracks.forEach((t) => {
        if (!t.w) return;
        t.x -= t.speed * dt * (1 + Math.min(Math.abs(vel) * 0.25, 6));
        t.x = t.x % t.w; if (t.x > 0) t.x -= t.w;
        t.el.style.transform = 'translate3d(' + t.x.toFixed(2) + 'px,0,0)';
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', measure); };
  }, []);
  return (
    <div className="pointer-events-none relative z-[4] -my-[100px] h-[200px] overflow-hidden" aria-hidden="true">
      <Band items={back} trackRef={b} className="-mt-[30px] h-[60px] rotate-2 bg-[#6a2fae] opacity-95" textClass="text-xl text-white/85" />
      <Band items={front} trackRef={a} className="z-[2] -mt-[37px] h-[74px] -rotate-[2.5deg] bg-[linear-gradient(135deg,#fc5304,#ff8040)]" textClass="text-[26px]" />
    </div>
  );
}`,
      tailwind: `<div class="bands pointer-events-none relative z-[4] -my-[100px] h-[200px] overflow-hidden" aria-hidden="true">
  <div class="band band--back"><div class="band-t" data-marquee="-0.7"><span>Gratuita ✦</span><span>Sexta 14h ✦</span><span>Online ✦</span></div></div>
  <div class="band band--front"><div class="band-t" data-marquee="1"><span>Aula ao vivo ✦</span><span>Retenção ✦</span><span>Donos de academia ✦</span></div></div>
</div>
<style>
  .band{position:absolute;left:-5%;width:110%;top:50%;height:74px;margin-top:-37px;display:flex;align-items:center;overflow:hidden}
  .band--front{background:linear-gradient(135deg,#fc5304,#ff8040);transform:rotate(-2.5deg);z-index:2}
  .band--back{background:#6a2fae;transform:rotate(2deg);opacity:.95}
  .band-t{display:flex;align-items:center;white-space:nowrap}
  .band-g{display:flex;flex:none}
  .band-t span{padding-right:28px;font:700 26px "Baloo 2",sans-serif;text-transform:uppercase;color:#fff}
  .band--back .band-t span{font-size:20px;color:rgba(255,255,255,.85)}
</style>
<script>
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var tracks = [].slice.call(document.querySelectorAll('[data-marquee]')).map(function (t) {
    var g = document.createElement('div'); g.className = 'band-g'; while (t.firstChild) g.appendChild(t.firstChild); t.appendChild(g);
    for (var c = 0; c < 3; c++) t.appendChild(g.cloneNode(true));
    return { el: t, g: g, sp: +t.dataset.marquee, x: 0, w: 0 };
  });
  function measure() { tracks.forEach(function (t) { var b = t.el.parentElement, p = b.style.transform; b.style.transform = 'none'; t.w = t.g.getBoundingClientRect().width; b.style.transform = p; }); }
  measure(); addEventListener('resize', measure); if (document.fonts) document.fonts.ready.then(measure);
  var lastY = scrollY, vel = 0, lastT = 0;
  (function loop(now) {
    var dt = lastT ? Math.min((now - lastT) / 16.67, 3) : 1; lastT = now; vel = vel * .9 + (scrollY - lastY) * .1; lastY = scrollY;
    tracks.forEach(function (t) { if (!t.w) return; t.x -= t.sp * dt * (1 + Math.min(Math.abs(vel) * .25, 6)); t.x = t.x % t.w; if (t.x > 0) t.x -= t.w; t.el.style.transform = 'translate3d(' + t.x.toFixed(2) + 'px,0,0)'; });
    requestAnimationFrame(loop);
  })(0);
})();
</script>`,
    },
  },

  // 16 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "lmaa-moving-grid-glows",
    name: "Grade que Desliza com Brilhos ao Fundo (Página de Obrigado)",
    category: "fundos",
    categoryLabel: "Fundos & Texturas",
    description: "Fundo da página de obrigado: uma grade de linhas finas roxas de 52px desliza na diagonal bem devagar (40s por volta), recortada por uma máscara oval para sumir nas bordas, com duas manchas de luz desfocadas (roxa e laranja) flutuando por trás. Leve, só CSS, deixa a tela de confirmação viva sem disputar com o texto.",
    tags: ["Grid Pattern", "Radial Mask", "Glow Blobs", "Thank You Page"],
    defaultSection: "Fundo da Página de Obrigado",
    previewType: "lmaa-grid",
    tech: ["Tailwind CSS", "React", "CSS Mask"],
    frameworks: {
      react: `const CSS = '@keyframes lmoGrid{to{background-position:52px 52px}}@keyframes lmoDrift{to{transform:translate(60px,80px)}}' +
  '@media (prefers-reduced-motion:reduce){.lmo-bg *{animation:none!important}}';

export function MovingGridBackground({ children }) {
  return (
    <section className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-white px-6">
      <style>{CSS}</style>
      <div className="lmo-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-[140px] -top-[120px] aspect-square w-[min(520px,90vw)] rounded-full bg-[#76058f] opacity-15 blur-[70px]" style={{ animation: 'lmoDrift 14s ease-in-out infinite alternate' }} />
        <div className="absolute -right-[160px] top-[20%] aspect-square w-[min(460px,80vw)] rounded-full bg-[#fc5304] opacity-[.09] blur-[70px]" style={{ animation: 'lmoDrift 18s ease-in-out infinite alternate-reverse' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,3,93,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(46,3,93,.1)_1px,transparent_1px)] bg-[length:52px_52px] bg-center [mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,#000_20%,transparent_80%)]"
          style={{ animation: 'lmoGrid 40s linear infinite' }} />
      </div>
      <div className="relative w-full max-w-[720px] text-center">{children}</div>
    </section>
  );
}`,
      tailwind: `<section class="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-white px-6">
  <div class="mg pointer-events-none absolute inset-0 -z-10" aria-hidden="true"><i class="mg-a"></i><i class="mg-b"></i><i class="mg-grid"></i></div>
  <div class="max-w-[720px] text-center"><h1 class="text-4xl font-bold">Inscrição confirmada!</h1></div>
</section>
<style>
  .mg i{position:absolute}
  .mg-a{width:min(520px,90vw);aspect-ratio:1;top:-120px;left:-140px;border-radius:50%;background:#76058f;opacity:.15;filter:blur(70px);animation:mgDrift 14s ease-in-out infinite alternate}
  .mg-b{width:min(460px,80vw);aspect-ratio:1;top:20%;right:-160px;border-radius:50%;background:#fc5304;opacity:.09;filter:blur(70px);animation:mgDrift 18s ease-in-out infinite alternate-reverse}
  .mg-grid{inset:0;background-image:linear-gradient(rgba(46,3,93,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(46,3,93,.1) 1px,transparent 1px);background-size:52px 52px;background-position:center;-webkit-mask-image:radial-gradient(ellipse 75% 70% at 50% 45%,#000 20%,transparent 80%);mask-image:radial-gradient(ellipse 75% 70% at 50% 45%,#000 20%,transparent 80%);animation:mgGrid 40s linear infinite}
  @keyframes mgGrid{to{background-position:52px 52px}}
  @keyframes mgDrift{to{transform:translate(60px,80px)}}
  @media (prefers-reduced-motion:reduce){.mg i{animation:none}}
</style>`,
    },
  },
];
