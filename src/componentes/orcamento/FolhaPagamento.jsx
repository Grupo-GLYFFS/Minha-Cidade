import CartaoExtrato from './CartaoExtrato';
import BlocoExtrato from './BlocoExtrato';
import LinhaExtrato from './LinhaExtrato';
import { FOLHA_PAGAMENTO } from '../../dados/folhaPagamento';
import { somar, valorCurto } from '../../logica/orcamento';
import { formatarNumero } from '../../logica/formatos';
import classes from './FolhaPagamento.module.css';

// "Folha de pagamento": quanto cada área paga de salário por mês e o salário médio,
// sem nomes de pessoas, com o total de servidores e o aviso de quem não entra na folha.
export default function FolhaPagamento() {
  const porMes = somar(FOLHA_PAGAMENTO, 'porMes');
  // O ano tem 13 folhas, por causa do 13º salário
  const noAno = porMes * 13;

  return (
    <CartaoExtrato
      titulo="Folha de pagamento"
      subtitulo={`R$ ${Math.round(noAno / 1e9)} bi no ano, com o 13º · sem nomes de pessoas`}
    >
      <BlocoExtrato colunas={['Por mês', 'Salário médio']}>
        {FOLHA_PAGAMENTO.map((area) => (
          <LinhaExtrato
            key={area.area}
            nome={area.area}
            detalhe={`${formatarNumero(area.servidores)} servidores`}
            valor={valorCurto(area.porMes)}
            segundo={`R$ ${formatarNumero(area.salarioMedio)}`}
          />
        ))}
        <LinhaExtrato
          total
          nome={`${formatarNumero(somar(FOLHA_PAGAMENTO, 'servidores'))} servidores`}
          valor={valorCurto(porMes)}
        />
        <p className={classes.nota}>
          Garis, motoristas de ônibus e boa parte das equipes de saúde trabalham para empresas
          contratadas e não entram na folha.
        </p>
      </BlocoExtrato>
    </CartaoExtrato>
  );
}
