import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Tempo que o protótipo finge esperar a resposta do sistema da prefeitura
const ESPERA_MS = 350;

// Simula o carregamento de um bloco de dados (o app não tem servidor: os dados são locais).
// Os estados também podem ser vistos pelo endereço, para apresentar e testar:
// ?estado=carregando (fica carregando), ?estado=erro (mostra o erro), ?estado=vazio (lista vazia).
// Devolve { estado, tentarDeNovo }: estado é "carregando" | "erro" | "vazio" | "pronto";
// tentarDeNovo() tira o estado do endereço e carrega outra vez.
export function useCarregamento() {
  const [parametros, setParametros] = useSearchParams();
  const pedido = parametros.get('estado');
  const [pronto, setPronto] = useState(false);
  const [tentativa, setTentativa] = useState(0);

  // Termina de "carregar" depois de um instante (de novo a cada tentativa)
  useEffect(() => {
    const espera = setTimeout(() => setPronto(true), ESPERA_MS);
    return () => clearTimeout(espera);
  }, [tentativa]);

  const tentarDeNovo = useCallback(() => {
    setPronto(false);
    setTentativa((atual) => atual + 1);
    setParametros(
      (atuais) => {
        const novos = new URLSearchParams(atuais);
        novos.delete('estado');
        return novos;
      },
      { replace: true },
    );
  }, [setParametros]);

  let estado = 'pronto';
  if (!pronto || pedido === 'carregando') estado = 'carregando';
  else if (pedido === 'erro') estado = 'erro';
  else if (pedido === 'vazio') estado = 'vazio';

  return { estado, tentarDeNovo };
}
