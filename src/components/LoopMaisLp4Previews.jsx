import React from 'react';

// Prévias leves (CSS/SVG) dos efeitos da LP4 Benefícios Corporativos da Loop+ (branco + faixas roxas, laranja #fc5304)
const OR = '#fc5304', OL = '#ffb48a', LN = '#e7e0ef', MU = '#5d5866', PU1 = '#76058f';
const GOR = 'linear-gradient(135deg,#fc5304 0%,#ff7a33 100%)';
const GPU = 'radial-gradient(120% 90% at 70% 110%,#76058f 0%,#43096a 38%,#220b52 72%,#1a0638 100%)';
const FD = "'Baloo 2',system-ui,sans-serif";

const CSS = `
@keyframes l4vLoop{0%,40%{transform:rotate(0)}70%,100%{transform:rotate(360deg)}}
@keyframes l4vRing{0%,30%{stroke-dashoffset:1}60%,85%{stroke-dashoffset:0}100%{stroke-dashoffset:1}}
@keyframes l4vDraw{0%{stroke-dashoffset:1;opacity:1}45%,82%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
@keyframes l4vWave{0%,45%,100%{transform:translateY(0)}18%{transform:translateY(-.2em)}}
@keyframes l4vTidy{0%,12%{transform:translateY(var(--y)) rotate(var(--r))}40%,84%{transform:none}100%{transform:translateY(var(--y)) rotate(var(--r))}}
@keyframes l4vMark{0%{transform:scaleX(0);opacity:1}35%,80%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}
@keyframes l4vBar{0%{transform:scaleX(0);opacity:1}55%,85%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}
@keyframes l4vMarch{to{stroke-dashoffset:-26}}
@keyframes l4vType{0%{transform:scaleX(1)}38%,82%{transform:scaleX(0)}92%,100%{transform:scaleX(1)}}
@keyframes l4vCaret{50%{opacity:0}}
@keyframes l4vScr{0%,8%{content:'#X%&+ K*AQ'}16%{content:'Bai%&+ K*AQ'}26%{content:'Baixo +K*AQ'}36%,100%{content:'Baixo engaj.'}}
@keyframes l4vSpin{to{transform:rotate(360deg)}}
@keyframes l4vOrbit{to{offset-distance:100%}}
@keyframes l4vMarq{to{transform:translateX(-50%)}}
@keyframes l4vStack{0%,15%{transform:translateY(120%)}35%,100%{transform:translateY(0)}}
@keyframes l4vStack2{0%,45%{transform:translateY(140%)}65%,100%{transform:translateY(0)}}
@keyframes l4vShrink{0%,30%{transform:scale(1)}40%,100%{transform:scale(.95)}}
@keyframes l4vOdo{0%,20%{transform:translateY(0)}45%,100%{transform:translateY(-10.8em)}}
@keyframes l4vCar{0%,20%{transform:translateX(0)}33%,53%{transform:translateX(-33.33%)}66%,86%{transform:translateX(-66.66%)}100%{transform:translateX(0)}}
@keyframes l4vSpot{0%{left:-10%;top:20%}50%{left:80%;top:70%}100%{left:-10%;top:20%}}
@keyframes l4vPt{0%{transform:translate(0,0) scale(0);opacity:0}20%{opacity:1}100%{transform:translate(var(--dx),-50px) scale(.3);opacity:0}}
@keyframes l4vBrand{0%,24%{background:#fc5304}25%,49%{background:#76058f}50%,74%{background:#0e9f6e}75%,100%{background:#1d4ed8}}
@keyframes l4vSwing{0%,100%{transform:rotateY(-34deg) rotateX(10deg)}50%{transform:rotateY(-18deg) rotateX(4deg)}}
@keyframes l4vFly{0%,30%{transform:none;opacity:1}45%{transform:translate(130%,-10px) rotate(16deg);opacity:0}46%,100%{transform:translate(36px,42px) rotate(7deg) scale(.88);opacity:0}}
@keyframes l4vUp1{0%,40%{transform:translate(12px,14px) rotate(2.4deg) scale(.96)}50%,100%{transform:none}}
@keyframes l4vDrop{0%,10%{transform:translateY(-108%)}30%,100%{transform:none}}
@keyframes l4vFill{0%,10%{transform:scaleX(0)}85%,100%{transform:scaleX(1)}}
@keyframes l4vD0{0%,4%{opacity:1}5%,95%{opacity:0}100%{opacity:1}}
@keyframes l4vD1{0%,29%{opacity:1}30%,95%{opacity:0}100%{opacity:1}}
@keyframes l4vD2{0%,54%{opacity:1}55%,95%{opacity:0}100%{opacity:1}}
@keyframes l4vD3{0%,79%{opacity:1}80%,95%{opacity:0}100%{opacity:1}}
@keyframes l4vLine{0%,15%{stroke-dashoffset:1}50%,100%{stroke-dashoffset:0}}
@keyframes l4vCardOn{0%,45%{border-color:rgba(255,255,255,.16)}55%,100%{border-color:rgba(255,180,138,.75)}}
@keyframes l4vTilt{0%,100%{transform:rotateX(10deg) rotateY(-14deg)}50%{transform:rotateX(16deg) rotateY(14deg)}}
@keyframes l4vBarUp{0%,10%{transform:scaleY(.05)}45%,100%{transform:scaleY(1)}}
@keyframes l4vRingP{0%{stroke-dashoffset:1}90%,100%{stroke-dashoffset:0}}
@keyframes l4vSpotMove{0%{transform:translate(10px,20px)}33%{transform:translate(150px,60px)}66%{transform:translate(60px,100px)}100%{transform:translate(10px,20px)}}
@keyframes l4vClip{0%{clip-path:inset(0 0 100% 0)}80%,100%{clip-path:inset(0 0 0 0)}}
@keyframes l4vBlur{0%,10%{opacity:0;filter:blur(12px);transform:translateY(30px)}40%,85%{opacity:1;filter:none;transform:none}100%{opacity:0;filter:blur(12px);transform:translateY(30px)}}
@keyframes l4vDeal{0%,20%{opacity:0;filter:blur(12px);transform:translateY(40px) rotate(-5deg) scale(.94)}50%,85%{opacity:1;filter:none;transform:none}100%{opacity:0;filter:blur(12px);transform:translateY(40px) rotate(-5deg) scale(.94)}}
@keyframes l4vCheck{0%,25%{border-color:#e7e0ef;background:#fff}35%,85%{border-color:#fc5304;background:#fffaf7}100%{border-color:#e7e0ef;background:#fff}}
@media (prefers-reduced-motion:reduce){.l4v-pv *{animation:none!important}}
`;

const Box = ({ children, className = '', style }) => (
  <div className={'l4v-pv relative w-full h-44 overflow-hidden rounded-xl border border-black/5 bg-white text-[#1d1d1d] ' + className} style={style}>
    <style>{CSS}</style>
    {children}
  </div>
);
const Purple = ({ children, className = '' }) => <Box className={'text-white ' + className} style={{ background: GPU }}>{children}</Box>;

function LoopBtn() {
  return (
    <Box className="grid place-items-center">
      <span className="relative inline-flex h-11 items-center gap-2.5 rounded-full pl-6 pr-5 text-[13px] font-bold text-white" style={{ background: GOR, fontFamily: FD }}>
        Quero conhecer
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" style={{ transformOrigin: '50% -40%', animation: 'l4vLoop 2.8s cubic-bezier(.22,1,.36,1) infinite' }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        <svg className="pointer-events-none absolute -inset-1.5 h-[calc(100%+12px)] w-[calc(100%+12px)] overflow-visible" aria-hidden="true">
          <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="28" fill="none" stroke={OR} strokeWidth="2" pathLength="1" strokeDasharray="1" style={{ animation: 'l4vRing 2.8s cubic-bezier(.22,1,.36,1) infinite' }} />
        </svg>
      </span>
    </Box>
  );
}

function Pen() {
  const P = (d, vb, cls, delay) => (
    <svg viewBox={vb} preserveAspectRatio="none" className={'pointer-events-none absolute -z-10 max-w-none overflow-visible ' + cls} aria-hidden="true">
      <path d={d} pathLength="1" fill="none" stroke={OR} strokeWidth="3" strokeLinecap="round" style={{ strokeDasharray: 1, animation: 'l4vDraw 3.4s cubic-bezier(.22,1,.36,1) ' + delay + 's infinite' }} />
    </svg>
  );
  return (
    <Box className="grid content-center gap-4 text-center text-[22px] font-bold" style={{ fontFamily: FD }}>
      <div>Benefícios que <span className="relative isolate inline-block">fidelizam{P('M2 12 C 30 2, 60 2, 80 10 S 100 19, 100 10 S 120 1, 140 10 S 170 19, 198 8', '0 0 200 20', 'left-[-3%] bottom-[-.32em] w-[106%] h-[.42em]', 0)}</span></div>
      <div>Do jeito <span className="relative isolate inline-block">certo{P('M120 6 C 60 2, 6 14, 6 40 C 6 66, 70 76, 120 72 C 172 68, 196 54, 194 36 C 192 16, 150 4, 96 8', '0 0 200 80', 'left-[-12%] top-[-18%] w-[124%] h-[136%]', 0.8)}</span></div>
    </Box>
  );
}

function Letters() {
  const word = (t, kind) => t.split('').map((c, i) => {
    const r = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
    return (
      <span key={i} className="inline-block" style={{ '--r': (r * 26 - 13).toFixed(1) + 'deg', '--y': (r * 0.24 - 0.12).toFixed(2) + 'em', animation: kind === 'wave' ? 'l4vWave 2.6s cubic-bezier(.22,1,.36,1) ' + i * 0.08 + 's infinite' : 'l4vTidy 4s cubic-bezier(.22,1,.36,1) infinite' }}>{c === ' ' ? ' ' : c}</span>
    );
  });
  return (
    <Box className="grid content-center gap-3 text-center text-[24px] font-bold" style={{ fontFamily: FD }}>
      <div>Com <span style={{ color: OR }}>{word('a sua marca', 'wave')}</span></div>
      <div>Tudo <span style={{ color: OR }}>{word('organizado', 'tidy')}</span></div>
    </Box>
  );
}

function Highlights() {
  return (
    <Box className="grid content-center gap-2.5 px-5 text-[17px] font-bold" style={{ fontFamily: FD }}>
      <div>Gestão <span className="relative isolate inline-block">simples<i className="absolute inset-x-[-.08em] bottom-[.1em] -z-10 h-[.42em] origin-left rounded bg-[#fc5304]/25" style={{ animation: 'l4vMark 3.4s cubic-bezier(.22,1,.36,1) infinite' }} /></span></div>
      <div>Dados <span className="relative inline-block">em tempo real<i className="absolute inset-x-0 bottom-[-.1em] h-[.16em] origin-left rounded" style={{ background: 'linear-gradient(90deg,#fc5304,#76058f)', animation: 'l4vBar 3.6s cubic-bezier(.22,1,.36,1) infinite' }} /></span></div>
      <div>Ganhe <span className="relative isolate inline-block px-1" style={{ color: OR }}>cupons<svg className="absolute inset-0 -z-10 h-full w-full overflow-visible" aria-hidden="true"><rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="6" fill="none" stroke={OL} strokeWidth="2" strokeDasharray="7 6" style={{ animation: 'l4vMarch 1.2s linear infinite' }} /></svg></span></div>
      <div>Sem <span className="relative inline-block" style={{ color: OR }}>planilha<i className="absolute inset-y-0 left-0 right-[-.06em] origin-right bg-white" style={{ animation: 'l4vType 4.4s steps(9,end) infinite' }} /><i className="absolute inset-y-[.12em] right-[-.12em] w-[2px] rounded-sm" style={{ background: OR, animation: 'l4vCaret .8s steps(1) infinite' }} /></span></div>
    </Box>
  );
}

function Scramble() {
  return (
    <Box className="grid place-items-center">
      <style>{'.l4v-scr::after{content:"Baixo engaj.";animation:l4vScr 3.2s steps(1) infinite}'}</style>
      <div className="w-[200px] rounded-2xl border p-4" style={{ borderColor: LN }}>
        <span className="text-[26px] font-bold" style={{ fontFamily: FD, color: OR }}>01</span>
        <div className="l4v-scr mt-1 font-mono text-[15px] font-bold" />
        <span className="mt-2 block h-1.5 w-32 rounded" style={{ background: LN }} />
      </div>
    </Box>
  );
}

function Infinity3D() {
  const d = 'M150 70 C 120 30, 40 30, 40 70 C 40 110, 120 110, 150 70 C 180 30, 260 30, 260 70 C 260 110, 180 110, 150 70 Z';
  return (
    <Purple className="grid place-items-center">
      <svg viewBox="0 0 300 140" className="absolute inset-0 h-full w-full" style={{ transform: 'perspective(500px) rotateX(48deg) scale(1.15)' }} aria-hidden="true">
        <defs><linearGradient id="l4v-inf" x1="0" x2="1"><stop offset="0" stopColor="#fc5304" /><stop offset=".5" stopColor="#b03ac8" /><stop offset="1" stopColor="#ff7a33" /></linearGradient></defs>
        <path d={d} fill="none" stroke="#4a1478" strokeWidth="14" transform="translate(0 5)" />
        <path id="l4v-inf-p" d={d} fill="none" stroke="url(#l4v-inf)" strokeWidth="12" />
      </svg>
      {['Clube', 'Rede', 'Farmácias'].map((t, i) => (
        <span key={t} className="absolute left-0 top-0 rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-[8px] font-bold backdrop-blur" style={{ offsetPath: "path('M150 82 C 120 42, 40 42, 40 82 C 40 122, 120 122, 150 82 C 180 42, 260 42, 260 82 C 260 122, 180 122, 150 82 Z')", animation: 'l4vOrbit 9s linear ' + -i * 3 + 's infinite' }}>{t}</span>
      ))}
      <b className="relative z-10 px-8 text-center text-[17px] leading-tight" style={{ fontFamily: FD }}>Benefícios que conectam pessoas</b>
    </Purple>
  );
}

function Marquee() {
  const items = ['Clube de vantagens', 'Farmácias', 'Convênios', 'Rede'];
  return (
    <Box className="grid content-center">
      <div className="overflow-hidden py-3" style={{ background: GPU }}>
        <div className="flex w-max" style={{ animation: 'l4vMarq 9s linear infinite' }}>
          {[0, 1].map((k) => items.map((t) => (
            <span key={k + t} className="inline-flex items-center gap-4 whitespace-nowrap pr-4 text-[15px] font-bold text-white" style={{ fontFamily: FD }}>{t}<i className="h-2 w-2 rotate-45 rounded-[2px]" style={{ background: GOR }} /></span>
          )))}
        </div>
      </div>
    </Box>
  );
}

function Stack() {
  const Card = ({ n, t, anim, top }) => (
    <div className="absolute inset-x-6 rounded-2xl border bg-white p-3" style={{ borderColor: LN, top, animation: anim }}>
      <div className="flex items-center gap-3">
        <span className="block h-[1.08em] overflow-hidden text-[30px] font-bold leading-[1.08]" style={{ fontFamily: FD }}>
          <span className="block" style={{ animation: 'l4vOdo 5s cubic-bezier(.2,.9,.25,1.04) infinite' }}>
            {[n, ...Array.from({ length: 10 }, (_, k) => (n + 1 + k) % 10)].map((d, k) => <b key={k} className="block h-[1.08em] bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(170deg,#ff7a33 10%,#fc5304 45%,#9a1fb8 100%)' }}>{d}</b>)}
          </span>
        </span>
        <span className="text-[11px] font-bold" style={{ fontFamily: FD }}>{t}</span>
      </div>
    </div>
  );
  return (
    <Box>
      <div className="absolute inset-x-6 top-3 origin-top rounded-2xl border bg-[#f4eff9] p-3 text-[11px] font-bold" style={{ borderColor: LN, fontFamily: FD, animation: 'l4vShrink 5s ease infinite' }}>Benefício que ninguém usa</div>
      <Card n={2} t="Gestão espalhada" top={26} anim="l4vStack 5s cubic-bezier(.22,1,.36,1) infinite" />
      <Card n={3} t="Custo sem retorno" top={52} anim="l4vStack2 5s cubic-bezier(.22,1,.36,1) infinite" />
    </Box>
  );
}

function Carousel3D() {
  return (
    <Purple className="grid content-center">
      <div className="relative mx-auto h-[100px] w-full [perspective:600px]">
        {[-1, 0, 1].map((d) => (
          <div key={d} className="absolute left-1/2 top-0 -ml-[55px] flex h-[100px] w-[110px] items-end rounded-xl p-2 text-[9px] font-bold"
            style={{ background: 'linear-gradient(160deg,#3d0a63,#1f0745)', transform: 'translate3d(' + d * 95 + 'px,' + Math.abs(d) * 8 + 'px,' + -Math.abs(d) * 120 + 'px) rotateY(' + -d * 22 + 'deg)', zIndex: 10 - Math.abs(d), boxShadow: d ? 'inset 0 0 0 200px rgba(26,6,56,.35)' : 'inset 0 0 0 1px rgba(255,180,138,.6)', fontFamily: FD }}>
            {d === 0 ? 'Rede de parceiros' : d < 0 ? 'Farmácias' : 'Convênios'}
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-white/60" style={{ fontFamily: FD }}><b className="text-[18px] text-white">03</b> / 06</p>
    </Purple>
  );
}

function Spotlight() {
  return (
    <Purple className="grid grid-cols-2 gap-2 p-4">
      {['Clube', 'Farmácias', 'Rede', 'Convênios'].map((t, i) => (
        <div key={t} className="relative flex items-end overflow-hidden rounded-xl p-2.5 text-[10px] font-bold" style={{ background: 'linear-gradient(160deg,#3d0a63,#1f0745)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.13)', fontFamily: FD }}>
          <i className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(closest-side,rgba(255,150,90,.55),transparent)', animation: 'l4vSpot 5s ease-in-out ' + -i * 1.2 + 's infinite' }} />
          {i === 0 && [10, 30, 55, 75].map((x, k) => <i key={k} className="absolute bottom-3 h-1 w-1 rounded-full" style={{ left: x + '%', background: OL, boxShadow: '0 0 6px #fc5304', '--dx': (k % 2 ? 12 : -10) + 'px', animation: 'l4vPt 1.8s ease-out ' + k * 0.3 + 's infinite' }} />)}
          <span className="relative">{t}</span>
        </div>
      ))}
    </Purple>
  );
}

function Phone() {
  return (
    <Box className="grid place-items-center [perspective:700px]">
      <div className="relative h-[140px] w-[72px] [transform-style:preserve-3d]" style={{ animation: 'l4vSwing 5s ease-in-out infinite' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="absolute inset-0 rounded-[14px] bg-[#2a1640]" style={{ transform: 'translateZ(' + -i * 1.2 + 'px)' }} />)}
        <div className="absolute inset-0 overflow-hidden rounded-[14px] border-[3px] border-[#1d1d1d] bg-white">
          <div className="h-9 p-1.5 text-[6px] font-bold text-white" style={{ animation: 'l4vBrand 10s steps(1) infinite' }}>SUA MARCA</div>
          <div className="grid gap-1 p-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-3.5 rounded border" style={{ borderColor: LN }} />)}</div>
        </div>
      </div>
      <div className="absolute bottom-3 flex gap-1.5">{['#fc5304', '#76058f', '#0e9f6e', '#1d4ed8'].map((c) => <i key={c} className="h-3.5 w-3.5 rounded-full" style={{ background: c }} />)}</div>
    </Box>
  );
}

function Swipe() {
  return (
    <Box className="grid place-items-center">
      <div className="relative h-[110px] w-[150px]">
        <div className="absolute inset-0 rounded-2xl border bg-white" style={{ borderColor: LN, transform: 'translate(24px,28px) rotate(4.8deg) scale(.92)' }} />
        <div className="absolute inset-0 flex items-end rounded-2xl border bg-white p-3 text-[10px] font-bold" style={{ borderColor: LN, fontFamily: FD, animation: 'l4vUp1 3.2s cubic-bezier(.22,1,.36,1) infinite' }}>Entrega em casa</div>
        <div className="absolute inset-0 flex items-end rounded-2xl border bg-white p-3 text-[10px] font-bold" style={{ borderColor: LN, fontFamily: FD, animation: 'l4vFly 3.2s cubic-bezier(.22,1,.36,1) infinite' }}>Desconto em medicamentos</div>
      </div>
    </Box>
  );
}

function Tickets() {
  const MASK = 'radial-gradient(circle 7px at 40px 0,transparent 98%,#000) top/100% 51% no-repeat,radial-gradient(circle 7px at 40px 100%,transparent 98%,#000) bottom/100% 51% no-repeat';
  return (
    <Purple className="flex flex-col justify-center gap-2 px-6">
      {['20% em farmácias', 'Frete grátis', 'Cinema pela metade'].map((t, i) => (
        <div key={t} className="relative overflow-hidden pt-1">
          <i className="absolute inset-x-[4%] top-0 h-[2px] rounded bg-white/25" />
          <div className="grid h-9 grid-cols-[40px_1fr] rounded-lg bg-white" style={{ WebkitMask: MASK, mask: MASK, animation: 'l4vDrop 4s cubic-bezier(.22,1,.36,1) ' + i * 0.35 + 's infinite' }}>
            <span className="grid place-items-center rounded-l-lg text-[12px] font-bold text-white" style={{ background: GOR }}>%</span>
            <span className="flex items-center border-l-2 border-dashed px-3 text-[10px] font-bold text-[#1d1d1d]" style={{ borderColor: '#e1d7ec', fontFamily: FD }}>{t}</span>
          </div>
        </div>
      ))}
    </Purple>
  );
}

function Flow() {
  return (
    <Box className="grid content-center px-6">
      <div className="relative grid grid-cols-4">
        <div className="absolute left-[12.5%] right-[12.5%] top-[13px] h-[2px] rounded" style={{ background: LN }}><i className="absolute inset-0 origin-left rounded" style={{ background: GOR, animation: 'l4vFill 5s linear infinite' }} /></div>
        {['Identificar', 'Cadastrar', 'Publicar', 'Acompanhar'].map((s, i) => (
          <div key={s} className="relative flex flex-col items-center gap-1">
            <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full border-2 text-[9px] font-bold text-white" style={{ background: GOR, borderColor: OR }}>
              {i + 1}
              <i className="absolute inset-0 grid place-items-center rounded-full border-2 bg-white not-italic text-[#a597b8]" style={{ borderColor: LN, animation: 'l4vD' + i + ' 5s linear infinite' }}>{i + 1}</i>
            </span>
            <span className="text-[8px] font-bold" style={{ fontFamily: FD }}>{s}</span>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-3 grid h-16 w-full grid-cols-[50px_1fr] overflow-hidden rounded-xl border" style={{ borderColor: LN }}>
        <div className="grid content-start gap-1 bg-[#f7f4fb] p-1.5">{[0, 1, 2, 3].map((i) => <i key={i} className="h-2.5 rounded" style={{ background: i === 1 ? OR : '#ece6f3' }} />)}</div>
        <div className="p-2"><b className="text-[11px]" style={{ fontFamily: FD }}>Cadastrar</b><i className="mt-1 block h-2 w-24 rounded bg-[#f7f4fb]" /></div>
      </div>
    </Box>
  );
}

function Core() {
  const ys = [40, 130];
  return (
    <Purple>
      <svg viewBox="0 0 300 176" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[[110, 40], [190, 40], [110, 130], [190, 130]].map(([x, y], i) => (
          <path key={i} d={'M150 88 C' + (x + 150) / 2 + ' 88 ' + (x + 150) / 2 + ' ' + y + ' ' + x + ' ' + y} pathLength="1" fill="none" stroke="rgba(255,180,138,.8)" strokeWidth="1.5" strokeDasharray="1" style={{ animation: 'l4vLine 4s ease ' + i * 0.3 + 's infinite alternate' }} />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 grid h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 place-items-center">
        <span className="absolute inset-0 rounded-full border border-dashed border-white/30" style={{ animation: 'l4vSpin 26s linear infinite' }} />
        <span className="absolute inset-[16%] rounded-full border border-[#fc5304]/60 border-b-transparent border-l-transparent" style={{ animation: 'l4vSpin 6s linear infinite' }} />
        <span className="grid h-8 w-8 place-items-center rounded-full font-bold" style={{ background: GOR }}>+</span>
      </div>
      {[['left-3', ys[0], 'API'], ['right-3', ys[0], 'Login único'], ['left-3', ys[1], 'Criptografia'], ['right-3', ys[1], 'LGPD']].map(([side, y, t], i) => (
        <div key={t} className={'absolute w-[100px] -translate-y-1/2 rounded-lg border bg-[#1a0638]/60 px-2 py-1.5 text-[9px] font-bold ' + side} style={{ top: y, fontFamily: FD, animation: 'l4vCardOn 4s ease ' + i * 0.3 + 's infinite alternate' }}>{t}</div>
      ))}
    </Purple>
  );
}

function Dash() {
  return (
    <Box className="grid place-items-center [perspective:700px]">
      <div className="grid w-[210px] gap-1.5 rounded-xl border bg-white p-2.5 [transform-style:preserve-3d]" style={{ borderColor: LN, animation: 'l4vTilt 6s ease-in-out infinite' }}>
        <div className="flex gap-1">{['Uso', 'Economia', 'Adesão'].map((t, i) => <span key={t} className="rounded-full px-1.5 py-0.5 text-[6px] font-bold" style={{ background: i ? '#f7f4fb' : OR, color: i ? MU : '#fff' }}>{t}</span>)}</div>
        <svg viewBox="0 0 400 140" className="h-12 w-full rounded-lg bg-[#f7f4fb]" style={{ transform: 'translateZ(20px)' }} aria-hidden="true">
          <path d="M0 118 C 25 118, 25 112, 50 112 C 75 112, 75 88, 100 88 C 125 88, 125 96, 150 96 C 175 96, 175 70, 200 70 C 225 70, 225 52, 250 52 C 275 52, 275 60, 300 60 C 325 60, 325 38, 350 38 C 375 38, 375 30, 400 30" fill="none" stroke={OR} strokeWidth="6" pathLength="1" strokeDasharray="1" style={{ animation: 'l4vRingP 3s ease infinite alternate' }} />
        </svg>
        <div className="grid grid-cols-[1fr_44px] gap-1.5" style={{ transform: 'translateZ(36px)' }}>
          <div className="flex h-11 items-end gap-1 rounded-lg bg-[#f7f4fb] p-1">{[34, 56, 44, 72, 60, 84].map((h, i) => <i key={i} className="flex-1 origin-bottom rounded-t" style={{ height: h + '%', background: 'linear-gradient(#ff7a33,#76058f)', animation: 'l4vBarUp 3s cubic-bezier(.22,1,.36,1) ' + i * 0.05 + 's infinite alternate' }} />)}</div>
          <svg viewBox="0 0 42 42" className="h-11 w-11 -rotate-90" aria-hidden="true"><circle cx="21" cy="21" r="15.9" fill="none" stroke="#ece6f3" strokeWidth="5" /><circle cx="21" cy="21" r="15.9" fill="none" stroke={OR} strokeWidth="5" pathLength="1" strokeDasharray="1" style={{ animation: 'l4vRingP 3s ease infinite alternate' }} /></svg>
        </div>
      </div>
    </Box>
  );
}

function Ring() {
  const pts = [0, 1, 2, 3, 4].map((i) => { const a = (i / 5) * Math.PI * 2 - Math.PI / 2; return [90 + Math.cos(a) * 62, 80 + Math.sin(a) * 62]; });
  return (
    <Box className="grid place-items-center bg-[#f7f4fb]" style={{ background: '#f7f4fb' }}>
      <svg viewBox="0 0 180 160" className="h-full" aria-hidden="true">
        <circle cx="90" cy="80" r="62" fill="none" stroke={LN} strokeWidth="4" />
        <circle cx="90" cy="80" r="62" fill="none" stroke={OR} strokeWidth="4" strokeLinecap="round" pathLength="1" strokeDasharray="1" transform="rotate(-90 90 80)" style={{ animation: 'l4vRingP 5s linear infinite' }} />
        {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill={i < 3 ? OR : '#fff'} stroke={i < 3 ? OR : LN} strokeWidth="2" />)}
        <g style={{ transformOrigin: '90px 80px', animation: 'l4vSpin 5s linear infinite' }}><circle cx="90" cy="18" r="4.5" fill="#fff" stroke={OR} strokeWidth="2" /></g>
        <text x="90" y="86" textAnchor="middle" fontSize="26" fontWeight="700" fill="#1d1d1d" fontFamily={FD}>03</text>
        <text x="90" y="102" textAnchor="middle" fontSize="8" fontWeight="700" fill="#c24100">Lançamento</text>
      </svg>
    </Box>
  );
}

function PlusTex() {
  const FAINT = 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2718%27 height=%2718%27%3E%3Cpath d=%27M9 7v4M7 9h4%27 stroke=%27%2376058f%27 stroke-opacity=%27.18%27 stroke-width=%271.2%27 stroke-linecap=%27round%27/%3E%3C/svg%3E")';
  const LIT = 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2718%27 height=%2718%27%3E%3Cpath d=%27M9 5.5v7M5.5 9h7%27 stroke=%27%23fc5304%27 stroke-opacity=%27.7%27 stroke-width=%271.6%27 stroke-linecap=%27round%27/%3E%3C/svg%3E")';
  return (
    <Box style={{ backgroundImage: FAINT, backgroundSize: '18px 18px' }}>
      <i className="absolute left-0 top-0 h-[120px] w-[120px]" style={{ backgroundImage: LIT, backgroundSize: '18px 18px', backgroundAttachment: 'fixed', WebkitMaskImage: 'radial-gradient(closest-side,#000,transparent)', maskImage: 'radial-gradient(closest-side,#000,transparent)', animation: 'l4vSpotMove 6s ease-in-out infinite' }} />
      <span className="absolute bottom-3 left-4 text-[10px] font-bold" style={{ color: MU }}>o foco segue o mouse</span>
    </Box>
  );
}

function Ribbon() {
  const W = 300, A = 80, P = 88, RW = 34, H = 176;
  const cx = (y) => W / 2 + A * (0.55 * Math.sin(y / 40 + 0.7) + 0.3 * Math.sin(y / 21 + 2.1) + 0.15 * Math.sin(y / 12 + 0.3));
  const segs = [];
  for (let k = 0; k * P < H; k++) {
    const L = [], R = [];
    for (let y = k * P; y <= (k + 1) * P + 0.01; y += 4) {
      const x = cx(y), dx = (cx(y + 1) - cx(y - 1)) / 2, n = 1 / Math.sqrt(1 + dx * dx), w = (RW * Math.sin((Math.PI * (y - k * P)) / P)) / 2;
      L.push((x + n * w).toFixed(1) + ' ' + (y - dx * n * w).toFixed(1)); R.unshift((x - n * w).toFixed(1) + ' ' + (y + dx * n * w).toFixed(1));
    }
    segs.push(<path key={k} fill={k % 2 ? '#fdc6ad' : '#dcbde4'} d={'M' + L.join('L') + 'L' + R.join('L') + 'Z'} />);
  }
  return (
    <Box>
      <div className="absolute inset-0" style={{ animation: 'l4vClip 4s ease-out infinite' }}>
        <svg viewBox={'0 0 ' + W + ' ' + H} preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">{segs}</svg>
      </div>
      <b className="relative block p-4 text-[14px]" style={{ fontFamily: FD }}>Seção clara</b>
    </Box>
  );
}

function Blur() {
  return (
    <Box className="grid content-center gap-2 px-6">
      <div className="rounded-xl border p-3 text-[11px] font-bold" style={{ borderColor: LN, fontFamily: FD, animation: 'l4vBlur 4s cubic-bezier(.22,1,.36,1) infinite' }}>Sobe saindo do desfoque</div>
      <div className="rounded-xl border p-3 text-[11px] font-bold" style={{ borderColor: LN, fontFamily: FD, animation: 'l4vDeal 4s cubic-bezier(.22,1,.36,1) infinite' }}>Entra dando as cartas</div>
    </Box>
  );
}

function Option() {
  return (
    <Box className="grid grid-cols-2 content-center gap-2 px-4">
      {['Clube de vantagens', 'Farmácias', 'Convênios', 'Indicadores'].map((o, i) => (
        <span key={o} className="relative flex items-center gap-2 rounded-xl border-[1.5px] p-2 text-[9px] font-bold" style={{ fontFamily: FD, borderColor: LN, animation: i === 1 ? 'l4vCheck 4s ease infinite' : undefined }}>
          <i className="grid h-6 w-6 shrink-0 place-items-center rounded-md not-italic" style={{ background: i === 1 ? GOR : '#f2edf7', color: i === 1 ? '#fff' : PU1 }}>✓</i>{o}
          {i === 1 && <svg className="pointer-events-none absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)] overflow-visible" aria-hidden="true"><rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="14" fill="none" stroke={OR} strokeWidth="1.5" pathLength="1" strokeDasharray="1" style={{ animation: 'l4vRing 4s cubic-bezier(.22,1,.36,1) infinite' }} /></svg>}
        </span>
      ))}
    </Box>
  );
}

export const loopMaisLp4Previews = {
  'lm4-loop-btn': LoopBtn,
  'lm4-pen': Pen,
  'lm4-letters': Letters,
  'lm4-highlights': Highlights,
  'lm4-scramble': Scramble,
  'lm4-infinity': Infinity3D,
  'lm4-marquee': Marquee,
  'lm4-stack': Stack,
  'lm4-carousel3d': Carousel3D,
  'lm4-spotlight': Spotlight,
  'lm4-phone': Phone,
  'lm4-swipe': Swipe,
  'lm4-tickets': Tickets,
  'lm4-flow': Flow,
  'lm4-core': Core,
  'lm4-dash': Dash,
  'lm4-ring': Ring,
  'lm4-plus': PlusTex,
  'lm4-ribbon': Ribbon,
  'lm4-blur': Blur,
  'lm4-option': Option,
};
