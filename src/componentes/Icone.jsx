// Mostra um ícone do Material Symbols.
// Recebe o nome do ícone (ex.: "home"), o tamanho (18, 20, 24 ou 28 px) e se deve ser preenchido.
// O ícone é decorativo: leitores de tela ignoram (o texto ao lado explica a ação).
export default function Icone({ nome, tamanho = 24, preenchido = false }) {
  const classes = ['icone', `icone-${tamanho}`];
  if (preenchido) classes.push('icone-preenchido');

  return (
    <span className={classes.join(' ')} aria-hidden="true">
      {nome}
    </span>
  );
}
