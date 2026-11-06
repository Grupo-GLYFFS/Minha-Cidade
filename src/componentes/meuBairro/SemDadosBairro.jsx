import { Link } from 'react-router-dom';
import { Anchor, Text } from '@mantine/core';
import Cartao from '../Cartao';
import TituloCartao from './TituloCartao';
import classes from './CartaoMeuBairro.module.css';

// Cartão de Meu Bairro para quando o app ainda não tem a coleta e os serviços do bairro.
// Em vez de inventar dados, diz isso e indica o 156 e a lista de telefones.
// Recebe o nome do bairro.
export default function SemDadosBairro({ bairro }) {
  return (
    <Cartao component="section" aria-labelledby="sem-dados-titulo" className={classes.cartao}>
      <TituloCartao id="sem-dados-titulo" icone="info">
        Coleta e serviços de referência
      </TituloCartao>
      <Text>
        Ainda não temos os dados de {bairro} no app. Consulte os dias da coleta, a UBS, a escola e o
        CRAS pelo 156.
      </Text>
      <div className={classes.links}>
        <Anchor href="tel:156" fw={600} c="var(--cor-link)">
          Ligar para o 156
        </Anchor>
        <Anchor component={Link} to="/ajuda/telefones" fw={600} c="var(--cor-link)">
          Ver telefones úteis
        </Anchor>
      </div>
    </Cartao>
  );
}
