import classes from './Hub.module.css';

// Grade de cards dos hubs (lista <ul>). Cada filho já deve ser um <li>.
// Recebe:
// - colunas: 3 (padrão), 2 ou 1 no computador; no celular vira 1 coluna;
// - dupla: no celular fica em 2 colunas (cards pequenos, como "O que acontece" e os números);
// - idTitulo: id do título da seção, que dá nome à lista para o leitor de tela.
export default function GradeHub({ colunas = 3, dupla = false, idTitulo, children }) {
  const lista = [classes.grade];
  if (colunas === 2) lista.push(classes.grade2);
  if (colunas === 1) lista.push(classes.grade1);
  if (dupla) lista.push(classes.gradeDupla);

  return (
    <ul className={lista.join(' ')} aria-labelledby={idTitulo}>
      {children}
    </ul>
  );
}
