import { useEffect } from 'react';
import Logo from '../Logo';
import PainelConta from './PainelConta';
import classes from './MolduraConta.module.css';

// Moldura das páginas Entrar, Criar conta e Esqueci minha senha (prancha AC2):
// painel azul à esquerda e o formulário à direita, sem Topo e sem Rodapé.
// No celular, o formulário vem primeiro (com o logo no topo para voltar ao Início)
// e o painel azul fica embaixo.
// Recebe:
// - painel: "entrar" (o que a conta permite) ou "endereco" (o endereço define o bairro);
// - bairro: bairro mostrado no painel "endereco" (o do endereço escolhido);
// - titulo (h1) e texto (linha embaixo do título, pode ter link);
// - children: o formulário e o que vem depois dele.
export default function MolduraConta({ painel = 'entrar', bairro, titulo, texto, children }) {
  // Título da aba do navegador: "<h1> · Minha Prefeitura"
  useEffect(() => {
    document.title = `${titulo} · Minha Prefeitura`;
  }, [titulo]);

  return (
    <div className={classes.tela}>
      <main className={classes.lado} id="conteudo">
        <div className={classes.barra}>
          <Logo />
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
