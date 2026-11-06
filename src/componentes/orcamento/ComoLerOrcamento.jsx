import { Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import classes from './ComoLerOrcamento.module.css';

// Explicação curta das palavras usadas na página Orçamento da Cidade
const TERMOS = [
  {
    termo: 'Previsto',
    icone: 'gavel',
    explicacao: 'Valor aprovado pela Câmara na lei do orçamento, no ano anterior.',
  },
  {
    termo: 'Gasto',
    icone: 'payments',
    explicacao: 'Dinheiro que a prefeitura já pagou de verdade neste ano.',
  },
];

// Cartão "Como ler este orçamento": o que quer dizer previsto e gasto, em linguagem simples.
export default function ComoLerOrcamento() {
  return (
    <Cartao component="section" aria-labelledby="como-ler-titulo">
      <Title order={2} id="como-ler-titulo" fz={{ base: 17, md: 18 }} fw={700}>
        Como ler este orçamento
      </Title>
      <dl className={classes.lista}>
        {TERMOS.map((item) => (
          <div key={item.termo} className={classes.item}>
            <Icone nome={item.icone} tamanho={20} />
            <div>
              <dt>{item.termo}</dt>
              <dd>{item.explicacao}</dd>
            </div>
          </div>
        ))}
      </dl>
      <Text fz={14} c="var(--cor-texto-suave)">
        É normal o gasto ficar abaixo do previsto durante o ano: muitas contas só são pagas em
        dezembro.
      </Text>
    </Cartao>
  );
}
