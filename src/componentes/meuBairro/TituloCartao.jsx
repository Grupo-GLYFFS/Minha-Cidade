import { Title } from '@mantine/core';
import Icone from '../Icone';
import classes from './TituloCartao.module.css';

// Título dos cartões de Meu Bairro: ícone num quadrado azul claro e o título (h2).
// Recebe o id do título (para o aria-labelledby do cartão), o ícone e o texto.
export default function TituloCartao({ id, icone, children }) {
  return (
    <div className={classes.titulo}>
      <span className={classes.icone}>
        <Icone nome={icone} tamanho={24} />
      </span>
      <Title order={2} id={id} fz={{ base: 17, md: 18 }} fw={700} lh={1.3}>
        {children}
      </Title>
    </div>
  );
}
