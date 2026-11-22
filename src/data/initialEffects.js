import { vivianeEffects } from './vivianeEffects';
import { vivianeVendasEffects } from './vivianeVendasEffects';

// Catálogo: só efeitos da Vivi (página de links + página de vendas)
export const initialEffects = [...vivianeEffects, ...vivianeVendasEffects];
