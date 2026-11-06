import { Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import classes from './SobrePedido.module.css';

// Cartão com o que a pessoa escreveu e onde fica o problema. Recebe o pedido.
export default function SobrePedido({ pedido }) {
  // Cada linha do endereço: rótulo e valor
  const endereco = [
    { rotulo: 'Rua', valor: pedido.rua },
    { rotulo: 'Número', valor: pedido.numero || 'Sem número' },
    { rotulo: 'Bairro', valor: pedido.bairro },
    { rotulo: 'Região', valor: pedido.regiao },
  ];

  return (
    <Cartao component="section" aria-labelledby="sobre-titulo">
      <Title order={2} id="sobre-titulo" fz={18} fw={700}>
        O que foi relatado
      </Title>
      <Text mt="sm" fz={{ base: 15, md: 16 }} lh={1.6}>
        {pedido.descricao}
      </Text>

      <Title order={3} fz={15} fw={700} mt="lg">
        Endereço
      </Title>
      <dl className={classes.endereco}>
        {endereco.map((linha) => (
          <div key={linha.rotulo} className={classes.linha}>
            <dt>{linha.rotulo}</dt>
            <dd>{linha.valor}</dd>
          </div>
        ))}
      </dl>
    </Cartao>
  );
}
