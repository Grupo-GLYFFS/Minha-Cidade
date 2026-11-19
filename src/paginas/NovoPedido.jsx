import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import SecaoCard from '../componentes/SecaoCard';
import EtapaDescreva from '../componentes/novoPedido/EtapaDescreva';
import EtapaOnde from '../componentes/novoPedido/EtapaOnde';
import EtapaFotos from '../componentes/novoPedido/EtapaFotos';
import EtapaRevisar from '../componentes/novoPedido/EtapaRevisar';
import BarraEtapas from '../componentes/novoPedido/BarraEtapas';
import PedidoEnviado from '../componentes/novoPedido/PedidoEnviado';
import { usePedidos } from '../contexto/usePedidos';
import { useSessao } from '../contexto/useSessao';
import { useAvisoTemporario } from '../contexto/useAvisoTemporario';
import {
  ETAPAS_NOVO_PEDIDO,
  esquemaDescreva,
  esquemaOnde,
  validarEtapa,
} from '../logica/esquemaNovoPedido';
import { prepararDadosDoFormulario, valoresIniciaisComCategoria } from '../logica/novoPedido';
import { montarTitulo, sugerirCategoria } from '../logica/sugestaoPedido';
import { buscarDuplicado } from '../logica/duplicados';
import { buscarPedido } from '../logica/pedidos';
import { useRecorte } from '../contexto/useRecorte';
import {
  apagarRascunho,
  foiEnviadoNaAba,
  lerRascunho,
  marcarEnviadoNaAba,
  salvarRascunho,
} from '../logica/rascunhos';
import classes from '../componentes/novoPedido/NovoPedido.module.css';

// Esquema de validação de cada etapa (as Fotos são opcionais e conferidas na hora)
const ESQUEMAS = { 1: esquemaDescreva, 2: esquemaOnde };
// Tempo do "Enviando…" (no protótipo o pedido é salvo no aparelho)
const ESPERA_ENVIO_MS = 600;
// Nome do rascunho guardado na aba (recarregar a página não apaga o que já foi preenchido)
const RASCUNHO = 'novo-pedido';

// Abrir pedido (/pedidos/novo), em 4 etapas: Descreva o problema → Onde fica → Fotos → Revisar.
// A pessoa descreve primeiro; o app sugere a categoria, monta o título e estima a gravidade.
// A etapa fica no endereço (?etapa=2), então o voltar do navegador e os links "Alterar" funcionam.
// Pedido repetido (mesma categoria, bairro e rua de um aberto) não é criado.
// O que a pessoa preenche fica num rascunho da aba: recarregar volta à mesma etapa, preenchida.
// Depois de enviar, a página mostra "Pedido enviado" (só para pedido enviado nesta aba;
// outro ?enviado= leva ao detalhe do pedido). Voltar do navegador depois do envio sai do formulário.
export default function NovoPedido() {
  const { pedidos, adicionarPedido } = usePedidos();
  const mostrarAviso = useAvisoTemporario();
  const { usuario } = useSessao();
  const [parametros, setParametros] = useSearchParams();
  const local = useLocation();
  // Rascunho da aba (lido uma vez só, ao abrir a página)
  const [rascunho] = useState(() => lerRascunho(RASCUNHO));
  const [valores, setValores] = useState(() => {
    const iniciais = valoresIniciaisComCategoria(parametros.get('categoria'));
    if (!rascunho?.valores) return iniciais;
    return { ...iniciais, ...rascunho.valores, fotos: [] };
  });
  const [erros, setErros] = useState({});
  const [listaAberta, setListaAberta] = useState(false);
  const [categoriaEscolhida, setCategoriaEscolhida] = useState(
    rascunho?.categoriaEscolhida ?? Boolean(valores.categoria),
  );
  const [tituloEditado, setTituloEditado] = useState(rascunho?.tituloEditado ?? false);
  const [enviando, setEnviando] = useState(false);
  // Pedido que acabou de ser criado aqui e o endereço em que ele foi enviado. Fica guardado
  // na tela porque a lista de pedidos e o endereço (?enviado=) não se atualizam juntos: sem ele,
  // o pedido novo aparecia como "repetido" por um instante e a página voltava para a etapa 2.
  const [recemCriado, setRecemCriado] = useState(null);
  // Trava do envio: um segundo clique antes de a tela se atualizar não cria outro pedido
  const travaEnvio = useRef(false);
  const cartao = useRef(null);
  const fotosAtuais = useRef(valores.fotos);

  const etapa = Math.min(4, Math.max(1, Number(parametros.get('etapa')) || 1));
  // Aberto por Pedidos do bairro (?de=bairro): a trilha é a do bairro, em todas as etapas
  const doBairro = parametros.get('de') === 'bairro';
  const recorteBairro = useRecorte('bairro');
  // Junta o ?de=bairro aos outros parâmetros do endereço. Recebe um objeto; devolve outro.
  const comOrigem = (outros) => (doBairro ? { ...outros, de: 'bairro' } : outros);
  const repetido =
    valores.rua.trim().length >= 3 && valores.bairro.trim()
      ? buscarDuplicado(valores, pedidos)
      : undefined;

  // Última etapa que a pessoa pode abrir: a primeira que ainda tem erro (ou um repetido)
  let liberada = 4;
  if (Object.keys(validarEtapa(esquemaOnde, valores)).length > 0 || repetido) liberada = 2;
  if (Object.keys(validarEtapa(esquemaDescreva, valores)).length > 0) liberada = 1;

  // Ao trocar de etapa, a tela volta ao topo e o foco vai para o cartão da etapa
  const primeiraVez = useRef(true);
  useEffect(() => {
    if (primeiraVez.current) {
      primeiraVez.current = false;
      return;
    }
    window.scrollTo(0, 0);
    cartao.current?.focus();
  }, [etapa]);

  // Guarda o rascunho a cada mudança (depois do envio, ele já foi apagado)
  useEffect(() => {
    if (recemCriado) return;
    salvarRascunho(RASCUNHO, { valores, categoriaEscolhida, tituloEditado });
  }, [valores, categoriaEscolhida, tituloEditado, recemCriado]);

  // Ao sair da página, libera a memória das miniaturas das fotos
  useEffect(() => {
    fotosAtuais.current = valores.fotos;
  }, [valores.fotos]);
  useEffect(() => () => fotosAtuais.current.forEach((foto) => URL.revokeObjectURL(foto.url)), []);

  // Muda um campo. A descrição também atualiza a categoria sugerida e o título,
  // enquanto a pessoa não escolheu a categoria nem editou o título.
  function mudar(campo, valor) {
    setValores((atual) => {
      const novo = { ...atual, [campo]: valor };
      if (campo === 'descricao') {
        if (!categoriaEscolhida) novo.categoria = sugerirCategoria(valor);
        if (!tituloEditado) novo.titulo = montarTitulo(valor);
      }
      return novo;
    });
    // A categoria vem da descrição: mudar a descrição também tira o erro da categoria
    setErros((atual) => ({
      ...atual,
      [campo]: undefined,
      ...(campo === 'descricao' && { categoria: undefined }),
    }));
  }

  // Muda vários campos de uma vez (ex.: rua e bairro vindos do CEP).
  // Os campos que chegaram preenchidos saem do resumo de erros e perdem o aviso.
  function mudarVarios(campos) {
    setValores((atual) => ({ ...atual, ...campos }));
    const corrigidos = Object.keys(campos).filter((campo) => campos[campo]);
    if (corrigidos.length === 0) return;
    setErros((atual) => {
      const novo = { ...atual };
      corrigidos.forEach((campo) => delete novo[campo]);
      return novo;
    });
  }

  function escolherCategoria(id) {
    setCategoriaEscolhida(true);
    setListaAberta(false);
    mudar('categoria', id);
  }

  // Vai para uma etapa (Voltar, Alterar). Com abrirLista, já abre "Trocar categoria".
  function irPara(numero, { abrirLista = false } = {}) {
    setErros({});
    if (abrirLista) setListaAberta(true);
    setParametros(comOrigem(numero === 1 ? {} : { etapa: String(numero) }));
  }

  // Botão de avançar: confere a etapa e segue, ou envia na última
  function aoEnviar(evento) {
    evento.preventDefault();
    if (enviando || travaEnvio.current) return;
    const problemas = ESQUEMAS[etapa] ? validarEtapa(ESQUEMAS[etapa], valores) : {};
    // Sem descrição boa não há sugestão: o erro da categoria só aparece depois
    if (problemas.descricao) delete problemas.categoria;
    setErros(problemas);
    if (Object.keys(problemas).length > 0) return;
    if (etapa === 2 && repetido) {
      document.getElementById('aviso-repetido')?.focus();
      return;
    }
    if (etapa < 4) {
      irPara(etapa + 1);
      return;
    }
    // Um pedido igual ao que já existe (ou ao recém-criado) não é criado de novo
    if (repetido) {
      irPara(2);
      return;
    }
    travaEnvio.current = true;
    setEnviando(true);
    setTimeout(() => {
      const novo = adicionarPedido(prepararDadosDoFormulario(valores));
      apagarRascunho(RASCUNHO);
      marcarEnviadoNaAba(novo.id);
      setRecemCriado({ pedido: novo, chave: local.key });
      // O pedido enviado fica no endereço: recarregar a página continua mostrando a confirmação
      setParametros({ enviado: novo.id }, { replace: true });
      setEnviando(false);
      travaEnvio.current = false;
      window.scrollTo(0, 0);
      mostrarAviso('Pedido enviado.', `/minha-cidade/pedidos/${novo.id}`);
    }, ESPERA_ENVIO_MS);
  }

  // "Pedido enviado" tem prioridade sobre a checagem de repetido e de etapas.
  // Vale o pedido do endereço ou, enquanto o endereço não muda, o que acabou de ser criado.
  const criadoAqui = recemCriado?.chave === local.key ? recemCriado.pedido : null;
  const idEnviado = parametros.get('enviado') ?? criadoAqui?.id;
  const enviado =
    idEnviado &&
    (buscarPedido(pedidos, idEnviado) ??
      (recemCriado?.pedido.id === idEnviado ? recemCriado.pedido : null));
  // "Pedido enviado" só para o pedido enviado nesta aba; outro ?enviado= abre o detalhe
  const daAba = criadoAqui?.id === idEnviado || (idEnviado && foiEnviadoNaAba(idEnviado));
  if (idEnviado && !daAba) return <Navigate to={`/pedidos/${idEnviado}`} replace />;
  if (enviado && enviado.autorId === usuario?.id) return <PedidoEnviado pedido={enviado} />;
  // Voltar do navegador depois do envio: sai do formulário e abre o pedido enviado
  if (recemCriado && !idEnviado) {
    return <Navigate to={`/pedidos/${recemCriado.pedido.id}`} replace />;
  }
  if (etapa > liberada) {
    return (
      <Navigate
        to={`/pedidos/novo?${new URLSearchParams(comOrigem(liberada === 1 ? {} : { etapa: String(liberada) }))}`}
        replace
      />
    );
  }

  const nomeEtapa = ETAPAS_NOVO_PEDIDO[etapa - 1];

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="formulario"
          titulo="Abrir pedido"
          trilha={[
            ...(doBairro
              ? [...recorteBairro.trilha, { rotulo: 'Pedidos', para: '/meu-bairro/pedidos' }]
              : [
                  { rotulo: 'Cidade de São Paulo', para: '/minha-cidade' },
                  { rotulo: 'Pedidos', para: '/minha-cidade/pedidos' },
                ]),
            { rotulo: 'Abrir pedido' },
          ]}
          etapas={ETAPAS_NOVO_PEDIDO}
          etapaAtual={etapa}
        />
      }
    >
      <form className={classes.formulario} noValidate onSubmit={aoEnviar}>
        <div className={classes.cartao} ref={cartao} tabIndex={-1}>
          <SecaoCard titulo={nomeEtapa}>
            {etapa === 1 && (
              <EtapaDescreva
                valores={valores}
                erros={erros}
                mudar={mudar}
                escolherCategoria={escolherCategoria}
                listaAberta={listaAberta}
                aoAbrirLista={setListaAberta}
              />
            )}
            {etapa === 2 && (
              <EtapaOnde
                valores={valores}
                erros={erros}
                mudar={mudar}
                mudarVarios={mudarVarios}
                repetido={repetido}
                repetidoEhSeu={Boolean(repetido && repetido.autorId === usuario?.id)}
                aoEditar={() => irPara(1)}
              />
            )}
            {etapa === 3 && (
              <EtapaFotos fotos={valores.fotos} aoMudar={(fotos) => mudarVarios({ fotos })} />
            )}
            {etapa === 4 && (
              <EtapaRevisar
                valores={valores}
                irPara={irPara}
                aoMudarTitulo={(titulo) => {
                  setTituloEditado(true);
                  mudarVarios({ titulo });
                }}
              />
            )}
          </SecaoCard>
        </div>
        <BarraEtapas
          nome={nomeEtapa}
          etapa={etapa}
          total={ETAPAS_NOVO_PEDIDO.length}
          aoVoltar={() => irPara(etapa - 1)}
          enviando={enviando}
        />
      </form>
    </Pagina>
  );
}
