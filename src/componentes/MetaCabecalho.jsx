import classes from './MetaCabecalho.module.css';

// Linha de metadados centralizada no cabeçalho de um detalhe (selo de situação, prazo, votos…).
// Recebe os itens como children; um <Icone> dentro de um item fica azul.
// Ex.: <MetaCabecalho><SeloSituacao cor="verde">No prazo</SeloSituacao><span>Moema</span></MetaCabecalho>
export default function MetaCabecalho({ children }) {
  return <div className={classes.meta}>{children}</div>;
}
