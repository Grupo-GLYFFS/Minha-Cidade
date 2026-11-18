import classes from './GrupoBotoes.module.css';

// Grupo de botões lado a lado, alinhado à direita (pares, popups e cards).
// Coloque o secundário antes do principal: o principal fica sempre à direita.
// Recebe os botões (children) e "formulario": Voltar à esquerda e Continuar à direita.
export default function GrupoBotoes({ children, formulario = false }) {
  const classe = formulario ? `${classes.botoes} ${classes.formulario}` : classes.botoes;
  return <div className={classe}>{children}</div>;
}
