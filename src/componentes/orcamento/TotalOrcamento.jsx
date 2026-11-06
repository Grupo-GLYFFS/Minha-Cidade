import { Progress, Text } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import { formatarBilhoes } from '../../logica/formatos';
import classes from './TotalOrcamento.module.css';

// Faixa do topo do Orçamento da Cidade: o total previsto para 2026 e quanto já foi gasto.
// Recebe o resultado de totalOrcamento() ({ previsto, gasto, percentual }).
export default function TotalOrcamento({ total }) {
  return (
    <Cartao className={classes.cartao}>
      <div className={classes.icone}>
        <Icone nome="account_balance" tamanho={28} />
      </div>
      <div className={classes.textos}>
        <p className={classes.valor}>
          <strong>{formatarBilhoes(total.previsto)}</strong> previstos para 2026
        </p>
        <Text fz={{ base: 14, md: 15 }} c="var(--cor-texto-suave)">
          Já gastos até agora: {formatarBilhoes(total.gasto)} ({total.percentual}%)
        </Text>
        <Progress
          value={total.percentual}
          size={8}
          radius="xl"
          mt={8}
          aria-hidden="true"
          classNames={{ root: classes.trilho }}
        />
        <span className={classes.etiqueta}>
          <Icone nome="info" tamanho={18} />
          Dados de exemplo
        </span>
      </div>
    </Cartao>
  );
}
