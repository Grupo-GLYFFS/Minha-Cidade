import { useEffect, useRef, useState } from 'react';
import Chip from '../Chip';
import CardServico from './CardServico';
import FiltroAssunto from './FiltroAssunto';
import { CATEGORIAS_SERVICOS } from '../../dados/categoriasServicos';
import { servicosDaCategoria } from '../../logica/servicos';
import classes from './CatalogoServicos.module.css';

// Id do bloco de um assunto na página (é o alvo do chip). Recebe o id do assunto.
function idAssunto(idCategoria) {
  return `assunto-${idCategoria}`;
}

// Catálogo "Todos os serviços": os assuntos como chips à esquerda e, à direita,
// os serviços de todos os assuntos numa área que rola. Clicar num chip leva ao assunto
// e o chip do assunto visível fica marcado. No celular, os chips quebram linha em cima
// e a lista vem inteira embaixo (sem área de rolagem própria).
// Recebe a categoria que abre marcada (ex.: vinda de /servicos?categoria=saude).
export default function CatalogoServicos({ categoriaInicial }) {
  const [ativa, setAtiva] = useState(categoriaInicial ?? CATEGORIAS_SERVICOS[0].id);
  // Assunto do filtro do celular ("todos" ou o id): os outros grupos somem só no celular
  const [filtro, setFiltro] = useState(categoriaInicial ?? 'todos');
  const area = useRef(null);

  // Leva a área (ou a página, no celular) até o bloco do assunto
  function irPara(idCategoria, suave = true) {
    const bloco = document.getElementById(idAssunto(idCategoria));
    const rolagem = area.current;
    if (!bloco || !rolagem) return;
    const comoRolar = suave ? 'smooth' : 'auto';
    if (rolagem.scrollHeight > rolagem.clientHeight) {
      // A área tem position: relative, então offsetTop já é medido a partir dela
      rolagem.scrollTo({ top: bloco.offsetTop, behavior: comoRolar });
    } else {
      bloco.scrollIntoView({ behavior: comoRolar, block: 'start' });
    }
  }

  // Abre já no assunto pedido no endereço (só na primeira vez)
  const inicial = useRef(categoriaInicial);
  useEffect(() => {
    if (inicial.current) irPara(inicial.current, false);
  }, []);

  // Ao rolar a área, marca o último assunto cujo título já passou do topo
  function aoRolar() {
    const rolagem = area.current;
    const topo = rolagem.scrollTop + 8;
    let atual = CATEGORIAS_SERVICOS[0].id;
    CATEGORIAS_SERVICOS.forEach((categoria) => {
      const bloco = document.getElementById(idAssunto(categoria.id));
      if (bloco && bloco.offsetTop <= topo) atual = categoria.id;
    });
    // No fim da área, o último assunto conta como visível
    if (rolagem.scrollTop + rolagem.clientHeight >= rolagem.scrollHeight - 2) {
      atual = CATEGORIAS_SERVICOS[CATEGORIAS_SERVICOS.length - 1].id;
    }
    setAtiva(atual);
  }

  // Clique no chip: marca o assunto e rola até ele, sem mudar o endereço
  function escolher(evento, idCategoria) {
    evento.preventDefault();
    setAtiva(idCategoria);
    irPara(idCategoria);
  }

  return (
    <div className={classes.bloco}>
      <FiltroAssunto escolhido={filtro} aoEscolher={setFiltro} />
      <nav className={classes.assuntos} aria-label="Assuntos">
        <ul className={classes.chips}>
          {CATEGORIAS_SERVICOS.map((categoria) => (
            <li key={categoria.id}>
              <Chip
                href={`#${idAssunto(categoria.id)}`}
                icone={categoria.icone}
                contagem={servicosDaCategoria(categoria.id).length}
                aria-current={ativa === categoria.id ? 'true' : undefined}
                onClick={(evento) => escolher(evento, categoria.id)}
              >
                <span className={classes.nomeChip}>{categoria.nome}</span>
              </Chip>
            </li>
          ))}
        </ul>
      </nav>

      <div
        ref={area}
        className={classes.area}
        role="region"
        aria-label="Serviços por assunto"
        tabIndex={0}
        onScroll={aoRolar}
      >
        {CATEGORIAS_SERVICOS.map((categoria) => (
          <section
            key={categoria.id}
            id={idAssunto(categoria.id)}
            className={
              filtro === 'todos' || filtro === categoria.id
                ? classes.grupo
                : `${classes.grupo} ${classes.foraDoFiltro}`
            }
            aria-labelledby={`${idAssunto(categoria.id)}-t`}
          >
            <h3 className={classes.tituloGrupo} id={`${idAssunto(categoria.id)}-t`}>
              <span className={classes.bolinha} aria-hidden="true" />
              <span className={classes.nomeGrupo}>{categoria.nome}</span>
              <span className={classes.contagem}>
                {servicosDaCategoria(categoria.id).length}
              </span>
              <span className={classes.linhaGrupo} aria-hidden="true" />
            </h3>
            <ul className={classes.cards}>
              {servicosDaCategoria(categoria.id).map((servico) => (
                <li key={servico.id}>
                  <CardServico servico={servico} emLista />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
