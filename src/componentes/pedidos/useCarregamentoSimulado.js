import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Tempo que o esqueleto fica na tela (no protótipo os dados já estão no aparelho)
const ESPERA_MS = 400;

// Simula a busca dos pedidos no sistema da prefeitura, para as listas terem os estados
// carregando e erro. Com ?simular=erro no endereço, a primeira tentativa dá erro
// (serve para mostrar o estado de erro); "Tentar de novo" sempre funciona.
// Devolve { estado: "carregando" | "pronto" | "erro", tentarDeNovo }.
export function useCarregamentoSimulado() {
  const [parametros] = useSearchParams();
  const [tentativa, setTentativa] = useState(0);
  const [estado, setEstado] = useState('carregando');
  const simularErro = parametros.get('simular') === 'erro' && tentativa === 0;

  useEffect(() => {
    const relogio = setTimeout(() => setEstado(simularErro ? 'erro' : 'pronto'), ESPERA_MS);
    return () => clearTimeout(relogio);
  }, [tentativa, simularErro]);

  // Volta para o carregando e busca de novo
  const tentarDeNovo = useCallback(() => {
    setEstado('carregando');
    setTentativa((atual) => atual + 1);
  }, []);

  return { estado, tentarDeNovo };
}
