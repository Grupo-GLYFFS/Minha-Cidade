import { Title } from '@mantine/core';
import Cartao from '../Cartao';
import LinkOpcaoPerfil from './LinkOpcaoPerfil';
import classes from './GrupoOpcoesPerfil.module.css';

// Um grupo da lista do Perfil (ex.: "Ajuda"): título e as opções dentro de um cartão.
// Recebe o grupo { id, titulo, opcoes }.
export default function GrupoOpcoesPerfil({ grupo }) {
  const idTitulo = `grupo-${grupo.id}`;

  return (
    <section aria-labelledby={idTitulo}>
      <Title order={2} id={idTitulo} fz={{ base: 18, md: 20 }} fw={700} mb="sm">
        {grupo.titulo}
      </Title>
      <Cartao p="sm">
        <ul className={classes.lista}>
          {grupo.opcoes.map((opcao) => (
            <li key={opcao.caminho} className={classes.item}>
              <LinkOpcaoPerfil opcao={opcao} />
            </li>
          ))}
        </ul>
      </Cartao>
    </section>
  );
}
