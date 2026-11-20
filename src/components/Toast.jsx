import React from 'react';
import { Check, Info } from 'lucide-react';

export function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-black font-semibold text-xs shadow-[0_0_30px_rgba(255,255,255,0.35)] animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-1 rounded-full bg-black text-white">
        <Check className="w-3.5 h-3.5" />
      </div>
      <div>
        <p className="font-bold">{toast.title}</p>
        {toast.message && <p className="text-[11px] text-neutral-700 font-normal">{toast.message}</p>}
      </div>
    </div>
  );
}
