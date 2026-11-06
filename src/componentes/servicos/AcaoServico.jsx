import { Link } from 'react-router-dom';
import { Button, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import { caminhoSolicitacao } from '../../logica/servicos';
import classes from './AcaoServico.module.css';

// Caixa com o próximo passo do serviço, conforme o tipo:
// - 'solicitacao': o que o formulário online vai pedir e o botão "Começar solicitação";
// - 'proprio': o botão que leva à tela do app que resolve o serviço.
// Serviços só informativos não têm ação (devolve null). Recebe o serviço.
export default function AcaoServico({ servico }) {
  if (servico.tipo === 'solicitacao') {
    return (
      <Cartao component="section" aria-labelledby="acao-titulo" className={classes.caixa}>
        <Title order={2} id="acao-titulo" fz={18} fw={700} lh={1.3}>
          Como solicitar pelo app
        </Title>
        <Text fz={15} c="var(--cor-texto-suave)">
          Preencha um formulário rápido. Você vai precisar informar:
        </Text>
        <ul className={classes.campos}>
          {servico.campos.map((campo) => (
            <li key={campo.nome} className={classes.campo}>
              <Icone nome="check" tamanho={20} />
              <span>
                {campo.rotulo}
                {!campo.obrigatorio && <span className={classes.opcional}> (opcional)</span>}
              </span>
            </li>
          ))}
        </ul>
        <Text fz={14} c="var(--cor-texto-suave)">
          Ao enviar, você recebe um número de protocolo e acompanha tudo em Meus pedidos.
        </Text>
        <Button
          component={Link}
          to={caminhoSolicitacao(servico)}
          size="md"
          fullWidth
          rightSection={<Icone nome="arrow_forward" tamanho={20} />}
        >
          Começar solicitação
        </Button>
      </Cartao>
    );
  }

  if (servico.tipo === 'proprio') {
    return (
      <Cartao component="section" aria-labelledby="acao-titulo" className={classes.caixa}>
        <Title order={2} id="acao-titulo" fz={18} fw={700} lh={1.3}>
          Faça pelo app
        </Title>
        <Text fz={15} c="var(--cor-texto-suave)">
          Este serviço tem uma tela própria no Minha Prefeitura.
        </Text>
        <Button
          component={Link}
          to={servico.destino}
          size="md"
          fullWidth
          rightSection={<Icone nome="arrow_forward" tamanho={20} />}
        >
          {servico.rotuloDestino}
        </Button>
      </Cartao>
    );
  }

  return null;
}
