import TituloGrupo from '../TituloGrupo';
import CardNotificacao from './CardNotificacao';
import { agruparPorDia } from '../../logica/notificacoes';
import classes from './ListaPorDia.module.css';

// Notificações da página agrupadas por dia: título do grupo ("Hoje, 13 de novembro" + contagem)
// e os cards do dia numa lista ordenada (mais nova primeiro).
// Recebe as notificações, o prefixo dos ids (um por aba) e aoAbrir(id).
export default function ListaPorDia({ notificacoes, prefixo, aoAbrir }) {
  const grupos = agruparPorDia(notificacoes);

  return (
    <div className={classes.dias}>
      {grupos.map((grupo) => {
        const idTitulo = `${prefixo}-${grupo.data}`;
        return (
          <section key={grupo.data} aria-labelledby={idTitulo}>
            <TituloGrupo
              id={idTitulo}
              titulo={
                <>
                  {grupo.nome}
                  <span className={classes.dia}>, {grupo.dia}</span>
                </>
              }
              contagem={grupo.itens.length}
            />
            <ol className={classes.lista}>
              {grupo.itens.map((item) => (
                <CardNotificacao key={item.id} notificacao={item} aoAbrir={aoAbrir} />
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
