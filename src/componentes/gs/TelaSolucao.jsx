import Icone from '../Icone';
import MapaBairroGs from './MapaBairroGs';
import classes from './TelaSolucao.module.css';

// Celular desenhado de uma das 4 áreas da seção "A solução" (só ilustração, sem links).
// Recebe tela ("servicos", "pedidos", "cidade" ou "bairro") e alt (lido no lugar do desenho).
// O celular é montado a 276 × 499 e reduzido por zoom no CSS.

const SERVICOS = [
  { icone: 'medical_services', nome: 'Agendar consulta na UBS', info: 'Pelo app · 2 dias' },
  { icone: 'id_card', nome: 'Fazer o Cartão SUS', info: 'Na UBS, com RG e CPF' },
  { icone: 'vaccines', nome: 'Tomar vacina', info: 'Sem agendamento' },
  { icone: 'medication', nome: 'Retirar remédio grátis', info: 'Com receita do SUS' },
  { icone: 'school', nome: 'Vaga em creche ou escola', info: 'Pelo app' },
];

const PEDIDOS = [
  { etapa: 'Em execução', tom: 'azul', nome: 'Poste apagado há duas semanas', info: 'Vila Mariana · 23 apoios', feitas: 4 },
  { etapa: 'Em análise', tom: 'ambar', nome: 'Buraco grande na faixa da direita', info: 'Vila Mariana · 5 apoios', feitas: 3 },
  { etapa: 'Concluído', tom: 'verde', nome: 'Galhos encostando na fiação', info: 'Moema · 12 apoios', feitas: 5 },
  { etapa: 'Recebido', tom: 'cinza', nome: 'Semáforo piscando no cruzamento', info: 'Pinheiros · 8 apoios', feitas: 1 },
];

const BAIRRO = [
  { icone: 'assignment', nome: 'Poste apagado há duas semanas', info: 'Pedido · Em execução' },
  { icone: 'construction', nome: 'Recapeamento da Rua Domingos de Morais', info: 'Obra · No prazo' },
  { icone: 'park', nome: 'Reforma da Praça Ana Rosa', info: 'Obra · Concluída' },
  { icone: 'campaign', nome: 'Aviso da Sabesp', info: 'Aviso · hoje' },
];

function Topo({ titulo, linha, children }) {
  return (
    <div className={classes.topo}>
      <p className={classes.titulo}>{titulo}</p>
      <p className={classes.linha}>{linha}</p>
      {children}
    </div>
  );
}

function Lista({ itens, seta = false }) {
  return (
    <ul className={classes.lista}>
      {itens.map((item) => (
        <li key={item.nome} className={classes.itemLista}>
          <Icone nome={item.icone} tamanho={18} className={classes.iconeItem} />
          <span className={classes.textos}>
            <span className={classes.nomeItem}>{item.nome}</span>
            <span className={classes.info}>{item.info}</span>
          </span>
          {seta && <Icone nome="chevron_right" tamanho={18} className={classes.seta} />}
        </li>
      ))}
    </ul>
  );
}

function Servicos() {
  return (
    <>
      <Topo titulo="Serviços" linha="66 serviços em 12 assuntos">
        <div className={classes.busca}>
          <Icone nome="search" tamanho={18} className={classes.iconeBusca} />
          Buscar serviço
        </div>
      </Topo>
      <div className={classes.corpo}>
        <div className={classes.chips}>
          <span className={`${classes.chip} ${classes.chipAtivo}`}>Saúde</span>
          <span className={classes.chip}>Educação</span>
          <span className={classes.chip}>Impostos</span>
        </div>
        <Lista itens={SERVICOS} seta />
      </div>
    </>
  );
}

function Pedidos() {
  return (
    <>
      <Topo titulo="Pedidos da cidade" linha="35 pedidos, 913 apoios" />
      <div className={classes.corpo}>
        {PEDIDOS.map((pedido) => (
          <div key={pedido.nome} className={classes.card}>
            <span className={`${classes.etapa} ${classes[pedido.tom]}`}>{pedido.etapa}</span>
            <span className={classes.nomeCard}>{pedido.nome}</span>
            <span className={classes.info}>{pedido.info}</span>
            <span className={classes.barras}>
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={n <= pedido.feitas ? classes.barraFeita : classes.barra} />
              ))}
            </span>
          </div>
        ))}
        <span className={classes.botao}>
          <Icone nome="add" tamanho={18} className={classes.iconeBotao} />
          Abrir pedido
        </span>
      </div>
    </>
  );
}

function Cidade() {
  return (
    <>
      <Topo titulo="Cidade de São Paulo" linha="Orçamento, votações e obras" />
      <div className={classes.corpo}>
        <div className={classes.card}>
          <span className={classes.nomeCard}>Votação aberta</span>
          <span className={classes.nomeVotacao}>Corredor de ônibus na Avenida Jabaquara</span>
          <span className={classes.info}>Termina em 18 de novembro</span>
          <span className={classes.botoesVoto}>
            <span className={classes.sim}>Sim</span>
            <span className={classes.nao}>Não</span>
          </span>
        </div>
        <div className={classes.card}>
          <span className={classes.nomeCard}>Orçamento pago</span>
          <span className={classes.orcamento}>
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className={classes.info}>Saúde, educação, transporte e outros</span>
        </div>
        <div className={classes.card}>
          <span className={classes.linhaCard}>
            <span className={classes.nomeCard}>14 obras</span>
            <span className={`${classes.etapa} ${classes.verde}`}>6 no prazo</span>
          </span>
          <span className={classes.info}>Nova UBS Butantã · Creche CEI Penha</span>
        </div>
        <div className={classes.card}>
          <span className={classes.linhaCard}>
            <span className={classes.nomeCard}>Avisos</span>
            <span className={`${classes.etapa} ${classes.azul}`}>4 hoje</span>
          </span>
          <span className={classes.info}>Falta de água na Vila Mariana · Feira na Penha</span>
        </div>
      </div>
    </>
  );
}

function Bairro() {
  return (
    <>
      <Topo titulo="Vila Mariana" linha="Subprefeitura Vila Mariana" />
      <div className={classes.corpo}>
        <span className={classes.alerta}>
          <Icone nome="warning" tamanho={18} className={classes.iconeItem} />
          Chuva forte prevista para hoje à tarde
        </span>
        <MapaBairroGs />
        <Lista itens={BAIRRO} />
      </div>
    </>
  );
}

const TELAS = { servicos: Servicos, pedidos: Pedidos, cidade: Cidade, bairro: Bairro };

export default function TelaSolucao({ tela, alt }) {
  const Tela = TELAS[tela];
  return (
    <div className={classes.celular} role="img" aria-label={alt}>
      <div className={classes.tela}>
        <Tela />
      </div>
    </div>
  );
}
