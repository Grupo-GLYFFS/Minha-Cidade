import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Topo from './Topo';
import FaixaAlerta from './FaixaAlerta';
import Rodape from './Rodape';
import BarraVoltar from './celular/BarraVoltar';
import BarraAbas from './celular/BarraAbas';
import FolhaMais from './celular/FolhaMais';
import { useAcessibilidade } from '../contexto/useAcessibilidade';
import { useBairroDaPessoa } from '../contexto/useBairroDaPessoa';
import { ALERTAS } from '../dados/alertas';
import { alertaDaFaixa } from '../logica/alertas';
import { PAGINAS_PRIMEIRO_NIVEL, ehPaginaDoMais, voltarDaTrilha } from '../logica/navegacaoCelular';
import classes from './Pagina.module.css';

// Moldura de toda página: topo, faixa de alerta, cabeçalho da página, conteúdo e rodapé.
// No celular (até 768 px), o topo e o rodapé somem; entram a barra "‹ Voltar" (páginas internas),
// a barra de abas presa embaixo e a folha Mais (veja src/componentes/LEIA-ME.md, "Celular").
// Recebe:
// - cabecalho: o <CabecalhoPagina> da página (faixa azul-clara de largura total);
// - children: o conteúdo, que fica na coluna de 880 com 48 px de respiro em cima;
// - semFaixaAlerta: esconde a faixa amarela (ela já some sozinha nas páginas de alertas
//   e quando "Faixas de alerta" está desligado em Configurações, que é o padrão);
// - larga: coluna de 1088 em vez de 880 (só para as telas antigas, até serem refeitas);
// - voltar (celular): { rotulo, para } no lugar do que vem da trilha, ou false para tirar a barra
//   "‹ Voltar". Sem ele, o "‹ Voltar" é o penúltimo item da trilha do cabeçalho;
// - tituloTopo (celular): nome curto no meio da barra "‹ Voltar" (só quando é diferente do h1);
// - acaoTopo (celular): botão da direita da barra "‹ Voltar" (compartilhar só com ícone, Cancelar);
// - faixaTopo (celular): o que vai logo abaixo da barra "‹ Voltar" (ex.: <FaixaPasso> dos formulários);
// - aba (celular): marca outra aba ("inicio", "servicos", "cidade", "bairro", "mais") no lugar
//   da que vem da rota.
// Ao trocar de página, a tela volta para o topo. O título da aba do navegador acompanha o h1
// ("<h1> · Minha Prefeitura"; na Apresentação, "Minha Prefeitura · Global Solution").
export default function Pagina({
  cabecalho,
  children,
  semFaixaAlerta = false,
  larga = false,
  voltar,
  tituloTopo,
  acaoTopo,
  faixaTopo,
  aba,
}) {
  const { pathname } = useLocation();
  const { mostrarFaixasAlerta } = useAcessibilidade();
  // Alerta da faixa amarela: o que vale no bairro da pessoa (ou no escolhido) ou na cidade toda
  const { nome, temConta, definido } = useBairroDaPessoa();
  const alertaFaixa = alertaDaFaixa(ALERTAS, temConta || definido ? nome : null);
  // Folha Mais do celular (aberta pela aba Mais ou pelo "‹ Mais" das páginas da conta, da
  // ajuda e da Global Solution)
  const [maisAberto, setMaisAberto] = useState(false);
  const [caminhoDoMais, setCaminhoDoMais] = useState(pathname);

  // Fecha a folha Mais ao trocar de página (ajuste durante o desenho, sem efeito)
  if (caminhoDoMais !== pathname) {
    setCaminhoDoMais(pathname);
    setMaisAberto(false);
  }

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

  // Barra "‹ Voltar" do celular: some nas páginas de 1º nível e nas confirmações
  const propsCabecalho = cabecalho?.props ?? {};
  const maisSemTrilha = ehPaginaDoMais(pathname) && !(propsCabecalho.trilha?.length >= 2);
  const mostrarVoltar =
    voltar !== false &&
    !PAGINAS_PRIMEIRO_NIVEL.includes(pathname) &&
    propsCabecalho.tipo !== 'confirmacao';
  const destinoVoltar = voltar || voltarDaTrilha(propsCabecalho.trilha, pathname);

  // Leva o foco ao conteúdo sem mudar o endereço (a rota fica depois do #)
  function pularParaConteudo(evento) {
    evento.preventDefault();
    document.getElementById('conteudo')?.focus();
  }

  return (
    <div className={classes.pagina}>
      <a className="pular-conteudo" href="#conteudo" onClick={pularParaConteudo}>
        Pular para o conteúdo
      </a>
      <div className={classes.soComputador}>
        <Topo />
      </div>
      {mostrarFaixa && (
        <FaixaAlerta
          titulo={alertaFaixa.titulo}
          texto={alertaFaixa.mensagem}
          para={`/minha-cidade/alertas/${alertaFaixa.id}`}
        />
      )}
      {mostrarVoltar && (
        <BarraVoltar
          voltar={!voltar && maisSemTrilha ? { rotulo: 'Mais' } : destinoVoltar}
          aoVoltar={!voltar && maisSemTrilha ? () => setMaisAberto(true) : undefined}
          titulo={tituloTopo}
          acao={acaoTopo}
        />
      )}
      {faixaTopo}
      <main id="conteudo" className={classes.principal} tabIndex={-1}>
        {cabecalho}
        <div className={larga ? classes.colunaLarga : classes.coluna}>{children}</div>
      </main>
      <div className={classes.soComputador}>
        <Rodape />
      </div>
      <BarraAbas
        maisAberto={maisAberto}
        aoAbrirMais={() => setMaisAberto((aberto) => !aberto)}
        aba={aba}
      />
      <FolhaMais aberto={maisAberto} aoFechar={() => setMaisAberto(false)} />
    </div>
  );
}
