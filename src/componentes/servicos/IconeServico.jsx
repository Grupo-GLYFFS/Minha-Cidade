import Icone from '../Icone';
import classes from './IconeServico.module.css';

// Ícone de um serviço num quadrado azul-claro com raio 12 (cards, busca e listas).
// Recebe o nome do ícone e o tamanho do quadrado: 40 (busca) ou 48 (cards e agendamentos).
export default function IconeServico({ nome, tamanho = 48 }) {
  const tamanhoIcone = 24;
  return (
    <span className={`${classes.quadro} ${classes[`q${tamanho}`]}`} aria-hidden="true">
      <Icone nome={nome} tamanho={tamanhoIcone} />
    </span>
  );
}
