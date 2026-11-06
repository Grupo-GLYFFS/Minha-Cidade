import { Link } from 'react-router-dom';
import { Anchor, Text } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import TituloCartao from './TituloCartao';
import { listarDias, textoProximaColeta } from '../../logica/bairros';
import { proximoDiaDaLista } from '../../logica/datas';
import classes from './CartaoMeuBairro.module.css';

// Cartão "Coleta de lixo" de Meu Bairro: quando passa a próxima coleta comum (calculada a partir
// de hoje), os dias da coleta comum e da seletiva e os links para os serviços de coleta.
// Recebe a coleta do bairro ({ comum, horarioComum, seletiva }).
export default function CartaoColeta({ coleta }) {
  // Só avisa a próxima coleta seletiva quando é hoje ou amanhã (o dia da semana já está escrito)
  const proximaSeletiva = proximoDiaDaLista(coleta.seletiva);
  const avisoSeletiva = ['Hoje', 'Amanhã'].includes(proximaSeletiva)
    ? ` · ${proximaSeletiva.toLowerCase()}`
    : '';
  const itens = [
    {
      icone: 'delete',
      rotulo: 'Lixo comum',
      valor: `${listarDias(coleta.comum)}, a partir das ${coleta.horarioComum}`,
    },
    {
      icone: 'recycling',
      rotulo: 'Coleta seletiva (recicláveis)',
      valor: `${listarDias(coleta.seletiva)}${avisoSeletiva}`,
    },
  ];

  return (
    <Cartao component="section" aria-labelledby="coleta-titulo" className={classes.cartao}>
      <TituloCartao id="coleta-titulo" icone="local_shipping">
        Coleta de lixo
      </TituloCartao>

      <div className={classes.destaque}>
        <Text fz={13} c="var(--cor-texto-suave)">
          Próxima coleta comum
        </Text>
        <Text fz={{ base: 18, md: 20 }} fw={800} lh={1.3}>
          {textoProximaColeta(coleta)}
        </Text>
      </div>

      <ul className={classes.lista}>
        {itens.map((item) => (
          <li key={item.rotulo} className={classes.item}>
            <Icone nome={item.icone} tamanho={20} />
            <span>
              <Text component="span" display="block" fz={13} c="var(--cor-texto-suave)">
                {item.rotulo}
              </Text>
              <Text component="span" display="block" fz={15} fw={600}>
                {item.valor}
              </Text>
            </span>
          </li>
        ))}
      </ul>

      <div className={classes.links}>
        <Anchor component={Link} to="/servicos/coleta-de-lixo" fw={600} c="var(--cor-link)">
          Como funciona a coleta de lixo
        </Anchor>
        <Anchor component={Link} to="/servicos/coleta-seletiva" fw={600} c="var(--cor-link)">
          O que vai na coleta seletiva
        </Anchor>
        <Anchor component={Link} to="/servicos/cata-treco" fw={600} c="var(--cor-link)">
          Retirar móveis velhos (Cata-Treco)
        </Anchor>
      </div>
    </Cartao>
  );
}
