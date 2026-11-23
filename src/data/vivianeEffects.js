// Efeitos extraídos da página de links da Viviane Rocha (mentalidadedeaprovado.com.br/links)
export const vivianeEffects = [
  {
    id: "vivi-diagonal-outline-rows",
    name: "Faixas Diagonais de Palavras Vazadas",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    badge: "Vivi",
    client: "Viviane Rocha",
    description: "Fundo com várias faixas de palavras gigantes (só contorno) inclinadas, correndo em sentidos alternados sem emenda. Dá profundidade e autoridade ao hero sem competir com o conteúdo.",
    tags: ["Marquee", "Text Stroke", "Hero", "Fundo", "Loop Infinito"],
    defaultSection: "Hero Principal",
    previewType: "vivi-outline-rows",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `const WORDS = ['TJ/SP', 'Receita Federal', 'BNDES', 'INSS', 'Polícia Civil', 'Banco do Brasil', 'Caixa', 'MP/SP'];

export function DiagonalOutlineRows({ words = WORDS, rows = 6, children }) {
  return (
    <section className="relative overflow-hidden bg-[#01332f] px-4 pt-16 pb-28 text-center">
      <style>{'@keyframes rowSlide{to{transform:translateX(-50%)}}.row-word{-webkit-text-stroke:1.5px rgba(200,221,217,.08);color:transparent}.row-word:nth-child(3n+2){-webkit-text-stroke:0;color:rgba(59,182,119,.08)}@media (prefers-reduced-motion:reduce){.row-anim{animation:none!important}}'}</style>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-y-[40%] -inset-x-[30%] flex -rotate-12 flex-col justify-around">
          {Array.from({ length: rows }).map((_, r) => {
            const k = (r * 3) % words.length;
            const list = words.slice(k).concat(words.slice(0, k));
            return (
              <div key={r} className="row-anim flex w-max whitespace-nowrap"
                style={{ animation: 'rowSlide ' + (r % 2 ? 75 : 60) + 's linear infinite', animationDirection: r % 2 ? 'reverse' : 'normal' }}>
                {list.concat(list).map((w, i) => (
                  <span key={i} className="row-word pr-[.5em] text-[clamp(3.2rem,9vw,6.5rem)] font-black uppercase leading-none tracking-[-.04em]">{w}</span>
                ))}
              </div>
            );
          })}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_50%_45%,rgba(1,51,47,.85),transparent_75%)]" />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}`,
      tailwind: `<section class="relative overflow-hidden bg-[#01332f] px-4 pt-16 pb-28 text-center">
  <style>
    @keyframes rowSlide { to { transform: translateX(-50%); } }
    .row { display:flex; width:max-content; white-space:nowrap; animation: rowSlide 60s linear infinite; }
    .row:nth-child(even) { animation-direction: reverse; animation-duration: 75s; }
    .row span { padding-right:.5em; font-size:clamp(3.2rem,9vw,6.5rem); font-weight:900; text-transform:uppercase; line-height:1; letter-spacing:-.04em; color:transparent; -webkit-text-stroke:1.5px rgba(200,221,217,.08); }
    .row span:nth-child(3n+2) { -webkit-text-stroke:0; color:rgba(59,182,119,.08); }
    @media (prefers-reduced-motion: reduce) { .row { animation: none; } }
  </style>
  <div aria-hidden="true" class="pointer-events-none absolute inset-0">
    <div id="rows" class="absolute -inset-y-[40%] -inset-x-[30%] flex -rotate-12 flex-col justify-around"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_50%_45%,rgba(1,51,47,.85),transparent_75%)]"></div>
  </div>
  <div class="relative z-10"><!-- conteúdo do hero --></div>
  <script>
    var words = ['TJ/SP','Receita Federal','BNDES','INSS','Polícia Civil','Banco do Brasil','Caixa','MP/SP'];
    var rows = document.getElementById('rows');
    for (var r = 0; r < 6; r++) {
      var k = r * 3 % words.length, list = words.slice(k).concat(words.slice(0, k));
      var html = list.map(function (w) { return '<span>' + w + '</span>'; }).join('');
      var row = document.createElement('div'); row.className = 'row'; row.innerHTML = html + html; rows.appendChild(row);
    }
  </script>
</section>`
    }
  },
  {
    id: "vivi-liquid-halo-seal",
    name: "Foto com Mancha Líquida e Selo Girando",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    badge: "Vivi",
    client: "Viviane Rocha",
    description: "Foto redonda sobre uma mancha degradê que muda de forma sem parar, com um selo de texto circular girando em volta. O selo acelera quando o mouse chega perto e a mancha se inclina na direção dele.",
    tags: ["Blob", "Texto Circular", "Mouse Reactive", "Avatar", "SVG"],
    defaultSection: "Hero / Foto do Mentor",
    previewType: "vivi-liquid-halo",
    tech: ["Tailwind CSS", "React", "SVG textPath", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

export function LiquidHaloSeal({ src = '/foto.jpg', text = 'Mentora de concursos • 20+ órgãos • desde 1994 • ' }) {
  const wrap = useRef(null), ring = useRef(null), blob = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ang = 0, vel = .009, boost = 0, last = 0, raf;
    const loop = (now) => {
      const dt = last ? Math.min(now - last, 50) : 16; last = now;
      vel += (.009 + boost * .05 - vel) * .05; ang = (ang + vel * dt) % 360;
      ring.current.style.transform = 'rotate(' + ang.toFixed(2) + 'deg)';
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const move = (e) => {
      const b = wrap.current.getBoundingClientRect();
      const dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height / 2), d = Math.hypot(dx, dy) || 1;
      boost = Math.max(0, 1 - d / 380);
      const f = Math.min(d, 300) / 300 * 14;
      blob.current.style.translate = (dx / d * f) + 'px ' + (dy / d * f) + 'px';
      blob.current.style.scale = d < b.width * .6 ? '1.06' : '1';
    };
    const leave = () => { boost = 0; blob.current.style.translate = '0 0'; blob.current.style.scale = '1'; };
    addEventListener('pointermove', move); document.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); };
  }, []);
  return (
    <div ref={wrap} className="relative mx-auto aspect-square w-[min(340px,86vw)]">
      <style>{'@keyframes blobMorph{33%{border-radius:62% 38% 34% 66%/55% 62% 38% 45%}66%{border-radius:36% 64% 57% 43%/63% 37% 63% 37%}100%{border-radius:55% 45% 40% 60%/38% 55% 45% 62%}}@keyframes blobSpin{to{transform:rotate(1turn)}}@keyframes avReveal{from{clip-path:circle(0% at 50% 50%)}to{clip-path:circle(50% at 50% 50%)}}'}</style>
      <div ref={blob} className="absolute inset-[8.5%] bg-[linear-gradient(135deg,#3bb677,#0f5d53_48%,#ff810a)] transition-[translate,scale] duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:!animate-none"
        style={{ borderRadius: '42% 58% 63% 37% / 45% 40% 60% 55%', animation: 'blobMorph 10s ease-in-out infinite alternate, blobSpin 26s linear infinite' }} />
      <div className="absolute inset-[14.5%] overflow-hidden rounded-full border-4 border-[#faf9f6]" style={{ animation: 'avReveal 1.2s cubic-bezier(.22,1,.36,1) .15s backwards' }}>
        <img src={src} alt="" className="h-full w-full object-cover" />
      </div>
      <svg ref={ring} viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs><path id="haloPath" d="M50,50 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth=".35" />
        <text fill="rgba(255,255,255,.88)" fontSize="5.1" fontWeight="800" letterSpacing=".9" style={{ textTransform: 'uppercase' }}>
          <textPath href="#haloPath">{text}{text}</textPath>
        </text>
      </svg>
    </div>
  );
}`,
      tailwind: `<div id="halo" class="relative mx-auto aspect-square w-[min(340px,86vw)]">
  <style>
    @keyframes blobMorph { 33%{border-radius:62% 38% 34% 66%/55% 62% 38% 45%} 66%{border-radius:36% 64% 57% 43%/63% 37% 63% 37%} 100%{border-radius:55% 45% 40% 60%/38% 55% 45% 62%} }
    @keyframes blobSpin { to { transform: rotate(1turn); } }
    .halo-blob { border-radius:42% 58% 63% 37%/45% 40% 60% 55%; animation: blobMorph 10s ease-in-out infinite alternate, blobSpin 26s linear infinite; transition: translate .8s cubic-bezier(.22,1,.36,1), scale .8s; }
  </style>
  <div id="haloBlob" class="halo-blob absolute inset-[8.5%] bg-[linear-gradient(135deg,#3bb677,#0f5d53_48%,#ff810a)]"></div>
  <div class="absolute inset-[14.5%] overflow-hidden rounded-full border-4 border-[#faf9f6]">
    <img src="foto.jpg" alt="" class="h-full w-full object-cover" />
  </div>
  <svg id="haloRing" viewBox="0 0 100 100" class="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
    <defs><path id="hp" d="M50,50 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs>
    <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,.14)" stroke-width=".35"/>
    <text fill="rgba(255,255,255,.88)" font-size="5.1" font-weight="800" letter-spacing=".9" style="text-transform:uppercase">
      <textPath href="#hp">Mentora de concursos • 20+ órgãos • desde 1994 • Mentora de concursos • 20+ órgãos •</textPath>
    </text>
  </svg>
  <script>
    (function () {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var halo = document.getElementById('halo'), ring = document.getElementById('haloRing'), blob = document.getElementById('haloBlob');
      var ang = 0, vel = .009, boost = 0, last = 0;
      (function loop(now) {
        var dt = last ? Math.min(now - last, 50) : 16; last = now || 0;
        vel += (.009 + boost * .05 - vel) * .05; ang = (ang + vel * dt) % 360;
        ring.style.transform = 'rotate(' + ang.toFixed(2) + 'deg)';
        requestAnimationFrame(loop);
      })();
      addEventListener('pointermove', function (e) {
        var b = halo.getBoundingClientRect(), dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height / 2), d = Math.hypot(dx, dy) || 1;
        boost = Math.max(0, 1 - d / 380);
        var f = Math.min(d, 300) / 300 * 14;
        blob.style.translate = (dx / d * f) + 'px ' + (dy / d * f) + 'px';
        blob.style.scale = d < b.width * .6 ? 1.06 : 1;
      });
    })();
  </script>
</div>`
    }
  },
  {
    id: "vivi-tilted-letter-rise",
    name: "Nome Subindo Letra por Letra",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    badge: "Vivi",
    client: "Viviane Rocha",
    description: "Cada letra do título nasce abaixo da linha, levemente girada, e sobe para o lugar em cascata. Entrada elegante e rápida, com destaque de cor no sobrenome.",
    tags: ["Stagger", "Headline", "Entrada", "Split Text"],
    defaultSection: "Nome / H1 do Hero",
    previewType: "vivi-letter-rise",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `export function LetterRise({ first = 'Viviane', last = 'Rocha', step = 0.045 }) {
  const letters = Array.from(first + ' ' + last);
  return (
    <h1 className="text-[clamp(2.3rem,8vw,3.2rem)] font-black leading-none tracking-[-.045em] text-white">
      <style>{'@keyframes letterUp{to{opacity:1;transform:none}}.lr{display:inline-block;opacity:0;transform:translateY(.6em) rotate(6deg);animation:letterUp .8s cubic-bezier(.22,1,.36,1) forwards}@media (prefers-reduced-motion:reduce){.lr{animation:none;opacity:1;transform:none}}'}</style>
      {letters.map((c, i) => (
        <span key={i} className={'lr' + (i > first.length ? ' text-[#ff810a]' : '')} style={{ animationDelay: (0.2 + i * step) + 's' }}>
          {c === ' ' ? '\\u00a0' : c}
        </span>
      ))}
    </h1>
  );
}`,
      tailwind: `<style>
  @keyframes letterUp { to { opacity: 1; transform: none; } }
  .lr span { display:inline-block; opacity:0; transform:translateY(.6em) rotate(6deg); animation: letterUp .8s cubic-bezier(.22,1,.36,1) forwards; }
  @media (prefers-reduced-motion: reduce) { .lr span { animation:none; opacity:1; transform:none; } }
</style>
<h1 class="lr text-[clamp(2.3rem,8vw,3.2rem)] font-black leading-none tracking-[-.045em] text-white" data-split>Viviane <em class="not-italic text-[#ff810a]">Rocha</em></h1>
<script>
  document.querySelectorAll('[data-split]').forEach(function (h) {
    var i = 0;
    (function walk(node) {
      [].slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          Array.from(n.textContent).forEach(function (c) {
            var s = document.createElement('span'); s.textContent = c === ' ' ? '\\u00a0' : c;
            s.style.animationDelay = (0.2 + i++ * 0.045) + 's'; frag.appendChild(s);
          });
          n.replaceWith(frag);
        } else walk(n);
      });
    })(h);
  });
</script>`
    }
  },
  {
    id: "vivi-double-wave-divider",
    name: "Divisa de Ondas Duplas",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    badge: "Vivi",
    client: "Viviane Rocha",
    description: "Duas ondas sobrepostas na base da seção, correndo em velocidades diferentes. Faz a transição entre fundos parecer líquida em vez de um corte seco.",
    tags: ["SVG", "Divider", "Wave", "Parallax", "Loop"],
    defaultSection: "Transição Hero → Conteúdo",
    previewType: "vivi-double-wave",
    tech: ["Tailwind CSS", "React", "SVG", "CSS Keyframes"],
    frameworks: {
      react: `const WAVE = 'M0 40 C 150 80 350 0 500 40 S 850 80 1000 40 S 1350 0 1500 40 S 1850 80 2000 40 V100 H0 Z';

export function DoubleWave({ back = 'rgba(59,182,119,.35)', front = '#ffffff' }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-px z-10 h-[90px] overflow-hidden">
      <style>{'@keyframes waveX{to{transform:translateX(-50%)}}@media (prefers-reduced-motion:reduce){.wv{animation:none!important}}'}</style>
      <svg className="wv absolute bottom-0 left-0 h-full w-[200%]" viewBox="0 0 2000 100" preserveAspectRatio="none" style={{ animation: 'waveX 22s linear infinite reverse' }}>
        <path d={WAVE} fill={back} transform="translate(0 -14)" />
      </svg>
      <svg className="wv absolute bottom-0 left-0 h-full w-[200%]" viewBox="0 0 2000 100" preserveAspectRatio="none" style={{ animation: 'waveX 14s linear infinite' }}>
        <path d={WAVE} fill={front} />
      </svg>
    </div>
  );
}`,
      tailwind: `<!-- coloque dentro de uma seção com position:relative -->
<div aria-hidden="true" class="pointer-events-none absolute inset-x-0 -bottom-px z-10 h-[90px] overflow-hidden">
  <style>
    @keyframes waveX { to { transform: translateX(-50%); } }
    .wv-a { animation: waveX 14s linear infinite; }
    .wv-b { animation: waveX 22s linear infinite reverse; }
    @media (prefers-reduced-motion: reduce) { .wv-a, .wv-b { animation: none; } }
  </style>
  <svg class="wv-b absolute bottom-0 left-0 h-full w-[200%]" viewBox="0 0 2000 100" preserveAspectRatio="none">
    <path transform="translate(0 -14)" fill="rgba(59,182,119,.35)" d="M0 40 C 150 80 350 0 500 40 S 850 80 1000 40 S 1350 0 1500 40 S 1850 80 2000 40 V100 H0 Z"/>
  </svg>
  <svg class="wv-a absolute bottom-0 left-0 h-full w-[200%]" viewBox="0 0 2000 100" preserveAspectRatio="none">
    <path fill="#ffffff" d="M0 40 C 150 80 350 0 500 40 S 850 80 1000 40 S 1350 0 1500 40 S 1850 80 2000 40 V100 H0 Z"/>
  </svg>
</div>`
    }
  },
  {
    id: "vivi-repel-dot-field",
    name: "Campo de Pontos que Foge do Mouse",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    badge: "Vivi",
    client: "Viviane Rocha",
    description: "Grade de bolinhas em canvas que se afastam do cursor e acendem em verde ao redor dele, com um brilho suave seguindo o mouse. Só redesenha enquanto o mouse se mexe, então pesa quase nada.",
    tags: ["Canvas", "Dot Grid", "Mouse Reactive", "Glow", "Performance"],
    defaultSection: "Fundo da Seção de Cards",
    previewType: "vivi-dot-repel",
    tech: ["HTML5 Canvas", "React", "Tailwind CSS"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

export function RepelDotField({ children, gap = 22, radius = 130, dot = 'rgba(1,51,47,.2)', hot = '59,182,119' }) {
  const sec = useRef(null), cv = useRef(null), glow = useRef(null);
  useEffect(() => {
    const s = sec.current, c = cv.current, cx = c.getContext('2d');
    let W, H, mx = -999, my = -999, tx = -999, ty = -999, raf = 0;
    const draw = () => {
      cx.clearRect(0, 0, W, H);
      for (let y = gap / 2; y < H; y += gap) for (let x = gap / 2; x < W; x += gap) {
        const dx = x - mx, dy = y - my, dd = Math.sqrt(dx * dx + dy * dy), k = dd < radius ? 1 - dd / radius : 0;
        let px = x, py = y;
        if (k) { const p = k * k * 14 / (dd || 1); px += dx * p; py += dy * p; }
        cx.fillStyle = k ? 'rgba(' + hot + ',' + (.25 + k * .65) + ')' : dot;
        cx.beginPath(); cx.arc(px, py, 1.3 + k * 1.7, 0, 6.283); cx.fill();
      }
    };
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2); W = s.clientWidth; H = s.clientHeight;
      c.width = W * dpr; c.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
    };
    const loop = () => {
      mx += (tx - mx) * .18; my += (ty - my) * .18; draw();
      raf = Math.abs(tx - mx) + Math.abs(ty - my) > .5 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e) => {
      const b = s.getBoundingClientRect(); tx = e.clientX - b.left; ty = e.clientY - b.top;
      if (mx < -500) { mx = tx; my = ty; }
      glow.current.style.transform = 'translate(' + tx + 'px,' + ty + 'px)'; glow.current.style.opacity = 1;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const leave = () => { glow.current.style.opacity = 0; tx = ty = mx = my = -999; draw(); };
    const ro = new ResizeObserver(size); ro.observe(s); size();
    const ok = !matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(hover: hover)').matches;
    if (ok) { s.addEventListener('pointermove', move); s.addEventListener('pointerleave', leave); }
    return () => { ro.disconnect(); cancelAnimationFrame(raf); s.removeEventListener('pointermove', move); s.removeEventListener('pointerleave', leave); };
  }, [gap, radius, dot, hot]);
  return (
    <section ref={sec} className="relative px-4 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)]">
        <canvas ref={cv} className="absolute inset-0 h-full w-full" />
        <div ref={glow} className="absolute left-0 top-0 -ml-[260px] -mt-[260px] h-[520px] w-[520px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform bg-[radial-gradient(closest-side,rgba(59,182,119,.2),rgba(59,182,119,.07)_55%,transparent)]" />
      </div>
      <div className="relative">{children}</div>
    </section>
  );
}`,
      tailwind: `<section id="dotSec" class="relative px-4 py-16">
  <div class="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)]">
    <canvas id="dots" class="absolute inset-0 h-full w-full"></canvas>
    <div id="dotGlow" class="absolute left-0 top-0 -ml-[260px] -mt-[260px] h-[520px] w-[520px] rounded-full opacity-0 transition-opacity duration-500 bg-[radial-gradient(closest-side,rgba(59,182,119,.2),rgba(59,182,119,.07)_55%,transparent)]"></div>
  </div>
  <div class="relative"><!-- conteúdo --></div>
</section>
<script>
  (function () {
    var sec = document.getElementById('dotSec'), cv = document.getElementById('dots'), cx = cv.getContext('2d'), glow = document.getElementById('dotGlow');
    var G = 22, R = 130, W, H, mx = -999, my = -999, tx = -999, ty = -999, raf = 0;
    function draw() {
      cx.clearRect(0, 0, W, H);
      for (var y = G / 2; y < H; y += G) for (var x = G / 2; x < W; x += G) {
        var dx = x - mx, dy = y - my, dd = Math.sqrt(dx * dx + dy * dy), k = dd < R ? 1 - dd / R : 0, px = x, py = y;
        if (k) { var p = k * k * 14 / (dd || 1); px += dx * p; py += dy * p; }
        cx.fillStyle = k ? 'rgba(59,182,119,' + (.25 + k * .65) + ')' : 'rgba(1,51,47,.2)';
        cx.beginPath(); cx.arc(px, py, 1.3 + k * 1.7, 0, 6.283); cx.fill();
      }
    }
    function size() { var d = Math.min(devicePixelRatio || 1, 2); W = sec.clientWidth; H = sec.clientHeight; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0); draw(); }
    function loop() { mx += (tx - mx) * .18; my += (ty - my) * .18; draw(); raf = Math.abs(tx - mx) + Math.abs(ty - my) > .5 ? requestAnimationFrame(loop) : 0; }
    new ResizeObserver(size).observe(sec); size();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover)').matches) return;
    sec.addEventListener('pointermove', function (e) {
      var b = sec.getBoundingClientRect(); tx = e.clientX - b.left; ty = e.clientY - b.top;
      if (mx < -500) { mx = tx; my = ty; }
      glow.style.transform = 'translate(' + tx + 'px,' + ty + 'px)'; glow.style.opacity = 1;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    sec.addEventListener('pointerleave', function () { glow.style.opacity = 0; tx = ty = mx = my = -999; draw(); });
  })();
</script>`
    }
  },
  {
    id: "vivi-sticky-stack-cards",
    name: "Pilha de Cards Grudando no Topo",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    badge: "Vivi",
    client: "Viviane Rocha",
    description: "Na rolagem, cada card gruda no topo e o próximo passa por cima, enquanto o de baixo encolhe e escurece. Vira um baralho de ofertas que o visitante folheia com o dedo.",
    tags: ["Sticky", "Scroll", "Stack", "Cards", "Mobile First"],
    defaultSection: "Lista de Links / Ofertas",
    previewType: "vivi-sticky-stack",
    tech: ["Tailwind CSS", "React", "Position Sticky", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

export function StickyStack({ items = [{ title: 'Mentoria TJ/SP' }, { title: 'Vem para a mentoria' }, { title: 'Simulado gratuito' }] }) {
  const refs = useRef([]);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const stack = () => {
      ticking = false;
      refs.current.forEach((c, i) => {
        const next = refs.current[i + 1]; if (!c || !next) return;
        const a = c.getBoundingClientRect(), b = next.getBoundingClientRect();
        const p = Math.min(Math.max(1 - (b.top - a.top - 16) / a.height, 0), 1);
        c.style.scale = 1 - p * .08;
        c.style.setProperty('--dim', p);
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(stack); } };
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', stack); stack();
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', stack); };
  }, []);
  return (
    <div className="mx-auto grid max-w-[880px] gap-[30px] px-4 py-10">
      {items.map((it, i) => (
        <a key={i} href={it.href || '#'} ref={(el) => (refs.current[i] = el)}
          style={{ top: 28 + i * 16 + 'px', '--dim': 0 }}
          className="relative sticky grid min-h-[420px] origin-top place-items-center rounded-[34px] border border-[#c8ddd9] bg-[#faf9f6] p-8 text-[#01332f] no-underline after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-[#01332f] after:opacity-[calc(var(--dim)*.35)] after:content-['']">
          <h3 className="text-4xl font-black tracking-[-.04em]">{it.title}</h3>
        </a>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="mx-auto grid max-w-[880px] gap-[30px] px-4 py-10" id="stack">
  <a href="#" class="stk sticky top-[28px] grid min-h-[420px] origin-top place-items-center rounded-[34px] border border-[#c8ddd9] bg-[#faf9f6] p-8 text-[#01332f]">Card 1</a>
  <a href="#" class="stk sticky top-[44px] grid min-h-[420px] origin-top place-items-center rounded-[34px] border border-[#c8ddd9] bg-[#faf9f6] p-8 text-[#01332f]">Card 2</a>
  <a href="#" class="stk sticky top-[60px] grid min-h-[420px] origin-top place-items-center rounded-[34px] border border-[#c8ddd9] bg-[#faf9f6] p-8 text-[#01332f]">Card 3</a>
</div>
<style>
  .stk { --dim: 0; }
  .stk::after { content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none; background:#01332f; opacity:calc(var(--dim) * .35); }
</style>
<script>
  (function () {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var cards = [].slice.call(document.querySelectorAll('.stk')), ticking = false;
    function stack() {
      ticking = false;
      cards.forEach(function (c, i) {
        var next = cards[i + 1]; if (!next) return;
        var a = c.getBoundingClientRect(), b = next.getBoundingClientRect();
        var p = Math.min(Math.max(1 - (b.top - a.top - 16) / a.height, 0), 1);
        c.style.scale = 1 - p * .08; c.style.setProperty('--dim', p);
      });
    }
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(stack); } }, { passive: true });
    addEventListener('resize', stack); stack();
  })();
</script>`
    }
  },
  {
    id: "vivi-depth-tilt-card",
    name: "Card 3D com Camadas de Profundidade",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    badge: "Vivi",
    client: "Viviane Rocha",
    description: "Card com borda degradê que inclina em 3D seguindo o mouse. O mockup dentro anda um pouco e os elementos soltos andam mais, criando paralaxe real; a sombra se desloca junto.",
    tags: ["Tilt 3D", "Parallax", "Gradient Border", "Mouse Reactive", "Entrada Flip"],
    defaultSection: "Cards de Oferta / Produto",
    previewType: "vivi-depth-tilt",
    tech: ["Tailwind CSS", "React", "CSS Custom Properties", "3D Transforms"],
    frameworks: {
      react: `import { useRef } from 'react';

export function DepthTiltCard({ title = 'Simulado gratuito', children }) {
  const ref = useRef(null);
  const set = (rx, ry, mx, my, live) => {
    const c = ref.current; if (!c) return;
    c.style.setProperty('--rx', rx + 'deg'); c.style.setProperty('--ry', ry + 'deg');
    c.style.setProperty('--mx', mx); c.style.setProperty('--my', my);
    c.dataset.live = live ? '1' : '';
  };
  const move = (e) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const b = ref.current.getBoundingClientRect(), x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
    set((.5 - y) * 8, (x - .5) * 8, (x - .5).toFixed(3), (y - .5).toFixed(3), true);
  };
  return (
    <div className="[perspective:1400px]">
      <style>{'.dt{--rx:0deg;--ry:0deg;--mx:0;--my:0;transform:rotateX(var(--rx)) rotateY(var(--ry));transition:transform .6s cubic-bezier(.22,1,.36,1)}.dt[data-live="1"]{transition:transform .08s linear}.dt-screen{translate:calc(var(--mx)*16px) calc(var(--my)*16px);box-shadow:calc(var(--mx)*-26px) calc(26px + var(--my)*-22px) 50px -18px rgba(0,0,0,.65);transition:translate .6s cubic-bezier(.22,1,.36,1),box-shadow .6s}.dt-float{translate:calc(var(--mx)*36px) calc(var(--my)*36px);transition:translate .6s cubic-bezier(.22,1,.36,1)}.dt[data-live="1"] .dt-screen,.dt[data-live="1"] .dt-float{transition-duration:.12s}'}</style>
      <a ref={ref} href="#" onPointerMove={move} onPointerLeave={() => set(0, 0, 0, 0, false)}
        className="dt grid min-h-[420px] grid-cols-1 gap-4 rounded-[34px] border-2 border-transparent p-4 text-[#01332f] no-underline md:grid-cols-[1.1fr_1fr] [background:linear-gradient(#faf9f6,#faf9f6)_padding-box,linear-gradient(135deg,#ff810a,#c8ddd9_35%,#c8ddd9_65%,#01332f)_border-box]">
        <div className="flex flex-col justify-center p-6">
          <h3 className="text-[clamp(1.75rem,5.4vw,2.35rem)] font-black leading-[1.02] tracking-[-.04em]">{title}</h3>
        </div>
        <div className="relative grid place-items-center rounded-[30px] bg-[radial-gradient(120%_90%_at_80%_10%,#0b4740,#01332f_60%,#00241f)] p-6">
          <div className="dt-screen h-40 w-56 rounded-2xl bg-white">{children}</div>
          <div className="dt-float absolute right-6 top-6 rounded-xl bg-[#ff810a] px-3 py-2 text-xs font-extrabold text-[#01332f]">+1</div>
        </div>
      </a>
    </div>
  );
}`,
      tailwind: `<style>
  .dt { --rx:0deg; --ry:0deg; --mx:0; --my:0; transform: rotateX(var(--rx)) rotateY(var(--ry)); transition: transform .6s cubic-bezier(.22,1,.36,1); }
  .dt.live { transition: transform .08s linear; }
  .dt-screen { translate: calc(var(--mx)*16px) calc(var(--my)*16px); box-shadow: calc(var(--mx)*-26px) calc(26px + var(--my)*-22px) 50px -18px rgba(0,0,0,.65); transition: translate .6s cubic-bezier(.22,1,.36,1), box-shadow .6s; }
  .dt-float { translate: calc(var(--mx)*36px) calc(var(--my)*36px); transition: translate .6s cubic-bezier(.22,1,.36,1); }
  .dt.live .dt-screen, .dt.live .dt-float { transition-duration: .12s; }
</style>
<div class="[perspective:1400px]">
  <a href="#" class="dt grid min-h-[420px] gap-4 rounded-[34px] border-2 border-transparent p-4 text-[#01332f] md:grid-cols-[1.1fr_1fr] [background:linear-gradient(#faf9f6,#faf9f6)_padding-box,linear-gradient(135deg,#ff810a,#c8ddd9_35%,#c8ddd9_65%,#01332f)_border-box]">
    <div class="flex flex-col justify-center p-6"><h3 class="text-4xl font-black tracking-[-.04em]">Simulado gratuito</h3></div>
    <div class="relative grid place-items-center rounded-[30px] bg-[radial-gradient(120%_90%_at_80%_10%,#0b4740,#01332f_60%,#00241f)] p-6">
      <div class="dt-screen h-40 w-56 rounded-2xl bg-white"></div>
      <div class="dt-float absolute right-6 top-6 rounded-xl bg-[#ff810a] px-3 py-2 text-xs font-extrabold">+1</div>
    </div>
  </a>
</div>
<script>
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(hover: hover)').matches)
  document.querySelectorAll('.dt').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var b = c.getBoundingClientRect(), x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
      c.classList.add('live');
      c.style.setProperty('--ry', (x - .5) * 8 + 'deg'); c.style.setProperty('--rx', (.5 - y) * 8 + 'deg');
      c.style.setProperty('--mx', (x - .5).toFixed(3)); c.style.setProperty('--my', (y - .5).toFixed(3));
    });
    c.addEventListener('pointerleave', function () {
      c.classList.remove('live');
      ['--rx', '--ry'].forEach(function (p) { c.style.setProperty(p, '0deg'); });
      c.style.setProperty('--mx', 0); c.style.setProperty('--my', 0);
    });
  });
</script>`
    }
  },
  {
    id: "vivi-sweep-pill-button",
    name: "Botão Pílula com Varredura e Seta Girando",
    category: "buttons-ctas",
    categoryLabel: "Botões & Ações",
    badge: "Vivi",
    client: "Viviane Rocha",
    description: "Botão verde em pílula que, no hover, é varrido da esquerda por laranja enquanto o círculo da seta troca de cor e gira 45 graus. Troca de cor total, clara e com cara de ação.",
    tags: ["Hover", "Sweep Fill", "Arrow", "CTA", "Pill"],
    defaultSection: "CTA de Card / Seção",
    previewType: "vivi-sweep-button",
    tech: ["Tailwind CSS", "React", "CSS Transitions"],
    frameworks: {
      react: `export function SweepPillButton({ children = 'Quero participar', href = '#' }) {
  return (
    <a href={href}
      className="group relative isolate flex min-h-14 w-full max-w-[330px] items-center justify-center overflow-hidden rounded-full bg-[#01332f] px-14 py-2 text-center text-[1.02rem] font-extrabold text-white no-underline transition-colors hover:text-[#01332f] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#ff810a]">
      <span aria-hidden className="absolute inset-0 -z-10 -translate-x-[101%] bg-[#ff810a] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0" />
      {children}
      <i className="absolute right-[9px] top-1/2 -mt-[19px] grid h-[38px] w-[38px] place-items-center rounded-full bg-[#ff810a] text-[#01332f] transition-[background,color,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-rotate-45 group-hover:bg-[#01332f] group-hover:text-white">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </i>
    </a>
  );
}`,
      tailwind: `<a href="#" class="group relative isolate flex min-h-14 w-full max-w-[330px] items-center justify-center overflow-hidden rounded-full bg-[#01332f] px-14 py-2 text-center font-extrabold text-white transition-colors hover:text-[#01332f]">
  <span aria-hidden="true" class="absolute inset-0 -z-10 -translate-x-[101%] bg-[#ff810a] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0"></span>
  Quero participar
  <i class="absolute right-[9px] top-1/2 -mt-[19px] grid h-[38px] w-[38px] place-items-center rounded-full bg-[#ff810a] text-[#01332f] transition-all duration-500 group-hover:-rotate-45 group-hover:bg-[#01332f] group-hover:text-white">
    <svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  </i>
</a>`
    }
  },
  {
    id: "vivi-orbit-ring-glass-shine",
    name: "Painel com Anel Orbital e Reflexo de Vidro",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    badge: "Vivi",
    client: "Viviane Rocha",
    description: "Painel escuro com um anel fino laranja girando atrás do conteúdo e, de tempos em tempos, um reflexo de vidro atravessando a tela. Dá vida a qualquer mockup parado.",
    tags: ["Conic Gradient", "Mask", "Shine", "Glass", "Mockup"],
    defaultSection: "Painel Visual de Card",
    previewType: "vivi-orbit-shine",
    tech: ["Tailwind CSS", "React", "CSS Mask", "CSS Keyframes"],
    frameworks: {
      react: `export function OrbitShinePanel({ children }) {
  return (
    <div className="relative isolate grid min-h-[320px] place-items-center overflow-hidden rounded-[30px] bg-[radial-gradient(120%_90%_at_80%_10%,#0b4740,#01332f_60%,#00241f)] p-6">
      <style>{'@keyframes orbSpin{to{rotate:1turn}}@keyframes glassShine{0%,62%{transform:translateX(-160%) skewX(-18deg)}88%,100%{transform:translateX(360%) skewX(-18deg)}}.orb{-webkit-mask:radial-gradient(circle,transparent 52%,#000 53%,#000 58%,transparent 59%);mask:radial-gradient(circle,transparent 52%,#000 53%,#000 58%,transparent 59%);animation:orbSpin 12s linear infinite}.shn::after{content:"";position:absolute;top:-20%;bottom:-20%;left:0;width:38%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.5),transparent);transform:translateX(-160%) skewX(-18deg);animation:glassShine 7s cubic-bezier(.22,1,.36,1) infinite}@media (prefers-reduced-motion:reduce){.orb,.shn::after{animation:none}}'}</style>
      <div aria-hidden className="orb absolute left-1/2 top-1/2 -z-10 aspect-square w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_0_62%,rgba(255,129,10,.45)_75%,transparent_88%)]" />
      <div className="relative h-44 w-60 overflow-hidden rounded-2xl bg-white">
        {children}
        <div aria-hidden className="shn pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" />
      </div>
    </div>
  );
}`,
      tailwind: `<style>
  @keyframes orbSpin { to { rotate: 1turn; } }
  @keyframes glassShine { 0%,62% { transform: translateX(-160%) skewX(-18deg); } 88%,100% { transform: translateX(360%) skewX(-18deg); } }
  .orb { -webkit-mask: radial-gradient(circle, transparent 52%, #000 53%, #000 58%, transparent 59%); mask: radial-gradient(circle, transparent 52%, #000 53%, #000 58%, transparent 59%); animation: orbSpin 12s linear infinite; }
  .shn::after { content:""; position:absolute; top:-20%; bottom:-20%; left:0; width:38%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.5), transparent); transform: translateX(-160%) skewX(-18deg); animation: glassShine 7s cubic-bezier(.22,1,.36,1) infinite; }
  @media (prefers-reduced-motion: reduce) { .orb, .shn::after { animation: none; } }
</style>
<div class="relative isolate grid min-h-[320px] place-items-center overflow-hidden rounded-[30px] bg-[radial-gradient(120%_90%_at_80%_10%,#0b4740,#01332f_60%,#00241f)] p-6">
  <div aria-hidden="true" class="orb absolute left-1/2 top-1/2 -z-10 aspect-square w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_0_62%,rgba(255,129,10,.45)_75%,transparent_88%)]"></div>
  <div class="relative h-44 w-60 overflow-hidden rounded-2xl bg-white">
    <!-- mockup -->
    <div aria-hidden="true" class="shn pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"></div>
  </div>
</div>`
    }
  },
  {
    id: "vivi-looping-answer-sheet",
    name: "Mockup de Simulado se Respondendo Sozinho",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    badge: "Vivi",
    client: "Viviane Rocha",
    description: "Telinha de prova que responde as questões sozinha: a alternativa acende, a barra avança e o cartão-resposta flutuante vai sendo pintado até aparecer o selo de concluído. Só roda quando está na tela.",
    tags: ["Mockup Animado", "Timeline", "IntersectionObserver", "Loop", "Storytelling"],
    defaultSection: "Card de Simulado / Produto Digital",
    previewType: "vivi-answer-sheet",
    tech: ["Tailwind CSS", "React", "IntersectionObserver", "setTimeout Timeline"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const ANSWERS = [2, 0, 3, 1, 4];

export function LoopingAnswerSheet() {
  const ref = useRef(null);
  const [q, setQ] = useState(0), [pick, setPick] = useState(-1), [card, setCard] = useState([]), [done, setDone] = useState(false);
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timers = [], on = false;
    const T = (ms, fn) => (reduce ? fn() : timers.push(setTimeout(fn, ms)));
    const run = () => {
      setDone(false); setCard([]); setQ(0); setPick(-1);
      ANSWERS.forEach((a, i) => {
        T(400 + i * 2200, () => { setQ(i); setPick(-1); });
        T(1500 + i * 2200, () => { setPick(a); setCard((c) => [...c, a]); });
      });
      T(400 + ANSWERS.length * 2200, () => setDone(true));
      T(14300, () => on && run());
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !on) { on = true; run(); }
      else if (!e.isIntersecting && on && !reduce) { on = false; timers.forEach(clearTimeout); timers = []; }
    }, { threshold: .35 });
    io.observe(ref.current);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);
  return (
    <div ref={ref} className="relative grid place-items-center p-8">
      <div className="w-64 rounded-2xl bg-white p-4 text-[#01332f]">
        <div className="mb-2 flex justify-between text-[11px] font-bold text-[#5e5e5e]"><span>Questão {q + 1} de 5</span><span>⏱</span></div>
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-[#f0f7f6]">
          <div className="h-full bg-[#3bb677] transition-[width] duration-700" style={{ width: (card.length / 5) * 100 + '%' }} />
        </div>
        {['A', 'B', 'C', 'D', 'E'].map((l, i) => (
          <div key={l} className={'mb-1.5 flex items-center gap-2 rounded-lg border px-2 py-1.5 text-xs font-bold transition-colors ' + (pick === i ? 'border-[#3bb677] bg-[#f0f7f6]' : 'border-[#c8ddd9]')}>
            <span className={'grid h-5 w-5 place-items-center rounded-full text-[10px] ' + (pick === i ? 'bg-[#3bb677] text-white' : 'bg-[#f0f7f6]')}>{l}</span>
            <span className="h-1.5 flex-1 rounded bg-[#f0f7f6]" />
          </div>
        ))}
      </div>
      <div className="absolute -right-1 bottom-4 grid grid-cols-5 gap-1 rounded-xl bg-[#01332f] p-2.5">
        {Array.from({ length: 25 }).map((_, k) => {
          const row = Math.floor(k / 5), col = k % 5;
          return <span key={k} className={'h-2.5 w-2.5 rounded-full transition-colors ' + (card[row] === col ? 'bg-[#ff810a]' : 'bg-white/20')} />;
        })}
      </div>
      <div className={'absolute left-4 top-4 rounded-full bg-[#ff810a] px-3 py-1 text-[11px] font-extrabold text-[#01332f] transition-all duration-500 ' + (done ? 'scale-100 opacity-100' : 'scale-75 opacity-0')}>Simulado concluído</div>
    </div>
  );
}`,
      tailwind: `<div id="sheet" class="relative grid place-items-center p-8">
  <div class="w-64 rounded-2xl bg-white p-4 text-[#01332f]">
    <div class="mb-2 flex justify-between text-[11px] font-bold text-[#5e5e5e]"><span>Questão <b id="qn">1</b> de 5</span><span>⏱</span></div>
    <div class="mb-3 h-1.5 overflow-hidden rounded-full bg-[#f0f7f6]"><div id="prog" class="h-full w-0 bg-[#3bb677] transition-[width] duration-700"></div></div>
    <div id="opts"></div>
  </div>
  <div id="card" class="absolute -right-1 bottom-4 grid grid-cols-5 gap-1 rounded-xl bg-[#01332f] p-2.5"></div>
  <div id="doneB" class="absolute left-4 top-4 scale-75 rounded-full bg-[#ff810a] px-3 py-1 text-[11px] font-extrabold text-[#01332f] opacity-0 transition-all duration-500">Simulado concluído</div>
</div>
<script>
  (function () {
    var el = document.getElementById('sheet'), opts = document.getElementById('opts'), card = document.getElementById('card');
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, ANS = [2, 0, 3, 1, 4], timers = [], on = false;
    'ABCDE'.split('').forEach(function (l) { opts.insertAdjacentHTML('beforeend', '<div class="opt mb-1.5 flex items-center gap-2 rounded-lg border border-[#c8ddd9] px-2 py-1.5 text-xs font-bold"><span class="grid h-5 w-5 place-items-center rounded-full bg-[#f0f7f6] text-[10px]">' + l + '</span><span class="h-1.5 flex-1 rounded bg-[#f0f7f6]"></span></div>'); });
    for (var k = 0; k < 25; k++) card.insertAdjacentHTML('beforeend', '<span class="h-2.5 w-2.5 rounded-full bg-white/20 transition-colors"></span>');
    var O = opts.children, B = card.children, done = document.getElementById('doneB');
    function T(ms, fn) { if (reduce) fn(); else timers.push(setTimeout(fn, ms)); }
    function mark(i) { [].forEach.call(O, function (o, j) { o.style.borderColor = j === i ? '#3bb677' : ''; o.style.background = j === i ? '#f0f7f6' : ''; }); }
    function run() {
      [].forEach.call(B, function (b) { b.style.background = ''; }); done.style.opacity = 0; done.style.transform = 'scale(.75)';
      document.getElementById('prog').style.width = '0%';
      ANS.forEach(function (a, i) {
        T(400 + i * 2200, function () { document.getElementById('qn').textContent = i + 1; mark(-1); });
        T(1500 + i * 2200, function () { mark(a); B[i * 5 + a].style.background = '#ff810a'; document.getElementById('prog').style.width = (i + 1) * 20 + '%'; });
      });
      T(400 + ANS.length * 2200, function () { done.style.opacity = 1; done.style.transform = 'none'; });
      T(14300, function () { if (on) run(); });
    }
    new IntersectionObserver(function (es) {
      if (es[0].isIntersecting && !on) { on = true; run(); }
      else if (!es[0].isIntersecting && on && !reduce) { on = false; timers.forEach(clearTimeout); timers = []; }
    }, { threshold: .35 }).observe(el);
  })();
</script>`
    }
  }
];
