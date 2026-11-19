import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Topo from './Topo';
import FaixaAlerta from './FaixaAlerta';
import Rodape from './Rodape';
import AvisoDaConta from './conta/AvisoDaConta';
import { useAcessibilidade } from '../contexto/useAcessibilidade';
import { useBairroDaPessoa } from '../contexto/useBairroDaPessoa';
import { ALERTAS } from '../dados/alertas';
import { alertaDaFaixa } from '../logica/alertas';
import classes from './Pagina.module.css';

// Moldura de toda página: topo, faixa de alerta, cabeçalho da página, conteúdo e rodapé.
// Recebe:
// - cabecalho: o <CabecalhoPagina> da página (faixa azul-clara de largura total);
// - children: o conteúdo, que fica na coluna de 880 com 48 px de respiro em cima;
// - semFaixaAlerta: esconde a faixa amarela (ela já some sozinha nas páginas de alertas
//   e quando "Faixas de alerta" está desligado em Configurações, que é o padrão);
// - larga: coluna de 1088 em vez de 880 (só para as telas antigas, até serem refeitas).
// Ao trocar de página, a tela volta para o topo. O título da aba do navegador acompanha o h1
// ("<h1> · Minha Prefeitura"; na Apresentação, "Minha Prefeitura · Global Solution").
// Os avisos da conta ("Conta criada!", "Você saiu da sua conta") aparecem no alto da coluna.
export default function Pagina({ cabecalho, children, semFaixaAlerta = false, larga = false }) {
  const { pathname } = useLocation();
  const { mostrarFaixasAlerta } = useAcessibilidade();
  // Alerta da faixa amarela: o que vale no bairro da pessoa (ou no escolhido) ou na cidade toda
  const { nome, temConta, definido } = useBairroDaPessoa();
  const alertaFaixa = alertaDaFaixa(ALERTAS, temConta || definido ? nome : null);

  // Volta ao topo a cada página nova
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Título da aba: lido do h1 depois de cada desenho (o h1 pode mudar ao carregar)
  useEffect(() => {
    const h1 = document.querySelector('#conteudo h1')?.textContent.trim();
    if (pathname === '/') document.title = 'Minha Prefeitura · Global Solution';
    else document.title = h1 ? `${h1} · Minha Prefeitura` : 'Minha Prefeitura';
  });

  // A faixa só aparece com a preferência ligada e um alerta que vale para a pessoa,
  // e some nas páginas de alertas (lá o alerta já é o conteúdo)
  const mostrarFaixa =
    mostrarFaixasAlerta && alertaFaixa && !semFaixaAlerta && !pathname.includes('/alertas');

  return (
    <div className={classes.pagina}>
      <a className="pular-conteudo" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Topo />
      {mostrarFaixa && (
        <FaixaAlerta
          titulo={alertaFaixa.titulo}
          texto={alertaFaixa.mensagem}
          para={`/minha-cidade/alertas/${alertaFaixa.id}`}
        />
      )}
      <main id="conteudo" className={classes.principal} tabIndex={-1}>
        {cabecalho}
        <div className={larga ? classes.colunaLarga : classes.coluna}>
          <AvisoDaConta />
          {children}
        </div>
      </main>
      <Rodape />
    </div>
  );
}
