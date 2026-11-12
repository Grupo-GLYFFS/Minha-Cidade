import { SimpleGrid } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import AmostraCor from '../AmostraCor';
import { tema } from '../../../tema';
import { lerVariavelCss } from '../../../logica/variaveisCss';
import { razaoContraste } from '../../../logica/contraste';

// Os 10 tons do azul do tema (0 = mais claro, 9 = mais escuro), com o valor do tema
// e, quando o alto contraste troca o tom, o valor em uso agora. O contraste é do tom sobre o branco.
export default function CoresTema() {
  const branco = lerVariavelCss('--cor-superficie') || '#fff';

  return (
    <Subsecao
      id="cores-tema"
      titulo="Azul do tema"
      descricao="Tons de theme.colors.azul. O tom 6 (#0052EF) é a cor principal: botões cheios, links e destaques."
    >
      <Vitrine
        nome="theme.colors.azul"
        arquivo="src/tema.js"
        props="primaryColor: 'azul' · primaryShade: 6"
      >
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="sm">
          {tema.colors.azul.map((hex, tom) => {
            const atual = lerVariavelCss(`--mantine-color-azul-${tom}`) || hex;
            const mudou = atual.toLowerCase() !== hex.toLowerCase();
            return (
              <AmostraCor
                key={hex}
                cor={`azul.${tom}`}
                nome={`azul.${tom}`}
                valor={mudou ? `${hex} · agora ${atual}` : hex}
                uso={tom === 6 ? '6 = cor principal' : undefined}
                contraste={{ razao: razaoContraste(atual, branco), sobre: 'sobre o branco' }}
              />
            );
          })}
        </SimpleGrid>
      </Vitrine>
    </Subsecao>
  );
}
