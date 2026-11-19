import LinhaTelefone from './LinhaTelefone';
import classes from './LinhaTelefone.module.css';

// Lista de telefones de um grupo, dentro de um <SecaoCard lista>.
// Recebe os telefones [{ numero, nome, paraQuem, icone, descricao }].
export default function ListaTelefones({ telefones }) {
  return (
    <ul className={classes.lista}>
      {telefones.map((telefone) => (
        <LinhaTelefone key={telefone.numero} telefone={telefone} />
      ))}
    </ul>
  );
}
