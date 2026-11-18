import classes from './TituloGrupo.module.css';

// Título de um grupo numa lista agrupada (ex.: "Abertas", "Encerradas", "Em análise").
// Bolinha na cor do status (cinza se o grupo não for de status) + título + contagem
// + linha até a borda direita (regra 17). Todo grupo da lista usa o mesmo título.
// Recebe o titulo, a contagem, a cor ("cinza" | "azul" | "ambar" | "verde" | "vermelho"),
// o id (para o aria-labelledby da lista do grupo) e o nível do título (2 por padrão).
export default function TituloGrupo({ titulo, contagem, cor = 'cinza', id, nivel = 2 }) {
  const Titulo = `h${nivel}`;

  return (
    <Titulo className={classes.titulo} id={id}>
      <span className={`${classes.bolinha} ${classes[cor]}`} aria-hidden="true" />
      <span className={classes.texto}>{titulo}</span>
      {contagem !== undefined && <span className={classes.contagem}>{contagem}</span>}
      <span className={classes.linha} aria-hidden="true" />
    </Titulo>
  );
}
