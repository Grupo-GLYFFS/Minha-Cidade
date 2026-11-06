import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Group, Stack, Text, Title } from '@mantine/core';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Icone from '../componentes/Icone';
import LinkVoltar from '../componentes/LinkVoltar';
import CatalogoNaoEncontrado from '../componentes/servicos/CatalogoNaoEncontrado';
import ListaServicos from '../componentes/servicos/ListaServicos';
import {
  agruparPorSubcategoria,
  buscarCategoriaServico,
  textoQuantidadeServicos,
} from '../logica/servicos';
import classes from './Servicos.module.css';

// Página de um assunto do catálogo (ex.: Saúde), com os serviços separados por subcategoria.
// O id vem do endereço (/servicos/categoria/saude). Se não existir, oferece a volta ao catálogo.
export default function CategoriaServicos() {
  const { idCategoria } = useParams();
  const categoria = buscarCategoriaServico(idCategoria);

  // Ao trocar de categoria, começa a página do topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [idCategoria]);

  if (!categoria) return <CatalogoNaoEncontrado titulo="Assunto não encontrado" />;

  const grupos = agruparPorSubcategoria(categoria);
  const total = grupos.reduce((soma, grupo) => soma + grupo.servicos.length, 0);

  return (
    <div className={classes.pagina}>
      <div>
        <LinkVoltar caminho="/servicos" rotulo="Todos os serviços" />
        <CabecalhoPagina titulo={categoria.nome} descricao={categoria.descricao} />
        <Group gap={4} mt="sm" c="var(--cor-texto-suave)">
          <Icone nome={categoria.icone} tamanho={20} />
          <Text fz={14} fw={600} c="inherit">
            {textoQuantidadeServicos(total)}
          </Text>
        </Group>
      </div>

      {grupos.map(({ subcategoria, servicos }) => (
        <Stack
          key={subcategoria.id}
          component="section"
          gap="sm"
          aria-labelledby={`sub-${subcategoria.id}`}
        >
          <Title order={2} id={`sub-${subcategoria.id}`} fz={{ base: 18, md: 20 }} fw={700}>
            {subcategoria.nome}
          </Title>
          <ListaServicos servicos={servicos} />
        </Stack>
      ))}
    </div>
  );
}
