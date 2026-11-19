import Botao from '../Botao';
import Chip from '../Chip';
import GrupoBusca from './GrupoBusca';
import ItemBusca from './ItemBusca';
import { SERVICOS } from '../../dados/servicos';
import { SUGESTOES_BUSCA } from '../../logica/buscaServicos';
import { contarTermos } from '../../logica/buscaGeral';
import { buscarCategoria, buscarStatus } from '../../logica/pedidos';
import { buscarStatusSolicitacao } from '../../logica/solicitacoes';
import { caminhoCardServico, nomeSubcategoria } from '../../logica/servicos';
import classes from './PopupBusca.module.css';

// Chips "Mais buscados", com quantos serviços cada termo acha
const MAIS_BUSCADOS = contarTermos(SUGESTOES_BUSCA, SERVICOS);

// Corpo do popup de busca, conforme o estado:
// - vazio: ações rápidas (Abrir pedido, Meus pedidos, Minhas solicitações) e "Mais buscados";
// - com resultados: serviços, minhas solicitações, meus pedidos e pedidos perto de você,
//   com a palavra marcada;
// - sem resultado: o que fazer (ver todos os serviços ou falar com a Ouvidoria) e "Mais buscados".
// Recebe o texto, os achados (de buscarNoApp, ou null sem texto), a linha de "Meus pedidos",
// fechar() (ao escolher um item) e setTexto(termo) (ao tocar num "Mais buscados").
export default function CorpoBusca({ texto, achados, metaPedidos, fechar, setTexto }) {
  const buscando = Boolean(achados);
  const maisBuscados = (
    <GrupoBusca titulo="Mais buscados" variante="chips">
      {MAIS_BUSCADOS.map(({ termo, quantidade }) => (
        <li key={termo}>
          <Chip icone="search" contagem={quantidade} onClick={() => setTexto(termo)}>
            {termo}
          </Chip>
        </li>
      ))}
    </GrupoBusca>
  );

  let corpo;
  if (!buscando) {
    corpo = (
      <>
        <GrupoBusca titulo="Ações rápidas" variante="cartoes">
          <li>
            <ItemBusca
              icone="add"
              titulo="Abrir pedido"
              meta="Problema na rua ou no bairro"
              para="/pedidos/novo"
              aoEscolher={fechar}
              cartao
            />
          </li>
          <li>
            <ItemBusca
              icone="assignment"
              titulo="Meus pedidos"
              meta={metaPedidos}
              para="/perfil/pedidos"
              aoEscolher={fechar}
              cartao
            />
          </li>
          <li>
            <ItemBusca
              icone="event_available"
              titulo="Minhas solicitações"
              meta="Serviços que você pediu à prefeitura"
              para="/servicos/minhas-solicitacoes"
              aoEscolher={fechar}
              cartao
            />
          </li>
        </GrupoBusca>
        {maisBuscados}
      </>
    );
  } else if (achados.total === 0) {
    corpo = (
      <>
        <div className={classes.nada}>
          <h3 className={classes.nadaTitulo}>Nenhum serviço ou pedido para “{texto.trim()}”</h3>
          <p className={classes.nadaTexto}>Confira se está escrito certo ou tente outra palavra.</p>
          <div className={classes.nadaAcoes}>
            <Botao
              variante="secundario"
              icone="arrow_forward"
              iconeDireita
              para="/servicos"
              onClick={fechar}
            >
              Ver todos os {SERVICOS.length} serviços
            </Botao>
            <Botao
              variante="principal"
              icone="record_voice_over"
              para="/servicos/ouvidoria"
              onClick={fechar}
            >
              Falar com a Ouvidoria
            </Botao>
          </div>
        </div>
        {maisBuscados}
      </>
    );
  } else {
    // Pedido: ícone da categoria, protocolo e bairro, selo da situação
    const itemPedido = (pedido) => {
      const status = buscarStatus(pedido.status);
      return (
        <li key={pedido.id}>
          <ItemBusca
            icone={buscarCategoria(pedido.categoria)?.icone ?? 'assignment'}
            titulo={pedido.titulo}
            meta={`Protocolo ${pedido.protocolo} · ${pedido.bairro}`}
            selo={status && { cor: status.cor, rotulo: status.rotulo }}
            para={`/pedidos/${pedido.id}`}
            busca={texto}
            aoEscolher={fechar}
          />
        </li>
      );
    };
    corpo = (
      <>
        {achados.servicos.length > 0 && (
          <GrupoBusca titulo="Serviços" contagem={achados.servicos.length}>
            {achados.servicos.map((servico) => (
              <li key={servico.id}>
                <ItemBusca
                  icone={servico.icone}
                  titulo={servico.nome}
                  meta={nomeSubcategoria(servico)}
                  para={caminhoCardServico(servico)}
                  busca={texto}
                  aoEscolher={fechar}
                />
              </li>
            ))}
          </GrupoBusca>
        )}
        {achados.solicitacoes.length > 0 && (
          <GrupoBusca titulo="Minhas solicitações" contagem={achados.solicitacoes.length}>
            {achados.solicitacoes.map((item) => {
              const status = buscarStatusSolicitacao(item.status);
              return (
                <li key={item.id}>
                  <ItemBusca
                    icone="event_available"
                    titulo={item.nomeServico}
                    meta={`Protocolo ${item.protocolo}`}
                    selo={{ cor: status.cor, rotulo: status.rotulo }}
                    para={`/servicos/minhas-solicitacoes/${item.id}`}
                    busca={texto}
                    aoEscolher={fechar}
                  />
                </li>
              );
            })}
          </GrupoBusca>
        )}
        {achados.meusPedidos.length > 0 && (
          <GrupoBusca titulo="Meus pedidos" contagem={achados.meusPedidos.length}>
            {achados.meusPedidos.map(itemPedido)}
          </GrupoBusca>
        )}
        {achados.pertoDeVoce.length > 0 && (
          <GrupoBusca titulo="Pedidos perto de você" contagem={achados.pertoDeVoce.length}>
            {achados.pertoDeVoce.map(itemPedido)}
          </GrupoBusca>
        )}
      </>
    );
  }

  return corpo;
}
