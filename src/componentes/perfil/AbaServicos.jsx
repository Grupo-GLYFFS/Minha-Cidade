import { SimpleGrid } from '@mantine/core';
import CartaoSolicitacao from './CartaoSolicitacao';
import EstadoVazio from '../EstadoVazio';
import classes from './AbaPedidos.module.css';

// Conteúdo da aba "Serviços solicitados": um cartão por solicitação, da mais recente para a mais antiga.
// Recebe as solicitações já ordenadas. Sem nenhuma, convida a ver o catálogo de serviços.
export default function AbaServicos({ solicitacoes }) {
  if (solicitacoes.length === 0) {
    return (
      <EstadoVazio
        texto="Você ainda não solicitou serviços."
        rotuloBotao="Ver serviços"
        caminho="/servicos"
        icone="apps"
      />
    );
  }

  return (
    <SimpleGrid component="ul" cols={{ base: 1, md: 2 }} spacing="md" className={classes.lista}>
      {solicitacoes.map((solicitacao) => (
        <li key={solicitacao.id}>
          <CartaoSolicitacao solicitacao={solicitacao} />
        </li>
      ))}
    </SimpleGrid>
  );
}
