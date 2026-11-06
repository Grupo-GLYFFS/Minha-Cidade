import { Link } from 'react-router-dom';
import { Text, Title } from '@mantine/core';
import Icone from '../Icone';
import { caminhoCategoria, textoQuantidadeServicos } from '../../logica/servicos';
import classes from './CartaoCategoria.module.css';

// Cartão de um assunto do catálogo: ícone, nome, descrição curta e quantos serviços tem.
// O cartão inteiro é um link para a página da categoria.
// Recebe a categoria e a quantidade de serviços dela.
export default function CartaoCategoria({ categoria, quantidade }) {
  return (
    <Link to={caminhoCategoria(categoria)} className={classes.cartao}>
      <span className={classes.icone}>
        <Icone nome={categoria.icone} />
      </span>
      <span className={classes.textos}>
        <Title order={3} fz={16} fw={700} lh={1.3}>
          {categoria.nome}
        </Title>
        <Text component="span" fz={14} c="var(--cor-texto-suave)" lh={1.4}>
          {categoria.descricao}
        </Text>
        <Text component="span" fz={13} fw={600} c="var(--cor-link)" mt="auto" pt="sm">
          {textoQuantidadeServicos(quantidade)}
        </Text>
      </span>
    </Link>
  );
}
