import React, { useEffect, useRef } from 'react';

// Prévias leves (CSS/SVG, só um canvas) dos efeitos da página Black do Partiu | Partiu Pro
const R = '#7D0DEF', RD = '#4C0790', V = '#BEF21E', F = '#F2F2F2';
const E = 'cubic-bezier(.22,1,.36,1)';

const CSS = `
@keyframes ppvRise{0%{transform:translateY(108%)}9%,86%{transform:translateY(0)}95%,100%{transform:translateY(-108%)}}
@keyframes ppvUline{0%,6%{transform:scaleX(0);transform-origin:0 50%}18%,80%{transform:scaleX(1);transform-origin:0 50%}81%{transform:scaleX(1);transform-origin:100% 50%}92%,100%{transform:scaleX(0);transform-origin:100% 50%}}
@keyframes ppvCirc{0%{stroke-dashoffset:1.01}32%,74%{stroke-dashoffset:0}100%{stroke-dashoffset:-1.01}}
@keyframes ppvMark{0%{background-size:0 42%;background-position:0 88%}22%,74%{background-size:100% 42%;background-position:0 88%}75%{background-size:100% 42%;background-position:100% 88%}100%{background-size:0 42%;background-position:100% 88%}}
@keyframes ppvStamp{0%{transform:scale(1.9) rotate(-14deg);opacity:0}10%{transform:scale(1) rotate(-3deg);opacity:1}14%{transform:scale(1.07) rotate(-3deg)}18%,84%{transform:rotate(-3deg);opacity:1}94%,100%{transform:scale(.85) rotate(5deg);opacity:0}}
@keyframes ppvOla{0%,28%,100%{transform:translateY(0);color:${R}}11%{transform:translateY(-.3em);color:${RD}}}
@keyframes ppvBub{0%,25%{top:100%}40%,75%{top:-70%}90%,100%{top:100%}}
@keyframes ppvT1{0%,25%{transform:none}40%,75%{transform:translateY(-115%)}90%,100%{transform:none}}
@keyframes ppvT2{0%,25%{transform:translateY(115%)}40%,75%{transform:none}90%,100%{transform:translateY(115%)}}
@keyframes ppvA1{0%,25%{transform:none}40%,75%{transform:translateX(190%)}90%,100%{transform:none}}
@keyframes ppvA2{0%,25%{transform:translateX(-190%)}40%,75%{transform:none}90%,100%{transform:translateX(-190%)}}
@keyframes ppvAc{0%,25%{background:${RD};color:${V}}40%,75%{background:${V};color:${RD}}90%,100%{background:${RD};color:${V}}}
@keyframes ppvDraw{0%{stroke-dashoffset:1}80%,100%{stroke-dashoffset:0}}
@keyframes ppvPage{0%{transform:translateY(0)}80%,100%{transform:translateY(-62%)}}
@keyframes ppvDots{to{background-position:0 22px,0 0}}
@keyframes ppvBlur{0%,8%{opacity:0;filter:blur(8px);transform:translateY(16px)}30%,70%{opacity:1;filter:none;transform:none}92%,100%{opacity:0;filter:blur(8px);transform:translateY(-12px)}}
@keyframes ppvQm{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg) translateY(-3px)}}
@keyframes ppvPol{0%,15%{transform:translate(var(--px),var(--py)) rotate(var(--pr)) scale(.9)}50%,85%{transform:rotate(var(--r))}100%{transform:translate(var(--px),var(--py)) rotate(var(--pr)) scale(.9)}}
@keyframes ppvTape{0%,40%{transform:rotate(-4deg) scaleX(0)}55%,85%{transform:rotate(-4deg) scaleX(1)}100%{transform:rotate(-4deg) scaleX(0)}}
@keyframes ppvUp{0%{transform:translateY(130%)}22%,100%{transform:translateY(0)}}
@keyframes ppvShrink{0%,22%{transform:scale(1);filter:none}45%,100%{transform:scale(.92);filter:brightness(.7)}}
@keyframes ppvPass{0%,100%{transform:rotateY(-18deg) rotateX(10deg)}50%{transform:rotateY(12deg) rotateX(-4deg) translateY(-4px)}}
@keyframes ppvGlare{0%,30%{transform:translateX(-60%)}70%,100%{transform:translateX(60%)}}
@keyframes ppvWheel{0%,14%{transform:rotate(0)}25%,39%{transform:rotate(-24deg)}50%,64%{transform:rotate(-48deg)}75%,89%{transform:rotate(-72deg)}100%{transform:rotate(-96deg)}}
@keyframes ppvTk{0%,100%{transform:rotateX(8deg) rotateY(-10deg)}50%{transform:rotateX(-4deg) rotateY(10deg) translateY(-3px)}}
@keyframes ppvSeal{0%,30%{opacity:0;transform:scale(2.3) rotate(-26deg)}40%{opacity:1;transform:scale(.88) rotate(5deg)}46%{transform:scale(1.06) rotate(-2deg)}52%,90%{opacity:1;transform:none}100%{opacity:0}}
@keyframes ppvInk{0%,40%{opacity:0;transform:scale(.92)}42%{opacity:.7}60%,100%{opacity:0;transform:scale(1.7)}}
@keyframes ppvFoil{0%{background-position:160% 0}100%{background-position:-60% 0}}
@keyframes ppvClip{0%,10%{clip-path:inset(100% 0 0 0 round 14px)}55%,85%{clip-path:inset(0 0 0 0 round 14px)}100%{clip-path:inset(100% 0 0 0 round 14px)}}
@keyframes ppvZoom{0%,10%{transform:scale(1.22)}55%,100%{transform:scale(1)}}
@keyframes ppvPlate{0%,10%{opacity:0;transform:translate(-24px,28px)}55%,85%{opacity:1;transform:rotate(4deg)}100%{opacity:0;transform:translate(-24px,28px)}}
@keyframes ppvBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes ppvRun{0%{offset-distance:0%}85%,100%{offset-distance:100%}}
@keyframes ppvRail{0%,12%{transform:translateX(0)}30%,42%{transform:translateX(-96px)}60%,72%{transform:translateX(-192px)}90%,100%{transform:translateX(-288px)}}
@keyframes ppvFillN{0%,10%{--ppf:0%}100%{--ppf:100%}}
@property --ppf{syntax:'<percentage>';initial-value:0%;inherits:true}
@keyframes ppvBarH{0%,12%{transform:scaleX(0)}90%,100%{transform:scaleX(1)}}
@keyframes ppvTab{0%,33%{transform:translateY(0)}34%,66%{transform:translateY(100%)}67%,100%{transform:translateY(200%)}}
@keyframes ppvScr{0%,30%{transform:translateY(0)}34%,63%{transform:translateY(-33.333%)}67%,96%{transform:translateY(-66.666%)}100%{transform:translateY(0)}}
@keyframes ppvBlob{0%,30%{transform:scale(.9)}34%,63%{transform:scale(.98)}67%,96%{transform:scale(1.06)}100%{transform:scale(.9)}}
@keyframes ppvLine{0%,18%{transform:translateX(0)}30%,52%{transform:translateX(-84px)}64%,86%{transform:translateX(-168px)}100%{transform:translateX(0)}}
@keyframes ppvSwing{0%,18%{transform:rotate(0)}24%{transform:rotate(9deg)}30%{transform:rotate(-5deg)}36%{transform:rotate(2deg)}42%,52%{transform:rotate(0)}58%{transform:rotate(9deg)}64%{transform:rotate(-5deg)}70%{transform:rotate(2deg)}76%,86%{transform:rotate(0)}92%{transform:rotate(-9deg)}100%{transform:rotate(0)}}
@keyframes ppvMqL{to{transform:translateX(-50%)}}
@keyframes ppvMqR{from{transform:translateX(-50%)}to{transform:translateX(0)}}
@keyframes ppvSkew{0%,60%,100%{transform:skewX(0)}70%{transform:skewX(-8deg)}82%{transform:skewX(3deg)}}
@keyframes ppvFaq{0%,15%{grid-template-rows:0fr}35%,75%{grid-template-rows:1fr}95%,100%{grid-template-rows:0fr}}
@keyframes ppvPlus{0%,15%{transform:none;background:rgba(125,13,239,.1)}35%,75%{transform:rotate(135deg);background:${R}}95%,100%{transform:none;background:rgba(125,13,239,.1)}}
@keyframes ppvBord{0%,15%{border-color:rgba(76,7,144,.14)}35%,75%{border-color:${R}}95%,100%{border-color:rgba(76,7,144,.14)}}
@media (prefers-reduced-motion:reduce){.pp-pv *{animation:none!important}}
`;

const Box = ({ children, className = '', style }) => (
  <div className={'pp-pv relative w-full h-44 overflow-hidden rounded-xl border border-black/10 ' + className} style={{ background: F, ...style }}>
    <style>{CSS}</style>
    {children}
  </div>
);
const Purple = ({ children, className = '' }) => (
  <Box className={className} style={{ background: `radial-gradient(rgba(255,255,255,.09) 1px,transparent 1.4px) 0 0/16px 16px,linear-gradient(165deg,${R},${RD})` }}>{children}</Box>
);

function WordsRise() {
  const w = ['qual', 'é', 'o', 'próximo', 'passo'];
  return (
    <Box className="grid place-items-center px-6">
      <p className="text-center text-[17px] font-bold leading-snug text-[#1A1A1A]">Saiba, todos os dias,<br />
        {w.map((x, i) => (
          <span key={i} className="relative mr-[.28em] inline-block align-bottom" style={{ clipPath: 'inset(-.12em -.4em 0 -.1em)', paddingBottom: '.16em' }}>
            <span className="inline-block" style={{ color: R, animation: `ppvRise 4.5s ${E} infinite both`, animationDelay: i * 0.08 + 's' }}>{x}</span>
            <i className="absolute bottom-[.02em] left-0 right-0 h-[.12em] rounded" style={{ background: V, animation: `ppvUline 4.5s ${E} infinite both`, animationDelay: 0.25 + i * 0.1 + 's' }} />
          </span>
        ))}
      </p>
    </Box>
  );
}

function HandCircle() {
  return (
    <Box className="grid place-items-center">
      <p className="text-[19px] font-bold text-[#1A1A1A]">Garanta como{' '}
        <span className="relative inline-block whitespace-nowrap" style={{ color: R }}>Fundadora.
          <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="pointer-events-none absolute left-[-9%] top-[-26%] h-[150%] w-[118%] overflow-visible">
            <path pathLength="1" d="M168 9C130 1 50 2 18 16C-4 26 4 50 50 56C100 62 176 56 194 38C210 22 182 6 120 5" fill="none" stroke={V} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 2" style={{ animation: `ppvCirc 4s ${E} infinite` }} />
          </svg>
        </span>
      </p>
    </Box>
  );
}

function HighlightKit() {
  return (
    <Box className="grid content-center gap-3 px-6 text-[15px] font-bold text-[#1A1A1A]">
      <p>Saiba o <span style={{ backgroundImage: `linear-gradient(${V},${V})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 42%', backgroundPosition: '0 88%', animation: `ppvMark 4s ${E} infinite` }}>próximo passo.</span></p>
      <p>Comece <span className="inline-block rounded-lg px-2" style={{ background: V, color: RD, animation: 'ppvStamp 4s cubic-bezier(.34,1.56,.64,1) infinite' }}>em novembro.</span></p>
      <p>Não precisa resolver <span className="relative inline-block">tudo hoje.<i className="absolute left-[-2%] right-[-2%] top-[54%] h-[4px] rounded" style={{ background: V, animation: `ppvUline 3.6s ${E} infinite` }} /></span></p>
    </Box>
  );
}

function LettersWave() {
  const t = 'com acompanhamento';
  return (
    <Box className="grid place-items-center">
      <p className="text-[22px] font-bold">
        {t.split('').map((c, i) => (
          <span key={i} className="inline-block" style={{ color: R, animation: `ppvOla 3s ${E} infinite`, animationDelay: i * 45 + 'ms' }}>{c === ' ' ? ' ' : c}</span>
        ))}
      </p>
    </Box>
  );
}

function PillBtn() {
  const ar = (anim) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="absolute inset-0 m-auto h-[44%] w-[44%]" style={{ animation: `${anim} 3.6s ${E} infinite` }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  );
  return (
    <Box className="grid place-items-center">
      <span className="relative isolate inline-flex items-center gap-4 overflow-hidden rounded-full py-1.5 pl-6 pr-1.5 text-[11px] font-bold uppercase tracking-[.04em] text-[#1A1A1A] shadow-[0_10px_26px_-14px_rgba(76,7,144,.55)]" style={{ background: V }}>
        <i className="absolute left-[-10%] right-[-10%] -z-10 h-[240%] rounded-[50%]" style={{ background: RD, animation: `ppvBub 3.6s ${E} infinite` }} />
        <span className="relative grid overflow-hidden">
          <span className="[grid-area:1/1]" style={{ animation: `ppvT1 3.6s ${E} infinite` }}>Quero ser fundadora</span>
          <span className="[grid-area:1/1]" style={{ color: V, animation: `ppvT2 3.6s ${E} infinite` }}>Quero ser fundadora</span>
        </span>
        <span className="relative h-8 w-8 overflow-hidden rounded-full" style={{ animation: `ppvAc 3.6s ${E} infinite` }}>{ar('ppvA1')}{ar('ppvA2')}</span>
      </span>
    </Box>
  );
}

function WaveRibbon() {
  const txt = 'BLACK DO PARTIU • ALUNA FUNDADORA • PARTIU PRO • 14 MESES • ';
  return (
    <Box>
      <svg viewBox="0 0 400 176" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs><filter id="ppv-rb"><feGaussianBlur stdDeviation="5" /></filter></defs>
        <path d="M-120 96 Q-60 40 0 96 T120 96 T240 96 T360 96 T480 96 T600 96" fill="none" stroke={RD} strokeOpacity=".38" strokeWidth="40" strokeLinecap="round" filter="url(#ppv-rb)" transform="translate(0 8)" />
        <path id="ppv-rbp" d="M-120 88 Q-60 32 0 88 T120 88 T240 88 T360 88 T480 88 T600 88" fill="none" stroke={R} strokeWidth="40" strokeLinecap="round" />
        <text fill="#fff" fontSize="15" fontWeight="700" letterSpacing="1.5" dominantBaseline="central">
          <textPath href="#ppv-rbp" startOffset="0">{txt + txt + txt}
            <animate attributeName="startOffset" values="0;-421" dur="7s" repeatCount="indefinite" />
          </textPath>
        </text>
      </svg>
    </Box>
  );
}

function DotGrid() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, W = 0, H = 0;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const size = () => { W = c.clientWidth; H = c.clientHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const draw = (t) => {
      const mx = W / 2 + Math.cos(t / 1300) * W * 0.32, my = H / 2 + Math.sin(t / 900) * H * 0.3, G = 16, RAD = 60;
      ctx.clearRect(0, 0, W, H);
      for (let y = G / 2; y < H; y += G) for (let x = G / 2; x < W; x += G) {
        const dx = x - mx, dy = y - my, d = Math.sqrt(dx * dx + dy * dy) || 1, f = d < RAD ? 1 - d / RAD : 0;
        ctx.fillStyle = 'rgba(125,13,239,' + (0.25 + f * 0.5).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(x + (dx / d) * f * 8, y + (dy / d) * f * 8, 1.2 + f * 1.6, 0, 6.283); ctx.fill();
      }
      ctx.fillStyle = RD; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx, my + 13); ctx.lineTo(mx + 4, my + 9); ctx.lineTo(mx + 9, my + 9); ctx.closePath(); ctx.fill();
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    size(); raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <Box><canvas ref={ref} className="absolute inset-0 h-full w-full" /></Box>;
}

function ScrollLine() {
  return (
    <Box>
      <div className="absolute inset-x-0 top-0 h-[260%]" style={{ animation: 'ppvPage 6s ease-in-out infinite alternate' }}>
        <svg viewBox="0 0 300 460" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M150 10 C 290 80, 290 150, 150 220 S 10 360, 150 450" fill="none" stroke="rgba(125,13,239,.12)" strokeWidth="4" strokeLinecap="round" />
          <path pathLength="1" d="M150 10 C 290 80, 290 150, 150 220 S 10 360, 150 450" fill="none" stroke="rgba(125,13,239,.5)" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 1" style={{ animation: 'ppvDraw 6s ease-in-out infinite alternate' }} />
        </svg>
        {[8, 30, 52, 74].map((t) => (
          <div key={t} className="absolute left-6 right-6 h-[9%] rounded-xl border border-black/5 bg-white/80" style={{ top: t + '%' }} />
        ))}
      </div>
    </Box>
  );
}

function WavySection() {
  const top = 'M0 18C50 4 100 2 150 9s100 14 150 8V30H0z';
  return (
    <Box className="grid content-center">
      <div className="relative h-[120px]">
        <svg viewBox="0 0 300 30" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[22px] w-full"><path d={top} fill={R} /></svg>
        <div className="absolute inset-x-0 bottom-[20px] top-[20px]" style={{ backgroundImage: `radial-gradient(rgba(255,255,255,.14) 1px,transparent 1.4px),linear-gradient(165deg,${R},${RD})`, backgroundSize: '14px 14px,100% 100%', animation: 'ppvDots 2.4s linear infinite' }}>
          <p className="px-6 pt-4 text-[13px] font-bold text-white">Direção para decidir.<br />Ferramentas para executar.</p>
        </div>
        <svg viewBox="0 0 300 30" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[22px] w-full"><path d="M0 0H300V10C250 26 200 30 150 22S60 2 0 16z" fill={RD} /></svg>
      </div>
    </Box>
  );
}

function BlurReveal() {
  return (
    <Box className="grid content-center gap-2.5 px-8">
      {[['bg-white', '70%'], ['', '90%'], ['', '55%']].map(([c, w], i) => (
        <div key={i} className={'h-9 rounded-xl ' + c} style={{ width: w, background: i === 1 ? R : i === 2 ? V : undefined, animation: 'ppvBlur 4.2s ease-in-out infinite', animationDelay: i * 0.25 + 's' }} />
      ))}
    </Box>
  );
}

function Orbit() {
  const refs = useRef([]);
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const f = (t) => {
      refs.current.forEach((p, i, a) => {
        if (!p) return;
        const ang = t / 1000 * 0.5 + (i / a.length) * Math.PI * 2, tilt = -0.14, x = Math.cos(ang) * 105, y = Math.sin(ang) * 34;
        const xr = x * Math.cos(tilt) - y * Math.sin(tilt), yr = x * Math.sin(tilt) + y * Math.cos(tilt), d = (Math.sin(ang) + 1) / 2;
        p.style.transform = `translate(-50%,-50%) translate(${xr.toFixed(1)}px,${yr.toFixed(1)}px) scale(${(0.72 + d * 0.38).toFixed(3)})`;
        p.style.opacity = (0.45 + d * 0.55).toFixed(2); p.style.zIndex = Math.sin(ang) > 0 ? 6 : 3;
      });
      if (!reduce) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <Box>
      <i className="absolute left-1/2 top-1/2 h-[80px] w-[86%] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] rounded-[50%] border-2 border-dashed border-[rgba(125,13,239,.28)]" />
      <div className="absolute left-1/2 top-1/2 z-[5] -ml-9 -mt-9 grid h-[72px] w-[72px] place-items-center rounded-full shadow-[0_20px_26px_-14px_rgba(76,7,144,.75),inset_-6px_-8px_14px_rgba(0,0,0,.28)]" style={{ background: `radial-gradient(circle at 32% 28%,#b06bff,${R} 42%,${RD})` }}>
        <b className="text-[30px] leading-none" style={{ color: V, animation: 'ppvQm 3s ease-in-out infinite' }}>?</b>
      </div>
      {['divulgar', 'pedidos', 'catálogo', 'preços', 'clientes'].map((t, i) => (
        <span key={t} ref={(n) => (refs.current[i] = n)} className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-[rgba(76,7,144,.14)] bg-white px-2.5 py-1 text-[10px] font-bold shadow-[0_10px_16px_-10px_rgba(76,7,144,.6)]" style={{ color: RD }}>{t}</span>
      ))}
    </Box>
  );
}

function Polaroids() {
  const C = [{ r: '-3deg', px: '62px', py: '10px', pr: '-9deg', bg: '#EDE3FB' }, { r: '2.2deg', px: '0px', py: '-4px', pr: '6deg', bg: R }, { r: '-1.6deg', px: '-62px', py: '4px', pr: '-2deg', bg: '#E9F9B8' }];
  return (
    <Box className="flex items-center justify-center gap-3">
      {C.map((c, i) => (
        <div key={i} className="relative w-[78px] rounded-xl bg-white p-1.5 pb-3 shadow-[0_16px_22px_-14px_rgba(76,7,144,.55)]" style={{ '--r': c.r, '--px': c.px, '--py': c.py, '--pr': c.pr, zIndex: [1, 3, 2][i], animation: `ppvPol 5s ${E} infinite` }}>
          <i className="absolute left-1/2 top-[-7px] z-[2] -ml-6 h-3 w-12 origin-left rounded-sm bg-[rgba(190,242,30,.85)]" style={{ animation: 'ppvTape 5s ease-out infinite' }} />
          <div className="h-[62px] rounded-lg" style={{ background: c.bg }} />
          <div className="mt-2 h-1.5 w-4/5 rounded bg-black/15" /><div className="mt-1 h-1.5 w-1/2 rounded" style={{ background: V }} />
        </div>
      ))}
    </Box>
  );
}

// cada carta sobe na sua vez (janela de 22%), as de trás encolhem e escurecem; no fim tudo volta junto
const STACK_KF = [0, 1, 2, 3].map((i) => {
  const a = i ? 4 + (i - 1) * 24 : 0, b = a + 14, back = (k) => `transform:translateY(0) scale(${(1 - k * 0.05).toFixed(2)});filter:brightness(${(1 - k * 0.12).toFixed(2)})`;
  let s = `@keyframes ppvStk${i}{`;
  s += i ? `0%,${a}%{transform:translateY(140%)}${b}%{${back(0)}}` : `0%{${back(0)}}`;
  for (let j = i + 1; j < 4; j++) { const t = 4 + (j - 1) * 24 + 14; s += `${t}%{${back(j - i)}}`; }
  return s + `88%{${back(3 - i)}}100%{${i ? 'transform:translateY(140%)' : back(0)}}}`;
}).join('');

function Stack() {
  const C = [`linear-gradient(150deg,${R},${RD})`, '#fff', V, `linear-gradient(200deg,${RD},#2f0559)`];
  return (
    <Box>
      <style>{STACK_KF}</style>
      {C.map((bg, i) => (
        <div key={i} className="absolute inset-x-8 h-[118px] origin-top rounded-2xl border border-black/5 p-3 shadow-[0_16px_30px_-20px_rgba(76,7,144,.55)]"
          style={{ top: 16 + i * 8 + 'px', background: bg, animation: `ppvStk${i} 7s ${E} infinite` }}>
          <div className="h-2.5 w-1/2 rounded" style={{ background: i === 1 || i === 2 ? RD : V, opacity: 0.8 }} />
          <div className="mt-2 h-2 w-2/3 rounded bg-black/15" />
        </div>
      ))}
    </Box>
  );
}

function AccessPass() {
  return (
    <Purple className="grid place-items-center [perspective:600px]">
      <div className="absolute h-[100px] w-[160px] translate-x-4 -translate-y-4 rotate-[8deg] rounded-xl" style={{ background: `linear-gradient(135deg,${V},#93c90f)`, animation: 'ppvPass 6s ease-in-out infinite' }} />
      <div className="relative flex h-[100px] w-[160px] flex-col justify-between overflow-hidden rounded-xl p-3 shadow-[0_20px_26px_-16px_rgba(0,0,0,.65)]" style={{ background: 'linear-gradient(135deg,#25033f,#3d0675 55%,#5b0bb0)', animation: 'ppvPass 6s ease-in-out infinite' }}>
        <div className="flex justify-between"><b className="text-[13px]" style={{ color: V }}>Partiu Pro</b><i className="h-4 w-5 rounded" style={{ background: V }} /></div>
        <small className="text-[7px] font-bold tracking-[.2em] text-white/75">ALUNA FUNDADORA</small>
        <i className="absolute inset-[-40%] bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,.3)_50%,transparent_60%)]" style={{ animation: 'ppvGlare 3.5s ease-in-out infinite' }} />
      </div>
    </Purple>
  );
}

function Ferris() {
  const S = ['#fff', V, '#5a12a8', '#fff', V, '#5a12a8'];
  return (
    <Purple>
      <div className="absolute left-1/2 top-[300px] h-0 w-0" style={{ animation: `ppvWheel 8s ${E} infinite` }}>
        <i className="absolute -left-[262px] -top-[262px] h-[524px] w-[524px] rounded-full border-2 border-dashed border-white/25" />
        {S.map((bg, i) => (
          <div key={i} className="absolute -ml-[34px] h-[82px] w-[68px] origin-[50%_268px] rounded-xl p-1.5 shadow-[0_14px_20px_-12px_rgba(0,0,0,.6)]"
            style={{ top: -268, background: bg, transform: `rotate(${i * 24}deg)` }}>
            <div className="h-[46px] rounded-lg bg-black/10" />
            <div className="mt-1.5 h-1.5 w-4/5 rounded bg-black/20" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-2.5 left-1/2 h-1 w-24 -translate-x-1/2 overflow-hidden rounded bg-white/20"><i className="block h-full origin-left" style={{ background: V, animation: 'ppvBarH 8s linear infinite' }} /></div>
    </Purple>
  );
}

function Ticket() {
  const m = 'radial-gradient(circle at 70% 0,transparent 9px,#000 9.5px) 0 0/100% 51% no-repeat,radial-gradient(circle at 70% 100%,transparent 9px,#000 9.5px) 0 100%/100% 51% no-repeat';
  return (
    <Box className="grid place-items-center [perspective:700px]">
      <div className="relative h-[110px] w-[250px] [transform-style:preserve-3d]" style={{ animation: 'ppvTk 5s ease-in-out infinite' }}>
        <div className="absolute inset-0 overflow-hidden rounded-2xl" style={{ WebkitMask: m, mask: m, background: `linear-gradient(90deg,${R} 70%,${V} 70%)` }}>
          <i className="absolute inset-0" style={{ background: 'linear-gradient(105deg,transparent 40%,rgba(255,255,255,.6) 50%,transparent 60%) 0 0/250% 100%', mixBlendMode: 'soft-light', animation: 'ppvFoil 3s linear infinite' }} />
        </div>
        <i className="absolute bottom-3 left-[70%] top-3 w-1 -ml-0.5" style={{ background: `radial-gradient(circle,${F} 1.6px,transparent 2px) 0 0/4px 9px repeat-y` }} />
        <div className="absolute left-4 top-4 grid gap-1.5"><b className="text-[8px] tracking-[.12em]" style={{ color: V }}>BLACK DO PARTIU</b><i className="h-2 w-24 rounded-full bg-white/30" /><i className="h-2 w-20 rounded-full bg-white/30" /><i className="h-2 w-28 rounded-full bg-white/30" /></div>
        <div className="absolute right-[6%] top-1/2 grid h-[46px] w-[46px] -translate-y-1/2 place-items-center rounded-full text-[6.5px] font-bold uppercase leading-tight" style={{ background: RD, color: V, animation: 'ppvSeal 4s cubic-bezier(.2,.9,.3,1.25) infinite' }}>
          Aluna<br />Fundadora
          <i className="absolute inset-[-3px] rounded-full border-2" style={{ borderColor: R, animation: 'ppvInk 4s ease-out infinite' }} />
        </div>
      </div>
    </Box>
  );
}

function PhotoPlate() {
  return (
    <Box className="grid place-items-center">
      <div className="relative h-[130px] w-[116px]">
        <i className="absolute bottom-[-6px] left-[20px] right-[-8px] top-[18px] rounded-2xl" style={{ background: V, animation: `ppvPlate 5s ${E} infinite` }} />
        <div className="relative z-[1] h-full overflow-hidden rounded-[14px]" style={{ animation: `ppvClip 5s ${E} infinite` }}>
          <div className="h-full w-full" style={{ background: `radial-gradient(circle at 50% 38%,#f3d6c4 0 18%,transparent 19%),radial-gradient(ellipse at 50% 100%,${R} 0 42%,transparent 43%),linear-gradient(160deg,#EDE3FB,#d9c6f7)`, animation: `ppvZoom 5s ${E} infinite` }} />
        </div>
        <div className="absolute left-[-30px] top-[-6px] z-[2] rounded-xl bg-white px-2 py-1 shadow-[0_12px_18px_-10px_rgba(76,7,144,.55)]" style={{ animation: 'ppvBob 4s ease-in-out infinite' }}>
          <small className="block text-[6px] font-bold tracking-[.16em] text-[#5A5566]">ALUNAS</small><b className="text-[12px]" style={{ color: R }}>+12 mil</b>
        </div>
      </div>
    </Box>
  );
}

function WaveNodes() {
  const P = 'M-10 60 C 40 30, 70 30, 100 60 S 160 90, 200 60 S 260 30, 310 60';
  return (
    <Purple>
      <svg viewBox="0 0 300 176" className="absolute inset-0 h-full w-full">
        <path d={P} fill="none" stroke="rgba(190,242,30,.22)" strokeWidth="3" />
        <path pathLength="1" d={P} fill="none" stroke={V} strokeWidth="3" strokeDasharray="1 1" style={{ animation: 'ppvDraw 4s linear infinite', filter: 'drop-shadow(0 0 4px rgba(190,242,30,.6))' }} />
      </svg>
      <i className="absolute left-0 top-0 h-3 w-3 rounded-full" style={{ background: V, boxShadow: '0 0 14px 6px rgba(190,242,30,.45)', offsetPath: `path('${P}')`, animation: 'ppvRun 4s linear infinite' }} />
      {[18, 50, 82].map((l, i) => (
        <div key={l} className="absolute top-[100px] grid h-10 w-10 -translate-x-1/2 place-items-center rounded-xl text-[14px] font-bold shadow-[0_12px_18px_-10px_rgba(0,0,0,.55)]"
          style={{ left: l + '%', color: RD, background: '#fff', animation: `ppvNodeOn${i} 4s linear infinite` }}>{i + 1}</div>
      ))}
      <style>{[0.24, 0.5, 0.76].map((a, i) => `@keyframes ppvNodeOn${i}{0%,${Math.round(a * 85)}%{background:#fff;transform:translateX(-50%) rotate(-4deg)}${Math.round(a * 85) + 2}%,100%{background:${V};transform:translateX(-50%) scale(1.14)}}`).join('')}</style>
    </Purple>
  );
}

function HRail() {
  return (
    <Box style={{ background: `linear-gradient(200deg,${RD},#3a0570)` }}>
      <div className="absolute left-6 top-5 flex gap-3" style={{ animation: `ppvRail 7s ${E} infinite` }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="h-[118px] w-[84px] flex-none rounded-2xl border border-white/15 bg-white/[.07] p-2.5">
            <span className="block bg-clip-text text-[46px] font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_#BEF21E]"
              style={{ backgroundImage: `linear-gradient(0deg,${V} var(--ppf),transparent var(--ppf))`, animation: 'ppvFillN 1.75s linear infinite', animationDelay: n * 0.35 + 's' }}>{n}</span>
            <i className="mt-2 block h-1.5 w-4/5 rounded bg-white/40" /><i className="mt-1 block h-1.5 w-1/2 rounded bg-white/25" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 left-6 right-6 h-1 overflow-hidden rounded bg-white/15"><i className="block h-full origin-left" style={{ background: V, animation: 'ppvBarH 7s linear infinite' }} /></div>
    </Box>
  );
}

function ToolsPhone() {
  return (
    <Box className="grid grid-cols-[1fr_auto] items-center gap-3 px-5">
      <div className="relative grid gap-2 pl-3">
        <i className="absolute bottom-0 left-0 top-0 w-[3px] rounded bg-[rgba(125,13,239,.12)]" />
        <i className="absolute left-0 top-0 h-1/3 w-[3px] rounded" style={{ background: R, animation: 'ppvTab 6s steps(1) infinite' }} />
        <i className="absolute left-2 top-0 h-1/3 w-[calc(100%-8px)] rounded-xl bg-white shadow-[0_8px_14px_-10px_rgba(76,7,144,.5)]" style={{ animation: `ppvTab 6s ${E} infinite` }} />
        {['Diagnóstico', 'Cronograma', 'Agenda'].map((t) => (
          <div key={t} className="relative z-[1] flex h-9 items-center gap-2 text-[11px] font-bold" style={{ color: RD }}><i className="h-6 w-6 rounded-lg" style={{ background: '#EDE3FB' }} />{t}</div>
        ))}
      </div>
      <div className="relative grid h-[150px] w-[110px] place-items-center overflow-hidden rounded-2xl" style={{ background: `linear-gradient(160deg,${R},${RD})` }}>
        <i className="absolute h-[110px] w-[110px] rounded-full" style={{ background: V, animation: `ppvBlob 6s ${E} infinite` }} />
        <div className="relative z-[1] h-[132px] w-[66px] overflow-hidden rounded-[14px] border-[3px] border-[#16121d] bg-[#F2F2F2]">
          <div className="h-[300%]" style={{ animation: `ppvScr 6s ${E} infinite` }}>
            {[R, V, RD].map((c) => (
              <div key={c} className="grid h-1/3 content-start gap-1.5 p-1.5 pt-4">
                <i className="h-7 rounded-md" style={{ background: c }} /><i className="h-5 rounded-md bg-white" /><i className="h-5 rounded-md bg-white" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
}

function Clothesline() {
  const BG = ['#EDE3FB', V, R, '#E9F9B8', RD];
  return (
    <Box>
      <svg viewBox="0 0 300 176" preserveAspectRatio="none" className="absolute inset-0 h-full w-full"><path d="M0 26 Q150 60 300 26" fill="none" stroke={RD} strokeOpacity=".42" strokeWidth="1.5" /></svg>
      <div className="absolute left-[calc(50%-36px)] top-[24px] flex gap-3" style={{ animation: `ppvLine 7s ${E} infinite` }}>
        {BG.map((c, i) => (
          <div key={i} className="relative w-[72px] flex-none origin-top" style={{ marginTop: [6, 14, 16, 12, 4][i] + 'px', animation: 'ppvSwing 7s ease-in-out infinite', animationDelay: i * 0.08 + 's' }}>
            <span className="absolute left-1/2 top-0 z-[2] -ml-1 h-4 w-2 rounded-sm" style={{ background: V, boxShadow: '0 2px 3px rgba(76,7,144,.3)' }} />
            <div className="mt-2 rounded bg-white p-1.5 pb-0 shadow-[0_12px_18px_-10px_rgba(76,7,144,.5)]">
              <div className="h-[52px] rounded-sm" style={{ background: c }} />
              <div className="flex h-5 items-center justify-center"><i className="h-1.5 w-3/4 rounded" style={{ background: 'rgba(76,7,144,.35)' }} /></div>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}

function SkewMarquee() {
  const row = (dir, n) => (
    <div className="overflow-hidden" style={{ animation: 'ppvSkew 3.5s ease-in-out infinite' }}>
      <div className="flex w-max gap-2.5" style={{ animation: `${dir} ${n}s linear infinite` }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="grid h-[62px] w-[100px] flex-none place-items-center rounded-xl bg-white p-1.5 shadow-[0_12px_18px_-12px_rgba(0,0,0,.55)]">
            <div className="grid h-full w-full content-center gap-1 rounded-lg bg-[#EDE3FB] px-2"><i className="h-1.5 w-4/5 rounded bg-[rgba(76,7,144,.35)]" /><i className="h-1.5 w-3/5 rounded bg-[rgba(76,7,144,.2)]" /></div>
          </div>
        ))}
      </div>
    </div>
  );
  return <Purple className="grid content-center gap-2.5">{row('ppvMqL', 14)}{row('ppvMqR', 17)}</Purple>;
}

function Faq() {
  return (
    <Box className="grid content-center gap-2 px-6">
      <div className="rounded-2xl border bg-white" style={{ animation: 'ppvBord 4.5s ease-in-out infinite' }}>
        <div className="flex items-center justify-between px-3.5 py-2.5 text-[11px] font-bold text-[#1A1A1A]">Por quanto tempo tenho acesso?
          <span className="relative h-6 w-6 rounded-full" style={{ animation: `ppvPlus 4.5s ${E} infinite` }}>
            <i className="absolute left-1/2 top-1/2 h-[2px] w-2.5 -translate-x-1/2 -translate-y-1/2 rounded" style={{ background: V }} />
            <i className="absolute left-1/2 top-1/2 h-[2px] w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-90 rounded" style={{ background: V }} />
          </span>
        </div>
        <div className="grid" style={{ animation: `ppvFaq 4.5s ${E} infinite` }}><div className="overflow-hidden"><p className="px-3.5 pb-3 text-[10px] text-[#5A5566]">Da compra até 31 de dezembro de 2027.</p></div></div>
      </div>
      {['Quando recebo os cursos?', 'Os workshops ficam gravados?'].map((q) => (
        <div key={q} className="flex items-center justify-between rounded-2xl border border-[rgba(76,7,144,.14)] bg-white px-3.5 py-2.5 text-[11px] font-bold text-[#1A1A1A]">{q}<span className="grid h-6 w-6 place-items-center rounded-full text-[14px] leading-none" style={{ background: 'rgba(125,13,239,.1)', color: R }}>+</span></div>
      ))}
    </Box>
  );
}

export const partiuProPreviews = {
  'pp-words-rise': WordsRise,
  'pp-hand-circle': HandCircle,
  'pp-highlight-kit': HighlightKit,
  'pp-letters-wave': LettersWave,
  'pp-pill-btn': PillBtn,
  'pp-wave-ribbon': WaveRibbon,
  'pp-dot-grid': DotGrid,
  'pp-scroll-line': ScrollLine,
  'pp-wavy-section': WavySection,
  'pp-blur-reveal': BlurReveal,
  'pp-orbit': Orbit,
  'pp-polaroids': Polaroids,
  'pp-stack': Stack,
  'pp-access-pass': AccessPass,
  'pp-ferris': Ferris,
  'pp-ticket': Ticket,
  'pp-photo-plate': PhotoPlate,
  'pp-wave-nodes': WaveNodes,
  'pp-h-rail': HRail,
  'pp-tools-phone': ToolsPhone,
  'pp-clothesline': Clothesline,
  'pp-skew-marquee': SkewMarquee,
  'pp-faq': Faq,
};
