import Botao from '../Botao';
import EstadoCarregando from '../EstadoCarregando';
import EstadoErro from '../EstadoErro';
import EstadoVazio from '../EstadoVazio';
import NaoEncontrado from '../NaoEncontrado';
import VitrineExemplo from './VitrineExemplo';
import VitrineSecao from './VitrineSecao';

// Seção de estados da /componentes: vazio, carregando, erro e não encontrado.
// Toda lista e todo detalhe precisa deles (regra 13).
export default function VitrineEstados() {
  return (
    <VitrineSecao
      id="estados"
      titulo="Estados"
      arquivo="EstadoVazio.jsx · EstadoCarregando.jsx · EstadoErro.jsx · NaoEncontrado.jsx"
    >
      <VitrineExemplo rotulo="EstadoVazio">
        <EstadoVazio
          titulo="Você ainda não abriu nenhum pedido"
          texto="Quando você avisar um problema na rua, ele aparece aqui com o protocolo e o andamento."
        >
          <Botao variante="principal" icone="add" para="/pedidos/novo">
            Abrir pedido
          </Botao>
        </EstadoVazio>
      </VitrineExemplo>

      <VitrineExemplo rotulo="EstadoCarregando">
        <EstadoCarregando texto="Carregando os pedidos…" />
      </VitrineExemplo>

      <VitrineExemplo rotulo="EstadoErro">
        <EstadoErro titulo="Não conseguimos carregar os pedidos agora" aoTentarDeNovo={() => {}} />
      </VitrineExemplo>

      <VitrineExemplo rotulo="NaoEncontrado (página inteira, dentro de <Pagina> sem cabeçalho)">
        <NaoEncontrado
          titulo="Não encontramos este pedido"
          texto="O link pode estar incompleto ou o pedido foi removido."
        >
          <Botao variante="secundario" para="/inicio">
            Ir para o início
          </Botao>
          <Botao variante="principal" para="/minha-cidade/pedidos">
            Ver os pedidos
          </Botao>
        </NaoEncontrado>
      </VitrineExemplo>
    </VitrineSecao>
  );
}
