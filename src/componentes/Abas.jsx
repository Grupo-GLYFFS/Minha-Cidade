import { useRef } from 'react';
import classes from './Abas.module.css';

// Abas de uma lista (ex.: Votações | Obras | Pedidos em O que você segue), sempre com contagem.
// Recebe:
// - abas: [{ id, rotulo, contagem }];
// - ativa: id da aba escolhida; aoMudar(id): chamada ao escolher outra;
// - rotulo: nome do grupo para o leitor de tela (ex.: "Tipo de pedido");
// - prefixo: base dos ids. A aba "x" tem id "<prefixo>-aba-x" e controla o painel
//   "<prefixo>-painel-x": dê esse id ao painel, com role="tabpanel" e aria-labelledby da aba.
// Setas esquerda e direita trocam de aba pelo teclado.
export default function Abas({ abas, ativa, aoMudar, rotulo, prefixo = 'abas' }) {
  const lista = useRef(null);

  // Setas do teclado: vai para a aba vizinha (dá a volta no fim) e já escolhe
  function aoTeclar(evento) {
    if (evento.key !== 'ArrowRight' && evento.key !== 'ArrowLeft') return;
    evento.preventDefault();
    const atual = abas.findIndex((aba) => aba.id === ativa);
    const passo = evento.key === 'ArrowRight' ? 1 : -1;
    const proxima = abas[(atual + passo + abas.length) % abas.length];
    aoMudar(proxima.id);
    lista.current.querySelector(`#${prefixo}-aba-${proxima.id}`)?.focus();
  }

  return (
    <div
      className={classes.abas}
      role="tablist"
      aria-label={rotulo}
      ref={lista}
      onKeyDown={aoTeclar}
    >
      {abas.map((aba) => {
        const selecionada = aba.id === ativa;
        return (
          <button
            key={aba.id}
            type="button"
            role="tab"
            id={`${prefixo}-aba-${aba.id}`}
            aria-selected={selecionada}
            aria-controls={`${prefixo}-painel-${aba.id}`}
            tabIndex={selecionada ? 0 : -1}
            className={classes.aba}
            onClick={() => aoMudar(aba.id)}
          >
            {aba.rotulo}
            {aba.contagem !== undefined && <span className={classes.contagem}>{aba.contagem}</span>}
          </button>
        );
      })}
    </div>
  );
}
