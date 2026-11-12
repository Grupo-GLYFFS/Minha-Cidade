import { Accordion, Box } from '@mantine/core';
import Icone from '../Icone';
import { SECOES_VITRINE } from '../../dados/vitrineSecoes';
import classes from './IndiceVitrine.module.css';

// Lista de links para as seções (e as partes de algumas delas)
function ListaSecoes() {
  return (
    <ul className={classes.lista}>
      {SECOES_VITRINE.map((secao) => (
        <li key={secao.id}>
          <a href={`#${secao.id}`} className={classes.link}>
            {secao.rotulo}
          </a>
          {secao.subsecoes && (
            <ul className={classes.sublista}>
              {secao.subsecoes.map((parte) => (
                <li key={parte.id}>
                  <a href={`#${parte.id}`} className={classes.sublink}>
                    {parte.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

// Índice da página de componentes.
// Computador: coluna presa ao lado do conteúdo enquanto a página rola.
// Celular: uma sanfona "Ir para a seção" que abre a mesma lista.
// As duas versões são um <nav aria-label="Seções">; só uma aparece por vez.
export default function IndiceVitrine() {
  return (
    <>
      <Box component="nav" aria-label="Seções" visibleFrom="md" className={classes.lateral}>
        <p className={classes.titulo}>Nesta página</p>
        <ListaSecoes />
      </Box>

      <Box component="nav" aria-label="Seções" hiddenFrom="md">
        <Accordion
          variant="separated"
          radius="lg"
          chevron={<Icone nome="expand_more" tamanho={24} />}
          classNames={{ item: classes.sanfona }}
        >
          <Accordion.Item value="indice">
            <Accordion.Control>Ir para a seção</Accordion.Control>
            <Accordion.Panel>
              <ListaSecoes />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Box>
    </>
  );
}
