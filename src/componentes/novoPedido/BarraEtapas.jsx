import Botao from '../Botao';
import BarraPe from '../celular/BarraPe';
import classes from './NovoPedido.module.css';

// Barra no fim do formulário do Abrir pedido: mostra a etapa, "Passo n de 4", Voltar e o botão
// que avança (Continuar, Revisar ou Enviar pedido). No computador fica estática logo abaixo dos
// campos; no celular ela some e vale a BarraPe fixa acima das abas (o Voltar fica na barra do topo).
// Recebe o nome da etapa, a etapa atual, o total, aoVoltar() e enviando (mostra "Enviando…").
export default function BarraEtapas({ nome, etapa, total, aoVoltar, enviando }) {
  let avancar = 'Continuar';
  let icone = 'arrow_forward';
  if (etapa === total - 1) avancar = 'Revisar';
  if (etapa === total) {
    avancar = enviando ? 'Enviando…' : 'Enviar pedido';
    icone = 'send';
  }

  const botaoAvancar = (
    <Botao variante="principal" type="submit" icone={icone} iconeDireita carregando={enviando}>
      {avancar}
    </Botao>
  );

  return (
    <>
      <div className={classes.barra}>
        <div className={classes.barraTexto}>
          <strong>{nome}</strong>
          <small>
            Passo {etapa} de {total}
          </small>
        </div>
        <div className={classes.barraBotoes}>
          {etapa > 1 && (
            <Botao variante="secundario" icone="arrow_back" onClick={aoVoltar}>
              Voltar
            </Botao>
          )}
          {botaoAvancar}
        </div>
      </div>
      <BarraPe passo={{ nome, rotulo: `Passo ${etapa} de ${total}` }}>{botaoAvancar}</BarraPe>
    </>
  );
}
