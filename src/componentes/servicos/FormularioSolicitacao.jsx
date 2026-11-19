import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Botao from '../Botao';
import ResumoErros from '../ResumoErros';
import CampoSolicitacao from './CampoSolicitacao';
import EnderecoAtendimento from './EnderecoAtendimento';
import RevisaoSolicitacao from './RevisaoSolicitacao';
import BarraEtapa from './BarraEtapa';
import { montarEsquemaServico, validarCampos, valoresIniciais } from '../../logica/esquemaServico';
import { prepararRespostas } from '../../logica/solicitacoes';
import { apagarRascunho, lerRascunho, salvarRascunho } from '../../logica/rascunhos';
import classes from './FormularioSolicitacao.module.css';

// Tempo do "Enviando…", para a pessoa ver que o envio aconteceu
const ESPERA_ENVIO_MS = 700;

// Formulário de solicitação em 3 etapas: as perguntas do serviço, o atendimento
// (endereço da conta, data e período) e a revisão. Cada "Continuar" confere a etapa;
// com erro, aparece o resumo no topo (que recebe o foco) e a mensagem embaixo de cada campo.
// As respostas ficam num rascunho da aba (recarregar não apaga); etapa com uma anterior
// incompleta volta para a primeira que falta.
// Recebe:
// - servico e etapas (de etapasDoFormulario): [{ id, nome, campos }];
// - etapa (1, 2 ou 3) e aoMudarEtapa(numero), que a página guarda para o cabeçalho;
// - usuario e aoEnviar(respostas), que salva e devolve a solicitação.
export default function FormularioSolicitacao({
  servico,
  etapas,
  etapa,
  aoMudarEtapa,
  usuario,
  aoEnviar,
}) {
  const esquema = useMemo(() => montarEsquemaServico(servico.campos ?? []), [servico]);
  const rascunho = `servico:${servico.id}`;
  const [valores, setValores] = useState(() => ({
    ...valoresIniciais(servico.campos ?? []),
    ...lerRascunho(rascunho),
  }));
  const [erros, setErros] = useState({});
  const [confirmado, setConfirmado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // Guarda o rascunho a cada resposta
  useEffect(() => {
    salvarRascunho(rascunho, valores);
  }, [rascunho, valores]);

  const total = etapas.length + 1;
  // Primeira etapa com resposta faltando (a pessoa não passa dela pelo endereço)
  const liberada =
    etapas.findIndex(
      (item) =>
        Object.keys(
          validarCampos(
            esquema,
            item.campos.map((campo) => campo.nome),
            valores,
          ),
        ).length > 0,
    ) + 1 || total;
  const ehRevisao = etapa === total;
  const atual = etapas[etapa - 1];
  const nomeEtapa = ehRevisao ? 'Revisar' : atual.nome;

  // Guarda a resposta e apaga o erro do campo, que volta a ser conferido no "Continuar"
  function mudar(nome, valor) {
    setValores((antes) => ({ ...antes, [nome]: valor }));
    setErros((antes) => {
      if (!antes[nome]) return antes;
      const resto = { ...antes };
      delete resto[nome];
      return resto;
    });
  }

  // Troca de etapa e volta a tela para o começo do formulário
  function irPara(numero) {
    setErros({});
    aoMudarEtapa(numero);
    window.scrollTo({ top: 0 });
  }

  // Confere a etapa atual; sem erros, segue para a próxima
  function continuar(evento) {
    evento.preventDefault();
    const encontrados = validarCampos(
      esquema,
      atual.campos.map((campo) => campo.nome),
      valores,
    );
    setErros(encontrados);
    if (Object.keys(encontrados).length === 0) irPara(etapa + 1);
  }

  // Confere a confirmação e envia
  function enviar(evento) {
    evento.preventDefault();
    if (enviando) return;
    if (!confirmado) {
      setErros({ confirmacao: 'Marque a confirmação de que as informações estão corretas.' });
      return;
    }
    setEnviando(true);
    const campos = etapas.flatMap((item) => item.campos);
    // Simula o tempo de resposta da prefeitura; enviada, o rascunho sai da aba
    setTimeout(() => {
      apagarRascunho(rascunho);
      aoEnviar(prepararRespostas(campos, valores));
    }, ESPERA_ENVIO_MS);
  }

  // Lista do resumo de erros, na ordem dos campos na tela
  const listaErros = ehRevisao
    ? Object.entries(erros).map(([campo, mensagem]) => ({ campo, rotulo: 'Confirmação', mensagem }))
    : atual.campos
        .filter((campo) => erros[campo.nome])
        .map((campo) => ({ campo: campo.nome, rotulo: campo.rotulo, mensagem: erros[campo.nome] }));

  const quantos = listaErros.length;
  const tituloErros =
    quantos === 1
      ? 'Corrija o campo marcado para continuar.'
      : `Corrija os ${quantos} campos marcados para continuar.`;

  if (etapa > liberada) {
    return <Navigate to={{ search: liberada === 1 ? '' : `?etapa=${liberada}` }} replace />;
  }

  return (
    <form className={classes.formulario} onSubmit={ehRevisao ? enviar : continuar} noValidate>
      <div className={classes.cartao}>
        <ResumoErros erros={listaErros} titulo={tituloErros} />

        {ehRevisao ? (
          <RevisaoSolicitacao
            etapas={etapas}
            valores={valores}
            usuario={usuario}
            aoAlterar={irPara}
            confirmado={confirmado}
            aoConfirmar={(marcado) => {
              setConfirmado(marcado);
              if (marcado) setErros({});
            }}
            erro={erros.confirmacao}
          />
        ) : (
          <>
            <h2 className={classes.tituloCard}>{atual.nome}</h2>
            {atual.id === 'atendimento' && <EnderecoAtendimento usuario={usuario} />}
            {atual.campos.map((campo) => (
              <CampoSolicitacao
                key={campo.nome}
                campo={campo}
                valor={valores[campo.nome]}
                aoMudar={(valor) => mudar(campo.nome, valor)}
                erro={erros[campo.nome]}
              />
            ))}
          </>
        )}
      </div>

      <BarraEtapa nome={nomeEtapa} numero={etapa} total={total}>
        {etapa > 1 && (
          <Botao variante="secundario" icone="arrow_back" onClick={() => irPara(etapa - 1)}>
            Voltar
          </Botao>
        )}
        {ehRevisao ? (
          <Botao variante="principal" type="submit" icone="send" iconeDireita carregando={enviando}>
            {enviando ? 'Enviando…' : 'Enviar solicitação'}
          </Botao>
        ) : (
          <Botao variante="principal" type="submit" icone="arrow_forward" iconeDireita>
            Continuar
          </Botao>
        )}
      </BarraEtapa>
    </form>
  );
}
