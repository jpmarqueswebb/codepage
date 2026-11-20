import React, { useState } from 'react';
import { X, Copy, Check, Bot, Code, Sparkles, Layers, ShieldCheck, Play } from 'lucide-react';
import { EffectPreview } from './EffectPreview';

export function DetailModal({ effect, onClose, onCopyPrompt, onCopyCode }) {
  if (!effect) return null;

  const [activeTab, setActiveTab] = useState('prompt');
  const [targetSection, setTargetSection] = useState(effect.defaultSection || 'Hero Principal');
  const [copied, setCopied] = useState(false);

  const reactCode = effect.frameworks?.react || effect.code || '';
  const tailwindCode = effect.frameworks?.tailwind || effect.code || '';

  const promptText = `Chat, adicione este efeito no nosso site, exatamente na seção "${targetSection}":

EFEITO: ${effect.name}
CATEGORIA: ${effect.categoryLabel}
DESCRIÇÃO: ${effect.description}
ESTILO: Neon Noir Monocromático (Preto Puro #000000, Acentos em Branco Puro #FFFFFF, Sem IA Slop, 60fps).

DIRETRIZES DE IMPLEMENTAÇÃO:
1. Integre o código na seção informada sem quebrar os componentes existentes.
2. Mantenha acessibilidade total (WCAG 4.5:1, touch target min 44px, prefers-reduced-motion).
3. 100% responsivo para mobile e desktop.

--- CÓDIGO DO EFEITO ---
${reactCode}
`;

  const handleCopyCurrent = () => {
    let contentToCopy = '';
    if (activeTab === 'prompt') {
      contentToCopy = promptText;
      onCopyPrompt(effect, targetSection);
    } else if (activeTab === 'react') {
      contentToCopy = reactCode;
      onCopyCode(effect);
    } else if (activeTab === 'tailwind') {
      contentToCopy = tailwindCode;
      onCopyCode(effect);
    }

    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#09090b] border border-white/20 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-neutral-950">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
              {effect.badge || effect.categoryLabel}
            </span>
            <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">
              {effect.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Large Interactive Sandbox */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-white" />
                Sandbox Interativo em Tempo Real:
              </span>
              <span className="text-[11px] font-mono text-neutral-500">
                Passe o mouse ou toque para testar física e animação
              </span>
            </div>
            <div className="rounded-2xl border border-white/15 bg-black p-4 shadow-inner">
              <EffectPreview effect={effect} />
            </div>
          </div>

          {/* Description & Tech Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <h4 className="text-xs font-mono uppercase text-neutral-400">Sobre o Efeito</h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {effect.description}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-neutral-400">Tecnologias</h4>
              <div className="flex flex-wrap gap-1.5">
                {(effect.tech || []).map((t, idx) => (
                  <span key={idx} className="text-[11px] font-mono text-white bg-white/10 px-2 py-0.5 rounded border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section Customizer */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <label className="text-xs font-mono uppercase text-white font-semibold block">
                Seção de Destino no Prompt:
              </label>
              <p className="text-xs text-neutral-400">
                A IA vai gerar o código encaixado exatamente nesta seção.
              </p>
            </div>
            <input
              type="text"
              value={targetSection}
              onChange={(e) => setTargetSection(e.target.value)}
              placeholder="Ex: Hero Principal, Seção de Preços..."
              className="px-3.5 py-2 bg-black border border-white/20 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white sm:w-64"
            />
          </div>

          {/* Code Tabs */}
          <div>
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <button
                onClick={() => setActiveTab('prompt')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'prompt'
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                Prompt para IA
              </button>
              <button
                onClick={() => setActiveTab('react')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'react'
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                React JSX
              </button>
              <button
                onClick={() => setActiveTab('tailwind')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'tailwind'
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                HTML + Tailwind
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'rules'
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                UI UX Pro Max
              </button>
            </div>

            {/* Tab Contents */}
            <div className="mt-3">
              {activeTab === 'prompt' && (
                <pre className="p-4 rounded-xl bg-black border border-white/10 text-xs text-neutral-300 font-mono whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed select-all">
                  {promptText}
                </pre>
              )}
              {activeTab === 'react' && (
                <pre className="p-4 rounded-xl bg-black border border-white/10 text-xs text-neutral-300 font-mono whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed select-all">
                  {reactCode}
                </pre>
              )}
              {activeTab === 'tailwind' && (
                <pre className="p-4 rounded-xl bg-black border border-white/10 text-xs text-neutral-300 font-mono whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed select-all">
                  {tailwindCode}
                </pre>
              )}
              {activeTab === 'rules' && (
                <div className="p-4 rounded-xl bg-black border border-white/10 text-xs text-neutral-300 space-y-3 leading-relaxed">
                  <h5 className="font-bold text-white uppercase font-mono">Padrões UI UX Pro Max v2.0 Aplicados:</h5>
                  <ul className="list-disc list-inside space-y-1.5 text-neutral-400">
                    <li><strong className="text-white">Anti-AI Slop:</strong> Paleta estrita Neon Noir (Preto Absoluto #000000, Branco Puro #FFFFFF). Sem gradientes roxos genéricos.</li>
                    <li><strong className="text-white">Taxa de Quadros:</strong> Animações aceleradas por GPU rodando a 60fps cravados.</li>
                    <li><strong className="text-white">Acessibilidade:</strong> Contraste superior a 4.5:1 e respeito automático a <code className="text-white bg-white/10 px-1 rounded">prefers-reduced-motion</code>.</li>
                    <li><strong className="text-white">Ergonomia Tátil:</strong> Área mínima de clique de 44x44px para dispositivos móveis.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 bg-neutral-950 flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            Pronto para integração direta na sua landing page.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={handleCopyCurrent}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Copiado com Sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{activeTab === 'prompt' ? 'Copiar Prompt para IA' : 'Copiar Código'}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
