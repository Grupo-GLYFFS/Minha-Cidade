import { Link } from 'react-router-dom';
import Botao from '../Botao';
import PainelConta from './PainelConta';
import classes from './MolduraConta.module.css';

// Moldura das páginas Entrar, Criar conta e Esqueci minha senha (prancha AC2):
// painel azul à esquerda e o formulário à direita, sem Topo e sem Rodapé.
// No celular, o formulário vem primeiro e o painel azul fica embaixo.
// Recebe:
// - painel: "entrar" (o que a conta permite) ou "endereco" (o endereço define o bairro);
// - bairro: bairro mostrado no painel "endereco" (o do CEP digitado);
// - titulo (h1) e texto (linha embaixo do título, pode ter link);
// - children: o formulário e o que vem depois dele.
export default function MolduraConta({ painel = 'entrar', bairro, titulo, texto, children }) {
  return (
    <div className={classes.tela}>
      <main className={classes.lado} id="conteudo">
        <div className={classes.barra}>
          <Link
            to="/inicio"
            className={classes.logo}
            aria-label="Minha Prefeitura, ir para o início"
          >
            <img
              className={classes.logoIcone}
              src="/img/logo-icone.png"
              alt=""
              width="40"
              height="40"
            />
            <span className={classes.logoNome} aria-hidden="true">
              Minha Prefeitura
            </span>
          </Link>
          <Botao variante="texto" icone="arrow_back" para="/inicio" className={classes.voltar}>
            Voltar ao início
          </Botao>
        </div>

        <div className={classes.coluna}>
          <h1 className={classes.titulo}>{titulo}</h1>
          {texto && <p className={classes.texto}>{texto}</p>}
          {children}
        </div>
      </main>

      <PainelConta tipo={painel} bairro={bairro} />
    </div>
  );
}
