import { Fragment } from 'react';
import Icone from '../Icone';
import classes from './Alertas.module.css';

// Linhas "onde" e "quando" do card do alerta, com ícone e as partes separadas por "·".
// Recebe area (lista de partes) e quando ([início, fim]).
export default function FatosAlerta({ area, quando }) {
  const linhas = [
    { rotulo: 'Área', icone: 'location_on', partes: area },
    { rotulo: 'Quando', icone: 'schedule', partes: quando },
  ];

  return (
    <dl className={classes.fatos}>
      {linhas.map((linha) => (
        <div key={linha.rotulo}>
          <dt>
            <Icone nome={linha.icone} tamanho={20} />
            <span className={classes.oculto}>{linha.rotulo}</span>
          </dt>
          <dd>
            {linha.partes.map((parte, indice) => (
              <Fragment key={parte}>
                {indice > 0 && (
                  <span className={classes.ponto} aria-hidden="true">
                    ·
                  </span>
                )}
                {parte}
              </Fragment>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
