import Botao from '../Botao';
import CabecalhoPagina from '../CabecalhoPagina';
import MetaCabecalho from '../MetaCabecalho';
import SeloSituacao from '../SeloSituacao';
import MapaExemplo from './MapaExemplo';
import VitrineExemplo from './VitrineExemplo';
import VitrineSecao from './VitrineSecao';

const CIDADE = { rotulo: 'Cidade de São Paulo', para: '/minha-cidade' };

// Seção de cabeçalhos da /componentes: um exemplo de cada tipo da regra 16.
export default function VitrineCabecalhos() {
  return (
    <VitrineSecao
      id="cabecalhos"
      titulo="Cabeçalho da página"
      arquivo="CabecalhoPagina.jsx · MetaCabecalho.jsx · Trilha.jsx"
    >
      <VitrineExemplo moldura rotulo='tipo="lista": ícone 64 + título 48'>
        <CabecalhoPagina
          tipo="lista"
          titulo="Obras da cidade de São Paulo"
          icone="construction"
          trilha={[CIDADE, { rotulo: 'Obras' }]}
        />
      </VitrineExemplo>

      <VitrineExemplo moldura rotulo='tipo="hub": mapa 880 × 220'>
        <CabecalhoPagina
          tipo="hub"
          titulo="Subprefeitura Vila Mariana"
          midia={<MapaExemplo />}
          trilha={[CIDADE, { rotulo: 'Subprefeitura Vila Mariana' }]}
        />
      </VitrineExemplo>

      <VitrineExemplo
        moldura
        rotulo='tipo="detalhe" com imagem (880 × 240), categoria, meta e ações'
      >
        <CabecalhoPagina
          tipo="detalhe"
          titulo="Recuperação do asfalto no corredor da Avenida Ibirapuera"
          midia={<MapaExemplo />}
          categoria={{ icone: 'add_road', rotulo: 'Pavimentação' }}
          trilha={[
            CIDADE,
            { rotulo: 'Obras', para: '/minha-cidade/obras' },
            { rotulo: 'Recuperação do asfalto no corredor da Avenida Ibirapuera' },
          ]}
          acoes={
            <>
              <Botao variante="secundario" icone="add" pressionado>
                Seguindo
              </Botao>
              <Botao variante="icone-acao" icone="share" aria-label="Compartilhar obra" />
            </>
          }
        >
          <MetaCabecalho>
            <SeloSituacao cor="verde">No prazo</SeloSituacao>
            <span>Moema · atualizada há 3 dias</span>
          </MetaCabecalho>
        </CabecalhoPagina>
      </VitrineExemplo>

      <VitrineExemplo moldura rotulo='tipo="detalhe" sem imagem: ícone 64 da categoria'>
        <CabecalhoPagina
          tipo="detalhe"
          titulo="Passar R$ 400 mil dos eventos de rua para calçadas acessíveis"
          icone="accessible"
          categoria={{ icone: 'swap_horiz', rotulo: 'Mudança de verba' }}
          trilha={[
            CIDADE,
            { rotulo: 'Votações', para: '/minha-cidade/votacoes' },
            { rotulo: 'Calçadas acessíveis' },
          ]}
        />
      </VitrineExemplo>

      <VitrineExemplo moldura rotulo='tipo="formulario": etapas embaixo do título'>
        <CabecalhoPagina
          tipo="formulario"
          titulo="Abrir pedido"
          etapas={['Descreva o problema', 'Onde fica', 'Fotos', 'Revisar']}
          etapaAtual={2}
          trilha={[
            CIDADE,
            { rotulo: 'Pedidos', para: '/minha-cidade/pedidos' },
            { rotulo: 'Abrir pedido' },
          ]}
        />
      </VitrineExemplo>

      <VitrineExemplo moldura rotulo='tipo="confirmacao": check verde de 40, sem trilha'>
        <CabecalhoPagina
          tipo="confirmacao"
          titulo="Pedido enviado"
          subtitulo="Buraco grande na faixa da direita"
        />
      </VitrineExemplo>

      <VitrineExemplo moldura rotulo='tipo="conta": só o título'>
        <CabecalhoPagina tipo="conta" titulo="Configurações" />
      </VitrineExemplo>
    </VitrineSecao>
  );
}
