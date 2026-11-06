import { Progress, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import classes from './DeCadaCem.module.css';

// Destaque da página Orçamento da Cidade: "De cada R$ 100 gastos pela prefeitura..."
// Uma linha por área, com o valor grande à esquerda ("R$ 27"), o nome e uma barra.
// Recebe as linhas de montarDeCadaCem() (já ordenadas e somando 100).
// A barra é só desenho (aria-hidden) e cresce em relação à maior área; o texto traz o valor.
export default function DeCadaCem({ linhas }) {
  const maior = linhas[0]?.deCem ?? 1;
  const soma = linhas.reduce((total, linha) => total + linha.deCem, 0);

  return (
    <Cartao component="section" aria-labelledby="de-cada-cem-titulo">
      <Title order={2} id="de-cada-cem-titulo" fz={{ base: 20, md: 22 }} fw={800} lh={1.25}>
        De cada R$ 100 gastos pela prefeitura…
      </Title>
      <Text fz={{ base: 14, md: 15 }} c="var(--cor-texto-suave)" mt={4}>
        Veja para onde vai o dinheiro, da área que recebe mais para a que recebe menos.
      </Text>

      <ol className={classes.lista}>
        {linhas.map((linha) => (
          <li key={linha.id} className={classes.linha}>
            <span className={classes.valor}>R$ {linha.deCem}</span>
            <div className={classes.corpo}>
              <span className={classes.nome}>
                <span className={classes.icone}>
                  <Icone nome={linha.icone} tamanho={20} />
                </span>
                <span>
                  {linha.deCem === 1 ? 'vai' : 'vão'} para <strong>{linha.nome}</strong>
                </span>
              </span>
              <Progress
                value={(linha.deCem / maior) * 100}
                size={12}
                radius="xl"
                aria-hidden="true"
                classNames={{ root: classes.trilho, section: classes.barra }}
              />
            </div>
          </li>
        ))}
      </ol>

      <Text fz={14} fw={600} mt="md" className={classes.soma}>
        Somando tudo: R$ {soma}. Os valores foram arredondados para fechar a conta.
      </Text>
    </Cartao>
  );
}
