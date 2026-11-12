import { SimpleGrid, Text } from '@mantine/core';
import SecaoVitrine from '../SecaoVitrine';
import Icone from '../../Icone';
import { REGRAS_TEXTO } from '../../../dados/vitrineTextos';
import classes from './SecaoTextos.module.css';

// Uma coluna de exemplos (bons ou ruins), com ícone e título para a cor não ser a única pista
function Exemplos({ tipo, itens }) {
  const bom = tipo === 'bom';
  return (
    <div className={classes.coluna} data-tipo={tipo}>
      <Text fz={13} fw={700} className={classes.rotulo}>
        <Icone nome={bom ? 'check_circle' : 'block'} tamanho={18} preenchido />
        {bom ? 'Assim' : 'Evite'}
      </Text>
      <ul className={classes.lista}>
        {itens.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Seção "Padrões de texto": as regras de UX writing do app, com exemplos bons e ruins.
export default function SecaoTextos() {
  return (
    <SecaoVitrine
      id="textos"
      titulo="Padrões de texto (UX writing)"
      descricao="Regras da seção 4 de regras-de-codigo.md, com textos tirados das telas."
    >
      {REGRAS_TEXTO.map((regra) => (
        <section key={regra.regra} aria-label={regra.regra} className={classes.regra}>
          <Text component="h3" fz={{ base: 17, md: 18 }} fw={700}>
            {regra.regra}
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" mt="sm">
            <Exemplos tipo="bom" itens={regra.bom} />
            <Exemplos tipo="ruim" itens={regra.ruim} />
          </SimpleGrid>
        </section>
      ))}
    </SecaoVitrine>
  );
}
