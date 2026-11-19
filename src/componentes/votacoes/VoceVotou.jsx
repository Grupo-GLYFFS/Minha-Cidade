import Icone from '../Icone';
import { buscarOpcaoVoto } from '../../logica/votacao';
import classes from './VoceVotou.module.css';

// Selo azul-claro "Você votou Sim" (ou Não), no canto do card da votação.
// Recebe o voto ("sim" ou "nao").
export default function VoceVotou({ voto }) {
  const opcao = buscarOpcaoVoto(voto);
  return (
    <span className={classes.selo}>
      <Icone nome="check" tamanho={18} />
      Você votou {opcao?.rotulo}
    </span>
  );
}
