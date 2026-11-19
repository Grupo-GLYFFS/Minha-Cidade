import SecaoCard from '../SecaoCard';
import Icone from '../Icone';
import classes from './CardColunas.module.css';

// Card de seção com 3 colunas separadas por divisórias de borda a borda
// ("Para a prefeitura" em Como funciona, "O que muda" em Impacto).
// Recebe o título (h2) e os itens [{ icone, titulo, texto }].
export default function CardColunas({ titulo, itens }) {
  return (
    <SecaoCard titulo={titulo} lista>
      <ul className={classes.colunas}>
        {itens.map((item) => (
          <li key={item.titulo} className={classes.coluna}>
            <Icone nome={item.icone} tamanho={24} className={classes.icone} />
            <h3 className={classes.titulo}>{item.titulo}</h3>
            <p className={classes.texto}>{item.texto}</p>
          </li>
        ))}
      </ul>
    </SecaoCard>
  );
}
