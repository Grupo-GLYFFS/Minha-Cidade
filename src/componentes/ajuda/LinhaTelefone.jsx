import Icone from '../Icone';
import classes from './LinhaTelefone.module.css';

// Uma linha da página Telefones úteis: ícone, nome, para que serve e o número em azul.
// A linha inteira é um link tel: (no celular, toca para ligar).
// Recebe o telefone: { numero, nome, paraQuem, icone, descricao }.
export default function LinhaTelefone({ telefone }) {
  const { numero, nome, paraQuem, icone, descricao } = telefone;
  const discar = numero.replace(/\D/g, '');

  return (
    <li className={classes.item}>
      <a
        className={classes.linha}
        href={`tel:${discar}`}
        aria-label={`Ligar para ${paraQuem}, ${numero}`}
      >
        <Icone nome={icone} tamanho={20} className={classes.icone} />
        <span className={classes.texto}>
          <span className={classes.nome}>{nome}</span>
          <span className={classes.uso}>{descricao}</span>
        </span>
        <span className={classes.numero}>{numero}</span>
      </a>
    </li>
  );
}
