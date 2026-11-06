import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Text, Title } from '@mantine/core';
import LinkVoltar from '../componentes/LinkVoltar';
import CatalogoNaoEncontrado from '../componentes/servicos/CatalogoNaoEncontrado';
import FormularioServico from '../componentes/formularioServico/FormularioServico';
import ResumoServico from '../componentes/formularioServico/ResumoServico';
import SemFormulario from '../componentes/formularioServico/SemFormulario';
import SolicitacaoEnviada from '../componentes/formularioServico/SolicitacaoEnviada';
import { useSolicitacoes } from '../contexto/useSolicitacoes';
import { buscarServico, caminhoServico } from '../logica/servicos';
import { prepararRespostas } from '../logica/solicitacoes';
import classes from './SolicitarServico.module.css';

// Tempo do envio simulado, para o botão mostrar que está enviando
const ESPERA_ENVIO_MS = 800;

// Espera um tempo. Recebe os milissegundos; devolve uma promessa que termina depois dele.
function esperar(ms) {
  return new Promise((resolver) => setTimeout(resolver, ms));
}

// Formulário online de um serviço (/servicos/agendar-consulta/solicitar), montado a partir
// de servico.campos. Depois do envio, a mesma página mostra o protocolo no lugar do formulário.
// Serviço que não existe ou sem formulário online: mensagem com o caminho de volta.
export default function SolicitarServico() {
  const { idServico } = useParams();
  const servico = buscarServico(idServico);
  const { adicionarSolicitacao } = useSolicitacoes();
  // Solicitação recém-enviada: só vale para o serviço em que foi feita
  const [envio, setEnvio] = useState(null);
  const enviada = envio?.idServico === idServico ? envio : null;

  // Ao abrir outro serviço, começa a página do topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [idServico]);

  if (!servico) return <CatalogoNaoEncontrado titulo="Serviço não encontrado" />;
  if (servico.tipo !== 'solicitacao') return <SemFormulario servico={servico} />;

  // Recebe os valores já validados; simula o envio e guarda a solicitação
  async function enviar(valores) {
    await esperar(ESPERA_ENVIO_MS);
    setEnvio(adicionarSolicitacao(servico, prepararRespostas(servico.campos, valores)));
  }

  return (
    <Stack gap="lg">
      <header>
        <LinkVoltar caminho={caminhoServico(servico)} rotulo="Voltar para o serviço" />
        <Text fz="sm" fw={700} c="var(--cor-texto-suave)" mt={4}>
          Solicitação online
        </Text>
        <Title order={1} fz={{ base: 26, md: 32 }} lh={1.15} lts="-0.02em" mt={4}>
          {servico.nome}
        </Title>
        <Text c="var(--cor-texto-suave)" fz={{ base: 15, md: 17 }} mt="sm" maw={720}>
          {servico.resumo}
        </Text>
      </header>

      {/* O resumo vem antes no código, como no celular; no computador ele vai para a direita.
          Depois do envio ele some: o prazo já aparece na confirmação */}
      <div className={classes.grade}>
        {!enviada && (
          <div className={classes.lateral}>
            <ResumoServico servico={servico} />
          </div>
        )}
        <div className={classes.principal}>
          {enviada ? (
            <SolicitacaoEnviada servico={servico} solicitacao={enviada} />
          ) : (
            // A chave recria o formulário (vazio) ao trocar de serviço na mesma página
            <FormularioServico key={servico.id} servico={servico} aoEnviar={enviar} />
          )}
        </div>
      </div>
    </Stack>
  );
}
