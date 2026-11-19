import { Component } from 'react';
import Botao from './Botao';
import Icone from './Icone';
import { apagarTudo } from '../armazenamento';
import estados from './Estados.module.css';
import classes from './ErroDoApp.module.css';

// Recarrega a página do jeito que está
function recarregar() {
  window.location.reload();
}

// Apaga os dados do app neste navegador (contas, pedidos, sessão…) e abre o início de novo
function limparDados() {
  apagarTudo({ aba: true });
  window.location.hash = '#/inicio';
  window.location.reload();
}

// Rede de segurança do app: se alguma tela quebrar (ex.: dado do navegador num formato
// estranho), mostra "Algo deu errado" no lugar da tela branca, com "Recarregar" e
// "Limpar dados do app". Recebe as telas do app (children).
// É uma classe porque só componentes de classe conseguem pegar erros da renderização.
export default class ErroDoApp extends Component {
  constructor(props) {
    super(props);
    this.state = { quebrou: false };
  }

  // Marca que alguma tela quebrou (o React chama isto quando um filho dá erro)
  static getDerivedStateFromError() {
    return { quebrou: true };
  }

  render() {
    if (!this.state.quebrou) return this.props.children;
    return (
      <main className={classes.tela}>
        <div className={estados.naoEncontrado}>
          <span className={estados.icone}>
            <Icone nome="error" tamanho={28} />
          </span>
          <h1 className={estados.tituloPagina}>Algo deu errado</h1>
          <p className={estados.texto}>
            Recarregue a página. Se continuar, limpe os dados do app neste navegador: as contas e os
            pedidos criados aqui serão apagados.
          </p>
          <div className={estados.acoes}>
            <Botao variante="principal" icone="refresh" onClick={recarregar}>
              Recarregar
            </Botao>
            <Botao variante="secundario" icone="delete" onClick={limparDados}>
              Limpar dados do app
            </Botao>
          </div>
        </div>
      </main>
    );
  }
}
