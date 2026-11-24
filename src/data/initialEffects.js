import { vivianeEffects } from './vivianeEffects';
import { vivianeVendasEffects } from './vivianeVendasEffects';
import { uromedEffects } from './uromedEffects';
import { dimasEffects } from './dimasEffects';
import { golgotaEffects } from './golgotaEffects';
import { partiuProEffects } from './partiuProEffects';

// Catálogo: Vivi (links + vendas), Uromed, Dr. Dimas Melão, Projeto Golgota e Partiu Pro
export const initialEffects = [...vivianeEffects, ...vivianeVendasEffects, ...uromedEffects, ...dimasEffects, ...golgotaEffects, ...partiuProEffects];
