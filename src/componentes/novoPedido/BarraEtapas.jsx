import Botao from '../Botao';
import classes from './NovoPedido.module.css';

// Barra presa no pé da tela durante o Abrir pedido (regra das barras presas: sem sombra,
// fundo branco e linha fina em cima). Mostra a etapa, "Passo n de 4", Voltar e o botão
// que avança (Continuar, Revisar ou Enviar pedido). O botão de avançar é o submit do formulário.
// Recebe o nome da etapa, a etapa atual, o total, aoVoltar() e enviando (mostra "Enviando…").
export default function BarraEtapas({ nome, etapa, total, aoVoltar, enviando }) {
  let avancar = 'Continuar';
  let icone = 'arrow_forward';
  if (etapa === total - 1) avancar = 'Revisar';
  if (etapa === total) {
    avancar = enviando ? 'Enviando…' : 'Enviar pedido';
    icone = 'send';
  }

  return (
    <div className={classes.barra} data-pe-preso="">
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
        <Botao variante="principal" type="submit" icone={icone} iconeDireita carregando={enviando}>
          {avancar}
        </Botao>
      </div>
    </div>
  );
}
