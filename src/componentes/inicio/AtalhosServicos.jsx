import { Link } from 'react-router-dom';
import { SimpleGrid } from '@mantine/core';
import Icone from '../Icone';
import SecaoCabecalho from '../SecaoCabecalho';
import { caminhoServico } from '../../logica/servicos';
import classes from './AtalhosServicos.module.css';

// Grade com os serviços mais usados: 3 colunas no celular e 6 no computador.
// Cada atalho leva à página do serviço e usa o nome curto, quando houver.
// Recebe a lista de serviços do catálogo, o título da seção e, se quiser,
// o caminho do link "Ver todos" (null esconde o link, ex.: na própria página de Serviços).
export default function AtalhosServicos({
  servicos,
  titulo = 'Serviços mais usados',
  caminhoVerTodos = '/servicos',
}) {
  return (
    <section aria-labelledby="atalhos-titulo">
      <SecaoCabecalho
        id="atalhos-titulo"
        titulo={titulo}
        caminho={caminhoVerTodos}
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
            <Link to={caminhoServico(servico)} className={classes.atalho}>
              <span className={classes.icone}>
                <Icone nome={servico.icone} />
              </span>
              {servico.nomeCurto ?? servico.nome}
            </Link>
          </li>
        ))}
      </SimpleGrid>
    </section>
  );
}
