import React, { useState } from 'react';
import { X, Plus, Sparkles, Check } from 'lucide-react';

export function AddEffectModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'cards-borders',
    categoryLabel: 'Cards & Bordas',
    badge: 'Custom',
    description: '',
    tags: '',
    defaultSection: 'Hero Principal',
    previewType: 'glare-card',
    reactCode: '',
    tailwindCode: '',
  });

  const categories = [
    { id: 'marcelo-cabral', label: 'Efeitos Marcelo Cabral' },
    { id: 'cards-borders', label: 'Cards & Bordas' },
    { id: 'hero-fundos', label: 'Heróis & Fundos' },
    { id: 'buttons-ctas', label: 'Botões & Ações' },
    { id: 'typography', label: 'Texto & Tipografia' },
    { id: 'navigation', label: 'Modais & Menus' },
  ];

  const previewTypes = [
    { id: 'glare-card', label: 'Card Tilt 3D com Glare' },
    { id: 'laser-border', label: 'Laser Border Beam' },
    { id: 'magnetic-button', label: 'Botão Magnético Shimmer' },
    { id: 'canvas-filaments', label: 'Canvas Filamentos Quânticos' },
    { id: 'marquee-rail', label: 'Marquee Infinito Rail' },
    { id: 'text-scramble', label: 'Decodificação Cyber Scramble' },
    { id: 'dot-spotlight', label: 'Superfície de Pontos Spotlight' },
    { id: 'text-shimmer', label: 'Texto Liquid Silver Shimmer' },
    { id: 'radar-badge', label: 'Badge Radar Pulsante' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const selectedCat = categories.find(c => c.id === formData.category);

    const newEffect = {
      id: 'custom-' + Date.now(),
      name: formData.name,
      category: formData.category,
      categoryLabel: selectedCat ? selectedCat.label : 'Personalizado',
      badge: formData.badge || 'Custom',
      description: formData.description || 'Efeito personalizado salvo pelo usuário.',
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : ['Custom', 'Noir'],
      defaultSection: formData.defaultSection || 'Hero Principal',
      previewType: formData.previewType,
      tech: ['Custom UI', 'Tailwind CSS', 'Neon Noir'],
      frameworks: {
        react: formData.reactCode || `// Componente ${formData.name}\nexport function CustomEffect() {\n  return <div className="p-6 bg-black text-white rounded-xl border border-white/20">${formData.name}</div>;\n}`,
        tailwind: formData.tailwindCode || `<!-- ${formData.name} -->\n<div class="p-6 bg-black text-white rounded-xl border border-white/20">\n  ${formData.name}\n</div>`,
      }
    };

    onSave(newEffect);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#09090b] border border-white/20 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white text-black font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Space_Grotesk']">
                Salvar Novo Efeito no Vault
              </h2>
              <p className="text-xs text-neutral-400">
                Adicione seu próprio efeito de landing page para gerar prompts rapidamente.
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Nome do Efeito *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Glow Neon Card Hero"
                className="w-full px-3 py-2 bg-black border border-white/20 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Categoria
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-black border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Badge / Selo
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Ex: Exclusivo, Top Conversão"
                className="w-full px-3 py-2 bg-black border border-white/20 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Estilo de Prévia Interativa
              </label>
              <select
                value={formData.previewType}
                onChange={(e) => setFormData({ ...formData, previewType: e.target.value })}
                className="w-full px-3 py-2 bg-black border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-white"
              >
                {previewTypes.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Descrição do Comportamento Visual
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva como o efeito age, movimentos no hover, transições..."
              className="w-full px-3 py-2 bg-black border border-white/20 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Seção Sugerida no Site
              </label>
              <input
                type="text"
                value={formData.defaultSection}
                onChange={(e) => setFormData({ ...formData, defaultSection: e.target.value })}
                placeholder="Ex: Hero Principal, Seção 2..."
                className="w-full px-3 py-2 bg-black border border-white/20 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Ex: Glow, 3D, Hero, CTA"
                className="w-full px-3 py-2 bg-black border border-white/20 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Código React / JSX (ou HTML)
            </label>
            <textarea
              rows={4}
              value={formData.reactCode}
              onChange={(e) => setFormData({ ...formData, reactCode: e.target.value })}
              placeholder="Cole o código do componente React ou funções..."
              className="w-full px-3 py-2 bg-black border border-white/20 rounded-xl text-xs font-mono text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Código HTML / Tailwind CSS
            </label>
            <textarea
              rows={3}
              value={formData.tailwindCode}
              onChange={(e) => setFormData({ ...formData, tailwindCode: e.target.value })}
              placeholder="Cole a estrutura HTML com classes Tailwind..."
              className="w-full px-3 py-2 bg-black border border-white/20 rounded-xl text-xs font-mono text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-white"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-white text-black font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-neutral-200 active:scale-95 transition-all"
            >
              Salvar Efeito
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
