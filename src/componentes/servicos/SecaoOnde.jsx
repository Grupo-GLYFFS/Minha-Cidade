import SecaoCard from '../SecaoCard';
import Botao from '../Botao';
import Icone from '../Icone';
import { linkComoChegar } from '../../logica/solicitacoes';
import classes from './SecaoOnde.module.css';

// Seção "Onde" do detalhe: o mapa, o nome e o endereço do local e, nos agendamentos,
// o botão "Como chegar" (abre o mapa em outra aba).
// Recebe o local ({ nome, endereco, complemento }) e comoChegar (true para mostrar o botão).
export default function SecaoOnde({ local, comoChegar = false }) {
  const endereco = [local.endereco, local.complemento].filter(Boolean).join(' · ');

  return (
    <SecaoCard titulo="Onde">
      {/* TODO: trocar pelo mapa de verdade quando o app tiver mapas */}
      <div className={classes.mapa} role="img" aria-label={`Mapa de ${local.nome}`}>
        <Icone nome="map" tamanho={32} />
      </div>
      <p className={classes.nome}>{local.nome}</p>
      {endereco && <p className={classes.endereco}>{endereco}</p>}
      {comoChegar && (
        <div className={classes.acao}>
          <Botao
            variante="secundario"
            compacto
            icone="directions"
            href={linkComoChegar(local)}
            target="_blank"
            rel="noreferrer"
          >
            Como chegar<span className={classes.oculto}> a {local.nome} (abre o mapa)</span>
          </Botao>
        </div>
      )}
    </SecaoCard>
  );
}
