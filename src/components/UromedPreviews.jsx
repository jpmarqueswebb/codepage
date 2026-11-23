import React, { useEffect, useRef } from 'react';

// Prévias leves (CSS/SVG, um canvas) dos efeitos da LP da Uromed (Dra. Bárbara Melão)
const G9 = '#283838', GOLD = '#E2CA7C', GOLDD = '#8A6D1F', G6 = '#4F7F6B', G50 = '#F0F5F2', GL = '#F4EACB';

const CSS = `
@property --umn{syntax:'<integer>';initial-value:0;inherits:false}
@keyframes umStrip{0%,6%{transform:translateX(calc(var(--d)*30%));opacity:0;filter:grayscale(1) brightness(1.4)}35%{opacity:1}45%,100%{transform:none;opacity:1;filter:none}}
@keyframes umScan{0%{top:0;opacity:0}5%{opacity:1}35%{top:100%;opacity:0}100%{top:100%;opacity:0}}
@keyframes umLens{0%,40%{transform:translate(170px,40px) scale(0)}50%{transform:translate(170px,40px) scale(1)}65%{transform:translate(210px,70px) scale(1)}80%{transform:translate(160px,90px) scale(1)}95%,100%{transform:translate(200px,36px) scale(1)}}
@keyframes umSpin{to{transform:rotate(360deg)}}
@keyframes umFill{0%,15%{transform:translate(-50%,-50%) scale(0)}40%,70%{transform:translate(-50%,-50%) scale(1)}95%,100%{transform:translate(-50%,-50%) scale(0)}}
@keyframes umTxtUp{0%,18%{transform:none}40%,70%{transform:translateY(-110%)}92%,100%{transform:none}}
@keyframes umA1{0%,20%{transform:none}40%,72%{transform:translateX(200%)}90%,100%{transform:none}}
@keyframes umA2{0%,22%{transform:translateX(-200%)}42%,72%{transform:none}90%,100%{transform:translateX(-200%)}}
@keyframes umWord{0%,5%{opacity:0;filter:blur(8px);transform:translateY(.5em)}25%,90%{opacity:1;filter:none;transform:none}100%{opacity:0;filter:blur(8px)}}
@keyframes umShine{0%,35%{background-position:100% 0}70%,100%{background-position:0 0}}
@keyframes umCount{0%,8%{--umn:0;color:#fff}55%{color:${GOLD}}60%,100%{--umn:var(--t);color:#fff}}
@keyframes umBar{0%,8%{transform:scaleX(0)}60%,100%{transform:scaleX(1)}}
@keyframes umDeck{0%{transform:translateX(160%) rotate(9deg)}12%,100%{transform:none}}
@keyframes umLight{0%,8%{opacity:.12;filter:blur(5px)}18%,90%{opacity:1;filter:none}100%{opacity:.12;filter:blur(5px)}}
@keyframes umMark{0%,20%{transform:scaleX(0)}35%,90%{transform:scaleX(1)}100%{transform:scaleX(0)}}
@keyframes umHTrack{0%,8%{transform:translateX(0)}92%,100%{transform:translateX(-58%)}}
@keyframes umHBar{0%,8%{transform:scaleX(0)}92%,100%{transform:scaleX(1)}}
@keyframes umRun{to{transform:translateX(-50%)}}
@keyframes umRow{0%,30%{transform:scaleY(0)}36%,60%{transform:none}66%,100%{transform:scaleY(0)}}
@keyframes umFloat{0%{transform:translate(150px,10px) rotate(-6deg)}33%{transform:translate(190px,46px) rotate(5deg)}66%{transform:translate(160px,80px) rotate(-4deg)}100%{transform:translate(150px,10px) rotate(-6deg)}}
@keyframes umFlowL{0%,10%{transform:scaleX(0)}70%,100%{transform:scaleX(1)}}
@keyframes umDot{0%,12%{background:transparent;color:${GOLD};transform:none}28%,88%{background:${GOLD};color:${G9};transform:scale(1.08)}100%{background:transparent;color:${GOLD};transform:none}}
@keyframes umTrail{0%{stroke-dashoffset:1}70%,100%{stroke-dashoffset:0}}
@keyframes umPanel{0%,10%{clip-path:inset(18% 14% round 28px)}55%,100%{clip-path:inset(0 0 round 0)}}
@keyframes umTex{to{transform:translateY(22px)}}
@keyframes umModal{0%,15%{clip-path:circle(0 at 50% 92%)}45%,85%{clip-path:circle(150% at 50% 92%)}100%{clip-path:circle(0 at 50% 92%)}}
@keyframes umAgeFill{0%,8%{transform:scaleX(0)}55%,100%{transform:scaleX(1)}}
@keyframes umPop{0%,12%{scale:0}26%,90%{scale:1}100%{scale:0}}
@keyframes umRing{0%{transform:scale(.8);opacity:.9}100%{transform:scale(1.6);opacity:0}}
@keyframes umSlide{0%,28%{transform:translateX(0)}36%,64%{transform:translateX(-100%)}72%,100%{transform:translateX(-200%)}}
@keyframes umPulse{from{opacity:.8;transform:scale(1)}to{opacity:0;transform:scale(1.4)}}
@keyframes umFaq{0%,15%{grid-template-rows:0fr}35%,80%{grid-template-rows:1fr}100%{grid-template-rows:0fr}}
@keyframes umFaqBar{0%,15%{transform:scaleY(0)}35%,80%{transform:none}100%{transform:scaleY(0)}}
@keyframes umFaqI{0%,15%{transform:none;background:transparent}35%,80%{transform:rotate(180deg);background:${GOLD}}100%{transform:none;background:transparent}}
@keyframes umDraw{0%,10%{clip-path:inset(0 100% 0 0)}60%,100%{clip-path:inset(0 0 0 0)}}
@media (prefers-reduced-motion:reduce){.um-pv *{animation:none!important}}
`;

const Box = ({ children, className = '', style }) => (
  <div className={'um-pv relative w-full h-44 overflow-hidden rounded-xl border border-white/10 ' + className} style={style}>
    <style>{CSS}</style>
    {children}
  </div>
);

const PHOTO = 'radial-gradient(circle at 70% 40%,#d9c7b0 0 9%,#3F6A57 10% 20%,transparent 21%),linear-gradient(120deg,#e3ede8,#9fb8ad 60%,#4F7F6B)';

function ConsoleLens() {
  return (
    <Box className="bg-white">
      {Array.from({ length: 6 }).map((_, i) => (
        <i key={i} className="absolute inset-0" style={{ background: PHOTO, clipPath: `inset(${i * 16.66}% 0 ${100 - (i + 1) * 16.66}% 0)`, '--d': i % 2 ? 1 : -1, animation: 'umStrip 5s cubic-bezier(.75,0,.15,1) infinite', animationDelay: i * 0.07 + 's' }} />
      ))}
      <span className="absolute inset-x-0 h-[2px]" style={{ background: `linear-gradient(90deg,transparent,${GOLD},#fff7df,${GOLD},transparent)`, boxShadow: '0 0 18px 4px rgba(226,202,124,.55)', animation: 'umScan 5s cubic-bezier(.65,0,.35,1) infinite' }} />
      <div className="absolute left-0 top-0 h-16 w-16" style={{ animation: 'umLens 5s cubic-bezier(.34,1.3,.64,1) infinite' }}>
        <div className="absolute inset-1 rounded-full" style={{ background: PHOTO, backgroundSize: '200% 200%', backgroundPosition: '70% 40%', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.7), 0 10px 24px -8px rgba(0,0,0,.5)' }} />
        <svg viewBox="0 0 200 200" className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)]" style={{ animation: 'umSpin 9s linear infinite' }}>
          <circle cx="100" cy="100" r="96" fill="none" stroke={GOLD} strokeWidth="4" strokeDasharray="40 8 12 8" />
        </svg>
        <svg viewBox="0 0 64 64" className="absolute inset-0"><path d="M32 22v20M22 32h20" stroke="#fff" strokeWidth="1.5" /></svg>
      </div>
      <div className="absolute left-4 top-1/2 grid -translate-y-1/2 gap-2"><span className="h-2.5 w-24 rounded" style={{ background: G9 }} /><span className="h-2.5 w-16 rounded" style={{ background: G9 }} /></div>
    </Box>
  );
}

const Arrow = ({ anim }) => (
  <svg viewBox="0 0 24 24" className="absolute left-2.5 top-2.5 h-5 w-5 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: anim }}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);
function EntryFill() {
  return (
    <Box className="grid place-items-center" style={{ background: G50 }}>
      <div className="relative isolate inline-flex h-[60px] items-center gap-6 overflow-hidden rounded-full pl-8 pr-2.5 text-sm font-semibold text-white" style={{ background: G9 }}>
        <span className="absolute -z-10 aspect-square w-[230%] rounded-full" style={{ left: '18%', top: '80%', background: GOLD, animation: 'umFill 3.6s cubic-bezier(.22,1,.36,1) infinite' }} />
        <span className="relative block h-5 overflow-hidden">
          <span className="block" style={{ animation: 'umTxtUp 3.6s cubic-bezier(.22,1,.36,1) infinite' }}>Agendar consulta</span>
          <span className="block" style={{ color: G9, animation: 'umTxtUp 3.6s cubic-bezier(.22,1,.36,1) infinite' }}>Agendar consulta</span>
        </span>
        <span className="relative h-10 w-10 overflow-hidden rounded-full" style={{ background: GOLD, color: G9 }}>
          <Arrow anim="umA1 3.6s cubic-bezier(.22,1,.36,1) infinite" /><Arrow anim="umA2 3.6s cubic-bezier(.22,1,.36,1) infinite" />
        </span>
      </div>
    </Box>
  );
}

function KeywordShine() {
  const words = ['Cuidado', 'urológico', 'com'];
  return (
    <Box className="grid place-items-center bg-white px-5">
      <h3 className="text-center text-[22px] font-semibold leading-tight" style={{ color: G9 }}>
        {words.map((w, i) => <span key={i} className="mr-[.25em] inline-block" style={{ animation: 'umWord 4.5s cubic-bezier(.22,1,.36,1) infinite both', animationDelay: i * 0.06 + 's' }}>{w}</span>)}
        <span className="inline-block" style={{ animation: 'umWord 4.5s cubic-bezier(.22,1,.36,1) infinite both', animationDelay: '.2s' }}>
          <span style={{ backgroundImage: `linear-gradient(100deg,${G6} 0 40%,${GOLDD} 47%,${GOLD} 50%,${GOLDD} 53%,${G6} 60% 100%)`, backgroundSize: '260% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', animation: 'umShine 4.5s cubic-bezier(.45,0,.25,1) infinite' }}>precisão robótica</span>
        </span>
      </h3>
    </Box>
  );
}

function CountStats() {
  return (
    <Box className="grid grid-cols-3 items-center px-3 text-center" style={{ background: G9 }}>
      {[[15, '+', 'anos'], [2000, '+', 'cirurgias'], [98, '%', 'satisfação']].map(([t, u, l], i) => (
        <div key={i}>
          <div className="text-3xl font-light tabular-nums text-white">
            <span className="um-cnt" style={{ '--t': t, animation: 'umCount 4s cubic-bezier(.25,1,.5,1) infinite' }} />
            <span style={{ color: GOLD }}>{u}</span>
          </div>
          <span className="mx-auto mt-2 block h-px w-10 overflow-hidden" style={{ background: 'rgba(226,202,124,.25)' }}>
            <i className="block h-full origin-left" style={{ background: GOLD, animation: 'umBar 4s cubic-bezier(.25,1,.5,1) infinite' }} />
          </span>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-white/70">{l}</p>
        </div>
      ))}
      <style>{'.um-cnt{counter-reset:n var(--umn)}.um-cnt::after{content:counter(n)}'}</style>
    </Box>
  );
}

function ScrollDeck() {
  const cards = [['#fff', G9], [G50, G9], [G9, '#fff'], [GL, G9]];
  return (
    <Box className="grid place-items-center" style={{ background: '#f7f7f7' }}>
      <div className="grid w-56">
        {cards.map(([bg, c], i) => (
          <div key={i} className="flex h-24 items-center gap-3 rounded-2xl border p-4 text-[11px] font-semibold" style={{ gridArea: '1/1', background: bg, color: c, borderColor: 'rgba(40,56,56,.13)', marginTop: -i * 6, scale: String(1 - (3 - i) * 0.04), animation: 'umDeck 6s cubic-bezier(.22,1,.36,1) infinite both', animationDelay: i * 1.1 + 's', boxShadow: '0 10px 30px -18px rgba(0,0,0,.5)' }}>
            <svg viewBox="0 0 40 40" className="h-9 w-9 flex-none" fill="none" stroke={c === '#fff' ? GOLD : G6} strokeWidth="2"><circle cx="18" cy="18" r="10" /><path d="M26 26l8 8" /></svg>
            Card {String(i + 1).padStart(2, '0')}
          </div>
        ))}
      </div>
      <span className="absolute bottom-3 left-4 text-xl font-light tabular-nums" style={{ color: G9 }}>0<span>4</span></span>
    </Box>
  );
}

function FearScrub() {
  const words = 'E se for algo sério e eu descobrir tarde demais?'.split(' ');
  const keys = [5, 7, 8];
  return (
    <Box className="grid place-items-center bg-white px-6">
      <p className="text-center text-lg font-bold leading-snug" style={{ color: G9 }}>
        {words.map((w, i) => (
          <span key={i} className="relative isolate mr-[.28em] inline-block" style={{ color: keys.includes(i) ? '#3F6A57' : G9, animation: 'umLight 5s ease infinite both', animationDelay: i * 0.18 + 's' }}>
            {w}
            {keys.includes(i) && <i className="absolute -z-10 bottom-[.1em] left-0 right-[-.2em] h-[.42em] origin-left rounded-sm" style={{ background: GOLD, opacity: 0.55, animation: 'umMark 5s ease infinite', animationDelay: i * 0.18 + 's' }} />}
          </span>
        ))}
      </p>
    </Box>
  );
}

function HorizontalGallery() {
  return (
    <Box style={{ background: G9 }}>
      <div className="absolute left-4 top-6 flex gap-3" style={{ animation: 'umHTrack 6s cubic-bezier(.65,0,.35,1) infinite alternate' }}>
        <div className="h-28 w-40 flex-none rounded-2xl" style={{ background: PHOTO }} />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex h-28 w-28 flex-none flex-col justify-between rounded-2xl border p-3" style={{ borderColor: i === 1 ? GOLD : 'rgba(226,202,124,.22)', background: 'linear-gradient(160deg,#2F4242,#1E2B2B)', transform: i === 1 ? 'translateY(-6px)' : 'none' }}>
            <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" stroke={GOLD} strokeWidth="2"><rect x="6" y="10" width="28" height="20" rx="4" /><path d="M14 20h12" /></svg>
            <span className="h-1.5 w-16 rounded bg-white/70" />
          </div>
        ))}
      </div>
      <span className="absolute bottom-4 left-1/2 h-0.5 w-32 -translate-x-1/2 overflow-hidden" style={{ background: 'rgba(226,202,124,.22)' }}>
        <i className="block h-full origin-left" style={{ background: GOLD, animation: 'umHBar 6s cubic-bezier(.65,0,.35,1) infinite alternate' }} />
      </span>
    </Box>
  );
}

function CrossedBands() {
  const items = ['Próstata', 'Cálculo renal', 'Vasectomia', 'Cirurgia robótica', 'Check-up'];
  const run = (rev) => (
    <div className="flex w-max" style={{ animation: `umRun ${rev ? 22 : 18}s linear infinite`, animationDirection: rev ? 'reverse' : 'normal' }}>
      {items.concat(items).map((t, i) => <span key={i} className="flex items-center gap-4 whitespace-nowrap pr-4 text-[11px] font-semibold uppercase tracking-[.14em]">{t}<b>+</b></span>)}
    </div>
  );
  return (
    <Box style={{ background: G50 }}>
      <div className="absolute -left-6 -right-6 top-1/2 py-2.5" style={{ background: GOLD, color: G9, transform: 'translateY(-50%) rotate(2.4deg)' }}>{run(true)}</div>
      <div className="absolute -left-6 -right-6 top-1/2 z-10 py-2.5" style={{ background: G9, color: GOLD, transform: 'translateY(-50%) rotate(-3deg)' }}>{run(false)}</div>
    </Box>
  );
}

function FloatingIndex() {
  return (
    <Box className="bg-white px-4 pt-4">
      {['Cirurgia robótica', 'Cálculo renal', 'Próstata'].map((t, i) => (
        <div key={i} className="relative isolate flex items-center justify-between overflow-hidden border-b px-2 py-3 text-sm font-semibold" style={{ borderColor: 'rgba(40,56,56,.13)', color: G9 }}>
          <span className="absolute inset-0 -z-10 origin-bottom" style={{ background: G9, animation: 'umRow 6s cubic-bezier(.22,1,.36,1) infinite', animationDelay: i * 2 + 's' }} />
          <span className="mix-blend-difference text-white">{t}</span>
          <span className="grid h-6 w-6 place-items-center rounded-full border text-xs" style={{ borderColor: 'rgba(40,56,56,.2)' }}>+</span>
        </div>
      ))}
      <div className="absolute left-0 top-0 h-28 w-16 overflow-hidden rounded-xl shadow-2xl" style={{ background: PHOTO, animation: 'umFloat 6s ease-in-out infinite' }}>
        <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full text-xs" style={{ background: GOLD, color: G9 }}>↗</span>
      </div>
    </Box>
  );
}

function FlowSteps() {
  return (
    <Box className="flex items-center px-6" style={{ background: 'linear-gradient(150deg,#2F4242,#1E2B2B)' }}>
      <div className="relative grid w-full grid-cols-3">
        <span className="absolute left-[16%] right-[16%] top-5 h-0.5" style={{ background: 'rgba(226,202,124,.22)' }} />
        <span className="absolute left-[16%] right-[16%] top-5 h-0.5 origin-left" style={{ background: GOLD, animation: 'umFlowL 4.5s ease-in-out infinite' }} />
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative grid justify-items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full border text-xs font-bold" style={{ borderColor: 'rgba(226,202,124,.4)', animation: 'umDot 4.5s cubic-bezier(.34,1.56,.64,1) infinite both', animationDelay: i * 0.9 + 's' }}>✓</span>
            <span className="text-2xl font-bold" style={{ color: 'transparent', WebkitTextStroke: '1px rgba(226,202,124,.7)' }}>0{i + 1}</span>
          </div>
        ))}
      </div>
    </Box>
  );
}

function MagneticLines() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = c.offsetWidth, H = c.offsetHeight; c.width = W * dpr; c.height = H * dpr;
    const SP = 18, cells = new Map(); let raf, t0 = performance.now(), mx = W / 2, my = H / 2;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const draw = (now) => {
      const k = (now - t0) / 1000;
      const tx = W * (0.5 + Math.cos(k * 0.7) * 0.35), ty = H * (0.5 + Math.sin(k * 1.1) * 0.35);
      mx += (tx - mx) * 0.18; my += (ty - my) * 0.18;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = '#3F6A57'; ctx.lineCap = 'round'; ctx.lineWidth = 1.4;
      for (let y = SP / 2; y < H; y += SP) for (let x = SP / 2; x < W; x += SP) {
        const key = x * 1000 + y; let a = cells.get(key) ?? 1.4;
        const goal = Math.atan2(my - y, mx - x) + Math.PI / 2;
        const d = ((goal - a + Math.PI / 2) % Math.PI + Math.PI) % Math.PI - Math.PI / 2;
        a += d * 0.12; cells.set(key, a);
        const em = Math.exp(-((mx - x) ** 2 + (my - y) ** 2) / 6400), h = 4 * (1 + 0.6 * em);
        ctx.globalAlpha = 0.25 + 0.75 * em;
        ctx.beginPath(); ctx.moveTo(x - Math.cos(a) * h, y - Math.sin(a) * h); ctx.lineTo(x + Math.cos(a) * h, y + Math.sin(a) * h); ctx.stroke();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <Box className="bg-white"><canvas ref={ref} className="absolute inset-0 h-full w-full" /></Box>;
}

function ScrollTrail() {
  return (
    <Box className="bg-white">
      <svg viewBox="0 0 300 176" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M-4 10 C-4 60 250 20 250 70 S30 90 40 130 S300 140 304 176" fill="none" stroke="rgba(138,109,31,.15)" strokeWidth="1.4" />
        <path d="M-4 10 C-4 60 250 20 250 70 S30 90 40 130 S300 140 304 176" fill="none" stroke={GOLDD} strokeWidth="1.6" strokeLinecap="round" pathLength="1" strokeDasharray="1" style={{ animation: 'umTrail 4s ease-in-out infinite alternate' }} />
      </svg>
      {[30, 80, 125].map((t, i) => <span key={i} className="absolute left-1/2 h-6 w-40 -translate-x-1/2 rounded-lg border bg-white/80" style={{ top: t - 12, borderColor: 'rgba(40,56,56,.1)' }} />)}
    </Box>
  );
}

const TEX = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='22'%3E%3Cpath d='M0 11 Q11 0 22 11 T44 11' fill='none' stroke='%23E2CA7C' stroke-opacity='.18'/%3E%3C/svg%3E\")";
function CtaExpand() {
  return (
    <Box style={{ background: G50 }}>
      <div className="absolute inset-0 grid place-items-center overflow-hidden" style={{ background: G9, animation: 'umPanel 4s cubic-bezier(.22,1,.36,1) infinite alternate' }}>
        <div className="absolute -top-[22px] inset-x-0 h-[calc(100%+22px)]" style={{ backgroundImage: TEX, animation: 'umTex 3s linear infinite' }} />
        <div className="relative grid justify-items-center gap-3">
          <span className="h-3 w-40 rounded bg-white" /><span className="h-2 w-28 rounded bg-white/50" />
          <span className="mt-1 h-8 w-32 rounded-full" style={{ background: GOLD }} />
        </div>
      </div>
    </Box>
  );
}

function CircleModal() {
  return (
    <Box className="grid place-items-center" style={{ background: 'rgba(20,30,30,.55)' }}>
      <span className="absolute bottom-3 left-1/2 h-8 w-36 -translate-x-1/2 rounded-full bg-white/80" />
      <div className="relative w-56 rounded-3xl bg-white p-4" style={{ animation: 'umModal 4.5s cubic-bezier(.7,0,.2,1) infinite' }}>
        <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full border text-xs" style={{ color: G9 }}>×</span>
        <span className="block h-3 w-32 rounded" style={{ background: G9 }} />
        {[0, 1, 2].map((i) => <div key={i} className="mt-2 flex items-center gap-2"><span className="grid h-4 w-4 place-items-center rounded-full text-[8px]" style={{ background: G9, color: GOLD }}>{i + 1}</span><span className="h-1.5 w-28 rounded bg-neutral-300" /></div>)}
        <span className="mt-3 block h-7 rounded-full" style={{ background: G9 }} />
      </div>
    </Box>
  );
}

function AgeRail() {
  const mks = [[10, '20'], [45, '40'], [80, '50']];
  return (
    <Box className="bg-white px-6 pt-16">
      <div className="relative">
        <div className="relative h-1.5 overflow-hidden rounded-full" style={{ background: 'rgba(40,56,56,.08)' }}>
          <i className="absolute inset-0 origin-left" style={{ background: `linear-gradient(90deg,${GOLDD},${GOLD} 40%,${G6})`, animation: 'umAgeFill 5s cubic-bezier(.65,0,.35,1) infinite' }} />
        </div>
        {mks.map(([x, l], i) => (
          <span key={i} className="absolute grid place-items-center rounded-full border-2 text-xs font-semibold" style={{ left: x + '%', top: i === 2 ? -26 : -20, width: i === 2 ? 40 : 32, height: i === 2 ? 40 : 32, translate: '-50% 0', background: i === 2 ? G9 : '#fff', borderColor: i === 2 ? G9 : GOLDD, color: i === 2 ? GOLD : G9, animation: 'umPop 5s cubic-bezier(.34,1.56,.64,1) infinite both', animationDelay: i * 0.5 + 's' }}>
            {l}
            {i === 2 && <i className="absolute -inset-2 rounded-full border-2" style={{ borderColor: GOLD, animation: 'umRing 2s ease-out infinite' }} />}
          </span>
        ))}
      </div>
    </Box>
  );
}

function VideoCarousel() {
  return (
    <Box className="px-8 py-4" style={{ background: G50 }}>
      <div className="h-full overflow-hidden rounded-xl">
        <div className="flex h-full" style={{ animation: 'umSlide 7s cubic-bezier(.65,0,.35,1) infinite' }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative h-full flex-[0_0_100%]" style={{ background: `linear-gradient(180deg,rgba(40,56,56,.2),rgba(40,56,56,.9)),${PHOTO}` }}>
              <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full" style={{ background: GOLD, color: G9 }}>
                <i className="absolute -inset-1.5 rounded-full border-2" style={{ borderColor: GOLD, animation: 'umPulse 2s ease-out infinite' }} />▶
              </span>
              <span className="absolute bottom-2 left-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: GOLD }}>Entrevista {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}

function FaqRows() {
  return (
    <Box className="bg-white px-6 pt-5">
      {['Quando procurar um urologista?', 'A cirurgia robótica dói menos?'].map((q, i) => (
        <div key={i} className="relative overflow-hidden rounded-xl border-b" style={{ borderColor: 'rgba(40,56,56,.13)', background: i === 0 ? G50 : 'transparent' }}>
          {i === 0 && <i className="absolute inset-y-0 left-0 w-0.5 origin-top" style={{ background: GOLDD, animation: 'umFaqBar 5s cubic-bezier(.22,1,.36,1) infinite' }} />}
          <div className="flex items-center justify-between px-3 py-3 text-xs font-semibold" style={{ color: G9 }}>
            {q}
            <span className="grid h-6 w-6 place-items-center rounded-full border" style={{ borderColor: G9, animation: i === 0 ? 'umFaqI 5s cubic-bezier(.22,1,.36,1) infinite' : 'none' }}>+</span>
          </div>
          {i === 0 && (
            <div className="grid" style={{ animation: 'umFaq 5s cubic-bezier(.22,1,.36,1) infinite' }}>
              <div className="overflow-hidden"><div className="grid gap-1.5 px-3 pb-3"><span className="h-1.5 w-48 rounded bg-neutral-300" /><span className="h-1.5 w-36 rounded bg-neutral-300" /></div></div>
            </div>
          )}
        </div>
      ))}
    </Box>
  );
}

function DrawnDivider() {
  return (
    <Box className="flex flex-col">
      <div className="flex-1" style={{ background: G9 }} />
      <svg viewBox="0 0 300 60" preserveAspectRatio="none" className="block h-14 w-full" style={{ background: G9 }}>
        <path d="M0 30 C80 70 200 -10 300 30 V60 H0Z" fill={G50} />
        <path d="M0 30 C80 70 200 -10 300 30" fill="none" stroke={GOLD} strokeWidth="1.6" style={{ animation: 'umDraw 3.5s cubic-bezier(.22,1,.36,1) infinite alternate' }} />
      </svg>
      <div className="flex-1" style={{ background: G50 }} />
    </Box>
  );
}

export const uromedPreviews = {
  'um-console-lens': ConsoleLens,
  'um-entry-fill': EntryFill,
  'um-keyword-shine': KeywordShine,
  'um-count-stats': CountStats,
  'um-scroll-deck': ScrollDeck,
  'um-fear-scrub': FearScrub,
  'um-h-gallery': HorizontalGallery,
  'um-crossed-bands': CrossedBands,
  'um-floating-index': FloatingIndex,
  'um-flow-steps': FlowSteps,
  'um-magnetic-lines': MagneticLines,
  'um-scroll-trail': ScrollTrail,
  'um-cta-expand': CtaExpand,
  'um-circle-modal': CircleModal,
  'um-age-rail': AgeRail,
  'um-video-carousel': VideoCarousel,
  'um-faq-rows': FaqRows,
  'um-drawn-divider': DrawnDivider,
};
