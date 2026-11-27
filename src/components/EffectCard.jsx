import React, { useState } from 'react';
import { EffectPreview } from './EffectPreview';
import { Bot, Check, ArrowRight } from 'lucide-react';

export function EffectCard({ effect, onOpenDetail, onCopyPrompt }) {
  const [targetSection, setTargetSection] = useState(effect.defaultSection || 'Hero Principal');
  const [copied, setCopied] = useState(false);

  const handleCopyPromptClick = (e) => {
    e.stopPropagation();
    onCopyPrompt(effect, targetSection);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl bg-[#070709] border border-white/10 hover:border-white/25 transition-all duration-300 shadow-xl overflow-hidden">

      {/* Preview */}
      <div className="p-3.5 pb-0">
        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black">
          <EffectPreview effect={effect} />

          <div className="absolute top-2.5 left-2.5 z-20">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-300 bg-black/80 px-2 py-0.5 rounded-md border border-white/15 backdrop-blur-md">
              {effect.badge || effect.categoryLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-white tracking-tight">{effect.name}</h3>
        <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
          {effect.description}
        </p>

        <div className="mt-auto pt-4">
          <label className="block text-[11px] font-mono text-neutral-500 uppercase tracking-wide mb-1.5">
            Seção no seu site
          </label>
          <input
            type="text"
            value={targetSection}
            onChange={(e) => setTargetSection(e.target.value)}
            placeholder="Ex: Hero Principal, Seção de Preços..."
            className="w-full px-3 py-2 bg-neutral-950 border border-white/15 rounded-lg text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white/60 transition-colors"
          />

          <div className="mt-3 space-y-2">
            <button
              onClick={handleCopyPromptClick}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white text-black text-xs font-bold rounded-xl hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-950">Prompt Copiado para IA!</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  <span>Copiar Prompt para IA</span>
                </>
              )}
            </button>

            <button
              onClick={() => onOpenDetail(effect)}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-4 border border-white/10 hover:border-white/25 rounded-xl text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Ver Detalhes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
