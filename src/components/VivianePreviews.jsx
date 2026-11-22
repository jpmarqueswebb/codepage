import React from 'react';

// Prévias leves (CSS/SVG puro) dos efeitos da página de links da Viviane Rocha
const CSS = `
@keyframes vvSlide{to{transform:translateX(-50%)}}
@keyframes vvBlob{33%{border-radius:62% 38% 34% 66%/55% 62% 38% 45%}66%{border-radius:36% 64% 57% 43%/63% 37% 63% 37%}100%{border-radius:55% 45% 40% 60%/38% 55% 45% 62%}}
@keyframes vvSpin{to{transform:rotate(1turn)}}
@keyframes vvRise{0%,8%{opacity:0;transform:translateY(.6em) rotate(6deg)}22%,85%{opacity:1;transform:none}100%{opacity:0;transform:none}}
@keyframes vvWave{to{transform:translateX(-50%)}}
@keyframes vvCursor{0%,100%{transform:translate(20px,30px)}25%{transform:translate(150px,60px)}50%{transform:translate(230px,110px)}75%{transform:translate(90px,120px)}}
@keyframes vvStack{0%,15%{transform:translateY(120%)}35%,100%{transform:none}}
@keyframes vvShrink{0%,15%{transform:none;filter:none}35%,100%{transform:scale(.92);filter:brightness(.75)}}
@keyframes vvTilt{0%,100%{transform:rotateX(0) rotateY(0)}25%{transform:rotateX(6deg) rotateY(-8deg)}75%{transform:rotateX(-5deg) rotateY(8deg)}}
@keyframes vvPar{0%,100%{translate:0 0}25%{translate:-10px -8px}75%{translate:10px 7px}}
@keyframes vvSweep{0%,20%{transform:translateX(-101%)}45%,75%{transform:none}100%{transform:translateX(101%)}}
@keyframes vvArrow{0%,20%{transform:none;background:#ff810a;color:#01332f}45%,75%{transform:rotate(-45deg);background:#01332f;color:#fff}100%{transform:none;background:#ff810a;color:#01332f}}
@keyframes vvTxt{0%,20%{color:#fff}45%,75%{color:#01332f}100%{color:#fff}}
@keyframes vvShine{0%,55%{transform:translateX(-160%) skewX(-18deg)}85%,100%{transform:translateX(360%) skewX(-18deg)}}
@keyframes vvF1{0%,15%{background:rgba(255,255,255,.2)}16%,100%{background:#ff810a}}
@keyframes vvF2{0%,30%{background:rgba(255,255,255,.2)}31%,100%{background:#ff810a}}
@keyframes vvF3{0%,45%{background:rgba(255,255,255,.2)}46%,100%{background:#ff810a}}
@keyframes vvF4{0%,60%{background:rgba(255,255,255,.2)}61%,100%{background:#ff810a}}
@keyframes vvF5{0%,75%{background:rgba(255,255,255,.2)}76%,100%{background:#ff810a}}
@keyframes vvDone{0%,80%{opacity:0;transform:scale(.7)}86%,100%{opacity:1;transform:none}}
@keyframes vvBar{from{width:0}to{width:100%}}
@media (prefers-reduced-motion:reduce){.vv *{animation:none!important}}
`;

const Box = ({ children, className = '' }) => (
  <div className={'vv relative w-full h-44 overflow-hidden rounded-xl border border-white/10 ' + className}>
    <style>{CSS}</style>
    {children}
  </div>
);

const WORDS = ['TJ/SP', 'Receita', 'BNDES', 'INSS', 'Caixa', 'MP/SP'];
function OutlineRows() {
  return (
    <Box className="bg-[#01332f]">
      <div className="absolute -inset-x-1/3 -inset-y-1/2 flex -rotate-12 flex-col justify-around">
        {[0, 1, 2, 3, 4].map((r) => (
          <div key={r} className="flex w-max whitespace-nowrap" style={{ animation: 'vvSlide ' + (r % 2 ? 22 : 16) + 's linear infinite', animationDirection: r % 2 ? 'reverse' : 'normal' }}>
            {WORDS.concat(WORDS).map((w, i) => (
              <span key={i} className="pr-3 text-3xl font-black uppercase leading-none" style={i % 3 === 1 ? { color: 'rgba(59,182,119,.22)' } : { color: 'transparent', WebkitTextStroke: '1px rgba(200,221,217,.25)' }}>{w}</span>
            ))}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(ellipse_45%_55%_at_50%_50%,rgba(1,51,47,.95),transparent_80%)]">
        <span className="text-lg font-black tracking-tight text-white">Seu <span className="text-[#ff810a]">Hero</span></span>
      </div>
    </Box>
  );
}

function LiquidHalo() {
  return (
    <Box className="grid place-items-center bg-[#01332f]">
      <div className="relative h-36 w-36">
        <div className="absolute inset-[9%] bg-[linear-gradient(135deg,#3bb677,#0f5d53_48%,#ff810a)]" style={{ borderRadius: '42% 58% 63% 37% / 45% 40% 60% 55%', animation: 'vvBlob 5s ease-in-out infinite alternate, vvSpin 14s linear infinite' }} />
        <div className="absolute inset-[18%] rounded-full border-[3px] border-[#faf9f6] bg-[radial-gradient(circle_at_50%_38%,#e8d5c4_0_22%,#0b4740_23%_100%)]" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" style={{ animation: 'vvSpin 18s linear infinite' }}>
          <defs><path id="vvHp" d="M50,50 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" /></defs>
          <text fill="rgba(255,255,255,.85)" fontSize="6.4" fontWeight="800" letterSpacing="1"><textPath href="#vvHp">MENTORA • 20+ ÓRGÃOS • DESDE 1994 • MENTORA • 20+ ÓRGÃOS •</textPath></text>
        </svg>
      </div>
    </Box>
  );
}

function LetterRise() {
  const t = 'Viviane Rocha';
  return (
    <Box className="grid place-items-center bg-[#01332f]">
      <h3 className="text-3xl font-black tracking-[-.045em] text-white">
        {Array.from(t).map((c, i) => (
          <span key={i} className="inline-block" style={{ color: i > 7 ? '#ff810a' : undefined, animation: 'vvRise 3.6s cubic-bezier(.22,1,.36,1) infinite both', animationDelay: i * 0.05 + 's' }}>{c === ' ' ? ' ' : c}</span>
        ))}
      </h3>
    </Box>
  );
}

const WAVE = 'M0 40 C 150 80 350 0 500 40 S 850 80 1000 40 S 1350 0 1500 40 S 1850 80 2000 40 V100 H0 Z';
function DoubleWave() {
  return (
    <Box className="bg-[#01332f]">
      <div className="absolute inset-x-0 bottom-0 h-20">
        <svg className="absolute bottom-0 left-0 h-full w-[200%]" viewBox="0 0 2000 100" preserveAspectRatio="none" style={{ animation: 'vvWave 9s linear infinite reverse' }}><path d={WAVE} fill="rgba(59,182,119,.4)" transform="translate(0 -14)" /></svg>
        <svg className="absolute bottom-0 left-0 h-full w-[200%]" viewBox="0 0 2000 100" preserveAspectRatio="none" style={{ animation: 'vvWave 6s linear infinite' }}><path d={WAVE} fill="#faf9f6" /></svg>
      </div>
    </Box>
  );
}

function DotRepel() {
  const dots = [];
  for (let y = 0; y < 8; y++) for (let x = 0; x < 16; x++) dots.push([x, y]);
  return (
    <Box className="bg-[#faf9f6]">
      <div className="absolute inset-0 grid grid-cols-[repeat(16,1fr)] grid-rows-[repeat(8,1fr)] place-items-center">
        {dots.map(([x, y]) => <span key={x + '-' + y} className="h-1 w-1 rounded-full bg-[#01332f]/25" />)}
      </div>
      <div className="absolute left-0 top-0 h-28 w-28 -ml-14 -mt-14 rounded-full bg-[radial-gradient(closest-side,#faf9f6_0_45%,rgba(59,182,119,.35)_46%,rgba(59,182,119,.12)_70%,transparent)]" style={{ animation: 'vvCursor 6s ease-in-out infinite' }}>
        <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,#faf9f6_0_40%,transparent_41%),repeating-conic-gradient(rgba(59,182,119,.9)_0_6deg,transparent_6deg_30deg)] [mask:radial-gradient(circle,transparent_40%,#000_42%)]" />
      </div>
    </Box>
  );
}

function StickyStack() {
  return (
    <Box className="bg-[#f0f7f6] px-10 pt-4">
      <div className="absolute inset-x-10 top-4 h-40 origin-top rounded-2xl border border-[#c8ddd9] bg-[#faf9f6] p-3 text-sm font-black text-[#01332f]" style={{ animation: 'vvShrink 3.5s cubic-bezier(.22,1,.36,1) infinite alternate' }}>Mentoria TJ/SP</div>
      <div className="absolute inset-x-10 top-8 h-40 rounded-2xl border border-[#c8ddd9] bg-[#faf9f6] p-3 text-sm font-black text-[#01332f]" style={{ animation: 'vvStack 3.5s cubic-bezier(.22,1,.36,1) infinite alternate' }}>Simulado <span className="text-[#ff810a]">gratuito</span></div>
    </Box>
  );
}

function DepthTilt() {
  return (
    <Box className="grid place-items-center bg-[#f0f7f6] [perspective:700px]">
      <div className="relative grid h-32 w-56 place-items-center rounded-2xl border-2 border-transparent [background:linear-gradient(#01332f,#01332f)_padding-box,linear-gradient(135deg,#ff810a,#c8ddd9_35%,#c8ddd9_65%,#01332f)_border-box]" style={{ animation: 'vvTilt 5s ease-in-out infinite' }}>
        <div className="h-16 w-28 rounded-lg bg-white" style={{ animation: 'vvPar 5s ease-in-out infinite' }} />
        <div className="absolute right-4 top-3 rounded-md bg-[#ff810a] px-2 py-0.5 text-[10px] font-extrabold text-[#01332f]" style={{ animation: 'vvPar 5s ease-in-out infinite', scale: '1.6' }}>+1</div>
      </div>
    </Box>
  );
}

function SweepButton() {
  return (
    <Box className="grid place-items-center bg-[#faf9f6]">
      <div className="relative isolate flex h-12 w-60 items-center justify-center overflow-hidden rounded-full bg-[#01332f] pr-8 text-sm font-extrabold" style={{ animation: 'vvTxt 3s cubic-bezier(.22,1,.36,1) infinite' }}>
        <span className="absolute inset-0 -z-10 bg-[#ff810a]" style={{ animation: 'vvSweep 3s cubic-bezier(.22,1,.36,1) infinite' }} />
        Quero participar
        <i className="absolute right-1.5 grid h-9 w-9 place-items-center rounded-full" style={{ animation: 'vvArrow 3s cubic-bezier(.22,1,.36,1) infinite' }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </i>
      </div>
    </Box>
  );
}

function OrbitShine() {
  return (
    <Box className="isolate grid place-items-center bg-[radial-gradient(120%_90%_at_80%_10%,#0b4740,#01332f_60%,#00241f)]">
      <div className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2">
        <div className="h-full w-full rounded-full bg-[conic-gradient(from_0deg,transparent_0_62%,rgba(255,129,10,.6)_75%,transparent_88%)] [mask:radial-gradient(circle,transparent_52%,#000_53%,#000_58%,transparent_59%)]" style={{ animation: 'vvSpin 6s linear infinite' }} />
      </div>
      <div className="relative h-24 w-40 overflow-hidden rounded-xl bg-white p-3">
        <div className="mb-2 h-2 w-16 rounded bg-[#c8ddd9]" /><div className="mb-1.5 h-1.5 w-full rounded bg-[#f0f7f6]" /><div className="h-1.5 w-3/4 rounded bg-[#f0f7f6]" />
        <span className="absolute -bottom-1/4 -top-1/4 left-0 w-[38%] bg-[linear-gradient(100deg,transparent,rgba(255,255,255,.9),transparent)]" style={{ animation: 'vvShine 3.5s cubic-bezier(.22,1,.36,1) infinite' }} />
        <span className="absolute inset-0 bg-[#3bb677]/10" />
      </div>
    </Box>
  );
}

function AnswerSheet() {
  const ans = [2, 0, 3, 1, 4];
  return (
    <Box className="grid place-items-center bg-[#01332f]">
      <div className="w-36 rounded-xl bg-white p-2.5">
        <div className="mb-2 h-1 overflow-hidden rounded bg-[#f0f7f6]"><div className="h-full bg-[#3bb677]" style={{ animation: 'vvBar 6s steps(5) infinite' }} /></div>
        {[0, 1, 2, 3].map((i) => <div key={i} className="mb-1 flex items-center gap-1.5 rounded border border-[#c8ddd9] px-1.5 py-1"><span className="h-2.5 w-2.5 rounded-full bg-[#f0f7f6]" /><span className="h-1 flex-1 rounded bg-[#f0f7f6]" /></div>)}
      </div>
      <div className="absolute bottom-5 right-[18%] grid grid-cols-5 gap-1 rounded-lg bg-[#00241f] p-2">
        {Array.from({ length: 25 }).map((_, k) => {
          const r = Math.floor(k / 5), c = k % 5, hit = ans[r] === c;
          return <span key={k} className="h-2 w-2 rounded-full bg-white/20" style={hit ? { animation: 'vvF' + (r + 1) + ' 6s steps(1) infinite' } : undefined} />;
        })}
      </div>
      <div className="absolute left-[16%] top-4 rounded-full bg-[#ff810a] px-2 py-0.5 text-[10px] font-extrabold text-[#01332f]" style={{ animation: 'vvDone 6s ease infinite' }}>Simulado concluído</div>
    </Box>
  );
}

export const vivianePreviews = {
  'vivi-outline-rows': OutlineRows,
  'vivi-liquid-halo': LiquidHalo,
  'vivi-letter-rise': LetterRise,
  'vivi-double-wave': DoubleWave,
  'vivi-dot-repel': DotRepel,
  'vivi-sticky-stack': StickyStack,
  'vivi-depth-tilt': DepthTilt,
  'vivi-sweep-button': SweepButton,
  'vivi-orbit-shine': OrbitShine,
  'vivi-answer-sheet': AnswerSheet,
};
