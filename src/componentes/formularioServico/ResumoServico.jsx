import { Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import classes from './ResumoServico.module.css';

// Resumo do serviço ao lado do formulário: prazo e custo, tirados da ficha.
// Recebe o serviço.
export default function ResumoServico({ servico }) {
  const itens = [
    { rotulo: 'Prazo', texto: servico.info.prazo, icone: 'schedule' },
    { rotulo: 'Custo', texto: servico.info.custo, icone: 'payments' },
  ].filter((item) => item.texto);

  return (
    <Cartao component="aside" aria-labelledby="resumo-servico-titulo" className={classes.caixa}>
      <Title order={2} id="resumo-servico-titulo" fz={18} fw={700}>
        Sobre este serviço
      </Title>
      <ul className={classes.lista}>
        {itens.map((item) => (
          <li key={item.rotulo} className={classes.item}>
            <span className={classes.icone}>
              <Icone nome={item.icone} tamanho={20} />
            </span>
            <div>
              <Text fz="sm" fw={700}>
                {item.rotulo}
              </Text>
              <Text fz="sm" c="var(--cor-texto-suave)">
                {item.texto}
              </Text>
            </div>
          </li>
        ))}
      </ul>
    </Cartao>
  );
}
