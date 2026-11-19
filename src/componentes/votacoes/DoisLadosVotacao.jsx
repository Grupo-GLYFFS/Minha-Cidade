import SecaoCard from '../SecaoCard';
import Icone from '../Icone';
import classes from './DoisLadosVotacao.module.css';

// Seção "Os dois lados": quadro verde "A favor" e quadro vermelho "Contra", um embaixo do outro.
// A cor só reforça: cada quadro tem título e ícone próprios.
// Recebe os pros e os contras (listas de frases).
export default function DoisLadosVotacao({ pros, contras }) {
  const lados = [
    { id: 'favor', titulo: 'A favor', icone: 'thumb_up', marca: 'check_circle', itens: pros },
    { id: 'contra', titulo: 'Contra', icone: 'thumb_down', marca: 'cancel', itens: contras },
  ];

  return (
    <SecaoCard titulo="Os dois lados">
      <div className={classes.lados}>
        {lados.map((lado) => (
          <div key={lado.id} className={classes[lado.id]}>
            <h3 className={classes.titulo}>
              <Icone nome={lado.icone} tamanho={22} />
              {lado.titulo}
            </h3>
            <ul className={classes.lista}>
              {lado.itens.map((item) => (
                <li key={item}>
                  <Icone nome={lado.marca} tamanho={20} className={classes.marca} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SecaoCard>
  );
}
