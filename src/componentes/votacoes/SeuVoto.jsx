import { useEffect, useRef, useState } from 'react';
import SecaoCard from '../SecaoCard';
import Botao from '../Botao';
import Icone from '../Icone';
import PopupVoto from './PopupVoto';
import BarrasResultado from './BarrasResultado';
import { useVotos } from '../../contexto/useVotos';
import { useCaminhoConta } from '../../contexto/useCaminhoConta';
import { useAvisoTemporario } from '../../contexto/useAvisoTemporario';
import { buscarOpcaoVoto } from '../../logica/votacao';
import { dataDiaMes } from '../../logica/datasTexto';
import { formatarNumero } from '../../logica/formatos';
import classes from './SeuVoto.module.css';

// Seção "Seu voto" de uma votação aberta, em três estados:
// - visitante: "Entre para votar", com Criar conta e Entrar;
// - pode votar: as regras em uma linha e o botão Votar, que abre a caixa do voto;
// - já votou: "Você votou Sim" e o resultado parcial (só Sim e Não).
// Recebe o projeto.
export default function SeuVoto({ projeto }) {
  const { votoDe, explicarSemVoto, votar, resultado } = useVotos();
  const { entrar, criarConta } = useCaminhoConta();
  const mostrarAviso = useAvisoTemporario();
  const [aberto, setAberto] = useState(false);
  const [acabouDeVotar, setAcabouDeVotar] = useState(false);
  const caixa = useRef(null);

  const voto = votoDe(projeto.id);
  const motivo = explicarSemVoto(projeto);
  const prazo = dataDiaMes(projeto.fimVotacao);

  // Depois de votar, o foco vai para a seção, para o leitor de tela ouvir o resultado
  useEffect(() => {
    if (acabouDeVotar) caixa.current?.focus();
  }, [acabouDeVotar]);

  // Registra o voto escolhido na caixa e fecha
  function confirmar(opcao) {
    if (votar(projeto.id, opcao)) {
      setAcabouDeVotar(true);
      mostrarAviso(`Voto registrado: ${buscarOpcaoVoto(opcao)?.rotulo}.`, '/perfil/votos');
    }
    setAberto(false);
  }

  let corpo;
  if (voto) {
    const atual = resultado(projeto);
    corpo = (
      <>
        <p className={classes.confirmado}>
          <Icone nome="check_circle" tamanho={22} preenchido />
          <span>
            Você votou <b>{buscarOpcaoVoto(voto)?.rotulo}</b>. O voto é de uma pessoa só e não muda.
          </span>
        </p>
        <BarrasResultado resultado={atual} voto={voto} />
        <p className={classes.nota}>
          Resultado parcial com {formatarNumero(atual.total)} votos. O final sai em {prazo}.
        </p>
      </>
    );
  } else if (motivo === 'visitante') {
    corpo = (
      <div className={classes.entrar}>
        <span className={classes.cadeado} aria-hidden="true">
          <Icone nome="lock" tamanho={24} />
        </span>
        <div className={classes.entrarTexto}>
          <h3>Entre para votar</h3>
          <p>Cada pessoa vota uma vez, com a conta do Minha Prefeitura.</p>
        </div>
        <div className={classes.entrarBotoes}>
          <Botao variante="secundario" compacto para={criarConta}>
            Criar conta
          </Botao>
          <Botao variante="principal" compacto para={entrar}>
            Entrar
          </Botao>
        </div>
      </div>
    );
  } else {
    corpo = (
      <>
        <p className={classes.regra}>
          Sim ou Não. Um voto por pessoa, até {prazo}. Quem não vota fica de fora da conta.
        </p>
        <Botao
          variante="principal"
          largo
          icone="how_to_vote"
          aria-haspopup="dialog"
          onClick={() => setAberto(true)}
        >
          Votar
        </Botao>
        <PopupVoto
          aberto={aberto}
          aoFechar={() => setAberto(false)}
          projeto={projeto}
          aoConfirmar={confirmar}
        />
      </>
    );
  }

  return (
    <SecaoCard titulo="Seu voto">
      <div ref={caixa} tabIndex={-1} className={classes.caixa}>
        {corpo}
      </div>
    </SecaoCard>
  );
}
