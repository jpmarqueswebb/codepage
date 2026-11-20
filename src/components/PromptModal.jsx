import React, { useState } from 'react';
import { X, Bot, Copy, Check, Sparkles, Terminal, FileCode } from 'lucide-react';

export function PromptModal({ effect, targetSection, onClose, onCopyPrompt }) {
  if (!effect) return null;

  const [section, setSection] = useState(targetSection || effect.defaultSection || 'Hero Principal');
  const [framework, setFramework] = useState('react');
  const [extraInstructions, setExtraInstructions] = useState('');
  const [copied, setCopied] = useState(false);

  const codeSnippet = framework === 'react' 
    ? effect.frameworks?.react || effect.code 
    : effect.frameworks?.tailwind || effect.code;

  const generatedPrompt = `Chat, adicione este efeito no nosso site, exatamente na seção "${section}":

EFEITO: ${effect.name}
CATEGORIA: ${effect.categoryLabel}
DESCRIÇÃO DO EFEITO: ${effect.description}
ESTILO VISUAL: Neon Noir / Monocromático de Alto Contraste (Fundo Preto Absoluto #000000, Acentos e Bordas em Branco Puro #FFFFFF, Sem IA Slop, 60fps).

DIRETRIZES DE IMPLEMENTAÇÃO (UI UX PRO MAX):
1. Integre o código abaixo na seção "${section}" preservando os elementos existentes da página.
2. Garanta acessibilidade total (WCAG contrastes 4.5:1+, tags semânticas, suporte a prefers-reduced-motion).
3. Garanta que o efeito seja 100% responsivo para mobile e desktop sem quebra de layout.
4. Mantenha os eventos e animações com curvas fluidas cubic-bezier(0.16, 1, 0.3, 1).
${extraInstructions ? `5. INSTRUÇÃO EXTRA DO USUÁRIO: ${extraInstructions}\n` : ''}
--- CÓDIGO DO EFEITO (${framework.toUpperCase()}) ---
${codeSnippet}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
    if (onCopyPrompt) onCopyPrompt(effect, section);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[#09090b] border border-white/20 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white text-black font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Space_Grotesk']">
                Gerador de Prompt para IA
              </h2>
              <p className="text-xs text-neutral-400">
                Copie a mensagem pronta com instruções e código para colar em qualquer IA.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Target Section Customizer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                Em qual seção você quer adicionar?
              </label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="Ex: Hero Principal, Seção 3 de Benefícios..."
                className="w-full px-3.5 py-2.5 bg-black border border-white/20 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                Formato do Código:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFramework('react')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    framework === 'react'
                      ? 'bg-white text-black font-bold border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                      : 'bg-black text-neutral-400 border-white/10 hover:text-white'
                  }`}
                >
                  React + Tailwind
                </button>
                <button
                  type="button"
                  onClick={() => setFramework('tailwind')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    framework === 'tailwind'
                      ? 'bg-white text-black font-bold border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                      : 'bg-black text-neutral-400 border-white/10 hover:text-white'
                  }`}
                >
                  HTML + Tailwind
                </button>
              </div>
            </div>
          </div>

          {/* Extra Notes */}
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
              Instruções Adicionais (opcional):
            </label>
            <input
              type="text"
              value={extraInstructions}
              onChange={(e) => setExtraInstructions(e.target.value)}
              placeholder="Ex: Mudar texto para 'Compre Agora', aplicar no botão direito..."
              className="w-full px-3.5 py-2 bg-black border border-white/15 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-all"
            />
          </div>

          {/* Prompt Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Prévia do Prompt Formatado:
              </span>
              <span className="text-[11px] font-mono text-neutral-500">
                Pronto para ChatGPT, Claude, Gemini ou Cursor
              </span>
            </div>
            <pre className="p-4 rounded-xl bg-black border border-white/15 text-xs text-neutral-300 font-mono whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed select-all">
              {generatedPrompt}
            </pre>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-white/10 bg-neutral-950 flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            Fidelidade de 100% com estilo Neon Noir.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Prompt Copiado com Sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Mensagem para IA</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
