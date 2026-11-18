import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Button, Group, Text } from '@mantine/core';
import CabecalhoAntigo from '../componentes/CabecalhoAntigo';
import Icone from '../componentes/Icone';
import LinkVoltar from '../componentes/LinkVoltar';
import CartaoOpcaoOrcamento from '../componentes/orcamentoBairro/CartaoOpcaoOrcamento';
import ResumoDivisao from '../componentes/orcamentoBairro/ResumoDivisao';
import ComparacaoVizinhos from '../componentes/orcamentoBairro/ComparacaoVizinhos';
import { useSessao } from '../contexto/useSessao';
import { useCaminhoConta } from '../contexto/useCaminhoConta';
import { useDivisaoBairro } from '../contexto/useDivisaoBairro';
import {
  BAIRRO_PADRAO_ORCAMENTO,
  OPCOES_ORCAMENTO_BAIRRO as OPCOES,
  PARTICIPANTES_VIZINHOS,
  PASSO_ORCAMENTO_BAIRRO as PASSO,
  VALOR_ORCAMENTO_BAIRRO as TOTAL,
} from '../dados/orcamentoBairro';
import {
  compararComVizinhos,
  divisaoIgual,
  divisaoValida,
  divisaoZerada,
  resumirDivisao,
  textoValor,
} from '../logica/orcamentoBairro';
import classes from './OrcamentoBairro.module.css';

// Orçamento do Bairro ("Prefeito por 5 minutos"): a pessoa divide R$ 1 milhão fictício
// entre cinco melhorias do bairro. Só dá para enviar com exatamente R$ 1 milhão distribuído.
// Depois de enviar (só com conta), a divisão fica salva e a página mostra a comparação com
// os vizinhos, também ao voltar ou recarregar. "Refazer" apaga o envio e reabre os controles
// com a divisão anterior, para a pessoa ajustar e enviar de novo.
// O visitante vê a Vila Mariana e pode testar, mas precisa entrar para enviar.
export default function OrcamentoBairro() {
  const { usuario, logado } = useSessao();
  const { entrar } = useCaminhoConta();
  const { envio, enviar, refazer } = useDivisaoBairro();
  const [divisao, setDivisao] = useState(() => envio?.divisao ?? divisaoZerada(OPCOES));
  const [acabouDeEnviar, setAcabouDeEnviar] = useState(false);
  const bairro = usuario?.bairro || BAIRRO_PADRAO_ORCAMENTO;
  const resumo = resumirDivisao(divisao, TOTAL);

  // Troca o valor de uma melhoria
  function mudarValor(idOpcao, valor) {
    setDivisao((atual) => ({ ...atual, [idOpcao]: valor }));
  }

  // Salva a divisão (o botão só funciona com o total exato; aqui confere de novo)
  function enviarDivisao() {
    if (!divisaoValida(divisao, OPCOES, TOTAL)) return;
    enviar(bairro, divisao);
    setAcabouDeEnviar(true);
  }

  // Apaga o envio e volta para os controles, com a divisão anterior já preenchida
  function refazerDivisao() {
    if (envio) setDivisao(envio.divisao);
    refazer();
    setAcabouDeEnviar(false);
  }

  return (
    <div className={classes.pagina}>
      <div>
        <LinkVoltar caminho="/minha-cidade" rotulo="Cidade Aberta" />
        <CabecalhoAntigo
          titulo="Prefeito por 5 minutos"
          descricao={`Você tem ${textoValor(TOTAL)} para melhorar o bairro ${bairro}. Como dividiria?`}
        />
        {!logado && (
          <Text fz={14} mt="sm" className={classes.aviso}>
            <Icone nome="info" tamanho={20} />
            <span>
              Você está vendo {BAIRRO_PADRAO_ORCAMENTO}.{' '}
              <Anchor component={Link} to={entrar} fw={700} c="var(--cor-link)" fz="inherit">
                Entre para ver o seu bairro.
              </Anchor>
            </span>
          </Text>
        )}
      </div>

      {envio ? (
        <ComparacaoVizinhos
          comparacao={compararComVizinhos(envio.divisao, OPCOES)}
          envio={envio}
          participantes={PARTICIPANTES_VIZINHOS + 1}
          acabouDeEnviar={acabouDeEnviar}
          aoRefazer={refazerDivisao}
        />
      ) : (
        <div className={classes.grade}>
          <div className={classes.opcoes}>
            <Group gap="sm">
              <Button
                variant="light"
                onClick={() => setDivisao(divisaoIgual(OPCOES, TOTAL, PASSO))}
                leftSection={<Icone nome="balance" tamanho={20} />}
              >
                Dividir igualmente
              </Button>
              <Button
                variant="subtle"
                c="var(--cor-link)"
                onClick={() => setDivisao(divisaoZerada(OPCOES))}
                leftSection={<Icone nome="restart_alt" tamanho={20} />}
              >
                Zerar
              </Button>
            </Group>
            {OPCOES.map((opcao) => (
              <CartaoOpcaoOrcamento
                key={opcao.id}
                opcao={opcao}
                valor={divisao[opcao.id]}
                aoMudar={(valor) => mudarValor(opcao.id, valor)}
                total={TOTAL}
                passo={PASSO}
              />
            ))}
          </div>
          <ResumoDivisao
            resumo={resumo}
            total={TOTAL}
            logado={logado}
            caminhoEntrar={entrar}
            aoEnviar={enviarDivisao}
          />
        </div>
      )}

      <Text fz={12} c="var(--cor-texto-suave)">
        Dados de exemplo: o valor, as melhorias e a divisão dos vizinhos foram criados para
        demonstrar o app. Uma consulta de verdade seria levada em conta no orçamento do ano
        seguinte.
      </Text>
    </div>
  );
}
