import { useId } from 'react';
import { ActionIcon, Slider, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import { textoValor } from '../../logica/orcamentoBairro';
import classes from './CartaoOpcaoOrcamento.module.css';

// Cartão de uma melhoria do "Prefeito por 5 minutos": ícone, nome, descrição, o valor escrito
// e um controle deslizante (de 0 ao total, de passo em passo), com botões − e + ao lado.
// Pelo teclado, as setas mudam o valor de um passo; o leitor de tela ouve "R$ 250 mil".
// Recebe a opção, o valor atual, aoMudar(novoValor), o total e o passo.
export default function CartaoOpcaoOrcamento({ opcao, valor, aoMudar, total, passo }) {
  const id = useId();
  const idDescricao = `${id}-descricao`;
  const percentual = Math.round((valor / total) * 100);

  return (
    <Cartao component="article" aria-labelledby={`${id}-titulo`}>
      <div className={classes.topo}>
        <span className={classes.icone}>
          <Icone nome={opcao.icone} tamanho={24} />
        </span>
        <div className={classes.textos}>
          <Title order={2} id={`${id}-titulo`} fz={{ base: 16, md: 17 }} fw={700} lh={1.3}>
            {opcao.nome}
          </Title>
          <Text id={idDescricao} fz={{ base: 13, md: 14 }} c="var(--cor-texto-suave)">
            {opcao.descricao}
          </Text>
        </div>
        <p className={classes.valor}>
          {textoValor(valor)}
          <span>{percentual}% do total</span>
        </p>
      </div>

      <div className={classes.controle}>
        <ActionIcon
          variant="default"
          size={44}
          radius="md"
          aria-label={`Tirar ${textoValor(passo)} de ${opcao.nome}`}
          disabled={valor <= 0}
          onClick={() => aoMudar(Math.max(0, valor - passo))}
        >
          <Icone nome="remove" tamanho={20} />
        </ActionIcon>
        <Slider
          className={classes.slider}
          min={0}
          max={total}
          step={passo}
          value={valor}
          onChange={aoMudar}
          label={textoValor}
          thumbLabel={`Valor para ${opcao.nome}`}
          thumbValueText={textoValor}
          thumbProps={{ 'aria-describedby': idDescricao }}
          size="lg"
          thumbSize={28}
          classNames={{ track: classes.trilho }}
        />
        <ActionIcon
          variant="default"
          size={44}
          radius="md"
          aria-label={`Pôr mais ${textoValor(passo)} em ${opcao.nome}`}
          disabled={valor >= total}
          onClick={() => aoMudar(Math.min(total, valor + passo))}
        >
          <Icone nome="add" tamanho={20} />
        </ActionIcon>
      </div>

      <Text fz={12} c="var(--cor-texto-suave)" mt={8}>
        {opcao.referencia}
      </Text>
    </Cartao>
  );
}
