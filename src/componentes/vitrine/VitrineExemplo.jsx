import classes from './Vitrine.module.css';

// Um exemplo dentro de uma seção da /componentes: rótulo pequeno em cima e o componente embaixo.
// Recebe o rotulo (ex.: "Principal com ícone à direita") e o exemplo (children).
// "linha" põe os exemplos lado a lado, com quebra; "moldura" põe borda em volta
// (para cabeçalhos, que na página de verdade ocupam a largura toda).
export default function VitrineExemplo({ rotulo, linha = false, moldura = false, children }) {
  let classe;
  if (linha) classe = classes.linha;
  if (moldura) classe = classes.cabecalhoExemplo;

  return (
    <div className={classes.exemplo}>
      <p className={classes.rotulo}>{rotulo}</p>
      <div className={classe}>{children}</div>
    </div>
  );
}
