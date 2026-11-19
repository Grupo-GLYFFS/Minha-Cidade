import { useCallback, useMemo, useState } from 'react';
import { lerDado, salvarDado } from '../armazenamento';
import { SEGUIDOS_DEMONSTRACAO } from '../dados/seguidosDemonstracao';
import { useSessao } from './useSessao';

// Guarda o que a pessoa logada segue (obras ou votações), no navegador, separado por pessoa.
// Recebe o tipo ("obras" ou "votacoes").
// Devolve { seguidos (lista de ids), segue(id), alternar(id), logado }.
// O visitante não segue nada: a tela deve levar ele para "Entrar".
export function useSeguidos(tipo) {
  const { usuario } = useSessao();
  const idPessoa = usuario?.id ?? null;
  const chave = `seguidos-${tipo}`;
  const [porPessoa, setPorPessoa] = useState(() =>
    lerDado(chave, SEGUIDOS_DEMONSTRACAO[tipo] ?? {}),
  );

  // Ids seguidos pela pessoa logada (vazio para visitante)
  const seguidos = useMemo(
    () => (idPessoa ? (porPessoa[idPessoa] ?? []) : []),
    [porPessoa, idPessoa],
  );

  // Diz se a pessoa segue o item. Recebe o id; devolve true ou false.
  const segue = useCallback((id) => seguidos.includes(id), [seguidos]);

  // Passa a seguir ou deixa de seguir o item e salva no navegador. Recebe o id.
  const alternar = useCallback(
    (id) => {
      if (!idPessoa) return;
      setPorPessoa((atual) => {
        const lista = atual[idPessoa] ?? [];
        const nova = lista.includes(id) ? lista.filter((item) => item !== id) : [...lista, id];
        const proximo = { ...atual, [idPessoa]: nova };
        salvarDado(chave, proximo);
        return proximo;
      });
    },
    [idPessoa, chave],
  );

  return { seguidos, segue, alternar, logado: Boolean(idPessoa) };
}
