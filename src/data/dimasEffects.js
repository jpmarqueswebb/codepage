// Efeitos extraídos da LP do Dr. Dimas Melão (urologista, cirurgia robótica) — verde-escuro #283838 + dourado #E2CA7C, Montserrat
const CLIENT = "Dr. Dimas Melão";
const B = { client: CLIENT, badge: CLIENT };

export const dimasEffects = [
  // 1 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-light-blinds-hero",
    name: "Hero Persiana de Luz em Faixas",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    description: "A foto de fundo é fatiada em faixas verticais que abrem do centro para as pontas, começando pela faixa do rosto, cada uma com um feixe de luz passando; o ciclo se repete a cada 9s. Na rolagem, as faixas deslizam em velocidades diferentes (paralaxe). Sensação de revelação cinematográfica.",
    tags: ["Hero", "Clip-path", "Paralaxe", "Feixe de Luz", "Loop"],
    defaultSection: "Hero Principal",
    previewType: "dm-light-blinds",
    tech: ["Tailwind CSS", "React", "CSS Keyframes", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const CSS = '.lb-strip{position:absolute;top:0;bottom:0;overflow:hidden}' +
  '.lb-img{position:absolute;left:0;right:0;top:-12%;bottom:-12%;background-repeat:no-repeat;will-change:transform;animation:lbLoop 9s var(--dl) infinite both}' +
  '@keyframes lbLoop{0%{clip-path:inset(50% 0 50% 0);filter:brightness(1.8);animation-timing-function:cubic-bezier(.7,0,.2,1)}9%{filter:brightness(1.15)}15%,84%{clip-path:inset(0 0 0 0);filter:none;animation-timing-function:cubic-bezier(.7,0,.3,1)}96%,100%{clip-path:inset(50% 0 50% 0);filter:brightness(1.8)}}' +
  '.lb-strip::before{content:"";position:absolute;z-index:1;top:0;bottom:0;left:-60%;width:60%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.95) 45%,rgba(244,234,203,.9) 55%,transparent);mix-blend-mode:screen;opacity:0;animation:lbLight 9s cubic-bezier(.22,1,.36,1) calc(var(--dl) + .45s) infinite both}' +
  '@keyframes lbLight{0%{opacity:0;transform:none}4%{opacity:1}14%,100%{opacity:0;transform:translateX(270%)}}' +
  '@media (prefers-reduced-motion:reduce){.lb-img,.lb-strip::before{animation:none}}';

// image: foto de fundo larga. focusX: posição (0 a 1) do rosto, por onde a abertura começa.
export default function LightBlindsHero({ image = '/hero.webp', focusX = 0.68, strips = 12, children }) {
  const hero = useRef(null);
  const box = useRef(null);

  useEffect(() => {
    const el = hero.current, b = box.current;
    let list = [], raf = 0, lastW = 0;
    const build = () => {
      const W = el.clientWidth, n = window.innerWidth <= 900 ? 6 : strips, sw = W / n, fx = W * focusX;
      b.innerHTML = '';
      list = [];
      lastW = window.innerWidth;
      for (let i = 0; i < n; i++) {
        const x = i * sw, d = Math.abs(x + sw / 2 - fx) / W;
        const s = document.createElement('div');
        s.className = 'lb-strip';
        s.style.cssText = 'left:' + x.toFixed(2) + 'px;width:' + (sw + 0.6).toFixed(2) + 'px;--dl:' + (0.1 + d * 1.2).toFixed(3) + 's';
        const im = document.createElement('div');
        im.className = 'lb-img';
        im.style.cssText = 'background-image:url(' + image + ');background-size:' + W + 'px auto;background-position:' + (-x).toFixed(2) + 'px 12%';
        s.appendChild(im);
        b.appendChild(s);
        list.push({ im, v: (i % 2 ? 1 : -1) * (0.45 + ((i * 37) % 10) / 18) });
      }
    };
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / r.height));
      list.forEach((s) => { s.im.style.transform = p ? 'translate3d(0,' + (s.v * p * r.height * 0.1).toFixed(1) + 'px,0)' : ''; });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { if (window.innerWidth !== lastW) { build(); update(); } };
    build();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, [image, focusX, strips]);

  return (
    <section ref={hero} className="relative flex min-h-[min(92svh,860px)] items-center overflow-hidden bg-white px-6 md:px-[max(24px,calc((100vw-1160px)/2+24px))]">
      <style>{CSS}</style>
      <div ref={box} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(255,255,255,.92)_0,rgba(255,255,255,.75)_32%,transparent_58%)]" />
      <div className="relative z-[2] max-w-[min(600px,46vw)] max-md:max-w-none">
        {children || (
          <>
            <p className="text-[13px] font-semibold uppercase tracking-[.08em] text-[#3F6A57]">Dr. Nome Sobrenome <b className="mx-1.5 font-normal text-[#8A6D1F]">|</b> CRM 0000</p>
            <h1 className="mt-4 text-[clamp(24px,3vw,34px)] font-bold leading-[1.18] tracking-[-.02em] text-[#283838]">Um título forte para o hero, com a promessa principal da página.</h1>
          </>
        )}
      </div>
    </section>
  );
}`,
      tailwind: `<section id="lb-hero" class="relative flex min-h-[min(92svh,860px)] items-center overflow-hidden bg-white px-6" data-img="/hero.webp" data-focus="0.68">
  <style>
    .lb-strip{position:absolute;top:0;bottom:0;overflow:hidden}
    .lb-img{position:absolute;left:0;right:0;top:-12%;bottom:-12%;background-repeat:no-repeat;will-change:transform;animation:lbLoop 9s var(--dl) infinite both}
    @keyframes lbLoop{0%{clip-path:inset(50% 0 50% 0);filter:brightness(1.8);animation-timing-function:cubic-bezier(.7,0,.2,1)}9%{filter:brightness(1.15)}15%,84%{clip-path:inset(0 0 0 0);filter:none;animation-timing-function:cubic-bezier(.7,0,.3,1)}96%,100%{clip-path:inset(50% 0 50% 0);filter:brightness(1.8)}}
    .lb-strip::before{content:"";position:absolute;z-index:1;top:0;bottom:0;left:-60%;width:60%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.95) 45%,rgba(244,234,203,.9) 55%,transparent);mix-blend-mode:screen;opacity:0;animation:lbLight 9s cubic-bezier(.22,1,.36,1) calc(var(--dl) + .45s) infinite both}
    @keyframes lbLight{0%{opacity:0;transform:none}4%{opacity:1}14%,100%{opacity:0;transform:translateX(270%)}}
    @media (prefers-reduced-motion:reduce){.lb-img,.lb-strip::before{animation:none}}
  </style>
  <div class="lb-box pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true"></div>
  <div class="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(255,255,255,.92)_0,rgba(255,255,255,.75)_32%,transparent_58%)]" aria-hidden="true"></div>
  <div class="relative z-[2] max-w-[600px]">
    <p class="text-[13px] font-semibold uppercase tracking-[.08em] text-[#3F6A57]">Dr. Nome Sobrenome <b class="mx-1.5 font-normal text-[#8A6D1F]">|</b> CRM 0000</p>
    <h1 class="mt-4 text-[clamp(24px,3vw,34px)] font-bold leading-[1.18] text-[#283838]">Um título forte para o hero, com a promessa principal da página.</h1>
  </div>
</section>
<script>
(function () {
  var el = document.getElementById('lb-hero'), b = el.querySelector('.lb-box');
  var img = el.dataset.img, focus = +el.dataset.focus, list = [], raf = 0, lastW = 0;
  function build() {
    var W = el.clientWidth, n = innerWidth <= 900 ? 6 : 12, sw = W / n, fx = W * focus, html = '';
    lastW = innerWidth;
    for (var i = 0; i < n; i++) {
      var x = i * sw, d = Math.abs(x + sw / 2 - fx) / W;
      html += '<div class="lb-strip" style="left:' + x + 'px;width:' + (sw + 0.6) + 'px;--dl:' + (0.1 + d * 1.2).toFixed(3) + 's"><div class="lb-img" style="background-image:url(' + img + ');background-size:' + W + 'px auto;background-position:' + (-x) + 'px 12%"></div></div>';
    }
    b.innerHTML = html;
    list = Array.prototype.map.call(b.children, function (s, i) { return { im: s.firstChild, v: (i % 2 ? 1 : -1) * (0.45 + ((i * 37) % 10) / 18) }; });
  }
  function update() {
    raf = 0;
    var r = el.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / r.height));
    list.forEach(function (s) { s.im.style.transform = p ? 'translate3d(0,' + (s.v * p * r.height * 0.1).toFixed(1) + 'px,0)' : ''; });
  }
  addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  addEventListener('resize', function () { if (innerWidth !== lastW) { build(); update(); } });
  build(); update();
})();
</script>`
    }
  },

  // 2 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-odometer-stats",
    name: "Números em Rolo de Odômetro com Fios Dourados",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    description: "Cada dígito é uma coluna de 0 a 9 que rola até o valor quando o número aparece, com atraso em cascata entre os dígitos; ao sair da tela volta a zero e rola de novo. Fios dourados verticais se desenham entre os números. Passa prova concreta com ritmo de painel mecânico.",
    tags: ["Contador", "Odômetro", "IntersectionObserver", "Autoridade", "Dark"],
    defaultSection: "Autoridade / Números",
    previewType: "dm-odometer",
    tech: ["Tailwind CSS", "React", "CSS Transitions", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

function Odometer({ value }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio >= 0.5) setOn(true);
      else if (!e.isIntersecting) setOn(false);
    }, { threshold: [0, 0.5] });
    io.observe(ref.current.closest('li') || ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <b ref={ref} aria-label={value} className="inline-flex font-normal">
      {String(value).split('').map((d, k) => (
        <span key={k} aria-hidden="true" className="inline-block h-[1.1em] overflow-hidden align-top">
          <span className="flex flex-col leading-[1.1]" style={{ transform: 'translateY(' + (on ? -1.1 * +d : 0) + 'em)', transition: 'transform 2s cubic-bezier(.2,.8,.2,1) ' + (k * 0.12 + 0.2) + 's' }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <span key={n}>{n}</span>)}
          </span>
        </span>
      ))}
    </b>
  );
}

const STATS = [
  { v: '15', l: 'Mais de 15 anos de experiência' },
  { v: '20', s: 'mil', l: 'Mais de 20 mil pacientes atendidos' },
  { v: '120', l: 'Mais de 120 cirurgias robóticas' },
  { v: '500', l: 'Mais de 500 avaliações no Google' },
];

export default function OdometerStats({ items = STATS }) {
  const [lines, setLines] = useState(false);
  const ul = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setLines(e.isIntersecting), { threshold: 0.2 });
    io.observe(ul.current);
    return () => io.disconnect();
  }, []);
  return (
    <section className="bg-[#283838] px-6 py-16 text-white">
      <ul ref={ul} className="mx-auto grid max-w-[1160px] grid-cols-2 gap-y-9 md:grid-cols-4">
        {items.map((it, i) => (
          <li key={i} className="relative grid justify-items-center px-4 text-center">
            {i > 0 && (
              <span aria-hidden="true" className={'absolute left-0 top-[10%] h-[80%] w-px origin-top bg-[#E2CA7C] opacity-40 transition-transform duration-[1400ms] delay-[400ms] ease-[cubic-bezier(.22,1,.36,1)] ' + (i === 2 ? 'max-md:hidden ' : '') + (lines ? 'scale-y-100' : 'scale-y-0')} />
            )}
            <span className="flex items-baseline text-[clamp(44px,5vw,68px)] font-light leading-[1.1] tracking-[-.02em] text-[#E2CA7C] tabular-nums">
              +<Odometer value={it.v} />{it.s && <small className="ml-1.5 text-[.4em] font-medium">{it.s}</small>}
            </span>
            <span className="mt-3.5 max-w-[22ch] text-[15px] leading-normal text-white/80">{it.l}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}`,
      tailwind: `<style>
  .odo{display:inline-block;height:1.1em;overflow:hidden;vertical-align:top}
  .odo>span{display:flex;flex-direction:column;line-height:1.1;transform:translateY(calc(var(--v,0) * -1.1em));transition:transform 2s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--k) * 120ms + .2s)}
  .odo-n+.odo-n::before{content:"";position:absolute;left:0;top:10%;width:1px;height:80%;background:#E2CA7C;opacity:.4;transform:scaleY(0);transform-origin:top;transition:transform 1.4s cubic-bezier(.22,1,.36,1) .4s}
  .odo-n.is-in+.odo-n.is-in::before{transform:none}
</style>
<section class="bg-[#283838] px-6 py-16 text-white">
  <ul class="mx-auto grid max-w-[1160px] grid-cols-2 gap-y-9 md:grid-cols-4">
    <li class="odo-n relative grid justify-items-center px-4 text-center"><span class="flex items-baseline text-[clamp(44px,5vw,68px)] font-light leading-[1.1] text-[#E2CA7C] tabular-nums">+<b class="inline-flex font-normal" data-count="15">15</b></span><span class="mt-3.5 max-w-[22ch] text-[15px] text-white/80">Mais de 15 anos de experiência</span></li>
    <li class="odo-n relative grid justify-items-center px-4 text-center"><span class="flex items-baseline text-[clamp(44px,5vw,68px)] font-light leading-[1.1] text-[#E2CA7C] tabular-nums">+<b class="inline-flex font-normal" data-count="20">20</b><small class="ml-1.5 text-[.4em] font-medium">mil</small></span><span class="mt-3.5 max-w-[22ch] text-[15px] text-white/80">Mais de 20 mil pacientes</span></li>
    <li class="odo-n relative grid justify-items-center px-4 text-center"><span class="flex items-baseline text-[clamp(44px,5vw,68px)] font-light leading-[1.1] text-[#E2CA7C] tabular-nums">+<b class="inline-flex font-normal" data-count="120">120</b></span><span class="mt-3.5 max-w-[22ch] text-[15px] text-white/80">Mais de 120 cirurgias robóticas</span></li>
    <li class="odo-n relative grid justify-items-center px-4 text-center"><span class="flex items-baseline text-[clamp(44px,5vw,68px)] font-light leading-[1.1] text-[#E2CA7C] tabular-nums">+<b class="inline-flex font-normal" data-count="500">500</b></span><span class="mt-3.5 max-w-[22ch] text-[15px] text-white/80">Mais de 500 avaliações no Google</span></li>
  </ul>
</section>
<script>
(function () {
  var cols = [];
  document.querySelectorAll('[data-count]').forEach(function (b) {
    var t = b.dataset.count, host = b.closest('li');
    b.setAttribute('aria-label', t); b.textContent = '';
    t.split('').forEach(function (d, k) {
      var o = document.createElement('span'); o.className = 'odo'; o.setAttribute('aria-hidden', 'true');
      var c = document.createElement('span'); c.style.setProperty('--k', k);
      c.innerHTML = '0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9';
      o.appendChild(c); b.appendChild(o); cols.push({ c: c, v: +d, host: host });
    });
  });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      e.target.classList.toggle('is-in', e.isIntersecting);
      cols.forEach(function (o) {
        if (o.host !== e.target) return;
        if (e.intersectionRatio >= 0.5) o.c.style.setProperty('--v', o.v);
        else if (!e.isIntersecting) o.c.style.setProperty('--v', 0);
      });
    });
  }, { threshold: [0, 0.5] });
  document.querySelectorAll('.odo-n').forEach(function (li) { io.observe(li); });
})();
</script>`
    }
  },

  // 3 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-drum-3d-checklist",
    name: "Checklist em Tambor 3D com Medidor",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "A seção trava na tela e os itens de \"para quem é\" giram num tambor 3D (rotateX + perspectiva) guiado pela rolagem; o item do centro escurece, ganha caixa dourada e é ticado, enquanto um anel de progresso conta 01/05. Faz o visitante se reconhecer item a item.",
    tags: ["Sticky", "3D", "Scroll-driven", "Checklist", "Progresso"],
    defaultSection: "Para Quem É",
    previewType: "dm-drum",
    tech: ["Tailwind CSS", "React", "CSS 3D", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const ITEMS = [
  'Você recebeu um diagnóstico e quer entender as suas opções de tratamento',
  'Um exame veio alterado e você precisa da avaliação de um especialista',
  'O seu médico indicou cirurgia e você quer saber se a técnica é possível no seu caso',
  'Você quer uma segunda opinião antes de decidir',
  'Você é familiar de um paciente e quer ajudar nessa decisão',
];

export default function DrumChecklist({ items = ITEMS, title = 'Esta consulta é para você se' }) {
  const pin = useRef(null), sticky = useRef(null), refs = useRef([]);
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const n = items.length;
    let raf = 0, st = 16, dist = 0;
    const size = () => {
      const vh = innerHeight, h = sticky.current.offsetHeight;
      st = Math.max(16, (vh - h) / 2);
      dist = (n - 1) * vh * 0.5;
      sticky.current.style.top = st + 'px';
      pin.current.style.height = h + dist + 'px';
    };
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, (st - pin.current.getBoundingClientRect().top) / dist));
      const f = Math.min(n - 1, Math.max(0, p * (n - 0.7) - 0.1));
      const step = innerWidth < 900 ? 120 : 140, rot = innerWidth < 900 ? 12 : 24;
      refs.current.forEach((it, i) => {
        const o = i - f, ao = Math.abs(o);
        it.style.transform = 'translateY(calc(-50% + ' + (o * step).toFixed(1) + 'px)) rotateX(' + (-o * rot).toFixed(2) + 'deg) scale(' + (1 - Math.min(ao, 2) * 0.08).toFixed(4) + ')';
        it.style.opacity = Math.max(0, 1 - ao * 0.42).toFixed(3);
        it.style.zIndex = String(10 - Math.round(ao * 2));
        it.dataset.state = ao < 0.5 ? 'on' : o < -0.5 ? 'done' : '';
      });
      setCur(Math.round(f));
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(update); };
    const rs = () => { size(); go(); };
    size(); update();
    addEventListener('scroll', go, { passive: true });
    addEventListener('resize', rs);
    return () => { removeEventListener('scroll', go); removeEventListener('resize', rs); cancelAnimationFrame(raf); };
  }, [items.length]);

  return (
    <section className="bg-white">
      <div ref={pin} className="relative">
        <div ref={sticky} className="sticky top-4">
          <div className="mx-auto grid max-w-[1160px] items-center gap-8 px-6 py-6 md:grid-cols-[.8fr_1.2fr] md:gap-24">
            <div>
              <h2 className="text-[clamp(23px,2.6vw,34px)] font-bold leading-[1.22] text-[#283838]">{title}</h2>
              <div aria-hidden="true" className="mt-9 flex items-center gap-[18px]">
                <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90 fill-none stroke-[3]">
                  <circle cx="32" cy="32" r="28" stroke="rgba(40,56,56,.13)" />
                  <circle cx="32" cy="32" r="28" pathLength="1" stroke="#8A6D1F" strokeLinecap="round" strokeDasharray="1" style={{ strokeDashoffset: 1 - (cur + 1) / items.length, transition: 'stroke-dashoffset .5s cubic-bezier(.22,1,.36,1)' }} />
                </svg>
                <span className="text-[15px] font-semibold tracking-[.06em] text-[#4B5563] tabular-nums"><b className="mr-1 text-[44px] font-light leading-none text-[#283838]">{'0' + (cur + 1)}</b>/{String(items.length).padStart(2, '0')}</span>
              </div>
            </div>
            <ul className="group/drum relative h-[clamp(340px,44vh,420px)] [perspective:1100px] [transform-style:preserve-3d]">
              {items.map((t, i) => (
                <li key={i} ref={(el) => (refs.current[i] = el)} className="absolute inset-x-0 top-1/2 flex min-h-[150px] items-center gap-[22px] rounded-[22px] border border-[rgba(40,56,56,.13)] bg-white p-[clamp(24px,3vw,36px)] [transform-origin:50%_50%_-120px] will-change-transform transition-colors duration-500 data-[state=on]:border-[#283838] data-[state=on]:bg-[#283838] [&[data-state=on]_p]:text-white [&[data-state=on]_.bx]:rotate-[-8deg] [&[data-state=on]_.bx]:border-[#E2CA7C] [&[data-state=on]_.bx]:bg-[#E2CA7C] [&[data-state=done]_.bx]:border-[#E3EDE8] [&[data-state=done]_.bx]:bg-[#E3EDE8] [&[data-state=on]_path]:[stroke-dashoffset:0] [&[data-state=done]_path]:[stroke-dashoffset:0]">
                  <span aria-hidden="true" className="bx grid h-[46px] w-[46px] flex-none place-items-center rounded-[14px] border-[1.5px] border-[rgba(40,56,56,.13)] text-[#283838] transition-all duration-[600ms] ease-[cubic-bezier(.34,1.56,.64,1)]">
                    <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1, transition: 'stroke-dashoffset .5s cubic-bezier(.22,1,.36,1) .15s' }} /></svg>
                  </span>
                  <p className="text-[clamp(17px,1.6vw,21px)] font-semibold leading-[1.45] text-[#283838] transition-colors duration-500">{t}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<style>
  .dr-item{position:absolute;left:0;right:0;top:50%;transform-origin:50% 50% -120px;will-change:transform,opacity;transition:background-color .5s,border-color .5s}
  .dr-box path{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .5s cubic-bezier(.22,1,.36,1) .15s}
  .dr-item.is-on{background:#283838;border-color:#283838}.dr-item.is-on p{color:#fff}
  .dr-item.is-on .dr-box{background:#E2CA7C;border-color:#E2CA7C;transform:rotate(-8deg)}
  .dr-item.is-on .dr-box path,.dr-item.is-done .dr-box path{stroke-dashoffset:0}
  .dr-item.is-done .dr-box{background:#E3EDE8;border-color:#E3EDE8}
  .dr-arc{stroke-dasharray:1;stroke-dashoffset:calc(1 - var(--p,.2));transition:stroke-dashoffset .5s}
</style>
<section class="bg-white">
  <div class="dr-pin relative">
    <div class="dr-sticky sticky top-4">
      <div class="mx-auto grid max-w-[1160px] items-center gap-8 px-6 py-6 md:grid-cols-[.8fr_1.2fr] md:gap-24">
        <div>
          <h2 class="text-[clamp(23px,2.6vw,34px)] font-bold leading-[1.22] text-[#283838]">Esta consulta é para você se</h2>
          <div class="dr-meter mt-9 flex items-center gap-[18px]" aria-hidden="true">
            <svg viewBox="0 0 64 64" class="h-16 w-16 -rotate-90 fill-none stroke-[3]"><circle cx="32" cy="32" r="28" stroke="rgba(40,56,56,.13)"/><circle class="dr-arc" cx="32" cy="32" r="28" pathLength="1" stroke="#8A6D1F" stroke-linecap="round"/></svg>
            <span class="text-[15px] font-semibold text-[#4B5563]"><b class="dr-cur mr-1 text-[44px] font-light leading-none text-[#283838]">01</b>/05</span>
          </div>
        </div>
        <ul class="dr-drum relative h-[clamp(340px,44vh,420px)] [perspective:1100px] [transform-style:preserve-3d]">
          <!-- repita o <li> para cada item -->
          <li class="dr-item flex min-h-[150px] items-center gap-[22px] rounded-[22px] border border-[rgba(40,56,56,.13)] bg-white p-8"><span class="dr-box grid h-[46px] w-[46px] flex-none place-items-center rounded-[14px] border-[1.5px] border-[rgba(40,56,56,.13)] text-[#283838] transition-all duration-500" aria-hidden="true"><svg viewBox="0 0 24 24" class="h-6 w-6"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" pathLength="1"/></svg></span><p class="text-[clamp(17px,1.6vw,21px)] font-semibold text-[#283838]">Você recebeu um diagnóstico e quer entender as opções</p></li>
          <li class="dr-item flex min-h-[150px] items-center gap-[22px] rounded-[22px] border border-[rgba(40,56,56,.13)] bg-white p-8"><span class="dr-box grid h-[46px] w-[46px] flex-none place-items-center rounded-[14px] border-[1.5px] border-[rgba(40,56,56,.13)] text-[#283838] transition-all duration-500" aria-hidden="true"><svg viewBox="0 0 24 24" class="h-6 w-6"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" pathLength="1"/></svg></span><p class="text-[clamp(17px,1.6vw,21px)] font-semibold text-[#283838]">Um exame veio alterado e você precisa de avaliação</p></li>
          <li class="dr-item flex min-h-[150px] items-center gap-[22px] rounded-[22px] border border-[rgba(40,56,56,.13)] bg-white p-8"><span class="dr-box grid h-[46px] w-[46px] flex-none place-items-center rounded-[14px] border-[1.5px] border-[rgba(40,56,56,.13)] text-[#283838] transition-all duration-500" aria-hidden="true"><svg viewBox="0 0 24 24" class="h-6 w-6"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" pathLength="1"/></svg></span><p class="text-[clamp(17px,1.6vw,21px)] font-semibold text-[#283838]">Você quer uma segunda opinião antes de decidir</p></li>
        </ul>
      </div>
    </div>
  </div>
</section>
<script>
(function () {
  var pin = document.querySelector('.dr-pin'), sticky = pin.firstElementChild;
  var items = pin.querySelectorAll('.dr-item'), n = items.length, cur = pin.querySelector('.dr-cur'), meter = pin.querySelector('.dr-meter');
  var st = 16, dist = 0, raf = 0;
  function size() { var h = sticky.offsetHeight; st = Math.max(16, (innerHeight - h) / 2); dist = (n - 1) * innerHeight * 0.5; sticky.style.top = st + 'px'; pin.style.height = (h + dist) + 'px'; }
  function update() {
    raf = 0;
    var p = Math.min(1, Math.max(0, (st - pin.getBoundingClientRect().top) / dist));
    var f = Math.min(n - 1, Math.max(0, p * (n - 0.7) - 0.1)), step = innerWidth < 900 ? 120 : 140, rot = innerWidth < 900 ? 12 : 24;
    items.forEach(function (it, i) {
      var o = i - f, ao = Math.abs(o);
      it.style.transform = 'translateY(calc(-50% + ' + (o * step).toFixed(1) + 'px)) rotateX(' + (-o * rot).toFixed(2) + 'deg) scale(' + (1 - Math.min(ao, 2) * 0.08) + ')';
      it.style.opacity = Math.max(0, 1 - ao * 0.42);
      it.style.zIndex = 10 - Math.round(ao * 2);
      it.classList.toggle('is-on', ao < 0.5); it.classList.toggle('is-done', o < -0.5);
    });
    var c = Math.round(f); cur.textContent = '0' + (c + 1); meter.style.setProperty('--p', (c + 1) / n);
  }
  addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  addEventListener('resize', function () { size(); update(); });
  size(); update();
})();
</script>`
    }
  },

  // 4 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-card-deal",
    name: "Cartas que Saem do Monte com Ícones Vivos",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "As cartas de benefícios começam empilhadas e inclinadas no centro da grade e, com a rolagem, são distribuídas uma depois da outra até seus lugares, ganhando borda dourada ao assentar. Cada carta tem um ícone SVG em loop (gota pulsando, pessoa andando, escudo se ticando). Parece um baralho sendo servido.",
    tags: ["Scroll-driven", "Stagger", "Ícones Animados", "Grid", "Dark"],
    defaultSection: "Benefícios",
    previewType: "dm-card-deal",
    tech: ["Tailwind CSS", "React", "CSS Keyframes", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const CSS = '@keyframes cdDrop{0%,100%{transform:translateY(-4px) scale(1)}50%{transform:translateY(4px) scale(.88)}}' +
  '@keyframes cdWalk{0%,100%{transform:translateX(-5px) rotate(-3deg)}50%{transform:translateX(5px) rotate(3deg)}}' +
  '@keyframes cdBreath{50%{transform:translateY(-3px)}}' +
  '@keyframes cdTick{0%{stroke-dashoffset:1}35%,75%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}}' +
  '.cd-i{transform-box:fill-box;transform-origin:center}' +
  '@media (prefers-reduced-motion:reduce){.cd-i{animation:none!important}}';

const ICONS = [
  <svg viewBox="0 0 96 96"><path className="cd-i" style={{ animation: 'cdDrop 2.6s ease-in-out infinite' }} d="M48 14s22 24 22 40a22 22 0 0 1-44 0c0-16 22-40 22-40z" /><path d="M38 58a10 10 0 0 0 10 10" /></svg>,
  <svg viewBox="0 0 96 96"><path d="M12 76V34M12 60h72v16M84 60v-8a12 12 0 0 0-12-12H46v20" /><circle className="cd-i" style={{ animation: 'cdBreath 3s ease-in-out infinite' }} cx="28" cy="48" r="7" /></svg>,
  <svg viewBox="0 0 96 96"><g className="cd-i" style={{ animation: 'cdWalk 1.6s ease-in-out infinite' }}><circle cx="52" cy="18" r="7" /><path d="M40 84l9-25 11 9v16M49 59l3-21-14 7-6 12M52 38l9 10 11 4" /></g></svg>,
  <svg viewBox="0 0 96 96"><path d="M48 12l28 12v22c0 18-12 31-28 38-16-7-28-20-28-38V24z" /><path d="M36 48l9 9 17-18" pathLength="1" strokeDasharray="1" style={{ animation: 'cdTick 3s cubic-bezier(.22,1,.36,1) infinite' }} /></svg>,
];

const CARDS = ['Menos dor e menos sangramento', 'Internação mais curta', 'Volta mais rápida à rotina', 'Mais cuidado com as estruturas ao redor'];

export default function CardDeal({ cards = CARDS }) {
  const grid = useRef(null), refs = useRef([]);
  useEffect(() => {
    let from = [], raf = 0;
    const measure = () => {
      refs.current.forEach((c) => { c.style.transform = 'none'; });
      const g = grid.current.getBoundingClientRect();
      from = refs.current.map((c, i) => {
        const r = c.getBoundingClientRect();
        return [g.left + g.width / 2 - (r.left + r.width / 2), g.top + g.height / 2 - (r.top + r.height / 2), (i % 2 ? 1 : -1) * (6 + i * 3)];
      });
    };
    const update = () => {
      raf = 0;
      const vh = innerHeight, top = grid.current.getBoundingClientRect().top;
      const g = Math.min(1, Math.max(0, (vh * 0.9 - top) / (vh * 0.7)));
      refs.current.forEach((c, i) => {
        const k = Math.min(1, Math.max(0, g * 1.6 - i * 0.2)), inv = Math.pow(1 - k, 3), f = from[i];
        c.style.transform = 'translate3d(' + (f[0] * inv).toFixed(1) + 'px,' + (f[1] * inv).toFixed(1) + 'px,0) rotate(' + (f[2] * inv).toFixed(2) + 'deg) scale(' + (1 - inv * 0.12).toFixed(4) + ')';
        c.style.zIndex = String(10 - i);
        c.dataset.set = k >= 1 ? '1' : '';
      });
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(update); };
    const rs = () => { measure(); update(); };
    measure(); update();
    addEventListener('scroll', go, { passive: true });
    addEventListener('resize', rs);
    return () => { removeEventListener('scroll', go); removeEventListener('resize', rs); cancelAnimationFrame(raf); };
  }, [cards.length]);

  return (
    <section className="bg-[#283838] px-6 py-20">
      <style>{CSS}</style>
      <div ref={grid} className="mx-auto grid max-w-[1000px] gap-[18px] md:grid-cols-2">
        {cards.map((t, i) => (
          <article key={i} ref={(el) => (refs.current[i] = el)} className="relative grid min-h-[clamp(130px,16vh,180px)] grid-cols-[56px_1fr] items-center gap-5 rounded-[32px] border border-[rgba(226,202,124,.22)] bg-[#2F4242] p-[clamp(24px,2.6vw,34px)] will-change-transform transition-[border-color,background-color] duration-500 hover:border-[#E2CA7C] hover:bg-[#34494A] data-[set='1']:border-[rgba(226,202,124,.55)] md:grid-cols-[auto_1fr] md:gap-6 [&_svg]:w-[clamp(56px,6vw,84px)] [&_svg]:overflow-visible [&_svg]:fill-none [&_svg]:stroke-[#E2CA7C] [&_svg]:stroke-[2.2] [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]">
            {ICONS[i % ICONS.length]}
            <p className="text-[clamp(17px,1.6vw,21px)] font-semibold leading-[1.4] text-white">{t}</p>
          </article>
        ))}
      </div>
    </section>
  );
}`,
      tailwind: `<style>
  @keyframes cdDrop{0%,100%{transform:translateY(-4px) scale(1)}50%{transform:translateY(4px) scale(.88)}}
  @keyframes cdWalk{0%,100%{transform:translateX(-5px) rotate(-3deg)}50%{transform:translateX(5px) rotate(3deg)}}
  @keyframes cdTick{0%{stroke-dashoffset:1}35%,75%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}}
  .cd-i{transform-box:fill-box;transform-origin:center}
  .cd-card svg{width:clamp(56px,6vw,84px);overflow:visible;fill:none;stroke:#E2CA7C;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
  .cd-card.is-set{border-color:rgba(226,202,124,.55)}
</style>
<section class="bg-[#283838] px-6 py-20">
  <div class="cd-grid mx-auto grid max-w-[1000px] gap-[18px] md:grid-cols-2">
    <article class="cd-card grid grid-cols-[auto_1fr] items-center gap-6 rounded-[32px] border border-[rgba(226,202,124,.22)] bg-[#2F4242] p-8 will-change-transform transition-colors hover:border-[#E2CA7C]"><svg viewBox="0 0 96 96"><path class="cd-i" style="animation:cdDrop 2.6s ease-in-out infinite" d="M48 14s22 24 22 40a22 22 0 0 1-44 0c0-16 22-40 22-40z"/></svg><p class="text-[19px] font-semibold text-white">Menos dor e menos sangramento</p></article>
    <article class="cd-card grid grid-cols-[auto_1fr] items-center gap-6 rounded-[32px] border border-[rgba(226,202,124,.22)] bg-[#2F4242] p-8 will-change-transform transition-colors hover:border-[#E2CA7C]"><svg viewBox="0 0 96 96"><g class="cd-i" style="animation:cdWalk 1.6s ease-in-out infinite"><circle cx="52" cy="18" r="7"/><path d="M40 84l9-25 11 9v16M49 59l3-21-14 7-6 12M52 38l9 10 11 4"/></g></svg><p class="text-[19px] font-semibold text-white">Volta mais rápida à rotina</p></article>
    <article class="cd-card grid grid-cols-[auto_1fr] items-center gap-6 rounded-[32px] border border-[rgba(226,202,124,.22)] bg-[#2F4242] p-8 will-change-transform transition-colors hover:border-[#E2CA7C]"><svg viewBox="0 0 96 96"><path d="M48 12l28 12v22c0 18-12 31-28 38-16-7-28-20-28-38V24z"/><path d="M36 48l9 9 17-18" pathLength="1" stroke-dasharray="1" style="animation:cdTick 3s ease infinite"/></svg><p class="text-[19px] font-semibold text-white">Mais cuidado com as estruturas ao redor</p></article>
  </div>
</section>
<script>
(function () {
  var grid = document.querySelector('.cd-grid'), cards = grid.querySelectorAll('.cd-card'), from = [], raf = 0;
  function measure() {
    cards.forEach(function (c) { c.style.transform = 'none'; });
    var g = grid.getBoundingClientRect();
    from = Array.prototype.map.call(cards, function (c, i) { var r = c.getBoundingClientRect(); return [g.left + g.width / 2 - (r.left + r.width / 2), g.top + g.height / 2 - (r.top + r.height / 2), (i % 2 ? 1 : -1) * (6 + i * 3)]; });
  }
  function update() {
    raf = 0;
    var g = Math.min(1, Math.max(0, (innerHeight * 0.9 - grid.getBoundingClientRect().top) / (innerHeight * 0.7)));
    cards.forEach(function (c, i) {
      var k = Math.min(1, Math.max(0, g * 1.6 - i * 0.2)), inv = Math.pow(1 - k, 3), f = from[i];
      c.style.transform = 'translate3d(' + f[0] * inv + 'px,' + f[1] * inv + 'px,0) rotate(' + f[2] * inv + 'deg) scale(' + (1 - inv * 0.12) + ')';
      c.style.zIndex = 10 - i; c.classList.toggle('is-set', k >= 1);
    });
  }
  addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  addEventListener('resize', function () { measure(); update(); });
  measure(); update();
})();
</script>`
    }
  },

  // 5 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-zigzag-route",
    name: "Caminho em Zigue-Zague Desenhado pela Rolagem",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "As etapas ficam em zigue-zague e um caminho curvo (Bézier calculado pelas posições reais dos números) as liga; a linha dourada se desenha conforme a rolagem e, ao chegar em cada número, ele escurece, cresce com mola e o card desliza para o lugar. Mostra o passo a passo como uma jornada guiada.",
    tags: ["SVG Path", "Scroll-driven", "Etapas", "Timeline", "Bézier"],
    defaultSection: "Como Funciona",
    previewType: "dm-route",
    tech: ["Tailwind CSS", "React", "SVG", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const STEPS = [
  { t: 'Consulta de avaliação', d: 'Analiso os seus exames e explico as opções de tratamento.' },
  { t: 'Planejamento', d: 'Definimos juntos o melhor momento e os próximos passos.' },
  { t: 'Cirurgia e acompanhamento', d: 'Realizo a cirurgia e acompanho a sua recuperação.' },
];

export default function ZigzagRoute({ steps = STEPS }) {
  const route = useRef(null), svg = useRef(null), bg = useRef(null), fg = useRef(null), refs = useRef([]);
  useEffect(() => {
    let at = [], raf = 0;
    const size = () => {
      const rr = route.current.getBoundingClientRect();
      const pts = refs.current.map((s) => { const d = s.querySelector('[data-dot]').getBoundingClientRect(); return [d.left + d.width / 2 - rr.left, d.top + d.height / 2 - rr.top]; });
      svg.current.setAttribute('viewBox', '0 0 ' + rr.width + ' ' + rr.height);
      let d = 'M' + pts[0][0] + ' ' + pts[0][1];
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i], my = (b[1] - a[1]) * 0.6;
        d += ' C' + a[0] + ' ' + (a[1] + my) + ' ' + b[0] + ' ' + (b[1] - my) + ' ' + b[0] + ' ' + b[1];
      }
      bg.current.setAttribute('d', d);
      fg.current.setAttribute('d', d);
      // fração do caminho em que cada etapa fica
      const total = fg.current.getTotalLength();
      at = [0];
      for (let k = 1; k < pts.length; k++) {
        let best = 0, bestD = 1e9;
        for (let L = at[k - 1] * total; L <= total; L += 4) {
          const q = fg.current.getPointAtLength(L), dd = Math.abs(q.x - pts[k][0]) + Math.abs(q.y - pts[k][1]);
          if (dd < bestD) { bestD = dd; best = L; }
        }
        at.push(best / total);
      }
    };
    const update = () => {
      raf = 0;
      const rr = route.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.62 - rr.top) / rr.height));
      fg.current.style.strokeDashoffset = String(1 - p);
      refs.current.forEach((s, i) => { s.dataset.on = p >= (at[i] || 0) - 0.01 && p > 0.001 ? '1' : ''; });
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(update); };
    const rs = () => { size(); update(); };
    size(); update();
    addEventListener('scroll', go, { passive: true });
    addEventListener('resize', rs);
    return () => { removeEventListener('scroll', go); removeEventListener('resize', rs); cancelAnimationFrame(raf); };
  }, [steps.length]);

  return (
    <section className="bg-white px-6 py-20">
      <div ref={route} className="relative mx-auto max-w-[980px]">
        <svg ref={svg} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible fill-none stroke-2 [stroke-linecap:round]">
          <path ref={bg} stroke="rgba(40,56,56,.13)" strokeDasharray="4 8" />
          <path ref={fg} stroke="#8A6D1F" pathLength="1" strokeDasharray="1" strokeDashoffset="1" />
        </svg>
        <ol className="relative grid gap-[clamp(44px,7vw,96px)]">
          {steps.map((s, i) => (
            <li key={i} ref={(el) => (refs.current[i] = el)} className={'group grid w-[88%] gap-3.5 md:w-[min(560px,100%)] md:grid-cols-[auto_1fr] md:items-center md:gap-7 ' + (i % 2 ? 'justify-self-end' : '')}>
              <span data-dot aria-hidden="true" className={'grid h-14 w-14 place-items-center rounded-full border-[1.5px] border-[rgba(40,56,56,.13)] bg-white text-[17px] font-bold text-[#3F6A57] transition-all duration-700 ease-[cubic-bezier(.34,1.56,.64,1)] group-data-[on=1]:scale-[1.08] group-data-[on=1]:border-[#283838] group-data-[on=1]:bg-[#283838] group-data-[on=1]:text-[#E2CA7C] md:h-[76px] md:w-[76px] md:text-[22px] ' + (i % 2 ? 'max-md:justify-self-end' : '')}>{String(i + 1).padStart(2, '0')}</span>
              <div className={'rounded-[22px] border border-[rgba(40,56,56,.13)] bg-white p-[clamp(24px,3vw,34px)] opacity-45 transition-all duration-700 group-data-[on=1]:translate-x-0 group-data-[on=1]:border-[rgba(138,109,31,.4)] group-data-[on=1]:opacity-100 ' + (i % 2 ? '-translate-x-6' : 'translate-x-6')}>
                <h3 className="text-[19px] font-bold text-[#283838]">{s.t}</h3>
                <p className="mt-2.5 text-[#4B5563]">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}`,
      tailwind: `<style>
  .zz-step.is-on .zz-dot{background:#283838;border-color:#283838;color:#E2CA7C;transform:scale(1.08)}
  .zz-step.is-on .zz-card{opacity:1;transform:none;border-color:rgba(138,109,31,.4)}
</style>
<section class="bg-white px-6 py-20">
  <div class="zz-route relative mx-auto max-w-[980px]">
    <svg class="zz-svg pointer-events-none absolute inset-0 h-full w-full overflow-visible fill-none stroke-2" aria-hidden="true"><path class="zz-bg" stroke="rgba(40,56,56,.13)" stroke-dasharray="4 8"/><path class="zz-fg" stroke="#8A6D1F" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>
    <ol class="relative grid gap-[clamp(44px,7vw,96px)]">
      <li class="zz-step grid w-[min(560px,100%)] grid-cols-[auto_1fr] items-center gap-7"><span class="zz-dot grid h-[76px] w-[76px] place-items-center rounded-full border-[1.5px] border-[rgba(40,56,56,.13)] bg-white text-[22px] font-bold text-[#3F6A57] transition-all duration-700 ease-[cubic-bezier(.34,1.56,.64,1)]">01</span><div class="zz-card translate-x-6 rounded-[22px] border border-[rgba(40,56,56,.13)] p-8 opacity-45 transition-all duration-700"><h3 class="text-[19px] font-bold text-[#283838]">Consulta de avaliação</h3><p class="mt-2.5 text-[#4B5563]">Analiso os seus exames e explico as opções.</p></div></li>
      <li class="zz-step grid w-[min(560px,100%)] grid-cols-[auto_1fr] items-center gap-7 justify-self-end"><span class="zz-dot grid h-[76px] w-[76px] place-items-center rounded-full border-[1.5px] border-[rgba(40,56,56,.13)] bg-white text-[22px] font-bold text-[#3F6A57] transition-all duration-700 ease-[cubic-bezier(.34,1.56,.64,1)]">02</span><div class="zz-card -translate-x-6 rounded-[22px] border border-[rgba(40,56,56,.13)] p-8 opacity-45 transition-all duration-700"><h3 class="text-[19px] font-bold text-[#283838]">Planejamento</h3><p class="mt-2.5 text-[#4B5563]">Definimos juntos os próximos passos.</p></div></li>
      <li class="zz-step grid w-[min(560px,100%)] grid-cols-[auto_1fr] items-center gap-7"><span class="zz-dot grid h-[76px] w-[76px] place-items-center rounded-full border-[1.5px] border-[rgba(40,56,56,.13)] bg-white text-[22px] font-bold text-[#3F6A57] transition-all duration-700 ease-[cubic-bezier(.34,1.56,.64,1)]">03</span><div class="zz-card translate-x-6 rounded-[22px] border border-[rgba(40,56,56,.13)] p-8 opacity-45 transition-all duration-700"><h3 class="text-[19px] font-bold text-[#283838]">Cirurgia e acompanhamento</h3><p class="mt-2.5 text-[#4B5563]">Realizo a cirurgia e acompanho a recuperação.</p></div></li>
    </ol>
  </div>
</section>
<script>
(function () {
  var route = document.querySelector('.zz-route'), svg = route.querySelector('.zz-svg'), bg = route.querySelector('.zz-bg'), fg = route.querySelector('.zz-fg');
  var steps = route.querySelectorAll('.zz-step'), at = [], raf = 0;
  function size() {
    var rr = route.getBoundingClientRect();
    var pts = Array.prototype.map.call(steps, function (s) { var d = s.querySelector('.zz-dot').getBoundingClientRect(); return [d.left + d.width / 2 - rr.left, d.top + d.height / 2 - rr.top]; });
    svg.setAttribute('viewBox', '0 0 ' + rr.width + ' ' + rr.height);
    var d = 'M' + pts[0][0] + ' ' + pts[0][1];
    for (var i = 1; i < pts.length; i++) { var a = pts[i - 1], b = pts[i], my = (b[1] - a[1]) * 0.6; d += ' C' + a[0] + ' ' + (a[1] + my) + ' ' + b[0] + ' ' + (b[1] - my) + ' ' + b[0] + ' ' + b[1]; }
    bg.setAttribute('d', d); fg.setAttribute('d', d);
    var total = fg.getTotalLength(); at = [0];
    for (var k = 1; k < pts.length; k++) {
      var best = 0, bd = 1e9;
      for (var L = at[k - 1] * total; L <= total; L += 4) { var q = fg.getPointAtLength(L), dd = Math.abs(q.x - pts[k][0]) + Math.abs(q.y - pts[k][1]); if (dd < bd) { bd = dd; best = L; } }
      at.push(best / total);
    }
  }
  function update() {
    raf = 0;
    var rr = route.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * 0.62 - rr.top) / rr.height));
    fg.style.strokeDashoffset = 1 - p;
    steps.forEach(function (s, i) { s.classList.toggle('is-on', p >= (at[i] || 0) - 0.01 && p > 0.001); });
  }
  addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  addEventListener('resize', function () { size(); update(); });
  size(); update();
})();
</script>`
    }
  },

  // 6 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-crossed-bands",
    name: "Faixas Cruzadas de Convênios",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    description: "Duas faixas inclinadas em sentidos opostos (verde-escuro e dourada) se cruzam entre seções, cada uma com um letreiro infinito correndo para um lado, com os nomes dos convênios separados por cruzes. Funciona como divisória cheia de energia e prova social.",
    tags: ["Marquee", "Divisória", "Loop Infinito", "Faixa Inclinada"],
    defaultSection: "Divisória / Convênios",
    previewType: "dm-bands",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `const CSS = '@keyframes bdRun{to{transform:translateX(-50%)}}' +
  '.bd-run{display:flex;width:max-content;animation:bdRun 40s linear infinite}' +
  '.bd-rev{animation-direction:reverse;animation-duration:46s}' +
  '@media (prefers-reduced-motion:reduce){.bd-run{animation:none}}';

const Cross = () => (
  <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] flex-none"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
);

function Run({ names, rev }) {
  const set = names.map((n, i) => (
    <span key={i} className="inline-flex items-center gap-[26px] whitespace-nowrap pr-[26px] text-sm font-semibold uppercase tracking-[.14em]">{n}<Cross /></span>
  ));
  return <div className={'bd-run' + (rev ? ' bd-rev' : '')}>{set}{set}</div>;
}

export default function CrossedBands({ names = ['TRE', 'Bradesco Saúde', 'Mediservice', 'SulAmérica', 'One Health', 'Porto Seguro', 'Omint Saúde', 'Amil'] }) {
  return (
    <div aria-hidden="true" className="relative h-[clamp(130px,15vw,190px)] overflow-hidden">
      <style>{CSS}</style>
      <div className="absolute -inset-x-[6%] top-1/2 z-[1] -translate-y-1/2 rotate-[2.6deg] overflow-hidden bg-[#283838] py-[15px] text-[#E2CA7C]">
        <Run names={names} />
      </div>
      <div className="absolute -inset-x-[6%] top-1/2 -translate-y-1/2 -rotate-2 overflow-hidden bg-[#E2CA7C] py-[15px] text-[#283838]">
        <Run names={names.slice().reverse()} rev />
      </div>
    </div>
  );
}`,
      tailwind: `<style>
  @keyframes bdRun{to{transform:translateX(-50%)}}
  .bd-run{display:flex;width:max-content;animation:bdRun 40s linear infinite}
  .bd-rev{animation-direction:reverse;animation-duration:46s}
  .bd-item{display:inline-flex;align-items:center;gap:26px;padding-right:26px;white-space:nowrap;font-size:14px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
  .bd-item svg{width:15px;height:15px}
</style>
<div class="relative h-[clamp(130px,15vw,190px)] overflow-hidden" aria-hidden="true">
  <div class="absolute -inset-x-[6%] top-1/2 z-[1] -translate-y-1/2 rotate-[2.6deg] overflow-hidden bg-[#283838] py-[15px] text-[#E2CA7C]"><div class="bd-run" data-band></div></div>
  <div class="absolute -inset-x-[6%] top-1/2 -translate-y-1/2 -rotate-2 overflow-hidden bg-[#E2CA7C] py-[15px] text-[#283838]"><div class="bd-run bd-rev" data-band="rev"></div></div>
</div>
<script>
(function () {
  var names = ['TRE', 'Bradesco Saúde', 'Mediservice', 'SulAmérica', 'One Health', 'Porto Seguro', 'Amil'];
  var cross = '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  document.querySelectorAll('[data-band]').forEach(function (run) {
    var list = run.dataset.band ? names.slice().reverse() : names;
    var set = list.map(function (n) { return '<span class="bd-item">' + n + cross + '</span>'; }).join('');
    run.innerHTML = set + set;
  });
})();
</script>`
    }
  },

  // 7 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-flip-card-3d",
    name: "Cartão 3D de Convênios que Gira e Vira",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Um cartão no formato de carteirinha (com chip dourado) chega girando com a rolagem e assenta; inclina em 3D seguindo o mouse com um brilho que acompanha o cursor, e vira no botão para mostrar o verso com os planos de reembolso. As pílulas caem uma a uma com mola. Tátil e memorável.",
    tags: ["3D Flip", "Tilt", "Glare", "Scroll-driven", "Pílulas"],
    defaultSection: "Convênios",
    previewType: "dm-flip-card",
    tech: ["Tailwind CSS", "React", "CSS 3D", "Pointer Events"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const EASE = 'cubic-bezier(.22,1,.36,1)';

function Pills({ items, soft, on }) {
  return (
    <ul className="flex flex-wrap gap-[7px]">
      {items.map((t, k) => (
        <li key={t} className={'rounded-full border px-[13px] py-[7px] text-[13px] font-semibold ' + (soft ? 'border-[rgba(40,56,56,.15)] bg-white/65 text-[#283838]' : 'border-[rgba(226,202,124,.35)] bg-white/10 text-white')}
          style={{ opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(-24px)', transition: 'opacity .4s ' + EASE + ' ' + (k * 0.07 + 0.4) + 's, transform .8s cubic-bezier(.34,1.56,.64,1) ' + (k * 0.07 + 0.4) + 's' }}>{t}</li>
      ))}
    </ul>
  );
}

export default function FlipCard3D({ front = ['TRE', 'Bradesco Saúde', 'Mediservice', 'SulAmérica'], back = ['One Health', 'Porto Seguro', 'Omint Saúde', 'Seguros Unimed', 'Amil'] }) {
  const wrap = useRef(null);
  const [flip, setFlip] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 30, gy: 20 });
  const [spin, setSpin] = useState({ s: -40, l: 18 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = wrap.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.75)));
      const e = 1 - Math.pow(1 - p, 3);
      setSpin({ s: (1 - e) * -40, l: (1 - e) * 18 });
      setOn(r.top < innerHeight * 0.88 && r.bottom > 0);
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', go, { passive: true });
    return () => { removeEventListener('scroll', go); cancelAnimationFrame(raf); };
  }, []);

  const move = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    setTilt({ x: (0.5 - py) * 14, y: (px - 0.5) * 18, gx: px * 100, gy: py * 100 });
  };
  const glare = { background: 'radial-gradient(320px circle at ' + tilt.gx + '% ' + tilt.gy + '%,rgba(255,255,255,.22),transparent 60%)', mixBlendMode: 'soft-light' };

  return (
    <div ref={wrap} className="grid justify-items-center gap-5 [perspective:1400px]">
      <div onPointerMove={move} onPointerLeave={() => setTilt((t) => ({ ...t, x: 0, y: 0 }))} className="w-[min(470px,100%)] [transform-style:preserve-3d]" style={{ transform: 'rotateX(' + tilt.x + 'deg) rotateY(' + tilt.y + 'deg)', transition: 'transform .5s ' + EASE }}>
        <div className="relative aspect-[1.586] min-h-[230px] [transform-style:preserve-3d]" style={{ transform: 'rotateY(' + ((flip ? 180 : 0) + spin.s) + 'deg) rotateX(' + spin.l + 'deg)', transition: 'transform 1.1s ' + EASE }}>
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-[rgba(226,202,124,.35)] bg-[linear-gradient(135deg,#3F6A57,#283838_55%,#1E2B2B)] p-6 text-white [backface-visibility:hidden]">
            <div className="mb-auto flex items-center justify-between">
              <span aria-hidden="true" className="h-[34px] w-[46px] rounded-[7px] bg-[linear-gradient(135deg,#F4EACB,#C9AE5D)]" />
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[34px] w-[34px] rounded-full border-[1.5px] border-[#E2CA7C] p-[7px] text-[#E2CA7C]"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </div>
            <p className="mb-2.5 mt-4 text-[11.5px] font-bold uppercase tracking-[.2em] text-[#E2CA7C]">Convênios</p>
            <Pills items={front} on={on} />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={glare} />
          </div>
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-[#E2CA7C] bg-[linear-gradient(135deg,#F4EACB,#EADBA8)] p-6 text-[#283838] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span aria-hidden="true" className="absolute inset-x-0 top-[22px] h-10 bg-[#283838] opacity-90" />
            <p className="mb-2.5 mt-auto text-[11.5px] font-bold uppercase tracking-[.2em] text-[#3F6A57]">Reembolso</p>
            <Pills items={back} soft on={on} />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={glare} />
          </div>
        </div>
      </div>
      <button type="button" aria-pressed={flip} onClick={() => setFlip((f) => !f)} className="relative inline-flex min-h-12 w-[min(470px,100%)] items-center justify-center rounded-full border border-[rgba(40,56,56,.13)] bg-white pl-[6px] pr-[46px] text-sm font-semibold text-[#283838] transition-colors hover:border-[#283838]">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute left-1.5 top-1/2 -mt-[18px] h-9 w-9 rounded-full bg-[#283838] p-[9px] text-[#E2CA7C] transition-transform duration-500" style={{ transform: flip ? 'rotate(180deg)' : 'none' }}><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span>{flip ? 'Ver convênios' : 'Ver planos de reembolso'}</span>
      </button>
    </div>
  );
}`,
      tailwind: `<style>
  .fc-tilt{transform-style:preserve-3d;transform:rotateX(var(--tx,0deg)) rotateY(var(--ty,0deg));transition:transform .5s cubic-bezier(.22,1,.36,1)}
  .fc-in{transform-style:preserve-3d;transform:rotateY(calc(var(--flip,0) * 180deg + var(--spin,0deg))) rotateX(var(--lean,0deg));transition:transform 1.1s cubic-bezier(.22,1,.36,1)}
  .fc-face{backface-visibility:hidden;-webkit-backface-visibility:hidden}
  .fc-glare{position:absolute;inset:0;pointer-events:none;background:radial-gradient(320px circle at var(--gx,30%) var(--gy,20%),rgba(255,255,255,.22),transparent 60%);mix-blend-mode:soft-light}
  .fc li{opacity:0;transform:translateY(-24px)}
  .fc.is-in li{opacity:1;transform:none;transition:opacity .4s calc(var(--k) * 70ms + .4s),transform .8s cubic-bezier(.34,1.56,.64,1) calc(var(--k) * 70ms + .4s)}
</style>
<div class="fc grid justify-items-center gap-5 [perspective:1400px]">
  <div class="fc-tilt w-[min(470px,100%)]">
    <div class="fc-in relative aspect-[1.586] min-h-[230px]">
      <div class="fc-face absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-[rgba(226,202,124,.35)] bg-[linear-gradient(135deg,#3F6A57,#283838_55%,#1E2B2B)] p-6 text-white">
        <div class="mb-auto flex items-center justify-between"><span class="h-[34px] w-[46px] rounded-[7px] bg-[linear-gradient(135deg,#F4EACB,#C9AE5D)]"></span></div>
        <p class="mb-2.5 mt-4 text-[11.5px] font-bold uppercase tracking-[.2em] text-[#E2CA7C]">Convênios</p>
        <ul class="flex flex-wrap gap-[7px] [&>li]:rounded-full [&>li]:border [&>li]:border-[rgba(226,202,124,.35)] [&>li]:bg-white/10 [&>li]:px-[13px] [&>li]:py-[7px] [&>li]:text-[13px] [&>li]:font-semibold"><li>TRE</li><li>Bradesco Saúde</li><li>Mediservice</li><li>SulAmérica</li></ul>
        <span class="fc-glare"></span>
      </div>
      <div class="fc-face absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-[#E2CA7C] bg-[linear-gradient(135deg,#F4EACB,#EADBA8)] p-6 text-[#283838] [transform:rotateY(180deg)]">
        <span class="absolute inset-x-0 top-[22px] h-10 bg-[#283838] opacity-90"></span>
        <p class="mb-2.5 mt-auto text-[11.5px] font-bold uppercase tracking-[.2em] text-[#3F6A57]">Reembolso</p>
        <ul class="flex flex-wrap gap-[7px] [&>li]:rounded-full [&>li]:border [&>li]:border-[rgba(40,56,56,.15)] [&>li]:bg-white/65 [&>li]:px-[13px] [&>li]:py-[7px] [&>li]:text-[13px] [&>li]:font-semibold"><li>One Health</li><li>Porto Seguro</li><li>Omint Saúde</li><li>Amil</li></ul>
        <span class="fc-glare"></span>
      </div>
    </div>
  </div>
  <button type="button" class="fc-flip inline-flex min-h-12 items-center gap-3 rounded-full border border-[rgba(40,56,56,.13)] bg-white py-1.5 pl-1.5 pr-5 text-sm font-semibold text-[#283838]" aria-pressed="false"><svg viewBox="0 0 24 24" class="h-9 w-9 rounded-full bg-[#283838] p-[9px] text-[#E2CA7C] transition-transform duration-500"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span>Ver planos de reembolso</span></button>
</div>
<script>
(function () {
  var fc = document.querySelector('.fc'), tilt = fc.querySelector('.fc-tilt'), inn = fc.querySelector('.fc-in'), btn = fc.querySelector('.fc-flip'), flipped = false;
  fc.querySelectorAll('li').forEach(function (li, k) { li.style.setProperty('--k', k % 5); });
  btn.addEventListener('click', function () {
    flipped = !flipped; inn.style.setProperty('--flip', flipped ? 1 : 0);
    btn.setAttribute('aria-pressed', flipped); btn.querySelector('svg').style.transform = flipped ? 'rotate(180deg)' : '';
    btn.querySelector('span').textContent = flipped ? 'Ver convênios' : 'Ver planos de reembolso';
  });
  tilt.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    var r = tilt.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    tilt.style.setProperty('--ty', (px - 0.5) * 18 + 'deg'); tilt.style.setProperty('--tx', (0.5 - py) * 14 + 'deg');
    fc.querySelectorAll('.fc-glare').forEach(function (g) { g.style.setProperty('--gx', px * 100 + '%'); g.style.setProperty('--gy', py * 100 + '%'); });
  });
  tilt.addEventListener('pointerleave', function () { tilt.style.setProperty('--ty', '0deg'); tilt.style.setProperty('--tx', '0deg'); });
  function update() {
    var r = fc.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.75))), e = 1 - Math.pow(1 - p, 3);
    inn.style.setProperty('--spin', (1 - e) * -40 + 'deg'); inn.style.setProperty('--lean', (1 - e) * 18 + 'deg');
    fc.classList.toggle('is-in', r.top < innerHeight * 0.88 && r.bottom > 0);
  }
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true });
  update();
})();
</script>`
    }
  },

  // 8 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-bleed-testimonials",
    name: "Depoimentos que Vazam pela Tela e Inclinam na Rolagem",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "A fileira de depoimentos vaza pela direita da tela e desliza para a esquerda conforme a seção passa; os cards inclinam de leve com a velocidade da rolagem, dá para arrastar com mouse/dedo e andar com setas. Cards alternam branco, verde-escuro e dourado claro. Dinâmico sem virar carrossel comum.",
    tags: ["Carrossel", "Scroll-driven", "Drag", "Velocidade", "Depoimentos"],
    defaultSection: "Depoimentos",
    previewType: "dm-bleed",
    tech: ["Tailwind CSS", "React", "Pointer Events", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const QUOTES = [
  { t: 'Excelente profissional, explica tudo com calma. Só gratidão.', n: 'Paciente 1' },
  { t: 'Atendimento de muita qualidade e humano, desde a recepção.', n: 'Paciente 2' },
  { t: 'Médico atencioso, explica tudo com muita didática.', n: 'Paciente 3' },
  { t: 'Extremamente profissional, atencioso e paciente.', n: 'Paciente 4' },
  { t: 'Acolhimento qualificado e consulta focada no paciente.', n: 'Paciente 5' },
];
const SKIN = ['bg-white border-[rgba(40,56,56,.13)] text-[#111827]', 'bg-[#283838] border-[#283838] text-white', 'bg-[#F4EACB] border-[#EADBA8] text-[#111827]'];

export default function BleedTestimonials({ quotes = QUOTES }) {
  const wrap = useRef(null), track = useRef(null), prev = useRef(null), next = useRef(null);

  useEffect(() => {
    const tr = track.current;
    let over = 0, drag = 0, lastY = scrollY, vel = 0, raf = 0, start = null, base = 0;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const size = () => { over = Math.max(0, tr.scrollWidth - innerWidth + 24); };
    const update = () => {
      raf = 0;
      const vw = innerWidth, r = wrap.current.getBoundingClientRect();
      const bp = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1);
      const min = -over - 40, max = vw * 0.25;
      const x = clamp(vw * 0.18 * (1 - bp * 2) - bp * Math.min(over, vw * 0.5) + drag, min, max);
      tr.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';
      prev.current.disabled = x >= Math.min(max, 0) - 2;
      next.current.disabled = x <= min + 2;
      vel += (clamp((scrollY - lastY) * 0.08, -4, 4) - vel) * 0.3;
      lastY = scrollY;
      tr.style.setProperty('--qr', (-vel * 0.6).toFixed(2) + 'deg');
      if (Math.abs(vel) > 0.05) go();
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(update); };
    const step = (dir) => () => { const q = tr.firstElementChild; drag = clamp(drag - dir * (q.offsetWidth + 22), -over - innerWidth, over + innerWidth); update(); };
    const p = step(-1), n = step(1);
    const down = (e) => { start = e.clientX; base = drag; tr.setPointerCapture(e.pointerId); };
    const move = (e) => { if (start === null) return; tr.style.transition = 'none'; drag = clamp(base + e.clientX - start, -over - innerWidth, over + innerWidth); update(); };
    const up = () => { start = null; tr.style.transition = ''; };
    const rs = () => { size(); update(); };
    prev.current.addEventListener('click', p);
    next.current.addEventListener('click', n);
    tr.addEventListener('pointerdown', down);
    tr.addEventListener('pointermove', move);
    tr.addEventListener('pointerup', up);
    tr.addEventListener('pointercancel', up);
    addEventListener('scroll', go, { passive: true });
    addEventListener('resize', rs);
    size(); update();
    return () => {
      prev.current && prev.current.removeEventListener('click', p);
      next.current && next.current.removeEventListener('click', n);
      removeEventListener('scroll', go); removeEventListener('resize', rs); cancelAnimationFrame(raf);
    };
  }, [quotes.length]);

  const arrow = 'grid h-[52px] w-[52px] place-items-center rounded-full border-[1.5px] border-[#283838] bg-white text-[#283838] transition-colors hover:bg-[#283838] hover:text-[#E2CA7C] disabled:cursor-default disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#283838]';
  const Arrow = ({ flip }) => <svg viewBox="0 0 24 24" className="h-5 w-5" style={flip ? { transform: 'scaleX(-1)' } : null}><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-end justify-between gap-6 px-6">
        <h2 className="max-w-[20ch] text-[clamp(23px,2.6vw,34px)] font-bold leading-[1.22] text-[#283838]">O que pacientes dizem sobre o atendimento</h2>
        <div className="flex gap-2.5">
          <button ref={prev} type="button" aria-label="Anteriores" className={arrow}><Arrow flip /></button>
          <button ref={next} type="button" aria-label="Próximos" className={arrow}><Arrow /></button>
        </div>
      </div>
      <div ref={wrap} className="mt-10 overflow-hidden py-3.5">
        <ul ref={track} tabIndex={0} aria-label="Depoimentos" className="flex w-max cursor-grab touch-pan-y select-none gap-[22px] pl-[max(24px,calc((100vw-1160px)/2+24px))] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] active:cursor-grabbing">
          {quotes.map((q, i) => (
            <li key={i} className={'grid min-h-[270px] w-[min(480px,82vw)] flex-none content-start gap-[18px] rounded-[32px] border p-[clamp(28px,3vw,40px)] [transform:rotate(var(--qr,0deg))] transition-[transform,border-color] duration-500 hover:-translate-y-2 hover:border-[#8A6D1F] ' + SKIN[i % 3]}>
              <svg viewBox="0 0 32 32" aria-hidden="true" className={'h-11 w-11 ' + (i % 3 === 1 ? 'text-[#E2CA7C]' : 'text-[#8A6D1F]')}><path d="M13 9H8a3 3 0 0 0-3 3v5a2 2 0 0 0 2 2h4v1.5A3.5 3.5 0 0 1 7.5 24M27 9h-5a3 3 0 0 0-3 3v5a2 2 0 0 0 2 2h4v1.5a3.5 3.5 0 0 1-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <p className="text-[clamp(16px,1.4vw,18px)]">{q.t}</p>
              <cite className={'self-end text-[15px] font-bold not-italic ' + (i % 3 === 1 ? 'text-[#E2CA7C]' : 'text-[#8A6D1F]')}>{q.n}</cite>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}`,
      tailwind: `<section class="bg-white py-20">
  <div class="mx-auto flex max-w-[1160px] flex-wrap items-end justify-between gap-6 px-6">
    <h2 class="max-w-[20ch] text-[clamp(23px,2.6vw,34px)] font-bold text-[#283838]">O que pacientes dizem</h2>
    <div class="flex gap-2.5">
      <button class="bl-go grid h-[52px] w-[52px] place-items-center rounded-full border-[1.5px] border-[#283838] text-[#283838] hover:bg-[#283838] hover:text-[#E2CA7C] disabled:opacity-30" data-go="-1" aria-label="Anteriores"><svg viewBox="0 0 24 24" class="h-5 w-5 -scale-x-100"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
      <button class="bl-go grid h-[52px] w-[52px] place-items-center rounded-full border-[1.5px] border-[#283838] text-[#283838] hover:bg-[#283838] hover:text-[#E2CA7C] disabled:opacity-30" data-go="1" aria-label="Próximos"><svg viewBox="0 0 24 24" class="h-5 w-5"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
    </div>
  </div>
  <div class="bl-wrap mt-10 overflow-hidden py-3.5">
    <ul class="bl-track flex w-max cursor-grab touch-pan-y select-none gap-[22px] pl-6 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] [&>li]:[transform:rotate(var(--qr,0deg))]">
      <li class="grid min-h-[270px] w-[min(480px,82vw)] flex-none gap-[18px] rounded-[32px] border border-[rgba(40,56,56,.13)] bg-white p-10 transition-transform hover:-translate-y-2"><p>Excelente profissional, explica tudo com calma.</p><cite class="self-end font-bold not-italic text-[#8A6D1F]">Paciente 1</cite></li>
      <li class="grid min-h-[270px] w-[min(480px,82vw)] flex-none gap-[18px] rounded-[32px] bg-[#283838] p-10 text-white transition-transform hover:-translate-y-2"><p>Atendimento de muita qualidade e humano.</p><cite class="self-end font-bold not-italic text-[#E2CA7C]">Paciente 2</cite></li>
      <li class="grid min-h-[270px] w-[min(480px,82vw)] flex-none gap-[18px] rounded-[32px] bg-[#F4EACB] p-10 transition-transform hover:-translate-y-2"><p>Médico atencioso, explica com didática.</p><cite class="self-end font-bold not-italic text-[#8A6D1F]">Paciente 3</cite></li>
      <li class="grid min-h-[270px] w-[min(480px,82vw)] flex-none gap-[18px] rounded-[32px] border border-[rgba(40,56,56,.13)] bg-white p-10 transition-transform hover:-translate-y-2"><p>Extremamente profissional e paciente.</p><cite class="self-end font-bold not-italic text-[#8A6D1F]">Paciente 4</cite></li>
    </ul>
  </div>
</section>
<script>
(function () {
  var wrap = document.querySelector('.bl-wrap'), tr = wrap.firstElementChild, btns = document.querySelectorAll('.bl-go');
  var over = 0, drag = 0, lastY = scrollY, vel = 0, raf = 0, start = null, base = 0;
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function size() { over = Math.max(0, tr.scrollWidth - innerWidth + 24); }
  function update() {
    raf = 0;
    var vw = innerWidth, r = wrap.getBoundingClientRect(), bp = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1);
    var min = -over - 40, max = vw * 0.25, x = clamp(vw * 0.18 * (1 - bp * 2) - bp * Math.min(over, vw * 0.5) + drag, min, max);
    tr.style.transform = 'translate3d(' + x + 'px,0,0)';
    btns[0].disabled = x >= Math.min(max, 0) - 2; btns[1].disabled = x <= min + 2;
    vel += (clamp((scrollY - lastY) * 0.08, -4, 4) - vel) * 0.3; lastY = scrollY;
    tr.style.setProperty('--qr', (-vel * 0.6) + 'deg');
    if (Math.abs(vel) > 0.05) go();
  }
  function go() { if (!raf) raf = requestAnimationFrame(update); }
  btns.forEach(function (b) { b.addEventListener('click', function () { drag = clamp(drag - b.dataset.go * (tr.firstElementChild.offsetWidth + 22), -over - innerWidth, over + innerWidth); update(); }); });
  tr.addEventListener('pointerdown', function (e) { start = e.clientX; base = drag; tr.setPointerCapture(e.pointerId); });
  tr.addEventListener('pointermove', function (e) { if (start === null) return; tr.style.transition = 'none'; drag = clamp(base + e.clientX - start, -over - innerWidth, over + innerWidth); update(); });
  ['pointerup', 'pointercancel'].forEach(function (t) { tr.addEventListener(t, function () { start = null; tr.style.transition = ''; }); });
  addEventListener('scroll', go, { passive: true });
  addEventListener('resize', function () { size(); update(); });
  size(); update();
})();
</script>`
    }
  },

  // 9 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-blinds-photo",
    name: "Foto que Abre em Persianas Alternadas",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    description: "Seis lâminas verde-escuras cobrem a foto e recolhem em cascata, alternando para a direita e para a esquerda, quando a foto entra na tela; ao mesmo tempo a imagem faz um zoom-out suave guiado pela rolagem. Revela o retrato com elegância de cortina.",
    tags: ["Reveal", "Persiana", "Stagger", "Zoom", "Foto"],
    defaultSection: "Sobre / Bio",
    previewType: "dm-blinds-photo",
    tech: ["Tailwind CSS", "React", "CSS Transitions", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export default function BlindsPhoto({ src = '/foto.webp', alt = 'Retrato do profissional', blinds = 6 }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1.2);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOpen(true); else setOpen(false); }, { threshold: 0.12 });
    io.observe(ref.current);
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = ref.current.getBoundingClientRect();
      setZoom(1.2 - Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.9))) * 0.2);
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', go, { passive: true });
    return () => { io.disconnect(); removeEventListener('scroll', go); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover [object-position:50%_40%]" style={{ transform: 'scale(' + zoom.toFixed(4) + ')' }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col motion-reduce:hidden">
        {Array.from({ length: blinds }).map((_, i) => (
          <i key={i} className="-mb-px flex-1 bg-[#283838]" style={{ transformOrigin: i % 2 ? 'left' : 'right', transform: open ? 'scaleX(0)' : 'none', transition: 'transform 1.1s cubic-bezier(.7,0,.2,1) ' + i * 0.07 + 's' }} />
        ))}
      </span>
    </div>
  );
}`,
      tailwind: `<style>
  .bp i{flex:1;margin-bottom:-1px;background:#283838;transform-origin:right;transition:transform 1.1s cubic-bezier(.7,0,.2,1);transition-delay:calc(var(--i) * 70ms)}
  .bp i:nth-child(2n){transform-origin:left}
  .bp.is-in i{transform:scaleX(0)}
  @media (prefers-reduced-motion:reduce){.bp-blinds{display:none}}
</style>
<div class="bp relative aspect-[4/5] overflow-hidden rounded-[32px]">
  <img class="bp-img h-full w-full object-cover" src="/foto.webp" alt="Retrato do profissional" loading="lazy">
  <span class="bp-blinds pointer-events-none absolute inset-0 flex flex-col" aria-hidden="true"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></span>
</div>
<script>
(function () {
  var el = document.querySelector('.bp'), img = el.querySelector('.bp-img');
  new IntersectionObserver(function (es) { el.classList.toggle('is-in', es[0].isIntersecting); }, { threshold: 0.12 }).observe(el);
  function update() { var r = el.getBoundingClientRect(); img.style.transform = 'scale(' + (1.2 - Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.9))) * 0.2) + ')'; }
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true });
  update();
})();
</script>`
    }
  },

  // 10 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-lit-timeline",
    name: "Linha do Tempo que Acende com a Rolagem",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    description: "Uma linha vertical dourada desce pela lista de formação acompanhando a rolagem e, ao passar por cada marcador, ele se preenche e cresce com efeito mola. Transforma um currículo em uma trajetória que avança diante do leitor.",
    tags: ["Timeline", "Scroll-driven", "Currículo", "Progresso"],
    defaultSection: "Sobre / Formação",
    previewType: "dm-timeline",
    tech: ["Tailwind CSS", "React", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const ITEMS = [
  'Graduação em Medicina e residência pela USP',
  'Pós-graduação no Hospital Israelita Albert Einstein',
  'Certificação na plataforma da Vinci',
  'Observership no Memorial Sloan Kettering, Nova York',
];

export default function LitTimeline({ items = ITEMS }) {
  const ol = useRef(null), refs = useRef([]);
  const [pp, setPp] = useState(0);
  const [lit, setLit] = useState([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = innerHeight * 0.7, r = ol.current.getBoundingClientRect();
      setPp(Math.min(1, Math.max(0, (line - r.top) / r.height)));
      setLit(refs.current.map((li) => li.getBoundingClientRect().top + 14 < line));
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', go, { passive: true });
    addEventListener('resize', go);
    return () => { removeEventListener('scroll', go); removeEventListener('resize', go); cancelAnimationFrame(raf); };
  }, []);

  return (
    <ol ref={ol} className="relative my-7">
      <span aria-hidden="true" className="absolute bottom-2.5 left-[11px] top-2.5 w-0.5 bg-[rgba(40,56,56,.13)]" />
      <span aria-hidden="true" className="absolute left-[11px] top-2.5 w-0.5 bg-[#8A6D1F]" style={{ height: 'calc((100% - 20px) * ' + pp.toFixed(4) + ')' }} />
      {items.map((t, i) => (
        <li key={i} ref={(el) => (refs.current[i] = el)} className="relative py-3 pl-11 font-medium text-[#283838]">
          <span aria-hidden="true" className={'absolute left-1 top-[19px] h-4 w-4 rounded-full border-2 border-[#8A6D1F] transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] ' + (lit[i] ? 'scale-[1.2] bg-[#8A6D1F]' : 'bg-white')} />
          {t}
        </li>
      ))}
    </ol>
  );
}`,
      tailwind: `<style>
  .lt{position:relative}
  .lt::before{content:"";position:absolute;left:11px;top:10px;bottom:10px;width:2px;background:rgba(40,56,56,.13)}
  .lt::after{content:"";position:absolute;left:11px;top:10px;width:2px;height:calc((100% - 20px) * var(--pp,0));background:#8A6D1F}
  .lt li::before{content:"";position:absolute;left:4px;top:19px;width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid #8A6D1F;transition:background-color .4s,transform .5s cubic-bezier(.34,1.56,.64,1)}
  .lt li.is-lit::before{background:#8A6D1F;transform:scale(1.2)}
</style>
<ol class="lt my-7">
  <li class="relative py-3 pl-11 font-medium text-[#283838]">Graduação em Medicina e residência pela USP</li>
  <li class="relative py-3 pl-11 font-medium text-[#283838]">Pós-graduação no Hospital Albert Einstein</li>
  <li class="relative py-3 pl-11 font-medium text-[#283838]">Certificação na plataforma da Vinci</li>
  <li class="relative py-3 pl-11 font-medium text-[#283838]">Observership no Memorial Sloan Kettering</li>
</ol>
<script>
(function () {
  var ol = document.querySelector('.lt'), lis = ol.querySelectorAll('li');
  function update() {
    var line = innerHeight * 0.7, r = ol.getBoundingClientRect();
    ol.style.setProperty('--pp', Math.min(1, Math.max(0, (line - r.top) / r.height)));
    lis.forEach(function (li) { li.classList.toggle('is-lit', li.getBoundingClientRect().top + 14 < line); });
  }
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true });
  update();
})();
</script>`
    }
  },

  // 11 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-scrub-words",
    name: "Frase que Acende Palavra por Palavra",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    description: "Uma frase de compromisso começa apagada e desfocada; conforme a rolagem avança, as palavras acendem uma a uma, e as três últimas ganham cor de destaque. O leitor literalmente \"lê junto\" com a rolagem, o que dá peso à promessa.",
    tags: ["Scroll Scrub", "Blur", "Citação", "Palavra a Palavra"],
    defaultSection: "Sobre / Promessa",
    previewType: "dm-scrub",
    tech: ["Tailwind CSS", "React", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export default function ScrubWords({ text = 'O meu compromisso com você é explicar o seu caso com clareza e decidir o tratamento junto com você.', accentLast = 3 }) {
  const ref = useRef(null);
  const words = text.split(' ');
  const [on, setOn] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = ref.current.getBoundingClientRect(), vh = innerHeight;
      setOn(Math.round(Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.3))) * words.length));
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', go, { passive: true });
    return () => { removeEventListener('scroll', go); cancelAnimationFrame(raf); };
  }, [words.length]);

  return (
    <blockquote className="my-8">
      <p ref={ref} aria-label={text} className="text-[clamp(20px,2vw,26px)] font-bold leading-[1.45] tracking-[-.01em] text-[#283838]">
        {words.map((w, i) => (
          <span key={i} aria-hidden="true">
            {i > 0 && ' '}
            <span className={'inline-block transition-[opacity,filter,color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:opacity-100 motion-reduce:blur-none ' + (i < on ? 'opacity-100 blur-none ' + (i >= words.length - accentLast ? 'text-[#4F7F6B]' : '') : 'opacity-[.12] blur-[6px]')}>{w}</span>
          </span>
        ))}
      </p>
    </blockquote>
  );
}`,
      tailwind: `<style>
  .sw{display:inline-block;opacity:.12;filter:blur(6px);transition:opacity .5s cubic-bezier(.22,1,.36,1),filter .5s,color .5s}
  .sw.on{opacity:1;filter:none}
  .sw.on.acc{color:#4F7F6B}
  @media (prefers-reduced-motion:reduce){.sw{opacity:1;filter:none}}
</style>
<blockquote class="my-8"><p class="sw-p text-[clamp(20px,2vw,26px)] font-bold leading-[1.45] text-[#283838]">O meu compromisso com você é explicar o seu caso com clareza e decidir o tratamento junto com você.</p></blockquote>
<script>
(function () {
  var p = document.querySelector('.sw-p'), t = p.textContent.trim(), words = t.split(' ');
  p.setAttribute('aria-label', t);
  p.innerHTML = words.map(function (w, i) { return '<span class="sw' + (i >= words.length - 3 ? ' acc' : '') + '" aria-hidden="true">' + w + '</span>'; }).join(' ');
  var spans = p.querySelectorAll('.sw');
  function update() {
    var r = p.getBoundingClientRect(), on = Math.round(Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.3))) * spans.length);
    spans.forEach(function (s, i) { s.classList.toggle('on', i < on); });
  }
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true });
  update();
})();
</script>`
    }
  },

  // 12 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-iris-cta",
    name: "CTA em Íris que se Abre com a Rolagem",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    description: "A faixa final de chamada começa como um pequeno círculo verde-escuro e se abre (clip-path circle) conforme a rolagem, até cobrir a faixa inteira; ao fundo, uma malha de pontos dourados deriva devagar. Cria um momento de foco antes do botão.",
    tags: ["Clip-path", "Scroll-driven", "CTA Final", "Pontos", "Dark"],
    defaultSection: "CTA Final",
    previewType: "dm-iris",
    tech: ["Tailwind CSS", "React", "CSS Keyframes", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const CSS = '@keyframes irDrift{to{background-position:26px 52px}}' +
  '.ir-grid{background-image:radial-gradient(rgba(226,202,124,.22) 1.2px,transparent 1.4px);background-size:26px 26px;-webkit-mask:radial-gradient(60% 70% at 50% 50%,#000,transparent);mask:radial-gradient(60% 70% at 50% 50%,#000,transparent);animation:irDrift 20s linear infinite}' +
  '@media (prefers-reduced-motion:reduce){.ir-grid{animation:none}.ir-panel{clip-path:none!important}}';

export default function IrisCTA({ title = 'Entenda o seu caso e conheça as suas opções de tratamento', text = 'Marque uma consulta de avaliação.', cta = 'Agendar minha consulta', href = '#' }) {
  const ref = useRef(null);
  const [k, setK] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => { raf = 0; const r = ref.current.getBoundingClientRect(); setK(Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.85)))); };
    const go = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', go, { passive: true });
    return () => { removeEventListener('scroll', go); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section ref={ref} className="py-[clamp(24px,3vw,40px)]">
      <style>{CSS}</style>
      <div className="ir-panel relative overflow-hidden bg-[#1E2B2B] py-[clamp(64px,7vw,104px)] text-center text-white" style={{ clipPath: 'circle(' + (16 + k * 84).toFixed(2) + '% at 50% 50%)' }}>
        <span aria-hidden="true" className="ir-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex max-w-[1160px] flex-col items-center px-6">
          <h2 className="max-w-[22ch] text-[clamp(23px,2.6vw,34px)] font-bold leading-[1.22]">{title}</h2>
          <p className="mx-auto mb-9 mt-5 max-w-[60ch] text-white/80">{text}</p>
          <a href={href} className="inline-flex min-h-[66px] items-center rounded-full bg-[#E2CA7C] px-8 font-semibold text-[#283838]">{cta}</a>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<style>
  @keyframes irDrift{to{background-position:26px 52px}}
  .ir-grid{background-image:radial-gradient(rgba(226,202,124,.22) 1.2px,transparent 1.4px);background-size:26px 26px;-webkit-mask:radial-gradient(60% 70% at 50% 50%,#000,transparent);mask:radial-gradient(60% 70% at 50% 50%,#000,transparent);animation:irDrift 20s linear infinite}
  .ir-panel{clip-path:circle(calc(16% + var(--k,0) * 84%) at 50% 50%)}
</style>
<section class="ir py-10">
  <div class="ir-panel relative overflow-hidden bg-[#1E2B2B] py-24 text-center text-white">
    <span class="ir-grid pointer-events-none absolute inset-0" aria-hidden="true"></span>
    <div class="relative mx-auto flex max-w-[1160px] flex-col items-center px-6">
      <h2 class="max-w-[22ch] text-[clamp(23px,2.6vw,34px)] font-bold">Entenda o seu caso e conheça as suas opções</h2>
      <p class="mb-9 mt-5 text-white/80">Marque uma consulta de avaliação.</p>
      <a href="#" class="inline-flex min-h-[66px] items-center rounded-full bg-[#E2CA7C] px-8 font-semibold text-[#283838]">Agendar minha consulta</a>
    </div>
  </div>
</section>
<script>
(function () {
  var s = document.querySelector('.ir'), p = s.firstElementChild;
  function update() { var r = s.getBoundingClientRect(); p.style.setProperty('--k', Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.85)))); }
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true });
  update();
})();
</script>`
    }
  },

  // 13 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-arrow-flood-button",
    name: "Botão Pílula com Círculo da Seta que Inunda",
    category: "buttons-ctas",
    categoryLabel: "Botões & Ações",
    description: "Botão em pílula com a seta dentro de um círculo à direita; no hover o círculo cresce a partir da seta até cobrir o botão inteiro, o texto troca de cor e a seta gira 45° para cima. Tem variações escura, dourada (círculo vira branco) e contorno. Clique com sensação de \"ir\".",
    tags: ["Hover", "Pílula", "Fill", "Seta", "Variações"],
    defaultSection: "CTAs",
    previewType: "dm-flood-btn",
    tech: ["Tailwind CSS", "React", "CSS Transitions"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

// variant: 'dark' (padrão, círculo dourado), 'gold' (sobre fundo escuro, círculo branco), 'line' (contorno)
const SKINS = {
  dark: { bg: '#283838', fg: '#fff', c: '#E2CA7C', cf: '#283838', ring: '', icon: '#283838' },
  gold: { bg: '#E2CA7C', fg: '#283838', c: '#fff', cf: '#283838', ring: '', icon: '#E2CA7C', idle: '#283838' },
  line: { bg: 'transparent', fg: '#283838', c: '#E2CA7C', cf: '#283838', ring: 'border-[1.5px] border-[#283838]', icon: '#283838' },
};

export default function ArrowFloodButton({ children = 'Agendar minha consulta', href = '#', variant = 'dark' }) {
  const ref = useRef(null);
  const s = SKINS[variant] || SKINS.dark;
  useEffect(() => {
    const el = ref.current;
    const size = () => el.style.setProperty('--bw', el.offsetWidth + 'px');
    size();
    addEventListener('resize', size);
    return () => removeEventListener('resize', size);
  }, []);
  return (
    <a ref={ref} href={href}
      style={{ '--bg': s.bg, '--fg': s.fg, '--c': s.c, '--cf': s.cf, '--idle': s.idle || s.c, '--icon': s.icon }}
      className={'group relative isolate inline-flex min-h-[66px] min-w-[min(340px,100%)] max-w-full items-center justify-between gap-[22px] overflow-hidden rounded-full bg-[var(--bg)] py-2 pl-8 pr-2 text-base font-semibold leading-[1.3] text-[var(--fg)] no-underline transition-[color,transform] duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] hover:text-[var(--cf)] focus-visible:text-[var(--cf)] active:scale-[.985] max-sm:w-full max-sm:pl-6 ' + s.ring}>
      <span className="relative z-[1] flex-1 text-center">{children}</span>
      <span aria-hidden="true" className="relative grid h-[50px] w-[50px] flex-none place-items-center rounded-full text-[var(--icon)] group-hover:text-[var(--cf)]">
        <span className="absolute right-0 top-1/2 -z-[1] h-[50px] w-[50px] -translate-y-1/2 rounded-full bg-[var(--idle)] transition-[width,height,right,background-color] duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:right-[calc(var(--bw,400px)*-.6)] group-hover:h-[calc(var(--bw,400px)*2.2)] group-hover:w-[calc(var(--bw,400px)*2.2)] group-hover:bg-[var(--c)] group-focus-visible:right-[calc(var(--bw,400px)*-.6)] group-focus-visible:h-[calc(var(--bw,400px)*2.2)] group-focus-visible:w-[calc(var(--bw,400px)*2.2)]" />
        <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-rotate-45"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </a>
  );
}`,
      tailwind: `<style>
  .fb{--bg:#283838;--fg:#fff;--c:#E2CA7C;--cf:#283838;position:relative;isolation:isolate;overflow:hidden;background:var(--bg);color:var(--fg);transition:color .45s cubic-bezier(.22,1,.36,1),transform .3s}
  .fb-c{position:relative;color:var(--cf)}
  .fb-c::before{content:"";position:absolute;z-index:-1;right:0;top:50%;width:50px;height:50px;border-radius:50%;background:var(--c);transform:translateY(-50%);transition:width .6s cubic-bezier(.22,1,.36,1),height .6s cubic-bezier(.22,1,.36,1),right .6s cubic-bezier(.22,1,.36,1),background-color .3s}
  .fb-c svg{transition:transform .5s cubic-bezier(.22,1,.36,1)}
  .fb:hover,.fb:focus-visible{color:var(--cf)}
  .fb:hover .fb-c::before,.fb:focus-visible .fb-c::before{width:calc(var(--bw,400px) * 2.2);height:calc(var(--bw,400px) * 2.2);right:calc(var(--bw,400px) * -.6)}
  .fb:hover .fb-c svg{transform:rotate(-45deg)}
  .fb:active{transform:scale(.985)}
  .fb--gold{--bg:#E2CA7C;--fg:#283838;--c:#fff}
  .fb--gold .fb-c{color:#E2CA7C}.fb--gold .fb-c::before{background:#283838}
  .fb--gold:hover .fb-c{color:#283838}.fb--gold:hover .fb-c::before{background:#fff}
</style>
<a href="#" class="fb inline-flex min-h-[66px] min-w-[min(340px,100%)] items-center justify-between gap-[22px] rounded-full py-2 pl-8 pr-2 font-semibold no-underline">
  <span class="relative z-[1] flex-1 text-center">Agendar minha consulta</span>
  <span class="fb-c grid h-[50px] w-[50px] flex-none place-items-center rounded-full" aria-hidden="true"><svg viewBox="0 0 24 24" class="h-[22px] w-[22px]"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
</a>
<script>
  document.querySelectorAll('.fb').forEach(function (b) { b.style.setProperty('--bw', b.offsetWidth + 'px'); });
</script>`
    }
  },

  // 14 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-keyword-tag-orbit",
    name: "Títulos em Máscara com Etiqueta e Fio Orbitando",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    description: "Cada palavra do título sobe de dentro de uma máscara com leve rotação, em cascata; o trecho-chave vira uma etiqueta cujo fundo se abre da esquerda, e depois um fio de luz fica orbitando em volta dela em loop. Destaca a ideia central sem gritar.",
    tags: ["Título", "Máscara", "Stagger", "SVG Stroke", "Destaque"],
    defaultSection: "Títulos de Seção",
    previewType: "dm-kw-orbit",
    tech: ["Tailwind CSS", "React", "CSS Keyframes", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const CSS = '@keyframes kwOrbit{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}' +
  '.kw-rect{fill:none;stroke-width:2;stroke-linecap:round;stroke-dasharray:.16 .84;vector-effect:non-scaling-stroke;animation:kwOrbit 3.4s linear infinite}';

// before + keyword + after: o trecho-chave vira etiqueta. dark=true para fundo escuro (etiqueta dourada).
export default function KeywordTitle({ before = 'O que muda para você com a', keyword = 'cirurgia robótica', after = '', dark = false }) {
  const ref = useRef(null);
  const [inView, setIn] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let t;
    const io = new IntersectionObserver(([e]) => {
      setIn(e.isIntersecting);
      clearTimeout(t);
      if (e.isIntersecting) t = setTimeout(() => setDone(true), 1300); else setDone(false);
    }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  let i = 0;
  const word = (child, key) => {
    const d = i++;
    return (
      <span key={key}>
        {d > 0 && ' '}
        <span aria-hidden="true" className={'-mx-[.04em] -mb-[.16em] -mt-[.1em] inline-block px-[.04em] pb-[.16em] pt-[.1em] align-top ' + (done ? 'overflow-visible' : 'overflow-hidden')}>
          <span className="inline-block origin-bottom-left" style={{ transform: inView ? 'none' : 'translateY(115%) rotate(5deg)', transition: 'transform 1s cubic-bezier(.22,1,.36,1) ' + d * 45 + 'ms' }}>{child}</span>
        </span>
      </span>
    );
  };
  const words = (s, p) => s.split(' ').filter(Boolean).map((w, k) => word(w, p + k));
  const tag = (
    <em className={'relative isolate mx-[.02em] inline-block whitespace-nowrap px-[.28em] not-italic transition-colors delay-[750ms] duration-500 ' + (inView ? (dark ? 'text-[#283838]' : 'text-white') : '')}>
      <span aria-hidden="true" className={'absolute inset-x-0 bottom-[.02em] top-[.1em] -z-[1] origin-left rounded-[.26em] transition-transform delay-[550ms] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] ' + (dark ? 'bg-[#E2CA7C] ' : 'bg-[#3F6A57] ') + (inView ? 'scale-x-100' : 'scale-x-0')} />
      <svg aria-hidden="true" className={'pointer-events-none absolute -bottom-[.1em] -left-[.12em] -top-[.02em] h-[calc(100%+.12em)] w-[calc(100%+.24em)] overflow-visible transition-opacity duration-500 ' + (done ? 'opacity-100' : 'opacity-0')}>
        <rect className="kw-rect" x="0" y="0" width="100%" height="100%" rx="9" pathLength="1" stroke={dark ? '#fff' : '#8A6D1F'} />
      </svg>
      {keyword}
    </em>
  );
  const label = [before, keyword, after].filter(Boolean).join(' ');

  return (
    <h2 ref={ref} aria-label={label} className={'text-balance text-[clamp(23px,2.6vw,34px)] font-bold leading-[1.22] tracking-[-.015em] ' + (dark ? 'text-white' : 'text-[#283838]')}>
      <style>{CSS}</style>
      {words(before, 'a')}
      {word(tag, 'kw')}
      {words(after, 'b')}
    </h2>
  );
}`,
      tailwind: `<style>
  .kt .ln{display:inline-block;overflow:hidden;vertical-align:top;padding:.1em .04em .16em;margin:-.1em -.04em -.16em}
  .kt .ln>span{display:inline-block;transform:translateY(115%) rotate(5deg);transform-origin:0 100%;transition:transform 1s cubic-bezier(.22,1,.36,1);transition-delay:calc(var(--i) * 45ms)}
  .kt.is-in .ln>span{transform:none}
  .kt.is-done .ln{overflow:visible}
  .kt em{position:relative;display:inline-block;white-space:nowrap;padding:0 .28em;font-style:normal;isolation:isolate;transition:color .5s .75s}
  .kt em::before{content:"";position:absolute;z-index:-1;inset:.1em 0 .02em;border-radius:.26em;background:#3F6A57;transform:scaleX(0);transform-origin:left;transition:transform .9s cubic-bezier(.22,1,.36,1) .55s}
  .kt.is-in em{color:#fff}.kt.is-in em::before{transform:none}
  .kt em svg{position:absolute;left:-.12em;top:-.02em;width:calc(100% + .24em);height:calc(100% + .12em);overflow:visible;opacity:0;transition:opacity .6s}
  .kt.is-done em svg{opacity:1}
  .kt em rect{fill:none;stroke:#8A6D1F;stroke-width:2;stroke-linecap:round;stroke-dasharray:.16 .84;vector-effect:non-scaling-stroke;animation:ktOrbit 3.4s linear infinite}
  @keyframes ktOrbit{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
</style>
<h2 class="kt text-[clamp(23px,2.6vw,34px)] font-bold leading-[1.22] text-[#283838]">O que muda para você com a <em>cirurgia robótica</em></h2>
<script>
(function () {
  document.querySelectorAll('.kt').forEach(function (el) {
    var label = el.textContent.trim(), nodes = Array.prototype.slice.call(el.childNodes), i = 0;
    el.textContent = '';
    function mask(child) {
      if (i) el.appendChild(document.createTextNode(' '));
      var ln = document.createElement('span'); ln.className = 'ln'; ln.setAttribute('aria-hidden', 'true');
      var s = document.createElement('span'); s.style.setProperty('--i', i++); s.appendChild(child); ln.appendChild(s); el.appendChild(ln);
    }
    nodes.forEach(function (n) {
      if (n.nodeType === 1) {
        n.insertAdjacentHTML('beforeend', '<svg aria-hidden="true"><rect x="0" y="0" width="100%" height="100%" rx="9" pathLength="1"/></svg>');
        mask(n); return;
      }
      n.textContent.split(' ').forEach(function (w) { if (w.trim()) mask(document.createTextNode(w.trim())); });
    });
    el.setAttribute('aria-label', label);
    var t;
    new IntersectionObserver(function (es) {
      clearTimeout(t);
      if (es[0].isIntersecting) { el.classList.add('is-in'); t = setTimeout(function () { el.classList.add('is-done'); }, 1300); }
      else el.classList.remove('is-in', 'is-done');
    }, { threshold: 0.12 }).observe(el);
  });
})();
</script>`
    }
  },

  // 15 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-dark-faq",
    name: "FAQ que Vira Bloco Escuro com Seta Giratória",
    category: "navigation",
    categoryLabel: "Modais & Menus",
    description: "Perguntas em caixas arredondadas; ao abrir, a caixa inteira escurece para verde-profundo, o texto vira branco e a seta num quadradinho gira 90° e fica dourada, enquanto a resposta abre suave (grid-rows). Só uma aberta por vez; no hover a seta empurra para o lado.",
    tags: ["Acordeão", "FAQ", "Grid Rows", "Acessível", "Hover"],
    defaultSection: "Perguntas Frequentes",
    previewType: "dm-dark-faq",
    tech: ["Tailwind CSS", "React", "CSS Transitions"],
    frameworks: {
      react: `import { useState } from 'react';

const FAQ = [
  { q: 'A cirurgia robótica é indicada para todos os casos?', a: 'Não. A indicação depende do tipo e do estágio da doença e dos seus exames.' },
  { q: 'O robô opera sozinho?', a: 'Não. A cirurgia é conduzida pelo cirurgião do começo ao fim.' },
  { q: 'Como é a recuperação?', a: 'Em geral é mais rápida que a da cirurgia aberta, mas varia de pessoa para pessoa.' },
];

export default function DarkFaq({ items = FAQ }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto grid max-w-[860px] gap-2.5">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={i} className={'group relative overflow-hidden rounded-[18px] border transition-[background-color,border-color] duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] ' + (on ? 'border-[#283838] bg-[#283838]' : 'border-[rgba(40,56,56,.13)] bg-white hover:border-[#3F6A57]')}>
            <button type="button" id={'fq' + i} aria-expanded={on} aria-controls={'fa' + i} onClick={() => setOpen(on ? -1 : i)}
              className={'flex min-h-[82px] w-full items-center py-5 pl-6 pr-[76px] text-left text-base font-semibold leading-[1.45] transition-[padding,color] duration-500 hover:pl-[30px] ' + (on ? 'text-white' : 'text-[#283838]')}>
              {it.q}
            </button>
            <span aria-hidden="true" className={'pointer-events-none absolute right-4 grid h-[42px] w-[42px] place-items-center rounded-xl transition-all duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] ' + (on ? 'top-6 rotate-90 bg-[#E2CA7C]' : 'top-1/2 -mt-[21px] bg-[#F0F5F2] group-hover:translate-x-1')}>
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#283838]"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <div id={'fa' + i} role="region" aria-labelledby={'fq' + i} className={'grid transition-[grid-template-rows] duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] ' + (on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
              <div className="overflow-hidden">
                <p className={'max-w-[68ch] pb-6 pl-6 pr-[72px] max-sm:px-[18px] ' + (on ? 'text-white/80' : 'text-[#4B5563]')}>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}`,
      tailwind: `<style>
  .fq-item{transition:background-color .55s cubic-bezier(.22,1,.36,1),border-color .4s}
  .fq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .55s cubic-bezier(.22,1,.36,1)}
  .fq-a>div{overflow:hidden}
  .fq-ico{transition:transform .6s cubic-bezier(.22,1,.36,1),background-color .4s,top .4s}
  .fq-item:hover .fq-ico{transform:translateX(4px)}
  .fq-item.is-on{background:#283838;border-color:#283838}
  .fq-item.is-on .fq-q{color:#fff}.fq-item.is-on .fq-a{grid-template-rows:1fr}.fq-item.is-on .fq-a p{color:rgba(255,255,255,.78)}
  .fq-item.is-on .fq-ico,.fq-item.is-on:hover .fq-ico{top:24px;margin-top:0;transform:rotate(90deg);background:#E2CA7C}
</style>
<div class="fq mx-auto grid max-w-[860px] gap-2.5">
  <div class="fq-item is-on relative overflow-hidden rounded-[18px] border border-[rgba(40,56,56,.13)] bg-white">
    <button type="button" class="fq-q flex min-h-[82px] w-full items-center py-5 pl-6 pr-[76px] text-left font-semibold text-[#283838]" aria-expanded="true">A cirurgia robótica é indicada para todos os casos?</button>
    <span class="fq-ico pointer-events-none absolute right-4 top-1/2 -mt-[21px] grid h-[42px] w-[42px] place-items-center rounded-xl bg-[#F0F5F2]" aria-hidden="true"><svg viewBox="0 0 24 24" class="h-5 w-5 text-[#283838]"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span>
    <div class="fq-a" role="region"><div><p class="pb-6 pl-6 pr-[72px] text-[#4B5563]">Não. A indicação depende do tipo e do estágio da doença.</p></div></div>
  </div>
  <div class="fq-item relative overflow-hidden rounded-[18px] border border-[rgba(40,56,56,.13)] bg-white">
    <button type="button" class="fq-q flex min-h-[82px] w-full items-center py-5 pl-6 pr-[76px] text-left font-semibold text-[#283838]" aria-expanded="false">O robô opera sozinho?</button>
    <span class="fq-ico pointer-events-none absolute right-4 top-1/2 -mt-[21px] grid h-[42px] w-[42px] place-items-center rounded-xl bg-[#F0F5F2]" aria-hidden="true"><svg viewBox="0 0 24 24" class="h-5 w-5 text-[#283838]"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span>
    <div class="fq-a" role="region"><div><p class="pb-6 pl-6 pr-[72px] text-[#4B5563]">Não. A cirurgia é conduzida pelo cirurgião do começo ao fim.</p></div></div>
  </div>
</div>
<script>
(function () {
  var items = document.querySelectorAll('.fq-item');
  items.forEach(function (item) {
    item.querySelector('.fq-q').addEventListener('click', function () {
      var was = item.classList.contains('is-on');
      items.forEach(function (o) { var on = o === item && !was; o.classList.toggle('is-on', on); o.querySelector('.fq-q').setAttribute('aria-expanded', on); });
    });
  });
})();
</script>`
    }
  },

  // 16 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-cross-grid-cursor",
    name: "Fundo de Cruzes de Saúde que Reage ao Cursor",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    description: "Uma grade fixa de pequenas cruzes (símbolo de saúde) em canvas fica atrás de todo o conteúdo; perto do cursor as cruzes são empurradas para fora, crescem, giram um pouco e ficam douradas. Sem mouse (celular), um ponto invisível passeia sozinho. Textura viva e temática, quase imperceptível.",
    tags: ["Canvas", "Mouse Reactive", "Fundo", "Partículas", "Saúde"],
    defaultSection: "Fundo da Página",
    previewType: "dm-cross-grid",
    tech: ["Tailwind CSS", "React", "Canvas 2D", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

// Coloque uma vez na página; fica fixo atrás do conteúdo (z-0). As seções ficam com z-index maior.
export default function CrossGridBackground({ spacing = 38, radius = 170, base = '#3F6A57', hot = '#8A6D1F' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = ref.current, ctx = cv.getContext('2d');
    let dpr = 1, W = 0, H = 0, mx = -1e4, my = -1e4, tmx = -1e4, tmy = -1e4, hasMouse = false, raf = 0, lastPy = null;
    const t0 = performance.now();
    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    };
    const draw = (now) => {
      raf = 0;
      const sy = scrollY;
      if (!hasMouse) {
        const k = (now - t0) / 1000;
        tmx = W * (0.5 + Math.cos(k * 0.33) * 0.34 + Math.sin(k * 0.19) * 0.08);
        tmy = sy + H * (0.5 + Math.sin(k * 0.47 + 1.1) * 0.32);
      }
      mx += (tmx - mx) * 0.16; my += (tmy - my) * 0.16;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1.4; ctx.lineCap = 'round';
      const r0 = Math.floor(sy / spacing), r1 = Math.ceil((sy + H) / spacing), c1 = Math.ceil(W / spacing);
      for (let r = r0; r <= r1; r++) {
        for (let c = 0; c <= c1; c++) {
          const x = c * spacing + spacing / 2, y = r * spacing + spacing / 2, dx = x - mx, dy = y - my;
          const e = Math.exp(-(dx * dx + dy * dy) / (radius * radius));
          const px = x + dx * e * 0.18, py = y - sy + dy * e * 0.18;
          const arm = 2.6 + e * 3, rot = e * 0.8, ca = Math.cos(rot) * arm, sa = Math.sin(rot) * arm;
          ctx.globalAlpha = 0.07 + e * 0.2;
          ctx.strokeStyle = e > 0.3 ? hot : base;
          ctx.beginPath();
          ctx.moveTo(px - ca, py - sa); ctx.lineTo(px + ca, py + sa);
          ctx.moveTo(px + sa, py - ca); ctx.lineTo(px - sa, py + ca);
          ctx.stroke();
        }
      }
      if ((!hasMouse || Math.abs(tmx - mx) + Math.abs(tmy - my) > 0.5) && !document.hidden) raf = requestAnimationFrame(draw);
    };
    const wake = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const onMove = (e) => { if (e.pointerType !== 'mouse') return; hasMouse = true; lastPy = e.clientY; tmx = e.clientX; tmy = e.clientY + scrollY; wake(); };
    const onScroll = () => { if (hasMouse && lastPy !== null) tmy = lastPy + scrollY; wake(); };
    const onResize = () => { size(); wake(); };
    size(); wake();
    addEventListener('pointermove', onMove, { passive: true });
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', wake);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', onMove); removeEventListener('scroll', onScroll); removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', wake);
    };
  }, [spacing, radius, base, hot]);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}`,
      tailwind: `<canvas class="xg pointer-events-none fixed inset-0 z-0 h-full w-full" aria-hidden="true"></canvas>
<script>
(function () {
  var cv = document.querySelector('.xg'); if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var ctx = cv.getContext('2d'), SP = 38, RAD = 170, dpr = 1, W = 0, H = 0;
  var mx = -1e4, my = -1e4, tmx = -1e4, tmy = -1e4, hasMouse = false, t0 = performance.now(), raf = 0, lastPy = null;
  function size() { dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; }
  function draw(now) {
    raf = 0; var sy = scrollY;
    if (!hasMouse) { var k = (now - t0) / 1000; tmx = W * (0.5 + Math.cos(k * 0.33) * 0.34 + Math.sin(k * 0.19) * 0.08); tmy = sy + H * (0.5 + Math.sin(k * 0.47 + 1.1) * 0.32); }
    mx += (tmx - mx) * 0.16; my += (tmy - my) * 0.16;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H); ctx.lineWidth = 1.4; ctx.lineCap = 'round';
    for (var r = Math.floor(sy / SP); r <= Math.ceil((sy + H) / SP); r++) for (var c = 0; c <= Math.ceil(W / SP); c++) {
      var x = c * SP + SP / 2, y = r * SP + SP / 2, dx = x - mx, dy = y - my, e = Math.exp(-(dx * dx + dy * dy) / (RAD * RAD));
      var px = x + dx * e * 0.18, py = y - sy + dy * e * 0.18, arm = 2.6 + e * 3, rot = e * 0.8, ca = Math.cos(rot) * arm, sa = Math.sin(rot) * arm;
      ctx.globalAlpha = 0.07 + e * 0.2; ctx.strokeStyle = e > 0.3 ? '#8A6D1F' : '#3F6A57';
      ctx.beginPath(); ctx.moveTo(px - ca, py - sa); ctx.lineTo(px + ca, py + sa); ctx.moveTo(px + sa, py - ca); ctx.lineTo(px - sa, py + ca); ctx.stroke();
    }
    if ((!hasMouse || Math.abs(tmx - mx) + Math.abs(tmy - my) > 0.5) && !document.hidden) raf = requestAnimationFrame(draw);
  }
  function wake() { if (!raf) raf = requestAnimationFrame(draw); }
  addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; hasMouse = true; lastPy = e.clientY; tmx = e.clientX; tmy = e.clientY + scrollY; wake(); }, { passive: true });
  addEventListener('scroll', function () { if (hasMouse && lastPy !== null) tmy = lastPy + scrollY; wake(); }, { passive: true });
  addEventListener('resize', function () { size(); wake(); });
  document.addEventListener('visibilitychange', wake);
  size(); wake();
})();
</script>`
    }
  },

  // 17 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-sheet-stack",
    name: "Seções em Folhas Sobrepostas com Fio Dourado",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Cada seção sobe como uma folha de cantos arredondados por cima da anterior (margem negativa), com um puxador discreto no topo e um fio dourado que se desenha do centro para os lados quando a folha entra na tela. Transições entre seções com cara de app nativo.",
    tags: ["Transição de Seção", "Bordas", "Reveal", "Layout"],
    defaultSection: "Transição entre Seções",
    previewType: "dm-sheets",
    tech: ["Tailwind CSS", "React", "CSS Transitions", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

// Envolva cada seção com <Sheet>. dark=true para seção verde-escura. A primeira seção da página não precisa.
export function Sheet({ dark = false, children, className = '' }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className={'relative z-[1] -mt-10 rounded-t-[40px] pt-10 max-sm:-mt-7 max-sm:rounded-t-[28px] max-sm:pt-7 ' + (dark ? 'bg-[#283838] text-white ' : 'bg-white ') + className}>
      <span aria-hidden="true" className={'absolute inset-x-9 top-0 h-[1.5px] transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] ' + (dark ? 'bg-[#E2CA7C] opacity-70 ' : 'bg-[#8A6D1F] opacity-50 ') + (on ? 'scale-x-100' : 'scale-x-0')} />
      <span aria-hidden="true" className={'absolute left-1/2 top-3 -ml-[22px] h-1 w-11 rounded ' + (dark ? 'bg-[rgba(226,202,124,.22)]' : 'bg-[rgba(40,56,56,.13)]')} />
      {children}
    </section>
  );
}

export default function SheetStackDemo() {
  return (
    <main>
      <section className="bg-[#F7F7F7] px-6 pb-24 pt-16"><h2 className="text-2xl font-bold text-[#283838]">Seção 1</h2></section>
      <Sheet dark><div className="px-6 pb-24 pt-8"><h2 className="text-2xl font-bold">Seção 2 (escura)</h2></div></Sheet>
      <Sheet><div className="px-6 pb-24 pt-8"><h2 className="text-2xl font-bold text-[#283838]">Seção 3</h2></div></Sheet>
    </main>
  );
}`,
      tailwind: `<style>
  .sh{--ov:40px;position:relative;z-index:1;margin-top:calc(var(--ov) * -1);border-radius:var(--ov) var(--ov) 0 0;padding-top:var(--ov);background:#fff}
  .sh--dark{background:#283838;color:#fff}
  .sh::before{content:"";position:absolute;left:calc(var(--ov) * .9);right:calc(var(--ov) * .9);top:0;height:1.5px;background:#8A6D1F;opacity:.5;transform:scaleX(0);transition:transform 1.4s cubic-bezier(.22,1,.36,1)}
  .sh--dark::before{background:#E2CA7C;opacity:.7}
  .sh.is-in::before{transform:none}
  .sh::after{content:"";position:absolute;left:50%;top:12px;width:44px;height:4px;margin-left:-22px;border-radius:4px;background:rgba(40,56,56,.13)}
  .sh--dark::after{background:rgba(226,202,124,.22)}
  @media (max-width:640px){.sh{--ov:28px}}
</style>
<section class="bg-[#F7F7F7] px-6 pb-24 pt-16"><h2 class="text-2xl font-bold text-[#283838]">Seção 1</h2></section>
<section class="sh sh--dark px-6 pb-24"><h2 class="pt-8 text-2xl font-bold">Seção 2 (escura)</h2></section>
<section class="sh px-6 pb-24"><h2 class="pt-8 text-2xl font-bold text-[#283838]">Seção 3</h2></section>
<script>
  var shIO = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('is-in', e.isIntersecting); }); }, { threshold: 0.12 });
  document.querySelectorAll('.sh').forEach(function (s) { shIO.observe(s); });
</script>`
    }
  },

  // 18 ─────────────────────────────────────────────
  {
    ...B,
    id: "dimas-parallax-float-shapes",
    name: "Formas Flutuantes em Paralaxe nas Laterais",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    description: "Seis formas pequenas (cruz, anel, quadradinho dourado) ficam fixas nas laterais da página e sobem em velocidades diferentes conforme a rolagem, girando devagar e dando a volta quando saem da tela. Aparecem só depois do hero. Profundidade sutil sem competir com o conteúdo.",
    tags: ["Paralaxe", "Fundo", "Formas", "Scroll-driven", "Sutil"],
    defaultSection: "Fundo da Página",
    previewType: "dm-float-shapes",
    tech: ["Tailwind CSS", "React", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const SHAPES = [
  { k: 'cross', s: 14, side: 'left', pos: '6%', sp: 0.35, base: 0.15 },
  { k: 'ring', s: 18, side: 'left', pos: '12%', sp: 0.6, base: 0.62 },
  { k: 'square', s: 9, side: 'left', pos: '4%', sp: 0.2, base: 0.88 },
  { k: 'cross', s: 12, side: 'right', pos: '7%', sp: 0.5, base: 0.3 },
  { k: 'ring', s: 14, side: 'right', pos: '13%', sp: 0.28, base: 0.78 },
  { k: 'square', s: 10, side: 'right', pos: '4%', sp: 0.7, base: 0.05 },
];
const LOOK = {
  cross: 'opacity-[.22] [background:linear-gradient(currentColor,currentColor)_center/100%_2px_no-repeat,linear-gradient(currentColor,currentColor)_center/2px_100%_no-repeat]',
  ring: 'opacity-[.22] rounded-full border-[1.5px] border-current',
  square: 'opacity-30 rounded-[3px] border-[1.5px] border-[#8A6D1F]',
};

// showAfter: seletor do elemento depois do qual as formas aparecem (ex.: o hero).
export default function FloatShapes({ showAfter = null }) {
  const box = useRef(null), refs = useRef([]);
  useEffect(() => {
    let tick = false;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gate = showAfter ? document.querySelector(showAfter) : null;
    const up = () => {
      tick = false;
      const sy = reduce ? 0 : scrollY, h = innerHeight + 80;
      refs.current.forEach((it, i) => {
        const S = SHAPES[i], y = ((S.base * h - sy * S.sp) % h + h) % h - 40;
        it.style.transform = 'translateY(' + y.toFixed(1) + 'px) rotate(' + (sy * S.sp * 0.25).toFixed(1) + 'deg)';
      });
      box.current.style.opacity = gate && gate.getBoundingClientRect().bottom > innerHeight * 0.5 ? '0' : '1';
    };
    const go = () => { if (!tick) { tick = true; requestAnimationFrame(up); } };
    up();
    addEventListener('scroll', go, { passive: true });
    addEventListener('resize', go);
    return () => { removeEventListener('scroll', go); removeEventListener('resize', go); };
  }, [showAfter]);
  return (
    <div ref={box} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 text-[#3F6A57] transition-opacity duration-700">
      {SHAPES.map((S, i) => (
        <i key={i} ref={(el) => (refs.current[i] = el)} className={'absolute top-0 will-change-transform ' + LOOK[S.k] + (S.k === 'ring' ? ' max-sm:hidden' : '')}
          style={{ width: S.s, height: S.s, [S.side]: S.pos }} />
      ))}
    </div>
  );
}`,
      tailwind: `<style>
  .fs{position:fixed;inset:0;z-index:0;pointer-events:none;color:#3F6A57;transition:opacity .8s}
  .fs i{position:absolute;top:0;width:var(--s);height:var(--s);opacity:.22;will-change:transform}
  .fs .x{background:linear-gradient(currentColor,currentColor) center/100% 2px no-repeat,linear-gradient(currentColor,currentColor) center/2px 100% no-repeat}
  .fs .o{border:1.5px solid currentColor;border-radius:50%}
  .fs .q{border:1.5px solid #8A6D1F;border-radius:3px;opacity:.3}
  @media (max-width:640px){.fs .o{display:none}}
</style>
<div class="fs" aria-hidden="true">
  <i class="x" style="--s:14px;left:6%"></i><i class="o" style="--s:18px;left:12%"></i><i class="q" style="--s:9px;left:4%"></i>
  <i class="x" style="--s:12px;right:7%"></i><i class="o" style="--s:14px;right:13%"></i><i class="q" style="--s:10px;right:4%"></i>
</div>
<script>
(function () {
  var box = document.querySelector('.fs'), items = box.children, SP = [0.35, 0.6, 0.2, 0.5, 0.28, 0.7], BASE = [0.15, 0.62, 0.88, 0.3, 0.78, 0.05], tick = false;
  var hero = document.querySelector('header, section'); // aparece depois da primeira seção
  function up() {
    tick = false; var sy = scrollY, h = innerHeight + 80;
    Array.prototype.forEach.call(items, function (it, i) { var y = ((BASE[i] * h - sy * SP[i]) % h + h) % h - 40; it.style.transform = 'translateY(' + y + 'px) rotate(' + sy * SP[i] * 0.25 + 'deg)'; });
    box.style.opacity = hero && hero.getBoundingClientRect().bottom > innerHeight * 0.5 ? 0 : 1;
  }
  addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(up); } }, { passive: true });
  addEventListener('resize', up);
  up();
})();
</script>`
    }
  },
];
