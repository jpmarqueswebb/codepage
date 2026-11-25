import React, { useEffect, useRef } from 'react';

// Prévias leves (CSS/SVG, um canvas) dos efeitos da landing page de João Pedro Marques (neo noir, preto e branco)
const BD = '#262626', BS = '#3d3d3d', MU = '#a1a1a1';

const CSS = `
@property --jpvn{syntax:'<integer>';initial-value:0;inherits:false}
@property --jpvx{syntax:'<percentage>';initial-value:20%;inherits:true}
@keyframes jpvZoom{0%{transform:scale(1.25) translateX(-6%)}100%{transform:scale(1) translateX(4%)}}
@keyframes jpvIn0{0%,2%{opacity:0;transform:translateY(10px)}12%,88%{opacity:1;transform:none}100%{opacity:0}}
@keyframes jpvIn1{0%,18%{opacity:0;transform:translateY(10px)}28%,88%{opacity:1;transform:none}100%{opacity:0}}
@keyframes jpvIn2{0%,34%{opacity:0;transform:translateY(10px)}44%,88%{opacity:1;transform:none}100%{opacity:0}}
@keyframes jpvIn3{0%,50%{opacity:0;transform:translateY(10px)}60%,88%{opacity:1;transform:none}100%{opacity:0}}
@keyframes jpvCue{0%,10%{opacity:1}20%,100%{opacity:0}}
@keyframes jpvHint{50%{transform:translateY(6px);opacity:.2}}
@keyframes jpvGrid{to{background-position:-24px -48px,-24px -48px}}
@keyframes jpvLight{0%,100%{transform:translate(-40%,-20%)}50%{transform:translate(40%,25%)}}
@keyframes jpvBtn{0%,30%,100%{transform:none;box-shadow:0 0 26px rgba(255,255,255,.18)}45%,80%{transform:translateY(-2px) scale(1.04);box-shadow:0 0 0 5px rgba(255,255,255,.12),0 10px 40px rgba(255,255,255,.38)}}
@keyframes jpvBand{0%,35%{background-position:100% 0}70%,100%{background-position:0 0}}
@keyframes jpvCount{0%{--jpvn:0}55%,100%{--jpvn:var(--to)}}
@keyframes jpvLine{0%,5%{transform:translateY(110%)}25%,80%{transform:none}95%,100%{transform:translateY(-110%)}}
@keyframes jpvGlowMove{0%,100%{--jpvx:15%}50%{--jpvx:85%}}
@keyframes jpvStk{0%{transform:translateY(24px) scale(.9) rotate(-3deg);opacity:0}8%,25%{transform:translateY(24px) scale(.9) rotate(-3deg);opacity:.55}33%,58%{transform:translateY(12px) scale(.95) rotate(2.5deg);opacity:.85}66%,86%{transform:none;opacity:1}100%{transform:translateY(-115%) rotate(-8deg);opacity:0}}
@keyframes jpvStkInk{0%,62%{opacity:0}68%,100%{opacity:1}}
@keyframes jpvRing{to{transform:rotate(360deg)}}
@keyframes jpvPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
@keyframes jpvShine{0%{background-position:160% 0}100%{background-position:-60% 0}}
@keyframes jpvGrowB{0%{transform:scaleY(.2)}45%,100%{transform:scaleY(1)}}
@keyframes jpvBar{0%{transform:scaleY(.12)}22%{transform:scaleY(1.06)}30%,72%{transform:scaleY(1)}90%,100%{transform:scaleY(.12)}}
@keyframes jpvSpark{0%,14%{opacity:0;transform:scale(.2)}22%{opacity:1;transform:scale(1.5)}40%,62%{opacity:1;transform:scale(1)}78%,100%{opacity:0;transform:scale(.2)}}
@keyframes jpvMe{0%,4%{opacity:0;transform:translateY(14px) scale(.9)}12%,88%{opacity:1;transform:none}96%,100%{opacity:0;transform:translateY(-8px)}}
@keyframes jpvTyp{0%,18%{opacity:0;transform:scale(.6)}24%,42%{opacity:1;transform:none}46%,100%{opacity:0;transform:scale(.6)}}
@keyframes jpvYou{0%,44%{opacity:0;transform:translateY(14px) scale(.9)}52%,88%{opacity:1;transform:none}96%,100%{opacity:0;transform:translateY(-8px)}}
@keyframes jpvDot{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-3px);opacity:1}}
@keyframes jpvScan{0%,22%{transform:translateY(0)}33%,55%{transform:translateY(100%)}66%,88%{transform:translateY(200%)}100%{transform:translateY(0)}}
@keyframes jpvRow{0%,30%,100%{transform:none}8%,22%{transform:translateX(6px)}}
@keyframes jpvPing{0%{transform:scale(.7);opacity:.9}100%{transform:scale(1.7);opacity:0}}
@keyframes jpvBlink{0%,100%{box-shadow:0 0 0 rgba(255,255,255,0)}50%{box-shadow:0 0 16px rgba(255,255,255,.55)}}
@keyframes jpvNode{0%,30%,100%{transform:none;border-color:${BS};box-shadow:none}10%,20%{transform:translateY(-6px);border-color:rgba(255,255,255,.85);box-shadow:0 10px 26px rgba(255,255,255,.16)}}
@keyframes jpvRunW{0%{left:0;opacity:0}15%,85%{opacity:1}100%{left:calc(100% - 5px);opacity:0}}
@keyframes jpvHop{0%,30%,100%{transform:translateY(0)}12%{transform:translateY(-10px) scale(1.12);background:#fff;color:#000}22%{transform:translateY(2px)}}
@keyframes jpvBeat{0%,30%,100%{transform:scale(1)}12%{transform:scale(1.14);text-shadow:0 0 26px rgba(255,255,255,.8)}}
@keyframes jpvStrike{0%,8%{transform:scaleX(0)}24%,84%{transform:scaleX(1)}96%,100%{transform:scaleX(0)}}
@keyframes jpvDim{0%,14%{filter:none;transform:none}30%,86%{filter:grayscale(1) brightness(.6);transform:scale(.95)}100%{filter:none;transform:none}}
@keyframes jpvPush{0%,24%{transform:translateX(-3px);opacity:.35}34%{transform:translateX(7px);opacity:1}44%,86%{transform:translateX(3px);opacity:1}100%{transform:translateX(-3px);opacity:.35}}
@keyframes jpvGood{0%,30%{transform:none;box-shadow:none}40%{transform:scale(1.05) translateY(-3px);box-shadow:0 14px 34px rgba(255,255,255,.16)}50%,86%{transform:scale(1.03) translateY(-2px)}100%{transform:none}}
@keyframes jpvMark{0%,40%{background-size:0% 40%}58%,86%{background-size:100% 40%}98%,100%{background-size:0% 40%}}
@keyframes ai-dot{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-2.5px);opacity:1}}
@keyframes ai-draw{0%{stroke-dashoffset:1}45%,80%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}}
@keyframes ai-head{0%,44%{opacity:0}52%,80%{opacity:1}92%,100%{opacity:0}}
@keyframes ai-bar{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}
@keyframes ai-fly{0%{transform:translate(-3px,3px);opacity:0}30%{opacity:1}70%{transform:translate(2px,-2px);opacity:1}100%{transform:translate(4px,-4px);opacity:0}}
@keyframes ai-sweep{to{transform:rotate(360deg)}}
.jpv-ai *{transform-box:fill-box;transform-origin:center}
.jpv-ai .d{animation:ai-dot 1.3s ease-in-out infinite}.jpv-ai .d:nth-of-type(2){animation-delay:.16s}.jpv-ai .d:nth-of-type(3){animation-delay:.32s}
.jpv-ai .l{stroke-dasharray:1;animation:ai-draw 2.6s ease-in-out infinite}
.jpv-ai .b{transform-origin:50% 100%;animation:ai-bar 2s ease-in-out infinite}.jpv-ai .b2{animation-delay:.3s}.jpv-ai .b3{animation-delay:.6s}
.jpv-ai .plane{animation:ai-fly 2.4s ease-in-out infinite}
.jpv-ai .sweep{transform-origin:50% 100%;animation:ai-sweep 3s linear infinite}
.jpv-ai .head{animation:ai-head 2.8s ease-in-out infinite}
@keyframes jpvRollT{0%,22%{transform:translateY(0)}33%,55%{transform:translateY(-44px)}66%,88%{transform:translateY(-88px)}100%{transform:translateY(0)}}
@keyframes jpvRollI{0%,22%{transform:translateY(0)}33%,55%{transform:translateY(88px)}66%,88%{transform:translateY(176px)}100%{transform:translateY(0)}}
@keyframes jpvFocus{0%,22%{opacity:1;transform:scale(1);filter:none}30%,100%{opacity:.2;transform:scale(.7);filter:grayscale(1)}}
@keyframes jpvScene{0%,2%{opacity:0;transform:translateY(12px) scale(.97)}8%,30%{opacity:1;transform:none}36%,100%{opacity:0;transform:translateY(12px) scale(.97)}}
@keyframes jpvStep{0%,2%{opacity:.28}8%,30%{opacity:1}36%,100%{opacity:.28}}
@keyframes jpvPill{0%,2%{width:5px;background:rgba(255,255,255,.2)}8%,30%{width:16px;background:#fff}36%,100%{width:5px;background:rgba(255,255,255,.2)}}
@keyframes jpvAxis{0%{transform:scaleX(0)}80%,100%{transform:scaleX(1)}}
@keyframes jpvTrack{0%{transform:translateX(0)}80%,100%{transform:translateX(-90px)}}
@keyframes jpvFill{0%,5%{transform:scaleX(0)}18%,32%{transform:scaleX(1)}45%,100%{transform:scaleX(0)}}
@keyframes jpvInk{0%,5%{color:#fff}12%,32%{color:#0a0a0a}42%,100%{color:#fff}}
@media (prefers-reduced-motion:reduce){.jpv-pv *{animation:none!important}}
`;

const Box = ({ children, className = '', style }) => (
  <div className={'jpv-pv relative w-full h-44 overflow-hidden rounded-xl border border-white/10 bg-black text-white ' + className} style={style}>
    <style>{CSS}</style>
    {children}
  </div>
);
const Card = ({ children, className = '', style }) => (
  <div className={'rounded-xl border bg-[#0a0a0a] ' + className} style={{ borderColor: BD, ...style }}>{children}</div>
);

function ScrollVideo() {
  const parts = ['jpvIn0', 'jpvIn1', 'jpvIn2', 'jpvIn3'];
  const a = (k) => ({ animation: `${parts[k]} 6s ease-out infinite` });
  return (
    <Box>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 40%,#3a3a3a,transparent 40%),radial-gradient(circle at 75% 65%,#2a2a2a,transparent 45%),linear-gradient(120deg,#111,#000)', animation: 'jpvZoom 6s linear infinite' }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.25),rgba(0,0,0,.75)_75%)]" />
      <div className="relative grid h-full content-center justify-items-center gap-2 px-6 text-center">
        <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-[8px] text-[#ededed]" style={a(0)}>Validado por + de 30 mentores</span>
        <b className="text-[15px] font-semibold leading-tight tracking-[-0.03em]" style={a(1)}>O tráfego traz o aluno.<br />A página decide.</b>
        <span className="text-[9px]" style={{ color: MU, ...a(2) }}>Uma página construída para vender.</span>
        <span className="rounded-full bg-white px-3 py-1 text-[9px] font-semibold text-black" style={a(3)}>Quero minha página</span>
      </div>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1" style={{ animation: 'jpvCue 6s ease infinite' }}>
        <span className="text-[6px] uppercase tracking-[.16em] text-white/70">Role para baixo</span>
        <span className="relative h-4 w-2.5 rounded-full border border-white/50"><i className="absolute left-1/2 top-1 -ml-px h-1 w-0.5 rounded bg-white" style={{ animation: 'jpvHint 1.6s ease-in-out infinite' }} /></span>
      </div>
    </Box>
  );
}

function Vortex() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const W = (c.width = 340), H = (c.height = 176), N = 170, TAU = Math.PI * 2;
    const tx = Float32Array.from({ length: N }, () => Math.random() * W), ty = Float32Array.from({ length: N }, () => Math.random() * H);
    const V = []; let raf = 0, last = 0, dX = W / 2, dY = H / 2, sign = 1, travel = 0;
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    const loop = (t) => {
      const dt = Math.min((t - (last || t)) / 1000, 1 / 30); last = t; const now = t / 1000;
      const tX = W * (0.5 + 0.36 * Math.sin(0.9 * now + 1.3)), tY = H * (0.5 + 0.34 * Math.sin(0.62 * now));
      const px = dX, py = dY; dX += (tX - dX) * 0.1; dY += (tY - dY) * 0.1;
      const dist = Math.hypot(dX - px, dY - py); travel += dist;
      if (travel > 18 && dist > 0) { travel = 0; const ux = (dX - px) / dist, uy = (dY - py) / dist; V.push({ x: dX - ux * 6 - uy * 5 * sign, y: dY - uy * 6 + ux * 5 * sign, g: sign * 9000, b: now }); sign = -sign; if (V.length > 14) V.shift(); }
      ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1;
      for (let p = 0; p < N; p++) {
        let vx = 14, vy = -4; const x = tx[p], y = ty[p];
        for (const v of V) { const e = v.g * Math.exp(-(now - v.b) / 1.6), dx = x - v.x, dy = y - v.y, r2 = Math.max(1, dx * dx + dy * dy), f = (e * (1 - Math.exp(-r2 / 300))) / (TAU * r2); vx += -dy * f; vy += dx * f; }
        let nx = x + vx * dt, ny = y + vy * dt; if (nx > W + 4) nx = -4; if (nx < -4) nx = W + 4; if (ny < -4) ny = H + 4; if (ny > H + 4) ny = -4;
        tx[p] = nx; ty[p] = ny;
        ctx.globalAlpha = Math.min(0.85, Math.hypot(vx, vy) * 0.006 + 0.12);
        ctx.beginPath(); ctx.moveTo(nx - vx * 0.06, ny - vy * 0.06); ctx.lineTo(nx, ny); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <Box><canvas ref={ref} className="absolute inset-0 h-full w-full" /></Box>;
}

function GridBloom() {
  return (
    <Box style={{ background: '#050505' }}>
      <div className="absolute inset-[-20%] opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.35) 1px,transparent 1px)', backgroundSize: '24px 24px', transform: 'rotate(-8deg)', animation: 'jpvGrid 3s linear infinite' }} />
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -ml-14 -mt-14 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.35),transparent_65%)] mix-blend-screen" style={{ animation: 'jpvLight 7s ease-in-out infinite' }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_50%_at_50%_50%,rgba(5,5,5,.85),transparent_100%)]" />
      <div className="relative grid h-full place-items-center text-center"><b className="text-[15px] font-semibold tracking-[-0.03em]">Sua mentoria merece<br />uma página à altura.</b></div>
    </Box>
  );
}

function HaloBtn() {
  return (
    <Box className="grid place-items-center">
      <span className="relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-[11px] font-semibold text-black" style={{ animation: 'jpvBtn 3.4s ease-out infinite' }}>
        <i className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,transparent_40%,rgba(0,0,0,.12)_46%,rgba(0,0,0,.2)_50%,rgba(0,0,0,.12)_54%,transparent_60%)] bg-[length:300%_100%] bg-no-repeat" style={{ animation: 'jpvBand 3.4s cubic-bezier(.3,.6,.2,1) infinite' }} />
        Quero uma página que venda →
      </span>
    </Box>
  );
}

function CountUp() {
  const S = [[30, '+', 'mentores'], [5, '', 'anos'], [100, '%', 'sob medida']];
  return (
    <Box className="grid grid-cols-3 content-center gap-2 px-4">
      {S.map(([n, s, l]) => (
        <Card key={l} className="py-4 text-center">
          <b className="block text-[24px] font-semibold leading-none tracking-[-0.04em] tabular-nums [counter-reset:n_var(--jpvn)] before:content-[counter(n)]" style={{ '--to': n, animation: 'jpvCount 3.5s cubic-bezier(.2,.8,.2,1) infinite' }}>{s}</b>
          <span className="mt-1 block text-[8px]" style={{ color: MU }}>{l}</span>
        </Card>
      ))}
    </Box>
  );
}

function LineReveal() {
  const L = ['Uma página que mostra', 'o valor da sua mentoria', 'antes da primeira conversa.'];
  return (
    <Box className="grid content-center px-6">
      {L.map((t, i) => (
        <span key={i} className="block overflow-hidden pb-[2px]">
          <span className="block text-[17px] font-semibold leading-[1.15] tracking-[-0.03em]" style={{ animation: 'jpvLine 4.5s cubic-bezier(.2,.8,.2,1) infinite both', animationDelay: i * 0.12 + 's' }}>{t}</span>
        </span>
      ))}
    </Box>
  );
}

function CopyStrike() {
  return (
    <Box className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4">
      <div className="grid gap-1 rounded-lg border border-dashed p-2.5 text-[8px]" style={{ borderColor: BS, color: MU, animation: 'jpvDim 6s ease-in-out infinite' }}>
        <span className="text-[6px] font-semibold uppercase tracking-[.12em]">Texto de IA</span>
        {['Transforme sua vida.', 'Descubra seu potencial.', 'Clique e saiba mais.'].map((t, i) => (
          <span key={t} className="relative">{t}<i className="absolute left-0 top-1/2 h-px w-full origin-left bg-white/60" style={{ animation: 'jpvStrike 6s cubic-bezier(.6,0,.2,1) infinite', animationDelay: i * 0.15 + 's' }} /></span>
        ))}
      </div>
      <span className="text-sm" style={{ animation: 'jpvPush 6s cubic-bezier(.5,0,.2,1) infinite' }}>→</span>
      <div className="rounded-lg border border-white/45 bg-white/[.06] p-2.5 text-[8px] text-[#ededed]" style={{ animation: 'jpvGood 6s ease-in-out infinite' }}>
        <span className="block text-[6px] font-semibold uppercase tracking-[.12em] text-white">Copy de venda</span>
        Aprovado em 11 meses, <strong className="font-semibold text-white" style={{ background: 'linear-gradient(rgba(255,255,255,.25),rgba(255,255,255,.25)) no-repeat 0 92%/0% 40%', animation: 'jpvMark 6s cubic-bezier(.6,0,.2,1) infinite' }}>com o método que eu uso.</strong>
      </div>
    </Box>
  );
}

function BorderGlow() {
  const mask = { WebkitMask: 'linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', mask: 'linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)' };
  return (
    <Box className="grid place-items-center">
      <div className="relative h-[110px] w-[230px] overflow-hidden rounded-2xl border bg-[linear-gradient(180deg,#0f0f0f,#0a0a0a)] p-4" style={{ borderColor: BD, animation: 'jpvGlowMove 4s ease-in-out infinite' }}>
        <i className="absolute inset-0" style={{ background: 'radial-gradient(160px circle at var(--jpvx) 30%,rgba(255,255,255,.1),transparent 60%)' }} />
        <i className="absolute inset-0 z-[2] rounded-[inherit] p-px" style={{ background: 'radial-gradient(120px circle at var(--jpvx) 30%,rgba(255,255,255,.95),rgba(255,255,255,.3) 35%,transparent 70%)', ...mask }} />
        <span className="relative mb-2 grid h-7 w-7 place-items-center rounded-lg border text-[10px]" style={{ borderColor: BS }}>✦</span>
        <p className="relative m-0 text-[10px] text-[#ededed]">Você investe em tráfego e o clique não vira conversa.</p>
      </div>
    </Box>
  );
}

function TStack() {
  const T = ['Recomendo demais!', 'Virou meu webdesigner pra vida!', 'Nota 10!'];
  return (
    <Box className="grid place-items-center">
      <div className="relative h-[120px] w-[170px]">
        {T.map((q, i) => (
          <figure key={i} className="absolute inset-0 m-0 grid content-center justify-items-center gap-2 rounded-xl border border-white/10 bg-[linear-gradient(180deg,#181818,#111)] p-3 text-center shadow-[0_14px_30px_rgba(0,0,0,.5)]"
            style={{ animation: 'jpvStk 7.5s cubic-bezier(.4,0,.2,1) infinite', animationDelay: -i * 2.5 + 's' }}>
            <span className="text-[8px] tracking-[.2em]">★★★★★</span>
            <span className="text-[10px] text-[#ededed]" style={{ animation: 'jpvStkInk 7.5s ease infinite', animationDelay: -i * 2.5 + 's' }}>{q}</span>
          </figure>
        ))}
      </div>
    </Box>
  );
}

function WorksWheel() {
  const n = 10;
  return (
    <Box className="grid place-items-center [perspective:500px]">
      <div className="relative h-[150px] w-[150px] [transform:rotateX(28deg)]">
        <div className="absolute inset-0" style={{ animation: 'jpvRing 16s linear infinite' }}>
          {Array.from({ length: n }, (_, i) => (
            <div key={i} className="absolute left-1/2 top-1/2 -ml-[19px] -mt-2 h-4 w-[38px] rounded-[3px] border bg-[linear-gradient(180deg,#1a1a1a,#0a0a0a)]"
              style={{ borderColor: BS, transform: `rotate(${(i * 360) / n}deg) translateY(-62px)` }}>
              <i className="mx-1 mt-1 block h-0.5 rounded bg-white/30" />
            </div>
          ))}
        </div>
        <b className="absolute inset-0 grid place-items-center text-[30px] font-semibold tracking-[-0.03em]" style={{ animation: 'jpvPulse 3s ease-in-out infinite' }}>30+</b>
      </div>
    </Box>
  );
}

function BentoShine() {
  return (
    <Box className="grid grid-cols-[2fr_1fr] gap-2 p-3">
      {[0, 1].map((k) => (
        <Card key={k} className="relative overflow-hidden p-2.5">
          <i className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,.14)_50%,transparent_60%)] bg-[length:250%_100%] bg-no-repeat" style={{ animation: 'jpvShine 3.2s ease-in-out infinite', animationDelay: k * 0.4 + 's' }} />
          <div className="flex h-[92px] items-end gap-1.5 rounded-lg border p-2" style={{ borderColor: BD }}>
            {[30, 50, 40, 70, 100].slice(0, k ? 3 : 5).map((h, i, a) => (
              <i key={i} className={'flex-1 origin-bottom rounded-t ' + (i === a.length - 1 ? 'bg-white' : 'bg-white/25')} style={{ height: h + '%', animation: 'jpvGrowB 3.2s ease-out infinite' }} />
            ))}
          </div>
          <b className="mt-2 block text-[9px] font-semibold">{k ? 'Prova social' : 'Copy pensada para vender'}</b>
        </Card>
      ))}
    </Box>
  );
}

function BarsSpark() {
  const H = [32, 48, 40, 64, 78, 100];
  return (
    <Box className="grid content-center px-8">
      <div className="flex h-[110px] items-end gap-2.5">
        {H.map((h, i) => (
          <i key={i} className={'relative flex-1 origin-bottom rounded-t-md ' + (i === H.length - 1 ? 'bg-white' : 'bg-white/25')} style={{ height: h + '%', animation: 'jpvBar 4.2s cubic-bezier(.3,.7,.2,1) infinite', animationDelay: i * 0.12 + 's' }}>
            {i === H.length - 1 && <b className="absolute left-1/2 top-[-6px] -ml-[5px] h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_18px_4px_rgba(255,255,255,.7)]" style={{ animation: 'jpvSpark 4.2s ease-out infinite', animationDelay: '.72s' }} />}
          </i>
        ))}
      </div>
    </Box>
  );
}

function Chat() {
  return (
    <Box className="grid content-center gap-2.5 px-6 text-[10px]">
      <div className="flex items-end gap-2" style={{ animation: 'jpvMe 7s cubic-bezier(.2,.8,.2,1) infinite' }}>
        <i className="grid h-6 w-6 place-items-center rounded-full bg-white text-[8px] font-semibold not-italic text-black">JP</i>
        <span className="rounded-[12px_12px_12px_4px] border bg-white/[.06] px-2.5 py-1.5 text-[#ededed]" style={{ borderColor: BD }}>Vamos testar uma oferta nova?</span>
      </div>
      <div className="-my-1 flex h-0 justify-end overflow-visible" style={{ animation: 'jpvTyp 7s ease infinite' }}>
        <span className="flex -translate-y-1/2 gap-1 rounded-[12px_12px_4px_12px] border bg-white/[.08] px-2.5 py-2" style={{ borderColor: BD }}>
          {[0, 1, 2].map((k) => <b key={k} className="h-1.5 w-1.5 rounded-full bg-white" style={{ animation: 'jpvDot .9s ease-in-out infinite', animationDelay: k * 0.15 + 's' }} />)}
        </span>
      </div>
      <div className="flex items-end justify-end gap-2" style={{ animation: 'jpvYou 7s cubic-bezier(.2,.8,.2,1) infinite' }}>
        <span className="rounded-[12px_12px_4px_12px] bg-white px-2.5 py-1.5 font-medium text-black">Bora. Pode subir.</span>
        <i className="grid h-6 w-6 place-items-center rounded-full border text-[8px] font-semibold not-italic" style={{ borderColor: BS }}>M</i>
      </div>
    </Box>
  );
}

function LeadScan() {
  const R = [['Ana', 'Concluiu'], ['Bruno', 'Concluiu'], ['Carla', 'Parou na etapa 2']];
  return (
    <Box className="grid content-center px-5">
      <div className="relative grid text-[10px]">
        <i className="pointer-events-none absolute inset-x-0 top-0 h-1/3 border-y border-white/35 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent)]" style={{ animation: 'jpvScan 4.5s cubic-bezier(.6,0,.3,1) infinite' }} />
        {R.map(([n, s], i) => (
          <div key={n} className="relative z-[1] flex items-center gap-2 border-b px-1.5 py-2 last:border-0" style={{ borderColor: BD, animation: 'jpvRow 4.5s ease-in-out infinite', animationDelay: i * 1.5 + 's' }}>
            <i className={'relative grid h-5 w-5 place-items-center rounded-full text-[8px] not-italic ' + (i === 2 ? 'bg-white text-black' : 'bg-white/15')}>
              {n[0]}{i === 2 && <b className="absolute inset-[-3px] rounded-full border border-white" style={{ animation: 'jpvPing 1.5s ease-out infinite' }} />}
            </i>
            <span className="flex-1 text-[#ededed]">{n}</span><span style={{ color: MU }}>{s}</span>
            {i === 2 && <span className="rounded-full bg-white px-1.5 py-0.5 text-[7px] font-semibold uppercase text-black" style={{ animation: 'jpvBlink 1.5s ease-in-out infinite' }}>Recuperar</span>}
          </div>
        ))}
      </div>
    </Box>
  );
}

function Chain() {
  const N = ['▶', 'Página', 'Form', ''];
  return (
    <Box className="flex items-center px-4">
      {N.map((t, i) => (
        <React.Fragment key={i}>
          <div className="grid h-14 flex-1 place-items-center rounded-lg border bg-[#0d0d0d] text-[9px]" style={{ borderColor: BS, animation: 'jpvNode 4s ease-in-out infinite', animationDelay: i + 's' }}>
            {i === 3 ? <span className="flex h-7 w-4/5 items-end gap-0.5">{[35, 60, 45, 100].map((h, k) => <i key={k} className={'flex-1 rounded-t-sm ' + (k === 3 ? 'bg-white' : 'bg-white/30')} style={{ height: h + '%' }} />)}</span> : t}
          </div>
          {i < 3 && <span className="relative h-px w-4 flex-none border-t border-dashed" style={{ borderColor: BS }}><i className="absolute top-1/2 -mt-[2.5px] h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_8px_#fff]" style={{ animation: 'jpvRunW 1s linear infinite', animationDelay: i + 's' }} /></span>}
        </React.Fragment>
      ))}
    </Box>
  );
}

function AvatarWave() {
  return (
    <Box className="grid content-center justify-items-center gap-3">
      <div className="flex items-center gap-2"><b className="inline-block text-[38px] font-semibold leading-none tracking-[-0.04em]" style={{ animation: 'jpvBeat 3s ease-in-out infinite', animationDelay: '.9s' }}>30+</b><span className="text-[10px] leading-tight" style={{ color: MU }}>mentores<br />atendidos</span></div>
      <div className="flex">
        {['A', 'B', 'C', 'D', 'E', '+25'].map((t, i) => (
          <i key={t} className={'grid h-8 w-8 place-items-center rounded-full border-2 border-black text-[9px] font-semibold not-italic ' + (i ? '-ml-2 ' : '') + (i === 5 ? 'bg-[#262626]' : 'bg-[#3d3d3d]')} style={{ animation: 'jpvHop 3s cubic-bezier(.3,0,.3,1) infinite', animationDelay: i * 0.12 + 's' }}>{t}</i>
        ))}
      </div>
    </Box>
  );
}

function LineIcons() {
  const S = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', className: 'jpv-ai h-6 w-6 overflow-visible' };
  const I = [
    <svg key="c" {...S}><path d="M4 5h16v11H9l-5 4z" /><circle className="d" cx="9" cy="10.5" r=".9" fill="currentColor" /><circle className="d" cx="12" cy="10.5" r=".9" fill="currentColor" /><circle className="d" cx="15" cy="10.5" r=".9" fill="currentColor" /></svg>,
    <svg key="d" {...S}><path d="M6 3h9l3 3v15H6z" /><path className="l" pathLength="1" d="M9 10h6" /><path className="l" pathLength="1" d="M9 14h6" style={{ animationDelay: '.25s' }} /></svg>,
    <svg key="b" {...S}><path d="M4 20h16" /><path className="b" d="M7 17v-5" /><path className="b b2" d="M12 17V8" /><path className="b b3" d="M17 17v-7" /></svg>,
    <svg key="s" {...S}><g className="plane"><path d="M21 3 3 10l7 3 3 7z" /><path d="m10 13 4-4" /></g></svg>,
    <svg key="r" {...S}><path d="M3 18a9 9 0 0 1 18 0" /><path d="M7 18a5 5 0 0 1 10 0" /><path className="sweep" d="M12 18V9" /></svg>,
    <svg key="t" {...S}><path className="l" pathLength="1" d="M3 17l5-5 4 3 8-8" /><path className="head" d="M15 7h5v5" /></svg>,
  ];
  return (
    <Box className="grid grid-cols-3 content-center gap-2 px-6">
      {I.map((ic, i) => <span key={i} className="grid h-[58px] place-items-center rounded-xl border bg-[#0a0a0a]" style={{ borderColor: BS }}>{ic}</span>)}
    </Box>
  );
}

function SplitRoll() {
  const N = ['Lucas Córdova', 'Helena Emerick', 'Rodrigo Pinha', 'Malu Pacheco'];
  return (
    <Box>
      <div className="absolute left-5 top-[64px]" style={{ animation: 'jpvRollT 7.5s cubic-bezier(.6,0,.2,1) infinite' }}>
        {N.map((n, i) => (
          <div key={n} className="h-[44px] origin-left" style={{ animation: 'jpvFocus 7.5s ease infinite', animationDelay: (i ? -(7.5 - i * 2.5) : 0) + 's' }}>
            <b className="block text-[17px] font-semibold leading-none tracking-[-0.04em]">{n}</b>
            <span className="text-[7px] tracking-[.2em]" style={{ color: MU }}>★★★★★</span>
          </div>
        ))}
      </div>
      <div className="absolute right-6 top-[-132px]" style={{ animation: 'jpvRollI 7.5s cubic-bezier(.6,0,.2,1) infinite' }}>
        {[...N].reverse().map((n, i) => (
          <div key={n} className="mb-2 grid h-[80px] w-[64px] place-items-center rounded-xl border bg-[linear-gradient(160deg,#3a3a3a,#0d0d0d)] text-xl font-semibold shadow-[0_14px_30px_rgba(0,0,0,.55)]"
            style={{ borderColor: BS, animation: 'jpvFocus 7.5s ease infinite', animationDelay: (3 - i ? -(7.5 - (3 - i) * 2.5) : 0) + 's' }}>{n[0]}</div>
        ))}
      </div>
    </Box>
  );
}

function Story() {
  const T = ['O clique', 'O preço', 'A ponte'];
  const SC = ['Anúncio → Página', 'R$ 997 · R$ 997', 'Qualidade = Valor'];
  const d = (i) => ({ animationDelay: (i ? -(9 - i * 3) : 0) + 's' }); // negativo: todas já rodando, defasadas 3s
  return (
    <Box className="grid grid-cols-2 items-center gap-3 px-4">
      <div className="grid gap-3">
        {T.map((t, i) => (
          <div key={t} style={{ animation: 'jpvStep 9s ease infinite', ...d(i) }}>
            <span className="text-[7px] font-semibold uppercase tracking-[.16em]" style={{ color: MU }}>— {t}</span>
            <p className="m-0 text-[10px] font-semibold leading-tight">Trecho {i + 1} da história</p>
          </div>
        ))}
      </div>
      <div>
        <div className="relative h-[110px] overflow-hidden rounded-xl border bg-[linear-gradient(180deg,#101010,#070707)]" style={{ borderColor: BD }}>
          {SC.map((s, i) => <div key={s} className="absolute inset-0 grid place-items-center text-center text-[10px] font-semibold opacity-0" style={{ animation: 'jpvScene 9s ease infinite', ...d(i) }}><span className="rounded-lg border px-2.5 py-3" style={{ borderColor: BS }}>{s}</span></div>)}
        </div>
        <div className="mt-2 flex justify-center gap-1">{SC.map((s, i) => <i key={s} className="h-[5px] rounded-full" style={{ animation: 'jpvPill 9s ease infinite', ...d(i) }} />)}</div>
      </div>
    </Box>
  );
}

function Timeline() {
  const stems = [{ l: 70, top: true, a: '20%' }, { l: 140, top: false, a: '40%' }, { l: 210, top: true, a: '60%' }, { l: 280, top: false, a: '75%' }];
  return (
    <Box>
      <div className="absolute inset-y-6 left-4 w-[360px]" style={{ animation: 'jpvTrack 5s cubic-bezier(.3,.6,.3,1) infinite' }}>
        <b className="absolute left-0 top-0 text-[15px] font-semibold leading-none tracking-[-0.03em]">Como<br />funciona</b>
        <div className="absolute inset-x-0 top-1/2 flex items-center">
          <i className="h-1.5 w-1.5 rounded-full bg-white" />
          <i className="h-px flex-1 origin-left bg-white shadow-[0_0_8px_rgba(255,255,255,.6)]" style={{ animation: 'jpvAxis 5s linear infinite' }} />
        </div>
        <style>{stems.map((s, i) => `@keyframes jpvStem${i}{0%,${s.a}{transform:scale(0)}${parseInt(s.a, 10) + 8}%,100%{transform:scale(1)}}`).join('')}</style>
        {stems.map((s, i) => (
          <div key={i} className={'absolute h-1/2 ' + (s.top ? 'top-0' : 'top-1/2')} style={{ left: s.l }}>
            <span className={'absolute left-0 w-px bg-white ' + (s.top ? 'inset-y-0 origin-bottom' : 'inset-y-0 origin-top')} style={{ animation: `jpvStem${i} 5s ease-out infinite` }} />
            <i className={'absolute -left-1 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,.8)] ' + (s.top ? '-top-1' : '-bottom-1')} style={{ animation: `jpvStem${i} 5s ease-out infinite` }} />
            <div className={'absolute left-2 w-16 ' + (s.top ? 'top-0' : 'bottom-0')} style={{ animation: `jpvStem${i} 5s ease-out infinite`, transformOrigin: 'left' }}>
              <span className="block text-[6px] uppercase tracking-[.18em]" style={{ color: MU }}>Etapa 0{i + 1}</span>
              <b className="block text-[9px] font-semibold leading-tight">{['Diagnóstico', 'Copy', 'Design', 'No ar'][i]}</b>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}

function ListFill() {
  const R = ['Criativo', 'Página de links', 'Landing page'];
  return (
    <Box className="grid content-center px-4">
      <div className="border-t" style={{ borderColor: BS }}>
        {R.map((r, i) => (
          <div key={r} className="relative isolate flex items-center gap-3 border-b px-2 py-2.5" style={{ borderColor: BS, animation: 'jpvInk 6s ease infinite', animationDelay: (i ? -(6 - i * 2) : 0) + 's' }}>
            <i className="absolute inset-0 -z-10 origin-left bg-white" style={{ animation: 'jpvFill 6s cubic-bezier(.7,0,.2,1) infinite', animationDelay: (i ? -(6 - i * 2) : 0) + 's' }} />
            <span className="text-[8px] font-semibold tabular-nums opacity-60">0{i + 1}</span>
            <span className="grid h-6 w-6 place-items-center rounded-md border text-[9px]" style={{ borderColor: BS }}>✦</span>
            <b className="flex-1 text-[15px] font-semibold tracking-[-0.03em]">{r}</b>
            <span className="text-[10px]">→</span>
          </div>
        ))}
      </div>
    </Box>
  );
}

export const joaoPedroPreviews = {
  'jp-scroll-video': ScrollVideo,
  'jp-vortex': Vortex,
  'jp-gridbloom': GridBloom,
  'jp-halo-btn': HaloBtn,
  'jp-count-up': CountUp,
  'jp-line-reveal': LineReveal,
  'jp-copy-strike': CopyStrike,
  'jp-border-glow': BorderGlow,
  'jp-tstack': TStack,
  'jp-works-wheel': WorksWheel,
  'jp-bento-shine': BentoShine,
  'jp-bars-spark': BarsSpark,
  'jp-chat': Chat,
  'jp-lead-scan': LeadScan,
  'jp-chain': Chain,
  'jp-avatar-wave': AvatarWave,
  'jp-line-icons': LineIcons,
  'jp-split-roll': SplitRoll,
  'jp-story': Story,
  'jp-timeline': Timeline,
  'jp-list-fill': ListFill,
};
