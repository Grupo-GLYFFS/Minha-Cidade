import Icone from '../Icone';
import classes from './FormularioSolicitacao.module.css';

// Endereço da conta no formulário (um endereço por pessoa): não é editado aqui.
// Recebe o usuário logado.
export default function EnderecoAtendimento({ usuario }) {
  return (
    <div className={classes.endereco}>
      <span className={classes.enderecoIcone} aria-hidden="true">
        <Icone nome="location_on" />
      </span>
      <div>
        <p className={classes.enderecoRotulo}>Endereço</p>
        <p className={classes.enderecoRua}>
          {usuario.rua}, {usuario.numero}
        </p>
        <p className={classes.enderecoLocal}>
          {usuario.bairro}, {usuario.cidade}
        </p>
      </div>
    </div>
  );
}
