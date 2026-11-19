import Botao from '../Botao';
import BarraPe from '../celular/BarraPe';
import classes from './NovoPedido.module.css';

// Barra presa no pé da tela durante o Abrir pedido (regra das barras presas: sem sombra,
// fundo branco e linha fina em cima). Mostra a etapa, "Passo n de 4", Voltar e o botão
// que avança (Continuar, Revisar ou Enviar pedido). O botão de avançar é o submit do formulário.
// No celular esta barra some e vale a BarraPe: etapa e passo à esquerda e só o botão de avançar
// (o Voltar fica na barra do topo).
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
          {botaoAvancar}
        </div>
      </div>
      <BarraPe passo={{ nome, rotulo: `Passo ${etapa} de ${total}` }}>{botaoAvancar}</BarraPe>
    </>
  );
}
