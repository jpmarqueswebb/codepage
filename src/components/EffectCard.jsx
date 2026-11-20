import React, { useState } from 'react';
import { EffectPreview } from './EffectPreview';
import { Bot, Copy, Code, Maximize2, Check, ArrowRight } from 'lucide-react';

export function EffectCard({ effect, onOpenDetail, onCopyPrompt, onCopyCode }) {
  const [targetSection, setTargetSection] = useState(effect.defaultSection || 'Hero Principal');
  const [copiedType, setCopiedType] = useState(null);

  const quickSections = ['Hero', 'Benefícios', 'Preços', 'Depoimentos', 'CTA Final'];

  const handleCopyPromptClick = (e) => {
    e.stopPropagation();
    onCopyPrompt(effect, targetSection);
    setCopiedType('prompt');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyCodeClick = (e) => {
    e.stopPropagation();
    onCopyCode(effect);
    setCopiedType('code');
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[#070709] border border-white/10 hover:border-white/30 transition-all duration-300 shadow-xl overflow-hidden hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]">
      
      {/* Top Bar with Live Preview */}
      <div className="p-3.5 pb-0">
        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black">
          <EffectPreview effect={effect} />
          
          {/* Top Left Badge */}
          <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-300 bg-black/80 px-2 py-0.5 rounded-md border border-white/15 backdrop-blur-md">
              {effect.badge || effect.categoryLabel}
            </span>
          </div>

          {/* Top Right Maximize / Inspect button */}
          <button
            onClick={() => onOpenDetail(effect)}
            title="Expandir e Customizar Efeito"
            className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-lg bg-black/80 border border-white/15 text-neutral-400 hover:text-white hover:border-white/30 backdrop-blur-md transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Description */}
          <h3 className="text-base font-bold text-white tracking-tight flex items-center justify-between">
            <span>{effect.name}</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
            {effect.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {effect.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Target Section Input Field (Editable for Prompt) */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wide">
                Seção no seu site:
              </label>
              <span className="text-[10px] text-neutral-500 font-mono">vai no prompt</span>
            </div>
            
            <input
              type="text"
              value={targetSection}
              onChange={(e) => setTargetSection(e.target.value)}
              placeholder="Ex: Hero Principal, Seção de Preços..."
              className="w-full px-3 py-1.5 bg-neutral-950 border border-white/15 rounded-lg text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all font-sans"
            />

            {/* Quick Section Chips */}
            <div className="flex items-center gap-1 mt-1.5 overflow-x-auto no-scrollbar py-0.5">
              {quickSections.map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setTargetSection(sec)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors whitespace-nowrap ${
                    targetSection === sec
                      ? 'bg-white text-black font-semibold'
                      : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
          
          {/* Primary Action Button: White High Contrast */}
          <button
            onClick={handleCopyPromptClick}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white text-black text-xs font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer"
          >
            {copiedType === 'prompt' ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-950">Prompt Copiado para IA!</span>
              </>
            ) : (
              <>
                <Bot className="w-4 h-4 text-black" />
                <span>Copiar Prompt para IA</span>
              </>
            )}
          </button>

          {/* Secondary Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopyCodeClick}
              className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-neutral-900 border border-white/10 hover:border-white/25 rounded-lg text-xs text-neutral-300 hover:text-white transition-colors"
            >
              {copiedType === 'code' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Code className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Código Puro</span>
                </>
              )}
            </button>

            <button
              onClick={() => onOpenDetail(effect)}
              className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-neutral-900 border border-white/10 hover:border-white/25 rounded-lg text-xs text-neutral-300 hover:text-white transition-colors"
            >
              <span>Ver Detalhes</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
