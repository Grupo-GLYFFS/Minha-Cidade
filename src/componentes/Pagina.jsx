import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Topo from './Topo';
import FaixaAlerta from './FaixaAlerta';
import Rodape from './Rodape';
import { ALERTAS } from '../dados/alertas';
import classes from './Pagina.module.css';

// Alerta da Defesa Civil que aparece na faixa amarela (o primeiro ativo)
const ALERTA_FAIXA = ALERTAS.find((alerta) => alerta.tipo === 'defesa-civil' && alerta.ativo);

// Moldura de toda página: topo, faixa de alerta, cabeçalho da página, conteúdo e rodapé.
// Recebe:
// - cabecalho: o <CabecalhoPagina> da página (faixa azul-clara de largura total);
// - children: o conteúdo, que fica na coluna de 880 com 48 px de respiro em cima;
// - semFaixaAlerta: esconde a faixa amarela (ela já some sozinha nas páginas de alertas);
// - larga: coluna de 1088 em vez de 880 (só para as telas antigas, até serem refeitas).
// Ao trocar de página, a tela volta para o topo.
export default function Pagina({ cabecalho, children, semFaixaAlerta = false, larga = false }) {
  const { pathname } = useLocation();

  // Volta ao topo a cada página nova
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // A faixa some nas páginas de alertas (lá o alerta já é o conteúdo)
  const mostrarFaixa = ALERTA_FAIXA && !semFaixaAlerta && !pathname.includes('/alertas');

  return (
    <div className={classes.pagina}>
      <a className="pular-conteudo" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Topo />
      {mostrarFaixa && (
        <FaixaAlerta
          titulo={ALERTA_FAIXA.titulo}
          texto={ALERTA_FAIXA.mensagem}
          para={`/minha-cidade/alertas/${ALERTA_FAIXA.id}`}
        />
      )}
      <main id="conteudo" className={classes.principal} tabIndex={-1}>
        {cabecalho}
        <div className={larga ? classes.colunaLarga : classes.coluna}>{children}</div>
      </main>
      <Rodape />
    </div>
  );
}
