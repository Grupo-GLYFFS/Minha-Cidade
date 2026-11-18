import SeloSituacao from '../SeloSituacao';
import VitrineExemplo from './VitrineExemplo';
import VitrineSecao from './VitrineSecao';
import { VITRINE_CORES } from '../../dados/vitrineCores';
import classes from './Vitrine.module.css';

// Raios da base: [classe, rótulo]
const RAIOS = [
  ['raio20', '20 · cards e popups'],
  ['raio16', '16 · ícone do cabeçalho'],
  ['raio12', '12 · botões e campos'],
  ['raio8', '8 · botões do topo'],
  ['raio999', '999 · selos'],
];

// Seção de tokens da /componentes: cores, as 5 cores de status e os raios.
// Use sempre as variáveis (--cor-*, --raio-*) nos CSS Modules, nunca o hex.
export default function VitrineTokens() {
  return (
    <VitrineSecao id="tokens" titulo="Tokens" arquivo="src/estilos/global.css · src/tema.js">
      <VitrineExemplo rotulo="Cores (variáveis --cor-*)">
        <div className={classes.amostras}>
          {VITRINE_CORES.map((cor) => (
            <div key={cor.variavel} className={classes.amostra}>
              <div className={`${classes.amostraCor} ${classes[cor.classe]}`} />
              <div className={classes.amostraTexto}>
                <b>{cor.variavel}</b>
                {cor.valor} · {cor.uso}
              </div>
            </div>
          ))}
        </div>
      </VitrineExemplo>

      <VitrineExemplo rotulo="5 cores de status (SeloSituacao)" linha>
        <SeloSituacao cor="cinza">Recebido</SeloSituacao>
        <SeloSituacao cor="azul">Em andamento</SeloSituacao>
        <SeloSituacao cor="ambar">Em análise</SeloSituacao>
        <SeloSituacao cor="verde">Concluída</SeloSituacao>
        <SeloSituacao cor="vermelho">Recusada</SeloSituacao>
      </VitrineExemplo>

      <VitrineExemplo
        rotulo="Raios (--raio-card, --raio-icone, --raio-controle, --raio-topo, --raio-selo)"
        linha
      >
        {RAIOS.map(([classe, rotulo]) => (
          <div key={classe} className={`${classes.raio} ${classes[classe]}`}>
            {rotulo}
          </div>
        ))}
      </VitrineExemplo>

      <VitrineExemplo rotulo="Medidas">
        <p>
          Botões 48 (compacto 44, topo 32) · campos 44 · coluna de conteúdo 880 · topo e rodapé 1088
          · fonte Plus Jakarta Sans · alto contraste pelo botão do topo.
        </p>
      </VitrineExemplo>
    </VitrineSecao>
  );
}
