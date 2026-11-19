import Icone from '../Icone';
import classes from './EnderecoEncontrado.module.css';

// Resultado da busca do CEP no cadastro: o endereço achado e o bairro que a pessoa vai ter no app.
// Recebe rua, bairro, distrito (um dos 96; vazio quando a pessoa ainda vai escolher)
// e cep (já com máscara). Sem rua (CEP geral), mostra só o bairro.
export default function EnderecoEncontrado({ rua, bairro, distrito, cep }) {
  return (
    <>
      <div className={classes.endereco} role="status">
        <span className={classes.icone}>
          <Icone nome="check_circle" preenchido />
        </span>
        <span className={classes.rotulo}>Endereço encontrado</span>
        {rua && <span className={classes.rua}>{rua}</span>}
        <span className={classes.local}>
          {bairro} · São Paulo - SP · CEP {cep}
        </span>
      </div>
      {distrito && (
        <p className={classes.bairro}>
          <Icone nome="home_pin" />
          <span>
            Seu bairro no app vai ser <b>{distrito}</b>.
          </span>
        </p>
      )}
    </>
  );
}
