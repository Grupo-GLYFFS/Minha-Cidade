import { Box } from '@mantine/core';
import CartaoExtrato from './CartaoExtrato';
import BlocoExtrato from './BlocoExtrato';
import LinhaExtrato from './LinhaExtrato';
import { ORCAMENTO_MENSAL } from '../../dados/orcamentoMensal';
import { somar, valorCurto } from '../../logica/orcamento';
import classes from './MesAMes.module.css';

// Escreve um valor em bilhões, sem o "R$" e o "bi": 10350000000 vira "10,35"
function emBilhoes(valor) {
  return (valor / 1e9).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
}

// "Mês a mês": gráfico de colunas (gasto escuro e arrecadado claro, lado a lado, com o valor
// em cima) e, embaixo, a mesma informação em linhas de extrato, com o total do ano.
// O gráfico tem uma descrição completa para o leitor de tela.
export default function MesAMes() {
  // A coluna mais alta ocupa 90% da altura do gráfico
  const maior = Math.max(...ORCAMENTO_MENSAL.flatMap((mes) => [mes.gasto, mes.arrecadado]));
  const altura = (valor) => `${((valor / maior) * 90).toFixed(2)}%`;
  const descricao = ORCAMENTO_MENSAL.map(
    (mes) => `${mes.mes}: gasto ${valorCurto(mes.gasto)}, arrecadado ${valorCurto(mes.arrecadado)}`,
  ).join('; ');

  return (
    <CartaoExtrato titulo="Mês a mês" subtitulo="Arrecadado e gasto em cada mês">
      <div className={classes.grafico}>
        <p className={classes.legenda} aria-hidden="true">
          <span>
            <i className={classes.marcaGasto} />
            Gasto
          </span>
          <span>
            <i className={classes.marcaArrecadado} />
            Arrecadado
          </span>
        </p>
        <div role="img" aria-label={descricao}>
          <div className={classes.colunas}>
            {ORCAMENTO_MENSAL.map((mes) => (
              <div key={mes.mes} className={classes.mes}>
                <Box component="span" className={classes.gasto} h={altura(mes.gasto)}>
                  <em>{emBilhoes(mes.gasto)}</em>
                </Box>
                <Box component="span" className={classes.arrecadado} h={altura(mes.arrecadado)}>
                  <em>{emBilhoes(mes.arrecadado)}</em>
                </Box>
              </div>
            ))}
          </div>
          <div className={classes.eixo} aria-hidden="true">
            {ORCAMENTO_MENSAL.map((mes) => (
              <span key={mes.mes}>{mes.mes.slice(0, 3)}</span>
            ))}
          </div>
        </div>
        <p className={classes.nota}>Valores em bilhões de reais.</p>
      </div>

      <BlocoExtrato colunas={['Arrecadado', 'Gasto']}>
        {ORCAMENTO_MENSAL.map((mes) => (
          <LinhaExtrato
            key={mes.mes}
            nome={mes.mes.charAt(0).toUpperCase() + mes.mes.slice(1)}
            valor={valorCurto(mes.arrecadado)}
            segundo={valorCurto(mes.gasto)}
          />
        ))}
        <LinhaExtrato
          total
          nome="Janeiro a outubro"
          valor={valorCurto(somar(ORCAMENTO_MENSAL, 'arrecadado'))}
          segundo={valorCurto(somar(ORCAMENTO_MENSAL, 'gasto'))}
        />
      </BlocoExtrato>
    </CartaoExtrato>
  );
}
