import { Group, Text, Title } from '@mantine/core';
import Etiqueta from '../Etiqueta';
import Icone from '../Icone';
import { formatarDataCurta } from '../../logica/datas';
import { formatarValorCurto } from '../../logica/formatos';
import { buscarStatusProjeto, votacaoAberta } from '../../logica/votacao';
import classes from './CabecalhoProjeto.module.css';

// Topo da página de um grande projeto: status, tema, título, resumo e os fatos principais
// (valor, prazo da obra, onde fica e até quando vai a votação).
// Recebe o projeto.
export default function CabecalhoProjeto({ projeto }) {
  const aberta = votacaoAberta(projeto);
  const status = buscarStatusProjeto(aberta ? 'votacao-aberta' : 'encerrada');

  const fatos = [
    { icone: 'payments', rotulo: 'Valor', valor: formatarValorCurto(projeto.valor) },
    { icone: 'construction', rotulo: 'Prazo da obra', valor: projeto.prazoObra },
    {
      icone: 'location_on',
      rotulo: projeto.regiao,
      valor: projeto.bairros.join(', '),
    },
    {
      icone: 'event',
      rotulo: aberta ? 'Votação até' : 'Votação encerrou em',
      valor: formatarDataCurta(projeto.fimVotacao),
    },
  ];

  return (
    <header>
      <Group gap="sm" mb="sm">
        <Etiqueta texto={status.rotulo} corFundo={status.corFundo} corTexto={status.corTexto} />
        <Group component="span" gap={4} wrap="nowrap" fz={13} fw={600} c="var(--cor-texto-suave)">
          <Icone nome={projeto.icone} tamanho={18} />
          {projeto.tema}
        </Group>
      </Group>
      <Title order={1} fz={{ base: 28, md: 32 }} lh={1.15} lts="-0.02em">
        {projeto.titulo}
      </Title>
      <Text c="var(--cor-texto-suave)" mt="sm" maw={720} fz={{ base: 15, md: 17 }}>
        {projeto.resumo}
      </Text>

      <dl className={classes.fatos}>
        {fatos.map((fato) => (
          <div key={fato.icone} className={classes.fato}>
            <dt>
              <Icone nome={fato.icone} tamanho={18} />
              {fato.rotulo}
            </dt>
            <dd>{fato.valor}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
