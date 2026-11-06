import { Link } from 'react-router-dom';
import { Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import classes from './MolduraConta.module.css';

// Cartão centralizado das telas "Entrar" e "Criar conta": logo, título, frase curta e o conteúdo.
// Recebe o titulo (vira o h1 da página), a descricao, a largura ("estreita" ou "larga") e children.
export default function MolduraConta({ titulo, descricao, largura = 'estreita', children }) {
  return (
    <div className={classes.fundo}>
      <Cartao
        component="section"
        aria-labelledby="conta-titulo"
        className={classes.cartao}
        data-largura={largura}
      >
        <Link to="/" className={classes.logoLink}>
          <img
            className={classes.logo}
            src="/img/logo.png"
            alt="Minha Prefeitura, ir para o início"
          />
        </Link>
        <Title
          order={1}
          id="conta-titulo"
          fz={{ base: 28, md: 32 }}
          lh={1.15}
          lts="-0.02em"
          mt="lg"
        >
          {titulo}
        </Title>
        {descricao && (
          <Text c="var(--cor-texto-suave)" mt={4}>
            {descricao}
          </Text>
        )}
        <div className={classes.conteudo}>{children}</div>
      </Cartao>
    </div>
  );
}
