import { useState } from 'react';
import TituloGrupo from '../TituloGrupo';
import CardPedido from '../CardPedido';
import Botao from '../Botao';
import IlustracaoPedido from './IlustracaoPedido';
import { PEDIDOS_POR_GRUPO, textoMostrarMais } from '../../logica/gruposPedidos';
import classes from './ListaPedidos.module.css';

// Um grupo da lista de pedidos (ex.: "Em execução"): título com bolinha e contagem,
// os cards e, quando há mais que o limite, o botão "Mostrar mais n pedidos …".
// Recebe o grupo ({ id, titulo, cor, pedidos, singular, plural }), o prefixo dos ids
// o limite (sem limite, mostra todos) e um selo opcional para o começo de cada card.
export default function GrupoPedidos({ grupo, prefixo, limite = PEDIDOS_POR_GRUPO, selo }) {
  const [aberto, setAberto] = useState(false);
  const idTitulo = `${prefixo}-${grupo.id}`;
  const idLista = `${idTitulo}-lista`;
  const faltam = limite ? grupo.pedidos.length - limite : 0;
  const visiveis = aberto || faltam <= 0 ? grupo.pedidos : grupo.pedidos.slice(0, limite);

  return (
    <section className={classes.grupo} aria-labelledby={idTitulo}>
      <TituloGrupo
        titulo={grupo.titulo}
        contagem={grupo.pedidos.length}
        cor={grupo.cor}
        id={idTitulo}
      />
      <ul className={classes.cards} id={idLista}>
        {visiveis.map((pedido) => (
          <li key={pedido.id}>
            <CardPedido
              pedido={pedido}
              selo={selo}
              midia={pedido.ilustracao && <IlustracaoPedido nome={pedido.ilustracao} />}
            />
          </li>
        ))}
      </ul>
      {faltam > 0 && (
        <Botao
          variante="secundario"
          largo
          icone={aberto ? 'expand_less' : 'expand_more'}
          iconeDireita
          aria-expanded={aberto}
          aria-controls={idLista}
          onClick={() => setAberto((atual) => !atual)}
        >
          {aberto ? 'Mostrar menos' : textoMostrarMais(grupo, faltam)}
        </Botao>
      )}
    </section>
  );
}
