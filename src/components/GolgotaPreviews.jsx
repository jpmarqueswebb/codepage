import React, { useEffect, useRef } from 'react';

// Prévias leves (CSS/SVG, um canvas) dos efeitos do site do Projeto Golgota
const R = '#b22314', RT = '#e5432f', RD = '#8c1a0e';

const CSS = `
@keyframes ggTun{0%{transform:translate(-50%,-50%) translate(var(--x0),var(--y0)) scale(.15);opacity:0}25%{opacity:1}85%{opacity:1}100%{transform:translate(-50%,-50%) translate(var(--x1),var(--y1)) scale(1.6);opacity:0}}
@keyframes ggGrow{0%,100%{transform:scale(.8);opacity:.35}50%{transform:scale(1);opacity:1}}
@keyframes ggTypeIn{0%{clip-path:inset(0 100% 0 0)}35%,100%{clip-path:inset(0 0 0 0)}}
@keyframes ggFrame{0%,30%{left:12%;width:15%}45%,60%{left:40%;width:13%}75%,100%{left:64%;width:16%}}
@keyframes ggBlink{0%,60%{opacity:1}61%,100%{opacity:0}}
@keyframes ggMesh1{0%,100%{transform:translate(-20%,-10%)}50%{transform:translate(25%,20%)}}
@keyframes ggMesh2{0%,100%{transform:translate(20%,15%)}50%{transform:translate(-25%,-20%)}}
@keyframes ggGlow{0%,100%{transform:translate(30px,20px)}50%{transform:translate(180px,90px)}}
@keyframes ggBeam{0%,100%{--ggb:40%}50%{--ggb:72%}}
@property --ggb{syntax:'<percentage>';initial-value:58%;inherits:true}
@keyframes ggHop{0%,70%,100%{transform:none}78%{transform:translateY(2px) scale(1.06,.9)}86%{transform:translateY(-10px) scale(.97,1.05)}}
@keyframes ggInset{0%,10%{clip-path:inset(40% 40% round 999px)}60%,85%{clip-path:inset(0 0 round 12px)}100%{clip-path:inset(40% 40% round 999px)}}
@keyframes ggHeadIn{0%,10%{opacity:0;filter:blur(6px);transform:translateY(14px)}40%,85%{opacity:1;filter:none;transform:none}100%{opacity:0;filter:blur(6px)}}
@keyframes ggCorners{0%,30%,100%{inset:-6px;opacity:.6}45%,80%{inset:-10px;opacity:1}}
@keyframes ggShine{0%,35%{background-position:160% 0}70%,100%{background-position:-60% 0}}
@keyframes ggArrow{0%,35%,100%{transform:none}45%,80%{transform:translateX(4px)}}
@keyframes ggSmoke{0%{opacity:0;filter:blur(8px);transform:translateY(20px)}25%,60%{opacity:1;filter:none;transform:none}85%,100%{opacity:0;filter:blur(8px);transform:translateY(-20px)}}
@keyframes ggHdr{0%,20%{transform:none;opacity:1;filter:none}35%,60%{transform:translateY(-105%);opacity:0;filter:blur(6px)}75%,100%{transform:none;opacity:1;filter:none}}
@keyframes ggPage{0%,100%{transform:translateY(0)}50%{transform:translateY(-60px)}}
@keyframes ggStg{0%,25%{transform:translateX(0)}35%,60%{transform:translateX(-62px)}70%,100%{transform:translateX(-124px)}}
@keyframes ggFan{0%,15%{--ggs:0}50%,80%{--ggs:1}100%{--ggs:0}}
@property --ggs{syntax:'<number>';initial-value:0;inherits:true}
@keyframes ggBlade{0%,10%{--ggp:0}60%,85%{--ggp:1}100%{--ggp:0}}
@property --ggp{syntax:'<number>';initial-value:0;inherits:true}
@keyframes ggStamp{0%,62%{opacity:0;transform:rotate(-14deg) scale(2.4)}70%,92%{opacity:1;transform:rotate(-14deg) scale(1)}100%{opacity:0;transform:rotate(-14deg) scale(1)}}
@keyframes ggLift{0%,40%,100%{transform:none}55%,85%{transform:translateY(-5px)}}
@keyframes ggSlice{0%,10%{rotate:0 1 0 -88deg;opacity:0}35%,100%{rotate:0 1 0 0deg;opacity:1}}
@keyframes ggTilt{0%,100%{transform:rotateY(-12deg) rotateX(5deg)}50%{transform:rotateY(12deg) rotateX(-5deg)}}
@keyframes ggTrack{0%,8%{transform:translateX(0)}30%,38%{transform:translateX(-33.33%)}60%,68%{transform:translateX(-66.66%)}90%,100%{transform:translateX(-100%)}}
@keyframes ggFill{0%,8%{transform:scaleX(0)}90%,100%{transform:scaleX(1)}}
@keyframes ggStrike{0%,15%{transform:rotate(-5deg) scaleX(0)}45%,85%{transform:rotate(-5deg) scaleX(1)}100%{transform:rotate(-5deg) scaleX(0)}}
@keyframes ggFaq{0%,20%{grid-template-rows:0fr}40%,80%{grid-template-rows:1fr}100%{grid-template-rows:0fr}}
@keyframes ggBar{0%,20%{transform:scaleY(0)}40%,80%{transform:none}100%{transform:scaleY(0)}}
@keyframes ggPm{0%,20%{background:transparent;transform:none}40%,80%{background:${R};transform:rotate(180deg)}100%{background:transparent}}
@media (prefers-reduced-motion:reduce){.gg-pv *{animation:none!important}}
`;

const Box = ({ children, className = '', style }) => (
  <div className={'gg-pv relative w-full h-44 overflow-hidden rounded-xl border border-white/10 bg-black ' + className} style={style}>
    <style>{CSS}</style>
    {children}
  </div>
);

function Tunnel() {
  const C = [[-70, -30, -150, -70], [70, -25, 160, -60], [-60, 30, -170, 70], [65, 35, 150, 80], [0, -40, 10, -110]];
  return (
    <Box className="[perspective:400px]">
      {C.map(([x0, y0, x1, y1], i) => (
        <i key={i} className="absolute left-1/2 top-1/2 h-14 w-11 rounded-md border border-white/20 bg-[linear-gradient(160deg,#2a2a2a,#0b0b0b)]"
          style={{ '--x0': x0 / 4 + 'px', '--y0': y0 / 4 + 'px', '--x1': x1 + 'px', '--y1': y1 + 'px', animation: 'ggTun 4s linear infinite', animationDelay: -i * 0.8 + 's' }} />
      ))}
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid justify-items-center gap-1.5" style={{ animation: 'ggGrow 4s ease-in-out infinite' }}>
          <b className="text-sm font-extrabold text-white">Seu título aqui</b>
          <span className="rounded px-3 py-1 text-[8px] font-bold uppercase tracking-widest text-white" style={{ background: R }}>Começar</span>
        </div>
      </div>
    </Box>
  );
}

function DotFieldPv() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d');
    const W = (c.width = 320), H = (c.height = 176), G = 11;
    let raf = 0, t = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#d9d9d9';
      const wave = (t % 3) * 140, mx = W / 2 + Math.cos(t * 0.8) * 90, my = H / 2 + Math.sin(t * 1.1) * 45;
      for (let y = 0; y < H + G; y += G) for (let x = 0; x < W + G; x += G) {
        const dx = x - W / 2, dy = y - H / 2, d = Math.hypot(dx, dy) || 1;
        const band = Math.max(0, 1 - Math.abs(d - wave) / 18) * (1 - (t % 3) / 3);
        const md = Math.hypot(x - mx, y - my), push = md < 40 ? (1 - md / 40) * 5 : 0;
        const ox = (dx / d) * band * 7 + ((x - mx) / (md || 1)) * push, oy = (dy / d) * band * 7 + ((y - my) / (md || 1)) * push;
        const tone = 0.5 + 0.5 * Math.sin(x * 0.03 + t * 0.6) * Math.cos(y * 0.04 - t * 0.4);
        const edge = Math.max(0, 1 - d / 190);
        const r = G * 0.42 * (0.15 + 0.6 * tone + band * 0.6) * edge;
        if (r < 0.4) continue;
        ctx.globalAlpha = 0.25 + 0.4 * tone;
        ctx.beginPath(); ctx.arc(x + ox, y + oy, r, 0, 6.283); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <Box>
      <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-60" />
      <div className="absolute inset-0 grid place-items-center"><b className="text-base font-extrabold text-white">Campo de pontos</b></div>
    </Box>
  );
}

function TechTextPv() {
  return (
    <Box className="grid place-items-center">
      <div className="relative font-mono">
        <b className="block text-2xl font-black tracking-tight text-white" style={{ animation: 'ggTypeIn 6s steps(9) infinite', fontFamily: 'system-ui' }}>APROVAÇÃO</b>
        <span className="absolute -top-1 bottom-0 border" style={{ borderColor: RT, animation: 'ggFrame 6s cubic-bezier(.22,1,.36,1) infinite' }}>
          {[['-left-1 -top-1'], ['-right-1 -top-1'], ['-left-1 -bottom-1'], ['-right-1 -bottom-1']].map(([p], i) => <i key={i} className={'absolute h-1.5 w-1.5 ' + p} style={{ background: RT }} />)}
          <em className="absolute -top-4 left-0 whitespace-nowrap px-1 text-[7px] not-italic text-black" style={{ background: RT }}>A 32,0</em>
          <i className="absolute -right-3 top-1 h-1 w-1" style={{ background: RT, animation: 'ggBlink .9s infinite' }} />
          <i className="absolute -left-3 bottom-2 h-1.5 w-1.5 border" style={{ borderColor: RT, animation: 'ggBlink 1.3s infinite .3s' }} />
        </span>
      </div>
    </Box>
  );
}

function MeshDrift() {
  return (
    <Box className="bg-[#0b0b0b]">
      <i className="absolute left-1/4 top-1/4 h-40 w-40 rounded-full bg-[#3a3a3a] blur-2xl" style={{ animation: 'ggMesh1 9s ease-in-out infinite' }} />
      <i className="absolute left-1/2 top-0 h-36 w-36 rounded-full bg-[#1c1c1c] blur-2xl" style={{ animation: 'ggMesh2 11s ease-in-out infinite' }} />
      <i className="absolute left-0 top-0 h-20 w-20 rounded-full bg-white/15 blur-xl" style={{ animation: 'ggGlow 7s ease-in-out infinite' }} />
      <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")" }} />
    </Box>
  );
}

function BeamFooterPv() {
  const beam = 'linear-gradient(118deg,transparent calc(var(--ggb) - 9%),rgba(214,50,31,.6) calc(var(--ggb) - 1.5%),rgba(214,50,31,.8) var(--ggb),rgba(214,50,31,.2) calc(var(--ggb) + 3.5%),transparent calc(var(--ggb) + 8%))';
  return (
    <Box className="bg-[#050202]" style={{ animation: 'ggBeam 6s ease-in-out infinite' }}>
      <div className="absolute inset-0 blur-md" style={{ background: beam }} />
      <div className="relative grid grid-cols-3 gap-3 p-4">
        {['© 2026', 'Páginas', 'Atalhos'].map((t) => (
          <div key={t}><b className="block border-b pb-1 text-[8px] uppercase tracking-widest" style={{ color: RT, borderColor: 'rgba(214,50,31,.4)' }}>{t}</b>
            <i className="mt-2 block h-1 w-10 rounded bg-white/25" /><i className="mt-1.5 block h-1 w-7 rounded bg-white/15" /></div>
        ))}
      </div>
      <div className="absolute inset-x-0 -bottom-4 flex justify-center px-3">
        {Array.from('GÓLGOTA').map((ch, i) => (
          <span key={i} className="inline-block text-[64px] font-black leading-none tracking-tighter"
            style={{ color: 'transparent', backgroundImage: beam + ',linear-gradient(#6a130b,#120403)', WebkitBackgroundClip: 'text', backgroundClip: 'text', backgroundSize: '300px 100%', backgroundPosition: -i * 40 + 'px 0', animation: i === 3 ? 'ggHop 3s ease-in-out infinite' : 'none' }}>{ch}</span>
        ))}
      </div>
    </Box>
  );
}

function InsetPanel() {
  return (
    <Box className="grid grid-rows-[auto_1fr] gap-2 p-3">
      <b className="text-center text-xs font-extrabold text-white" style={{ animation: 'ggHeadIn 5s ease-in-out infinite' }}>Como funciona</b>
      <div className="relative bg-[radial-gradient(120%_90%_at_50%_0%,#1c1c1c,#070707_70%)]" style={{ animation: 'ggInset 5s cubic-bezier(.22,1,.36,1) infinite' }}>
        <div className="absolute inset-0 rounded-xl border border-[#363636]" />
        <div className="absolute inset-0 grid grid-cols-[1fr_1fr] items-center gap-3 p-4">
          <div className="h-full rounded-md bg-[#f2efe8] p-2"><i className="block h-1 w-3/4 bg-[#3a3a3a]" /><i className="mt-1.5 block h-1 w-full bg-[#d9d3c6]" /><i className="mt-1.5 block h-1 w-2/3" style={{ background: R }} /></div>
          <div className="grid gap-1.5">{[0, 1, 2, 3].map((k) => <i key={k} className="h-3 rounded border border-[#363636]" style={k === 1 ? { borderColor: R } : null} />)}</div>
        </div>
      </div>
    </Box>
  );
}

function ReticleBtn() {
  const f = 'rgba(255,255,255,.55)';
  const corners = [0, 1, 2, 3].map((k) => (
    <i key={k} className="absolute h-2.5 w-2.5" style={{ [k < 2 ? 'top' : 'bottom']: 0, [k % 2 ? 'right' : 'left']: 0, borderTop: k < 2 ? '2px solid ' + f : 0, borderBottom: k >= 2 ? '2px solid ' + f : 0, borderLeft: k % 2 ? 0 : '2px solid ' + f, borderRight: k % 2 ? '2px solid ' + f : 0 }} />
  ));
  return (
    <Box className="grid place-items-center">
      <span className="relative inline-flex h-12 items-center gap-2.5 overflow-visible rounded-lg px-6 text-[10px] font-bold uppercase tracking-[.14em] text-white" style={{ background: R, boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18)' }}>
        <span className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(105deg,transparent 38%,rgba(255,255,255,.3) 50%,transparent 62%) 160% 0/260% 100% no-repeat', animation: 'ggShine 3s cubic-bezier(.22,1,.36,1) infinite' }} />
        <span className="absolute inset-0 rounded-lg" style={{ background: 'repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 1px,transparent 1px 3px)', WebkitMaskImage: 'radial-gradient(ellipse at center,transparent 40%,#000 100%)', maskImage: 'radial-gradient(ellipse at center,transparent 40%,#000 100%)' }} />
        <span className="absolute" style={{ animation: 'ggCorners 3s cubic-bezier(.22,1,.36,1) infinite' }}>{corners}</span>
        <span className="relative">Garantir vaga</span>
        <svg viewBox="0 0 24 24" className="relative h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" style={{ animation: 'ggArrow 3s cubic-bezier(.22,1,.36,1) infinite' }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </span>
    </Box>
  );
}

function SmokePv() {
  return (
    <Box className="grid content-center gap-2 px-6">
      {[0, 1, 2].map((k) => (
        <div key={k} style={{ animation: 'ggSmoke 4.5s ease-in-out infinite', animationDelay: k * 0.25 + 's' }}>
          {k === 0 ? <b className="text-base font-extrabold text-white">Bloco que respira</b> : <i className="block h-1.5 rounded bg-white/25" style={{ width: k === 1 ? '85%' : '60%' }} />}
        </div>
      ))}
    </Box>
  );
}

function HideHeader() {
  return (
    <Box className="bg-[#0b0b0b]">
      <div className="absolute inset-x-0 top-0 z-10 flex h-9 items-center justify-between border-b border-white/10 bg-black/60 px-3 backdrop-blur" style={{ animation: 'ggHdr 4s cubic-bezier(.22,1,.36,1) infinite' }}>
        <b className="text-[10px] font-black text-white">LOGO</b>
        <div className="flex gap-2">{['Início', 'Sobre', 'Contato'].map((t, i) => <span key={t} className="relative text-[7px] font-semibold uppercase tracking-wider text-neutral-300">{t}{i === 0 && <i className="absolute inset-x-0 -bottom-0.5 h-px" style={{ background: R }} />}</span>)}</div>
      </div>
      <div className="absolute inset-x-4 top-12 grid gap-2" style={{ animation: 'ggPage 4s cubic-bezier(.45,0,.55,1) infinite' }}>
        {[90, 70, 80, 60, 75, 50].map((w, i) => <i key={i} className="block h-2 rounded bg-white/15" style={{ width: w + '%' }} />)}
      </div>
    </Box>
  );
}

function StaggerPv() {
  return (
    <Box>
      <div className="absolute left-1/2 top-1/2 flex -translate-y-1/2 gap-0" style={{ marginLeft: -124, animation: 'ggStg 6s cubic-bezier(.45,0,.55,1) infinite' }}>
        {[0, 1, 2, 3, 4, 5, 6].map((k) => {
          const ctr = k === 2;
          return (
            <div key={k} className="relative mx-[3px] h-14 w-14 shrink-0 rounded-lg border-2 p-1.5" style={{ background: ctr ? R : '#0b0b0b', borderColor: ctr ? R : '#363636', transform: 'translateY(' + (k % 2 ? 8 : -8) + 'px) rotate(' + (k % 2 ? 2.5 : -2.5) + 'deg)', clipPath: 'polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%)' }}>
              <i className="block h-1 w-full rounded bg-white/40" /><i className="mt-1 block h-1 w-2/3 rounded bg-white/25" />
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">{['‹', '›'].map((a) => <span key={a} className="grid h-5 w-5 place-items-center rounded border border-[#363636] text-[10px] text-white">{a}</span>)}</div>
    </Box>
  );
}

function FanPv() {
  const O = [-2, -1, 0, 1, 2], R0 = [-4, 3, -1, 5, -3];
  return (
    <Box style={{ animation: 'ggFan 4.5s cubic-bezier(.22,1,.36,1) infinite' }}>
      {O.map((o, i) => (
        <div key={i} className="absolute bottom-4 left-1/2 -ml-[22px] h-16 w-11 origin-[50%_115%] rounded-md border border-[#363636] p-1.5" style={{ background: i % 2 ? '#121212' : '#0d0d0d', zIndex: 10 - Math.abs(o), transform: 'translateX(calc(' + o + ' * 46px * var(--ggs))) translateY(calc(' + Math.abs(o) + ' * 5px * var(--ggs))) rotate(calc(' + o + ' * 6deg * var(--ggs) + ' + R0[i] + 'deg * (1 - var(--ggs))))' }}>
          <b className="block text-sm font-black leading-none" style={{ color: RT }}>0{i + 1}</b>
          <i className="mt-1 block h-px origin-left" style={{ background: R, transform: 'scaleX(var(--ggs))' }} />
          <i className="mt-1.5 block h-0.5 w-full rounded bg-white/25" />
        </div>
      ))}
    </Box>
  );
}

function BeforeAfterPv() {
  return (
    <Box className="grid content-center px-5" style={{ animation: 'ggBlade 5s cubic-bezier(.45,0,.55,1) infinite' }}>
      <div className="mb-1.5 flex justify-between text-[7px] font-bold uppercase tracking-wider"><span className="text-neutral-500">Antes</span><span style={{ color: RT }}>Depois</span></div>
      <div className="relative overflow-hidden rounded-lg border border-[#363636]">
        {[0, 1, 2].map((k) => (
          <div key={k} className="grid">
            <div className="col-start-1 row-start-1 flex items-center gap-2 bg-[#0d0d0d] px-3 py-2" style={k ? { borderTop: '1px solid #1e1e1e' } : null}><i className="h-3 w-3 rounded-full border border-[#363636]" /><i className="h-1 w-2/3 rounded bg-white/20" /></div>
            <div className="col-start-1 row-start-1 flex items-center gap-2 px-3 py-2" style={{ background: R, clipPath: 'inset(0 calc((1 - var(--ggp)) * 100%) 0 0)' }}><i className="h-3 w-3 rounded-full bg-black" /><i className="h-1 w-3/4 rounded bg-white/90" /></div>
          </div>
        ))}
        <span className="absolute inset-y-0 z-10 w-[2px] bg-white" style={{ left: 'calc(var(--ggp) * 100%)' }}><i className="absolute left-1/2 top-1/2 h-5 w-4 -translate-x-1/2 -translate-y-1/2 rounded border-2 border-black bg-white" /></span>
      </div>
    </Box>
  );
}

function CalendarPv() {
  return (
    <Box className="grid place-items-center px-4" style={{ background: R }}>
      <div className="relative w-full">
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 7 }).map((_, k) => {
            const kf = 'ggD' + k;
            const at = 8 + k * 7;
            return (
              <div key={k} className="relative aspect-[3/4] [perspective:200px]">
                <style>{'@keyframes ' + kf + 'a{0%,' + at + '%{transform:none}' + (at + 6) + '%,94%{transform:rotateX(180deg)}100%{transform:none}}@keyframes ' + kf + 'b{0%,' + at + '%{transform:rotateX(-180deg)}' + (at + 6) + '%,94%{transform:none}100%{transform:rotateX(-180deg)}}'}</style>
                <i className="absolute -top-1 left-[26%] z-10 h-2 w-1 rounded-sm bg-[#2a0805]" /><i className="absolute -top-1 right-[26%] z-10 h-2 w-1 rounded-sm bg-[#2a0805]" />
                <span className="absolute inset-0 grid place-items-center rounded-md border border-black/20 text-sm font-black text-black/40 [backface-visibility:hidden]" style={{ background: RD, animation: kf + 'a 6s cubic-bezier(.22,1,.36,1) infinite' }}>{k + 1}</span>
                <span className="absolute inset-0 grid place-items-center rounded-md text-sm font-black [backface-visibility:hidden]" style={{ background: k === 6 ? '#fff' : '#000', color: k === 6 ? R : '#fff', animation: kf + 'b 6s cubic-bezier(.22,1,.36,1) infinite' }}>{k + 1}</span>
              </div>
            );
          })}
        </div>
        <div className="absolute -right-1 top-1/2 -mt-9 grid h-[72px] w-[72px] place-items-center content-center rounded-full border-2 border-white bg-black text-center text-white outline outline-1 outline-offset-2 outline-white" style={{ animation: 'ggStamp 6s cubic-bezier(.2,1.5,.4,1) infinite' }}>
          <b className="text-2xl font-black leading-none">7</b><span className="text-[6px] font-bold uppercase tracking-wider">dias de<br />garantia</span>
        </div>
      </div>
    </Box>
  );
}

function TicketPv() {
  const t = (hot, d) => (
    <div className="w-[104px] shrink-0" style={{ animation: 'ggLift 4s cubic-bezier(.22,1,.36,1) infinite', animationDelay: d }}>
      <div className="relative overflow-hidden rounded-t-xl px-2.5 pb-2 pt-2.5" style={{ background: hot ? R : '#0e0e0e' }}>
        <svg viewBox="0 0 24 24" className="absolute -right-3 -top-3 w-12 rotate-[14deg]" fill={hot ? RD : '#1f0c09'}><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>
        <b className="relative block text-[11px] font-extrabold text-white">{hot ? 'CHO/2026' : 'Em breve'}</b>
        {[0, 1].map((k) => <div key={k} className="relative mt-1.5 flex items-center gap-1.5"><b className="text-[9px] font-black" style={{ color: hot ? '#fff' : RT }}>0{k + 1}</b><i className="h-0.5 w-10 rounded bg-white/40" /></div>)}
      </div>
      <div className="relative h-3" style={{ background: 'linear-gradient(' + (hot ? R : '#0e0e0e') + ' 50%,' + (hot ? '#f2efe8' : '#171717') + ' 50%)' }}>
        <span className="absolute inset-x-2 top-1/2 border-t border-dashed" style={{ borderColor: R }} />
        <i className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-black" /><i className="absolute -right-1.5 top-0 h-3 w-3 rounded-full bg-black" />
      </div>
      <div className="grid justify-items-center rounded-b-xl px-2 pb-2 pt-1" style={{ background: hot ? '#f2efe8' : '#171717', color: hot ? '#0b0b0b' : '#8a8a8a' }}>
        <b className="text-lg font-extrabold leading-none tracking-tight"><small className="text-[8px]">R$</small>0,97</b>
        <i className="mt-1.5 block h-3 w-full rounded" style={{ background: hot ? R : '#141414' }} />
      </div>
    </div>
  );
  return <Box className="flex items-center justify-center gap-3">{t(true, '0s')}{t(false, '.3s')}</Box>;
}

function Photo3D() {
  const N = 6;
  const photo = (bg, cls, d) => (
    <div className={'absolute [transform-style:preserve-3d] ' + cls}>
      {Array.from({ length: N }).map((_, i) => (
        <span key={i} className="absolute inset-y-0 overflow-hidden" style={{ left: (i * 100) / N + '%', width: 100 / N + 0.4 + '%', background: bg, backgroundSize: N * 100 + '% 100%', backgroundPosition: (i * 100) / (N - 1) + '% 0', borderRadius: i === 0 ? '8px 0 0 8px' : i === N - 1 ? '0 8px 8px 0' : 0, animation: 'ggSlice 5s cubic-bezier(.22,1,.36,1) infinite', animationDelay: d + i * 0.07 + 's' }} />
      ))}
    </div>
  );
  const PH = (c) => 'radial-gradient(circle at 50% 32%,#c9b39a 0 16%,transparent 17%),radial-gradient(ellipse 60% 40% at 50% 92%,' + c + ' 0 60%,transparent 61%),linear-gradient(160deg,#3a3a3a,#111)';
  return (
    <Box className="grid place-items-center [perspective:500px]">
      <div className="relative h-32 w-28 [transform-style:preserve-3d]" style={{ animation: 'ggTilt 6s ease-in-out infinite' }}>
        <div className="absolute inset-0 rounded-lg border border-[#b22314]/70 [background:repeating-linear-gradient(-45deg,rgba(178,35,20,.35)_0_2px,transparent_2px_8px)]" style={{ transform: 'translate3d(10px,10px,-40px) scale(1.06)' }} />
        {photo(PH('#1d2b3a'), 'right-0 top-0 h-[72%] w-[62%] [transform:translateZ(-18px)]', 0.3)}
        {photo(PH('#2a1a14'), 'bottom-0 left-0 h-[78%] w-[58%] [transform:translateZ(18px)]', 0)}
        <div className="pointer-events-none absolute -inset-2" style={{ transform: 'translateZ(30px)', background: ['0 0', '100% 0', '0 100%', '100% 100%'].map((p) => 'linear-gradient(' + R + ',' + R + ') ' + p + '/14px 2px no-repeat,linear-gradient(' + R + ',' + R + ') ' + p + '/2px 14px no-repeat').join(',') }} />
      </div>
    </Box>
  );
}

function HTimeline() {
  return (
    <Box className="grid content-center gap-3 py-3">
      <div className="relative mx-5 grid grid-cols-4">
        <span className="absolute left-2.5 top-2.5 h-px w-[78%] bg-[#363636]" />
        <span className="absolute left-2.5 top-2.5 h-px w-[78%] origin-left" style={{ background: R, animation: 'ggFill 6s cubic-bezier(.45,0,.55,1) infinite' }} />
        {[0, 1, 2, 3].map((k) => {
          const a = 8 + k * 26;
          return (
            <span key={k} className="relative z-10">
              <style>{'@keyframes ggN' + k + '{0%,' + Math.max(0, a - 6) + '%{background:#000;border-color:#363636}' + a + '%,96%{background:' + R + ';border-color:' + R + '}100%{background:#000;border-color:#363636}}'}</style>
              <i className="grid h-5 w-5 place-items-center rounded-full border-2 text-[8px] font-black not-italic text-white" style={{ animation: 'ggN' + k + ' 6s infinite' }}>{k + 1}</i>
            </span>
          );
        })}
      </div>
      <div className="overflow-hidden">
        <div className="flex w-max gap-3 pl-5" style={{ animation: 'ggTrack 6s cubic-bezier(.45,0,.55,1) infinite' }}>
          {[0, 1, 2, 3].map((k) => (
            <div key={k} className="w-[230px] rounded-xl border bg-[#070707] p-3" style={{ borderColor: k === 0 ? R : '#363636' }}>
              <b className="text-xl font-black leading-none" style={{ color: RT }}>0{k + 1}</b>
              <i className="mt-2 block h-1.5 w-2/3 rounded bg-white/40" /><i className="mt-1.5 block h-1 w-full rounded bg-white/15" />
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}

function StrikePv() {
  return (
    <Box className="grid content-center gap-2 px-6">
      <span className="relative justify-self-start text-4xl font-black uppercase leading-none text-[#2f2f2f]">
        Videoaula
        <i className="absolute -left-[5%] -right-[5%] top-1/2 -mt-0.5 h-1 origin-left" style={{ background: R, animation: 'ggStrike 4s cubic-bezier(.22,1,.36,1) infinite' }} />
      </span>
      <b className="text-[11px] font-bold text-white">Aqui não tem videoaula de 4 horas.</b>
      <i className="block h-1 w-3/4 rounded bg-white/20" />
    </Box>
  );
}

function FaqPv() {
  return (
    <Box className="grid content-center gap-1.5 px-5">
      {[0, 1, 2].map((k) => {
        const on = k === 1;
        return (
          <div key={k} className="relative overflow-hidden rounded-lg border bg-[#0f0f0f]" style={{ borderColor: on ? 'rgba(178,35,20,.6)' : '#262626' }}>
            {on && <span className="absolute inset-y-0 left-0 w-1" style={{ background: R, animation: 'ggBar 5s cubic-bezier(.22,1,.36,1) infinite' }} />}
            <div className="flex items-center justify-between px-3 py-2">
              <i className="block h-1.5 w-2/3 rounded bg-white/50" />
              <span className="relative grid h-4 w-4 place-items-center rounded border border-[#363636]" style={on ? { animation: 'ggPm 5s cubic-bezier(.22,1,.36,1) infinite' } : null}>
                <i className="absolute h-px w-2 bg-white" />{!on && <i className="absolute h-2 w-px bg-white" />}
              </span>
            </div>
            {on && (
              <div className="grid" style={{ animation: 'ggFaq 5s cubic-bezier(.22,1,.36,1) infinite' }}>
                <div className="overflow-hidden"><div className="px-3 pb-2"><i className="block h-1 w-full rounded bg-white/20" /><i className="mt-1 block h-1 w-1/2 rounded bg-white/20" /></div></div>
              </div>
            )}
          </div>
        );
      })}
    </Box>
  );
}

export const golgotaPreviews = {
  'gg-tunnel': Tunnel,
  'gg-dot-field': DotFieldPv,
  'gg-tech-text': TechTextPv,
  'gg-mesh-drift': MeshDrift,
  'gg-beam-footer': BeamFooterPv,
  'gg-inset-panel': InsetPanel,
  'gg-reticle-btn': ReticleBtn,
  'gg-smoke': SmokePv,
  'gg-hide-header': HideHeader,
  'gg-stagger': StaggerPv,
  'gg-fan-cards': FanPv,
  'gg-before-after': BeforeAfterPv,
  'gg-calendar': CalendarPv,
  'gg-ticket': TicketPv,
  'gg-photo-3d': Photo3D,
  'gg-htimeline': HTimeline,
  'gg-strike': StrikePv,
  'gg-faq': FaqPv,
};
