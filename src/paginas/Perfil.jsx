import { Button } from '@mantine/core';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import CartaoPerfil from '../componentes/perfil/CartaoPerfil';
import GrupoOpcoesPerfil from '../componentes/perfil/GrupoOpcoesPerfil';
import Icone from '../componentes/Icone';
import { useSessao } from '../contexto/useSessao';
import { usePedidos } from '../contexto/usePedidos';
import { useSolicitacoes } from '../contexto/useSolicitacoes';
import { useSair } from '../contexto/useSair';
import { pedidosAbertosDaPessoa } from '../logica/pedidos';
import { GRUPOS_PERFIL } from '../dados/opcoesPerfil';
import classes from './Perfil.module.css';

// Perfil: cartão com os dados da pessoa e o resumo, a lista de opções em grupos
// (Minha conta, Ajuda, Sobre o app) e o botão "Sair da conta".
// No celular, esta aba é o único caminho até essas páginas e o único jeito de sair.
// No computador: cartão à esquerda e lista à direita.
export default function Perfil() {
  const { usuario } = useSessao();
  const { pedidos, apoiados } = usePedidos();
  const { solicitacoes } = useSolicitacoes();
  const sairDaConta = useSair();

  const resumo = {
    pedidosAbertos: pedidosAbertosDaPessoa(pedidos, usuario.id).length,
    servicos: solicitacoes.length,
    apoios: apoiados.length,
  };

  return (
    <div className={classes.pagina}>
      <CabecalhoPagina titulo="Perfil" />

      <div className={classes.grade}>
        <div className={classes.lateral}>
          <CartaoPerfil usuario={usuario} resumo={resumo} />
        </div>

        <div className={classes.opcoes}>
          {GRUPOS_PERFIL.map((grupo) => (
            <GrupoOpcoesPerfil key={grupo.id} grupo={grupo} />
          ))}

          <Button
            variant="default"
            h={48}
            onClick={sairDaConta}
            leftSection={<Icone nome="logout" tamanho={20} />}
            className={classes.sair}
          >
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  );
}
