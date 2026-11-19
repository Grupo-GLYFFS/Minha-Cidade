import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Quanto tempo o "carregando" aparece, em milissegundos
const TEMPO_CARREGANDO = 450;

// Simula a busca dos dados de uma lista, para as telas mostrarem os estados de verdade.
// Os dados do protótipo já estão no app, então a lista fica "carregando" por um instante.
// Para ver o estado de erro na apresentação, abra a página com ?simular=erro no endereço.
// Não recebe nada; devolve { estado ("carregando" | "erro" | "pronto"), tentarDeNovo }.
export function useCarregamentoSimulado() {
  const [parametros, setParametros] = useSearchParams();
  const simularErro = parametros.get('simular') === 'erro';
  const [carregando, setCarregando] = useState(true);

  // Depois do tempo, termina de "carregar"
  useEffect(() => {
    if (!carregando) return undefined;
    const espera = setTimeout(() => setCarregando(false), TEMPO_CARREGANDO);
    return () => clearTimeout(espera);
  }, [carregando]);

  // Tenta de novo: tira o erro simulado do endereço e carrega outra vez
  const tentarDeNovo = useCallback(() => {
    setParametros(
      (atuais) => {
        const novos = new URLSearchParams(atuais);
        novos.delete('simular');
        return novos;
      },
      { replace: true },
    );
    setCarregando(true);
  }, [setParametros]);

  let estado = 'pronto';
  if (carregando) estado = 'carregando';
  else if (simularErro) estado = 'erro';
  return { estado, tentarDeNovo };
}
