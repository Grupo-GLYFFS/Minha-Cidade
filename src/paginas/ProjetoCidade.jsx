import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Stack, Text } from '@mantine/core';
import CabecalhoAntigo from '../componentes/CabecalhoAntigo';
import LinkVoltar from '../componentes/LinkVoltar';
import CabecalhoProjeto from '../componentes/cidadeAberta/CabecalhoProjeto';
import SobreProjeto from '../componentes/cidadeAberta/SobreProjeto';
import DoisLados from '../componentes/cidadeAberta/DoisLados';
import CartaoVotacao from '../componentes/cidadeAberta/CartaoVotacao';
import { PROJETOS } from '../dados/projetos';
import { buscarProjeto } from '../logica/votacao';
import classes from './ProjetoCidade.module.css';

// Página de um grande projeto: o que é, os dois lados (prós e contras), quem é afetado
// e a votação (ou o resultado, se já votou ou se a votação acabou).
// O id vem do endereço (/cidade-aberta/projetos/corredor-jabaquara).
// Se o projeto não existir, oferece a volta para a lista.
export default function ProjetoCidade() {
  const { id } = useParams();
  const projeto = buscarProjeto(PROJETOS, id);

  // Ao abrir um projeto vindo do meio de uma lista, começa a página do topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!projeto) {
    return (
      <Stack gap="md" align="flex-start">
        <CabecalhoAntigo
          titulo="Projeto não encontrado"
          descricao="O link pode estar errado ou o projeto saiu da lista. Veja todos os grandes projetos."
        />
        <Button component={Link} to="/minha-cidade/votacoes">
          Ver grandes projetos
        </Button>
      </Stack>
    );
  }

  return (
    <Stack gap="lg">
      <div>
        <LinkVoltar caminho="/minha-cidade/votacoes" rotulo="Grandes Projetos" />
        <CabecalhoProjeto projeto={projeto} />
      </div>

      <div className={classes.grade}>
        <div className={classes.sobre}>
          <SobreProjeto projeto={projeto} />
        </div>
        <div className={classes.lados}>
          <DoisLados projeto={projeto} />
        </div>
        <div className={classes.votacao}>
          <CartaoVotacao projeto={projeto} />
        </div>
      </div>

      <Text fz={12} c="var(--cor-texto-suave)">
        Dados de exemplo: o projeto, os valores e os votos foram criados para demonstrar o app.
      </Text>
    </Stack>
  );
}
