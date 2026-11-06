import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Text, Title } from '@mantine/core';
import Etiqueta from '../componentes/Etiqueta';
import AcaoServico from '../componentes/servicos/AcaoServico';
import CartaoTelefones from '../componentes/servicos/CartaoTelefones';
import CatalogoNaoEncontrado from '../componentes/servicos/CatalogoNaoEncontrado';
import FichaServico from '../componentes/servicos/FichaServico';
import ListaServicos from '../componentes/servicos/ListaServicos';
import TrilhaServico from '../componentes/servicos/TrilhaServico';
import {
  buscarCategoriaServico,
  buscarServico,
  buscarTipoServico,
  servicosRelacionados,
} from '../logica/servicos';
import classes from './Servico.module.css';

// Página de um serviço: caminho até ele, nome, resumo, a ficha completa e o próximo passo
// (formulário online, tela do app ou telefones), com serviços parecidos no fim.
// O id vem do endereço (/servicos/agendar-consulta). Se não existir, oferece a volta ao catálogo.
export default function Servico() {
  const { idServico } = useParams();
  const servico = buscarServico(idServico);

  // Ao abrir outro serviço (ex.: pelos relacionados), começa a página do topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [idServico]);

  if (!servico) return <CatalogoNaoEncontrado titulo="Serviço não encontrado" />;

  const categoria = buscarCategoriaServico(servico.categoria);
  const tipo = buscarTipoServico(servico.tipo);
  const relacionados = servicosRelacionados(servico);
  // Telefones aparecem sempre nos informativos (com o 156, se o serviço não tiver outro)
  const mostrarTelefones = servico.tipo === 'informativo' || servico.info.telefones?.length > 0;
  const acaoPrimeiro = servico.tipo !== 'informativo';
  const lateral = (
    <div className={classes.lateral}>
      <AcaoServico servico={servico} />
      {mostrarTelefones && <CartaoTelefones telefones={servico.info.telefones} />}
    </div>
  );

  return (
    <Stack gap="lg">
      <header>
        {categoria && <TrilhaServico categoria={categoria} />}
        <Title order={1} fz={{ base: 26, md: 32 }} lh={1.15} lts="-0.02em" mt={4}>
          {servico.nome}
        </Title>
        <Text c="var(--cor-texto-suave)" fz={{ base: 15, md: 17 }} mt="sm" maw={720}>
          {servico.resumo}
        </Text>
        {tipo && (
          <div className={classes.etiqueta}>
            <Etiqueta texto={tipo.rotulo} corFundo={tipo.corFundo} corTexto={tipo.corTexto} />
          </div>
        )}
      </header>

      {/* Computador: ficha à esquerda, ação e telefones à direita.
          Celular: segue a ordem do código, com a ação antes da ficha (menos nos informativos) */}
      <div className={classes.grade}>
        {acaoPrimeiro && lateral}
        <div className={classes.ficha}>
          <FichaServico info={servico.info} />
        </div>
        {!acaoPrimeiro && lateral}
      </div>

      {relacionados.length > 0 && (
        <Stack component="section" gap="sm" aria-labelledby="relacionados-titulo">
          <Title order={2} id="relacionados-titulo" fz={{ base: 18, md: 20 }} fw={700}>
            Serviços relacionados
          </Title>
          <ListaServicos servicos={relacionados} colunas={3} />
        </Stack>
      )}
    </Stack>
  );
}
