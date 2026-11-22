// Efeitos extraídos da página de vendas da Viviane Rocha (mentalidadedeaprovado.com.br)
const B = { badge: "Vivi" };

export const vivianeVendasEffects = [
  {
    ...B,
    id: "vivi-vendas-tier-button",
    name: "Botão com Faixas em Degrau e Seta que Troca",
    category: "buttons-ctas",
    categoryLabel: "Botões & Ações",
    description: "No hover, três faixas arredondadas varrem a pílula em cascata (de cima para baixo) e a seta sai pela direita enquanto uma nova entra pela esquerda. Parece uma escada se fechando.",
    tags: ["Hover", "Stagger", "Arrow Swap", "CTA", "Pill"],
    defaultSection: "CTA Principal / Oferta",
    previewType: "vv-tier-button",
    tech: ["Tailwind CSS", "React", "CSS Transitions"],
    frameworks: {
      react: `const Arrow = ({ className }) => (
  <svg viewBox="0 0 24 24" className={'absolute inset-0 h-[22px] w-[22px] fill-none stroke-current transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ' + className} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);

export function TierButton({ children = 'Quero entrar na mentoria', href = '#' }) {
  return (
    <a href={href} className="group relative isolate inline-flex min-h-14 items-center justify-center gap-3.5 overflow-hidden rounded-full border-[1.5px] border-transparent bg-[#ff810a] py-3 pl-7 pr-6 font-semibold text-[#01332f] no-underline transition-[color,border-color,transform] delay-75 duration-300 hover:border-[#01332f] hover:text-white active:scale-[.98]">
      <span aria-hidden className="pointer-events-none absolute -inset-0.5 -z-10 grid grid-rows-3">
        {[0, 70, 140].map((d) => (
          <i key={d} className="block w-[calc(100%+60px)] -translate-x-[calc(100%+2px)] rounded-r-full bg-[#01332f] transition-transform duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0" style={{ transitionDelay: d + 'ms' }} />
        ))}
      </span>
      <span className="relative">{children}</span>
      <span aria-hidden className="relative h-[22px] w-[22px] flex-none overflow-hidden">
        <Arrow className="group-hover:translate-x-[130%]" />
        <Arrow className="-translate-x-[130%] group-hover:translate-x-0 group-hover:delay-100" />
      </span>
    </a>
  );
}`,
      tailwind: `<a href="#" class="group relative isolate inline-flex min-h-14 items-center justify-center gap-3.5 overflow-hidden rounded-full border-[1.5px] border-transparent bg-[#ff810a] py-3 pl-7 pr-6 font-semibold text-[#01332f] transition-[color,border-color] delay-75 duration-300 hover:border-[#01332f] hover:text-white">
  <span aria-hidden="true" class="pointer-events-none absolute -inset-0.5 -z-10 grid grid-rows-3">
    <i class="block w-[calc(100%+60px)] -translate-x-[calc(100%+2px)] rounded-r-full bg-[#01332f] transition-transform duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0"></i>
    <i class="block w-[calc(100%+60px)] -translate-x-[calc(100%+2px)] rounded-r-full bg-[#01332f] transition-transform delay-[70ms] duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0"></i>
    <i class="block w-[calc(100%+60px)] -translate-x-[calc(100%+2px)] rounded-r-full bg-[#01332f] transition-transform delay-[140ms] duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0"></i>
  </span>
  <span class="relative">Quero entrar na mentoria</span>
  <span aria-hidden="true" class="relative h-[22px] w-[22px] flex-none overflow-hidden">
    <svg viewBox="0 0 24 24" class="absolute inset-0 h-[22px] w-[22px] fill-none stroke-current transition-transform duration-500 group-hover:translate-x-[130%]" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg>
    <svg viewBox="0 0 24 24" class="absolute inset-0 h-[22px] w-[22px] -translate-x-[130%] fill-none stroke-current transition-transform duration-500 group-hover:translate-x-0 group-hover:delay-100" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg>
  </span>
</a>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-word-mask",
    name: "Título com Palavras Subindo da Máscara",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    description: "Cada palavra do título fica escondida abaixo de uma linha invisível e sobe para o lugar em cascata quando o título entra na tela. Entrada limpa e editorial.",
    tags: ["Split Text", "Mask Reveal", "Stagger", "IntersectionObserver"],
    defaultSection: "H1 / H2 de Seção",
    previewType: "vv-word-mask",
    tech: ["Tailwind CSS", "React", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export function WordMaskTitle({ text = 'Sua aprovação começa com o método certo', as: Tag = 'h2' }) {
  const ref = useRef(null), [inView, setIn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIn(true); io.disconnect(); } }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(ref.current); return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className="text-4xl font-extrabold leading-tight tracking-[-.02em] text-[#01332f]">
      {text.split(' ').map((w, i) => (
        <span key={i} className="-mb-[.14em] inline-block overflow-hidden pb-[.14em] align-top">
          <span className={'inline-block transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ' + (inView ? 'translate-y-0' : 'translate-y-[115%] motion-reduce:translate-y-0')}
            style={{ transitionDelay: i * 34 + 150 + 'ms' }}>{w}</span>{' '}
        </span>
      ))}
    </Tag>
  );
}`,
      tailwind: `<style>
  [data-split] .wm { display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:.14em; margin-bottom:-.14em; }
  [data-split] .w { display:inline-block; transform:translateY(115%); transition:transform .9s cubic-bezier(.22,1,.36,1); transition-delay:calc(var(--i) * 34ms + .15s); }
  [data-split].is-in .w { transform:none; }
  @media (prefers-reduced-motion: reduce) { [data-split] .w { transform:none; transition:none; } }
</style>
<h2 data-split class="text-4xl font-extrabold tracking-[-.02em] text-[#01332f]">Sua aprovação começa com o método certo</h2>
<script>
  document.querySelectorAll('[data-split]').forEach(function (el) {
    var i = 0;
    el.innerHTML = el.textContent.trim().split(/\\s+/).map(function (w) { return '<span class="wm"><span class="w" style="--i:' + (i++) + '">' + w + '</span></span>'; }).join(' ');
    new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { el.classList.add('is-in'); io.disconnect(); } }, { rootMargin: '0px 0px -8% 0px' }).observe(el);
  });
</script>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-typewriter-gradient",
    name: "Trecho-Chave Digitado em Degradê",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    description: "A palavra mais importante do título é digitada letra a letra com um cursor laranja piscando; cada letra ganha um tom do degradê da marca. Depois apaga e digita de novo, em loop.",
    tags: ["Typewriter", "Gradient", "Cursor", "Loop", "Headline"],
    defaultSection: "Palavra de destaque do H1/H2",
    previewType: "vv-typewriter",
    tech: ["Tailwind CSS", "React", "setTimeout"],
    frameworks: {
      react: `import { useEffect, useState } from 'react';

const mix = (a, b, t) => '#' + [1, 3, 5].map((k) => Math.round(parseInt(a.substr(k, 2), 16) * (1 - t) + parseInt(b.substr(k, 2), 16) * t).toString(16).padStart(2, '0')).join('');

export function TypewriterKey({ before = 'Você vai passar na ', word = 'prova certa', from = '#ffb46e', to = '#ff810a' }) {
  const chars = Array.from(word), [n, setN] = useState(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(chars.length); return; }
    let k = 0, dir = 1, t;
    const tick = () => {
      k += dir; setN(k);
      if (dir === 1 && k === chars.length) { dir = -1; t = setTimeout(tick, 1800); }
      else if (dir === -1 && k === 0) { dir = 1; t = setTimeout(tick, 550); }
      else t = setTimeout(tick, dir === 1 ? 55 : 26);
    };
    t = setTimeout(tick, 450); return () => clearTimeout(t);
  }, [word]);
  return (
    <h2 className="text-4xl font-extrabold tracking-[-.02em] text-[#01332f]" aria-label={before + word}>
      <style>{'@keyframes tcur{to{opacity:.35}}'}</style>
      {before}
      <span aria-hidden className="whitespace-nowrap">
        {chars.map((c, i) => <span key={i} style={{ color: mix(from, to, chars.length > 1 ? i / (chars.length - 1) : 1), opacity: i < n ? 1 : 0 }}>{c}</span>).slice(0, n)}
        <span className="relative inline-block h-[1em] w-0 align-[-.12em] before:absolute before:left-px before:top-0 before:h-[1.05em] before:w-[3px] before:rounded-sm before:bg-[#ff810a] before:content-[''] before:[animation:tcur_.8s_ease-in-out_infinite_alternate]" />
      </span>
    </h2>
  );
}`,
      tailwind: `<style>
  .tc { opacity:0; transition:opacity .12s linear; } .tc.on { opacity:1; }
  .tcur { position:relative; display:inline-block; width:0; height:1em; vertical-align:-.12em; }
  .tcur::before { content:""; position:absolute; left:1px; top:0; width:3px; height:1.05em; border-radius:2px; background:#ff810a; animation:tcur .8s ease-in-out infinite alternate; }
  @keyframes tcur { to { opacity:.35; } }
</style>
<h2 class="text-4xl font-extrabold text-[#01332f]">Você vai passar na <span class="tk whitespace-nowrap">prova certa</span></h2>
<script>
  (function () {
    var mix = function (a, b, t) { return '#' + [1, 3, 5].map(function (k) { return Math.round(parseInt(a.substr(k, 2), 16) * (1 - t) + parseInt(b.substr(k, 2), 16) * t).toString(16).padStart(2, '0'); }).join(''); };
    document.querySelectorAll('.tk').forEach(function (ph) {
      var txt = ph.textContent; ph.textContent = '';
      var chars = Array.from(txt).map(function (ch, k, a) { var c = document.createElement('span'); c.className = 'tc'; c.textContent = ch; c.style.color = mix('#ffb46e', '#ff810a', a.length > 1 ? k / (a.length - 1) : 1); ph.appendChild(c); return c; });
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { chars.forEach(function (c) { c.classList.add('on'); }); return; }
      var cur = document.createElement('span'); cur.className = 'tcur'; var k = 0;
      function step() { chars[k].classList.add('on'); chars[k].after(cur); k++; if (k < chars.length) setTimeout(step, 55); else setTimeout(erase, 1800); }
      function erase() { k--; chars[k].classList.remove('on'); if (k > 0) { chars[k - 1].after(cur); setTimeout(erase, 26); } else { chars[0].before(cur); setTimeout(step, 550); } }
      new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { io.disconnect(); setTimeout(step, 450); } }).observe(ph);
    });
  })();
</script>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-liquid-number",
    name: "Número Enchendo de Líquido com a Rolagem",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    description: "Número gigante só com contorno que vai enchendo de laranja conforme a rolagem, com uma ondinha correndo na superfície do líquido. Transforma um dado (+30 anos, +20 órgãos) em espetáculo.",
    tags: ["Background-Clip Text", "Scroll Linked", "Wave", "Stat", "Autoridade"],
    defaultSection: "Seção de Autoridade / Números",
    previewType: "vv-liquid-number",
    tech: ["Tailwind CSS", "React", "CSS @property", "Scroll"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const WAVE = "url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 20' preserveAspectRatio='none'%3E%3Cpath d='M0 10 Q15 0 30 10 T60 10 T90 10 T120 10 V20 H0Z' fill='%23ff810a'/%3E%3C/svg%3E\\")";

export function LiquidNumber({ value = '+30', label = 'anos de experiência' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const upd = () => {
      const r = el.getBoundingClientRect(), vh = innerHeight;
      const p = Math.min(Math.max((vh - r.top) / (vh * .7), 0), 1);
      el.style.setProperty('--lvl', matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : p);
    };
    upd(); addEventListener('scroll', upd, { passive: true });
    return () => removeEventListener('scroll', upd);
  }, []);
  return (
    <div className="flex items-center gap-8">
      <style>{'@property --wx{syntax:"<length>";inherits:false;initial-value:0px}@keyframes waveX{to{--wx:.9em}}.liq{--lvl:0;color:transparent;-webkit-text-stroke:1.5px rgba(1,51,47,.4);background-image:' + WAVE + ',linear-gradient(#ff810a,#ff810a);background-repeat:repeat-x,no-repeat;background-size:.9em .14em,100% calc(var(--lvl)*1em);background-position:var(--wx) calc((1 - var(--lvl))*1em - .135em),0 100%;-webkit-background-clip:text;background-clip:text;animation:waveX 2.4s linear infinite}'}</style>
      <span ref={ref} className="liq h-[1em] w-fit pr-[.1em] text-[clamp(4.5rem,2.6rem+7vw,9rem)] font-extrabold leading-none tracking-[-.05em]">{value}</span>
      <p className="max-w-[24ch] text-2xl font-bold text-[#01332f]">{label}</p>
    </div>
  );
}`,
      tailwind: `<style>
  @property --wx { syntax: "<length>"; inherits: false; initial-value: 0px; }
  @keyframes waveX { to { --wx: .9em; } }
  .liq { --lvl: 0; color: transparent; -webkit-text-stroke: 1.5px rgba(1,51,47,.4);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 20' preserveAspectRatio='none'%3E%3Cpath d='M0 10 Q15 0 30 10 T60 10 T90 10 T120 10 V20 H0Z' fill='%23ff810a'/%3E%3C/svg%3E"), linear-gradient(#ff810a, #ff810a);
    background-repeat: repeat-x, no-repeat; background-size: .9em .14em, 100% calc(var(--lvl) * 1em);
    background-position: var(--wx) calc((1 - var(--lvl)) * 1em - .135em), 0 100%;
    -webkit-background-clip: text; background-clip: text; animation: waveX 2.4s linear infinite; }
</style>
<span class="liq inline-block h-[1em] pr-[.1em] text-[9rem] font-extrabold leading-none tracking-[-.05em]">+30</span>
<script>
  document.querySelectorAll('.liq').forEach(function (el) {
    function upd() { var r = el.getBoundingClientRect(), vh = innerHeight; el.style.setProperty('--lvl', Math.min(Math.max((vh - r.top) / (vh * .7), 0), 1)); }
    upd(); addEventListener('scroll', upd, { passive: true });
  });
</script>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-hero-circle-reveal",
    name: "Hero com Foto Abrindo em Círculo e Onda Laranja",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    description: "Na carga da página, a foto do hero nasce de um ponto no rosto e se abre em círculo enquanto um anel laranja se espalha a partir dali. Ao rolar, o hero inteiro encolhe e vira um card arredondado.",
    tags: ["Clip-path", "Ripple", "Scroll Shrink", "Hero", "Entrada"],
    defaultSection: "Hero Principal",
    previewType: "vv-hero-reveal",
    tech: ["Tailwind CSS", "React", "Clip-path", "Scroll"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export function CircleRevealHero({ img = '/hero.webp', focus = '78% 46%', children }) {
  const ref = useRef(null), [loaded, setLoaded] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true));
    const el = ref.current;
    const upd = () => el.style.setProperty('--p', Math.min(Math.max(scrollY / (el.offsetHeight * .8), 0), 1));
    upd(); addEventListener('scroll', upd, { passive: true });
    return () => removeEventListener('scroll', upd);
  }, []);
  const [fx, fy] = focus.split(' ');
  return (
    <section ref={ref} className="relative isolate flex min-h-[clamp(600px,50vw,780px)] items-center overflow-hidden bg-white [--p:0] origin-top [transform:scale(calc(1-var(--p)*.07))] [clip-path:inset(0_round_calc(var(--p)*44px))]">
      <style>{'@keyframes heroRipple{0%{width:0;height:0;opacity:1}70%{opacity:.5}100%{width:180vmax;height:180vmax;opacity:0}}'}</style>
      <img src={img} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover transition-[clip-path] delay-150 duration-[1700ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
        style={{ objectPosition: focus, clipPath: loaded ? 'circle(150% at ' + focus + ')' : 'circle(0% at ' + focus + ')' }} />
      <span aria-hidden className="pointer-events-none absolute rounded-full border-2 border-[#ff810a] opacity-0 motion-reduce:hidden"
        style={{ left: fx, top: fy, transform: 'translate(-50%,-50%)', animation: loaded ? 'heroRipple 2.2s cubic-bezier(.22,1,.36,1) .25s both' : 'none' }} />
      <div className="relative z-10 px-8 [opacity:calc(1-var(--p)*.9)] [transform:translateY(calc(var(--p)*-60px))]">{children}</div>
    </section>
  );
}`,
      tailwind: `<style>
  .hero { --p:0; transform-origin:50% 0; transform:scale(calc(1 - var(--p) * .07)); clip-path:inset(0 round calc(var(--p) * 44px)); }
  .hero__bg { clip-path:circle(0% at 78% 46%); transition:clip-path 1.7s cubic-bezier(.22,1,.36,1) .15s; }
  .hero.is-loaded .hero__bg { clip-path:circle(150% at 78% 46%); }
  .hero__ring { position:absolute; left:78%; top:46%; width:0; height:0; border:2px solid #ff810a; border-radius:50%; transform:translate(-50%,-50%); opacity:0; pointer-events:none; }
  .hero.is-loaded .hero__ring { animation:heroRipple 2.2s cubic-bezier(.22,1,.36,1) .25s both; }
  @keyframes heroRipple { 0% { width:0; height:0; opacity:1; } 70% { opacity:.5; } 100% { width:180vmax; height:180vmax; opacity:0; } }
  .hero__text { transform:translateY(calc(var(--p) * -60px)); opacity:calc(1 - var(--p) * .9); }
</style>
<section class="hero relative isolate flex min-h-[680px] items-center overflow-hidden bg-white">
  <img class="hero__bg absolute inset-0 -z-10 h-full w-full object-cover [object-position:78%_46%]" src="hero.webp" alt="" />
  <span class="hero__ring" aria-hidden="true"></span>
  <div class="hero__text relative z-10 px-8"><!-- título e CTA --></div>
</section>
<script>
  (function () {
    var h = document.querySelector('.hero');
    requestAnimationFrame(function () { h.classList.add('is-loaded'); });
    function upd() { h.style.setProperty('--p', Math.min(Math.max(scrollY / (h.offsetHeight * .8), 0), 1)); }
    upd(); addEventListener('scroll', upd, { passive: true });
  })();
</script>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-switch-quiz",
    name: "Quiz \"Você se Reconhece?\" com Interruptores",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Lista de situações em linhas clicáveis: ao marcar, a linha é inundada de verde num círculo que nasce do interruptor e o botão desliza. Um medidor conta quantas o visitante marcou e libera o veredito.",
    tags: ["Checkbox", "Clip-path Circle", "Toggle", "Gamificação", "Qualificação"],
    defaultSection: "Para Quem É",
    previewType: "vv-switch-quiz",
    tech: ["Tailwind CSS", "React", "Clip-path", "CSS :checked"],
    frameworks: {
      react: `import { useState } from 'react';

const ITEMS = ['Estudo há meses e não vejo evolução', 'Não sei o que revisar nem quando', 'Me perco no edital', 'Desanimo depois de cada simulado'];

export function SwitchQuiz({ items = ITEMS, goal = 2 }) {
  const [on, setOn] = useState([]);
  const toggle = (i) => setOn((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  return (
    <div className="mx-auto max-w-[820px]">
      <div className="mb-8 flex items-center justify-center gap-3.5">
        <div className="flex gap-1.5">{items.map((_, i) => <i key={i} className={'h-2 w-10 rounded-full transition-all duration-300 ' + (i < on.length ? 'scale-y-[1.35] bg-[#ff810a]' : 'bg-[#e6eeec]')} />)}</div>
        <span className="font-bold text-[#5e5e5e]"><b className="text-xl text-[#01332f]">{on.length}</b> de {items.length}</span>
      </div>
      <ul className="grid gap-2.5">
        {items.map((t, i) => {
          const c = on.includes(i);
          return (
            <li key={i}>
              <label className="relative isolate grid min-h-[72px] cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden rounded-[20px] border border-[#c8ddd9] bg-white py-4 pl-[22px] pr-5 transition-all duration-500 hover:translate-x-1.5 hover:border-[#ff810a]">
                <input type="checkbox" className="peer sr-only" checked={c} onChange={() => toggle(i)} />
                <span className="absolute inset-0 -z-10 bg-[#01332f] transition-[clip-path] duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ clipPath: c ? 'circle(150% at calc(100% - 46px) 50%)' : 'circle(0% at calc(100% - 46px) 50%)' }} />
                <span className={'font-extrabold ' + (c ? 'text-[#ff810a]' : 'text-[#c8ddd9]')}>{String(i + 1).padStart(2, '0')}</span>
                <span className={'font-semibold transition-colors delay-100 ' + (c ? 'text-white' : 'text-[#1a1a1a]')}>{t}</span>
                <span className={'relative h-[30px] w-[52px] rounded-full transition-colors peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-[#ff810a] ' + (c ? 'bg-[#ff810a]' : 'bg-[#e6eeec]')}>
                  <i className={'absolute left-[3px] top-[3px] h-6 w-6 rounded-full bg-white transition-transform duration-[450ms] ease-[cubic-bezier(.34,1.56,.64,1)] ' + (c ? 'translate-x-[22px]' : '')} />
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <p className={'mx-auto mt-8 w-fit bg-[linear-gradient(#ff810a,#ff810a)] bg-[length:0%_3px] bg-bottom bg-no-repeat pb-1 text-lg font-bold transition-all duration-700 ' + (on.length >= goal ? 'bg-[length:100%_3px] text-[#1a1a1a]' : 'text-[#5e5e5e]')}>
        {on.length >= goal ? 'A mentoria foi feita para você.' : 'Marque o que acontece com você'}
      </p>
    </div>
  );
}`,
      tailwind: `<ul class="mx-auto grid max-w-[820px] gap-2.5" id="quiz">
  <li><label class="row group relative isolate grid min-h-[72px] cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden rounded-[20px] border border-[#c8ddd9] bg-white py-4 pl-[22px] pr-5 transition-all duration-500 hover:translate-x-1.5 hover:border-[#ff810a]">
    <input type="checkbox" class="peer sr-only" />
    <span class="row__fill absolute inset-0 -z-10 bg-[#01332f]"></span>
    <span class="font-extrabold text-[#c8ddd9] peer-checked:text-[#ff810a]">01</span>
    <span class="font-semibold text-[#1a1a1a] transition-colors delay-100 peer-checked:text-white">Estudo há meses e não vejo evolução</span>
    <span class="relative h-[30px] w-[52px] rounded-full bg-[#e6eeec] transition-colors peer-checked:bg-[#ff810a] peer-checked:[&>i]:translate-x-[22px]"><i class="absolute left-[3px] top-[3px] h-6 w-6 rounded-full bg-white transition-transform duration-[450ms] ease-[cubic-bezier(.34,1.56,.64,1)]"></i></span>
  </label></li>
  <!-- repita o <li> para cada item -->
</ul>
<style>
  .row__fill { clip-path: circle(0% at calc(100% - 46px) 50%); transition: clip-path .7s cubic-bezier(.22,1,.36,1); }
  .row input:checked ~ .row__fill { clip-path: circle(150% at calc(100% - 46px) 50%); }
</style>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-pinned-notes",
    name: "Bilhetes Pregados Ligados por Linha que Desce",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Cards tipo bilhete, levemente tortos e alternando de lado, ligados por uma trilha tracejada que marcha. Uma linha laranja com ponta brilhante desce pela trilha acompanhando a rolagem e cada bilhete cai no lugar quando ela chega.",
    tags: ["SVG Path", "Scroll Linked", "Stroke Dashoffset", "Zigzag", "Benefícios"],
    defaultSection: "Benefícios / Entregáveis",
    previewType: "vv-pinned-notes",
    tech: ["Tailwind CSS", "React", "SVG", "Scroll"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const ITEMS = ['Plano de estudo sob medida', 'Revisões no momento certo', 'Simulados com correção', 'Acompanhamento semanal'];

export function PinnedNotes({ items = ITEMS }) {
  const box = useRef(null), line = useRef(null), head = useRef(null), track = useRef(null);
  const [d, setD] = useState(''), [lit, setLit] = useState(0);
  useEffect(() => {
    const b = box.current;
    const build = () => {
      const cards = [...b.querySelectorAll('[data-note]')], br = b.getBoundingClientRect();
      const pts = cards.map((c) => { const r = c.getBoundingClientRect(); return [r.left - br.left + r.width / 2, r.top - br.top + r.height / 2]; });
      let s = 'M' + pts[0][0] + ' ' + pts[0][1];
      for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], my = (y0 + y1) / 2; s += ' C' + x0 + ' ' + my + ' ' + x1 + ' ' + my + ' ' + x1 + ' ' + y1; }
      setD(s);
    };
    const upd = () => {
      const p = line.current; if (!p) return;
      const L = p.getTotalLength(), r = b.getBoundingClientRect();
      const k = Math.min(Math.max((innerHeight * .6 - r.top) / r.height, 0), 1);
      p.style.strokeDasharray = L; p.style.strokeDashoffset = L * (1 - k);
      const pt = p.getPointAtLength(L * k); head.current.setAttribute('cx', pt.x); head.current.setAttribute('cy', pt.y);
      setLit(Math.round(k * (items.length - 1) + .4));
    };
    build(); const ro = new ResizeObserver(build); ro.observe(b);
    addEventListener('scroll', upd, { passive: true }); requestAnimationFrame(upd);
    return () => { ro.disconnect(); removeEventListener('scroll', upd); };
  }, [items.length]);
  return (
    <div ref={box} className="relative mx-auto max-w-[1000px] bg-[#01332f] py-16">
      <style>{'@keyframes march{to{stroke-dashoffset:-28}}'}</style>
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <path ref={track} d={d} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="2" strokeDasharray="8 6" strokeLinecap="round" style={{ animation: 'march 1.2s linear infinite' }} />
        <path ref={line} d={d} fill="none" stroke="#ff810a" strokeWidth="3" strokeLinecap="round" />
        <circle ref={head} r="7" fill="#ff810a" style={{ filter: 'drop-shadow(0 0 10px rgba(255,129,10,.9))' }} />
      </svg>
      <ol className="relative flex flex-col gap-7">
        {items.map((t, i) => (
          <li key={i} data-note className={'relative w-[min(100%,330px)] ' + (i % 2 ? 'ml-auto mr-[8%]' : 'ml-[8%]') + (i ? ' md:-mt-24' : '')}>
            <div className={'rounded-[26px] bg-white p-2.5 transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(.34,1.56,.64,1)] ' + (i <= lit ? 'opacity-100' : 'opacity-0')}
              style={{ transform: i <= lit ? 'rotate(' + (i % 2 ? 3 : -3) + 'deg)' : 'rotate(' + (i % 2 ? -9 : 9) + 'deg) translateY(-40px) scale(.9)' }}>
              <div className={'grid gap-3.5 rounded-[17px] border p-[22px] ' + (i % 3 === 1 ? 'border-[#ffd9b3] bg-[#fff4e8]' : 'border-[#c8ddd9] bg-[#f0f7f6]')}>
                <span className="flex items-center gap-3.5 text-[2.6rem] font-extrabold leading-none tracking-[-.04em] text-[#ff810a] after:h-0.5 after:flex-1 after:rounded after:bg-current after:opacity-30 after:content-['']">{String(i + 1).padStart(2, '0')}</span>
                <p className="font-semibold text-[#1a1a1a]">{t}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}`,
      tailwind: `<!-- Versão HTML: mesma lógica do React. Cards com data-note, um <svg> absoluto com 2 paths (trilha tracejada + linha laranja) e um círculo na ponta. -->
<div id="board" class="relative mx-auto max-w-[1000px] bg-[#01332f] py-16">
  <svg class="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
    <path id="bTrack" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="2" stroke-dasharray="8 6" style="animation:march 1.2s linear infinite"/>
    <path id="bLine" fill="none" stroke="#ff810a" stroke-width="3" stroke-linecap="round"/>
    <circle id="bHead" r="7" fill="#ff810a" style="filter:drop-shadow(0 0 10px rgba(255,129,10,.9))"/>
  </svg>
  <ol class="relative flex flex-col gap-7">
    <li data-note class="ml-[8%] w-[min(100%,330px)]"><div class="rotate-[-3deg] rounded-[26px] bg-white p-2.5"><div class="rounded-[17px] border border-[#c8ddd9] bg-[#f0f7f6] p-[22px]"><b class="text-[2.6rem] text-[#ff810a]">01</b><p class="font-semibold">Plano de estudo sob medida</p></div></div></li>
    <li data-note class="ml-auto mr-[8%] w-[min(100%,330px)] md:-mt-24"><div class="rotate-[3deg] rounded-[26px] bg-white p-2.5"><div class="rounded-[17px] border border-[#ffd9b3] bg-[#fff4e8] p-[22px]"><b class="text-[2.6rem] text-[#ff810a]">02</b><p class="font-semibold">Revisões no momento certo</p></div></div></li>
  </ol>
</div>
<style>@keyframes march { to { stroke-dashoffset: -28; } }</style>
<script>
  (function () {
    var b = document.getElementById('board'), line = document.getElementById('bLine'), head = document.getElementById('bHead');
    function build() {
      var br = b.getBoundingClientRect(), pts = [].map.call(b.querySelectorAll('[data-note]'), function (c) { var r = c.getBoundingClientRect(); return [r.left - br.left + r.width / 2, r.top - br.top + r.height / 2]; });
      var d = 'M' + pts[0].join(' ');
      for (var i = 1; i < pts.length; i++) { var my = (pts[i - 1][1] + pts[i][1]) / 2; d += ' C' + pts[i - 1][0] + ' ' + my + ' ' + pts[i][0] + ' ' + my + ' ' + pts[i].join(' '); }
      line.setAttribute('d', d); document.getElementById('bTrack').setAttribute('d', d); upd();
    }
    function upd() {
      var L = line.getTotalLength(), r = b.getBoundingClientRect(), k = Math.min(Math.max((innerHeight * .6 - r.top) / r.height, 0), 1);
      line.style.strokeDasharray = L; line.style.strokeDashoffset = L * (1 - k);
      var p = line.getPointAtLength(L * k); head.setAttribute('cx', p.x); head.setAttribute('cy', p.y);
    }
    new ResizeObserver(build).observe(b); addEventListener('scroll', upd, { passive: true });
  })();
</script>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-rising-waves",
    name: "Divisas em Onda que Sobem e Ondulam",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    description: "Duas ondas sobrepostas, de larguras diferentes, que sobem da base quando entram na tela e ficam correndo em sentidos opostos. Faz a seção escura 'nascer' da clara.",
    tags: ["Divider", "Wave", "Reveal", "Background SVG"],
    defaultSection: "Transição entre Seções",
    previewType: "vv-rising-waves",
    tech: ["Tailwind CSS", "React", "Data-URI SVG", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const svg = (w, d, fill) => "url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 " + w + " 90' preserveAspectRatio='none'%3E%3Cpath d='" + d + "' fill='" + fill + "'/%3E%3C/svg%3E\\")";

export function RisingWaves({ color = '%2301332f', flip = false }) {
  const ref = useRef(null), [inView, setIn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIn(true); io.disconnect(); } });
    io.observe(ref.current); return () => io.disconnect();
  }, []);
  const layer = 'absolute inset-0 bg-repeat-x bg-bottom transition-transform duration-[1300ms] ease-[cubic-bezier(.22,1,.36,1)] ' + (inView ? 'translate-y-0' : 'translate-y-full');
  return (
    <div ref={ref} aria-hidden className={'relative block h-[clamp(46px,6vw,90px)] overflow-hidden ' + (flip ? '-scale-y-100' : '')}>
      <style>{'@keyframes ondaA{to{background-position-x:900px}}@keyframes ondaB{to{background-position-x:-1300px}}@media (prefers-reduced-motion:reduce){.onda-l{animation:none!important}}'}</style>
      <span className={'onda-l opacity-35 ' + layer} style={{ backgroundSize: '900px 100%', backgroundImage: svg(900, 'M0 40 C150 0 300 0 450 40 S750 80 900 40 V90 H0Z', color), animation: 'ondaA 14s linear infinite' }} />
      <span className={'onda-l delay-150 ' + layer} style={{ backgroundSize: '1300px 100%', backgroundImage: svg(1300, 'M0 62 C220 26 430 26 650 62 S1080 98 1300 62 V90 H0Z', color), animation: 'ondaB 9s linear infinite' }} />
    </div>
  );
}`,
      tailwind: `<div class="onda" data-reveal aria-hidden="true"></div>
<style>
  .onda { position:relative; display:block; height:clamp(46px,6vw,90px); overflow:hidden; }
  .onda::before, .onda::after { content:""; position:absolute; inset:0; background-repeat:repeat-x; background-position:0 100%; transition:transform 1.3s cubic-bezier(.22,1,.36,1); }
  .onda::before { background-size:900px 100%; opacity:.35; animation:ondaA 14s linear infinite; background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 900 90%27 preserveAspectRatio=%27none%27%3E%3Cpath d=%27M0 40 C150 0 300 0 450 40 S750 80 900 40 V90 H0Z%27 fill=%27%2301332f%27/%3E%3C/svg%3E"); }
  .onda::after { background-size:1300px 100%; animation:ondaB 9s linear infinite; transition-delay:.15s; background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 1300 90%27 preserveAspectRatio=%27none%27%3E%3Cpath d=%27M0 62 C220 26 430 26 650 62 S1080 98 1300 62 V90 H0Z%27 fill=%27%2301332f%27/%3E%3C/svg%3E"); }
  .onda:not(.is-in)::before, .onda:not(.is-in)::after { transform:translateY(100%); }
  @keyframes ondaA { to { background-position-x:900px; } }
  @keyframes ondaB { to { background-position-x:-1300px; } }
</style>
<script>
  document.querySelectorAll('.onda').forEach(function (o) { new IntersectionObserver(function (e, io) { if (e[0].isIntersecting) { o.classList.add('is-in'); io.disconnect(); } }).observe(o); });
</script>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-step-divider",
    name: "Divisa em Degraus",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    description: "Três barras de larguras crescentes com o canto arredondado, que se esticam da direita em cascata quando aparecem. Transição geométrica que conversa com o botão de faixas.",
    tags: ["Divider", "Scale Reveal", "Stagger", "Geométrico"],
    defaultSection: "Antes de Seção Escura",
    previewType: "vv-step-divider",
    tech: ["Tailwind CSS", "React", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export function StepDivider({ color = '#01332f' }) {
  const ref = useRef(null), [inView, setIn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIn(true); io.disconnect(); } });
    io.observe(ref.current); return () => io.disconnect();
  }, []);
  const bars = [['34%', 'rounded-bl-[40px]', 0], ['62%', 'rounded-bl-[40px]', 100], ['100%', '', 200]];
  return (
    <div ref={ref} aria-hidden className="flex flex-col items-end gap-2 pt-[clamp(32px,5vw,64px)] leading-none">
      {bars.map(([w, r, d], i) => (
        <i key={i} className={'block h-[clamp(14px,1.8vw,22px)] origin-right transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] ' + r + (inView || i === 2 ? ' scale-x-100' : ' scale-x-0')}
          style={{ width: w, background: color, transitionDelay: d + 'ms' }} />
      ))}
    </div>
  );
}`,
      tailwind: `<div class="divisa flex flex-col items-end gap-2 pt-16 leading-none" aria-hidden="true">
  <i class="block h-[22px] w-[34%] origin-right scale-x-0 rounded-bl-[40px] bg-[#01332f] transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)]"></i>
  <i class="block h-[22px] w-[62%] origin-right scale-x-0 rounded-bl-[40px] bg-[#01332f] transition-transform delay-100 duration-1000 ease-[cubic-bezier(.22,1,.36,1)]"></i>
  <i class="block h-[22px] w-full bg-[#01332f]"></i>
</div>
<script>
  document.querySelectorAll('.divisa').forEach(function (d) {
    new IntersectionObserver(function (e, io) { if (e[0].isIntersecting) { d.querySelectorAll('i').forEach(function (i) { i.classList.remove('scale-x-0'); }); io.disconnect(); } }).observe(d);
  });
</script>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-curved-reels",
    name: "Fileira Curva de Vídeos Verticais",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Três vídeos 9:16 lado a lado formando uma curva 3D que se abre quando a fileira chega ao centro da tela; o do meio tem sombra sólida laranja e faz parallax. O YouTube só carrega no clique.",
    tags: ["3D Perspective", "Scroll Linked", "Shorts", "Lazy Video", "Parallax"],
    defaultSection: "Vídeos / Depoimentos em Vídeo",
    previewType: "vv-curved-reels",
    tech: ["Tailwind CSS", "React", "3D Transforms", "Scroll"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export function CurvedReels({ videos = [{ id: 'VIDEO_ID_1', title: 'Vídeo 1' }, { id: 'VIDEO_ID_2', title: 'Vídeo 2' }, { id: 'VIDEO_ID_3', title: 'Vídeo 3' }] }) {
  const ref = useRef(null), [play, setPlay] = useState(-1);
  useEffect(() => {
    const el = ref.current;
    const upd = () => {
      const r = el.getBoundingClientRect(), c = (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2 + r.height / 2);
      el.style.setProperty('--a', Math.min(Math.abs(c), 1).toFixed(3));
      el.style.setProperty('--s', Math.max(-1, Math.min(1, c)).toFixed(3));
    };
    upd(); addEventListener('scroll', upd, { passive: true });
    return () => removeEventListener('scroll', upd);
  }, []);
  return (
    <div ref={ref} className="mx-auto grid max-w-[960px] grid-cols-3 gap-[clamp(16px,2.6vw,36px)] [perspective:1300px]">
      {videos.map((v, i) => {
        const side = i - 1, mid = side === 0;
        const transform = mid
          ? 'translateY(calc(var(--s,0) * -60px)) scale(calc(1.04 - var(--a,0) * .06))'
          : 'rotateY(calc(' + side + ' * (8deg + var(--a,0) * 30deg))) translateZ(calc(var(--a,0) * -60px))';
        return (
          <figure key={i} className={'transition-transform duration-500 [transform-style:preserve-3d] ' + (mid ? 'mt-[72px]' : 'hover:![transform:rotateY(0)_translateZ(30px)]')}
            style={{ transform, transformOrigin: 'calc(50% + ' + side * 50 + '%) 50%' }}>
            <button onClick={() => setPlay(i)} className={'group relative block aspect-[9/16] w-full overflow-hidden rounded-[28px] border-2 bg-[#0a2422] ' + (mid ? 'border-[#ff810a] shadow-[10px_10px_0_#ff810a]' : 'border-white/15')}>
              {play === i
                ? <iframe className="absolute inset-0 h-full w-full" src={'https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=1'} allow="autoplay; encrypted-media" allowFullScreen title={v.title} />
                : <>
                    <img src={'https://i.ytimg.com/vi/' + v.id + '/oardefault.jpg'} alt="" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
                    <span className="absolute left-1/2 top-1/2 -ml-9 -mt-9 grid h-[72px] w-[72px] place-items-center rounded-full bg-[#ff810a] transition-transform group-hover:scale-110">
                      <svg viewBox="0 0 24 24" className="ml-[4%] w-[42%] fill-[#01332f]"><path d="M7 4v16l13-8z" /></svg>
                    </span>
                  </>}
            </button>
            <figcaption className="mt-4 text-center font-bold text-white">{v.title}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}`,
      tailwind: `<div id="reels" class="mx-auto grid max-w-[960px] grid-cols-3 gap-8 [perspective:1300px]">
  <figure class="reel [transform-style:preserve-3d] transition-transform duration-500" style="--side:-1"><button class="block aspect-[9/16] w-full overflow-hidden rounded-[28px] border-2 border-white/15 bg-[#0a2422]"></button></figure>
  <figure class="reel reel--mid mt-[72px] transition-transform duration-500" style="--side:0"><button class="block aspect-[9/16] w-full overflow-hidden rounded-[28px] border-2 border-[#ff810a] bg-[#0a2422] shadow-[10px_10px_0_#ff810a]"></button></figure>
  <figure class="reel [transform-style:preserve-3d] transition-transform duration-500" style="--side:1"><button class="block aspect-[9/16] w-full overflow-hidden rounded-[28px] border-2 border-white/15 bg-[#0a2422]"></button></figure>
</div>
<style>
  .reel { transform-origin: calc(50% + var(--side) * 50%) 50%; transform: rotateY(calc(var(--side) * (8deg + var(--a, 0) * 30deg))) translateZ(calc(var(--a, 0) * -60px)); }
  .reel--mid { transform: translateY(calc(var(--s, 0) * -60px)) scale(calc(1.04 - var(--a, 0) * .06)); }
</style>
<script>
  (function () {
    var el = document.getElementById('reels');
    function upd() { var r = el.getBoundingClientRect(), c = (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2 + r.height / 2); el.style.setProperty('--a', Math.min(Math.abs(c), 1)); el.style.setProperty('--s', Math.max(-1, Math.min(1, c))); }
    upd(); addEventListener('scroll', upd, { passive: true });
  })();
</script>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-offer-card",
    name: "Card de Oferta com Canto Dobrado e Reflexo",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Card de preço com borda marcada e sombra sólida deslocada, canto superior dobrado em laranja, faixa de pontinhos que deriva no topo e um reflexo diagonal que passa de tempos em tempos. Selo 'mais escolhido' flutuando.",
    tags: ["Pricing", "Hard Shadow", "Folded Corner", "Sheen", "Neo-brutalism"],
    defaultSection: "Oferta / Planos",
    previewType: "vv-offer-card",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `export function OfferCard({ hot = true, flag = 'Mais escolhido', title = 'Combo Mentoria + Simulados', price = '197', children }) {
  return (
    <article className={'offer relative flex flex-col gap-4 rounded-[30px] border-2 p-[clamp(26px,2.6vw,36px)] ' + (hot ? 'border-[#ff810a] bg-[#01332f] text-white/85 shadow-[10px_10px_0_#ff810a] [--sheen:rgba(255,255,255,.13)] [--dot:rgba(255,255,255,.14)] [--fold:#fff]' : 'border-[#01332f] bg-white shadow-[10px_10px_0_#01332f] [--sheen:rgba(255,129,10,.13)] [--dot:rgba(1,51,47,.13)] [--fold:#ff810a]')}>
      <style>{'.offer{background-image:linear-gradient(115deg,transparent 42%,var(--sheen) 50%,transparent 58%);background-size:280% 100%;background-position:100% 0;background-repeat:no-repeat;animation:sheen 7s cubic-bezier(.22,1,.36,1) infinite}.offer::before{content:"";position:absolute;inset:0 0 auto;height:92px;border-radius:28px 28px 0 0;background:radial-gradient(var(--dot) 1.2px,transparent 1.3px) 0 0/14px 14px;-webkit-mask:linear-gradient(#000,transparent);mask:linear-gradient(#000,transparent);animation:dotsDrift 5s linear infinite;pointer-events:none}.offer::after{content:"";position:absolute;right:-2px;top:-2px;width:46px;height:46px;border-radius:0 30px 0 14px;background:linear-gradient(225deg,#faf9f6 50%,var(--fold) 50%);border-left:2px solid currentColor;border-bottom:2px solid currentColor}@keyframes sheen{0%,55%{background-position:100% 0}100%{background-position:0 0}}@keyframes dotsDrift{to{background-position:14px 14px}}@keyframes flagBob{0%,100%{transform:translateX(-50%)}50%{transform:translateX(-50%) translateY(-4px)}}@media (prefers-reduced-motion:reduce){.offer,.offer::before,.offer-flag{animation:none!important}}'}</style>
      {flag && <span className="offer-flag absolute -top-4 left-1/2 z-10 rounded-full bg-[#ff810a] px-[18px] py-[7px] text-[.8125rem] font-extrabold uppercase tracking-[.1em] text-[#01332f]" style={{ transform: 'translateX(-50%)', animation: 'flagBob 2.6s ease-in-out infinite' }}>{flag}</span>}
      <h3 className={'relative text-2xl font-extrabold tracking-[-.02em] ' + (hot ? 'text-white' : 'text-[#1a1a1a]')}>{title}</h3>
      <p className={'relative flex items-start gap-1 font-extrabold leading-none ' + (hot ? 'text-white' : 'text-[#01332f]')}><span className="mt-1 text-xl">R$</span><span className="text-6xl tracking-[-.045em]">{price}</span></p>
      <div className="relative">{children}</div>
    </article>
  );
}`,
      tailwind: `<article class="offer relative flex flex-col gap-4 rounded-[30px] border-2 border-[#ff810a] bg-[#01332f] p-9 text-white/85 shadow-[10px_10px_0_#ff810a]">
  <span class="offer-flag absolute -top-4 left-1/2 z-10 rounded-full bg-[#ff810a] px-[18px] py-[7px] text-[13px] font-extrabold uppercase tracking-[.1em] text-[#01332f]">Mais escolhido</span>
  <h3 class="relative text-2xl font-extrabold text-white">Combo Mentoria + Simulados</h3>
  <p class="relative text-6xl font-extrabold text-white">R$ 197</p>
</article>
<style>
  .offer { --sheen: rgba(255,255,255,.13); --dot: rgba(255,255,255,.14); --fold: #fff; background-image: linear-gradient(115deg, transparent 42%, var(--sheen) 50%, transparent 58%); background-size: 280% 100%; background-position: 100% 0; background-repeat: no-repeat; animation: sheen 7s cubic-bezier(.22,1,.36,1) infinite; }
  .offer::before { content:""; position:absolute; inset:0 0 auto; height:92px; border-radius:28px 28px 0 0; background: radial-gradient(var(--dot) 1.2px, transparent 1.3px) 0 0 / 14px 14px; -webkit-mask: linear-gradient(#000, transparent); mask: linear-gradient(#000, transparent); animation: dotsDrift 5s linear infinite; pointer-events:none; }
  .offer::after { content:""; position:absolute; right:-2px; top:-2px; width:46px; height:46px; border-radius:0 30px 0 14px; background: linear-gradient(225deg, #faf9f6 50%, var(--fold) 50%); border-left:2px solid #ff810a; border-bottom:2px solid #ff810a; }
  .offer-flag { transform: translateX(-50%); animation: flagBob 2.6s ease-in-out infinite; }
  @keyframes sheen { 0%, 55% { background-position: 100% 0; } 100% { background-position: 0 0; } }
  @keyframes dotsDrift { to { background-position: 14px 14px; } }
  @keyframes flagBob { 0%, 100% { transform: translateX(-50%); } 50% { transform: translateX(-50%) translateY(-4px); } }
</style>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-scroll-timeline",
    name: "Linha do Tempo que Anda com a Rolagem",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    description: "Uma trilha horizontal com marcos alternando em cima e embaixo; uma bolinha laranja corre pela linha conforme a rolagem, pintando o caminho e acendendo cada marco até chegar em 'Aprovação'.",
    tags: ["Timeline", "Scroll Linked", "Progress", "CTA Final", "Storytelling"],
    defaultSection: "CTA Final",
    previewType: "vv-scroll-timeline",
    tech: ["Tailwind CSS", "React", "Scroll"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const STOPS = ['Diagnóstico', 'Plano', 'Revisões', 'Simulados', 'Reta final'];

export function ScrollTimeline({ start = 'Hoje', end = 'Aprovação', stops = STOPS }) {
  const ref = useRef(null), [p, setP] = useState(0);
  useEffect(() => {
    const upd = () => {
      const r = ref.current.getBoundingClientRect();
      setP(matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : Math.min(Math.max((innerHeight * .85 - r.top) / (innerHeight * .6), 0), 1));
    };
    upd(); addEventListener('scroll', upd, { passive: true });
    return () => removeEventListener('scroll', upd);
  }, []);
  const all = [start, ...stops, end];
  return (
    <div ref={ref} className="relative my-16 h-[150px] bg-[#01332f]">
      <div className="absolute inset-x-0 top-24 -mt-0.5 h-1 rounded bg-white/15">
        <div className="absolute inset-0 origin-left rounded bg-[#ff810a]" style={{ transform: 'scaleX(' + p + ')' }} />
      </div>
      {all.map((t, i) => {
        const x = i / (all.length - 1), on = p >= x - .001, edge = i === 0 || i === all.length - 1, up = i % 2;
        return (
          <div key={i} className="absolute top-24 h-0 w-0" style={{ left: x * 100 + '%' }}>
            <span className={'absolute rounded-full border-2 transition-all duration-500 ' + (edge ? '-left-[11px] -top-[11px] h-[22px] w-[22px]' : '-left-[7px] -top-[7px] h-3.5 w-3.5') + (on ? ' scale-110 border-[#ff810a] bg-[#ff810a]' : ' border-white/40 bg-[#01332f]')} />
            <b className={'absolute whitespace-nowrap font-semibold transition-colors ' + (edge ? 'bottom-11 text-2xl font-extrabold ' + (i ? 'right-0 ' : 'left-0 ') + (on && i ? 'text-[#ff810a]' : 'text-white') : (up ? 'bottom-4 ' : 'top-4 ') + '-translate-x-1/2 text-sm ' + (on ? 'text-white' : 'text-white/50'))}>{t}</b>
          </div>
        );
      })}
      <span className="absolute top-1/2 -ml-2.5 -mt-2.5 h-5 w-5 rounded-full border-[5px] border-[#ff810a] bg-white" style={{ left: p * 100 + '%', top: 96 }} />
    </div>
  );
}`,
      tailwind: `<div id="tl" class="relative my-16 h-[150px]" style="--p:0">
  <div class="absolute inset-x-0 top-24 h-1 rounded bg-white/15"><div class="absolute inset-0 origin-left rounded bg-[#ff810a]" style="transform:scaleX(var(--p))"></div></div>
  <span class="absolute top-24 -ml-2.5 -mt-2.5 h-5 w-5 rounded-full border-[5px] border-[#ff810a] bg-white" style="left:calc(var(--p) * 100%)"></span>
  <!-- marcos: <div class="tl-pt absolute top-24" style="left:25%" data-x=".25"><b>Plano</b></div> -->
</div>
<script>
  (function () {
    var tl = document.getElementById('tl');
    function upd() {
      var r = tl.getBoundingClientRect(), p = Math.min(Math.max((innerHeight * .85 - r.top) / (innerHeight * .6), 0), 1);
      tl.style.setProperty('--p', p);
      tl.querySelectorAll('.tl-pt').forEach(function (pt) { pt.classList.toggle('on', p >= parseFloat(pt.dataset.x)); });
    }
    upd(); addEventListener('scroll', upd, { passive: true });
  })();
</script>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-photo-deck",
    name: "Foto em Baralho que Abre em Leque",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Três cartas da mesma foto empilhadas: verde e laranja em duotone atrás, a real na frente. Conforme a rolagem, o leque abre e fecha, a foto dá zoom lento e os selos de número flutuam em parallax.",
    tags: ["Duotone", "Mix-blend", "Scroll Linked", "Parallax", "Sobre"],
    defaultSection: "Sobre / Quem é a Mentora",
    previewType: "vv-photo-deck",
    tech: ["Tailwind CSS", "React", "Mix-blend-mode", "Scroll"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

export function PhotoDeck({ src = '/foto.webp' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const upd = () => {
      const r = el.getBoundingClientRect(), s = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2 + r.height / 2)));
      el.style.setProperty('--s', s.toFixed(3)); el.style.setProperty('--f', Math.abs(s).toFixed(3));
    };
    upd(); addEventListener('scroll', upd, { passive: true });
    return () => removeEventListener('scroll', upd);
  }, []);
  const card = 'absolute inset-0 origin-[50%_90%] overflow-hidden rounded-[28px] border-2 border-[#01332f]';
  const img = 'h-full w-full object-cover object-[50%_18%]';
  return (
    <div ref={ref} className="relative flex w-full max-w-[430px] [--f:0] [--s:0]">
      <div className={card + ' bg-[#01332f] [transform:translate(calc(var(--f)*-64px),calc(var(--f)*26px))_rotate(calc(-5deg-var(--f)*11deg))]'}><img src={src} alt="" className={img + ' opacity-55 mix-blend-screen grayscale contrast-110'} /></div>
      <div className={card + ' bg-[#ff810a] [transform:translate(calc(var(--f)*58px),calc(var(--f)*8px))_rotate(calc(4deg+var(--f)*10deg))]'}><img src={src} alt="" className={img + ' mix-blend-multiply grayscale contrast-110'} /></div>
      <div className="relative min-h-[520px] flex-1 overflow-hidden rounded-[28px] border-2 border-[#01332f] shadow-[12px_12px_0_#01332f] [transform:rotate(calc(var(--s)*-2.5deg))]">
        <img src={src} alt="Foto da mentora" className={img + ' [transform:scale(calc(1.04+var(--f)*.14))]'} />
      </div>
      <div className="absolute -left-9 bottom-[12%] z-10 grid gap-1 rounded-[18px] border-2 border-[#01332f] bg-white px-[18px] py-3.5 text-sm font-semibold text-[#01332f] shadow-[8px_8px_0_#01332f] [transform:translateY(calc(var(--s)*70px))_rotate(-4deg)]"><b className="text-3xl font-extrabold text-[#ff810a]">+30</b>anos de carreira</div>
      <div className="absolute -right-8 top-1/2 z-10 grid gap-1 rounded-[18px] border-2 border-[#01332f] bg-[#01332f] px-[18px] py-3.5 text-sm font-semibold text-white shadow-[8px_8px_0_#ff810a] [transform:translateY(calc(var(--s)*-50px))_rotate(3deg)]"><b className="text-3xl font-extrabold text-[#ff810a]">+20</b>órgãos aprovados</div>
    </div>
  );
}`,
      tailwind: `<div id="deck" class="relative flex w-full max-w-[430px]" style="--f:0;--s:0">
  <div class="absolute inset-0 origin-[50%_90%] overflow-hidden rounded-[28px] border-2 border-[#01332f] bg-[#01332f]" style="transform:translate(calc(var(--f)*-64px),calc(var(--f)*26px)) rotate(calc(-5deg - var(--f)*11deg))"><img src="foto.webp" alt="" class="h-full w-full object-cover opacity-55 mix-blend-screen grayscale"></div>
  <div class="absolute inset-0 origin-[50%_90%] overflow-hidden rounded-[28px] border-2 border-[#01332f] bg-[#ff810a]" style="transform:translate(calc(var(--f)*58px),calc(var(--f)*8px)) rotate(calc(4deg + var(--f)*10deg))"><img src="foto.webp" alt="" class="h-full w-full object-cover mix-blend-multiply grayscale"></div>
  <div class="relative min-h-[520px] flex-1 overflow-hidden rounded-[28px] border-2 border-[#01332f] shadow-[12px_12px_0_#01332f]" style="transform:rotate(calc(var(--s)*-2.5deg))"><img src="foto.webp" alt="Foto" class="h-full w-full object-cover" style="transform:scale(calc(1.04 + var(--f)*.14))"></div>
</div>
<script>
  (function () {
    var el = document.getElementById('deck');
    function upd() { var r = el.getBoundingClientRect(), s = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2 + r.height / 2))); el.style.setProperty('--s', s); el.style.setProperty('--f', Math.abs(s)); }
    upd(); addEventListener('scroll', upd, { passive: true });
  })();
</script>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-odometer",
    name: "Número em Odômetro",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    description: "Cada dígito é uma coluna de 0 a 9 que gira como um contador mecânico até parar no valor, com atraso em cascata entre as colunas. Leitores de tela recebem só o número final.",
    tags: ["Counter", "Odometer", "Stat", "Stagger", "Acessível"],
    defaultSection: "Números de Autoridade",
    previewType: "vv-odometer",
    tech: ["Tailwind CSS", "React", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export function Odometer({ value = '1994', className = 'text-6xl font-extrabold text-[#ff810a]' }) {
  const ref = useRef(null), [go, setGo] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } }, { threshold: .4 });
    io.observe(ref.current); return () => io.disconnect();
  }, []);
  return (
    <span ref={ref} className={'inline-flex h-[1em] overflow-hidden leading-none ' + className}>
      <span className="sr-only">{value}</span>
      {Array.from(value).map((d, k) => (
        /\\d/.test(d)
          ? <span key={k} aria-hidden className="flex flex-col transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none"
              style={{ transform: go ? 'translateY(-' + (10 + Number(d)) + 'em)' : 'none', transitionDelay: k * .18 + 's' }}>
              {Array.from({ length: 20 }, (_, n) => <span key={n} className="h-[1em]">{n % 10}</span>)}
            </span>
          : <span key={k} aria-hidden>{d}</span>
      ))}
    </span>
  );
}`,
      tailwind: `<span class="odo inline-flex h-[1em] overflow-hidden text-6xl font-extrabold leading-none text-[#ff810a]" data-odo="1994"></span>
<script>
  document.querySelectorAll('.odo').forEach(function (o) {
    var v = o.dataset.odo; o.innerHTML = '<span class="sr-only">' + v + '</span>';
    Array.from(v).forEach(function (d, k) {
      var col = document.createElement('span'); col.setAttribute('aria-hidden', 'true');
      col.style.cssText = 'display:flex;flex-direction:column;transition:transform 1.6s cubic-bezier(.16,1,.3,1) ' + (k * .18) + 's';
      for (var n = 0; n < 20; n++) col.insertAdjacentHTML('beforeend', '<span style="height:1em">' + (n % 10) + '</span>');
      col.dataset.t = 10 + Number(d); o.appendChild(col);
    });
    new IntersectionObserver(function (e, io) {
      if (!e[0].isIntersecting) return; io.disconnect();
      o.querySelectorAll('[data-t]').forEach(function (c) { c.style.transform = 'translateY(-' + c.dataset.t + 'em)'; });
    }, { threshold: .4 }).observe(o);
  });
</script>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-faq-circle",
    name: "FAQ que Inunda de Verde a Partir do +",
    category: "navigation",
    categoryLabel: "Modais & Menus",
    description: "No hover a pergunta 'sai do papel' com sombra sólida laranja e o + gira. Ao abrir, um círculo verde nasce do botão e cobre o card, a resposta entra desfocando e as outras perguntas ficam em segundo plano.",
    tags: ["Accordion", "Clip-path", "Hard Shadow", "Blur Reveal", "FAQ"],
    defaultSection: "FAQ",
    previewType: "vv-faq-circle",
    tech: ["Tailwind CSS", "React", "Clip-path", "Grid Rows Transition"],
    frameworks: {
      react: `import { useState } from 'react';

const FAQ = [['Como funciona a mentoria?', 'Encontros semanais, plano individual e acompanhamento pelo WhatsApp.'], ['Serve para qualquer concurso?', 'Sim, o método se adapta ao edital que você escolher.']];

export function CircleFaq({ items = FAQ }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="mx-auto grid max-w-[880px] gap-3">
      {items.map(([q, a], i) => {
        const on = open === i, dim = open !== -1 && !on;
        return (
          <div key={i} className={'group relative isolate overflow-hidden rounded-[22px] border bg-white transition-all duration-500 ' + (on ? 'border-[#01332f]' : 'border-[#c8ddd9] hover:-translate-x-1 hover:-translate-y-1 hover:border-[#01332f] hover:shadow-[8px_8px_0_#ff810a]') + (dim ? ' opacity-55 hover:opacity-100' : '')}>
            <span aria-hidden className="absolute inset-0 -z-10 bg-[#01332f] bg-[radial-gradient(rgba(255,255,255,.07)_1.2px,transparent_1.3px)] bg-[length:20px_20px] transition-[clip-path] duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ clipPath: on ? 'circle(150% at calc(100% - 42px) 32px)' : 'circle(0 at calc(100% - 42px) 32px)' }} />
            <h3>
              <button aria-expanded={on} onClick={() => setOpen(on ? -1 : i)} className={'flex min-h-16 w-full items-center justify-between gap-4 py-5 pl-[26px] pr-[22px] text-left text-lg font-semibold transition-colors delay-100 ' + (on ? 'text-white' : 'text-[#1a1a1a]')}>
                {q}
                <span className={'relative h-10 w-10 flex-none rounded-full transition-all duration-[550ms] before:absolute before:left-1/2 before:top-1/2 before:-ml-[7px] before:-mt-px before:h-0.5 before:w-3.5 before:rounded before:content-[""] after:absolute after:left-1/2 after:top-1/2 after:-ml-[7px] after:-mt-px after:h-0.5 after:w-3.5 after:rotate-90 after:rounded after:content-[""] ' + (on ? 'rotate-[135deg] bg-[#ff810a] before:bg-[#01332f] after:bg-[#01332f]' : 'bg-[#f0f7f6] before:bg-[#01332f] after:bg-[#01332f] group-hover:rotate-90 group-hover:bg-[#01332f] group-hover:before:bg-white group-hover:after:bg-white')} />
              </button>
            </h3>
            <div className={'grid transition-[grid-template-rows] duration-[550ms] ' + (on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
              <div className="min-h-0 overflow-hidden">
                <p className={'pb-[26px] pl-[26px] pr-[72px] transition-all delay-200 duration-[600ms] ' + (on ? 'text-white/85' : 'translate-y-3 opacity-0 blur-[6px]')}>{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}`,
      tailwind: `<div class="faq mx-auto grid max-w-[880px] gap-3">
  <div class="faq__item relative isolate overflow-hidden rounded-[22px] border border-[#c8ddd9] bg-white">
    <h3><button class="faq__q flex w-full items-center justify-between gap-4 py-5 pl-[26px] pr-[22px] text-left text-lg font-semibold" aria-expanded="false">Como funciona a mentoria?<span class="faq__icon"></span></button></h3>
    <div class="faq__a"><div><p>Encontros semanais, plano individual e acompanhamento pelo WhatsApp.</p></div></div>
  </div>
</div>
<style>
  .faq__item { transition: border-color .35s, transform .45s, box-shadow .45s, opacity .4s; }
  .faq__item::before { content:""; position:absolute; inset:0; z-index:-1; background:#01332f radial-gradient(rgba(255,255,255,.07) 1.2px, transparent 1.3px) 0 0 / 20px 20px; clip-path:circle(0 at calc(100% - 42px) 32px); transition:clip-path .8s cubic-bezier(.22,1,.36,1); }
  .faq__item.is-open::before { clip-path:circle(150% at calc(100% - 42px) 32px); }
  .faq__item:not(.is-open):hover { border-color:#01332f; transform:translate(-4px,-4px); box-shadow:8px 8px 0 #ff810a; }
  .faq__item.is-open .faq__q { color:#fff; }
  .faq__icon { position:relative; flex:none; width:40px; height:40px; border-radius:50%; background:#f0f7f6; transition:background-color .4s, transform .55s; }
  .faq__icon::before, .faq__icon::after { content:""; position:absolute; left:50%; top:50%; width:14px; height:2px; margin:-1px 0 0 -7px; border-radius:2px; background:#01332f; }
  .faq__icon::after { transform:rotate(90deg); }
  .faq__item:not(.is-open):hover .faq__icon { background:#01332f; transform:rotate(90deg); }
  .faq__item:not(.is-open):hover .faq__icon::before, .faq__item:not(.is-open):hover .faq__icon::after { background:#fff; }
  .faq__item.is-open .faq__icon { background:#ff810a; transform:rotate(135deg); }
  .faq__a { display:grid; grid-template-rows:0fr; transition:grid-template-rows .55s; }
  .faq__item.is-open .faq__a { grid-template-rows:1fr; }
  .faq__a > div { min-height:0; overflow:hidden; }
  .faq__a p { padding:0 72px 26px 26px; transition:opacity .6s .2s, filter .6s .2s, transform .6s .2s; }
  .faq__item:not(.is-open) .faq__a p { opacity:0; filter:blur(6px); transform:translateY(12px); }
  .faq__item.is-open .faq__a p { color:rgba(255,255,255,.86); }
  .faq:has(.is-open) .faq__item:not(.is-open):not(:hover) { opacity:.55; }
</style>
<script>
  document.querySelectorAll('.faq__q').forEach(function (b) {
    b.addEventListener('click', function () {
      var it = b.closest('.faq__item'), open = !it.classList.contains('is-open');
      document.querySelectorAll('.faq__item.is-open').forEach(function (o) { o.classList.remove('is-open'); o.querySelector('.faq__q').setAttribute('aria-expanded', 'false'); });
      it.classList.toggle('is-open', open); b.setAttribute('aria-expanded', open);
    });
  });
</script>`
    }
  },
  {
    ...B,
    id: "vivi-vendas-chip-marquee",
    name: "Esteira Dupla de Chips",
    category: "navigation",
    categoryLabel: "Modais & Menus",
    description: "Duas fileiras de etiquetas em pílula correndo em sentidos opostos, com as bordas sumindo em degradê. Para quando o mouse passa por cima, pra pessoa conseguir ler.",
    tags: ["Marquee", "Chips", "Mask Fade", "Pause on Hover", "Logos"],
    defaultSection: "Órgãos / Logos de Clientes",
    previewType: "vv-chip-marquee",
    tech: ["Tailwind CSS", "React", "CSS Keyframes", "CSS Mask"],
    frameworks: {
      react: `const ROW_A = ['TJ/SP', 'Receita Federal', 'INSS', 'Banco do Brasil', 'BNDES', 'Polícia Civil/SP'];
const ROW_B = ['Caixa', 'MP/SP', 'TCE/SP', 'SEFAZ MG', 'Defensoria/SP', 'TRE/SC'];

export function ChipMarquee({ a = ROW_A, b = ROW_B }) {
  const row = (list, rev) => (
    <ul className="chip-row flex w-max" style={{ animation: (rev ? 'chipR 36s' : 'chipL 32s') + ' linear infinite' }}>
      {list.concat(list).map((t, i) => (
        <li key={i} className={'mr-2.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold text-[#01332f] ' + (rev ? 'border-[#c8ddd9] bg-white' : 'border-[#c8ddd9] bg-[#f0f7f6]')}>{t}</li>
      ))}
    </ul>
  );
  return (
    <div className="group grid gap-2.5 overflow-hidden [mask:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
      <style>{'@keyframes chipL{to{transform:translateX(-50%)}}@keyframes chipR{from{transform:translateX(-50%)}to{transform:translateX(0)}}.group:hover .chip-row{animation-play-state:paused!important}@media (prefers-reduced-motion:reduce){.chip-row{animation:none!important}}'}</style>
      {row(a, false)}
      {row(b, true)}
    </div>
  );
}`,
      tailwind: `<div class="chips grid gap-2.5 overflow-hidden [mask:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
  <ul class="chip-row flex w-max"><!-- itens duas vezes --><li class="mr-2.5 rounded-full border border-[#c8ddd9] bg-[#f0f7f6] px-4 py-2 text-sm font-semibold text-[#01332f]">TJ/SP</li></ul>
  <ul class="chip-row chip-row--rev flex w-max"><li class="mr-2.5 rounded-full border border-[#c8ddd9] bg-white px-4 py-2 text-sm font-semibold text-[#01332f]">Caixa</li></ul>
</div>
<style>
  .chip-row { animation: chipL 32s linear infinite; }
  .chip-row--rev { animation: chipR 36s linear infinite; }
  .chips:hover .chip-row { animation-play-state: paused; }
  @keyframes chipL { to { transform: translateX(-50%); } }
  @keyframes chipR { from { transform: translateX(-50%); } to { transform: translateX(0); } }
  @media (prefers-reduced-motion: reduce) { .chip-row { animation: none; } }
</style>`
    }
  }
];
