import { useState } from 'react';
import Icone from '../Icone';
import { CATEGORIAS_SERVICOS } from '../../dados/categoriasServicos';
import { servicosDaCategoria } from '../../logica/servicos';
import classes from './FiltroAssunto.module.css';

// Total de serviços do catálogo (o "Todos" da lista)
const TOTAL = CATEGORIAS_SERVICOS.reduce(
  (soma, categoria) => soma + servicosDaCategoria(categoria.id).length,
  0,
);

// Filtro "Assunto" do catálogo no celular (no computador ficam os chips ao lado da lista).
// Botão de largura total, preso no alto ao rolar; aberto, mostra a lista de assuntos com a
// contagem e o escolhido marcado com check.
// Recebe o assunto escolhido (escolhido: "todos" ou o id da categoria) e aoEscolher(id).
export default function FiltroAssunto({ escolhido, aoEscolher }) {
  const [aberto, setAberto] = useState(false);
  const atual = CATEGORIAS_SERVICOS.find((categoria) => categoria.id === escolhido);
  const opcoes = [
    { id: 'todos', nome: 'Todos', icone: 'apps', contagem: TOTAL },
    ...CATEGORIAS_SERVICOS.map((categoria) => ({
      id: categoria.id,
      nome: categoria.nome,
      icone: categoria.icone,
      contagem: servicosDaCategoria(categoria.id).length,
    })),
  ];

  // Escolhe o assunto, fecha a lista e volta ao começo do catálogo
  function escolher(id) {
    aoEscolher(id);
    setAberto(false);
  }

  return (
    <div className={classes.filtro}>
      <button
        type="button"
        className={`${classes.botao} ${atual ? classes.ativo : ''}`}
        aria-expanded={aberto}
        aria-controls="lista-assuntos"
        onClick={() => setAberto(!aberto)}
      >
        <Icone nome="filter_list" tamanho={22} />
        <span className={classes.rotulo}>Assunto: {atual ? atual.nome : 'Todos'}</span>
        <Icone nome={aberto ? 'expand_less' : 'expand_more'} tamanho={22} />
      </button>
      {aberto && (
        <ul className={classes.lista} id="lista-assuntos">
          {opcoes.map((opcao) => {
            const marcado = opcao.id === escolhido;
            return (
              <li key={opcao.id}>
                <button
                  type="button"
                  className={`${classes.opcao} ${marcado ? classes.marcado : ''}`}
                  aria-pressed={marcado}
                  onClick={() => escolher(opcao.id)}
                >
                  <Icone nome={opcao.icone} tamanho={22} />
                  <span className={classes.rotulo}>{opcao.nome}</span>
                  <span className={classes.contagem}>{opcao.contagem}</span>
                  {marcado && <Icone nome="check" tamanho={22} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
