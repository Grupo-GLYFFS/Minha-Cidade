import { useState } from 'react';
import { Stack } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import AlternarExemplos from '../AlternarExemplos';
import TotalOrcamento from '../../orcamento/TotalOrcamento';
import DeCadaCem from '../../orcamento/DeCadaCem';
import MinimosConstituicao from '../../orcamento/MinimosConstituicao';
import PrevistoGasto from '../../orcamento/PrevistoGasto';
import ComoLerOrcamento from '../../orcamento/ComoLerOrcamento';
import CartaoOpcaoOrcamento from '../../orcamentoBairro/CartaoOpcaoOrcamento';
import ResumoDivisao from '../../orcamentoBairro/ResumoDivisao';
import ComparacaoVizinhos from '../../orcamentoBairro/ComparacaoVizinhos';
import { AREAS_ORCAMENTO } from '../../../dados/orcamento';
import { MINIMOS_CONSTITUCIONAIS } from '../../../dados/minimosConstitucionais';
import {
  OPCOES_ORCAMENTO_BAIRRO,
  PARTICIPANTES_VIZINHOS,
  PASSO_ORCAMENTO_BAIRRO,
  VALOR_ORCAMENTO_BAIRRO,
} from '../../../dados/orcamentoBairro';
import {
  conferirMinimos,
  montarDeCadaCem,
  ordenarPorPrevisto,
  totalOrcamento,
} from '../../../logica/orcamento';
import { compararComVizinhos, divisaoIgual, resumirDivisao } from '../../../logica/orcamentoBairro';
import { HOJE } from '../../../logica/datas';

const TOTAL = VALOR_ORCAMENTO_BAIRRO;
const DIVISAO_IGUAL = divisaoIgual(OPCOES_ORCAMENTO_BAIRRO, TOTAL, PASSO_ORCAMENTO_BAIRRO);
const OPCAO = OPCOES_ORCAMENTO_BAIRRO[0];

// Situações do quadro "Distribuídos": falta dinheiro, passou do limite, tudo certo e visitante
const ESTADOS_RESUMO = [
  { valor: 'falta', rotulo: 'Falta', distribuido: TOTAL * 0.6, logado: true },
  { valor: 'passou', rotulo: 'Passou', distribuido: TOTAL * 1.15, logado: true },
  { valor: 'exato', rotulo: 'Pode enviar', distribuido: TOTAL, logado: true },
  { valor: 'visitante', rotulo: 'Visitante', distribuido: TOTAL * 0.6, logado: false },
];

// Orçamento da Cidade e Orçamento do Bairro ("Prefeito por 5 minutos").
// Os valores do controle deslizante ficam só nesta caixa; enviar não faz nada.
export default function AppOrcamento() {
  const [valor, setValor] = useState(250000);

  return (
    <Subsecao id="app-orcamento" titulo="Orçamento">
      <Vitrine
        nome="TotalOrcamento"
        arquivo="src/componentes/orcamento/TotalOrcamento.jsx"
        props="total (totalOrcamento)"
      >
        <TotalOrcamento total={totalOrcamento(AREAS_ORCAMENTO)} />
      </Vitrine>

      <Vitrine
        nome="DeCadaCem"
        arquivo="src/componentes/orcamento/DeCadaCem.jsx"
        props="linhas (montarDeCadaCem)"
      >
        <DeCadaCem linhas={montarDeCadaCem(AREAS_ORCAMENTO)} />
      </Vitrine>

      <Vitrine
        nome="MinimosConstituicao"
        arquivo="src/componentes/orcamento/MinimosConstituicao.jsx"
        props="minimos (conferirMinimos)"
      >
        <MinimosConstituicao minimos={conferirMinimos(MINIMOS_CONSTITUCIONAIS, AREAS_ORCAMENTO)} />
      </Vitrine>

      <Vitrine
        nome="PrevistoGasto + ComoLerOrcamento"
        arquivo="src/componentes/orcamento/"
        props="areas (aqui só as 2 maiores)"
      >
        <Stack gap="md">
          <PrevistoGasto areas={ordenarPorPrevisto(AREAS_ORCAMENTO).slice(0, 2)} />
          <ComoLerOrcamento />
        </Stack>
      </Vitrine>

      <Vitrine
        nome="CartaoOpcaoOrcamento"
        arquivo="src/componentes/orcamentoBairro/CartaoOpcaoOrcamento.jsx"
        props="opcao · valor · aoMudar · total · passo (Slider com − e +)"
      >
        <CartaoOpcaoOrcamento
          opcao={OPCAO}
          valor={valor}
          aoMudar={setValor}
          total={TOTAL}
          passo={PASSO_ORCAMENTO_BAIRRO}
        />
      </Vitrine>

      <Vitrine
        nome="ResumoDivisao"
        arquivo="src/componentes/orcamentoBairro/ResumoDivisao.jsx"
        props="resumo · total · logado · caminhoEntrar · aoEnviar (falta / passou / pode enviar / visitante)"
      >
        <AlternarExemplos
          rotulo="Situação da divisão"
          opcoes={ESTADOS_RESUMO.map((estado) => ({
            valor: estado.valor,
            rotulo: estado.rotulo,
            conteudo: (
              <ResumoDivisao
                resumo={resumirDivisao({ exemplo: estado.distribuido }, TOTAL)}
                total={TOTAL}
                logado={estado.logado}
                caminhoEntrar="/entrar"
                aoEnviar={() => {}}
              />
            ),
          }))}
        />
      </Vitrine>

      <Vitrine
        nome="ComparacaoVizinhos"
        arquivo="src/componentes/orcamentoBairro/ComparacaoVizinhos.jsx"
        props="comparacao · envio · participantes · acabouDeEnviar={false} · aoRefazer"
      >
        <ComparacaoVizinhos
          comparacao={compararComVizinhos(DIVISAO_IGUAL, OPCOES_ORCAMENTO_BAIRRO)}
          envio={{ bairro: 'Vila Mariana', enviadoEm: HOJE }}
          participantes={PARTICIPANTES_VIZINHOS}
          acabouDeEnviar={false}
          aoRefazer={() => {}}
        />
      </Vitrine>
    </Subsecao>
  );
}
