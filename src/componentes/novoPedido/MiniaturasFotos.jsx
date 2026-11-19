import Botao from '../Botao';
import { MAXIMO_FOTOS } from '../../logica/esquemaNovoPedido';
import classes from './NovoPedido.module.css';

// Miniaturas das fotos escolhidas no Abrir pedido, com o nome embaixo e "n de 3 fotos".
// Recebe as fotos ([{ nome, url }]) e, se quiser, aoTirar(foto): aí cada uma ganha o X.
export default function MiniaturasFotos({ fotos, aoTirar }) {
  if (fotos.length === 0) return null;

  return (
    <>
      <ul className={aoTirar ? classes.minis : `${classes.minis} ${classes.minisPequenas}`}>
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
      </ul>
      <p className={classes.contaFotos} aria-live="polite">
        {fotos.length} de {MAXIMO_FOTOS} fotos
      </p>
    </>
  );
}
