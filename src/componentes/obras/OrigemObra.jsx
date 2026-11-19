import Icone from '../Icone';
import classes from './OrigemObra.module.css';

// Textos e ícones de onde a obra veio
const ORIGENS = {
  pedido: { icone: 'campaign', texto: 'Veio de um pedido' },
  projeto: { icone: 'how_to_vote', texto: 'Escolhida pelos moradores' },
};

// Etiqueta cinza com a origem da obra ("Veio de um pedido", "Escolhida pelos moradores").
// Recebe a obra; não mostra nada se ela não veio de um pedido nem de uma votação.
export default function OrigemObra({ obra }) {
  const origem = ORIGENS[obra.origem?.tipo];
  if (!origem) return null;
  return (
    <span className={classes.origem}>
      <Icone nome={origem.icone} tamanho={18} />
      {origem.texto}
    </span>
  );
}
