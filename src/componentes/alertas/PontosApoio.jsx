import Botao from '../Botao';
import Icone from '../Icone';
import classes from './Alertas.module.css';

// Monta o link de rota do Google Maps até um endereço de São Paulo
function linkComoChegar(endereco) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${endereco}, São Paulo`)}`;
}

// Linhas dos pontos de apoio de um alerta (dentro de um SecaoCard), de borda a borda:
// ícone, nome, endereço · bairro e o botão "Como chegar" (no celular, só o ícone).
// Recebe os pontos [{ icone, nome, endereco, bairro }].
export default function PontosApoio({ pontos }) {
  return (
    <ul className={classes.linhas}>
      {pontos.map((ponto) => (
        <li key={ponto.nome} className={`${classes.linha} ${classes.linhaPonto}`}>
          <Icone nome={ponto.icone} tamanho={20} />
          <div className={classes.linhaTexto}>
            <p className={classes.linhaNome}>{ponto.nome}</p>
            <p className={classes.linhaDetalhe}>
              {ponto.endereco}
              <span className={classes.ponto} aria-hidden="true">
                ·
              </span>
              {ponto.bairro}
            </p>
          </div>
          <Botao
            variante="secundario"
            compacto
            icone="directions"
            href={linkComoChegar(ponto.endereco)}
            aria-label={`Como chegar a ${ponto.nome}`}
          >
            <span className={classes.comoChegarTexto}>Como chegar</span>
          </Botao>
        </li>
      ))}
    </ul>
  );
}
