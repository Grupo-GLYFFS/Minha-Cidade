import { Link } from 'react-router-dom';
import Icone from '../Icone';
import IconeServico from './IconeServico';
import { caminhoCardServico, nomeSubcategoria } from '../../logica/servicos';
import classes from './CardServico.module.css';

// Card de um serviço no catálogo e nos relacionados: ícone, nome, a parte do assunto
// e a seta. O card inteiro é o link (para a ficha ou direto para a tela do app).
// Recebe o serviço.
// emLista: no celular vira uma linha dentro do card do grupo (ícone simples de 22 e chevron).
export default function CardServico({ servico, emLista = false }) {
  return (
    <Link
      to={caminhoCardServico(servico)}
      className={emLista ? `${classes.card} ${classes.linha}` : classes.card}
    >
      <IconeServico nome={servico.icone} />
      <span className={classes.texto}>
        <span className={classes.nome}>{servico.nome}</span>
        <span className={classes.meta}>{nomeSubcategoria(servico)}</span>
      </span>
      <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
      {emLista && <Icone nome="chevron_right" tamanho={22} className={classes.chevron} />}
    </Link>
  );
}
