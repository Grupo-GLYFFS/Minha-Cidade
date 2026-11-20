import { AREAS_SOLUCAO } from '../../dados/areasSolucao';
import TelaSolucao from './TelaSolucao';
import classes from './SolucaoGs.module.css';

// Seção "A solução" da Apresentação: título, uma frase e as 4 áreas do app lado a lado,
// soltas no fundo da seção. Cada área é o celular desenhado da tela e o nome embaixo, sem link.
// Recebe children: o que vem depois dos celulares (a faixa "Conheça o projeto").
export default function SolucaoGs({ children }) {
  return (
    <section className={classes.secao} aria-labelledby="gs-solucao">
      <h2 className={classes.titulo} id="gs-solucao">
        A solução: a prefeitura inteira no celular
      </h2>
      <p className={classes.frase}>
        Organizada pelo que a pessoa precisa, e não pelo nome da secretaria.
      </p>
      <ul className={classes.areas}>
        {AREAS_SOLUCAO.map((area) => (
          <li key={area.tela} className={classes.item}>
            <div className={classes.area}>
              <TelaSolucao tela={area.tela} alt={area.alt} />
              <h3 className={classes.nome}>{area.titulo}</h3>
            </div>
          </li>
        ))}
      </ul>
      {children}
    </section>
  );
}
