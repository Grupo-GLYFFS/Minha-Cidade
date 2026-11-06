import { Link } from 'react-router-dom';
import { SimpleGrid } from '@mantine/core';
import Icone from '../Icone';
import SecaoCabecalho from '../SecaoCabecalho';
import classes from './AtalhosServicos.module.css';

// Grade com os serviços mais usados: 3 colunas no celular e 6 no computador.
// Recebe a lista de serviços (id, nome, ícone e, se tiver, um caminho próprio).
export default function AtalhosServicos({ servicos }) {
  return (
    <section aria-labelledby="atalhos-titulo">
      <SecaoCabecalho
        id="atalhos-titulo"
        titulo="Serviços mais usados"
        caminho="/servicos"
        rotuloLink="Ver todos os serviços"
        rotuloLinkCurto="Ver todos"
      />
      <SimpleGrid
        component="ul"
        cols={{ base: 3, md: 6 }}
        spacing={{ base: 'sm', md: 12 }}
        className={classes.lista}
      >
        {servicos.map((servico) => (
          <li key={servico.id}>
            <Link to={servico.caminho ?? `/servicos/${servico.id}`} className={classes.atalho}>
              <span className={classes.icone}>
                <Icone nome={servico.icone} />
              </span>
              {servico.nome}
            </Link>
          </li>
        ))}
      </SimpleGrid>
    </section>
  );
}
