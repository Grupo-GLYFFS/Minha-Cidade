import { useRef, useState } from 'react';
import { Button, Text } from '@mantine/core';
import GrupoOpcoes from '../novoPedido/GrupoOpcoes';
import Icone from '../Icone';
import { OPCOES_VOTO } from '../../dados/opcoesVoto';

// Mensagem quando a pessoa tenta confirmar sem escolher
const ERRO_SEM_ESCOLHA = 'Escolha Sim, Não ou Abstenção para confirmar o voto.';

// Formulário de voto: Sim, Não ou Abstenção (botões de opção nativos, funcionam pelo teclado)
// e o botão "Confirmar voto". Recebe a função aoConfirmar(opcao), chamada com a opção escolhida.
// Sem escolha, mostra o erro embaixo das opções e leva o foco até elas.
export default function FormularioVoto({ aoConfirmar }) {
  const [escolha, setEscolha] = useState(null);
  const [erro, setErro] = useState();
  const primeiraOpcao = useRef(null);

  // Confere a escolha e envia o voto
  function confirmar(evento) {
    evento.preventDefault();
    if (!escolha) {
      setErro(ERRO_SEM_ESCOLHA);
      primeiraOpcao.current?.focus();
      return;
    }
    aoConfirmar(escolha);
  }

  // Escolher uma opção apaga o erro
  function escolher(valor) {
    setEscolha(valor);
    setErro(undefined);
  }

  return (
    <form onSubmit={confirmar} noValidate>
      <GrupoOpcoes
        ref={primeiraOpcao}
        nome="voto"
        legenda="Qual é o seu voto?"
        descricao="O voto é único: depois de confirmar, não dá para trocar."
        opcoes={OPCOES_VOTO.map(({ valor, rotulo, icone }) => ({ valor, rotulo, icone }))}
        valor={escolha}
        aoMudar={escolher}
        erro={erro}
        colunas={3}
        obrigatorio={false}
      />
      <Button
        type="submit"
        h={48}
        mt="md"
        fullWidth
        leftSection={<Icone nome="how_to_vote" tamanho={20} />}
      >
        Confirmar voto
      </Button>
      <Text fz={12} c="var(--cor-texto-suave)" mt="sm">
        Seu voto é contado no resultado, que aparece logo depois de confirmar.
      </Text>
    </form>
  );
}
