import Botao from '../Botao';
import { MAXIMO_FOTOS } from '../../logica/esquemaNovoPedido';
import classes from './NovoPedido.module.css';

// Miniaturas das fotos escolhidas no Abrir pedido, com o nome embaixo e "n de 3 fotos".
// Recebe as fotos ([{ nome, url }]) e, se quiser, aoTirar(foto): aí cada uma ganha o X.
// adicionar (opcional): o quadrado "Adicionar" no fim da grade, que só aparece no celular.
export default function MiniaturasFotos({ fotos, aoTirar, adicionar }) {
  if (fotos.length === 0 && !adicionar) return null;
  const classesLista = [classes.minis];
  if (!aoTirar) classesLista.push(classes.minisPequenas);
  // Sem fotos, a grade só tem o "Adicionar": no computador ela nem aparece
  if (fotos.length === 0) classesLista.push(classes.minisSoCelular);

  return (
    <>
      <ul className={classesLista.join(' ')}>
        {fotos.map((foto) => (
          <li key={foto.url} className={classes.mini}>
            <span className={classes.miniFoto}>
              <img src={foto.url} alt="" />
              {aoTirar && (
                <Botao
                  variante="fechar"
                  className={classes.miniTirar}
                  aria-label={`Tirar a foto ${foto.nome}`}
                  onClick={() => aoTirar(foto)}
                />
              )}
            </span>
            <span className={classes.miniNome}>{foto.nome}</span>
          </li>
        ))}
        {adicionar && <li className={classes.miniAdicionar}>{adicionar}</li>}
      </ul>
      {fotos.length > 0 && (
        <p className={classes.contaFotos} aria-live="polite">
          {fotos.length} de {MAXIMO_FOTOS} fotos
        </p>
      )}
    </>
  );
}
