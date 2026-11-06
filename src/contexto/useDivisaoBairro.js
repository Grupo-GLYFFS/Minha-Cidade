import { useState } from 'react';
import { apagarDado, lerDado, salvarDado } from '../armazenamento';
import { useSessao } from './useSessao';
import { momentoDeHoje } from '../logica/datas';

// Nome com que as divisões ficam guardadas no navegador,
// no formato { idPessoa: { bairro, divisao, enviadoEm } }
const CHAVE_ORCAMENTO_BAIRRO = 'orcamento-bairro';

// Guarda a divisão do Orçamento do Bairro ("Prefeito por 5 minutos") de cada pessoa.
// Devolve { envio, enviar, refazer }:
// - envio: a divisão enviada pela pessoa logada ({ bairro, divisao, enviadoEm }) ou null;
// - enviar(bairro, divisao): salva a divisão da pessoa logada (visitante não salva);
// - refazer(): apaga a divisão enviada, para a pessoa dividir de novo.
export function useDivisaoBairro() {
  const { usuario } = useSessao();
  const idPessoa = usuario?.id ?? null;
  const [envios, setEnvios] = useState(() => lerDado(CHAVE_ORCAMENTO_BAIRRO, {}));

  // Troca a lista na tela e no navegador ao mesmo tempo (lista vazia apaga a chave)
  function guardar(novos) {
    setEnvios(novos);
    if (Object.keys(novos).length > 0) salvarDado(CHAVE_ORCAMENTO_BAIRRO, novos);
    else apagarDado(CHAVE_ORCAMENTO_BAIRRO);
  }

  function enviar(bairro, divisao) {
    if (!idPessoa) return;
    guardar({ ...envios, [idPessoa]: { bairro, divisao, enviadoEm: momentoDeHoje() } });
  }

  function refazer() {
    if (!idPessoa) return;
    const { [idPessoa]: _removido, ...outros } = envios;
    guardar(outros);
  }

  return { envio: idPessoa ? (envios[idPessoa] ?? null) : null, enviar, refazer };
}
