import { useCallback, useEffect, useMemo, useState } from 'react';
import { ContextoPedidos } from './ContextoPedidos';
import { PEDIDOS } from '../dados/pedidos';
import { USUARIO } from '../dados/usuario';
import { lerDado, salvarDado } from '../armazenamento';
import { useSessao } from './useSessao';
import { aplicarApoios, juntarApoios, motivoSemApoio } from '../logica/apoios';
import { aplicarMudancasStatus, buscarPedido } from '../logica/pedidos';
import { montarNovoPedido } from '../logica/novoPedido';
import { momentoDeHoje } from '../logica/datas';
import { pedidosEsperandoAnalise, tempoAteAnalise } from '../logica/analiseSimulada';

// Nomes com que cada dado fica guardado no navegador
const CHAVE_CRIADOS = 'pedidos-criados';
const CHAVE_APOIADOS = 'pedidos-apoiados';
const CHAVE_MUDANCAS = 'pedidos-mudancas-status';

// Lê os apoios salvos no formato { idPessoa: [ids] }.
// Versões antigas guardavam só a lista da Maria; nesse caso a lista passa a ser dela.
function lerApoiosPorPessoa() {
  const salvo = lerDado(CHAVE_APOIADOS, {});
  return Array.isArray(salvo) ? { [USUARIO.id]: salvo } : salvo;
}

// Guarda os pedidos do app inteiro: os de exemplo, os que as pessoas abriram e os apoios.
// Pedidos e apoios ficam ligados à pessoa logada (useSessao); visitante só vê.
// Tudo que muda fica salvo no navegador e continua lá depois de recarregar a página.
// Recebe as telas do app (children), que leem os dados com usePedidos().
export default function PedidosProvider({ children }) {
  const { usuario } = useSessao();
  const idPessoa = usuario?.id ?? null;
  const [criados, setCriados] = useState(() => lerDado(CHAVE_CRIADOS, []));
  const [apoiosPorPessoa, setApoiosPorPessoa] = useState(lerApoiosPorPessoa);
  const [mudancas, setMudancas] = useState(() => lerDado(CHAVE_MUDANCAS, {}));
  // Pedidos que entraram em análise nesta visita (para mostrar o aviso); não fica salvo
  const [recemAnalisados, setRecemAnalisados] = useState([]);

  // Salva cada dado sempre que ele muda
  useEffect(() => {
    salvarDado(CHAVE_CRIADOS, criados);
  }, [criados]);
  useEffect(() => {
    salvarDado(CHAVE_APOIADOS, apoiosPorPessoa);
  }, [apoiosPorPessoa]);

  // Pedidos que a pessoa logada já apoiou (lista vazia para visitante)
  const apoiados = useMemo(
    () => (idPessoa ? (apoiosPorPessoa[idPessoa] ?? []) : []),
    [apoiosPorPessoa, idPessoa],
  );
  useEffect(() => {
    salvarDado(CHAVE_MUDANCAS, mudancas);
  }, [mudancas]);

  // Lista final: exemplos + pedidos abertos aqui, com status atualizados e apoios de todos somados
  const pedidos = useMemo(
    () =>
      aplicarApoios(
        aplicarMudancasStatus([...PEDIDOS, ...criados], mudancas),
        juntarApoios(apoiosPorPessoa),
      ),
    [criados, mudancas, apoiosPorPessoa],
  );

  // Muda o status de um pedido (ex.: simular a prefeitura passando de "enviada" para "em análise").
  // Recebe o id do pedido e o id do novo status.
  const avancarStatus = useCallback((idPedido, novoStatus) => {
    setMudancas((atual) => ({
      ...atual,
      [idPedido]: { status: novoStatus, atualizadoEm: momentoDeHoje() },
    }));
  }, []);

  // Análise simulada: alguns segundos depois do envio, o pedido da pessoa vai para "em análise".
  // Fica aqui (e não na tela) para continuar contando se a pessoa mudar de página.
  // Depois de recarregar, o que já passou da hora muda na mesma hora (espera 0).
  useEffect(() => {
    if (!idPessoa) return undefined;
    const relogios = pedidosEsperandoAnalise(pedidos, idPessoa).map((pedido) =>
      setTimeout(() => {
        avancarStatus(pedido.id, 'em-analise');
        setRecemAnalisados((atual) => [...atual, pedido.id]);
      }, tempoAteAnalise(pedido)),
    );
    return () => relogios.forEach(clearTimeout);
  }, [pedidos, avancarStatus, idPessoa]);

  // Diz por que a pessoa não pode apoiar o pedido (ou null se pode)
  const explicarSemApoio = useCallback(
    (pedido) => motivoSemApoio(pedido, apoiados, idPessoa),
    [apoiados, idPessoa],
  );

  // Soma o apoio da pessoa logada a um pedido, uma vez só.
  // Recebe o id do pedido; devolve true se o apoio entrou ou false se não era permitido.
  const apoiar = useCallback(
    (idPedido) => {
      const pedido = buscarPedido(pedidos, idPedido);
      if (!idPessoa || !pedido || explicarSemApoio(pedido) !== null) return false;
      setApoiosPorPessoa((atual) => {
        const daPessoa = atual[idPessoa] ?? [];
        if (daPessoa.includes(idPedido)) return atual;
        return { ...atual, [idPessoa]: [...daPessoa, idPedido] };
      });
      return true;
    },
    [pedidos, explicarSemApoio, idPessoa],
  );

  // Salva um pedido aberto pela pessoa logada (a tela de novo pedido só abre para quem entrou).
  // Recebe os dados do formulário; devolve o pedido completo (com id, protocolo e datas).
  const adicionarPedido = useCallback(
    (dados) => {
      const novo = montarNovoPedido(dados, pedidos, idPessoa);
      setCriados((atual) => [...atual, novo]);
      return novo;
    },
    [pedidos, idPessoa],
  );

  const valor = useMemo(
    () => ({
      pedidos,
      apoiados,
      recemAnalisados,
      apoiar,
      explicarSemApoio,
      adicionarPedido,
      avancarStatus,
    }),
    [pedidos, apoiados, recemAnalisados, apoiar, explicarSemApoio, adicionarPedido, avancarStatus],
  );

  return <ContextoPedidos.Provider value={valor}>{children}</ContextoPedidos.Provider>;
}
