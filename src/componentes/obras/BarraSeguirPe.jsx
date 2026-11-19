import classes from './BarraSeguirPe.module.css';

// Barra do pé do detalhe (obra e votação), só no celular: o Seguir sai do cabeçalho e fica
// preso embaixo, acima da barra de abas, na largura toda. No computador ela não aparece.
// Um espaço do mesmo tamanho fica no fim da página, para a barra não cobrir o conteúdo.
// Recebe o botão (children), em geral o BotaoSeguir.
export default function BarraSeguirPe({ children }) {
  return (
    <div className={classes.espaco}>
      <div className={classes.barra} data-pe-preso="">
        {children}
      </div>
    </div>
  );
}
