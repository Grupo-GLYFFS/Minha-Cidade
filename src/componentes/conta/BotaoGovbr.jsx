import Botao from '../Botao';
import classes from './BotaoGovbr.module.css';

// Botão "Entrar com gov.br" / "Criar com gov.br": secundário de largura total,
// com a palavra gov.br nas cores da marca. Enquanto conecta, mostra o spinner.
// Recebe o verbo ("Entrar" ou "Criar"), carregando e o onClick.
export default function BotaoGovbr({ verbo = 'Entrar', carregando = false, onClick }) {
  return (
    <Botao
      variante="secundario"
      largo
      carregando={carregando}
      desabilitado={carregando}
      onClick={onClick}
      aria-label={carregando ? 'Conectando ao gov.br' : `${verbo} com gov.br`}
      className={classes.botao}
    >
      {carregando ? (
        'Conectando ao gov.br…'
      ) : (
        <>
          {verbo} com
          <span className={classes.marca} aria-hidden="true">
            <i className={classes.g1}>g</i>
            <i className={classes.g2}>o</i>
            <i className={classes.g3}>v</i>
            <i className={classes.g1}>.br</i>
          </span>
        </>
      )}
    </Botao>
  );
}
