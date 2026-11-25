// Efeitos extraídos do site do Projeto Golgota (cursos de concursos da segurança pública de MG)
// Paleta: vermelho #b22314 / texto vermelho #e5432f / vermelho escuro #8c1a0e, fundo preto, Archivo + Barlow
const B = { client: "Projeto Golgota", badge: "Projeto Golgota" };

export const golgotaEffects = [
  // 1 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-perspective-tunnel-hero",
    name: "Hero Túnel 3D em Perspectiva",
    category: "hero",
    categoryLabel: "Hero (Primeira Seção)",
    description: "Cards com fotos voam do ponto de fuga até passar pela câmera, espalhados nas laterais; o mouse move a câmera e a rolagem (seção presa) empurra o túnel. O texto começa pequeno e apagado e cresce/acende com a rolagem. Sensação de profundidade e avanço.",
    tags: ["Hero", "3D", "Perspective", "Scroll Pinned", "Parallax"],
    defaultSection: "Hero Principal",
    previewType: "gg-tunnel",
    tech: ["Tailwind CSS", "React", "CSS 3D Transforms", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

// 7 cards em ângulos que fogem do meio (0 = direita, 90 = embaixo, 180 = esquerda)
const ANGLES = [12, 168, -28, 205, 40, 142, 268];
const DRIFT = 0.018;  // voltas do túnel por segundo, parado
const TRAVEL = 0.85;  // quanto do túnel a rolagem atravessa enquanto a seção está presa
const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a, b, t) => a + (b - a) * t;
function fade(p) {
  if (p <= 0.22 || p >= 0.98) return 0;          // só aparece depois de sair do ponto de fuga
  if (p < 0.36) return (p - 0.22) / 0.14;
  if (p <= 0.82) return 1;
  return 1 - (p - 0.82) / 0.16;
}

export function TunnelHero({ images = [], title = 'Seu título aqui', text = 'Subtítulo do hero.', cta = 'Quero começar' }) {
  const secRef = useRef(null), stageRef = useRef(null), copyRef = useRef(null), cardRefs = useRef([]);

  useEffect(() => {
    const sec = secRef.current, stage = stageRef.current, copy = copyRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = ANGLES.length;
    const cards = ANGLES.map((deg, i) => {
      const a = (deg * Math.PI) / 180;
      return { el: cardRefs.current[i], cos: Math.cos(a), sin: Math.sin(a), rx: 0.44 + (i % 3) * 0.05, ry: 0.4 + (i % 2) * 0.06, rot: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2) };
    });
    const st = { w: 1440, h: 900, mobile: false };
    const measure = () => {
      st.w = stage.clientWidth; st.h = stage.clientHeight; st.mobile = window.innerWidth < 768;
      const cw = st.mobile ? Math.max(130, Math.min(180, st.w * 0.38)) : Math.max(180, Math.min(270, st.w * 0.18));
      cards.forEach((c, i) => { c.el.style.width = cw + 'px'; c.off = st.mobile && i >= 4; c.el.style.display = c.off ? 'none' : ''; });
    };
    measure();
    window.addEventListener('resize', measure);

    const pRaw = { x: 0, y: 0 }, p = { x: 0, y: 0 };
    const onMove = (e) => { if (e.pointerType === 'touch') return; pRaw.x = (e.clientX / innerWidth - 0.5) * 2; pRaw.y = (e.clientY / innerHeight - 0.5) * 2; };
    if (!reduce) window.addEventListener('pointermove', onMove, { passive: true });

    const scrolled = () => {
      const r = sec.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(stage).top) || 0;
      const total = sec.offsetHeight - stage.offsetHeight;
      return total > 0 ? clamp((top - r.top) / total) : 0;
    };
    let s = scrolled(), time = 0, last = 0, raf = 0;
    const render = () => {
      const far = st.mobile ? -1200 : -1700, near = st.mobile ? 350 : 500, pan = st.mobile ? 20 : 45;
      cards.forEach((c, i) => {
        if (c.off) return;
        const phase = (i / N + time * DRIFT + s * TRAVEL) % 1;
        const z = lerp(far, near, phase);
        const x = c.cos * st.w * c.rx * (st.mobile ? 1.25 : 1) - p.x * pan;
        const y = c.sin * st.h * c.ry - p.y * pan;
        c.el.style.transform = 'translate3d(calc(-50% + ' + x.toFixed(1) + 'px), calc(-50% + ' + y.toFixed(1) + 'px), ' + z.toFixed(1) + 'px) rotateZ(' + c.rot + 'deg)';
        c.el.style.opacity = fade(phase).toFixed(3);
        c.el.style.zIndex = Math.round(phase * 100);
      });
      // texto: começa em 70% / 25% e cresce e acende com a rolagem, e fica
      copy.style.transform = 'scale(' + (s < 0.5 ? lerp(0.7, 1, s / 0.5) : 1).toFixed(3) + ')';
      copy.style.opacity = (s < 0.12 ? lerp(0.25, 1, s / 0.12) : 1).toFixed(3);
    };
    const frame = (now) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now; time += dt;
      s += (scrolled() - s) * Math.min(1, dt * 7);
      p.x += (pRaw.x - p.x) * Math.min(1, dt * 4);
      p.y += (pRaw.y - p.y) * Math.min(1, dt * 4);
      render();
      raf = requestAnimationFrame(frame);
    };
    let onScroll;
    if (reduce) { render(); onScroll = () => { s = scrolled(); render(); }; window.addEventListener('scroll', onScroll, { passive: true }); }
    else raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', measure); window.removeEventListener('pointermove', onMove); onScroll && window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    // a seção tem a altura da tela + 90vh de rolagem; o palco fica preso (overflow-clip para não quebrar o sticky)
    <section ref={secRef} className="relative h-[calc(100svh+90vh)] overflow-clip bg-black text-white">
      <div ref={stageRef} className="sticky top-0 grid h-svh items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[3] grid place-items-center [perspective:1200px] [transform-style:preserve-3d] max-md:[perspective:900px]" aria-hidden="true">
          {ANGLES.map((_, i) => (
            <div key={i} ref={(el) => (cardRefs.current[i] = el)} className="absolute left-1/2 top-1/2 aspect-[4/5] overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(160deg,#1c1c1c,#0b0b0b_70%)] will-change-transform">
              {images[i] ? <img src={images[i]} alt="" className="absolute inset-0 h-full w-full object-cover" /> :
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 p-4 font-mono text-[11px] uppercase tracking-[.24em] text-white/70">Imagem {String(i + 1).padStart(2, '0')}</span>}
            </div>
          ))}
        </div>
        <div ref={copyRef} className="relative z-[2] mx-auto grid max-w-[900px] origin-center justify-items-center gap-6 px-6 text-center">
          <h1 className="text-[clamp(2rem,1.55rem+1.4vw,2.5rem)] font-extrabold leading-[1.12]">{title}</h1>
          <p className="max-w-[62ch] text-lg text-neutral-400">{text}</p>
          <a href="#" className="rounded-lg bg-[#b22314] px-8 py-4 text-sm font-bold uppercase tracking-[.14em]">{cta}</a>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<section id="tun-hero" class="relative h-[calc(100svh+90vh)] overflow-clip bg-black text-white">
  <div class="tun-stage sticky top-0 grid h-svh items-center overflow-hidden">
    <div class="tun pointer-events-none absolute inset-0 z-[3] grid place-items-center [perspective:1200px] [transform-style:preserve-3d]" aria-hidden="true"></div>
    <div class="tun-copy relative z-[2] mx-auto grid max-w-[900px] origin-center justify-items-center gap-6 px-6 text-center">
      <h1 class="text-[clamp(2rem,1.55rem+1.4vw,2.5rem)] font-extrabold leading-[1.12]">Seu título aqui</h1>
      <p class="max-w-[62ch] text-lg text-neutral-400">Subtítulo do hero.</p>
      <a href="#" class="rounded-lg bg-[#b22314] px-8 py-4 text-sm font-bold uppercase tracking-[.14em]">Quero começar</a>
    </div>
  </div>
</section>
<script>
(function () {
  var sec = document.getElementById('tun-hero'), stage = sec.querySelector('.tun-stage'), tun = sec.querySelector('.tun'), copy = sec.querySelector('.tun-copy');
  var IMGS = []; // ex.: ['foto1.jpg', ...] (4:5)
  var ANGLES = [12, 168, -28, 205, 40, 142, 268], N = ANGLES.length, DRIFT = 0.018, TRAVEL = 0.85;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function fade(p) { if (p <= .22 || p >= .98) return 0; if (p < .36) return (p - .22) / .14; if (p <= .82) return 1; return 1 - (p - .82) / .16; }
  var cards = ANGLES.map(function (deg, i) {
    var a = deg * Math.PI / 180, el = document.createElement('div');
    el.className = 'absolute left-1/2 top-1/2 aspect-[4/5] overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(160deg,#1c1c1c,#0b0b0b_70%)] will-change-transform';
    el.innerHTML = IMGS[i] ? '<img src="' + IMGS[i] + '" alt="" class="absolute inset-0 h-full w-full object-cover">' : '<span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 p-4 font-mono text-[11px] uppercase tracking-[.24em] text-white/70">Imagem 0' + (i + 1) + '</span>';
    tun.appendChild(el);
    return { el: el, cos: Math.cos(a), sin: Math.sin(a), rx: .44 + (i % 3) * .05, ry: .4 + (i % 2) * .06, rot: (i % 2 ? -1 : 1) * (3 + (i % 5) * 2) };
  });
  var st = {};
  function measure() {
    st.w = stage.clientWidth; st.h = stage.clientHeight; st.mobile = innerWidth < 768;
    var cw = st.mobile ? Math.max(130, Math.min(180, st.w * .38)) : Math.max(180, Math.min(270, st.w * .18));
    cards.forEach(function (c, i) { c.el.style.width = cw + 'px'; c.off = st.mobile && i >= 4; c.el.style.display = c.off ? 'none' : ''; });
  }
  measure(); addEventListener('resize', measure);
  var pRaw = { x: 0, y: 0 }, p = { x: 0, y: 0 };
  if (!reduce) addEventListener('pointermove', function (e) { if (e.pointerType === 'touch') return; pRaw.x = (e.clientX / innerWidth - .5) * 2; pRaw.y = (e.clientY / innerHeight - .5) * 2; }, { passive: true });
  function scrolled() { var r = sec.getBoundingClientRect(), total = sec.offsetHeight - stage.offsetHeight; return total > 0 ? clamp(-r.top / total) : 0; }
  var s = scrolled(), time = 0, last = 0;
  function render() {
    var far = st.mobile ? -1200 : -1700, near = st.mobile ? 350 : 500, pan = st.mobile ? 20 : 45;
    cards.forEach(function (c, i) {
      if (c.off) return;
      var ph = (i / N + time * DRIFT + s * TRAVEL) % 1;
      var x = c.cos * st.w * c.rx * (st.mobile ? 1.25 : 1) - p.x * pan, y = c.sin * st.h * c.ry - p.y * pan;
      c.el.style.transform = 'translate3d(calc(-50% + ' + x.toFixed(1) + 'px),calc(-50% + ' + y.toFixed(1) + 'px),' + lerp(far, near, ph).toFixed(1) + 'px) rotateZ(' + c.rot + 'deg)';
      c.el.style.opacity = fade(ph).toFixed(3); c.el.style.zIndex = Math.round(ph * 100);
    });
    copy.style.transform = 'scale(' + (s < .5 ? lerp(.7, 1, s / .5) : 1) + ')';
    copy.style.opacity = s < .12 ? lerp(.25, 1, s / .12) : 1;
  }
  function frame(now) {
    var dt = last ? Math.min((now - last) / 1000, .05) : 0; last = now; time += dt;
    s += (scrolled() - s) * Math.min(1, dt * 7);
    p.x += (pRaw.x - p.x) * Math.min(1, dt * 4); p.y += (pRaw.y - p.y) * Math.min(1, dt * 4);
    render(); requestAnimationFrame(frame);
  }
  if (reduce) { render(); addEventListener('scroll', function () { s = scrolled(); render(); }, { passive: true }); }
  else requestAnimationFrame(frame);
})();
</script>`,
    },
  },

  // 2 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-halftone-dot-field",
    name: "Campo de Pontos em Meio-Tom com Onda de Choque",
    category: "hero",
    categoryLabel: "Hero (Primeira Seção)",
    description: "Uma membrana de pontos em meio-tom (ruído de Perlin) deriva devagar no fundo; o mouse deixa um rastro elástico nos pontos e o clique solta uma onda de choque circular. Mais quieto no centro e sumindo nas bordas, dá textura viva sem roubar a cena.",
    tags: ["Canvas", "Perlin Noise", "Mouse Trail", "Shockwave", "Background"],
    defaultSection: "Hero Principal",
    previewType: "gg-dot-field",
    tech: ["Tailwind CSS", "React", "Canvas 2D", "Física de Molas"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

// Porta do "Dot Field" (kokonutUI, MIT) usada no site do Projeto Golgota
const NOISE_SCALE = 240, NOISE_SPEED = 0.07, TONE_STEP = 3, IDLE_FRAME_MS = 33;
const ANCHOR = 26, COUPLING = 340, DAMPING = 2.4, STEP = 1 / 120;
const POINTER_RADIUS = 72, POINTER_GAIN = 14, POINTER_MAX_SPEED = 2600, POINTER_PART = 0.45;
const SHOCK_SPEED = 620, SHOCK_WIDTH = 34, SHOCK_FORCE = 5200, SHOCK_LIFE = 1.3;
const COMPRESSION_GAIN = 3, BUCKETS = 10, REST_SPEED = 2, REST_OFFSET = 0.15;

function createNoise(seed) {
  const p = []; let i;
  for (i = 0; i < 256; i++) p[i] = i;
  let state = seed >>> 0 || 1;
  const random = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
  for (i = 255; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  const perm = new Uint8Array(512);
  for (i = 0; i < 512; i++) perm[i] = p[i & 255];
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + (b - a) * t;
  const grad = (h, x, y, z) => { h &= 15; const u = h < 8 ? x : y; const v = h < 4 ? y : h === 12 || h === 14 ? x : z; return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v); };
  return (x, y, z) => {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
    const fx = x - Math.floor(x), fy = y - Math.floor(y), fz = z - Math.floor(z);
    const u = fade(fx), v = fade(fy), w = fade(fz);
    const A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A + 1] + Z, Bb = perm[X + 1] + Y, BA = perm[Bb] + Z, BB = perm[Bb + 1] + Z;
    return lerp(
      lerp(lerp(grad(perm[AA], fx, fy, fz), grad(perm[BA], fx - 1, fy, fz), u), lerp(grad(perm[AB], fx, fy - 1, fz), grad(perm[BB], fx - 1, fy - 1, fz), u), v),
      lerp(lerp(grad(perm[AA + 1], fx, fy, fz - 1), grad(perm[BA + 1], fx - 1, fy, fz - 1), u), lerp(grad(perm[AB + 1], fx, fy - 1, fz - 1), grad(perm[BB + 1], fx - 1, fy - 1, fz - 1), u), v), w);
  };
}

function createField(width, height, spacing) {
  const cols = Math.ceil(width / spacing) + 3, rows = Math.ceil(height / spacing) + 3, size = cols * rows;
  return { cols, rows, spacing, originX: (width - (cols - 1) * spacing) / 2, originY: (height - (rows - 1) * spacing) / 2,
    tone: new Float32Array(size), coarse: new Float32Array((Math.ceil((cols - 1) / TONE_STEP) + 1) * (Math.ceil((rows - 1) / TONE_STEP) + 1)),
    ox: new Float32Array(size), oy: new Float32Array(size), vx: new Float32Array(size), vy: new Float32Array(size), ax: new Float32Array(size), ay: new Float32Array(size) };
}

function sampleTone(f, noise, time) {
  const z = time * NOISE_SPEED, step = f.spacing * TONE_STEP;
  const cc = Math.ceil((f.cols - 1) / TONE_STEP) + 1, cr = Math.ceil((f.rows - 1) / TONE_STEP) + 1;
  for (let j = 0; j < cr; j++) {
    const ny = (f.originY + j * step) / NOISE_SCALE;
    for (let i = 0; i < cc; i++) {
      const nx = (f.originX + i * step) / NOISE_SCALE;
      const n = noise(nx, ny, z) * 0.75 + noise(nx * 2.1 + 9.3, ny * 2.1 + 3.7, z * 1.3) * 0.25;
      f.coarse[j * cc + i] = Math.min(1, Math.max(0, 0.5 + n * 1.1));
    }
  }
  for (let j = 0; j < f.rows; j++) {
    const cj = Math.min(Math.floor(j / TONE_STEP), cr - 2), fy = j / TONE_STEP - cj;
    for (let i = 0; i < f.cols; i++) {
      const ci = Math.min(Math.floor(i / TONE_STEP), cc - 2), fx = i / TONE_STEP - ci, a = cj * cc + ci, c = f.coarse;
      const top = c[a] + (c[a + 1] - c[a]) * fx, bottom = c[a + cc] + (c[a + cc + 1] - c[a + cc]) * fx;
      f.tone[j * f.cols + i] = top + (bottom - top) * fy;
    }
  }
}

const nb = (v, f, i, j) => { const k = j * f.cols + i; let s = 0; if (i > 0) s += v[k - 1]; if (i < f.cols - 1) s += v[k + 1]; if (j > 0) s += v[k - f.cols]; if (j < f.rows - 1) s += v[k + f.cols]; return s; };

function integrate(f, shocks, h) {
  f.ax.fill(0); f.ay.fill(0);
  shocks.forEach((s) => {
    const reach = s.age * SHOCK_SPEED, fd = 1 - s.age / SHOCK_LIFE, force = SHOCK_FORCE * fd * fd, outer = reach + SHOCK_WIDTH, inner = Math.max(0, reach - SHOCK_WIDTH);
    const i0 = Math.max(0, Math.floor((s.x - outer - f.originX) / f.spacing)), i1 = Math.min(f.cols - 1, Math.ceil((s.x + outer - f.originX) / f.spacing));
    const j0 = Math.max(0, Math.floor((s.y - outer - f.originY) / f.spacing)), j1 = Math.min(f.rows - 1, Math.ceil((s.y + outer - f.originY) / f.spacing));
    for (let j = j0; j <= j1; j++) { const dy = f.originY + j * f.spacing - s.y;
      for (let i = i0; i <= i1; i++) { const dx = f.originX + i * f.spacing - s.x, d = Math.hypot(dx, dy);
        if (d < inner || d > outer || d === 0) continue;
        const band = 1 - Math.abs(d - reach) / SHOCK_WIDTH, k = j * f.cols + i;
        f.ax[k] += (dx / d) * force * band; f.ay[k] += (dy / d) * force * band; } }
  });
  for (let j = 0; j < f.rows; j++) for (let i = 0; i < f.cols; i++) {
    const k = j * f.cols + i;
    f.ax[k] += -ANCHOR * f.ox[k] + COUPLING * (nb(f.ox, f, i, j) - 4 * f.ox[k]) - DAMPING * f.vx[k];
    f.ay[k] += -ANCHOR * f.oy[k] + COUPLING * (nb(f.oy, f, i, j) - 4 * f.oy[k]) - DAMPING * f.vy[k];
  }
  let moving = false;
  for (let k = 0; k < f.ox.length; k++) {
    f.vx[k] += f.ax[k] * h; f.vy[k] += f.ay[k] * h; f.ox[k] += f.vx[k] * h; f.oy[k] += f.vy[k] * h;
    if (!moving && (Math.abs(f.vx[k]) > REST_SPEED || Math.abs(f.vy[k]) > REST_SPEED || Math.abs(f.ox[k]) > REST_OFFSET || Math.abs(f.oy[k]) > REST_OFFSET)) moving = true;
  }
  return moving;
}

function applyPointer(f, p, dt) {
  const segX = p.x - p.lastX, segY = p.y - p.lastY; p.lastX = p.x; p.lastY = p.y;
  const length = Math.hypot(segX, segY);
  if (!p.inside || length < 0.5 || dt <= 0) return false;
  const speed = Math.min(length / dt, POINTER_MAX_SPEED), pvx = (segX / length) * speed, pvy = (segY / length) * speed;
  const sx = p.x - segX, sy = p.y - segY, lsq = length * length, gain = Math.min(1, POINTER_GAIN * dt);
  const i0 = Math.max(0, Math.floor((Math.min(sx, p.x) - POINTER_RADIUS - f.originX) / f.spacing)), i1 = Math.min(f.cols - 1, Math.ceil((Math.max(sx, p.x) + POINTER_RADIUS - f.originX) / f.spacing));
  const j0 = Math.max(0, Math.floor((Math.min(sy, p.y) - POINTER_RADIUS - f.originY) / f.spacing)), j1 = Math.min(f.rows - 1, Math.ceil((Math.max(sy, p.y) + POINTER_RADIUS - f.originY) / f.spacing));
  for (let j = j0; j <= j1; j++) { const py = f.originY + j * f.spacing;
    for (let i = i0; i <= i1; i++) { const px = f.originX + i * f.spacing;
      const t = Math.min(1, Math.max(0, ((px - sx) * segX + (py - sy) * segY) / lsq));
      const awX = px - sx - segX * t, awY = py - sy - segY * t, d = Math.hypot(awX, awY);
      if (d >= POINTER_RADIUS) continue;
      const fo = 1 - d / POINTER_RADIUS, k = j * f.cols + i, amt = gain * fo * fo, side = d > 0 ? (speed * POINTER_PART) / d : 0;
      f.vx[k] += (pvx + awX * side - f.vx[k]) * amt; f.vy[k] += (pvy + awY * side - f.vy[k]) * amt; } }
  return true;
}

function draw(ctx, f, size, moving) {
  const maxR = f.spacing * 0.42, paths = [], filled = new Uint8Array(BUCKETS);
  for (let b = 0; b < BUCKETS; b++) paths.push(new Path2D());
  for (let j = 0; j < f.rows; j++) for (let i = 0; i < f.cols; i++) {
    const k = j * f.cols + i; let amount = 0.12 + 0.6 * f.tone[k];
    if (moving) {
      const l = i > 0 ? f.ox[k - 1] : 0, r = i < f.cols - 1 ? f.ox[k + 1] : 0, u = j > 0 ? f.oy[k - f.cols] : 0, d = j < f.rows - 1 ? f.oy[k + f.cols] : 0;
      amount *= 1 + COMPRESSION_GAIN * (-(r - l + d - u) / (2 * f.spacing));
    }
    const b = Math.round(Math.min(1, Math.max(0, amount)) * (BUCKETS - 1));
    if (!b) continue;
    const rad = (maxR * b) / (BUCKETS - 1), x = f.originX + i * f.spacing + f.ox[k], y = f.originY + j * f.spacing + f.oy[k];
    paths[b].moveTo(x + rad, y); paths[b].arc(x, y, rad, 0, Math.PI * 2); filled[b] = 1;
  }
  ctx.clearRect(0, 0, size.width, size.height); ctx.fillStyle = size.color;
  for (let b = 1; b < BUCKETS; b++) if (filled[b]) { ctx.globalAlpha = 0.2 + (0.32 * b) / (BUCKETS - 1); ctx.fill(paths[b]); }
  ctx.globalAlpha = 1;
}

// Coloque dentro de uma seção "relative"; ela escuta mouse/clique na seção inteira
export function DotField({ spacing = 16, seed = 7, color = '#d9d9d9', opacity = 0.45 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, root = canvas.parentElement.parentElement, ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const noise = createNoise(seed), size = { width: 0, height: 0, color }, pointer = { x: 0, y: 0, lastX: 0, lastY: 0, inside: false }, shocks = [];
    let field = createField(0, 0, spacing), time = 0, last = 0, lastTone = 0, carry = 0, stirring = false, awake = false, raf = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      size.width = r.width; size.height = r.height; canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); field = createField(r.width, r.height, spacing); sampleTone(field, noise, time); awake = false;
      draw(ctx, field, size, false);
    };
    const frame = (now) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0; last = now; time += dt;
      const was = awake;
      if (awake) {
        const pushed = applyPointer(field, pointer, dt);
        carry = Math.min(carry + dt, STEP * 6);
        while (carry >= STEP) { carry -= STEP; shocks.forEach((s) => (s.age += STEP)); while (shocks.length && shocks[0].age > SHOCK_LIFE) shocks.shift(); stirring = integrate(field, shocks, STEP); }
        if (!(pushed || stirring || shocks.length)) { field.ox.fill(0); field.oy.fill(0); field.vx.fill(0); field.vy.fill(0); awake = false; }
      }
      const due = now - lastTone >= IDLE_FRAME_MS;
      if (due) { sampleTone(field, noise, time); lastTone = now; }
      if (was || due) draw(ctx, field, size, was);
      raf = requestAnimationFrame(frame);
    };
    const wake = () => { if (!awake) { awake = true; carry = 0; stirring = true; } };
    const local = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onMove = (e) => { if (e.pointerType === 'touch') return; const pt = local(e);
      if (!pointer.inside) { pointer.lastX = pt.x; pointer.lastY = pt.y; pointer.inside = true; }
      pointer.x = pt.x; pointer.y = pt.y; if (Math.abs(pointer.x - pointer.lastX) > 0.5 || Math.abs(pointer.y - pointer.lastY) > 0.5) wake(); };
    const onLeave = () => { pointer.inside = false; };
    const onDown = (e) => { if (e.button !== 0 || e.target.closest('a,button,input,textarea,select,label')) return; const pt = local(e);
      pointer.x = pointer.lastX = pt.x; pointer.y = pointer.lastY = pt.y; pointer.inside = e.pointerType !== 'touch';
      shocks.push({ x: pt.x, y: pt.y, age: 0 }); if (shocks.length > 3) shocks.shift(); wake(); };
    const ro = new ResizeObserver(resize); ro.observe(canvas); resize();
    canvas.style.opacity = '1';
    if (!reduce) { raf = requestAnimationFrame(frame); root.addEventListener('pointermove', onMove); root.addEventListener('pointerleave', onLeave); root.addEventListener('pointerdown', onDown); }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); root.removeEventListener('pointerdown', onDown); };
  }, [spacing, seed, color]);
  return (
    <div className="pointer-events-none absolute inset-0" style={{ opacity }} aria-hidden="true">
      <canvas ref={ref} className="block h-full w-full opacity-0 transition-opacity duration-500 [mask-composite:intersect] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_50%,#000_40%,transparent_100%),radial-gradient(ellipse_34%_22%_at_50%_50%,rgb(0_0_0/.35),#000_100%)]" />
    </div>
  );
}`,
      tailwind: `<!-- Campo de pontos: coloque o <div> dentro de uma seção "relative". O script completo (mesma física do React)
     está na versão React; aqui vai a versão mínima: meio-tom em ruído que deriva + rastro do mouse + onda no clique. -->
<section id="df-sec" class="relative min-h-[70vh] overflow-hidden bg-black">
  <div class="pointer-events-none absolute inset-0 opacity-45" aria-hidden="true">
    <canvas id="df" class="block h-full w-full [mask-composite:intersect] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_50%,#000_40%,transparent_100%),radial-gradient(ellipse_34%_22%_at_50%_50%,rgb(0_0_0/.35),#000_100%)]"></canvas>
  </div>
  <div class="relative z-10 grid min-h-[70vh] place-items-center text-center text-white"><h1 class="text-4xl font-extrabold">Seu título</h1></div>
</section>
<script>
(function () {
  var sec = document.getElementById('df-sec'), c = document.getElementById('df'), ctx = c.getContext('2d');
  var GAP = 16, COLOR = '#d9d9d9', W, H, cols, rows, ox, oy, vx, vy, t = 0, last = 0, shocks = [], ptr = { x: -999, y: -999, lx: -999, ly: -999 };
  // ruído de valor suave (substitui o Perlin do original sem mudar a leitura visual)
  function h(x, y) { var s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
  function n(x, y) { var i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
    return (h(i, j) * (1 - u) + h(i + 1, j) * u) * (1 - v) + (h(i, j + 1) * (1 - u) + h(i + 1, j + 1) * u) * v; }
  function size() { var r = c.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); W = r.width; H = r.height; c.width = W * d; c.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    cols = Math.ceil(W / GAP) + 2; rows = Math.ceil(H / GAP) + 2; var N = cols * rows; ox = new Float32Array(N); oy = new Float32Array(N); vx = new Float32Array(N); vy = new Float32Array(N); }
  size(); new ResizeObserver(size).observe(c);
  sec.addEventListener('pointermove', function (e) { if (e.pointerType === 'touch') return; var r = c.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; });
  sec.addEventListener('pointerleave', function () { ptr.x = ptr.lx = -999; });
  sec.addEventListener('pointerdown', function (e) { var r = c.getBoundingClientRect(); shocks.push({ x: e.clientX - r.left, y: e.clientY - r.top, age: 0 }); if (shocks.length > 3) shocks.shift(); });
  function frame(now) {
    var dt = last ? Math.min((now - last) / 1000, .05) : 0; last = now; t += dt;
    var mdx = ptr.x - ptr.lx, mdy = ptr.y - ptr.ly; if (ptr.lx < -900) mdx = mdy = 0; ptr.lx = ptr.x; ptr.ly = ptr.y;
    shocks.forEach(function (s) { s.age += dt; }); shocks = shocks.filter(function (s) { return s.age < 1.3; });
    ctx.clearRect(0, 0, W, H); ctx.fillStyle = COLOR;
    for (var j = 0; j < rows; j++) for (var i = 0; i < cols; i++) {
      var k = j * cols + i, x = i * GAP, y = j * GAP, dx = x - ptr.x, dy = y - ptr.y, d = Math.hypot(dx, dy);
      if (d < 72) { var f = (1 - d / 72); vx[k] += mdx * f * 2; vy[k] += mdy * f * 2; }
      shocks.forEach(function (s) { var ex = x - s.x, ey = y - s.y, dd = Math.hypot(ex, ey) || 1, band = 1 - Math.abs(dd - s.age * 620) / 34; if (band > 0) { var fo = 90 * band * (1 - s.age / 1.3); vx[k] += ex / dd * fo * dt * 10; vy[k] += ey / dd * fo * dt * 10; } });
      vx[k] += -26 * ox[k] * dt; vy[k] += -26 * oy[k] * dt; vx[k] *= .9; vy[k] *= .9; ox[k] += vx[k] * dt * 6; oy[k] += vy[k] * dt * 6;
      var tone = Math.min(1, Math.max(0, .5 + (n(x / 240 + t * .07, y / 240) - .5) * 2.2)), b = Math.round((.12 + .6 * tone) * 9);
      if (!b) continue; ctx.globalAlpha = .2 + .32 * b / 9; ctx.beginPath(); ctx.arc(x + ox[k], y + oy[k], GAP * .42 * b / 9, 0, 6.283); ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(frame);
})();
</script>`,
    },
  },

  // 3 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-tech-text-reticle",
    name: "Título Técnico com Mira de Seleção",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "O título é desenhado em canvas e digitado letra a letra; a letra sob o mouse vira contorno tracejado com moldura de mira vermelha, rótulo de coordenadas e quadradinhos piscando, e dá para arrastá-la (volta com mola). Sem mouse, a mira passeia sozinha. Sensação de interface tática.",
    tags: ["Canvas", "Hover Letter", "Drag Spring", "Typewriter", "Reticle"],
    defaultSection: "Hero Principal",
    previewType: "gg-tech-text",
    tech: ["Tailwind CSS", "React", "Canvas 2D", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

// Versão condensada do TechText (React Bits, MIT) adaptado no Projeto Golgota:
// uma linha, entrada digitando, letra sob o mouse vira contorno tracejado com moldura de mira + rótulo + quadradinhos,
// arrastar a letra (volta com mola), sem mouse a moldura passeia sozinha.
export function TechText({ text = 'APROVAÇÃO COM MÉTODO', size = 56, color = '#ffffff', accent = '#e5432f', font = '800 {s}px Archivo, system-ui, sans-serif' }) {
  const wrapRef = useRef(null), canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current, ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const M = 30, F = font.replace('{s}', size);
    let W = 0, H = 0, dpr = 1, glyphs = [], raf = 0, t0 = performance.now(), last = t0;
    const ptr = { x: 0, y: 0, inside: false }, frame = { x1: 0, y1: 0, x2: 0, y2: 0, a: 0, i: -1 };
    let drag = -1, grab = { x: 0, y: 0 };

    const layout = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      ctx.font = F;
      const tw = ctx.measureText(text).width;
      W = Math.max(wrap.clientWidth, tw) + M * 2; H = size * 1.2 + M * 2;
      canvas.width = W * dpr; canvas.height = H * dpr; canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      wrap.style.height = size * 1.2 + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.font = F;
      const left = M + (wrap.clientWidth - tw) / 2, base = M + size * 0.95;
      let prefix = '';
      glyphs = [];
      Array.from(text).forEach((ch) => {
        prefix += ch;
        const m = ctx.measureText(ch), x = left + ctx.measureText(prefix).width - m.width;
        if (!ch.trim()) return;
        glyphs.push({ ch, x, base, w: m.width, ox: 0, oy: 0, vx: 0, vy: 0, out: 0 });
      });
    };
    layout();
    const ro = new ResizeObserver(layout); ro.observe(wrap);

    const local = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const hit = (x, y) => glyphs.findIndex((g) => x > g.x + g.ox - 4 && x < g.x + g.ox + g.w + 4 && y > g.base - size + g.oy && y < g.base + size * 0.25 + g.oy);
    const onMove = (e) => { const p = local(e); ptr.x = p.x; ptr.y = p.y; ptr.inside = true;
      if (drag >= 0) { const g = glyphs[drag]; g.ox = p.x - grab.x; g.oy = p.y - grab.y; } };
    const onLeave = () => { ptr.inside = false; };
    const onDown = (e) => { const p = local(e), i = hit(p.x, p.y); if (i < 0) return; drag = i; grab = { x: p.x - glyphs[i].ox, y: p.y - glyphs[i].oy }; canvas.setPointerCapture(e.pointerId); };
    const onUp = () => { drag = -1; };
    canvas.addEventListener('pointermove', onMove); canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointerdown', onDown); canvas.addEventListener('pointerup', onUp);

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05), t = (now - t0) / 1000; last = now;
      const shown = reduce ? glyphs.length : Math.floor(Math.max(0, t - 0.15) / 2.2 * glyphs.length);
      // alvo: letra sob o mouse ou passeio automático
      let target = ptr.inside ? hit(ptr.x, ptr.y) : Math.floor((t * 0.9) % glyphs.length);
      if (drag >= 0) target = drag;
      ctx.clearRect(0, 0, W, H); ctx.font = F; ctx.textBaseline = 'alphabetic';
      glyphs.forEach((g, i) => {
        if (i >= shown) return;
        if (i !== drag) { g.vx += (-320 * g.ox - 14 * g.vx) * dt; g.vy += (-320 * g.oy - 14 * g.vy) * dt; g.ox += g.vx * dt; g.oy += g.vy * dt; }
        g.out += ((i === target ? 1 : 0) - g.out) * (1 - Math.exp(-dt / 0.08));
        const x = g.x + g.ox, y = g.base + g.oy;
        ctx.globalAlpha = 1 - g.out; ctx.fillStyle = color; ctx.fillText(g.ch, x, y);
        if (g.out > 0.02) { ctx.globalAlpha = g.out; ctx.setLineDash([4, 2]); ctx.lineWidth = 1.5; ctx.strokeStyle = color; ctx.strokeText(g.ch, x, y); ctx.setLineDash([]); }
      });
      ctx.globalAlpha = 1;
      const g = glyphs[target];
      if (g && target < shown) {
        const k = 1 - Math.exp(-dt / 0.07);
        frame.x1 += (g.x + g.ox - 6 - frame.x1) * k; frame.x2 += (g.x + g.ox + g.w + 6 - frame.x2) * k;
        frame.y1 += (g.base + g.oy - size * 0.82 - frame.y1) * k; frame.y2 += (g.base + g.oy + size * 0.12 - frame.y2) * k;
        frame.a += (1 - frame.a) * k; frame.i = target;
      } else frame.a *= 0.9;
      if (frame.a > 0.01) {
        const { x1, y1, x2, y2 } = frame, L = 8;
        ctx.globalAlpha = frame.a; ctx.strokeStyle = accent; ctx.fillStyle = accent; ctx.lineWidth = 1;
        ctx.strokeRect(x1 + 0.5, y1 + 0.5, x2 - x1, y2 - y1);
        [[x1, y1], [x2, y1], [x1, y2], [x2, y2]].forEach(([cx, cy]) => ctx.fillRect(cx - 3, cy - 3, 6, 6));
        ctx.beginPath(); ctx.moveTo(x1 - L, (y1 + y2) / 2); ctx.lineTo(x1 - 2, (y1 + y2) / 2); ctx.moveTo(x2 + 2, (y1 + y2) / 2); ctx.lineTo(x2 + L, (y1 + y2) / 2); ctx.stroke();
        // quadradinhos piscando em volta
        for (let s = 0; s < 10; s++) {
          const ph = (t * (0.8 + (s % 4) * 0.3) + s * 0.37) % 1; if (ph > 0.7) continue;
          const side = s % 4, u = ((s * 73) % 100) / 100, sz = s % 5 === 0 ? 5 : 2;
          const px = side === 0 ? x1 + (x2 - x1) * u : side === 1 ? x2 + 6 : side === 2 ? x1 + (x2 - x1) * u : x1 - 6;
          const py = side === 0 ? y1 - 6 : side === 1 ? y1 + (y2 - y1) * u : side === 2 ? y2 + 6 : y1 + (y2 - y1) * u;
          ctx.globalAlpha = frame.a * (0.3 + 0.6 * u); ctx.fillRect(Math.round(px), Math.round(py), sz, sz);
        }
        ctx.globalAlpha = frame.a; ctx.font = '10px ui-monospace, Menlo, Consolas, monospace';
        const lbl = (glyphs[frame.i] ? glyphs[frame.i].ch : '') + '  ' + Math.round(x1 - M) + ',' + Math.round(y1 - M);
        const lw = ctx.measureText(lbl).width + 10;
        ctx.fillRect(x1, y1 - 18, lw, 14); ctx.fillStyle = '#000'; ctx.fillText(lbl, x1 + 5, y1 - 7);
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [text, size, color, accent, font]);

  return (
    <h1 ref={wrapRef} className="relative w-full touch-pan-y select-none">
      <span className="sr-only">{text}</span>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute -left-[30px] -top-[30px] block" />
    </h1>
  );
}`,
      tailwind: `<h1 id="tt" class="relative w-full touch-pan-y select-none bg-black text-white">
  <span class="sr-only">APROVAÇÃO COM MÉTODO</span>
  <canvas aria-hidden="true" class="absolute -left-[30px] -top-[30px] block"></canvas>
</h1>
<script>
(function () {
  var wrap = document.getElementById('tt'), canvas = wrap.querySelector('canvas'), ctx = canvas.getContext('2d');
  var TEXT = 'APROVAÇÃO COM MÉTODO', SIZE = 56, INK = '#fff', ACC = '#e5432f', F = '800 ' + SIZE + 'px Archivo, system-ui, sans-serif', M = 30;
  var W, H, glyphs = [], t0 = performance.now(), last = t0, ptr = { inside: false }, fr = { x1: 0, y1: 0, x2: 0, y2: 0, a: 0, i: -1 }, drag = -1, grab = {};
  function layout() {
    var dpr = Math.min(devicePixelRatio || 1, 2); ctx.font = F; var tw = ctx.measureText(TEXT).width;
    W = Math.max(wrap.clientWidth, tw) + M * 2; H = SIZE * 1.2 + M * 2; canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px'; wrap.style.height = SIZE * 1.2 + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.font = F;
    var left = M + (wrap.clientWidth - tw) / 2, base = M + SIZE * .95, pre = ''; glyphs = [];
    Array.from(TEXT).forEach(function (ch) { pre += ch; var w = ctx.measureText(ch).width, x = left + ctx.measureText(pre).width - w; if (ch.trim()) glyphs.push({ ch: ch, x: x, base: base, w: w, ox: 0, oy: 0, vx: 0, vy: 0, out: 0 }); });
  }
  layout(); new ResizeObserver(layout).observe(wrap);
  function loc(e) { var r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function hit(x, y) { for (var i = 0; i < glyphs.length; i++) { var g = glyphs[i]; if (x > g.x + g.ox - 4 && x < g.x + g.ox + g.w + 4 && y > g.base - SIZE + g.oy && y < g.base + SIZE * .25 + g.oy) return i; } return -1; }
  canvas.addEventListener('pointermove', function (e) { var p = loc(e); ptr.x = p.x; ptr.y = p.y; ptr.inside = true; if (drag >= 0) { glyphs[drag].ox = p.x - grab.x; glyphs[drag].oy = p.y - grab.y; } });
  canvas.addEventListener('pointerleave', function () { ptr.inside = false; });
  canvas.addEventListener('pointerdown', function (e) { var p = loc(e), i = hit(p.x, p.y); if (i < 0) return; drag = i; grab = { x: p.x - glyphs[i].ox, y: p.y - glyphs[i].oy }; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointerup', function () { drag = -1; });
  function tick(now) {
    var dt = Math.min((now - last) / 1000, .05), t = (now - t0) / 1000; last = now;
    var shown = Math.floor(Math.max(0, t - .15) / 2.2 * glyphs.length), target = drag >= 0 ? drag : ptr.inside ? hit(ptr.x, ptr.y) : Math.floor((t * .9) % glyphs.length);
    ctx.clearRect(0, 0, W, H); ctx.font = F;
    glyphs.forEach(function (g, i) {
      if (i >= shown) return;
      if (i !== drag) { g.vx += (-320 * g.ox - 14 * g.vx) * dt; g.vy += (-320 * g.oy - 14 * g.vy) * dt; g.ox += g.vx * dt; g.oy += g.vy * dt; }
      g.out += ((i === target ? 1 : 0) - g.out) * (1 - Math.exp(-dt / .08));
      ctx.globalAlpha = 1 - g.out; ctx.fillStyle = INK; ctx.fillText(g.ch, g.x + g.ox, g.base + g.oy);
      if (g.out > .02) { ctx.globalAlpha = g.out; ctx.setLineDash([4, 2]); ctx.lineWidth = 1.5; ctx.strokeStyle = INK; ctx.strokeText(g.ch, g.x + g.ox, g.base + g.oy); ctx.setLineDash([]); }
    });
    var g = glyphs[target], k = 1 - Math.exp(-dt / .07);
    if (g && target < shown) { fr.x1 += (g.x + g.ox - 6 - fr.x1) * k; fr.x2 += (g.x + g.ox + g.w + 6 - fr.x2) * k; fr.y1 += (g.base + g.oy - SIZE * .82 - fr.y1) * k; fr.y2 += (g.base + g.oy + SIZE * .12 - fr.y2) * k; fr.a += (1 - fr.a) * k; fr.i = target; } else fr.a *= .9;
    if (fr.a > .01) {
      ctx.globalAlpha = fr.a; ctx.strokeStyle = ctx.fillStyle = ACC; ctx.lineWidth = 1; ctx.strokeRect(fr.x1 + .5, fr.y1 + .5, fr.x2 - fr.x1, fr.y2 - fr.y1);
      [[fr.x1, fr.y1], [fr.x2, fr.y1], [fr.x1, fr.y2], [fr.x2, fr.y2]].forEach(function (c) { ctx.fillRect(c[0] - 3, c[1] - 3, 6, 6); });
      for (var s = 0; s < 10; s++) { var ph = (t * (.8 + (s % 4) * .3) + s * .37) % 1; if (ph > .7) continue; var u = ((s * 73) % 100) / 100, sd = s % 4, sz = s % 5 ? 2 : 5;
        var px = sd === 1 ? fr.x2 + 6 : sd === 3 ? fr.x1 - 6 : fr.x1 + (fr.x2 - fr.x1) * u, py = sd === 0 ? fr.y1 - 6 : sd === 2 ? fr.y2 + 6 : fr.y1 + (fr.y2 - fr.y1) * u;
        ctx.globalAlpha = fr.a * (.3 + .6 * u); ctx.fillRect(Math.round(px), Math.round(py), sz, sz); }
      ctx.globalAlpha = fr.a; ctx.font = '10px ui-monospace, Menlo, monospace'; var lbl = glyphs[fr.i].ch + '  ' + Math.round(fr.x1 - M) + ',' + Math.round(fr.y1 - M);
      ctx.fillRect(fr.x1, fr.y1 - 18, ctx.measureText(lbl).width + 10, 14); ctx.fillStyle = '#000'; ctx.fillText(lbl, fr.x1 + 5, fr.y1 - 7); ctx.globalAlpha = 1;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
</script>`,
    },
  },

  // 4 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-mesh-drift-shader",
    name: "Fundo Shader Mesh Drift com Luz no Mouse",
    category: "fundos",
    categoryLabel: "Fundos & Texturas",
    description: "Canvas WebGL fixo atrás da página inteira com manchas de grafite que derivam devagar, granulação fina e uma luz suave que acompanha o cursor. Fica em 32% de opacidade: o site ganha profundidade sem nenhum elemento chamar atenção.",
    tags: ["WebGL", "Shader", "Background Fixo", "Grain", "Mouse Glow"],
    defaultSection: "Fundo do Site",
    previewType: "gg-mesh-drift",
    tech: ["Tailwind CSS", "React", "WebGL", "GLSL"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

// "Mesh drift" (21st.dev Shader Builder) já com os valores fixos do Projeto Golgota:
// 2 cores (#101010 e #3a3a3a), escala 2.5, intensidade .59, contraste .91, brilho -.1, blur .016, grão .16,
// deriva .03, cursor em modo "glow" (raio .35). WebGL1 puro, sem bibliotecas.
const FRAG = [
  'precision mediump float;',
  'uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform float u_presence;',
  'const vec3 C0 = vec3(0.063); const vec3 C1 = vec3(0.227);',
  'float grain(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }',
  'vec3 shade(vec2 p, float t){',
  '  vec3 acc = C0 * 0.15; float total = 0.15;',
  '  for (int i = 0; i < 2; i++){',
  '    float fi = float(i);',
  '    vec2 c = vec2(sin(t * (0.21 + fi * 0.071) + fi * 2.4 + 1.0), cos(t * (0.17 + fi * 0.093) + fi * 1.7)) * (0.45 + 0.59 * 0.35);',
  '    float w = exp(-dot(p - c, p - c) * 6.0);',
  '    acc += (i == 0 ? C0 : C1) * w; total += w;',
  '  }',
  '  return acc / total;',
  '}',
  'void main(){',
  '  vec2 uv = gl_FragCoord.xy / u_res;',
  '  float m = min(u_res.x, u_res.y);',
  '  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / m;',
  '  vec2 cur = (0.5 * u_mouse * u_res) / m;',
  '  float mask = u_presence * (1.0 - smoothstep(0.0, 0.35, length(p - cur)));',
  '  p *= 2.5;',
  '  p += 0.03 * vec2(sin(u_time * 0.31), cos(u_time * 0.23));',
  '  float e = 0.016 * 2.5;',
  '  vec3 col = shade(p, u_time) * 0.36 + (shade(p + vec2(e, 0.0), u_time) + shade(p - vec2(e, 0.0), u_time) + shade(p + vec2(0.0, e), u_time) + shade(p - vec2(0.0, e), u_time)) * 0.16;',
  '  col = (col - 0.5) * 0.91 + 0.5;',
  '  col -= 0.1;',
  '  col += (vec3(0.18) + col * 0.12) * mask;',
  '  col += (grain(gl_FragCoord.xy + vec2(17.0, 31.0)) - 0.5) * 0.16;',
  '  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);',
  '}',
].join('\\n');

export function MeshDriftBackground({ opacity = 0.32 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}'));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, 'u_res'), uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse'), uPres = gl.getUniformLocation(prog, 'u_presence');
    let mx = 0, my = 0, presence = 0, target = 0, raf = 0, W = 0, H = 0;
    const start = performance.now(); let last = start;
    const onMove = (e) => { if (e.pointerType === 'touch') return; mx = (e.clientX / innerWidth) * 2 - 1; my = 1 - (e.clientY / innerHeight) * 2; target = 1; };
    const onOut = () => { target = 0; };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onOut);
    const draw = (now) => {
      const dpr = Math.min(devicePixelRatio || 1, 2), w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
      if (w !== W || h !== H) { W = canvas.width = w; H = canvas.height = h; gl.viewport(0, 0, W, H); }
      const dt = Math.min((now - last) / 1000, 0.1); last = now;
      presence += (target - presence) * Math.min(1, dt * 6);
      gl.uniform2f(uRes, W, H); gl.uniform1f(uTime, ((now - start) / 1000) * 0.86);
      gl.uniform2f(uMouse, mx, my); gl.uniform1f(uPres, presence);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const loop = (now) => { draw(now); raf = requestAnimationFrame(loop); };
    if (reduce) draw(start); else raf = requestAnimationFrame(loop);
    const onVis = () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else if (!reduce && !raf) raf = requestAnimationFrame(loop); };
    document.addEventListener('visibilitychange', onVis);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); document.removeEventListener('visibilitychange', onVis); document.documentElement.removeEventListener('pointerleave', onOut); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" style={{ opacity }} />;
}`,
      tailwind: `<!-- coloque logo depois do <body>; o fundo do <body> deve ser transparente ou preto -->
<canvas id="mesh-bg" aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[.32]"></canvas>
<script>
(function () {
  var canvas = document.getElementById('mesh-bg'), gl = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!gl) return;
  var FRAG = 'precision mediump float;uniform vec2 u_res;uniform float u_time;uniform vec2 u_mouse;uniform float u_presence;' +
    'const vec3 C0=vec3(0.063);const vec3 C1=vec3(0.227);' +
    'float grain(vec2 p){vec3 p3=fract(vec3(p.xyx)*0.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}' +
    'vec3 shade(vec2 p,float t){vec3 acc=C0*0.15;float tot=0.15;for(int i=0;i<2;i++){float fi=float(i);' +
    'vec2 c=vec2(sin(t*(0.21+fi*0.071)+fi*2.4+1.0),cos(t*(0.17+fi*0.093)+fi*1.7))*(0.45+0.59*0.35);' +
    'float w=exp(-dot(p-c,p-c)*6.0);acc+=(i==0?C0:C1)*w;tot+=w;}return acc/tot;}' +
    'void main(){float m=min(u_res.x,u_res.y);vec2 p=(gl_FragCoord.xy-0.5*u_res)/m;vec2 cur=(0.5*u_mouse*u_res)/m;' +
    'float mask=u_presence*(1.0-smoothstep(0.0,0.35,length(p-cur)));p*=2.5;p+=0.03*vec2(sin(u_time*0.31),cos(u_time*0.23));float e=0.04;' +
    'vec3 col=shade(p,u_time)*0.36+(shade(p+vec2(e,0.0),u_time)+shade(p-vec2(e,0.0),u_time)+shade(p+vec2(0.0,e),u_time)+shade(p-vec2(0.0,e),u_time))*0.16;' +
    'col=(col-0.5)*0.91+0.5;col-=0.1;col+=(vec3(0.18)+col*0.12)*mask;col+=(grain(gl_FragCoord.xy+vec2(17.0,31.0))-0.5)*0.16;' +
    'gl_FragColor=vec4(clamp(col,0.0,1.0),1.0);}';
  function sh(t, s) { var o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; }
  var prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}'));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog); gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var a = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
  var U = {}; ['u_res', 'u_time', 'u_mouse', 'u_presence'].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });
  var mx = 0, my = 0, pres = 0, target = 0, W = 0, H = 0, start = performance.now(), last = start;
  addEventListener('pointermove', function (e) { if (e.pointerType === 'touch') return; mx = e.clientX / innerWidth * 2 - 1; my = 1 - e.clientY / innerHeight * 2; target = 1; }, { passive: true });
  document.documentElement.addEventListener('pointerleave', function () { target = 0; });
  function draw(now) {
    var d = Math.min(devicePixelRatio || 1, 2), w = Math.round(canvas.clientWidth * d), h = Math.round(canvas.clientHeight * d);
    if (w !== W || h !== H) { W = canvas.width = w; H = canvas.height = h; gl.viewport(0, 0, W, H); }
    var dt = Math.min((now - last) / 1000, .1); last = now; pres += (target - pres) * Math.min(1, dt * 6);
    gl.uniform2f(U.u_res, W, H); gl.uniform1f(U.u_time, (now - start) / 1000 * .86); gl.uniform2f(U.u_mouse, mx, my); gl.uniform1f(U.u_presence, pres);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function loop(now) { draw(now); requestAnimationFrame(loop); }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) draw(start); else requestAnimationFrame(loop);
})();
</script>`,
    },
  },

  // 5 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-beam-wordmark-footer",
    name: "Rodapé com Facho de Luz e Palavra Gigante",
    category: "navegacao",
    categoryLabel: "Header, Rodapé & Pop-up",
    description: "Rodapé quase preto cruzado por um facho de luz vermelho que deriva sozinho e se inclina para o mouse; embaixo, a marca em letras gigantes cortadas na base, pintadas pelo mesmo facho. As letras sobem no hover e pulam no clique; colunas entram em cascata.",
    tags: ["Footer", "Light Beam", "Wordmark", "Background-clip Text", "Hover Hop"],
    defaultSection: "Rodapé",
    previewType: "gg-beam-footer",
    tech: ["Tailwind CSS", "React", "CSS Custom Properties", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const CSS = '.bwf{--acc:214,50,31;--wt:#6a130b;--wf:#120403;--ang:118deg;--b:58%;--px:50%;--py:50%;--g:0;--top:0px;--bot:100%;container-type:inline-size}' +
  '.bwf-beam{position:absolute;inset:0;filter:blur(calc(1px + 1.6cqw));background:linear-gradient(var(--ang),transparent calc(var(--b) - 11%),rgba(var(--acc),.10) calc(var(--b) - 5%),rgba(var(--acc),.32) var(--b),rgba(var(--acc),.08) calc(var(--b) + 4%),transparent calc(var(--b) + 9%)),linear-gradient(var(--ang),transparent calc(var(--b) - 34%),rgba(var(--acc),.09) calc(var(--b) - 27%),transparent calc(var(--b) - 20%))}' +
  '.bwf-glow{position:absolute;inset:0;opacity:var(--g);background:radial-gradient(circle 26cqw at var(--px) var(--py),rgba(var(--acc),.14),transparent 70%)}' +
  '.bwf-rule{background:linear-gradient(90deg,rgba(var(--acc),.15),rgba(var(--acc),.55) var(--b),rgba(var(--acc),.15))}' +
  '.bwf-in{font:800 22cqw/1 Archivo,system-ui,sans-serif;letter-spacing:-.045em}' +
  '.bwf-lw{display:inline-block;transition:translate 1.25s cubic-bezier(.16,.84,.2,1) var(--d,0ms)}.bwf[data-in=false] .bwf-lw{translate:0 85%}' +
  '.bwf-l{display:inline-block;cursor:pointer;color:transparent;-webkit-background-clip:text;background-clip:text;background-repeat:no-repeat;background-size:var(--rw) var(--rh);background-position:calc(var(--x) * -1) calc(var(--y) * -1);' +
  'background-image:radial-gradient(circle 22cqw at var(--px) var(--py),rgba(var(--acc),calc(var(--g) * .85)),transparent 70%),linear-gradient(var(--ang),transparent calc(var(--b) - 9%),rgba(var(--acc),.55) calc(var(--b) - 1.5%),rgba(var(--acc),.75) var(--b),rgba(var(--acc),.2) calc(var(--b) + 3.5%),transparent calc(var(--b) + 8%)),linear-gradient(180deg,var(--wt) var(--top),var(--wf) var(--bot));' +
  'transition:transform .5s cubic-bezier(.2,.9,.25,1.2),filter .4s;transform-origin:50% 100%}' +
  '.bwf-l:hover{transform:translateY(-.045em);filter:brightness(1.35) saturate(1.1)}.bwf-l.is-hop{animation:bwfHop .75s cubic-bezier(.2,.8,.2,1)}' +
  '@keyframes bwfHop{0%{transform:none}18%{transform:translateY(.02em) scale(1.06,.9)}45%{transform:translateY(-.14em) scale(.97,1.05)}70%{transform:translateY(.01em) scale(1.02,.97)}100%{transform:translateY(-.045em)}}' +
  '.bwf-fade{transition:opacity .9s ease var(--d,0ms),translate .9s cubic-bezier(.2,.7,.1,1) var(--d,0ms)}.bwf[data-in=false] .bwf-fade{opacity:0;translate:0 14px}';

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
const approach = (from, to, k, dt) => to + (from - to) * Math.pow(1 - k, clamp(dt, 0, 0.1) * 60);
const drift = (t) => 58 + 9 * (0.7 * Math.sin(t * 0.21) + 0.3 * Math.sin(t * 0.077 + 1.3));

export function BeamFooter({ word = 'GÓLGOTA', columns = [{ title: 'Páginas', links: ['Início', 'Sobre', 'Contato'] }, { title: 'Atalhos', links: ['Cursos', 'Garantia', 'FAQ'] }] }) {
  const rootRef = useRef(null), innerRef = useRef(null), boxRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current, inner = innerRef.current, box = boxRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.querySelectorAll('.bwf-fade').forEach((el, i) => el.style.setProperty('--d', (i + 1) * 70 + 'ms'));
    const place = () => {
      const r = root.getBoundingClientRect();
      root.style.setProperty('--rw', r.width + 'px'); root.style.setProperty('--rh', r.height + 'px');
      let top = 0;
      inner.querySelectorAll('.bwf-l').forEach((s, i) => {
        let x = 0, y = 0, el = s;
        while (el && el !== root) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
        s.style.setProperty('--x', x + 'px'); s.style.setProperty('--y', y + 'px'); if (i === 0) top = y;
      });
      const fs = parseFloat(getComputedStyle(inner).fontSize) || 0;
      root.style.setProperty('--top', top + 'px'); root.style.setProperty('--bot', top + fs * 0.92 + 'px');
      box.style.height = fs * 0.94 + 'px';   // corta a palavra na base
    };
    const ro = new ResizeObserver(() => requestAnimationFrame(place)); ro.observe(root);
    document.fonts && document.fonts.ready.then(place);

    const ptr = { u: 0.5, x: 0, y: 0, inside: false };
    const onPtr = (e) => { const r = root.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.u = ptr.x / r.width; ptr.inside = e.type !== 'pointerleave'; };
    ['pointermove', 'pointerenter', 'pointerleave'].forEach((t) => root.addEventListener(t, onPtr));
    let raf = 0, last = performance.now(), t = last / 1000, b = 58, px = 0, py = 0, g = 0;
    const tick = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000); last = now; t += dt;
      const idle = drift(t), aim = ptr.inside ? (30 + 52 * clamp(ptr.u, 0, 1)) * 0.75 + idle * 0.25 : idle;
      b = approach(b, aim, 0.035, dt); px = approach(px, ptr.x, 0.16, dt); py = approach(py, ptr.y, 0.16, dt); g = approach(g, ptr.inside ? 1 : 0, 0.06, dt);
      root.style.setProperty('--b', b.toFixed(2) + '%'); root.style.setProperty('--px', px.toFixed(1) + 'px');
      root.style.setProperty('--py', py.toFixed(1) + 'px'); root.style.setProperty('--g', g.toFixed(3));
      raf = requestAnimationFrame(tick);
    };
    if (!reduce) root.setAttribute('data-in', 'false');
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) root.setAttribute('data-in', 'true');
      if (reduce) return;
      if (e.isIntersecting && !raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
      if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0.12 });
    io.observe(root);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, []);

  const hop = (e) => { const l = e.currentTarget; l.classList.remove('is-hop'); void l.offsetWidth; l.classList.add('is-hop'); };

  return (
    <footer ref={rootRef} className="bwf relative isolate touch-pan-y overflow-hidden bg-[#050202] text-[#f2f2f2]">
      <style>{CSS}</style>
      <div className="bwf-rule absolute inset-x-0 top-0 z-[3] h-px" />
      <div className="pointer-events-none absolute inset-0 z-0"><div className="bwf-beam" /><div className="bwf-glow" /></div>
      <div className="relative z-[2] mx-auto grid max-w-6xl grid-cols-2 gap-x-12 gap-y-10 px-6 pt-[clamp(48px,8.5cqw,104px)] md:grid-cols-[1.6fr_.86fr_.86fr]">
        <div className="bwf-fade col-span-2 max-w-[420px] md:col-span-1">
          <span className="block border-b border-[#d6321f]/40 pb-3 text-xs font-bold uppercase tracking-[.14em] text-[#e5432f]">© 2026 Sua Marca</span>
          <p className="mt-4 max-w-[30ch] text-neutral-400">Frase curta da marca, a mesma do hero.</p>
        </div>
        {columns.map((c) => (
          <div key={c.title} className="bwf-fade">
            <span className="block border-b border-[#d6321f]/40 pb-3 text-xs font-bold uppercase tracking-[.14em] text-[#e5432f]">{c.title}</span>
            <ul className="mt-3 grid">{c.links.map((l) => <li key={l}><a href="#" className="inline-block py-1.5 text-white/80 transition-[color,translate] duration-300 hover:translate-x-3 hover:text-white">{l}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div ref={boxRef} className="relative z-[1] mt-[clamp(28px,7cqw,96px)] overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <span className="sr-only">{word}</span>
          <div ref={innerRef} aria-hidden="true" className="bwf-in inline-flex select-none whitespace-nowrap">
            {Array.from(word).map((ch, i) => (
              <span key={i} className="bwf-lw" style={{ '--d': 260 + i * 75 + 'ms' }}><span className="bwf-l" onClick={hop} onAnimationEnd={(e) => e.currentTarget.classList.remove('is-hop')}>{ch}</span></span>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1/3 bg-gradient-to-b from-transparent via-[#050202]/55 to-[#050202]" />
    </footer>
  );
}`,
      tailwind: `<footer id="bwf" class="bwf relative isolate overflow-hidden bg-[#050202] text-[#f2f2f2]">
  <style>
    .bwf{--acc:214,50,31;--wt:#6a130b;--wf:#120403;--ang:118deg;--b:58%;--px:50%;--py:50%;--g:0;--top:0px;--bot:100%;container-type:inline-size}
    .bwf-beam{position:absolute;inset:0;filter:blur(calc(1px + 1.6cqw));background:linear-gradient(var(--ang),transparent calc(var(--b) - 11%),rgba(var(--acc),.10) calc(var(--b) - 5%),rgba(var(--acc),.32) var(--b),rgba(var(--acc),.08) calc(var(--b) + 4%),transparent calc(var(--b) + 9%)),linear-gradient(var(--ang),transparent calc(var(--b) - 34%),rgba(var(--acc),.09) calc(var(--b) - 27%),transparent calc(var(--b) - 20%))}
    .bwf-glow{position:absolute;inset:0;opacity:var(--g);background:radial-gradient(circle 26cqw at var(--px) var(--py),rgba(var(--acc),.14),transparent 70%)}
    .bwf-in{font:800 22cqw/1 Archivo,system-ui,sans-serif;letter-spacing:-.045em}
    .bwf-lw{display:inline-block;transition:translate 1.25s cubic-bezier(.16,.84,.2,1) var(--d,0ms)}.bwf[data-in=false] .bwf-lw{translate:0 85%}
    .bwf-l{display:inline-block;cursor:pointer;color:transparent;-webkit-background-clip:text;background-clip:text;background-repeat:no-repeat;background-size:var(--rw) var(--rh);background-position:calc(var(--x) * -1) calc(var(--y) * -1);background-image:radial-gradient(circle 22cqw at var(--px) var(--py),rgba(var(--acc),calc(var(--g) * .85)),transparent 70%),linear-gradient(var(--ang),transparent calc(var(--b) - 9%),rgba(var(--acc),.55) calc(var(--b) - 1.5%),rgba(var(--acc),.75) var(--b),rgba(var(--acc),.2) calc(var(--b) + 3.5%),transparent calc(var(--b) + 8%)),linear-gradient(180deg,var(--wt) var(--top),var(--wf) var(--bot));transition:transform .5s cubic-bezier(.2,.9,.25,1.2),filter .4s;transform-origin:50% 100%}
    .bwf-l:hover{transform:translateY(-.045em);filter:brightness(1.35)}.bwf-l.is-hop{animation:bwfHop .75s cubic-bezier(.2,.8,.2,1)}
    @keyframes bwfHop{18%{transform:translateY(.02em) scale(1.06,.9)}45%{transform:translateY(-.14em) scale(.97,1.05)}70%{transform:translateY(.01em) scale(1.02,.97)}100%{transform:translateY(-.045em)}}
  </style>
  <div class="pointer-events-none absolute inset-0"><div class="bwf-beam"></div><div class="bwf-glow"></div></div>
  <div class="relative z-[2] mx-auto grid max-w-6xl grid-cols-2 gap-x-12 gap-y-10 px-6 pt-24 md:grid-cols-[1.6fr_.86fr_.86fr]">
    <div class="col-span-2 md:col-span-1"><span class="block border-b border-[#d6321f]/40 pb-3 text-xs font-bold uppercase tracking-[.14em] text-[#e5432f]">© 2026 Sua Marca</span><p class="mt-4 text-neutral-400">Frase curta da marca.</p></div>
    <div><span class="block border-b border-[#d6321f]/40 pb-3 text-xs font-bold uppercase tracking-[.14em] text-[#e5432f]">Páginas</span><ul class="mt-3"><li><a href="#" class="inline-block py-1.5 text-white/80 transition hover:translate-x-3 hover:text-white">Início</a></li></ul></div>
    <div><span class="block border-b border-[#d6321f]/40 pb-3 text-xs font-bold uppercase tracking-[.14em] text-[#e5432f]">Atalhos</span><ul class="mt-3"><li><a href="#" class="inline-block py-1.5 text-white/80 transition hover:translate-x-3 hover:text-white">Cursos</a></li></ul></div>
  </div>
  <div class="bwf-box relative z-[1] mt-20 overflow-hidden"><div class="mx-auto max-w-6xl px-6"><div class="bwf-in inline-flex select-none whitespace-nowrap" aria-label="GÓLGOTA">GÓLGOTA</div></div></div>
  <div class="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1/3 bg-gradient-to-b from-transparent via-[#050202]/55 to-[#050202]"></div>
</footer>
<script>
(function () {
  var root = document.getElementById('bwf'), inner = root.querySelector('.bwf-in'), box = root.querySelector('.bwf-box');
  var word = inner.textContent; inner.textContent = '';
  Array.from(word).forEach(function (ch, i) {
    var lw = document.createElement('span'), l = document.createElement('span');
    lw.className = 'bwf-lw'; lw.style.setProperty('--d', 260 + i * 75 + 'ms'); l.className = 'bwf-l'; l.textContent = ch;
    l.onclick = function () { l.classList.remove('is-hop'); void l.offsetWidth; l.classList.add('is-hop'); };
    l.onanimationend = function () { l.classList.remove('is-hop'); };
    lw.appendChild(l); inner.appendChild(lw);
  });
  function place() {
    var r = root.getBoundingClientRect(), top = 0; root.style.setProperty('--rw', r.width + 'px'); root.style.setProperty('--rh', r.height + 'px');
    inner.querySelectorAll('.bwf-l').forEach(function (s, i) { var x = 0, y = 0, el = s; while (el && el !== root) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
      s.style.setProperty('--x', x + 'px'); s.style.setProperty('--y', y + 'px'); if (!i) top = y; });
    var fs = parseFloat(getComputedStyle(inner).fontSize); root.style.setProperty('--top', top + 'px'); root.style.setProperty('--bot', top + fs * .92 + 'px'); box.style.height = fs * .94 + 'px';
  }
  new ResizeObserver(function () { requestAnimationFrame(place); }).observe(root);
  var ptr = { u: .5, x: 0, y: 0, inside: false };
  ['pointermove', 'pointerenter', 'pointerleave'].forEach(function (t) { root.addEventListener(t, function (e) { var r = root.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.u = ptr.x / r.width; ptr.inside = e.type !== 'pointerleave'; }); });
  function ap(f, t, k, dt) { return t + (f - t) * Math.pow(1 - k, Math.min(dt, .1) * 60); }
  var last = performance.now(), t = last / 1000, b = 58, px = 0, py = 0, g = 0;
  function tick(now) {
    var dt = Math.min(.1, (now - last) / 1000); last = now; t += dt;
    var idle = 58 + 9 * (.7 * Math.sin(t * .21) + .3 * Math.sin(t * .077 + 1.3)), aim = ptr.inside ? (30 + 52 * Math.min(1, Math.max(0, ptr.u))) * .75 + idle * .25 : idle;
    b = ap(b, aim, .035, dt); px = ap(px, ptr.x, .16, dt); py = ap(py, ptr.y, .16, dt); g = ap(g, ptr.inside ? 1 : 0, .06, dt);
    root.style.setProperty('--b', b + '%'); root.style.setProperty('--px', px + 'px'); root.style.setProperty('--py', py + 'px'); root.style.setProperty('--g', g);
    requestAnimationFrame(tick);
  }
  root.setAttribute('data-in', 'false');
  new IntersectionObserver(function (e) { if (e[0].isIntersecting) root.setAttribute('data-in', 'true'); }, { threshold: .12 }).observe(root);
  requestAnimationFrame(tick);
})();
</script>`,
    },
  },

  // 6 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-inset-panel-opening",
    name: "Abertura com Painel que se Abre na Rolagem",
    category: "hero",
    categoryLabel: "Hero (Primeira Seção)",
    description: "A seção fica presa enquanto a rolagem avança: o título entra desfocado e sobe, e o painel começa como uma pílula pequena no centro e se abre (clip-path) até ocupar a área toda, com o conteúdo crescendo de 70% para 100%. Revelação cinematográfica controlada pelo scroll.",
    tags: ["Scroll Pinned", "Clip-path", "Reveal", "Blur In", "Container Scroll"],
    defaultSection: "Abertura de Página",
    previewType: "gg-inset-panel",
    tech: ["Tailwind CSS", "React", "CSS Clip-path", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a, b, t) => a + (b - a) * clamp(t);

export function InsetPanelOpening({ title = 'Como funciona', text = 'Da lei seca ao simulado, num só método.', children }) {
  const secRef = useRef(null), headRef = useRef(null), mediaRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const sec = secRef.current, head = headRef.current, media = mediaRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // 0 com o topo da seção no meio da tela, 1 quando o fim da seção chega ao fim da tela
    const progress = () => { const r = sec.getBoundingClientRect(), vh = innerHeight, span = sec.offsetHeight - vh / 2; return span > 0 ? clamp((vh / 2 - r.top) / span) : 1; };
    const apply = (p) => {
      const t = p / 0.8;
      sec.style.setProperty('--iy', lerp(45, 0, t).toFixed(2) + '%');
      sec.style.setProperty('--ix', lerp(45, 0, t).toFixed(2) + '%');
      sec.style.setProperty('--ir', lerp(999, 20, p).toFixed(1) + 'px');
      head.style.setProperty('--hy', lerp(80, 0, (p - 0.2) / 0.6).toFixed(1) + 'px');
      media.style.setProperty('--ms', lerp(0.7, 1, t).toFixed(4));
    };
    let cur = reduce ? 1 : progress(), raf = 0;
    apply(cur);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } });
    io.observe(sec);
    if (reduce) { setInView(true); return () => io.disconnect(); }
    const frame = () => { raf = 0; const target = progress(); cur += (target - cur) * 0.18; if (Math.abs(target - cur) < 0.0005) cur = target; apply(cur); if (cur !== target) raf = requestAnimationFrame(frame); };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    window.addEventListener('scroll', kick, { passive: true }); window.addEventListener('resize', kick);
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('scroll', kick); window.removeEventListener('resize', kick); };
  }, []);

  return (
    <section ref={secRef} className="relative h-[calc(100svh+120vh)] overflow-clip bg-black text-white">
      <div className="sticky top-0 grid h-svh grid-rows-[auto_minmax(0,1fr)] gap-[clamp(16px,3vh,32px)] overflow-hidden pb-[clamp(16px,3vh,28px)] pt-[clamp(24px,5vh,56px)]">
        <div ref={headRef} className={'relative z-[2] mx-auto grid max-w-[860px] translate-y-[var(--hy,0px)] justify-items-center gap-4 px-6 text-center transition-[opacity,filter] duration-[900ms] ' + (inView ? 'opacity-100 blur-0' : 'opacity-0 blur-[10px]')}>
          <h1 className="text-4xl font-extrabold">{title}</h1>
          <p className="max-w-[60ch] text-lg text-neutral-400">{text}</p>
        </div>
        <div className="relative z-[1] mx-auto w-[min(1240px,calc(100%-40px))] bg-[radial-gradient(120%_90%_at_50%_0%,#161616,#070707_70%)] [clip-path:inset(var(--iy,45%)_var(--ix,45%)_var(--iy,45%)_var(--ix,45%)_round_var(--ir,999px))]">
          <div className="pointer-events-none absolute inset-0 rounded-[20px] border border-[#363636]" />
          <div className="absolute inset-0 grid place-items-center overflow-hidden">
            <div ref={mediaRef} className="scale-[var(--ms,1)]">{children || <div className="grid h-[320px] w-[560px] place-items-center rounded-2xl bg-[#b22314] text-2xl font-bold">Conteúdo / vídeo</div>}</div>
          </div>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<section id="inset" class="relative h-[calc(100svh+120vh)] overflow-clip bg-black text-white">
  <div class="sticky top-0 grid h-svh grid-rows-[auto_minmax(0,1fr)] gap-8 overflow-hidden pb-6 pt-14">
    <div class="ins-head relative z-[2] mx-auto grid max-w-[860px] translate-y-[var(--hy,0px)] justify-items-center gap-4 px-6 text-center opacity-0 blur-[10px] transition-[opacity,filter] duration-[900ms]">
      <h1 class="text-4xl font-extrabold">Como funciona</h1>
      <p class="max-w-[60ch] text-lg text-neutral-400">Da lei seca ao simulado, num só método.</p>
    </div>
    <div class="relative z-[1] mx-auto w-[min(1240px,calc(100%-40px))] bg-[radial-gradient(120%_90%_at_50%_0%,#161616,#070707_70%)] [clip-path:inset(var(--iy,45%)_var(--ix,45%)_var(--iy,45%)_var(--ix,45%)_round_var(--ir,999px))]">
      <div class="pointer-events-none absolute inset-0 rounded-[20px] border border-[#363636]"></div>
      <div class="absolute inset-0 grid place-items-center overflow-hidden">
        <div class="ins-media scale-[var(--ms,1)]"><div class="grid h-[320px] w-[560px] place-items-center rounded-2xl bg-[#b22314] text-2xl font-bold">Conteúdo / vídeo</div></div>
      </div>
    </div>
  </div>
</section>
<script>
(function () {
  var sec = document.getElementById('inset'), head = sec.querySelector('.ins-head'), media = sec.querySelector('.ins-media');
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; } function lerp(a, b, t) { return a + (b - a) * clamp(t); }
  function progress() { var r = sec.getBoundingClientRect(), vh = innerHeight, span = sec.offsetHeight - vh / 2; return span > 0 ? clamp((vh / 2 - r.top) / span) : 1; }
  function apply(p) { var t = p / .8;
    sec.style.setProperty('--iy', lerp(45, 0, t) + '%'); sec.style.setProperty('--ix', lerp(45, 0, t) + '%'); sec.style.setProperty('--ir', lerp(999, 20, p) + 'px');
    head.style.setProperty('--hy', lerp(80, 0, (p - .2) / .6) + 'px'); media.style.setProperty('--ms', lerp(.7, 1, t)); }
  var cur = progress(), raf = 0; apply(cur);
  new IntersectionObserver(function (e, io) { if (e[0].isIntersecting) { head.classList.remove('opacity-0', 'blur-[10px]'); io.disconnect(); } }).observe(sec);
  function frame() { raf = 0; var tg = progress(); cur += (tg - cur) * .18; if (Math.abs(tg - cur) < .0005) cur = tg; apply(cur); if (cur !== tg) raf = requestAnimationFrame(frame); }
  addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true });
})();
</script>`,
    },
  },

  // 7 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-reticle-button",
    name: "Botão Placa com Cantoneiras de Mira",
    category: "botoes",
    categoryLabel: "Botões & CTAs",
    description: "Placa vermelha sólida com cantos de 8px, quatro cantoneiras de mira em volta que se abrem no hover, linhas de varredura nas bordas e uma faixa de brilho que atravessa a placa. A seta anda 4px. Botão de ação com cara de equipamento tático, firme e sem exageros.",
    tags: ["CTA", "Reticle Corners", "Shine Sweep", "Scanlines", "Hover"],
    defaultSection: "Botões CTA",
    previewType: "gg-reticle-btn",
    tech: ["Tailwind CSS", "React", "CSS Pseudo-elements"],
    frameworks: {
      react: `// Variáveis: --b-bg fundo | --b-bg-h fundo no hover | --b-frame cor das cantoneiras | --b-ink texto
const CSS = '.rbtn{--b-h:56px;--b-px:30px;--b-r:8px;--b-bg:#b22314;--b-bg-h:#c42816;--b-frame:rgba(255,255,255,.55);--b-ink:#fff;--ease:cubic-bezier(.22,1,.36,1);' +
  'position:relative;display:inline-flex;align-items:center;justify-content:center;gap:12px;height:var(--b-h);padding:0 var(--b-px);border-radius:var(--b-r);background:var(--b-bg);color:var(--b-ink);text-decoration:none;' +
  'box-shadow:inset 0 1px 0 rgba(255,255,255,.18),inset 0 0 0 1px rgba(255,255,255,.08);font:700 .875rem/1 Archivo,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;transition:background-color .35s var(--ease),transform .3s;isolation:isolate}' +
  // 4 cantoneiras (8 tracinhos) que abrem no hover
  '.rbtn::after{--k:12px;--t:2px;content:"";position:absolute;inset:-7px;pointer-events:none;opacity:.7;background:' +
  'linear-gradient(var(--b-frame),var(--b-frame)) left top/var(--k) var(--t),linear-gradient(var(--b-frame),var(--b-frame)) left top/var(--t) var(--k),' +
  'linear-gradient(var(--b-frame),var(--b-frame)) right top/var(--k) var(--t),linear-gradient(var(--b-frame),var(--b-frame)) right top/var(--t) var(--k),' +
  'linear-gradient(var(--b-frame),var(--b-frame)) left bottom/var(--k) var(--t),linear-gradient(var(--b-frame),var(--b-frame)) left bottom/var(--t) var(--k),' +
  'linear-gradient(var(--b-frame),var(--b-frame)) right bottom/var(--k) var(--t),linear-gradient(var(--b-frame),var(--b-frame)) right bottom/var(--t) var(--k);' +
  'background-repeat:no-repeat;transition:inset .45s var(--ease),opacity .3s}' +
  // faixa de brilho
  '.rbtn::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;pointer-events:none;background:linear-gradient(105deg,transparent 38%,rgba(255,255,255,.3) 50%,transparent 62%) 160% 0/260% 100% no-repeat;transition:background-position 0s}' +
  // linhas de varredura só nas bordas
  '.rbtn__label{white-space:nowrap}.rbtn__label::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:var(--b-r);pointer-events:none;background:repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 1px,transparent 1px 3px);-webkit-mask-image:radial-gradient(ellipse at center,transparent 40%,#000 100%);mask-image:radial-gradient(ellipse at center,transparent 40%,#000 100%)}' +
  '.rbtn svg{width:16px;height:16px;transition:transform .4s var(--ease)}' +
  '.rbtn:hover,.rbtn:focus-visible{background-color:var(--b-bg-h)}.rbtn:hover::after,.rbtn:focus-visible::after{inset:-11px;opacity:1}' +
  '.rbtn:hover::before,.rbtn:focus-visible::before{background-position:-60% 0;transition:background-position .9s var(--ease)}' +
  '.rbtn:hover svg,.rbtn:focus-visible svg{transform:translateX(4px)}.rbtn:active{transform:translateY(1px)}' +
  '.rbtn--dark{--b-bg:#000;--b-bg-h:#141414;--b-frame:rgba(0,0,0,.6)}';

export function ReticleButton({ href = '#', children = 'Quero garantir minha vaga', dark = false }) {
  return (
    <>
      <style>{CSS}</style>
      <a href={href} className={'rbtn' + (dark ? ' rbtn--dark' : '')}>
        <span className="rbtn__label">{children}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </a>
    </>
  );
}`,
      tailwind: `<style>
  .rbtn{--b-r:8px;--b-bg:#b22314;--b-bg-h:#c42816;--b-frame:rgba(255,255,255,.55);--ease:cubic-bezier(.22,1,.36,1);isolation:isolate;transition:background-color .35s var(--ease),transform .3s;box-shadow:inset 0 1px 0 rgba(255,255,255,.18),inset 0 0 0 1px rgba(255,255,255,.08)}
  .rbtn::after{--k:12px;--t:2px;content:"";position:absolute;inset:-7px;pointer-events:none;opacity:.7;background:linear-gradient(var(--b-frame),var(--b-frame)) left top/var(--k) var(--t),linear-gradient(var(--b-frame),var(--b-frame)) left top/var(--t) var(--k),linear-gradient(var(--b-frame),var(--b-frame)) right top/var(--k) var(--t),linear-gradient(var(--b-frame),var(--b-frame)) right top/var(--t) var(--k),linear-gradient(var(--b-frame),var(--b-frame)) left bottom/var(--k) var(--t),linear-gradient(var(--b-frame),var(--b-frame)) left bottom/var(--t) var(--k),linear-gradient(var(--b-frame),var(--b-frame)) right bottom/var(--k) var(--t),linear-gradient(var(--b-frame),var(--b-frame)) right bottom/var(--t) var(--k);background-repeat:no-repeat;transition:inset .45s var(--ease),opacity .3s}
  .rbtn::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;pointer-events:none;background:linear-gradient(105deg,transparent 38%,rgba(255,255,255,.3) 50%,transparent 62%) 160% 0/260% 100% no-repeat}
  .rbtn-scan::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:var(--b-r);pointer-events:none;background:repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 1px,transparent 1px 3px);-webkit-mask-image:radial-gradient(ellipse at center,transparent 40%,#000 100%);mask-image:radial-gradient(ellipse at center,transparent 40%,#000 100%)}
  .rbtn:hover{background-color:var(--b-bg-h)}.rbtn:hover::after{inset:-11px;opacity:1}
  .rbtn:hover::before{background-position:-60% 0;transition:background-position .9s var(--ease)}
  .rbtn svg{transition:transform .4s var(--ease)}.rbtn:hover svg{transform:translateX(4px)}.rbtn:active{transform:translateY(1px)}
</style>
<a href="#" class="rbtn relative inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-[#b22314] px-[30px] text-sm font-bold uppercase tracking-[.14em] text-white no-underline">
  <span class="rbtn-scan whitespace-nowrap">Quero garantir minha vaga</span>
  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
</a>`,
    },
  },

  // 8 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-smoke-scroll-reveal",
    name: "Entrada e Saída Esfumaçadas na Rolagem",
    category: "entradas",
    categoryLabel: "Entradas na Rolagem",
    description: "Cada bloco aparece com desfoque, opacidade e leve subida conforme entra pela base da tela, e se desfaz em fumaça ao sair por cima (só quando já está quase atrás do header). Tudo ligado à rolagem, com mola suave: a página parece respirar enquanto você desce.",
    tags: ["Scroll Linked", "Blur", "Reveal", "Exit Animation", "Smooth"],
    defaultSection: "Qualquer Seção",
    previewType: "gg-smoke",
    tech: ["Tailwind CSS", "React", "CSS Custom Properties", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

// Envolva qualquer bloco: <Smoke>...</Smoke>. last = último bloco da página (não sai, termina de aparecer no fim)
export function Smoke({ children, last = false, headerOffset = 92, as: Tag = 'div', className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--sv', 1); return; }
    let v = 0, raf = 0;
    const loop = () => {
      const vh = innerHeight, r = el.getBoundingClientRect(), band = vh * 0.28;
      let e = clamp((vh - r.top) / band);                       // entrada pela base
      const out = Math.max(40, Math.min(vh * 0.14, r.height * 0.6));
      const x = last ? 1 : 1 - (1 - clamp((r.bottom - headerOffset) / out)) * clamp(scrollY / (vh * 0.15)); // saída por cima
      if (last) e = Math.max(e, clamp(1 - (document.documentElement.scrollHeight - vh - scrollY) / (vh * 0.25)));
      const t = Math.min(e, x), d = e < x ? 1 : -1;
      v += (t - v) * 0.16; if (Math.abs(t - v) < 0.003) v = t;
      el.style.setProperty('--sv', v.toFixed(3)); el.style.setProperty('--sd', d);
      el.style.filter = v >= 1 ? 'none' : '';
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [last, headerOffset]);
  return (
    <Tag ref={ref} className={'[filter:blur(calc((1-var(--sv,0))*9px))] [opacity:var(--sv,0)] [translate:0_calc((1-var(--sv,0))*var(--sd,1)*28px)] ' + className}>
      {children}
    </Tag>
  );
}`,
      tailwind: `<style>
  [data-smoke]{opacity:var(--sv,0);filter:blur(calc((1 - var(--sv,0)) * 9px));translate:0 calc((1 - var(--sv,0)) * var(--sd,1) * 28px)}
  [data-smoke].is-clear{filter:none;translate:none}
  @media (prefers-reduced-motion:reduce){[data-smoke]{opacity:1;filter:none;translate:none}}
</style>
<section class="bg-black px-6 py-24 text-white">
  <h2 data-smoke class="text-3xl font-extrabold">Bloco que aparece em fumaça</h2>
  <p data-smoke class="mt-4 max-w-xl text-neutral-400">E se desfaz ao sair por cima da tela.</p>
</section>
<script>
(function () {
  var HDR = 92, items = Array.from(document.querySelectorAll('[data-smoke]')).map(function (el) { return { el: el, v: 0 }; });
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function loop() {
    var vh = innerHeight;
    items.forEach(function (it) {
      var r = it.el.getBoundingClientRect(), e = clamp((vh - r.top) / (vh * .28)), out = Math.max(40, Math.min(vh * .14, r.height * .6));
      var x = 1 - (1 - clamp((r.bottom - HDR) / out)) * clamp(scrollY / (vh * .15)), t = Math.min(e, x);
      it.v += (t - it.v) * .16; if (Math.abs(t - it.v) < .003) it.v = t;
      it.el.style.setProperty('--sv', it.v.toFixed(3)); it.el.style.setProperty('--sd', e < x ? 1 : -1); it.el.classList.toggle('is-clear', it.v >= 1);
    });
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
</script>`,
    },
  },

  // 9 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-blur-hide-header",
    name: "Header que Some em Desfoque ao Rolar",
    category: "navegacao",
    categoryLabel: "Header, Rodapé & Pop-up",
    description: "Header translúcido com blur e linha de base desde o topo; rolando para baixo ele sobe e se desfaz em desfoque, rolando para cima volta. Fica sempre visível perto do topo, com o menu aberto ou com foco do teclado dentro dele. Altura fixa, então nada treme.",
    tags: ["Header", "Sticky", "Backdrop Blur", "Hide on Scroll", "Acessível"],
    defaultSection: "Navegação",
    previewType: "gg-hide-header",
    tech: ["Tailwind CSS", "React", "CSS Transitions"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export function BlurHideHeader({ logo = 'LOGO', links = ['Início', 'Sobre', 'Depoimentos', 'Como funciona', 'Contato'] }) {
  const ref = useRef(null);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const hdr = ref.current;
    let lastY = scrollY, focused = false, ticking = false;
    const onFocusIn = () => { focused = true; setHidden(false); };
    const onFocusOut = () => { focused = false; };
    hdr.addEventListener('focusin', onFocusIn); hdr.addEventListener('focusout', onFocusOut);
    const check = () => {
      ticking = false;
      const y = scrollY, dy = y - lastY;
      if (Math.abs(dy) < 6) return;     // ignora tremidas
      lastY = y;
      setHidden(!(y < hdr.offsetHeight * 1.5 || dy < 0 || focused));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
    addEventListener('scroll', onScroll, { passive: true });
    return () => { removeEventListener('scroll', onScroll); hdr.removeEventListener('focusin', onFocusIn); hdr.removeEventListener('focusout', onFocusOut); };
  }, []);
  return (
    <header ref={ref} className={'sticky top-0 z-40 h-[92px] border-b border-white/[.08] bg-black/60 backdrop-blur-[16px] backdrop-saturate-150 transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ' + (hidden ? 'pointer-events-none -translate-y-[105%] opacity-0 blur-[10px]' : '')}>
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-7 px-6 text-white">
        <a href="#" className="text-xl font-extrabold">{logo}</a>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l} href="#" className="group relative py-3.5 text-[13px] font-semibold uppercase tracking-[.07em] text-neutral-300 transition-colors hover:text-white">
              {l}<span className="absolute inset-x-0 bottom-[5px] h-0.5 origin-left scale-x-0 bg-[#b22314] transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}`,
      tailwind: `<header id="hdr" class="sticky top-0 z-40 h-[92px] border-b border-white/[.08] bg-black/60 text-white backdrop-blur-[16px] backdrop-saturate-150 transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(.22,1,.36,1)]">
  <div class="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
    <a href="#" class="text-xl font-extrabold">LOGO</a>
    <nav class="hidden items-center gap-8 lg:flex">
      <a href="#" class="group relative py-3.5 text-[13px] font-semibold uppercase tracking-[.07em] text-neutral-300 hover:text-white">Início<span class="absolute inset-x-0 bottom-[5px] h-0.5 origin-left scale-x-0 bg-[#b22314] transition-transform duration-500 group-hover:scale-x-100"></span></a>
      <a href="#" class="group relative py-3.5 text-[13px] font-semibold uppercase tracking-[.07em] text-neutral-300 hover:text-white">Contato<span class="absolute inset-x-0 bottom-[5px] h-0.5 origin-left scale-x-0 bg-[#b22314] transition-transform duration-500 group-hover:scale-x-100"></span></a>
    </nav>
  </div>
</header>
<script>
(function () {
  var hdr = document.getElementById('hdr'), lastY = scrollY, focused = false, OFF = ['pointer-events-none', '-translate-y-[105%]', 'opacity-0', 'blur-[10px]'];
  function set(h) { OFF.forEach(function (c) { hdr.classList.toggle(c, h); }); }
  hdr.addEventListener('focusin', function () { focused = true; set(false); });
  hdr.addEventListener('focusout', function () { focused = false; });
  addEventListener('scroll', function () {
    var y = scrollY, dy = y - lastY; if (Math.abs(dy) < 6) return; lastY = y;
    set(!(y < hdr.offsetHeight * 1.5 || dy < 0 || focused));
  }, { passive: true });
})();
</script>`,
    },
  },

  // 10 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-staggered-testimonials",
    name: "Carrossel Escalonado de Depoimentos",
    category: "depoimentos",
    categoryLabel: "Depoimentos & Prova Social",
    description: "Cinco cartões espalhados alternando para cima e para baixo; o do meio fica vermelho e mais alto. Canto superior direito cortado na diagonal. Setas andam uma casa e clicar num cartão traz ele para o meio, casa por casa; um cartão invisível em cada ponta troca de lado para nada pular.",
    tags: ["Carousel", "Testimonials", "Stagger", "Clip-path", "Click to Center"],
    defaultSection: "Depoimentos",
    previewType: "gg-stagger",
    tech: ["Tailwind CSS", "React", "CSS Transitions"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

// 'items' precisa ter tamanho ímpar >= 7 (5 visíveis + 1 escondido em cada ponta); se tiver menos, repete.
export function StaggerTestimonials({ items = [
  { text: 'O resumo em prancha mudou meu jeito de estudar a lei seca.', by: 'Aluno 01' },
  { text: 'Fiz as questões comentadas todo dia e cheguei confiante na prova.', by: 'Aluno 02' },
  { text: 'Os simulados são idênticos ao estilo da banca.', by: 'Aluno 03' },
] }) {
  const SHOW = 2;
  const base = [];
  for (let n = 0; base.length < SHOW * 2 + 3 || base.length % 2 === 0; n++) base.push({ ...items[n % items.length], key: n });
  const half = (base.length - 1) / 2;
  const [order, setOrder] = useState(() => base.slice(base.length - half).concat(base.slice(0, base.length - half)));
  const [jumped, setJumped] = useState(null);
  const [cs, setCs] = useState(365);
  const queue = useRef(0), timer = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const upd = () => setCs(mq.matches ? 365 : 290); upd();
    mq.addEventListener('change', upd); return () => mq.removeEventListener('change', upd);
  }, []);

  const step = (dir) => setOrder((o) => {
    const n = o.slice(); const j = dir > 0 ? n.shift() : n.pop();
    if (dir > 0) n.push(j); else n.unshift(j);
    setJumped(j.key); requestAnimationFrame(() => requestAnimationFrame(() => setJumped(null)));
    return n;
  });
  const run = () => { timer.current = 0; if (!queue.current) return; const d = queue.current > 0 ? 1 : -1; queue.current -= d; step(d); if (queue.current) timer.current = setTimeout(run, 170); };
  const move = (steps) => { if (!steps) return; queue.current += steps; if (!timer.current) run(); };

  return (
    <div className="relative h-[540px] overflow-hidden sm:h-[600px]" style={{ '--cs': cs + 'px' }}>
      <ul>
        {order.map((it, i) => {
          const pos = i - half, center = pos === 0, out = Math.abs(pos) > SHOW;
          return (
            <li key={it.key} onClick={() => move(pos)}
              className={'absolute left-1/2 top-1/2 h-[var(--cs)] w-[var(--cs)] cursor-pointer rounded-[22px] border-2 p-6 sm:p-8 [clip-path:polygon(50px_0,calc(100%-50px)_0,100%_50px,100%_100%,calc(100%-50px)_100%,50px_100%,0_100%,0_0)] ' +
                (jumped === it.key ? '' : 'transition-[transform,opacity,background-color,border-color,color] duration-500 ease-in-out ') +
                (center ? 'z-[2] cursor-default border-[#b22314] bg-[#b22314] text-white ' : 'border-[#363636] bg-[#0b0b0b] text-neutral-200 hover:border-[#b22314]/60 ') +
                (out ? 'pointer-events-none opacity-0' : '')}
              style={{ transform: 'translate(-50%,-50%) translateX(' + (cs / 1.5) * pos + 'px) translateY(' + (center ? -65 : pos % 2 ? 15 : -15) + 'px) rotate(' + (center ? 0 : pos % 2 ? 2.5 : -2.5) + 'deg)', zIndex: center ? 3 : out ? 0 : 1 }}
              aria-hidden={it.key >= items.length || undefined}>
              <span className={'absolute -right-0.5 top-12 h-0.5 w-[70.71px] origin-top-right rotate-45 ' + (center ? 'bg-black/35' : 'bg-[#363636]')} />
              <p className="text-lg font-medium leading-snug sm:text-xl">"{it.text}"</p>
              <p className={'absolute inset-x-6 bottom-6 text-sm italic sm:inset-x-8 sm:bottom-8 ' + (center ? 'text-white/80' : 'text-neutral-400')}>{it.by}</p>
            </li>
          );
        })}
      </ul>
      <div className="absolute bottom-4 left-1/2 z-[3] flex -translate-x-1/2 gap-2">
        {[-1, 1].map((d) => (
          <button key={d} onClick={() => move(d)} aria-label={d < 0 ? 'Anterior' : 'Próximo'} className="grid h-14 w-14 place-items-center rounded-[14px] border-2 border-[#363636] bg-black text-white transition-colors hover:border-[#b22314] hover:bg-[#b22314]">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d={d < 0 ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} /></svg>
          </button>
        ))}
      </div>
    </div>
  );
}`,
      tailwind: `<div id="stg" class="relative h-[540px] overflow-hidden bg-black sm:h-[600px]">
  <ul class="stg-list">
    <li><p class="text-lg font-medium sm:text-xl">"O resumo em prancha mudou meu jeito de estudar."</p><p class="stg-by">Aluno 01</p></li>
    <li><p class="text-lg font-medium sm:text-xl">"Cheguei confiante na prova."</p><p class="stg-by">Aluno 02</p></li>
    <li><p class="text-lg font-medium sm:text-xl">"Simulados no estilo da banca."</p><p class="stg-by">Aluno 03</p></li>
  </ul>
  <div class="absolute bottom-4 left-1/2 z-[3] flex -translate-x-1/2 gap-2">
    <button data-dir="-1" aria-label="Anterior" class="grid h-14 w-14 place-items-center rounded-[14px] border-2 border-[#363636] bg-black text-white hover:bg-[#b22314]">&#8592;</button>
    <button data-dir="1" aria-label="Próximo" class="grid h-14 w-14 place-items-center rounded-[14px] border-2 border-[#363636] bg-black text-white hover:bg-[#b22314]">&#8594;</button>
  </div>
</div>
<style>
  #stg li{position:absolute;left:50%;top:50%;width:var(--cs,365px);height:var(--cs,365px);padding:32px;cursor:pointer;border:2px solid #363636;border-radius:22px;background:#0b0b0b;color:#ececec;clip-path:polygon(50px 0,calc(100% - 50px) 0,100% 50px,100% 100%,calc(100% - 50px) 100%,50px 100%,0 100%,0 0);transform:translate(-50%,-50%) translateX(var(--x,0px)) translateY(var(--y,0px)) rotate(var(--r,0deg));transition:transform .5s ease-in-out,opacity .4s,background-color .5s,border-color .5s,color .5s}
  #stg li::after{content:"";position:absolute;right:-2px;top:48px;width:70.71px;height:2px;background:#363636;transform-origin:top right;rotate:45deg}
  #stg li.is-center{z-index:2;background:#b22314;border-color:#b22314;color:#fff}#stg li.is-center::after{background:rgba(0,0,0,.35)}
  #stg li.is-out{opacity:0;pointer-events:none}#stg li.no-anim{transition:none}
  #stg .stg-by{position:absolute;left:32px;right:32px;bottom:32px;font-size:.875rem;font-style:italic;opacity:.8}
  @media (max-width:639px){#stg{--cs:290px}#stg li{padding:24px}}
</style>
<script>
(function () {
  var box = document.getElementById('stg'), list = box.querySelector('.stg-list'), cards = Array.from(list.children), real = cards.length, SHOW = 2;
  var from = real >= SHOW * 2 + 3 ? Math.floor(real / 2) : 0;
  for (var n = from; cards.length < SHOW * 2 + 3 || cards.length % 2 === 0; n++) { var c = cards[n % real].cloneNode(true); c.setAttribute('aria-hidden', 'true'); list.appendChild(c); cards.push(c); }
  var half = (cards.length - 1) / 2, order = cards.slice(cards.length - half).concat(cards.slice(0, cards.length - half));
  function place() { var cs = matchMedia('(min-width:640px)').matches ? 365 : 290;
    order.forEach(function (card, i) { var pos = i - half, ctr = pos === 0; card.classList.toggle('is-center', ctr); card.classList.toggle('is-out', Math.abs(pos) > SHOW);
      card.style.setProperty('--x', cs / 1.5 * pos + 'px'); card.style.setProperty('--y', (ctr ? -65 : pos % 2 ? 15 : -15) + 'px'); card.style.setProperty('--r', (ctr ? 0 : pos % 2 ? 2.5 : -2.5) + 'deg');
      card.style.zIndex = ctr ? 3 : Math.abs(pos) > SHOW ? 0 : 1; card._pos = pos; }); }
  function step(d) { var j = d > 0 ? order.shift() : order.pop(); if (d > 0) order.push(j); else order.unshift(j); j.classList.add('no-anim'); place(); void list.offsetWidth; j.classList.remove('no-anim'); }
  var queue = 0, timer = 0;
  function run() { timer = 0; if (!queue) return; var d = queue > 0 ? 1 : -1; queue -= d; step(d); if (queue) timer = setTimeout(run, 170); }
  function move(s) { if (!s) return; queue += s; if (!timer) run(); }
  cards.forEach(function (c) { c.addEventListener('click', function () { move(c._pos); }); });
  box.querySelectorAll('[data-dir]').forEach(function (b) { b.addEventListener('click', function () { move(+b.dataset.dir); }); });
  place(); addEventListener('resize', place);
})();
</script>`,
    },
  },

  // 11 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-fan-cards-scroll",
    name: "Cartas que se Abrem em Leque na Rolagem",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "Cinco cartas empilhadas no centro se abrem em leque conforme a seção sobe na tela: espalham para os lados, giram e descem em arco, e o traço vermelho sob cada número cresce junto. No hover a carta sobe e ganha borda vermelha. Leitura de 'mão de baralho' ligada ao scroll.",
    tags: ["Scroll Linked", "Fan Out", "Cards", "Rotate", "Hover Lift"],
    defaultSection: "Para Quem É",
    previewType: "gg-fan-cards",
    tech: ["Tailwind CSS", "React", "CSS Custom Properties"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const CARDS = [
  { n: '01', b: 'Quem vai prestar', t: 'concurso da segurança pública de MG.' },
  { n: '02', b: 'Quem tem pouco tempo', t: 'e precisa estudar o que cai.' },
  { n: '03', b: 'Quem já tentou', t: 'e travou na lei seca.' },
  { n: '04', b: 'Quem quer treinar', t: 'com questões comentadas.' },
  { n: '05', b: 'Quem quer medir', t: 'o nível antes da prova.' },
];

export function FanCards({ cards = CARDS }) {
  const ref = useRef(null);
  useEffect(() => {
    const h = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { h.style.setProperty('--s', 1); return; }
    let raf = 0;
    const loop = () => { const r = h.getBoundingClientRect(); h.style.setProperty('--s', clamp((innerHeight * 0.92 - r.top) / (innerHeight * 0.5)).toFixed(4)); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  // --o: deslocamento (-2..2) | --a: distância do meio | --r0: giro quando empilhada
  const O = [-2, -1, 0, 1, 2], R0 = [-4, 3, -1, 5, -3];
  return (
    <div ref={ref} className="relative mx-auto h-[calc(min(236px,20vw)*330/236+46px)] max-w-[1180px] [--gx:min(246px,20.4vw)] [--s:0]">
      {cards.map((c, i) => (
        <div key={c.n} style={{ '--o': O[i], '--a': Math.abs(O[i]), '--r0': R0[i] + 'deg', zIndex: 10 - Math.abs(O[i]) }}
          className={'absolute bottom-5 left-1/2 ml-[calc(min(236px,20vw)/-2)] flex aspect-[236/330] w-[min(236px,20vw)] origin-[50%_115%] flex-col gap-4 rounded-[20px] border border-[#363636] p-[clamp(18px,1.8vw,24px)] text-white transition-[transform,translate,border-color] duration-[250ms,500ms,400ms] ease-[linear,cubic-bezier(.22,1,.36,1),ease] hover:z-20 hover:border-[#b22314] hover:[translate:0_-26px] ' + (i % 2 ? 'bg-[#121212]' : 'bg-[#0d0d0d]') + ' ' +
            '[transform:translateX(calc(var(--o)*var(--gx)*var(--s)))_translateY(calc(var(--a)*22px*var(--s)))_rotate(calc(var(--o)*6deg*var(--s)+var(--r0)*(1-var(--s))))]'}>
          <span className="relative block pb-4 text-[clamp(3.4rem,5vw,4.6rem)] font-black leading-[.85] text-[#e5432f]">
            {c.n}<i className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-[var(--s)] bg-[#b22314]" />
          </span>
          <p className="text-[clamp(.9375rem,.85rem+.3vw,1.0625rem)] leading-snug text-neutral-200"><b className="mb-1 block font-semibold text-white">{c.b}</b>{c.t}</p>
        </div>
      ))}
    </div>
  );
}`,
      tailwind: `<style>
  .hand{--s:0;--gx:min(246px,20.4vw);position:relative;height:calc(min(236px,20vw) * 330 / 236 + 46px);margin:0 auto;max-width:1180px}
  .hand .card{position:absolute;left:50%;bottom:20px;width:min(236px,20vw);aspect-ratio:236/330;margin-left:calc(min(236px,20vw) / -2);border-radius:20px;background:#121212;border:1px solid #363636;z-index:calc(10 - var(--a));transform-origin:50% 115%;
    transform:translateX(calc(var(--o) * var(--gx) * var(--s))) translateY(calc(var(--a) * 22px * var(--s))) rotate(calc(var(--o) * 6deg * var(--s) + var(--r0) * (1 - var(--s))));
    transition:transform .25s linear,translate .5s cubic-bezier(.22,1,.36,1),border-color .4s}
  .hand .card:hover{translate:0 -26px;border-color:#b22314;z-index:20}
  .hand .num::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:#b22314;transform:scaleX(var(--s));transform-origin:left}
</style>
<div class="hand" id="hand">
  <div class="card flex flex-col gap-4 p-5 text-white" style="--o:-2;--a:2;--r0:-4deg"><span class="num relative block pb-4 text-6xl font-black leading-[.85] text-[#e5432f]">01</span><p class="text-neutral-200"><b class="block text-white">Título</b>texto curto.</p></div>
  <div class="card flex flex-col gap-4 p-5 text-white" style="--o:-1;--a:1;--r0:3deg"><span class="num relative block pb-4 text-6xl font-black leading-[.85] text-[#e5432f]">02</span><p class="text-neutral-200"><b class="block text-white">Título</b>texto curto.</p></div>
  <div class="card flex flex-col gap-4 p-5 text-white" style="--o:0;--a:0;--r0:-1deg"><span class="num relative block pb-4 text-6xl font-black leading-[.85] text-[#e5432f]">03</span><p class="text-neutral-200"><b class="block text-white">Título</b>texto curto.</p></div>
  <div class="card flex flex-col gap-4 p-5 text-white" style="--o:1;--a:1;--r0:5deg"><span class="num relative block pb-4 text-6xl font-black leading-[.85] text-[#e5432f]">04</span><p class="text-neutral-200"><b class="block text-white">Título</b>texto curto.</p></div>
  <div class="card flex flex-col gap-4 p-5 text-white" style="--o:2;--a:2;--r0:-3deg"><span class="num relative block pb-4 text-6xl font-black leading-[.85] text-[#e5432f]">05</span><p class="text-neutral-200"><b class="block text-white">Título</b>texto curto.</p></div>
</div>
<script>
(function () {
  var h = document.getElementById('hand');
  function loop() { var r = h.getBoundingClientRect(), v = (innerHeight * .92 - r.top) / (innerHeight * .5); h.style.setProperty('--s', Math.min(1, Math.max(0, v)).toFixed(4)); requestAnimationFrame(loop); }
  requestAnimationFrame(loop);
})();
</script>`,
    },
  },

  // 12 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-before-after-blade",
    name: "Antes e Depois com Lâmina que Varre",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "Lista 'antes' (cinza e riscada) e 'depois' (vermelha e em negrito) sobrepostas; uma lâmina branca com puxador varre a lista conforme a rolagem (seção presa) revelando o depois, ou segue o mouse na horizontal. Os rótulos acima trocam de intensidade junto. Transformação visível, linha por linha.",
    tags: ["Before After", "Clip-path", "Scroll Pinned", "Mouse Scrub", "Comparison"],
    defaultSection: "Antes e Depois",
    previewType: "gg-before-after",
    tech: ["Tailwind CSS", "React", "CSS Clip-path", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ROWS = [
  ['Estudar a lei inteira sem saber o que cai', 'Resumo em prancha só do que a banca cobra'],
  ['Decorar e esquecer em uma semana', 'Flashcards que fixam de verdade'],
  ['Chegar na prova sem nunca ter treinado', 'Simulados no formato da prova'],
];

export function BeforeAfterBlade({ rows = ROWS }) {
  const secRef = useRef(null), baRef = useRef(null);
  useEffect(() => {
    const sec = secRef.current, ba = baRef.current;
    const set = (p) => { sec.style.setProperty('--p', p.toFixed(4)); ba.dataset.done = p >= 0.999 ? '1' : ''; };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { set(1); return; }
    let hover = null, raf = 0;
    const onMove = (e) => { if (e.pointerType !== 'mouse') return; const r = ba.getBoundingClientRect(); hover = clamp((e.clientX - r.left) / r.width); set(hover); };
    const onLeave = () => { hover = null; };
    ba.addEventListener('pointermove', onMove); ba.addEventListener('pointerleave', onLeave);
    const loop = () => {
      if (hover === null) {
        const r = sec.getBoundingClientRect(), stick = sec.firstElementChild;
        set(clamp((-r.top / (r.height - stick.offsetHeight) - 0.08) / 0.8));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ba.removeEventListener('pointermove', onMove); ba.removeEventListener('pointerleave', onLeave); };
  }, []);
  return (
    <section ref={secRef} className="relative h-[250vh] bg-black text-white [--p:0]">
      <div className="sticky top-0 grid h-screen content-center overflow-hidden px-5">
        <div className="mx-auto mb-3 flex w-full max-w-[980px] justify-between text-xs font-bold uppercase tracking-[.08em]">
          <span className="inline-flex items-center gap-2 text-neutral-500 [opacity:calc(1-var(--p)*.6)]"><i className="h-2.5 w-2.5 rounded-sm bg-[#3a3a3a]" />Antes</span>
          <span className="inline-flex items-center gap-2 text-[#e5432f] [opacity:calc(.35+var(--p)*.65)]"><i className="h-2.5 w-2.5 rounded-sm bg-[#b22314]" />Depois</span>
        </div>
        <div ref={baRef} className="group relative mx-auto w-full max-w-[980px] cursor-ew-resize touch-pan-y overflow-hidden rounded-2xl border border-[#363636] bg-[#0c0c0c]">
          {rows.map(([old, neu], i) => (
            <div key={i} className="grid">
              <div className={'col-start-1 row-start-1 grid grid-cols-[40px_1fr] items-center gap-[18px] bg-[#0d0d0d] px-[clamp(18px,3vw,34px)] py-5 text-neutral-500 ' + (i ? 'border-t border-[#1e1e1e]' : '')}>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#363636] text-[#666]">✕</span>
                <span className="line-through decoration-white/20">{old}</span>
              </div>
              <div className={'col-start-1 row-start-1 grid grid-cols-[40px_1fr] items-center gap-[18px] bg-[#b22314] px-[clamp(18px,3vw,34px)] py-5 font-semibold [clip-path:inset(0_calc((1-var(--p))*100%)_0_0)] ' + (i ? 'border-t border-black/20' : '')}>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-black">✓</span>
                <span>{neu}</span>
              </div>
            </div>
          ))}
          <div className="pointer-events-none absolute inset-y-0 left-[calc(var(--p)*100%)] z-[3] -ml-[1.5px] w-[3px] bg-white transition-opacity duration-500 group-data-[done=1]:opacity-0">
            <div className="absolute left-1/2 top-1/2 -ml-[22px] -mt-7 grid h-14 w-11 place-items-center rounded-[10px] border-[3px] border-[#0b0b0b] bg-white text-[#b22314]">⇆</div>
          </div>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<section id="ba" class="relative h-[250vh] bg-black text-white [--p:0]">
  <div class="ba-stick sticky top-0 grid h-screen content-center overflow-hidden px-5">
    <div class="mx-auto mb-3 flex w-full max-w-[980px] justify-between text-xs font-bold uppercase tracking-[.08em]">
      <span class="text-neutral-500 [opacity:calc(1-var(--p)*.6)]">Antes</span><span class="text-[#e5432f] [opacity:calc(.35+var(--p)*.65)]">Depois</span>
    </div>
    <div class="ba-box relative mx-auto w-full max-w-[980px] cursor-ew-resize overflow-hidden rounded-2xl border border-[#363636] bg-[#0c0c0c]">
      <div class="grid">
        <div class="col-start-1 row-start-1 grid grid-cols-[40px_1fr] items-center gap-[18px] bg-[#0d0d0d] px-8 py-5 text-neutral-500"><span class="grid h-10 w-10 place-items-center rounded-full border border-[#363636]">✕</span><span class="line-through decoration-white/20">Estudar a lei inteira sem saber o que cai</span></div>
        <div class="col-start-1 row-start-1 grid grid-cols-[40px_1fr] items-center gap-[18px] bg-[#b22314] px-8 py-5 font-semibold [clip-path:inset(0_calc((1-var(--p))*100%)_0_0)]"><span class="grid h-10 w-10 place-items-center rounded-full bg-black">✓</span><span>Resumo em prancha só do que a banca cobra</span></div>
      </div>
      <div class="ba-h pointer-events-none absolute inset-y-0 left-[calc(var(--p)*100%)] z-[3] -ml-[1.5px] w-[3px] bg-white transition-opacity duration-500"><div class="absolute left-1/2 top-1/2 -ml-[22px] -mt-7 grid h-14 w-11 place-items-center rounded-[10px] border-[3px] border-[#0b0b0b] bg-white text-[#b22314]">⇆</div></div>
    </div>
  </div>
</section>
<script>
(function () {
  var sec = document.getElementById('ba'), stick = sec.querySelector('.ba-stick'), box = sec.querySelector('.ba-box'), h = sec.querySelector('.ba-h'), hover = null;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function set(p) { sec.style.setProperty('--p', p.toFixed(4)); h.style.opacity = p >= .999 ? 0 : 1; }
  box.addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; var r = box.getBoundingClientRect(); hover = clamp((e.clientX - r.left) / r.width); set(hover); });
  box.addEventListener('pointerleave', function () { hover = null; });
  function loop() { if (hover === null) { var r = sec.getBoundingClientRect(); set(clamp((-r.top / (r.height - stick.offsetHeight) - .08) / .8)); } requestAnimationFrame(loop); }
  requestAnimationFrame(loop);
})();
</script>`,
    },
  },

  // 13 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-guarantee-calendar-stamp",
    name: "Calendário de Garantia com Carimbo",
    category: "oferta",
    categoryLabel: "Oferta & Preço",
    description: "Sete folhas de calendário (com argolas) viram em 3D uma a uma conforme a rolagem, do vermelho escuro para o preto com check; o último dia fica branco. Ao completar, o calendário dá um tranco e cai um carimbo redondo '7 dias de garantia' com escala e giro. Prova visual de risco zero.",
    tags: ["Flip 3D", "Scroll Linked", "Stamp", "Guarantee", "Bounce"],
    defaultSection: "Garantia",
    previewType: "gg-calendar",
    tech: ["Tailwind CSS", "React", "CSS 3D Transforms", "CSS Keyframes"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const CSS = '@keyframes calThud{30%{transform:translateY(5px)}60%{transform:translateY(-2px)}}' +
  '.cal-f{backface-visibility:hidden;-webkit-backface-visibility:hidden;transition:transform .75s cubic-bezier(.22,1,.36,1)}' +
  '.cal-d::before,.cal-d::after{content:"";position:absolute;top:-7px;width:6px;height:16px;border-radius:3px;background:#2a0805;z-index:3}.cal-d::before{left:28%}.cal-d::after{right:28%}';

export function GuaranteeCalendar({ days = 7 }) {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setP(1); return; }
    let raf = 0;
    const loop = () => { const r = ref.current.getBoundingClientRect(); setP(clamp((innerHeight * 0.9 - r.top) / (innerHeight * 0.5))); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const done = p >= 0.995;
  return (
    <div className="bg-[#b22314] px-5 py-20">
      <style>{CSS}</style>
      <div ref={ref} className="relative mx-auto max-w-[900px]">
        <div className="grid grid-cols-7 gap-[clamp(6px,1.2vw,14px)]" style={done ? { animation: 'calThud .5s cubic-bezier(.22,1,.36,1) .32s' } : null}>
          {Array.from({ length: days }).map((_, k) => {
            const on = p >= (k + 1) / (days + 1), lastDay = k === days - 1;
            return (
              <div key={k} className="cal-d relative aspect-[3/4] [perspective:700px]">
                <div className="cal-f absolute inset-0 grid place-items-center rounded-[clamp(8px,1.2vw,14px)] border border-black/20 bg-[#8c1a0e] text-[clamp(1.7rem,4.6vw,3.8rem)] font-black text-black/40" style={{ transform: on ? 'rotateX(180deg)' : 'none' }}>{k + 1}</div>
                <div className={'cal-f absolute inset-0 grid place-items-center rounded-[clamp(8px,1.2vw,14px)] text-[clamp(1.7rem,4.6vw,3.8rem)] font-black ' + (lastDay ? 'bg-white text-[#b22314]' : 'bg-black text-white')} style={{ transform: on ? 'rotateX(0)' : 'rotateX(-180deg)' }}>
                  {k + 1}
                  <svg viewBox="0 0 24 24" className={'absolute right-[9%] top-[9%] w-[24%] ' + (lastDay ? 'text-[#b22314]' : 'text-[#e5432f]')} fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5 9-10" /></svg>
                </div>
              </div>
            );
          })}
        </div>
        <div className={'pointer-events-none absolute -right-[3%] top-1/2 z-[4] grid aspect-square w-[clamp(130px,16vw,184px)] place-items-center content-center rounded-full border-[3px] border-white bg-black text-center text-white outline outline-2 outline-offset-[5px] outline-white transition-[opacity,transform] duration-[200ms,550ms] ease-[ease,cubic-bezier(.2,1.5,.4,1)] max-[700px]:relative max-[700px]:right-auto max-[700px]:top-auto max-[700px]:mx-auto max-[700px]:mt-8 ' + (done ? 'opacity-100' : 'opacity-0')}
          style={{ transform: (window.innerWidth > 700 ? 'translateY(-50%) ' : '') + 'rotate(-14deg) scale(' + (done ? 1 : 2.4) + ')' }}>
          <b className="text-[clamp(3.4rem,6vw,4.75rem)] font-black leading-[.8]">7</b>
          <span className="mt-2 text-[clamp(.6875rem,1.1vw,.875rem)] font-bold uppercase leading-tight tracking-[.12em]">dias de<br />garantia</span>
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `<style>
  .cal-d{position:relative;aspect-ratio:3/4;perspective:700px}
  .cal-d::before,.cal-d::after{content:"";position:absolute;top:-7px;width:6px;height:16px;border-radius:3px;background:#2a0805;z-index:3}.cal-d::before{left:28%}.cal-d::after{right:28%}
  .cal-f{position:absolute;inset:0;border-radius:12px;display:grid;place-items:center;font:900 clamp(1.7rem,4.6vw,3.8rem)/1 system-ui;backface-visibility:hidden;transition:transform .75s cubic-bezier(.22,1,.36,1)}
  .cal-a{background:#8c1a0e;color:rgba(0,0,0,.42);border:1px solid rgba(0,0,0,.18)}.cal-b{background:#000;color:#fff;transform:rotateX(-180deg)}
  .cal-d.is-on .cal-a{transform:rotateX(180deg)}.cal-d.is-on .cal-b{transform:rotateX(0)}.cal-d:last-child .cal-b{background:#fff;color:#b22314}
  .cal.is-done .cal-tiles{animation:thud .5s cubic-bezier(.22,1,.36,1) .32s}@keyframes thud{30%{transform:translateY(5px)}60%{transform:translateY(-2px)}}
  .stamp{position:absolute;right:-3%;top:50%;z-index:4;width:clamp(130px,16vw,184px);aspect-ratio:1;border-radius:50%;display:grid;place-items:center;align-content:center;text-align:center;background:#000;color:#fff;border:3px solid #fff;outline:2px solid #fff;outline-offset:5px;opacity:0;transform:translateY(-50%) rotate(-14deg) scale(2.4);transition:opacity .2s,transform .55s cubic-bezier(.2,1.5,.4,1)}
  .cal.is-done .stamp{opacity:1;transform:translateY(-50%) rotate(-14deg) scale(1)}
</style>
<div class="bg-[#b22314] px-5 py-20">
  <div class="cal relative mx-auto max-w-[900px]" id="cal">
    <div class="cal-tiles grid grid-cols-7 gap-3" id="cal-tiles"></div>
    <div class="stamp"><b class="text-7xl font-black leading-[.8]">7</b><span class="mt-2 text-xs font-bold uppercase tracking-[.12em]">dias de<br>garantia</span></div>
  </div>
</div>
<script>
(function () {
  var cal = document.getElementById('cal'), tiles = document.getElementById('cal-tiles');
  for (var i = 1; i <= 7; i++) tiles.insertAdjacentHTML('beforeend', '<div class="cal-d"><div class="cal-f cal-a">' + i + '</div><div class="cal-f cal-b">' + i + '</div></div>');
  var days = tiles.querySelectorAll('.cal-d');
  function loop() { var r = cal.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * .9 - r.top) / (innerHeight * .5)));
    days.forEach(function (d, k) { d.classList.toggle('is-on', p >= (k + 1) / 8); }); cal.classList.toggle('is-done', p >= .995); requestAnimationFrame(loop); }
  requestAnimationFrame(loop);
})();
</script>`,
    },
  },

  // 14 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-ticket-pricing",
    name: "Cards de Oferta em Formato de Ingresso",
    category: "oferta",
    categoryLabel: "Oferta & Preço",
    description: "Planos lado a lado como ingressos: cabeçalho com raio decorativo, módulos numerados, picote tracejado com dois furos laterais e canhoto com preço grande. Subgrid alinha as linhas entre os cards; o plano em destaque é vermelho com canhoto creme. No hover o ingresso sobe. Vira carrossel com snap no celular.",
    tags: ["Pricing", "Ticket", "Subgrid", "Perforation", "Scroll Snap"],
    defaultSection: "Oferta",
    previewType: "gg-ticket",
    tech: ["Tailwind CSS", "React", "CSS Subgrid"],
    frameworks: {
      react: `const PLANS = [
  { title: 'CHO/2026', desc: 'Curso completo do edital.', mods: [['Resumos em pranchas', 'Toda a lei seca'], ['Flashcards', 'Revisão espaçada'], ['Questões', 'Comentadas']], inst: '12x', val: '0,97', cash: 'ou R$ 10,00 à vista', hot: true },
  { title: 'Em breve', desc: 'Próximo concurso.', mods: [['Resumos', '—'], ['Flashcards', '—'], ['Simulados', '—']], inst: '12x', val: '0,00', cash: 'em breve' },
];

export function TicketPlans({ plans = PLANS }) {
  return (
    <div className="grid grid-flow-col auto-cols-[minmax(280px,84%)] snap-x snap-mandatory gap-x-[22px] overflow-x-auto px-5 pb-3 [scrollbar-width:none] md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:grid-rows-[repeat(5,auto)] md:overflow-visible">
      {plans.map((p) => {
        const bg = p.hot ? 'bg-[#b22314]' : 'bg-[#0e0e0e]', stub = p.hot ? 'bg-[#f2efe8] text-[#0b0b0b]' : 'bg-[#171717] text-white', muted = p.hot ? 'text-[#5a5a5a]' : 'text-neutral-400';
        return (
          <article key={p.title} className="group relative row-span-5 grid snap-start grid-rows-subgrid transition-[translate] duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:hover:-translate-y-1.5">
            <div className={'relative grid content-start justify-items-start gap-3 overflow-hidden rounded-t-[20px] border-b px-7 pb-5 pt-7 text-white ' + bg + (p.hot ? ' border-transparent' : ' border-white/[.07]')}>
              <svg viewBox="0 0 24 24" className={'absolute -right-6 -top-7 w-[120px] rotate-[14deg] transition-transform duration-700 group-hover:translate-y-2.5 group-hover:rotate-[4deg] ' + (p.hot ? 'text-[#8c1a0e]' : 'text-[#1f0c09]')} fill="currentColor"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>
              <h3 className="relative text-3xl font-extrabold">{p.title}</h3>
              <p className={'relative ' + (p.hot ? 'text-white' : 'text-neutral-400')}>{p.desc}</p>
            </div>
            <ol className={'grid content-start px-7 pb-4 pt-1.5 text-white ' + bg}>
              {p.mods.map(([b, s], i) => (
                <li key={b} className={'group/m grid grid-cols-[40px_1fr] gap-3 py-3.5 ' + (i ? 'border-t border-white/[.07]' : '')}>
                  <span className={'text-2xl font-black transition-transform duration-500 group-hover/m:translate-x-1 ' + (p.hot ? 'text-white' : 'text-[#e5432f]')}>{String(i + 1).padStart(2, '0')}</span>
                  <span><b className="block">{b}</b><small className={p.hot ? 'text-white/80' : 'text-neutral-400'}>{s}</small></span>
                </li>
              ))}
            </ol>
            {/* picote: metade cor do card, metade cor do canhoto; furos com a cor do fundo da página */}
            <div className={'relative h-[30px] ' + (p.hot ? 'bg-[linear-gradient(#b22314_50%,#f2efe8_50%)]' : 'bg-[linear-gradient(#0e0e0e_50%,#171717_50%)]')}>
              <span className="absolute inset-x-6 top-1/2 -mt-px border-t-2 border-dashed border-[#b22314]" />
              <i className="absolute -left-[15px] top-1/2 -mt-[15px] h-[30px] w-[30px] rounded-full bg-black" />
              <i className="absolute -right-[15px] top-1/2 -mt-[15px] h-[30px] w-[30px] rounded-full bg-black" />
            </div>
            <div className={'grid justify-items-center gap-1.5 px-7 pb-1.5 pt-5 text-center ' + stub}>
              <span className={'text-sm font-bold uppercase tracking-[.12em] ' + muted}>{p.inst}</span>
              <span className="flex items-start gap-2 text-[clamp(3.5rem,2.6rem+2.4vw,4.75rem)] font-extrabold leading-[.95] tracking-[-.04em]"><small className="mt-[.3em] text-[.34em] tracking-normal">R$</small>{p.val}</span>
              <span className={muted}>{p.cash}</span>
            </div>
            <div className={'grid content-end rounded-b-[20px] px-7 pb-7 pt-4 ' + stub}>
              <a href="#" className="rounded-lg bg-[#b22314] py-4 text-center text-[13px] font-bold uppercase tracking-[.1em] text-white">Quero este curso</a>
            </div>
          </article>
        );
      })}
    </div>
  );
}`,
      tailwind: `<div class="grid gap-x-[22px] bg-black p-5 md:grid-cols-3 md:grid-rows-[repeat(5,auto)]">
  <article class="group relative row-span-5 grid grid-rows-subgrid transition-[translate] duration-500 hover:-translate-y-1.5">
    <div class="relative grid content-start gap-3 overflow-hidden rounded-t-[20px] bg-[#b22314] px-7 pb-5 pt-7 text-white">
      <svg viewBox="0 0 24 24" class="absolute -right-6 -top-7 w-[120px] rotate-[14deg] text-[#8c1a0e] transition-transform duration-700 group-hover:rotate-[4deg]" fill="currentColor"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>
      <h3 class="relative text-3xl font-extrabold">CHO/2026</h3><p class="relative">Curso completo do edital.</p>
    </div>
    <ol class="grid bg-[#b22314] px-7 pb-4 text-white">
      <li class="grid grid-cols-[40px_1fr] gap-3 py-3.5"><span class="text-2xl font-black">01</span><span><b class="block">Resumos em pranchas</b><small class="text-white/80">Toda a lei seca</small></span></li>
      <li class="grid grid-cols-[40px_1fr] gap-3 border-t border-white/10 py-3.5"><span class="text-2xl font-black">02</span><span><b class="block">Flashcards</b><small class="text-white/80">Revisão espaçada</small></span></li>
    </ol>
    <div class="relative h-[30px] bg-[linear-gradient(#b22314_50%,#f2efe8_50%)]">
      <span class="absolute inset-x-6 top-1/2 -mt-px border-t-2 border-dashed border-[#b22314]"></span>
      <i class="absolute -left-[15px] top-1/2 -mt-[15px] h-[30px] w-[30px] rounded-full bg-black"></i><i class="absolute -right-[15px] top-1/2 -mt-[15px] h-[30px] w-[30px] rounded-full bg-black"></i>
    </div>
    <div class="grid justify-items-center gap-1.5 bg-[#f2efe8] px-7 pt-5 text-center text-[#0b0b0b]">
      <span class="text-sm font-bold uppercase tracking-[.12em] text-[#5a5a5a]">12x</span>
      <span class="flex items-start gap-2 text-7xl font-extrabold leading-[.95] tracking-[-.04em]"><small class="mt-[.3em] text-[.34em]">R$</small>0,97</span>
      <span class="text-[#5a5a5a]">ou R$ 10,00 à vista</span>
    </div>
    <div class="grid rounded-b-[20px] bg-[#f2efe8] px-7 pb-7 pt-4"><a href="#" class="rounded-lg bg-[#b22314] py-4 text-center text-[13px] font-bold uppercase tracking-[.1em] text-white">Quero este curso</a></div>
  </article>
</div>`,
    },
  },

  // 15 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-sliced-photo-3d",
    name: "Fotos em Fatias 3D com Inclinação",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "Duas fotos em profundidades diferentes sobre uma placa vermelha hachurada: entram em 8 fatias que giram até encaixar, o conjunto inclina na direção do mouse (paralaxe entre as fotos), as fatias perto do cursor saltam para frente e um brilho segue o ponteiro, com cantoneiras de mira na frente.",
    tags: ["3D Tilt", "Slices", "Parallax", "Glare", "Mouse Reactive"],
    defaultSection: "Sobre / Autoridade",
    previewType: "gg-photo-3d",
    tech: ["Tailwind CSS", "React", "CSS 3D Transforms", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const N = 8, SW = 100 / N + 0.2; // um fio de sobra em cada fatia esconde as emendas
const CSS = '.p3-s{position:absolute;top:0;bottom:0;overflow:hidden;transform:translateZ(var(--z,0px));rotate:0 1 0 -88deg;opacity:0;transition:rotate 1.1s cubic-bezier(.22,1,.36,1),opacity .5s;transition-delay:calc(var(--i)*75ms + .15s)}' +
  '.is-built .p3-s{rotate:0 1 0 0deg;opacity:1}.p3-s img{position:absolute;top:0;height:100%;max-width:none;object-fit:cover;object-position:50% 20%}' +
  '.p3-aim{--c:#b22314;--l:30px;--t:2px;background:linear-gradient(var(--c),var(--c)) 0 0/var(--l) var(--t),linear-gradient(var(--c),var(--c)) 0 0/var(--t) var(--l),linear-gradient(var(--c),var(--c)) 100% 0/var(--l) var(--t),linear-gradient(var(--c),var(--c)) 100% 0/var(--t) var(--l),linear-gradient(var(--c),var(--c)) 0 100%/var(--l) var(--t),linear-gradient(var(--c),var(--c)) 0 100%/var(--t) var(--l),linear-gradient(var(--c),var(--c)) 100% 100%/var(--l) var(--t),linear-gradient(var(--c),var(--c)) 100% 100%/var(--t) var(--l);background-repeat:no-repeat}';

function Slices({ src, idx }) {
  return Array.from({ length: N }).map((_, i) => (
    <span key={i} className="p3-s" style={{ left: (i * 100) / N + '%', width: SW + '%', '--i': i + idx * 5, borderRadius: i === 0 ? '20px 0 0 20px' : i === N - 1 ? '0 20px 20px 0' : 0 }}>
      <img src={src} alt="" style={{ width: 10000 / SW + '%', left: (-(i * 100) / N / SW) * 100 + '%' }} />
    </span>
  ));
}

export function SlicedPhoto3D({ back = { src: '/foto-b.jpg', name: 'Pessoa B' }, front = { src: '/foto-a.jpg', name: 'Pessoa A' } }) {
  const figRef = useRef(null), boxRef = useRef(null), cardRefs = useRef([]);
  const [built, setBuilt] = useState(false);
  useEffect(() => {
    const fig = figRef.current, box = boxRef.current, area = fig.closest('section') || fig;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setBuilt(true); return; }
    const tm = setTimeout(() => setBuilt(true), 250);
    const cards = cardRefs.current.slice().reverse().map((el) => ({ el, slices: el.querySelectorAll('.p3-s'), aim: { mx: 0.5, my: 0.3, over: 0 }, cur: { mx: 0.5, my: 0.3, over: 0 } }));
    const aim = { x: 0, y: 0, mouse: false }, cur = { x: 0, y: 0 };
    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = fig.getBoundingClientRect(); aim.mouse = true;
      aim.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      aim.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      let taken = false; // onde as fotos se cobrem, só a da frente reage
      cards.forEach((c) => { const q = c.el.getBoundingClientRect(), px = (e.clientX - q.left) / q.width, py = (e.clientY - q.top) / q.height, inside = px >= 0 && px <= 1 && py >= 0 && py <= 1;
        c.aim.mx = px; c.aim.my = py; c.aim.over = inside && !taken ? 1 : 0; if (inside) taken = true; });
    };
    const onLeave = () => { aim.mouse = false; cards.forEach((c) => (c.aim.over = 0)); };
    area.addEventListener('pointermove', onMove); area.addEventListener('pointerleave', onLeave);
    const small = window.matchMedia('(max-width:900px)'), t0 = performance.now();
    let raf = 0;
    const frame = (now) => {
      const t = (now - t0) / 1000;
      const tx = aim.mouse ? aim.x : Math.sin(t * 0.6) * 0.45, ty = aim.mouse ? aim.y : Math.sin(t * 0.43) * 0.3;
      cur.x += (tx - cur.x) * 0.07; cur.y += (ty - cur.y) * 0.07;
      const amp = small.matches ? 0.55 : 1;
      box.style.setProperty('--ry', (cur.x * 13 * amp).toFixed(2) + 'deg'); box.style.setProperty('--rx', (-cur.y * 9 * amp).toFixed(2) + 'deg');
      cards.forEach((c) => {
        c.cur.mx += (c.aim.mx - c.cur.mx) * 0.12; c.cur.my += (c.aim.my - c.cur.my) * 0.12; c.cur.over += (c.aim.over - c.cur.over) * 0.08;
        c.el.style.setProperty('--gx', (c.cur.mx * 100).toFixed(1) + '%'); c.el.style.setProperty('--gy', (c.cur.my * 100).toFixed(1) + '%'); c.el.style.setProperty('--gl', c.cur.over.toFixed(3));
        c.slices.forEach((s, k) => { const d = Math.abs((k + 0.5) / N - c.cur.mx) * 2.4; s.style.setProperty('--z', (d < 1 ? (1 - d) * (1 - d) * 38 * c.cur.over : 0).toFixed(1) + 'px'); });
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { clearTimeout(tm); cancelAnimationFrame(raf); area.removeEventListener('pointermove', onMove); area.removeEventListener('pointerleave', onLeave); };
  }, []);

  const card = (p, i, cls) => (
    <div ref={(el) => (cardRefs.current[i] = el)} className={'absolute [transform-style:preserve-3d] ' + cls}>
      <div className="absolute inset-0 [transform-style:preserve-3d]"><Slices src={p.src} idx={i} /></div>
      <div className="pointer-events-none absolute inset-0 rounded-[20px] [opacity:var(--gl,0)] [transform:translateZ(1px)] [background:radial-gradient(circle_at_var(--gx,50%)_var(--gy,30%),rgba(255,255,255,.2),transparent_50%)]" />
      <span className={'absolute border-l-2 border-[#b22314] bg-black/70 px-2.5 py-2 text-[11px] font-bold uppercase tracking-[.08em] text-white transition-opacity delay-[1.2s] duration-500 [transform:translateZ(24px)] ' + (i === 0 ? 'right-3.5 top-3.5 ' : 'bottom-3.5 left-3.5 ') + (built ? 'opacity-100' : 'opacity-0')}>{p.name}</span>
    </div>
  );

  return (
    <figure ref={figRef} className={'m-0 aspect-[10/11] w-full max-w-[520px] [perspective:1100px] ' + (built ? 'is-built' : '')}>
      <style>{CSS}</style>
      <div ref={boxRef} className="relative h-full w-full [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]">
        <div className="absolute inset-0 rounded-[20px] border border-[#b22314]/70 [background:repeating-linear-gradient(-45deg,rgba(178,35,20,.28)_0_2px,transparent_2px_11px)] [transform:translate3d(28px,28px,-80px)_scale(1.06)]" />
        {card(back, 0, 'right-0 top-0 h-[72%] w-[62%] [transform:translateZ(-34px)]')}
        {card(front, 1, 'bottom-0 left-0 h-[78%] w-[58%] [transform:translateZ(34px)]')}
        <div className={'p3-aim pointer-events-none absolute -inset-4 transition-opacity delay-1000 duration-500 [transform:translateZ(60px)] ' + (built ? 'opacity-100' : 'opacity-0')} />
      </div>
    </figure>
  );
}`,
      tailwind: `<!-- versão HTML com uma foto; o script fatia a imagem e liga a inclinação ao mouse -->
<style>
  .p3-s{position:absolute;top:0;bottom:0;overflow:hidden;transform:translateZ(var(--z,0px));rotate:0 1 0 -88deg;opacity:0;transition:rotate 1.1s cubic-bezier(.22,1,.36,1),opacity .5s;transition-delay:calc(var(--i)*75ms + .15s)}
  .is-built .p3-s{rotate:0 1 0 0deg;opacity:1}.p3-s img{position:absolute;top:0;height:100%;max-width:none;object-fit:cover}
</style>
<section class="grid min-h-[80vh] place-items-center bg-black p-10">
  <figure id="p3" class="m-0 aspect-[10/11] w-full max-w-[420px] [perspective:1100px]">
    <div class="p3-box relative h-full w-full [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]">
      <div class="absolute inset-0 rounded-[20px] border border-[#b22314]/70 [background:repeating-linear-gradient(-45deg,rgba(178,35,20,.28)_0_2px,transparent_2px_11px)] [transform:translate3d(28px,28px,-80px)_scale(1.06)]"></div>
      <div class="p3-card absolute inset-0 [transform-style:preserve-3d] [transform:translateZ(34px)]" data-src="/foto.jpg"></div>
    </div>
  </figure>
</section>
<script>
(function () {
  var fig = document.getElementById('p3'), box = fig.querySelector('.p3-box'), card = fig.querySelector('.p3-card'), N = 8, w = 100 / N + .2, slices = [];
  for (var i = 0; i < N; i++) { var s = document.createElement('span'); s.className = 'p3-s'; s.style.cssText = 'left:' + i * 100 / N + '%;width:' + w + '%;--i:' + i;
    s.innerHTML = '<img src="' + card.dataset.src + '" alt="" style="width:' + 10000 / w + '%;left:' + (-(i * 100 / N) / w * 100) + '%">'; card.appendChild(s); slices.push(s); }
  setTimeout(function () { fig.classList.add('is-built'); }, 250);
  var aim = { x: 0, y: 0, m: false, mx: .5, over: 0 }, cur = { x: 0, y: 0, mx: .5, over: 0 }, t0 = performance.now();
  fig.parentElement.addEventListener('pointermove', function (e) { var r = fig.getBoundingClientRect(); aim.m = true; aim.x = Math.max(-1, Math.min(1, (e.clientX - r.left) / r.width * 2 - 1)); aim.y = Math.max(-1, Math.min(1, (e.clientY - r.top) / r.height * 2 - 1)); aim.mx = (e.clientX - r.left) / r.width; aim.over = aim.mx >= 0 && aim.mx <= 1 ? 1 : 0; });
  fig.parentElement.addEventListener('pointerleave', function () { aim.m = false; aim.over = 0; });
  function frame(now) { var t = (now - t0) / 1000;
    cur.x += ((aim.m ? aim.x : Math.sin(t * .6) * .45) - cur.x) * .07; cur.y += ((aim.m ? aim.y : Math.sin(t * .43) * .3) - cur.y) * .07; cur.mx += (aim.mx - cur.mx) * .12; cur.over += (aim.over - cur.over) * .08;
    box.style.setProperty('--ry', cur.x * 13 + 'deg'); box.style.setProperty('--rx', -cur.y * 9 + 'deg');
    slices.forEach(function (s, k) { var d = Math.abs((k + .5) / N - cur.mx) * 2.4; s.style.setProperty('--z', (d < 1 ? (1 - d) * (1 - d) * 38 * cur.over : 0) + 'px'); });
    requestAnimationFrame(frame); }
  requestAnimationFrame(frame);
})();
</script>`,
    },
  },

  // 16 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-pinned-horizontal-timeline",
    name: "Linha do Tempo Horizontal Presa",
    category: "etapas",
    categoryLabel: "Etapas & Linha do Tempo",
    description: "A seção fica presa e a rolagem vertical empurra uma trilha de painéis na horizontal; em cima, uma régua com 4 nós numerados se preenche de vermelho e cada nó acende quando sua etapa chega. Só o painel ativo fica em 100% e ganha borda vermelha. Passo a passo com sensação de avanço.",
    tags: ["Horizontal Scroll", "Scroll Pinned", "Timeline", "Steps", "Progress"],
    defaultSection: "Como Funciona",
    previewType: "gg-htimeline",
    tech: ["Tailwind CSS", "React", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const STEPS = [
  { label: 'Você entende', title: 'Resumos em pranchas', text: 'A lei seca organizada na ordem do edital.' },
  { label: 'Você fixa', title: 'Flashcards', text: 'Revisão rápida do que mais cai.' },
  { label: 'Você treina', title: 'Questões comentadas', text: 'Cada alternativa explicada.' },
  { label: 'Você se testa', title: 'Simulados', text: 'No formato e no tempo da prova.' },
];

export function PinnedTimeline({ steps = STEPS }) {
  const secRef = useRef(null), stickRef = useRef(null), vpRef = useRef(null), trackRef = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const sec = secRef.current, stick = stickRef.current, vp = vpRef.current, track = trackRef.current;
    let dist = 0, raf = 0;
    const measure = () => { dist = Math.max(0, track.scrollWidth - vp.clientWidth); sec.style.height = stick.offsetHeight + dist + 'px'; };
    measure(); addEventListener('resize', measure);
    const loop = () => {
      const r = sec.getBoundingClientRect(), v = dist ? clamp(-r.top / dist) : 0;
      track.style.transform = 'translate3d(' + (-v * dist).toFixed(1) + 'px,0,0)';
      setP(v); raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', measure); };
  }, []);
  const pos = p * (steps.length - 1), cur = Math.round(pos);
  return (
    <section ref={secRef} className="relative bg-black text-white">
      <div ref={stickRef} className="sticky top-0 grid h-screen content-center gap-10 overflow-hidden py-8">
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-4 px-6">
          <span className="absolute left-[45px] top-[21px] h-0.5 w-[75%] bg-[#363636]" />
          <span className="absolute left-[45px] top-[21px] z-[1] h-0.5 w-[75%] origin-left bg-[#b22314]" style={{ transform: 'scaleX(' + p + ')' }} />
          {steps.map((s, k) => {
            const on = k <= pos + 0.05;
            return (
              <div key={k} className="relative z-[2] flex flex-col items-start gap-2.5">
                <span className={'grid h-11 w-11 place-items-center rounded-full border-2 text-xl font-black transition-colors duration-500 ' + (on ? 'border-[#b22314] bg-[#b22314] text-white' : 'border-[#363636] bg-black text-neutral-500')}>{k + 1}</span>
                <small className={'hidden text-xs font-bold uppercase tracking-[.08em] transition-colors sm:block ' + (on ? 'text-white' : 'text-neutral-500')}>{s.label}</small>
              </div>
            );
          })}
        </div>
        <div ref={vpRef} className="overflow-hidden">
          <div ref={trackRef} className="flex w-max gap-7 px-[max(24px,calc((100vw-1152px)/2))] will-change-transform">
            {steps.map((s, k) => (
              <article key={k} className={'grid w-[min(1000px,84vw)] gap-3 rounded-3xl border bg-[#070707] p-[clamp(20px,3vw,40px)] transition-[opacity,border-color] duration-500 ' + (k === cur ? 'border-[#b22314] opacity-100' : 'border-[#363636] opacity-35')}>
                <span className={'text-[clamp(2.4rem,5vw,4.6rem)] font-black leading-[.9] transition-colors ' + (k === cur ? 'text-[#e5432f]' : 'text-[#2a2a2a]')}>{String(k + 1).padStart(2, '0')}</span>
                <h2 className="text-2xl font-extrabold">{s.title}</h2>
                <p className="max-w-[44ch] text-neutral-300">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<section id="htl" class="relative bg-black text-white">
  <div class="htl-stick sticky top-0 grid h-screen content-center gap-10 overflow-hidden py-8">
    <div class="relative mx-auto grid w-full max-w-6xl grid-cols-4 px-6">
      <span class="absolute left-[45px] top-[21px] h-0.5 w-[75%] bg-[#363636]"></span>
      <span class="htl-fill absolute left-[45px] top-[21px] z-[1] h-0.5 w-[75%] origin-left scale-x-0 bg-[#b22314]"></span>
      <div class="htl-node relative z-[2]"><span class="grid h-11 w-11 place-items-center rounded-full border-2 border-[#363636] bg-black text-xl font-black">1</span></div>
      <div class="htl-node relative z-[2]"><span class="grid h-11 w-11 place-items-center rounded-full border-2 border-[#363636] bg-black text-xl font-black">2</span></div>
      <div class="htl-node relative z-[2]"><span class="grid h-11 w-11 place-items-center rounded-full border-2 border-[#363636] bg-black text-xl font-black">3</span></div>
      <div class="htl-node relative z-[2]"><span class="grid h-11 w-11 place-items-center rounded-full border-2 border-[#363636] bg-black text-xl font-black">4</span></div>
    </div>
    <div class="htl-vp overflow-hidden">
      <div class="htl-track flex w-max gap-7 px-6 will-change-transform">
        <article class="htl-panel w-[84vw] max-w-[1000px] rounded-3xl border border-[#363636] bg-[#070707] p-10 opacity-35 transition"><h2 class="text-2xl font-extrabold">01 · Resumos em pranchas</h2></article>
        <article class="htl-panel w-[84vw] max-w-[1000px] rounded-3xl border border-[#363636] bg-[#070707] p-10 opacity-35 transition"><h2 class="text-2xl font-extrabold">02 · Flashcards</h2></article>
        <article class="htl-panel w-[84vw] max-w-[1000px] rounded-3xl border border-[#363636] bg-[#070707] p-10 opacity-35 transition"><h2 class="text-2xl font-extrabold">03 · Questões</h2></article>
        <article class="htl-panel w-[84vw] max-w-[1000px] rounded-3xl border border-[#363636] bg-[#070707] p-10 opacity-35 transition"><h2 class="text-2xl font-extrabold">04 · Simulados</h2></article>
      </div>
    </div>
  </div>
</section>
<script>
(function () {
  var sec = document.getElementById('htl'), stick = sec.querySelector('.htl-stick'), vp = sec.querySelector('.htl-vp'), track = sec.querySelector('.htl-track'), fill = sec.querySelector('.htl-fill');
  var panels = sec.querySelectorAll('.htl-panel'), nodes = sec.querySelectorAll('.htl-node span'), dist = 0;
  function measure() { dist = Math.max(0, track.scrollWidth - vp.clientWidth); sec.style.height = stick.offsetHeight + dist + 'px'; }
  measure(); addEventListener('resize', measure);
  function loop() {
    var r = sec.getBoundingClientRect(), p = dist ? Math.min(1, Math.max(0, -r.top / dist)) : 0, pos = p * (panels.length - 1), cur = Math.round(pos);
    track.style.transform = 'translate3d(' + (-p * dist) + 'px,0,0)'; fill.style.transform = 'scaleX(' + p + ')';
    panels.forEach(function (el, k) { el.classList.toggle('opacity-35', k !== cur); el.classList.toggle('border-[#b22314]', k === cur); });
    nodes.forEach(function (n, k) { var on = k <= pos + .05; n.classList.toggle('bg-[#b22314]', on); n.classList.toggle('border-[#b22314]', on); });
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
</script>`,
    },
  },

  // 17 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-struck-word-notice",
    name: "Palavra Gigante Riscada em Vermelho",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "Uma palavra enorme em cinza escuro (ex.: VIDEOAULA) é cortada por um traço vermelho inclinado que cresce da esquerda para a direita quando o bloco entra na tela, ao lado de um texto explicativo. Aviso de 'isto não é' direto, com força gráfica.",
    tags: ["Strike Through", "Big Type", "Reveal", "Scale X", "Statement"],
    defaultSection: "Aviso / Diferencial",
    previewType: "gg-strike",
    tech: ["Tailwind CSS", "React", "CSS Transitions", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export function StruckWord({ word = 'Videoaula', title = 'Aqui não tem videoaula de 4 horas.', text = 'Você estuda por resumos, flashcards e questões: direto ao ponto.' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="grid items-center gap-[clamp(20px,3.4vw,52px)] py-[clamp(20px,2.4vw,30px)] sm:grid-cols-[auto_minmax(0,1fr)]">
      <span className="relative justify-self-start text-[clamp(2.6rem,5vw,4.5rem)] font-black uppercase leading-[.9] text-[#2f2f2f]">
        {word}
        <i className={'absolute -left-[5%] -right-[5%] top-1/2 -mt-0.5 h-[5px] origin-left bg-[#b22314] transition-transform delay-[350ms] duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)] ' + (inView ? '[transform:rotate(-5deg)_scaleX(1)]' : '[transform:rotate(-5deg)_scaleX(0)]')} />
      </span>
      <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-neutral-400">
        <b className="mb-1 block text-[clamp(1.0625rem,1rem+.3vw,1.25rem)] font-bold leading-snug text-white">{title}</b>{text}
      </p>
    </div>
  );
}`,
      tailwind: `<div id="novid" class="grid items-center gap-10 bg-black px-6 py-8 sm:grid-cols-[auto_minmax(0,1fr)]">
  <span class="relative justify-self-start text-7xl font-black uppercase leading-[.9] text-[#2f2f2f]">Videoaula
    <i class="novid-line absolute -left-[5%] -right-[5%] top-1/2 -mt-0.5 h-[5px] origin-left bg-[#b22314] transition-transform delay-[350ms] duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)] [transform:rotate(-5deg)_scaleX(0)]"></i>
  </span>
  <p class="max-w-[52ch] text-neutral-400"><b class="mb-1 block text-xl text-white">Aqui não tem videoaula de 4 horas.</b>Você estuda por resumos, flashcards e questões.</p>
</div>
<script>
  new IntersectionObserver(function (e, io) { if (e[0].isIntersecting) { document.querySelector('.novid-line').style.transform = 'rotate(-5deg) scaleX(1)'; io.disconnect(); } }, { threshold: .12 }).observe(document.getElementById('novid'));
</script>`,
    },
  },

  // 18 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "golgota-red-bar-accordion",
    name: "FAQ com Barra Vermelha e Mais/Menos",
    category: "faq",
    categoryLabel: "FAQ",
    description: "Perguntas em cartões escuros; ao abrir, uma barra vermelha cresce na lateral esquerda, a borda fica avermelhada, o ícone de + gira e vira − num quadrado vermelho e a resposta desliza (grid-template-rows) com o texto subindo e aparecendo. Acordeão limpo e acessível.",
    tags: ["FAQ", "Accordion", "Grid Rows", "Icon Morph", "Acessível"],
    defaultSection: "Perguntas Frequentes",
    previewType: "gg-faq",
    tech: ["Tailwind CSS", "React", "CSS Grid Transition"],
    frameworks: {
      react: `import { useState } from 'react';

const FAQ = [
  { q: 'Por quanto tempo tenho acesso?', a: 'Até o dia da prova do seu concurso.' },
  { q: 'Quais as formas de pagamento?', a: 'Pix e cartão de crédito.' },
  { q: 'Tem garantia?', a: 'Sim, 7 dias de garantia incondicional.' },
];

export function RedBarAccordion({ items = FAQ }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="mx-auto grid max-w-[860px] gap-2.5">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={i} className={'relative overflow-hidden rounded-[18px] border transition-colors duration-500 ' + (on ? 'border-[#b22314]/60 bg-black' : 'border-[#262626] bg-[#0f0f0f] hover:border-[#363636]')}>
            <span className={'absolute inset-y-0 left-0 w-1 origin-center bg-[#b22314] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ' + (on ? 'scale-y-100' : 'scale-y-0')} />
            <button aria-expanded={on} onClick={() => setOpen(on ? -1 : i)} className="group grid min-h-11 w-full grid-cols-[minmax(0,1fr)_40px] items-center gap-4 px-[clamp(16px,2.4vw,24px)] py-[18px] text-left text-[clamp(1.0625rem,1rem+.2vw,1.1875rem)] font-semibold leading-snug text-white">
              {it.q}
              <span className={'relative grid h-10 w-10 place-items-center rounded-xl border transition-colors duration-500 ' + (on ? 'border-[#b22314] bg-[#b22314]' : 'border-[#363636] group-hover:border-[#b22314]')}>
                <i className={'absolute h-0.5 w-3.5 rounded bg-white transition-transform duration-500 ' + (on ? 'rotate-180' : '')} />
                <i className={'absolute h-0.5 w-3.5 rounded bg-white transition-transform duration-500 ' + (on ? 'rotate-0' : 'rotate-90')} />
              </span>
            </button>
            <div className={'grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ' + (on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')} aria-hidden={!on}>
              <div className="overflow-hidden">
                <p className={'max-w-[70ch] px-[clamp(16px,2.4vw,24px)] pb-[22px] text-neutral-400 transition-[opacity,transform] duration-500 ' + (on ? 'translate-y-0 opacity-100 delay-100' : '-translate-y-2 opacity-0')}>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}`,
      tailwind: `<div class="faq mx-auto grid max-w-[860px] gap-2.5 bg-black p-5">
  <div class="faq-item relative overflow-hidden rounded-[18px] border border-[#262626] bg-[#0f0f0f] transition-colors duration-500">
    <span class="faq-bar absolute inset-y-0 left-0 w-1 scale-y-0 bg-[#b22314] transition-transform duration-500"></span>
    <button aria-expanded="false" class="faq-q grid w-full grid-cols-[1fr_40px] items-center gap-4 px-6 py-[18px] text-left text-lg font-semibold text-white">
      Por quanto tempo tenho acesso?
      <span class="faq-pm relative grid h-10 w-10 place-items-center rounded-xl border border-[#363636] transition-colors duration-500">
        <i class="faq-a1 absolute h-0.5 w-3.5 bg-white transition-transform duration-500"></i><i class="faq-a2 absolute h-0.5 w-3.5 rotate-90 bg-white transition-transform duration-500"></i>
      </span>
    </button>
    <div class="faq-ans grid grid-rows-[0fr] transition-[grid-template-rows] duration-500"><div class="overflow-hidden"><p class="px-6 pb-[22px] text-neutral-400">Até o dia da prova do seu concurso.</p></div></div>
  </div>
</div>
<script>
  document.querySelectorAll('.faq-item').forEach(function (it) {
    it.querySelector('.faq-q').addEventListener('click', function () {
      var on = this.getAttribute('aria-expanded') !== 'true'; this.setAttribute('aria-expanded', on);
      it.classList.toggle('border-[#b22314]/60', on); it.classList.toggle('bg-black', on);
      it.querySelector('.faq-bar').classList.toggle('scale-y-0', !on);
      it.querySelector('.faq-pm').classList.toggle('bg-[#b22314]', on);
      it.querySelector('.faq-a1').classList.toggle('rotate-180', on); it.querySelector('.faq-a2').classList.toggle('rotate-90', !on);
      it.querySelector('.faq-ans').classList.toggle('grid-rows-[1fr]', on); it.querySelector('.faq-ans').classList.toggle('grid-rows-[0fr]', !on);
    });
  });
</script>`,
    },
  },
];
