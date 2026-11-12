import { useMemo, useState } from 'react';
import { ContextoSessao } from '../../contexto/ContextoSessao';
import { ContextoPedidos } from '../../contexto/ContextoPedidos';
import { ContextoVotos } from '../../contexto/ContextoVotos';
import { USUARIO } from '../../dados/usuario';
import { PEDIDOS } from '../../dados/pedidos';
import { ERRO_ENTRAR } from '../../logica/contas';
import { calcularResultado } from '../../logica/votacao';

// Aviso devolvido pelas ações que, no app de verdade, salvariam alguma coisa
const AVISO_SIMULADO = 'Página de componentes: nada foi salvo.';

// Sessão, pedidos e votos "de mentira" para mostrar um componente num estado escolhido
// (visitante, já apoiou, pedido encerrado, já votou...) sem mexer nos dados do app.
// Apoiar e votar só mudam o estado desta caixa; entrar sempre falha; nada vai para o navegador.
// Recebe: logado (padrão true, entra como a Maria), motivoApoio (null, "proprio", "encerrado"
// ou "ja-apoiou"), voto (opção já votada), recemAnalisados (ids) e children.
export default function ContextoSimulado({
  logado = true,
  motivoApoio = null,
  voto,
  recemAnalisados = [],
  children,
}) {
  const [apoiou, setApoiou] = useState(false);
  const [votoLocal, setVotoLocal] = useState(voto);

  const sessao = useMemo(
    () => ({
      usuario: logado ? USUARIO : null,
      logado,
      entrar: async () => ({ ok: false, erro: ERRO_ENTRAR }),
      entrarDemonstracao: () => {},
      criarConta: async () => ({ ok: false, erro: AVISO_SIMULADO }),
      emailEmUso: () => false,
      atualizarConta: () => ({ ok: true }),
      sair: () => {},
    }),
    [logado],
  );

  const pedidos = useMemo(
    () => ({
      pedidos: PEDIDOS,
      apoiados: [],
      recemAnalisados,
      apoiar: () => {
        setApoiou(true);
        return true;
      },
      explicarSemApoio: () => (apoiou ? 'ja-apoiou' : motivoApoio),
      adicionarPedido: () => null,
      avancarStatus: () => {},
    }),
    [apoiou, motivoApoio, recemAnalisados],
  );

  const votos = useMemo(
    () => ({
      votosDaPessoa: {},
      votoDe: () => votoLocal,
      explicarSemVoto: () => null,
      votar: (_idProjeto, opcao) => {
        setVotoLocal(opcao);
        return true;
      },
      // Soma o voto simulado ao resultado, como o app faz depois de votar
      resultado: (projeto) =>
        calcularResultado(projeto, votoLocal ? { simulado: { [projeto.id]: votoLocal } } : {}),
    }),
    [votoLocal],
  );

  return (
    <ContextoSessao.Provider value={sessao}>
      <ContextoPedidos.Provider value={pedidos}>
        <ContextoVotos.Provider value={votos}>{children}</ContextoVotos.Provider>
      </ContextoPedidos.Provider>
    </ContextoSessao.Provider>
  );
}
