import { useState } from 'react';
import { Alert } from '@mantine/core';
import Vitrine from '../Vitrine';
import ContextoSimulado from '../ContextoSimulado';
import AmostraSobDemanda from '../AmostraSobDemanda';
import AlternarExemplos from '../AlternarExemplos';
import Icone from '../../Icone';
import FormularioServico from '../../formularioServico/FormularioServico';
import ResumoServico from '../../formularioServico/ResumoServico';
import SolicitacaoEnviada from '../../formularioServico/SolicitacaoEnviada';
import { USUARIO } from '../../../dados/usuario';
import { SERVICOS } from '../../../dados/servicos';
import { solicitacoesDeExemplo } from '../../../logica/vitrine';

// Formulário online de um serviço (com a sessão simulada), o resumo ao lado e a tela de sucesso.
// Enviar aqui só mostra um aviso: nenhuma solicitação é criada.
// Recebe o serviço com formulário.
export default function AppFormularioServico({ servico }) {
  const [enviou, setEnviou] = useState(false);
  const [solicitacao] = solicitacoesDeExemplo(SERVICOS, USUARIO.id);

  return (
    <>
      <Vitrine
        nome="ResumoServico"
        arquivo="src/componentes/formularioServico/ResumoServico.jsx"
        props="servico (prazo e custo)"
      >
        <ResumoServico servico={servico} />
      </Vitrine>

      <Vitrine
        nome="FormularioServico + SeusDados"
        arquivo="src/componentes/formularioServico/FormularioServico.jsx"
        props="servico · aoEnviar (aqui só avisa) · SeusDados vem da sessão simulada (Maria)"
        fundo="branco"
      >
        <AlternarExemplos
          rotulo="Mostrar o formulário de serviço"
          opcoes={[
            { valor: 'fechado', rotulo: 'Esconder', conteudo: null },
            {
              valor: 'aberto',
              rotulo: `Mostrar: ${servico.nome}`,
              conteudo: (
                <ContextoSimulado>
                  {enviou && (
                    <Alert
                      color="green"
                      variant="light"
                      radius="md"
                      mb="md"
                      title="Tudo certo no formulário. Nada foi enviado (página de componentes)."
                      icon={<Icone nome="check_circle" tamanho={20} preenchido />}
                    />
                  )}
                  <FormularioServico servico={servico} aoEnviar={() => setEnviou(true)} />
                </ContextoSimulado>
              ),
            },
          ]}
        />
      </Vitrine>

      {solicitacao && (
        <Vitrine
          nome="SolicitacaoEnviada"
          arquivo="src/componentes/formularioServico/SolicitacaoEnviada.jsx"
          props="servico · solicitacao (tela de sucesso)"
        >
          <AmostraSobDemanda aviso="Leva o foco ao título quando aparece, por isso só aparece quando você pede.">
            <SolicitacaoEnviada servico={servico} solicitacao={solicitacao} />
          </AmostraSobDemanda>
        </Vitrine>
      )}
    </>
  );
}
