import React from 'react';

// Prévias leves (CSS/SVG puro) dos efeitos da página de vendas da Viviane Rocha
const CSS = `
@keyframes vsTier{0%,15%{transform:translateX(calc(-100% - 2px))}40%,70%{transform:none}95%,100%{transform:translateX(calc(-100% - 2px))}}
@keyframes vsTxt{0%,18%{color:#01332f}40%,70%{color:#fff}92%,100%{color:#01332f}}
@keyframes vsA1{0%,25%{transform:none}40%,70%{transform:translateX(130%)}85%,100%{transform:none}}
@keyframes vsA2{0%,28%{transform:translateX(-130%)}43%,70%{transform:none}85%,100%{transform:translateX(-130%)}}
@keyframes vsWord{0%,10%{transform:translateY(115%)}30%,85%{transform:none}100%{transform:translateY(-115%)}}
@keyframes vsType{0%{width:0}35%,70%{width:6.2em}90%,100%{width:0}}
@keyframes vsBlink{to{opacity:.3}}
@keyframes vsLvl{0%{background-size:.9em .14em,100% 0em;background-position:0 .865em,0 100%}100%{background-size:.9em .14em,100% 1em;background-position:2.7em -.135em,0 100%}}
@keyframes vsClip{0%,8%{clip-path:circle(0% at 72% 45%)}45%,100%{clip-path:circle(150% at 72% 45%)}}
@keyframes vsRing{0%,8%{width:0;height:0;opacity:1}60%,100%{width:420px;height:420px;opacity:0}}
@keyframes vsFill{0%,20%{clip-path:circle(0% at calc(100% - 26px) 50%)}45%,80%{clip-path:circle(150% at calc(100% - 26px) 50%)}100%{clip-path:circle(0% at calc(100% - 26px) 50%)}}
@keyframes vsKnob{0%,20%{transform:none;}45%,80%{transform:translateX(12px)}100%{transform:none}}
@keyframes vsSw{0%,20%{background:#e6eeec}45%,80%{background:#ff810a}100%{background:#e6eeec}}
@keyframes vsRowTxt{0%,22%{color:#1a1a1a}45%,80%{color:#fff}100%{color:#1a1a1a}}
@keyframes vsDraw{from{stroke-dashoffset:300}to{stroke-dashoffset:0}}
@keyframes vsMarch{to{stroke-dashoffset:-28}}
@keyframes vsHead{from{offset-distance:0%}to{offset-distance:100%}}
@keyframes vsWaveA{to{background-position-x:300px}}
@keyframes vsWaveB{to{background-position-x:-440px}}
@keyframes vsRise{0%,10%{transform:translateY(100%)}35%,100%{transform:none}}
@keyframes vsStep{0%,10%{transform:scaleX(0)}40%,100%{transform:none}}
@keyframes vsCurveL{0%,100%{transform:rotateY(-38deg) translateZ(-60px)}50%{transform:rotateY(-8deg)}}
@keyframes vsCurveR{0%,100%{transform:rotateY(38deg) translateZ(-60px)}50%{transform:rotateY(8deg)}}
@keyframes vsMid{0%,100%{transform:translateY(14px) scale(.98)}50%{transform:translateY(-6px) scale(1.04)}}
@keyframes vsSheen{0%,45%{background-position:100% 0}100%{background-position:0 0}}
@keyframes vsDots{to{background-position:14px 14px}}
@keyframes vsBob{0%,100%{transform:translateX(-50%)}50%{transform:translateX(-50%) translateY(-4px)}}
@keyframes vsTl{0%,10%{transform:scaleX(0)}80%,100%{transform:scaleX(1)}}
@keyframes vsRun{0%,10%{left:0}80%,100%{left:100%}}
@keyframes vsDeckG{0%,100%{transform:rotate(-5deg)}50%{transform:translate(-34px,14px) rotate(-14deg)}}
@keyframes vsDeckO{0%,100%{transform:rotate(4deg)}50%{transform:translate(32px,4px) rotate(13deg)}}
@keyframes vsOdo{0%,10%{transform:none}55%,85%{transform:translateY(calc(var(--t) * -1em))}100%{transform:none}}
@keyframes vsFaq{0%,20%{clip-path:circle(0 at calc(100% - 24px) 50%)}45%,80%{clip-path:circle(150% at calc(100% - 24px) 50%)}100%{clip-path:circle(0 at calc(100% - 24px) 50%)}}
@keyframes vsPlus{0%,20%{transform:none;background:#f0f7f6}45%,80%{transform:rotate(135deg);background:#ff810a}100%{transform:none;background:#f0f7f6}}
@keyframes vsChipL{to{transform:translateX(-50%)}}
@keyframes vsChipR{from{transform:translateX(-50%)}to{transform:none}}
@media (prefers-reduced-motion:reduce){.vs *{animation:none!important}}
`;

const Box = ({ children, className = '' }) => (
  <div className={'vs relative w-full h-44 overflow-hidden rounded-xl border border-white/10 ' + className}>
    <style>{CSS}</style>
    {children}
  </div>
);

const ArrowSvg = ({ anim }) => (
  <svg viewBox="0 0 24 24" className="absolute inset-0 h-5 w-5 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: anim }}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);

function TierButton() {
  return (
    <Box className="grid place-items-center bg-[#faf9f6]">
      <div className="relative isolate inline-flex h-12 items-center gap-3 overflow-hidden rounded-full bg-[#ff810a] pl-6 pr-5 text-sm font-semibold" style={{ animation: 'vsTxt 3.4s infinite' }}>
        <span className="absolute -inset-0.5 -z-10 grid grid-rows-3">
          {[0, .07, .14].map((d) => <i key={d} className="block w-[calc(100%+60px)] rounded-r-full bg-[#01332f]" style={{ animation: 'vsTier 3.4s cubic-bezier(.22,1,.36,1) infinite', animationDelay: d + 's' }} />)}
        </span>
        Quero entrar na mentoria
        <span className="relative h-5 w-5 overflow-hidden"><ArrowSvg anim="vsA1 3.4s cubic-bezier(.22,1,.36,1) infinite" /><ArrowSvg anim="vsA2 3.4s cubic-bezier(.22,1,.36,1) infinite" /></span>
      </div>
    </Box>
  );
}

function WordMask() {
  return (
    <Box className="grid place-items-center bg-[#faf9f6] px-6">
      <h3 className="text-center text-2xl font-extrabold leading-tight tracking-tight text-[#01332f]">
        {'Sua aprovação começa aqui'.split(' ').map((w, i) => (
          <span key={i} className="-mb-[.14em] inline-block overflow-hidden pb-[.14em] align-top">
            <span className="inline-block" style={{ animation: 'vsWord 3.6s cubic-bezier(.22,1,.36,1) infinite both', animationDelay: i * .08 + 's' }}>{w}</span>&nbsp;
          </span>
        ))}
      </h3>
    </Box>
  );
}

function Typewriter() {
  return (
    <Box className="grid place-items-center bg-[#faf9f6]">
      <h3 className="flex items-baseline text-2xl font-extrabold text-[#01332f]">
        Passe na&nbsp;
        <span className="inline-block overflow-hidden whitespace-nowrap bg-[linear-gradient(90deg,#ffb46e,#ff810a)] bg-clip-text text-transparent" style={{ animation: 'vsType 4s steps(11) infinite' }}>prova certa</span>
        <span className="ml-0.5 inline-block h-[1.05em] w-[3px] translate-y-[.15em] rounded-sm bg-[#ff810a]" style={{ animation: 'vsBlink .8s ease-in-out infinite alternate' }} />
      </h3>
    </Box>
  );
}

const LIQ = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 20' preserveAspectRatio='none'%3E%3Cpath d='M0 10 Q15 0 30 10 T60 10 T90 10 T120 10 V20 H0Z' fill='%23ff810a'/%3E%3C/svg%3E\"), linear-gradient(#ff810a,#ff810a)";
function LiquidNumber() {
  return (
    <Box className="flex items-center justify-center gap-4 bg-[#faf9f6]">
      <span className="h-[1em] pr-[.1em] text-7xl font-extrabold leading-none tracking-[-.05em]"
        style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(1,51,47,.4)', backgroundImage: LIQ, backgroundRepeat: 'repeat-x,no-repeat', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'vsLvl 3.5s ease-in-out infinite alternate' }}>+30</span>
      <span className="max-w-[9ch] text-sm font-bold text-[#01332f]">anos de experiência</span>
    </Box>
  );
}

function HeroReveal() {
  return (
    <Box className="bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,#e8d5c4_0_11%,#0b4740_12%_22%,transparent_23%),linear-gradient(120deg,#f0f7f6,#c8ddd9)]" style={{ animation: 'vsClip 4s cubic-bezier(.22,1,.36,1) infinite' }} />
      <span className="absolute left-[72%] top-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ff810a]" style={{ animation: 'vsRing 4s cubic-bezier(.22,1,.36,1) infinite' }} />
      <div className="absolute left-5 top-1/2 grid -translate-y-1/2 gap-2">
        <span className="h-2.5 w-28 rounded bg-[#01332f]" /><span className="h-2.5 w-20 rounded bg-[#01332f]" /><span className="mt-2 h-6 w-24 rounded-full bg-[#ff810a]" />
      </div>
    </Box>
  );
}

function SwitchQuiz() {
  return (
    <Box className="grid content-center gap-2 bg-[#faf9f6] px-6">
      {['Estudo e não evoluo', 'Me perco no edital'].map((t, i) => (
        <div key={i} className="relative isolate flex h-11 items-center justify-between overflow-hidden rounded-2xl border border-[#c8ddd9] bg-white px-3 text-xs font-semibold" style={{ animation: 'vsRowTxt 4s infinite', animationDelay: i * .5 + 's' }}>
          <span className="absolute inset-0 -z-10 bg-[#01332f]" style={{ animation: 'vsFill 4s cubic-bezier(.22,1,.36,1) infinite', animationDelay: i * .5 + 's' }} />
          {t}
          <span className="relative h-[18px] w-[30px] rounded-full" style={{ animation: 'vsSw 4s infinite', animationDelay: i * .5 + 's' }}>
            <i className="absolute left-0.5 top-0.5 h-3.5 w-3.5 rounded-full bg-white" style={{ animation: 'vsKnob 4s cubic-bezier(.34,1.56,.64,1) infinite', animationDelay: i * .5 + 's' }} />
          </span>
        </div>
      ))}
    </Box>
  );
}

const PATH = 'M60 30 C60 90 240 60 240 110 S70 140 80 160';
function PinnedNotes() {
  return (
    <Box className="bg-[#01332f]">
      <svg viewBox="0 0 300 176" className="absolute inset-0 h-full w-full">
        <path d={PATH} fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="2" strokeDasharray="8 6" style={{ animation: 'vsMarch 1.2s linear infinite' }} />
        <path d={PATH} fill="none" stroke="#ff810a" strokeWidth="3" strokeLinecap="round" strokeDasharray="300" style={{ animation: 'vsDraw 3.5s ease-in-out infinite alternate' }} />
      </svg>
      <div className="absolute left-5 top-3 w-24 -rotate-3 rounded-xl bg-white p-1.5"><div className="rounded-lg border border-[#c8ddd9] bg-[#f0f7f6] p-1.5 text-lg font-extrabold leading-none text-[#ff810a]">01</div></div>
      <div className="absolute right-5 top-14 w-24 rotate-3 rounded-xl bg-white p-1.5"><div className="rounded-lg border border-[#ffd9b3] bg-[#fff4e8] p-1.5 text-lg font-extrabold leading-none text-[#ff810a]">02</div></div>
    </Box>
  );
}

const W1 = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 90' preserveAspectRatio='none'%3E%3Cpath d='M0 40 C150 0 300 0 450 40 S750 80 900 40 V90 H0Z' fill='%2301332f'/%3E%3C/svg%3E\")";
const W2 = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1300 90' preserveAspectRatio='none'%3E%3Cpath d='M0 62 C220 26 430 26 650 62 S1080 98 1300 62 V90 H0Z' fill='%2301332f'/%3E%3C/svg%3E\")";
function RisingWaves() {
  return (
    <Box className="bg-[#faf9f6]">
      <div className="absolute inset-x-0 bottom-0 h-20 overflow-hidden">
        <span className="absolute inset-0 bg-repeat-x opacity-35" style={{ backgroundImage: W1, backgroundSize: '300px 100%', backgroundPosition: '0 100%', animation: 'vsWaveA 6s linear infinite, vsRise 4s cubic-bezier(.22,1,.36,1) infinite alternate' }} />
        <span className="absolute inset-0 bg-repeat-x" style={{ backgroundImage: W2, backgroundSize: '440px 100%', backgroundPosition: '0 100%', animation: 'vsWaveB 4s linear infinite, vsRise 4s cubic-bezier(.22,1,.36,1) .15s infinite alternate' }} />
      </div>
    </Box>
  );
}

function StepDivider() {
  return (
    <Box className="flex flex-col justify-end bg-[#faf9f6]">
      <div className="flex flex-col items-end gap-1.5">
        {[['34%', 0], ['62%', .1]].map(([w, d]) => <i key={w} className="block h-4 origin-right rounded-bl-[30px] bg-[#01332f]" style={{ width: w, animation: 'vsStep 3s cubic-bezier(.22,1,.36,1) infinite alternate', animationDelay: d + 's' }} />)}
        <i className="block h-10 w-full bg-[#01332f]" />
      </div>
    </Box>
  );
}

function CurvedReels() {
  const reel = 'h-28 w-16 rounded-xl border-2 bg-[linear-gradient(160deg,#0b4740,#0a2422)]';
  return (
    <Box className="flex items-center justify-center gap-3 bg-[#01332f] [perspective:600px]">
      <div className={reel + ' origin-right border-white/15'} style={{ animation: 'vsCurveL 4s ease-in-out infinite' }} />
      <div className={reel + ' relative grid place-items-center border-[#ff810a] shadow-[5px_5px_0_#ff810a]'} style={{ animation: 'vsMid 4s ease-in-out infinite' }}>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#ff810a]"><svg viewBox="0 0 24 24" className="ml-0.5 w-3 fill-[#01332f]"><path d="M7 4v16l13-8z" /></svg></span>
      </div>
      <div className={reel + ' origin-left border-white/15'} style={{ animation: 'vsCurveR 4s ease-in-out infinite' }} />
    </Box>
  );
}

function OfferCard() {
  return (
    <Box className="grid place-items-center bg-[#faf9f6]">
      <div className="relative h-28 w-48 rounded-2xl border-2 border-[#ff810a] bg-[#01332f] p-4 shadow-[7px_7px_0_#ff810a]"
        style={{ backgroundImage: 'linear-gradient(115deg,transparent 42%,rgba(255,255,255,.18) 50%,transparent 58%)', backgroundSize: '280% 100%', backgroundRepeat: 'no-repeat', animation: 'vsSheen 3.5s cubic-bezier(.22,1,.36,1) infinite' }}>
        <span className="absolute inset-x-0 top-0 h-12 rounded-t-2xl bg-[radial-gradient(rgba(255,255,255,.16)_1.2px,transparent_1.3px)] bg-[length:14px_14px] [mask:linear-gradient(#000,transparent)]" style={{ animation: 'vsDots 3s linear infinite' }} />
        <span className="absolute -right-0.5 -top-0.5 h-8 w-8 rounded-[0_16px_0_10px] border-b-2 border-l-2 border-[#ff810a] bg-[linear-gradient(225deg,#faf9f6_50%,#fff_50%)]" />
        <span className="absolute -top-3 left-1/2 rounded-full bg-[#ff810a] px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-[#01332f]" style={{ animation: 'vsBob 2.6s ease-in-out infinite' }}>Mais escolhido</span>
        <p className="relative mt-3 text-xs font-bold text-white/80">Combo</p>
        <p className="relative text-3xl font-extrabold tracking-tight text-white">R$ 197</p>
      </div>
    </Box>
  );
}

function ScrollTimeline() {
  return (
    <Box className="bg-[#01332f] px-6">
      <div className="absolute inset-x-6 top-1/2 h-1 rounded bg-white/15">
        <div className="absolute inset-0 origin-left rounded bg-[#ff810a]" style={{ animation: 'vsTl 4s ease-in-out infinite' }} />
        {[0, 25, 50, 75, 100].map((x) => <span key={x} className="absolute top-1/2 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full border-2 border-white/40 bg-[#01332f]" style={{ left: x + '%' }} />)}
        <span className="absolute top-1/2 -ml-2.5 -mt-2.5 h-5 w-5 rounded-full border-[4px] border-[#ff810a] bg-white" style={{ animation: 'vsRun 4s ease-in-out infinite' }} />
      </div>
      <span className="absolute left-6 top-10 text-sm font-extrabold text-white">Hoje</span>
      <span className="absolute right-6 top-10 text-sm font-extrabold text-[#ff810a]">Aprovação</span>
    </Box>
  );
}

function PhotoDeck() {
  const card = 'absolute inset-0 origin-[50%_90%] rounded-2xl border-2 border-[#01332f]';
  return (
    <Box className="grid place-items-center bg-[#faf9f6]">
      <div className="relative h-32 w-24">
        <div className={card + ' bg-[#01332f]'} style={{ animation: 'vsDeckG 4s ease-in-out infinite' }} />
        <div className={card + ' bg-[#ff810a]'} style={{ animation: 'vsDeckO 4s ease-in-out infinite' }} />
        <div className={card + ' bg-[radial-gradient(circle_at_50%_34%,#e8d5c4_0_18%,#0b4740_19%_36%,#c8ddd9_37%)] shadow-[6px_6px_0_#01332f]'} />
        <span className="absolute -left-6 bottom-3 rounded-lg border-2 border-[#01332f] bg-white px-1.5 text-sm font-extrabold text-[#ff810a] shadow-[3px_3px_0_#01332f]">+30</span>
      </div>
    </Box>
  );
}

function Odometer() {
  const digits = [1, 9, 9, 4];
  return (
    <Box className="grid place-items-center bg-[#faf9f6]">
      <span className="inline-flex h-[1em] overflow-hidden text-6xl font-extrabold leading-none text-[#ff810a]">
        {digits.map((d, k) => (
          <span key={k} className="flex flex-col" style={{ '--t': 10 + d, animation: 'vsOdo 4.5s cubic-bezier(.16,1,.3,1) infinite', animationDelay: k * .18 + 's' }}>
            {Array.from({ length: 20 }, (_, n) => <span key={n} className="h-[1em]">{n % 10}</span>)}
          </span>
        ))}
      </span>
    </Box>
  );
}

function CircleFaq() {
  return (
    <Box className="grid content-center gap-2 bg-[#faf9f6] px-6">
      <div className="relative isolate flex h-12 items-center justify-between overflow-hidden rounded-2xl border border-[#01332f] bg-white pl-4 pr-2 text-xs font-semibold text-[#1a1a1a]">
        <span className="absolute inset-0 -z-10 bg-[#01332f]" style={{ animation: 'vsFaq 4s cubic-bezier(.22,1,.36,1) infinite' }} />
        <span className="mix-blend-difference text-white">Como funciona a mentoria?</span>
        <span className="relative h-8 w-8 rounded-full before:absolute before:left-1/2 before:top-1/2 before:-ml-[6px] before:-mt-px before:h-0.5 before:w-3 before:bg-[#01332f] before:content-[''] after:absolute after:left-1/2 after:top-1/2 after:-ml-[6px] after:-mt-px after:h-0.5 after:w-3 after:rotate-90 after:bg-[#01332f] after:content-['']" style={{ animation: 'vsPlus 4s cubic-bezier(.22,1,.36,1) infinite' }} />
      </div>
      <div className="flex h-12 items-center rounded-2xl border border-[#c8ddd9] bg-white pl-4 text-xs font-semibold text-[#1a1a1a] opacity-55">Serve para qualquer concurso?</div>
    </Box>
  );
}

const CA = ['TJ/SP', 'Receita', 'INSS', 'BB', 'BNDES'], CB = ['Caixa', 'MP/SP', 'TCE/SP', 'SEFAZ', 'TRE'];
function ChipMarquee() {
  const row = (l, r) => (
    <div className="flex w-max" style={{ animation: (r ? 'vsChipR 12s' : 'vsChipL 10s') + ' linear infinite' }}>
      {l.concat(l).map((t, i) => <span key={i} className={'mr-2 whitespace-nowrap rounded-full border border-[#c8ddd9] px-3 py-1.5 text-xs font-semibold text-[#01332f] ' + (r ? 'bg-white' : 'bg-[#f0f7f6]')}>{t}</span>)}
    </div>
  );
  return (
    <Box className="grid content-center gap-2 bg-[#faf9f6] [mask:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      {row(CA, false)}{row(CB, true)}
    </Box>
  );
}

export const vivianeVendasPreviews = {
  'vv-tier-button': TierButton,
  'vv-word-mask': WordMask,
  'vv-typewriter': Typewriter,
  'vv-liquid-number': LiquidNumber,
  'vv-hero-reveal': HeroReveal,
  'vv-switch-quiz': SwitchQuiz,
  'vv-pinned-notes': PinnedNotes,
  'vv-rising-waves': RisingWaves,
  'vv-step-divider': StepDivider,
  'vv-curved-reels': CurvedReels,
  'vv-offer-card': OfferCard,
  'vv-scroll-timeline': ScrollTimeline,
  'vv-photo-deck': PhotoDeck,
  'vv-odometer': Odometer,
  'vv-faq-circle': CircleFaq,
  'vv-chip-marquee': ChipMarquee,
};
