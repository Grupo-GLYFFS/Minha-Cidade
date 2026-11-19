import { useEffect } from 'react';
import Botao from '../Botao';
import Icone from '../Icone';
import Logo from '../Logo';
import PainelConta from './PainelConta';
import { useCaminhoConta } from '../../contexto/useCaminhoConta';
import { destinoSeguro } from '../../logica/sessao';
import classes from './MolduraConta.module.css';

// Moldura das páginas Entrar, Criar conta e Esqueci minha senha (prancha AC2):
// painel azul à esquerda e o formulário à direita, sem Topo e sem Rodapé.
// No celular, o formulário vem primeiro e o painel azul fica embaixo.
// Recebe:
// - painel: "entrar" (o que a conta permite) ou "endereco" (o endereço define o bairro);
// - bairro: bairro mostrado no painel "endereco" (o do CEP digitado);
// - titulo (h1) e texto (linha embaixo do título, pode ter link);
// - children: o formulário e o que vem depois dele.
// O botão de voltar leva ao ?voltar= do endereço, se houver ("Voltar"); senão, ao Início.
// No celular, ele vira o "‹ Início" (ou "‹ Voltar") da barra de cima, sem o logo.
export default function MolduraConta({ painel = 'entrar', bairro, titulo, texto, children }) {
  const destino = destinoSeguro(useCaminhoConta().voltar);

  // Título da aba do navegador: "<h1> · Minha Prefeitura"
  useEffect(() => {
    document.title = `${titulo} · Minha Prefeitura`;
  }, [titulo]);
  return (
    <div className={classes.tela}>
      <main className={classes.lado} id="conteudo">
        <div className={classes.barra}>
          <Logo className={classes.logo} />
          <Botao variante="texto" icone="arrow_back" para={destino} className={classes.voltar}>
            <Icone nome="chevron_left" tamanho={22} className={classes.seta} />
            {destino === '/inicio' ? (
              <>
                <span className={classes.soComputador}>Voltar ao início</span>
                <span className={classes.soCelular}>Início</span>
              </>
            ) : (
              'Voltar'
            )}
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
