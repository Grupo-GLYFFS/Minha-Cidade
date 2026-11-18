import Botao from '../Botao';
import CardPedido from '../CardPedido';
import Cartao from '../Cartao';
import LinhaDado from '../LinhaDado';
import SecaoCard from '../SecaoCard';
import SeloSituacao from '../SeloSituacao';
import VitrineExemplo from './VitrineExemplo';
import VitrineSecao from './VitrineSecao';
import { PEDIDOS } from '../../dados/pedidos';
import classes from './Vitrine.module.css';

// Seção de cards da /componentes (regras 3 e 17): SecaoCard, LinhaDado, Cartao e CardPedido.
export default function VitrineCards() {
  return (
    <VitrineSecao
      id="cards"
      titulo="Cards"
      arquivo="SecaoCard.jsx · LinhaDado.jsx · Cartao.jsx · CardPedido.jsx"
    >
      <VitrineExemplo rotulo="SecaoCard com lista de LinhaDado e ação na faixa do título">
        <SecaoCard
          titulo="Seus dados"
          lista
          acao={
            <Botao variante="texto" compacto icone="edit">
              Editar
            </Botao>
          }
        >
          <LinhaDado icone="person" rotulo="Nome" valor="Maria Souza" />
          <LinhaDado icone="mail" rotulo="E-mail" valor="maria@exemplo.com" />
          <LinhaDado icone="home" rotulo="Endereço" valor="Rua Joaquim Távora, 120" />
          <LinhaDado icone="settings" rotulo="Configurações" para="/configuracoes" />
        </SecaoCard>
      </VitrineExemplo>

      <VitrineExemplo rotulo="SecaoCard com contagem e corpo livre">
        <SecaoCard titulo="Andamento" contagem={4}>
          <p>O conteúdo da seção fica aqui, com 24 em cima e 32 nos lados.</p>
        </SecaoCard>
      </VitrineExemplo>

      <VitrineExemplo rotulo="Cartao que leva a outra página (para + seta)">
        <Cartao para="/minha-cidade/subprefeituras/vila-mariana" seta>
          <h3>Subprefeitura Vila Mariana</h3>
          <p>Quem cuida do seu bairro</p>
        </Cartao>
      </VitrineExemplo>

      <VitrineExemplo rotulo="Cartao com faixas de cima e de baixo">
        <Cartao
          topo={<SeloSituacao cor="azul">Agendada</SeloSituacao>}
          rodape={
            <Botao variante="secundario" compacto icone="event_repeat">
              Remarcar
            </Botao>
          }
        >
          <h3>Castração gratuita de cão ou gato</h3>
          <p>Sábado, 14 de novembro, 8h30</p>
        </Cartao>
      </VitrineExemplo>

      <VitrineExemplo rotulo="CardPedido (toda lista de pedidos; sem botões, só a seta)">
        <ul className={classes.lista}>
          {PEDIDOS.slice(0, 3).map((pedido) => (
            <li key={pedido.id}>
              <CardPedido pedido={pedido} />
            </li>
          ))}
        </ul>
      </VitrineExemplo>
    </VitrineSecao>
  );
}
