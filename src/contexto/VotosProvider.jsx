import { useCallback, useEffect, useMemo, useState } from 'react';
import { ContextoVotos } from './ContextoVotos';
import { lerDado, salvarDado } from '../armazenamento';
import { useSessao } from './useSessao';
import { PROJETOS } from '../dados/projetos';
import { buscarProjeto, calcularResultado, ehOpcaoValida, motivoSemVoto } from '../logica/votacao';

// Nome com que os votos ficam guardados no navegador, no formato { idPessoa: { idProjeto: opcao } }
const CHAVE_VOTOS = 'votos-projetos';

// Guarda os votos nos grandes projetos da Cidade Aberta, separados por pessoa.
// Cada pessoa vota uma vez só em cada projeto e não troca o voto depois.
// O resultado soma os votos de exemplo com todos os votos feitos neste aparelho.
// Precisa estar dentro do SessaoProvider.
// Recebe as telas do app (children), que leem os dados com useVotos().
export default function VotosProvider({ children }) {
  const { usuario } = useSessao();
  const idPessoa = usuario?.id ?? null;
  const [votosPorPessoa, setVotosPorPessoa] = useState(() => lerDado(CHAVE_VOTOS, {}));

  // Salva sempre que muda (só depois do primeiro voto, para não criar a chave à toa)
  useEffect(() => {
    if (Object.keys(votosPorPessoa).length > 0) salvarDado(CHAVE_VOTOS, votosPorPessoa);
  }, [votosPorPessoa]);

  // Votos da pessoa logada, no formato { idProjeto: opcao } (vazio para visitante)
  const votosDaPessoa = useMemo(
    () => (idPessoa ? (votosPorPessoa[idPessoa] ?? {}) : {}),
    [votosPorPessoa, idPessoa],
  );

  // Diz o voto da pessoa logada em um projeto. Recebe o id; devolve "sim", "nao", "abstencao" ou undefined.
  const votoDe = useCallback((idProjeto) => votosDaPessoa[idProjeto], [votosDaPessoa]);

  // Diz por que a pessoa não pode votar no projeto (ou null se pode). Recebe o projeto.
  const explicarSemVoto = useCallback(
    (projeto) => motivoSemVoto(projeto, votosDaPessoa[projeto.id], Boolean(idPessoa)),
    [votosDaPessoa, idPessoa],
  );

  // Registra o voto da pessoa logada. Recebe o id do projeto e a opção escolhida;
  // devolve true se o voto entrou ou false se não era permitido (visitante, encerrada ou já votou).
  const votar = useCallback(
    (idProjeto, opcao) => {
      const projeto = buscarProjeto(PROJETOS, idProjeto);
      if (!projeto || !ehOpcaoValida(opcao) || explicarSemVoto(projeto) !== null) return false;
      setVotosPorPessoa((atual) => {
        const daPessoa = atual[idPessoa] ?? {};
        // Segunda proteção: o primeiro voto nunca é trocado
        if (daPessoa[idProjeto]) return atual;
        return { ...atual, [idPessoa]: { ...daPessoa, [idProjeto]: opcao } };
      });
      return true;
    },
    [explicarSemVoto, idPessoa],
  );

  // Resultado atual de um projeto, já com os votos feitos neste aparelho. Recebe o projeto.
  const resultado = useCallback(
    (projeto) => calcularResultado(projeto, votosPorPessoa),
    [votosPorPessoa],
  );

  const valor = useMemo(
    () => ({ votosDaPessoa, votoDe, explicarSemVoto, votar, resultado }),
    [votosDaPessoa, votoDe, explicarSemVoto, votar, resultado],
  );

  return <ContextoVotos.Provider value={valor}>{children}</ContextoVotos.Provider>;
}
