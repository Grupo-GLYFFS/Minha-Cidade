import { useId } from 'react';
import Icone from './Icone';
import Trilha from './Trilha';
import EtapasFormulario from './EtapasFormulario';
import classes from './CabecalhoPagina.module.css';

// Tamanho do título por tipo: 48 em listas, hubs e conta; 40 em detalhes, formulários e confirmação
const TITULO_GRANDE = ['lista', 'hub', 'conta'];

// Cabeçalho da página (regra 16): faixa azul-clara de largura total, conteúdo centralizado
// na coluna de 880 e a trilha à esquerda. Ordem: trilha · ícone ou imagem/mapa · categoria ·
// título · subtítulo · children (metadados, cartão) · etapas · ações.
// Recebe:
// - tipo: "lista" (ícone 64) | "hub" (mapa 880 × 220) | "detalhe" (imagem 880 × 240 ou ícone 64
//   + categoria) | "formulario" (etapas) | "confirmacao" (check verde ao lado do título, sem trilha)
//   | "conta" (só o título);
// - titulo e subtitulo (opcional);
// - trilha: [{ rotulo, para }], o último é a página atual (não use em confirmação nem nas páginas da conta);
// - icone: nome do ícone de 64 (sempre azul); midia: <img> ou <svg> do mapa ou da imagem;
// - categoria: { icone, rotulo } (só detalhes);
// - etapas (nomes) e etapaAtual (começa em 1), só formulários;
// - acoes: botões centralizados no fim (secundário antes do principal);
// - children: o que mais vai embaixo do subtítulo (MetaCabecalho, cartão de protocolo…).
// No celular: a trilha e as etapas somem, o título vai até 3 linhas e as ações
// ficam em largura total, divididas em partes iguais.
export default function CabecalhoPagina({
  tipo = 'lista',
  titulo,
  subtitulo,
  trilha,
  icone,
  midia,
  categoria,
  etapas,
  etapaAtual,
  acoes,
  children,
}) {
  const idTitulo = useId();
  const classeTitulo = TITULO_GRANDE.includes(tipo) ? classes.tituloGrande : classes.tituloDetalhe;
  const classeMidia = tipo === 'hub' ? classes.mapa : classes.imagem;
  const mostrarTrilha = trilha?.length > 0 && tipo !== 'confirmacao';

  const h1 = (
    <h1 className={classeTitulo} id={idTitulo}>
      {titulo}
    </h1>
  );

  return (
    <section className={classes.cabecalho} aria-labelledby={idTitulo}>
      <div className={classes.miolo}>
        {mostrarTrilha && (
          <div className={classes.trilha}>
            <Trilha itens={trilha} />
          </div>
        )}

        {midia && <div className={`${classes.midia} ${classeMidia}`}>{midia}</div>}
        {!midia && icone && tipo !== 'conta' && (
          <div className={classes.icone} aria-hidden="true">
            <Icone nome={icone} tamanho={32} />
          </div>
        )}

        {categoria && (
          <p className={classes.categoria}>
            {categoria.icone && <Icone nome={categoria.icone} tamanho={20} />}
            {categoria.rotulo}
          </p>
        )}

        {tipo === 'confirmacao' ? (
          <div className={classes.confirmacao}>
            <span className={classes.check} aria-hidden="true">
              <Icone nome="check" tamanho={24} />
            </span>
            {h1}
          </div>
        ) : (
          h1
        )}

        {subtitulo && <p className={classes.subtitulo}>{subtitulo}</p>}
        {children}
        {etapas && (
          <div className={classes.etapas}>
            <EtapasFormulario etapas={etapas} atual={etapaAtual} />
          </div>
        )}
        {acoes && <div className={classes.acoes}>{acoes}</div>}
      </div>
    </section>
  );
}
