import { useState } from 'react';
import SecaoCard from '../SecaoCard';
import Botao from '../Botao';
import GrupoBotoes from '../GrupoBotoes';
import CampoTexto from '../CampoTexto';
import Icone from '../Icone';
import EstrelasNota from './EstrelasNota';
import { usePedidos } from '../../contexto/usePedidos';
import { useAvisoTemporario } from '../../contexto/useAvisoTemporario';
import { formatarNoDia } from '../../logica/datasPedido';
import classes from './SecaoAvaliacao.module.css';

// Tamanho máximo do comentário
const LIMITE_COMENTARIO = 500;

// Seção "Avalie o serviço" do pedido concluído da própria pessoa:
// nota de 1 a 5 (estrelas que funcionam como radio), comentário opcional e "Enviar avaliação".
// Depois de enviar (ou num pedido já avaliado), mostra a nota e o comentário.
// Recebe o pedido.
export default function SecaoAvaliacao({ pedido }) {
  const { avaliarPedido } = usePedidos();
  const mostrarAviso = useAvisoTemporario();
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [erro, setErro] = useState('');

  // Já avaliado: mostra o que a pessoa mandou
  if (pedido.status === 'avaliada') {
    const avaliacao = pedido.avaliacao;
    return (
      <SecaoCard titulo="Sua avaliação">
        {avaliacao ? (
          <div className={classes.feita}>
            <EstrelasNota nota={avaliacao.nota} />
            {avaliacao.comentario && <p className={classes.comentario}>{avaliacao.comentario}</p>}
            <p className={classes.meta}>Avaliado {formatarNoDia(avaliacao.em)}</p>
          </div>
        ) : (
          <p className={classes.meta}>Você avaliou este serviço.</p>
        )}
      </SecaoCard>
    );
  }

  // Confere a nota e guarda a avaliação
  function enviar(evento) {
    evento.preventDefault();
    if (!nota) {
      setErro('Escolha uma nota de 1 a 5 estrelas.');
      document.getElementById('nota-1')?.focus();
      return;
    }
    if (avaliarPedido(pedido.id, nota, comentario)) mostrarAviso('Avaliação enviada.');
  }

  return (
    <SecaoCard titulo="Avalie o serviço">
      <form className={classes.formulario} onSubmit={enviar} noValidate>
        <fieldset
          className={classes.grupo}
          aria-describedby={erro ? 'nota-erro' : undefined}
          aria-invalid={erro ? true : undefined}
        >
          <legend className={classes.rotulo}>Sua nota</legend>
          <EstrelasNota
            nome="nota"
            nota={nota}
            aoEscolher={(valor) => {
              setNota(valor);
              setErro('');
            }}
          />
          {erro && (
            <p className={classes.erro} id="nota-erro">
              <Icone nome="error" tamanho={20} />
              {erro}
            </p>
          )}
        </fieldset>
        <CampoTexto
          id="comentario-avaliacao"
          rotulo="Comentário (opcional)"
          multilinha
          maxLength={LIMITE_COMENTARIO}
          value={comentario}
          onChange={(evento) => setComentario(evento.currentTarget.value)}
        />
        <GrupoBotoes>
          <Botao variante="principal" type="submit" icone="send" iconeDireita>
            Enviar avaliação
          </Botao>
        </GrupoBotoes>
      </form>
    </SecaoCard>
  );
}
