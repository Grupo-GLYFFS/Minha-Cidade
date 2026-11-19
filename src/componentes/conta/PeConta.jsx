import Botao from '../Botao';
import classes from './PeConta.module.css';

// Linha embaixo do formulário com a outra opção (ex.: "Ainda não tem conta? Criar conta").
// Recebe a pergunta, o texto do botão, o destino (para) ou o onClick.
export default function PeConta({ pergunta, acao, para, onClick }) {
  return (
    <p className={classes.pe}>
      {pergunta}
      <Botao variante="texto" para={para} onClick={onClick}>
        {acao}
      </Botao>
    </p>
  );
}
