import { Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import { RECURSOS_ACESSIBILIDADE } from '../../dados/recursosAcessibilidade';
import classes from './RecursosApp.module.css';

// Lista dos recursos de acessibilidade que o app já traz, sem precisar ligar nada.
export default function RecursosApp() {
  return (
    <Cartao component="section" aria-labelledby="titulo-recursos">
      <Title order={2} id="titulo-recursos" fz={{ base: 18, md: 20 }} fw={700} mb={4}>
        Recursos do app
      </Title>
      <Text c="var(--cor-texto-suave)" mb="md">
        Funcionam sempre, para todo mundo.
      </Text>
      <ul className={classes.lista}>
        {RECURSOS_ACESSIBILIDADE.map((recurso) => (
          <li key={recurso.nome} className={classes.item}>
            <span className={classes.icone}>
              <Icone nome={recurso.icone} tamanho={20} />
            </span>
            <div className={classes.textos}>
              <Text fw={700}>{recurso.nome}</Text>
              <Text fz="sm" c="var(--cor-texto-suave)">
                {recurso.texto}
              </Text>
            </div>
          </li>
        ))}
      </ul>
    </Cartao>
  );
}
