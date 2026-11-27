import React from 'react';

// Prévias leves (CSS/SVG) dos efeitos da página de captura e de obrigado da aula para donos de academia da Loop+
const OR = '#fc5304', PU = '#2e035d', PL = '#6a2fae', BD = '#ebebeb', MU = '#6b6b6b';
const GOR = 'linear-gradient(135deg,#fc5304 0%,#ff8040 100%)';
const GPU = 'radial-gradient(120% 90% at 70% 110%,#76058f,#43096a 38%,#220b52 72%,#1a0638)';
const FD = "'Baloo 2',system-ui,sans-serif";

const CSS = `
@keyframes lavSlide{0%,30%{right:5px;transform:none}45%,80%{right:calc(100% - 41px);transform:rotate(45deg)}95%,100%{right:5px;transform:none}}
@keyframes lavPad{0%,30%{padding:0 58px 0 22px}45%,80%{padding:0 22px 0 58px}95%,100%{padding:0 58px 0 22px}}
@keyframes lavLeak{from{transform:translate(0,0) scale(1);opacity:.8}to{transform:translate(-30px,20px) scale(1.12);opacity:1}}
@keyframes lavRays{to{background-position:280px 0}}
@keyframes lavDust{0%{opacity:0;transform:translate(0,0)}25%{opacity:.9}100%{opacity:0;transform:translate(-20px,-90px)}}
@keyframes lavSweep{0%,55%{left:-40%}100%{left:140%}}
@keyframes lavCast{0%,100%{opacity:.25}50%{opacity:1}}
@keyframes lavRise{0%,10%{transform:translateY(110%) rotate(4deg)}35%,85%{transform:none}100%{transform:translateY(110%) rotate(4deg)}}
@keyframes lavScene{0%,45%{opacity:1;filter:none;transform:none}50%,95%{opacity:0;filter:blur(6px);transform:translateY(14px) scale(.96)}100%{opacity:1;filter:none;transform:none}}
@keyframes lavScene2{0%,45%{opacity:0;filter:blur(6px);transform:translateY(14px) scale(.96)}50%,95%{opacity:1;filter:none;transform:none}100%{opacity:0}}
@keyframes lavRail{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes lavQ{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.25) rotate(8deg)}}
@keyframes lavTypeA{0%,15%{content:''}25%{content:'1'}35%,100%{content:'12'}}
@keyframes lavTotal{0%,45%{opacity:0}50%,100%{opacity:1}}
@keyframes lavQhide{0%,45%{opacity:1}50%,100%{opacity:0}}
@keyframes lavTrack{0%,15%{transform:translateX(0)}85%,100%{transform:translateX(-55%)}}
@keyframes lavSpin{to{transform:rotate(360deg)}}
@keyframes lavSpinR{to{transform:rotate(-360deg)}}
@keyframes lavBeat{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
@keyframes lavPing{from{transform:scale(1);opacity:.8}to{transform:scale(1.6);opacity:0}}
@keyframes lavStrike{0%,15%{transform:rotate(-5deg) scaleX(0)}40%,90%{transform:rotate(-5deg) scaleX(1)}100%{transform:rotate(-5deg) scaleX(0)}}
@keyframes lavMark{0%,35%{background-size:0% 100%}65%,90%{background-size:100% 100%}100%{background-size:0% 100%}}
@keyframes lavMorph{0%,100%{border-radius:42% 58% 60% 40%/45% 45% 55% 55%;transform:rotate(0)}50%{border-radius:60% 40% 38% 62%/58% 38% 62% 42%;transform:rotate(25deg)}}
@keyframes lavFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes lavWord{0%,30%{color:#c8c3d2}38%,88%{color:#1d1d1d}96%,100%{color:#c8c3d2}}
@keyframes lavLine{0%,20%{transform:scaleX(0)}60%,100%{transform:scaleX(1)}}
@keyframes lavRing{0%{stroke-dashoffset:0}100%{stroke-dashoffset:100}}
@keyframes lavTick{0%,80%{transform:none;opacity:1}90%{transform:translateY(-60%);opacity:0}91%{transform:translateY(60%);opacity:0}100%{transform:none;opacity:1}}
@keyframes lavBlink{50%{opacity:0}}
@keyframes lavFill{0%,10%{transform:scaleX(0)}70%,100%{transform:scaleX(.75)}}
@keyframes lavOk{0%,35%{opacity:0;transform:scale(.4)}45%,100%{opacity:1;transform:scale(1)}}
@keyframes lavMarq{to{transform:translateX(-50%)}}
@keyframes lavGrid{to{background-position:26px 26px}}
@keyframes lavDrift{to{transform:translate(30px,40px)}}
@media (prefers-reduced-motion:reduce){.lav-pv *{animation:none!important}}
`;

const Box = ({ children, className = '', style }) => (
  <div className={'lav-pv relative w-full h-44 overflow-hidden rounded-xl border border-black/5 bg-white text-[#1d1d1d] ' + className} style={style}>
    <style>{CSS}</style>
    {children}
  </div>
);
const Purple = ({ children, className = '' }) => <Box className={'text-white ' + className} style={{ background: GPU }}>{children}</Box>;

function SlideBtn() {
  return (
    <Box className="grid place-items-center">
      <span className="relative inline-flex h-12 items-center overflow-hidden rounded-full text-[11px] font-bold uppercase tracking-[.03em] text-white" style={{ background: GOR, animation: 'lavPad 3.6s cubic-bezier(.22,1,.36,1) infinite' }}>
        <span className="relative z-[1]">Quero participar</span>
        <span className="absolute top-1/2 -mt-[18px] grid h-9 w-9 place-items-center rounded-full bg-white" style={{ color: OR, animation: 'lavSlide 3.6s cubic-bezier(.22,1,.36,1) infinite' }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
        </span>
      </span>
    </Box>
  );
}

function Hero() {
  return (
    <Box>
      <div className="absolute inset-y-0 right-0 w-[70%] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,#c9a891,#7a5a6a 60%,#3b2350)' }} />
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full" style={{ background: 'radial-gradient(circle,rgba(252,98,20,.55),rgba(252,83,4,0) 65%)', animation: 'lavLeak 5s ease-in-out infinite alternate' }} />
        <div className="absolute -right-10 top-[40%] h-40 w-40 rounded-full" style={{ background: 'radial-gradient(circle,rgba(130,30,200,.5),rgba(118,5,143,0) 66%)', animation: 'lavLeak 6s ease-in-out infinite alternate-reverse' }} />
        <div className="absolute inset-0 mix-blend-screen" style={{ background: 'repeating-linear-gradient(115deg,rgba(255,210,180,0) 0 45px,rgba(255,210,180,.22) 45px 70px,rgba(255,210,180,0) 70px 140px)', backgroundSize: '280px 100%', WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 92% 0%,#000,transparent 70%)', animation: 'lavRays 8s linear infinite' }} />
        {[[60, 40, 0], [75, 55, 1.5], [85, 30, 3]].map(([l, t, d], i) => <i key={i} className="absolute h-1 w-1 rounded-full bg-[#ffd2bd]" style={{ left: l + '%', top: t + '%', animation: 'lavDust 4.5s ease-in-out ' + d + 's infinite' }} />)}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,#fff 0%,rgba(255,255,255,.8) 22%,rgba(255,255,255,0) 50%),linear-gradient(0deg,#fff 0%,rgba(255,255,255,0) 30%)' }} />
      </div>
      <div className="relative grid h-full content-center gap-1.5 px-5">
        <b className="max-w-[150px] text-[15px] leading-tight" style={{ fontFamily: FD }}>Aula para donos de <span style={{ color: PU }}>academia</span></b>
        <span className="h-1.5 w-28 rounded" style={{ background: BD }} />
      </div>
    </Box>
  );
}

function Eyebrow() {
  return (
    <Box className="grid place-items-center">
      <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[.06em] text-white" style={{ background: 'linear-gradient(135deg,#2e035d,#5a1a9a)' }}>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="2" fill="currentColor" /><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" style={{ animation: 'lavCast 1.8s ease-in-out infinite' }} /><path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8" style={{ animation: 'lavCast 1.8s ease-in-out .3s infinite' }} /></svg>
        Aula ao vivo e gratuita
        <i className="absolute inset-y-0 w-[30%]" style={{ left: '-40%', background: 'linear-gradient(110deg,transparent,rgba(255,255,255,.3),transparent)', animation: 'lavSweep 3s ease-in-out infinite' }} />
      </span>
    </Box>
  );
}

function Words() {
  return (
    <Box className="grid place-items-center px-6 text-center">
      <b className="text-[22px] leading-tight" style={{ fontFamily: FD }}>
        {'Por que o aluno cancela'.split(' ').map((w, i) => (
          <span key={i} className="-mb-[.12em] inline-block overflow-hidden pb-[.12em] align-top">
            <span className="inline-block" style={{ color: i === 4 ? PU : undefined, animation: 'lavRise 3.6s cubic-bezier(.22,1,.36,1) ' + i * 0.06 + 's infinite' }}>{w}&nbsp;</span>
          </span>
        ))}
      </b>
    </Box>
  );
}

function Guided() {
  return (
    <Purple className="grid grid-cols-[1fr_1.1fr] gap-3 p-4">
      <div className="relative pl-5">
        <div className="absolute bottom-2 left-1 top-2 w-[2px] rounded bg-white/10"><i className="absolute inset-0 origin-top rounded" style={{ background: 'linear-gradient(#ff8040,#fc5304)', animation: 'lavRail 6s linear infinite' }} /></div>
        {['01', '02'].map((n, i) => (
          <div key={n} className="py-3">
            <span className="block text-[30px] font-bold leading-none" style={{ fontFamily: FD, ...(i === 0 ? { backgroundImage: GOR, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } : { color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,.4)' }) }}>{n}</span>
            <span className="text-[9px] font-bold" style={{ fontFamily: FD }}>{i ? 'Desconto só adia' : 'A conta que ninguém faz'}</span>
          </div>
        ))}
      </div>
      <div className="relative overflow-hidden rounded-xl border border-white/15 bg-white/5">
        <div className="flex h-6 items-center gap-1 border-b border-white/10 px-2">{[0, 1, 2].map((d) => <i key={d} className="h-1.5 w-1.5 rounded-full bg-white/25" />)}<b className="ml-auto text-[9px]" style={{ fontFamily: FD }}>01<span className="text-white/50"> / 04</span></b></div>
        <div className="absolute inset-x-0 bottom-0 top-6 grid place-items-center text-[10px] font-bold" style={{ animation: 'lavScene 6s ease infinite' }}>R$ 4.800/mês</div>
        <div className="absolute inset-x-0 bottom-0 top-6 grid place-items-center text-[10px] font-bold" style={{ animation: 'lavScene2 6s ease infinite' }}>Desconto ⟶ adia</div>
      </div>
    </Purple>
  );
}

function Calc() {
  return (
    <Purple className="grid content-center gap-1.5 px-8">
      <style>{'.lav-ca::after{content:"12";animation:lavTypeA 5s steps(1) infinite}'}</style>
      {[['Alunos que saem', 'lav-ca', ''], ['Mensalidade', '', 'R$ 150']].map(([l, c, v]) => (
        <div key={l} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[.07] py-1.5 pl-3 pr-1.5 text-[9px] font-bold">
          {l}
          <span className={'h-6 min-w-[54px] rounded-md border border-dashed border-white/40 bg-white/10 px-2 text-right text-[12px] leading-6 ' + c} style={{ fontFamily: FD }}>{v}</span>
        </div>
      ))}
      <div className="relative mt-1 flex items-center justify-between rounded-xl px-3 py-2" style={{ background: GOR }}>
        <span className="text-[16px]" style={{ fontFamily: FD }}>=</span>
        <b className="relative text-[18px]" style={{ fontFamily: FD }}>
          <span style={{ animation: 'lavQhide 5s steps(1) infinite' }}>R$ <em className="inline-block not-italic" style={{ animation: 'lavQ .9s ease-in-out infinite' }}>?</em></span>
          <span className="absolute right-0 top-0 whitespace-nowrap" style={{ animation: 'lavTotal 5s steps(1) infinite' }}>R$ 1.800</span>
        </b>
      </div>
    </Purple>
  );
}

function HScroll() {
  return (
    <Box className="grid grid-cols-[auto_1fr] items-center gap-3 pl-4">
      <div className="relative z-[2] bg-white pr-2">
        <b className="block text-[22px] leading-[.95]" style={{ fontFamily: FD }}>Para<br />quem é</b>
        <span className="mt-2 block text-[9px] font-bold text-[#b3adbd]" style={{ fontFamily: FD }}><b className="text-[16px] text-[#1d1d1d]">02</b> / 03</span>
        <span className="mt-1 block h-1 w-16 overflow-hidden rounded" style={{ background: BD }}><i className="block h-full w-2/3 rounded" style={{ background: GOR }} /></span>
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-2" style={{ animation: 'lavTrack 6s ease-in-out infinite alternate' }}>
          {['Donos e sócios', 'Quem perde alunos', 'Mais motivos'].map((t, i) => (
            <div key={t} className="w-[110px] shrink-0 overflow-hidden rounded-xl border bg-white" style={{ borderColor: BD }}>
              <div className="h-14" style={{ background: GPU }} />
              <div className="p-2"><b className="block text-[8px]" style={{ color: OR, fontFamily: FD }}>0{i + 1}</b><span className="text-[9px] font-bold leading-tight" style={{ fontFamily: FD }}>{t}</span></div>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}

function Orbit() {
  return (
    <Purple className="grid place-items-center">
      <div className="absolute left-1/2 top-1/2 -ml-[70px] -mt-[70px] h-[140px] w-[140px] rounded-full border border-dashed border-white/30" style={{ animation: 'lavSpin 16s linear infinite' }}>
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"><span className="inline-block rounded-full bg-white px-2 py-0.5 text-[8px] font-bold" style={{ color: PU, animation: 'lavSpinR 16s linear infinite' }}>Dono</span></span>
      </div>
      <div className="absolute left-1/2 top-1/2 -ml-[46px] -mt-[46px] h-[92px] w-[92px] rounded-full border border-dashed border-white/30" style={{ animation: 'lavSpinR 11s linear infinite' }}>
        <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2"><span className="inline-block rounded-full bg-white px-2 py-0.5 text-[8px] font-bold" style={{ color: PU, animation: 'lavSpin 11s linear infinite' }}>Sócio</span></span>
      </div>
      <div className="relative grid h-12 w-12 place-items-center rounded-full text-lg" style={{ background: GOR, animation: 'lavBeat 2.4s ease-in-out infinite' }}>
        <i className="absolute -inset-1.5 rounded-full border-2 border-[#fc5304]/50" style={{ animation: 'lavPing 2.4s ease-out infinite' }} />★
      </div>
    </Purple>
  );
}

function Strike() {
  return (
    <Purple className="grid content-center gap-3 text-center">
      <div className="flex justify-center gap-6">
        {['Milagre', 'Fórmula'].map((w, i) => (
          <span key={w} className="relative inline-block text-[30px] font-bold leading-none" style={{ fontFamily: FD, color: 'transparent', WebkitTextStroke: '1.2px #fff' }}>
            {w}<i className="absolute inset-x-[-6%] top-1/2 -mt-[2px] h-[4px] origin-left rounded" style={{ background: GOR, animation: 'lavStrike 4s cubic-bezier(.22,1,.36,1) ' + i * 0.25 + 's infinite' }} />
          </span>
        ))}
      </div>
      <b className="px-6 text-[12px] leading-snug" style={{ fontFamily: FD }}>É para quem quer <mark className="bg-no-repeat text-white" style={{ backgroundImage: 'linear-gradient(transparent 60%,rgba(252,83,4,.75) 60%)', animation: 'lavMark 4s cubic-bezier(.22,1,.36,1) infinite', backgroundColor: 'transparent' }}>reter alunos.</mark></b>
    </Purple>
  );
}

function Portrait() {
  return (
    <Box className="grid place-items-center">
      <i className="absolute right-10 top-2 h-28 w-28 opacity-20" style={{ background: 'linear-gradient(135deg,#2e035d,#6a2fae)', animation: 'lavMorph 8s ease-in-out infinite' }} />
      <i className="absolute bottom-2 left-12 h-16 w-16 opacity-25" style={{ background: GOR, animation: 'lavMorph 8s ease-in-out -3s infinite' }} />
      <div className="relative h-[150px] w-[115px] overflow-hidden rounded-[60px_60px_10px_10px] p-[4px]">
        <i className="absolute inset-[-50%]" style={{ background: 'conic-gradient(from 0deg,#fc5304,#6a2fae,#2e035d,#ff8040,#fc5304)', animation: 'lavSpin 7s linear infinite' }} />
        <div className="relative h-full overflow-hidden rounded-[56px_56px_7px_7px]" style={{ background: 'linear-gradient(170deg,#efe7d8,#c9b7a6)' }}>
          <i className="absolute left-1/2 top-6 h-12 w-12 -translate-x-1/2 rounded-full bg-[#a88b78]" />
          <i className="absolute -bottom-6 left-1/2 h-20 w-24 -translate-x-1/2 rounded-t-full bg-[#6a2fae]" />
        </div>
      </div>
      <span className="absolute bottom-6 right-[22%] rounded-lg border bg-white px-2 py-1 text-[8px] font-bold" style={{ borderColor: BD, fontFamily: FD, animation: 'lavFloat 4s ease-in-out infinite' }}>Loop+<small className="block font-sans font-normal" style={{ color: MU }}>Clube</small></span>
    </Box>
  );
}

function Bio() {
  const words = 'Há mais de dez anos ajudando academias a transformar benefício em motivo para o aluno ficar e renovar todo mês.'.split(' ');
  return (
    <Box className="grid place-items-center px-6">
      <p className="text-[12px] leading-[1.8]">
        {words.map((w, i) => <span key={i} style={{ color: '#c8c3d2', animation: 'lavWord 7s linear ' + (i * 0.12 - 2).toFixed(2) + 's infinite' }}>{w} </span>)}
      </p>
    </Box>
  );
}

function Stats() {
  return (
    <Box className="grid grid-cols-3 content-center gap-2 px-3">
      {[['+10', ' anos'], ['+300', ''], ['30', '%']].map(([n, s], i) => (
        <div key={n} className="relative overflow-hidden rounded-xl border bg-white px-2 pb-3 pt-2.5" style={{ borderColor: i === 1 ? 'rgba(252,83,4,.45)' : BD, transform: i === 1 ? 'translateY(-6px)' : undefined }}>
          {i === 1 && <i className="absolute inset-0" style={{ background: 'radial-gradient(90px circle at 60% 30%,rgba(252,83,4,.14),transparent 60%)' }} />}
          <b className="relative block bg-clip-text text-[22px] leading-none text-transparent" style={{ backgroundImage: GOR, fontFamily: FD }}>{n}<em className="text-[.5em] not-italic">{s}</em></b>
          <span className="relative mt-1 block text-[7px] leading-tight" style={{ color: MU }}>{['no mercado', 'academias', 'de retenção'][i]}</span>
          <i className="absolute inset-x-2 bottom-0 h-[2px] origin-left rounded-t" style={{ background: GOR, animation: 'lavLine 3s cubic-bezier(.22,1,.36,1) ' + i * 0.2 + 's infinite alternate' }} />
        </div>
      ))}
    </Box>
  );
}

function Countdown() {
  return (
    <Purple className="flex items-center justify-center gap-1 px-3">
      {[['06', 'dias', 0.2], ['14', 'horas', 0.58], ['32', 'min', 0.53], ['09', 'seg', 0]].map(([n, l, f], i) => (
        <React.Fragment key={l}>
          {i > 0 && <span className="text-[14px] text-white/35" style={{ fontFamily: FD, animation: 'lavBlink 1s steps(1) infinite' }}>:</span>}
          <div className="relative h-[62px] w-[62px]">
            <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90"><circle cx="20" cy="20" r="17" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)" strokeWidth="2" /><circle cx="20" cy="20" r="17" fill="none" stroke={OR} strokeWidth="2" strokeLinecap="round" pathLength="100" strokeDasharray="100" style={i === 3 ? { animation: 'lavRing 10s linear infinite' } : { strokeDashoffset: 100 - f * 100 }} /></svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"><b className="text-[17px] leading-none tabular-nums" style={{ fontFamily: FD, animation: i === 3 ? 'lavTick 1s steps(10) infinite' : undefined }}>{n}</b><small className="text-[6px] font-bold uppercase tracking-[.1em] text-white/60">{l}</small></div>
          </div>
        </React.Fragment>
      ))}
    </Purple>
  );
}

function Form() {
  return (
    <Box className="grid place-items-center" style={{ background: GPU }}>
      <div className="relative w-[210px] overflow-hidden rounded-[18px] p-[2px]">
        <i className="absolute inset-[-60%]" style={{ background: 'conic-gradient(from 0deg,transparent 0 60%,#fc5304 75%,#ffb48f 80%,transparent 90%)', animation: 'lavSpin 5s linear infinite' }} />
        <div className="relative overflow-hidden rounded-[16px] bg-white px-3 pb-3">
          <div className="-mx-3 mb-2.5 h-1 bg-[#f1edf6]"><i className="block h-full origin-left" style={{ background: GOR, animation: 'lavFill 4s ease infinite' }} /></div>
          {['Seu nome', 'E-mail'].map((l, i) => (
            <div key={l} className="mb-2">
              <span className="mb-1 flex items-center gap-1 text-[8px] font-bold"><i className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#22c55e] text-[7px] not-italic text-white">✓</i>{l}</span>
              <div className="relative h-6 rounded-md bg-[#f7f5fa] px-2 text-[8px] leading-6">{i ? 'ana@academia.com' : 'Ana Souza'}<i className="absolute right-1.5 top-1/2 -mt-[6px] grid h-3 w-3 place-items-center rounded-full bg-[#22c55e] text-[6px] not-italic text-white" style={{ animation: 'lavOk 4s cubic-bezier(.3,1.6,.5,1) ' + i * 0.4 + 's infinite' }}>✓</i></div>
            </div>
          ))}
          <div className="flex gap-1">{['Até 100', '100 a 300'].map((c, i) => <span key={c} className="rounded-full border px-2 py-1 text-[7px] font-semibold" style={i ? { background: 'linear-gradient(135deg,#2e035d,#5a1a9a)', color: '#fff', borderColor: 'transparent' } : { borderColor: '#e6e1ee' }}>{i ? '✓ ' : ''}{c}</span>)}</div>
        </div>
      </div>
    </Box>
  );
}

function Bands() {
  const Row = ({ items, cls, style, speed }) => (
    <div className={'absolute left-[-5%] top-1/2 flex w-[110%] items-center overflow-hidden ' + cls} style={style}>
      <div className="flex w-max" style={{ animation: 'lavMarq ' + speed + 's linear infinite' }}>
        {[0, 1].map((k) => items.map((t) => <span key={k + t} className="whitespace-nowrap pr-4 font-bold uppercase text-white" style={{ fontFamily: FD }}>{t} ✦</span>))}
      </div>
    </div>
  );
  return (
    <Box>
      <Row items={['Gratuita', 'Sexta 14h', 'Online']} cls="-mt-[18px] h-9 text-[11px]" style={{ background: PL, transform: 'rotate(4deg)' }} speed={9} />
      <Row items={['Aula ao vivo', 'Retenção', 'Academias']} cls="z-[2] -mt-[22px] h-11 text-[15px]" style={{ background: GOR, transform: 'rotate(-5deg)' }} speed={6} />
    </Box>
  );
}

function Grid() {
  return (
    <Box className="grid place-items-center">
      <i className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#76058f] opacity-20 blur-[30px]" style={{ animation: 'lavDrift 7s ease-in-out infinite alternate' }} />
      <i className="absolute -right-10 top-8 h-28 w-28 rounded-full bg-[#fc5304] opacity-15 blur-[30px]" style={{ animation: 'lavDrift 9s ease-in-out infinite alternate-reverse' }} />
      <i className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(46,3,93,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(46,3,93,.12) 1px,transparent 1px)', backgroundSize: '26px 26px', WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 45%,#000 20%,transparent 80%)', maskImage: 'radial-gradient(ellipse 75% 70% at 50% 45%,#000 20%,transparent 80%)', animation: 'lavGrid 8s linear infinite' }} />
      <b className="relative text-[18px]" style={{ fontFamily: FD }}>Inscrição confirmada!</b>
    </Box>
  );
}

export const loopMaisAulaPreviews = {
  'lmaa-slide-btn': SlideBtn,
  'lmaa-hero': Hero,
  'lmaa-eyebrow': Eyebrow,
  'lmaa-words': Words,
  'lmaa-guided': Guided,
  'lmaa-calc': Calc,
  'lmaa-hscroll': HScroll,
  'lmaa-orbit': Orbit,
  'lmaa-strike': Strike,
  'lmaa-portrait': Portrait,
  'lmaa-bio': Bio,
  'lmaa-stats': Stats,
  'lmaa-countdown': Countdown,
  'lmaa-form': Form,
  'lmaa-bands': Bands,
  'lmaa-grid': Grid,
};
