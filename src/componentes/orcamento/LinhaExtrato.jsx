import { Link } from 'react-router-dom';
import Icone from '../Icone';
import classes from './LinhaExtrato.module.css';

// Uma linha do extrato: nome (com um detalhe pequeno ao lado), pontilhado até os valores,
// o valor principal em negrito e o segundo valor na coluna da direita.
// Recebe:
// - nome, detalhe (texto pequeno) e extra (ex.: um selo de situação, depois do nome);
// - valor e segundo (o "—" aparece quando o segundo é null);
// - total: linha de total (nome em negrito e linha cheia em vez do pontilhado);
// - recuo: linha filha (um passo para dentro, nome em cinza);
// - para: o nome vira link e aparece o chevron_right no fim;
// - destaque: fundo azul-claro (ex.: a subprefeitura da pessoa).
export default function LinhaExtrato({
  nome,
  detalhe,
  extra,
  valor,
  segundo,
  total = false,
  recuo = false,
  para,
  destaque = false,
}) {
  const lista = [classes.linha];
  if (total) lista.push(classes.total);
  if (recuo) lista.push(classes.recuo);
  if (para) lista.push(classes.comLink);
  if (destaque) lista.push(classes.destaque);

  return (
    <p className={lista.join(' ')}>
      <span className={classes.nome}>
        {para ? (
          <Link to={para} className={classes.link}>
            {nome}
          </Link>
        ) : (
          nome
        )}
        {detalhe && <small> {detalhe}</small>}
      </span>
      {extra}
      <span className={classes.pontos} aria-hidden="true" />
      <b className={classes.valor}>{valor}</b>
      {segundo !== undefined && <span className={classes.segundo}>{segundo ?? '—'}</span>}
      {para && <Icone nome="chevron_right" tamanho={20} className={classes.chevron} />}
    </p>
  );
}
