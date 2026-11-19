import GrupoPedidos from './GrupoPedidos';
import EstadoCarregando from '../EstadoCarregando';
import EstadoErro from '../EstadoErro';
import { agruparPorSituacao } from '../../logica/gruposPedidos';
import classes from './ListaPedidos.module.css';

// Lista de pedidos agrupada por situação (Em execução, Aprovados, Em análise, Enviados,
// Encerrados), com os mais recentes primeiro em cada grupo.
// Recebe:
// - pedidos: a lista já recortada (cidade, bairro, da pessoa…);
// - estado: "pronto" | "carregando" | "erro" (vem de useCarregamentoSimulado);
// - aoTentarDeNovo: chamada pelo botão do erro;
// - vazio: o <EstadoVazio> mostrado quando não há pedidos;
// - prefixo: base dos ids dos títulos dos grupos;
// - limite: quantos pedidos cada grupo mostra antes do "Mostrar mais" (null mostra todos).
export default function ListaPedidos({
  pedidos,
  estado = 'pronto',
  aoTentarDeNovo,
  vazio,
  prefixo,
  limite,
}) {
  if (estado === 'carregando') return <EstadoCarregando texto="Carregando os pedidos…" />;
  if (estado === 'erro') {
    return (
      <EstadoErro
        titulo="Não conseguimos carregar os pedidos agora"
        aoTentarDeNovo={aoTentarDeNovo}
      />
    );
  }
  if (pedidos.length === 0) return vazio;

  return (
    <div className={classes.grupos}>
      {agruparPorSituacao(pedidos).map((grupo) => (
        <GrupoPedidos key={grupo.id} grupo={grupo} prefixo={prefixo} limite={limite} />
      ))}
    </div>
  );
}
