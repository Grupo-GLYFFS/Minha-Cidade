import Icone from '../Icone';
import classes from './SeloTipo.module.css';

// Ícone e nome de cada tipo de item que a pessoa pode seguir
const TIPOS = {
  obra: { icone: 'construction', rotulo: 'Obra' },
  pedido: { icone: 'assignment', rotulo: 'Pedido' },
  votacao: { icone: 'how_to_vote', rotulo: 'Votação' },
};

// Selo do tipo do item ("Obra", "Pedido" ou "Votação") nas listas do que a pessoa segue.
// Pílula azul-tinta com ícone e texto brancos; é diferente do selo de situação.
// Recebe o tipo ("obra", "pedido" ou "votacao").
export default function SeloTipo({ tipo }) {
  const { icone, rotulo } = TIPOS[tipo];
  return (
    <span className={classes.selo}>
      <Icone nome={icone} tamanho={16} />
      {rotulo}
    </span>
  );
}
