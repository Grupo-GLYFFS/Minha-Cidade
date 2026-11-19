import classes from './BarraPe.module.css';

// Barra presa no pé da tela, só no celular (no computador ela não aparece).
// Fica acima da barra de abas, de borda a borda, com fundo branco e linha fina em cima.
// Usada no detalhe (Seguir | Apoiar, metade cada um) e nos formulários (etapa + botão principal).
// Recebe o conteúdo (children) e o tipo: "dois" (dois botões lado a lado)
// ou "passo" (nome da etapa e "Passo x de N" à esquerda, botão principal à direita).
// Vai no fim do conteúdo da página: fica presa no pé enquanto a página rola.
export default function BarraPe({ tipo = 'dois', children }) {
  const lista = [classes.pe, tipo === 'passo' ? classes.passo : classes.dois];
  return (
    <div className={lista.join(' ')} data-pe-preso="">
      {children}
    </div>
  );
}
