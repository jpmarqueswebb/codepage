import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { initialEffects } from './data/initialEffects';
import { Header } from './components/Header';
import { EffectCard } from './components/EffectCard';
import { PromptModal } from './components/PromptModal';
import { DetailModal } from './components/DetailModal';
import { AddEffectModal } from './components/AddEffectModal';
import { Toast } from './components/Toast';
import { Sparkles, Terminal, Layers, RefreshCw, Zap, Shield, ArrowUpRight } from 'lucide-react';

const STORAGE_KEY = 'fx_vault_effects_v1';

export default function App() {
  const [effects, setEffects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading effects from localStorage:', e);
    }
    return initialEffects;
  });

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals state
  const [activePromptModal, setActivePromptModal] = useState(null); // { effect, section }
  const [activeDetailModal, setActiveDetailModal] = useState(null); // effect
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
    const list = [
      { id: 'all', label: 'Todos os Efeitos', count: effects.length },
      { id: 'marcelo-cabral', label: 'Efeitos Marcelo Cabral', count: effects.filter(e => e.category === 'marcelo-cabral').length },
      { id: 'cards-borders', label: 'Cards & Bordas', count: effects.filter(e => e.category === 'cards-borders').length },
      { id: 'hero-fundos', label: 'Heróis & Fundos', count: effects.filter(e => e.category === 'hero-fundos').length },
      { id: 'buttons-ctas', label: 'Botões & Ações', count: effects.filter(e => e.category === 'buttons-ctas').length },
      { id: 'typography', label: 'Texto & Tipografia', count: effects.filter(e => e.category === 'typography').length },
      { id: 'navigation', label: 'Modais & Menus', count: effects.filter(e => e.category === 'navigation').length },
    ];
    return list;
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
        (eff.badge && eff.badge.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [effects, selectedCategory, search]);

  // Handle direct prompt copy
  const handleCopyPrompt = (effect, section) => {
    const finalSection = section || effect.defaultSection || 'Hero Principal';
    const code = effect.frameworks?.react || effect.code || '';

    const promptText = `Chat, adicione este efeito no nosso site, exatamente na seção "${finalSection}":

EFEITO: ${effect.name}
CATEGORIA: ${effect.categoryLabel}
DESCRIÇÃO VISUAL: ${effect.description}
ESTILO: Neon Noir Monocromático de Alta Fidelidade (Fundo Preto Absoluto #000000, Acentos e Bordas em Branco Puro #FFFFFF, Sem IA Slop, 60fps).

DIRETRIZES DE IMPLEMENTAÇÃO (UI UX PRO MAX v2.0):
1. Insira os estilos/classes no elemento da seção "${finalSection}" sem alterar os dados reais já existentes.
2. Mantenha os eventos e acessibilidade (contraste 4.5:1+, tags semânticas, suporte a prefers-reduced-motion).
3. 100% responsivo para mobile e desktop.
4. Curva de transição e animação refinada: cubic-bezier(0.16, 1, 0.3, 1).

--- CÓDIGO DO EFEITO COMPLETO PARA REPLICAR 100% IGUAL ---
${code}
`;

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

  // Add new effect
  const handleSaveNewEffect = (newEffect) => {
    setEffects([newEffect, ...effects]);
    showToast('Efeito Salvo!', `"${newEffect.name}" adicionado ao seu Vault.`);
  };

  // Export JSON
  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(effects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'noir-fx-vault-backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Catálogo Exportado!', 'Arquivo noir-fx-vault-backup.json baixado.');
  };

  // Import JSON
  const handleImport = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed)) {
            setEffects(parsed);
            showToast('Catálogo Importado!', `${parsed.length} efeitos carregados com sucesso.`);
          }
        } catch (err) {
          showToast('Erro ao importar', 'O arquivo JSON selecionado é inválido.');
        }
      };
    }
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (window.confirm('Deseja restaurar a biblioteca original com todos os efeitos do Marcelo Cabral e do Neon Noir?')) {
      setEffects(initialEffects);
      showToast('Biblioteca Restaurada', 'Efeitos padrão restabelecidos.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      
      {/* Global Header */}
      <Header
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        totalEffects={effects.length}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onExport={handleExport}
        onImport={handleImport}
      />

      {/* Hero Banner Showcase */}
      <section className="relative border-b border-white/10 bg-gradient-to-b from-neutral-950/60 to-black overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        {/* Subtle Noir Grid Background */}
        <div className="absolute inset-0 noir-grid opacity-30 pointer-events-none" />
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-white/5 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-neutral-300 text-xs font-mono shadow-[0_0_25px_rgba(255,255,255,0.06)]">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#fff] animate-pulse" />
            <span>Sistema Anti-IA Slop • Baseado no UI UX Pro Max v2.0</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-['Space_Grotesk'] leading-[1.1]">
            O Vault de Efeitos das suas Landing Pages
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 leading-relaxed">
            Selecione qualquer efeito, defina a seção do site no card e clique em 
            <strong className="text-white font-semibold"> "Copiar Prompt para IA"</strong>. 
            O prompt já sai formatado com as instruções para a IA replicar 100% igual.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{effects.length}</span> Efeitos Catalogados
            </div>
            <div className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">100%</span> Neon Noir (Preto & Branco)
            </div>
            <div className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">60 FPS</span> Aceleração por GPU
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Effects Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Grid Header Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Exibindo:
            </span>
            <span className="text-xs font-bold text-white bg-white/10 px-2.5 py-0.5 rounded border border-white/10">
              {filteredEffects.length} {filteredEffects.length === 1 ? 'efeito' : 'efeitos'}
            </span>
          </div>

          <button
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors"
            title="Restaurar efeitos padrão"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restaurar Padrões</span>
          </button>
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
          <div className="text-center py-24 border border-dashed border-white/15 rounded-2xl bg-neutral-950/40 p-8">
            <p className="text-base font-semibold text-white">Nenhum efeito encontrado</p>
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

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-8 px-4 sm:px-6 lg:px-8 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white font-['Space_Grotesk']">NOIR // FX VAULT</span>
            <span>•</span>
            <span>Estilo Preto & Branco Neon Noir</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Desenvolvido com o UI UX Pro Max Skill v2.0</span>
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

      {isAddModalOpen && (
        <AddEffectModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveNewEffect}
        />
      )}

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
