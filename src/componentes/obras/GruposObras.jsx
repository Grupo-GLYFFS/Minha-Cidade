import TituloGrupo from '../TituloGrupo';
import CartaoObraLista from './CartaoObraLista';
import { agruparObras } from '../../logica/obras';
import classes from './GruposObras.module.css';

// Lista de obras agrupada pela situação (Atrasadas, Paradas, No prazo, Concluídas).
// Cada grupo tem o título com bolinha e contagem e a lista de cards.
// Recebe as obras, a base das rotas ("/minha-cidade" ou "/meu-bairro"), o prefixo dos ids
// e o estado do Seguir: segue(id), alternar(id) e logado.
export default function GruposObras({ obras, base, prefixo, segue, alternar, logado }) {
  return (
    <div className={classes.grupos}>
      {agruparObras(obras).map(({ situacao, obras: doGrupo }) => {
        const idTitulo = `${prefixo}-grupo-${situacao.id}`;
        return (
          <section key={situacao.id} aria-labelledby={idTitulo}>
            <TituloGrupo
              titulo={situacao.rotuloPlural}
              contagem={doGrupo.length}
              cor={situacao.cor}
              id={idTitulo}
            />
            <ul className={classes.lista} aria-labelledby={idTitulo}>
              {doGrupo.map((obra) => (
                <li key={obra.id}>
                  <CartaoObraLista
                    obra={obra}
                    para={`${base}/obras/${obra.id}`}
                    seguindo={segue(obra.id)}
                    aoAlternarSeguir={() => alternar(obra.id)}
                    logado={logado}
                  />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
