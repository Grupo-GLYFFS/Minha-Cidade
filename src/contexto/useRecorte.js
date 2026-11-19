import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { montarRecorte, montarRecorteLugar } from '../logica/recorte';
import { useBairroDaPessoa } from './useBairroDaPessoa';

// Dá o recorte da página, com rotas, trilha e títulos.
// - escopo "cidade": a cidade toda;
// - escopo "bairro": o lugar da rota (/minha-cidade/bairros/:idBairro/... ou
//   /minha-cidade/subprefeituras/:idSub/...) ou, em /meu-bairro, o bairro da pessoa
//   (o da conta ou o escolhido sem conta).
// Recebe o escopo; devolve o objeto de montarRecorte() ou de montarRecorteLugar().
export function useRecorte(escopo) {
  const { nome: bairro } = useBairroDaPessoa();
  const { idBairro, idSub } = useParams();
  return useMemo(() => {
    if (escopo === 'bairro' && (idBairro || idSub)) {
      return montarRecorteLugar({ idBairro, idSub }) ?? montarRecorte('bairro', bairro);
    }
    return montarRecorte(escopo, bairro);
  }, [escopo, bairro, idBairro, idSub]);
}
