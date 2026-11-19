import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import Botao from '../Botao';
import Icone from '../Icone';
import SeloSituacao from '../SeloSituacao';
import BotaoCompartilhar from '../avisos/BotaoCompartilhar';
import FatosAlerta from './FatosAlerta';
import PassosAlerta from './PassosAlerta';
import { buscarNivel } from '../../logica/alertas';
import classes from './Alertas.module.css';

// Card completo de um alerta ativo: órgão, selos (lugar da pessoa e nível), título, frase,
// onde e quando, e os botões "O que fazer" (abre os passos dentro do card), "Ver o alerta"
// e Compartilhar. O passo do 199 fica só no detalhe.
// Recebe:
// - alerta (de dados/alertas.js) e caminho (rota do detalhe);
// - local: selo do lugar { icone, texto } (ex.: a casa da pessoa) ou null;
// - area: partes do texto "onde" (de partesDaArea).
export default function CardAlerta({ alerta, caminho, local, area }) {
  const [aberto, setAberto] = useState(false);
  const idPassos = useId();
  const idTitulo = useId();
  const nivel = buscarNivel(alerta.nivel);

  return (
    <article className={classes.card} aria-labelledby={idTitulo}>
      <div className={classes.corpo}>
        <div className={classes.topo}>
          <p className={classes.orgao}>
            <Icone nome={alerta.icone} tamanho={22} />
            {alerta.orgao}
          </p>
          <span className={classes.selos}>
            {local && (
              <span className={classes.local}>
                <Icone nome={local.icone} tamanho={18} preenchido />
                {local.texto}
              </span>
            )}
            <SeloSituacao cor={nivel.cor}>{nivel.rotulo}</SeloSituacao>
          </span>
        </div>
        <h3 className={classes.titulo} id={idTitulo}>
          <Link to={caminho}>{alerta.manchete}</Link>
        </h3>
        <p className={classes.frase}>{alerta.frase}</p>
        <FatosAlerta area={area} quando={[alerta.inicio, alerta.fim]} />
      </div>

      {aberto && (
        <div className={classes.faixa}>
          <h4 className={classes.subtitulo}>O que fazer</h4>
          <PassosAlerta passos={alerta.passos} id={idPassos} />
        </div>
      )}

      <div className={classes.acoes}>
        <Botao
          variante="secundario"
          compacto
          icone={aberto ? 'expand_less' : 'expand_more'}
          iconeDireita
          aria-expanded={aberto}
          aria-controls={aberto ? idPassos : undefined}
          onClick={() => setAberto((atual) => !atual)}
        >
          {aberto ? 'Fechar o que fazer' : 'O que fazer'}
        </Botao>
        <Botao variante="secundario" compacto icone="arrow_forward" iconeDireita para={caminho}>
          Ver o alerta
        </Botao>
        <BotaoCompartilhar
          soIcone
          titulo={alerta.manchete}
          caminho={caminho}
          rotulo="Compartilhar alerta"
        />
      </div>
    </article>
  );
}
