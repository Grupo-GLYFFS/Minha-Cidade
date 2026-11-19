import { useState } from 'react';
import Botao from '../Botao';
import GrupoBotoes from '../GrupoBotoes';
import Icone from '../Icone';
import PopupBusca from '../servicos/PopupBusca';
import classes from './EnderecoInexistente.module.css';

// Aviso da página "Página não encontrada" (38): ícone vermelho, o que houve, o que fazer
// e dois caminhos (Buscar no app, que abre o popup de busca do topo, e Ir para o início),
// tudo alinhado à esquerda.
export default function EnderecoInexistente() {
  const [buscaAberta, setBuscaAberta] = useState(false);

  return (
    <div className={classes.aviso}>
      <span className={classes.icone} aria-hidden="true">
        <Icone nome="link_off" tamanho={28} />
      </span>
      <h2 className={classes.titulo}>Não existe nenhuma página neste endereço</h2>
      <p className={classes.texto}>
        O link pode estar incompleto ou a página mudou de lugar. Confira o endereço ou comece por
        uma das páginas abaixo.
      </p>
      <div className={classes.acoes}>
        <GrupoBotoes>
          <Botao
            variante="secundario"
            icone="search"
            aria-haspopup="dialog"
            aria-expanded={buscaAberta}
            onClick={() => setBuscaAberta(true)}
          >
            Buscar no app
          </Botao>
          <Botao variante="principal" para="/inicio">
            Ir para o início
          </Botao>
        </GrupoBotoes>
      </div>
      <PopupBusca aberto={buscaAberta} aoFechar={() => setBuscaAberta(false)} />
    </div>
  );
}
