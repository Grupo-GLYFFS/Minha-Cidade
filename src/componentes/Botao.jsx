import { Link } from 'react-router-dom';
import Icone from './Icone';
import classes from './Botao.module.css';

// Classe de cada variante do botão
const CLASSE_VARIANTE = {
  principal: classes.principal,
  secundario: classes.secundario,
  texto: classes.texto,
  icone: classes.soIcone,
  'icone-acao': `${classes.soIcone} ${classes.iconeAcao}`,
  fechar: classes.fechar,
  perigo: classes.perigo,
  branco: classes.branco,
  topo: classes.topo,
};

// Variantes que mostram só o ícone (precisam de aria-label)
const SO_ICONE = ['icone', 'icone-acao', 'fechar'];

// Botão do app, com as medidas da regra 15.
// Recebe:
// - variante: "principal" | "secundario" | "texto" | "icone" | "icone-acao" | "fechar" | "perigo" | "branco" | "topo";
// - compacto (44 px, só dentro de cards e no topo) e largo (largura total);
// - icone (nome do Material Symbols) e iconeDireita (avançar, enviar e expandir ficam à direita);
// - pressionado: transforma em toggle (Seguir/Seguindo) com aria-pressed; ligado mostra iconeLigado;
// - carregando: troca o ícone por um spinner e marca aria-busy;
// - desabilitado: opacidade 0,45, com disabled e aria-disabled;
// - contagem: número numa pílula à direita do texto;
// - para (rota interna, vira <Link>) ou href (link externo); sem os dois, é um <button>.
// Nos botões só de ícone, children fica para extras (ex.: o contador do sino).
// O resto das props (onClick, aria-label…) vai para o elemento.
export default function Botao({
  variante = 'principal',
  compacto = false,
  largo = false,
  icone,
  iconeDireita = false,
  pressionado,
  iconeLigado = 'check',
  carregando = false,
  desabilitado = false,
  contagem,
  para,
  href,
  type = 'button',
  className,
  children,
  ...props
}) {
  const soIcone = SO_ICONE.includes(variante);
  const ehToggle = pressionado !== undefined;
  // O X de fechar já vem com o ícone certo
  let nomeIcone = icone;
  if (ehToggle && pressionado) nomeIcone = iconeLigado;
  else if (!icone && variante === 'fechar') nomeIcone = 'close';

  // Tamanho do ícone: 18 no topo, 22 no compacto, 24 no resto
  let tamanho = 24;
  if (variante === 'topo') tamanho = 18;
  else if (compacto && !soIcone) tamanho = 22;

  const lista = [classes.botao, CLASSE_VARIANTE[variante]];
  if (compacto) lista.push(classes.compacto);
  if (largo) lista.push(classes.largo);
  if (className) lista.push(className);

  // O spinner fica no lado do ícone que ele substitui (à esquerda se não houver ícone)
  const ladoDireito = iconeDireita && !soIcone;
  const classeLado = ladoDireito ? classes.direita : '';
  let marcaIcone = null;
  if (carregando) {
    marcaIcone = <span className={`${classes.spinner} ${classeLado}`} aria-hidden="true" />;
  } else if (nomeIcone) {
    marcaIcone = (
      <Icone nome={nomeIcone} tamanho={tamanho} className={`${classes.ic} ${classeLado}`} />
    );
  }

  const conteudo = (
    <>
      {!ladoDireito && marcaIcone}
      {children}
      {contagem !== undefined && <span className={classes.contagem}>{contagem}</span>}
      {ladoDireito && marcaIcone}
    </>
  );

  const comuns = {
    className: lista.join(' '),
    // A variante fica marcada no elemento para quem precisa alinhar pelo tipo (ex.: SecaoCard)
    'data-variante': variante,
    'aria-pressed': ehToggle ? pressionado : undefined,
    'aria-busy': carregando || undefined,
    'aria-disabled': desabilitado || undefined,
    ...props,
  };

  // Link desabilitado não pode navegar: vira texto sem destino
  if (para && !desabilitado) {
    return (
      <Link to={para} {...comuns}>
        {conteudo}
      </Link>
    );
  }
  if (href && !desabilitado) {
    return (
      <a href={href} {...comuns}>
        {conteudo}
      </a>
    );
  }
  return (
    <button type={type} disabled={desabilitado} {...comuns}>
      {conteudo}
    </button>
  );
}
