import { Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import classes from './MinimosConstituicao.module.css';

// Seção "O que a Constituição exige": um cartão para educação e outro para saúde,
// com o mínimo obrigatório e quanto este orçamento aplica ("Cumprido: 27%").
// Recebe a lista de conferirMinimos(). Cumprido ou não vem escrito, com ícone; nunca só pela cor.
export default function MinimosConstituicao({ minimos }) {
  return (
    <section aria-labelledby="constituicao-titulo">
      <Title order={2} id="constituicao-titulo" fz={{ base: 18, md: 20 }} fw={700}>
        O que a Constituição exige
      </Title>
      <Text fz={{ base: 14, md: 15 }} c="var(--cor-texto-suave)" mt={4} mb="sm">
        A Constituição obriga as cidades a aplicar pelo menos 25% dos impostos em educação e 15% em
        saúde.
      </Text>

      <ul className={classes.lista}>
        {minimos.map((minimo) => (
          <li key={minimo.idArea}>
            <Cartao className={classes.cartao}>
              <div className={classes.topo}>
                <span className={classes.icone}>
                  <Icone nome={minimo.icone} tamanho={20} />
                </span>
                <Title order={3} fz={{ base: 16, md: 17 }} fw={700}>
                  {minimo.nome}
                </Title>
              </div>
              <Text fz={14} c="var(--cor-texto-suave)" mt={8}>
                Mínimo: {minimo.minimo}%
              </Text>
              <p className={classes.situacao} data-cumprido={minimo.cumprido}>
                <Icone nome={minimo.cumprido ? 'check_circle' : 'error'} tamanho={24} preenchido />
                {minimo.cumprido ? 'Cumprido' : 'Não cumprido'}: {minimo.aplicado}%
              </p>
            </Cartao>
          </li>
        ))}
      </ul>

      <Text fz={12} c="var(--cor-texto-suave)" mt="sm">
        Os percentuais foram calculados com os valores de exemplo desta página, sobre o orçamento
        total. A conta oficial usa só o dinheiro que vem de impostos.
      </Text>
    </section>
  );
}
