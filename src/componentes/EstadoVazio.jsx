import Icone from './Icone';
import classes from './Estados.module.css';

// Estado vazio de uma lista (ou busca sem resultado): caixa tracejada no lugar da lista.
// Diz o que aconteceu e o que fazer. O cabeçalho e os controles da página continuam visíveis.
// Recebe o icone (padrão "inbox"; busca sem resultado: "search_off"), o titulo, o texto
// e, se quiser, os botões do próximo passo (children).
export default function EstadoVazio({ icone = 'inbox', titulo, texto, children }) {
  return (
    <div className={classes.vazio}>
      <span className={classes.icone}>
        <Icone nome={icone} tamanho={28} />
      </span>
      {titulo && <h3 className={classes.titulo}>{titulo}</h3>}
      {texto && <p className={classes.texto}>{texto}</p>}
      {children && <div className={classes.acoes}>{children}</div>}
    </div>
  );
}
