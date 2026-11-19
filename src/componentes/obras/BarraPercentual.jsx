import { Progress } from '@mantine/core';
import classes from './BarraPercentual.module.css';

// Cor da barra para cada cor de status (regra 7) e o azul do site
const COR_BARRA = {
  azul: 'var(--cor-azul)',
  cinza: 'var(--cor-status-cinza-bolinha)',
  ambar: 'var(--cor-status-ambar-texto)',
  verde: 'var(--cor-status-verde-texto)',
  vermelho: 'var(--cor-status-vermelho-texto)',
};

// Barra fina de percentual (obra feita, orçamento pago, resultado da votação).
// Só desenha: o número sempre aparece em texto ao lado, então a barra fica escondida
// do leitor de tela.
// Recebe o percentual (0 a 100), a cor (azul, cinza, ambar, verde ou vermelho),
// a altura em px (padrão 6) e "clara" (trilho azul-claro, para usar sobre a faixa do cabeçalho).
export default function BarraPercentual({ percentual, cor = 'azul', altura = 6, clara = false }) {
  return (
    <Progress
      value={percentual}
      color={COR_BARRA[cor]}
      size={altura}
      radius="xl"
      aria-hidden="true"
      classNames={{ root: clara ? classes.trilhoClaro : classes.trilho }}
    />
  );
}
