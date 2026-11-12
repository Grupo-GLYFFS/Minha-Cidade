import { Link } from 'react-router-dom';
import { Anchor, Text } from '@mantine/core';
import Subsecao from '../Subsecao';
import { FORA_DA_VITRINE } from '../../../dados/vitrineForaDaVitrine';
import classes from './AppForaDaVitrine.module.css';

// Lista dos componentes que não ficam soltos nesta página, com o motivo
// e o link para vê-los funcionando de verdade.
export default function AppForaDaVitrine() {
  return (
    <Subsecao
      id="app-fora"
      titulo="Vistos só na página"
      descricao="Estes componentes não aparecem soltos aqui: têm o h1 de uma página, salvam dados, mudam o endereço ou são a própria moldura do app."
    >
      <ul className={classes.lista}>
        {FORA_DA_VITRINE.map((item) => (
          <li key={item.nome} className={classes.item}>
            <code className={classes.nome}>{item.nome}</code>
            <Text fz={12} ff="monospace" c="var(--cor-texto-suave)">
              {item.arquivo}
            </Text>
            <Text fz={14} mt={4}>
              {item.motivo}
            </Text>
            <Anchor component={Link} to={item.caminho} fz={14} fw={600} c="var(--cor-link)">
              Ver em {item.caminho}
            </Anchor>
          </li>
        ))}
      </ul>
    </Subsecao>
  );
}
