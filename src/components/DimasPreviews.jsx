import React, { useEffect, useRef } from 'react';

// Prévias leves (CSS/SVG e um canvas) dos efeitos da LP do Dr. Dimas Melão
const G9 = '#283838', G95 = '#1E2B2B', G8 = '#2F4242', G7 = '#3F6A57', G6 = '#4F7F6B', G1 = '#E3EDE8', G50 = '#F0F5F2';
const GOLD = '#E2CA7C', GOLDD = '#8A6D1F', GOLDL = '#F4EACB', LINE = 'rgba(40,56,56,.13)';
const EASE = 'cubic-bezier(.22,1,.36,1)';

const CSS = `
@keyframes dmStrip{0%{clip-path:inset(50% 0 50% 0);filter:brightness(1.8);animation-timing-function:cubic-bezier(.7,0,.2,1)}12%{filter:brightness(1.15)}18%,80%{clip-path:inset(0 0 0 0);filter:none;animation-timing-function:cubic-bezier(.7,0,.3,1)}94%,100%{clip-path:inset(50% 0 50% 0);filter:brightness(1.8)}}
@keyframes dmBeam{0%{opacity:0;transform:none}5%{opacity:1}18%,100%{opacity:0;transform:translateX(270%)}}
@keyframes dmOdo{0%,10%{transform:translateY(0)}45%,85%{transform:translateY(calc(var(--v) * -1.1em))}100%{transform:translateY(0)}}
@keyframes dmLine{0%,20%{transform:scaleY(0)}50%,90%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes dmDrum{0%,18%{transform:translateY(calc(-50% + var(--o0) * 46px)) rotateX(calc(var(--o0) * -24deg)) scale(var(--s0));opacity:var(--a0)}33%,51%{transform:translateY(calc(-50% + var(--o1) * 46px)) rotateX(calc(var(--o1) * -24deg)) scale(var(--s1));opacity:var(--a1)}66%,84%{transform:translateY(calc(-50% + var(--o2) * 46px)) rotateX(calc(var(--o2) * -24deg)) scale(var(--s2));opacity:var(--a2)}100%{transform:translateY(calc(-50% + var(--o0) * 46px)) rotateX(calc(var(--o0) * -24deg)) scale(var(--s0));opacity:var(--a0)}}
@keyframes dmArc{0%,18%{stroke-dashoffset:.667}33%,51%{stroke-dashoffset:.333}66%,84%{stroke-dashoffset:0}100%{stroke-dashoffset:.667}}
@keyframes dmDeal{0%,10%{transform:translate(var(--fx),var(--fy)) rotate(var(--fr)) scale(.88)}45%,85%{transform:none}100%{transform:translate(var(--fx),var(--fy)) rotate(var(--fr)) scale(.88)}}
@keyframes dmDrop{0%,100%{transform:translateY(-2px) scale(1)}50%{transform:translateY(2px) scale(.88)}}
@keyframes dmRoute{0%,8%{stroke-dashoffset:1}70%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:1}}
@keyframes dmDot0{0%,8%{background:#fff;color:${G7};transform:none}14%,90%{background:${G9};color:${GOLD};transform:scale(1.08)}96%,100%{background:#fff;color:${G7};transform:none}}
@keyframes dmDot1{0%,40%{background:#fff;color:${G7};transform:none}46%,90%{background:${G9};color:${GOLD};transform:scale(1.08)}96%,100%{background:#fff;color:${G7};transform:none}}
@keyframes dmDot2{0%,68%{background:#fff;color:${G7};transform:none}74%,90%{background:${G9};color:${GOLD};transform:scale(1.08)}96%,100%{background:#fff;color:${G7};transform:none}}
@keyframes dmRun{to{transform:translateX(-50%)}}
@keyframes dmSpin{0%,8%{transform:rotateY(-40deg) rotateX(18deg)}30%,45%{transform:rotateY(-14deg) rotateX(6deg)}60%,85%{transform:rotateY(166deg) rotateX(6deg)}100%{transform:rotateY(320deg) rotateX(18deg)}}
@keyframes dmBleed{0%,8%{transform:translateX(30%)}85%,100%{transform:translateX(-55%)}}
@keyframes dmLean{0%,100%{transform:rotate(0)}30%{transform:rotate(-2deg)}60%{transform:rotate(1.2deg)}}
@keyframes dmBlind{0%,12%{transform:scaleX(1)}35%,80%{transform:scaleX(0)}95%,100%{transform:scaleX(1)}}
@keyframes dmZoom{0%,12%{transform:scale(1.2)}80%{transform:scale(1)}100%{transform:scale(1.2)}}
@keyframes dmPath{0%,8%{height:0}75%,90%{height:calc(100% - 20px)}100%{height:0}}
@keyframes dmLit0{0%,16%{background:#fff;transform:none}21%,90%{background:${GOLDD};transform:scale(1.2)}96%,100%{background:#fff;transform:none}}
@keyframes dmLit1{0%,36%{background:#fff;transform:none}41%,90%{background:${GOLDD};transform:scale(1.2)}96%,100%{background:#fff;transform:none}}
@keyframes dmLit2{0%,56%{background:#fff;transform:none}61%,90%{background:${GOLDD};transform:scale(1.2)}96%,100%{background:#fff;transform:none}}
@keyframes dmLit3{0%,74%{background:#fff;transform:none}79%,90%{background:${GOLDD};transform:scale(1.2)}96%,100%{background:#fff;transform:none}}
@keyframes dmWord{0%{opacity:.12;filter:blur(4px)}100%{opacity:1;filter:none}}
@keyframes dmIris{0%,8%{clip-path:circle(14% at 50% 50%)}60%,88%{clip-path:circle(75% at 50% 50%)}100%{clip-path:circle(14% at 50% 50%)}}
@keyframes dmDrift{to{background-position:18px 36px}}
@keyframes dmFlood{0%,20%{width:34px;height:34px;right:0}45%,80%{width:520px;height:520px;right:-140px}100%{width:34px;height:34px;right:0}}
@keyframes dmFloodTxt{0%,22%{color:#fff}45%,78%{color:${G9}}100%{color:#fff}}
@keyframes dmTurn{0%,22%{transform:none}45%,78%{transform:rotate(-45deg)}100%{transform:none}}
@keyframes dmMask{0%,8%{transform:translateY(115%) rotate(5deg)}30%,90%{transform:none}100%{transform:translateY(115%) rotate(5deg)}}
@keyframes dmTag{0%,22%{transform:scaleX(0)}40%,90%{transform:scaleX(1)}100%{transform:scaleX(0)}}
@keyframes dmTagTxt{0%,28%{color:${G6}}40%,90%{color:#fff}100%{color:${G6}}}
@keyframes dmOrbit{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes dmOrbitIn{0%,45%{opacity:0}55%,90%{opacity:1}100%{opacity:0}}
@keyframes dmFaq{0%,15%{grid-template-rows:0fr}35%,80%{grid-template-rows:1fr}100%{grid-template-rows:0fr}}
@keyframes dmFaqBg{0%,15%{background:#fff;border-color:${LINE};color:${G9}}35%,80%{background:${G9};border-color:${G9};color:#fff}100%{background:#fff;border-color:${LINE};color:${G9}}}
@keyframes dmFaqI{0%,15%{transform:none;background:${G50}}35%,80%{transform:rotate(90deg);background:${GOLD}}100%{transform:none;background:${G50}}}
@keyframes dmSheet{0%,10%{transform:translateY(100%)}40%,90%{transform:translateY(0)}100%{transform:translateY(100%)}}
@keyframes dmSheetLine{0%,35%{transform:scaleX(0)}60%,90%{transform:scaleX(1)}100%{transform:scaleX(0)}}
@keyframes dmFloat{from{transform:translateY(190px) rotate(0)}to{transform:translateY(-30px) rotate(var(--r))}}
@media (prefers-reduced-motion:reduce){.dm-pv *{animation:none!important}}
`;

const Box = ({ children, className = '', style }) => (
  <div className={'dm-pv relative w-full h-44 overflow-hidden rounded-xl border border-white/10 ' + className} style={style}>
    <style>{CSS}</style>
    {children}
  </div>
);

const Arrow = ({ className = '', style }) => (
  <svg viewBox="0 0 24 24" className={className} style={style}><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

// 1 Persiana de luz
const PHOTO = 'radial-gradient(circle at 70% 38%,#d8c3a8 0 10%,#2F4242 11% 22%,transparent 23%),radial-gradient(ellipse at 70% 95%,#283838 0 30%,transparent 31%),linear-gradient(120deg,#f4f4f2,#dfe8e3 55%,#b9cdc3)';
function LightBlinds() {
  const n = 8;
  return (
    <Box className="bg-white">
      {Array.from({ length: n }).map((_, i) => {
        const d = Math.abs((i + 0.5) / n - 0.7);
        return (
          <div key={i} className="absolute top-0 bottom-0 overflow-hidden" style={{ left: (i * 100) / n + '%', width: 100 / n + 0.3 + '%' }}>
            <div className="absolute inset-y-0" style={{ left: (-i * 100) + '%', width: n * 100 + '%', background: PHOTO, animation: 'dmStrip 6s ' + (0.05 + d * 1.1).toFixed(2) + 's infinite both' }} />
            <div className="absolute inset-y-0 -left-[60%] w-[60%]" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.95) 45%,rgba(244,234,203,.9) 55%,transparent)', mixBlendMode: 'screen', opacity: 0, animation: 'dmBeam 6s ' + (0.35 + d * 1.1).toFixed(2) + 's infinite both' }} />
          </div>
        );
      })}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,rgba(255,255,255,.95) 0,rgba(255,255,255,.75) 32%,transparent 58%)' }} />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[48%]">
        <div className="h-1.5 w-16 rounded" style={{ background: G7, opacity: 0.6 }} />
        <div className="mt-2 h-2.5 w-full rounded" style={{ background: G9 }} />
        <div className="mt-1.5 h-2.5 w-4/5 rounded" style={{ background: G9 }} />
        <div className="mt-3 h-5 w-24 rounded-full" style={{ background: G9 }} />
      </div>
    </Box>
  );
}

// 2 Odômetro
function Odometer() {
  const nums = [['15'], ['20', 'mil'], ['120']];
  return (
    <Box className="grid grid-cols-3 items-center" style={{ background: G9 }}>
      {nums.map(([v, s], i) => (
        <div key={i} className="relative flex flex-col items-center">
          {i > 0 && <span className="absolute left-0 top-0 h-full w-px origin-top" style={{ background: GOLD, opacity: 0.4, animation: 'dmLine 5s ' + EASE + ' infinite' }} />}
          <span className="flex items-baseline text-[34px] font-light leading-[1.1] tabular-nums" style={{ color: GOLD }}>
            +
            {v.split('').map((d, k) => (
              <span key={k} className="inline-block h-[1.1em] overflow-hidden align-top">
                <span className="flex flex-col leading-[1.1]" style={{ '--v': d, animation: 'dmOdo 5s cubic-bezier(.2,.8,.2,1) ' + k * 0.12 + 's infinite' }}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <span key={n}>{n}</span>)}
                </span>
              </span>
            ))}
            {s && <small className="ml-1 text-[13px] font-medium">{s}</small>}
          </span>
          <span className="mt-1 h-1 w-12 rounded bg-white/30" />
        </div>
      ))}
    </Box>
  );
}

// 3 Tambor 3D
function Drum() {
  const off = [[0, 1, 2], [-1, 0, 1], [-2, -1, 0]];
  return (
    <Box className="flex items-center gap-4 bg-white px-4">
      <svg viewBox="0 0 64 64" className="h-12 w-12 flex-none -rotate-90 fill-none" strokeWidth="4">
        <circle cx="32" cy="32" r="26" stroke={LINE} />
        <circle cx="32" cy="32" r="26" stroke={GOLDD} strokeLinecap="round" pathLength="1" strokeDasharray="1" style={{ animation: 'dmArc 6s ' + EASE + ' infinite' }} />
      </svg>
      <div className="relative h-full flex-1" style={{ perspective: 600 }}>
        {[0, 1, 2].map((i) => {
          const v = {};
          off.forEach((row, s) => {
            const o = row[i], ao = Math.abs(o);
            v['--o' + s] = o; v['--s' + s] = 1 - Math.min(ao, 2) * 0.08; v['--a' + s] = Math.max(0, 1 - ao * 0.45);
          });
          return (
            <div key={i} className="absolute inset-x-0 top-1/2 flex items-center gap-2.5 rounded-xl border p-2.5" style={{ ...v, borderColor: LINE, background: '#fff', transformOrigin: '50% 50% -60px', animation: 'dmDrum 6s ' + EASE + ' infinite' }}>
              <span className="grid h-6 w-6 flex-none place-items-center rounded-md" style={{ background: GOLD }}>
                <svg viewBox="0 0 24 24" className="h-4 w-4"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke={G9} strokeWidth="2.4" strokeLinecap="round" /></svg>
              </span>
              <span className="h-2 flex-1 rounded" style={{ background: G9, opacity: 0.75 }} />
            </div>
          );
        })}
      </div>
    </Box>
  );
}

// 4 Cartas do monte
function CardDeal() {
  const from = [['52%', '32%', '-8deg'], ['-52%', '32%', '9deg'], ['52%', '-32%', '-12deg'], ['-52%', '-32%', '14deg']];
  return (
    <Box className="grid grid-cols-2 gap-2 p-3" style={{ background: G9 }}>
      {from.map(([fx, fy, fr], i) => (
        <div key={i} className="flex items-center gap-2 rounded-xl border p-2" style={{ '--fx': fx, '--fy': fy, '--fr': fr, background: G8, borderColor: 'rgba(226,202,124,.4)', zIndex: 10 - i, animation: 'dmDeal 5s ' + EASE + ' ' + i * 0.12 + 's infinite' }}>
          <svg viewBox="0 0 96 96" className="h-7 w-7 flex-none overflow-visible" fill="none" stroke={GOLD} strokeWidth="5" strokeLinecap="round">
            <path d="M48 14s22 24 22 40a22 22 0 0 1-44 0c0-16 22-40 22-40z" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'dmDrop 2.4s ease-in-out infinite' }} />
          </svg>
          <span className="h-1.5 flex-1 rounded bg-white/70" />
        </div>
      ))}
    </Box>
  );
}

// 5 Caminho em zigue-zague
function Route() {
  const dots = [[40, 34], [190, 88], [56, 142]];
  return (
    <Box className="bg-white">
      <svg viewBox="0 0 240 176" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M40 34 C40 66 190 56 190 88 C190 120 56 110 56 142" stroke={LINE} strokeDasharray="4 6" />
        <path d="M40 34 C40 66 190 56 190 88 C190 120 56 110 56 142" stroke={GOLDD} pathLength="1" strokeDasharray="1" style={{ animation: 'dmRoute 5s ' + EASE + ' infinite' }} />
      </svg>
      {dots.map(([x, y], i) => (
        <span key={i} className="absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-[11px] font-bold" style={{ left: (x / 240) * 100 + '%', top: (y / 176) * 100 + '%', borderColor: LINE, animation: 'dmDot' + i + ' 5s ' + EASE + ' infinite' }}>
          {'0' + (i + 1)}
        </span>
      ))}
    </Box>
  );
}

// 6 Faixas cruzadas
function Bands() {
  const names = ['TRE', 'Bradesco', 'Mediservice', 'SulAmérica', 'Amil'];
  const Run = ({ rev }) => {
    const set = names.map((n, i) => (
      <span key={i} className="inline-flex items-center gap-3 whitespace-nowrap pr-3 text-[10px] font-semibold uppercase tracking-[.14em]">{n}<span>+</span></span>
    ));
    return <div className="flex w-max" style={{ animation: 'dmRun ' + (rev ? 14 : 12) + 's linear infinite' + (rev ? ' reverse' : '') }}>{set}{set}</div>;
  };
  return (
    <Box className="bg-white">
      <div className="absolute -inset-x-[8%] top-1/2 z-[1] overflow-hidden py-2" style={{ background: G9, color: GOLD, transform: 'translateY(-50%) rotate(5deg)' }}><Run /></div>
      <div className="absolute -inset-x-[8%] top-1/2 overflow-hidden py-2" style={{ background: GOLD, color: G9, transform: 'translateY(-50%) rotate(-4deg)' }}><Run rev /></div>
    </Box>
  );
}

// 7 Cartão 3D
function FlipCard() {
  const face = 'absolute inset-0 flex flex-col rounded-xl p-3 [backface-visibility:hidden]';
  return (
    <Box className="grid place-items-center" style={{ background: G50, perspective: 700 }}>
      <div className="relative h-[104px] w-[164px] [transform-style:preserve-3d]" style={{ animation: 'dmSpin 7s ' + EASE + ' infinite' }}>
        <div className={face} style={{ background: 'linear-gradient(135deg,' + G7 + ',' + G9 + ' 55%,' + G95 + ')', border: '1px solid rgba(226,202,124,.4)' }}>
          <span className="h-5 w-7 rounded" style={{ background: 'linear-gradient(135deg,#F4EACB,#C9AE5D)' }} />
          <span className="mt-auto text-[8px] font-bold uppercase tracking-[.2em]" style={{ color: GOLD }}>Convênios</span>
          <div className="mt-1 flex flex-wrap gap-1">{[30, 44, 36].map((w, i) => <span key={i} className="h-3 rounded-full border border-[rgba(226,202,124,.4)] bg-white/10" style={{ width: w }} />)}</div>
        </div>
        <div className={face} style={{ background: 'linear-gradient(135deg,' + GOLDL + ',#EADBA8)', transform: 'rotateY(180deg)' }}>
          <span className="absolute inset-x-0 top-3 h-5" style={{ background: G9, opacity: 0.9 }} />
          <span className="mt-auto text-[8px] font-bold uppercase tracking-[.2em]" style={{ color: G7 }}>Reembolso</span>
          <div className="mt-1 flex flex-wrap gap-1">{[40, 30, 46].map((w, i) => <span key={i} className="h-3 rounded-full bg-white/70" style={{ width: w }} />)}</div>
        </div>
      </div>
    </Box>
  );
}

// 8 Depoimentos vazando
function Bleed() {
  const skins = [['#fff', LINE, G9], [G9, G9, '#fff'], [GOLDL, '#EADBA8', G9], ['#fff', LINE, G9], [G9, G9, '#fff']];
  return (
    <Box className="bg-white">
      <div className="absolute left-0 top-1/2 flex -translate-y-1/2 gap-2.5" style={{ animation: 'dmBleed 7s ' + EASE + ' infinite alternate' }}>
        {skins.map(([bg, bd, fg], i) => (
          <div key={i} className="h-[112px] w-[120px] flex-none rounded-2xl border p-3" style={{ background: bg, borderColor: bd, animation: 'dmLean 3.5s ease-in-out infinite' }}>
            <span className="block text-xl leading-none" style={{ color: i % 5 === 1 || i === 4 ? GOLD : GOLDD }}>“</span>
            <span className="mt-1 block h-1.5 w-full rounded" style={{ background: fg, opacity: 0.6 }} />
            <span className="mt-1.5 block h-1.5 w-4/5 rounded" style={{ background: fg, opacity: 0.6 }} />
            <span className="mt-1.5 block h-1.5 w-3/5 rounded" style={{ background: fg, opacity: 0.6 }} />
            <span className="mt-3 block h-1.5 w-10 rounded" style={{ background: GOLDD }} />
          </div>
        ))}
      </div>
    </Box>
  );
}

// 9 Foto em persianas
function BlindsPhoto() {
  return (
    <Box className="grid place-items-center" style={{ background: G50 }}>
      <div className="relative h-[150px] w-[120px] overflow-hidden rounded-2xl">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 34%,#d8c3a8 0 16%,transparent 17%),radial-gradient(ellipse at 50% 100%,' + G9 + ' 0 42%,transparent 43%),linear-gradient(160deg,#e8eeea,#b9cdc3)', animation: 'dmZoom 5s ' + EASE + ' infinite' }} />
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: 6 }).map((_, i) => (
            <i key={i} className="-mb-px flex-1" style={{ background: G9, transformOrigin: i % 2 ? 'left' : 'right', animation: 'dmBlind 5s cubic-bezier(.7,0,.2,1) ' + i * 0.07 + 's infinite' }} />
          ))}
        </div>
      </div>
    </Box>
  );
}

// 10 Linha do tempo
function Timeline() {
  return (
    <Box className="bg-white px-6 py-4">
      <div className="relative h-full">
        <span className="absolute bottom-2.5 left-[9px] top-2.5 w-0.5" style={{ background: LINE }} />
        <span className="absolute left-[9px] top-2.5 w-0.5" style={{ background: GOLDD, animation: 'dmPath 6s linear infinite' }} />
        <div className="flex h-full flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="relative flex items-center gap-4 pl-0.5">
              <span className="h-4 w-4 flex-none rounded-full border-2" style={{ borderColor: GOLDD, animation: 'dmLit' + i + ' 6s linear infinite' }} />
              <span className="h-2 rounded" style={{ width: [70, 85, 60, 78][i] + '%', background: G9, opacity: 0.75 }} />
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}
// 11 Palavras que acendem
function Scrub() {
  const words = 'O meu compromisso é explicar o seu caso com clareza'.split(' ');
  return (
    <Box className="flex items-center bg-white px-5">
      <p className="text-[17px] font-bold leading-[1.4]" style={{ color: G9 }}>
        {words.map((w, i) => (
          <React.Fragment key={i}>
            {i > 0 && ' '}
            <span className="inline-block" style={{ color: i >= words.length - 2 ? G6 : G9, animation: 'dmWord 4s ' + EASE + ' ' + (i * 0.3 - 4) + 's infinite alternate' }}>{w}</span>
          </React.Fragment>
        ))}
      </p>
    </Box>
  );
}

// 12 CTA em íris
function Iris() {
  return (
    <Box className="bg-white">
      <div className="absolute inset-0 grid place-items-center" style={{ background: G95, animation: 'dmIris 5s ' + EASE + ' infinite' }}>
        <span className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(226,202,124,.3) 1px,transparent 1.3px)', backgroundSize: '18px 18px', animation: 'dmDrift 8s linear infinite', WebkitMask: 'radial-gradient(60% 70% at 50% 50%,#000,transparent)', mask: 'radial-gradient(60% 70% at 50% 50%,#000,transparent)' }} />
        <div className="relative flex flex-col items-center">
          <span className="h-2.5 w-36 rounded bg-white/90" />
          <span className="mt-1.5 h-2.5 w-24 rounded" style={{ background: GOLD }} />
          <span className="mt-4 h-6 w-28 rounded-full" style={{ background: GOLD }} />
        </div>
      </div>
    </Box>
  );
}

// 13 Botão com círculo que inunda
function FloodBtn() {
  return (
    <Box className="grid place-items-center" style={{ background: G50 }}>
      <span className="relative isolate inline-flex h-11 w-[210px] items-center justify-between overflow-hidden rounded-full pl-5 pr-[5px] text-[12px] font-semibold" style={{ background: G9, animation: 'dmFloodTxt 4s ' + EASE + ' infinite' }}>
        <span className="relative z-[1]">Agendar consulta</span>
        <span className="relative grid h-[34px] w-[34px] place-items-center" style={{ color: G9 }}>
          <span className="absolute top-1/2 -z-[1] -translate-y-1/2 rounded-full" style={{ background: GOLD, animation: 'dmFlood 4s ' + EASE + ' infinite' }} />
          <Arrow className="h-4 w-4" style={{ animation: 'dmTurn 4s ' + EASE + ' infinite' }} />
        </span>
      </span>
    </Box>
  );
}

// 14 Título em máscara com etiqueta
function KwOrbit() {
  const words = ['O', 'que', 'muda', 'com', 'a'];
  const mask = (child, i) => (
    <span key={i} className="mr-[.25em] inline-block overflow-hidden px-[.04em] pb-[.16em] pt-[.1em] align-top">
      <span className="inline-block origin-bottom-left" style={{ animation: 'dmMask 5s ' + EASE + ' ' + i * 0.06 + 's infinite' }}>{child}</span>
    </span>
  );
  return (
    <Box className="flex items-center bg-white px-5">
      <h3 className="text-[19px] font-bold leading-[1.3]" style={{ color: G9 }}>
        {words.map((w, i) => mask(w, i))}
        <span className="relative inline-block px-[.28em]">
          <span className="absolute inset-x-0 bottom-[.02em] top-[.1em] -z-0 origin-left rounded-[.26em]" style={{ background: G7, animation: 'dmTag 5s ' + EASE + ' infinite' }} />
          <svg className="pointer-events-none absolute -left-[3px] -top-[2px] h-[calc(100%+4px)] w-[calc(100%+6px)] overflow-visible" style={{ animation: 'dmOrbitIn 5s linear infinite' }}>
            <rect x="0" y="0" width="100%" height="100%" rx="8" pathLength="1" fill="none" stroke={GOLDD} strokeWidth="2" strokeLinecap="round" strokeDasharray=".16 .84" style={{ animation: 'dmOrbit 2.4s linear infinite' }} />
          </svg>
          <span className="relative" style={{ animation: 'dmTagTxt 5s ' + EASE + ' infinite' }}>cirurgia robótica</span>
        </span>
      </h3>
    </Box>
  );
}

// 15 FAQ escuro
function DarkFaq() {
  return (
    <Box className="flex flex-col justify-center gap-2 px-4" style={{ background: G50 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="relative overflow-hidden rounded-xl border" style={i === 1 ? { animation: 'dmFaqBg 5s ' + EASE + ' infinite' } : { background: '#fff', borderColor: LINE, color: G9 }}>
          <div className="flex h-9 items-center px-3 pr-10">
            <span className="h-2 w-3/4 rounded" style={{ background: 'currentColor', opacity: 0.8 }} />
          </div>
          <span className="absolute right-2 top-1.5 grid h-6 w-6 place-items-center rounded-md" style={i === 1 ? { color: G9, animation: 'dmFaqI 5s ' + EASE + ' infinite' } : { background: G50, color: G9 }}>
            <Arrow className="h-3.5 w-3.5" />
          </span>
          {i === 1 && (
            <div className="grid" style={{ animation: 'dmFaq 5s ' + EASE + ' infinite' }}>
              <div className="overflow-hidden">
                <div className="px-3 pb-3"><span className="block h-1.5 w-full rounded bg-white/50" /><span className="mt-1.5 block h-1.5 w-2/3 rounded bg-white/50" /></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </Box>
  );
}

// 16 Fundo de cruzes reagindo ao cursor (canvas)
function CrossGrid() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    let raf = 0, W = 0, H = 0, hover = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => { W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; };
    const move = (e) => { const r = cv.getBoundingClientRect(); hover = [e.clientX - r.left, e.clientY - r.top]; };
    const leave = () => { hover = null; };
    const t0 = performance.now();
    let mx = 0, my = 0;
    const draw = (now) => {
      const k = (now - t0) / 1000;
      const tx = hover ? hover[0] : W * (0.5 + Math.cos(k * 0.7) * 0.32);
      const ty = hover ? hover[1] : H * (0.5 + Math.sin(k * 0.95 + 1) * 0.3);
      mx += (tx - mx) * 0.12; my += (ty - my) * 0.12;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1.4; ctx.lineCap = 'round';
      const SP = 22, RAD = 60;
      for (let y = SP / 2; y < H + SP; y += SP) {
        for (let x = SP / 2; x < W + SP; x += SP) {
          const dx = x - mx, dy = y - my, e = Math.exp(-(dx * dx + dy * dy) / (RAD * RAD));
          const px = x + dx * e * 0.25, py = y + dy * e * 0.25, arm = 2.2 + e * 3, rot = e * 0.8;
          const ca = Math.cos(rot) * arm, sa = Math.sin(rot) * arm;
          ctx.globalAlpha = 0.18 + e * 0.6;
          ctx.strokeStyle = e > 0.3 ? GOLDD : G7;
          ctx.beginPath();
          ctx.moveTo(px - ca, py - sa); ctx.lineTo(px + ca, py + sa);
          ctx.moveTo(px + sa, py - ca); ctx.lineTo(px - sa, py + ca);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    size();
    cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerleave', leave);
    window.addEventListener('resize', size);
    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => { cancelAnimationFrame(raf); if (e.isIntersecting) raf = requestAnimationFrame(draw); });
      io.observe(cv);
    } else raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); io && io.disconnect(); cv.removeEventListener('pointermove', move); cv.removeEventListener('pointerleave', leave); window.removeEventListener('resize', size); };
  }, []);
  return (
    <Box className="bg-white">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </Box>
  );
}

// 17 Folhas sobrepostas
function Sheets() {
  return (
    <Box style={{ background: '#F7F7F7' }}>
      <div className="absolute left-4 top-4"><span className="block h-2.5 w-28 rounded" style={{ background: G9 }} /></div>
      <div className="absolute inset-x-0 bottom-0 top-9 rounded-t-[22px]" style={{ background: G9, animation: 'dmSheet 6s ' + EASE + ' infinite' }}>
        <span className="absolute inset-x-5 top-0 h-[1.5px] origin-center" style={{ background: GOLD, opacity: 0.8, animation: 'dmSheetLine 6s ' + EASE + ' infinite' }} />
        <span className="absolute left-1/2 top-2 -ml-4 h-1 w-8 rounded" style={{ background: 'rgba(226,202,124,.3)' }} />
        <div className="absolute inset-x-0 bottom-0 top-14 rounded-t-[22px] bg-white" style={{ animation: 'dmSheet 6s ' + EASE + ' .5s infinite' }}>
          <span className="absolute inset-x-5 top-0 h-[1.5px] origin-center" style={{ background: GOLDD, opacity: 0.6, animation: 'dmSheetLine 6s ' + EASE + ' .5s infinite' }} />
          <span className="absolute left-1/2 top-2 -ml-4 h-1 w-8 rounded" style={{ background: LINE }} />
        </div>
      </div>
    </Box>
  );
}

// 18 Formas flutuantes
function FloatShapes() {
  const shapes = [
    ['x', 14, '8%', 7, 0, '120deg'], ['o', 18, '18%', 11, -4, '-90deg'], ['q', 9, '5%', 5, -2, '200deg'],
    ['x', 12, '88%', 8, -5, '-140deg'], ['o', 14, '78%', 6, -1, '80deg'], ['q', 10, '93%', 9, -6, '160deg'],
  ];
  const look = {
    x: { background: 'linear-gradient(' + G7 + ',' + G7 + ') center/100% 2px no-repeat,linear-gradient(' + G7 + ',' + G7 + ') center/2px 100% no-repeat', opacity: 0.5 },
    o: { border: '1.5px solid ' + G7, borderRadius: '50%', opacity: 0.5 },
    q: { border: '1.5px solid ' + GOLDD, borderRadius: 3, opacity: 0.6 },
  };
  return (
    <Box className="bg-white">
      <div className="absolute inset-x-[28%] inset-y-4 rounded-xl border" style={{ borderColor: LINE, background: G50 }}>
        <span className="absolute left-3 top-3 h-2 w-3/4 rounded" style={{ background: G9, opacity: 0.6 }} />
        <span className="absolute left-3 top-7 h-2 w-1/2 rounded" style={{ background: G9, opacity: 0.4 }} />
      </div>
      {shapes.map(([k, s, left, dur, delay, r], i) => (
        <i key={i} className="absolute top-0" style={{ ...look[k], width: s, height: s, left, '--r': r, animation: 'dmFloat ' + dur + 's linear ' + delay + 's infinite' }} />
      ))}
    </Box>
  );
}

export const dimasPreviews = {
  'dm-light-blinds': LightBlinds,
  'dm-odometer': Odometer,
  'dm-drum': Drum,
  'dm-card-deal': CardDeal,
  'dm-route': Route,
  'dm-bands': Bands,
  'dm-flip-card': FlipCard,
  'dm-bleed': Bleed,
  'dm-blinds-photo': BlindsPhoto,
  'dm-timeline': Timeline,
  'dm-scrub': Scrub,
  'dm-iris': Iris,
  'dm-flood-btn': FloodBtn,
  'dm-kw-orbit': KwOrbit,
  'dm-dark-faq': DarkFaq,
  'dm-cross-grid': CrossGrid,
  'dm-sheets': Sheets,
  'dm-float-shapes': FloatShapes,
};
