import React from 'react';
import { Search, Plus, Sparkles, Download, Upload, Code2 } from 'lucide-react';

export function Header({ 
  search, 
  setSearch, 
  selectedCategory, 
  setSelectedCategory, 
  categories, 
  totalEffects, 
  onOpenAddModal,
  onExport,
  onImport
}) {
  return (
    <header className="relative border-b border-white/10 bg-black/90 backdrop-blur-md sticky top-0 z-40">
      {/* Glow line top accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white text-black flex items-center justify-center font-black tracking-tighter shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <Code2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white font-['Space_Grotesk']">
                  CODEPAGE
                </h1>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/15">
                  Studio
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Códigos & Efeitos para Landing Pages e Sites de Alta Conversão
              </p>
            </div>
          </div>

          {/* Right Actions: Search + Add + Backup */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar código, efeito ou tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-white/15 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
            </div>

            {/* Export & Import buttons */}
            <button
              onClick={onExport}
              title="Exportar códigos em JSON"
              className="p-2 rounded-xl bg-neutral-950 border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <label
              title="Importar códigos JSON"
              className="p-2 rounded-xl bg-neutral-950 border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <input type="file" accept=".json" onChange={onImport} className="hidden" />
            </label>

            {/* Add Effect Button - Pure White High Contrast */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Código / Efeito</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 pb-1 no-scrollbar text-xs">
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
    </header>
  );
}
