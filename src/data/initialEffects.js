import { vivianeEffects } from './vivianeEffects';
import { vivianeVendasEffects } from './vivianeVendasEffects';
import { uromedEffects } from './uromedEffects';
import { dimasEffects } from './dimasEffects';

// Catálogo: Vivi (links + vendas), Uromed e Dr. Dimas Melão
export const initialEffects = [...vivianeEffects, ...vivianeVendasEffects, ...uromedEffects, ...dimasEffects];
