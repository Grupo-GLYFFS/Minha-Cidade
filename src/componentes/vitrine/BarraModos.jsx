import { Button, SegmentedControl, Switch, Text, useMatches } from '@mantine/core';
import Icone from '../Icone';
import { useAcessibilidade } from '../../contexto/useAcessibilidade';
import { TAMANHOS_LETRA } from '../../dados/tamanhosLetra';
import classes from './BarraModos.module.css';

const OPCOES_LETRA = TAMANHOS_LETRA.map((tamanho) => ({
  value: tamanho.id,
  label: tamanho.rotulo.charAt(0).toUpperCase() + tamanho.rotulo.slice(1),
}));

// Barra no topo da página de componentes para ver tudo em cada modo:
// tamanho da letra, alto contraste e reduzir animações.
// Usa as preferências de acessibilidade de verdade, então muda o app inteiro (e avisa isso).
// "Voltar ao padrão" desfaz tudo e apaga a preferência salva.
export default function BarraModos() {
  const {
    tamanhoLetra,
    altoContraste,
    reduzirAnimacoes,
    definirTamanho,
    alternarAltoContraste,
    alternarAnimacoes,
    voltarAoPadrao,
  } = useAcessibilidade();
  // No celular as quatro opções ficam uma embaixo da outra, para caberem sem rolar para o lado
  const orientacao = useMatches({ base: 'vertical', sm: 'horizontal' });

  return (
    <section aria-labelledby="modos-titulo" className={classes.barra}>
      <Text component="h2" id="modos-titulo" fz={16} fw={700}>
        Ver a página em outro modo
      </Text>
      <Text fz={13} c="var(--cor-texto-suave)" mt={4}>
        <Icone nome="info" tamanho={18} /> Isso muda a preferência do app inteiro.
      </Text>

      <div className={classes.controles}>
        <div className={classes.grupoLetra}>
          <Text component="span" id="modos-letra" className={classes.rotulo}>
            Tamanho da letra
          </Text>
          <SegmentedControl
            aria-labelledby="modos-letra"
            data={OPCOES_LETRA}
            value={tamanhoLetra}
            onChange={definirTamanho}
            orientation={orientacao}
            fullWidth={orientacao === 'vertical'}
            radius="md"
          />
        </div>
        <div className={classes.chaves}>
          <Switch
            size="md"
            label="Alto contraste"
            checked={altoContraste}
            onChange={alternarAltoContraste}
          />
          <Switch
            size="md"
            label="Reduzir animações"
            checked={reduzirAnimacoes}
            onChange={alternarAnimacoes}
          />
        </div>
        <Button
          variant="default"
          h={44}
          onClick={voltarAoPadrao}
          leftSection={<Icone nome="restart_alt" tamanho={20} />}
          className={classes.padrao}
        >
          Voltar ao padrão
        </Button>
      </div>
    </section>
  );
}
