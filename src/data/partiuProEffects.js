// Efeitos extraídos da página de vendas "Black do Partiu | Partiu Pro" (repo partiu-empreender/paginas-partiu-pro)
// Paleta: roxo #7D0DEF / roxo escuro #4C0790 / verde #BEF21E / fundo #F2F2F2 / texto #1A1A1A / cinza #5A5566 / lilás #EDE3FB
// Curva padrão da página: cubic-bezier(.22,1,.36,1). Fonte original: Hagrid (comercial), troque pela fonte do projeto.
const B = { client: "Partiu Pro", badge: "Partiu Pro" };

export const partiuProEffects = [
  // 1 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-words-rise-underline",
    name: "Título com Palavras que Sobem e Sublinhado Verde",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "As palavras do trecho em destaque sobem de dentro de uma máscara uma a uma, um sublinhado verde grosso se desenha embaixo de cada palavra e, depois de alguns segundos, tudo sai por cima e recomeça. Passa a sensação de manchete viva, sem nunca ficar parada.",
    tags: ["H1", "Split Words", "Loop", "Underline", "IntersectionObserver"],
    defaultSection: "Hero Principal",
    previewType: "pp-words-rise",
    tech: ["Tailwind CSS", "React", "CSS Keyframes", "IntersectionObserver"],
    frameworks: {
      react: `import { Fragment, useEffect, useRef, useState } from 'react';

// Palavras sobem da máscara, sublinhado verde entra da esquerda e sai pela direita; ciclo de 7s em loop
const CSS =
  '@keyframes pp-wrise{0%{transform:translateY(108%)}9%,86%{transform:translateY(0)}95%,100%{transform:translateY(-108%)}}' +
  '@keyframes pp-uline{0%,6%{transform:scaleX(0);transform-origin:0 50%}18%,80%{transform:scaleX(1);transform-origin:0 50%}81%{transform:scaleX(1);transform-origin:100% 50%}92%,100%{transform:scaleX(0);transform-origin:100% 50%}}' +
  '.pp-w{display:inline-block;position:relative;clip-path:inset(-.12em -.4em 0 -.1em);padding-bottom:.16em;margin-bottom:-.16em;vertical-align:bottom}' +
  '.pp-w>span{display:inline-block;color:#7D0DEF}' +
  '.pp-w::after{content:"";position:absolute;left:0;right:-.32em;bottom:.02em;height:.11em;border-radius:6px;background:#BEF21E}' +
  '.pp-w:last-child::after{right:0}' +
  '.pp-words.is-run .pp-w>span{animation:pp-wrise 7s cubic-bezier(.22,1,.36,1) infinite both;animation-delay:calc(var(--i) * .08s)}' +
  '.pp-words.is-run .pp-w::after{animation:pp-uline 7s cubic-bezier(.22,1,.36,1) infinite both;animation-delay:calc(.25s + var(--i) * .1s)}' +
  '@media (prefers-reduced-motion:reduce){.pp-words.is-run .pp-w>span,.pp-words.is-run .pp-w::after{animation:none}}';

export function WordsRiseHeadline({
  before = 'Saiba, todos os dias, ',
  highlight = 'qual é o próximo passo',
  after = ' para fazer seu negócio avançar.',
}) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    // só anima com o trecho na tela (economiza CPU e sempre recomeça do início)
    const io = new IntersectionObserver(([en]) => setRun(en.isIntersecting), { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const words = highlight.trim().split(' ');
  return (
    <h1 className="max-w-[600px] text-[32px] font-bold leading-[1.17] tracking-[-0.01em] text-[#1A1A1A] [text-wrap:balance] md:text-[44px]">
      <style>{CSS}</style>
      {before}
      <span ref={ref} className={'pp-words' + (run ? ' is-run' : '')}>
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="pp-w" style={{ '--i': i }}><span>{w}</span></span>
            {i < words.length - 1 ? ' ' : ''}
          </Fragment>
        ))}
      </span>
      {after}
    </h1>
  );
}`,
      tailwind: `<h1 class="max-w-[600px] text-[32px] md:text-[44px] font-bold leading-[1.17] tracking-[-0.01em] text-[#1A1A1A] [text-wrap:balance]">
  Saiba, todos os dias, <span class="pp-words" data-words>qual é o próximo passo</span> para fazer seu negócio avançar.
</h1>
<style>
  @keyframes pp-wrise{0%{transform:translateY(108%)}9%,86%{transform:translateY(0)}95%,100%{transform:translateY(-108%)}}
  @keyframes pp-uline{0%,6%{transform:scaleX(0);transform-origin:0 50%}18%,80%{transform:scaleX(1);transform-origin:0 50%}81%{transform:scaleX(1);transform-origin:100% 50%}92%,100%{transform:scaleX(0);transform-origin:100% 50%}}
  .pp-w{display:inline-block;position:relative;clip-path:inset(-.12em -.4em 0 -.1em);padding-bottom:.16em;margin-bottom:-.16em;vertical-align:bottom}
  .pp-w>span{display:inline-block;color:#7D0DEF}
  .pp-w::after{content:"";position:absolute;left:0;right:-.32em;bottom:.02em;height:.11em;border-radius:6px;background:#BEF21E}
  .pp-w:last-child::after{right:0}
  .pp-words.is-run .pp-w>span{animation:pp-wrise 7s cubic-bezier(.22,1,.36,1) infinite both;animation-delay:calc(var(--i) * .08s)}
  .pp-words.is-run .pp-w::after{animation:pp-uline 7s cubic-bezier(.22,1,.36,1) infinite both;animation-delay:calc(.25s + var(--i) * .1s)}
  @media (prefers-reduced-motion:reduce){.pp-words.is-run .pp-w>span,.pp-words.is-run .pp-w::after{animation:none}}
</style>
<script>
  document.querySelectorAll('[data-words]').forEach(function (el) {
    var words = el.textContent.trim().split(' '); el.textContent = '';
    words.forEach(function (wd, i) {
      var w = document.createElement('span'); w.className = 'pp-w'; w.style.setProperty('--i', i);
      var s = document.createElement('span'); s.textContent = wd; w.appendChild(s); el.appendChild(w);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    new IntersectionObserver(function (es) { el.classList.toggle('is-run', es[0].isIntersecting); }, { threshold: 0.2 }).observe(el);
  });
</script>`,
    },
  },

  // 2 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-hand-drawn-circle",
    name: "Círculo Desenhado à Mão em Volta da Palavra",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "Um traço verde, irregular como caneta, contorna o trecho em destaque: se desenha, segura alguns segundos e se apaga seguindo o mesmo sentido, em loop. Dá um ar de anotação feita à mão sobre a oferta, humano e chamativo ao mesmo tempo.",
    tags: ["SVG", "Stroke Dash", "pathLength", "Hand Drawn", "Loop"],
    defaultSection: "Oferta",
    previewType: "pp-hand-circle",
    tech: ["Tailwind CSS", "React", "SVG", "CSS Keyframes"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

// pathLength="1" deixa o dash independente do tamanho: 0 = desenhado, 1.01 = apagado, -1.01 = apagado pelo outro lado
const CSS =
  '.pp-circ path{fill:none;stroke:#BEF21E;stroke-width:4;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.01}' +
  '.pp-circ.is-run path{animation:pp-circ 5s cubic-bezier(.22,1,.36,1) infinite}' +
  '@keyframes pp-circ{0%{stroke-dashoffset:1.01}32%,74%{stroke-dashoffset:0}100%{stroke-dashoffset:-1.01}}' +
  '@media (prefers-reduced-motion:reduce){.pp-circ path{animation:none!important;stroke-dashoffset:0}}';

const D = 'M168 9C130 1 50 2 18 16C-4 26 4 50 50 56C100 62 176 56 194 38C210 22 182 6 120 5';

export function HandCircle({ children = 'Aluna Fundadora.' }) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([en]) => setRun(en.isIntersecting), { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <span ref={ref} className={'pp-circ relative inline-block whitespace-nowrap text-[#7D0DEF]' + (run ? ' is-run' : '')}>
      <style>{CSS}</style>
      {children}
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true"
        className="pointer-events-none absolute left-[-9%] top-[-26%] h-[150%] w-[118%] overflow-visible">
        <path pathLength="1" d={D} />
      </svg>
    </span>
  );
}

// Uso: <h2 className="text-center text-[34px] font-bold">Garanta sua entrada como <HandCircle>Aluna Fundadora.</HandCircle></h2>`,
      tailwind: `<h2 class="mx-auto max-w-[26ch] text-center text-[34px] font-bold leading-[1.18] text-[#1A1A1A]">
  Garanta sua entrada como
  <span class="pp-circ relative inline-block whitespace-nowrap text-[#7D0DEF]">Aluna Fundadora.
    <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true" class="pointer-events-none absolute left-[-9%] top-[-26%] h-[150%] w-[118%] overflow-visible">
      <path pathLength="1" d="M168 9C130 1 50 2 18 16C-4 26 4 50 50 56C100 62 176 56 194 38C210 22 182 6 120 5"/>
    </svg>
  </span>
</h2>
<style>
  .pp-circ path{fill:none;stroke:#BEF21E;stroke-width:4;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.01}
  .pp-circ.is-run path{animation:pp-circ 5s cubic-bezier(.22,1,.36,1) infinite}
  @keyframes pp-circ{0%{stroke-dashoffset:1.01}32%,74%{stroke-dashoffset:0}100%{stroke-dashoffset:-1.01}}
  @media (prefers-reduced-motion:reduce){.pp-circ path{animation:none!important;stroke-dashoffset:0}}
</style>
<script>
  document.querySelectorAll('.pp-circ').forEach(function (el) {
    new IntersectionObserver(function (es) { el.classList.toggle('is-run', es[0].isIntersecting); }, { threshold: 0.2 }).observe(el);
  });
</script>`,
    },
  },

  // 3 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-highlight-kit",
    name: "Kit de Destaques em Loop (Marca-texto, Carimbo, Riscado e +5)",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "Oito jeitos de destacar uma frase estratégica, todos em loop contínuo enquanto o trecho está na tela: marca-texto verde, sublinhado que entra e sai, riscado, preenchimento que varre, desfoque que clareia, salto, carimbo e texto que sobe da máscara. Cada título da página ganha um destaque diferente sem perder a unidade.",
    tags: ["Highlight", "Marker", "Stamp", "Strike", "Text Fill", "Loop"],
    defaultSection: "Títulos de Seção",
    previewType: "pp-highlight-kit",
    tech: ["Tailwind CSS", "React", "CSS Keyframes", "background-clip:text"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

// Um componente, oito variantes. Só roda com o trecho visível (classe is-run).
const E = 'cubic-bezier(.22,1,.36,1)';
const CSS =
  // marca-texto: faixa verde que cresce da esquerda e sai pela direita
  '.pp-hl--mark{background-image:linear-gradient(#BEF21E,#BEF21E);background-repeat:no-repeat;background-size:100% 42%;background-position:0 88%;padding:0 2px}' +
  '.pp-hl--mark.is-run{animation:pp-mark 5s ' + E + ' infinite}' +
  '@keyframes pp-mark{0%{background-size:0 42%;background-position:0 88%}22%,74%{background-size:100% 42%;background-position:0 88%}75%{background-size:100% 42%;background-position:100% 88%}100%{background-size:0 42%;background-position:100% 88%}}' +
  // sublinhado roxo que entra e sai
  '.pp-hl--line{background-image:linear-gradient(#7D0DEF,#7D0DEF);background-repeat:no-repeat;background-size:100% 4px;background-position:0 100%;padding-bottom:4px;color:#4C0790}' +
  '.pp-hl--line.is-run{animation:pp-line 4.8s ' + E + ' infinite}' +
  '@keyframes pp-line{0%{background-size:0 4px;background-position:0 100%}22%,72%{background-size:100% 4px;background-position:0 100%}73%{background-size:100% 4px;background-position:100% 100%}100%{background-size:0 4px;background-position:100% 100%}}' +
  // riscado verde
  '.pp-hl--strike{position:relative;display:inline-block}' +
  '.pp-hl--strike::after{content:"";position:absolute;left:-2%;right:-2%;top:54%;height:5px;border-radius:4px;background:#BEF21E}' +
  '.pp-hl--strike.is-run::after{animation:pp-uline 4.6s ' + E + ' infinite}' +
  '@keyframes pp-uline{0%,6%{transform:scaleX(0);transform-origin:0 50%}18%,80%{transform:scaleX(1);transform-origin:0 50%}81%{transform:scaleX(1);transform-origin:100% 50%}92%,100%{transform:scaleX(0);transform-origin:100% 50%}}' +
  // preenchimento verde que varre o texto (para fundo escuro)
  '.pp-hl--fill{background:linear-gradient(90deg,rgba(255,255,255,.5) 33.33%,#BEF21E 33.33% 66.66%,rgba(255,255,255,.5) 66.66%);background-size:300% 100%;background-position:50% 0;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}' +
  '.pp-hl--fill.is-run{animation:pp-fill 5.5s ' + E + ' infinite}' +
  '@keyframes pp-fill{0%{background-position:100% 0}25%,78%{background-position:50% 0}100%{background-position:0 0}}' +
  // desfoque que clareia
  '.pp-hl--clear{display:inline-block;color:#7D0DEF}' +
  '.pp-hl--clear.is-run{animation:pp-clear 6s ease-in-out infinite}' +
  '@keyframes pp-clear{0%,100%{filter:blur(7px);opacity:.3}20%,80%{filter:blur(0);opacity:1}}' +
  // salto
  '.pp-hl--pop{display:inline-block;color:#BEF21E}' +
  '.pp-hl--pop.is-run{animation:pp-pop 3.6s ' + E + ' infinite}' +
  '@keyframes pp-pop{0%,58%,100%{transform:none}66%{transform:scale(1.16) rotate(-4deg)}74%{transform:scale(.96) rotate(1deg)}82%{transform:scale(1.04)}}' +
  // carimbo
  '.pp-hl--stamp{display:inline-block;padding:0 14px;border-radius:14px;background:#BEF21E;color:#4C0790;transform:rotate(-3deg)}' +
  '.pp-hl--stamp.is-run{animation:pp-stamp 5s cubic-bezier(.34,1.56,.64,1) infinite}' +
  '@keyframes pp-stamp{0%{transform:scale(1.9) rotate(-14deg);opacity:0}10%{transform:scale(1) rotate(-3deg);opacity:1}14%{transform:scale(1.07) rotate(-3deg)}18%,84%{transform:rotate(-3deg);opacity:1}94%,100%{transform:scale(.85) rotate(5deg);opacity:0}}' +
  // sobe de dentro da máscara
  '.pp-hl--rise{display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.1em;margin-bottom:-.1em}' +
  '.pp-hl--rise>span{display:inline-block;color:#7D0DEF}' +
  '.pp-hl--rise.is-run>span{animation:pp-wrise 6s ' + E + ' infinite both}' +
  '@keyframes pp-wrise{0%{transform:translateY(108%)}9%,86%{transform:translateY(0)}95%,100%{transform:translateY(-108%)}}' +
  '@media (prefers-reduced-motion:reduce){.pp-hl,.pp-hl *,.pp-hl::after{animation:none!important}}';

export function Highlight({ variant = 'mark', children, delay = 0 }) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([en]) => setRun(en.isIntersecting), { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const cls = 'pp-hl pp-hl--' + variant + (run ? ' is-run' : '');
  return (
    <span ref={ref} className={cls} style={delay ? { animationDelay: delay + 's' } : undefined}>
      <style>{CSS}</style>
      {variant === 'rise' ? <span>{children}</span> : children}
    </span>
  );
}

// Demonstração com as 8 variantes
export function HighlightKitDemo() {
  const h = 'text-[30px] font-bold leading-[1.2] text-[#1A1A1A]';
  return (
    <div className="grid gap-8 bg-[#F2F2F2] p-10">
      <h2 className={h}>Precisa saber qual é o <Highlight variant="mark">próximo passo.</Highlight></h2>
      <h2 className={h}>Veja tudo o que você leva <Highlight variant="line">nesta Black.</Highlight></h2>
      <h2 className={h}>Tanta coisa para fazer. <Highlight variant="rise">Por onde você começa?</Highlight></h2>
      <h2 className={h}>Decisões <Highlight variant="clear">com mais clareza.</Highlight></h2>
      <div className="grid gap-8 rounded-3xl bg-[#4C0790] p-8 text-white">
        <h2 className="text-[30px] font-bold">Você começa agora, <Highlight variant="stamp">em novembro.</Highlight></h2>
        <h2 className="text-[30px] font-bold">Faça parte de <Highlight variant="pop">algo ainda maior.</Highlight></h2>
        <h2 className="text-[30px] font-bold">Direção e <Highlight variant="fill">acompanhamento para continuar.</Highlight></h2>
        <h2 className="text-[30px] font-bold">Você não precisa resolver <Highlight variant="strike">tudo hoje.</Highlight></h2>
      </div>
    </div>
  );
}`,
      tailwind: `<div class="grid gap-8 bg-[#F2F2F2] p-10 text-[30px] font-bold leading-[1.2] text-[#1A1A1A]">
  <h2>Precisa saber qual é o <span class="pp-hl pp-hl--mark">próximo passo.</span></h2>
  <h2>Veja tudo o que você leva <span class="pp-hl pp-hl--line">nesta Black.</span></h2>
  <h2>Tanta coisa para fazer. <span class="pp-hl pp-hl--rise"><span>Por onde você começa?</span></span></h2>
  <h2>Decisões <span class="pp-hl pp-hl--clear">com mais clareza.</span></h2>
  <div class="grid gap-8 rounded-3xl bg-[#4C0790] p-8 text-white">
    <h2>Você começa agora, <span class="pp-hl pp-hl--stamp">em novembro.</span></h2>
    <h2>Faça parte de <span class="pp-hl pp-hl--pop">algo ainda maior.</span></h2>
    <h2>Direção e <span class="pp-hl pp-hl--fill">acompanhamento para continuar.</span></h2>
    <h2>Você não precisa resolver <span class="pp-hl pp-hl--strike">tudo hoje.</span></h2>
  </div>
</div>
<style>
  .pp-hl--mark{background-image:linear-gradient(#BEF21E,#BEF21E);background-repeat:no-repeat;background-size:100% 42%;background-position:0 88%;padding:0 2px}
  .pp-hl--mark.is-run{animation:pp-mark 5s cubic-bezier(.22,1,.36,1) infinite}
  @keyframes pp-mark{0%{background-size:0 42%;background-position:0 88%}22%,74%{background-size:100% 42%;background-position:0 88%}75%{background-size:100% 42%;background-position:100% 88%}100%{background-size:0 42%;background-position:100% 88%}}
  .pp-hl--line{background-image:linear-gradient(#7D0DEF,#7D0DEF);background-repeat:no-repeat;background-size:100% 4px;background-position:0 100%;padding-bottom:4px;color:#4C0790}
  .pp-hl--line.is-run{animation:pp-line 4.8s cubic-bezier(.22,1,.36,1) infinite}
  @keyframes pp-line{0%{background-size:0 4px;background-position:0 100%}22%,72%{background-size:100% 4px;background-position:0 100%}73%{background-size:100% 4px;background-position:100% 100%}100%{background-size:0 4px;background-position:100% 100%}}
  .pp-hl--strike{position:relative;display:inline-block}
  .pp-hl--strike::after{content:"";position:absolute;left:-2%;right:-2%;top:54%;height:5px;border-radius:4px;background:#BEF21E}
  .pp-hl--strike.is-run::after{animation:pp-uline 4.6s cubic-bezier(.22,1,.36,1) infinite}
  @keyframes pp-uline{0%,6%{transform:scaleX(0);transform-origin:0 50%}18%,80%{transform:scaleX(1);transform-origin:0 50%}81%{transform:scaleX(1);transform-origin:100% 50%}92%,100%{transform:scaleX(0);transform-origin:100% 50%}}
  .pp-hl--fill{background:linear-gradient(90deg,rgba(255,255,255,.5) 33.33%,#BEF21E 33.33% 66.66%,rgba(255,255,255,.5) 66.66%);background-size:300% 100%;background-position:50% 0;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
  .pp-hl--fill.is-run{animation:pp-fill 5.5s cubic-bezier(.22,1,.36,1) infinite}
  @keyframes pp-fill{0%{background-position:100% 0}25%,78%{background-position:50% 0}100%{background-position:0 0}}
  .pp-hl--clear{display:inline-block;color:#7D0DEF}
  .pp-hl--clear.is-run{animation:pp-clear 6s ease-in-out infinite}
  @keyframes pp-clear{0%,100%{filter:blur(7px);opacity:.3}20%,80%{filter:blur(0);opacity:1}}
  .pp-hl--pop{display:inline-block;color:#BEF21E}
  .pp-hl--pop.is-run{animation:pp-pop 3.6s cubic-bezier(.22,1,.36,1) infinite}
  @keyframes pp-pop{0%,58%,100%{transform:none}66%{transform:scale(1.16) rotate(-4deg)}74%{transform:scale(.96) rotate(1deg)}82%{transform:scale(1.04)}}
  .pp-hl--stamp{display:inline-block;padding:0 14px;border-radius:14px;background:#BEF21E;color:#4C0790;transform:rotate(-3deg)}
  .pp-hl--stamp.is-run{animation:pp-stamp 5s cubic-bezier(.34,1.56,.64,1) infinite}
  @keyframes pp-stamp{0%{transform:scale(1.9) rotate(-14deg);opacity:0}10%{transform:scale(1) rotate(-3deg);opacity:1}14%{transform:scale(1.07) rotate(-3deg)}18%,84%{transform:rotate(-3deg);opacity:1}94%,100%{transform:scale(.85) rotate(5deg);opacity:0}}
  .pp-hl--rise{display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.1em;margin-bottom:-.1em}
  .pp-hl--rise>span{display:inline-block;color:#7D0DEF}
  .pp-hl--rise.is-run>span{animation:pp-wrise 6s cubic-bezier(.22,1,.36,1) infinite both}
  @keyframes pp-wrise{0%{transform:translateY(108%)}9%,86%{transform:translateY(0)}95%,100%{transform:translateY(-108%)}}
  @media (prefers-reduced-motion:reduce){.pp-hl,.pp-hl *,.pp-hl::after{animation:none!important}}
</style>
<script>
  var ppIo = new IntersectionObserver(function (es) {
    es.forEach(function (en) { en.target.classList.toggle('is-run', en.isIntersecting); });
  }, { threshold: 0.2 });
  document.querySelectorAll('.pp-hl').forEach(function (el) { ppIo.observe(el); });
</script>`,
    },
  },

  // 4 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-letters-wave",
    name: "Onda de Letras em Sequência",
    category: "textos",
    categoryLabel: "Títulos & Textos",
    description: "Cada letra do trecho pula um pouco e escurece, uma depois da outra, formando uma onda que atravessa a frase e recomeça. As letras ficam agrupadas por palavra, então a quebra de linha continua natural e o leitor de tela lê a frase inteira.",
    tags: ["Split Letters", "Wave", "Stagger", "Loop", "a11y"],
    defaultSection: "Títulos de Seção",
    previewType: "pp-letters-wave",
    tech: ["Tailwind CSS", "React", "CSS Keyframes"],
    frameworks: {
      react: `import { Fragment, useEffect, useRef, useState } from 'react';

const CSS =
  '.pp-lw .pp-l{display:inline-block}' +
  '.pp-lw.is-run .pp-l{animation:pp-ola 3.8s cubic-bezier(.22,1,.36,1) infinite;animation-delay:calc(var(--i) * 45ms)}' +
  '@keyframes pp-ola{0%,28%,100%{transform:translateY(0);color:#7D0DEF}11%{transform:translateY(-.24em);color:#4C0790}}' +
  '@media (prefers-reduced-motion:reduce){.pp-lw .pp-l{animation:none!important}}';

export function LettersWave({ text = 'com acompanhamento para continuar.' }) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([en]) => setRun(en.isIntersecting), { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const words = text.split(' ');
  // índice global da 1ª letra de cada palavra (o espaço conta como um passo da onda)
  const starts = words.map((_, wi) => words.slice(0, wi).reduce((s, w) => s + w.length + 1, 0));
  return (
    <span ref={ref} aria-label={text} className={'pp-lw text-[#7D0DEF]' + (run ? ' is-run' : '')}>
      <style>{CSS}</style>
      {words.map((wd, wi) => (
        <Fragment key={wi}>
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            {wd.split('').map((ch, ci) => (
              <span key={ci} className="pp-l" style={{ '--i': starts[wi] + ci }}>{ch}</span>
            ))}
          </span>
          {wi < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </span>
  );
}

// Uso: <h2 className="text-[34px] font-bold">Um caminho para seguir, <LettersWave text="com acompanhamento para continuar." /></h2>`,
      tailwind: `<h2 class="mx-auto max-w-[28ch] text-center text-[34px] font-bold leading-[1.18] text-[#1A1A1A]">
  Um caminho para seguir, <span class="pp-lw text-[#7D0DEF]" data-letters>com acompanhamento para continuar.</span>
</h2>
<style>
  .pp-lw .pp-l{display:inline-block}
  .pp-lw.is-run .pp-l{animation:pp-ola 3.8s cubic-bezier(.22,1,.36,1) infinite;animation-delay:calc(var(--i) * 45ms)}
  @keyframes pp-ola{0%,28%,100%{transform:translateY(0);color:#7D0DEF}11%{transform:translateY(-.24em);color:#4C0790}}
  @media (prefers-reduced-motion:reduce){.pp-lw .pp-l{animation:none!important}}
</style>
<script>
  document.querySelectorAll('[data-letters]').forEach(function (el) {
    var txt = el.textContent.trim(), n = 0; el.textContent = ''; el.setAttribute('aria-label', txt);
    txt.split(' ').forEach(function (wd, wi, arr) {
      var w = document.createElement('span'); w.className = 'inline-block whitespace-nowrap'; w.setAttribute('aria-hidden', 'true');
      wd.split('').forEach(function (ch) { var s = document.createElement('span'); s.className = 'pp-l'; s.style.setProperty('--i', n++); s.textContent = ch; w.appendChild(s); });
      el.appendChild(w); if (wi < arr.length - 1) { el.appendChild(document.createTextNode(' ')); n++; }
    });
    new IntersectionObserver(function (es) { el.classList.toggle('is-run', es[0].isIntersecting); }, { threshold: 0.2 }).observe(el);
  });
</script>`,
    },
  },

  // 5 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-pill-fill-button",
    name: "Botão Pílula com Preenchimento que Sobe e Texto que Troca",
    category: "botoes",
    categoryLabel: "Botões & CTAs",
    description: "No hover, uma bolha roxa sobe de baixo e cobre o botão verde, o texto sai por cima enquanto uma cópia verde entra por baixo e a seta dentro do círculo é empurrada para fora enquanto outra entra pela esquerda. É um CTA tátil e satisfatório, com tudo em uma única curva suave.",
    tags: ["CTA", "Hover", "Text Swap", "Arrow Swap", "Pill"],
    defaultSection: "CTA Principal",
    previewType: "pp-pill-btn",
    tech: ["Tailwind CSS", "React", "CSS Transitions"],
    frameworks: {
      react: `// Variantes: verde (padrão) ou escura (dark). Tudo com Tailwind (group-hover), sem JS.
const EASE = 'ease-[cubic-bezier(.22,1,.36,1)]';

function Arrow({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PillFillButton({ href = '#oferta', children = 'Quero ser aluna fundadora', dark = false, large = false }) {
  const base = dark ? 'bg-[#4C0790] text-white' : 'bg-[#BEF21E] text-[#1A1A1A]';
  const fill = dark ? 'bg-[#1A1A1A]' : 'bg-[#4C0790]';
  const circle = dark
    ? 'bg-[#BEF21E] text-[#4C0790] group-hover:bg-white group-focus-visible:bg-white'
    : 'bg-[#4C0790] text-[#BEF21E] group-hover:bg-[#BEF21E] group-hover:text-[#4C0790] group-focus-visible:bg-[#BEF21E] group-focus-visible:text-[#4C0790]';
  const size = large ? 'min-h-[72px] pl-11 text-[17px]' : 'min-h-[62px] pl-10 text-base';
  const ar = large ? 'h-[54px] w-[54px]' : 'h-[44px] w-[44px]';

  return (
    <a href={href}
      className={'group relative isolate inline-flex items-center justify-between gap-[22px] overflow-hidden rounded-full py-[9px] pr-[9px] font-bold uppercase leading-[1.2] tracking-[.04em] shadow-[0_10px_26px_-14px_rgba(76,7,144,.55)] outline-none transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-14px_rgba(76,7,144,.6)] focus-visible:ring-[3px] focus-visible:ring-[#7D0DEF] focus-visible:ring-offset-4 active:translate-y-0 active:scale-[.98] ' + EASE + ' ' + base + ' ' + size}>
      {/* bolha que sobe: elipse 240% de altura que sai de baixo (top:100%) até top:-70% */}
      <span aria-hidden="true" className={'absolute left-[-10%] right-[-10%] top-full -z-10 h-[240%] rounded-[50%] transition-[top] duration-[550ms] group-hover:top-[-70%] group-focus-visible:top-[-70%] ' + EASE + ' ' + fill} />
      <span className="relative grid flex-1 overflow-hidden text-center">
        <span className={'[grid-area:1/1] transition-transform duration-500 group-hover:-translate-y-[115%] group-focus-visible:-translate-y-[115%] ' + EASE}>{children}</span>
        <span aria-hidden="true" className={'[grid-area:1/1] translate-y-[115%] text-[#BEF21E] transition-transform duration-500 group-hover:translate-y-0 group-focus-visible:translate-y-0 ' + EASE}>{children}</span>
      </span>
      <span aria-hidden="true" className={'relative flex-none overflow-hidden rounded-full transition-colors duration-500 ' + ar + ' ' + circle}>
        <Arrow className={'absolute inset-0 m-auto h-[44%] w-[44%] transition-transform duration-[550ms] group-hover:translate-x-[190%] group-focus-visible:translate-x-[190%] ' + EASE} />
        <Arrow className={'absolute inset-0 m-auto h-[44%] w-[44%] -translate-x-[190%] transition-transform duration-[550ms] group-hover:translate-x-0 group-focus-visible:translate-x-0 ' + EASE} />
      </span>
    </a>
  );
}`,
      tailwind: `<a href="#oferta" class="group relative isolate inline-flex min-h-[62px] items-center justify-between gap-[22px] overflow-hidden rounded-full bg-[#BEF21E] py-[9px] pl-10 pr-[9px] text-base font-bold uppercase leading-[1.2] tracking-[.04em] text-[#1A1A1A] shadow-[0_10px_26px_-14px_rgba(76,7,144,.55)] outline-none transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-14px_rgba(76,7,144,.6)] focus-visible:ring-[3px] focus-visible:ring-[#7D0DEF] focus-visible:ring-offset-4 active:scale-[.98]">
  <span aria-hidden="true" class="absolute left-[-10%] right-[-10%] top-full -z-10 h-[240%] rounded-[50%] bg-[#4C0790] transition-[top] duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:top-[-70%] group-focus-visible:top-[-70%]"></span>
  <span class="relative grid flex-1 overflow-hidden text-center">
    <span class="[grid-area:1/1] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-[115%] group-focus-visible:-translate-y-[115%]">Quero ser aluna fundadora</span>
    <span aria-hidden="true" class="[grid-area:1/1] translate-y-[115%] text-[#BEF21E] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0">Quero ser aluna fundadora</span>
  </span>
  <span aria-hidden="true" class="relative h-[44px] w-[44px] flex-none overflow-hidden rounded-full bg-[#4C0790] text-[#BEF21E] transition-colors duration-500 group-hover:bg-[#BEF21E] group-hover:text-[#4C0790]">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" class="absolute inset-0 m-auto h-[44%] w-[44%] transition-transform duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-[190%]"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" class="absolute inset-0 m-auto h-[44%] w-[44%] -translate-x-[190%] transition-transform duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  </span>
</a>`,
    },
  },

  // 6 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-wave-ribbon-textloop",
    name: "Faixa em Onda com Texto Correndo pela Curva",
    category: "divisas",
    categoryLabel: "Divisas & Faixas",
    description: "Uma fita roxa grossa ondula de ponta a ponta da tela com sombra desfocada, e as frases da campanha correm por dentro dela seguindo a curva. A rolagem para baixo acelera o texto, para cima freia ou inverte, e com o mouse em cima ela para devagar, como uma faixa de festival viva.",
    tags: ["SVG textPath", "Marquee", "Scroll Velocity", "Wave", "Hover Hold"],
    defaultSection: "Faixa Abaixo do Hero",
    previewType: "pp-wave-ribbon",
    tech: ["Tailwind CSS", "React", "SVG textPath", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useId, useRef } from 'react';

const NS = 'http://www.w3.org/2000/svg';
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

export function WaveRibbon({
  words = ['BLACK DO PARTIU', 'CONDIÇÃO EXCLUSIVA DE LANÇAMENTO', 'ALUNA FUNDADORA', 'PARTIU PRO', '14 MESES DE ACESSO'],
  speed = 70, ribbon = '#7D0DEF', shadow = '#4C0790', sep = '#BEF21E',
}) {
  const wrap = useRef(null), svg = useRef(null);
  const uid = 'pptl' + useId().replace(/[^a-zA-Z0-9]/g, ''); // id seguro para url(#...)

  useEffect(() => {
    const el = wrap.current, s = svg.current;
    const paths = s.querySelectorAll('[data-d]'), main = s.querySelector('[data-main]');
    const tps = s.querySelectorAll('textPath'), ms = s.querySelector('[data-ms]');
    const shOff = s.querySelector('[data-shoff]'), blur = s.querySelector('feGaussianBlur');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const T = { travel: 0, hs: 1, hov: false, boost: 0, sv: 0, sy: 0, prev: 0, L: 0, sp: speed };

    // palavra + 2 espaços + bolinha verde, repetido "reps" vezes
    const fill = (node, reps) => {
      node.textContent = '';
      for (let r = 0; r < reps; r++) words.forEach((w) => {
        const t = document.createElementNS(NS, 'tspan'); t.textContent = w + '\\u00A0\\u00A0'; node.appendChild(t);
        const d = document.createElementNS(NS, 'tspan'); d.setAttribute('fill', sep); d.textContent = '\\u2022\\u00A0\\u00A0'; node.appendChild(d);
      });
    };
    // duas cópias (cabeça e cauda) fecham o loop sem emenda
    const apply = () => {
      if (!T.L) return;
      const off = ((T.travel % T.L) + T.L) % T.L;
      tps[0].setAttribute('startOffset', off.toFixed(1));
      tps[1].setAttribute('startOffset', (off - T.L).toFixed(1));
    };
    const layout = () => {
      const W = el.clientWidth, mob = innerWidth < 761;
      const half = mob ? 190 : 340, amp = mob ? 56 : 84, rib = mob ? 44 : 68, H = Math.ceil(amp + rib) + 4, cy = H / 2;
      el.style.height = H + 'px';
      s.style.setProperty('--fs', (mob ? 17 : 30) + 'px');
      T.sp = mob ? speed * 0.72 : speed;
      let d = 'M ' + -half + ' ' + cy + ' Q ' + -half / 2 + ' ' + (cy - amp) + ' 0 ' + cy;
      for (let x = 0; x < W + half; ) { x += half; d += ' T ' + x + ' ' + cy; }
      paths.forEach((p) => { p.setAttribute('d', d); p.setAttribute('stroke-width', rib); });
      fill(ms, 1);
      const uw = ms.getComputedTextLength() || 400;
      ms.textContent = '';
      const reps = Math.max(1, Math.ceil(main.getTotalLength() / uw));
      T.L = reps * uw;
      tps.forEach((tp) => fill(tp, reps));
      shOff.setAttribute('transform', 'translate(0 ' + (rib * 0.2).toFixed(1) + ')');
      blur.setAttribute('stdDeviation', (rib * 0.14).toFixed(1));
      apply();
    };

    let raf = 0, vis = false;
    const tick = (t) => {
      raf = vis ? requestAnimationFrame(tick) : 0;
      const y = scrollY;
      if (!T.prev || t - T.prev > 100) { T.prev = t; T.sy = y; return; }
      const dt = (t - T.prev) / 1000; T.prev = t;
      // velocidade do scroll suavizada vira "empurrão" no texto
      T.sv += ((y - T.sy) / dt - T.sv) * (1 - Math.exp(-dt / 0.12)); T.sy = y;
      T.boost += (clamp(T.sv * 0.3, -1600, 1600) - T.boost) * (1 - Math.exp(-dt / 0.18));
      T.hs += ((T.hov ? 0 : 1) - T.hs) * (1 - Math.exp(-dt / (T.hov ? 0.22 : 0.32)));
      T.travel += (T.sp * T.hs + T.boost) * dt;
      apply();
    };
    const io = new IntersectionObserver(([en]) => {
      vis = en.isIntersecting;
      if (vis && !raf && !reduce) { T.prev = 0; raf = requestAnimationFrame(tick); }
    });
    io.observe(el);
    const enter = (e) => { if (e.pointerType === 'mouse') T.hov = true; };
    const leave = () => { T.hov = false; };
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    const ro = new ResizeObserver(layout);
    ro.observe(el);
    if (document.fonts) document.fonts.ready.then(layout);
    return () => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf); el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave); };
  }, [words, speed, sep]);

  const txt = { fontSize: 'var(--fs,30px)', fontWeight: 700, letterSpacing: 2 };
  return (
    <div ref={wrap} aria-hidden="true" className="relative z-[2] h-[156px] w-full select-none">
      <svg ref={svg} focusable="false" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <filter id={uid + 'f'} filterUnits="userSpaceOnUse" x="-3000" y="-1000" width="9000" height="3000"><feGaussianBlur stdDeviation="9" /></filter>
        </defs>
        <g filter={'url(#' + uid + 'f)'}><g data-shoff=""><path data-d="" fill="none" stroke={shadow} strokeOpacity=".38" strokeLinecap="round" strokeLinejoin="round" /></g></g>
        <path id={uid} data-d="" data-main="" fill="none" stroke={ribbon} strokeLinecap="round" strokeLinejoin="round" />
        {[0, 1].map((k) => (
          <text key={k} fill="#fff" dominantBaseline="central" style={txt}><textPath href={'#' + uid} /></text>
        ))}
        <text data-ms="" style={{ ...txt, visibility: 'hidden' }} />
      </svg>
    </div>
  );
}`,
      tailwind: `<div class="pp-tl relative z-[2] h-[156px] w-full select-none" aria-hidden="true"
     data-words="BLACK DO PARTIU|CONDIÇÃO EXCLUSIVA DE LANÇAMENTO|ALUNA FUNDADORA|PARTIU PRO|14 MESES DE ACESSO">
  <svg class="absolute inset-0 h-full w-full overflow-visible" focusable="false">
    <defs><filter id="pp-tl-f" filterUnits="userSpaceOnUse" x="-3000" y="-1000" width="9000" height="3000"><feGaussianBlur stdDeviation="9"/></filter></defs>
    <g filter="url(#pp-tl-f)"><g class="pp-shoff"><path data-d fill="none" stroke="#4C0790" stroke-opacity=".38" stroke-linecap="round"/></g></g>
    <path id="pp-tl-p" data-d fill="none" stroke="#7D0DEF" stroke-linecap="round"/>
    <text class="pp-tx" dominant-baseline="central"><textPath href="#pp-tl-p"></textPath></text>
    <text class="pp-tx" dominant-baseline="central"><textPath href="#pp-tl-p"></textPath></text>
    <text class="pp-tx pp-ms" style="visibility:hidden"></text>
  </svg>
</div>
<style>.pp-tx{fill:#fff;font-size:var(--fs,30px);font-weight:700;letter-spacing:2px}.pp-tx tspan.s{fill:#BEF21E}</style>
<script>
(function () {
  var NS = 'http://www.w3.org/2000/svg', el = document.querySelector('.pp-tl'), s = el.querySelector('svg');
  var words = el.dataset.words.split('|'), paths = s.querySelectorAll('[data-d]'), main = s.querySelector('#pp-tl-p');
  var tps = s.querySelectorAll('textPath'), ms = s.querySelector('.pp-ms'), shOff = s.querySelector('.pp-shoff'), blur = s.querySelector('feGaussianBlur');
  var T = { travel: 0, hs: 1, hov: false, boost: 0, sv: 0, sy: 0, prev: 0, L: 0, sp: 70 }, vis = false;
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function fill(node, reps) {
    node.textContent = '';
    for (var r = 0; r < reps; r++) words.forEach(function (w) {
      var t = document.createElementNS(NS, 'tspan'); t.textContent = w + '\\u00A0\\u00A0'; node.appendChild(t);
      var d = document.createElementNS(NS, 'tspan'); d.setAttribute('class', 's'); d.textContent = '\\u2022\\u00A0\\u00A0'; node.appendChild(d);
    });
  }
  function apply() { if (!T.L) return; var off = ((T.travel % T.L) + T.L) % T.L; tps[0].setAttribute('startOffset', off.toFixed(1)); tps[1].setAttribute('startOffset', (off - T.L).toFixed(1)); }
  function layout() {
    var W = el.clientWidth, mob = innerWidth < 761, half = mob ? 190 : 340, amp = mob ? 56 : 84, rib = mob ? 44 : 68, H = Math.ceil(amp + rib) + 4, cy = H / 2;
    el.style.height = H + 'px'; s.style.setProperty('--fs', (mob ? 17 : 30) + 'px'); T.sp = mob ? 50 : 70;
    var d = 'M ' + -half + ' ' + cy + ' Q ' + -half / 2 + ' ' + (cy - amp) + ' 0 ' + cy;
    for (var x = 0; x < W + half;) { x += half; d += ' T ' + x + ' ' + cy; }
    paths.forEach(function (p) { p.setAttribute('d', d); p.setAttribute('stroke-width', rib); });
    fill(ms, 1); var uw = ms.getComputedTextLength() || 400; ms.textContent = '';
    var reps = Math.max(1, Math.ceil(main.getTotalLength() / uw)); T.L = reps * uw;
    tps.forEach(function (tp) { fill(tp, reps); });
    shOff.setAttribute('transform', 'translate(0 ' + (rib * 0.2).toFixed(1) + ')'); blur.setAttribute('stdDeviation', (rib * 0.14).toFixed(1));
    apply();
  }
  function tick(t) {
    requestAnimationFrame(tick); if (!vis) { T.prev = 0; return; }
    var y = scrollY; if (!T.prev || t - T.prev > 100) { T.prev = t; T.sy = y; return; }
    var dt = (t - T.prev) / 1000; T.prev = t;
    T.sv += ((y - T.sy) / dt - T.sv) * (1 - Math.exp(-dt / 0.12)); T.sy = y;
    T.boost += (clamp(T.sv * 0.3, -1600, 1600) - T.boost) * (1 - Math.exp(-dt / 0.18));
    T.hs += ((T.hov ? 0 : 1) - T.hs) * (1 - Math.exp(-dt / (T.hov ? 0.22 : 0.32)));
    T.travel += (T.sp * T.hs + T.boost) * dt; apply();
  }
  new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(el);
  el.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') T.hov = true; });
  el.addEventListener('pointerleave', function () { T.hov = false; });
  new ResizeObserver(layout).observe(el);
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(tick);
})();
</script>`,
    },
  },

  // 7 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-dot-grid-cursor",
    name: "Grade de Pontos que Foge do Cursor",
    category: "fundos",
    categoryLabel: "Fundos & Texturas",
    description: "Uma textura de pontinhos roxos cobre o fundo; perto do mouse os pontos acendem, crescem e são empurrados para fora num raio de 150px, seguindo o cursor com atraso suave. Só os pontos próximos são redesenhados, então o fundo parece vivo sem pesar.",
    tags: ["Canvas", "Dot Grid", "Cursor", "Repel", "Background"],
    defaultSection: "Fundo da Página",
    previewType: "pp-dot-grid",
    tech: ["Tailwind CSS", "React", "Canvas 2D", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

// Envolve qualquer seção. Fora do mouse (toque) a grade fica parada; com prefers-reduced-motion não segue o cursor.
export function DotGridCursor({ children, gap = 26, rgb = '125,13,239', radius = 150, className = 'bg-[#F2F2F2]' }) {
  const box = useRef(null), cv = useRef(null);

  useEffect(() => {
    const el = box.current, c = cv.current, ctx = c.getContext('2d');
    const fine = matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(devicePixelRatio || 1, 2), R2 = radius * radius;
    let W = 0, H = 0, mx = -999, my = -999, tx = -999, ty = -999, raf = 0;

    const draw = () => {
      raf = 0;
      mx += (tx - mx) * 0.12; my += (ty - my) * 0.12;
      ctx.clearRect(0, 0, W, H);
      const near = [];
      ctx.fillStyle = 'rgba(' + rgb + ',.25)';
      ctx.beginPath();
      for (let y = gap / 2; y < H; y += gap) {
        for (let x = gap / 2; x < W; x += gap) {
          const dx = x - mx, dy = y - my;
          if (fine && dx * dx + dy * dy < R2) { near.push(x, y); continue; }
          ctx.moveTo(x + 1.2, y); ctx.arc(x, y, 1.2, 0, 6.283);
        }
      }
      ctx.fill();
      // pontos perto do cursor: mais fortes, maiores e empurrados para fora
      for (let i = 0; i < near.length; i += 2) {
        const nx = near[i], ny = near[i + 1], ddx = nx - mx, ddy = ny - my, d = Math.sqrt(ddx * ddx + ddy * ddy) || 1, f = 1 - d / radius;
        ctx.fillStyle = 'rgba(' + rgb + ',' + (0.25 + f * 0.4).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(nx + (ddx / d) * f * 14, ny + (ddy / d) * f * 14, 1.2 + f * 1.4, 0, 6.283); ctx.fill();
      }
      if (Math.abs(tx - mx) > 0.5 || Math.abs(ty - my) > 0.5) req();
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const size = () => {
      W = el.clientWidth; H = el.clientHeight;
      c.width = W * dpr; c.height = H * dpr; c.style.width = W + 'px'; c.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); req();
    };
    const move = (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top;
      if (mx < -900) { mx = tx; my = ty; }
      req();
    };
    const leave = () => { mx = my = tx = ty = -999; req(); };
    const ro = new ResizeObserver(size); ro.observe(el);
    if (fine) { el.addEventListener('pointermove', move, { passive: true }); el.addEventListener('pointerleave', leave); }
    return () => { ro.disconnect(); cancelAnimationFrame(raf); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, [gap, rgb, radius]);

  return (
    <div ref={box} className={'relative isolate overflow-hidden ' + className}>
      <canvas ref={cv} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[.55]" />
      {children}
    </div>
  );
}`,
      tailwind: `<section class="pp-dots relative isolate min-h-[520px] overflow-hidden bg-[#F2F2F2]">
  <canvas aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 opacity-[.55]"></canvas>
  <div class="mx-auto max-w-[1180px] px-6 py-24"><h2 class="text-[34px] font-bold text-[#1A1A1A]">Seu conteúdo aqui</h2></div>
</section>
<script>
(function () {
  var el = document.querySelector('.pp-dots'), c = el.querySelector('canvas'), ctx = c.getContext('2d');
  var fine = matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  var GAP = 26, RAD = 150, dpr = Math.min(devicePixelRatio || 1, 2), W = 0, H = 0, mx = -999, my = -999, tx = -999, ty = -999, raf = 0;
  function req() { if (!raf) raf = requestAnimationFrame(draw); }
  function draw() {
    raf = 0; mx += (tx - mx) * 0.12; my += (ty - my) * 0.12;
    ctx.clearRect(0, 0, W, H); var near = [];
    ctx.fillStyle = 'rgba(125,13,239,.25)'; ctx.beginPath();
    for (var y = GAP / 2; y < H; y += GAP) for (var x = GAP / 2; x < W; x += GAP) {
      var dx = x - mx, dy = y - my;
      if (fine && dx * dx + dy * dy < RAD * RAD) { near.push(x, y); continue; }
      ctx.moveTo(x + 1.2, y); ctx.arc(x, y, 1.2, 0, 6.283);
    }
    ctx.fill();
    for (var i = 0; i < near.length; i += 2) {
      var nx = near[i], ny = near[i + 1], ddx = nx - mx, ddy = ny - my, d = Math.sqrt(ddx * ddx + ddy * ddy) || 1, f = 1 - d / RAD;
      ctx.fillStyle = 'rgba(125,13,239,' + (0.25 + f * 0.4).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(nx + ddx / d * f * 14, ny + ddy / d * f * 14, 1.2 + f * 1.4, 0, 6.283); ctx.fill();
    }
    if (Math.abs(tx - mx) > 0.5 || Math.abs(ty - my) > 0.5) req();
  }
  new ResizeObserver(function () { W = el.clientWidth; H = el.clientHeight; c.width = W * dpr; c.height = H * dpr; c.style.width = W + 'px'; c.style.height = H + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); req(); }).observe(el);
  if (fine) {
    el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; if (mx < -900) { mx = tx; my = ty; } req(); }, { passive: true });
    el.addEventListener('pointerleave', function () { mx = my = tx = ty = -999; req(); });
  }
})();
</script>`,
    },
  },

  // 8 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-scroll-draw-line",
    name: "Linha de Fundo que se Desenha com a Rolagem",
    category: "fundos",
    categoryLabel: "Fundos & Texturas",
    description: "Uma curva longa e suave serpenteia pelo fundo da página inteira: um trilho bem clarinho já está lá, e uma versão forte vai se desenhando atrás do leitor conforme ele rola, sempre um pouco abaixo do meio da tela. O desenho é feito uma vez só; a rolagem apenas desliza uma janela (transform), então fica leve até no celular.",
    tags: ["Scroll Progress", "SVG Path", "Background", "GPU Transform", "Page Line"],
    defaultSection: "Fundo da Página",
    previewType: "pp-scroll-line",
    tech: ["Tailwind CSS", "React", "SVG", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

// Coloque como PRIMEIRO filho de um wrapper "relative" que envolve a página toda.
// O conteúdo das seções precisa ficar acima (position:relative; z-index:1).
export function ScrollDrawLine({ startY = 70, rgb = '125,13,239' }) {
  const root = useRef(null), win = useRef(null), inner = useRef(null), track = useRef(null), ink = useRef(null);

  useEffect(() => {
    const el = root.current, page = el.parentElement;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const S = { H: 0, y0: startY, top: 0, cur: 0, tgt: 0, raf: 0 };

    const paint = () => {
      const off = (S.H - S.cur).toFixed(1);
      // a janela sobe "off" e o conteúdo desce "off": só aparece de 0 até cur
      win.current.style.transform = 'translate3d(0,' + -off + 'px,0)';
      inner.current.style.transform = 'translate3d(0,' + off + 'px,0)';
    };
    const target = () => {
      let Y = scrollY - S.top + innerHeight * 0.62;
      if (scrollY >= document.documentElement.scrollHeight - innerHeight - 2) Y = S.H;
      S.tgt = clamp(Y, S.y0 - 10, S.H);
    };
    const tick = () => {
      S.raf = 0;
      const d = S.tgt - S.cur;
      S.cur = Math.abs(d) < 0.5 ? S.tgt : S.cur + d * 0.14;
      paint();
      if (S.cur !== S.tgt) S.raf = requestAnimationFrame(tick);
    };
    const layout = () => {
      const W = page.clientWidth, H = page.scrollHeight, mob = W < 761;
      const amp = W * (mob ? 0.3 : 0.32), wl = mob ? 1150 : 1500;
      let d = '';
      for (let y = S.y0; y <= H - 40; y += 10) {
        const x = W / 2 + amp * Math.sin(y / wl + 0.9) + W * 0.03 * Math.sin(y / (wl * 0.42));
        d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(0);
      }
      S.H = H; S.top = page.getBoundingClientRect().top + scrollY;
      el.style.setProperty('--bh', H + 'px');
      [track.current, ink.current].forEach((sv) => {
        sv.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        sv.firstChild.setAttribute('d', d);
        sv.firstChild.setAttribute('stroke-width', mob ? 4 : 5);
      });
      if (reduce) S.cur = S.tgt = H; else { target(); S.cur = S.tgt; }
      paint();
    };
    const onScroll = () => { if (reduce) return; target(); if (!S.raf) S.raf = requestAnimationFrame(tick); };
    const ro = new ResizeObserver(layout); ro.observe(page);
    addEventListener('scroll', onScroll, { passive: true });
    return () => { ro.disconnect(); removeEventListener('scroll', onScroll); cancelAnimationFrame(S.raf); };
  }, [startY]);

  const svgCls = 'absolute left-0 top-0 h-[var(--bh)] w-full overflow-visible';
  const p = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-0 h-0 w-full">
      <svg ref={track} preserveAspectRatio="none" className={svgCls}><path {...p} stroke={'rgba(' + rgb + ',.1)'} /></svg>
      <div ref={win} className="absolute left-0 top-0 h-[var(--bh)] w-full overflow-hidden will-change-transform">
        <div ref={inner} className="absolute inset-0 will-change-transform">
          <svg ref={ink} preserveAspectRatio="none" className={svgCls}><path {...p} stroke={'rgba(' + rgb + ',.42)'} /></svg>
        </div>
      </div>
    </div>
  );
}

// Uso:
// <main className="relative overflow-x-clip bg-[#F2F2F2]">
//   <ScrollDrawLine />
//   <section className="relative z-[1]">...</section>
// </main>`,
      tailwind: `<main class="pp-page relative overflow-x-clip bg-[#F2F2F2]">
  <div class="pp-bgl pointer-events-none absolute left-0 top-0 z-0 h-0 w-full" aria-hidden="true">
    <svg class="absolute left-0 top-0 h-[var(--bh)] w-full overflow-visible" preserveAspectRatio="none"><path fill="none" stroke="rgba(125,13,239,.1)" stroke-linecap="round"/></svg>
    <div class="pp-bgl-w absolute left-0 top-0 h-[var(--bh)] w-full overflow-hidden will-change-transform">
      <div class="pp-bgl-i absolute inset-0 will-change-transform">
        <svg class="absolute left-0 top-0 h-[var(--bh)] w-full overflow-visible" preserveAspectRatio="none"><path fill="none" stroke="rgba(125,13,239,.42)" stroke-linecap="round"/></svg>
      </div>
    </div>
  </div>
  <section class="relative z-[1] min-h-screen p-10">Seção 1</section>
  <section class="relative z-[1] min-h-screen p-10">Seção 2</section>
  <section class="relative z-[1] min-h-screen p-10">Seção 3</section>
</main>
<script>
(function () {
  var page = document.querySelector('.pp-page'), el = page.querySelector('.pp-bgl'), win = el.querySelector('.pp-bgl-w'), inner = el.querySelector('.pp-bgl-i');
  var svgs = el.querySelectorAll('svg'), S = { H: 0, y0: 70, top: 0, cur: 0, tgt: 0, raf: 0 };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function paint() { var off = (S.H - S.cur).toFixed(1); win.style.transform = 'translate3d(0,' + -off + 'px,0)'; inner.style.transform = 'translate3d(0,' + off + 'px,0)'; }
  function target() { var Y = scrollY - S.top + innerHeight * 0.62; if (scrollY >= document.documentElement.scrollHeight - innerHeight - 2) Y = S.H; S.tgt = clamp(Y, S.y0 - 10, S.H); }
  function tick() { S.raf = 0; var d = S.tgt - S.cur; S.cur = Math.abs(d) < 0.5 ? S.tgt : S.cur + d * 0.14; paint(); if (S.cur !== S.tgt) S.raf = requestAnimationFrame(tick); }
  function layout() {
    var W = page.clientWidth, H = page.scrollHeight, mob = W < 761, amp = W * (mob ? 0.3 : 0.32), wl = mob ? 1150 : 1500, d = '';
    for (var y = S.y0; y <= H - 40; y += 10) { var x = W / 2 + amp * Math.sin(y / wl + 0.9) + W * 0.03 * Math.sin(y / (wl * 0.42)); d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(0); }
    S.H = H; S.top = page.getBoundingClientRect().top + scrollY; el.style.setProperty('--bh', H + 'px');
    svgs.forEach(function (sv) { sv.setAttribute('viewBox', '0 0 ' + W + ' ' + H); sv.firstElementChild.setAttribute('d', d); sv.firstElementChild.setAttribute('stroke-width', mob ? 4 : 5); });
    if (reduce) S.cur = S.tgt = H; else { target(); S.cur = S.tgt; } paint();
  }
  new ResizeObserver(layout).observe(page);
  addEventListener('scroll', function () { if (reduce) return; target(); if (!S.raf) S.raf = requestAnimationFrame(tick); }, { passive: true });
})();
</script>`,
    },
  },

  // 9 ─────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-wavy-mask-section",
    name: "Seção Roxa com Bordas Onduladas e Pontos em Parallax",
    category: "divisas",
    categoryLabel: "Divisas & Faixas",
    description: "Faixas roxas em degradê cortadas em cima e embaixo por ondas orgânicas (cada seção com um desenho próprio), usando máscara CSS em vez de imagens. Uma malha de pontinhos brancos desliza um pouco mais devagar que a rolagem, criando profundidade sem nenhum arquivo extra.",
    tags: ["CSS Mask", "SVG Data URI", "Wave Divider", "Parallax", "Gradient"],
    defaultSection: "Seções de Destaque",
    previewType: "pp-wavy-section",
    tech: ["Tailwind CSS", "React", "CSS Mask", "SVG"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

// Formas de borda (topo e base) em SVG inline. Preto = visível. Use %27 no lugar das aspas simples.
const svg = (d) => 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 1440 70%27 preserveAspectRatio=%27none%27%3E%3Cpath d=%27' + d + '%27/%3E%3C/svg%3E")';
export const WAVES = {
  organic: { top: svg('M0 46C180 10 360 4 540 26s360 44 540 26 300-40 360-44V70H0z'), bottom: svg('M0 0H1440V24C1300 60 1120 70 940 50S600 6 420 16 140 62 0 40z') },
  arch: { top: svg('M0 70Q720 -30 1440 70z'), bottom: svg('M0 0H1440V20C1080 70 360 70 0 20z') },
  swell: { top: svg('M0 30C480 90 960 -30 1440 30V70H0z'), bottom: svg('M0 0H1440V40C960 100 480 -20 0 40z') },
};

export function WavySection({ children, shape = 'organic', dark = false, edge = 70, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const run = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) el.style.setProperty('--sy', (r.top * -0.15).toFixed(1));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    addEventListener('scroll', on, { passive: true }); run();
    return () => { removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);

  const w = WAVES[shape] || WAVES.organic;
  const mask = w.top + ' top/100% var(--sh) no-repeat,linear-gradient(#000,#000) 0 calc(var(--sh) - 1px)/100% calc(100% - var(--sh) * 2 + 2px) no-repeat,' + w.bottom + ' bottom/100% var(--sh) no-repeat';
  const style = {
    '--sh': edge + 'px',
    padding: 'calc(var(--sh) + 120px) 0',
    backgroundColor: '#7D0DEF',
    backgroundImage: dark
      ? 'radial-gradient(rgba(255,255,255,.08) 1px,transparent 1.4px),linear-gradient(200deg,#4C0790 0%,#3a0570 100%)'
      : 'radial-gradient(rgba(255,255,255,.09) 1px,transparent 1.4px),linear-gradient(165deg,#7D0DEF 0%,#4C0790 100%)',
    backgroundSize: '22px 22px,100% 100%',
    backgroundPosition: '0 calc(var(--sy,0) * 1px),0 0',
    WebkitMask: mask,
    mask,
  };
  return (
    <section ref={ref} style={style} className={'relative z-[1] text-white ' + className}>
      <div className="mx-auto max-w-[1180px] px-6">{children}</div>
    </section>
  );
}`,
      tailwind: `<section class="pp-wavy relative z-[1] text-white">
  <div class="mx-auto max-w-[1180px] px-6">
    <h2 class="max-w-[24ch] text-[34px] font-bold leading-[1.18]">Direção para decidir. Ferramentas para executar.</h2>
  </div>
</section>
<style>
  .pp-wavy{
    --sh:70px;
    --mt:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 1440 70%27 preserveAspectRatio=%27none%27%3E%3Cpath d=%27M0 46C180 10 360 4 540 26s360 44 540 26 300-40 360-44V70H0z%27/%3E%3C/svg%3E");
    --mb:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 1440 70%27 preserveAspectRatio=%27none%27%3E%3Cpath d=%27M0 0H1440V24C1300 60 1120 70 940 50S600 6 420 16 140 62 0 40z%27/%3E%3C/svg%3E");
    padding:calc(var(--sh) + 120px) 0;
    background-color:#7D0DEF;
    background-image:radial-gradient(rgba(255,255,255,.09) 1px,transparent 1.4px),linear-gradient(165deg,#7D0DEF 0%,#4C0790 100%);
    background-size:22px 22px,100% 100%;
    background-position:0 calc(var(--sy,0) * 1px),0 0;
    -webkit-mask:var(--mt) top/100% var(--sh) no-repeat,linear-gradient(#000,#000) 0 calc(var(--sh) - 1px)/100% calc(100% - var(--sh)*2 + 2px) no-repeat,var(--mb) bottom/100% var(--sh) no-repeat;
    mask:var(--mt) top/100% var(--sh) no-repeat,linear-gradient(#000,#000) 0 calc(var(--sh) - 1px)/100% calc(100% - var(--sh)*2 + 2px) no-repeat,var(--mb) bottom/100% var(--sh) no-repeat;
  }
</style>
<script>
  if (matchMedia('(pointer: fine)').matches) addEventListener('scroll', function () {
    document.querySelectorAll('.pp-wavy').forEach(function (s) { var r = s.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) s.style.setProperty('--sy', (r.top * -0.15).toFixed(1)); });
  }, { passive: true });
</script>`,
    },
  },

  // 10 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-scroll-blur-reveal",
    name: "Entrada e Saída com Desfoque Ligadas à Rolagem",
    category: "entradas",
    categoryLabel: "Entradas na Rolagem",
    description: "Os blocos aparecem desfocados e um pouco abaixo e vão ficando nítidos conforme sobem na tela; ao chegar perto do topo, se desfazem de novo para cima. Vai e volta junto com o scroll, e o valor mostrado corre atrás do alvo com inércia, então nem a rodinha do mouse dá tranco.",
    tags: ["Scroll Reveal", "Blur", "Inertia", "Reversible", "Smoothstep"],
    defaultSection: "Todas as Seções",
    previewType: "pp-blur-reveal",
    tech: ["Tailwind CSS", "React", "requestAnimationFrame", "IntersectionObserver"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

// Envolva cada bloco: <BlurReveal><Card /></BlurReveal>. Não aninhe um BlurReveal dentro de outro.
export function BlurReveal({ children, as: Tag = 'div', className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const coarse = matchMedia('(hover: none), (pointer: coarse)').matches;
    const S = { c: null, t: 0, dir: 1, snap: false, raf: 0, last: 0, near: true, v: -1 };

    const paint = (v) => {
      v = Math.round(v * 200) / 200;
      if (v === S.v) return; S.v = v;
      if (v >= 1) { el.style.opacity = ''; el.style.filter = ''; el.style.translate = ''; return; }
      const e = v * v * (3 - 2 * v); // smoothstep
      el.style.opacity = e.toFixed(3);
      if (!coarse) el.style.filter = 'blur(' + ((1 - e) * 10).toFixed(1) + 'px)';
      el.style.translate = '0 ' + ((1 - e) * (S.dir > 0 ? (coarse ? 28 : 36) : -20)).toFixed(1) + 'px';
    };
    const measure = () => {
      const vh = innerHeight, r = el.getBoundingClientRect(), sy = scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - vh), atEnd = sy >= max - 2;
      const D = vh * (coarse ? 0.3 : 0.36), S0 = coarse ? 0.9 : 0.95, E0 = coarse ? 0.07 : 0.13;
      S.snap = r.top > vh + 60 || r.bottom < -60;
      if (S.snap) { S.t = 0; return; }
      // entra a partir de 5% dentro da tela; no fim da página, quem está visível chega a 100%
      const reach = vh * S0 - (r.top + sy - max);
      const a = atEnd && r.top < vh ? 1 : clamp((vh * S0 - r.top) / Math.min(D, Math.max(24, reach * 0.8)));
      const b = clamp((r.bottom + vh * 0.03) / (vh * E0));
      S.t = Math.min(a, b); S.dir = a <= b ? 1 : -1;
      if (S.c == null) S.c = S.t;
    };
    const tick = (t) => {
      S.raf = 0;
      const dt = S.last && t - S.last < 100 ? t - S.last : 16.7, k = 1 - Math.pow(0.88, dt / 16.7);
      S.last = t;
      const d = S.t - S.c;
      if (S.snap || Math.abs(d) < 0.004) S.c = S.t; else S.c += d * k;
      paint(S.c);
      if (S.c !== S.t) S.raf = requestAnimationFrame(tick); else S.last = 0;
    };
    const on = () => { if (!S.near) return; measure(); if (!S.raf) S.raf = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([en]) => { S.near = en.isIntersecting; on(); }, { rootMargin: '60% 0px' });
    io.observe(el);
    addEventListener('scroll', on, { passive: true });
    addEventListener('resize', on);
    on();
    return () => { io.disconnect(); removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(S.raf); };
  }, []);

  return <Tag ref={ref} className={className}>{children}</Tag>;
}`,
      tailwind: `<section class="mx-auto grid max-w-[1180px] gap-10 px-6 py-[50vh]">
  <div data-blur class="rounded-[32px] bg-white p-10 shadow-[0_30px_60px_-36px_rgba(76,7,144,.55)]">Bloco 1</div>
  <div data-blur class="rounded-[32px] bg-[#7D0DEF] p-10 text-white">Bloco 2</div>
  <div data-blur class="rounded-[32px] bg-[#BEF21E] p-10 text-[#4C0790]">Bloco 3</div>
</section>
<script>
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var coarse = matchMedia('(hover: none), (pointer: coarse)').matches, els = [].slice.call(document.querySelectorAll('[data-blur]')), raf = 0, last = 0;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function paint(el, v) {
    v = Math.round(v * 200) / 200; if (v === el._v) return; el._v = v;
    if (v >= 1) { el.style.opacity = el.style.filter = el.style.translate = ''; return; }
    var e = v * v * (3 - 2 * v); el.style.opacity = e.toFixed(3);
    if (!coarse) el.style.filter = 'blur(' + ((1 - e) * 10).toFixed(1) + 'px)';
    el.style.translate = '0 ' + ((1 - e) * (el._dir > 0 ? (coarse ? 28 : 36) : -20)).toFixed(1) + 'px';
  }
  function measure() {
    var vh = innerHeight, sy = scrollY, max = Math.max(1, document.documentElement.scrollHeight - vh), atEnd = sy >= max - 2, D = vh * (coarse ? 0.3 : 0.36), S0 = coarse ? 0.9 : 0.95, E0 = coarse ? 0.07 : 0.13;
    els.forEach(function (el) {
      var r = el.getBoundingClientRect(); el._snap = r.top > vh + 60 || r.bottom < -60;
      if (el._snap) { el._t = 0; } else {
        var reach = vh * S0 - (r.top + sy - max);
        var a = atEnd && r.top < vh ? 1 : clamp((vh * S0 - r.top) / Math.min(D, Math.max(24, reach * 0.8)));
        var b = clamp((r.bottom + vh * 0.03) / (vh * E0)); el._t = Math.min(a, b); el._dir = a <= b ? 1 : -1;
      }
      if (el._c == null) el._c = el._t;
    });
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick(t) {
    raf = 0; var dt = last && t - last < 100 ? t - last : 16.7, k = 1 - Math.pow(0.88, dt / 16.7), moving = false; last = t;
    els.forEach(function (el) { var d = el._t - el._c; if (el._snap || Math.abs(d) < 0.004) el._c = el._t; else { el._c += d * k; moving = true; } paint(el, el._c); });
    if (moving) raf = requestAnimationFrame(tick); else last = 0;
  }
  addEventListener('scroll', measure, { passive: true }); addEventListener('resize', measure); measure();
})();
</script>`,
    },
  },

  // 11 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-orbit-pills",
    name: "Tarefas Orbitando uma Esfera 3D",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "Pílulas brancas com as tarefas do dia giram numa órbita elíptica inclinada em volta de uma esfera roxa com ponto de interrogação: crescem e ficam opacas quando passam na frente, encolhem e somem um pouco atrás. O mouse inclina a órbita, traduzindo visualmente a sensação de ter coisa demais girando na cabeça.",
    tags: ["Orbit", "Pseudo 3D", "Depth Sort", "Mouse Tilt", "rAF"],
    defaultSection: "Identificação / Dor",
    previewType: "pp-orbit",
    tech: ["Tailwind CSS", "React", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

export function OrbitPills({ items = ['divulgar', 'organizar os pedidos', 'terminar o catálogo', 'rever os preços', 'chamar os clientes'] }) {
  const orb = useRef(null), pills = useRef([]);

  useEffect(() => {
    const el = orb.current, host = el.parentElement;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tx = 0, ty = 0, mx = 0, my = 0, raf = 0, vis = false;

    const frame = (t) => {
      const W = el.clientWidth, H = el.clientHeight, R = Math.min(W * 0.42, 320), r = Math.min(H * 0.32, R * 0.55);
      mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
      const tilt = -0.14 + mx * 0.12, base = (t / 1000) * 0.28;
      el.style.setProperty('--ot', (tilt * 57.3).toFixed(1) + 'deg');
      pills.current.forEach((p, i, arr) => {
        if (!p) return;
        const a = base + (i / arr.length) * Math.PI * 2;
        const x = Math.cos(a) * R, y = Math.sin(a) * r * (1 + my * 0.25);
        let xr = x * Math.cos(tilt) - y * Math.sin(tilt);
        const yr = x * Math.sin(tilt) + y * Math.cos(tilt);
        const dpt = (Math.sin(a) + 1) / 2, s = 0.72 + dpt * 0.38; // 0 = atrás, 1 = na frente
        const lim = W / 2 - (p.offsetWidth * s) / 2 - 4;
        if (xr > lim) xr = lim; if (xr < -lim) xr = -lim;
        p.style.transform = 'translate(-50%,-50%) translate(' + xr.toFixed(1) + 'px,' + yr.toFixed(1) + 'px) scale(' + s.toFixed(3) + ')';
        p.style.opacity = (0.45 + dpt * 0.55).toFixed(2);
        p.style.zIndex = Math.sin(a) > 0 ? 6 : 3;
      });
    };
    const loop = (t) => { frame(t); raf = vis ? requestAnimationFrame(loop) : 0; };
    const io = new IntersectionObserver(([en]) => { vis = en.isIntersecting && !reduce; if (vis && !raf) raf = requestAnimationFrame(loop); }, { rootMargin: '100px 0px' });
    io.observe(el);
    frame(1200);
    const move = (e) => { if (e.pointerType !== 'mouse') return; const b = el.getBoundingClientRect(); tx = (e.clientX - b.left) / b.width - 0.5; ty = (e.clientY - b.top) / b.height - 0.5; };
    const leave = () => { tx = 0; ty = 0; };
    host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave);
    return () => { io.disconnect(); cancelAnimationFrame(raf); host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave); };
  }, [items.length]);

  const ring = 'absolute left-1/2 top-1/2 aspect-[1/.36] rounded-[50%]';
  return (
    <div className="bg-[#F2F2F2]">
      <style>{'@keyframes pp-qm{0%,100%{transform:rotate(-8deg) translateY(0)}50%{transform:rotate(8deg) translateY(-8px)}}'}</style>
      <div ref={orb} aria-hidden="true" className="relative h-[480px] md:h-[620px]">
        <i className={ring + ' w-[92%] border-2 border-dashed border-[rgba(125,13,239,.28)]'} style={{ transform: 'translate(-50%,-50%) rotate(var(--ot,-8deg))' }} />
        <i className={ring + ' w-[70%] border-2 border-[rgba(190,242,30,.6)]'} style={{ transform: 'translate(-50%,-50%) rotate(calc(var(--ot,-8deg) + 22deg))' }} />
        <div className="absolute left-1/2 top-1/2 z-[5] -ml-[125px] -mt-[125px] grid h-[250px] w-[250px] place-items-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#b06bff_0%,#7D0DEF_42%,#4C0790_100%)] shadow-[0_46px_60px_-30px_rgba(76,7,144,.75),inset_-18px_-22px_40px_rgba(0,0,0,.28),inset_14px_14px_30px_rgba(255,255,255,.18)]">
          <svg viewBox="0 0 48 48" className="h-[116px] w-[116px] motion-safe:animate-[pp-qm_4.5s_ease-in-out_infinite]">
            <path d="M16 17a8 8 0 1 1 12 7c-3 2-4 3.5-4 7" fill="none" stroke="#BEF21E" strokeWidth="5" strokeLinecap="round" />
            <circle cx="24" cy="38" r="3.2" fill="#BEF21E" />
          </svg>
        </div>
        {items.map((it, i) => (
          <span key={i} ref={(n) => (pills.current[i] = n)}
            className="absolute left-1/2 top-1/2 flex items-center gap-3 whitespace-nowrap rounded-full border border-[rgba(76,7,144,.14)] bg-white py-3.5 pl-3.5 pr-6 text-sm font-bold text-[#4C0790] shadow-[0_18px_30px_-18px_rgba(76,7,144,.6)] will-change-transform md:text-lg">
            <i className="h-8 w-8 rounded-full bg-[#EDE3FB] shadow-[inset_0_0_0_6px_#7D0DEF]" />{it}
          </span>
        ))}
      </div>
    </div>
  );
}`,
      tailwind: `<div class="pp-orbit-host bg-[#F2F2F2]">
  <div class="pp-orbit relative h-[480px] md:h-[620px]" aria-hidden="true">
    <i class="absolute left-1/2 top-1/2 aspect-[1/.36] w-[92%] rounded-[50%] border-2 border-dashed border-[rgba(125,13,239,.28)]" style="transform:translate(-50%,-50%) rotate(var(--ot,-8deg))"></i>
    <i class="absolute left-1/2 top-1/2 aspect-[1/.36] w-[70%] rounded-[50%] border-2 border-[rgba(190,242,30,.6)]" style="transform:translate(-50%,-50%) rotate(calc(var(--ot,-8deg) + 22deg))"></i>
    <div class="absolute left-1/2 top-1/2 z-[5] -ml-[125px] -mt-[125px] grid h-[250px] w-[250px] place-items-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#b06bff_0%,#7D0DEF_42%,#4C0790_100%)] shadow-[0_46px_60px_-30px_rgba(76,7,144,.75),inset_-18px_-22px_40px_rgba(0,0,0,.28),inset_14px_14px_30px_rgba(255,255,255,.18)]">
      <svg viewBox="0 0 48 48" class="pp-qm h-[116px] w-[116px]"><path d="M16 17a8 8 0 1 1 12 7c-3 2-4 3.5-4 7" fill="none" stroke="#BEF21E" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="38" r="3.2" fill="#BEF21E"/></svg>
    </div>
    <span class="pp-pill">divulgar</span><span class="pp-pill">organizar os pedidos</span><span class="pp-pill">terminar o catálogo</span><span class="pp-pill">rever os preços</span><span class="pp-pill">chamar os clientes</span>
  </div>
</div>
<style>
  .pp-pill{position:absolute;left:50%;top:50%;display:flex;align-items:center;gap:12px;padding:14px 24px 14px 14px;border-radius:999px;background:#fff;color:#4C0790;font-weight:700;font-size:18px;white-space:nowrap;border:1px solid rgba(76,7,144,.14);box-shadow:0 18px 30px -18px rgba(76,7,144,.6);will-change:transform,opacity}
  .pp-pill::before{content:"";width:32px;height:32px;border-radius:50%;background:#EDE3FB;box-shadow:inset 0 0 0 6px #7D0DEF}
  .pp-qm{animation:pp-qm 4.5s ease-in-out infinite}
  @keyframes pp-qm{0%,100%{transform:rotate(-8deg) translateY(0)}50%{transform:rotate(8deg) translateY(-8px)}}
</style>
<script>
(function () {
  var orb = document.querySelector('.pp-orbit'), host = orb.parentNode, pills = [].slice.call(orb.querySelectorAll('.pp-pill')), tx = 0, ty = 0, mx = 0, my = 0, vis = false;
  function frame(t) {
    var W = orb.clientWidth, H = orb.clientHeight, R = Math.min(W * 0.42, 320), r = Math.min(H * 0.32, R * 0.55);
    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
    var tilt = -0.14 + mx * 0.12, base = t / 1000 * 0.28; orb.style.setProperty('--ot', (tilt * 57.3).toFixed(1) + 'deg');
    pills.forEach(function (p, i) {
      var a = base + i / pills.length * Math.PI * 2, x = Math.cos(a) * R, y = Math.sin(a) * r * (1 + my * 0.25);
      var xr = x * Math.cos(tilt) - y * Math.sin(tilt), yr = x * Math.sin(tilt) + y * Math.cos(tilt), dpt = (Math.sin(a) + 1) / 2, s = 0.72 + dpt * 0.38;
      var lim = W / 2 - p.offsetWidth * s / 2 - 4; if (xr > lim) xr = lim; if (xr < -lim) xr = -lim;
      p.style.transform = 'translate(-50%,-50%) translate(' + xr.toFixed(1) + 'px,' + yr.toFixed(1) + 'px) scale(' + s.toFixed(3) + ')';
      p.style.opacity = (0.45 + dpt * 0.55).toFixed(2); p.style.zIndex = Math.sin(a) > 0 ? 6 : 3;
    });
  }
  function loop(t) { if (vis) frame(t); requestAnimationFrame(loop); }
  new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }, { rootMargin: '100px 0px' }).observe(orb);
  host.addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; var b = orb.getBoundingClientRect(); tx = (e.clientX - b.left) / b.width - 0.5; ty = (e.clientY - b.top) / b.height - 0.5; });
  host.addEventListener('pointerleave', function () { tx = ty = 0; });
  frame(1200); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(loop);
})();
</script>`,
    },
  },

  // 12 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-polaroid-pile-spread",
    name: "Mural de Polaroides que se Espalham com a Rolagem",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "Três polaroides começam empilhadas e tortas no centro e, conforme a rolagem avança, deslizam cada uma para a sua coluna; quando assentam, uma fita adesiva verde 'cola' cada foto e um marca-texto risca a frase principal. No celular elas entram alternadas pelas laterais. Dá um ar de mural afetivo, montado na frente do leitor.",
    tags: ["Scroll Scrub", "Polaroid", "Stack to Grid", "Tape", "Marker"],
    defaultSection: "Identificação / Dor",
    previewType: "pp-polaroids",
    tech: ["Tailwind CSS", "React", "CSS Variables", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const PILE = [{ r: -9, x: -16, y: 28 }, { r: 6, x: 12, y: 0 }, { r: -2, x: 2, y: 14 }]; // como ficam na pilha
const BASE = ['-3deg', '2.2deg', '-1.6deg'];
const ART = ['bg-[#EDE3FB]', 'bg-[#7D0DEF]', 'bg-[#E9F9B8]'];

export function PolaroidMural({ cards = [
  { lead: 'Você posta, mas ', mark: 'não sabe se está dando resultado.' },
  { lead: 'Você vende, mas ', mark: 'não sabe se está lucrando.' },
  { lead: 'Você trabalha muito, mas ', mark: 'sente que não sai do lugar.' },
] }) {
  const wrap = useRef(null), els = useRef([]);

  useEffect(() => {
    const mural = wrap.current, pols = els.current.filter(Boolean);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const layout = () => {
      const mw = mural.clientWidth;
      // deslocamento de cada card até o centro do mural
      pols.forEach((c) => { c._ox = mw / 2 - (c.offsetLeft + c.offsetWidth / 2); c._oy = -c.offsetTop; });
    };
    const frame = () => {
      raf = 0;
      const vh = innerHeight, r = mural.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const pile = innerWidth > 960, pm = clamp((vh * 0.86 - r.top) / (vh * 0.5));
      pols.forEach((c, i) => {
        const top = c.getBoundingClientRect().top;
        const p = pile ? pm : clamp((vh * 0.98 - top) / (vh * 0.5));
        const e = pile ? p * p * (3 - 2 * p) : 1 - Math.pow(1 - p, 3), k = 1 - e, s = c.style;
        if (pile) {
          s.setProperty('--mx', ((c._ox + PILE[i].x) * k).toFixed(1) + 'px');
          s.setProperty('--my', ((c._oy + 30 + PILE[i].y) * k).toFixed(1) + 'px');
          s.setProperty('--mr', (PILE[i].r * k).toFixed(2) + 'deg');
          s.setProperty('--ms', (1 - 0.1 * k).toFixed(3));
          s.zIndex = k > 0.02 ? [1, 3, 2][i] : '';
        } else {
          const side = i % 2 ? 1 : -1;
          s.setProperty('--mx', (side * 46 * k).toFixed(1) + '%'); s.setProperty('--my', '0px');
          s.setProperty('--mr', (side * 10 * k).toFixed(2) + 'deg'); s.setProperty('--ms', (1 - 0.06 * k).toFixed(3));
          s.zIndex = '';
        }
        s.setProperty('--tp', clamp((e - 0.72) / 0.22).toFixed(3)); // fita cola
        s.setProperty('--ul', clamp((e - 0.86) / 0.14).toFixed(3)); // marca-texto risca
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const ro = new ResizeObserver(() => { layout(); on(); }); ro.observe(mural);
    addEventListener('scroll', on, { passive: true });
    return () => { ro.disconnect(); removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={wrap} className="relative grid grid-cols-1 items-start gap-10 bg-[#F2F2F2] px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c, i) => (
        <article key={i} ref={(n) => (els.current[i] = n)}
          className="relative rounded-[24px] bg-white px-3.5 pb-[26px] pt-3.5 shadow-[0_30px_44px_-30px_rgba(76,7,144,.55)] transition-[translate,box-shadow] duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-2.5 hover:shadow-[0_40px_50px_-30px_rgba(76,7,144,.6)] lg:[&:nth-child(2)]:mt-11 lg:[&:nth-child(3)]:mt-4"
          style={{ '--r': BASE[i % 3], transform: 'translate(var(--mx,0px),var(--my,0px)) rotate(calc(var(--r) + var(--mr,0deg))) scale(var(--ms,1))' }}>
          {/* fita adesiva */}
          <i aria-hidden="true" className="absolute left-1/2 top-[-15px] z-[2] -ml-[60px] h-[30px] w-[120px] origin-left rounded-[3px] bg-[rgba(190,242,30,.85)] shadow-[0_4px_8px_-6px_rgba(0,0,0,.3)]"
            style={{ transform: 'rotate(-4deg) scaleX(var(--tp,1))' }} />
          <div aria-hidden="true" className={'h-[210px] rounded-2xl ' + ART[i % 3]} />
          <p className="mx-2.5 mt-[22px] text-[19px] font-bold leading-[1.35] text-[#1A1A1A]">
            {c.lead}
            <span className="[box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
              style={{ background: 'linear-gradient(transparent 56%,rgba(190,242,30,.8) 56% 94%,transparent 94%) no-repeat 0 0/calc(var(--ul,1) * 100%) 100%' }}>
              {c.mark}
            </span>
          </p>
        </article>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="pp-mural relative grid grid-cols-1 items-start gap-10 bg-[#F2F2F2] px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
  <article class="pp-pol" style="--r:-3deg"><i class="pp-tape"></i><div class="h-[210px] rounded-2xl bg-[#EDE3FB]"></div><p class="mx-2.5 mt-[22px] text-[19px] font-bold leading-[1.35]">Você posta, mas <span class="pp-ul">não sabe se está dando resultado.</span></p></article>
  <article class="pp-pol lg:mt-11" style="--r:2.2deg"><i class="pp-tape"></i><div class="h-[210px] rounded-2xl bg-[#7D0DEF]"></div><p class="mx-2.5 mt-[22px] text-[19px] font-bold leading-[1.35]">Você vende, mas <span class="pp-ul">não sabe se está lucrando.</span></p></article>
  <article class="pp-pol lg:mt-4" style="--r:-1.6deg"><i class="pp-tape"></i><div class="h-[210px] rounded-2xl bg-[#E9F9B8]"></div><p class="mx-2.5 mt-[22px] text-[19px] font-bold leading-[1.35]">Você trabalha muito, mas <span class="pp-ul">sente que não sai do lugar.</span></p></article>
</div>
<style>
  .pp-pol{position:relative;background:#fff;border-radius:24px;padding:14px 14px 26px;box-shadow:0 30px 44px -30px rgba(76,7,144,.55);transform:translate(var(--mx,0px),var(--my,0px)) rotate(calc(var(--r,0deg) + var(--mr,0deg))) scale(var(--ms,1));transition:translate .6s cubic-bezier(.22,1,.36,1),box-shadow .7s}
  .pp-pol:hover{translate:0 -10px}
  .pp-tape{position:absolute;z-index:2;top:-15px;left:50%;width:120px;height:30px;margin-left:-60px;background:rgba(190,242,30,.85);transform:rotate(-4deg) scaleX(var(--tp,1));transform-origin:0 50%;border-radius:3px;box-shadow:0 4px 8px -6px rgba(0,0,0,.3)}
  .pp-ul{background:linear-gradient(transparent 56%,rgba(190,242,30,.8) 56% 94%,transparent 94%) no-repeat 0 0/calc(var(--ul,1) * 100%) 100%;-webkit-box-decoration-break:clone;box-decoration-break:clone}
</style>
<script>
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var mural = document.querySelector('.pp-mural'), pols = [].slice.call(mural.querySelectorAll('.pp-pol'));
  var PILE = [{ r: -9, x: -16, y: 28 }, { r: 6, x: 12, y: 0 }, { r: -2, x: 2, y: 14 }];
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function layout() { var mw = mural.clientWidth; pols.forEach(function (c) { c._ox = mw / 2 - (c.offsetLeft + c.offsetWidth / 2); c._oy = -c.offsetTop; }); frame(); }
  function frame() {
    var vh = innerHeight, r = mural.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return;
    var pile = innerWidth > 960, pm = clamp((vh * 0.86 - r.top) / (vh * 0.5));
    pols.forEach(function (c, i) {
      var p = pile ? pm : clamp((vh * 0.98 - c.getBoundingClientRect().top) / (vh * 0.5)), e = pile ? p * p * (3 - 2 * p) : 1 - Math.pow(1 - p, 3), k = 1 - e, s = c.style;
      if (pile) { s.setProperty('--mx', ((c._ox + PILE[i].x) * k).toFixed(1) + 'px'); s.setProperty('--my', ((c._oy + 30 + PILE[i].y) * k).toFixed(1) + 'px'); s.setProperty('--mr', (PILE[i].r * k).toFixed(2) + 'deg'); s.setProperty('--ms', (1 - 0.1 * k).toFixed(3)); s.zIndex = k > 0.02 ? [1, 3, 2][i] : ''; }
      else { var side = i % 2 ? 1 : -1; s.setProperty('--mx', (side * 46 * k).toFixed(1) + '%'); s.setProperty('--my', '0px'); s.setProperty('--mr', (side * 10 * k).toFixed(2) + 'deg'); s.setProperty('--ms', (1 - 0.06 * k).toFixed(3)); s.zIndex = ''; }
      s.setProperty('--tp', clamp((e - 0.72) / 0.22).toFixed(3)); s.setProperty('--ul', clamp((e - 0.86) / 0.14).toFixed(3));
    });
  }
  new ResizeObserver(layout).observe(mural);
  addEventListener('scroll', function () { requestAnimationFrame(frame); }, { passive: true });
})();
</script>`,
    },
  },

  // 13 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-sticky-stack-cards",
    name: "Cartas Empilhadas que Encolhem e Escurecem",
    category: "oferta",
    categoryLabel: "Oferta & Preço",
    description: "Os cards da oferta grudam no topo um pouco abaixo do anterior (efeito baralho) e, conforme a próxima carta sobe por cima, as de trás encolhem levemente e ganham um véu escuro. Cada entregável ganha o seu momento de palco, e o leitor sente a oferta 'empilhando valor'.",
    tags: ["Sticky", "Stacking Cards", "Scroll Scale", "Dim Overlay", "Offer"],
    defaultSection: "Oferta Completa",
    previewType: "pp-stack",
    tech: ["Tailwind CSS", "React", "position: sticky", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const SKINS = [
  'bg-[linear-gradient(150deg,#7D0DEF,#4C0790)] text-white',
  'bg-white text-[#1A1A1A] border border-[rgba(76,7,144,.14)]',
  'bg-[#BEF21E] text-[#4C0790]',
  'bg-[linear-gradient(200deg,#4C0790,#2f0559)] text-white',
];

export function StickyStack({ cards = [
  { title: '14 meses de acesso', text: 'Você começa agora e segue até o fim do próximo ano.' },
  { title: 'Selo de Aluna Fundadora', text: 'Um reconhecimento de quem entrou primeiro.' },
  { title: '3 cursos completos', text: 'Conteúdo direto ao ponto para aplicar no negócio.' },
  { title: '5 workshops ao vivo', text: 'Ao longo do ano, no calendário das campanhas.' },
] }) {
  const list = useRef(null);

  useEffect(() => {
    const items = [...list.current.children];
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const layout = () => items.forEach((c, i) => {
      c.style.top = '';
      if (innerWidth <= 760) c.style.top = Math.round(Math.min(64 + i * 12, innerHeight - c.offsetHeight - 12)) + 'px';
      c._st = parseFloat(getComputedStyle(c).top) || 0;
    });
    const frame = () => {
      raf = 0;
      const vh = innerHeight, sc = items.map(() => 0);
      // quanto cada carta seguinte já cobriu (0..1) soma no "peso" das de trás
      items.forEach((c, i) => {
        if (!i) return;
        const r = c.getBoundingClientRect(), p = clamp(1 - (r.top - c._st) / Math.max(1, vh - c._st));
        for (let k = 0; k < i; k++) sc[k] += p;
      });
      items.forEach((c, i) => {
        c.style.setProperty('--s', (1 - sc[i] * 0.045).toFixed(4));
        c.style.setProperty('--dk', Math.min(0.45, sc[i] * 0.16).toFixed(3));
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(frame); };
    layout(); frame();
    addEventListener('scroll', on, { passive: true });
    const rs = () => { layout(); on(); };
    addEventListener('resize', rs);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', rs); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={list} className="mx-auto flex max-w-[1180px] flex-col gap-10 px-6 py-16">
      {cards.map((c, i) => (
        <article key={i}
          className={'sticky grid min-h-[420px] origin-top items-center gap-12 overflow-hidden rounded-[36px] p-10 shadow-[0_30px_60px_-36px_rgba(76,7,144,.55)] md:grid-cols-2 md:p-[52px] ' + SKINS[i % 4]}
          style={{ top: 'calc(96px + ' + i * 22 + 'px)', transform: 'scale(var(--s,1))' }}>
          {/* véu que escurece a carta quando outra passa por cima */}
          <i aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] rounded-[inherit] bg-[#1a0533]" style={{ opacity: 'var(--dk,0)' }} />
          <div>
            <h3 className="max-w-[22ch] text-[27px] font-bold uppercase leading-[1.15]">{c.title}</h3>
            <p className="mt-4 max-w-[46ch] opacity-85">{c.text}</p>
          </div>
          <div aria-hidden="true" className="h-[220px] rounded-[28px] bg-white/15" />
        </article>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="pp-stack mx-auto flex max-w-[1180px] flex-col gap-10 px-6 py-16">
  <article class="pp-card bg-[linear-gradient(150deg,#7D0DEF,#4C0790)] text-white" style="top:96px"><h3 class="text-[27px] font-bold uppercase">14 meses de acesso</h3></article>
  <article class="pp-card border border-[rgba(76,7,144,.14)] bg-white text-[#1A1A1A]" style="top:118px"><h3 class="text-[27px] font-bold uppercase">Selo de Aluna Fundadora</h3></article>
  <article class="pp-card bg-[#BEF21E] text-[#4C0790]" style="top:140px"><h3 class="text-[27px] font-bold uppercase">3 cursos completos</h3></article>
  <article class="pp-card bg-[linear-gradient(200deg,#4C0790,#2f0559)] text-white" style="top:162px"><h3 class="text-[27px] font-bold uppercase">5 workshops ao vivo</h3></article>
</div>
<style>
  .pp-card{position:sticky;min-height:420px;padding:52px;border-radius:36px;overflow:hidden;transform-origin:50% 0;transform:scale(var(--s,1));box-shadow:0 30px 60px -36px rgba(76,7,144,.55)}
  .pp-card::after{content:"";position:absolute;inset:0;background:#1a0533;opacity:var(--dk,0);pointer-events:none;border-radius:inherit}
</style>
<script>
(function () {
  var cards = [].slice.call(document.querySelectorAll('.pp-stack .pp-card'));
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function frame() {
    var vh = innerHeight, sc = cards.map(function () { return 0; });
    cards.forEach(function (c, i) { if (!i) return; var st = parseFloat(c.style.top) || 0, r = c.getBoundingClientRect(), p = clamp(1 - (r.top - st) / Math.max(1, vh - st)); for (var k = 0; k < i; k++) sc[k] += p; });
    cards.forEach(function (c, i) { c.style.setProperty('--s', (1 - sc[i] * 0.045).toFixed(4)); c.style.setProperty('--dk', Math.min(0.45, sc[i] * 0.16).toFixed(3)); });
  }
  addEventListener('scroll', function () { requestAnimationFrame(frame); }, { passive: true }); frame();
})();
</script>`,
    },
  },

  // 14 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-access-pass-3d",
    name: "Cartão de Acesso 3D Flutuante com Reflexo",
    category: "oferta",
    categoryLabel: "Oferta & Preço",
    description: "Um cartão tipo credencial VIP (roxo, com chip verde e anéis de textura) balança devagar em 3D sobre uma segunda carta verde deslocada atrás, enquanto uma faixa de brilho atravessa a superfície. Transmite exclusividade e 'acesso garantido' só com CSS.",
    tags: ["3D Card", "Perspective", "Glare Sweep", "Credential", "CSS Only"],
    defaultSection: "Oferta Completa",
    previewType: "pp-access-pass",
    tech: ["Tailwind CSS", "React", "CSS 3D Transforms", "CSS Keyframes"],
    frameworks: {
      react: `const CSS =
  '@keyframes pp-pass{0%,100%{transform:rotateY(-18deg) rotateX(10deg) translate3d(-10px,6px,30px)}50%{transform:rotateY(12deg) rotateX(-4deg) translate3d(10px,-10px,30px)}}' +
  '@keyframes pp-pass2{0%,100%{transform:rotateY(-18deg) rotateX(10deg) translate3d(34px,-34px,-40px) rotate(8deg)}50%{transform:rotateY(12deg) rotateX(-4deg) translate3d(44px,-44px,-40px) rotate(10deg)}}' +
  '@keyframes pp-glare{0%,30%{transform:translateX(-60%)}70%,100%{transform:translateX(60%)}}' +
  '.pp-pass{animation:pp-pass 8s ease-in-out infinite}.pp-pass2{animation:pp-pass2 8s ease-in-out infinite}.pp-gl{animation:pp-glare 4.5s ease-in-out infinite}' +
  '.pp-chip::before,.pp-chip::after{content:"";position:absolute;left:8px;right:8px;top:12px;height:1.5px;background:rgba(76,7,144,.45)}.pp-chip::after{top:22px}' +
  '@media (prefers-reduced-motion:reduce){.pp-pass,.pp-pass2,.pp-gl{animation:none}}';

export function AccessPass3D({ brand = 'Partiu Pro', label = 'ALUNA FUNDADORA', from = 'nov 2026', to = 'dez 2027' }) {
  const card = 'absolute h-[226px] w-[min(360px,86vw)] overflow-hidden rounded-[22px]';
  return (
    <div aria-hidden="true" className="relative grid h-[330px] place-items-center [perspective:1000px]">
      <style>{CSS}</style>
      <div className={card + ' pp-pass2 bg-[linear-gradient(135deg,#BEF21E,#93c90f)] shadow-[0_30px_40px_-30px_rgba(0,0,0,.5)]'} />
      <div className={card + ' pp-pass flex flex-col justify-between p-6 shadow-[0_40px_50px_-30px_rgba(0,0,0,.65)] bg-[radial-gradient(circle_at_110%_-10%,rgba(190,242,30,.35),transparent_40%),repeating-radial-gradient(circle_at_0_120%,rgba(255,255,255,.07)_0_2px,transparent_2px_12px),linear-gradient(135deg,#25033f,#3d0675_55%,#5b0bb0)]'}>
        <div className="flex items-start justify-between">
          <b className="text-[30px] leading-none tracking-[-.01em] text-[#BEF21E]">{brand}</b>
          <span className="pp-chip relative h-9 w-[46px] rounded-lg bg-[linear-gradient(135deg,#e3ff8a,#BEF21E_50%,#9cc914)] shadow-[inset_0_0_0_1px_rgba(76,7,144,.3)]" />
        </div>
        <small className="text-[11px] font-bold tracking-[.2em] text-white/75">{label}</small>
        <div className="flex items-center gap-3 text-[15px] font-bold text-white">
          <span>{from}</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#BEF21E]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          <span>{to}</span>
        </div>
        <i className="pp-gl pointer-events-none absolute inset-[-40%] bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,.28)_50%,transparent_60%)]" />
      </div>
    </div>
  );
}`,
      tailwind: `<div aria-hidden="true" class="relative grid h-[330px] place-items-center bg-[#4C0790] [perspective:1000px]">
  <div class="pp-pass2 absolute h-[226px] w-[min(360px,86vw)] rounded-[22px] bg-[linear-gradient(135deg,#BEF21E,#93c90f)] shadow-[0_30px_40px_-30px_rgba(0,0,0,.5)]"></div>
  <div class="pp-pass absolute flex h-[226px] w-[min(360px,86vw)] flex-col justify-between overflow-hidden rounded-[22px] p-6 shadow-[0_40px_50px_-30px_rgba(0,0,0,.65)] bg-[radial-gradient(circle_at_110%_-10%,rgba(190,242,30,.35),transparent_40%),repeating-radial-gradient(circle_at_0_120%,rgba(255,255,255,.07)_0_2px,transparent_2px_12px),linear-gradient(135deg,#25033f,#3d0675_55%,#5b0bb0)]">
    <div class="flex items-start justify-between"><b class="text-[30px] leading-none text-[#BEF21E]">Partiu Pro</b><span class="pp-chip relative h-9 w-[46px] rounded-lg bg-[linear-gradient(135deg,#e3ff8a,#BEF21E_50%,#9cc914)]"></span></div>
    <small class="text-[11px] font-bold tracking-[.2em] text-white/75">ALUNA FUNDADORA</small>
    <div class="flex items-center gap-3 text-[15px] font-bold text-white"><span>nov 2026</span><span class="text-[#BEF21E]">→</span><span>dez 2027</span></div>
    <i class="pp-gl pointer-events-none absolute inset-[-40%] bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,.28)_50%,transparent_60%)]"></i>
  </div>
</div>
<style>
  @keyframes pp-pass{0%,100%{transform:rotateY(-18deg) rotateX(10deg) translate3d(-10px,6px,30px)}50%{transform:rotateY(12deg) rotateX(-4deg) translate3d(10px,-10px,30px)}}
  @keyframes pp-pass2{0%,100%{transform:rotateY(-18deg) rotateX(10deg) translate3d(34px,-34px,-40px) rotate(8deg)}50%{transform:rotateY(12deg) rotateX(-4deg) translate3d(44px,-44px,-40px) rotate(10deg)}}
  @keyframes pp-glare{0%,30%{transform:translateX(-60%)}70%,100%{transform:translateX(60%)}}
  .pp-pass{animation:pp-pass 8s ease-in-out infinite}.pp-pass2{animation:pp-pass2 8s ease-in-out infinite}.pp-gl{animation:pp-glare 4.5s ease-in-out infinite}
  .pp-chip::before,.pp-chip::after{content:"";position:absolute;left:8px;right:8px;top:12px;height:1.5px;background:rgba(76,7,144,.45)}.pp-chip::after{top:22px}
  @media (prefers-reduced-motion:reduce){.pp-pass,.pp-pass2,.pp-gl{animation:none}}
</style>`,
    },
  },

  // 15 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-ferris-wheel-cards",
    name: "Roda Gigante de Cards Girando com a Rolagem",
    category: "cards",
    categoryLabel: "Cards & Benefícios",
    description: "Os cards de recursos ficam presos na borda de uma roda enorme cujo centro está abaixo da tela. Com a seção travada, a rolagem gira a roda no sentido horário: cada card entra pela esquerda, sobe ao topo do arco, segura um instante no centro com contorno verde e sai pela direita, com contador e barra de progresso.",
    tags: ["Scroll Pinned", "Rotation", "Carousel", "Arc Layout", "Progress"],
    defaultSection: "Benefícios / Recursos",
    previewType: "pp-ferris",
    tech: ["Tailwind CSS", "React", "position: sticky", "SVG", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const SKIN = ['bg-white text-[#4C0790]', 'bg-[#BEF21E] text-[#4C0790]', 'bg-[#5a12a8] text-white border border-white/20'];

export function FerrisWheel({ items = ['Comunidade de fundadoras', 'Ranking de evolução', 'Encontros mensais', 'Planilhas prontas', 'Agenda de campanhas', 'Suporte da tutora'], dist = 3.2 }) {
  const pin = useRef(null), inner = useRef(null), stage = useRef(null), tiles = useRef([]), rim = useRef(null), spokes = useRef(null), g = useRef(null), count = useRef(null), bar = useRef(null);

  useEffect(() => {
    const P = pin.current, I = inner.current, S = stage.current, T = tiles.current.filter(Boolean), n = T.length;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const W = {}; let raf = 0;

    const layout = () => {
      const vh = innerHeight, mob = innerWidth < 761;
      T.forEach((t) => (t.style.height = ''));
      W.W = S.clientWidth; W.cw = T[0].offsetWidth; W.ch = Math.max(...T.map((t) => t.offsetHeight));
      T.forEach((t) => (t.style.height = W.ch + 'px'));
      W.R = mob ? 950 : Math.max(1350, W.W * 1.15);        // raio enorme: o centro fica bem abaixo
      W.th = (W.cw + (mob ? 28 : 48)) / W.R;                // ângulo entre um card e outro
      W.top = 24;
      const edge = Math.asin(Math.min(1, W.W / 2 / W.R)), drop = W.R * (1 - Math.cos(edge));
      S.style.height = Math.round(W.top + W.ch + Math.max(Math.min(drop, 190), 110) + 20) + 'px';
      W.cx = W.W / 2; W.cy = W.top + W.ch / 2 + W.R;
      const rr = W.R - W.ch / 2 - 26;
      rim.current.setAttribute('cx', W.cx); rim.current.setAttribute('cy', W.cy); rim.current.setAttribute('r', rr.toFixed(1));
      let lines = '';
      for (let i = 0; i < n; i++) {
        const a = -i * W.th, sx = Math.sin(a), cy = -Math.cos(a);
        lines += '<line x1="' + (W.cx + sx * rr).toFixed(1) + '" y1="' + (W.cy + cy * rr).toFixed(1) + '" x2="' + (W.cx + sx * (rr - 70)).toFixed(1) + '" y2="' + (W.cy + cy * (rr - 70)).toFixed(1) + '"/>';
      }
      spokes.current.innerHTML = lines;
      // trava: altura extra = dist telas de rolagem
      const h = I.offsetHeight; W.d = vh * dist; W.pt = Math.max(16, (vh - h) / 2);
      I.style.top = W.pt + 'px'; P.style.height = h + W.d + 'px';
      frame();
    };
    const frame = () => {
      raf = 0;
      if (!W.R) return;
      const p = clamp((W.pt - P.getBoundingClientRect().top) / W.d);
      const raw = p * (n - 1), k = Math.min(n - 2, Math.floor(raw)), f = clamp((raw - k - 0.18) / 0.64); // segura no centro
      const A = (k + f * f * (3 - 2 * f)) * W.th, deg = 57.29578;
      T.forEach((t, i) => {
        const a = A - i * W.th, x = W.R * Math.sin(a), y = W.R * (1 - Math.cos(a)), out = Math.abs(x) > W.W / 2 + W.cw;
        t.style.visibility = out ? 'hidden' : '';
        if (!out) t.style.transform = 'translate(' + x.toFixed(1) + 'px,' + (W.top + y).toFixed(1) + 'px) rotate(' + (a * deg).toFixed(2) + 'deg)';
      });
      g.current.setAttribute('transform', 'rotate(' + (A * deg).toFixed(2) + ' ' + W.cx.toFixed(1) + ' ' + W.cy.toFixed(1) + ')');
      const act = Math.max(0, Math.min(n - 1, Math.round(A / W.th)));
      T.forEach((t, i) => t.classList.toggle('is-on', i === act));
      count.current.textContent = (act < 9 ? '0' : '') + (act + 1);
      bar.current.style.transform = 'scaleX(' + (A / ((n - 1) * W.th)).toFixed(3) + ')';
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(frame); };
    layout();
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', layout);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', layout); cancelAnimationFrame(raf); };
  }, [items.length, dist]);

  return (
    <div ref={pin} className="relative bg-[linear-gradient(165deg,#7D0DEF,#4C0790)]">
      <div ref={inner} className="sticky overflow-hidden py-6">
        <div ref={stage} className="relative h-[560px]">
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <g ref={g}>
              <circle ref={rim} fill="none" stroke="rgba(255,255,255,.26)" strokeWidth="2" strokeDasharray="3 11" strokeLinecap="round" />
              <g ref={spokes} stroke="rgba(255,255,255,.22)" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
          <ul className="absolute inset-0">
            {items.map((it, i) => (
              <li key={i} ref={(nd) => (tiles.current[i] = nd)}
                className={'absolute left-1/2 top-0 -ml-[150px] flex w-[300px] flex-col gap-4 rounded-[28px] p-4 pb-[22px] shadow-[0_30px_50px_-30px_rgba(0,0,0,.6)] transition-shadow duration-500 will-change-transform md:-ml-[170px] md:w-[340px] [&.is-on]:shadow-[0_0_0_3px_#BEF21E,0_34px_60px_-24px_rgba(190,242,30,.4)] ' + SKIN[i % 3]}>
                <div aria-hidden="true" className="h-[170px] rounded-[20px] bg-black/10" />
                <p className="px-1.5 text-[17px] font-bold leading-[1.45]">{it}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-1.5 flex items-center justify-center gap-[18px] text-sm font-bold tracking-[.16em] text-white/60">
          <span><b ref={count} className="text-[#BEF21E]">01</b> / {String(items.length).padStart(2, '0')}</span>
          <span className="relative h-1 w-[200px] overflow-hidden rounded bg-white/20"><i ref={bar} className="absolute inset-0 origin-left scale-x-0 rounded bg-[#BEF21E]" /></span>
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `<div class="pp-wh relative bg-[linear-gradient(165deg,#7D0DEF,#4C0790)]" data-dist="3.2">
  <div class="pp-wh-in sticky overflow-hidden py-6">
    <div class="pp-wh-stage relative h-[560px]">
      <svg class="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true"><g class="pp-wh-g"><circle class="pp-r1" fill="none" stroke="rgba(255,255,255,.26)" stroke-width="2" stroke-dasharray="3 11" stroke-linecap="round"/><g class="pp-r2" stroke="rgba(255,255,255,.22)" stroke-width="3" stroke-linecap="round"></g></g></svg>
      <ul class="absolute inset-0">
        <li class="pp-tile bg-white text-[#4C0790]"><div class="h-[170px] rounded-[20px] bg-black/10"></div><p>Comunidade de fundadoras</p></li>
        <li class="pp-tile bg-[#BEF21E] text-[#4C0790]"><div class="h-[170px] rounded-[20px] bg-black/10"></div><p>Ranking de evolução</p></li>
        <li class="pp-tile bg-[#5a12a8] text-white"><div class="h-[170px] rounded-[20px] bg-black/10"></div><p>Encontros mensais</p></li>
        <li class="pp-tile bg-white text-[#4C0790]"><div class="h-[170px] rounded-[20px] bg-black/10"></div><p>Planilhas prontas</p></li>
        <li class="pp-tile bg-[#BEF21E] text-[#4C0790]"><div class="h-[170px] rounded-[20px] bg-black/10"></div><p>Agenda de campanhas</p></li>
      </ul>
    </div>
    <div class="mt-1.5 flex items-center justify-center gap-[18px] text-sm font-bold tracking-[.16em] text-white/60"><span><b class="pp-count text-[#BEF21E]">01</b> / 05</span><span class="relative h-1 w-[200px] overflow-hidden rounded bg-white/20"><i class="pp-bar absolute inset-0 origin-left scale-x-0 rounded bg-[#BEF21E]"></i></span></div>
  </div>
</div>
<style>
  .pp-tile{position:absolute;left:50%;top:0;width:340px;margin-left:-170px;display:flex;flex-direction:column;gap:16px;padding:16px 16px 22px;border-radius:28px;font-weight:700;font-size:17px;box-shadow:0 30px 50px -30px rgba(0,0,0,.6);transition:box-shadow .5s;will-change:transform}
  .pp-tile.is-on{box-shadow:0 0 0 3px #BEF21E,0 34px 60px -24px rgba(190,242,30,.4)}
  @media (max-width:760px){.pp-tile{width:300px;margin-left:-150px}}
</style>
<script>
(function () {
  var P = document.querySelector('.pp-wh'), I = P.querySelector('.pp-wh-in'), S = P.querySelector('.pp-wh-stage'), T = [].slice.call(P.querySelectorAll('.pp-tile')), n = T.length;
  var g = P.querySelector('.pp-wh-g'), rim = P.querySelector('.pp-r1'), sp = P.querySelector('.pp-r2'), count = P.querySelector('.pp-count'), bar = P.querySelector('.pp-bar'), W = {};
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function layout() {
    var vh = innerHeight, mob = innerWidth < 761; T.forEach(function (t) { t.style.height = ''; });
    W.W = S.clientWidth; W.cw = T[0].offsetWidth; W.ch = Math.max.apply(null, T.map(function (t) { return t.offsetHeight; })); T.forEach(function (t) { t.style.height = W.ch + 'px'; });
    W.R = mob ? 950 : Math.max(1350, W.W * 1.15); W.th = (W.cw + (mob ? 28 : 48)) / W.R; W.top = 24;
    var edge = Math.asin(Math.min(1, W.W / 2 / W.R)), drop = W.R * (1 - Math.cos(edge));
    S.style.height = Math.round(W.top + W.ch + Math.max(Math.min(drop, 190), 110) + 20) + 'px';
    W.cx = W.W / 2; W.cy = W.top + W.ch / 2 + W.R; var rr = W.R - W.ch / 2 - 26, lines = '';
    rim.setAttribute('cx', W.cx); rim.setAttribute('cy', W.cy); rim.setAttribute('r', rr.toFixed(1));
    for (var i = 0; i < n; i++) { var a = -i * W.th, sx = Math.sin(a), cy = -Math.cos(a); lines += '<line x1="' + (W.cx + sx * rr).toFixed(1) + '" y1="' + (W.cy + cy * rr).toFixed(1) + '" x2="' + (W.cx + sx * (rr - 70)).toFixed(1) + '" y2="' + (W.cy + cy * (rr - 70)).toFixed(1) + '"/>'; }
    sp.innerHTML = lines;
    var h = I.offsetHeight; W.d = vh * parseFloat(P.dataset.dist || 3); W.pt = Math.max(16, (vh - h) / 2); I.style.top = W.pt + 'px'; P.style.height = (h + W.d) + 'px';
    frame();
  }
  function frame() {
    var p = clamp((W.pt - P.getBoundingClientRect().top) / W.d), raw = p * (n - 1), k = Math.min(n - 2, Math.floor(raw)), f = clamp((raw - k - 0.18) / 0.64);
    var A = (k + f * f * (3 - 2 * f)) * W.th, deg = 57.29578;
    T.forEach(function (t, i) { var a = A - i * W.th, x = W.R * Math.sin(a), y = W.R * (1 - Math.cos(a)), out = Math.abs(x) > W.W / 2 + W.cw; t.style.visibility = out ? 'hidden' : ''; if (!out) t.style.transform = 'translate(' + x.toFixed(1) + 'px,' + (W.top + y).toFixed(1) + 'px) rotate(' + (a * deg).toFixed(2) + 'deg)'; });
    g.setAttribute('transform', 'rotate(' + (A * deg).toFixed(2) + ' ' + W.cx.toFixed(1) + ' ' + W.cy.toFixed(1) + ')');
    var act = Math.max(0, Math.min(n - 1, Math.round(A / W.th))); T.forEach(function (t, i) { t.classList.toggle('is-on', i === act); });
    count.textContent = (act < 9 ? '0' : '') + (act + 1); bar.style.transform = 'scaleX(' + (A / ((n - 1) * W.th)).toFixed(3) + ')';
  }
  addEventListener('scroll', function () { requestAnimationFrame(frame); }, { passive: true }); addEventListener('resize', layout); layout();
})();
</script>`,
    },
  },

  // 16 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-ticket-3d-stamp",
    name: "Ticket 3D da Oferta com Carimbo, Confete e Holográfico",
    category: "oferta",
    categoryLabel: "Oferta & Preço",
    description: "A oferta vira um ingresso de verdade: corpo roxo e canhoto verde com recortes circulares, picote, espessura feita com camadas empilhadas em Z e um reflexo holográfico que atravessa conforme a rolagem. Ele inclina com o mouse e flutua; quando termina de entrar, o selo desce batendo no canhoto com anel de tinta, confete e um tremor no ticket.",
    tags: ["3D Ticket", "CSS Mask", "Holographic Foil", "Stamp", "Confetti", "Mouse Tilt"],
    defaultSection: "Oferta / Preço",
    previewType: "pp-ticket",
    tech: ["Tailwind CSS", "React", "CSS 3D Transforms", "CSS Mask", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
// recortes em meia-lua no topo e na base, exatamente na linha do picote (--cut)
const CSS =
  '.pp-tk{--stub:380px;--cut:calc(100% - var(--stub))}' +
  '.pp-tk3{--tkm:radial-gradient(circle at var(--cut) 0,transparent 22px,#000 22.5px) 0 0/100% 51% no-repeat,radial-gradient(circle at var(--cut) 100%,transparent 22px,#000 22.5px) 0 100%/100% 51% no-repeat}' +
  '.pp-msk{-webkit-mask:var(--tkm);mask:var(--tkm)}' +
  '.pp-stamp{opacity:0;transform:translateZ(70px) scale(2.3) rotate(-26deg)}' +
  '.pp-tk.is-stamp .pp-stamp{animation:pp-stamp .72s cubic-bezier(.2,.9,.3,1.25) both}' +
  '.pp-tk.is-stamp .pp-ink{animation:pp-ink .8s ease-out .36s both}' +
  '.pp-tk.is-stamp .pp-cf{animation:pp-burst .9s cubic-bezier(.2,.8,.3,1) .34s both}' +
  '@keyframes pp-stamp{0%{opacity:0;transform:translateZ(70px) scale(2.3) rotate(-26deg)}52%{opacity:1;transform:translateZ(70px) scale(.88) rotate(5deg)}72%{transform:translateZ(70px) scale(1.06) rotate(-2deg)}100%{opacity:1;transform:translateZ(70px) scale(1) rotate(0)}}' +
  '@keyframes pp-ink{0%{opacity:.7;transform:scale(.92)}100%{opacity:0;transform:scale(1.7)}}' +
  '@keyframes pp-burst{0%{opacity:1;transform:rotate(var(--a)) translateX(36px) scale(1)}100%{opacity:0;transform:rotate(var(--a)) translateX(110px) rotate(140deg) scale(.5)}}' +
  '@media (max-width:860px){.pp-tk{--stub:0px}.pp-tk3{--tkm:linear-gradient(#000,#000)}}' +
  '@media (prefers-reduced-motion:reduce){.pp-stamp{opacity:1;transform:translateZ(70px)}}';

export function Ticket3D({ title = 'Você leva:', cap = 'BLACK DO PARTIU', items = ['14 meses de acesso', '3 cursos completos', '5 workshops em 2027', 'Selo de Aluna Fundadora'], price = 'R$ 169,67', installments = '12x de', cash = 'ou R$ 1.548 à vista', cta = 'Quero garantir', href = '#' }) {
  const sc = useRef(null), tk = useRef(null), sh = useRef(null), foil = useRef(null);

  useEffect(() => {
    const S = sc.current, E = tk.current;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(pointer: fine)').matches;
    let trx = 0, tryy = 0, crx = 0, cry = 0, raf = 0, vis = false, stamped = false, jolt = -1e9;
    const move = (e) => { const r = S.getBoundingClientRect(); tryy = ((e.clientX - r.left) / r.width - 0.5) * 18; trx = -((e.clientY - r.top) / r.height - 0.5) * 12; };
    const leave = () => { trx = 0; tryy = 0; };
    const loop = (t) => {
      raf = vis ? requestAnimationFrame(loop) : 0;
      const vh = innerHeight, r = S.getBoundingClientRect();
      const p = clamp((vh - r.top) / (vh * 0.75)); // entrada: 0 = abaixo, 1 = encaixado
      crx += (trx - crx) * 0.08; cry += (tryy - cry) * 0.08;
      if (!stamped && p > 0.8) { stamped = true; S.classList.remove('is-stamp'); void S.offsetWidth; S.classList.add('is-stamp'); jolt = t + 360; }
      else if (stamped && p < 0.25) { stamped = false; S.classList.remove('is-stamp'); }
      const jt = (t - jolt) / 1000, jy = jt > 0 && jt < 0.7 ? Math.sin(jt * 42) * 7 * Math.exp(-jt * 7) : 0; // tremor do carimbo
      const rx = crx + Math.cos(t / 2100) * 3 + (1 - p) * 34 + jy * 0.6, ry = cry + Math.sin(t / 1700) * 6;
      E.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(' + ((1 - p) * 70 + jy).toFixed(1) + 'px)';
      foil.current.style.setProperty('--hx', (-40 + clamp((vh - r.top) / (vh + r.height)) * 180).toFixed(1) + '%');
      E.style.setProperty('--gx', (50 + ry * 3.5).toFixed(1) + '%'); E.style.setProperty('--gy', (40 - rx * 3.5).toFixed(1) + '%');
      sh.current.style.transform = 'scaleX(' + (1 - Math.abs(ry) / 40).toFixed(3) + ')';
    };
    if (reduce) { S.classList.add('is-stamp'); return; }
    const io = new IntersectionObserver(([en]) => { vis = en.isIntersecting; if (vis && !raf) raf = requestAnimationFrame(loop); }, { rootMargin: '100px 0px' });
    io.observe(S);
    if (fine) S.addEventListener('pointermove', move);
    S.addEventListener('pointerleave', leave);
    return () => { io.disconnect(); cancelAnimationFrame(raf); S.removeEventListener('pointermove', move); S.removeEventListener('pointerleave', leave); };
  }, []);

  const layer = 'pp-msk absolute inset-0 rounded-[32px]';
  return (
    <div ref={sc} className="pp-tk relative mx-auto max-w-[1180px] [perspective:1700px]">
      <style>{CSS}</style>
      <i ref={sh} aria-hidden="true" className="absolute bottom-[-60px] left-[8%] right-[8%] h-[70px] rounded-[50%] bg-[radial-gradient(closest-side,rgba(76,7,144,.42),transparent)] blur-[10px]" />
      <article ref={tk} className="pp-tk3 relative will-change-transform [transform-style:preserve-3d]">
        {/* espessura: 7 camadas empurradas para trás em Z */}
        {[14, 12, 10, 8, 6, 4, 2].map((z) => (
          <i key={z} aria-hidden="true" className={layer + ' bg-[linear-gradient(90deg,#24033f_var(--cut),#7a9a0c_var(--cut))]'} style={{ transform: 'translateZ(-' + z + 'px)' }} />
        ))}
        <div aria-hidden="true" className={layer + ' overflow-hidden'}>
          <div className="absolute inset-y-0 left-0 right-[var(--stub)] bg-[repeating-radial-gradient(circle_at_0_0,rgba(255,255,255,.055)_0_2px,transparent_2px_16px),radial-gradient(circle_at_85%_-20%,rgba(190,242,30,.25),transparent_45%),linear-gradient(140deg,#8a1cff,#7D0DEF_35%,#4C0790)]" />
          <div className="absolute inset-y-0 right-0 w-[var(--stub)] bg-[repeating-linear-gradient(45deg,rgba(76,7,144,.06)_0_2px,transparent_2px_12px),linear-gradient(160deg,#d4ff4a,#BEF21E_50%,#a9dc12)]" />
        </div>
        {/* picote */}
        <i aria-hidden="true" className="absolute bottom-[30px] left-[var(--cut)] top-[30px] -ml-[3px] hidden w-1.5 bg-[radial-gradient(circle,#F2F2F2_2.6px,transparent_3px)_0_0/6px_14px_repeat-y] min-[861px]:block" />
        <div className="relative grid [transform-style:preserve-3d] [transform:translateZ(2px)] min-[861px]:grid-cols-[minmax(0,1fr)_var(--stub)]">
          <div className="flex flex-col p-9 text-white [transform-style:preserve-3d] md:p-12">
            <div className="border-b border-dashed border-white/30 pb-5 [transform:translateZ(18px)]">
              <span className="text-[13px] font-bold uppercase tracking-[.12em] text-[#BEF21E]">{cap}</span>
              <h3 className="mt-1.5 text-[30px] font-bold">{title}</h3>
            </div>
            <ul className="mt-6 grid gap-3 [transform:translateZ(10px)]">
              {items.map((it) => (
                <li key={it} className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 py-2 pl-2 pr-5 text-[15px]">
                  <i className="h-8 w-8 flex-none rounded-full bg-white shadow-[inset_0_0_0_7px_#BEF21E]" />{it}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center p-8 text-center text-[#4C0790] [transform-style:preserve-3d] max-[860px]:rounded-b-[32px] max-[860px]:bg-[#BEF21E]">
            <div className="pp-stamp relative mb-3 grid h-[104px] w-[104px] place-items-center rounded-full bg-[#4C0790] text-[11px] font-bold uppercase leading-tight tracking-[.1em] text-[#BEF21E] shadow-[0_22px_18px_-10px_rgba(76,7,144,.5)]">
              Aluna<br />Fundadora
              <i aria-hidden="true" className="pp-ink absolute inset-[-4px] rounded-full border-[3px] border-[#7D0DEF] opacity-0" />
              {Array.from({ length: 12 }, (_, k) => (
                <i key={k} aria-hidden="true" className={'pp-cf absolute left-1/2 top-1/2 -m-[4.5px] h-[9px] w-[9px] opacity-0 ' + (k % 2 ? 'rounded-full bg-white' : 'rounded-[2px] bg-[#7D0DEF]')} style={{ '--a': k * 30 + 'deg' }} />
              ))}
            </div>
            <div className="[transform:translateZ(40px)]">
              <small className="block text-[19px] font-bold">{installments}</small>
              <b className="my-1.5 block whitespace-nowrap text-[46px] leading-none tracking-[-.03em] [text-shadow:0_3px_0_rgba(255,255,255,.45)]">{price}</b>
              <span className="block">{cash}</span>
            </div>
            <a href={href} className="mt-5 w-full rounded-full bg-[#4C0790] px-6 py-5 text-sm font-bold uppercase text-white transition-transform duration-500 [transform:translateZ(30px)] hover:[transform:translateZ(30px)_translateY(-2px)]">{cta}</a>
            <div aria-hidden="true" className="mt-5 h-[34px] w-full rounded opacity-80 bg-[repeating-linear-gradient(90deg,#4C0790_0_2px,transparent_2px_5px,#4C0790_5px_9px,transparent_9px_11px,#4C0790_11px_12px,transparent_12px_16px)]" />
          </div>
        </div>
        {/* holográfico (rolagem) + brilho (mouse) */}
        <i ref={foil} aria-hidden="true" className={layer + ' pointer-events-none mix-blend-soft-light [transform:translateZ(1.5px)]'}
          style={{ background: 'linear-gradient(105deg,transparent calc(var(--hx,-40%) - 16%),rgba(190,242,30,.55) calc(var(--hx,-40%) - 6%),rgba(255,255,255,.85) var(--hx,-40%),rgba(237,227,251,.6) calc(var(--hx,-40%) + 6%),transparent calc(var(--hx,-40%) + 16%))' }} />
        <i aria-hidden="true" className={layer + ' pointer-events-none mix-blend-soft-light [transform:translateZ(1px)] bg-[radial-gradient(circle_at_var(--gx,30%)_var(--gy,20%),rgba(255,255,255,.35),transparent_46%)]'} />
      </article>
    </div>
  );
}`,
      tailwind: `<!-- Ticket 3D: estrutura + estilos + script (versão HTML do componente React) -->
<div class="pp-tk relative mx-auto max-w-[1180px] [perspective:1700px]">
  <i class="pp-tk-sh absolute bottom-[-60px] left-[8%] right-[8%] h-[70px] rounded-[50%] bg-[radial-gradient(closest-side,rgba(76,7,144,.42),transparent)] blur-[10px]"></i>
  <article class="pp-tk3 relative [transform-style:preserve-3d]">
    <i class="pp-lay" style="--z:14"></i><i class="pp-lay" style="--z:10"></i><i class="pp-lay" style="--z:6"></i><i class="pp-lay" style="--z:2"></i>
    <div class="pp-msk pp-bg absolute inset-0 overflow-hidden rounded-[32px]"></div>
    <i class="pp-perf"></i>
    <div class="relative grid grid-cols-[minmax(0,1fr)_var(--stub)] [transform:translateZ(2px)] [transform-style:preserve-3d]">
      <div class="p-12 text-white">
        <span class="text-[13px] font-bold uppercase tracking-[.12em] text-[#BEF21E]">BLACK DO PARTIU</span>
        <h3 class="mt-1.5 text-[30px] font-bold">Você leva:</h3>
        <ul class="mt-6 grid gap-3"><li class="rounded-full bg-white/10 px-5 py-2.5">14 meses de acesso</li><li class="rounded-full bg-white/10 px-5 py-2.5">3 cursos completos</li><li class="rounded-full bg-white/10 px-5 py-2.5">5 workshops em 2027</li></ul>
      </div>
      <div class="flex flex-col items-center p-8 text-center text-[#4C0790] [transform-style:preserve-3d]">
        <div class="pp-stamp relative mb-3 grid h-[104px] w-[104px] place-items-center rounded-full bg-[#4C0790] text-[11px] font-bold uppercase text-[#BEF21E]">Aluna<br>Fundadora<i class="pp-ink"></i>
          <i class="pp-cf" style="--a:0deg"></i><i class="pp-cf" style="--a:45deg"></i><i class="pp-cf" style="--a:90deg"></i><i class="pp-cf" style="--a:135deg"></i><i class="pp-cf" style="--a:180deg"></i><i class="pp-cf" style="--a:225deg"></i><i class="pp-cf" style="--a:270deg"></i><i class="pp-cf" style="--a:315deg"></i>
        </div>
        <small class="text-[19px] font-bold">12x de</small><b class="my-1.5 text-[46px] leading-none">R$ 169,67</b><span>ou R$ 1.548 à vista</span>
        <a href="#" class="mt-5 w-full rounded-full bg-[#4C0790] px-6 py-5 text-sm font-bold uppercase text-white">Quero garantir</a>
      </div>
    </div>
    <i class="pp-msk pp-foil"></i>
  </article>
</div>
<style>
  .pp-tk{--stub:380px;--cut:calc(100% - var(--stub))}
  .pp-tk3{--tkm:radial-gradient(circle at var(--cut) 0,transparent 22px,#000 22.5px) 0 0/100% 51% no-repeat,radial-gradient(circle at var(--cut) 100%,transparent 22px,#000 22.5px) 0 100%/100% 51% no-repeat}
  .pp-msk,.pp-lay{-webkit-mask:var(--tkm);mask:var(--tkm)}
  .pp-lay{position:absolute;inset:0;border-radius:32px;background:linear-gradient(90deg,#24033f var(--cut),#7a9a0c var(--cut));transform:translateZ(calc(var(--z) * -1px))}
  .pp-bg{background:linear-gradient(160deg,#d4ff4a,#BEF21E 50%,#a9dc12) right/var(--stub) 100% no-repeat,radial-gradient(circle at 85% -20%,rgba(190,242,30,.25),transparent 45%),linear-gradient(140deg,#8a1cff,#7D0DEF 35%,#4C0790)}
  .pp-perf{position:absolute;left:var(--cut);top:30px;bottom:30px;width:6px;margin-left:-3px;background:radial-gradient(circle,#F2F2F2 2.6px,transparent 3px) 0 0/6px 14px repeat-y}
  .pp-foil{position:absolute;inset:0;border-radius:32px;pointer-events:none;transform:translateZ(1.5px);mix-blend-mode:soft-light;background:linear-gradient(105deg,transparent calc(var(--hx,-40%) - 16%),rgba(190,242,30,.55) calc(var(--hx,-40%) - 6%),rgba(255,255,255,.85) var(--hx,-40%),rgba(237,227,251,.6) calc(var(--hx,-40%) + 6%),transparent calc(var(--hx,-40%) + 16%))}
  .pp-ink{position:absolute;inset:-4px;border-radius:50%;border:3px solid #7D0DEF;opacity:0}
  .pp-cf{position:absolute;left:50%;top:50%;width:9px;height:9px;margin:-4.5px;border-radius:2px;background:#7D0DEF;opacity:0}.pp-cf:nth-of-type(even){background:#fff;border-radius:50%}
  .pp-stamp{opacity:0;transform:translateZ(70px) scale(2.3) rotate(-26deg)}
  .pp-tk.is-stamp .pp-stamp{animation:pp-stamp .72s cubic-bezier(.2,.9,.3,1.25) both}
  .pp-tk.is-stamp .pp-ink{animation:pp-ink .8s ease-out .36s both}
  .pp-tk.is-stamp .pp-cf{animation:pp-burst .9s cubic-bezier(.2,.8,.3,1) .34s both}
  @keyframes pp-stamp{0%{opacity:0;transform:translateZ(70px) scale(2.3) rotate(-26deg)}52%{opacity:1;transform:translateZ(70px) scale(.88) rotate(5deg)}72%{transform:translateZ(70px) scale(1.06) rotate(-2deg)}100%{opacity:1;transform:translateZ(70px) scale(1) rotate(0)}}
  @keyframes pp-ink{0%{opacity:.7;transform:scale(.92)}100%{opacity:0;transform:scale(1.7)}}
  @keyframes pp-burst{0%{opacity:1;transform:rotate(var(--a)) translateX(36px) scale(1)}100%{opacity:0;transform:rotate(var(--a)) translateX(110px) rotate(140deg) scale(.5)}}
</style>
<script>
(function () {
  var S = document.querySelector('.pp-tk'), E = S.querySelector('.pp-tk3'), sh = S.querySelector('.pp-tk-sh'), foil = S.querySelector('.pp-foil');
  var trx = 0, tryy = 0, crx = 0, cry = 0, vis = false, stamped = false, jolt = -1e9;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  if (matchMedia('(pointer: fine)').matches) S.addEventListener('pointermove', function (e) { var r = S.getBoundingClientRect(); tryy = ((e.clientX - r.left) / r.width - 0.5) * 18; trx = -((e.clientY - r.top) / r.height - 0.5) * 12; });
  S.addEventListener('pointerleave', function () { trx = tryy = 0; });
  new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }, { rootMargin: '100px 0px' }).observe(S);
  function loop(t) {
    requestAnimationFrame(loop); if (!vis) return;
    var vh = innerHeight, r = S.getBoundingClientRect(), p = clamp((vh - r.top) / (vh * 0.75));
    crx += (trx - crx) * 0.08; cry += (tryy - cry) * 0.08;
    if (!stamped && p > 0.8) { stamped = true; S.classList.remove('is-stamp'); void S.offsetWidth; S.classList.add('is-stamp'); jolt = t + 360; }
    else if (stamped && p < 0.25) { stamped = false; S.classList.remove('is-stamp'); }
    var jt = (t - jolt) / 1000, jy = jt > 0 && jt < 0.7 ? Math.sin(jt * 42) * 7 * Math.exp(-jt * 7) : 0;
    var rx = crx + Math.cos(t / 2100) * 3 + (1 - p) * 34 + jy * 0.6, ry = cry + Math.sin(t / 1700) * 6;
    E.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(' + ((1 - p) * 70 + jy).toFixed(1) + 'px)';
    foil.style.setProperty('--hx', (-40 + clamp((vh - r.top) / (vh + r.height)) * 180).toFixed(1) + '%');
    sh.style.transform = 'scaleX(' + (1 - Math.abs(ry) / 40).toFixed(3) + ')';
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) S.classList.add('is-stamp'); else requestAnimationFrame(loop);
})();
</script>`,
    },
  },

  // 17 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-photo-plate-reveal",
    name: "Foto que Abre de Baixo com Placa Verde Deslizando",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "A foto de autoridade é revelada de baixo para cima por um recorte arredondado conforme a rolagem, desfazendo um leve zoom; ao mesmo tempo, uma placa verde desliza e gira para trás dela e depois fica boiando devagar. Badges brancos de números flutuam por cima. Apresentação calorosa e confiante de quem está por trás do produto.",
    tags: ["clip-path", "Scroll Reveal", "Zoom Out", "Floating Badges", "Authority"],
    defaultSection: "Autoridade / Quem Somos",
    previewType: "pp-photo-plate",
    tech: ["Tailwind CSS", "React", "clip-path", "CSS Variables"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const CSS =
  '@keyframes pp-plate{0%,100%{translate:0 0;rotate:0deg}30%{translate:16px -12px;rotate:2.5deg}65%{translate:-12px 10px;rotate:-2deg}}' +
  '@keyframes pp-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}' +
  '.pp-plate{animation:pp-plate 6.5s ease-in-out infinite}.pp-stat{animation:pp-bob 5s ease-in-out infinite}' +
  '@media (prefers-reduced-motion:reduce){.pp-plate,.pp-stat{animation:none}}';

export function PhotoPlateReveal({ src = 'foto-autoridade.webp', alt = 'Fundadores', stats = [['ALUNAS', '+ 12 mil'], ['ANOS', '10']] }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const frame = () => {
      raf = 0;
      const vh = innerHeight, r = el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      const rv = clamp((vh * 0.95 - r.top) / (vh * 0.6));
      el.style.setProperty('--rv', (1 - Math.pow(1 - rv, 3)).toFixed(3));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(frame); };
    frame();
    addEventListener('scroll', on, { passive: true });
    return () => { removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} className="relative mx-auto max-w-[520px] px-[22px] py-4" style={{ '--rv': 0 }}>
      <style>{CSS}</style>
      {/* placa verde: entra de baixo/esquerda e gira para trás da foto */}
      <i aria-hidden="true" className="pp-plate absolute bottom-[-10px] left-[56px] right-[-6px] top-[44px] rounded-[40px] bg-[#BEF21E]"
        style={{ opacity: 'var(--rv)', transform: 'translate(calc((1 - var(--rv)) * -60px),calc((1 - var(--rv)) * 70px)) rotate(calc(var(--rv) * 4deg))' }} />
      <figure className="relative z-[1] m-0 aspect-[8/9] overflow-hidden rounded-[36px] bg-[#EDE3FB]"
        style={{ clipPath: 'inset(calc((1 - var(--rv)) * 100%) 0 0 0 round 36px)' }}>
        <img src={src} alt={alt} loading="lazy" className="block h-full w-full origin-[50%_40%] object-cover" style={{ transform: 'scale(calc(1.22 - var(--rv) * .22))' }} />
      </figure>
      {stats.map(([k, v], i) => (
        <div key={k} className={'pp-stat absolute z-[2] flex items-center gap-3 rounded-[20px] border border-[rgba(76,7,144,.14)] py-2.5 pl-2.5 pr-[18px] shadow-[0_26px_40px_-24px_rgba(76,7,144,.55)] ' + (i ? 'right-[-24px] top-[8%] bg-[#7D0DEF] text-white' : 'left-[-30px] top-[-14px] bg-white')}
          style={{ animationDelay: -i * 1.7 + 's' }}>
          <span className={'h-11 w-11 rounded-[14px] ' + (i ? 'bg-white/15' : 'bg-[#EDE3FB]')} />
          <span>
            <small className={'block text-[10px] font-bold tracking-[.16em] ' + (i ? 'text-white/85' : 'text-[#5A5566]')}>{k}</small>
            <b className={'block whitespace-nowrap text-[23px] leading-[1.15] ' + (i ? 'text-[#BEF21E]' : 'text-[#7D0DEF]')}>{v}</b>
          </span>
        </div>
      ))}
    </div>
  );
}`,
      tailwind: `<div class="pp-au relative mx-auto max-w-[520px] px-[22px] py-4" style="--rv:0">
  <i class="pp-plate absolute bottom-[-10px] left-[56px] right-[-6px] top-[44px] rounded-[40px] bg-[#BEF21E]"></i>
  <figure class="relative z-[1] m-0 aspect-[8/9] overflow-hidden rounded-[36px] bg-[#EDE3FB] [clip-path:inset(calc((1_-_var(--rv))_*_100%)_0_0_0_round_36px)]">
    <img src="foto.webp" alt="Fundadores" class="block h-full w-full origin-[50%_40%] object-cover [transform:scale(calc(1.22_-_var(--rv)_*_.22))]">
  </figure>
  <div class="pp-stat absolute left-[-30px] top-[-14px] z-[2] rounded-[20px] bg-white px-[18px] py-2.5"><small class="block text-[10px] font-bold tracking-[.16em] text-[#5A5566]">ALUNAS</small><b class="text-[23px] text-[#7D0DEF]">+ 12 mil</b></div>
</div>
<style>
  .pp-plate{opacity:var(--rv);transform:translate(calc((1 - var(--rv)) * -60px),calc((1 - var(--rv)) * 70px)) rotate(calc(var(--rv) * 4deg));animation:pp-plate 6.5s ease-in-out infinite}
  @keyframes pp-plate{0%,100%{translate:0 0;rotate:0deg}30%{translate:16px -12px;rotate:2.5deg}65%{translate:-12px 10px;rotate:-2deg}}
  .pp-stat{animation:pp-bob 5s ease-in-out infinite}
  @keyframes pp-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
</style>
<script>
  (function () {
    var el = document.querySelector('.pp-au');
    function f() { var vh = innerHeight, r = el.getBoundingClientRect(), rv = Math.max(0, Math.min(1, (vh * 0.95 - r.top) / (vh * 0.6))); el.style.setProperty('--rv', (1 - Math.pow(1 - rv, 3)).toFixed(3)); }
    addEventListener('scroll', function () { requestAnimationFrame(f); }, { passive: true }); f();
  })();
</script>`,
    },
  },

  // 18 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-scroll-wave-nodes",
    name: "Onda com Bolinha que Acende os Pilares",
    category: "etapas",
    categoryLabel: "Etapas & Linha do Tempo",
    description: "Uma linha ondulada atravessa os três pilares da seção; uma bolinha verde com rastro e brilho percorre a onda conforme a rolagem, deixando o caminho aceso. Quando passa por um ícone, ele cresce, fica verde e pulsa; se o leitor volta, tudo apaga de novo. A onda também ondula sutilmente com o scroll.",
    tags: ["Scroll Progress", "SVG Path", "Stepper", "Glow", "Reversible"],
    defaultSection: "Apresentação / Pilares",
    previewType: "pp-wave-nodes",
    tech: ["Tailwind CSS", "React", "SVG", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const wy = (x, ph) => 72 + Math.sin(x / 170 + ph) * 22 + Math.sin(x / 63 - ph * 1.7) * 7;

export function WaveNodes({ steps = [
  { t: 'Direção', d: 'Saiba o que fazer primeiro.' },
  { t: 'Ferramentas', d: 'Organize e execute com clareza.' },
  { t: 'Acompanhamento', d: 'Tenha apoio para continuar.' },
] }) {
  const row = useRef(null), svg = useRef(null), nodes = useRef([]);

  useEffect(() => {
    const R = row.current, s = svg.current;
    const [b, tr, a, ...rest] = s.children; const trail = rest.slice(0, 3), glow = rest[3], dot = rest[4];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, nx = [], cur = -60, raf = 0, vis = false;
    const layout = () => {
      const r = s.getBoundingClientRect(); W = Math.round(r.width); s.setAttribute('viewBox', '0 0 ' + W + ' 144');
      nx = nodes.current.map((n) => { const ic = n.firstChild.getBoundingClientRect(); return ic.left + ic.width / 2 - r.left; });
    };
    const put = (el, x, ph) => { el.setAttribute('cx', x.toFixed(1)); el.setAttribute('cy', wy(x, ph).toFixed(1)); };
    const frame = (still) => {
      const vh = innerHeight, r = R.getBoundingClientRect(), ph = scrollY / 420;
      const target = -40 + clamp((vh * 0.82 - r.top) / (vh * 0.6)) * (W + 80);
      cur = still === true ? target : cur + (target - cur) * 0.14;
      let pa = '', pb = '', pt = '';
      for (let x = -20; x <= W + 20; x += 12) {
        const y = wy(x, ph).toFixed(1);
        pt += (pt ? 'L' : 'M') + x + ' ' + y;
        if (x <= cur) pa += (pa ? 'L' : 'M') + x + ' ' + y;
        pb += (pb ? 'L' : 'M') + x + ' ' + (144 - wy(x, ph + 2.2)).toFixed(1);
      }
      if (cur > -20) pa += (pa ? 'L' : 'M') + cur.toFixed(1) + ' ' + wy(cur, ph).toFixed(1);
      a.setAttribute('d', pa || 'M-30 72'); tr.setAttribute('d', pt); b.setAttribute('d', pb);
      put(dot, cur, ph); put(glow, cur, ph);
      trail.forEach((d, i) => { put(d, cur - (i + 1) * 16, ph); d.style.opacity = (0.55 - i * 0.16).toFixed(2); });
      let near = 999;
      nodes.current.forEach((n, i) => {
        const dist = Math.abs(nx[i] - cur); near = Math.min(near, dist);
        n.classList.toggle('is-on', cur >= nx[i] - 30);
        n.classList.toggle('is-hit', dist < 70);
      });
      glow.setAttribute('r', (24 + 26 * clamp(1 - near / 120)).toFixed(1));
    };
    const loop = () => { frame(); raf = vis ? requestAnimationFrame(loop) : 0; };
    layout();
    if (reduce) { cur = W; frame(true); return; }
    frame(true);
    const io = new IntersectionObserver(([en]) => { vis = en.isIntersecting; if (vis && !raf) raf = requestAnimationFrame(loop); }, { rootMargin: '100px 0px' });
    io.observe(R);
    addEventListener('resize', layout);
    return () => { io.disconnect(); cancelAnimationFrame(raf); removeEventListener('resize', layout); };
  }, [steps.length]);

  return (
    <div className="overflow-hidden bg-[linear-gradient(165deg,#7D0DEF,#4C0790)] px-6 py-32 text-white">
      <div ref={row} className="relative mx-auto grid max-w-[1180px] grid-cols-3 gap-10 text-center">
        <svg ref={svg} aria-hidden="true" preserveAspectRatio="none" className="pointer-events-none absolute left-[calc(50%-50vw)] top-[-22px] h-[144px] w-screen overflow-visible">
          <path fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2" strokeDasharray="10 10" />
          <path fill="none" stroke="rgba(190,242,30,.2)" strokeWidth="3.5" strokeLinecap="round" />
          <path fill="none" stroke="#BEF21E" strokeWidth="3.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 6px rgba(190,242,30,.55))' }} />
          <circle r="6" cx="-100" cy="72" fill="#BEF21E" /><circle r="4.5" cx="-100" cy="72" fill="#BEF21E" /><circle r="3" cx="-100" cy="72" fill="#BEF21E" />
          <circle r="24" cx="-100" cy="72" fill="rgba(190,242,30,.28)" style={{ filter: 'blur(4px)' }} />
          <circle r="8" cx="-100" cy="72" fill="#BEF21E" />
        </svg>
        {steps.map((s, i) => (
          <div key={i} ref={(n) => (nodes.current[i] = n)} className="group relative flex flex-col items-center">
            <div className="grid h-[100px] w-[100px] rotate-[-4deg] place-items-center rounded-[32px] bg-white text-[#7D0DEF] shadow-[0_22px_36px_-20px_rgba(0,0,0,.55)] transition-[transform,background,box-shadow] duration-[600ms] ease-[cubic-bezier(.34,1.56,.64,1)] group-[.is-on]:rotate-0 group-[.is-on]:scale-[1.14] group-[.is-on]:bg-[#BEF21E] group-[.is-on]:text-[#4C0790] group-[.is-on]:shadow-[0_0_0_10px_rgba(190,242,30,.22),0_22px_36px_-20px_rgba(0,0,0,.55)] group-[.is-hit]:scale-[1.24] group-[.is-hit]:shadow-[0_0_0_14px_rgba(190,242,30,.28),0_0_46px_10px_rgba(190,242,30,.5),0_22px_36px_-20px_rgba(0,0,0,.55)]">
              <span className="text-[34px] font-bold">{i + 1}</span>
            </div>
            <h3 className="mt-[34px] text-base font-bold uppercase tracking-[.08em]">{s.t}</h3>
            <p className="mt-2.5 max-w-[30ch] text-white/85">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      tailwind: `<div class="overflow-hidden bg-[linear-gradient(165deg,#7D0DEF,#4C0790)] px-6 py-32 text-white">
  <div class="pp-row relative mx-auto grid max-w-[1180px] grid-cols-3 gap-10 text-center">
    <svg class="pp-wave pointer-events-none absolute left-[calc(50%-50vw)] top-[-22px] h-[144px] w-screen overflow-visible" preserveAspectRatio="none" aria-hidden="true">
      <path class="w-b" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="2" stroke-dasharray="10 10"/>
      <path class="w-t" fill="none" stroke="rgba(190,242,30,.2)" stroke-width="3.5" stroke-linecap="round"/>
      <path class="w-a" fill="none" stroke="#BEF21E" stroke-width="3.5" stroke-linecap="round" style="filter:drop-shadow(0 0 6px rgba(190,242,30,.55))"/>
      <circle class="w-tr" r="6" cx="-100" cy="72" fill="#BEF21E"/><circle class="w-tr" r="4.5" cx="-100" cy="72" fill="#BEF21E"/><circle class="w-tr" r="3" cx="-100" cy="72" fill="#BEF21E"/>
      <circle class="w-g" r="24" cx="-100" cy="72" fill="rgba(190,242,30,.28)" style="filter:blur(4px)"/><circle class="w-c" r="8" cx="-100" cy="72" fill="#BEF21E"/>
    </svg>
    <div class="pp-node"><div class="pp-node-ic">1</div><h3 class="mt-[34px] font-bold uppercase tracking-[.08em]">Direção</h3></div>
    <div class="pp-node"><div class="pp-node-ic">2</div><h3 class="mt-[34px] font-bold uppercase tracking-[.08em]">Ferramentas</h3></div>
    <div class="pp-node"><div class="pp-node-ic">3</div><h3 class="mt-[34px] font-bold uppercase tracking-[.08em]">Acompanhamento</h3></div>
  </div>
</div>
<style>
  .pp-node{position:relative;display:flex;flex-direction:column;align-items:center}
  .pp-node-ic{width:100px;height:100px;border-radius:32px;background:#fff;color:#7D0DEF;font-size:34px;font-weight:700;display:grid;place-items:center;box-shadow:0 22px 36px -20px rgba(0,0,0,.55);transform:rotate(-4deg);transition:transform .6s cubic-bezier(.34,1.56,.64,1),background .5s,box-shadow .5s}
  .pp-node.is-on .pp-node-ic{background:#BEF21E;color:#4C0790;transform:rotate(0) scale(1.14);box-shadow:0 0 0 10px rgba(190,242,30,.22),0 22px 36px -20px rgba(0,0,0,.55)}
  .pp-node.is-hit .pp-node-ic{transform:rotate(0) scale(1.24);box-shadow:0 0 0 14px rgba(190,242,30,.28),0 0 46px 10px rgba(190,242,30,.5),0 22px 36px -20px rgba(0,0,0,.55)}
</style>
<script>
(function () {
  var row = document.querySelector('.pp-row'), s = row.querySelector('.pp-wave'), nodes = [].slice.call(row.querySelectorAll('.pp-node'));
  var a = s.querySelector('.w-a'), b = s.querySelector('.w-b'), t = s.querySelector('.w-t'), c = s.querySelector('.w-c'), g = s.querySelector('.w-g'), tr = [].slice.call(s.querySelectorAll('.w-tr'));
  var W = 0, nx = [], cur = -60, vis = false;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function wy(x, ph) { return 72 + Math.sin(x / 170 + ph) * 22 + Math.sin(x / 63 - ph * 1.7) * 7; }
  function put(el, x, ph) { el.setAttribute('cx', x.toFixed(1)); el.setAttribute('cy', wy(x, ph).toFixed(1)); }
  function layout() { var r = s.getBoundingClientRect(); W = Math.round(r.width); s.setAttribute('viewBox', '0 0 ' + W + ' 144'); nx = nodes.map(function (n) { var ic = n.firstElementChild.getBoundingClientRect(); return ic.left + ic.width / 2 - r.left; }); }
  function frame() {
    var vh = innerHeight, r = row.getBoundingClientRect(), ph = scrollY / 420, target = -40 + clamp((vh * 0.82 - r.top) / (vh * 0.6)) * (W + 80);
    cur += (target - cur) * 0.14; var pa = '', pb = '', pt = '';
    for (var x = -20; x <= W + 20; x += 12) { var y = wy(x, ph).toFixed(1); pt += (pt ? 'L' : 'M') + x + ' ' + y; if (x <= cur) pa += (pa ? 'L' : 'M') + x + ' ' + y; pb += (pb ? 'L' : 'M') + x + ' ' + (144 - wy(x, ph + 2.2)).toFixed(1); }
    if (cur > -20) pa += (pa ? 'L' : 'M') + cur.toFixed(1) + ' ' + wy(cur, ph).toFixed(1);
    a.setAttribute('d', pa || 'M-30 72'); t.setAttribute('d', pt); b.setAttribute('d', pb); put(c, cur, ph); put(g, cur, ph);
    tr.forEach(function (d, i) { put(d, cur - (i + 1) * 16, ph); d.style.opacity = (0.55 - i * 0.16).toFixed(2); });
    var near = 999; nodes.forEach(function (n, i) { var dist = Math.abs(nx[i] - cur); near = Math.min(near, dist); n.classList.toggle('is-on', cur >= nx[i] - 30); n.classList.toggle('is-hit', dist < 70); });
    g.setAttribute('r', (24 + 26 * clamp(1 - near / 120)).toFixed(1));
  }
  function loop() { if (vis) frame(); requestAnimationFrame(loop); }
  new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }, { rootMargin: '100px 0px' }).observe(row);
  addEventListener('resize', layout); layout(); requestAnimationFrame(loop);
})();
</script>`,
    },
  },

  // 19 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-pinned-horizontal-rail",
    name: "Trilho Horizontal Preso com Números que se Enchem",
    category: "etapas",
    categoryLabel: "Etapas & Linha do Tempo",
    description: "A seção trava na tela e a rolagem vertical vira movimento horizontal: os painéis dos passos deslizam da direita para a esquerda, o painel do centro ganha borda verde e o número gigante em contorno vai se enchendo de verde de baixo para cima enquanto atravessa a tela. Uma barra fina mostra o progresso do trilho.",
    tags: ["Scroll Pinned", "Horizontal Scroll", "Outline Number", "Fill Progress", "Steps"],
    defaultSection: "Como Funciona / Passos",
    previewType: "pp-h-rail",
    tech: ["Tailwind CSS", "React", "position: sticky", "background-clip:text"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function PinnedRail({ steps = [
  { t: 'Entenda seu momento', d: 'Responda ao diagnóstico para identificar dificuldades e pontos de atenção.' },
  { t: 'Receba seu plano', d: 'Um cronograma de 60 dias com o que fazer primeiro.' },
  { t: 'Execute com as ferramentas', d: 'Tarefas, agenda e números do negócio no mesmo lugar.' },
  { t: 'Acompanhe a evolução', d: 'Veja o que já avançou e qual é o próximo passo.' },
  { t: 'Continue com apoio', d: 'Encontros e tutoria para não parar no meio.' },
] }) {
  const pin = useRef(null), inner = useRef(null), track = useRef(null), bar = useRef(null);

  useEffect(() => {
    const P = pin.current, I = inner.current, T = track.current, panels = [...T.children];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const S = { d: 0, top: 0 }; let raf = 0;
    if (reduce) { panels.forEach((p) => p.classList.add('is-on')); return; }
    const layout = () => {
      const vh = innerHeight, last = T.lastElementChild;
      S.d = Math.max(0, last.offsetLeft + last.offsetWidth + (parseFloat(getComputedStyle(T).paddingLeft) || 0) - I.clientWidth);
      S.top = Math.max(16, (vh - I.offsetHeight) / 2);
      I.style.top = S.top + 'px'; P.style.height = I.offsetHeight + S.d + 'px';
      // posição de cada painel com o trilho no início (evita medir a cada quadro)
      const tr0 = T.style.transform; T.style.transform = 'none';
      panels.forEach((pn) => { const r = pn.getBoundingClientRect(); pn._l0 = r.left; pn._w = r.width; });
      T.style.transform = tr0; frame();
    };
    const frame = () => {
      raf = 0;
      const hp = S.d ? clamp((S.top - P.getBoundingClientRect().top) / S.d) : 0, iw = innerWidth;
      T.style.transform = 'translate3d(' + (-hp * S.d).toFixed(1) + 'px,0,0)';
      bar.current.style.transform = 'scaleX(' + hp.toFixed(4) + ')';
      let prevA = -1;
      panels.forEach((pn) => {
        const left = pn._l0 - hp * S.d;
        // cada número enche enquanto o painel atravessa de 80% até 30% da largura, em sequência
        let a = Math.max(0, (pn._l0 - iw * 0.8) / S.d, prevA + 0.12);
        const b = Math.min(1, Math.max(a + 0.16, (pn._l0 - iw * 0.3) / S.d));
        prevA = a; a = Math.min(a, b - 0.16);
        pn.classList.toggle('is-on', left < iw * 0.75 && left + pn._w > iw * 0.2);
        pn.style.setProperty('--f', clamp((hp - a) / (b - a)).toFixed(3));
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(frame); };
    layout();
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', layout);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', layout); cancelAnimationFrame(raf); };
  }, [steps.length]);

  return (
    <div ref={pin} className="relative bg-[linear-gradient(200deg,#4C0790,#3a0570)] text-white">
      <div ref={inner} className="sticky overflow-hidden py-10">
        <ol ref={track} className="flex w-max gap-6 px-[max(24px,calc((100vw-1180px)/2))] will-change-transform">
          {steps.map((s, i) => (
            <li key={i} className="flex w-[min(470px,84vw)] flex-none flex-col rounded-[32px] border border-white/15 bg-white/[.07] px-[30px] pb-[26px] pt-[30px] transition-[background,border-color] duration-[600ms] [&.is-on]:border-[rgba(190,242,30,.5)] [&.is-on]:bg-white/[.12]">
              <span aria-hidden="true" className="mb-[18px] inline-block self-start bg-clip-text px-1 pt-1 text-[110px] font-bold leading-[.9] tracking-[-.04em] text-transparent [-webkit-text-fill-color:transparent] [-webkit-text-stroke:2px_#BEF21E]"
                style={{ backgroundImage: 'linear-gradient(0deg,#BEF21E calc(var(--f,0) * 100%),transparent calc(var(--f,0) * 100%))' }}>
                {i + 1}
              </span>
              <h3 className="text-2xl font-bold">{s.t}</h3>
              <p className="mt-2.5 text-white/85">{s.d}</p>
              <div aria-hidden="true" className="mt-6 h-[150px] rounded-[22px] bg-white" />
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-[34px] h-1 w-[calc(100%-48px)] max-w-[1180px] overflow-hidden rounded bg-white/15">
          <i ref={bar} className="block h-full origin-left scale-x-0 bg-[#BEF21E]" />
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `<div class="pp-hs relative bg-[linear-gradient(200deg,#4C0790,#3a0570)] text-white">
  <div class="pp-hs-in sticky overflow-hidden py-10">
    <ol class="pp-hs-track flex w-max gap-6 px-[max(24px,calc((100vw-1180px)/2))] will-change-transform">
      <li class="pp-pn"><span class="pp-pn-n">1</span><h3 class="text-2xl font-bold">Entenda seu momento</h3><p class="mt-2.5 text-white/85">Responda ao diagnóstico.</p></li>
      <li class="pp-pn"><span class="pp-pn-n">2</span><h3 class="text-2xl font-bold">Receba seu plano</h3><p class="mt-2.5 text-white/85">Cronograma de 60 dias.</p></li>
      <li class="pp-pn"><span class="pp-pn-n">3</span><h3 class="text-2xl font-bold">Execute</h3><p class="mt-2.5 text-white/85">Tarefas e agenda.</p></li>
      <li class="pp-pn"><span class="pp-pn-n">4</span><h3 class="text-2xl font-bold">Acompanhe</h3><p class="mt-2.5 text-white/85">Veja o que avançou.</p></li>
    </ol>
    <div class="mx-auto mt-[34px] h-1 w-[calc(100%-48px)] max-w-[1180px] overflow-hidden rounded bg-white/15"><i class="pp-hs-bar block h-full origin-left scale-x-0 bg-[#BEF21E]"></i></div>
  </div>
</div>
<style>
  .pp-pn{flex:none;width:min(470px,84vw);min-height:360px;border-radius:32px;padding:30px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);transition:background .6s,border-color .6s}
  .pp-pn.is-on{background:rgba(255,255,255,.12);border-color:rgba(190,242,30,.5)}
  .pp-pn-n{display:inline-block;font-size:110px;line-height:.9;padding:4px 4px 0;margin-bottom:18px;font-weight:700;letter-spacing:-.04em;color:transparent;-webkit-text-fill-color:transparent;-webkit-text-stroke:2px #BEF21E;background:linear-gradient(0deg,#BEF21E calc(var(--f,0) * 100%),transparent calc(var(--f,0) * 100%));-webkit-background-clip:text;background-clip:text}
</style>
<script>
(function () {
  var P = document.querySelector('.pp-hs'), I = P.querySelector('.pp-hs-in'), T = P.querySelector('.pp-hs-track'), bar = P.querySelector('.pp-hs-bar'), panels = [].slice.call(T.children), S = { d: 0, top: 0 };
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function layout() {
    var vh = innerHeight, last = T.lastElementChild;
    S.d = Math.max(0, last.offsetLeft + last.offsetWidth + (parseFloat(getComputedStyle(T).paddingLeft) || 0) - I.clientWidth);
    S.top = Math.max(16, (vh - I.offsetHeight) / 2); I.style.top = S.top + 'px'; P.style.height = (I.offsetHeight + S.d) + 'px';
    var tr0 = T.style.transform; T.style.transform = 'none'; panels.forEach(function (pn) { var r = pn.getBoundingClientRect(); pn._l0 = r.left; pn._w = r.width; }); T.style.transform = tr0; frame();
  }
  function frame() {
    var hp = S.d ? clamp((S.top - P.getBoundingClientRect().top) / S.d) : 0, iw = innerWidth, prevA = -1;
    T.style.transform = 'translate3d(' + (-hp * S.d).toFixed(1) + 'px,0,0)'; bar.style.transform = 'scaleX(' + hp.toFixed(4) + ')';
    panels.forEach(function (pn) {
      var left = pn._l0 - hp * S.d, a = Math.max(0, (pn._l0 - iw * 0.8) / S.d, prevA + 0.12), b = Math.min(1, Math.max(a + 0.16, (pn._l0 - iw * 0.3) / S.d));
      prevA = a; a = Math.min(a, b - 0.16);
      pn.classList.toggle('is-on', left < iw * 0.75 && left + pn._w > iw * 0.2); pn.style.setProperty('--f', clamp((hp - a) / (b - a)).toFixed(3));
    });
  }
  addEventListener('scroll', function () { requestAnimationFrame(frame); }, { passive: true }); addEventListener('resize', layout); layout();
})();
</script>`,
    },
  },

  // 20 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-scroll-tools-phone",
    name: "Lista de Ferramentas que Troca a Tela do Celular",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "Com a seção travada, a rolagem vai ativando um item por vez da lista: o ícone gira e fica roxo, a descrição se abre, o trilho lateral enche e, ao lado, a tela do celular troca com os cards subindo em cascata enquanto o círculo verde do palco pulsa de tamanho. Clicar num item rola até ele.",
    tags: ["Scroll Pinned", "Tabs", "Phone Mockup", "Accordion", "Progress Rail"],
    defaultSection: "Ferramentas / Produto",
    previewType: "pp-tools-phone",
    tech: ["Tailwind CSS", "React", "position: sticky", "CSS Transitions"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const EASE = 'ease-[cubic-bezier(.22,1,.36,1)]';

export function ToolsPhone({ dist = 3.6, tools = [
  { t: 'Diagnóstico do negócio', d: 'Descubra o que precisa de atenção primeiro.', c: '#7D0DEF' },
  { t: 'Cronograma de 60 dias', d: 'Cada dia com a tarefa certa para avançar.', c: '#BEF21E' },
  { t: 'Agenda de campanhas', d: 'As datas que vendem, organizadas no ano.', c: '#4C0790' },
  { t: 'Números do negócio', d: 'Vendas, custos e lucro sem planilha confusa.', c: '#7D0DEF' },
] }) {
  const pin = useRef(null), inner = useRef(null), S = useRef({ d: 0, top: 0 });
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const P = pin.current, I = inner.current, n = tools.length;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || innerWidth < 900) return;
    let raf = 0;
    const layout = () => {
      const vh = innerHeight, h = I.offsetHeight;
      S.current.d = vh * dist; S.current.top = Math.max(16, (vh - h) / 2);
      I.style.top = S.current.top + 'px'; P.style.height = h + S.current.d + 'px';
    };
    const frame = () => {
      raf = 0;
      const p = clamp((S.current.top - P.getBoundingClientRect().top) / S.current.d);
      setCur(Math.min(n - 1, Math.floor(p * n)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(frame); };
    layout(); frame();
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', layout);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', layout); cancelAnimationFrame(raf); };
  }, [tools.length, dist]);

  const go = (i) => {
    const P = pin.current, s = S.current;
    if (!s.d) return setCur(i);
    const top = P.getBoundingClientRect().top + scrollY;
    scrollTo({ top: top - s.top + ((i + 0.5) / tools.length) * s.d, behavior: 'smooth' });
  };

  return (
    <div ref={pin} className="relative bg-[#F2F2F2]">
      <div ref={inner} className="sticky mx-auto grid max-w-[1180px] items-center gap-16 px-6 py-6 md:grid-cols-[1fr_1.05fr]">
        <div className="relative pl-[30px]">
          <div className="absolute bottom-2 left-0 top-2 w-1 rounded bg-[rgba(125,13,239,.12)]">
            <i className={'absolute inset-0 origin-top rounded bg-[#7D0DEF] transition-transform duration-500 ' + EASE} style={{ transform: 'scaleY(' + (cur + 1) / tools.length + ')' }} />
          </div>
          {tools.map((tl, i) => {
            const on = i === cur;
            return (
              <div key={i} className="border-b border-[rgba(76,7,144,.14)] last:border-0">
                <button type="button" aria-expanded={on} onClick={() => go(i)}
                  className={'flex w-full items-center gap-[18px] py-3 text-left text-xl font-bold leading-[1.25] transition-[opacity,color] duration-500 ' + (on ? 'text-[#4C0790] opacity-100' : 'text-[#1A1A1A] opacity-45 hover:opacity-80')}>
                  <span className={'grid h-[58px] w-[58px] flex-none place-items-center rounded-[18px] border transition-[background,transform] duration-[600ms] ease-[cubic-bezier(.34,1.56,.64,1)] ' + (on ? 'rotate-[-8deg] scale-[1.08] border-[#7D0DEF] bg-[#7D0DEF] text-white' : 'border-[rgba(76,7,144,.14)] bg-white text-[#7D0DEF]')}>{i + 1}</span>
                  {tl.t}
                </button>
                <div className={'grid transition-[grid-template-rows] duration-[600ms] ' + EASE + ' ' + (on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                  <div className="overflow-hidden"><p className="max-w-[52ch] pb-4 pl-[76px] text-[16.5px] text-[#5A5566]">{tl.d}</p></div>
                </div>
              </div>
            );
          })}
        </div>
        <div aria-hidden="true" className="relative hidden h-[620px] place-items-center overflow-hidden rounded-[40px] bg-[radial-gradient(rgba(255,255,255,.1)_1px,transparent_1.4px)_0_0/20px_20px,linear-gradient(160deg,#7D0DEF,#4C0790)] md:grid">
          <i className={'absolute left-1/2 top-1/2 h-[430px] w-[430px] rounded-full bg-[#BEF21E] transition-transform duration-[800ms] ' + EASE} style={{ transform: 'translate(-50%,-50%) scale(' + (0.9 + (cur % 3) * 0.08) + ')' }} />
          <div className="relative z-[2] aspect-[9/18.5] w-[280px] rounded-[40px] bg-[#16121d] p-2.5 shadow-[0_34px_60px_-26px_rgba(26,26,26,.55),inset_0_0_0_2px_#2c2636]">
            <div className="relative h-full w-full overflow-hidden rounded-[31px] bg-[#F2F2F2]">
              {tools.map((tl, i) => (
                <div key={i} className={'absolute inset-0 px-3 pb-[60px] pt-11 transition-[opacity,transform] duration-700 ' + EASE + ' ' + (i === cur ? 'opacity-100' : 'translate-y-[30px] scale-[.97] opacity-0')}>
                  <b className="mb-2.5 block text-sm text-[#4C0790]">{tl.t}</b>
                  {[0, 1, 2].map((k) => (
                    <div key={k} className={'mb-2 rounded-[14px] p-2.5 shadow-[0_4px_12px_-8px_rgba(76,7,144,.3)] transition-[opacity,transform] duration-[600ms] ' + EASE + ' ' + (i === cur ? 'opacity-100' : 'translate-y-3.5 opacity-0')}
                      style={{ transitionDelay: i === cur ? k * 0.08 + 's' : '0s', background: k ? '#fff' : tl.c }}>
                      <div className="h-[7px] w-4/5 rounded bg-black/10" /><div className="mt-1.5 h-[7px] w-1/2 rounded bg-black/10" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `<div class="pp-tools relative bg-[#F2F2F2]" data-dist="3.6">
  <div class="pp-tools-in sticky mx-auto grid max-w-[1180px] items-center gap-16 px-6 py-6 md:grid-cols-[1fr_1.05fr]">
    <div class="relative pl-[30px]">
      <div class="absolute bottom-2 left-0 top-2 w-1 rounded bg-[rgba(125,13,239,.12)]"><i class="pp-rail absolute inset-0 origin-top rounded bg-[#7D0DEF] transition-transform duration-500"></i></div>
      <div class="pp-it is-on"><button class="pp-it-b"><span class="pp-it-ic">1</span>Diagnóstico do negócio</button><div class="pp-it-d"><div><p>Descubra o que precisa de atenção primeiro.</p></div></div></div>
      <div class="pp-it"><button class="pp-it-b"><span class="pp-it-ic">2</span>Cronograma de 60 dias</button><div class="pp-it-d"><div><p>Cada dia com a tarefa certa.</p></div></div></div>
      <div class="pp-it"><button class="pp-it-b"><span class="pp-it-ic">3</span>Agenda de campanhas</button><div class="pp-it-d"><div><p>As datas que vendem.</p></div></div></div>
    </div>
    <div class="relative hidden h-[620px] place-items-center overflow-hidden rounded-[40px] bg-[linear-gradient(160deg,#7D0DEF,#4C0790)] md:grid">
      <i class="pp-blob absolute left-1/2 top-1/2 h-[430px] w-[430px] rounded-full bg-[#BEF21E]"></i>
      <div class="relative z-[2] aspect-[9/18.5] w-[280px] rounded-[40px] bg-[#16121d] p-2.5"><div class="relative h-full overflow-hidden rounded-[31px] bg-[#F2F2F2]">
        <div class="pp-scr is-on"><b>Diagnóstico</b><i></i><i></i><i></i></div><div class="pp-scr"><b>Cronograma</b><i></i><i></i><i></i></div><div class="pp-scr"><b>Agenda</b><i></i><i></i><i></i></div>
      </div></div>
    </div>
  </div>
</div>
<style>
  .pp-it{border-bottom:1px solid rgba(76,7,144,.14)}.pp-it:last-child{border:0}
  .pp-it-b{width:100%;display:flex;align-items:center;gap:18px;padding:12px 0;font-weight:700;font-size:20px;color:#1A1A1A;opacity:.45;transition:opacity .5s,color .5s;text-align:left}
  .pp-it-ic{width:58px;height:58px;border-radius:18px;background:#fff;border:1px solid rgba(76,7,144,.14);display:grid;place-items:center;color:#7D0DEF;flex:none;transition:background .5s,transform .6s cubic-bezier(.34,1.56,.64,1)}
  .pp-it.is-on .pp-it-b{opacity:1;color:#4C0790}.pp-it.is-on .pp-it-ic{background:#7D0DEF;color:#fff;transform:rotate(-8deg) scale(1.08)}
  .pp-it-d{display:grid;grid-template-rows:0fr;transition:grid-template-rows .6s cubic-bezier(.22,1,.36,1)}.pp-it-d>div{overflow:hidden}.pp-it-d p{padding:0 0 16px 76px;color:#5A5566}
  .pp-it.is-on .pp-it-d{grid-template-rows:1fr}
  .pp-blob{transform:translate(-50%,-50%) scale(var(--bs,1));transition:transform .8s cubic-bezier(.22,1,.36,1)}
  .pp-scr{position:absolute;inset:0;padding:44px 12px;opacity:0;transform:translateY(30px) scale(.97);transition:opacity .5s,transform .7s cubic-bezier(.22,1,.36,1)}
  .pp-scr.is-on{opacity:1;transform:none}.pp-scr b{display:block;margin-bottom:10px;color:#4C0790}
  .pp-scr i{display:block;height:58px;margin-bottom:8px;border-radius:14px;background:#fff;opacity:0;transform:translateY(14px);transition:transform .6s cubic-bezier(.22,1,.36,1),opacity .5s}
  .pp-scr.is-on i{opacity:1;transform:none}.pp-scr.is-on i:nth-of-type(2){transition-delay:.08s}.pp-scr.is-on i:nth-of-type(3){transition-delay:.16s}
</style>
<script>
(function () {
  var P = document.querySelector('.pp-tools'), I = P.querySelector('.pp-tools-in'), items = [].slice.call(P.querySelectorAll('.pp-it')), scrs = [].slice.call(P.querySelectorAll('.pp-scr'));
  var rail = P.querySelector('.pp-rail'), blob = P.querySelector('.pp-blob'), S = { d: 0, top: 0 }, cur = -1, n = items.length;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function set(i) { if (i === cur) return; cur = i; items.forEach(function (it, k) { it.classList.toggle('is-on', k === i); }); scrs.forEach(function (s, k) { s.classList.toggle('is-on', k === i); }); rail.style.transform = 'scaleY(' + (i + 1) / n + ')'; blob.style.setProperty('--bs', (0.9 + (i % 3) * 0.08).toFixed(2)); }
  function layout() { var vh = innerHeight, h = I.offsetHeight; S.d = vh * parseFloat(P.dataset.dist); S.top = Math.max(16, (vh - h) / 2); I.style.top = S.top + 'px'; P.style.height = (h + S.d) + 'px'; frame(); }
  function frame() { set(Math.min(n - 1, Math.floor(clamp((S.top - P.getBoundingClientRect().top) / S.d) * n))); }
  items.forEach(function (it, i) { it.querySelector('button').addEventListener('click', function () { var top = P.getBoundingClientRect().top + scrollY; scrollTo({ top: top - S.top + (i + 0.5) / n * S.d, behavior: 'smooth' }); }); });
  addEventListener('scroll', function () { requestAnimationFrame(frame); }, { passive: true }); addEventListener('resize', layout); layout();
})();
</script>`,
    },
  },

  // 21 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-clothesline-carousel",
    name: "Carrossel de Polaroides Presas num Varal",
    category: "midia",
    categoryLabel: "Fotos, Vídeos & Mockups",
    description: "As fotos ficam penduradas por prendedores verdes num fio que faz barriga no meio; dá para arrastar, clicar, usar as setas do teclado ou deixar no autoplay. Uma mola amortecida leva até a foto escolhida e cada polaroide balança atrasada em relação ao movimento, com gravidade e uma brisa leve, enquanto a legenda troca subindo.",
    tags: ["Carousel", "Drag", "Spring Physics", "Pendulum", "Autoplay", "a11y"],
    defaultSection: "Acompanhamento / Benefícios",
    previewType: "pp-clothesline",
    tech: ["Tailwind CSS", "React", "Pointer Events", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef, useState } from 'react';

const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const BG = ['#EDE3FB', '#BEF21E', '#7D0DEF', '#E9F9B8', '#4C0790'];

export function ClotheslineCarousel({ items = [
  { note: 'Tutora para esclarecer dúvidas', title: 'Tutora', text: 'Uma pessoa para tirar dúvidas e destravar a execução.' },
  { note: 'Encontros mensais ao vivo', title: 'Encontros ao vivo', text: 'Todo mês, um encontro para revisar o plano.' },
  { note: 'Comunidade de fundadoras', title: 'Comunidade', text: 'Troca com quem está no mesmo momento.' },
  { note: 'Plano de 60 dias', title: 'Plano', text: 'O caminho dividido em passos pequenos.' },
  { note: 'Relatórios de evolução', title: 'Evolução', text: 'Veja o que já avançou e o que falta.' },
] }) {
  const box = useRef(null), stage = useRef(null), path = useRef(null), cards = useRef([]);
  const [act, setAct] = useState(0);

  useEffect(() => {
    const st = stage.current, n = items.length, C = cards.current.filter(Boolean);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const P = { off: 0, vel: 0, target: 0, a: [], w: [], W: 0, cw: 0, sp: 1, y0: 48, sag: 46, act: 0, drag: null, last: 0, prev: 0, hold: false };
    let raf = 0, vis = false;

    const set = (i) => { P.act = i; setAct(i); };
    const render = (t, still) => {
      const dt = Math.min(P.prev && t - P.prev < 100 ? (t - P.prev) / 1000 : 0.016, 0.033);
      let lv = 0;
      if (!still) {
        if (P.drag && P.drag.moved) lv = P.drag.v * 1000;
        else { const before = P.off, k = 70; P.vel += (k * (P.target - P.off) - 2 * Math.sqrt(k) * P.vel) * dt; P.off += P.vel * dt; lv = -(P.off - before) / Math.max(dt, 0.001); }
      }
      const near = clamp(Math.round(P.off / P.sp) || 0, 0, n - 1);
      C.forEach((el, i) => {
        const x = P.W / 2 + i * P.sp - P.off;
        if (x < -P.cw * 1.5 || x > P.W + P.cw * 1.5) { el.style.visibility = 'hidden'; return; }
        el.style.visibility = '';
        let a = P.a[i] || 0, w = P.w[i] || 0;
        if (still) { a = 0; w = 0; }
        else { w += (-38 * a - 4.2 * w + lv * 0.0034) * dt; a = clamp(a + w * dt, -0.6, 0.6); a += Math.sin(t / 1300 + i * 1.7) * 0.0009; } // pêndulo + brisa
        P.a[i] = a; P.w[i] = w;
        const u = clamp(x / P.W), y = P.y0 + 4 * P.sag * u * (1 - u) - 6; // acompanha a barriga do fio
        el.style.transform = 'translate(' + (x - P.cw / 2).toFixed(1) + 'px,' + y.toFixed(1) + 'px) rotate(' + a.toFixed(4) + 'rad)';
        el.style.zIndex = i === near ? n + 1 : n - Math.abs(i - near);
      });
      if (near !== P.act) set(near);
    };
    const go = (i) => { P.target = clamp(i, 0, n - 1) * P.sp; P.last = performance.now(); if (reduce) { P.off = P.target; render(P.last, true); } };
    const layout = () => {
      const mob = innerWidth < 761; P.W = st.clientWidth; P.cw = C[0].offsetWidth; if (!P.W || !P.cw) return;
      P.sp = P.cw * (mob ? 1.18 : 1.36); P.sag = mob ? 26 : 46; P.y0 = mob ? 34 : 48;
      st.style.height = Math.round(P.y0 + P.sag + C[0].offsetHeight + (mob ? 44 : 60)) + 'px';
      path.current.setAttribute('d', 'M0 ' + P.y0 + ' Q' + P.W / 2 + ' ' + (P.y0 + 2 * P.sag) + ' ' + P.W + ' ' + P.y0);
      P.off = P.target = P.act * P.sp; P.vel = 0; render(performance.now(), true);
    };
    const loop = (t) => {
      raf = vis && !reduce ? requestAnimationFrame(loop) : 0;
      if (!P.prev || t - P.prev > 250) P.last = t;
      if (!P.hold && !P.drag && t - P.last > 4500) go(P.act >= n - 1 ? 0 : P.act + 1); // autoplay
      render(t); P.prev = t;
    };
    const down = (e) => { if (e.button > 0) return; P.last = performance.now(); P.drag = { x: e.clientX, off: P.off, lx: e.clientX, lt: e.timeStamp, v: 0, moved: false }; };
    const move = (e) => {
      const d = P.drag; if (!d) return;
      const dx = e.clientX - d.x;
      if (!d.moved && Math.abs(dx) > 5) { d.moved = true; st.style.cursor = 'grabbing'; try { st.setPointerCapture(e.pointerId); } catch { /* sem captura */ } }
      if (!d.moved) return;
      d.v = 0.7 * ((e.clientX - d.lx) / Math.max(1, e.timeStamp - d.lt)) + 0.3 * d.v; d.lx = e.clientX; d.lt = e.timeStamp;
      const mx = (n - 1) * P.sp; let off = d.off - dx;
      if (off < 0) off *= 0.35; if (off > mx) off = mx + (off - mx) * 0.35; // resistência elástica nas pontas
      P.off = off;
    };
    const up = (e) => {
      const d = P.drag; P.drag = null; P.last = performance.now(); st.style.cursor = ''; if (!d) return;
      if (d.moved) { P.vel = -d.v * 1000; go(Math.round((P.off - d.v * 180) / P.sp)); return; }
      const c = e.target.closest('[data-i]'); if (c) go(+c.dataset.i);
    };
    const key = (e) => { if (e.key === 'ArrowRight') go((P.act + 1) % n); else if (e.key === 'ArrowLeft') go((P.act - 1 + n) % n); else return; e.preventDefault(); };
    const hold = (v) => () => { P.hold = v; P.last = performance.now(); };
    const B = box.current;
    B._go = (dir) => go((P.act + dir + n) % n);
    st.addEventListener('pointerdown', down); st.addEventListener('pointermove', move); st.addEventListener('pointerup', up); st.addEventListener('pointercancel', up);
    B.addEventListener('keydown', key); B.addEventListener('pointerenter', hold(true)); B.addEventListener('pointerleave', hold(false));
    B.addEventListener('focusin', hold(true)); B.addEventListener('focusout', hold(false));
    const io = new IntersectionObserver(([en]) => { vis = en.isIntersecting; if (vis && !raf && !reduce) raf = requestAnimationFrame(loop); });
    io.observe(B);
    const ro = new ResizeObserver(layout); ro.observe(st);
    return () => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf); st.removeEventListener('pointerdown', down); st.removeEventListener('pointermove', move); st.removeEventListener('pointerup', up); st.removeEventListener('pointercancel', up); B.removeEventListener('keydown', key); };
  }, [items.length]);

  const arrow = <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
  const btn = 'grid h-14 w-14 place-items-center rounded-full border border-[rgba(76,7,144,.14)] bg-white text-[#7D0DEF] transition-[background,color,transform] duration-[400ms] hover:scale-[1.06] hover:bg-[#7D0DEF] hover:text-[#BEF21E]';
  return (
    <div ref={box} tabIndex={0} role="region" aria-roledescription="carrossel" aria-label="Galeria" className="relative bg-[#F2F2F2] py-10 outline-none">
      <div ref={stage} aria-hidden="true" className="relative h-[540px] cursor-grab touch-pan-y select-none overflow-hidden">
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"><path ref={path} fill="none" stroke="#4C0790" strokeOpacity=".42" strokeWidth="2" strokeLinecap="round" /></svg>
        {items.map((it, i) => (
          <div key={i} data-i={i} ref={(nd) => (cards.current[i] = nd)} className="absolute left-0 top-0 w-[240px] origin-top will-change-transform md:w-[300px]">
            <span className="absolute left-1/2 top-0 z-[2] -ml-[6.5px] h-8 w-[13px] rounded-[3px] bg-[linear-gradient(90deg,#a3d313,#BEF21E_45%,#93c00e)] shadow-[0_3px_4px_rgba(76,7,144,.3)]" />
            <div className={'mt-3 rounded-md bg-white px-3 pt-3 shadow-[0_1px_2px_rgba(26,26,26,.1),0_26px_36px_-20px_rgba(76,7,144,.5)] transition-[filter] duration-500 ' + (i === act ? '' : 'brightness-[.97] saturate-[.72]')}>
              <div className="aspect-[1/.84] rounded-[3px]" style={{ background: BG[i % BG.length] }} />
              <div className="flex h-[74px] items-center justify-center px-2 text-center text-[13.5px] font-bold uppercase leading-[1.25] tracking-[.04em] text-[#4C0790]">{it.note}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex flex-col items-center gap-[26px]">
        <div className="grid w-full max-w-[640px] px-6 text-center" aria-live="polite">
          {items.map((it, i) => (
            <div key={i} className={'[grid-area:1/1] transition-opacity duration-500 ' + (i === act ? 'visible opacity-100' : 'invisible opacity-0')}>
              <h3 className="text-[22px] font-bold uppercase leading-[1.25] tracking-[.03em] text-[#4C0790]">{it.title}</h3>
              <p className="mt-2.5 text-[17px] text-[#5A5566]">{it.text}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-[22px]">
          <button type="button" aria-label="Anterior" className={btn + ' [&>svg]:rotate-180'} onClick={() => box.current._go(-1)}>{arrow}</button>
          <span className="min-w-[84px] text-center text-sm font-bold tracking-[.16em] text-[rgba(76,7,144,.5)]"><b className="text-[#7D0DEF]">{String(act + 1).padStart(2, '0')}</b> / {String(items.length).padStart(2, '0')}</span>
          <button type="button" aria-label="Próximo" className={btn} onClick={() => box.current._go(1)}>{arrow}</button>
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `<div class="pp-pl relative bg-[#F2F2F2] py-10 outline-none" tabindex="0" role="region" aria-roledescription="carrossel" aria-label="Galeria">
  <div class="pp-pl-stage relative h-[540px] cursor-grab touch-pan-y select-none overflow-hidden" aria-hidden="true">
    <svg class="pointer-events-none absolute inset-0 h-full w-full overflow-visible"><path fill="none" stroke="#4C0790" stroke-opacity=".42" stroke-width="2" stroke-linecap="round"/></svg>
    <div class="pp-pl-card" data-i="0"><span class="pp-peg"></span><div class="pp-print"><div class="pp-shot" style="background:#EDE3FB"></div><div class="pp-note">Tutora para dúvidas</div></div></div>
    <div class="pp-pl-card" data-i="1"><span class="pp-peg"></span><div class="pp-print"><div class="pp-shot" style="background:#BEF21E"></div><div class="pp-note">Encontros ao vivo</div></div></div>
    <div class="pp-pl-card" data-i="2"><span class="pp-peg"></span><div class="pp-print"><div class="pp-shot" style="background:#7D0DEF"></div><div class="pp-note">Comunidade</div></div></div>
    <div class="pp-pl-card" data-i="3"><span class="pp-peg"></span><div class="pp-print"><div class="pp-shot" style="background:#E9F9B8"></div><div class="pp-note">Plano de 60 dias</div></div></div>
  </div>
  <div class="mt-1.5 flex items-center justify-center gap-[22px]">
    <button class="pp-pl-p grid h-14 w-14 place-items-center rounded-full bg-white text-[#7D0DEF]" aria-label="Anterior">←</button>
    <span class="min-w-[84px] text-center text-sm font-bold tracking-[.16em] text-[rgba(76,7,144,.5)]"><b class="pp-pl-count text-[#7D0DEF]">01</b> / 04</span>
    <button class="pp-pl-n grid h-14 w-14 place-items-center rounded-full bg-white text-[#7D0DEF]" aria-label="Próximo">→</button>
  </div>
</div>
<style>
  .pp-pl-card{position:absolute;left:0;top:0;width:300px;transform-origin:50% 0;will-change:transform}
  .pp-peg{position:absolute;left:50%;top:0;width:13px;height:32px;margin-left:-6.5px;border-radius:3px;background:linear-gradient(90deg,#a3d313,#BEF21E 45%,#93c00e);box-shadow:0 3px 4px rgba(76,7,144,.3);z-index:2}
  .pp-print{margin-top:12px;padding:12px 12px 0;border-radius:6px;background:#fff;box-shadow:0 1px 2px rgba(26,26,26,.1),0 26px 36px -20px rgba(76,7,144,.5);transition:filter .5s}
  .pp-pl-card:not(.is-on) .pp-print{filter:saturate(.72) brightness(.97)}
  .pp-shot{aspect-ratio:1/.84;border-radius:3px}
  .pp-note{height:74px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:13.5px;font-weight:700;text-transform:uppercase;color:#4C0790}
  @media (max-width:760px){.pp-pl-card{width:240px}}
</style>
<script>
(function () {
  var pl = document.querySelector('.pp-pl'), st = pl.querySelector('.pp-pl-stage'), path = st.querySelector('path'), C = [].slice.call(st.querySelectorAll('.pp-pl-card')), n = C.length, count = pl.querySelector('.pp-pl-count');
  var P = { off: 0, vel: 0, target: 0, a: [], w: [], W: 0, cw: 0, sp: 1, y0: 48, sag: 46, act: 0, drag: null, last: 0, prev: 0, hold: false }, vis = false;
  function clamp(v, a, b) { a = a || 0; b = b == null ? 1 : b; return v < a ? a : v > b ? b : v; }
  function set(i) { P.act = i; C.forEach(function (c, k) { c.classList.toggle('is-on', k === i); }); count.textContent = (i < 9 ? '0' : '') + (i + 1); }
  function render(t, still) {
    var dt = Math.min(P.prev && t - P.prev < 100 ? (t - P.prev) / 1000 : 0.016, 0.033), lv = 0;
    if (!still) { if (P.drag && P.drag.moved) lv = P.drag.v * 1000; else { var before = P.off, k = 70; P.vel += (k * (P.target - P.off) - 2 * Math.sqrt(k) * P.vel) * dt; P.off += P.vel * dt; lv = -(P.off - before) / Math.max(dt, 0.001); } }
    var near = clamp(Math.round(P.off / P.sp) || 0, 0, n - 1);
    C.forEach(function (el, i) {
      var x = P.W / 2 + i * P.sp - P.off; if (x < -P.cw * 1.5 || x > P.W + P.cw * 1.5) { el.style.visibility = 'hidden'; return; } el.style.visibility = '';
      var a = P.a[i] || 0, w = P.w[i] || 0; if (still) { a = 0; w = 0; } else { w += (-38 * a - 4.2 * w + lv * 0.0034) * dt; a = clamp(a + w * dt, -0.6, 0.6); a += Math.sin(t / 1300 + i * 1.7) * 0.0009; }
      P.a[i] = a; P.w[i] = w; var u = clamp(x / P.W), y = P.y0 + 4 * P.sag * u * (1 - u) - 6;
      el.style.transform = 'translate(' + (x - P.cw / 2).toFixed(1) + 'px,' + y.toFixed(1) + 'px) rotate(' + a.toFixed(4) + 'rad)'; el.style.zIndex = i === near ? n + 1 : n - Math.abs(i - near);
    });
    if (near !== P.act) set(near);
  }
  function go(i) { P.target = clamp(i, 0, n - 1) * P.sp; P.last = performance.now(); }
  function layout() { var mob = innerWidth < 761; P.W = st.clientWidth; P.cw = C[0].offsetWidth; P.sp = P.cw * (mob ? 1.18 : 1.36); P.sag = mob ? 26 : 46; P.y0 = mob ? 34 : 48; st.style.height = Math.round(P.y0 + P.sag + C[0].offsetHeight + (mob ? 44 : 60)) + 'px'; path.setAttribute('d', 'M0 ' + P.y0 + ' Q' + P.W / 2 + ' ' + (P.y0 + 2 * P.sag) + ' ' + P.W + ' ' + P.y0); P.off = P.target = P.act * P.sp; P.vel = 0; render(performance.now(), true); }
  function loop(t) { requestAnimationFrame(loop); if (!vis) return; if (!P.prev || t - P.prev > 250) P.last = t; if (!P.hold && !P.drag && t - P.last > 4500) go(P.act >= n - 1 ? 0 : P.act + 1); render(t); P.prev = t; }
  st.addEventListener('pointerdown', function (e) { if (e.button > 0) return; P.last = performance.now(); P.drag = { x: e.clientX, off: P.off, lx: e.clientX, lt: e.timeStamp, v: 0, moved: false }; });
  st.addEventListener('pointermove', function (e) { var d = P.drag; if (!d) return; var dx = e.clientX - d.x; if (!d.moved && Math.abs(dx) > 5) { d.moved = true; try { st.setPointerCapture(e.pointerId); } catch (er) { void er; } } if (!d.moved) return; d.v = 0.7 * ((e.clientX - d.lx) / Math.max(1, e.timeStamp - d.lt)) + 0.3 * d.v; d.lx = e.clientX; d.lt = e.timeStamp; var mx = (n - 1) * P.sp, off = d.off - dx; if (off < 0) off *= 0.35; if (off > mx) off = mx + (off - mx) * 0.35; P.off = off; });
  st.addEventListener('pointerup', function (e) { var d = P.drag; P.drag = null; P.last = performance.now(); if (!d) return; if (d.moved) { P.vel = -d.v * 1000; go(Math.round((P.off - d.v * 180) / P.sp)); return; } var c = e.target.closest('.pp-pl-card'); if (c) go(+c.dataset.i); });
  pl.querySelector('.pp-pl-p').addEventListener('click', function () { go((P.act - 1 + n) % n); });
  pl.querySelector('.pp-pl-n').addEventListener('click', function () { go((P.act + 1) % n); });
  pl.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') go((P.act + 1) % n); else if (e.key === 'ArrowLeft') go((P.act - 1 + n) % n); });
  pl.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') P.hold = true; }); pl.addEventListener('pointerleave', function () { P.hold = false; P.last = performance.now(); });
  new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(pl);
  new ResizeObserver(layout).observe(st); set(0); requestAnimationFrame(loop);
})();
</script>`,
    },
  },

  // 22 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-skew-drag-marquee",
    name: "Rail de Depoimentos Arrastável que Entorta com a Velocidade",
    category: "depoimentos",
    categoryLabel: "Depoimentos & Prova Social",
    description: "Duas faixas de prints de depoimento andam em sentidos opostos sem parar; a rolagem da página empurra as faixas e as entorta (skew) proporcionalmente à velocidade. Com o mouse em cima elas quase param para dar tempo de ler, e dá para arrastar com o dedo ou o mouse e soltar com inércia antes de voltarem a andar sozinhas.",
    tags: ["Marquee", "Drag", "Inertia", "Skew", "Scroll Velocity", "Testimonials"],
    defaultSection: "Depoimentos",
    previewType: "pp-skew-marquee",
    tech: ["Tailwind CSS", "React", "Pointer Events", "requestAnimationFrame"],
    frameworks: {
      react: `import { useEffect, useRef } from 'react';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

// dir: 1 ou -1 · speed: px/s. Coloque 2 instâncias com dir oposto para o efeito da página.
export function SkewDragMarquee({ children, dir = 1, speed = 34 }) {
  const band = useRef(null), track = useRef(null), grp = useRef(null);

  useEffect(() => {
    const B = band.current, T = track.current, G = grp.current;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const m = { w: 0, off: 0, k: 1, hold: false, drag: false, dv: 0, fv: 0 };
    let raf = 0, vis = false, lastT = 0, lastY = scrollY, vel = 0, g = null;

    const layout = () => {
      while (T.children.length > 1) T.removeChild(T.lastChild);
      m.w = G.offsetWidth; if (!m.w) return;
      const copies = Math.ceil(B.offsetWidth / m.w) + 1;
      for (let i = 0; i < copies; i++) { const c = G.cloneNode(true); c.setAttribute('aria-hidden', 'true'); T.appendChild(c); }
    };
    const tick = (t) => {
      raf = vis ? requestAnimationFrame(tick) : 0;
      const dt = lastT && t - lastT < 100 ? t - lastT : 16; lastT = t;
      const dy = scrollY - lastY; lastY = scrollY; vel += (dy - vel) * 0.12;
      if (!m.w) return;
      m.k += ((m.drag ? 0 : m.hold ? 0.12 : 1) - m.k) * 0.08;                   // hover quase para
      m.off += (speed * m.k * dt) / 1000 + dy * 0.6;                             // scroll empurra
      if (m.fv) { m.off -= (m.fv * dir * dt) / 16; m.fv *= Math.pow(0.93, dt / 16); if (Math.abs(m.fv) < 0.05) m.fv = 0; } // inércia
      if (!m.drag) m.dv *= 0.85;
      const x = -((((m.off * dir) % m.w) + m.w) % m.w);
      const sk = clamp(-vel * 0.35 - (m.drag ? m.dv : m.fv) * 0.25, -9, 9);
      T.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0) skewX(' + sk.toFixed(2) + 'deg)';
    };
    const enter = (e) => { if (e.pointerType === 'mouse') m.hold = true; };
    const leave = () => { m.hold = false; };
    const down = (e) => { if (e.button > 0) return; g = { id: e.pointerId, x0: e.clientX, y0: e.clientY, lx: e.clientX, lt: performance.now(), on: false }; m.fv = 0; };
    const move = (e) => {
      if (!g || e.pointerId !== g.id) return;
      if (!g.on) {
        const ax = Math.abs(e.clientX - g.x0), ay = Math.abs(e.clientY - g.y0);
        if (ax < 6 && ay < 6) return;
        if (ay > ax) { g = null; return; } // gesto vertical: deixa a página rolar
        g.on = true; m.drag = true; B.style.cursor = 'grabbing';
        try { B.setPointerCapture(e.pointerId); } catch { /* sem captura */ }
      }
      const now = performance.now(), dx = e.clientX - g.lx;
      m.off -= dx * dir; m.dv = (dx / Math.max(8, now - g.lt)) * 16; g.lx = e.clientX; g.lt = now;
      if (e.cancelable) e.preventDefault();
    };
    const end = () => { if (!g) return; if (g.on) m.fv = performance.now() - g.lt < 90 ? clamp(m.dv, -60, 60) : 0; g = null; m.drag = false; B.style.cursor = ''; };

    B.addEventListener('pointerenter', enter); B.addEventListener('pointerleave', leave);
    B.addEventListener('pointerdown', down); B.addEventListener('pointermove', move);
    B.addEventListener('pointerup', end); B.addEventListener('pointercancel', end);
    const io = new IntersectionObserver(([en]) => { vis = en.isIntersecting; if (vis && !raf && !reduce) { lastT = 0; lastY = scrollY; raf = requestAnimationFrame(tick); } });
    io.observe(B);
    const ro = new ResizeObserver(layout); ro.observe(B);
    return () => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf); ['pointerenter', 'pointerleave', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel'].forEach((ev, i) => B.removeEventListener(ev, [enter, leave, down, move, end, end][i])); };
  }, [dir, speed]);

  return (
    <div ref={band} className="cursor-grab touch-pan-y select-none overflow-hidden whitespace-nowrap [&_img]:pointer-events-none [&_img]:[-webkit-user-drag:none]">
      <div ref={track} className="flex w-max will-change-transform">
        <div ref={grp} className="flex flex-none items-center">{children}</div>
      </div>
    </div>
  );
}

export function TestimonialCard({ src, alt = 'Depoimento' }) {
  return (
    <div className="mr-5 grid h-[270px] w-[460px] max-w-[84vw] flex-none place-items-center rounded-[26px] bg-white p-[18px] shadow-[0_26px_40px_-26px_rgba(0,0,0,.55)]">
      {src ? <img src={src} alt={alt} className="max-h-[234px] max-w-full rounded-[14px] object-contain shadow-[0_14px_24px_-14px_rgba(76,7,144,.5)]" /> : <span className="h-full w-full rounded-[14px] bg-[#EDE3FB]" />}
    </div>
  );
}

// Uso:
// <section className="grid gap-5 bg-[#4C0790] py-24">
//   <SkewDragMarquee dir={-1} speed={34}>{prints.map((s) => <TestimonialCard key={s} src={s} />)}</SkewDragMarquee>
//   <SkewDragMarquee dir={1} speed={28}>{prints2.map((s) => <TestimonialCard key={s} src={s} />)}</SkewDragMarquee>
// </section>`,
      tailwind: `<section class="grid gap-5 bg-[#4C0790] py-24">
  <div class="pp-mq cursor-grab touch-pan-y select-none overflow-hidden whitespace-nowrap" data-dir="-1" data-speed="34">
    <div class="pp-track flex w-max will-change-transform"><div class="pp-grp flex flex-none items-center">
      <div class="mr-5 h-[270px] w-[460px] flex-none rounded-[26px] bg-white p-[18px]"><img src="depoimento-1.webp" alt="Depoimento" class="pointer-events-none max-h-[234px] rounded-[14px] object-contain"></div>
      <div class="mr-5 h-[270px] w-[460px] flex-none rounded-[26px] bg-white p-[18px]"><img src="depoimento-2.webp" alt="Depoimento" class="pointer-events-none max-h-[234px] rounded-[14px] object-contain"></div>
    </div></div>
  </div>
  <div class="pp-mq cursor-grab touch-pan-y select-none overflow-hidden whitespace-nowrap" data-dir="1" data-speed="28">
    <div class="pp-track flex w-max will-change-transform"><div class="pp-grp flex flex-none items-center">
      <div class="mr-5 h-[270px] w-[460px] flex-none rounded-[26px] bg-white p-[18px]"><img src="depoimento-3.webp" alt="Depoimento" class="pointer-events-none max-h-[234px] rounded-[14px] object-contain"></div>
      <div class="mr-5 h-[270px] w-[460px] flex-none rounded-[26px] bg-white p-[18px]"><img src="depoimento-4.webp" alt="Depoimento" class="pointer-events-none max-h-[234px] rounded-[14px] object-contain"></div>
    </div></div>
  </div>
</section>
<script>
(function () {
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  var lastT = 0, lastY = scrollY, vel = 0;
  var mqs = [].slice.call(document.querySelectorAll('.pp-mq')).map(function (B) {
    var m = { B: B, T: B.querySelector('.pp-track'), G: B.querySelector('.pp-grp'), dir: +B.dataset.dir || 1, speed: +B.dataset.speed || 40, w: 0, off: 0, k: 1, hold: false, drag: false, dv: 0, fv: 0, vis: false }, g = null;
    B.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') m.hold = true; });
    B.addEventListener('pointerleave', function () { m.hold = false; });
    B.addEventListener('pointerdown', function (e) { if (e.button > 0) return; g = { id: e.pointerId, x0: e.clientX, y0: e.clientY, lx: e.clientX, lt: performance.now(), on: false }; m.fv = 0; });
    B.addEventListener('pointermove', function (e) {
      if (!g || e.pointerId !== g.id) return;
      if (!g.on) { var ax = Math.abs(e.clientX - g.x0), ay = Math.abs(e.clientY - g.y0); if (ax < 6 && ay < 6) return; if (ay > ax) { g = null; return; } g.on = true; m.drag = true; try { B.setPointerCapture(e.pointerId); } catch (er) { void er; } }
      var now = performance.now(), dx = e.clientX - g.lx; m.off -= dx * m.dir; m.dv = dx / Math.max(8, now - g.lt) * 16; g.lx = e.clientX; g.lt = now; if (e.cancelable) e.preventDefault();
    });
    function end() { if (!g) return; if (g.on) m.fv = performance.now() - g.lt < 90 ? clamp(m.dv, -60, 60) : 0; g = null; m.drag = false; }
    B.addEventListener('pointerup', end); B.addEventListener('pointercancel', end);
    new IntersectionObserver(function (es) { m.vis = es[0].isIntersecting; }).observe(B);
    new ResizeObserver(function () { while (m.T.children.length > 1) m.T.removeChild(m.T.lastChild); m.w = m.G.offsetWidth; if (!m.w) return; for (var i = 0; i < Math.ceil(B.offsetWidth / m.w) + 1; i++) { var c = m.G.cloneNode(true); c.setAttribute('aria-hidden', 'true'); m.T.appendChild(c); } }).observe(B);
    return m;
  });
  function tick(t) {
    requestAnimationFrame(tick);
    var dt = lastT && t - lastT < 100 ? t - lastT : 16; lastT = t; var dy = scrollY - lastY; lastY = scrollY; vel += (dy - vel) * 0.12;
    mqs.forEach(function (m) {
      if (!m.vis || !m.w) return;
      m.k += ((m.drag ? 0 : m.hold ? 0.12 : 1) - m.k) * 0.08; m.off += m.speed * m.k * dt / 1000 + dy * 0.6;
      if (m.fv) { m.off -= m.fv * m.dir * dt / 16; m.fv *= Math.pow(0.93, dt / 16); if (Math.abs(m.fv) < 0.05) m.fv = 0; }
      if (!m.drag) m.dv *= 0.85;
      var x = -(((m.off * m.dir) % m.w) + m.w) % m.w;
      m.T.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0) skewX(' + clamp(-vel * 0.35 - (m.drag ? m.dv : m.fv) * 0.25, -9, 9).toFixed(2) + 'deg)';
    });
  }
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(tick);
})();
</script>`,
    },
  },

  // 23 ────────────────────────────────────────────────────────────
  {
    ...B,
    id: "pp-faq-plus-rotate",
    name: "FAQ com Mais que Gira e Vira X",
    category: "faq",
    categoryLabel: "FAQ",
    description: "Perguntas em cards brancos arredondados que sobem um pouco no hover; ao abrir, o círculo do '+' fica roxo, gira 135° virando um 'x' verde, a borda acende e a resposta desliza para baixo e aparece com um pequeno atraso. Só uma fica aberta por vez, mantendo a seção limpa.",
    tags: ["FAQ", "Accordion", "grid-template-rows", "Single Open", "a11y"],
    defaultSection: "FAQ",
    previewType: "pp-faq",
    tech: ["Tailwind CSS", "React", "CSS Transitions"],
    frameworks: {
      react: `import { useState } from 'react';

const EASE = 'ease-[cubic-bezier(.22,1,.36,1)]';

export function FaqPlus({ items = [
  { q: 'Por quanto tempo tenho acesso?', a: 'Da compra até 31 de dezembro de 2027.' },
  { q: 'Quando recebo os cursos?', a: 'Os três cursos serão entregues em janeiro de 2027.' },
  { q: 'Os workshops ficam gravados?', a: 'Sim, ficam disponíveis na plataforma até o fim do acesso.' },
] }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="mx-auto grid max-w-[860px] gap-3 bg-[#F2F2F2] p-6">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={i} className={'rounded-[24px] border bg-white transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-26px_rgba(76,7,144,.5)] ' + EASE + ' ' + (on ? 'border-[#7D0DEF] shadow-[0_24px_44px_-30px_rgba(76,7,144,.6)]' : 'border-[rgba(76,7,144,.14)]')}>
            <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)}
              className={'flex w-full items-center justify-between gap-5 rounded-[24px] px-[26px] py-6 text-left text-lg font-bold leading-[1.35] transition-colors duration-[400ms] ' + (on ? 'text-[#4C0790]' : 'text-[#1A1A1A]')}>
              {it.q}
              <span aria-hidden="true" className={'relative h-[42px] w-[42px] flex-none rounded-full transition-[background,transform] duration-[600ms] ' + EASE + ' ' + (on ? 'rotate-[135deg] bg-[#7D0DEF]' : 'bg-[rgba(125,13,239,.1)]')}>
                <i className={'absolute left-1/2 top-1/2 h-[2.5px] w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-sm transition-colors duration-[400ms] ' + (on ? 'bg-[#BEF21E]' : 'bg-[#7D0DEF]')} />
                <i className={'absolute left-1/2 top-1/2 h-[2.5px] w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-sm transition-colors duration-[400ms] ' + (on ? 'bg-[#BEF21E]' : 'bg-[#7D0DEF]')} />
              </span>
            </button>
            <div className={'grid transition-[grid-template-rows] duration-[600ms] ' + EASE + ' ' + (on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
              <div className="overflow-hidden">
                <p className={'pb-[26px] pl-[26px] pr-[90px] text-[17px] text-[#5A5566] transition-[opacity,transform] duration-[600ms] ' + EASE + ' ' + (on ? 'translate-y-0 opacity-100 delay-[120ms]' : '-translate-y-2 opacity-0')}>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}`,
      tailwind: `<div class="pp-faq mx-auto grid max-w-[860px] gap-3 bg-[#F2F2F2] p-6">
  <div class="pp-q"><button class="pp-q-b" aria-expanded="false">Por quanto tempo tenho acesso?<span class="pp-q-ic" aria-hidden="true"></span></button><div class="pp-q-a"><div><p>Da compra até 31 de dezembro de 2027.</p></div></div></div>
  <div class="pp-q"><button class="pp-q-b" aria-expanded="false">Quando recebo os cursos?<span class="pp-q-ic" aria-hidden="true"></span></button><div class="pp-q-a"><div><p>Os três cursos serão entregues em janeiro de 2027.</p></div></div></div>
</div>
<style>
  .pp-q{border-radius:24px;background:#fff;border:1px solid rgba(76,7,144,.14);transition:border-color .5s,box-shadow .5s cubic-bezier(.22,1,.36,1),transform .5s cubic-bezier(.22,1,.36,1)}
  .pp-q:hover{transform:translateY(-2px);box-shadow:0 18px 34px -26px rgba(76,7,144,.5)}
  .pp-q-b{width:100%;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:24px 26px;font-weight:700;font-size:18px;line-height:1.35;color:#1A1A1A;text-align:left;transition:color .4s}
  .pp-q-ic{width:42px;height:42px;border-radius:50%;background:rgba(125,13,239,.1);flex:none;position:relative;transition:background .5s,transform .6s cubic-bezier(.22,1,.36,1)}
  .pp-q-ic::before,.pp-q-ic::after{content:"";position:absolute;left:50%;top:50%;width:14px;height:2.5px;border-radius:2px;background:#7D0DEF;transform:translate(-50%,-50%);transition:background .4s}
  .pp-q-ic::after{transform:translate(-50%,-50%) rotate(90deg)}
  .pp-q-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .6s cubic-bezier(.22,1,.36,1)}.pp-q-a>div{overflow:hidden}
  .pp-q-a p{padding:0 90px 26px 26px;color:#5A5566;font-size:17px;opacity:0;transform:translateY(-8px);transition:opacity .5s,transform .6s cubic-bezier(.22,1,.36,1)}
  .pp-q.is-open{border-color:#7D0DEF;box-shadow:0 24px 44px -30px rgba(76,7,144,.6)}
  .pp-q.is-open .pp-q-b{color:#4C0790}
  .pp-q.is-open .pp-q-ic{background:#7D0DEF;transform:rotate(135deg)}
  .pp-q.is-open .pp-q-ic::before,.pp-q.is-open .pp-q-ic::after{background:#BEF21E}
  .pp-q.is-open .pp-q-a{grid-template-rows:1fr}
  .pp-q.is-open .pp-q-a p{opacity:1;transform:none;transition-delay:.12s}
</style>
<script>
  (function () {
    var qs = [].slice.call(document.querySelectorAll('.pp-q'));
    qs.forEach(function (q) {
      var b = q.querySelector('.pp-q-b');
      b.addEventListener('click', function () {
        var open = !q.classList.contains('is-open');
        qs.forEach(function (o) { o.classList.remove('is-open'); o.querySelector('.pp-q-b').setAttribute('aria-expanded', 'false'); });
        if (open) { q.classList.add('is-open'); b.setAttribute('aria-expanded', 'true'); }
      });
    });
  })();
</script>`,
    },
  },
];
