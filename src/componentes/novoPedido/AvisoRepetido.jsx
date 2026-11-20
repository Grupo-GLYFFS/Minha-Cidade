import { useEffect, useRef } from 'react';
import Icone from '../Icone';
import Botao from '../Botao';
import CardPedido from '../CardPedido';
import classes from './NovoPedido.module.css';

// Aviso de pedido repetido, na etapa "Onde fica", assim que categoria, bairro e rua batem
// com um pedido aberto. O pedido não é criado: a pessoa vê o que já existe (para apoiar)
// ou volta para editar. Ao aparecer, o título recebe o foco e é lido pelo leitor de tela.
// Recebe o pedido que já existe, ehSeu (o pedido é da própria pessoa) e aoEditar().
export default function AvisoRepetido({ pedido, ehSeu, aoEditar }) {
  const titulo = useRef(null);

  // Leva o foco ao aviso quando ele aparece ou muda de pedido
  useEffect(() => {
    titulo.current?.focus();
  }, [pedido.id]);

  return (
    <section
      className={classes.repetido}
      aria-labelledby="aviso-repetido"
      id="aviso-repetido-caixa"
    >
      <div className={classes.repetidoCab}>
        <span className={classes.repetidoIcone} aria-hidden="true">
          <Icone nome="content_copy" tamanho={22} />
        </span>
        <div>
          <h3 className={classes.repetidoTitulo} id="aviso-repetido" tabIndex={-1} ref={titulo}>
            {ehSeu ? 'Você já abriu este pedido' : 'Já existe um pedido igual aberto'}
          </h3>
          <p className={classes.repetidoTexto}>
            {ehSeu
              ? 'Existe um pedido seu, ainda aberto, com a mesma categoria nesta rua. Acompanhe por ele: pedidos repetidos atrasam a análise.'
              : 'Alguém já pediu o mesmo conserto nesta rua. Pedidos repetidos atrasam a análise. Apoiando, você aumenta a prioridade do pedido que já existe.'}
          </p>
        </div>
      </div>
      <div className={classes.repetidoPedido}>
        <CardPedido
          pedido={pedido}
          nivelTitulo={4}
        />
      </div>
      <div className={classes.repetidoBotoes}>
        <Botao variante="texto" compacto icone="edit" onClick={aoEditar}>
          Voltar e editar
        </Botao>
        <Botao
          variante={ehSeu ? 'principal' : 'secundario'}
          compacto
          icone="arrow_forward"
          iconeDireita
          para={`/minha-cidade/pedidos/${pedido.id}`}
        >
          {ehSeu ? 'Ver o seu pedido' : 'Ver o pedido'}
        </Botao>
      </div>
    </section>
  );
}
