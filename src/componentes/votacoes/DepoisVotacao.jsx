import SecaoCard from '../SecaoCard';
import Botao from '../Botao';
import LinhaEtapas from '../obras/LinhaEtapas';
import BarraPercentual from '../obras/BarraPercentual';
import { OBRAS } from '../../dados/obras';
import { SITUACOES_PROJETO } from '../../dados/statusProjeto';
import { buscarObra } from '../../logica/obras';
import { resultadoCurto } from '../../logica/votacao';
import { dataDetalhe, dataPrevisao } from '../../logica/datasTexto';
import { formatarNumero, formatarValorCurto } from '../../logica/formatos';
import classes from './DepoisVotacao.module.css';

// Seção "Depois da votação" de uma votação encerrada: a linha do tempo do que aconteceu
// (votação encerrada, Câmara ou início do programa, obra em andamento com a barra de % feita).
// Quando virou obra, o botão "Ver a obra" fica na faixa do título.
// Recebe o projeto e o resultado final (de calcularResultado).
export default function DepoisVotacao({ projeto, resultado }) {
  const situacao = SITUACOES_PROJETO.find((item) => item.id === projeto.situacao);
  const obra = projeto.obra ? buscarObra(OBRAS, projeto.obra) : null;

  const etapas = [
    {
      id: 'encerrada',
      rotulo: 'Votação encerrada',
      estado: 'feita',
      data: dataDetalhe(projeto.fimVotacao),
      texto: `${resultadoCurto(resultado).replace(',', ' ·')} · ${formatarNumero(resultado.total)} votos`,
    },
  ];
  if (situacao) {
    etapas.push({
      id: 'situacao',
      rotulo: situacao.rotulo,
      // Sem obra depois, o último passo conhecido é o atual
      estado: obra || situacao.id === 'encaminhado-camara' ? 'feita' : 'atual',
      data: dataDetalhe(projeto.dataSituacao),
    });
  }
  if (obra) {
    etapas.push({
      id: 'obra',
      rotulo: 'Obra em andamento',
      estado: 'atual',
      data: `Desde ${dataDetalhe(obra.inicio)}`,
      extra: (
        <div className={classes.obra}>
          <div className={classes.barra}>
            <BarraPercentual percentual={obra.percentual} />
          </div>
          <p>
            <b>{obra.percentual}% feita</b> · {formatarValorCurto(obra.valorPago)} pagos de{' '}
            {formatarValorCurto(obra.valorTotal)} · previsão {dataPrevisao(obra.previsaoFim)}
          </p>
        </div>
      ),
    });
  } else if (situacao?.id === 'encaminhado-camara') {
    etapas.push({ id: 'camara', rotulo: 'Votação na Câmara', estado: 'futura' });
  }

  return (
    <SecaoCard
      titulo="Depois da votação"
      acao={
        obra && (
          <Botao
            variante="secundario"
            compacto
            icone="arrow_forward"
            iconeDireita
            para={`/minha-cidade/obras/${obra.id}`}
          >
            Ver a obra
          </Botao>
        )
      }
    >
      <LinhaEtapas etapas={etapas} rotulo="Depois da votação" marcarAtual={false} />
    </SecaoCard>
  );
}
