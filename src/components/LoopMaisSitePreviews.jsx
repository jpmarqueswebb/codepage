import React from 'react';

// Prévias leves (CSS/SVG) dos efeitos do site institucional da Loop+ (branco com seções roxas, laranja #fc5304, roxo #2e035d)
const OR = '#fc5304', OL = '#ffb48a', PU = '#2e035d', LN = '#e7e0ef', MU = '#5d5866';
const GOR = 'linear-gradient(100deg,#fc5304,#ff7a33)';
const GPU = 'radial-gradient(120% 90% at 70% 110%,#76058f,#43096a 38%,#220b52 72%,#1a0638)';
const FD = "'Baloo 2',system-ui,sans-serif";
const INF = 'M20 20 C 23.5 14.5, 31 14.5, 31 20 C 31 25.5, 23.5 25.5, 20 20 C 16.5 14.5, 9 14.5, 9 20 C 9 25.5, 16.5 25.5, 20 20';

const CSS = `
@keyframes lsvLoop{0%,30%{offset-distance:0%;offset-rotate:auto 57.5deg}35%{offset-rotate:auto 0deg}60%{offset-rotate:auto 0deg}65%,100%{offset-distance:100%;offset-rotate:auto 57.5deg}}
@keyframes lsvTrail{0%,30%{stroke-dashoffset:1}65%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:1}}
@keyframes lsvFillC{0%,30%{transform:scale(0)}60%,90%{transform:scale(14)}100%{transform:scale(0)}}
@keyframes lsvRoll{0%,62%{transform:translateY(0)}70%{transform:translateY(-.5em) rotateX(80deg);opacity:0}71%{transform:translateY(.5em) rotateX(-80deg);opacity:0}80%,100%{transform:translateY(0);opacity:1}}
@keyframes lsvFlip{0%,60%,100%{transform:rotateX(0)}72%{transform:rotateX(360deg)}}
@keyframes lsvSA{0%,55%,100%{transform:none}70%,80%{transform:translateX(-.18em)}}
@keyframes lsvSB{0%,55%,100%{transform:none}70%,80%{transform:translateX(.18em)}}
@keyframes lsvFill{0%,10%{background-position:0 0}50%,60%{background-position:0 100%}100%{background-position:0 0}}
@keyframes lsvShine{from{background-position:100% 0}to{background-position:-50% 0}}
@keyframes lsvOrbit{from{offset-distance:0%}to{offset-distance:100%}}
@keyframes lsvHide{0%,30%{transform:none}40%,70%{transform:translateY(-100%)}80%,100%{transform:none}}
@keyframes lsvSub{0%,5%{opacity:0;transform:translateY(-4px)}10%,24%{opacity:1;transform:translateY(2px)}28%,100%{opacity:0;transform:translateY(-4px)}}
@keyframes lsvStraight{0%,15%{transform:rotateX(28deg) rotateY(-18deg) rotateZ(6deg) scale(.9)}60%,85%{transform:none}100%{transform:rotateX(28deg) rotateY(-18deg) rotateZ(6deg) scale(.9)}}
@keyframes lsvBob{0%,100%{transform:translate(0,0)}50%{transform:translate(4px,-6px)}}
@keyframes lsvCircle{0%,10%{clip-path:circle(30px at 50% 46%)}70%,90%{clip-path:circle(110px at 50% 46%)}100%{clip-path:circle(30px at 50% 46%)}}
@keyframes lsvRingC{0%,10%{width:80px;height:80px;opacity:1}70%,90%{width:240px;height:240px;opacity:.1}100%{width:80px;height:80px;opacity:1}}
@keyframes lsvSpinY{0%,100%{transform:rotateX(4deg) rotateY(-14deg)}40%,50%{transform:rotateX(4deg) rotateY(166deg)}90%{transform:rotateX(4deg) rotateY(-14deg)}}
@keyframes lsvBrand{0%,33%{background:#fc5304}34%,66%{background:#76058f}67%,100%{background:#0e9f6e}}
@keyframes lsvImg{0%,30%{opacity:1;transform:none}36%,94%{opacity:0;transform:translateY(-8%)}100%{opacity:1}}
@keyframes lsvImg2{0%,30%{opacity:0;transform:translateY(8%)}36%,64%{opacity:1;transform:none}70%,100%{opacity:0;transform:translateY(-8%)}}
@keyframes lsvImg3{0%,64%{opacity:0;transform:translateY(8%)}70%,94%{opacity:1;transform:none}100%{opacity:0}}
@keyframes lsvAcc{0%,30%{grid-template-rows:1fr}36%,100%{grid-template-rows:0fr}}
@keyframes lsvStub{0%,30%{background:transparent}40%,85%{background:#fc5304}95%,100%{background:transparent}}
@keyframes lsvInf{0%,30%{transform:none;color:#fc5304}40%,85%{transform:rotate(-190deg);color:#fff}95%,100%{transform:none;color:#fc5304}}
@keyframes lsvOpen{0%,30%{grid-template-rows:0fr}40%,85%{grid-template-rows:1fr}95%,100%{grid-template-rows:0fr}}
@keyframes lsvBord{0%,30%{border-color:#e7e0ef}40%,85%{border-color:#fc5304}95%,100%{border-color:#e7e0ef}}
@keyframes lsvLift{0%,10%{transform:perspective(600px) rotateX(16deg) scale(.93)}60%,100%{transform:none}}
@keyframes lsvType{0%,20%{width:0}60%,100%{width:15ch}}
@keyframes lsvCmp{0%,100%{left:20%}50%{left:80%}}
@keyframes lsvCmpClip{0%,100%{clip-path:inset(0 0 0 20%)}50%{clip-path:inset(0 0 0 80%)}}
@keyframes lsvGrow{0%,5%{transform:scaleY(0)}30%,100%{transform:scaleY(1)}}
@keyframes lsvZoom{0%,10%{transform:scale(2.4)}70%,100%{transform:scale(1)}}
@keyframes lsvTile{0%,30%{opacity:0}55%,100%{opacity:1}}
@keyframes lsvTile2{0%,55%{opacity:0}80%,100%{opacity:1}}
@keyframes lsvBelt{0%,5%{left:8%}25%,30%{left:36%}50%,55%{left:64%}75%,100%{left:92%}}
@keyframes lsvStamp{0%,24%{content:'Identificar'}25%,49%{content:'Cadastrar'}50%,74%{content:'Publicar'}75%,100%{content:'Acompanhar'}}
@keyframes lsvDraw{0%,5%{stroke-dashoffset:1}80%,100%{stroke-dashoffset:0}}
@keyframes lsvSt1{0%,16%{border-color:#e7e0ef}20%,100%{border-color:#fc5304}}
@keyframes lsvSt2{0%,45%{border-color:#e7e0ef}50%,100%{border-color:#fc5304}}
@keyframes lsvSt3{0%,74%{border-color:#e7e0ef}78%,100%{border-color:#fc5304}}
@keyframes lsvFly{0%,20%{transform:none;opacity:1}50%,100%{transform:translateY(-120%) rotate(-8deg);opacity:0}}
@keyframes lsvFwd{0%,20%{transform:translateY(14px) scale(.95)}50%,100%{transform:none}}
@keyframes lsvColUp{to{transform:translateY(-50%)}}
@keyframes lsvColDn{from{transform:translateY(-50%)}to{transform:translateY(0)}}
@keyframes lsvMarq{to{transform:translateX(-50%)}}
@keyframes lsvHub{0%,30%{transform:translateY(0)}36%,63%{transform:translateY(44px)}70%,100%{transform:translateY(88px)}}
@keyframes lsvGap{0%,10%{--g:6px}60%,100%{--g:22px}}
@keyframes lsvHi{0%,24%{background:linear-gradient(135deg,#fc5304,#ff7a33)}25%,100%{background:rgba(255,255,255,.12)}}
@media (prefers-reduced-motion:reduce){.lsv-pv *{animation:none!important}}
`;

const Box = ({ children, className = '', style }) => (
  <div className={'lsv-pv relative w-full h-44 overflow-hidden rounded-xl border border-black/5 bg-white text-[#1d1d1d] ' + className} style={style}>
    <style>{CSS}</style>
    {children}
  </div>
);
const Purple = ({ children, className = '' }) => <Box className={'text-white ' + className} style={{ background: GPU }}>{children}</Box>;

function InfBtn() {
  return (
    <Box className="grid place-items-center">
      <span className="relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full py-1.5 pl-5 pr-1.5 text-[12px] font-bold text-white" style={{ background: GOR, fontFamily: FD }}>
        <i className="absolute right-[26px] top-1/2 -z-10 -mr-[15px] -mt-[15px] h-[30px] w-[30px] rounded-full" style={{ background: PU, animation: 'lsvFillC 4s cubic-bezier(.22,1,.36,1) infinite' }} />
        Fale com um especialista
        <span className="relative h-10 w-10 rounded-full bg-white" style={{ color: OR }}>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 40 40"><path d={INF} pathLength="1" fill="none" stroke="currentColor" strokeWidth="1.6" opacity=".35" strokeDasharray="1" style={{ animation: 'lsvTrail 4s cubic-bezier(.45,.05,.3,1) infinite' }} /></svg>
          <svg className="absolute left-0 top-0 h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ offsetPath: "path('" + INF + "')", animation: 'lsvLoop 4s cubic-bezier(.45,.05,.3,1) infinite' }}><path d="M2 7h10M8 3l4 4-4 4" /></svg>
        </span>
      </span>
    </Box>
  );
}

function Letters3D() {
  const w = (t, anim, step) => t.split('').map((c, i) => <span key={i} className="inline-block whitespace-pre" style={{ transformOrigin: '50% 60%', animation: anim + ' cubic-bezier(.22,1,.36,1) ' + i * step + 's infinite' }}>{c}</span>);
  return (
    <Box className="grid content-center gap-2 text-center text-[24px] font-bold" style={{ fontFamily: FD }}>
      <div>Benefícios que <span style={{ color: OR }}>{w('giram', 'lsvRoll 4.2s', 0.07)}</span></div>
      <div className="[perspective:400px]">Tudo <span style={{ color: OR }}>{w('virado', 'lsvFlip 4.4s', 0.08)}</span></div>
    </Box>
  );
}

function Split() {
  return (
    <Box className="grid content-center gap-2 text-center text-[22px] font-bold" style={{ fontFamily: FD }}>
      <style>{'.lsv-sp{position:relative;display:inline-block;color:transparent}.lsv-sp::before,.lsv-sp::after{content:attr(data-t);position:absolute;left:0;top:0}.lsv-sp::before{color:#fc5304;clip-path:inset(0 0 50% 0);animation:lsvSA 3.6s cubic-bezier(.22,1,.36,1) infinite}.lsv-sp::after{color:#76058f;clip-path:inset(50% 0 0 0);animation:lsvSB 3.6s cubic-bezier(.22,1,.36,1) infinite}'}</style>
      <div>Uma solução <span className="lsv-sp" data-t="completa">completa</span></div>
      <div>Sem <span className="bg-clip-text" style={{ backgroundImage: 'linear-gradient(to top,#fc5304 50%,#1d1d1d 50%)', backgroundSize: '100% 200%', WebkitTextFillColor: 'transparent', animation: 'lsvFill 4s ease-in-out infinite' }}>planilha</span></div>
      <div>Com <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(100deg,#fc5304 0 38%,#ffd0b5 48%,#fc5304 58% 100%)', backgroundSize: '300% 100%', animation: 'lsvShine 3.6s linear infinite' }}>brilho</span></div>
    </Box>
  );
}

function Orbit() {
  return (
    <Box className="grid place-items-center text-[28px] font-bold" style={{ fontFamily: FD }}>
      <div>Um clube <span className="relative inline-block" style={{ color: OR }}>completo
        <i className="absolute left-0 top-0 h-[.34em] w-[.34em] rounded-full border-[3px]" style={{ borderColor: '#76058f', offsetPath: "path('M -10 21 A 74 23 0 1 0 138 21 A 74 23 0 1 0 -10 21')", animation: 'lsvOrbit 5s linear infinite' }} />
      </span></div>
    </Box>
  );
}

function Header() {
  return (
    <Box style={{ background: '#f7f4fb' }}>
      <div className="absolute inset-x-0 top-0 z-10 flex h-10 items-center justify-between bg-white/95 px-4" style={{ animation: 'lsvHide 6s ease infinite' }}>
        <b className="text-[13px]" style={{ fontFamily: FD, color: PU }}>Loop+</b>
        <div className="relative flex gap-3 text-[9px] font-bold">
          <span>Início</span>
          <span className="relative" style={{ color: '#c24100' }}>Soluções
            <span className="absolute left-0 top-full mt-1 grid w-[96px] gap-0.5 rounded-lg border bg-white p-1 text-[8px] font-normal text-[#1d1d1d]" style={{ borderColor: LN, animation: 'lsvSub 6s ease infinite' }}>
              <span className="rounded px-1.5 py-1 bg-[#f7f4fb]">Clube</span><span className="rounded px-1.5 py-1">Farmácias</span>
            </span>
          </span>
          <span>Contato</span>
        </div>
      </div>
      <div className="grid gap-2 px-5 pt-16">{[0, 1, 2].map((i) => <span key={i} className="h-2 rounded" style={{ background: LN, width: 90 - i * 20 + '%' }} />)}</div>
    </Box>
  );
}

function Hero() {
  return (
    <Box className="grid grid-cols-2 items-center px-4">
      <div><b className="block text-[14px] leading-tight" style={{ fontFamily: FD }}>Benefícios que fazem parte da rotina</b><span className="mt-2 block h-1.5 w-20 rounded" style={{ background: LN }} /></div>
      <div className="relative h-full [perspective:700px]">
        <div className="absolute left-1/2 top-3 h-[140px] w-[70px] -translate-x-1/2 overflow-hidden rounded-[14px] border-[3px] border-[#1d1d1d] bg-white" style={{ animation: 'lsvStraight 5s ease-in-out infinite' }}>
          <div className="h-8" style={{ background: GOR }} />
        </div>
        {[['Clube', 'left-0 top-6'], ['Farmácias', 'right-0 top-14'], ['Convênios', 'left-2 bottom-6']].map(([t, p], i) => (
          <span key={t} className={'absolute z-10 rounded-full border bg-white px-2 py-0.5 text-[8px] font-bold ' + p} style={{ borderColor: LN, fontFamily: FD, animation: 'lsvBob 4s ease-in-out ' + -i + 's infinite' }}><span style={{ color: OR }}>∞</span> {t}</span>
        ))}
      </div>
    </Box>
  );
}

function CircleOpen() {
  return (
    <Box className="grid place-items-center">
      <div className="relative h-[150px] w-[120px]">
        <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(160deg,#ffcfb5,#c084fc 60%,#43096a)', animation: 'lsvCircle 5s ease-in-out infinite' }} />
        {/* anel 10px fora do recorte: mesmo tempo e mesmas etapas da foto */}
        <i className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2" style={{ borderColor: OR, animation: 'lsvRingC 5s ease-in-out infinite' }} />
      </div>
    </Box>
  );
}

function WL() {
  return (
    <Box className="grid grid-cols-[1fr_auto] items-center gap-4 px-5">
      <div className="grid gap-1.5">
        <span className="rounded-md border px-2 py-1 text-[9px]" style={{ borderColor: LN }}>Academia Forte|</span>
        <div className="flex gap-1">{['#fc5304', '#76058f', '#0e9f6e'].map((c) => <i key={c} className="h-4 w-4 rounded-full" style={{ background: c }} />)}</div>
        <span className="font-mono text-[8px]" style={{ color: MU }}>clube.<b className="text-[#1d1d1d]">academiaforte</b>.com.br</span>
      </div>
      <div className="[perspective:600px]">
        <div className="relative h-[130px] w-[66px] [transform-style:preserve-3d]" style={{ animation: 'lsvSpinY 6s ease-in-out infinite' }}>
          <div className="absolute inset-0 overflow-hidden rounded-[12px] border-[3px] border-[#1d1d1d] bg-white [backface-visibility:hidden]"><div className="h-7 p-1 text-[5px] font-bold text-white" style={{ animation: 'lsvBrand 9s steps(1) infinite' }}>ACADEMIA FORTE</div></div>
          <div className="absolute inset-0 grid place-items-center rounded-[12px] border-[3px] border-[#1d1d1d] text-[20px] font-bold text-white [backface-visibility:hidden] [transform:rotateY(180deg)]" style={{ animation: 'lsvBrand 9s steps(1) infinite', fontFamily: FD }}>A</div>
        </div>
      </div>
    </Box>
  );
}

function Features() {
  return (
    <Box className="grid grid-cols-2 items-center gap-3 px-4">
      <div className="grid gap-1">
        {['Cashback', 'Cupons', 'Relatórios'].map((t, i) => (
          <div key={t} className="rounded-lg border px-2 py-1" style={{ borderColor: i === 0 ? OR : 'transparent' }}>
            <b className="text-[10px]" style={{ fontFamily: FD }}>{t}</b>
            {i === 0 && <span className="block text-[7px]" style={{ color: MU }}>Parte do valor volta para o associado.</span>}
          </div>
        ))}
        <div className="mt-1 flex gap-1">{[0, 1, 2].map((i) => <i key={i} className="h-1 flex-1 rounded" style={{ background: i === 0 ? OR : LN }} />)}</div>
      </div>
      <div className="relative h-[130px] overflow-hidden rounded-xl bg-[#f7f4fb]">
        {[['#ffcfb5', 'lsvImg'], ['#c084fc', 'lsvImg2'], ['#86efac', 'lsvImg3']].map(([c, a]) => <i key={a} className="absolute inset-0" style={{ background: 'linear-gradient(160deg,' + c + ',#43096a)', animation: a + ' 6s cubic-bezier(.22,1,.36,1) infinite' }} />)}
      </div>
    </Box>
  );
}

function Coupon() {
  return (
    <Box className="grid content-center gap-2 px-5">
      <div className="rounded-[14px] border-[1.5px] bg-white" style={{ animation: 'lsvBord 5s ease infinite' }}>
        <div className="flex min-h-[44px] items-stretch">
          <b className="flex-1 self-center px-3 text-[10px]" style={{ fontFamily: FD }}>O app pode ter a minha marca?</b>
          <span className="relative grid w-12 place-items-center rounded-r-[12px] border-l-2 border-dashed" style={{ borderColor: LN, animation: 'lsvStub 5s ease infinite' }}>
            <span className="text-[16px]" style={{ animation: 'lsvInf 5s cubic-bezier(.22,1,.36,1) infinite' }}>∞</span>
          </span>
        </div>
        <div className="grid" style={{ animation: 'lsvOpen 5s cubic-bezier(.22,1,.36,1) infinite' }}><div className="overflow-hidden"><p className="px-3 pb-2.5 text-[8px]" style={{ color: MU }}>Sim. Nome, cores, logomarca e domínio da sua empresa.</p></div></div>
      </div>
      <div className="flex min-h-[40px] items-center rounded-[14px] border-[1.5px] px-3 text-[10px] font-bold" style={{ borderColor: LN, fontFamily: FD }}>Quanto tempo leva?</div>
    </Box>
  );
}

function Browser() {
  return (
    <Box className="grid place-items-center px-5" style={{ background: '#f7f4fb' }}>
      <div className="w-full origin-bottom overflow-hidden rounded-xl border bg-white" style={{ borderColor: LN, animation: 'lsvLift 4s cubic-bezier(.22,1,.36,1) infinite alternate' }}>
        <div className="flex gap-1 bg-[#f7f4fb] px-2 pt-1.5 text-[8px] font-bold"><span className="rounded-t-md bg-white px-2 py-1">Clube</span><span className="px-2 py-1" style={{ color: MU }}>Farmácias</span></div>
        <div className="border-b px-2 py-1.5" style={{ borderColor: LN }}><span className="block overflow-hidden whitespace-nowrap rounded-full bg-[#f7f4fb] px-2 py-0.5 font-mono text-[8px]"><span className="inline-block overflow-hidden align-bottom" style={{ animation: 'lsvType 4s steps(15) infinite alternate' }}>clube.loop.com.br</span></span></div>
        <div className="grid gap-1 p-2.5">{[80, 60, 70].map((w, i) => <span key={i} className="h-2 rounded" style={{ width: w + '%', background: i ? LN : OR }} />)}</div>
      </div>
    </Box>
  );
}

function Compare() {
  return (
    <Box>
      <div className="absolute inset-0 grid place-items-center bg-[#e5e5e5] text-[11px] font-bold text-[#777]">Genérico</div>
      <div className="absolute inset-0 grid place-items-center text-[11px] font-bold text-white" style={{ background: GOR, animation: 'lsvCmpClip 5s ease-in-out infinite' }}>Com a sua marca</div>
      <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ animation: 'lsvCmp 5s ease-in-out infinite' }}>
        <span className="absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[12px]" style={{ color: OR }}>⇆</span>
      </div>
    </Box>
  );
}

function Bars() {
  const H = [0.55, 0.18, 0.82, 0.3, 0.12, 0.66, 0.24, 0.9, 0.36, 0.15, 0.7, 0.42];
  return (
    <Purple className="flex items-end gap-1 px-5 pb-4 pt-6">
      {H.map((h, k) => (
        <div key={k} className="flex h-full flex-1 flex-col justify-end gap-0.5">
          <span className="rounded-sm bg-white/25" style={{ height: h * 45 + '%' }} />
          <span className="h-[40%] origin-bottom rounded-sm" style={{ background: 'linear-gradient(#ff7a33,#fc5304)', animation: 'lsvGrow 6s ease ' + k * 0.3 + 's infinite' }} />
          <small className="text-center text-[7px] font-bold" style={{ color: OL }}>{'JFMAMJJASOND'[k]}</small>
        </div>
      ))}
    </Purple>
  );
}

function Zoom() {
  return (
    <Purple className="grid place-items-center">
      <div className="grid h-[200px] w-[200px] grid-cols-5 grid-rows-5 gap-1.5 p-2" style={{ animation: 'lsvZoom 5s ease-in-out infinite alternate' }}>
        {Array.from({ length: 25 }, (_, i) => {
          const r = Math.floor(i / 5), c = i % 5, ring = Math.max(Math.abs(r - 2), Math.abs(c - 2));
          return <i key={i} className="rounded-md" style={{ background: ring ? '#fff' : GOR, animation: ring ? (ring === 1 ? 'lsvTile' : 'lsvTile2') + ' 5s ease-in-out infinite alternate' : undefined }} />;
        })}
      </div>
    </Purple>
  );
}

function Belt() {
  return (
    <Box className="px-4">
      <style>{'.lsv-stamp::after{content:"Identificar";animation:lsvStamp 6s steps(1) infinite}'}</style>
      <div className="absolute inset-x-[8%] top-[86px] h-2 rounded-full" style={{ background: 'repeating-linear-gradient(90deg,#e7e0ef 0 10px,#f7f4fb 10px 20px)' }} />
      <div className="absolute inset-x-0 top-[104px] grid grid-cols-4 text-center text-[8px] font-bold" style={{ fontFamily: FD }}>
        {['Identificar', 'Cadastrar', 'Publicar', 'Acompanhar'].map((s) => <span key={s} className="flex flex-col items-center gap-1"><i className="h-2.5 w-2.5 rounded-full" style={{ background: OR }} />{s}</span>)}
      </div>
      <div className="absolute top-8 w-[86px] -translate-x-1/2 rounded-lg border bg-white p-2" style={{ borderColor: LN, animation: 'lsvBelt 6s ease-in-out infinite' }}>
        <b className="text-[9px]" style={{ fontFamily: FD }}>Convênio</b>
        <span className="lsv-stamp absolute -right-2 -top-2 -rotate-[8deg] rounded border-2 bg-white px-1 text-[6px] font-bold uppercase" style={{ borderColor: OR, color: '#c24100' }} />
      </div>
    </Box>
  );
}

function Trail() {
  return (
    <Box>
      <svg viewBox="0 0 300 176" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M14 160 C 60 160, 66 126, 100 114 S 156 88, 180 72 S 246 34, 288 22" fill="none" stroke={LN} strokeWidth="2" strokeDasharray="4 5" />
        <path d="M14 160 C 60 160, 66 126, 100 114 S 156 88, 180 72 S 246 34, 288 22" fill="none" stroke={OR} strokeWidth="2" strokeLinecap="round" pathLength="1" strokeDasharray="1" style={{ animation: 'lsvDraw 5s ease infinite' }} />
      </svg>
      {[['Conversa', 'left-[4%] top-[96px]', 'lsvSt1'], ['Proposta', 'left-[36%] top-[54px]', 'lsvSt2'], ['Lançamento', 'left-[66%] top-[12px]', 'lsvSt3']].map(([t, p, a], i) => (
        <div key={t} className={'absolute w-[86px] rounded-lg border-[1.5px] bg-white p-1.5 ' + p} style={{ animation: a + ' 5s ease infinite' }}>
          <span className="grid h-4 w-4 place-items-center rounded-full text-[7px] font-bold text-white" style={{ background: OR }}>{i + 1}</span>
          <b className="text-[9px]" style={{ fontFamily: FD }}>{t}</b>
        </div>
      ))}
    </Box>
  );
}

function VStack() {
  return (
    <Box className="grid place-items-center">
      <div className="relative h-[110px] w-[200px]">
        <div className="absolute inset-0 rounded-2xl p-3 text-[10px] font-bold text-white" style={{ background: OR, transform: 'translateY(28px) scale(.9)', fontFamily: FD }}>Missão</div>
        <div className="absolute inset-0 rounded-2xl p-3 text-[12px] font-bold text-white" style={{ background: GPU, fontFamily: FD, animation: 'lsvFwd 4s cubic-bezier(.22,1,.36,1) infinite' }}>Visão<span className="mt-1 block text-[8px] font-normal">Ser o benefício que o colaborador usa.</span></div>
        <div className="absolute inset-0 origin-[50%_120%] rounded-2xl border bg-white p-3 text-[12px] font-bold" style={{ borderColor: LN, color: PU, fontFamily: FD, animation: 'lsvFly 4s cubic-bezier(.22,1,.36,1) infinite' }}>Valores<span className="mt-1 block text-[8px] font-normal">Gente primeiro, sempre.</span></div>
      </div>
    </Box>
  );
}

function Wall() {
  const col = (start, anim) => (
    <div className="h-full overflow-hidden">
      <div className="grid gap-1.5" style={{ animation: anim }}>
        {[0, 1, 2, 3, 0, 1, 2, 3].map((k, i) => <i key={i} className="grid h-10 place-items-center rounded-lg border bg-white text-[8px] font-bold not-italic" style={{ borderColor: LN, color: MU }}>MARCA {start + k}</i>)}
      </div>
    </div>
  );
  return (
    <Box className="grid grid-cols-3 gap-2 p-2" style={{ WebkitMaskImage: 'linear-gradient(transparent,#000 15%,#000 85%,transparent)', maskImage: 'linear-gradient(transparent,#000 15%,#000 85%,transparent)' }}>
      {col(1, 'lsvColUp 8s linear infinite')}{col(5, 'lsvColDn 6s linear infinite')}{col(9, 'lsvColUp 10s linear infinite')}
    </Box>
  );
}

function Cylinder() {
  return (
    <Box className="grid content-center [perspective:500px]">
      <div className="flex w-max items-center gap-6" style={{ animation: 'lsvMarq 10s linear infinite' }}>
        {[0, 1].map((k) => ['ACME', 'NOVA', 'VITA', 'ORBE', 'PRIMA', 'ZUL'].map((t, i) => {
          const d = (i - 2.5) / 3;
          return <b key={k + t} className="text-[16px] tracking-wider" style={{ color: MU, transform: 'rotateY(' + -d * 38 + 'deg) scale(' + (1 - d * d * 0.18) + ')', fontFamily: FD }}>{t}</b>;
        }))}
      </div>
    </Box>
  );
}

function Hub() {
  return (
    <Box className="grid place-items-center px-6">
      <div className="relative grid w-full gap-1 rounded-2xl border bg-white p-1.5" style={{ borderColor: LN }}>
        <i className="absolute inset-x-1.5 top-1.5 h-10 rounded-xl" style={{ background: '#fff1e9', animation: 'lsvHub 4.5s cubic-bezier(.22,1,.36,1) infinite' }} />
        {['Comercial', 'Suporte', 'Parcerias'].map((t) => (
          <div key={t} className="relative flex h-10 items-center justify-between px-3">
            <b className="text-[11px]" style={{ fontFamily: FD }}>{t}</b><span style={{ color: OR }}>→</span>
          </div>
        ))}
      </div>
    </Box>
  );
}

function Footer() {
  return (
    <Purple>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-6 w-full"><path d="M0 0 H1440 V20 C 1200 60, 960 0, 720 26 S 240 56, 0 22 Z" fill="#fff" /></svg>
      <svg viewBox="0 0 1000 300" className="absolute left-1/2 top-[56%] w-[280px] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <path d="M500 150 C 420 40, 160 40, 160 150 C 160 260, 420 260, 500 150 C 580 40, 840 40, 840 150 C 840 260, 580 260, 500 150" fill="none" stroke="rgba(255,180,138,.6)" strokeWidth="5" pathLength="1" strokeDasharray="1" style={{ animation: 'lsvDraw 4s cubic-bezier(.22,1,.36,1) infinite alternate' }} />
      </svg>
      <div className="relative grid grid-cols-3 gap-3 px-5 pt-12 text-[8px]">{['Soluções', 'Empresa', 'Contato'].map((t) => <div key={t}><b className="text-[9px]" style={{ color: OL, fontFamily: FD }}>{t}</b><span className="mt-1 block h-1.5 w-14 rounded bg-white/20" /><span className="mt-1 block h-1.5 w-10 rounded bg-white/20" /></div>)}</div>
    </Purple>
  );
}

function Layers() {
  return (
    <Purple className="grid grid-cols-2 items-center gap-2 px-4">
      <div className="relative mx-auto h-[120px] w-[100px] [perspective:600px]">
        <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(58deg)_rotateZ(-38deg)]">
          {[0, 1, 2, 3].map((k) => (
            <div key={k} className="absolute inset-0 rounded-xl border border-white/25" style={{ transform: 'translateZ(' + (3 - k) * 16 + 'px)', background: 'rgba(255,255,255,.12)', animation: 'lsvHi 6s steps(1) ' + -(k * 1.5) + 's infinite' }} />
          ))}
        </div>
      </div>
      <div className="grid gap-1">{['App', 'Gestão', 'Integrações', 'Segurança'].map((t) => <span key={t} className="rounded-lg border border-white/15 px-2 py-1 text-[9px] font-bold" style={{ fontFamily: FD }}>{t}</span>)}</div>
    </Purple>
  );
}

export const loopMaisSitePreviews = {
  'lmsi-inf-btn': InfBtn,
  'lmsi-letters3d': Letters3D,
  'lmsi-split': Split,
  'lmsi-orbit': Orbit,
  'lmsi-header': Header,
  'lmsi-hero': Hero,
  'lmsi-circle': CircleOpen,
  'lmsi-wl': WL,
  'lmsi-features': Features,
  'lmsi-coupon': Coupon,
  'lmsi-browser': Browser,
  'lmsi-compare': Compare,
  'lmsi-bars': Bars,
  'lmsi-zoom': Zoom,
  'lmsi-belt': Belt,
  'lmsi-trail': Trail,
  'lmsi-vstack': VStack,
  'lmsi-wall': Wall,
  'lmsi-cylinder': Cylinder,
  'lmsi-hub': Hub,
  'lmsi-footer': Footer,
  'lmsi-layers': Layers,
};
