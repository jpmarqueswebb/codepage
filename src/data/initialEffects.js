import { vivianeEffects } from './vivianeEffects';
import { vivianeVendasEffects } from './vivianeVendasEffects';
import { uromedEffects } from './uromedEffects';
import { dimasEffects } from './dimasEffects';
import { golgotaEffects } from './golgotaEffects';
import { partiuProEffects } from './partiuProEffects';
import { joaoPedroEffects } from './joaoPedroEffects';
import { loopMaisRxEffects } from './loopMaisRxEffects';

// Catálogo: Vivi (links + vendas), Uromed, Dr. Dimas Melão, Projeto Golgota, Partiu Pro, João Pedro Marques (Nossa LP) e Loop+ (RX Clube de Vantagens)
export const initialEffects = [...vivianeEffects, ...vivianeVendasEffects, ...uromedEffects, ...dimasEffects, ...golgotaEffects, ...partiuProEffects, ...joaoPedroEffects, ...loopMaisRxEffects];
