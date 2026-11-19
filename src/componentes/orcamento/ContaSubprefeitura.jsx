import CartaoExtrato from './CartaoExtrato';
import BlocoExtrato from './BlocoExtrato';
import LinhaExtrato from './LinhaExtrato';
import FechoExtrato from './FechoExtrato';
import BotaoBaixar from './BotaoBaixar';
import SeloSituacao from '../SeloSituacao';
import { buscarSituacaoObra } from '../../logica/obras';
import { VERBA_POR_BAIRRO, valorCurto } from '../../logica/orcamento';
import { pluralizar } from '../../logica/formatos';

// "Conta da Subprefeitura … · 2026" no formato de extrato: custeio e zeladoria, as obras
// (uma linha por obra, com a situação), a verba dos moradores (R$ 1 mi por bairro) e o total.
// Recebe a subprefeitura e a conta montada por contaDaSubprefeitura().
export default function ContaSubprefeitura({ subprefeitura, conta }) {
  const nome = `Subprefeitura ${subprefeitura.nome}`;

  // Linhas da planilha do botão Baixar
  const planilha = [
    ['Custeio e zeladoria', conta.custeio.previsto, conta.custeio.pago],
    ...conta.obras.map((obra) => [obra.titulo, obra.valorTotal, obra.valorPago]),
    ...conta.verba.map((item) => [`Verba dos moradores: ${item.bairro}`, item.valor, 0]),
  ];

  return (
    <CartaoExtrato
      titulo={`Conta da ${nome} · 2026`}
      subtitulo="Valores pagos até 31 de outubro"
      acao={
        <BotaoBaixar
          arquivo={`conta-subprefeitura-${subprefeitura.id}-2026`}
          cabecalho={['Item', 'Previsto (R$)', 'Pago (R$)']}
          linhas={planilha}
        />
      }
    >
      <BlocoExtrato titulo="Sai (gastos)" icone="payments" colunas={['Previsto', 'Pago']}>
        <LinhaExtrato
          nome="Custeio e zeladoria"
          valor={valorCurto(conta.custeio.previsto)}
          segundo={valorCurto(conta.custeio.pago)}
        />
        {conta.obras.length > 0 && (
          <>
            <LinhaExtrato
              nome="Obras"
              detalhe={pluralizar(conta.obras.length, 'obra', 'obras')}
              valor={valorCurto(conta.obrasPrevisto)}
              segundo={valorCurto(conta.obrasPago)}
            />
            {conta.obras.map((obra) => {
              const situacao = buscarSituacaoObra(obra.situacao);
              return (
                <LinhaExtrato
                  key={obra.id}
                  recuo
                  nome={obra.titulo}
                  extra={<SeloSituacao cor={situacao.cor}>{situacao.rotulo}</SeloSituacao>}
                  valor={valorCurto(obra.valorTotal)}
                  segundo={valorCurto(obra.valorPago)}
                />
              );
            })}
          </>
        )}
        <LinhaExtrato
          nome="Verba dos moradores"
          detalhe={`${valorCurto(VERBA_POR_BAIRRO)} por bairro`}
          valor={valorCurto(conta.verbaTotal)}
          segundo={null}
        />
        {conta.verba.map((item) => (
          <LinhaExtrato
            key={item.bairro}
            recuo
            nome={item.bairro}
            valor={valorCurto(item.valor)}
            segundo={null}
          />
        ))}
        <LinhaExtrato
          total
          nome="Total"
          valor={valorCurto(conta.previsto)}
          segundo={valorCurto(conta.pago)}
        />
      </BlocoExtrato>
      <FechoExtrato pago={valorCurto(conta.pago)} percentual={conta.percentual} />
    </CartaoExtrato>
  );
}
