import { Progress, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import { formatarBilhoes } from '../../logica/formatos';
import { percentualGasto } from '../../logica/orcamento';
import classes from './PrevistoGasto.module.css';

// Seção "Previsto × gasto até agora": para cada área, quanto foi aprovado, quanto já foi pago
// e uma barra com o percentual (sempre escrito: "82% já gasto").
// Recebe as áreas do orçamento, já na ordem em que devem aparecer.
export default function PrevistoGasto({ areas }) {
  return (
    <section aria-labelledby="previsto-gasto-titulo">
      <Title order={2} id="previsto-gasto-titulo" fz={{ base: 18, md: 20 }} fw={700}>
        Previsto × gasto até agora
      </Title>
      <Text fz={{ base: 14, md: 15 }} c="var(--cor-texto-suave)" mt={4} mb="sm">
        Quanto cada área já pagou do que estava aprovado para 2026, até o começo de novembro.
      </Text>

      <ul className={classes.lista}>
        {areas.map((area) => {
          const percentual = percentualGasto(area);
          return (
            <li key={area.id}>
              <Cartao className={classes.cartao}>
                <div className={classes.topo}>
                  <span className={classes.icone}>
                    <Icone nome={area.icone} tamanho={20} />
                  </span>
                  <div className={classes.textos}>
                    <Title order={3} fz={{ base: 15, md: 16 }} fw={700} lh={1.3}>
                      {area.nome}
                    </Title>
                    <Text fz={13} c="var(--cor-texto-suave)" lh={1.4}>
                      {area.descricao}
                    </Text>
                  </div>
                </div>

                <dl className={classes.valores}>
                  <div>
                    <dt>Previsto</dt>
                    <dd>{formatarBilhoes(area.previsto)}</dd>
                  </div>
                  <div>
                    <dt>Gasto</dt>
                    <dd>{formatarBilhoes(area.gasto)}</dd>
                  </div>
                </dl>
                <Progress
                  value={percentual}
                  size={10}
                  radius="xl"
                  aria-hidden="true"
                  classNames={{ root: classes.trilho }}
                />
                <Text fz={14} fw={700} mt={8}>
                  {percentual}% já gasto
                </Text>
              </Cartao>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
