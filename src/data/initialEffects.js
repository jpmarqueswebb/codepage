import { vivianeEffects } from './vivianeEffects';
import { vivianeVendasEffects } from './vivianeVendasEffects';
import { uromedEffects } from './uromedEffects';
import { dimasEffects } from './dimasEffects';
import { golgotaEffects } from './golgotaEffects';

// Catálogo: Vivi (links + vendas), Uromed, Dr. Dimas Melão e Projeto Golgota
export const initialEffects = [...vivianeEffects, ...vivianeVendasEffects, ...uromedEffects, ...dimasEffects, ...golgotaEffects];
