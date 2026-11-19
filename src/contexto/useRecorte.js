import { useMemo } from 'react';
import { montarRecorte } from '../logica/recorte';
import { useBairroDaPessoa } from './useBairroDaPessoa';

// Dá o recorte da página (cidade ou bairro da pessoa: o da conta ou o escolhido sem conta),
// com rotas, trilha e títulos.
// Recebe o escopo ("cidade" ou "bairro"); devolve o objeto de montarRecorte().
export function useRecorte(escopo) {
  const { nome: bairro } = useBairroDaPessoa();
  return useMemo(() => montarRecorte(escopo, bairro), [escopo, bairro]);
}
