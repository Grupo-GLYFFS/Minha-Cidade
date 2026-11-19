import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Tempo do "carregando", que imita a resposta do sistema da prefeitura
const ESPERA_MS = 400;

// Imita o carregamento de uma lista ou detalhe, para a página mostrar o esqueleto
// e, se der errado, o erro com "Tentar de novo".
// O erro pode ser visto na apresentação com ?simular=erro no endereço.
// Devolve { carregando, erro, tentarDeNovo }.
export function useCarregamento() {
  const [parametros, setParametros] = useSearchParams();
  const [carregando, setCarregando] = useState(true);
  const erro = !carregando && parametros.get('simular') === 'erro';

  // Termina de "carregar" depois da espera
  useEffect(() => {
    if (!carregando) return undefined;
    const espera = setTimeout(() => setCarregando(false), ESPERA_MS);
    return () => clearTimeout(espera);
  }, [carregando]);

  // Tira a simulação de erro do endereço e carrega de novo
  function tentarDeNovo() {
    const proximos = new URLSearchParams(parametros);
    proximos.delete('simular');
    setParametros(proximos, { replace: true });
    setCarregando(true);
  }

  return { carregando, erro, tentarDeNovo };
}
