import { useMemo } from 'react';
import { montarRecorte } from '../logica/recorte';
import { BAIRRO_PADRAO } from '../logica/lugares';
import { useSessao } from './useSessao';

// Dá o recorte da página (cidade ou bairro da pessoa logada), com rotas, trilha e títulos.
// Recebe o escopo ("cidade" ou "bairro"); devolve o objeto de montarRecorte().
export function useRecorte(escopo) {
  const { usuario } = useSessao();
  const bairro = usuario?.bairro ?? BAIRRO_PADRAO;
  return useMemo(() => montarRecorte(escopo, bairro), [escopo, bairro]);
}
