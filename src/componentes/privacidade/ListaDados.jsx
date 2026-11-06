import { Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import classes from './ListaDados.module.css';

// Cartão da página Privacidade com um título e uma lista de dados, cada um com ícone.
// Recebe o id do título, o título, uma frase de introdução (opcional) e os itens { icone, texto }.
export default function ListaDados({ id, titulo, introducao, itens }) {
  return (
    <Cartao component="section" aria-labelledby={id}>
      <Title order={2} id={id} fz={{ base: 18, md: 20 }} fw={700} mb={4}>
        {titulo}
      </Title>
      {introducao && (
        <Text c="var(--cor-texto-suave)" mb="md">
          {introducao}
        </Text>
      )}
      <ul className={classes.lista}>
        {itens.map((item) => (
          <li key={item.texto} className={classes.item}>
            <span className={classes.icone}>
              <Icone nome={item.icone} tamanho={20} />
            </span>
            <Text>{item.texto}</Text>
          </li>
        ))}
      </ul>
    </Cartao>
  );
}
