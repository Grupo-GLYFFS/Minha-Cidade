import { SimpleGrid } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import AmostraCor from '../AmostraCor';
import { CORES_GLOBAIS } from '../../../dados/vitrineCores';
import { lerVariavelCss } from '../../../logica/variaveisCss';
import { razaoContraste } from '../../../logica/contraste';

// Todas as variáveis --cor-* do global.css, com o valor lido da página agora e o uso.
// As cores de texto mostram o contraste sobre o fundo em que aparecem.
export default function CoresVariaveis() {
  return (
    <Subsecao
      id="cores-variaveis"
      titulo="Variáveis de cor"
      descricao={`${CORES_GLOBAIS.length} variáveis --cor-* no :root. No alto contraste, html[data-contraste='alto'] troca os valores.`}
    >
      <Vitrine nome=":root --cor-*" arquivo="src/estilos/global.css">
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="sm">
          {CORES_GLOBAIS.map((item) => {
            const valor = lerVariavelCss(item.nome);
            const fundo = item.sobre ?? '--cor-superficie';
            const contraste = item.texto
              ? { razao: razaoContraste(valor, lerVariavelCss(fundo)), sobre: `com ${fundo}` }
              : undefined;
            return (
              <AmostraCor
                key={item.nome}
                cor={`var(${item.nome})`}
                nome={item.nome}
                valor={valor}
                uso={item.uso}
                contraste={contraste}
              />
            );
          })}
        </SimpleGrid>
      </Vitrine>
    </Subsecao>
  );
}
