import classes from './FormularioSolicitacao.module.css';

// Barra presa no fim da tela do formulário: o nome e o número da etapa à esquerda,
// os botões (Voltar · Continuar/Enviar) à direita. Sem sombra, fundo branco e linha fina em cima.
// Recebe o nome da etapa, o número, o total e os botões (children).
export default function BarraEtapa({ nome, numero, total, children }) {
  return (
    <div className={classes.barra} data-pe-preso="">
      <p className={classes.barraTexto}>
        <strong>{nome}</strong>
        <small>
          Passo {numero} de {total}
        </small>
      </p>
      <div className={classes.barraBotoes}>{children}</div>
    </div>
  );
}
