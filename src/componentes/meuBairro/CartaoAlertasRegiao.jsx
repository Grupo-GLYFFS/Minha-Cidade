import { Link } from 'react-router-dom';
import { Anchor, Text } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import TituloCartao from './TituloCartao';
import { ALERTAS } from '../../dados/alertas';
import { alertasDefesaCivilDaRegiao } from '../../logica/alertas';
import { naRegiao } from '../../logica/formatos';
import base from './CartaoMeuBairro.module.css';
import classes from './CartaoAlertasRegiao.module.css';

// Cartão "Alertas da região" de Meu Bairro: os alertas da Defesa Civil que valem hoje para
// a região do bairro (e para a cidade toda), com o link para as orientações.
// Sem alerta, diz isso em texto. Recebe a região.
export default function CartaoAlertasRegiao({ regiao }) {
  const alertas = regiao ? alertasDefesaCivilDaRegiao(ALERTAS, regiao) : [];

  return (
    <Cartao component="section" aria-labelledby="alertas-regiao-titulo" className={base.cartao}>
      <TituloCartao id="alertas-regiao-titulo" icone="warning">
        Alertas da região
      </TituloCartao>

      {alertas.length > 0 ? (
        <ul className={base.lista}>
          {alertas.map((alerta) => (
            <li key={alerta.id} className={classes.alerta}>
              <Icone nome="warning" tamanho={24} preenchido />
              <Text fz={15} c="inherit">
                <strong>{alerta.titulo}:</strong> {alerta.mensagem}
              </Text>
            </li>
          ))}
        </ul>
      ) : (
        <p className={classes.semAlerta}>
          <Icone nome="check_circle" tamanho={24} preenchido />
          {regiao
            ? `Nenhum alerta da Defesa Civil ${naRegiao(regiao)} agora.`
            : 'Nenhum alerta da Defesa Civil para este bairro agora.'}
        </p>
      )}

      <div className={base.links}>
        <Anchor component={Link} to="/servicos/alertas-de-risco" fw={600} c="var(--cor-link)">
          O que fazer em caso de chuva forte
        </Anchor>
      </div>
    </Cartao>
  );
}
