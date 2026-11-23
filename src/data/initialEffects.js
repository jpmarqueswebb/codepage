import { vivianeEffects } from './vivianeEffects';
import { vivianeVendasEffects } from './vivianeVendasEffects';
import { uromedEffects } from './uromedEffects';

// Catálogo: Vivi (links + vendas) e Uromed
export const initialEffects = [...vivianeEffects, ...vivianeVendasEffects, ...uromedEffects];
