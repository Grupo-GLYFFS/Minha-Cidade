import { ODS_ATENDIDOS } from '../../dados/ods';
import classes from './OdsGs.module.css';

// Classe da cor de cada ODS (a cor fica numa variável do global.css)
const CLASSE_ODS = { 11: classes.ods11, 10: classes.ods10, 9: classes.ods9 };

// Faixa "Os ODS que o projeto atende" da Apresentação: 3 placas coloridas iguais
// (ODS 11, 10 e 9), cada uma com o número, o nome e como o app ajuda.
export default function OdsGs() {
  return (
    <section className={classes.faixa} aria-labelledby="gs-ods">
      <div className={classes.miolo}>
        <h2 className={classes.titulo} id="gs-ods">
          Os ODS que o projeto atende
        </h2>
        <ul className={classes.placas}>
          {ODS_ATENDIDOS.map((ods) => (
            <li key={ods.numero} className={`${classes.placa} ${CLASSE_ODS[ods.numero]}`}>
              <p className={classes.numero}>ODS {ods.numero}</p>
              <h3 className={classes.nome}>{ods.nome}</h3>
              <p className={classes.texto}>{ods.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
