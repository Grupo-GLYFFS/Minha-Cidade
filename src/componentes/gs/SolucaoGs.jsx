import { Link } from 'react-router-dom';
import Icone from '../Icone';
import { AREAS_SOLUCAO } from '../../dados/areasSolucao';
import { SERVICOS } from '../../dados/servicos';
import classes from './SolucaoGs.module.css';

// Seção "A solução" da Apresentação: título, uma frase e um painel azul-claro com as
// 4 áreas do app lado a lado. Cada área é um link com o celular da tela, o nome,
// um texto curto e o "Ver…". O texto de Serviços começa pela quantidade do catálogo.
// Recebe children: o que vem depois do painel (a faixa "Conheça o projeto").
export default function SolucaoGs({ children }) {
  return (
    <section className={classes.secao} aria-labelledby="gs-solucao">
      <h2 className={classes.titulo} id="gs-solucao">
        A solução: a prefeitura inteira no celular
      </h2>
      <p className={classes.frase}>
        Organizada pelo que a pessoa precisa, e não pelo nome da secretaria.
      </p>
      <ul className={classes.painel}>
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
              <p className={classes.texto}>
                {area.para === '/servicos' ? `${SERVICOS.length} ${area.texto}` : area.texto}
              </p>
              <span className={classes.ver}>
                {area.link}
                <Icone nome="arrow_forward" tamanho={24} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </section>
  );
}
