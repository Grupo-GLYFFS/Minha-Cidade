import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Botao from '../componentes/Botao';
import NaoEncontrado from '../componentes/NaoEncontrado';
import FormularioSolicitacao from '../componentes/servicos/FormularioSolicitacao';
import SolicitacaoEnviada from '../componentes/servicos/SolicitacaoEnviada';
import { useSessao } from '../contexto/useSessao';
import { useSolicitacoes } from '../contexto/useSolicitacoes';
import {
  buscarCategoriaServico,
  buscarServico,
  caminhoCategoria,
  caminhoServico,
  etapasDoFormulario,
} from '../logica/servicos';

// Solicitar serviço (/servicos/:idServico/solicitar, só com conta): formulário em 3 etapas
// e, depois do envio, a tela "Solicitação enviada" no mesmo endereço.
// Serviço sem formulário online volta para a ficha dele.
export default function SolicitarServico() {
  const { idServico } = useParams();
  const { usuario } = useSessao();
  const { adicionarSolicitacao } = useSolicitacoes();
  const [etapa, setEtapa] = useState(1);
  const [enviada, setEnviada] = useState(null);
  const servico = buscarServico(idServico);

  if (!servico) {
    return (
      <Pagina>
        <NaoEncontrado
          titulo="Não encontramos este serviço"
          texto="O link pode estar incompleto ou o serviço mudou de nome."
          icone="search_off"
        >
          <Botao variante="principal" icone="arrow_forward" iconeDireita para="/servicos">
            Ver todos os serviços
          </Botao>
        </NaoEncontrado>
      </Pagina>
    );
  }
  if (servico.tipo !== 'solicitacao') return <Navigate to={caminhoServico(servico)} replace />;

  if (enviada) return <SolicitacaoEnviada servico={servico} solicitacao={enviada} />;

  const categoria = buscarCategoriaServico(servico.categoria);
  const etapas = etapasDoFormulario(servico);

  // Salva a solicitação e mostra a confirmação no topo da tela
  function enviar(respostas) {
    setEnviada(adicionarSolicitacao(servico, respostas));
    window.scrollTo({ top: 0 });
  }

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="formulario"
          titulo={servico.nome}
          trilha={[
            { rotulo: 'Serviços', para: '/servicos' },
            { rotulo: categoria.nome, para: caminhoCategoria(categoria) },
            { rotulo: servico.nome, para: caminhoServico(servico) },
            { rotulo: 'Solicitar' },
          ]}
          etapas={[...etapas.map((item) => item.nome), 'Revisar']}
          etapaAtual={etapa}
        />
      }
    >
      <FormularioSolicitacao
        servico={servico}
        etapas={etapas}
        etapa={etapa}
        aoMudarEtapa={setEtapa}
        usuario={usuario}
        aoEnviar={enviar}
      />
    </Pagina>
  );
}
