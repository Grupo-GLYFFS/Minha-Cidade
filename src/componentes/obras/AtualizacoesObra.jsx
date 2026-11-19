import SecaoCard from '../SecaoCard';
import Icone from '../Icone';
import { dataDetalhe } from '../../logica/datasTexto';
import classes from './AtualizacoesObra.module.css';

// Seção "Atualizações da prefeitura": as mensagens da subprefeitura sobre a obra,
// da mais nova para a mais antiga, cada uma com quem escreveu e a data.
// Recebe a obra.
export default function AtualizacoesObra({ obra }) {
  const autor = `Subprefeitura ${obra.subprefeitura}`;

  return (
    <SecaoCard titulo="Atualizações da prefeitura" lista>
      <ol className={classes.lista}>
        {obra.atualizacoes.map((item) => (
          <li key={`${item.data}-${item.texto}`} className={classes.item}>
            <Icone nome="account_balance" tamanho={20} className={classes.icone} />
            <div>
              <p className={classes.quem}>
                <b>{autor}</b>
                <span aria-hidden="true">·</span>
                <time dateTime={item.data}>{dataDetalhe(item.data)}</time>
              </p>
              <p className={classes.texto}>{item.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </SecaoCard>
  );
}
