import { Title } from '@mantine/core';
import Cartao from '../Cartao';
import ItemAlerta from './ItemAlerta';
import classes from './GrupoAlertas.module.css';

// Um grupo da lista de alertas ("Novos" ou "Anteriores"): título e os alertas em um cartão.
// Recebe o id (para ligar título e lista), o título, os alertas e aoAbrir(id).
export default function GrupoAlertas({ id, titulo, alertas, aoAbrir }) {
  const idTitulo = `alertas-${id}`;

  return (
    <section aria-labelledby={idTitulo}>
      <Title order={2} id={idTitulo} fz={{ base: 18, md: 20 }} fw={700} mb="sm">
        {titulo}
      </Title>
      <Cartao p="sm">
        <ul className={classes.lista}>
          {alertas.map((alerta) => (
            <li key={alerta.id} className={classes.item}>
              <ItemAlerta alerta={alerta} aoAbrir={aoAbrir} />
            </li>
          ))}
        </ul>
      </Cartao>
    </section>
  );
}
