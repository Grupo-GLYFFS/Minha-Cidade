import { useState } from 'react';
import Icone from '../Icone';
import Popup from '../Popup';
import Botao from '../Botao';
import IlustracaoPedido from './IlustracaoPedido';
import { imagemDoPedido } from '../../logica/pedidos';
import classes from './DetalhePedido.module.css';

// Fotos de quem relatou o pedido, em miniaturas de 120.
// Nos exemplos com desenho, cada miniatura abre a foto grande num popup.
// Nos pedidos abertos no app só existe o nome do arquivo (o protótipo não guarda a foto).
// Recebe o pedido (usa fotos e ilustracao).
export default function FotosRelatadas({ pedido }) {
  const [aberta, setAberta] = useState(null);
  const fotos = pedido.fotos ?? [];
  if (fotos.length === 0) return null;
  const total = fotos.length;
  // Nos exemplos, a foto da categoria entra no lugar do desenho (que fica de reserva)
  const imagem = imagemDoPedido(pedido);
  const altGrande = `Foto enviada por quem relatou: ${pedido.titulo}`;

  return (
    <>
      <ul className={classes.fotos} aria-label="Fotos de quem relatou">
        {fotos.map((nome, indice) => (
          <li key={nome}>
            {pedido.ilustracao ? (
              <button
                type="button"
                className={classes.foto}
                aria-label={`Ver foto ${indice + 1} de ${total}`}
                onClick={() => setAberta(indice)}
              >
                {imagem ? (
                  <img src={imagem.src} alt="" />
                ) : (
                  <IlustracaoPedido nome={pedido.ilustracao} />
                )}
              </button>
            ) : (
              <span className={classes.foto}>
                <Icone nome="image" tamanho={28} />
                <span className={classes.oculto}>{nome}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
      <Popup
        aberto={aberta !== null}
        aoFechar={() => setAberta(null)}
        titulo={`Foto ${(aberta ?? 0) + 1} de ${total}`}
        botoes={
          <Botao variante="secundario" onClick={() => setAberta(null)}>
            Fechar
          </Botao>
        }
      >
        <div className={classes.fotoGrande}>
          {imagem ? (
            <img src={imagem.src} alt={altGrande} />
          ) : (
            <IlustracaoPedido nome={pedido.ilustracao} alt={altGrande} />
          )}
        </div>
      </Popup>
    </>
  );
}
