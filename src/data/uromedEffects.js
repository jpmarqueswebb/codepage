// Efeitos extraídos da LP da Uromed (Dra. Bárbara Melão, urologista) — paleta verde-musgo + dourado
const B = { client: "Uromed" };

export const uromedEffects = [
  {
    ...B,
    id: "uromed-console-lens-hero",
    name: "Hero Visão do Console com Lente de Aumento",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    badge: "Uromed",
    description: "A foto do hero é montada em 12 fatias que deslizam e encaixam enquanto um feixe dourado escaneia; depois surge uma lente com mira que amplia a foto 2x, passeia sozinha e segue o mouse. Sensação de precisão cirúrgica e tecnologia.",
    tags: ["Hero", "Clip-path", "Lente Zoom", "Mouse Reactive", "Scan"],
    defaultSection: "Hero Principal",
    previewType: "um-console-lens",
    tech: ["Tailwind CSS", "React", "CSS Keyframes", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const CSS = '.cl-strip{position:absolute;inset:0;background:var(--img) center/cover no-repeat;clip-path:inset(calc(var(--i)*8.3333% - 1px) 0 calc(100% - (var(--i) + 1)*8.3333% - 1px) 0);animation:clIn 1.5s cubic-bezier(.75,0,.15,1) calc(.2s + var(--i)*.07s) both}' +
  '@keyframes clIn{0%{transform:translateX(calc(var(--dir)*18%));opacity:0;filter:grayscale(1) brightness(1.4)}55%{opacity:1}80%{transform:translateX(calc(var(--dir)*-.6%));filter:grayscale(.2) brightness(1.05)}100%{transform:none;opacity:1;filter:none}}' +
  '.cl-scan{position:absolute;left:0;right:0;top:0;height:2px;background:linear-gradient(90deg,transparent,#E2CA7C 30%,#fff7df 50%,#E2CA7C 70%,transparent);box-shadow:0 0 22px 6px rgba(226,202,124,.55);opacity:0;animation:clScan 2.1s cubic-bezier(.65,0,.35,1) .15s both}' +
  '@keyframes clScan{0%{top:0;opacity:0}8%,85%{opacity:1}100%{top:100%;opacity:0}}' +
  '.cl-grid{position:absolute;inset:0;opacity:0;background:repeating-linear-gradient(0deg,rgba(138,109,31,.22) 0 1px,transparent 1px 48px),repeating-linear-gradient(90deg,rgba(138,109,31,.22) 0 1px,transparent 1px 48px);-webkit-mask-image:radial-gradient(70% 80% at 70% 40%,#000,transparent);mask-image:radial-gradient(70% 80% at 70% 40%,#000,transparent);animation:clGrid 2.8s ease-out .3s both}' +
  '@keyframes clGrid{30%{opacity:1}100%{opacity:0}}' +
  '.cl-lens{position:absolute;left:0;top:0;width:170px;height:170px;margin:-85px 0 0 -85px;scale:0;opacity:0;transition:scale .7s cubic-bezier(.34,1.56,.64,1),opacity .4s}' +
  '.is-lens .cl-lens{scale:1;opacity:1}' +
  '.cl-spin{transform-origin:100px 100px;animation:clSpin 24s linear infinite}.cl-spin2{transform-origin:100px 100px;animation:clSpin 9s linear infinite reverse}@keyframes clSpin{to{transform:rotate(360deg)}}' +
  '@media (max-width:900px){.cl-lens{width:108px;height:108px;margin:-54px 0 0 -54px}}' +
  '@media (prefers-reduced-motion:reduce){.cl-strip{animation:none}.cl-strip:not(:first-child){display:none}.cl-strip:first-child{clip-path:none}.cl-scan,.cl-grid,.cl-lens{display:none}}';

export function ConsoleLensHero({ img = '/hero.webp', imgW = 1920, imgH = 800, children }) {
  const secRef = useRef(null), lensRef = useRef(null), zoomRef = useRef(null), xyRef = useRef(null);

  useEffect(() => {
    const sec = secRef.current, lens = lensRef.current, zoom = zoomRef.current, xy = xyRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const Z = 2;
    let W = 0, H = 0, ox = 0, oy = 0, x = 0, y = 0, tx = 0, ty = 0, user = false, idle = 0, raf = 0, on = true;
    const t0 = performance.now();
    const measure = () => {
      W = sec.clientWidth; H = sec.clientHeight;
      const s = Math.max(W / imgW, H / imgH), dw = imgW * s, dh = imgH * s;
      ox = (W - dw) / 2; oy = (H - dh) / 2;
      zoom.style.backgroundSize = dw * Z + 'px ' + dh * Z + 'px';
    };
    // área onde a lente passeia (lado da foto, longe do texto)
    const zone = () => ({ x0: W * 0.6, x1: W * 0.92, y0: H * 0.16, y1: H * 0.78 });
    const auto = (t) => {
      const z = zone(), k = t / 1000;
      tx = z.x0 + (z.x1 - z.x0) * (0.5 + 0.5 * Math.sin(k * 0.37));
      ty = z.y0 + (z.y1 - z.y0) * (0.5 + 0.5 * Math.sin(k * 0.53 + 1.3));
    };
    const frame = (t) => {
      raf = 0; if (!on) return;
      if (!user) auto(t - t0);
      x += (tx - x) * 0.08; y += (ty - y) * 0.08;
      lens.style.translate = x.toFixed(1) + 'px ' + y.toFixed(1) + 'px';
      const L = lens.offsetWidth - 16;
      zoom.style.backgroundPosition = (L / 2 - (x - ox) * Z).toFixed(1) + 'px ' + (L / 2 - (y - oy) * Z).toFixed(1) + 'px';
      xy.textContent = String(Math.round(x / W * 99)).padStart(2, '0') + ' · ' + String(Math.round(y / H * 99)).padStart(2, '0');
      raf = requestAnimationFrame(frame);
    };
    const point = (e) => {
      const r = sec.getBoundingClientRect();
      user = true; tx = e.clientX - r.left; ty = e.clientY - r.top;
      clearTimeout(idle); idle = setTimeout(() => { user = false; }, 2600);
    };
    const io = new IntersectionObserver(([en]) => { on = en.isIntersecting; if (on && !raf) raf = requestAnimationFrame(frame); });
    sec.addEventListener('pointermove', point, { passive: true });
    window.addEventListener('resize', measure);
    io.observe(sec);
    measure(); auto(0); x = tx; y = ty;
    const start = setTimeout(() => { measure(); sec.classList.add('is-lens'); if (!raf) raf = requestAnimationFrame(frame); }, 2300);
    return () => { cancelAnimationFrame(raf); clearTimeout(start); clearTimeout(idle); io.disconnect(); sec.removeEventListener('pointermove', point); window.removeEventListener('resize', measure); };
  }, [imgW, imgH]);

  return (
    <section ref={secRef} className="relative isolate min-h-[min(92svh,860px)] overflow-hidden bg-white" style={{ '--img': 'url(' + img + ')' }}>
      <style>{CSS}</style>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => <i key={i} className="cl-strip" style={{ '--i': i, '--dir': i % 2 ? 1 : -1 }} />)}
        <span className="cl-scan" />
        <span className="cl-grid" />
        <div ref={lensRef} className="cl-lens">
          <div ref={zoomRef} className="absolute inset-2 rounded-full bg-no-repeat shadow-[0_24px_60px_-18px_rgba(17,40,40,.55),inset_0_0_0_1px_rgba(255,255,255,.6),inset_0_0_40px_rgba(17,40,40,.25)]" style={{ backgroundImage: 'var(--img)' }}>
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_26%,rgba(255,255,255,.45),transparent_40%)]" />
          </div>
          <svg viewBox="0 0 200 200" className="absolute -inset-[14px] h-[calc(100%+28px)] w-[calc(100%+28px)] overflow-visible fill-none">
            <circle className="cl-spin" cx="100" cy="100" r="98" stroke="#8A6D1F" strokeWidth="6" strokeDasharray="1 7.3" opacity=".7" />
            <circle className="cl-spin2" cx="100" cy="100" r="90" stroke="#E2CA7C" strokeWidth="2" strokeDasharray="22 3 6 3" />
            <path d="M100 80v40M80 100h40" stroke="#fff" strokeWidth="1.5" opacity=".9" />
          </svg>
          <div className="absolute left-1/2 top-[calc(100%+22px)] flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full bg-[rgba(14,46,46,.82)] px-3 py-1.5 text-[11px] font-semibold tracking-[.12em] tabular-nums text-white backdrop-blur-md">
            <b className="text-[#E2CA7C]">2X</b><em ref={xyRef} className="not-italic opacity-75">00 · 00</em>
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-xl px-6 py-24 md:px-16">{children}</div>
    </section>
  );
}`,
      tailwind: `<section id="cl-hero" class="relative isolate min-h-[min(92svh,860px)] overflow-hidden bg-white" style="--img:url(/hero.webp)">
  <style>
    .cl-strip{position:absolute;inset:0;background:var(--img) center/cover no-repeat;clip-path:inset(calc(var(--i)*8.3333% - 1px) 0 calc(100% - (var(--i) + 1)*8.3333% - 1px) 0);animation:clIn 1.5s cubic-bezier(.75,0,.15,1) calc(.2s + var(--i)*.07s) both}
    @keyframes clIn{0%{transform:translateX(calc(var(--dir)*18%));opacity:0;filter:grayscale(1) brightness(1.4)}55%{opacity:1}80%{transform:translateX(calc(var(--dir)*-.6%));filter:grayscale(.2) brightness(1.05)}100%{transform:none;opacity:1;filter:none}}
    .cl-scan{position:absolute;left:0;right:0;top:0;height:2px;background:linear-gradient(90deg,transparent,#E2CA7C 30%,#fff7df 50%,#E2CA7C 70%,transparent);box-shadow:0 0 22px 6px rgba(226,202,124,.55);opacity:0;animation:clScan 2.1s cubic-bezier(.65,0,.35,1) .15s both}
    @keyframes clScan{0%{top:0;opacity:0}8%,85%{opacity:1}100%{top:100%;opacity:0}}
    .cl-grid{position:absolute;inset:0;opacity:0;background:repeating-linear-gradient(0deg,rgba(138,109,31,.22) 0 1px,transparent 1px 48px),repeating-linear-gradient(90deg,rgba(138,109,31,.22) 0 1px,transparent 1px 48px);-webkit-mask-image:radial-gradient(70% 80% at 70% 40%,#000,transparent);mask-image:radial-gradient(70% 80% at 70% 40%,#000,transparent);animation:clGrid 2.8s ease-out .3s both}
    @keyframes clGrid{30%{opacity:1}100%{opacity:0}}
    .cl-lens{position:absolute;left:0;top:0;width:170px;height:170px;margin:-85px 0 0 -85px;scale:0;opacity:0;transition:scale .7s cubic-bezier(.34,1.56,.64,1),opacity .4s}
    .is-lens .cl-lens{scale:1;opacity:1}
    .cl-spin{transform-origin:100px 100px;animation:clSpin 24s linear infinite}.cl-spin2{transform-origin:100px 100px;animation:clSpin 9s linear infinite reverse}
    @keyframes clSpin{to{transform:rotate(360deg)}}
    @media (prefers-reduced-motion:reduce){.cl-strip{animation:none}.cl-strip:not(:first-child){display:none}.cl-strip:first-child{clip-path:none}.cl-scan,.cl-grid,.cl-lens{display:none}}
  </style>
  <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <div id="cl-strips"></div>
    <span class="cl-scan"></span><span class="cl-grid"></span>
    <div class="cl-lens">
      <div class="cl-zoom absolute inset-2 rounded-full bg-no-repeat shadow-[0_24px_60px_-18px_rgba(17,40,40,.55),inset_0_0_0_1px_rgba(255,255,255,.6)]" style="background-image:var(--img)"></div>
      <svg viewBox="0 0 200 200" class="absolute -inset-[14px] h-[calc(100%+28px)] w-[calc(100%+28px)] overflow-visible fill-none">
        <circle class="cl-spin" cx="100" cy="100" r="98" stroke="#8A6D1F" stroke-width="6" stroke-dasharray="1 7.3" opacity=".7"/>
        <circle class="cl-spin2" cx="100" cy="100" r="90" stroke="#E2CA7C" stroke-width="2" stroke-dasharray="22 3 6 3"/>
        <path d="M100 80v40M80 100h40" stroke="#fff" stroke-width="1.5"/>
      </svg>
      <div class="absolute left-1/2 top-[calc(100%+22px)] flex -translate-x-1/2 gap-2.5 whitespace-nowrap rounded-full bg-[rgba(14,46,46,.82)] px-3 py-1.5 text-[11px] font-semibold tracking-[.12em] text-white"><b class="text-[#E2CA7C]">2X</b><em class="cl-xy not-italic opacity-75">00 · 00</em></div>
    </div>
  </div>
  <div class="relative z-10 max-w-xl px-6 py-24 md:px-16"><!-- título, texto e botão --></div>
  <script>
  (function () {
    var sec = document.getElementById('cl-hero'), IW = 1920, IH = 800, Z = 2;
    var strips = sec.querySelector('#cl-strips');
    for (var i = 0; i < 12; i++) { var s = document.createElement('i'); s.className = 'cl-strip'; s.style.setProperty('--i', i); s.style.setProperty('--dir', i % 2 ? 1 : -1); strips.appendChild(s); }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var lens = sec.querySelector('.cl-lens'), zoom = sec.querySelector('.cl-zoom'), xy = sec.querySelector('.cl-xy');
    var W, H, ox, oy, x, y, tx, ty, user = false, idle, t0 = performance.now();
    function measure() { W = sec.clientWidth; H = sec.clientHeight; var k = Math.max(W / IW, H / IH), dw = IW * k, dh = IH * k; ox = (W - dw) / 2; oy = (H - dh) / 2; zoom.style.backgroundSize = dw * Z + 'px ' + dh * Z + 'px'; }
    function auto(t) { var k = t / 1000; tx = W * (0.6 + 0.32 * (0.5 + 0.5 * Math.sin(k * 0.37))); ty = H * (0.16 + 0.62 * (0.5 + 0.5 * Math.sin(k * 0.53 + 1.3))); }
    function frame(t) {
      if (!user) auto(t - t0);
      x += (tx - x) * 0.08; y += (ty - y) * 0.08;
      lens.style.translate = x + 'px ' + y + 'px';
      var L = lens.offsetWidth - 16;
      zoom.style.backgroundPosition = (L / 2 - (x - ox) * Z) + 'px ' + (L / 2 - (y - oy) * Z) + 'px';
      xy.textContent = String(Math.round(x / W * 99)).padStart(2, '0') + ' · ' + String(Math.round(y / H * 99)).padStart(2, '0');
      requestAnimationFrame(frame);
    }
    sec.addEventListener('pointermove', function (e) { var r = sec.getBoundingClientRect(); user = true; tx = e.clientX - r.left; ty = e.clientY - r.top; clearTimeout(idle); idle = setTimeout(function () { user = false; }, 2600); });
    addEventListener('resize', measure);
    measure(); auto(0); x = tx; y = ty;
    setTimeout(function () { sec.classList.add('is-lens'); requestAnimationFrame(frame); }, 2300);
  })();
  </script>
</section>`
    }
  },
  {
    ...B,
    id: "uromed-entry-fill-button",
    name: "Botão que Enche a Partir de Onde o Mouse Entra",
    category: "buttons-ctas",
    categoryLabel: "Botões & Ações",
    badge: "Uromed",
    description: "Um círculo dourado nasce exatamente no ponto onde o cursor entra e se esvazia pelo ponto de saída. O texto rola para cima trocando de cor e a seta sai pela direita enquanto outra entra pela esquerda.",
    tags: ["Hover", "Pointer Origin", "Text Roll", "Arrow Swap", "Pill"],
    defaultSection: "CTA Final",
    previewType: "um-entry-fill",
    tech: ["Tailwind CSS", "React", "CSS Transitions"],
    frameworks: {
      react: `const CSS = '.efb{--fill:#E2CA7C;--hc:#283838;position:relative;isolation:isolate;overflow:hidden}' +
  '.efb::before{content:"";position:absolute;z-index:-1;left:var(--x,50%);top:var(--y,50%);width:230%;aspect-ratio:1;border-radius:50%;background:var(--fill);transform:translate(-50%,-50%) scale(0);transition:transform .7s cubic-bezier(.22,1,.36,1)}' +
  '.efb:hover::before,.efb:focus-visible::before{transform:translate(-50%,-50%) scale(1)}' +
  '.efb-t{position:relative;display:block;overflow:hidden;padding-block:2px}.efb-t>span{display:block;transition:transform .6s cubic-bezier(.22,1,.36,1)}' +
  '.efb-t::after{content:attr(data-label);position:absolute;left:0;top:100%;width:100%;padding-block:2px;color:var(--hc);transition:transform .6s cubic-bezier(.22,1,.36,1)}' +
  '.efb:hover .efb-t>span,.efb:focus-visible .efb-t>span{transform:translateY(-110%)}.efb:hover .efb-t::after,.efb:focus-visible .efb-t::after{transform:translateY(-100%)}' +
  '.efb-a svg{position:absolute;left:10px;top:10px;width:20px;height:20px;transition:transform .55s cubic-bezier(.22,1,.36,1)}.efb-a svg+svg{transform:translateX(-200%)}' +
  '.efb:hover .efb-a svg,.efb:focus-visible .efb-a svg{transform:translateX(200%)}.efb:hover .efb-a svg+svg,.efb:focus-visible .efb-a svg+svg{transform:none;transition-delay:.08s}' +
  '.efb:hover .efb-a,.efb:focus-visible .efb-a{background:#283838;color:#E2CA7C}.efb:active{transform:scale(.985)}' +
  '@media (prefers-reduced-motion:reduce){.efb *,.efb::before{transition:none!important}}';

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export function EntryFillButton({ href = '#', label = 'Agendar minha consulta' }) {
  // posiciona o centro do círculo no ponto de entrada/saída do ponteiro
  const at = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', ((e.clientX - r.left) / r.width) * 100 + '%');
    e.currentTarget.style.setProperty('--y', ((e.clientY - r.top) / r.height) * 100 + '%');
  };
  return (
    <>
      <style>{CSS}</style>
      <a href={href} onPointerEnter={at} onPointerLeave={at}
        className="efb inline-flex min-h-[60px] max-w-full items-center gap-[30px] rounded-full bg-[#283838] py-[9px] pl-10 pr-[9px] text-[15px] font-semibold leading-snug text-white no-underline">
        <span className="efb-t" data-label={label}><span>{label}</span></span>
        <span className="efb-a relative h-10 w-10 flex-none overflow-hidden rounded-full bg-[#E2CA7C] text-[#283838] transition-colors duration-500">
          <Arrow /><Arrow />
        </span>
      </a>
    </>
  );
}`,
      tailwind: `<style>
  .efb{--fill:#E2CA7C;--hc:#283838;position:relative;isolation:isolate;overflow:hidden}
  .efb::before{content:"";position:absolute;z-index:-1;left:var(--x,50%);top:var(--y,50%);width:230%;aspect-ratio:1;border-radius:50%;background:var(--fill);transform:translate(-50%,-50%) scale(0);transition:transform .7s cubic-bezier(.22,1,.36,1)}
  .efb:hover::before,.efb:focus-visible::before{transform:translate(-50%,-50%) scale(1)}
  .efb-t{position:relative;display:block;overflow:hidden;padding-block:2px}.efb-t>span{display:block;transition:transform .6s cubic-bezier(.22,1,.36,1)}
  .efb-t::after{content:attr(data-label);position:absolute;left:0;top:100%;width:100%;padding-block:2px;color:var(--hc);transition:transform .6s cubic-bezier(.22,1,.36,1)}
  .efb:hover .efb-t>span{transform:translateY(-110%)}.efb:hover .efb-t::after{transform:translateY(-100%)}
  .efb-a svg{position:absolute;left:10px;top:10px;width:20px;height:20px;transition:transform .55s cubic-bezier(.22,1,.36,1)}.efb-a svg+svg{transform:translateX(-200%)}
  .efb:hover .efb-a svg{transform:translateX(200%)}.efb:hover .efb-a svg+svg{transform:none;transition-delay:.08s}
  .efb:hover .efb-a{background:#283838;color:#E2CA7C}
</style>
<a href="#" class="efb inline-flex min-h-[60px] items-center gap-[30px] rounded-full bg-[#283838] py-[9px] pl-10 pr-[9px] text-[15px] font-semibold text-white no-underline">
  <span class="efb-t" data-label="Agendar minha consulta"><span>Agendar minha consulta</span></span>
  <span class="efb-a relative h-10 w-10 flex-none overflow-hidden rounded-full bg-[#E2CA7C] text-[#283838] transition-colors duration-500">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  </span>
</a>
<script>
  document.querySelectorAll('.efb').forEach(function (b) {
    function at(e) { var r = b.getBoundingClientRect(); b.style.setProperty('--x', (e.clientX - r.left) / r.width * 100 + '%'); b.style.setProperty('--y', (e.clientY - r.top) / r.height * 100 + '%'); }
    b.addEventListener('pointerenter', at); b.addEventListener('pointerleave', at);
  });
</script>`
    }
  },
  {
    ...B,
    id: "uromed-keyword-shine-title",
    name: "Título que Sai do Desfoque com Brilho Dourado no Trecho-Chave",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    badge: "Uromed",
    description: "As palavras do título surgem uma a uma saindo do desfoque e subindo; logo depois, um reflexo dourado atravessa o trecho-chave de ponta a ponta, contínuo entre as palavras. Elegante e premium, sem exagero.",
    tags: ["Split Text", "Blur Reveal", "Gradient Shine", "Background-Clip", "IntersectionObserver"],
    defaultSection: "Títulos de Seção",
    previewType: "um-keyword-shine",
    tech: ["Tailwind CSS", "React", "CSS Keyframes", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const CSS = '.ks-w{display:inline-block;opacity:0;filter:blur(10px);transform:translateY(.5em);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1),filter .8s cubic-bezier(.22,1,.36,1);transition-delay:calc(var(--i)*40ms)}' +
  '.is-in .ks-w{opacity:1;filter:none;transform:none}' +
  '.ks-kw{padding:.12em .06em .22em;margin:-.12em -.06em -.22em;background-image:linear-gradient(100deg,#4F7F6B 0 40%,#8A6D1F 47%,#E2CA7C 50%,#8A6D1F 53%,#4F7F6B 60% 100%);background-size:260% 100%;background-position:100% 0;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}' +
  '.is-in .ks-kw{animation:ksShine 1.8s cubic-bezier(.45,0,.25,1) calc(.55s + var(--i)*40ms) both}' +
  '@keyframes ksShine{from{background-position:100% 0}to{background-position:0 0}}' +
  '@media (prefers-reduced-motion:reduce){.ks-w{opacity:1;filter:none;transform:none;transition:none}.ks-kw{animation:none!important;background-position:0 0}}';

// before = texto antes do destaque, keyword = trecho que brilha, after = resto
export function KeywordShineTitle({ before = 'Cirurgia urológica com a', keyword = 'precisão da robótica', after = '' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const a = before.split(' ').filter(Boolean), c = after.split(' ').filter(Boolean);
  let i = 0;
  return (
    <h2 ref={ref} aria-label={[before, keyword, after].join(' ').trim()} className={'text-[clamp(28px,3vw,40px)] font-semibold leading-tight tracking-tight text-[#283838] ' + (inView ? 'is-in' : '')}>
      <style>{CSS}</style>
      {a.map((w) => <span key={'a' + i} aria-hidden className="ks-w" style={{ '--i': i++ }}>{w}&nbsp;</span>)}
      <span aria-hidden className="ks-w" style={{ '--i': i++ }}><span className="ks-kw" style={{ '--i': i }}>{keyword}</span>&nbsp;</span>
      {c.map((w) => <span key={'c' + i} aria-hidden className="ks-w" style={{ '--i': i++ }}>{w}&nbsp;</span>)}
    </h2>
  );
}`,
      tailwind: `<style>
  .ks-w{display:inline-block;opacity:0;filter:blur(10px);transform:translateY(.5em);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1),filter .8s cubic-bezier(.22,1,.36,1);transition-delay:calc(var(--i)*40ms)}
  .is-in .ks-w{opacity:1;filter:none;transform:none}
  .ks-kw{padding:.12em .06em .22em;margin:-.12em -.06em -.22em;background-image:linear-gradient(100deg,#4F7F6B 0 40%,#8A6D1F 47%,#E2CA7C 50%,#8A6D1F 53%,#4F7F6B 60% 100%);background-size:260% 100%;background-position:100% 0;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
  .is-in .ks-kw{animation:ksShine 1.8s cubic-bezier(.45,0,.25,1) .7s both}
  @keyframes ksShine{from{background-position:100% 0}to{background-position:0 0}}
</style>
<!-- marque o trecho-chave com <em data-kw> -->
<h2 data-ks class="text-[clamp(28px,3vw,40px)] font-semibold leading-tight text-[#283838]">Cirurgia urológica com a <em data-kw class="not-italic">precisão da robótica</em></h2>
<script>
  document.querySelectorAll('[data-ks]').forEach(function (h) {
    var i = 0, out = [];
    h.setAttribute('aria-label', h.textContent.trim());
    h.childNodes.forEach(function (n) {
      if (n.nodeType === 1 && n.hasAttribute('data-kw')) out.push('<span aria-hidden="true" class="ks-w" style="--i:' + i++ + '"><span class="ks-kw">' + n.textContent + '</span> </span>');
      else n.textContent.split(/\\s+/).forEach(function (w) { if (w) out.push('<span aria-hidden="true" class="ks-w" style="--i:' + i++ + '">' + w + ' </span>'); });
    });
    h.innerHTML = out.join('');
    new IntersectionObserver(function (en) { h.classList.toggle('is-in', en[0].isIntersecting); }, { threshold: .2 }).observe(h);
  });
</script>`
    }
  },
  {
    ...B,
    id: "uromed-count-stats",
    name: "Números que Contam e Acendem em Dourado",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    badge: "Uromed",
    description: "Faixa escura com números que contam do zero (com desaceleração suave) sempre que entram na tela, ficam dourados durante a contagem, dão um 'pop' no fim e enchem um fio dourado embaixo. Recomeçam ao sair e voltar.",
    tags: ["Counter", "Stat", "Ease Out", "Autoridade", "IntersectionObserver"],
    defaultSection: "Números / Prova Social",
    previewType: "um-count-stats",
    tech: ["Tailwind CSS", "React", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

function Stat({ pre, value, unit, text }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const [p, setP] = useState(0);
  const [state, setState] = useState('idle'); // idle | counting | done
  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(value); setP(1); return; }
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf); setState('counting');
      const t0 = performance.now(), dur = 2200 + String(value).length * 250;
      const tick = (now) => {
        const t = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - t, 4);
        setN(Math.round(e * value)); setP(e);
        if (t < 1) raf = requestAnimationFrame(tick); else setState('done');
      };
      raf = requestAnimationFrame(tick);
    };
    const reset = () => { cancelAnimationFrame(raf); setN(0); setP(0); setState('idle'); };
    const io = new IntersectionObserver(([e]) => { if (e.intersectionRatio >= 0.6) run(); else if (!e.isIntersecting) reset(); }, { threshold: [0, 0.6] });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return (
    <div ref={ref} className="text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#E2CA7C]">{pre}</p>
      <p className="mt-2 flex items-baseline justify-center text-[clamp(48px,5.4vw,72px)] font-light leading-tight tabular-nums">
        <b aria-label={String(value)} style={{ minWidth: String(value).length + 'ch' }}
          className={'inline-block text-right font-normal transition-colors duration-500 ' + (state === 'counting' ? 'text-[#E2CA7C]' : '') + (state === 'done' ? ' animate-[statPop_.7s_cubic-bezier(.22,1,.36,1)]' : '')}>{n}</b>
        <span className="whitespace-pre font-light text-[#E2CA7C]">{unit}</span>
      </p>
      <span className="relative mx-auto mb-3.5 mt-4 block h-px w-[72px] overflow-hidden bg-[rgba(226,202,124,.25)]">
        <i className="absolute inset-0 origin-left bg-[#E2CA7C]" style={{ transform: 'scaleX(' + p + ')' }} />
      </span>
      <p className="mx-auto max-w-[24ch] text-[15px] text-white/80">{text}</p>
    </div>
  );
}

export function CountStats({ items = [
  { pre: 'Mais de', value: 15, unit: ' anos', text: 'de experiência em urologia' },
  { pre: 'Mais de', value: 2000, unit: '', text: 'cirurgias realizadas' },
  { pre: 'Até', value: 98, unit: '%', text: 'de satisfação dos pacientes' },
] }) {
  return (
    <section className="bg-[#283838] px-6 py-16 text-white">
      <style>{'@keyframes statPop{40%{transform:scale(1.08)}}'}</style>
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">{items.map((it, i) => <Stat key={i} {...it} />)}</div>
    </section>
  );
}`,
      tailwind: `<section class="bg-[#283838] px-6 py-16 text-white">
  <style>
    @keyframes statPop{40%{transform:scale(1.08)}}
    .cs.is-counting b{color:#E2CA7C}.cs.is-done b{animation:statPop .7s cubic-bezier(.22,1,.36,1)}
    .cs-bar::after{content:"";position:absolute;inset:0;background:#E2CA7C;transform:scaleX(var(--cp,0));transform-origin:left}
  </style>
  <div class="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
    <div class="cs text-center">
      <p class="text-[11px] font-semibold uppercase tracking-[.2em] text-[#E2CA7C]">Mais de</p>
      <p class="mt-2 flex items-baseline justify-center text-[clamp(48px,5.4vw,72px)] font-light tabular-nums"><b data-count="2000" class="inline-block text-right font-normal transition-colors duration-500">2000</b></p>
      <span class="cs-bar relative mx-auto mb-3.5 mt-4 block h-px w-[72px] overflow-hidden bg-[rgba(226,202,124,.25)]"></span>
      <p class="mx-auto max-w-[24ch] text-[15px] text-white/80">cirurgias realizadas</p>
    </div>
    <!-- repita .cs para os outros números -->
  </div>
  <script>
    document.querySelectorAll('.cs').forEach(function (st) {
      var b = st.querySelector('[data-count]'), target = +b.dataset.count, raf = 0;
      b.style.minWidth = String(target).length + 'ch';
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      b.textContent = '0';
      function run() {
        cancelAnimationFrame(raf); st.classList.remove('is-done'); st.classList.add('is-counting');
        var t0 = performance.now(), dur = 2200 + String(target).length * 250;
        (function tick(now) {
          var t = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - t, 4);
          b.textContent = Math.round(e * target); st.style.setProperty('--cp', e);
          if (t < 1) raf = requestAnimationFrame(tick); else { st.classList.remove('is-counting'); st.classList.add('is-done'); }
        })(t0);
      }
      new IntersectionObserver(function (en) {
        var e = en[0];
        if (e.intersectionRatio >= .6) run();
        else if (!e.isIntersecting) { cancelAnimationFrame(raf); b.textContent = '0'; st.style.setProperty('--cp', 0); st.classList.remove('is-done', 'is-counting'); }
      }, { threshold: [0, .6] }).observe(st);
    });
  </script>
</section>`
    }
  },
  {
    ...B,
    id: "uromed-scroll-deck",
    name: "Cartas que Entram pela Direita e Empilham com a Rolagem",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    badge: "Uromed",
    description: "A seção trava na tela e a rolagem traz cada carta da direita, girando levemente até assentar sobre a anterior, que recua, encolhe e escurece. Um contador 01/05 com barra acompanha. Ótimo para 'Para quem é'.",
    tags: ["Sticky", "Scroll Linked", "Stack", "Cards", "Counter"],
    defaultSection: "Para Quem É",
    previewType: "um-scroll-deck",
    tech: ["Tailwind CSS", "React", "Scroll Linked"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const THEMES = [
  'bg-white text-[#111827] border-[rgba(40,56,56,.13)]',
  'bg-[#F0F5F2] text-[#111827] border-[#E3EDE8]',
  'bg-[#283838] text-white border-[#283838]',
  'bg-[#F4EACB] text-[#283838] border-[#EADBA8]',
  'bg-[#3F6A57] text-white border-[#3F6A57]',
];

export function ScrollDeck({ title = 'Para quem é', cards = [
  'Homens que adiam o check-up há anos.',
  'Quem tem sintomas urinários e não sabe por onde começar.',
  'Pacientes com indicação de cirurgia que querem a técnica menos invasiva.',
  'Quem quer uma segunda opinião antes de decidir.',
  'Famílias que querem cuidar de quem amam.',
] }) {
  const pinRef = useRef(null), stickyRef = useRef(null), gridRef = useRef(null), cardRefs = useRef([]);
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const pin = pinRef.current, sticky = stickyRef.current, grid = gridRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const n = cards.length;
    let st = 16, dist = 0, ticking = false;
    // o sticky tem a altura do conteúdo; o pin soma a distância do efeito (sem vazios)
    const size = () => {
      const vh = window.innerHeight, h = sticky.offsetHeight;
      dist = (n - 1) * vh * 0.55; st = Math.max(16, (vh - h) / 2);
      sticky.style.top = st + 'px'; pin.style.height = h + dist + 'px';
    };
    const update = () => {
      ticking = false;
      const vw = window.innerWidth, narrow = vw <= 900;
      const prog = dist > 0 ? clamp((st - pin.getBoundingClientRect().top) / dist, 0, 1) : 0;
      const f = clamp(prog * (n - 1 + 0.4) - 0.15, 0, n - 1);
      const away = vw - grid.getBoundingClientRect().left + 60;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const e = i === 0 ? 1 : clamp(f - (i - 1), 0, 1), ee = 1 - Math.pow(1 - e, 3);
        const d = Math.min(Math.max(f - i, 0), narrow ? 1 : 3);
        card.style.transform = 'translate3d(' + ((1 - ee) * away).toFixed(1) + 'px,' + (narrow ? 0 : -d * 20).toFixed(1) + 'px,0) rotate(' + ((1 - ee) * 9).toFixed(2) + 'deg) scale(' + (1 - d * (narrow ? 0.04 : 0.05)).toFixed(4) + ')';
        card.firstElementChild.style.setProperty('--dim', (d * 0.12).toFixed(3));
      });
      setCur(Math.round(f));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    size(); update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { size(); onScroll(); });
    return () => window.removeEventListener('scroll', onScroll);
  }, [cards.length]);

  return (
    <section className="bg-white px-6">
      <style>{'.dk-in::after{content:"";position:absolute;inset:0;border-radius:inherit;background:#283838;opacity:var(--dim,0);pointer-events:none}@media (prefers-reduced-motion:reduce){.dk-grid{display:flex!important;flex-direction:column;gap:16px}}'}</style>
      <div ref={pinRef} className="relative">
        <div ref={stickyRef} className="sticky top-4 mx-auto grid max-w-6xl items-center gap-8 py-12 md:grid-cols-[.78fr_1.22fr] md:gap-24">
          <div>
            <h2 className="text-[clamp(28px,2.7vw,36px)] font-semibold leading-tight text-[#283838]">{title}</h2>
            <div className="mt-10 flex items-center gap-4 tabular-nums">
              <span className="min-w-[2ch] text-[44px] font-light leading-none text-[#283838]">{'0' + (cur + 1)}</span>
              <span className="relative h-px w-[140px] bg-[rgba(40,56,56,.13)]"><i className="absolute inset-0 origin-left bg-[#8A6D1F] transition-transform duration-500" style={{ transform: 'scaleX(' + (cur + 1) / cards.length + ')' }} /></span>
              <span className="text-sm tracking-widest text-[#4B5563]">{'0' + cards.length}</span>
            </div>
          </div>
          <div ref={gridRef} className="dk-grid grid pt-16">
            {cards.map((t, i) => (
              <div key={i} ref={(el) => (cardRefs.current[i] = el)} className="origin-top will-change-transform" style={{ gridArea: '1/1' }}>
                <div className={'dk-in relative flex min-h-[260px] items-center rounded-[28px] border p-8 text-[clamp(17px,1.6vw,21px)] font-medium leading-normal md:p-11 ' + THEMES[i % THEMES.length]}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<section class="bg-white px-6">
  <style>.dk-in::after{content:"";position:absolute;inset:0;border-radius:inherit;background:#283838;opacity:var(--dim,0);pointer-events:none}</style>
  <div id="dk-pin" class="relative">
    <div class="dk-sticky sticky top-4 mx-auto grid max-w-6xl items-center gap-8 py-12 md:grid-cols-[.78fr_1.22fr] md:gap-24">
      <div>
        <h2 class="text-[clamp(28px,2.7vw,36px)] font-semibold text-[#283838]">Para quem é</h2>
        <div class="mt-10 flex items-center gap-4 tabular-nums"><span class="dk-cur text-[44px] font-light leading-none text-[#283838]">01</span><span class="relative h-px w-[140px] bg-[rgba(40,56,56,.13)]"><i class="dk-fill absolute inset-0 origin-left bg-[#8A6D1F] transition-transform duration-500"></i></span></div>
      </div>
      <div class="dk-grid grid pt-16">
        <div class="dk-card origin-top" style="grid-area:1/1"><div class="dk-in relative flex min-h-[260px] items-center rounded-[28px] border border-[rgba(40,56,56,.13)] bg-white p-10 text-xl font-medium">Homens que adiam o check-up há anos.</div></div>
        <div class="dk-card origin-top" style="grid-area:1/1"><div class="dk-in relative flex min-h-[260px] items-center rounded-[28px] border border-[#283838] bg-[#283838] p-10 text-xl font-medium text-white">Quem tem sintomas e não sabe por onde começar.</div></div>
        <div class="dk-card origin-top" style="grid-area:1/1"><div class="dk-in relative flex min-h-[260px] items-center rounded-[28px] border border-[#EADBA8] bg-[#F4EACB] p-10 text-xl font-medium text-[#283838]">Quem quer uma segunda opinião.</div></div>
      </div>
    </div>
  </div>
  <script>
  (function () {
    var pin = document.getElementById('dk-pin'), sticky = pin.querySelector('.dk-sticky'), grid = pin.querySelector('.dk-grid');
    var cards = pin.querySelectorAll('.dk-card'), cur = pin.querySelector('.dk-cur'), fill = pin.querySelector('.dk-fill'), n = cards.length, st = 16, dist = 0;
    var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { grid.style.cssText = 'display:flex;flex-direction:column;gap:16px'; return; }
    function size() { var vh = innerHeight, h = sticky.offsetHeight; dist = (n - 1) * vh * .55; st = Math.max(16, (vh - h) / 2); sticky.style.top = st + 'px'; pin.style.height = h + dist + 'px'; }
    function update() {
      var vw = innerWidth, narrow = vw <= 900, prog = clamp((st - pin.getBoundingClientRect().top) / dist, 0, 1);
      var f = clamp(prog * (n - 1 + .4) - .15, 0, n - 1), away = vw - grid.getBoundingClientRect().left + 60;
      cards.forEach(function (c, i) {
        var e = i === 0 ? 1 : clamp(f - (i - 1), 0, 1), ee = 1 - Math.pow(1 - e, 3), d = Math.min(Math.max(f - i, 0), narrow ? 1 : 3);
        c.style.transform = 'translate3d(' + (1 - ee) * away + 'px,' + (narrow ? 0 : -d * 20) + 'px,0) rotate(' + (1 - ee) * 9 + 'deg) scale(' + (1 - d * (narrow ? .04 : .05)) + ')';
        c.firstElementChild.style.setProperty('--dim', d * .12);
      });
      var k = Math.round(f); cur.textContent = '0' + (k + 1); fill.style.transform = 'scaleX(' + (k + 1) / n + ')';
    }
    var tk = false; addEventListener('scroll', function () { if (!tk) { tk = true; requestAnimationFrame(function () { tk = false; update(); }); } }, { passive: true });
    addEventListener('resize', function () { size(); update(); }); size(); update();
  })();
  </script>
</section>`
    }
  },
  {
    ...B,
    id: "uromed-fear-scrub-sentence",
    name: "Frase que Acende Palavra por Palavra com a Rolagem",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    badge: "Uromed",
    description: "Uma frase grande começa apagada e desfocada; conforme a pessoa rola, cada palavra sai do desfoque em sequência, e as palavras-chave ganham uma marca-texto dourada que se desenha. Prende a leitura de uma objeção ou medo.",
    tags: ["Scroll Linked", "Blur Reveal", "Highlighter", "Storytelling", "Objeção"],
    defaultSection: "Quebra de Objeção",
    previewType: "um-fear-scrub",
    tech: ["Tailwind CSS", "React", "Scroll Linked"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const CSS = '.fs-w{display:inline-block;position:relative;isolation:isolate;opacity:.1;filter:blur(8px);transform:translateY(.35em);transition:opacity .6s cubic-bezier(.22,1,.36,1),filter .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}' +
  '.fs-w.on{opacity:1;filter:none;transform:none}.fs-key{color:#3F6A57}' +
  '.fs-key::after{content:"";position:absolute;z-index:-1;left:-.08em;right:-.32em;bottom:.08em;height:.42em;background:#E2CA7C;opacity:.55;border-radius:3px;transform:scaleX(0);transform-origin:left;transition:transform .6s cubic-bezier(.22,1,.36,1) .2s}' +
  '.fs-key.on::after{transform:scaleX(1)}' +
  '@media (prefers-reduced-motion:reduce){.fs-w{opacity:1;filter:none;transform:none}.fs-key::after{transform:none}}';

// palavras entre *asteriscos* viram destaque
export function FearScrubSentence({ text = 'E se for algo *sério* e eu descobrir *tarde* *demais*?' }) {
  const ref = useRef(null);
  const words = text.split(' ').map((w) => ({ w: w.replace(/\\*/g, ''), key: w.startsWith('*') }));
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOn(words.length); return; }
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight, r = ref.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.88 - r.top) / (r.height + vh * 0.35)));
      setOn(Math.round(p * words.length));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [words.length]);
  return (
    <p ref={ref} aria-label={text.replace(/\\*/g, '')} className="mx-auto max-w-[920px] text-center text-[clamp(21px,2.3vw,30px)] font-bold leading-normal tracking-tight text-[#283838]">
      <style>{CSS}</style>
      {words.map((x, i) => (
        <span key={i} aria-hidden className={'fs-w ' + (x.key ? 'fs-key ' : '') + (i < on ? 'on' : '')}>{x.w}</span>
      )).reduce((acc, el, i) => (i ? [...acc, ' ', el] : [el]), [])}
    </p>
  );
}`,
      tailwind: `<style>
  .fs-w{display:inline-block;position:relative;isolation:isolate;opacity:.1;filter:blur(8px);transform:translateY(.35em);transition:opacity .6s cubic-bezier(.22,1,.36,1),filter .6s,transform .6s cubic-bezier(.22,1,.36,1)}
  .fs-w.on{opacity:1;filter:none;transform:none}.fs-key{color:#3F6A57}
  .fs-key::after{content:"";position:absolute;z-index:-1;left:-.08em;right:-.32em;bottom:.08em;height:.42em;background:#E2CA7C;opacity:.55;border-radius:3px;transform:scaleX(0);transform-origin:left;transition:transform .6s cubic-bezier(.22,1,.36,1) .2s}
  .fs-key.on::after{transform:scaleX(1)}
</style>
<!-- palavras entre *asteriscos* viram destaque -->
<p id="fs" class="mx-auto max-w-[920px] text-center text-[clamp(21px,2.3vw,30px)] font-bold text-[#283838]">E se for algo *sério* e eu descobrir *tarde* *demais*?</p>
<script>
(function () {
  var el = document.getElementById('fs'), raw = el.textContent.trim();
  el.setAttribute('aria-label', raw.replace(/\\*/g, ''));
  el.innerHTML = raw.split(' ').map(function (w) { return '<span aria-hidden="true" class="fs-w' + (w[0] === '*' ? ' fs-key' : '') + '">' + w.replace(/\\*/g, '') + '</span>'; }).join(' ');
  var ws = el.querySelectorAll('.fs-w');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { ws.forEach(function (w) { w.classList.add('on'); }); return; }
  function update() {
    var vh = innerHeight, r = el.getBoundingClientRect(), p = Math.min(1, Math.max(0, (vh * .88 - r.top) / (r.height + vh * .35)));
    var on = Math.round(p * ws.length); ws.forEach(function (w, i) { w.classList.toggle('on', i < on); });
  }
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true }); update();
})();
</script>`
    }
  },
  {
    ...B,
    id: "uromed-horizontal-scroll-gallery",
    name: "Galeria que Anda na Horizontal com a Rolagem",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    badge: "Uromed",
    description: "A seção trava e a rolagem vertical empurra uma faixa de foto + cards para o lado. O card mais perto do centro acende com borda dourada e sobe um pouco; uma barra fina mostra o progresso.",
    tags: ["Sticky", "Horizontal Scroll", "Scroll Linked", "Active State", "Progress"],
    defaultSection: "Diferenciais",
    previewType: "um-h-gallery",
    tech: ["Tailwind CSS", "React", "Scroll Linked"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function HorizontalScrollGallery({ photo = '/robo.webp', items = [
  'Visão 3D ampliada em até 10x',
  'Pinças que giram 540°, mais que o punho humano',
  'Movimentos sem tremor',
  'Cortes menores e recuperação mais rápida',
] }) {
  const pinRef = useRef(null), stickyRef = useRef(null), trackRef = useRef(null), barRef = useRef(null);
  useEffect(() => {
    const pin = pinRef.current, sticky = stickyRef.current, track = trackRef.current, bar = barRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { sticky.style.overflowX = 'auto'; return; }
    let st = 16, dist = 0, hdist = 0, ticking = false;
    const size = () => {
      const vh = window.innerHeight, h = sticky.offsetHeight;
      hdist = Math.max(0, track.offsetWidth - window.innerWidth); dist = hdist * 1.1;
      st = Math.max(16, (vh - h) / 2); sticky.style.top = st + 'px'; pin.style.height = h + dist + 'px';
    };
    const update = () => {
      ticking = false;
      const vw = window.innerWidth;
      const prog = dist > 0 ? clamp((st - pin.getBoundingClientRect().top) / dist, 0, 1) : 0;
      const q = clamp((prog - 0.04) / 0.92, 0, 1);
      track.style.transform = 'translate3d(' + (-q * hdist).toFixed(1) + 'px,0,0)';
      bar.style.transform = 'scaleX(' + q.toFixed(4) + ')';
      const feats = Array.from(track.querySelectorAll('[data-feat]'));
      let best = null, bestD = 1e9;
      feats.forEach((it) => { const r = it.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - vw / 2); if (d < bestD) { bestD = d; best = it; } });
      if (q > 0.96) best = feats[feats.length - 1];
      feats.forEach((it) => it.classList.toggle('is-active', it === best));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    size(); update();
    window.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => { size(); onScroll(); };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, [items.length]);
  return (
    <section className="bg-[#283838] py-20 text-white">
      <style>{'.hg-f.is-active{border-color:#E2CA7C;transform:translateY(-10px)}.hg-f.is-active svg{opacity:1}'}</style>
      <div ref={pinRef} className="relative">
        <div ref={stickyRef} className="sticky top-4 flex flex-col gap-7 overflow-hidden py-3">
          <div ref={trackRef} className="flex w-max gap-6 px-[max(24px,calc((100vw-1160px)/2+24px))] will-change-transform">
            <div className="h-[min(62vh,480px)] w-[min(620px,84vw)] flex-none overflow-hidden rounded-[32px]"><img src={photo} alt="" className="h-full w-full object-cover" /></div>
            {items.map((t, i) => (
              <div key={i} data-feat className="hg-f flex h-[min(62vh,480px)] w-[min(360px,76vw)] flex-none flex-col justify-between rounded-[32px] border border-[rgba(226,202,124,.22)] bg-[linear-gradient(160deg,#2F4242,#1E2B2B)] p-10 transition-[border-color,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)]">
                <svg viewBox="0 0 48 48" className="h-24 w-24 opacity-50 transition-opacity duration-700" fill="none" stroke="#E2CA7C" strokeWidth="1.8"><circle cx="24" cy="24" r="16" /><path d="M24 14v20M14 24h20" /></svg>
                <p className="text-[clamp(19px,1.7vw,23px)] font-semibold leading-snug">{t}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto h-0.5 w-[min(320px,60vw)] overflow-hidden bg-[rgba(226,202,124,.22)]"><span ref={barRef} className="block h-full origin-left bg-[#E2CA7C]" style={{ transform: 'scaleX(0)' }} /></div>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<section class="bg-[#283838] py-20 text-white">
  <style>.hg-f.is-active{border-color:#E2CA7C;transform:translateY(-10px)}</style>
  <div id="hg-pin" class="relative">
    <div class="hg-sticky sticky top-4 flex flex-col gap-7 overflow-hidden py-3">
      <div class="hg-track flex w-max gap-6 px-6">
        <div class="h-[min(62vh,480px)] w-[min(620px,84vw)] flex-none overflow-hidden rounded-[32px]"><img src="/robo.webp" alt="" class="h-full w-full object-cover"></div>
        <div data-feat class="hg-f flex h-[min(62vh,480px)] w-[min(360px,76vw)] flex-none flex-col justify-end rounded-[32px] border border-[rgba(226,202,124,.22)] bg-[linear-gradient(160deg,#2F4242,#1E2B2B)] p-10 transition duration-700"><p class="text-xl font-semibold">Visão 3D ampliada em até 10x</p></div>
        <div data-feat class="hg-f flex h-[min(62vh,480px)] w-[min(360px,76vw)] flex-none flex-col justify-end rounded-[32px] border border-[rgba(226,202,124,.22)] bg-[linear-gradient(160deg,#2F4242,#1E2B2B)] p-10 transition duration-700"><p class="text-xl font-semibold">Movimentos sem tremor</p></div>
        <div data-feat class="hg-f flex h-[min(62vh,480px)] w-[min(360px,76vw)] flex-none flex-col justify-end rounded-[32px] border border-[rgba(226,202,124,.22)] bg-[linear-gradient(160deg,#2F4242,#1E2B2B)] p-10 transition duration-700"><p class="text-xl font-semibold">Recuperação mais rápida</p></div>
      </div>
      <div class="mx-auto h-0.5 w-[min(320px,60vw)] overflow-hidden bg-[rgba(226,202,124,.22)]"><span class="hg-bar block h-full origin-left bg-[#E2CA7C]" style="transform:scaleX(0)"></span></div>
    </div>
  </div>
  <script>
  (function () {
    var pin = document.getElementById('hg-pin'), sticky = pin.querySelector('.hg-sticky'), track = pin.querySelector('.hg-track'), bar = pin.querySelector('.hg-bar');
    var feats = track.querySelectorAll('[data-feat]'), st = 16, dist = 0, hdist = 0;
    var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
    function size() { var vh = innerHeight, h = sticky.offsetHeight; hdist = Math.max(0, track.offsetWidth - innerWidth); dist = hdist * 1.1; st = Math.max(16, (vh - h) / 2); sticky.style.top = st + 'px'; pin.style.height = h + dist + 'px'; }
    function update() {
      var q = clamp((clamp((st - pin.getBoundingClientRect().top) / dist, 0, 1) - .04) / .92, 0, 1);
      track.style.transform = 'translate3d(' + (-q * hdist) + 'px,0,0)'; bar.style.transform = 'scaleX(' + q + ')';
      var best = null, bd = 1e9;
      feats.forEach(function (f) { var r = f.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - innerWidth / 2); if (d < bd) { bd = d; best = f; } });
      if (q > .96) best = feats[feats.length - 1];
      feats.forEach(function (f) { f.classList.toggle('is-active', f === best); });
    }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { sticky.style.overflowX = 'auto'; return; }
    addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true });
    addEventListener('resize', function () { size(); update(); }); size(); update();
  })();
  </script>
</section>`
    }
  },
  {
    ...B,
    id: "uromed-crossed-bands",
    name: "Faixas Cruzadas com Nomes Correndo",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    badge: "Uromed",
    description: "Duas faixas inclinadas em sentidos opostos (uma escura com texto dourado, outra dourada com texto escuro) se cruzam em X e rolam sem fim com os nomes dos serviços. Separa seções com energia e reforça a oferta.",
    tags: ["Marquee", "Divider", "Loop Infinito", "Rotate", "Serviços"],
    defaultSection: "Entre Seções",
    previewType: "um-crossed-bands",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `const CSS = '@keyframes cbRun{to{transform:translateX(-50%)}}.cb-run{display:flex;width:max-content;animation:cbRun 60s linear infinite}.cb-rev{animation-direction:reverse;animation-duration:70s}@media (prefers-reduced-motion:reduce){.cb-run{animation:none}}';

const Plus = () => <svg viewBox="0 0 16 16" className="h-4 w-4 flex-none" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v12M2 8h12" /></svg>;

function Run({ items, rev }) {
  const list = items.concat(items); // duplicado para o loop não ter emenda
  return (
    <div className={'cb-run ' + (rev ? 'cb-rev' : '')}>
      {list.map((t, i) => (
        <span key={i} className="inline-flex items-center gap-7 whitespace-nowrap pr-7 text-sm font-semibold uppercase tracking-[.14em]">{t}<Plus /></span>
      ))}
    </div>
  );
}

export function CrossedBands({ items = ['Cirurgia robótica', 'Próstata', 'Cálculo renal', 'Vasectomia', 'Check-up masculino', 'Incontinência'] }) {
  return (
    <div aria-hidden className="relative h-[clamp(130px,15vw,200px)] overflow-hidden">
      <style>{CSS}</style>
      <div className="absolute -left-[6%] -right-[6%] top-1/2 -translate-y-1/2 rotate-[2.4deg] overflow-hidden bg-[#E2CA7C] py-4 text-[#283838]"><Run items={items} rev /></div>
      <div className="absolute -left-[6%] -right-[6%] top-1/2 z-10 -translate-y-1/2 -rotate-3 overflow-hidden bg-[#283838] py-4 text-[#E2CA7C]"><Run items={items} /></div>
    </div>
  );
}`,
      tailwind: `<div aria-hidden="true" class="relative h-[clamp(130px,15vw,200px)] overflow-hidden">
  <style>
    @keyframes cbRun{to{transform:translateX(-50%)}}
    .cb-run{display:flex;width:max-content;animation:cbRun 60s linear infinite}.cb-rev{animation-direction:reverse;animation-duration:70s}
    .cb-run span{display:inline-flex;align-items:center;gap:28px;padding-right:28px;white-space:nowrap;font-size:14px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
    .cb-run span::after{content:"+";font-size:18px}
    @media (prefers-reduced-motion:reduce){.cb-run{animation:none}}
  </style>
  <div class="absolute -left-[6%] -right-[6%] top-1/2 -translate-y-1/2 rotate-[2.4deg] overflow-hidden bg-[#E2CA7C] py-4 text-[#283838]"><div class="cb-run cb-rev" data-band></div></div>
  <div class="absolute -left-[6%] -right-[6%] top-1/2 z-10 -translate-y-1/2 -rotate-3 overflow-hidden bg-[#283838] py-4 text-[#E2CA7C]"><div class="cb-run" data-band></div></div>
  <script>
    var items = ['Cirurgia robótica', 'Próstata', 'Cálculo renal', 'Vasectomia', 'Check-up masculino'];
    var set = items.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    document.querySelectorAll('[data-band]').forEach(function (r) { r.innerHTML = set + set; });
  </script>
</div>`
    }
  },
  {
    ...B,
    id: "uromed-floating-photo-index",
    name: "Lista de Serviços com Foto Flutuando Atrás do Cursor",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    badge: "Uromed",
    description: "Lista editorial: no hover a linha se enche de verde de baixo para cima, o nome desliza e ganha uma camada dourada, e uma foto vertical flutua atrás do cursor com atraso e inclinação, trocando com uma cortina. No celular, o toque abre a foto dentro da linha.",
    tags: ["Hover Reveal", "Cursor Follow", "Lerp", "Clip-path", "Lista"],
    defaultSection: "Serviços / Tratamentos",
    previewType: "um-floating-index",
    tech: ["Tailwind CSS", "React", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const CSS = '.fi-btn::before{content:"";position:absolute;inset:0;z-index:-1;background:#283838;transform:scaleY(0);transform-origin:bottom;transition:transform .6s cubic-bezier(.22,1,.36,1)}' +
  '.fi-t{position:relative;transition:transform .7s cubic-bezier(.22,1,.36,1),color .4s}.fi-t::after{content:attr(data-text);position:absolute;inset:0;color:#E2CA7C;clip-path:inset(0 100% 0 0);transition:clip-path .7s cubic-bezier(.22,1,.36,1)}' +
  '.fi-dim .fi-row:not(.on) .fi-t{color:rgba(40,56,56,.28)}.fi-row.on .fi-btn{color:#fff}.fi-row.on .fi-btn::before{transform:none}.fi-row.on .fi-t{transform:translateX(18px);color:#fff}.fi-row.on .fi-t::after{clip-path:inset(0)}' +
  '.fi-plus{transition:transform .6s cubic-bezier(.22,1,.36,1),background-color .4s,border-color .4s}.fi-row.on .fi-plus{transform:rotate(135deg);background:#E2CA7C;border-color:#E2CA7C}' +
  '.fi-float{transform:translate3d(var(--x,0),var(--y,0),0) rotate(var(--r,0deg));opacity:0;scale:.5;transition:opacity .4s cubic-bezier(.22,1,.36,1),scale .6s cubic-bezier(.22,1,.36,1)}.fi-hover .fi-float{opacity:1;scale:1}' +
  '.fi-shot{clip-path:inset(100% 0 0 0 round 22px);transition:clip-path .7s cubic-bezier(.22,1,.36,1)}.fi-shot img{transform:scale(1.2);transition:transform 1.2s cubic-bezier(.22,1,.36,1)}.fi-shot.on{clip-path:inset(0 round 22px);z-index:1}.fi-shot.on img{transform:none}' +
  '.fi-mob{height:0;overflow:hidden;transition:height .7s cubic-bezier(.22,1,.36,1)}.fi-row.on .fi-mob{height:240px;margin:12px 0 16px}' +
  '@media (hover:hover) and (min-width:901px){.fi-mob{display:none}}@media (hover:none),(max-width:900px){.fi-float{display:none}}';

export function FloatingPhotoIndex({ items = [
  { title: 'Cirurgia robótica', img: '/s1.webp' },
  { title: 'Cálculo renal', img: '/s2.webp' },
  { title: 'Doenças da próstata', img: '/s3.webp' },
  { title: 'Vasectomia', img: '/s4.webp' },
] }) {
  const wrap = useRef(null), flt = useRef(null);
  const [cur, setCur] = useState(-1);
  const [hover, setHover] = useState(false);
  const s = useRef({ tx: 0, ty: 0, fx: 0, fy: 0, raf: 0 });
  const fine = () => window.matchMedia('(hover:hover) and (min-width:901px)').matches;

  const loop = () => {
    const v = s.current;
    v.fx += (v.tx - v.fx) * 0.14; v.fy += (v.ty - v.fy) * 0.14;
    const rot = Math.max(-12, Math.min(12, (v.tx - v.fx) * 0.06));
    flt.current.style.setProperty('--x', v.fx.toFixed(1) + 'px');
    flt.current.style.setProperty('--y', v.fy.toFixed(1) + 'px');
    flt.current.style.setProperty('--r', rot.toFixed(2) + 'deg');
    v.raf = Math.abs(v.tx - v.fx) + Math.abs(v.ty - v.fy) > 0.3 ? requestAnimationFrame(loop) : 0;
  };
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || !fine()) return;
    const r = wrap.current.getBoundingClientRect(), v = s.current;
    v.tx = e.clientX - r.left - flt.current.offsetWidth / 2;
    v.ty = e.clientY - r.top - flt.current.offsetHeight / 2;
    if (!hover) { v.fx = v.tx; v.fy = v.ty; }
    setHover(true);
    if (!v.raf) v.raf = requestAnimationFrame(loop);
  };
  useEffect(() => () => cancelAnimationFrame(s.current.raf), []);

  return (
    <div ref={wrap} onPointerMove={onMove} onPointerLeave={() => { if (fine()) { setHover(false); setCur(-1); } }}
      className={'relative ' + (hover ? 'fi-hover fi-dim' : '')}>
      <style>{CSS}</style>
      <ul className="border-t border-[rgba(40,56,56,.13)]">
        {items.map((it, i) => (
          <li key={i} className={'fi-row border-b border-[rgba(40,56,56,.13)] ' + (cur === i ? 'on' : '')}>
            <button type="button" aria-expanded={cur === i}
              onPointerEnter={(e) => { if (e.pointerType === 'mouse' && fine()) setCur(i); }}
              onClick={() => { if (!fine()) setCur(cur === i ? -1 : i); }}
              className="fi-btn relative z-0 flex w-full items-center gap-10 overflow-hidden px-5 py-5 text-left text-[#283838]">
              <span className="fi-t flex-1 text-[clamp(18px,1.7vw,24px)] font-semibold tracking-tight" data-text={it.title}>{it.title}</span>
              <span className="fi-plus grid h-11 w-11 flex-none place-items-center rounded-full border border-[rgba(40,56,56,.13)]">+</span>
            </button>
            <div className="fi-mob rounded-[22px]"><img src={it.img} alt="" className="h-60 w-full object-cover" /></div>
          </li>
        ))}
      </ul>
      <div ref={flt} className="fi-float pointer-events-none absolute left-0 top-0 z-[5] aspect-[9/16] w-[clamp(190px,16vw,250px)]">
        {items.map((it, i) => (
          <div key={i} className={'fi-shot absolute inset-0 overflow-hidden rounded-[22px] shadow-[0_30px_60px_-24px_rgba(17,24,39,.55)] ' + (cur === i ? 'on' : '')}>
            <img src={it.img} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}`,
      tailwind: `<style>
  .fi-btn::before{content:"";position:absolute;inset:0;z-index:-1;background:#283838;transform:scaleY(0);transform-origin:bottom;transition:transform .6s cubic-bezier(.22,1,.36,1)}
  .fi-t{position:relative;transition:transform .7s cubic-bezier(.22,1,.36,1),color .4s}.fi-t::after{content:attr(data-text);position:absolute;inset:0;color:#E2CA7C;clip-path:inset(0 100% 0 0);transition:clip-path .7s cubic-bezier(.22,1,.36,1)}
  .fi-dim .fi-row:not(.on) .fi-t{color:rgba(40,56,56,.28)}.fi-row.on .fi-btn{color:#fff}.fi-row.on .fi-btn::before{transform:none}.fi-row.on .fi-t{transform:translateX(18px);color:#fff}.fi-row.on .fi-t::after{clip-path:inset(0)}
  .fi-plus{transition:transform .6s cubic-bezier(.22,1,.36,1),background .4s}.fi-row.on .fi-plus{transform:rotate(135deg);background:#E2CA7C;border-color:#E2CA7C}
  .fi-float{transform:translate3d(var(--x,0),var(--y,0),0) rotate(var(--r,0deg));opacity:0;scale:.5;transition:opacity .4s,scale .6s cubic-bezier(.22,1,.36,1)}.fi-hover .fi-float{opacity:1;scale:1}
  .fi-shot{clip-path:inset(100% 0 0 0 round 22px);transition:clip-path .7s cubic-bezier(.22,1,.36,1)}.fi-shot.on{clip-path:inset(0 round 22px);z-index:1}
  @media (hover:none),(max-width:900px){.fi-float{display:none}}
</style>
<div id="fi" class="relative">
  <ul class="border-t border-[rgba(40,56,56,.13)]">
    <li class="fi-row border-b border-[rgba(40,56,56,.13)]"><button class="fi-btn relative z-0 flex w-full items-center gap-10 overflow-hidden px-5 py-5 text-left text-[#283838]"><span class="fi-t flex-1 text-2xl font-semibold" data-text="Cirurgia robótica">Cirurgia robótica</span><span class="fi-plus grid h-11 w-11 place-items-center rounded-full border">+</span></button></li>
    <li class="fi-row border-b border-[rgba(40,56,56,.13)]"><button class="fi-btn relative z-0 flex w-full items-center gap-10 overflow-hidden px-5 py-5 text-left text-[#283838]"><span class="fi-t flex-1 text-2xl font-semibold" data-text="Cálculo renal">Cálculo renal</span><span class="fi-plus grid h-11 w-11 place-items-center rounded-full border">+</span></button></li>
  </ul>
  <div class="fi-float pointer-events-none absolute left-0 top-0 z-[5] aspect-[9/16] w-[220px]">
    <div class="fi-shot absolute inset-0 overflow-hidden"><img src="/s1.webp" alt="" class="h-full w-full object-cover"></div>
    <div class="fi-shot absolute inset-0 overflow-hidden"><img src="/s2.webp" alt="" class="h-full w-full object-cover"></div>
  </div>
</div>
<script>
(function () {
  var idx = document.getElementById('fi'), rows = idx.querySelectorAll('.fi-row'), shots = idx.querySelectorAll('.fi-shot'), flt = idx.querySelector('.fi-float');
  var tx = 0, ty = 0, fx = 0, fy = 0, raf = 0;
  function set(k) { rows.forEach(function (r, i) { r.classList.toggle('on', i === k); }); if (k >= 0) shots.forEach(function (s, i) { s.classList.toggle('on', i === k); }); }
  function loop() { fx += (tx - fx) * .14; fy += (ty - fy) * .14; flt.style.setProperty('--x', fx + 'px'); flt.style.setProperty('--y', fy + 'px'); flt.style.setProperty('--r', Math.max(-12, Math.min(12, (tx - fx) * .06)) + 'deg'); raf = Math.abs(tx - fx) + Math.abs(ty - fy) > .3 ? requestAnimationFrame(loop) : 0; }
  idx.addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; var r = idx.getBoundingClientRect(); tx = e.clientX - r.left - flt.offsetWidth / 2; ty = e.clientY - r.top - flt.offsetHeight / 2; if (!idx.classList.contains('fi-hover')) { fx = tx; fy = ty; } idx.classList.add('fi-hover', 'fi-dim'); if (!raf) raf = requestAnimationFrame(loop); });
  idx.addEventListener('pointerleave', function () { idx.classList.remove('fi-hover', 'fi-dim'); set(-1); });
  rows.forEach(function (r, i) { r.querySelector('button').addEventListener('pointerenter', function () { set(i); }); });
})();
</script>`
    }
  },
  {
    ...B,
    id: "uromed-flow-steps",
    name: "Etapas Ligadas por Linha Dourada que Cresce",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    badge: "Uromed",
    description: "Painel escuro com 3 etapas; conforme o painel sobe na tela, uma linha dourada liga uma etapa à outra, o círculo de cada etapa enche de dourado com efeito mola e o número vazado se preenche. Vira vertical no celular.",
    tags: ["Steps", "Scroll Linked", "Progress Line", "Outline Number", "Como Funciona"],
    defaultSection: "Como Funciona",
    previewType: "um-flow-steps",
    tech: ["Tailwind CSS", "React", "CSS Variables", "Scroll Linked"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const CSS = '.fl-list{--gap:clamp(24px,4vw,56px)}' +
  '.fl-step:not(:last-child)::before,.fl-step:not(:last-child)::after{content:"";position:absolute;top:31px;left:76px;width:calc(100% + var(--gap) - 88px);height:2px;border-radius:2px}' +
  '.fl-step::before{background:rgba(226,202,124,.22)}.fl-step::after{background:#E2CA7C;transform-origin:left;transform:scaleX(clamp(0,calc(var(--p,0)*2 - var(--i)),1))}' +
  '.fl-dot{transition:background-color .6s,color .6s,border-color .6s,transform .7s cubic-bezier(.34,1.56,.64,1),box-shadow .7s}' +
  '.fl-n{color:transparent;-webkit-text-stroke:1px rgba(226,202,124,.45);transition:color .8s,-webkit-text-stroke-color .8s}.fl-txt{color:rgba(255,255,255,.55);transform:translateY(10px);transition:color .8s,transform .8s cubic-bezier(.22,1,.36,1)}' +
  '.fl-step.on .fl-dot{background:#E2CA7C;border-color:#E2CA7C;color:#283838;transform:scale(1.08);box-shadow:0 0 0 10px rgba(226,202,124,.12)}.fl-step.on .fl-n{color:#E2CA7C;-webkit-text-stroke-color:#E2CA7C}.fl-step.on .fl-txt{color:rgba(255,255,255,.92);transform:none}' +
  '@media (max-width:900px){.fl-list{--gap:36px}.fl-step:not(:last-child)::before,.fl-step:not(:last-child)::after{top:76px;left:31px;width:2px;height:calc(100% + var(--gap) - 88px)}.fl-step::after{transform-origin:top;transform:scaleY(clamp(0,calc(var(--p,0)*2 - var(--i)),1))}}';

export function FlowSteps({ steps = ['Você chama no WhatsApp e escolhe o melhor horário.', 'Consulta completa, com tempo para todas as dúvidas.', 'Plano de tratamento claro e acompanhamento próximo.'] }) {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setP(1); return; }
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight, r = ref.current.getBoundingClientRect();
      setP(Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height * 0.85))));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // a linha liga as etapas em 2 trechos; cada etapa acende quando a linha chega nela
  const lit = p < 0.04 ? -1 : Math.floor(p * (steps.length - 1) + 0.02);
  return (
    <div ref={ref} style={{ '--p': p.toFixed(4) }} className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(150deg,#2F4242,#1E2B2B)] p-[clamp(36px,5vw,64px)] text-white">
      <style>{CSS}</style>
      <ol className="fl-list relative grid gap-[var(--gap)] md:grid-cols-3">
        {steps.map((t, i) => (
          <li key={i} style={{ '--i': i }} className={'fl-step relative grid grid-cols-[64px_1fr] gap-x-5 md:block ' + (i <= lit ? 'on' : '')}>
            <span className="fl-dot row-span-2 grid h-16 w-16 place-items-center rounded-full border border-[rgba(226,202,124,.22)] bg-white/[.03] text-[#E2CA7C]">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12l5 5L20 7" /></svg>
            </span>
            <span className="fl-n block text-[40px] font-bold leading-[64px] md:mt-7 md:text-[clamp(48px,5vw,72px)] md:leading-none">{'0' + (i + 1)}</span>
            <p className="fl-txt mt-2.5 text-base leading-relaxed md:mt-4">{t}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}`,
      tailwind: `<style>
  .fl-list{--gap:clamp(24px,4vw,56px)}
  .fl-step:not(:last-child)::before,.fl-step:not(:last-child)::after{content:"";position:absolute;top:31px;left:76px;width:calc(100% + var(--gap) - 88px);height:2px}
  .fl-step::before{background:rgba(226,202,124,.22)}.fl-step::after{background:#E2CA7C;transform-origin:left;transform:scaleX(clamp(0,calc(var(--p,0)*2 - var(--i)),1))}
  .fl-dot{transition:all .7s cubic-bezier(.34,1.56,.64,1)}.fl-n{color:transparent;-webkit-text-stroke:1px rgba(226,202,124,.45);transition:all .8s}
  .fl-step.on .fl-dot{background:#E2CA7C;color:#283838;transform:scale(1.08);box-shadow:0 0 0 10px rgba(226,202,124,.12)}.fl-step.on .fl-n{color:#E2CA7C}
</style>
<div id="fl" class="rounded-[32px] bg-[linear-gradient(150deg,#2F4242,#1E2B2B)] p-12 text-white">
  <ol class="fl-list grid gap-[var(--gap)] md:grid-cols-3">
    <li class="fl-step relative" style="--i:0"><span class="fl-dot grid h-16 w-16 place-items-center rounded-full border border-[rgba(226,202,124,.22)] text-[#E2CA7C]">✓</span><span class="fl-n mt-7 block text-6xl font-bold">01</span><p class="mt-4 text-white/80">Você chama no WhatsApp.</p></li>
    <li class="fl-step relative" style="--i:1"><span class="fl-dot grid h-16 w-16 place-items-center rounded-full border border-[rgba(226,202,124,.22)] text-[#E2CA7C]">✓</span><span class="fl-n mt-7 block text-6xl font-bold">02</span><p class="mt-4 text-white/80">Consulta completa.</p></li>
    <li class="fl-step relative" style="--i:2"><span class="fl-dot grid h-16 w-16 place-items-center rounded-full border border-[rgba(226,202,124,.22)] text-[#E2CA7C]">✓</span><span class="fl-n mt-7 block text-6xl font-bold">03</span><p class="mt-4 text-white/80">Plano e acompanhamento.</p></li>
  </ol>
</div>
<script>
(function () {
  var flow = document.getElementById('fl'), steps = flow.querySelectorAll('.fl-step');
  function update() {
    var vh = innerHeight, r = flow.getBoundingClientRect(), p = Math.min(1, Math.max(0, (vh * .8 - r.top) / (r.height * .85)));
    flow.style.setProperty('--p', p); var lit = p < .04 ? -1 : Math.floor(p * 2 + .02);
    steps.forEach(function (s, i) { s.classList.toggle('on', i <= lit); });
  }
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true }); update();
})();
</script>`
    }
  },
  {
    ...B,
    id: "uromed-magnetic-lines",
    name: "Grade de Tracinhos Magnéticos",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    badge: "Uromed",
    description: "Fundo em canvas com uma grade de tracinhos que giram com inércia para orbitar o cursor, crescendo e escurecendo perto dele. Sem mouse, um ponto invisível passeia sozinho. Textura viva e discreta para a página toda.",
    tags: ["Canvas", "Mouse Reactive", "Grid", "Inertia", "Background"],
    defaultSection: "Fundo da Página",
    previewType: "um-magnetic-lines",
    tech: ["React", "Canvas 2D", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

// Canvas fixo atrás da página. SP = espaçamento, LEN = tamanho do tracinho, RAD = raio de influência.
export function MagneticLines({ color = '#3F6A57', opacity = 0.16, SP = 34, LEN = 14, RAD = 220 }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const REST = (-10 * Math.PI) / 180 + Math.PI / 2, FADE = 0.7;
    const wrapPi = (a) => (((a + Math.PI / 2) % Math.PI) + Math.PI) % Math.PI - Math.PI / 2;
    const cells = new Map();
    let dpr = 1, W = 0, H = 0, mx = -1e4, my = -1e4, tmx = -1e4, tmy = -1e4, hasMouse = false, raf = 0, lastY = null;
    const t0 = performance.now();
    const size = () => { dpr = Math.min(window.devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; };
    const draw = (now) => {
      raf = 0;
      const sy = window.scrollY;
      if (!hasMouse && !reduce) { const k = (now - t0) / 1000; tmx = W * (0.5 + Math.cos(k * 0.37) * 0.32 + Math.sin(k * 0.21) * 0.1); tmy = sy + H * (0.5 + Math.sin(k * 0.53 + 1.3) * 0.3); }
      mx += (tmx - mx) * 0.18; my += (tmy - my) * 0.18;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = color; ctx.lineCap = 'round'; ctx.lineWidth = 1.6;
      // a grade acompanha a rolagem (coordenadas da página)
      const r0 = Math.floor(sy / SP), r1 = Math.ceil((sy + H) / SP), c1 = Math.ceil(W / SP);
      let moving = false;
      for (let r = r0; r <= r1; r++) for (let c = 0; c <= c1; c++) {
        const cx = c * SP + SP / 2, cy = r * SP + SP / 2, dx = mx - cx, dy = my - cy;
        const key = r * 1000 + c; let cell = cells.get(key); if (!cell) { cell = { a: REST }; cells.set(key, cell); }
        const diff = wrapPi(Math.atan2(dy, dx) + Math.PI / 2 - cell.a);
        if (Math.abs(diff) > 0.002) { cell.a += reduce ? diff : diff * 0.12; moving = true; }
        const em = Math.exp(-(dx * dx + dy * dy) / (RAD * RAD)), half = (LEN / 2) * (1 + 0.5 * em);
        ctx.globalAlpha = 1 - FADE + FADE * em;
        const ca = Math.cos(cell.a) * half, sa = Math.sin(cell.a) * half, py = cy - sy;
        ctx.beginPath(); ctx.moveTo(cx - ca, py - sa); ctx.lineTo(cx + ca, py + sa); ctx.stroke();
      }
      if (cells.size > 6000) cells.clear();
      if (!reduce && (moving || !hasMouse || Math.abs(tmx - mx) + Math.abs(tmy - my) > 0.5) && !document.hidden) raf = requestAnimationFrame(draw);
    };
    const wake = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const onMove = (e) => { if (e.pointerType !== 'mouse') return; hasMouse = true; lastY = e.clientY; tmx = e.clientX; tmy = e.clientY + scrollY; wake(); };
    const onScroll = () => { if (hasMouse && lastY !== null) tmy = lastY + scrollY; wake(); };
    const onResize = () => { size(); wake(); };
    addEventListener('pointermove', onMove, { passive: true });
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', wake);
    size(); if (reduce) { mx = tmx = W / 2; my = tmy = H / 2; } wake();
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', onMove); removeEventListener('scroll', onScroll); removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', wake); };
  }, [color, SP, LEN, RAD]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full max-md:!opacity-[.06]" style={{ opacity }} />;
}`,
      tailwind: `<canvas id="mag" aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[.16] max-md:opacity-[.06]"></canvas>
<script>
(function () {
  var cv = document.getElementById('mag'), ctx = cv.getContext('2d'), SP = 34, LEN = 14, RAD = 220, FADE = .7;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, REST = -10 * Math.PI / 180 + Math.PI / 2;
  var wrapPi = function (a) { return ((a + Math.PI / 2) % Math.PI + Math.PI) % Math.PI - Math.PI / 2; };
  var cells = new Map(), dpr, W, H, mx = -1e4, my = -1e4, tmx = -1e4, tmy = -1e4, hasMouse = false, raf = 0, lastY = null, t0 = performance.now();
  function size() { dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; }
  function draw(now) {
    raf = 0; var sy = scrollY;
    if (!hasMouse && !reduce) { var k = (now - t0) / 1000; tmx = W * (.5 + Math.cos(k * .37) * .32 + Math.sin(k * .21) * .1); tmy = sy + H * (.5 + Math.sin(k * .53 + 1.3) * .3); }
    mx += (tmx - mx) * .18; my += (tmy - my) * .18;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H); ctx.strokeStyle = '#3F6A57'; ctx.lineCap = 'round'; ctx.lineWidth = 1.6;
    var moving = false;
    for (var r = Math.floor(sy / SP); r <= Math.ceil((sy + H) / SP); r++) for (var c = 0; c <= Math.ceil(W / SP); c++) {
      var cx = c * SP + SP / 2, cy = r * SP + SP / 2, dx = mx - cx, dy = my - cy, key = r * 1000 + c, cell = cells.get(key);
      if (!cell) { cell = { a: REST }; cells.set(key, cell); }
      var diff = wrapPi(Math.atan2(dy, dx) + Math.PI / 2 - cell.a); if (Math.abs(diff) > .002) { cell.a += reduce ? diff : diff * .12; moving = true; }
      var em = Math.exp(-(dx * dx + dy * dy) / (RAD * RAD)), half = LEN / 2 * (1 + .5 * em);
      ctx.globalAlpha = 1 - FADE + FADE * em;
      var ca = Math.cos(cell.a) * half, sa = Math.sin(cell.a) * half, py = cy - sy;
      ctx.beginPath(); ctx.moveTo(cx - ca, py - sa); ctx.lineTo(cx + ca, py + sa); ctx.stroke();
    }
    if (cells.size > 6000) cells.clear();
    if (!reduce && (moving || !hasMouse || Math.abs(tmx - mx) + Math.abs(tmy - my) > .5) && !document.hidden) raf = requestAnimationFrame(draw);
  }
  function wake() { if (!raf) raf = requestAnimationFrame(draw); }
  addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; hasMouse = true; lastY = e.clientY; tmx = e.clientX; tmy = e.clientY + scrollY; wake(); }, { passive: true });
  addEventListener('scroll', function () { if (hasMouse && lastY !== null) tmy = lastY + scrollY; wake(); }, { passive: true });
  addEventListener('resize', function () { size(); wake(); }); document.addEventListener('visibilitychange', wake);
  size(); wake();
})();
</script>`
    }
  },
  {
    ...B,
    id: "uromed-scroll-trail",
    name: "Linha em S que Serpenteia a Página com a Rolagem",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    badge: "Uromed",
    description: "Uma linha dourada fina desenha uma curva em S que zigue-zagueia de cima a baixo atrás de todas as seções; a ponta acompanha a rolagem (fica a ~65% da tela) e completa no fim da página. Costura a página como um fio condutor.",
    tags: ["SVG Path", "Scroll Linked", "Stroke Dashoffset", "Background", "Storytelling"],
    defaultSection: "Fundo da Página",
    previewType: "um-scroll-trail",
    tech: ["React", "SVG", "Scroll Linked"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

// Coloque dentro de um wrapper position:relative que envolve as seções (as seções ficam com z-index 1).
const XS = [0.86, 0.22, 0.64, 0.06, 0.94, 0.38, 0.78, 0.12, 0.55, 0.9, 0.28, 0.7];

export function ScrollTrail({ startAfter = 0, color = 'rgba(138,109,31,.32)' }) {
  const svgRef = useRef(null), pathRef = useRef(null);
  useEffect(() => {
    const svg = svgRef.current, path = pathRef.current, root = svg.parentElement;
    let samples = [], ticking = false;
    const build = () => {
      svg.style.height = '0px';
      const W = root.clientWidth, H = root.offsetHeight;
      svg.style.height = H + 'px'; svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      let y = startAfter, step = Math.max(620, innerHeight * 0.85);
      const n = Math.max(1, Math.round((H - y) / step)); step = (H - y) / n;
      let x = -4, d = 'M-4 ' + y.toFixed(0);
      for (let i = 1; i <= n; i++) {
        const ny = y + step, nx = i === n ? W + 4 : W * XS[(i - 1) % XS.length];
        d += ' C' + x.toFixed(0) + ' ' + (y + step * 0.55).toFixed(0) + ' ' + nx.toFixed(0) + ' ' + (ny - step * 0.55).toFixed(0) + ' ' + nx.toFixed(0) + ' ' + ny.toFixed(0);
        x = nx; y = ny;
      }
      path.setAttribute('d', d);
      const total = path.getTotalLength(); samples = [];
      for (let k = 0; k <= 600; k++) samples.push([k / 600, path.getPointAtLength((total * k) / 600).y]);
      update();
    };
    // a ponta fica a ~65% da tela; como a curva só desce, dá para achar o trecho pela altura
    const update = () => {
      ticking = false;
      const vh = innerHeight, top = root.getBoundingClientRect().top;
      const atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
      let frac = 0; const tipY = vh * 0.65 - top;
      if (atEnd) frac = 1; else for (const [f, y] of samples) { if (y > tipY) break; frac = f; }
      path.style.strokeDashoffset = (1 - frac).toFixed(4);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    const ro = new ResizeObserver(build); ro.observe(root);
    addEventListener('scroll', onScroll, { passive: true });
    return () => { ro.disconnect(); removeEventListener('scroll', onScroll); };
  }, [startAfter]);
  return (
    <svg ref={svgRef} aria-hidden className="pointer-events-none absolute left-0 top-0 z-0 w-full overflow-visible motion-reduce:hidden">
      <path ref={pathRef} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset="1" />
    </svg>
  );
}`,
      tailwind: `<div id="trail-root" class="relative">
  <svg class="trail pointer-events-none absolute left-0 top-0 z-0 w-full overflow-visible" aria-hidden="true">
    <path fill="none" stroke="rgba(138,109,31,.32)" stroke-width="1.4" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
  </svg>
  <section class="relative z-10"><!-- seções da página --></section>
</div>
<script>
(function () {
  var root = document.getElementById('trail-root'), svg = root.querySelector('.trail'), path = svg.querySelector('path'), samples = [];
  var XS = [.86, .22, .64, .06, .94, .38, .78, .12, .55, .9, .28, .7];
  function build() {
    svg.style.height = '0px'; var W = root.clientWidth, H = root.offsetHeight; svg.style.height = H + 'px'; svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var y = 0, step = Math.max(620, innerHeight * .85), n = Math.max(1, Math.round(H / step)); step = H / n;
    var x = -4, d = 'M-4 0';
    for (var i = 1; i <= n; i++) { var ny = y + step, nx = i === n ? W + 4 : W * XS[(i - 1) % XS.length]; d += ' C' + x + ' ' + (y + step * .55) + ' ' + nx + ' ' + (ny - step * .55) + ' ' + nx + ' ' + ny; x = nx; y = ny; }
    path.setAttribute('d', d); var t = path.getTotalLength(); samples = [];
    for (var k = 0; k <= 600; k++) samples.push([k / 600, path.getPointAtLength(t * k / 600).y]);
    update();
  }
  function update() {
    var tip = innerHeight * .65 - root.getBoundingClientRect().top, f = 0;
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) f = 1; else for (var i = 0; i < samples.length; i++) { if (samples[i][1] > tip) break; f = samples[i][0]; }
    path.style.strokeDashoffset = 1 - f;
  }
  new ResizeObserver(build).observe(root);
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true });
})();
</script>`
    }
  },
  {
    ...B,
    id: "uromed-cta-expand-panel",
    name: "Painel de CTA que se Expande com a Rolagem",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    badge: "Uromed",
    description: "O bloco do CTA final começa recortado como um cartão de cantos arredondados e, conforme entra na tela, abre até ocupar a largura toda. Ao fundo, uma textura de ondas desliza sem parar sob um grão de filme.",
    tags: ["Clip-path", "Scroll Linked", "Grain", "Texture", "CTA Final"],
    defaultSection: "CTA Final",
    previewType: "um-cta-expand",
    tech: ["Tailwind CSS", "React", "CSS Keyframes", "Scroll Linked"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const GRAIN = "url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\\")";

export function CtaExpandPanel({ children }) {
  const secRef = useRef(null), panelRef = useRef(null);
  useEffect(() => {
    const sec = secRef.current, panel = panelRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = innerHeight, top = sec.getBoundingClientRect().top;
      panel.style.setProperty('--k', (1 - Math.min(1, Math.max(0, (vh - top) / (vh * 0.8)))).toFixed(4));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update(); addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return (
    <section ref={secRef} className="bg-[#F0F5F2]">
      <style>{'@keyframes ctTex{to{transform:translateY(22px)}}.ct-panel{--k:1;clip-path:inset(calc(var(--k)*7%) calc(var(--k)*5%) round calc(var(--k)*48px))}@media (prefers-reduced-motion:reduce){.ct-panel{--k:0}.ct-tex{animation:none!important}}'}</style>
      <div ref={panelRef} className="ct-panel relative overflow-hidden bg-[#283838] py-[clamp(96px,12vw,170px)] text-center text-white">
        <svg aria-hidden className="ct-tex pointer-events-none absolute inset-x-0 -top-[22px] h-[calc(100%+22px)] w-full animate-[ctTex_14s_linear_infinite]">
          <defs><pattern id="ctw" width="88" height="22" patternUnits="userSpaceOnUse"><path d="M0 11 Q22 0 44 11 T88 11" fill="none" stroke="rgba(226,202,124,.1)" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#ctw)" />
        </svg>
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-35 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6">{children}</div>
      </div>
    </section>
  );
}`,
      tailwind: `<section id="ct" class="bg-[#F0F5F2]">
  <style>
    @keyframes ctTex{to{transform:translateY(22px)}}
    .ct-panel{--k:1;clip-path:inset(calc(var(--k)*7%) calc(var(--k)*5%) round calc(var(--k)*48px))}
    .ct-grain{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
    @media (prefers-reduced-motion:reduce){.ct-panel{--k:0}.ct-tex{animation:none!important}}
  </style>
  <div class="ct-panel relative overflow-hidden bg-[#283838] py-[clamp(96px,12vw,170px)] text-center text-white">
    <svg aria-hidden="true" class="ct-tex pointer-events-none absolute inset-x-0 -top-[22px] h-[calc(100%+22px)] w-full animate-[ctTex_14s_linear_infinite]"><defs><pattern id="ctw" width="88" height="22" patternUnits="userSpaceOnUse"><path d="M0 11 Q22 0 44 11 T88 11" fill="none" stroke="rgba(226,202,124,.1)"/></pattern></defs><rect width="100%" height="100%" fill="url(#ctw)"/></svg>
    <div class="ct-grain pointer-events-none absolute inset-0 opacity-35 mix-blend-overlay"></div>
    <div class="relative mx-auto flex max-w-3xl flex-col items-center px-6"><h2 class="text-3xl font-semibold">Cuide da sua saúde hoje</h2><!-- botão --></div>
  </div>
  <script>
    (function () {
      var sec = document.getElementById('ct'), p = sec.querySelector('.ct-panel');
      function u() { var vh = innerHeight, t = sec.getBoundingClientRect().top; p.style.setProperty('--k', 1 - Math.min(1, Math.max(0, (vh - t) / (vh * .8)))); }
      addEventListener('scroll', function () { requestAnimationFrame(u); }, { passive: true }); u();
    })();
  </script>
</section>`
    }
  },
  {
    ...B,
    id: "uromed-circle-modal",
    name: "Pop-up que Nasce num Círculo a Partir do Botão",
    category: "navigation",
    categoryLabel: "Modais & Menus",
    badge: "Uromed",
    description: "Ao clicar, o modal se abre como um círculo que cresce exatamente do centro do botão clicado; o conteúdo entra em cascata (título, texto, passos numerados, aviso, CTA). Fecha encolhendo de volta, com Esc, clique fora ou X que gira.",
    tags: ["Dialog", "Clip-path Circle", "Stagger", "Acessível", "Lead"],
    defaultSection: "Envio de Exames / Lead",
    previewType: "um-circle-modal",
    tech: ["Tailwind CSS", "React", "<dialog>", "CSS Keyframes"],
    frameworks: {
      react: `import { useRef } from 'react';

const CSS = '.cm::backdrop{background:rgba(20,30,30,.55);backdrop-filter:blur(6px);animation:cmFade .4s ease both}.cm.closing::backdrop{animation:cmFade .35s ease reverse both}' +
  '@keyframes cmFade{from{opacity:0}}' +
  '.cm-box{clip-path:circle(0 at var(--cx,50%) var(--cy,50%));animation:cmIn .75s cubic-bezier(.7,0,.2,1) forwards}.cm.closing .cm-box{animation:cmOut .4s cubic-bezier(.7,0,.84,0) forwards}' +
  '@keyframes cmIn{to{clip-path:circle(150% at var(--cx,50%) var(--cy,50%))}}@keyframes cmOut{from{clip-path:circle(150% at var(--cx,50%) var(--cy,50%))}to{clip-path:circle(0 at var(--cx,50%) var(--cy,50%))}}' +
  '.cm-up{opacity:0;translate:0 14px;animation:cmUp .6s cubic-bezier(.22,1,.36,1) calc(.35s + var(--k,0)*.08s) forwards}@keyframes cmUp{to{opacity:1;translate:0 0}}' +
  '.cm-x:hover{transform:rotate(90deg);background:#283838;color:#E2CA7C}' +
  '@media (prefers-reduced-motion:reduce){.cm-box,.cm-up,.cm::backdrop{animation:none!important;opacity:1!important;translate:none!important;clip-path:none!important}}';

export function CircleModal({ label = 'Envie seus exames', title = 'Envie seus exames antes da consulta', steps = ['Toque no botão abaixo.', 'Mande fotos ou PDF dos exames.', 'A equipe confirma o recebimento.'] }) {
  const dlg = useRef(null), box = useRef(null), btn = useRef(null), closing = useRef(false);
  const open = () => {
    const d = dlg.current; d.classList.remove('closing');
    document.documentElement.style.overflow = 'hidden';
    d.showModal();
    // centro do círculo = centro do botão, em coordenadas do box
    const b = btn.current.getBoundingClientRect(), r = box.current.getBoundingClientRect();
    box.current.style.setProperty('--cx', b.left + b.width / 2 - r.left + 'px');
    box.current.style.setProperty('--cy', b.top + b.height / 2 - r.top + 'px');
    box.current.style.animation = 'none'; void box.current.offsetWidth; box.current.style.animation = '';
  };
  const shut = () => {
    const d = dlg.current; if (closing.current || !d.open) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return d.close();
    closing.current = true; d.classList.add('closing'); setTimeout(() => d.close(), 380);
  };
  const onClose = () => { closing.current = false; dlg.current.classList.remove('closing'); document.documentElement.style.overflow = ''; btn.current.focus(); };
  return (
    <>
      <style>{CSS}</style>
      <button ref={btn} onClick={open} className="rounded-full border border-[rgba(40,56,56,.13)] bg-white/70 px-6 py-4 font-semibold text-[#283838] backdrop-blur hover:border-[#8A6D1F]">{label}</button>
      <dialog ref={dlg} onClose={onClose} onCancel={(e) => { e.preventDefault(); shut(); }} onClick={(e) => { if (e.target === dlg.current) shut(); }}
        className="cm m-0 h-full max-h-none w-full max-w-none place-items-center bg-transparent p-4 open:grid">
        <div ref={box} className="cm-box relative w-[min(100%,560px)] rounded-[32px] bg-white p-[clamp(28px,4vw,44px)] text-[#111827] shadow-[0_40px_90px_-30px_rgba(0,0,0,.55)]">
          <button onClick={shut} aria-label="Fechar" className="cm-x absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-[rgba(40,56,56,.13)] text-[#283838] transition duration-500">✕</button>
          <h3 className="cm-up pr-12 text-[clamp(24px,2.6vw,30px)] font-semibold leading-tight text-[#283838]" style={{ '--k': 0 }}>{title}</h3>
          <ol className="mt-5 grid gap-3">
            {steps.map((s, i) => (
              <li key={i} className="cm-up flex items-start gap-3.5 text-[15px]" style={{ '--k': i + 3 }}>
                <span className="grid h-[30px] w-[30px] flex-none place-items-center rounded-full bg-[#283838] text-[13px] font-semibold text-[#E2CA7C]">{i + 1}</span>{s}
              </li>
            ))}
          </ol>
          <a href="#" className="cm-up mt-6 flex w-full items-center justify-between rounded-full bg-[#283838] py-2.5 pl-8 pr-2.5 font-semibold text-white" style={{ '--k': 8 }}>
            Enviar pelo WhatsApp <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E2CA7C] text-[#283838]">→</span>
          </a>
        </div>
      </dialog>
    </>
  );
}`,
      tailwind: `<style>
  .cm::backdrop{background:rgba(20,30,30,.55);backdrop-filter:blur(6px)}
  .cm-box{clip-path:circle(0 at var(--cx,50%) var(--cy,50%));animation:cmIn .75s cubic-bezier(.7,0,.2,1) forwards}.cm.closing .cm-box{animation:cmOut .4s cubic-bezier(.7,0,.84,0) forwards}
  @keyframes cmIn{to{clip-path:circle(150% at var(--cx,50%) var(--cy,50%))}}@keyframes cmOut{from{clip-path:circle(150% at var(--cx,50%) var(--cy,50%))}to{clip-path:circle(0 at var(--cx,50%) var(--cy,50%))}}
  .cm-up{opacity:0;translate:0 14px;animation:cmUp .6s cubic-bezier(.22,1,.36,1) calc(.35s + var(--k,0)*.08s) forwards}@keyframes cmUp{to{opacity:1;translate:0 0}}
</style>
<button id="cm-open" class="rounded-full border px-6 py-4 font-semibold text-[#283838]">Envie seus exames</button>
<dialog id="cm" class="cm m-0 h-full max-h-none w-full max-w-none place-items-center bg-transparent p-4 open:grid">
  <div class="cm-box relative w-[min(100%,560px)] rounded-[32px] bg-white p-10">
    <button data-close aria-label="Fechar" class="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border transition hover:rotate-90">✕</button>
    <h3 class="cm-up pr-12 text-3xl font-semibold text-[#283838]">Envie seus exames</h3>
    <p class="cm-up mt-3 text-[#4B5563]" style="--k:1">Adiante a análise antes da consulta.</p>
    <a href="#" class="cm-up mt-6 block rounded-full bg-[#283838] px-8 py-4 text-center font-semibold text-white" style="--k:4">Enviar pelo WhatsApp</a>
  </div>
</dialog>
<script>
(function () {
  var dlg = document.getElementById('cm'), box = dlg.querySelector('.cm-box'), op = document.getElementById('cm-open'), closing = false;
  op.addEventListener('click', function () {
    dlg.classList.remove('closing'); document.documentElement.style.overflow = 'hidden'; dlg.showModal();
    var b = op.getBoundingClientRect(), r = box.getBoundingClientRect();
    box.style.setProperty('--cx', b.left + b.width / 2 - r.left + 'px'); box.style.setProperty('--cy', b.top + b.height / 2 - r.top + 'px');
    box.style.animation = 'none'; void box.offsetWidth; box.style.animation = '';
  });
  function shut() { if (closing || !dlg.open) return; closing = true; dlg.classList.add('closing'); setTimeout(function () { dlg.close(); }, 380); }
  dlg.addEventListener('close', function () { closing = false; dlg.classList.remove('closing'); document.documentElement.style.overflow = ''; op.focus(); });
  dlg.addEventListener('cancel', function (e) { e.preventDefault(); shut(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) shut(); });
  dlg.querySelector('[data-close]').addEventListener('click', shut);
})();
</script>`
    }
  },
  {
    ...B,
    id: "uromed-age-rail",
    name: "Régua de Idades com Marcos que Saltam",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    badge: "Uromed",
    description: "Uma régua graduada se enche com degradê dourado→verde ao entrar na tela; os marcos de idade saltam em sequência com efeito mola, e o marco principal fica pulsando com um anel. Explica 'quando procurar' de forma visual.",
    tags: ["Timeline", "Spring", "Stagger", "Pulse Ring", "Infográfico"],
    defaultSection: "Quando Procurar",
    previewType: "um-age-rail",
    tech: ["Tailwind CSS", "React", "CSS Transitions", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export function AgeRail({ min = 15, max = 75, marks = [{ age: 20, label: '20' }, { age: 40, label: '40' }, { age: 50, label: '50', main: true }] }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(ref.current); return () => io.disconnect();
  }, []);
  const x = (a) => ((a - min) / (max - min)) * 100 + '%';
  return (
    <div ref={ref} className="relative pt-11">
      <style>{'@keyframes arRing{0%{transform:scale(.8);opacity:.9}100%{transform:scale(1.5);opacity:0}}@media (prefers-reduced-motion:reduce){.ar *{transition:none!important;animation:none!important}}'}</style>
      <div className="ar">
        <div className="relative h-1.5 overflow-hidden rounded-md" style={{ background: 'repeating-linear-gradient(90deg,rgba(40,56,56,.13) 0 2px,transparent 2px calc(100% / 30)),rgba(40,56,56,.06)' }}>
          <i className="absolute inset-0 origin-left bg-[linear-gradient(90deg,#8A6D1F,#E2CA7C_40%,#4F7F6B)] transition-transform delay-200 duration-[2400ms] ease-[cubic-bezier(.65,0,.35,1)]" style={{ transform: inView ? 'scaleX(1)' : 'scaleX(0)' }} />
        </div>
        {marks.map((m, k) => (
          <span key={k} className={'absolute grid -translate-x-1/2 place-items-center rounded-full border-2 transition-[scale] duration-700 ease-[cubic-bezier(.34,1.56,.64,1)] ' + (m.main ? 'top-[-12px] h-[52px] w-[52px] border-[#283838] bg-[#283838] text-lg text-[#E2CA7C]' : 'top-0 h-10 w-10 border-[#8A6D1F] bg-white text-[15px] text-[#283838]')}
            style={{ left: x(m.age), scale: inView ? '1' : '0', transitionDelay: 0.7 + k * 0.5 + 's' }}>
            {m.label}
            {m.main && inView && <i className="absolute -inset-2 rounded-full border-2 border-[#E2CA7C] animate-[arRing_2.2s_ease-out_2s_infinite] opacity-0" />}
          </span>
        ))}
        <div className="relative mt-3 h-[22px] text-[13px] tabular-nums text-[#4B5563]">
          {marks.map((m, k) => <span key={k} className="absolute -translate-x-1/2" style={{ left: x(m.age) }}>{m.age} anos</span>)}
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `<style>
  .ar-fill{transform:scaleX(0);transform-origin:left;transition:transform 2.4s cubic-bezier(.65,0,.35,1) .2s}.ar.is-in .ar-fill{transform:scaleX(1)}
  .ar-mk{scale:0;transition:scale .7s cubic-bezier(.34,1.56,.64,1) calc(.7s + var(--k)*.5s)}.ar.is-in .ar-mk{scale:1}
  .ar-main::before{content:"";position:absolute;inset:-8px;border-radius:50%;border:2px solid #E2CA7C;opacity:0}.ar.is-in .ar-main::before{animation:arRing 2.2s ease-out 2s infinite}
  @keyframes arRing{0%{transform:scale(.8);opacity:.9}100%{transform:scale(1.5);opacity:0}}
</style>
<div class="ar relative pt-11">
  <div class="relative h-1.5 overflow-hidden rounded-md bg-[rgba(40,56,56,.06)]"><i class="ar-fill absolute inset-0 bg-[linear-gradient(90deg,#8A6D1F,#E2CA7C_40%,#4F7F6B)]"></i></div>
  <span class="ar-mk absolute top-0 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border-2 border-[#8A6D1F] bg-white" style="left:8%;--k:0">20</span>
  <span class="ar-mk absolute top-0 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border-2 border-[#8A6D1F] bg-white" style="left:42%;--k:1">40</span>
  <span class="ar-mk ar-main absolute -top-3 grid h-[52px] w-[52px] -translate-x-1/2 place-items-center rounded-full bg-[#283838] text-lg text-[#E2CA7C]" style="left:58%;--k:2">50</span>
</div>
<script>
  document.querySelectorAll('.ar').forEach(function (el) {
    new IntersectionObserver(function (e, o) { if (e[0].isIntersecting) { el.classList.add('is-in'); o.disconnect(); } }, { threshold: .3 }).observe(el);
  });
</script>`
    }
  },
  {
    ...B,
    id: "uromed-video-carousel",
    name: "Carrossel de Entrevistas com Capa que Vira Vídeo",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    badge: "Uromed",
    description: "Um vídeo por vez com setas e contador: o slide ativo fica nítido e os vizinhos encolhem e somem. A capa tem botão de play pulsando e só carrega o YouTube no clique (leve), e o vídeo para ao trocar de slide. Aceita swipe no celular.",
    tags: ["Carousel", "YouTube Lazy", "Swipe", "Play Pulse", "Mídia"],
    defaultSection: "Na Mídia / Entrevistas",
    previewType: "um-video-carousel",
    tech: ["Tailwind CSS", "React", "CSS Transitions"],
    frameworks: {
      react: `import { useRef, useState } from 'react';

function Video({ id, poster, kicker, title, playing, onPlay }) {
  if (playing) return (
    <div className="relative aspect-video overflow-hidden rounded-[22px] bg-[#283838]">
      <iframe className="absolute inset-0 h-full w-full border-0" src={'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0'} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
    </div>
  );
  return (
    <button onClick={onPlay} className="group relative block aspect-video w-full overflow-hidden rounded-[22px] bg-[#283838] text-left shadow-[0_24px_60px_-28px_rgba(40,56,56,.55)] focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[3px] focus-visible:outline-[#E2CA7C]">
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_25%] brightness-[.55] saturate-[.85] transition duration-[1200ms] group-hover:scale-[1.04] group-hover:brightness-[.62]" />
      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,56,56,0)_40%,rgba(40,56,56,.85))]" />
      <span className="absolute left-1/2 top-1/2 z-10 grid h-[clamp(64px,9vw,92px)] w-[clamp(64px,9vw,92px)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#E2CA7C] text-[#283838] transition-[scale] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-110">
        <span className="absolute -inset-2.5 rounded-full border-2 border-[#E2CA7C] motion-safe:animate-[vcPulse_2.2s_ease-out_infinite]" />
        <svg viewBox="0 0 24 24" className="ml-[6%] h-[42%] w-[42%]" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </span>
      <span className="absolute inset-x-[clamp(16px,3vw,32px)] bottom-[clamp(14px,2.6vw,28px)] z-10 flex flex-col gap-1 text-white">
        <b className="text-xs uppercase tracking-[.14em] text-[#E2CA7C]">{kicker}</b><span className="text-[clamp(15px,1.6vw,19px)] font-semibold">{title}</span>
      </span>
    </button>
  );
}

export function VideoCarousel({ videos = [
  { id: 'VIDEO_ID_1', poster: '/capa1.webp', kicker: 'TV', title: 'Entrevista sobre cirurgia robótica' },
  { id: 'VIDEO_ID_2', poster: '/capa2.webp', kicker: 'Podcast', title: 'Saúde do homem sem tabu' },
] }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(-1);
  const x0 = useRef(null);
  const go = (n) => { setI(Math.max(0, Math.min(videos.length - 1, n))); setPlaying(-1); }; // trocar de slide para o vídeo
  return (
    <div className="mx-auto max-w-[880px]">
      <style>{'@keyframes vcPulse{from{opacity:.8;scale:1}to{opacity:0;scale:1.35}}'}</style>
      <div className="overflow-hidden rounded-[22px]">
        <ul className="flex touch-pan-y transition-transform duration-[800ms] ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none" style={{ transform: 'translateX(' + -100 * i + '%)' }}
          onTouchStart={(e) => { x0.current = [e.touches[0].clientX, e.touches[0].clientY]; }}
          onTouchEnd={(e) => { if (!x0.current) return; const dx = e.changedTouches[0].clientX - x0.current[0], dy = e.changedTouches[0].clientY - x0.current[1]; x0.current = null; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(i + (dx < 0 ? 1 : -1)); }}>
          {videos.map((v, k) => (
            <li key={k} aria-hidden={k !== i} className={'min-w-0 flex-[0_0_100%] transition-[opacity,scale] duration-[800ms] ' + (k === i ? '' : 'scale-[.92] opacity-35')}>
              <Video {...v} playing={playing === k} onPlay={() => setPlaying(k)} />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        {[-1, 1].map((d) => (
          <button key={d} onClick={() => go(i + d)} disabled={d < 0 ? i === 0 : i === videos.length - 1} aria-label={d < 0 ? 'Anterior' : 'Próximo'}
            className={'grid h-[52px] w-[52px] place-items-center rounded-full border border-[#283838] text-[#283838] transition duration-300 enabled:hover:bg-[#283838] enabled:hover:text-[#E2CA7C] disabled:opacity-30 ' + (d < 0 ? 'enabled:hover:-translate-x-[3px]' : 'enabled:hover:translate-x-[3px]')}>{d < 0 ? '←' : '→'}</button>
        )).reduce((a, el, k) => (k ? [...a, <p key="c" className="min-w-14 text-center tabular-nums text-[#4B5563]"><b className="text-xl text-[#283838]">{i + 1}</b> / {videos.length}</p>, el] : [el]), [])}
      </div>
    </div>
  );
}`,
      tailwind: `<style>
  @keyframes vcPulse{from{opacity:.8;scale:1}to{opacity:0;scale:1.35}}
  .vc-track{display:flex;transition:transform .8s cubic-bezier(.65,0,.35,1);touch-action:pan-y}
  .vc-slide{flex:0 0 100%;min-width:0;transition:opacity .8s,scale .8s cubic-bezier(.65,0,.35,1)}.vc-slide[aria-hidden="true"]{opacity:.35;scale:.92}
</style>
<div class="vc mx-auto max-w-[880px]">
  <div class="overflow-hidden rounded-[22px]">
    <ul class="vc-track">
      <li class="vc-slide"><div class="vc-v relative aspect-video overflow-hidden rounded-[22px] bg-[#283838]" data-yt="VIDEO_ID_1">
        <button class="group absolute inset-0"><img src="/capa1.webp" alt="" class="absolute inset-0 h-full w-full object-cover brightness-[.55]"><span class="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#E2CA7C] text-[#283838]"><span class="absolute -inset-2.5 rounded-full border-2 border-[#E2CA7C] animate-[vcPulse_2.2s_ease-out_infinite]"></span>▶</span></button>
      </div></li>
      <li class="vc-slide"><div class="vc-v relative aspect-video overflow-hidden rounded-[22px] bg-[#283838]" data-yt="VIDEO_ID_2">
        <button class="group absolute inset-0"><img src="/capa2.webp" alt="" class="absolute inset-0 h-full w-full object-cover brightness-[.55]"><span class="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#E2CA7C] text-[#283838]">▶</span></button>
      </div></li>
    </ul>
  </div>
  <div class="mt-4 flex items-center justify-center gap-4">
    <button class="vc-prev grid h-[52px] w-[52px] place-items-center rounded-full border border-[#283838] disabled:opacity-30">←</button>
    <p class="min-w-14 text-center"><b class="vc-n text-xl">1</b> / 2</p>
    <button class="vc-next grid h-[52px] w-[52px] place-items-center rounded-full border border-[#283838] disabled:opacity-30">→</button>
  </div>
</div>
<script>
document.querySelectorAll('.vc').forEach(function (car) {
  var track = car.querySelector('.vc-track'), slides = car.querySelectorAll('.vc-slide'), prev = car.querySelector('.vc-prev'), next = car.querySelector('.vc-next'), num = car.querySelector('.vc-n'), i = 0;
  function play(v) { if (!v._c) v._c = v.firstElementChild; var f = document.createElement('iframe'); f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.dataset.yt) + '?autoplay=1&rel=0'; f.allow = 'autoplay; encrypted-media; fullscreen'; f.allowFullscreen = true; f.className = 'absolute inset-0 h-full w-full border-0'; v.replaceChildren(f); }
  function stop(v) { if (v._c && v.querySelector('iframe')) v.replaceChildren(v._c); }
  car.querySelectorAll('.vc-v').forEach(function (v) { v.firstElementChild.addEventListener('click', function () { play(v); }); });
  function go(n) { i = Math.max(0, Math.min(slides.length - 1, n)); track.style.transform = 'translateX(' + -100 * i + '%)'; slides.forEach(function (s, k) { if (k === i) s.removeAttribute('aria-hidden'); else { s.setAttribute('aria-hidden', 'true'); stop(s.querySelector('.vc-v')); } }); num.textContent = i + 1; prev.disabled = i === 0; next.disabled = i === slides.length - 1; }
  prev.addEventListener('click', function () { go(i - 1); }); next.addEventListener('click', function () { go(i + 1); });
  var x0 = null, y0 = 0;
  track.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  track.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(i + (dx < 0 ? 1 : -1)); }, { passive: true });
  go(0);
});
</script>`
    }
  },
  {
    ...B,
    id: "uromed-faq-gold-bar",
    name: "FAQ com Barra Dourada e Abertura Suave",
    category: "navigation",
    categoryLabel: "Modais & Menus",
    badge: "Uromed",
    description: "Perguntas que abrem com altura animada de verdade (grid-template-rows 0fr→1fr), o fundo ganha um verde clarinho, uma barra dourada desce pela lateral e o '+' gira 180° virando '−' dentro de um círculo dourado.",
    tags: ["Accordion", "Grid Rows", "FAQ", "Acessível", "Sem Altura Fixa"],
    defaultSection: "FAQ",
    previewType: "um-faq-rows",
    tech: ["Tailwind CSS", "React", "CSS Transitions"],
    frameworks: {
      react: `import { useState } from 'react';

const CSS = '.fq-i::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:#8A6D1F;transform:scaleY(0);transform-origin:top;transition:transform .6s cubic-bezier(.22,1,.36,1)}.fq-i.open::before{transform:scaleY(1)}' +
  '.fq-ic{transition:background-color .4s,border-color .4s,transform .6s cubic-bezier(.22,1,.36,1)}.fq-ic::before,.fq-ic::after{content:"";position:absolute;left:50%;top:50%;width:12px;height:1.5px;margin:-.75px 0 0 -6px;background:#283838}' +
  '.fq-ic::after{transform:rotate(90deg);transition:transform .5s cubic-bezier(.22,1,.36,1)}.open .fq-ic{background:#E2CA7C;border-color:#E2CA7C;transform:rotate(180deg)}.open .fq-ic::after{transform:rotate(0)}' +
  '.fq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .55s cubic-bezier(.22,1,.36,1)}.open .fq-a{grid-template-rows:1fr}' +
  '@media (prefers-reduced-motion:reduce){.fq-i *,.fq-i::before{transition:none!important}}';

export function FaqGoldBar({ items = [
  { q: 'Quando devo procurar um urologista?', a: 'A partir dos 20 anos para consultas de rotina, e sempre que houver sintomas urinários.' },
  { q: 'A cirurgia robótica dói menos?', a: 'Os cortes são menores, o que costuma significar menos dor e recuperação mais rápida.' },
] }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="mx-auto max-w-[860px] border-t border-[rgba(40,56,56,.13)]">
      <style>{CSS}</style>
      {items.map((it, i) => (
        <div key={i} className={'fq-i relative overflow-hidden rounded-[22px] border-b border-[rgba(40,56,56,.13)] transition-colors duration-500 ' + (open === i ? 'open bg-[#F0F5F2]' : '')}>
          <h3>
            <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)} className="flex min-h-[68px] w-full items-center gap-[18px] px-[18px] py-[22px] text-left font-semibold text-[#283838]">
              <span className="flex-1">{it.q}</span>
              <i className="fq-ic relative h-8 w-8 flex-none rounded-full border border-[#283838]" />
            </button>
          </h3>
          <div className="fq-a"><div className="overflow-hidden"><p className="max-w-[66ch] pb-[26px] pl-[18px] pr-[70px] text-[#4B5563]">{it.a}</p></div></div>
        </div>
      ))}
    </div>
  );
}`,
      tailwind: `<style>
  .fq-i::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:#8A6D1F;transform:scaleY(0);transform-origin:top;transition:transform .6s cubic-bezier(.22,1,.36,1)}.fq-i.open::before{transform:scaleY(1)}
  .fq-i.open{background:#F0F5F2}
  .fq-ic{transition:all .6s cubic-bezier(.22,1,.36,1)}.fq-ic::before,.fq-ic::after{content:"";position:absolute;left:50%;top:50%;width:12px;height:1.5px;margin:-.75px 0 0 -6px;background:#283838}
  .fq-ic::after{transform:rotate(90deg);transition:transform .5s}.open .fq-ic{background:#E2CA7C;border-color:#E2CA7C;transform:rotate(180deg)}.open .fq-ic::after{transform:rotate(0)}
  .fq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .55s cubic-bezier(.22,1,.36,1)}.open .fq-a{grid-template-rows:1fr}
</style>
<div class="mx-auto max-w-[860px] border-t border-[rgba(40,56,56,.13)]">
  <div class="fq-i relative overflow-hidden rounded-[22px] border-b border-[rgba(40,56,56,.13)] transition-colors duration-500">
    <h3><button aria-expanded="false" class="flex min-h-[68px] w-full items-center gap-[18px] p-[18px] text-left font-semibold text-[#283838]"><span class="flex-1">Quando devo procurar um urologista?</span><i class="fq-ic relative h-8 w-8 flex-none rounded-full border border-[#283838]"></i></button></h3>
    <div class="fq-a"><div class="overflow-hidden"><p class="pb-6 pl-[18px] pr-16 text-[#4B5563]">A partir dos 20 anos para consultas de rotina.</p></div></div>
  </div>
</div>
<script>
  document.querySelectorAll('.fq-i').forEach(function (it) {
    var b = it.querySelector('button');
    b.addEventListener('click', function () { var o = it.classList.toggle('open'); b.setAttribute('aria-expanded', o); });
  });
</script>`
    }
  },
  {
    ...B,
    id: "uromed-drawn-wave-divider",
    name: "Divisa Curva com Fio Dourado que se Desenha",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    badge: "Uromed",
    description: "Transição entre duas seções de cores diferentes por uma curva suave; quando a divisa entra na tela, um fio dourado fino se desenha da esquerda para a direita acompanhando a curva. Pode ser espelhada para alternar o lado.",
    tags: ["Divider", "SVG", "Clip-path", "Reveal", "Luxo"],
    defaultSection: "Entre Seções",
    previewType: "um-drawn-divider",
    tech: ["Tailwind CSS", "React", "SVG", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

// from = cor da seção de cima, to = cor da seção de baixo
export function DrawnWaveDivider({ from = '#283838', to = '#F0F5F2', flip = false }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.12 });
    io.observe(ref.current); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} aria-hidden className="relative z-[1] -my-px leading-[0]" style={{ background: 'linear-gradient(' + from + ' 84%,' + to + ' 84%)' }}>
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="block h-[clamp(44px,7vw,110px)] w-full" style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
        <path d="M0 40 C360 120 1080 -20 1440 60 V110 H0Z" fill={to} />
        <path d="M0 40 C360 120 1080 -20 1440 60" fill="none" stroke="#E2CA7C" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
          className="transition-[clip-path] delay-100 duration-[2000ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
          style={{ clipPath: inView ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }} />
      </svg>
    </div>
  );
}`,
      tailwind: `<div class="wd relative z-[1] -my-px leading-[0]" aria-hidden="true" style="background:linear-gradient(#283838 84%,#F0F5F2 84%)">
  <style>.wd-line{clip-path:inset(0 100% 0 0);transition:clip-path 2s cubic-bezier(.22,1,.36,1) .1s}.wd.is-in .wd-line{clip-path:inset(0 0 0 0)}</style>
  <svg viewBox="0 0 1440 110" preserveAspectRatio="none" class="block h-[clamp(44px,7vw,110px)] w-full">
    <path d="M0 40 C360 120 1080 -20 1440 60 V110 H0Z" fill="#F0F5F2"/>
    <path class="wd-line" d="M0 40 C360 120 1080 -20 1440 60" fill="none" stroke="#E2CA7C" stroke-width="1.5" vector-effect="non-scaling-stroke"/>
  </svg>
</div>
<script>
  document.querySelectorAll('.wd').forEach(function (el) {
    new IntersectionObserver(function (e) { el.classList.toggle('is-in', e[0].isIntersecting); }, { threshold: .12 }).observe(el);
  });
</script>`
    }
  },
];
