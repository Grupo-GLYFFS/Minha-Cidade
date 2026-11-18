import { Text, VisuallyHidden } from '@mantine/core';
import CartaoArea from './CartaoArea';
import CartaoProjeto from './CartaoProjeto';
import CartaoObra from './CartaoObra';
import SecaoCabecalho from '../SecaoCabecalho';
import Botao from '../Botao';
import EstadoVazio from '../EstadoVazio';
import { useSessao } from '../../contexto/useSessao';
import { AREAS_CIDADE_ABERTA, ORCAMENTO_TOTAL_2026 } from '../../dados/cidadeAberta';
import { OBRAS } from '../../dados/obras';
import { PROJETOS } from '../../dados/projetos';
import { formatarValorCurto, naRegiao, pluralizar } from '../../logica/formatos';
import { obraEmAndamento, obrasPerto } from '../../logica/obras';
import { projetosEmVotacao } from '../../logica/votacao';
import classes from './SecoesCidadeAberta.module.css';

// Conteúdo do painel da Cidade Aberta, usado na página /cidade-aberta e na aba Cidade do celular:
// os quatro cartões das áreas, as votações abertas e as obras perto da pessoa.
// Pessoa logada vê as obras da região dela; o visitante vê as obras mais adiantadas da cidade.
export default function SecoesCidadeAberta() {
  const { usuario } = useSessao();
  const emVotacao = projetosEmVotacao(PROJETOS);
  const obrasEmAndamento = OBRAS.filter(obraEmAndamento).length;
  const obras = obrasPerto(OBRAS, usuario?.regiao);

  // Número de destaque de cada área, pelo id
  const destaques = {
    orcamento: `${formatarValorCurto(ORCAMENTO_TOTAL_2026)} em 2026`,
    projetos: pluralizar(emVotacao.length, 'votação aberta', 'votações abertas'),
    'orcamento-do-bairro': 'Prefeito por 5 minutos',
    obras: pluralizar(obrasEmAndamento, 'obra em andamento', 'obras em andamento'),
  };

  return (
    <div className={classes.secoes}>
      <section aria-labelledby="areas-titulo">
        <VisuallyHidden component="h2" id="areas-titulo">
          Áreas da Cidade Aberta
        </VisuallyHidden>
        <ul className={classes.grade}>
          {AREAS_CIDADE_ABERTA.map((area) => (
            <li key={area.id}>
              <CartaoArea area={area} destaque={destaques[area.id]} />
            </li>
          ))}
        </ul>
      </section>

      {emVotacao.length > 0 && (
        <section aria-labelledby="votacoes-titulo">
          <SecaoCabecalho
            id="votacoes-titulo"
            titulo="Votações abertas"
            caminho="/minha-cidade/votacoes"
            rotuloLink="Ver todas"
          />
          <ul className={classes.grade} data-colunas="3">
            {emVotacao.slice(0, 3).map((projeto) => (
              <li key={projeto.id}>
                <CartaoProjeto projeto={projeto} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="obras-perto-titulo">
        <SecaoCabecalho
          id="obras-perto-titulo"
          titulo={usuario ? 'Obras perto de você' : 'Obras mais adiantadas'}
          caminho="/minha-cidade/obras"
          rotuloLink="Ver todas"
        />
        <Text fz={14} c="var(--cor-texto-suave)" mb="sm">
          {usuario
            ? `Obras em andamento ${naRegiao(usuario.regiao)}, das mais adiantadas para as mais novas.`
            : 'Obras em andamento que estão mais perto de ficar prontas.'}
        </Text>
        {obras.length > 0 ? (
          <ul className={classes.grade} data-colunas="3">
            {obras.map((obra) => (
              <li key={obra.id}>
                <CartaoObra obra={obra} />
              </li>
            ))}
          </ul>
        ) : (
          <EstadoVazio texto={`Nenhuma obra em andamento ${naRegiao(usuario.regiao)} agora.`}>
            <Botao variante="secundario" para="/minha-cidade/obras">
              Ver obras da cidade
            </Botao>
          </EstadoVazio>
        )}
      </section>

      <Text fz={12} c="var(--cor-texto-suave)">
        Dados de exemplo: valores, votos e obras foram criados para demonstrar o app.
      </Text>
    </div>
  );
}
