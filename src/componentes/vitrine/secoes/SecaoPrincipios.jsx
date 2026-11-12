import { SimpleGrid, Text } from '@mantine/core';
import SecaoVitrine from '../SecaoVitrine';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import DiagramaRaio from '../DiagramaRaio';
import { PRINCIPIOS } from '../../../dados/vitrinePrincipios';
import classes from './SecaoPrincipios.module.css';

// Seção "Princípios": as regras do design system em cartões e o desenho do raio aninhado.
export default function SecaoPrincipios() {
  return (
    <SecaoVitrine
      id="principios"
      titulo="Princípios"
      descricao="As regras que valem para todas as telas. Vêm de .claude/regras-de-codigo.md e da visão do projeto."
    >
      <SimpleGrid component="ul" cols={{ base: 1, sm: 2 }} spacing="md" className={classes.lista}>
        {PRINCIPIOS.map((principio) => (
          <li key={principio.titulo} className={classes.item}>
            <Text fw={700}>{principio.titulo}</Text>
            <Text fz={14} c="var(--cor-texto-suave)" mt={4}>
              {principio.texto}
            </Text>
          </li>
        ))}
      </SimpleGrid>

      <Subsecao
        titulo="Raio aninhado na prática"
        descricao="Caixa de fora com raio 20 e padding 16: a caixa de dentro fica com 20 − 16 = 4, que sobe para o mínimo de 8."
      >
        <Vitrine nome="Raio aninhado" arquivo="src/componentes/Cartao.module.css" fundo="branco">
          <DiagramaRaio />
        </Vitrine>
      </Subsecao>
    </SecaoVitrine>
  );
}
