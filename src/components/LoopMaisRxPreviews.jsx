import React from 'react';

// Prévias leves (CSS/SVG) dos efeitos da landing page da Loop+ (branco pontilhado, laranja #fc5304, roxo #2e035d)
const OR = '#fc5304', PU = '#2e035d', PL = '#6a2fae', BD = '#ebebeb', MU = '#6b6b6b';
const GRAD = 'linear-gradient(135deg,#fc5304 0%,#ff8040 100%)';
const DOTS = { backgroundImage: 'radial-gradient(circle, rgba(46,3,93,.08) 1px, transparent 1px)', backgroundSize: '22px 22px' };

const CSS = `
@keyframes lmvShine{0%{left:-60%}35%,100%{left:130%}}
@keyframes lmvLift{0%,40%,100%{transform:none;box-shadow:0 12px 28px rgba(252,83,4,.28)}55%,85%{transform:translateY(-2px);box-shadow:0 16px 34px rgba(252,83,4,.36)}}
@keyframes lmvDraw{0%{height:0}70%,100%{height:2000px}}
@keyframes lmvStroke{0%{stroke-dashoffset:1600}60%,100%{stroke-dashoffset:0}}
@keyframes lmvUp{0%,8%{opacity:0;transform:translateY(16px)}22%,85%{opacity:1;transform:none}100%{opacity:0;transform:none}}
@keyframes lmvPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}
@keyframes lmvCardLift{0%,45%,100%{transform:none}60%,85%{transform:translateY(-4px)}}
@keyframes lmvTilt{0%,35%,100%{transform:rotate(-3deg)}50%,85%{transform:rotate(0) translateY(-6px)}}
@keyframes lmvSpin{to{transform:rotate(360deg)}}
@keyframes lmvBob{0%,100%{transform:translate(0,0)}50%{transform:translate(4px,-5px)}}
@keyframes lmvPan{to{transform:translateX(-50%)}}
@keyframes lmvFill{0%{height:0}80%,100%{height:100%}}
@keyframes lmvHead{0%,20%{transform:none;opacity:1;filter:none}30%,60%{transform:translateY(-100%);opacity:0;filter:blur(4px)}70%,100%{transform:none;opacity:1;filter:none}}
@keyframes lmvPage{0%,20%{transform:none}30%,60%{transform:translateY(-40px)}70%,100%{transform:translateY(-20px)}}
@keyframes lmvSlide{0%,15%{transform:translateX(0)}25%,45%{transform:translateX(-42px)}55%,75%{transform:translateX(-84px)}85%,100%{transform:translateX(0)}}
@keyframes lmvPrev{0%,15%{opacity:.35}25%,75%{opacity:1}85%,100%{opacity:.35}}
@keyframes lmvNext{0%,45%{opacity:1}55%,75%{opacity:.35}85%,100%{opacity:1}}
@keyframes lmvOpen{0%,20%{max-height:0;opacity:0}35%,75%{max-height:40px;opacity:1}90%,100%{max-height:0;opacity:0}}
@keyframes lmvPlus{0%,20%{transform:none}35%,75%{transform:rotate(45deg)}90%,100%{transform:none}}
@keyframes lmvBar{0%,10%{width:25%}30%,45%{width:50%}65%,80%{width:75%}95%,100%{width:25%}}
@keyframes lmvQ{0%{opacity:0;transform:translateY(8px)}5%,30%{opacity:1;transform:none}33%,100%{opacity:0}}
@keyframes lmvPick{0%,20%{border-color:#ebebeb;background:#fff;color:#1d1d1d}24%,32%{border-color:#fc5304;background:rgba(252,83,4,.06);color:#973101}36%,100%{border-color:#ebebeb;background:#fff;color:#1d1d1d}}
@keyframes lmvDot{0%,20%{background:#fff;border-color:#ebebeb;box-shadow:none}24%,32%{background:#fc5304;border-color:#fc5304;box-shadow:inset 0 0 0 2px #fff}36%,100%{background:#fff;border-color:#ebebeb;box-shadow:none}}
@keyframes lmvRadio{0%,100%{border-color:#ebebeb;background:#fff;color:#1d1d1d}8%,30%{border-color:#fc5304;background:rgba(252,83,4,.06);color:#973101}34%{border-color:#ebebeb;background:#fff;color:#1d1d1d}}
@keyframes lmvRadioDot{0%,100%{background:#fff;border-color:#ebebeb;box-shadow:none}8%,30%{background:#fc5304;border-color:#fc5304;box-shadow:inset 0 0 0 3px #fff}34%{background:#fff;border-color:#ebebeb;box-shadow:none}}
@keyframes lmvType{0%{width:0}10%{width:1ch}20%{width:4ch}30%{width:5ch}45%{width:10ch}60%,90%{width:15ch}100%{width:0}}
@keyframes lmvCaret{50%{opacity:0}}
@keyframes lmvFocus{0%,5%{border-color:#ebebeb}10%,90%{border-color:#fc5304}100%{border-color:#ebebeb}}
@media (prefers-reduced-motion:reduce){.lmv-pv *{animation:none!important}}
`;

const Box = ({ children, className = '', style }) => (
  <div className={'lmv-pv relative w-full h-44 overflow-hidden rounded-xl border border-black/5 bg-white text-[#1d1d1d] ' + className} style={{ ...DOTS, ...style }}>
    <style>{CSS}</style>
    {children}
  </div>
);
const Pill = ({ children, className = '', style }) => (
  <span className={'relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-4 py-2 text-[9px] font-bold uppercase tracking-[.02em] text-white ' + className} style={{ background: GRAD, boxShadow: '0 12px 28px rgba(252,83,4,.28)', ...style }}>{children}</span>
);

function ShineBtn() {
  return (
    <Box className="grid place-items-center">
      <Pill className="px-6 py-3 text-[11px]" style={{ animation: 'lmvLift 3.4s ease-in-out infinite' }}>
        <span aria-hidden="true" className="absolute top-0 h-full w-[40%] -skew-x-[20deg]" style={{ left: '-60%', background: 'linear-gradient(120deg,transparent,rgba(255,255,255,.55),transparent)', animation: 'lmvShine 3.4s ease-in-out infinite' }} />
        <span className="relative">Quero conhecer a plataforma</span>
      </Pill>
    </Box>
  );
}

function CtaTrio() {
  return (
    <Box className="grid place-items-center">
      <div className="grid w-[200px] gap-1.5 text-center">
        <Pill className="py-2.5">
          <span aria-hidden="true" className="absolute top-0 h-full w-[40%] -skew-x-[20deg]" style={{ left: '-60%', background: 'linear-gradient(120deg,transparent,rgba(255,255,255,.55),transparent)', animation: 'lmvShine 3.4s ease-in-out infinite' }} />
          <span className="relative">Escolher data e horário</span>
        </Pill>
        <span className="text-[7px] leading-tight" style={{ color: MU }}>Prefere falar antes de agendar?</span>
        <span className="rounded-full border-2 bg-white py-2 text-[9px] font-bold uppercase" style={{ borderColor: BD }}>WhatsApp</span>
        <span className="text-[8px] font-semibold text-[#9a9a9a] underline underline-offset-2">Ver a plataforma funcionando</span>
      </div>
    </Box>
  );
}

function FlowLine() {
  const d = 'M -30 90 C 250 170 320 360 540 420 S 920 540 950 750 S 780 1010 430 1110 S 60 1300 150 1560 S 700 1800 1120 2060';
  return (
    <Box>
      <svg viewBox="0 0 1000 2000" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs><clipPath id="lmv-flow-clip"><rect x="-2000" y="0" width="6000" height="2000" style={{ animation: 'lmvDraw 4s linear infinite' }} /></clipPath></defs>
        <path d={d} fill="none" stroke="rgba(46,3,93,.09)" strokeWidth="10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path d={d} fill="none" stroke={PL} strokeWidth="10" strokeLinecap="round" vectorEffect="non-scaling-stroke" clipPath="url(#lmv-flow-clip)" />
      </svg>
      <div className="relative grid h-full grid-cols-2 content-center gap-2 px-6">
        {['Empresas', 'Cooperativas', 'Associações', 'Rede B2B'].map((t) => (
          <div key={t} className="rounded-lg border bg-white/70 px-2 py-2 text-center text-[9px] font-bold backdrop-blur-md" style={{ borderColor: BD }}>{t}</div>
        ))}
      </div>
    </Box>
  );
}

function Wave() {
  const line = 'M0,40 C180,110 360,110 600,72 C840,34 1020,0 1200,24 C1320,40 1390,64 1440,80';
  return (
    <Box style={{ background: 'linear-gradient(180deg,#2e035d 0%,#45137d 100%)' }}>
      <div className="absolute inset-x-0 top-0 h-[58%] bg-white" style={DOTS}>
        <div className="grid h-full content-center justify-items-center gap-1 pb-4">
          <b className="font-['Baloo_2',sans-serif] text-[13px]">Crie um Clube de Vantagens</b>
          <span className="h-1 w-24 rounded" style={{ background: BD }} />
        </div>
      </div>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 top-[58%] block h-10 w-full" aria-hidden="true">
        <path d={line + ' L1440,0 L0,0 Z'} fill="#fff" />
        <path d={line} fill="none" stroke={OR} strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="1600" style={{ animation: 'lmvStroke 3.5s ease-in-out infinite' }} pathLength="1600" />
      </svg>
    </Box>
  );
}

function Textures() {
  const Q = 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2770%27 height=%2770%27 viewBox=%270 0 140 140%27%3E%3Ctext x=%2714%27 y=%2752%27 font-family=%27Arial%27 font-size=%2748%27 font-weight=%27700%27 fill=%27%23ffffff%27%3E%3F%3C/text%3E%3Ctext x=%2782%27 y=%27118%27 font-family=%27Arial%27 font-size=%2748%27 font-weight=%27700%27 fill=%27%23ffffff%27%3E%3F%3C/text%3E%3C/svg%3E")';
  return (
    <Box className="grid grid-cols-3">
      <div className="grid place-items-center text-[8px] font-bold" style={{ color: PU }}>Pontinhos</div>
      <div className="relative grid place-items-center overflow-hidden text-[8px] font-bold text-white" style={{ background: 'linear-gradient(180deg,#2e035d,#45137d)' }}>
        <div className="absolute inset-[-70px] opacity-20" style={{ backgroundImage: Q, backgroundSize: '70px 70px', animation: 'lmvPan 14s linear infinite', width: '400%' }} />
        <span className="relative">Interrogações</span>
      </div>
      <div className="relative grid place-items-center overflow-hidden text-[8px] font-bold text-white" style={{ background: 'linear-gradient(180deg,#2e035d,#45137d)' }}>
        <span aria-hidden="true" className="absolute -left-2 bottom-1 font-['Baloo_2',sans-serif] text-[64px] font-bold leading-[.8] opacity-[.08]">Loop+</span>
        <span className="relative">Marca d'água</span>
      </div>
    </Box>
  );
}

function Reveal() {
  return (
    <Box className="grid content-center gap-2 px-6">
      <b className="font-['Baloo_2',sans-serif] text-[14px]" style={{ animation: 'lmvUp 4s ease-out infinite' }}>Para quem faz sentido</b>
      <div className="grid grid-cols-2 gap-2">
        {['Empresas com clientes', 'Associações e sindicatos', 'Cooperativas', 'Empresas B2B'].map((t, i) => (
          <div key={t} className="rounded-lg border bg-white px-2 py-2.5 text-[8px] font-bold" style={{ borderColor: BD, animation: 'lmvUp 4s ease-out infinite', animationDelay: 0.25 + Math.min(i * 0.08, 0.32) + 's' }}>{t}</div>
        ))}
      </div>
    </Box>
  );
}

const ic = { fill: 'none', stroke: '#fff', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
const ICONS = [
  <><path d="M4 21V7l8-4 8 4v14" {...ic} /><path d="M9 21v-6h6v6" {...ic} /></>,
  <><circle cx="9" cy="8" r="3" {...ic} /><path d="M3.5 20c0-3.3 2.5-6 5.5-6s5.5 2.7 5.5 6" {...ic} /></>,
  <><path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" {...ic} /><path d="M9 12l2 2 4-4" {...ic} /></>,
  <><circle cx="12" cy="12" r="9" {...ic} /><path d="M3 12h18" {...ic} /></>,
];

function GlassCards() {
  return (
    <Box className="grid grid-cols-2 content-center gap-2 px-5">
      {['Empresas', 'Associações', 'Cooperativas', 'Rede B2B'].map((t, i) => (
        <div key={t} className="flex items-center gap-2 rounded-xl border bg-white/70 p-2 shadow-sm backdrop-blur-md" style={{ borderColor: BD, animation: 'lmvCardLift 4s ease-in-out infinite', animationDelay: -i * 1 + 's' }}>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg" style={{ background: GRAD }}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" style={{ animation: 'lmvPulse 2.6s ease-in-out infinite' }}>{ICONS[i]}</svg>
          </span>
          <b className="text-[8px] leading-tight">{t}</b>
        </div>
      ))}
    </Box>
  );
}

function PhoneFrame() {
  return (
    <Box className="grid place-items-center" style={{ background: 'linear-gradient(180deg,#2e035d 0%,#45137d 100%)' }}>
      <div className="absolute h-32 w-32 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle,rgba(252,83,4,.45),rgba(46,3,93,0) 70%)' }} />
      <div className="relative h-[136px] w-[84px] rounded-[16px] p-1.5 shadow-[0_20px_40px_rgba(0,0,0,.35)]" style={{ background: 'conic-gradient(from 180deg,#fc5304,#6a2fae,#fc5304)', animation: 'lmvTilt 4s ease-in-out infinite' }}>
        <div className="grid h-full content-start gap-1.5 rounded-[4px] bg-white p-1.5">
          <span className="h-2 w-8 rounded" style={{ background: GRAD }} />
          {[0, 1, 2, 3].map((k) => <span key={k} className="h-4 rounded" style={{ background: k % 2 ? '#f3eefa' : '#fff1ea' }} />)}
        </div>
      </div>
    </Box>
  );
}

function RingPhoto() {
  return (
    <Box className="grid place-items-center">
      <div className="relative isolate h-28 w-28">
        <span className="absolute -right-8 -top-6 -z-10 h-28 w-28 rounded-full opacity-[.16] blur-[3px]" style={{ background: 'linear-gradient(135deg,#2e035d,#4a1584)', animation: 'lmvBob 5s ease-in-out infinite' }} />
        <span className="absolute -bottom-3 -left-5 -z-10 h-14 w-14 rounded-full opacity-[.22]" style={{ background: GRAD, animation: 'lmvBob 4s ease-in-out infinite reverse' }} />
        <div className="relative h-full w-full overflow-hidden rounded-full p-[5px]">
          <div className="absolute inset-[-30%]" style={{ background: 'conic-gradient(from 180deg,#fc5304,#6a2fae,#fc5304)', animation: 'lmvSpin 6s linear infinite' }} />
          <div className="relative grid h-full w-full place-items-center rounded-full" style={{ background: 'radial-gradient(circle at 50% 38%,#f4c9b0 0 18%,transparent 19%),radial-gradient(ellipse at 50% 95%,#6a2fae 0 38%,transparent 39%),#fdf1ea' }} />
        </div>
      </div>
    </Box>
  );
}

function VideoBorder() {
  return (
    <Box className="grid place-items-center">
      <div className="relative aspect-[2/1] w-[230px] rounded-[16px] border-2 border-transparent shadow-[0_16px_34px_rgba(0,0,0,.2)]" style={{ background: 'linear-gradient(135deg,#fc5304,#6a2fae,#fc5304) border-box' }}>
        <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-[#042454]">
          <div className="absolute inset-y-2 left-2 flex w-[200%] gap-2" style={{ animation: 'lmvPan 6s linear infinite' }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => <span key={k} className="h-full w-16 shrink-0 rounded-md" style={{ background: k % 2 ? 'rgba(255,255,255,.12)' : 'rgba(252,83,4,.5)' }} />)}
          </div>
        </div>
      </div>
    </Box>
  );
}

function Timeline() {
  const steps = [0, 1, 2];
  return (
    <Box className="px-6 py-3">
      <style>{steps.map((i) => '@keyframes lmvTl' + i + '{0%,' + (10 + i * 25) + '%{opacity:0;transform:translate(' + (i % 2 ? 10 : -10) + 'px,10px)}' + (20 + i * 25) + '%,92%{opacity:1;transform:none}100%{opacity:0}}@keyframes lmvTd' + i + '{0%,' + (10 + i * 25) + '%{border-color:#ebebeb;background:#fff}' + (20 + i * 25) + '%,92%{border-color:#fc5304;background:#fc5304}100%{border-color:#ebebeb;background:#fff}}').join('')}</style>
      <div className="relative h-full">
        <div className="absolute bottom-0 left-1/2 top-0 -ml-[1.5px] w-[3px] overflow-hidden rounded" style={{ background: BD }}>
          <div className="absolute inset-x-0 top-0" style={{ background: 'linear-gradient(180deg,#fc5304,#2e035d)', animation: 'lmvFill 4s linear infinite' }} />
        </div>
        {steps.map((i) => (
          <div key={i} className={'relative mb-3 flex w-1/2 items-center ' + (i % 2 ? 'ml-auto pl-5' : 'justify-end pr-5')}>
            <span className={'absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 ' + (i % 2 ? '-left-1.5' : '-right-1.5')} style={{ animation: 'lmvTd' + i + ' 4s linear infinite' }} />
            <div className="flex items-center gap-1.5 rounded-lg border bg-white px-2 py-1.5 shadow-sm" style={{ borderColor: BD, animation: 'lmvTl' + i + ' 4s ease-out infinite' }}>
              <span className="h-4 w-4 rounded-md" style={{ background: GRAD }} />
              <b className="text-[8px]">Passo {i + 1}</b>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}

function Header() {
  return (
    <Box>
      <div className="absolute inset-x-0 top-0 grid gap-2 px-5 pt-14" style={{ animation: 'lmvPage 5s ease-in-out infinite' }}>
        {[0, 1, 2, 3, 4].map((k) => <span key={k} className="h-6 rounded-lg" style={{ background: k % 2 ? '#f3eefa' : '#fff1ea' }} />)}
      </div>
      <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-between border-b bg-white/60 px-4 backdrop-blur-md" style={{ borderColor: 'rgba(235,235,235,.7)', animation: 'lmvHead 5s ease-in-out infinite' }}>
        <b className="font-['Baloo_2',sans-serif] text-[13px]" style={{ color: PU }}>Loop+</b>
        <span className="flex gap-2 text-[7px] font-semibold"><span>Produto</span><span>Como funciona</span></span>
        <Pill className="px-2.5 py-1 text-[7px]">Quero conhecer</Pill>
      </div>
    </Box>
  );
}

function LogoCarousel() {
  const colors = ['#2e035d', '#fc5304', '#6a2fae', '#042454', '#973101', '#45137d', '#ff8040', '#1e0240'];
  return (
    <Box className="flex items-center justify-center gap-2">
      <span className="grid h-6 w-6 place-items-center rounded-full border-2 bg-white text-[10px]" style={{ borderColor: BD, animation: 'lmvPrev 6s ease infinite' }}>‹</span>
      <div className="w-[168px] flex-[0_0_auto] overflow-hidden">
        <div className="flex" style={{ animation: 'lmvSlide 6s cubic-bezier(.4,0,.2,1) infinite' }}>
          {colors.map((c, k) => <span key={k} className="mr-[6px] grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-[9px] font-bold text-white" style={{ background: c }}>{k + 1}</span>)}
        </div>
      </div>
      <span className="grid h-6 w-6 place-items-center rounded-full border-2 bg-white text-[10px]" style={{ borderColor: BD, animation: 'lmvNext 6s ease infinite' }}>›</span>
    </Box>
  );
}

function Faq() {
  const qs = ['O que é White Label?', 'Preciso desenvolver um app?', 'Posso trabalhar com recorrência?'];
  return (
    <Box className="grid content-center px-6">
      {qs.map((q, i) => (
        <div key={q} className="border-b" style={{ borderColor: BD }}>
          <div className="flex items-center justify-between py-2 font-['Baloo_2',sans-serif] text-[11px] font-bold">
            {q}
            <span className="text-[14px] leading-none" style={{ color: OR, animation: i === 1 ? 'lmvPlus 4s ease infinite' : undefined }}>+</span>
          </div>
          {i === 1 && <p className="m-0 overflow-hidden text-[8px] leading-snug" style={{ color: MU, animation: 'lmvOpen 4s ease infinite' }}>Não. A Loop+ já possui infraestrutura web e mobile.</p>}
        </div>
      ))}
    </Box>
  );
}

function Quiz() {
  const qs = [['Qual é a sua base?', 'Clientes', 'Cooperados'], ['Tamanho da base?', 'Até 500', 'Mais de 5.000'], ['Principal desafio?', 'Retenção', 'Nova receita']];
  return (
    <Box className="grid place-items-center">
      <div className="w-[220px] overflow-hidden rounded-xl border bg-white shadow-md" style={{ borderColor: BD }}>
        <div className="h-1" style={{ background: BD }}><div className="h-full" style={{ background: GRAD, animation: 'lmvBar 9s ease infinite' }} /></div>
        <div className="relative h-[100px]">
          {qs.map((q, i) => (
            <div key={i} className="absolute inset-0 p-3 opacity-0" style={{ animation: 'lmvQ 9s ease infinite', animationDelay: ((i * 3 - 9) % 9) + 's' }}>
              <p className="m-0 mb-0.5 text-[6px] font-bold uppercase tracking-wider" style={{ color: OR }}>Pergunta {i + 1} de 3</p>
              <b className="mb-1.5 block font-['Baloo_2',sans-serif] text-[11px]">{q[0]}</b>
              {[q[1], q[2]].map((o, k) => (
                <div key={o} className="mb-1 flex items-center justify-between rounded-md border-[1.5px] px-2 py-1 text-[8px] font-semibold" style={k === 0 ? { animation: 'lmvPick 9s ease infinite', animationDelay: ((i * 3 - 9) % 9) + 's' } : { borderColor: BD }}>
                  {o}
                  <span className="h-2 w-2 rounded-full border" style={k === 0 ? { animation: 'lmvDot 9s ease infinite', animationDelay: ((i * 3 - 9) % 9) + 's' } : { borderColor: BD }} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}

function RadioCards() {
  const opts = ['Clientes', 'Cooperados', 'Colaboradores'];
  return (
    <Box className="grid content-center gap-2 px-10">
      {opts.map((o, i) => (
        <div key={o} className="flex items-center justify-between rounded-[10px] border-[1.5px] bg-white px-4 py-2 text-[10px] font-semibold" style={{ animation: 'lmvRadio 6s ease infinite', animationDelay: -(6 - i * 2) % 6 + 's' }}>
          {o}
          <span className="h-3 w-3 rounded-full border-[1.5px]" style={{ animation: 'lmvRadioDot 6s ease infinite', animationDelay: -(6 - i * 2) % 6 + 's' }} />
        </div>
      ))}
    </Box>
  );
}

function WhatsMask() {
  return (
    <Box className="grid content-center px-10">
      <span className="mb-1.5 text-[10px] font-bold">WhatsApp</span>
      <div className="flex h-10 items-center rounded-[10px] border-[1.5px] bg-white px-3 font-mono text-[12px]" style={{ animation: 'lmvFocus 6s ease infinite' }}>
        <span className="inline-block overflow-hidden whitespace-nowrap" style={{ animation: 'lmvType 6s steps(15,end) infinite' }}>(11) 98765-4321</span>
        <span className="ml-px h-4 w-px" style={{ background: OR, animation: 'lmvCaret 1s steps(1) infinite' }} />
      </div>
      <span className="mt-1.5 text-[8px]" style={{ color: MU }}>Só números: a máscara monta o resto.</span>
    </Box>
  );
}

export const loopMaisRxPreviews = {
  'lmrx-shine-btn': ShineBtn,
  'lmrx-cta-trio': CtaTrio,
  'lmrx-flow-line': FlowLine,
  'lmrx-wave': Wave,
  'lmrx-textures': Textures,
  'lmrx-reveal': Reveal,
  'lmrx-glass-cards': GlassCards,
  'lmrx-phone-frame': PhoneFrame,
  'lmrx-ring-photo': RingPhoto,
  'lmrx-video-border': VideoBorder,
  'lmrx-timeline': Timeline,
  'lmrx-header': Header,
  'lmrx-logo-carousel': LogoCarousel,
  'lmrx-faq': Faq,
  'lmrx-quiz': Quiz,
  'lmrx-radio-cards': RadioCards,
  'lmrx-whatsapp-mask': WhatsMask,
};
