import { useCallback, useEffect, useMemo, useState } from 'react';
import { ContextoPedidos } from './ContextoPedidos';
import { PEDIDOS } from '../dados/pedidos';
import { PEDIDOS_ACOMPANHADOS } from '../dados/pedidosAcompanhados';
import { ehListaDeRegistros, ehMapaDeObjetos, lerDado, salvarDado } from '../armazenamento';
import { useSessao } from './useSessao';
import { motivoSemApoio } from '../logica/apoios';
import {
  acompanhamentosIniciais,
  alternarNaLista,
  aplicarAcompanhamentos,
  motivoSemAcompanhar,
} from '../logica/acompanhamento';
import { aplicarMudancasStatus, buscarPedido } from '../logica/pedidos';
import { montarNovoPedido } from '../logica/novoPedido';
import { momentoDeHoje } from '../logica/datas';
import { pedidosEsperandoAnalise, tempoAteAnalise } from '../logica/analiseSimulada';

// Nomes com que cada dado fica guardado no navegador
const CHAVE_CRIADOS = 'pedidos-criados';
const CHAVE_ACOMPANHADOS = 'pedidos-acompanhados';
const CHAVE_MUDANCAS = 'pedidos-mudancas-status';

// Confere o formato dos acompanhamentos salvos: { idPessoa: { apoia: [ids], segue: [ids] } }.
function acompanhamentosValidos(valor) {
  return (
    ehMapaDeObjetos(valor) &&
    Object.values(valor).every(
      (daPessoa) =>
        (daPessoa.apoia === undefined || Array.isArray(daPessoa.apoia)) &&
        (daPessoa.segue === undefined || Array.isArray(daPessoa.segue)),
    )
  );
}

// Lista vazia usada para visitante (fica fora do componente para não mudar a cada tela)
const NENHUM = [];

// Guarda os pedidos do app inteiro: os de exemplo, os que as pessoas abriram,
// os apoios e os pedidos que cada pessoa segue.
// Pedidos, apoios e seguidos ficam ligados à pessoa logada (useSessao); visitante só vê.
// Tudo que muda fica salvo no navegador e continua lá depois de recarregar a página.
// Recebe as telas do app (children), que leem os dados com usePedidos().
export default function PedidosProvider({ children }) {
  const { usuario } = useSessao();
  const idPessoa = usuario?.id ?? null;
  // Cada leitura confere o formato: dado mexido à mão volta ao padrão (sem tela branca)
  const [criados, setCriados] = useState(() => lerDado(CHAVE_CRIADOS, [], ehListaDeRegistros));
  const [acompanhamentos, setAcompanhamentos] = useState(() =>
    lerDado(
      CHAVE_ACOMPANHADOS,
      acompanhamentosIniciais(PEDIDOS_ACOMPANHADOS),
      acompanhamentosValidos,
    ),
  );
  const [mudancas, setMudancas] = useState(() => lerDado(CHAVE_MUDANCAS, {}, ehMapaDeObjetos));
  // Pedidos que entraram em análise nesta visita (para mostrar o aviso); não fica salvo
  const [recemAnalisados, setRecemAnalisados] = useState([]);

  // Salva cada dado sempre que ele muda
  useEffect(() => {
    salvarDado(CHAVE_CRIADOS, criados);
  }, [criados]);
  useEffect(() => {
    salvarDado(CHAVE_ACOMPANHADOS, acompanhamentos);
  }, [acompanhamentos]);
  useEffect(() => {
    salvarDado(CHAVE_MUDANCAS, mudancas);
  }, [mudancas]);

  // Pedidos que a pessoa logada apoia e segue (listas vazias para visitante)
  const apoiados = (idPessoa && acompanhamentos[idPessoa]?.apoia) || NENHUM;
  const seguidos = (idPessoa && acompanhamentos[idPessoa]?.segue) || NENHUM;

  // Lista final: exemplos + pedidos abertos aqui, com status atualizados e apoios recalculados
  const pedidos = useMemo(
    () =>
      aplicarAcompanhamentos(
        aplicarMudancasStatus([...PEDIDOS, ...criados], mudancas),
        acompanhamentos,
        PEDIDOS_ACOMPANHADOS,
      ),
    [criados, mudancas, acompanhamentos],
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

  // Liga ou desliga uma lista ("apoia" ou "segue") da pessoa logada para um pedido.
  // Recebe a lista e o id do pedido; devolve true se mudou ou false se não era permitido
  // (visitante, pedido da própria pessoa ou pedido encerrado).
  const alternar = useCallback(
    (lista, idPedido) => {
      const pedido = buscarPedido(pedidos, idPedido);
      if (!idPessoa || !pedido || motivoSemAcompanhar(pedido, idPessoa) !== null) return false;
      setAcompanhamentos((atual) => {
        const daPessoa = atual[idPessoa] ?? { apoia: [], segue: [] };
        return {
          ...atual,
          [idPessoa]: { ...daPessoa, [lista]: alternarNaLista(daPessoa[lista] ?? [], idPedido) },
        };
      });
      return true;
    },
    [pedidos, idPessoa],
  );

  // Apoiar/Apoiado e Seguir/Seguindo: ligam e desligam. Recebem o id do pedido.
  const alternarApoio = useCallback((idPedido) => alternar('apoia', idPedido), [alternar]);
  const alternarSeguir = useCallback((idPedido) => alternar('segue', idPedido), [alternar]);

  // Soma o apoio da pessoa logada a um pedido, uma vez só (usado fora do detalhe).
  // Recebe o id do pedido; devolve true se o apoio entrou ou false se não era permitido.
  const apoiar = useCallback(
    (idPedido) => !apoiados.includes(idPedido) && alternarApoio(idPedido),
    [apoiados, alternarApoio],
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
      seguidos,
      recemAnalisados,
      apoiar,
      alternarApoio,
      alternarSeguir,
      explicarSemApoio,
      adicionarPedido,
      avancarStatus,
    }),
    [
      pedidos,
      apoiados,
      seguidos,
      recemAnalisados,
      apoiar,
      alternarApoio,
      alternarSeguir,
      explicarSemApoio,
      adicionarPedido,
      avancarStatus,
    ],
  );

  return <ContextoPedidos.Provider value={valor}>{children}</ContextoPedidos.Provider>;
}
