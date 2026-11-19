import { useState } from 'react';
import Botao from '../Botao';
import Icone from '../Icone';
import CartaoExtrato from './CartaoExtrato';
import BlocoExtrato from './BlocoExtrato';
import LinhaExtrato from './LinhaExtrato';
import FechoExtrato from './FechoExtrato';
import BotaoBaixar from './BotaoBaixar';
import { AREAS_ORCAMENTO } from '../../dados/orcamento';
import { FONTES_RECEITA } from '../../dados/receitas';
import { MINIMOS_CONSTITUCIONAIS } from '../../dados/minimosConstitucionais';
import {
  agruparReceitas,
  conferirMinimos,
  montarDeCadaCem,
  somar,
  totalOrcamento,
  valorCurto,
} from '../../logica/orcamento';
import classes from './ContaCidade.module.css';

// "Conta da cidade · 2026" no formato de extrato: o que entra (5 grupos, ou as 10 fontes
// com o botão "Ver as 10 fontes"), o que sai por área (com quanto é de cada R$ 100),
// os mínimos da Constituição e o total pago. O botão Baixar leva a conta em planilha.
export default function ContaCidade() {
  const [todasFontes, setTodasFontes] = useState(false);

  const receitas = todasFontes ? FONTES_RECEITA : agruparReceitas(FONTES_RECEITA);
  const areas = montarDeCadaCem(AREAS_ORCAMENTO);
  const total = totalOrcamento(AREAS_ORCAMENTO);
  const minimos = conferirMinimos(MINIMOS_CONSTITUCIONAIS, AREAS_ORCAMENTO);

  // Linhas da planilha: entradas e saídas, com previsto e pago
  const planilha = [
    ...FONTES_RECEITA.map((fonte) => ['Entra', fonte.nome, fonte.previsto, fonte.arrecadado]),
    ...areas.map((area) => ['Sai', area.nome, area.previsto, area.gasto]),
  ];

  return (
    <CartaoExtrato
      titulo="Conta da cidade · 2026"
      subtitulo="Valores pagos e arrecadados até 31 de outubro"
      acao={
        <BotaoBaixar
          arquivo="conta-da-cidade-2026"
          cabecalho={['Tipo', 'Item', 'Previsto (R$)', 'Até outubro (R$)']}
          linhas={planilha}
        />
      }
    >
      <BlocoExtrato
        titulo="Entra (arrecadação)"
        icone="savings"
        colunas={['Previsto', 'Até outubro']}
      >
        <div id="fontes-receita">
          {receitas.map((item) => (
            <LinhaExtrato
              key={item.nome}
              nome={item.nome}
              valor={valorCurto(item.previsto)}
              segundo={valorCurto(item.arrecadado)}
            />
          ))}
        </div>
        <LinhaExtrato
          total
          nome="Total que entra"
          valor={valorCurto(somar(FONTES_RECEITA, 'previsto'))}
          segundo={valorCurto(somar(FONTES_RECEITA, 'arrecadado'))}
        />
        <div className={classes.mais}>
          <Botao
            variante="secundario"
            largo
            icone={todasFontes ? 'expand_less' : 'expand_more'}
            iconeDireita
            aria-expanded={todasFontes}
            aria-controls="fontes-receita"
            onClick={() => setTodasFontes((atual) => !atual)}
          >
            {todasFontes ? 'Ver só os 5 grupos' : `Ver as ${FONTES_RECEITA.length} fontes`}
          </Botao>
        </div>
      </BlocoExtrato>

      <BlocoExtrato titulo="Sai (gastos)" icone="payments" colunas={['Previsto', 'Pago']}>
        {areas.map((area) => (
          <LinhaExtrato
            key={area.id}
            nome={area.nome}
            detalhe={`R$ ${area.deCem} de cada R$ 100`}
            valor={valorCurto(area.previsto)}
            segundo={valorCurto(area.gasto)}
          />
        ))}
        <LinhaExtrato
          total
          nome="Total que sai"
          valor={valorCurto(total.previsto)}
          segundo={valorCurto(total.gasto)}
        />
      </BlocoExtrato>

      <BlocoExtrato titulo="Mínimos da Constituição" icone="gavel">
        <ul className={classes.minimos}>
          {minimos.map((minimo) => (
            <li key={minimo.idArea} className={minimo.cumprido ? classes.ok : classes.falta}>
              <Icone nome={minimo.cumprido ? 'verified' : 'error'} tamanho={20} preenchido />
              {minimo.nome}: {minimo.aplicado}% dos impostos (mínimo {minimo.minimo}%)
            </li>
          ))}
        </ul>
      </BlocoExtrato>

      <FechoExtrato pago={valorCurto(total.gasto)} percentual={total.percentual} />
    </CartaoExtrato>
  );
}
