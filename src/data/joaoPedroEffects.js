// Efeitos extraídos da landing page de João Pedro Marques (pasta "Nossa LP": página de vendas para mentores de concurso)
// Estética neo noir inspirada na Vercel: fundo preto #000, texto #ededed / branco, cinza #a1a1a1, bordas #262626 / #3d3d3d, fonte Geist.
const B = { client: "João Pedro Marques", badge: "João Pedro Marques" };

export const joaoPedroEffects = [
  // 1 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-scroll-video-hero",
    name: "Hero com Vídeo Controlado pela Rolagem",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    description: "O hero fica preso na tela e o vídeo de fundo avança e volta quadro a quadro conforme a rolagem, perseguindo a posição com suavidade em vez de pular. Selo, título, texto e botão entram em etapas definidas por pontos do scroll, e o aviso 'Role para baixo' com mouse animado some assim que a pessoa começa a rolar.",
    tags: ["Scroll Video", "Sticky Hero", "Scrubbing", "Staged Text", "Scroll Cue"],
    defaultSection: "Hero Principal",
    previewType: "jp-scroll-video",
    tech: ["Tailwind CSS", "React", "HTML5 Video", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

// Dica: exporte o vídeo com keyframe a cada ~6 quadros (ffmpeg -g 6) para a rolagem ficar lisa.
// stages: ponto do scroll (0 a 1) em que cada bloco de texto aparece.
export function ScrollVideoHero({
  src = '/video/hero.mp4',
  mobileSrc,
  height = '350vh',
  mobileHeight = '170vh',
  stages = [0, 0, 0.3, 0.5],
  badge = 'Validado por + de 30 mentores de concurso público',
  title = 'O tráfego traz o aluno. É a página que decide se ele compra.',
  lead = 'Uma página construída para vender, com copy e estrutura testadas na prática.',
  cta = 'Quero uma página que venda',
  href = '#',
}) {
  const sec = useRef(null), video = useRef(null);
  const [shown, setShown] = useState(stages.map((s) => s <= 0));
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => { setMob(matchMedia('(max-width: 640px)').matches); }, []);

  const stagesKey = stages.join(','); // dependência estável (o array padrão é recriado a cada render)

  useEffect(() => {
    const S = sec.current, V = video.current, st = stagesKey.split(',').map(Number);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(st.map(() => true)); return; }
    let target = 0, current = 0, raf = 0;
    const progress = () => {
      const total = S.offsetHeight - innerHeight;
      return total > 0 ? Math.min(1, Math.max(0, -S.getBoundingClientRect().top / total)) : 0;
    };
    const update = () => {
      const p = progress();
      setScrolled(p > 0.02);
      const next = st.map((s) => p >= s);
      setShown((prev) => (prev.join() === next.join() ? prev : next)); // só re-renderiza quando muda
      if (V.duration) target = p * (V.duration - 0.05);
    };
    // o vídeo "persegue" o scroll em vez de pular
    const tick = () => {
      if (V.duration) {
        current += (target - current) * 0.18;
        if (Math.abs(V.currentTime - current) > 0.01 && !V.seeking) V.currentTime = current;
      }
      raf = requestAnimationFrame(tick);
    };
    // iPhone só carrega os quadros depois de um play: dá play e pausa na hora
    const prime = () => { const pr = V.play(); if (pr && pr.then) pr.then(() => V.pause()).catch(() => {}); else V.pause(); };
    V.pause(); prime();
    addEventListener('touchstart', prime, { once: true, passive: true });
    V.addEventListener('loadedmetadata', update);
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update(); tick();
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', update); removeEventListener('resize', update); removeEventListener('touchstart', prime); V.removeEventListener('loadedmetadata', update); };
  }, [stagesKey]);

  const part = (i) => 'transition-[opacity,transform] duration-500 ease-out ' + (shown[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7');
  return (
    <section ref={sec} className="relative bg-black" style={{ height: mob ? mobileHeight : height }}>
      <style>{'@keyframes jp-hint{50%{transform:translateY(10px);opacity:.2}}@keyframes jp-cue{50%{opacity:.45}}'}</style>
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <video ref={video} muted playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover" src={mob && mobileSrc ? mobileSrc : src} />
        {/* escurece o vídeo para o texto branco ficar legível */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.35),rgba(0,0,0,.75)_75%),linear-gradient(to_bottom,transparent_70%,#000)]" />
        <div className="relative mx-auto max-w-[860px] px-6 text-center">
          <span className={'inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[13px] text-[#ededed] ' + part(0)}>{badge}</span>
          <h1 className={'mt-6 text-[clamp(32px,5vw,60px)] font-semibold leading-[1.05] tracking-[-0.04em] text-white ' + part(1)}>{title}</h1>
          <p className={'mx-auto mt-5 max-w-[620px] text-lg text-[#a1a1a1] ' + part(2)}>{lead}</p>
          <div className={'mt-8 ' + part(3)}>
            <a href={href} className="inline-flex rounded-full bg-white px-[34px] py-[18px] font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,.18)] transition hover:-translate-y-0.5">{cta}</a>
          </div>
        </div>
        <div aria-hidden="true" className={'pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 transition-opacity duration-500 ' + (scrolled ? 'opacity-0' : 'opacity-100')}>
          <span className="text-xs font-medium uppercase tracking-[.16em] text-white/75 motion-safe:animate-[jp-cue_2.4s_ease-in-out_infinite]">Role para baixo</span>
          <div className="relative h-[38px] w-6 rounded-full border-[1.5px] border-white/50">
            <span className="absolute left-1/2 top-[7px] -ml-[1.5px] h-[7px] w-[3px] rounded-sm bg-white motion-safe:animate-[jp-hint_1.6s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<section class="jp-hero relative h-[350vh] bg-black max-sm:h-[170vh]" data-stages="0,0,0.3,0.5">
  <div class="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
    <video class="absolute inset-0 h-full w-full object-cover" muted playsinline preload="auto">
      <source src="video/hero-mobile.mp4" type="video/mp4" media="(max-width: 640px)">
      <source src="video/hero.mp4" type="video/mp4">
    </video>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.35),rgba(0,0,0,.75)_75%),linear-gradient(to_bottom,transparent_70%,#000)]"></div>
    <div class="jp-copy relative mx-auto max-w-[860px] px-6 text-center">
      <span class="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[13px] text-[#ededed]">Validado por + de 30 mentores</span>
      <h1 class="mt-6 text-[clamp(32px,5vw,60px)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">O tráfego traz o aluno. É a página que decide se ele compra.</h1>
      <p class="mx-auto mt-5 max-w-[620px] text-lg text-[#a1a1a1]">Uma página construída para vender.</p>
      <div class="mt-8"><a href="#" class="inline-flex rounded-full bg-white px-[34px] py-[18px] font-semibold text-black">Quero uma página que venda</a></div>
    </div>
    <div class="jp-cue pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 transition-opacity duration-500" aria-hidden="true">
      <span class="jp-cue-t text-xs font-medium uppercase tracking-[.16em] text-white/75">Role para baixo</span>
      <div class="relative h-[38px] w-6 rounded-full border-[1.5px] border-white/50"><span class="jp-wheel absolute left-1/2 top-[7px] -ml-[1.5px] h-[7px] w-[3px] rounded-sm bg-white"></span></div>
    </div>
  </div>
</section>
<style>
  .jp-copy > *{opacity:0;transform:translateY(28px);transition:opacity .5s ease,transform .5s ease}
  .jp-copy > .is-in{opacity:1;transform:none}
  .jp-hero.is-scrolled .jp-cue{opacity:0}
  .jp-wheel{animation:jp-hint 1.6s ease-in-out infinite}.jp-cue-t{animation:jp-cue 2.4s ease-in-out infinite}
  @keyframes jp-hint{50%{transform:translateY(10px);opacity:.2}}@keyframes jp-cue{50%{opacity:.45}}
  @media (prefers-reduced-motion:reduce){.jp-hero{height:auto}.jp-hero>div{position:relative}.jp-copy>*{opacity:1;transform:none}}
</style>
<script>
(function () {
  var S = document.querySelector('.jp-hero'), V = S.querySelector('video'), parts = S.querySelectorAll('.jp-copy > *');
  var stages = S.dataset.stages.split(',').map(parseFloat), target = 0, current = 0;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { parts.forEach(function (el) { el.classList.add('is-in'); }); return; }
  function progress() { var total = S.offsetHeight - innerHeight; return total > 0 ? Math.min(1, Math.max(0, -S.getBoundingClientRect().top / total)) : 0; }
  function update() {
    var p = progress(); S.classList.toggle('is-scrolled', p > 0.02);
    parts.forEach(function (el, i) { el.classList.toggle('is-in', p >= (isNaN(stages[i]) ? 0.6 : stages[i])); });
    if (V.duration) target = p * (V.duration - 0.05);
  }
  function tick() { if (V.duration) { current += (target - current) * 0.18; if (Math.abs(V.currentTime - current) > 0.01 && !V.seeking) V.currentTime = current; } requestAnimationFrame(tick); }
  function prime() { var pr = V.play(); if (pr && pr.then) pr.then(function () { V.pause(); }).catch(function () {}); else V.pause(); }
  V.pause(); prime();
  addEventListener('touchstart', prime, { once: true, passive: true });
  V.addEventListener('loadedmetadata', update); addEventListener('scroll', update, { passive: true }); addEventListener('resize', update);
  update(); tick();
})();
</script>`,
    },
  },

  // 2 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-vortex-street-bg",
    name: "Fundo de Fluido com Rua de Vórtices",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    description: "Centenas de riscos brancos finos fluem pelo fundo preto como fumaça num túnel de vento; o cursor solta vórtices alternados atrás de si (rua de vórtices de von Kármán) e os riscos giram e brilham em volta deles. Sem mouse, uma órbita lenta faz o papel do cursor e o clique solta um par de redemoinhos. Sofisticado e científico, sempre vivo.",
    tags: ["Canvas", "Fluid", "Vortex", "Particles", "Cursor", "Ambient"],
    defaultSection: "Fundo da Página",
    previewType: "jp-vortex",
    tech: ["Tailwind CSS", "React", "Canvas 2D", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

// Canvas fixo atrás de todo o conteúdo. Coloque uma vez na página; o conteúdo precisa de z-index acima.
export function VortexStreetBackground({ opacity = 0.32 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const TRACERS = innerWidth < 700 ? 320 : 600, MAX_V = 24, CORE_R = 34, AMB_X = 22, AMB_Y = -7;
    const SHED_MIN = 90, SHED_SPACING = 44, SHED_GAMMA = 140, SPEED_LO = 120, SPEED_HI = 800, SHED_TAU = 2.2, PRUNE = 1500;
    const CLICK_GAMMA = 90000, CLICK_LIFE = 3, CLICK_OFF = 16, HOLD = 1.5, DRIVER_EASE = 6, STREAK = 0.055, GLOW_SPEED = 150, TAU = Math.PI * 2;
    let w = 0, h = 0, raf = 0, running = false, last = 0;
    const tx = new Float32Array(TRACERS), ty = new Float32Array(TRACERS);
    const vA = new Uint8Array(MAX_V), vx = new Float32Array(MAX_V), vy = new Float32Array(MAX_V), vg = new Float32Array(MAX_V);
    const vBirth = new Float32Array(MAX_V), vKind = new Uint8Array(MAX_V), vEff = new Float32Array(MAX_V), act = new Int32Array(MAX_V);
    let pX = 0, pY = 0, lastP = -Infinity, dX = 0, dY = 0, dInit = false, sign = 1, travel = 0;

    const slot = () => { let o = 0, ob = Infinity; for (let i = 0; i < MAX_V; i++) { if (!vA[i]) return i; if (vBirth[i] < ob) { ob = vBirth[i]; o = i; } } return o; };
    const spawn = (x, y, g, kind, now) => { const i = slot(); vA[i] = 1; vx[i] = x; vy[i] = y; vg[i] = g; vBirth[i] = now; vKind[i] = kind; };
    const lissX = (t) => w * (0.5 + 0.36 * Math.sin(0.5 * t + 1.3));
    const lissY = (t) => h * (0.5 + 0.34 * Math.sin(0.34 * t));

    const step = (now, dt) => {
      let n = 0;
      for (let i = 0; i < MAX_V; i++) {
        if (!vA[i]) continue;
        const age = now - vBirth[i];
        let eff;
        if (vKind[i] === 1) { if (age >= CLICK_LIFE) { vA[i] = 0; continue; } const k = 1 - age / CLICK_LIFE; eff = vg[i] * k * k; }
        else eff = vg[i] * Math.exp(-age / SHED_TAU);
        if (eff > -PRUNE && eff < PRUNE) { vA[i] = 0; continue; }
        vEff[i] = eff; act[n++] = i;
      }
      // o "motor" segue o cursor (ou uma órbita lenta) e solta vórtices alternados quando anda rápido
      const useP = now - lastP < HOLD, tX = useP ? pX : lissX(now), tY = useP ? pY : lissY(now);
      if (!dInit) { dX = tX; dY = tY; dInit = true; }
      const e = 1 - Math.exp(-DRIVER_EASE * dt), px = dX, py = dY;
      dX += (tX - dX) * e; dY += (tY - dY) * e;
      const ddx = dX - px, ddy = dY - py, dist = Math.hypot(ddx, ddy), speed = dt > 0 ? dist / dt : 0;
      if (speed > SHED_MIN) {
        travel += dist;
        if (travel >= SHED_SPACING) {
          travel -= SHED_SPACING;
          const inv = dist > 0 ? 1 / dist : 0, ux = ddx * inv, uy = ddy * inv, s = Math.min(SPEED_HI, Math.max(SPEED_LO, speed));
          spawn(dX - ux * 12 - uy * 10 * sign, dY - uy * 12 + ux * 10 * sign, sign * SHED_GAMMA * s, 0, now);
          sign = -sign;
        }
      } else travel = 0;

      ctx.globalAlpha = 1; ctx.fillStyle = 'rgba(0,0,0,0.32)'; ctx.fillRect(0, 0, w, h); // rastro curto
      const core2 = CORE_R * CORE_R;
      ctx.lineWidth = 1.1;
      for (let p = 0; p < TRACERS; p++) {
        const x = tx[p], y = ty[p];
        let velX = AMB_X, velY = AMB_Y;
        for (let a = 0; a < n; a++) { // campo de velocidade Lamb-Oseen
          const i = act[a], dx = x - vx[i], dy = y - vy[i];
          let r2 = dx * dx + dy * dy; if (r2 < 1e-6) r2 = 1e-6;
          const f = (vEff[i] * (1 - Math.exp(-r2 / core2))) / (TAU * r2);
          velX += -dy * f; velY += dx * f;
        }
        let nx = x + velX * dt, ny = y + velY * dt;
        if (nx < -6) nx = w + 6; else if (nx > w + 6) nx = -6;
        if (ny < -6) ny = h + 6; else if (ny > h + 6) ny = -6;
        tx[p] = nx; ty[p] = ny;
        const sp = Math.hypot(velX, velY), alpha = sp * 0.003 + 0.08, x0 = nx - velX * STREAK, y0 = ny - velY * STREAK;
        if (sp > GLOW_SPEED) {
          ctx.strokeStyle = 'rgb(225,232,255)'; ctx.lineWidth = 3; ctx.globalAlpha = Math.min(0.4, (sp - GLOW_SPEED) * 0.0016 + 0.12);
          ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(nx, ny); ctx.stroke(); ctx.lineWidth = 1.1;
        }
        ctx.strokeStyle = '#fff'; ctx.globalAlpha = Math.min(0.85, alpha);
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(nx, ny); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };
    const loop = (t) => { const dt = Math.min((t - (last || t)) / 1000, 1 / 30); last = t; step(t / 1000, dt); raf = requestAnimationFrame(loop); };
    const wake = () => { if (!running && !reduced) { running = true; last = 0; raf = requestAnimationFrame(loop); } };
    const sleep = () => { cancelAnimationFrame(raf); running = false; };
    const resize = () => {
      w = innerWidth; h = innerHeight; if (w < 4 || h < 4) return;
      const dpr = Math.min(devicePixelRatio || 1, 1.25); // fundo sutil: não precisa de 2x
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (let p = 0; p < TRACERS; p++) if (!tx[p] && !ty[p]) { tx[p] = Math.random() * w; ty[p] = Math.random() * h; }
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h);
      wake();
    };
    const move = (e) => { if (e.pointerType === 'touch') return; pX = e.clientX; pY = e.clientY; lastP = performance.now() / 1000; };
    const down = (e) => { const now = performance.now() / 1000; spawn(e.clientX - CLICK_OFF, e.clientY, CLICK_GAMMA, 1, now); spawn(e.clientX + CLICK_OFF, e.clientY, -CLICK_GAMMA, 1, now); pX = e.clientX; pY = e.clientY; lastP = now; };
    const vis = () => (document.hidden ? sleep() : wake());
    let rt = 0; const onResize = () => { clearTimeout(rt); rt = setTimeout(resize, 150); };
    addEventListener('pointermove', move, { passive: true }); addEventListener('pointerdown', down, { passive: true });
    document.addEventListener('visibilitychange', vis); addEventListener('resize', onResize);
    resize();
    return () => { sleep(); removeEventListener('pointermove', move); removeEventListener('pointerdown', down); document.removeEventListener('visibilitychange', vis); removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" style={{ opacity }} />;
}`,
      tailwind: `<canvas data-street aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[.32]"></canvas>
<main class="relative z-[1] bg-transparent text-white">Seu conteúdo</main>
<script>
(function () {
  var canvas = document.querySelector('[data-street]'), ctx = canvas.getContext('2d'); if (!ctx) return;
  var TR = innerWidth < 700 ? 320 : 600, MAXV = 24, CORE = 34, AX = 22, AY = -7, TAU = Math.PI * 2;
  var w = 0, h = 0, last = 0, tx = new Float32Array(TR), ty = new Float32Array(TR);
  var vA = new Uint8Array(MAXV), vx = new Float32Array(MAXV), vy = new Float32Array(MAXV), vg = new Float32Array(MAXV), vB = new Float32Array(MAXV), vK = new Uint8Array(MAXV), vE = new Float32Array(MAXV), act = new Int32Array(MAXV);
  var pX = 0, pY = 0, lastP = -1e9, dX = 0, dY = 0, dInit = false, sign = 1, travel = 0;
  function slot() { var o = 0, ob = 1e9; for (var i = 0; i < MAXV; i++) { if (!vA[i]) return i; if (vB[i] < ob) { ob = vB[i]; o = i; } } return o; }
  function spawn(x, y, g, k, now) { var i = slot(); vA[i] = 1; vx[i] = x; vy[i] = y; vg[i] = g; vB[i] = now; vK[i] = k; }
  function step(now, dt) {
    var n = 0, i;
    for (i = 0; i < MAXV; i++) { if (!vA[i]) continue; var age = now - vB[i], eff; if (vK[i] === 1) { if (age >= 3) { vA[i] = 0; continue; } var k = 1 - age / 3; eff = vg[i] * k * k; } else eff = vg[i] * Math.exp(-age / 2.2); if (eff > -1500 && eff < 1500) { vA[i] = 0; continue; } vE[i] = eff; act[n++] = i; }
    var useP = now - lastP < 1.5, tX = useP ? pX : w * (0.5 + 0.36 * Math.sin(0.5 * now + 1.3)), tY = useP ? pY : h * (0.5 + 0.34 * Math.sin(0.34 * now));
    if (!dInit) { dX = tX; dY = tY; dInit = true; }
    var e = 1 - Math.exp(-6 * dt), px = dX, py = dY; dX += (tX - dX) * e; dY += (tY - dY) * e;
    var ddx = dX - px, ddy = dY - py, dist = Math.hypot(ddx, ddy), sp0 = dt > 0 ? dist / dt : 0;
    if (sp0 > 90) { travel += dist; if (travel >= 44) { travel -= 44; var inv = dist ? 1 / dist : 0, ux = ddx * inv, uy = ddy * inv, s = Math.min(800, Math.max(120, sp0)); spawn(dX - ux * 12 - uy * 10 * sign, dY - uy * 12 + ux * 10 * sign, sign * 140 * s, 0, now); sign = -sign; } } else travel = 0;
    ctx.globalAlpha = 1; ctx.fillStyle = 'rgba(0,0,0,0.32)'; ctx.fillRect(0, 0, w, h); ctx.lineWidth = 1.1;
    for (var p = 0; p < TR; p++) {
      var x = tx[p], y = ty[p], vX = AX, vY = AY;
      for (var a = 0; a < n; a++) { i = act[a]; var dx = x - vx[i], dy = y - vy[i], r2 = Math.max(1e-6, dx * dx + dy * dy), f = vE[i] * (1 - Math.exp(-r2 / (CORE * CORE))) / (TAU * r2); vX += -dy * f; vY += dx * f; }
      var nx = x + vX * dt, ny = y + vY * dt; if (nx < -6) nx = w + 6; else if (nx > w + 6) nx = -6; if (ny < -6) ny = h + 6; else if (ny > h + 6) ny = -6; tx[p] = nx; ty[p] = ny;
      var sp = Math.hypot(vX, vY), x0 = nx - vX * 0.055, y0 = ny - vY * 0.055;
      if (sp > 150) { ctx.strokeStyle = 'rgb(225,232,255)'; ctx.lineWidth = 3; ctx.globalAlpha = Math.min(0.4, (sp - 150) * 0.0016 + 0.12); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(nx, ny); ctx.stroke(); ctx.lineWidth = 1.1; }
      ctx.strokeStyle = '#fff'; ctx.globalAlpha = Math.min(0.85, sp * 0.003 + 0.08); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(nx, ny); ctx.stroke();
    }
  }
  function loop(t) { var dt = Math.min((t - (last || t)) / 1000, 1 / 30); last = t; if (!document.hidden) step(t / 1000, dt); requestAnimationFrame(loop); }
  function resize() { w = innerWidth; h = innerHeight; var dpr = Math.min(devicePixelRatio || 1, 1.25); canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); for (var p = 0; p < TR; p++) if (!tx[p] && !ty[p]) { tx[p] = Math.random() * w; ty[p] = Math.random() * h; } ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h); }
  addEventListener('pointermove', function (e) { if (e.pointerType === 'touch') return; pX = e.clientX; pY = e.clientY; lastP = performance.now() / 1000; }, { passive: true });
  addEventListener('pointerdown', function (e) { var now = performance.now() / 1000; spawn(e.clientX - 16, e.clientY, 90000, 1, now); spawn(e.clientX + 16, e.clientY, -90000, 1, now); }, { passive: true });
  addEventListener('resize', resize); resize();
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(loop);
})();
</script>`,
    },
  },

  // 3 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-gridbloom-webgl",
    name: "Grade WebGL que Floresce e Foge do Mouse (GridBloom)",
    category: "hero-fundos",
    categoryLabel: "Heróis & Fundos",
    description: "Uma grade fina de linhas brancas flui na diagonal por trás da faixa de CTA, com nós que acendem aleatoriamente, um pulso que respira em ondas a partir do centro e uma luz que segue o mouse empurrando a grade para fora. Fica bem sutil (opacidade 0.2), com uma sombra no centro para o texto ler bem. Tecnológico e premium sem roubar a atenção.",
    tags: ["WebGL", "Shader", "Grid", "Simplex Noise", "Mouse Repel", "CTA Band"],
    defaultSection: "CTA Final",
    previewType: "jp-gridbloom",
    tech: ["Tailwind CSS", "React", "WebGL", "GLSL"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const FS = [
  'precision highp float;',
  'uniform float iTime;uniform vec2 iResolution;uniform vec2 iMouse;uniform float uMouseActive;',
  'const float uSpeed=0.6;const float uGridScale=11.;',
  'vec3 permute(vec3 x){return mod(((x*34.0)+10.0)*x,289.0);}',
  'float snoise(vec2 v){',
  '  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);',
  '  vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);',
  '  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);',
  '  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.0);',
  '  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));',
  '  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;',
  '  vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;',
  '  m*=1.792843-0.853735*(a0*a0+h*h);',
  '  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);',
  '}',
  'void main(){',
  '  vec2 p=(gl_FragCoord.xy-0.5*iResolution)/iResolution.y;',
  '  vec2 mp=(iMouse-0.5*iResolution)/iResolution.y;vec2 md=p-mp;float mdist=length(md);',
  '  float mi=smoothstep(0.9,0.0,mdist)*uMouseActive;',
  '  float nd=snoise(p*1.5+iTime*uSpeed*0.15);',
  '  vec2 dp=p+vec2(nd*0.05)+md*mi*0.5;',
  '  vec2 gp=dp*uGridScale;gp.x+=iTime*uSpeed*-0.2;gp.y+=iTime*uSpeed*-0.4;',
  '  vec2 cell=fract(gp);vec2 cc=abs(cell-0.5);',
  '  vec2 lines=smoothstep(0.5-0.015-0.03,0.5-0.015,cc);',
  '  float ga=max(lines.x,lines.y);float inter=lines.x*lines.y;',
  '  float gm=snoise(floor(gp)*0.4+iTime*uSpeed*0.4);',
  '  float glow=smoothstep(0.2,0.5,cc.x)*smoothstep(0.2,0.5,cc.y)*smoothstep(0.3,0.8,gm);',
  '  float pulse=0.5+0.5*sin(length(p)*8.0-iTime*uSpeed*1.5+nd*2.0);',
  '  float a=(ga*0.3)+(inter*0.8)+(glow*0.6);',
  '  a*=(0.6+0.4*snoise(p*4.0-iTime*uSpeed*0.5));a+=a*pulse*0.4;',
  '  a+=smoothstep(0.5,0.0,mdist)*0.6*uMouseActive*ga;',
  '  a=clamp(a*(0.8+0.2*sin(iTime*uSpeed*0.8))*0.5,0.0,1.0);',
  '  gl_FragColor=vec4(vec3(1.)*a,a);',
  '}',
].join('\\n');

export function GridBloomBand({ children, intensity = 0.2 }) {
  const cv = useRef(null);

  useEffect(() => {
    const canvas = cv.current;
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) { canvas.style.background = 'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(255,255,255,.1),transparent 70%)'; return; }
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW); // um triângulo que cobre a tela
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uT = gl.getUniformLocation(prog, 'iTime'), uR = gl.getUniformLocation(prog, 'iResolution'), uM = gl.getUniformLocation(prog, 'iMouse'), uA = gl.getUniformLocation(prog, 'uMouseActive');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const m = { x: -1000, y: -1000, tx: -1000, ty: -1000, a: 0, ta: 0 }, t0 = performance.now(), STILL = 4;
    let dpr = 1, raf = 0, visible = false;
    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr)), h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
    };
    const draw = (t) => {
      m.x += (m.tx - m.x) * 0.1; m.y += (m.ty - m.y) * 0.1; m.a += (m.ta - m.a) * 0.15; // mouse com atraso
      gl.uniform1f(uT, t); gl.uniform2f(uR, canvas.width, canvas.height); gl.uniform2f(uM, m.x * dpr, m.y * dpr); gl.uniform1f(uA, m.a);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const frame = (now) => { raf = 0; if (!visible) return; draw(STILL + (now - t0) / 1000); raf = requestAnimationFrame(frame); };
    const move = (e) => {
      if (!visible || reduce) return;
      const r = canvas.getBoundingClientRect(), inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      m.ta = inside ? 1 : 0;
      if (inside) { m.tx = e.clientX - r.left; m.ty = r.bottom - e.clientY; if (m.x < -500) { m.x = m.tx; m.y = m.ty; } }
    };
    const onResize = () => { size(); draw(STILL + (performance.now() - t0) / 1000); };
    size(); draw(STILL);
    addEventListener('pointermove', move, { passive: true }); addEventListener('resize', onResize);
    let io;
    if (!reduce) { io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); }); io.observe(canvas); }
    return () => { if (io) io.disconnect(); cancelAnimationFrame(raf); removeEventListener('pointermove', move); removeEventListener('resize', onResize); };
  }, []);

  return (
    <section className="relative isolate overflow-hidden border-y border-[#161616] bg-[radial-gradient(ellipse_70%_120%_at_50%_0%,rgba(255,255,255,.04),transparent_60%),#050505] py-[90px] text-center text-white md:py-[120px]">
      <canvas ref={cv} aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full" style={{ opacity: intensity }} />
      {/* sombra no meio para o texto ficar legível em cima da grade */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_40%_50%_at_50%_50%,rgba(5,5,5,.7),transparent_100%)]" />
      <div className="mx-auto max-w-[860px] px-6">
        {children || (<>
          <h2 className="text-[clamp(28px,3.2vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em]">Sua mentoria merece uma página à altura.</h2>
          <p className="mt-4 text-[clamp(17px,1.4vw,20px)] text-[#a1a1a1]">Vamos conversar sobre o seu projeto.</p>
        </>)}
      </div>
    </section>
  );
}`,
      tailwind: `<section class="relative isolate overflow-hidden border-y border-[#161616] bg-[#050505] py-[120px] text-center text-white">
  <canvas data-grid-bloom aria-hidden="true" class="absolute inset-0 -z-20 h-full w-full opacity-20"></canvas>
  <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_40%_50%_at_50%_50%,rgba(5,5,5,.7),transparent_100%)]"></div>
  <h2 class="text-[clamp(28px,3.2vw,44px)] font-semibold tracking-[-0.03em]">Sua mentoria merece uma página à altura.</h2>
</section>
<script>
(function () {
  var canvas = document.querySelector('[data-grid-bloom]'), gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) return;
  var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FS = ['precision highp float;uniform float iTime;uniform vec2 iResolution;uniform vec2 iMouse;uniform float uMouseActive;',
    'vec3 permute(vec3 x){return mod(((x*34.0)+10.0)*x,289.0);}',
    'float snoise(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.0);vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;m*=1.792843-0.853735*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);}',
    'void main(){vec2 p=(gl_FragCoord.xy-0.5*iResolution)/iResolution.y;vec2 mp=(iMouse-0.5*iResolution)/iResolution.y;vec2 md=p-mp;float mdist=length(md);float mi=smoothstep(0.9,0.0,mdist)*uMouseActive;float nd=snoise(p*1.5+iTime*0.09);vec2 dp=p+vec2(nd*0.05)+md*mi*0.5;vec2 gp=dp*11.;gp.x-=iTime*0.12;gp.y-=iTime*0.24;vec2 cc=abs(fract(gp)-0.5);vec2 l=smoothstep(0.455,0.485,cc);float ga=max(l.x,l.y);float inter=l.x*l.y;float gm=snoise(floor(gp)*0.4+iTime*0.24);float glow=smoothstep(0.2,0.5,cc.x)*smoothstep(0.2,0.5,cc.y)*smoothstep(0.3,0.8,gm);float pulse=0.5+0.5*sin(length(p)*8.0-iTime*0.9+nd*2.0);float a=ga*0.3+inter*0.8+glow*0.6;a*=(0.6+0.4*snoise(p*4.0-iTime*0.3));a+=a*pulse*0.4;a+=smoothstep(0.5,0.0,mdist)*0.6*uMouseActive*ga;a=clamp(a*(0.8+0.2*sin(iTime*0.48))*0.5,0.0,1.0);gl_FragColor=vec4(vec3(a),a);}'].join('\\n');
  function sh(t, s) { var o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; }
  var prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog); gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var uT = gl.getUniformLocation(prog, 'iTime'), uR = gl.getUniformLocation(prog, 'iResolution'), uM = gl.getUniformLocation(prog, 'iMouse'), uA = gl.getUniformLocation(prog, 'uMouseActive');
  var m = { x: -1000, y: -1000, tx: -1000, ty: -1000, a: 0, ta: 0 }, dpr = 1, vis = false, t0 = performance.now();
  function size() { dpr = Math.min(devicePixelRatio || 1, 1.5); canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr)); canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr)); gl.viewport(0, 0, canvas.width, canvas.height); }
  function draw(t) { m.x += (m.tx - m.x) * 0.1; m.y += (m.ty - m.y) * 0.1; m.a += (m.ta - m.a) * 0.15; gl.uniform1f(uT, t); gl.uniform2f(uR, canvas.width, canvas.height); gl.uniform2f(uM, m.x * dpr, m.y * dpr); gl.uniform1f(uA, m.a); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLES, 0, 3); }
  function frame(now) { if (vis) draw(4 + (now - t0) / 1000); requestAnimationFrame(frame); }
  addEventListener('pointermove', function (e) { var r = canvas.getBoundingClientRect(), inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom; m.ta = inside ? 1 : 0; if (inside) { m.tx = e.clientX - r.left; m.ty = r.bottom - e.clientY; if (m.x < -500) { m.x = m.tx; m.y = m.ty; } } }, { passive: true });
  addEventListener('resize', size); size(); draw(4);
  new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(canvas);
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(frame);
})();
</script>`,
    },
  },

  // 4 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-halo-shine-button",
    name: "Botão Branco com Halo e Faixa de Brilho",
    category: "buttons-ctas",
    categoryLabel: "Botões & Ações",
    description: "Um botão pílula branco puro sobre fundo preto, já com um leve brilho em volta. No hover ele sobe e cresce um pouco, ganha um anel de halo e uma sombra de luz forte, enquanto uma faixa escura sutil atravessa o botão em diagonal. Elegante e sem exagero, no estilo minimalista da Vercel.",
    tags: ["CTA", "Hover", "Halo", "Shine Sweep", "Minimal"],
    defaultSection: "CTA Principal",
    previewType: "jp-halo-btn",
    tech: ["Tailwind CSS", "React", "CSS Transitions"],
    frameworks: {
      react: `// Variante clara (padrão, para fundo preto) e escura (dark) para seções brancas.
export function HaloShineButton({ href = '#', children = 'Quero uma página que venda minha mentoria', dark = false, large = true }) {
  const skin = dark
    ? 'bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-[0_0_32px_rgba(0,0,0,.18)] hover:shadow-[0_0_0_5px_rgba(0,0,0,.12),0_10px_50px_rgba(0,0,0,.38)]'
    : 'bg-white text-black border-white shadow-[0_0_32px_rgba(255,255,255,.18)] hover:shadow-[0_0_0_5px_rgba(255,255,255,.12),0_10px_50px_rgba(255,255,255,.38)]';
  const band = dark
    ? 'bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,.12)_46%,rgba(255,255,255,.2)_50%,rgba(255,255,255,.12)_54%,transparent_60%)]'
    : 'bg-[linear-gradient(105deg,transparent_40%,rgba(0,0,0,.1)_46%,rgba(0,0,0,.16)_50%,rgba(0,0,0,.1)_54%,transparent_60%)]';
  return (
    <a href={href}
      className={'group relative isolate inline-flex items-center justify-center gap-2.5 rounded-full border text-center font-semibold leading-tight tracking-[-0.01em] transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[.99] ' + (large ? 'px-[34px] py-[18px] text-base ' : 'px-[26px] py-[14px] text-[15px] ') + skin}>
      {/* faixa de brilho: fundo 300% parado à direita; no hover corre para a esquerda */}
      <span aria-hidden="true" className={'pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[length:300%_100%] bg-[position:100%_0] bg-no-repeat group-hover:bg-[position:0_0] group-hover:transition-[background-position] group-hover:duration-[750ms] group-hover:ease-[cubic-bezier(.3,.6,.2,1)] ' + band} />
      {children}
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-[3px]" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </a>
  );
}`,
      tailwind: `<a href="#" class="jp-btn group relative isolate inline-flex items-center justify-center gap-2.5 rounded-full border border-white bg-white px-[34px] py-[18px] text-base font-semibold leading-tight tracking-[-0.01em] text-black shadow-[0_0_32px_rgba(255,255,255,.18)] transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_0_5px_rgba(255,255,255,.12),0_10px_50px_rgba(255,255,255,.38)] active:scale-[.99]">
  Quero uma página que venda minha mentoria
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-200 group-hover:translate-x-[3px]"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
</a>
<style>
  .jp-btn::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;pointer-events:none;background:linear-gradient(105deg,transparent 40%,rgba(0,0,0,.1) 46%,rgba(0,0,0,.16) 50%,rgba(0,0,0,.1) 54%,transparent 60%) 100% 0/300% 100% no-repeat}
  .jp-btn:hover::before{background-position:0 0;transition:background-position .75s cubic-bezier(.3,.6,.2,1)}
</style>`,
    },
  },

  // 5 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-count-up-stats",
    name: "Números que Contam do Zero ao Aparecer",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    description: "Os números de autoridade começam em 0 e sobem até o valor final com desaceleração forte (easeOutQuart) quando entram na tela, esperando o card terminar de aparecer antes de contar. O sufixo ('+', '%') fica fixo do lado. Simples, mas dá peso de prova real aos números.",
    tags: ["Counter", "Count Up", "Stats", "IntersectionObserver", "Ease Out"],
    defaultSection: "Sobre / Números",
    previewType: "jp-count-up",
    tech: ["Tailwind CSS", "React", "requestAnimationFrame", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

export function CountUp({ to = 100, suffix = '+', duration = 2200, delay = 350 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(to); return; }
    let raf = 0, timer = 0;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      // espera o card terminar de aparecer antes de contar
      timer = setTimeout(() => {
        let start = null;
        const frame = (ts) => {
          if (start === null) start = ts;
          const t = Math.min(1, (ts - start) / duration), eased = 1 - Math.pow(1 - t, 4);
          setVal(Math.round(to * eased));
          if (t < 1) raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);
      }, delay);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [to, duration, delay]);

  return <b ref={ref} className="tabular-nums">{val}{suffix}</b>;
}

export function StatsRow({ stats = [[30, '+', 'mentores atendidos'], [5, '', 'anos de experiência'], [100, '%', 'feito sob medida']] }) {
  return (
    <div className="grid grid-cols-3 gap-6 bg-black p-10 text-center">
      {stats.map(([n, s, label]) => (
        <div key={label} className="rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-6">
          <div className="text-[44px] font-semibold leading-none tracking-[-0.04em] text-white"><CountUp to={n} suffix={s} /></div>
          <p className="mt-2 text-sm text-[#a1a1a1]">{label}</p>
        </div>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="grid grid-cols-3 gap-6 bg-black p-10 text-center">
  <div class="rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-6"><b data-count="30" data-suffix="+" class="block text-[44px] font-semibold leading-none tracking-[-0.04em] text-white tabular-nums">30+</b><p class="mt-2 text-sm text-[#a1a1a1]">mentores atendidos</p></div>
  <div class="rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-6"><b data-count="5" class="block text-[44px] font-semibold leading-none tracking-[-0.04em] text-white tabular-nums">5</b><p class="mt-2 text-sm text-[#a1a1a1]">anos de experiência</p></div>
  <div class="rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-6"><b data-count="100" data-suffix="%" class="block text-[44px] font-semibold leading-none tracking-[-0.04em] text-white tabular-nums">100%</b><p class="mt-2 text-sm text-[#a1a1a1]">feito sob medida</p></div>
</div>
<script>
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els = document.querySelectorAll('[data-count]');
  els.forEach(function (el) { el.textContent = '0' + (el.dataset.suffix || ''); });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (!en.isIntersecting) return; io.unobserve(en.target);
      var el = en.target, to = parseFloat(el.dataset.count), suf = el.dataset.suffix || '', start = null;
      function frame(ts) { if (start === null) start = ts; var t = Math.min(1, (ts - start) / 2200); el.textContent = Math.round(to * (1 - Math.pow(1 - t, 4))) + suf; if (t < 1) requestAnimationFrame(frame); }
      setTimeout(function () { requestAnimationFrame(frame); }, 350);
    });
  }, { threshold: 0.6 });
  els.forEach(function (el) { io.observe(el); });
})();
</script>`,
    },
  },

  // 6 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-masked-line-reveal",
    name: "Texto que Sobe Linha a Linha de Dentro da Máscara",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    description: "O parágrafo é quebrado nas linhas que o navegador realmente desenhou (não por frase) e cada linha sobe de dentro do próprio recorte, uma depois da outra, conforme o bloco entra na tela. Vai e volta com o scroll e é recalculado quando a largura muda. Ar editorial de revista premium.",
    tags: ["Split Lines", "Mask Reveal", "Scroll Linked", "Stagger", "Editorial"],
    defaultSection: "Títulos de Seção",
    previewType: "jp-line-reveal",
    tech: ["Tailwind CSS", "React", "CSS Variables", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (t) => 1 - Math.pow(1 - t, 3);

// Quebra o texto nas linhas visuais reais; cada linha fica num recorte (overflow hidden)
function splitLines(el, text) {
  el.textContent = '';
  const words = text.split(' ');
  const spans = words.map((w, i) => { const s = document.createElement('span'); s.textContent = w; el.appendChild(s); if (i < words.length - 1) el.appendChild(document.createTextNode(' ')); return s; });
  const lines = []; let top = null;
  spans.forEach((s) => { if (s.offsetTop !== top) { lines.push([]); top = s.offsetTop; } lines[lines.length - 1].push(s.textContent); });
  el.textContent = '';
  return lines.map((ws) => {
    const mask = document.createElement('span'); mask.style.cssText = 'display:block;overflow:hidden;padding-bottom:.08em;margin-bottom:-.08em';
    const inner = document.createElement('span'); inner.style.cssText = 'display:block;transform:translateY(calc((1 - var(--r,1)) * 110%))'; inner.textContent = ws.join(' ');
    mask.appendChild(inner); el.appendChild(mask); return inner;
  });
}

export function MaskedLineReveal({ as: Tag = 'h2', text = 'Uma página que mostra o valor da sua mentoria antes mesmo da primeira conversa.', className = 'max-w-[18ch] text-[clamp(28px,3.6vw,50px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lines = [], raf = 0, lastW = innerWidth;
    const update = () => {
      raf = 0;
      const vh = innerHeight, r = el.getBoundingClientRect();
      const k = reduce ? 1 : clamp((vh * 0.95 - r.top) / (vh * 0.7));
      lines.forEach((s, j) => s.style.setProperty('--r', ease(clamp((k - j * 0.1) / 0.6)).toFixed(4)));
    };
    const split = () => { lines = splitLines(el, text); update(); };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    const rs = () => { if (innerWidth !== lastW) { lastW = innerWidth; split(); } };
    split();
    if (document.fonts) document.fonts.ready.then(split);
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', rs);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', rs); cancelAnimationFrame(raf); };
  }, [text]);

  return <Tag ref={ref} aria-label={text} className={className}>{text}</Tag>;
}`,
      tailwind: `<h2 data-lines class="max-w-[18ch] text-[clamp(28px,3.6vw,50px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">Uma página que mostra o valor da sua mentoria antes mesmo da primeira conversa.</h2>
<style>
  .jp-l{display:block;overflow:hidden;padding-bottom:.08em;margin-bottom:-.08em}
  .jp-l>span{display:block;transform:translateY(calc((1 - var(--r,1)) * 110%))}
</style>
<script>
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, items = [];
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function split(el) {
    if (!el.dataset.src) el.dataset.src = el.textContent.replace(/\\s+/g, ' ').trim();
    var words = el.dataset.src.split(' '); el.textContent = '';
    var spans = words.map(function (w, i) { var s = document.createElement('span'); s.textContent = w; el.appendChild(s); if (i < words.length - 1) el.appendChild(document.createTextNode(' ')); return s; });
    var lines = [], top = null; spans.forEach(function (s) { if (s.offsetTop !== top) { lines.push([]); top = s.offsetTop; } lines[lines.length - 1].push(s.textContent); });
    el.textContent = '';
    return lines.map(function (ws) { var m = document.createElement('span'); m.className = 'jp-l'; var i = document.createElement('span'); i.textContent = ws.join(' '); m.appendChild(i); el.appendChild(m); return i; });
  }
  function splitAll() { items = [].map.call(document.querySelectorAll('[data-lines]'), function (el) { el.setAttribute('aria-label', el.dataset.src || el.textContent.trim()); return { el: el, lines: split(el) }; }); update(); }
  function update() {
    var vh = innerHeight;
    items.forEach(function (it) { var k = reduce ? 1 : clamp((vh * 0.95 - it.el.getBoundingClientRect().top) / (vh * 0.7)); it.lines.forEach(function (s, j) { var t = clamp((k - j * 0.1) / 0.6); s.style.setProperty('--r', (1 - Math.pow(1 - t, 3)).toFixed(4)); }); });
  }
  var lastW = innerWidth;
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true });
  addEventListener('resize', function () { if (innerWidth !== lastW) { lastW = innerWidth; splitAll(); } });
  splitAll(); if (document.fonts) document.fonts.ready.then(splitAll);
})();
</script>`,
    },
  },

  // 7 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-copy-strike-swap",
    name: "Copy de IA Riscada x Copy de Venda que Acende",
    category: "typography",
    categoryLabel: "Texto & Tipografia",
    description: "Dois cartõezinhos lado a lado: o 'Texto de IA' é riscado linha por linha, perde a cor e encolhe, uma seta empurra para a direita e a 'Copy de venda' sobe, ganha brilho e um marca-texto passa sob a frase forte. Loop de 6 segundos que vende o antes e depois sem uma palavra a mais.",
    tags: ["Before After", "Strike Through", "Comparison", "Loop", "Bento"],
    defaultSection: "Benefícios / Bento",
    previewType: "jp-copy-strike",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `const CSS =
  '.jp-bad p{position:relative}' +
  '.jp-bad p::after{content:"";position:absolute;left:0;top:50%;width:100%;height:1.5px;background:rgba(255,255,255,.6);transform:scaleX(0);transform-origin:left;animation:jp-strike 6s cubic-bezier(.6,0,.2,1) infinite}' +
  '.jp-bad p:nth-of-type(2)::after{animation-delay:.15s}.jp-bad p:nth-of-type(3)::after{animation-delay:.3s}' +
  '.jp-bad{animation:jp-dim 6s ease-in-out infinite}.jp-arrow{animation:jp-push 6s cubic-bezier(.5,0,.2,1) infinite}' +
  '.jp-good{animation:jp-glow 6s ease-in-out infinite}' +
  '.jp-good strong{background:linear-gradient(rgba(255,255,255,.22),rgba(255,255,255,.22)) no-repeat 0 92%/0% 40%;animation:jp-mark 6s cubic-bezier(.6,0,.2,1) infinite}' +
  '@keyframes jp-strike{0%,8%{transform:scaleX(0)}24%,84%{transform:scaleX(1)}96%,100%{transform:scaleX(0)}}' +
  '@keyframes jp-dim{0%,14%{filter:none;transform:none}24%{transform:translateX(-3px) rotate(-1.2deg)}30%,86%{filter:grayscale(1) brightness(.65);transform:scale(.96)}100%{filter:none;transform:none}}' +
  '@keyframes jp-push{0%,24%{transform:translateX(-4px);opacity:.35}34%{transform:translateX(10px);opacity:1}44%,86%{transform:translateX(4px);opacity:1}100%{transform:translateX(-4px);opacity:.35}}' +
  '@keyframes jp-glow{0%,30%{transform:none;box-shadow:0 0 0 rgba(255,255,255,0)}40%{transform:scale(1.05) translateY(-4px);box-shadow:0 18px 44px rgba(255,255,255,.16)}50%,86%{transform:scale(1.03) translateY(-2px);box-shadow:0 12px 34px rgba(255,255,255,.12)}100%{transform:none;box-shadow:0 0 0 rgba(255,255,255,0)}}' +
  '@keyframes jp-mark{0%,40%{background-size:0% 40%}58%,86%{background-size:100% 40%}98%,100%{background-size:0% 40%}}' +
  '@media (prefers-reduced-motion:reduce){.jp-bad,.jp-bad *,.jp-bad p::after,.jp-arrow,.jp-good,.jp-good *{animation:none!important}}';

export function CopyStrikeSwap({
  bad = ['Transforme sua vida com nossa mentoria inovadora.', 'Descubra seu potencial.', 'Clique e saiba mais.'],
  goodLead = 'Aprovado na PF em 11 meses estudando 3h por dia,',
  goodStrong = 'com o método que eu uso com meus alunos.',
}) {
  const col = 'rounded-[14px] border p-4 text-[13px] leading-[1.45]';
  return (
    <div aria-hidden="true" className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-6">
      <style>{CSS}</style>
      <div className={col + ' jp-bad grid gap-1.5 border-dashed border-[#3d3d3d] text-[#a1a1a1]'}>
        <span className="mb-1 text-[10px] font-semibold uppercase tracking-[.12em]">Texto de IA</span>
        {bad.map((t) => <p key={t} className="m-0">{t}</p>)}
      </div>
      <svg className="jp-arrow h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
      <div className={col + ' jp-good border-white/45 bg-white/[.06] text-[#ededed]'}>
        <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[.12em] text-white">Copy de venda</span>
        <p className="m-0">{goodLead} <strong className="font-semibold text-white">{goodStrong}</strong></p>
      </div>
    </div>
  );
}`,
      tailwind: `<div aria-hidden="true" class="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-6">
  <div class="jp-bad grid gap-1.5 rounded-[14px] border border-dashed border-[#3d3d3d] p-4 text-[13px] text-[#a1a1a1]">
    <span class="mb-1 text-[10px] font-semibold uppercase tracking-[.12em]">Texto de IA</span>
    <p>Transforme sua vida com nossa mentoria inovadora.</p><p>Descubra seu potencial.</p><p>Clique e saiba mais.</p>
  </div>
  <svg class="jp-arrow h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg>
  <div class="jp-good rounded-[14px] border border-white/45 bg-white/[.06] p-4 text-[13px] text-[#ededed]">
    <span class="mb-1 block text-[10px] font-semibold uppercase tracking-[.12em] text-white">Copy de venda</span>
    <p>Aprovado na PF em 11 meses estudando 3h por dia, <strong class="font-semibold text-white">com o método que eu uso com meus alunos.</strong></p>
  </div>
</div>
<style>
  .jp-bad p{position:relative;margin:0}
  .jp-bad p::after{content:"";position:absolute;left:0;top:50%;width:100%;height:1.5px;background:rgba(255,255,255,.6);transform:scaleX(0);transform-origin:left;animation:jp-strike 6s cubic-bezier(.6,0,.2,1) infinite}
  .jp-bad p:nth-of-type(2)::after{animation-delay:.15s}.jp-bad p:nth-of-type(3)::after{animation-delay:.3s}
  .jp-bad{animation:jp-dim 6s ease-in-out infinite}.jp-arrow{animation:jp-push 6s cubic-bezier(.5,0,.2,1) infinite}.jp-good{animation:jp-glow 6s ease-in-out infinite}
  .jp-good strong{background:linear-gradient(rgba(255,255,255,.22),rgba(255,255,255,.22)) no-repeat 0 92%/0% 40%;animation:jp-mark 6s cubic-bezier(.6,0,.2,1) infinite}
  @keyframes jp-strike{0%,8%{transform:scaleX(0)}24%,84%{transform:scaleX(1)}96%,100%{transform:scaleX(0)}}
  @keyframes jp-dim{0%,14%{filter:none;transform:none}24%{transform:translateX(-3px) rotate(-1.2deg)}30%,86%{filter:grayscale(1) brightness(.65);transform:scale(.96)}100%{filter:none;transform:none}}
  @keyframes jp-push{0%,24%{transform:translateX(-4px);opacity:.35}34%{transform:translateX(10px);opacity:1}44%,86%{transform:translateX(4px);opacity:1}100%{transform:translateX(-4px);opacity:.35}}
  @keyframes jp-glow{0%,30%{transform:none;box-shadow:0 0 0 rgba(255,255,255,0)}40%{transform:scale(1.05) translateY(-4px);box-shadow:0 18px 44px rgba(255,255,255,.16)}50%,86%{transform:scale(1.03) translateY(-2px);box-shadow:0 12px 34px rgba(255,255,255,.12)}100%{transform:none}}
  @keyframes jp-mark{0%,40%{background-size:0% 40%}58%,86%{background-size:100% 40%}98%,100%{background-size:0% 40%}}
</style>`,
    },
  },

  // 8 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-border-glow-spotlight",
    name: "Card com Holofote e Borda que Acende no Mouse",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Cards escuros e opacos em que uma luz suave segue o cursor por dentro e, ao mesmo tempo, só a borda de 1px perto do mouse acende em branco, como se uma lanterna passasse rente ao contorno. Usa um único listener global; fora do mouse (toque) o card fica limpo.",
    tags: ["Spotlight", "Border Glow", "Mask Composite", "Hover", "Cursor"],
    defaultSection: "Para Quem É / Cards",
    previewType: "jp-border-glow",
    tech: ["Tailwind CSS", "React", "CSS Mask", "CSS Variables"],
    frameworks: {
      react: `import { useEffect } from 'react';

// Spotlight (::after) + borda acesa (::before recortado com mask-composite para sobrar só 1px)
const CSS =
  '.jp-glow{position:relative;overflow:hidden;isolation:isolate}' +
  '.jp-glow::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s ease;background:radial-gradient(360px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.08),transparent 60%)}' +
  '.jp-glow::before{content:"";position:absolute;inset:0;z-index:2;padding:1px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s ease;' +
  'background:radial-gradient(240px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.95),rgba(255,255,255,.3) 35%,transparent 70%);' +
  '-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)}' +
  '.jp-glow:hover::before,.jp-glow:hover::after{opacity:1}';

// Um listener para todos os cards .jp-glow da página
function useSpotlight() {
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const move = (e) => {
      const el = e.target.closest && e.target.closest('.jp-glow');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', e.clientX - r.left + 'px');
      el.style.setProperty('--my', e.clientY - r.top + 'px');
    };
    document.addEventListener('pointermove', move, { passive: true });
    return () => document.removeEventListener('pointermove', move);
  }, []);
}

export function GlowCards({ items = ['Você é mentor e já tem alunos, mas a página não acompanha o seu nível.', 'Você investe em tráfego e o clique não vira conversa.', 'Sua página foi feita às pressas, com cara de modelo pronto.', 'Você quer vender um ticket alto e precisa de uma página à altura.'] }) {
  useSpotlight();
  return (
    <div className="mx-auto grid max-w-[860px] gap-4 bg-black p-6 sm:grid-cols-2">
      <style>{CSS}</style>
      {items.map((t) => (
        <article key={t} className="jp-glow min-h-[200px] rounded-[20px] border border-[#262626] bg-[linear-gradient(180deg,#0f0f0f,#0a0a0a)] p-7">
          <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-[#3d3d3d] text-white">✦</span>
          <p className="m-0 text-[17px] text-[#ededed]">{t}</p>
        </article>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="mx-auto grid max-w-[860px] gap-4 bg-black p-6 sm:grid-cols-2">
  <article class="jp-glow min-h-[200px] rounded-[20px] border border-[#262626] bg-[linear-gradient(180deg,#0f0f0f,#0a0a0a)] p-7"><p class="text-[17px] text-[#ededed]">Você é mentor e já tem alunos, mas a página não acompanha o seu nível.</p></article>
  <article class="jp-glow min-h-[200px] rounded-[20px] border border-[#262626] bg-[linear-gradient(180deg,#0f0f0f,#0a0a0a)] p-7"><p class="text-[17px] text-[#ededed]">Você investe em tráfego e o clique não vira conversa.</p></article>
</div>
<style>
  .jp-glow{position:relative;overflow:hidden;isolation:isolate}
  .jp-glow::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s ease;background:radial-gradient(360px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.08),transparent 60%)}
  .jp-glow::before{content:"";position:absolute;inset:0;z-index:2;padding:1px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s ease;background:radial-gradient(240px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.95),rgba(255,255,255,.3) 35%,transparent 70%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)}
  .jp-glow:hover::before,.jp-glow:hover::after{opacity:1}
</style>
<script>
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) document.addEventListener('pointermove', function (e) {
    var el = e.target.closest && e.target.closest('.jp-glow'); if (!el) return;
    var r = el.getBoundingClientRect(); el.style.setProperty('--mx', e.clientX - r.left + 'px'); el.style.setProperty('--my', e.clientY - r.top + 'px');
  }, { passive: true });
</script>`,
    },
  },

  // 9 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-testimonial-scroll-stack",
    name: "Pilha de Depoimentos que Sobem com a Rolagem",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Os depoimentos formam um bloquinho de folhas no meio da tela: a cada trecho de rolagem o card da frente sobe girando e some, e o de trás avança para a frente, com pausa em cada um para dar tempo de ler. Os de trás ficam menores, tortos alternando o lado e com o conteúdo apagado. O último fica parado, então a pilha nunca termina vazia.",
    tags: ["Scroll Pinned", "Card Stack", "Testimonials", "Smoothstep", "Mobile Friendly"],
    defaultSection: "Depoimentos",
    previewType: "jp-tstack",
    tech: ["Tailwind CSS", "React", "position: sticky", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };

export function TestimonialStack({ cardH = 440, step = '45vh', items = [
  { name: 'Lucas Córdova', role: 'Mentoria de concursos legislativos', quote: 'Profissional dedicado e atencioso. Entregou tudo dentro do prazo. Recomendo demais!' },
  { name: 'Helena Emerick', role: 'Mentora de concursos públicos', quote: 'Podem contratar de olhos fechados. Virou meu webdesigner pra vida!' },
  { name: 'Rodrigo Pinha', role: 'Mentoria Direito Policial', quote: 'Ficou exatamente como eu queria. Nota 10!' },
  { name: 'Malu Pacheco', role: 'Mentoria Direito Policial', quote: 'Tudo foi feito com muito cuidado e atenção aos detalhes.' },
] }) {
  const stack = useRef(null), sticky = useRef(null), cards = useRef([]);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const S = stack.current, st = sticky.current, C = cards.current.filter(Boolean), n = C.length;
      const rect = S.getBoundingClientRect(), total = rect.height - st.offsetHeight;
      const p = total > 0 ? clamp((st.getBoundingClientRect().top - rect.top) / total) : 0;
      // posição na pilha com uma pausa em cada card
      const raw = p * (n - 1), k = Math.min(Math.floor(raw), n - 2), pos = n > 1 ? k + smooth(0.15, 0.85, raw - k) : 0;
      C.forEach((card, i) => {
        const d = i - pos;
        let tr, op = 1;
        if (d < 0) { const f = clamp(-d); tr = 'translateY(' + -f * 115 + '%) rotate(' + -f * 8 + 'deg)'; op = clamp((1 - f) / 0.5); } // saindo
        else { const side = i % 2 ? 1 : -1; tr = 'translateY(' + d * 18 + 'px) scale(' + (1 - Math.min(d, 3) * 0.05) + ') rotate(' + side * Math.min(d, 2) * 2.5 + 'deg)'; op = clamp(3 - d); } // esperando atrás
        card.style.zIndex = n - i; card.style.opacity = op; card.style.transform = tr;
        card.style.setProperty('--ink', d < 0 ? 1 : clamp(1 - d * 1.5)); // só o da frente mostra o texto
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on); update();
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [items.length]);

  const box = cardH + 48;
  return (
    <div ref={stack} className="relative overflow-x-clip bg-black motion-reduce:!h-auto" style={{ height: 'calc(' + box + 'px + ' + (items.length - 1) + ' * ' + step + ')' }}>
      <div ref={sticky} className="sticky px-4 py-6 motion-reduce:static" style={{ top: 'calc(50vh - ' + box / 2 + 'px)', height: box }}>
        <div className="relative mx-auto w-[min(380px,100%)]" style={{ height: cardH }}>
          {items.map((t, i) => (
            <figure key={i} ref={(n) => (cards.current[i] = n)}
              className="absolute inset-0 m-0 flex flex-col items-center justify-center gap-6 rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,#181818,#111)] p-7 text-center shadow-[0_24px_60px_rgba(0,0,0,.5),inset_0_1px_0_rgba(255,255,255,.06)] will-change-transform [backface-visibility:hidden] [&>*]:opacity-[var(--ink,1)]">
              <div className="text-white tracking-[.2em]">★★★★★</div>
              <blockquote className="m-0 w-[92%] text-[17px] leading-relaxed text-[#ededed]">{t.quote}</blockquote>
              <figcaption className="grid w-full gap-0.5 border-t border-white/10 pt-[22px]">
                <b className="text-[17px] font-semibold text-white">{t.name}</b>
                <span className="text-sm text-[#a1a1a1]">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `<div class="jp-tstack relative overflow-x-clip bg-black" style="--n:3">
  <div class="jp-tstack__sticky sticky px-4 py-6">
    <div class="relative mx-auto h-[440px] w-[min(380px,100%)]">
      <figure class="jp-tcard"><div class="text-white">★★★★★</div><blockquote class="m-0 text-[17px] text-[#ededed]">Profissional dedicado e atencioso. Recomendo demais!</blockquote><figcaption class="border-t border-white/10 pt-5"><b class="text-white">Lucas Córdova</b></figcaption></figure>
      <figure class="jp-tcard"><div class="text-white">★★★★★</div><blockquote class="m-0 text-[17px] text-[#ededed]">Podem contratar de olhos fechados.</blockquote><figcaption class="border-t border-white/10 pt-5"><b class="text-white">Helena Emerick</b></figcaption></figure>
      <figure class="jp-tcard"><div class="text-white">★★★★★</div><blockquote class="m-0 text-[17px] text-[#ededed]">Ficou exatamente como eu queria. Nota 10!</blockquote><figcaption class="border-t border-white/10 pt-5"><b class="text-white">Rodrigo Pinha</b></figcaption></figure>
      <figure class="jp-tcard"><div class="text-white">★★★★★</div><blockquote class="m-0 text-[17px] text-[#ededed]">Tudo foi feito com muito cuidado.</blockquote><figcaption class="border-t border-white/10 pt-5"><b class="text-white">Malu Pacheco</b></figcaption></figure>
    </div>
  </div>
</div>
<style>
  .jp-tstack{height:calc(488px + var(--n) * 45vh)}
  .jp-tstack__sticky{top:calc(50vh - 244px);height:488px}
  .jp-tcard{position:absolute;inset:0;margin:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;padding:28px;text-align:center;border:1px solid rgba(255,255,255,.12);border-radius:20px;background:linear-gradient(180deg,#181818,#111);box-shadow:0 24px 60px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.06);backface-visibility:hidden;will-change:transform}
  .jp-tcard>*{opacity:var(--ink,1)}
</style>
<script>
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var S = document.querySelector('.jp-tstack'), st = S.querySelector('.jp-tstack__sticky'), C = S.querySelectorAll('.jp-tcard'), n = C.length;
  function clamp(v) { return Math.min(1, Math.max(0, v)); }
  function smooth(a, b, v) { var t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); }
  function update() {
    var rect = S.getBoundingClientRect(), total = rect.height - st.offsetHeight, p = total > 0 ? clamp((st.getBoundingClientRect().top - rect.top) / total) : 0;
    var raw = p * (n - 1), k = Math.min(Math.floor(raw), n - 2), pos = k + smooth(0.15, 0.85, raw - k);
    C.forEach(function (card, i) {
      var d = i - pos, tr, op = 1;
      if (d < 0) { var f = clamp(-d); tr = 'translateY(' + -f * 115 + '%) rotate(' + -f * 8 + 'deg)'; op = clamp((1 - f) / 0.5); }
      else { var side = i % 2 ? 1 : -1; tr = 'translateY(' + d * 18 + 'px) scale(' + (1 - Math.min(d, 3) * 0.05) + ') rotate(' + side * Math.min(d, 2) * 2.5 + 'deg)'; op = clamp(3 - d); }
      card.style.zIndex = n - i; card.style.opacity = op; card.style.transform = tr; card.style.setProperty('--ink', d < 0 ? 1 : clamp(1 - d * 1.5));
    });
  }
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true }); update();
})();
</script>`,
    },
  },

  // 10 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-works-ring-to-drum",
    name: "Portfólio: Anel de Prints que Vira Tambor 3D",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Em repouso os prints dos projetos formam um anel em volta de um número grande ('30+'). Com a seção presa na tela, a rolagem abre o anel num tambor vertical em 3D e cada projeto passa pela frente com pausa, puxando os vizinhos num arco para a esquerda; o nome do projeto acende ao lado e um índice clicável à direita leva direto a cada um.",
    tags: ["Scroll Pinned", "3D Drum", "Ring Layout", "Portfolio", "Perspective", "Index Nav"],
    defaultSection: "Portfólio",
    previewType: "jp-works-wheel",
    tech: ["Tailwind CSS", "React", "CSS 3D Transforms", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

// Um número descreve tudo: turn = 0 é o anel; 1 é o tambor com o projeto 0 na frente; cada inteiro a mais é um projeto girado.
const CARD_H = 0.54, CARD_RATIO = 2.4, STEP = 40, DRUM = 2.22, LENS = 2.7, RING_R = 0.95, BOW = 1.82, TITLE = 0.124, CULL = 1.6, EASE = 0.12, STEP_VH = 20;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const rad = (d) => (d * Math.PI) / 180;

export function WorksWheel({ label = '30+', projects = [
  { title: 'Mentoria Policial', img: '' }, { title: 'Aprovação Fiscal', img: '' }, { title: 'Direito em Foco', img: '' },
  { title: 'Legislativo Pro', img: '' }, { title: 'Método Tribunais', img: '' }, { title: 'Rota da Posse', img: '' },
] }) {
  const sec = useRef(null), stage = useRef(null), wheel = useRef(null), items = useRef([]), labelEl = useRef(null), titleEl = useRef(null);
  const [active, setActive] = useState(0);
  const count = projects.length, last = Math.max(count - 1, 0);

  const range = () => Math.max(1, sec.current.offsetHeight - innerHeight);
  const scrollToItem = (i) => {
    const p = (i + 1 + 0.25) / (count + 0.5);
    scrollTo({ top: scrollY + sec.current.getBoundingClientRect().top + p * range(), behavior: 'smooth' });
  };

  useEffect(() => {
    const S = sec.current, ST = stage.current, W = wheel.current, I = items.current.filter(Boolean);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const m = {}; let turn = 0, target = 0, dirty = true, visible = true, raf = 0, act = -1;
    const measure = () => {
      const w = ST.clientWidth, h = ST.clientHeight, narrow = w < 700;
      const cardW = Math.min(h * CARD_H * CARD_RATIO, w * (narrow ? 0.86 : 0.5)), cardH = cardW / CARD_RATIO;
      m.cardH = cardH; m.drumR = cardH * DRUM; m.ringR = Math.min(cardH * RING_R, w * 0.34, h * 0.33); m.bow = narrow ? 0 : cardH * BOW;
      m.ringScale = clamp(((2 * Math.PI * m.ringR) / count) * 0.82 / (cardW || 1), 0.16, 1); // encolhe para o anel fechar
      S.style.setProperty('--card-w', cardW + 'px'); S.style.setProperty('--card-h', cardH + 'px');
      ST.style.perspective = cardH * LENS + 'px';
      labelEl.current.style.fontSize = Math.max(cardH * TITLE * 1.6, 28) + 'px';
      titleEl.current.style.fontSize = Math.max(cardH * TITLE * 0.82, 18) + 'px';
      titleEl.current.style.maxWidth = narrow ? '' : Math.max((w - cardW) / 2 - w * 0.06 - 56, 120) + 'px';
      dirty = true;
    };
    const place = (ringDeg, drumDeg, k) => {
      const bowX = -m.bow * (1 - Math.cos(rad(drumDeg)));
      return 'translateX(' + k * bowX + 'px) rotateZ(' + (1 - k) * ringDeg + 'deg) translateY(' + -(1 - k) * m.ringR + 'px) rotateX(' + k * drumDeg + 'deg) translateZ(' + k * m.drumR + 'px)';
    };
    const targetFromScroll = () => {
      const p = clamp(-S.getBoundingClientRect().top / range(), 0, 1), raw = clamp(p * (count + 0.5) - 0.25, 0, count);
      if (raw <= 1) return smooth(0.1, 0.9, raw);
      const k = Math.min(Math.floor(raw - 1), last);
      return 1 + k + (k >= last ? 0 : smooth(0.2, 0.8, raw - 1 - k)); // pausa em cada projeto
    };
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      target = targetFromScroll();
      const gap = target - turn;
      if (Math.abs(gap) < 0.0005) { if (!dirty) return; turn = target; } else turn += gap * EASE;
      dirty = false;
      const k = clamp(turn, 0, 1), pos = Math.max(0, turn - 1);
      W.style.transform = 'translateZ(' + -k * m.drumR + 'px)';
      I.forEach((card, i) => {
        const d = i - pos;
        card.style.transform = place(d * (360 / count), d * STEP, k);
        card.style.opacity = k > 0.5 && Math.abs(d) > CULL ? '0' : '1';
        card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        card.firstElementChild.style.transform = 'scale(' + lerp(m.ringScale, 1, k) + ')';
      });
      labelEl.current.style.opacity = String(1 - k);
      titleEl.current.style.opacity = String(smooth(0.94, 1, k));
      const a = clamp(Math.round(pos), 0, last);
      if (a !== act) { act = a; setActive(a); }
    };
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; dirty = true; }, { rootMargin: '200px 0px' });
    io.observe(S);
    const ro = new ResizeObserver(measure); ro.observe(ST);
    measure(); turn = target = targetFromScroll(); raf = requestAnimationFrame(draw);
    return () => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf); };
  }, [count, last]);

  return (
    <section ref={sec} className="relative bg-black text-white" style={{ height: 'calc(100vh + ' + (count + 0.5) * STEP_VH + 'vh)' }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <h2 className="px-6 pt-[7vh] text-center text-[clamp(28px,3vw,40px)] font-semibold tracking-[-0.03em]">Projetos entregues</h2>
        <div ref={stage} className="relative min-h-0 flex-1 select-none overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_9%,#000_91%,transparent)]">
          <div ref={wheel} className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]">
            {projects.map((p, i) => (
              <div key={i} ref={(n) => (items.current[i] = n)} className="absolute ml-[calc(var(--card-w,360px)/-2)] mt-[calc(var(--card-h,150px)/-2)] h-[var(--card-h,150px)] w-[var(--card-w,360px)] [backface-visibility:hidden]">
                <div className="h-full w-full overflow-hidden rounded-[10px] border border-[#3d3d3d] bg-[#0d0d0d] shadow-[0_18px_40px_-18px_rgba(255,255,255,.12),0_24px_60px_rgba(0,0,0,.6)]">
                  {p.img ? <img src={p.img} alt={p.title} className="h-full w-full object-cover" /> : (
                    <div className="grid h-full place-items-center bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,.12),transparent_65%),linear-gradient(180deg,#151515,#0a0a0a)] text-center font-semibold">{p.title}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <b ref={labelEl} className="pointer-events-none absolute inset-0 grid place-items-center font-semibold leading-[1.1] tracking-[-0.03em]">{label}</b>
          <b ref={titleEl} className="pointer-events-none absolute left-[6%] top-1/2 max-w-[24%] -translate-y-1/2 font-semibold leading-[1.1] tracking-[-0.03em] opacity-0">{projects[active] && projects[active].title}</b>
          <ol className="absolute right-[3%] top-[6%] m-0 hidden list-none p-0 text-right leading-[1.75] lg:block">
            {projects.map((p, i) => (
              <li key={i}><button type="button" onClick={() => scrollToItem(i)} className={'border-0 bg-transparent p-0 text-[13px] transition-colors hover:text-white ' + (i === active ? 'font-medium text-white' : 'text-[#a1a1a1]')}>{p.title}</button></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<!-- Versão HTML: mesma lógica do componente React (data-wheel). Ajuste os projetos dentro de .jp-wheel -->
<section class="jp-works relative bg-black text-white" data-wheel>
  <div class="sticky top-0 flex h-svh flex-col overflow-hidden">
    <h2 class="px-6 pt-[7vh] text-center text-[34px] font-semibold tracking-[-0.03em]">Projetos entregues</h2>
    <div class="jp-stage relative min-h-0 flex-1 select-none overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_9%,#000_91%,transparent)]">
      <div class="jp-wheel absolute left-1/2 top-1/2 [transform-style:preserve-3d]">
        <div class="jp-item" data-title="Mentoria Policial"><div class="jp-face">Mentoria Policial</div></div>
        <div class="jp-item" data-title="Aprovação Fiscal"><div class="jp-face">Aprovação Fiscal</div></div>
        <div class="jp-item" data-title="Direito em Foco"><div class="jp-face">Direito em Foco</div></div>
        <div class="jp-item" data-title="Legislativo Pro"><div class="jp-face">Legislativo Pro</div></div>
        <div class="jp-item" data-title="Método Tribunais"><div class="jp-face">Método Tribunais</div></div>
        <div class="jp-item" data-title="Rota da Posse"><div class="jp-face">Rota da Posse</div></div>
      </div>
      <b class="jp-label pointer-events-none absolute inset-0 grid place-items-center font-semibold">30+</b>
      <b class="jp-title pointer-events-none absolute left-[6%] top-1/2 max-w-[24%] -translate-y-1/2 font-semibold opacity-0"></b>
    </div>
  </div>
</section>
<style>
  .jp-item{position:absolute;width:var(--card-w,360px);height:var(--card-h,150px);margin-left:calc(var(--card-w,360px)/-2);margin-top:calc(var(--card-h,150px)/-2);backface-visibility:hidden}
  .jp-face{display:grid;place-items:center;width:100%;height:100%;border:1px solid #3d3d3d;border-radius:10px;background:linear-gradient(180deg,#151515,#0a0a0a);box-shadow:0 24px 60px rgba(0,0,0,.6);font-weight:600}
</style>
<script>
(function () {
  var S = document.querySelector('[data-wheel]'), ST = S.querySelector('.jp-stage'), W = S.querySelector('.jp-wheel'), I = S.querySelectorAll('.jp-item'), label = S.querySelector('.jp-label'), title = S.querySelector('.jp-title');
  var count = I.length, last = count - 1, m = {}, turn = 0, target = 0, dirty = true;
  S.style.height = 'calc(100vh + ' + (count + 0.5) * 20 + 'vh)';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function smooth(a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function range() { return Math.max(1, S.offsetHeight - innerHeight); }
  function measure() {
    var w = ST.clientWidth, h = ST.clientHeight, narrow = w < 700, cardW = Math.min(h * 0.54 * 2.4, w * (narrow ? 0.86 : 0.5)), cardH = cardW / 2.4;
    m.drumR = cardH * 2.22; m.ringR = Math.min(cardH * 0.95, w * 0.34, h * 0.33); m.bow = narrow ? 0 : cardH * 1.82; m.ringScale = clamp(2 * Math.PI * m.ringR / count * 0.82 / cardW, 0.16, 1);
    S.style.setProperty('--card-w', cardW + 'px'); S.style.setProperty('--card-h', cardH + 'px'); ST.style.perspective = cardH * 2.7 + 'px';
    label.style.fontSize = Math.max(cardH * 0.2, 28) + 'px'; title.style.fontSize = Math.max(cardH * 0.1, 18) + 'px'; dirty = true;
  }
  function place(rd, dd, k) { var bowX = -m.bow * (1 - Math.cos(dd * Math.PI / 180)); return 'translateX(' + k * bowX + 'px) rotateZ(' + (1 - k) * rd + 'deg) translateY(' + -(1 - k) * m.ringR + 'px) rotateX(' + k * dd + 'deg) translateZ(' + k * m.drumR + 'px)'; }
  function tgt() { var p = clamp(-S.getBoundingClientRect().top / range(), 0, 1), raw = clamp(p * (count + 0.5) - 0.25, 0, count); if (raw <= 1) return smooth(0.1, 0.9, raw); var k = Math.min(Math.floor(raw - 1), last); return 1 + k + (k >= last ? 0 : smooth(0.2, 0.8, raw - 1 - k)); }
  function draw() {
    requestAnimationFrame(draw); target = tgt(); var gap = target - turn;
    if (Math.abs(gap) < 0.0005) { if (!dirty) return; turn = target; } else turn += gap * 0.12; dirty = false;
    var k = clamp(turn, 0, 1), pos = Math.max(0, turn - 1); W.style.transform = 'translateZ(' + -k * m.drumR + 'px)';
    I.forEach(function (c, i) { var d = i - pos; c.style.transform = place(d * 360 / count, d * 40, k); c.style.opacity = k > 0.5 && Math.abs(d) > 1.6 ? '0' : '1'; c.style.zIndex = Math.round(100 - Math.abs(d) * 2); c.firstElementChild.style.transform = 'scale(' + (m.ringScale + (1 - m.ringScale) * k) + ')'; });
    label.style.opacity = 1 - k; title.style.opacity = smooth(0.94, 1, k); title.textContent = I[clamp(Math.round(pos), 0, last)].dataset.title;
  }
  new ResizeObserver(measure).observe(ST); measure(); turn = target = tgt(); requestAnimationFrame(draw);
})();
</script>`,
    },
  },

  // 11 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-bento-scroll-shine",
    name: "Bento com Faixa de Brilho Ligada à Rolagem",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Cada card do bento recebe um progresso de 0 a 1 conforme sobe na tela: uma faixa de luz diagonal atravessa a superfície acompanhando o scroll, e o conteúdo de dentro reage ao mesmo número (barras crescem, mensagens aparecem, itens acendem em sequência). Vai e volta junto com a rolagem; sem JS ou com movimento reduzido fica no estado completo.",
    tags: ["Bento Grid", "Scroll Progress", "Shine Sweep", "CSS Variables", "Reversible"],
    defaultSection: "Benefícios / Bento",
    previewType: "jp-bento-shine",
    tech: ["Tailwind CSS", "React", "CSS Variables", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

// --p (0 → 1): 0 quando o topo do card entra por baixo (92% da tela), 1 quando chega a 38%.
const SHINE = 'linear-gradient(115deg,transparent calc(var(--p) * 180% - 70%),rgba(255,255,255,.11) calc(var(--p) * 180% - 53%),rgba(255,255,255,.04) calc(var(--p) * 180% - 37%),transparent calc(var(--p) * 180% - 23%))';

function useScrollProgress(ref) {
  useEffect(() => {
    const el = ref.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--p', '1'); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = innerHeight, r = el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      const start = vh * 0.92, end = vh * 0.38;
      el.style.setProperty('--p', Math.min(1, Math.max(0, (start - r.top) / (start - end))).toFixed(3));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    el.style.setProperty('--p', '0'); update();
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [ref]);
}

export function ShineCard({ title, text, children, className = '' }) {
  const ref = useRef(null);
  useScrollProgress(ref);
  return (
    <article ref={ref} style={{ '--p': 1 }} className={'relative overflow-hidden rounded-[20px] border border-[#262626] bg-[linear-gradient(180deg,#0f0f0f,#0a0a0a)] p-6 ' + className}>
      <i aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]" style={{ background: SHINE }} />
      <div aria-hidden="true" className="mb-6 h-[150px] rounded-[14px] border border-[#262626] bg-black/40 p-4">{children}</div>
      <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">{title}</h3>
      <p className="mt-2 text-[15px] text-[#a1a1a1]">{text}</p>
    </article>
  );
}

// Exemplo: barras que crescem com o mesmo --p (a última acende)
function Bars() {
  const H = [30, 46, 38, 62, 80, 100];
  return (
    <div className="flex h-full items-end gap-2">
      {H.map((h, i) => (
        <i key={i} className={'flex-1 rounded-t-md ' + (i === H.length - 1 ? 'bg-white' : 'bg-white/25')}
          style={{ height: 'calc(' + h + '% * (0.2 + 0.8 * var(--p)))', boxShadow: i === H.length - 1 ? '0 0 calc(var(--p) * 34px) rgba(255,255,255,calc(var(--p) * .4))' : undefined }} />
      ))}
    </div>
  );
}

export function BentoShineDemo() {
  return (
    <div className="mx-auto grid max-w-[1120px] gap-4 bg-black px-6 py-[50vh] md:grid-cols-6">
      <ShineCard className="md:col-span-4" title="Copy pensada para vender" text="Cada frase escrita para o aluno de concurso."><Bars /></ShineCard>
      <ShineCard className="md:col-span-2" title="Prova social" text="Mais de 30 mentores atendidos."><Bars /></ShineCard>
      <ShineCard className="md:col-span-3" title="Estrutura completa" text="Do criativo ao painel de leads."><Bars /></ShineCard>
      <ShineCard className="md:col-span-3" title="Parceria" text="Ajustes publicados rápido."><Bars /></ShineCard>
    </div>
  );
}`,
      tailwind: `<div class="mx-auto grid max-w-[1120px] gap-4 bg-black px-6 py-[50vh] md:grid-cols-6">
  <article class="jp-shine relative overflow-hidden rounded-[20px] border border-[#262626] bg-[linear-gradient(180deg,#0f0f0f,#0a0a0a)] p-6 md:col-span-4">
    <div class="mb-6 flex h-[150px] items-end gap-2 rounded-[14px] border border-[#262626] p-4"><i class="jp-bar" style="--h:30%"></i><i class="jp-bar" style="--h:46%"></i><i class="jp-bar" style="--h:62%"></i><i class="jp-bar is-hot" style="--h:100%"></i></div>
    <h3 class="text-xl font-semibold text-white">Copy pensada para vender</h3>
  </article>
  <article class="jp-shine relative overflow-hidden rounded-[20px] border border-[#262626] bg-[linear-gradient(180deg,#0f0f0f,#0a0a0a)] p-6 md:col-span-2"><h3 class="text-xl font-semibold text-white">Prova social</h3></article>
</div>
<style>
  .jp-shine{--p:1}
  .jp-shine::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(115deg,transparent calc(var(--p) * 180% - 70%),rgba(255,255,255,.11) calc(var(--p) * 180% - 53%),rgba(255,255,255,.04) calc(var(--p) * 180% - 37%),transparent calc(var(--p) * 180% - 23%))}
  .jp-bar{flex:1;border-radius:6px 6px 0 0;background:rgba(255,255,255,.25);height:calc(var(--h) * (0.2 + 0.8 * var(--p)))}
  .jp-bar.is-hot{background:#fff;box-shadow:0 0 calc(var(--p) * 34px) rgba(255,255,255,calc(var(--p) * .4))}
</style>
<script>
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var items = [].slice.call(document.querySelectorAll('.jp-shine'));
  function update() {
    var vh = innerHeight;
    items.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.bottom < -50 || r.top > vh + 50) return; var s = vh * 0.92, e = vh * 0.38; el.style.setProperty('--p', Math.min(1, Math.max(0, (s - r.top) / (s - e))).toFixed(3)); });
  }
  items.forEach(function (el) { el.style.setProperty('--p', '0'); });
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true }); update();
})();
</script>`,
    },
  },

  // 12 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-bars-spark-loop",
    name: "Barras que Sobem em Onda e a Última Solta Faísca",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Um mini gráfico em preto e branco: as barras sobem uma a uma com um leve passe do ponto, ficam de pé e descem juntas; quando a última (a mais alta, branca) chega ao topo, uma bolinha de luz explode em cima dela e se apaga. Loop curto que comunica crescimento de resultado.",
    tags: ["Mini Chart", "Bars", "Spark", "Loop", "Bento Illustration"],
    defaultSection: "Benefícios / Bento",
    previewType: "jp-bars-spark",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `const CSS =
  '.jp-b{transform-origin:bottom;animation:jp-bar 4.2s cubic-bezier(.3,.7,.2,1) infinite;animation-delay:calc(var(--i) * .12s)}' +
  '.jp-b.is-hot::after{content:"";position:absolute;left:50%;top:-6px;width:10px;height:10px;margin-left:-5px;border-radius:50%;background:#fff;box-shadow:0 0 18px 4px rgba(255,255,255,.7);animation:jp-spark 4.2s ease-out infinite;animation-delay:.72s}' +
  '@keyframes jp-bar{0%{transform:scaleY(.12)}22%{transform:scaleY(1.06)}30%,72%{transform:scaleY(1)}90%,100%{transform:scaleY(.12)}}' +
  '@keyframes jp-spark{0%,14%{opacity:0;transform:scale(.2)}22%{opacity:1;transform:scale(1.5)}40%,62%{opacity:1;transform:scale(1)}78%,100%{opacity:0;transform:scale(.2)}}' +
  '@media (prefers-reduced-motion:reduce){.jp-b,.jp-b::after{animation:none!important}}';

export function BarsSpark({ heights = [32, 48, 40, 64, 78, 100], labels = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun'] }) {
  return (
    <div aria-hidden="true" className="rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-6">
      <style>{CSS}</style>
      <div className="flex h-[150px] items-end gap-3">
        {heights.map((h, i) => {
          const hot = i === heights.length - 1;
          return (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <i className={'jp-b relative block w-full rounded-t-md ' + (hot ? 'is-hot bg-white' : 'bg-white/25')} style={{ height: h + '%', '--i': i }} />
              <span className="text-[10px] uppercase tracking-[.1em] text-[#a1a1a1]">{labels[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
      tailwind: `<div aria-hidden="true" class="rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-6">
  <div class="flex h-[150px] items-end gap-3">
    <i class="jp-b relative block flex-1 rounded-t-md bg-white/25" style="height:32%;--i:0"></i>
    <i class="jp-b relative block flex-1 rounded-t-md bg-white/25" style="height:48%;--i:1"></i>
    <i class="jp-b relative block flex-1 rounded-t-md bg-white/25" style="height:40%;--i:2"></i>
    <i class="jp-b relative block flex-1 rounded-t-md bg-white/25" style="height:64%;--i:3"></i>
    <i class="jp-b relative block flex-1 rounded-t-md bg-white/25" style="height:78%;--i:4"></i>
    <i class="jp-b is-hot relative block flex-1 rounded-t-md bg-white" style="height:100%;--i:5"></i>
  </div>
</div>
<style>
  .jp-b{transform-origin:bottom;animation:jp-bar 4.2s cubic-bezier(.3,.7,.2,1) infinite;animation-delay:calc(var(--i) * .12s)}
  .jp-b.is-hot::after{content:"";position:absolute;left:50%;top:-6px;width:10px;height:10px;margin-left:-5px;border-radius:50%;background:#fff;box-shadow:0 0 18px 4px rgba(255,255,255,.7);animation:jp-spark 4.2s ease-out infinite;animation-delay:.72s}
  @keyframes jp-bar{0%{transform:scaleY(.12)}22%{transform:scaleY(1.06)}30%,72%{transform:scaleY(1)}90%,100%{transform:scaleY(.12)}}
  @keyframes jp-spark{0%,14%{opacity:0;transform:scale(.2)}22%{opacity:1;transform:scale(1.5)}40%,62%{opacity:1;transform:scale(1)}78%,100%{opacity:0;transform:scale(.2)}}
</style>`,
    },
  },

  // 13 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-chat-typing-loop",
    name: "Conversa com 'Digitando…' em Loop",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Uma mini conversa de WhatsApp em preto e branco: a mensagem enviada sobe e aparece, surge o balão com três pontinhos pulando, ele some e a resposta chega; depois tudo sai pra cima e recomeça. Mostra parceria e agilidade de atendimento num bloco pequeno do bento.",
    tags: ["Chat", "Typing Indicator", "Loop", "Messaging", "Bento Illustration"],
    defaultSection: "Benefícios / Parceria",
    previewType: "jp-chat",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `const CSS =
  '.jp-me{animation:jp-me 7s cubic-bezier(.2,.8,.2,1) infinite}.jp-typing{animation:jp-typ 7s ease infinite}.jp-you{animation:jp-you 7s cubic-bezier(.2,.8,.2,1) infinite}' +
  '.jp-typing b{width:6px;height:6px;border-radius:50%;background:#fff;animation:jp-dot .9s ease-in-out infinite}.jp-typing b:nth-child(2){animation-delay:.15s}.jp-typing b:nth-child(3){animation-delay:.3s}' +
  '@keyframes jp-me{0%,4%{opacity:0;transform:translateY(18px) scale(.9)}12%,88%{opacity:1;transform:none}96%,100%{opacity:0;transform:translateY(-8px)}}' +
  '@keyframes jp-typ{0%,18%{opacity:0;transform:scale(.6)}24%,42%{opacity:1;transform:none}46%,100%{opacity:0;transform:scale(.6)}}' +
  '@keyframes jp-you{0%,44%{opacity:0;transform:translateY(18px) scale(.9)}52%,88%{opacity:1;transform:none}96%,100%{opacity:0;transform:translateY(-8px)}}' +
  '@keyframes jp-dot{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-4px);opacity:1}}' +
  '@media (prefers-reduced-motion:reduce){.jp-me,.jp-you,.jp-typing,.jp-typing b{animation:none!important}.jp-typing{display:none!important}}';

export function ChatTypingLoop({ me = 'Vamos testar uma oferta nova no topo da página?', you = 'Bora. Pode subir.', meInitials = 'JP', youInitials = 'M' }) {
  const av = 'grid h-7 w-7 flex-none place-items-center rounded-full text-[10px] font-semibold';
  return (
    <div aria-hidden="true" className="grid h-[180px] content-center gap-3 rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-5 text-[13px]">
      <style>{CSS}</style>
      <div className="jp-me flex items-end gap-2">
        <i className={av + ' bg-white text-black not-italic'}>{meInitials}</i>
        <span className="rounded-[14px_14px_14px_4px] border border-[#262626] bg-white/[.06] px-3 py-2 text-[#ededed]">{me}</span>
      </div>
      <div className="jp-typing -my-[5px] flex h-0 justify-end overflow-visible">
        <span className="flex -translate-y-1/2 gap-1 rounded-[14px_14px_4px_14px] border border-[#262626] bg-white/[.08] px-3 py-2.5"><b /><b /><b /></span>
      </div>
      <div className="jp-you flex items-end justify-end gap-2">
        <span className="rounded-[14px_14px_4px_14px] bg-white px-3 py-2 font-medium text-black">{you}</span>
        <i className={av + ' border border-[#3d3d3d] text-white not-italic'}>{youInitials}</i>
      </div>
    </div>
  );
}`,
      tailwind: `<div aria-hidden="true" class="grid h-[180px] content-center gap-3 rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-5 text-[13px]">
  <div class="jp-me flex items-end gap-2"><i class="grid h-7 w-7 place-items-center rounded-full bg-white text-[10px] font-semibold not-italic text-black">JP</i><span class="rounded-[14px_14px_14px_4px] border border-[#262626] bg-white/[.06] px-3 py-2 text-[#ededed]">Vamos testar uma oferta nova no topo da página?</span></div>
  <div class="jp-typing -my-[5px] flex h-0 justify-end overflow-visible"><span class="flex -translate-y-1/2 gap-1 rounded-[14px_14px_4px_14px] border border-[#262626] bg-white/[.08] px-3 py-2.5"><b></b><b></b><b></b></span></div>
  <div class="jp-you flex items-end justify-end gap-2"><span class="rounded-[14px_14px_4px_14px] bg-white px-3 py-2 font-medium text-black">Bora. Pode subir.</span><i class="grid h-7 w-7 place-items-center rounded-full border border-[#3d3d3d] text-[10px] font-semibold not-italic text-white">M</i></div>
</div>
<style>
  .jp-me{animation:jp-me 7s cubic-bezier(.2,.8,.2,1) infinite}.jp-typing{animation:jp-typ 7s ease infinite}.jp-you{animation:jp-you 7s cubic-bezier(.2,.8,.2,1) infinite}
  .jp-typing b{width:6px;height:6px;border-radius:50%;background:#fff;animation:jp-dot .9s ease-in-out infinite}.jp-typing b:nth-child(2){animation-delay:.15s}.jp-typing b:nth-child(3){animation-delay:.3s}
  @keyframes jp-me{0%,4%{opacity:0;transform:translateY(18px) scale(.9)}12%,88%{opacity:1;transform:none}96%,100%{opacity:0;transform:translateY(-8px)}}
  @keyframes jp-typ{0%,18%{opacity:0;transform:scale(.6)}24%,42%{opacity:1;transform:none}46%,100%{opacity:0;transform:scale(.6)}}
  @keyframes jp-you{0%,44%{opacity:0;transform:translateY(18px) scale(.9)}52%,88%{opacity:1;transform:none}96%,100%{opacity:0;transform:translateY(-8px)}}
  @keyframes jp-dot{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-4px);opacity:1}}
</style>`,
    },
  },

  // 14 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-lead-scan-table",
    name: "Tabela de Leads com Leitor que Varre as Linhas",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Uma faixa de luz com bordas finas desce de linha em linha numa mini tabela de leads, empurrando cada linha um pouco para o lado quando passa; o último lead, parado, tem um anel que pulsa em volta do avatar e a etiqueta 'Recuperar' piscando, pedindo retorno. Explica 'leads recuperáveis' sem texto.",
    tags: ["Table", "Scanner", "Ping", "Leads", "Bento Illustration"],
    defaultSection: "Benefícios / Formulário",
    previewType: "jp-lead-scan",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `const CSS =
  '.jp-lt{position:relative}' +
  '.jp-lt::before{content:"";position:absolute;left:0;right:0;top:0;height:33.4%;pointer-events:none;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.1),rgba(255,255,255,0));border-top:1px solid rgba(255,255,255,.35);border-bottom:1px solid rgba(255,255,255,.35);animation:jp-scan 4.5s cubic-bezier(.6,0,.3,1) infinite}' +
  '.jp-lt>div{position:relative;z-index:1;animation:jp-row 4.5s ease-in-out infinite}.jp-lt>div:nth-child(2){animation-delay:1.5s}.jp-lt>div:nth-child(3){animation-delay:3s}' +
  '.jp-ping{position:relative}.jp-ping::after{content:"";position:absolute;inset:-4px;border-radius:50%;border:1.5px solid #fff;animation:jp-ping 1.5s ease-out infinite}' +
  '.jp-blink{animation:jp-blink 1.5s ease-in-out infinite}' +
  '@keyframes jp-scan{0%,22%{transform:translateY(0)}33%,55%{transform:translateY(100%)}66%,88%{transform:translateY(200%)}100%{transform:translateY(0)}}' +
  '@keyframes jp-row{0%,30%,100%{transform:none}8%,22%{transform:translateX(8px)}}' +
  '@keyframes jp-ping{0%{transform:scale(.7);opacity:.9}100%{transform:scale(1.7);opacity:0}}' +
  '@keyframes jp-blink{0%,100%{box-shadow:0 0 0 rgba(255,255,255,0);transform:scale(1)}50%{box-shadow:0 0 22px rgba(255,255,255,.55);transform:scale(1.06)}}' +
  '@media (prefers-reduced-motion:reduce){.jp-lt::before,.jp-lt>div,.jp-ping::after,.jp-blink{animation:none!important}}';

export function LeadScanTable({ rows = [['Ana', 'Concluiu', false], ['Bruno', 'Concluiu', false], ['Carla', 'Parou na etapa 2', true]] }) {
  return (
    <div aria-hidden="true" className="rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-5">
      <style>{CSS}</style>
      <div className="jp-lt grid text-[13px]">
        {rows.map(([name, status, stuck]) => (
          <div key={name} className="flex items-center gap-3 border-b border-[#262626] px-2 py-3 last:border-0">
            <i className={'grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold not-italic ' + (stuck ? 'jp-ping bg-white text-black' : 'bg-white/15 text-white')}>{name[0]}</i>
            <span className="flex-1 text-[#ededed]">{name}</span>
            <span className="text-[#a1a1a1]">{status}</span>
            <span className={'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.08em] ' + (stuck ? 'jp-blink bg-white text-black' : 'border border-[#3d3d3d] text-[#a1a1a1]')}>{stuck ? 'Recuperar' : 'Ok'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      tailwind: `<div aria-hidden="true" class="rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-5">
  <div class="jp-lt grid text-[13px]">
    <div class="flex items-center gap-3 border-b border-[#262626] px-2 py-3"><i class="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-[11px] not-italic text-white">A</i><span class="flex-1 text-[#ededed]">Ana</span><span class="text-[#a1a1a1]">Concluiu</span></div>
    <div class="flex items-center gap-3 border-b border-[#262626] px-2 py-3"><i class="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-[11px] not-italic text-white">B</i><span class="flex-1 text-[#ededed]">Bruno</span><span class="text-[#a1a1a1]">Concluiu</span></div>
    <div class="flex items-center gap-3 px-2 py-3"><i class="jp-ping grid h-7 w-7 place-items-center rounded-full bg-white text-[11px] not-italic text-black">C</i><span class="flex-1 text-[#ededed]">Carla</span><span class="jp-blink rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase text-black">Recuperar</span></div>
  </div>
</div>
<style>
  .jp-lt{position:relative}
  .jp-lt::before{content:"";position:absolute;left:0;right:0;top:0;height:33.4%;pointer-events:none;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.1),rgba(255,255,255,0));border-top:1px solid rgba(255,255,255,.35);border-bottom:1px solid rgba(255,255,255,.35);animation:jp-scan 4.5s cubic-bezier(.6,0,.3,1) infinite}
  .jp-lt>div{position:relative;z-index:1;animation:jp-row 4.5s ease-in-out infinite}.jp-lt>div:nth-child(2){animation-delay:1.5s}.jp-lt>div:nth-child(3){animation-delay:3s}
  .jp-ping{position:relative}.jp-ping::after{content:"";position:absolute;inset:-4px;border-radius:50%;border:1.5px solid #fff;animation:jp-ping 1.5s ease-out infinite}
  .jp-blink{animation:jp-blink 1.5s ease-in-out infinite}
  @keyframes jp-scan{0%,22%{transform:translateY(0)}33%,55%{transform:translateY(100%)}66%,88%{transform:translateY(200%)}100%{transform:translateY(0)}}
  @keyframes jp-row{0%,30%,100%{transform:none}8%,22%{transform:translateX(8px)}}
  @keyframes jp-ping{0%{transform:scale(.7);opacity:.9}100%{transform:scale(1.7);opacity:0}}
  @keyframes jp-blink{0%,100%{box-shadow:0 0 0 rgba(255,255,255,0);transform:scale(1)}50%{box-shadow:0 0 22px rgba(255,255,255,.55);transform:scale(1.06)}}
</style>`,
    },
  },

  // 15 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-chain-signal",
    name: "Cadeia Criativo → Página → Formulário → Painel que Acende",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Quatro miniaturas ligadas por fios tracejados (anúncio, página, formulário e painel); um 'sinal' passa por elas acendendo uma por vez: a peça sobe, ganha borda branca e brilho, e quando chega ao painel as barrinhas dele crescem. Uma bolinha corre pelos fios entre as etapas. Mostra a estrutura completa funcionando como um sistema.",
    tags: ["Flow", "Pipeline", "Sequential Glow", "Funnel", "Bento Illustration"],
    defaultSection: "Benefícios / Estrutura",
    previewType: "jp-chain",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `const CSS =
  '.jp-node{animation:jp-node 4s ease-in-out infinite;animation-delay:calc(var(--k) * 1s)}' +
  '.jp-wire i{position:absolute;top:50%;width:7px;height:7px;margin-top:-3.5px;border-radius:50%;background:#fff;box-shadow:0 0 10px #fff;animation:jp-run 1s linear infinite;animation-delay:calc(var(--k) * 1s)}' +
  '.jp-mini i{transform-origin:bottom;animation:jp-grow 4s cubic-bezier(.3,.7,.2,1) infinite;animation-delay:3s}' +
  '@keyframes jp-node{0%,30%,100%{transform:none;border-color:#3d3d3d;box-shadow:none}10%,20%{transform:translateY(-8px);border-color:rgba(255,255,255,.85);box-shadow:0 14px 34px rgba(255,255,255,.16),0 0 0 1px rgba(255,255,255,.3)}}' +
  '@keyframes jp-run{0%{left:0;opacity:0}15%,85%{opacity:1}100%{left:calc(100% - 7px);opacity:0}}' +
  '@keyframes jp-grow{0%{transform:scaleY(.12)}22%{transform:scaleY(1.06)}30%,72%{transform:scaleY(1)}90%,100%{transform:scaleY(.12)}}' +
  '@media (prefers-reduced-motion:reduce){.jp-node,.jp-wire i,.jp-mini i{animation:none!important}}';

const Thumb = ({ k, label, children }) => (
  <div className="grid flex-1 justify-items-center gap-2">
    <div className="jp-node grid h-[70px] w-full place-items-center rounded-xl border border-[#3d3d3d] bg-[#0d0d0d] p-2" style={{ '--k': k }}>{children}</div>
    <span className="text-[10px] uppercase tracking-[.1em] text-[#a1a1a1]">{label}</span>
  </div>
);
const Wire = ({ k }) => <span className="jp-wire relative mb-6 h-px w-6 flex-none border-t border-dashed border-[#3d3d3d]" style={{ '--k': k }}><i /></span>;

export function ChainSignal() {
  return (
    <div aria-hidden="true" className="flex items-center rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-5">
      <style>{CSS}</style>
      <Thumb k={0} label="Criativo"><span className="grid h-8 w-12 place-items-center rounded bg-white/15 text-white">▶</span></Thumb>
      <Wire k={0} />
      <Thumb k={1} label="Página"><span className="grid w-full gap-1"><i className="h-3 rounded-sm bg-white/50" /><i className="h-1.5 w-4/5 rounded bg-white/20" /><i className="h-1.5 w-3/5 rounded bg-white/20" /></span></Thumb>
      <Wire k={1} />
      <Thumb k={2} label="Formulário"><span className="grid w-full gap-1 text-[8px] text-[#a1a1a1]"><i className="rounded border border-[#3d3d3d] px-1 not-italic">Nome</i><i className="rounded border border-[#3d3d3d] px-1 not-italic">WhatsApp</i></span></Thumb>
      <Wire k={2} />
      <Thumb k={3} label="Painel"><span className="jp-mini flex h-10 w-full items-end gap-1">{[35, 55, 45, 80, 100].map((h, i) => <i key={i} className={'flex-1 rounded-t-sm ' + (i === 4 ? 'bg-white' : 'bg-white/30')} style={{ height: h + '%' }} />)}</span></Thumb>
    </div>
  );
}`,
      tailwind: `<div aria-hidden="true" class="flex items-center rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-5">
  <div class="jp-node grid h-[70px] flex-1 place-items-center rounded-xl border border-[#3d3d3d] bg-[#0d0d0d] text-white" style="--k:0">▶</div>
  <span class="jp-wire relative h-px w-6 flex-none border-t border-dashed border-[#3d3d3d]" style="--k:0"><i></i></span>
  <div class="jp-node grid h-[70px] flex-1 place-items-center rounded-xl border border-[#3d3d3d] bg-[#0d0d0d] text-xs text-white" style="--k:1">Página</div>
  <span class="jp-wire relative h-px w-6 flex-none border-t border-dashed border-[#3d3d3d]" style="--k:1"><i></i></span>
  <div class="jp-node grid h-[70px] flex-1 place-items-center rounded-xl border border-[#3d3d3d] bg-[#0d0d0d] text-xs text-white" style="--k:2">Formulário</div>
  <span class="jp-wire relative h-px w-6 flex-none border-t border-dashed border-[#3d3d3d]" style="--k:2"><i></i></span>
  <div class="jp-node flex h-[70px] flex-1 items-end gap-1 rounded-xl border border-[#3d3d3d] bg-[#0d0d0d] p-3" style="--k:3"><i class="jp-g flex-1 bg-white/30" style="height:35%"></i><i class="jp-g flex-1 bg-white/30" style="height:60%"></i><i class="jp-g flex-1 bg-white" style="height:100%"></i></div>
</div>
<style>
  .jp-node{animation:jp-node 4s ease-in-out infinite;animation-delay:calc(var(--k) * 1s)}
  .jp-wire i{position:absolute;top:50%;width:7px;height:7px;margin-top:-3.5px;border-radius:50%;background:#fff;box-shadow:0 0 10px #fff;animation:jp-run 1s linear infinite;animation-delay:calc(var(--k) * 1s)}
  .jp-g{transform-origin:bottom;animation:jp-grow 4s cubic-bezier(.3,.7,.2,1) infinite;animation-delay:3s}
  @keyframes jp-node{0%,30%,100%{transform:none;border-color:#3d3d3d;box-shadow:none}10%,20%{transform:translateY(-8px);border-color:rgba(255,255,255,.85);box-shadow:0 14px 34px rgba(255,255,255,.16),0 0 0 1px rgba(255,255,255,.3)}}
  @keyframes jp-run{0%{left:0;opacity:0}15%,85%{opacity:1}100%{left:calc(100% - 7px);opacity:0}}
  @keyframes jp-grow{0%{transform:scaleY(.12)}22%{transform:scaleY(1.06)}30%,72%{transform:scaleY(1)}90%,100%{transform:scaleY(.12)}}
</style>`,
    },
  },

  // 16 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-avatar-wave-proof",
    name: "Avatares que Pulam em Onda e Número que Pulsa",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Uma fileira de avatares sobrepostos pula em onda da esquerda para a direita, cada um virando branco por um instante no alto do pulo, e logo depois o número grande ('30+') dá uma batida com brilho. Prova social viva, que chama o olho para o número sem precisar de foto.",
    tags: ["Social Proof", "Avatars", "Wave", "Heartbeat", "Bento Illustration"],
    defaultSection: "Benefícios / Prova Social",
    previewType: "jp-avatar-wave",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `const CSS =
  '.jp-av{animation:jp-hop 3s cubic-bezier(.3,0,.3,1) infinite;animation-delay:calc(var(--i) * .12s)}' +
  '.jp-num{display:inline-block;animation:jp-beat 3s ease-in-out infinite;animation-delay:.9s}' +
  '@keyframes jp-hop{0%,30%,100%{transform:translateY(0)}12%{transform:translateY(-12px) scale(1.12);background:#fff;color:#000}22%{transform:translateY(2px)}}' +
  '@keyframes jp-beat{0%,30%,100%{transform:scale(1)}12%{transform:scale(1.14);text-shadow:0 0 32px rgba(255,255,255,.8)}}' +
  '@media (prefers-reduced-motion:reduce){.jp-av,.jp-num{animation:none!important}}';

export function AvatarWaveProof({ number = '30+', label = 'mentores atendidos', initials = ['A', 'B', 'C', 'D', 'E'], more = '+25' }) {
  return (
    <div aria-hidden="true" className="grid gap-5 rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-6">
      <style>{CSS}</style>
      <div className="flex items-center gap-3">
        <b className="jp-num text-[56px] font-semibold leading-none tracking-[-0.04em] text-white">{number}</b>
        <span className="text-sm leading-tight text-[#a1a1a1]">{label}</span>
      </div>
      <div className="flex">
        {[...initials, more].map((t, i) => (
          <i key={i} className={'jp-av grid h-10 w-10 place-items-center rounded-full border-2 border-[#0a0a0a] text-xs font-semibold not-italic ' + (i ? '-ml-2 ' : '') + (i === initials.length ? 'bg-[#262626] text-white' : 'bg-[#3d3d3d] text-white')} style={{ '--i': i }}>{t}</i>
        ))}
      </div>
    </div>
  );
}`,
      tailwind: `<div aria-hidden="true" class="grid gap-5 rounded-[20px] border border-[#262626] bg-[#0a0a0a] p-6">
  <div class="flex items-center gap-3"><b class="jp-num text-[56px] font-semibold leading-none tracking-[-0.04em] text-white">30+</b><span class="text-sm text-[#a1a1a1]">mentores<br>atendidos</span></div>
  <div class="flex">
    <i class="jp-av grid h-10 w-10 place-items-center rounded-full border-2 border-[#0a0a0a] bg-[#3d3d3d] text-xs not-italic text-white" style="--i:0">A</i>
    <i class="jp-av -ml-2 grid h-10 w-10 place-items-center rounded-full border-2 border-[#0a0a0a] bg-[#3d3d3d] text-xs not-italic text-white" style="--i:1">B</i>
    <i class="jp-av -ml-2 grid h-10 w-10 place-items-center rounded-full border-2 border-[#0a0a0a] bg-[#3d3d3d] text-xs not-italic text-white" style="--i:2">C</i>
    <i class="jp-av -ml-2 grid h-10 w-10 place-items-center rounded-full border-2 border-[#0a0a0a] bg-[#3d3d3d] text-xs not-italic text-white" style="--i:3">D</i>
    <i class="jp-av -ml-2 grid h-10 w-10 place-items-center rounded-full border-2 border-[#0a0a0a] bg-[#262626] text-xs not-italic text-white" style="--i:4">+25</i>
  </div>
</div>
<style>
  .jp-av{animation:jp-hop 3s cubic-bezier(.3,0,.3,1) infinite;animation-delay:calc(var(--i) * .12s)}
  .jp-num{display:inline-block;animation:jp-beat 3s ease-in-out infinite;animation-delay:.9s}
  @keyframes jp-hop{0%,30%,100%{transform:translateY(0)}12%{transform:translateY(-12px) scale(1.12);background:#fff;color:#000}22%{transform:translateY(2px)}}
  @keyframes jp-beat{0%,30%,100%{transform:scale(1)}12%{transform:scale(1.14);text-shadow:0 0 32px rgba(255,255,255,.8)}}
</style>`,
    },
  },

  // 17 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-animated-line-icons",
    name: "Kit de Ícones de Traço Animados (Chat, Doc, Gráfico, Radar…)",
    category: "cards-borders",
    categoryLabel: "Cards & Bordas",
    description: "Oito ícones de linha em preto e branco, cada um com um movimento que conta o que ele significa: pontinhos do chat pulando, linhas do documento se escrevendo, barras do gráfico respirando, aviãozinho de papel voando, balões conversando, camadas se abrindo, radar varrendo e linha de tendência subindo com a seta. Tudo em SVG + CSS, herdando a cor do texto.",
    tags: ["Icons", "SVG", "Stroke Animation", "Micro Interaction", "currentColor"],
    defaultSection: "Cards de Benefícios",
    previewType: "jp-line-icons",
    tech: ["Tailwind CSS", "React", "SVG", "CSS Keyframes"],
    frameworks: {
      react: `const CSS =
  '.ai{width:30px;height:30px;overflow:visible}.ai *{transform-box:fill-box;transform-origin:center}' +
  '@keyframes ai-dot{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-2.5px);opacity:1}}' +
  '@keyframes ai-draw{0%{stroke-dashoffset:1}45%,80%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}}' +
  '@keyframes ai-head{0%,44%{opacity:0}52%,80%{opacity:1}92%,100%{opacity:0}}' +
  '@keyframes ai-bar{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}' +
  '@keyframes ai-fly{0%{transform:translate(-3px,3px);opacity:0}30%{opacity:1}70%{transform:translate(2px,-2px);opacity:1}100%{transform:translate(4px,-4px);opacity:0}}' +
  '@keyframes ai-talk{0%,100%{opacity:.35;transform:scale(.94)}20%,60%{opacity:1;transform:scale(1)}}' +
  '@keyframes ai-up{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.2px)}}' +
  '@keyframes ai-down{0%,100%{transform:translateY(0)}50%{transform:translateY(2.2px)}}' +
  '@keyframes ai-sweep{to{transform:rotate(360deg)}}' +
  '.ai-chat .d{animation:ai-dot 1.3s ease-in-out infinite}.ai-chat .d:nth-of-type(2){animation-delay:.16s}.ai-chat .d:nth-of-type(3){animation-delay:.32s}' +
  '.ai-doc .l{stroke-dasharray:1;animation:ai-draw 2.6s ease-in-out infinite}.ai-doc .l2{animation-delay:.25s}' +
  '.ai-chart .b{stroke-width:2.6;transform-origin:50% 100%;animation:ai-bar 2s ease-in-out infinite}.ai-chart .b2{animation-delay:.3s}.ai-chart .b3{animation-delay:.6s}' +
  '.ai-send .plane{animation:ai-fly 2.4s ease-in-out infinite}' +
  '.ai-talk .a{animation:ai-talk 2.6s ease-in-out infinite}.ai-talk .b{animation:ai-talk 2.6s ease-in-out 1.3s infinite}' +
  '.ai-layers .t{animation:ai-up 2.6s ease-in-out infinite}.ai-layers .bt{animation:ai-down 2.6s ease-in-out infinite}' +
  '.ai-radar .sweep{transform-origin:50% 100%;animation:ai-sweep 3s linear infinite}' +
  '.ai-trend .line{stroke-dasharray:1;animation:ai-draw 2.8s ease-in-out infinite}.ai-trend .head{animation:ai-head 2.8s ease-in-out infinite}' +
  '@media (prefers-reduced-motion:reduce){.ai *{animation:none!important}}';

const S = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
export const ICONS = {
  chat: <svg className="ai ai-chat" {...S}><path d="M4 5h16v11H9l-5 4z" /><circle className="d" cx="9" cy="10.5" r=".9" fill="currentColor" /><circle className="d" cx="12" cy="10.5" r=".9" fill="currentColor" /><circle className="d" cx="15" cy="10.5" r=".9" fill="currentColor" /></svg>,
  doc: <svg className="ai ai-doc" {...S}><path d="M6 3h9l3 3v15H6z" /><path className="l" pathLength="1" d="M9 10h6" /><path className="l l2" pathLength="1" d="M9 14h6" /></svg>,
  chart: <svg className="ai ai-chart" {...S}><path d="M4 20h16" /><path className="b" d="M7 17v-5" /><path className="b b2" d="M12 17V8" /><path className="b b3" d="M17 17v-7" /></svg>,
  send: <svg className="ai ai-send" {...S}><g className="plane"><path d="M21 3 3 10l7 3 3 7z" /><path d="m10 13 4-4" /></g></svg>,
  talk: <svg className="ai ai-talk" {...S}><path className="a" d="M3 5h11v7H7l-4 3z" /><path className="b" d="M21 10h-5v6h2l3 3z" /></svg>,
  layers: <svg className="ai ai-layers" {...S}><path className="t" d="m12 3 9 5-9 5-9-5z" /><path d="m3 12 9 5 9-5" /><path className="bt" d="m3 16 9 5 9-5" /></svg>,
  radar: <svg className="ai ai-radar" {...S}><path d="M3 18a9 9 0 0 1 18 0" /><path d="M7 18a5 5 0 0 1 10 0" /><path className="sweep" d="M12 18V9" /></svg>,
  trend: <svg className="ai ai-trend" {...S}><path className="line" pathLength="1" d="M3 17l5-5 4 3 8-8" /><path className="head" d="M15 7h5v5" /></svg>,
};

export function LineIconKit() {
  return (
    <div className="grid grid-cols-4 gap-3 bg-black p-6">
      <style>{CSS}</style>
      {Object.entries(ICONS).map(([k, icon]) => (
        <div key={k} className="grid place-items-center gap-2 rounded-2xl border border-[#262626] bg-[#0a0a0a] p-5 text-white">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-[#3d3d3d]">{icon}</span>
          <span className="text-[11px] uppercase tracking-[.1em] text-[#a1a1a1]">{k}</span>
        </div>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="grid grid-cols-4 gap-3 bg-black p-6 text-white">
  <span class="grid h-14 w-14 place-items-center rounded-2xl border border-[#3d3d3d]"><svg class="ai ai-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/><circle class="d" cx="9" cy="10.5" r=".9" fill="currentColor"/><circle class="d" cx="12" cy="10.5" r=".9" fill="currentColor"/><circle class="d" cx="15" cy="10.5" r=".9" fill="currentColor"/></svg></span>
  <span class="grid h-14 w-14 place-items-center rounded-2xl border border-[#3d3d3d]"><svg class="ai ai-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15H6z"/><path class="l" pathLength="1" d="M9 10h6"/><path class="l l2" pathLength="1" d="M9 14h6"/></svg></span>
  <span class="grid h-14 w-14 place-items-center rounded-2xl border border-[#3d3d3d]"><svg class="ai ai-chart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 20h16"/><path class="b" d="M7 17v-5"/><path class="b b2" d="M12 17V8"/><path class="b b3" d="M17 17v-7"/></svg></span>
  <span class="grid h-14 w-14 place-items-center rounded-2xl border border-[#3d3d3d]"><svg class="ai ai-trend" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path class="line" pathLength="1" d="M3 17l5-5 4 3 8-8"/><path class="head" d="M15 7h5v5"/></svg></span>
  <span class="grid h-14 w-14 place-items-center rounded-2xl border border-[#3d3d3d]"><svg class="ai ai-radar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 18a9 9 0 0 1 18 0"/><path d="M7 18a5 5 0 0 1 10 0"/><path class="sweep" d="M12 18V9"/></svg></span>
</div>
<style>
  .ai{width:30px;height:30px;overflow:visible}.ai *{transform-box:fill-box;transform-origin:center}
  @keyframes ai-dot{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-2.5px);opacity:1}}
  @keyframes ai-draw{0%{stroke-dashoffset:1}45%,80%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}}
  @keyframes ai-head{0%,44%{opacity:0}52%,80%{opacity:1}92%,100%{opacity:0}}
  @keyframes ai-bar{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}
  @keyframes ai-sweep{to{transform:rotate(360deg)}}
  .ai-chat .d{animation:ai-dot 1.3s ease-in-out infinite}.ai-chat .d:nth-of-type(2){animation-delay:.16s}.ai-chat .d:nth-of-type(3){animation-delay:.32s}
  .ai-doc .l{stroke-dasharray:1;animation:ai-draw 2.6s ease-in-out infinite}.ai-doc .l2{animation-delay:.25s}
  .ai-chart .b{stroke-width:2.6;transform-origin:50% 100%;animation:ai-bar 2s ease-in-out infinite}.ai-chart .b2{animation-delay:.3s}.ai-chart .b3{animation-delay:.6s}
  .ai-radar .sweep{transform-origin:50% 100%;animation:ai-sweep 3s linear infinite}
  .ai-trend .line{stroke-dasharray:1;animation:ai-draw 2.8s ease-in-out infinite}.ai-trend .head{animation:ai-head 2.8s ease-in-out infinite}
  @media (prefers-reduced-motion:reduce){.ai *{animation:none!important}}
</style>`,
    },
  },

  // 18 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-circular-split-roll",
    name: "Depoimentos em Roda Dupla (Nomes x Fotos)",
    category: "navigation",
    categoryLabel: "Modais & Menus",
    description: "Com a seção presa na tela, duas rodas giram com a rolagem em sentidos opostos: à esquerda os nomes sobem num arco e, à direita, as fotos descem. O nome que chega ao ponto de foco cresce, acende e abre estrelas, nicho e depoimento; a foto no foco fica colorida e grande enquanto as outras ficam cinza e pequenas. Muito editorial e memorável.",
    tags: ["Scroll Pinned", "Circular Layout", "Testimonials", "Counter Rotation", "Focus Point"],
    defaultSection: "Depoimentos",
    previewType: "jp-split-roll",
    tech: ["Tailwind CSS", "React", "position: sticky", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const shape = (s, start, power) => Math.pow(clamp((s - start) / (1 - start)), power);
const lerp = (a, b, t) => a + (b - a) * t;
const TEXT_SIDE_SCALE = 0.68, TEXT_SIDE_OPACITY = 0.18, TEXT_START = 0.42, TEXT_POWER = 2.6;
const IMG_SIDE_SCALE = 0.58, IMG_SIDE_OPACITY = 0.14, IMG_START = 0.45, IMG_POWER = 3.2, SCRUB = 0.12;

// Em telas < 1025px troque por uma lista/pilha simples (ex.: TestimonialStack).
export function CircularSplitRoll({ step = 70, items = [
  { name: 'Lucas Córdova', role: 'Mentoria de concursos legislativos', quote: 'Entregou tudo dentro do prazo. Recomendo demais!', img: '' },
  { name: 'André Gustavo', role: 'Mentoria de carreira policial', quote: 'Excelente profissional. Muito criativo e disponível!', img: '' },
  { name: 'Helena Emerick', role: 'Mentora de concursos públicos', quote: 'Podem contratar de olhos fechados.', img: '' },
  { name: 'Rodrigo Pinha', role: 'Mentoria Direito Policial', quote: 'Ficou exatamente como eu queria. Nota 10!', img: '' },
  { name: 'Malu Pacheco', role: 'Mentoria Direito Policial', quote: 'Tudo foi feito com muito cuidado e atenção.', img: '' },
] }) {
  const roll = useRef(null), texts = useRef([]), imgs = useRef([]);
  const all = [...items, ...items]; // a roda tem cada depoimento duas vezes
  const real = items.length, total = all.length;

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const R0 = roll.current, T = texts.current, I = imgs.current;
    let target = 0, current = -1, raf = 0;
    const draw = (p) => {
      const vw = innerWidth, vh = innerHeight, R = Math.min(500, vh * 0.62, vw * 0.36);
      const cardW = Math.min(212, vw * 0.15);
      R0.style.setProperty('--cw', cardW + 'px'); R0.style.setProperty('--ch', cardW * 1.25 + 'px');
      const rot = (p * (real - 1)) / total; // gira só até o último ficar no foco
      for (let i = 0; i < total; i++) {
        const a = (i / total - rot) * Math.PI * 2, c = Math.cos(a), s = Math.sin(a), strength = (c + 1) / 2;
        const ft = shape(strength, TEXT_START, TEXT_POWER), t = T[i];
        t.style.transform = 'translate3d(' + (R * c - R).toFixed(1) + 'px,' + (-R * s).toFixed(1) + 'px,0) scale(' + lerp(TEXT_SIDE_SCALE, 1, ft).toFixed(3) + ')';
        t.style.opacity = lerp(TEXT_SIDE_OPACITY, 1, ft).toFixed(3);
        t.style.zIndex = Math.round(lerp(1, 30, ft));
        t.style.setProperty('--more', clamp((ft - 0.82) / 0.18).toFixed(3));
        const fi = shape(strength, IMG_START, IMG_POWER), m = I[i];
        m.style.transform = 'translate3d(' + (R - R * c).toFixed(1) + 'px,' + (R * s).toFixed(1) + 'px,0) scale(' + lerp(IMG_SIDE_SCALE, 1, fi).toFixed(3) + ')';
        m.style.opacity = lerp(IMG_SIDE_OPACITY, 1, fi).toFixed(3);
        m.style.zIndex = Math.round(lerp(1, 40, fi));
        m.style.setProperty('--gray', (1 - fi).toFixed(3));
      }
    };
    const measure = () => { const r = R0.getBoundingClientRect(); target = clamp(-r.top / Math.max(R0.offsetHeight - innerHeight, 1)); return r; };
    const frame = () => {
      raf = 0;
      const d = target - current;
      current = Math.abs(d) < 0.0005 || current < 0 ? target : current + d * SCRUB;
      draw(current);
      if (current !== target) raf = requestAnimationFrame(frame);
    };
    const on = () => { const r = measure(); if (r.bottom < -200 || r.top > innerHeight + 200) return; if (!raf) raf = requestAnimationFrame(frame); };
    const rs = () => { current = -1; on(); };
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', rs);
    measure(); current = target; draw(current);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', rs); cancelAnimationFrame(raf); };
  }, [real, total]);

  return (
    <section ref={roll} className="relative bg-black text-white" style={{ height: 'calc(100vh + ' + (real - 1) * step + 'vh)' }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute left-[33%] top-1/2 h-0 w-0">
          {all.map((t, i) => (
            <div key={i} ref={(n) => (texts.current[i] = n)} className="absolute left-0 top-0 -ml-[min(235px,18vw)] w-[min(470px,36vw)] will-change-transform">
              <b className="block -translate-y-1/2 whitespace-nowrap text-[clamp(28px,2.8vw,44px)] font-semibold leading-none tracking-[-0.04em]">{t.name}</b>
              <div className="pointer-events-none absolute inset-x-0 top-[calc(50%+.75em)] grid gap-3 text-[17px]" style={{ opacity: 'var(--more,0)', transform: 'translateY(calc((1 - var(--more,0)) * 12px))' }}>
                <span className="text-[13px] text-[#a1a1a1]">{t.role}</span>
                <span className="tracking-[.2em]">★★★★★</span>
                <p className="m-0 text-[clamp(15px,1.1vw,17px)] leading-[1.55] text-[#ededed]">{t.quote}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-[72%] top-1/2 h-0 w-0">
          {all.map((t, i) => (
            <div key={i} ref={(n) => (imgs.current[i] = n)}
              className="absolute left-0 top-0 -ml-[calc(var(--cw,212px)/2)] -mt-[calc(var(--ch,265px)/2)] h-[var(--ch,265px)] w-[var(--cw,212px)] overflow-hidden rounded-[20px] border border-[#3d3d3d] bg-[#111] shadow-[0_30px_60px_rgba(0,0,0,.55),0_8px_20px_rgba(0,0,0,.4)] will-change-transform">
              {t.img ? <img src={t.img} alt="" className="h-full w-full object-cover" style={{ filter: 'grayscale(var(--gray,1))' }} />
                : <div className="grid h-full place-items-center bg-[linear-gradient(160deg,#2a2a2a,#0d0d0d)] text-4xl font-semibold" style={{ filter: 'grayscale(var(--gray,1))' }}>{t.name[0]}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
      tailwind: `<section class="jp-roll relative bg-black text-white" style="height:calc(100vh + 3 * 70vh)">
  <div class="sticky top-0 h-svh overflow-hidden">
    <div class="absolute left-[33%] top-1/2 h-0 w-0">
      <div class="jp-rt"><b class="block -translate-y-1/2 whitespace-nowrap text-[40px] font-semibold leading-none tracking-[-0.04em]">Lucas Córdova</b><div class="jp-more"><span class="text-[13px] text-[#a1a1a1]">Concursos legislativos</span><p class="m-0 text-[#ededed]">Recomendo demais!</p></div></div>
      <div class="jp-rt"><b class="block -translate-y-1/2 whitespace-nowrap text-[40px] font-semibold leading-none tracking-[-0.04em]">Helena Emerick</b><div class="jp-more"><span class="text-[13px] text-[#a1a1a1]">Concursos públicos</span><p class="m-0 text-[#ededed]">Podem contratar de olhos fechados.</p></div></div>
      <div class="jp-rt"><b class="block -translate-y-1/2 whitespace-nowrap text-[40px] font-semibold leading-none tracking-[-0.04em]">Rodrigo Pinha</b><div class="jp-more"><span class="text-[13px] text-[#a1a1a1]">Direito Policial</span><p class="m-0 text-[#ededed]">Nota 10!</p></div></div>
      <div class="jp-rt"><b class="block -translate-y-1/2 whitespace-nowrap text-[40px] font-semibold leading-none tracking-[-0.04em]">Malu Pacheco</b><div class="jp-more"><span class="text-[13px] text-[#a1a1a1]">Direito Policial</span><p class="m-0 text-[#ededed]">Muito cuidado e atenção.</p></div></div>
    </div>
    <div class="absolute left-[72%] top-1/2 h-0 w-0">
      <div class="jp-ri"><img src="lucas.jpg" alt=""></div><div class="jp-ri"><img src="helena.jpg" alt=""></div><div class="jp-ri"><img src="rodrigo.jpg" alt=""></div><div class="jp-ri"><img src="malu.jpg" alt=""></div>
    </div>
  </div>
</section>
<style>
  .jp-rt{position:absolute;left:0;top:0;width:min(470px,36vw);margin-left:calc(min(470px,36vw)/-2);will-change:transform,opacity}
  .jp-more{position:absolute;left:0;right:0;top:calc(50% + .75em);display:grid;gap:12px;opacity:var(--more,0);transform:translateY(calc((1 - var(--more,0)) * 12px));pointer-events:none}
  .jp-ri{position:absolute;left:0;top:0;width:var(--cw,212px);height:var(--ch,265px);margin:calc(var(--ch,265px)/-2) 0 0 calc(var(--cw,212px)/-2);border-radius:20px;overflow:hidden;border:1px solid #3d3d3d;background:#111;box-shadow:0 30px 60px rgba(0,0,0,.55);will-change:transform,opacity}
  .jp-ri img{width:100%;height:100%;object-fit:cover;filter:grayscale(var(--gray,1))}
</style>
<script>
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var roll = document.querySelector('.jp-roll'), T = [].slice.call(roll.querySelectorAll('.jp-rt')), I = [].slice.call(roll.querySelectorAll('.jp-ri'));
  var total = T.length, real = total; // repita os itens 2x no HTML para a roda ficar cheia (real = total / 2)
  var target = 0, current = -1, raf = 0;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function shape(s, a, p) { return Math.pow(clamp((s - a) / (1 - a)), p); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function draw(p) {
    var vw = innerWidth, vh = innerHeight, R = Math.min(500, vh * 0.62, vw * 0.36), cw = Math.min(212, vw * 0.15);
    roll.style.setProperty('--cw', cw + 'px'); roll.style.setProperty('--ch', cw * 1.25 + 'px');
    var rot = p * (real - 1) / total;
    for (var i = 0; i < total; i++) {
      var a = (i / total - rot) * Math.PI * 2, c = Math.cos(a), s = Math.sin(a), st = (c + 1) / 2, ft = shape(st, 0.42, 2.6), fi = shape(st, 0.45, 3.2);
      T[i].style.transform = 'translate3d(' + (R * c - R).toFixed(1) + 'px,' + (-R * s).toFixed(1) + 'px,0) scale(' + lerp(0.68, 1, ft).toFixed(3) + ')'; T[i].style.opacity = lerp(0.18, 1, ft).toFixed(3); T[i].style.zIndex = Math.round(lerp(1, 30, ft)); T[i].style.setProperty('--more', clamp((ft - 0.82) / 0.18).toFixed(3));
      I[i].style.transform = 'translate3d(' + (R - R * c).toFixed(1) + 'px,' + (R * s).toFixed(1) + 'px,0) scale(' + lerp(0.58, 1, fi).toFixed(3) + ')'; I[i].style.opacity = lerp(0.14, 1, fi).toFixed(3); I[i].style.zIndex = Math.round(lerp(1, 40, fi)); I[i].style.setProperty('--gray', (1 - fi).toFixed(3));
    }
  }
  function measure() { var r = roll.getBoundingClientRect(); target = clamp(-r.top / Math.max(roll.offsetHeight - innerHeight, 1)); return r; }
  function frame() { raf = 0; var d = target - current; current = Math.abs(d) < 0.0005 || current < 0 ? target : current + d * 0.12; draw(current); if (current !== target) raf = requestAnimationFrame(frame); }
  addEventListener('scroll', function () { var r = measure(); if (r.bottom < -200 || r.top > innerHeight + 200) return; if (!raf) raf = requestAnimationFrame(frame); }, { passive: true });
  measure(); current = target; draw(current);
})();
</script>`,
    },
  },

  // 19 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-story-sticky-scenes",
    name: "História em Trechos com Palco Preso que Troca de Cena",
    category: "navigation",
    categoryLabel: "Modais & Menus",
    description: "Texto em trechos à esquerda e um palco escuro preso na tela à direita: o trecho mais perto do meio da tela fica aceso (os outros apagados) e escolhe a cena animada do palco, que entra subindo com leve escala enquanto a anterior sai. Pontinhos embaixo viram pílula no trecho ativo. No celular o palco fica preso no topo, encolhido, e o texto rola por baixo.",
    tags: ["Scrollytelling", "Sticky Stage", "Scene Switch", "Storytelling", "Progress Dots"],
    defaultSection: "Dor / História",
    previewType: "jp-story",
    tech: ["Tailwind CSS", "React", "position: sticky", "CSS Transitions"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

// Cada passo tem o texto e a "cena" (qualquer JSX: mockup, ilustração, vídeo curto...)
export function StorySticky({ steps = [
  { kicker: 'O clique', text: 'O aluno vê o seu anúncio e clica. Até aqui o tráfego fez a parte dele.', scene: 'Anúncio → Página' },
  { kicker: 'O preço', text: 'Três páginas iguais, com o mesmo preço. Por que ele escolheria a sua?', scene: 'R$ 997 · R$ 997 · R$ 997' },
  { kicker: 'O ambiente', text: 'O mesmo prato vale mais num restaurante bonito. Com a mentoria é igual.', scene: 'Mesmo prato, outro valor' },
  { kicker: 'A ponte', text: 'A página é a ponte entre a qualidade real e o valor que o aluno enxerga.', scene: 'Qualidade = Valor percebido' },
] }) {
  const root = useRef(null), stage = useRef(null), stepRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [s, setS] = useState(1);

  useEffect(() => {
    const stacked = matchMedia('(max-width: 960px)');
    let raf = 0;
    const fit = () => setS(stacked.matches ? Math.min(1, (innerHeight * 0.42) / 400) : 1); // cena desenhada para 400px
    const update = () => {
      raf = 0;
      // no celular o "meio" é o centro da área livre abaixo do palco preso
      const below = stacked.matches ? Math.max(stage.current.getBoundingClientRect().bottom, 0) : 0;
      const mid = below + (innerHeight - below) * 0.5;
      let best = 0, bestD = Infinity;
      stepRefs.current.forEach((el, i) => { if (!el) return; const r = el.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - mid); if (d < bestD) { bestD = d; best = i; } });
      setActive(best);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    const rs = () => { fit(); on(); };
    fit(); update();
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', rs);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', rs); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section ref={root} className="mx-auto grid max-w-[1120px] gap-10 bg-black px-6 text-white lg:grid-cols-[5fr_6fr] lg:gap-20">
      <div ref={stage} className="sticky top-0 z-[2] self-start bg-black py-3 lg:top-[calc(50vh-270px)] lg:order-2 lg:h-[540px] lg:bg-transparent lg:py-0">
        <div className="relative overflow-hidden rounded-[20px] border border-[#262626] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,.07),transparent_70%),linear-gradient(180deg,#101010,#070707)] shadow-[0_40px_100px_rgba(0,0,0,.6)]" style={{ height: 500 * s }}>
          {steps.map((st, i) => (
            <div key={i} aria-hidden={i !== active}
              className={'absolute inset-0 grid place-items-center p-9 text-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ' + (i === active ? 'opacity-100' : 'pointer-events-none translate-y-6 scale-[.97] opacity-0')}>
              {typeof st.scene === 'string'
                ? <div className="rounded-xl border border-[#3d3d3d] bg-[#0d0d0d] px-6 py-10 text-xl font-semibold tracking-[-0.02em]">{st.scene}</div>
                : st.scene}
            </div>
          ))}
        </div>
        <div className="mt-[18px] flex justify-center gap-2">
          {steps.map((_, i) => <i key={i} className={'h-1.5 rounded-full transition-[width,background] duration-[400ms] ' + (i === active ? 'w-[22px] bg-white' : 'w-1.5 bg-white/20')} />)}
        </div>
      </div>
      <div className="lg:order-1">
        {steps.map((st, i) => (
          <div key={i} ref={(n) => (stepRefs.current[i] = n)} className={'flex min-h-[52vh] flex-col justify-center transition-opacity duration-500 first:min-h-[44vh] ' + (i === active ? 'opacity-100' : 'opacity-[.28]')}>
            <span className="mb-[22px] inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[.16em] text-[#a1a1a1] before:h-px before:w-7 before:bg-current">{st.kicker}</span>
            <p className="m-0 text-[clamp(22px,2.2vw,30px)] font-semibold leading-[1.25] tracking-[-0.025em]">{st.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}`,
      tailwind: `<section class="jp-story mx-auto grid max-w-[1120px] gap-20 bg-black px-6 text-white lg:grid-cols-[5fr_6fr]">
  <div>
    <div class="jp-step is-active"><span class="jp-kick">O clique</span><p class="text-[28px] font-semibold leading-tight">O aluno vê o seu anúncio e clica.</p></div>
    <div class="jp-step"><span class="jp-kick">O preço</span><p class="text-[28px] font-semibold leading-tight">Três páginas iguais, com o mesmo preço.</p></div>
    <div class="jp-step"><span class="jp-kick">A ponte</span><p class="text-[28px] font-semibold leading-tight">A página é a ponte entre a qualidade real e o valor percebido.</p></div>
  </div>
  <div class="jp-stage sticky top-[calc(50vh-270px)] h-[540px] self-start">
    <div class="relative h-[500px] overflow-hidden rounded-[20px] border border-[#262626] bg-[linear-gradient(180deg,#101010,#070707)]">
      <div class="jp-scene is-on">Anúncio → Página</div><div class="jp-scene">R$ 997 · R$ 997 · R$ 997</div><div class="jp-scene">Qualidade = Valor percebido</div>
    </div>
    <div class="jp-dots mt-[18px] flex justify-center gap-2"><i class="is-on"></i><i></i><i></i></div>
  </div>
</section>
<style>
  .jp-step{display:flex;flex-direction:column;justify-content:center;min-height:52vh;opacity:.28;transition:opacity .5s ease}.jp-step.is-active{opacity:1}
  .jp-kick{display:inline-flex;align-items:center;gap:10px;margin-bottom:22px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#a1a1a1}.jp-kick::before{content:"";width:28px;height:1px;background:currentColor}
  .jp-scene{position:absolute;inset:0;display:grid;place-items:center;padding:36px;font-size:20px;font-weight:600;opacity:0;transform:translateY(24px) scale(.97);transition:opacity .55s ease,transform .7s cubic-bezier(.2,.7,.2,1)}.jp-scene.is-on{opacity:1;transform:none}
  .jp-dots i{width:6px;height:6px;border-radius:99px;background:rgba(255,255,255,.2);transition:width .4s,background .4s}.jp-dots i.is-on{width:22px;background:#fff}
</style>
<script>
(function () {
  var story = document.querySelector('.jp-story'), steps = [].slice.call(story.querySelectorAll('.jp-step')), scenes = story.querySelectorAll('.jp-scene'), dots = story.querySelectorAll('.jp-dots i'), active = -1;
  function set(i) { if (i === active) return; active = i; steps.forEach(function (el, k) { el.classList.toggle('is-active', k === i); }); scenes.forEach(function (el, k) { el.classList.toggle('is-on', k === i); }); dots.forEach(function (el, k) { el.classList.toggle('is-on', k === i); }); }
  function update() { var mid = innerHeight * 0.5, best = 0, bd = 1e9; steps.forEach(function (el, i) { var r = el.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - mid); if (d < bd) { bd = d; best = i; } }); set(best); }
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true }); update();
})();
</script>`,
    },
  },

  // 20 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-pinned-timeline-stems",
    name: "Linha do Tempo Horizontal com Hastes que Sobem",
    category: "navigation",
    categoryLabel: "Modais & Menus",
    description: "A seção trava e a rolagem vira um trilho horizontal: um eixo branco com brilho se estende da esquerda para a direita e, conforme cada etapa chega perto do centro, uma haste se ergue (para cima ou para baixo, alternando) com um ponto luminoso na ponta e o texto sobe linha por linha de dentro da máscara. Um card com vídeo pode avançar quadro a quadro junto.",
    tags: ["Scroll Pinned", "Horizontal Timeline", "Masked Lines", "Steps", "Video Scrub"],
    defaultSection: "Como Funciona",
    previewType: "jp-timeline",
    tech: ["Tailwind CSS", "React", "position: sticky", "CSS Variables"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (t) => 1 - Math.pow(1 - t, 3);

// cada linha sobe de dentro do próprio recorte (--r vem do scroll)
const L = ({ children }) => (
  <span className="block overflow-hidden pb-[.08em] -mb-[.08em]"><span data-l="" className="block" style={{ transform: 'translateY(calc((1 - var(--r,1)) * 110%))' }}>{children}</span></span>
);

export function PinnedTimeline({ title = 'Como funciona', period = '4 etapas', steps = [
  { t: 'Diagnóstico', d: 'Entendo a sua mentoria, o seu aluno e a sua oferta.' },
  { t: 'Copy e estrutura', d: 'Escrevo a página pensando em quem decide a compra.' },
  { t: 'Design e build', d: 'A página ganha forma, rápida e feita para o celular.' },
  { t: 'Publicação', d: 'No ar, com formulário, rastreamento e ajustes.' },
] }) {
  const scroller = useRef(null), track = useRef(null), line = useRef(null), items = useRef([]);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = innerHeight, vw = innerWidth, r = scroller.current.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      const p = clamp(-r.top / Math.max(scroller.current.offsetHeight - vh, 1)), slide = clamp(p / 0.92);
      const dist = Math.max(track.current.offsetWidth - vw, 0);
      track.current.style.transform = 'translate3d(' + (-dist * slide).toFixed(1) + 'px,0,0)';
      line.current.style.setProperty('--line', clamp((slide - 0.03) / 0.9).toFixed(4));
      items.current.forEach((it) => {
        if (!it) return;
        // cada etapa ergue a haste e revela o texto quando chega perto do centro
        const k = reduce ? 1 : clamp((vw * 0.88 - it.getBoundingClientRect().left) / (vw * 0.34));
        it.style.setProperty('--s', ease(clamp(k / 0.45)).toFixed(4));
        it.querySelectorAll('[data-l]').forEach((s, j) => s.style.setProperty('--r', ease(clamp((k - 0.18 - j * 0.07) / 0.45)).toFixed(4)));
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on); update();
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [steps.length]);

  return (
    <div ref={scroller} className="relative h-[340vh] bg-black text-white max-md:h-[460vh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div ref={track} className="flex h-[min(40vw,66vh)] w-max items-center px-[6vw] will-change-transform max-md:h-[76svh]">
          <div className="relative h-full" style={{ width: 'calc(25vw + 30vw * ' + (steps.length - 1) + ' + 27vw)' }}>
            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-white/10">
              <i className="relative h-2.5 w-2.5 flex-none rounded-full bg-white" />
              <i ref={line} className="relative h-px flex-1 origin-left bg-white shadow-[0_0_12px_rgba(255,255,255,.6)]" style={{ transform: 'scaleX(var(--line,0))' }} />
              <i className="relative h-2.5 w-2.5 flex-none rounded-full bg-white" />
            </div>
            <h2 className="absolute left-0 top-0 m-0 w-[21vw] text-[clamp(28px,2.9vw,50px)] font-semibold leading-[1.02] tracking-[-0.03em]">{title}</h2>
            <p className="absolute bottom-0 left-0 m-0 text-[clamp(14px,1.2vw,20px)] text-[#a1a1a1]">{period}</p>
            {steps.map((st, i) => {
              const top = i % 2 === 0;
              return (
                <div key={i} ref={(n) => (items.current[i] = n)} className={'absolute h-1/2 w-[27vw] ' + (top ? 'top-0' : 'top-1/2')} style={{ left: 'calc(25vw + ' + i + ' * 30vw)', '--s': 0 }}>
                  <span className="absolute inset-y-0 left-0 w-px">
                    <span className={'absolute inset-0 ' + (top ? 'origin-bottom bg-[linear-gradient(to_top,#fff,rgba(255,255,255,.25))]' : 'origin-top bg-[linear-gradient(to_bottom,#fff,rgba(255,255,255,.25))]')} style={{ transform: 'scaleY(var(--s))' }} />
                    <i className={'absolute -left-[7px] h-[15px] w-[15px] rounded-full bg-white shadow-[0_0_0_5px_rgba(255,255,255,.12),0_0_22px_rgba(255,255,255,.7)] ' + (top ? '-top-[7px]' : '-bottom-[7px]')} style={{ transform: 'scale(var(--s))' }} />
                  </span>
                  <div className={'relative flex h-full flex-col gap-3 pl-[clamp(18px,1.8vw,32px)] ' + (top ? '-mt-1.5' : 'mt-1.5 justify-end')}>
                    <span className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#a1a1a1]" style={{ opacity: 'var(--s)' }}>Etapa {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="m-0 text-[clamp(20px,1.9vw,32px)] leading-[1.08] tracking-[-0.02em]"><L>{st.t}</L></h3>
                    <p className="m-0 max-w-[95%] text-[clamp(14px,1.08vw,17px)] leading-normal text-[#a1a1a1]"><L>{st.d}</L></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `<div class="jp-tl relative h-[340vh] bg-black text-white">
  <div class="sticky top-0 flex h-svh items-center overflow-hidden">
    <div class="jp-tl-track flex h-[min(40vw,66vh)] w-max items-center px-[6vw] will-change-transform">
      <div class="relative h-full w-[calc(25vw+30vw*2+27vw)]">
        <div class="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center"><i class="h-2.5 w-2.5 rounded-full bg-white"></i><i class="jp-tl-line h-px flex-1 origin-left bg-white shadow-[0_0_12px_rgba(255,255,255,.6)]"></i><i class="h-2.5 w-2.5 rounded-full bg-white"></i></div>
        <h2 class="absolute left-0 top-0 w-[21vw] text-[44px] font-semibold leading-none tracking-[-0.03em]">Como funciona</h2>
        <div class="jp-tl-item top-0" style="left:25vw"><span class="jp-stem"><i></i></span><div class="pl-6"><span class="text-[11px] uppercase tracking-[.18em] text-[#a1a1a1]">Etapa 01</span><h3 class="text-2xl">Diagnóstico</h3></div></div>
        <div class="jp-tl-item jp-bottom top-1/2" style="left:55vw"><span class="jp-stem"><i></i></span><div class="flex h-full flex-col justify-end pl-6"><span class="text-[11px] uppercase tracking-[.18em] text-[#a1a1a1]">Etapa 02</span><h3 class="text-2xl">Copy e estrutura</h3></div></div>
        <div class="jp-tl-item top-0" style="left:85vw"><span class="jp-stem"><i></i></span><div class="pl-6"><span class="text-[11px] uppercase tracking-[.18em] text-[#a1a1a1]">Etapa 03</span><h3 class="text-2xl">Publicação</h3></div></div>
      </div>
    </div>
  </div>
</div>
<style>
  .jp-tl-line{transform:scaleX(var(--line,0))}
  .jp-tl-item{--s:0;position:absolute;width:27vw;height:50%}.jp-tl-item>div{opacity:var(--s);transform:translateY(calc((1 - var(--s)) * 16px))}
  .jp-stem{position:absolute;left:0;top:0;bottom:0;width:1px}
  .jp-stem::before{content:"";position:absolute;inset:0;background:linear-gradient(to top,#fff,rgba(255,255,255,.25));transform:scaleY(var(--s));transform-origin:bottom}
  .jp-bottom .jp-stem::before{background:linear-gradient(to bottom,#fff,rgba(255,255,255,.25));transform-origin:top}
  .jp-stem i{position:absolute;left:-7px;top:-7px;width:15px;height:15px;border-radius:50%;background:#fff;box-shadow:0 0 0 5px rgba(255,255,255,.12),0 0 22px rgba(255,255,255,.7);transform:scale(var(--s))}
  .jp-bottom .jp-stem i{top:auto;bottom:-7px}
</style>
<script>
(function () {
  var sc = document.querySelector('.jp-tl'), track = sc.querySelector('.jp-tl-track'), line = sc.querySelector('.jp-tl-line'), items = sc.querySelectorAll('.jp-tl-item');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function update() {
    var vh = innerHeight, vw = innerWidth, r = sc.getBoundingClientRect(), p = clamp(-r.top / Math.max(sc.offsetHeight - vh, 1)), slide = clamp(p / 0.92);
    track.style.transform = 'translate3d(' + (-Math.max(track.offsetWidth - vw, 0) * slide).toFixed(1) + 'px,0,0)'; line.style.setProperty('--line', clamp((slide - 0.03) / 0.9).toFixed(4));
    items.forEach(function (it) { var k = reduce ? 1 : clamp((vw * 0.88 - it.getBoundingClientRect().left) / (vw * 0.34)); it.style.setProperty('--s', ease(clamp(k / 0.45)).toFixed(4)); });
  }
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true }); addEventListener('resize', update); update();
})();
</script>`,
    },
  },

  // 21 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "jp-editorial-list-fill",
    name: "Lista Editorial com Preenchimento Branco no Hover",
    category: "navigation",
    categoryLabel: "Modais & Menus",
    description: "Uma lista grande de entregáveis (número, ícone, nome enorme e detalhe) separada por linhas finas. Ao rolar, cada linha se desenha da esquerda e o conteúdo sobe em cascata; no hover, um preenchimento branco corre da esquerda, o texto vira preto, o ícone inverte e gira e a seta gira 45°. No celular a linha que passa pelo meio da tela ganha o mesmo destaque.",
    tags: ["List", "Hover Fill", "Inverted Colors", "Scroll Reveal", "Mobile Focus"],
    defaultSection: "O que Entregamos",
    previewType: "jp-list-fill",
    tech: ["Tailwind CSS", "React", "CSS Transitions", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const CSS =
  '.jp-row{position:relative;isolation:isolate}' +
  '.jp-row::before{content:"";position:absolute;inset:0;z-index:-1;background:#fff;transform:scaleX(0);transform-origin:left;transition:transform .55s cubic-bezier(.7,0,.2,1)}' +
  '.jp-row .ico,.jp-row .go{transition:background .35s,border-color .35s,color .35s,transform .5s cubic-bezier(.2,.7,.2,1)}' +
  '.jp-row strong,.jp-row .num,.jp-row .det{transition:color .35s}' +
  '@media (hover:hover){.jp-row:hover::before{transform:scaleX(1)}.jp-row:hover,.jp-row:hover strong{color:#0a0a0a}.jp-row:hover .num,.jp-row:hover .det{color:#4a4a4a}' +
  '.jp-row:hover .ico{color:#fff;background:#0a0a0a;border-color:#0a0a0a;transform:rotate(-6deg) scale(1.06)}.jp-row:hover .go{color:#fff;background:#0a0a0a;border-color:#0a0a0a;transform:rotate(-45deg)}}' +
  '@media (hover:none){.jp-row.is-focus::before{transform:scaleX(1)}.jp-row.is-focus,.jp-row.is-focus strong{color:#0a0a0a}.jp-row.is-focus .num,.jp-row.is-focus .det{color:#4a4a4a}.jp-row.is-focus .ico{color:#fff;background:#0a0a0a;border-color:#0a0a0a;transform:rotate(-6deg) scale(1.06)}}' +
  // entrada: a linha se desenha e o conteúdo sobe
  '.jp-dl.is-armed .jp-row{border-bottom-color:transparent}' +
  '.jp-dl.is-armed .jp-row::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:1px;background:#3d3d3d;transform:scaleX(0);transform-origin:left;transition:transform .9s cubic-bezier(.7,0,.2,1) calc(var(--i) * .06s)}' +
  '.jp-dl.is-armed .jp-row>*{opacity:0;transform:translateY(22px);transition:opacity .6s ease calc(var(--i) * .06s + .15s),transform .8s cubic-bezier(.2,.7,.2,1) calc(var(--i) * .06s + .15s)}' +
  '.jp-dl.is-armed .jp-row.is-in::after{transform:scaleX(1)}.jp-dl.is-armed .jp-row.is-in>*{opacity:1;transform:none}';

export function EditorialList({ items = [
  ['Criativo', 'anúncios que param o scroll'], ['Página de links', 'para a bio do Instagram'], ['Formulário', 'que qualifica o lead'],
  ['Landing page', 'a página que vende a mentoria'], ['Lead magnet', 'material para captar contatos'], ['Automações', 'que respondem por você'],
] }) {
  const list = useRef(null);

  useEffect(() => {
    const L = list.current, rows = [...L.children];
    let io, raf = 0;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      L.classList.add('is-armed');
      io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
      rows.forEach((r) => io.observe(r));
    }
    // celular (sem hover): destaca a linha que passa pelo meio da tela
    const touch = matchMedia('(hover: none)').matches;
    const focus = () => {
      raf = 0;
      const mid = innerHeight * 0.5; let pick = -1, best = Infinity;
      rows.forEach((el, i) => { const r = el.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - mid); if (r.top < mid + 60 && r.bottom > mid - 60 && d < best) { best = d; pick = i; } });
      rows.forEach((el, i) => el.classList.toggle('is-focus', i === pick));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(focus); };
    if (touch) { addEventListener('scroll', on, { passive: true }); focus(); }
    return () => { if (io) io.disconnect(); removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <ul ref={list} className="jp-dl mx-auto max-w-[1080px] list-none border-t border-[#3d3d3d] bg-black p-0 text-white">
      <style>{CSS}</style>
      {items.map(([name, det], i) => (
        <li key={name} style={{ '--i': i }} className="jp-row grid grid-cols-[44px_minmax(0,1fr)] items-center gap-4 border-b border-[#3d3d3d] px-1 py-[22px] md:grid-cols-[52px_56px_minmax(0,1fr)_44px] md:gap-[22px] md:px-[26px] md:py-[30px]">
          <span className="num hidden text-[13px] font-semibold tabular-nums tracking-[.08em] text-[#a1a1a1] md:block">{String(i + 1).padStart(2, '0')}</span>
          <span className="ico grid h-11 w-11 place-items-center rounded-[13px] border border-[#3d3d3d] bg-white/[.04] md:h-14 md:w-14 md:rounded-2xl">✦</span>
          <p className="m-0 flex flex-col gap-1 md:flex-row md:flex-wrap md:items-baseline md:gap-x-3.5">
            <strong className="text-[clamp(22px,2.5vw,34px)] font-semibold leading-[1.12] tracking-[-0.03em]">{name}</strong>
            <span className="det text-[clamp(15px,1.25vw,18px)] text-[#a1a1a1]">{det}</span>
          </p>
          <span className="go hidden h-11 w-11 place-items-center rounded-full border border-[#3d3d3d] md:grid">→</span>
        </li>
      ))}
    </ul>
  );
}`,
      tailwind: `<ul class="jp-dl mx-auto max-w-[1080px] list-none border-t border-[#3d3d3d] bg-black p-0 text-white">
  <li class="jp-row" style="--i:0"><span class="num">01</span><span class="ico">✦</span><p><strong>Criativo</strong><span class="det">anúncios que param o scroll</span></p><span class="go">→</span></li>
  <li class="jp-row" style="--i:1"><span class="num">02</span><span class="ico">✦</span><p><strong>Página de links</strong><span class="det">para a bio do Instagram</span></p><span class="go">→</span></li>
  <li class="jp-row" style="--i:2"><span class="num">03</span><span class="ico">✦</span><p><strong>Landing page</strong><span class="det">a página que vende a mentoria</span></p><span class="go">→</span></li>
</ul>
<style>
  .jp-row{position:relative;isolation:isolate;display:grid;grid-template-columns:52px 56px minmax(0,1fr) 44px;align-items:center;gap:22px;padding:30px 26px;border-bottom:1px solid #3d3d3d}
  .jp-row p{margin:0;display:flex;flex-wrap:wrap;align-items:baseline;column-gap:14px}
  .jp-row strong{font-size:clamp(22px,2.5vw,34px);font-weight:600;letter-spacing:-.03em;transition:color .35s}
  .jp-row .num{font-size:13px;font-weight:600;color:#a1a1a1;transition:color .35s}.jp-row .det{color:#a1a1a1;transition:color .35s}
  .jp-row .ico{display:grid;place-items:center;width:56px;height:56px;border-radius:16px;border:1px solid #3d3d3d;transition:background .35s,color .35s,transform .5s cubic-bezier(.2,.7,.2,1)}
  .jp-row .go{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;border:1px solid #3d3d3d;transition:transform .45s cubic-bezier(.2,.7,.2,1),background .35s,color .35s}
  .jp-row::before{content:"";position:absolute;inset:0;z-index:-1;background:#fff;transform:scaleX(0);transform-origin:left;transition:transform .55s cubic-bezier(.7,0,.2,1)}
  @media (hover:hover){.jp-row:hover::before{transform:scaleX(1)}.jp-row:hover,.jp-row:hover strong{color:#0a0a0a}.jp-row:hover .num,.jp-row:hover .det{color:#4a4a4a}.jp-row:hover .ico,.jp-row:hover .go{color:#fff;background:#0a0a0a;border-color:#0a0a0a}.jp-row:hover .ico{transform:rotate(-6deg) scale(1.06)}.jp-row:hover .go{transform:rotate(-45deg)}}
  .jp-dl.is-armed .jp-row{border-bottom-color:transparent}
  .jp-dl.is-armed .jp-row::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:1px;background:#3d3d3d;transform:scaleX(0);transform-origin:left;transition:transform .9s cubic-bezier(.7,0,.2,1) calc(var(--i) * .06s)}
  .jp-dl.is-armed .jp-row>*{opacity:0;transform:translateY(22px);transition:opacity .6s ease calc(var(--i) * .06s + .15s),transform .8s cubic-bezier(.2,.7,.2,1) calc(var(--i) * .06s + .15s)}
  .jp-dl.is-armed .jp-row.is-in::after{transform:scaleX(1)}.jp-dl.is-armed .jp-row.is-in>*{opacity:1;transform:none}
</style>
<script>
(function () {
  var list = document.querySelector('.jp-dl'); if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  list.classList.add('is-armed');
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -12% 0px' });
  list.querySelectorAll('.jp-row').forEach(function (r) { io.observe(r); });
})();
</script>`,
    },
  },
];
