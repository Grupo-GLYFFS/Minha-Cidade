import Cartao from '../Cartao';
import Icone from '../Icone';
import { AREAS_SOLUCAO } from '../../dados/areasSolucao';
import { SERVICOS } from '../../dados/servicos';
import classes from './SolucaoGs.module.css';

// Seção "A solução" da Apresentação: título, uma frase e as 4 áreas do app em cards-link.
// O card de Serviços mostra quantos serviços o catálogo tem.
// Recebe children: o que vem depois dos cards (a faixa "Conheça o projeto").
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
          <li key={area.para}>
            <Cartao para={area.para} seta className={classes.card}>
              <Icone nome={area.icone} tamanho={28} className={classes.icone} />
              <h3 className={classes.nome}>{area.titulo}</h3>
              <p className={classes.texto}>
                {area.para === '/servicos' ? `${SERVICOS.length} ${area.texto}` : area.texto}
              </p>
            </Cartao>
          </li>
        ))}
      </ul>
      {children}
    </section>
  );
}
