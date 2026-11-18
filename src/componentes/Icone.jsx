// Mostra um ícone do Material Symbols.
// Recebe o nome do ícone (ex.: "home"), o tamanho (18, 20, 22, 24, 28 ou 32 px),
// se deve ser preenchido e uma classe extra (opcional).
// O ícone é decorativo: leitores de tela ignoram (o texto ao lado explica a ação).
export default function Icone({ nome, tamanho = 24, preenchido = false, className }) {
  const classes = ['icone', `icone-${tamanho}`];
  if (preenchido) classes.push('icone-preenchido');
  if (className) classes.push(className);

  return (
    <span className={classes.join(' ')} aria-hidden="true">
      {nome}
    </span>
  );
}
