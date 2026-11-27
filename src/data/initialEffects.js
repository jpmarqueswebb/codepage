import { vivianeEffects } from './vivianeEffects';
import { vivianeVendasEffects } from './vivianeVendasEffects';
import { uromedEffects } from './uromedEffects';
import { dimasEffects } from './dimasEffects';
import { golgotaEffects } from './golgotaEffects';
import { partiuProEffects } from './partiuProEffects';
import { joaoPedroEffects } from './joaoPedroEffects';
import { loopMaisRxEffects } from './loopMaisRxEffects';
import { loopMaisLp4Effects } from './loopMaisLp4Effects';
import { loopMaisAulaEffects } from './loopMaisAulaEffects';
import { loopMaisSiteEffects } from './loopMaisSiteEffects';

// Catálogo: Vivi (links + vendas), Uromed, Dr. Dimas Melão, Projeto Golgota, Partiu Pro, João Pedro Marques (Nossa LP) e Loop+ (RX Clube de Vantagens, LP4 Benefícios Corporativos, Aula Academias e Site Institucional)
export const initialEffects = [...vivianeEffects, ...vivianeVendasEffects, ...uromedEffects, ...dimasEffects, ...golgotaEffects, ...partiuProEffects, ...joaoPedroEffects, ...loopMaisRxEffects, ...loopMaisLp4Effects, ...loopMaisAulaEffects, ...loopMaisSiteEffects];
