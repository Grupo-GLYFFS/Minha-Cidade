import { useState } from 'react';
import Botao from '../Botao';
import GrupoBotoes from '../GrupoBotoes';
import VitrineExemplo from './VitrineExemplo';
import VitrineSecao from './VitrineSecao';

// Seção de botões da /componentes (regra 15): variantes, tamanhos, lado do ícone,
// toggle, carregando, desabilitado e grupos.
export default function VitrineBotoes() {
  const [seguindo, setSeguindo] = useState(false);
  const [apoiado, setApoiado] = useState(true);

  return (
    <VitrineSecao id="botoes" titulo="Botões" arquivo="Botao.jsx · GrupoBotoes.jsx">
      <VitrineExemplo rotulo="Variantes (48)" linha>
        <Botao variante="principal" icone="add">
          Abrir pedido
        </Botao>
        <Botao variante="secundario" icone="share">
          Compartilhar
        </Botao>
        <Botao variante="texto" icone="arrow_forward" iconeDireita>
          Ver todos
        </Botao>
        <Botao variante="perigo" icone="event_busy">
          Cancelar agendamento
        </Botao>
      </VitrineExemplo>

      <VitrineExemplo rotulo="Compacto (44, só dentro de cards e no topo)" linha>
        <Botao variante="principal" compacto icone="send" iconeDireita>
          Enviar
        </Botao>
        <Botao variante="secundario" compacto icone="directions">
          Como chegar
        </Botao>
        <Botao variante="texto" compacto icone="arrow_forward" iconeDireita>
          Ver todas
        </Botao>
      </VitrineExemplo>

      <VitrineExemplo rotulo="Só ícone (44): normal, ação do conteúdo (azul) e fechar" linha>
        <Botao variante="icone" icone="search" aria-label="Buscar" />
        <Botao variante="icone-acao" icone="share" aria-label="Compartilhar obra" />
        <Botao variante="icone-acao" icone="edit" aria-label="Editar endereço" />
        <Botao variante="fechar" aria-label="Fechar" />
      </VitrineExemplo>

      <VitrineExemplo rotulo="Toggle com aria-pressed (clique para trocar)" linha>
        <Botao
          variante="secundario"
          icone="add"
          pressionado={seguindo}
          onClick={() => setSeguindo((atual) => !atual)}
        >
          {seguindo ? 'Seguindo' : 'Seguir'}
        </Botao>
        <Botao
          variante="secundario"
          compacto
          icone="volunteer_activism"
          pressionado={apoiado}
          contagem={apoiado ? 24 : 23}
          onClick={() => setApoiado((atual) => !atual)}
        >
          {apoiado ? 'Apoiado' : 'Apoiar'}
        </Botao>
      </VitrineExemplo>

      <VitrineExemplo rotulo="Estados: carregando e desabilitado" linha>
        <Botao variante="principal" carregando icone="send" iconeDireita>
          Enviando…
        </Botao>
        <Botao
          variante="secundario"
          icone="add"
          desabilitado
          aria-label="Seguir. Você já recebe as atualizações do seu pedido"
        >
          Seguir
        </Botao>
      </VitrineExemplo>

      <VitrineExemplo rotulo="Largura total (Mostrar mais no fim da lista)">
        <Botao variante="secundario" largo icone="expand_more" iconeDireita>
          Mostrar mais 6 pedidos
        </Botao>
      </VitrineExemplo>

      <VitrineExemplo rotulo="Grupos: par (secundário à esquerda) e formulário">
        <GrupoBotoes>
          <Botao variante="secundario">Cancelar</Botao>
          <Botao variante="principal">Salvar</Botao>
        </GrupoBotoes>
        <GrupoBotoes formulario>
          <Botao variante="secundario" icone="arrow_back">
            Voltar
          </Botao>
          <Botao variante="principal" icone="arrow_forward" iconeDireita>
            Continuar
          </Botao>
        </GrupoBotoes>
      </VitrineExemplo>

      <VitrineExemplo rotulo="Topo (32): A−, A, A+ e Alto contraste ficam no Topo" linha>
        <Botao variante="topo">A−</Botao>
        <Botao variante="topo" pressionado iconeLigado={null}>
          A
        </Botao>
        <Botao variante="topo" icone="contrast" iconeLigado="contrast" pressionado={false}>
          Alto contraste
        </Botao>
      </VitrineExemplo>
    </VitrineSecao>
  );
}
