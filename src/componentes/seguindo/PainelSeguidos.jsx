import Botao from '../Botao';
import EstadoVazio from '../EstadoVazio';
import SeloTipo from './SeloTipo';
import GruposVotacoes from '../votacoes/GruposVotacoes';
import GruposObras from '../obras/GruposObras';
import GrupoPedidos from '../pedidos/GrupoPedidos';
import { agruparPorSituacao } from '../../logica/gruposPedidos';
import classes from './PainelSeguidos.module.css';

// Textos do estado vazio de cada aba e para onde o botão leva
const VAZIOS = {
  votacoes: {
    icone: 'how_to_vote',
    titulo: 'Você ainda não segue nenhuma votação',
    texto: 'Siga uma votação para saber quando ela terminar e o que a prefeitura decidiu.',
    botao: 'Ver as votações',
    para: '/minha-cidade/votacoes',
  },
  obras: {
    icone: 'construction',
    titulo: 'Você ainda não segue nenhuma obra',
    texto: 'Siga uma obra para acompanhar o andamento e a previsão de entrega aqui.',
    botao: 'Ver as obras',
    para: '/minha-cidade/obras',
  },
  pedidos: {
    icone: 'assignment',
    titulo: 'Você ainda não segue nenhum pedido',
    texto: 'Siga um pedido de outra pessoa para acompanhar o andamento dele aqui.',
    botao: 'Ver os pedidos',
    para: '/minha-cidade/pedidos',
  },
};

// Conteúdo de uma aba de "O que você segue": os itens agrupados pela situação, com o selo de
// tipo em cada card, ou o estado vazio da aba.
// Recebe a aba ("votacoes", "obras" ou "pedidos"), as listas (votacoes, obras, pedidos)
// e o Seguir de obras e votações ({ segue, alternar, logado } do useSeguidos).
export default function PainelSeguidos({ aba, listas, seguirObras, seguirVotacoes }) {
  const itens = listas[aba];

  if (itens.length === 0) {
    const vazio = VAZIOS[aba];
    return (
      <EstadoVazio icone={vazio.icone} titulo={vazio.titulo} texto={vazio.texto}>
        <Botao variante="secundario" para={vazio.para}>
          {vazio.botao}
        </Botao>
      </EstadoVazio>
    );
  }

  if (aba === 'votacoes') {
    return (
      <GruposVotacoes
        projetos={itens}
        prefixo="seguindo"
        seguir={seguirVotacoes}
        selo={<SeloTipo tipo="votacao" />}
        imagemAEsquerda
      />
    );
  }

  if (aba === 'obras') {
    return (
      <GruposObras
        obras={itens}
        base="/minha-cidade"
        prefixo="seguindo"
        segue={seguirObras.segue}
        alternar={seguirObras.alternar}
        logado={seguirObras.logado}
        selo={<SeloTipo tipo="obra" />}
      />
    );
  }

  return (
    <div className={classes.grupos}>
      {agruparPorSituacao(itens).map((grupo) => (
        <GrupoPedidos
          key={grupo.id}
          grupo={grupo}
          prefixo="seguindo"
          selo={<SeloTipo tipo="pedido" />}
        />
      ))}
    </div>
  );
}
