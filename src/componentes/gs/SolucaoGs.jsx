import { Link } from 'react-router-dom';
import { AREAS_SOLUCAO } from '../../dados/areasSolucao';
import classes from './SolucaoGs.module.css';

// Seção "A solução" da Apresentação: título, uma frase e as 4 áreas do app lado a lado,
// soltas no fundo da seção. Cada área é um link com o celular da tela e o nome embaixo.
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
          <li key={area.para} className={classes.item}>
            <Link to={area.para} className={classes.area}>
              <img
                className={classes.celular}
                src={area.imagem}
                alt={area.alt}
                width="276"
                height="416"
                loading="lazy"
              />
              <h3 className={classes.nome}>{area.titulo}</h3>
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </section>
  );
}
