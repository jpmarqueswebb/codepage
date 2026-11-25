import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { initialEffects } from './data/initialEffects';
import { categories as sectionCategories } from './data/categories';
import { buildPrompt } from './utils/buildPrompt';
import { EffectCard } from './components/EffectCard';
import { PromptModal } from './components/PromptModal';
import { DetailModal } from './components/DetailModal';
import { Toast } from './components/Toast';
import { Search, RefreshCw, Sparkles, Terminal, Layers, ArrowUpRight } from 'lucide-react';

const STORAGE_KEY = 'codepage_effects_v2';

export default function App() {
  const [effects, setEffects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const byId = Object.fromEntries(initialEffects.map((e) => [e.id, e]));
          const known = new Set(parsed.map((e) => e.id));
          const merged = parsed.map((e) => byId[e.id] || e);
          return merged.concat(initialEffects.filter((e) => !known.has(e.id)));
        }
      }
    } catch (e) {
      console.error('Error loading effects from localStorage:', e);
    }
    return initialEffects;
  });

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals state
  const [activePromptModal, setActivePromptModal] = useState(null);
  const [activeDetailModal, setActiveDetailModal] = useState(null);
  const [toast, setToast] = useState(null);

  // Save to localStorage whenever effects change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(effects));
    } catch (e) {
      console.error('Error saving effects to localStorage:', e);
    }
  }, [effects]);

  const showToast = (title, message = '') => {
    setToast({ title, message });
    setTimeout(() => setToast(null), 3000);
  };

  // Categories definition
  const categories = useMemo(() => {
    return [
      { id: 'all', label: 'Todos os Efeitos', count: effects.length },
      ...sectionCategories.map((c) => ({ ...c, count: effects.filter((e) => e.category === c.id).length })),
    ];
  }, [effects]);

  // Filtered effects list
  const filteredEffects = useMemo(() => {
    return effects.filter((eff) => {
      const matchCategory = selectedCategory === 'all' || eff.category === selectedCategory;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        eff.name.toLowerCase().includes(q) ||
        eff.description.toLowerCase().includes(q) ||
        eff.tags.some((t) => t.toLowerCase().includes(q)) ||
        (eff.badge && eff.badge.toLowerCase().includes(q)) ||
        (eff.client && eff.client.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [effects, selectedCategory, search]);

  // Handle direct prompt copy
  const handleCopyPrompt = (effect, section) => {
    const finalSection = section || effect.defaultSection || 'Hero Principal';
    const code = effect.frameworks?.react || effect.code || '';

    const promptText = buildPrompt({ effect, section: finalSection, code });

    navigator.clipboard.writeText(promptText);

    // Particle burst
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ffffff', '#aaaaaa', '#ffffff'],
    });

    showToast('Prompt Copiado com Sucesso!', `Pronto para enviar à IA na seção "${finalSection}".`);
  };

  // Handle direct code copy
  const handleCopyCode = (effect) => {
    const code = effect.frameworks?.react || effect.code || '';
    navigator.clipboard.writeText(code);
    showToast('Código Copiado!', `${effect.name} copiado para a área de transferência.`);
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (window.confirm('Deseja restaurar os códigos e efeitos padrão?')) {
      setEffects(initialEffects);
      showToast('Biblioteca Restaurada', 'Efeitos padrão restabelecidos.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      
      {/* Hero Banner Showcase (Sem Header acima) */}
      <section className="relative border-b border-white/10 bg-gradient-to-b from-neutral-950/80 via-black to-black overflow-hidden pt-16 pb-14 px-4 sm:px-6 lg:px-8">
        {/* Grade sutil de fundo */}
        <div className="absolute inset-0 noir-grid opacity-30 pointer-events-none" />
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-36 bg-white/5 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-['Space_Grotesk'] leading-[1.08]">
            O Acervo de Códigos e Efeitos das suas Páginas
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 leading-relaxed">
            Selecione qualquer código de efeito, defina a seção do site no card e clique em 
            <strong className="text-white font-semibold"> "Copiar Prompt para IA"</strong>. 
            O prompt já sai formatado para a IA aplicar o efeito com as cores do seu projeto.
          </p>
        </div>
      </section>

      {/* Main Content: Controls + Effects Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Controls Bar: Busca + Filtros por Categoria logo acima dos códigos */}
        <div className="space-y-4 rounded-2xl bg-[#070709] border border-white/10 p-5 shadow-xl">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar código, efeito, palavra-chave ou tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-white/15 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all font-sans"
              />
            </div>

            {/* Quick Status / Reset */}
            <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
              <span className="text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 font-mono">
                {filteredEffects.length} {filteredEffects.length === 1 ? 'efeito' : 'efeitos'}
              </span>

              <button
                onClick={handleResetToDefault}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
                title="Restaurar efeitos padrão"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restaurar</span>
              </button>
            </div>
          </div>

          {/* Categories Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-3 text-xs border-t border-white/5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                      : 'bg-neutral-950 text-neutral-400 border border-white/10 hover:text-white hover:border-white/30'
                  }`}
                >
                  {cat.label}
                  {cat.count !== undefined && (
                    <span className={`ml-1.5 text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-400'
                    }`}>
                      {cat.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </div>

        {/* Cards Grid */}
        {filteredEffects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEffects.map((effect) => (
              <EffectCard
                key={effect.id}
                effect={effect}
                onOpenDetail={(eff) => setActiveDetailModal(eff)}
                onCopyPrompt={(eff, sec) => handleCopyPrompt(eff, sec)}
                onCopyCode={(eff) => handleCopyCode(eff)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/15 rounded-2xl bg-neutral-950/40 p-8">
            <p className="text-base font-semibold text-white">Nenhum código encontrado</p>
            <p className="text-xs text-neutral-400 mt-1">Tente buscar por outro termo ou limpe os filtros de categoria.</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('all'); }}
              className="mt-4 px-4 py-2 bg-white text-black font-bold text-xs rounded-xl"
            >
              Limpar Filtros
            </button>
          </div>
        )}

      </main>

      {/* Footer Minimalista */}
      <footer className="border-t border-white/10 bg-black py-8 px-4 sm:px-6 lg:px-8 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white font-['Space_Grotesk']">CODEPAGE</span>
            <span>•</span>
            <span>Códigos & Efeitos para Landing Pages</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activePromptModal && (
        <PromptModal
          effect={activePromptModal.effect}
          targetSection={activePromptModal.section}
          onClose={() => setActivePromptModal(null)}
          onCopyPrompt={handleCopyPrompt}
        />
      )}

      {activeDetailModal && (
        <DetailModal
          effect={activeDetailModal}
          onClose={() => setActiveDetailModal(null)}
          onCopyPrompt={handleCopyPrompt}
          onCopyCode={handleCopyCode}
        />
      )}

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
