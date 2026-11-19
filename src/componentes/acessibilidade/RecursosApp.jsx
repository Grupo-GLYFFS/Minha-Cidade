import SecaoCard from '../SecaoCard';
import Icone from '../Icone';
import { RECURSOS_ACESSIBILIDADE } from '../../dados/recursosAcessibilidade';
import classes from './RecursosApp.module.css';

// Card "Recursos do app": o que o app já traz de acessibilidade, sem precisar ligar nada.
// Uma linha por recurso (ícone de 20, nome e frase), com divisória de borda a borda.
export default function RecursosApp() {
  return (
    <SecaoCard titulo="Recursos do app" contagem={RECURSOS_ACESSIBILIDADE.length} lista>
      <ul className={classes.lista}>
        {RECURSOS_ACESSIBILIDADE.map((recurso) => (
          <li key={recurso.nome} className={classes.item}>
            <Icone nome={recurso.icone} tamanho={20} className={classes.icone} />
            <div className={classes.textos}>
              <p className={classes.nome}>{recurso.nome}</p>
              <p className={classes.texto}>{recurso.texto}</p>
            </div>
          </li>
        ))}
      </ul>
    </SecaoCard>
  );
}
