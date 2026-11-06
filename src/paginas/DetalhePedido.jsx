import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Stack } from '@mantine/core';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import CabecalhoDetalhe from '../componentes/pedidos/CabecalhoDetalhe';
import SobrePedido from '../componentes/pedidos/SobrePedido';
import BlocoApoio from '../componentes/pedidos/BlocoApoio';
import CartaoPrioridade from '../componentes/pedidos/CartaoPrioridade';
import LinhaDoTempoPedido from '../componentes/pedidos/LinhaDoTempoPedido';
import AvisoEmAnalise from '../componentes/novoPedido/AvisoEmAnalise';
import Icone from '../componentes/Icone';
import { usePedidos } from '../contexto/usePedidos';
import { buscarPedido } from '../logica/pedidos';
import classes from './DetalhePedido.module.css';

// Página de um pedido: dados completos, linha do tempo, apoio e prioridade.
// O id vem do endereço (/pedidos/p-001). Se o pedido não existir, oferece a volta para a lista.
// Quando a pessoa chega depois de apoiar (vinda do aviso de pedido repetido), mostra a confirmação.
export default function DetalhePedido() {
  const { id } = useParams();
  const { pedidos } = usePedidos();
  const pedido = buscarPedido(pedidos, id);
  const local = useLocation();
  const navigate = useNavigate();
  const acabouDeApoiar = local.state?.aviso === 'apoiou';

  // Ao abrir um pedido vindo do meio da lista, começa a página do topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!pedido) {
    return (
      <Stack gap="md" align="flex-start">
        <CabecalhoPagina
          titulo="Pedido não encontrado"
          descricao="O link pode estar errado ou o pedido foi removido. Veja a lista com todos os pedidos."
        />
        <Button component={Link} to="/pedidos">
          Voltar para pedidos
        </Button>
      </Stack>
    );
  }

  return (
    <Stack gap="lg">
      <CabecalhoDetalhe pedido={pedido} />

      {acabouDeApoiar && (
        <Alert
          role="status"
          color="green"
          variant="light"
          radius="md"
          title="Você apoiou este pedido"
          icon={<Icone nome="check_circle" tamanho={20} preenchido />}
          withCloseButton
          closeButtonLabel="Fechar aviso"
          // Fechar apaga o aviso do histórico, para ele não voltar ao recarregar
          onClose={() => navigate(local.pathname, { replace: true, state: null })}
        >
          Obrigado! Em vez de um pedido repetido, o seu apoio subiu a prioridade deste.
        </Alert>
      )}
      <AvisoEmAnalise pedido={pedido} />

      {/* Celular: tudo empilhado. Computador: conteúdo à esquerda, apoio e prioridade à direita */}
      <div className={classes.grade}>
        <div className={classes.sobre}>
          <SobrePedido pedido={pedido} />
        </div>
        <div className={classes.lateral}>
          <BlocoApoio pedido={pedido} />
          <CartaoPrioridade pedido={pedido} />
        </div>
        <div className={classes.andamento}>
          <LinhaDoTempoPedido pedido={pedido} />
        </div>
      </div>
    </Stack>
  );
}
