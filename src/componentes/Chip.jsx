import { Link } from 'react-router-dom';
import Icone from './Icone';
import classes from './Chip.module.css';

// Chip de 44: filtro de lista (liga e desliga, com contagem) ou atalho (ícone, leva a uma página).
// Recebe:
// - children: o texto;
// - pressionado: true/false para chip de filtro (aria-pressed); escolhido fica azul-claro;
// - contagem: quantos itens o filtro mostra (opcional);
// - icone: ícone azul antes do texto (atalhos, ex.: "Mais usados");
// - para: rota; o chip vira link (atalho); href: âncora na mesma página (ex.: "#botoes").
//   Sem os dois, é um botão (use onClick).
export default function Chip({ children, pressionado, contagem, icone, para, href, ...props }) {
  const conteudo = (
    <>
      {icone && <Icone nome={icone} tamanho={22} className={classes.icone} />}
      {children}
      {contagem !== undefined && <span className={classes.contagem}>{contagem}</span>}
    </>
  );

  if (para) {
    return (
      <Link to={para} className={classes.chip} {...props}>
        {conteudo}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes.chip} {...props}>
        {conteudo}
      </a>
    );
  }
  return (
    <button type="button" className={classes.chip} aria-pressed={pressionado} {...props}>
      {conteudo}
    </button>
  );
}
