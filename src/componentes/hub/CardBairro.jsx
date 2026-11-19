import { Link } from 'react-router-dom';
import Icone from '../Icone';
import classes from './Hub.module.css';

// Card de um bairro na página da subprefeitura: ícone, nome, selo "Seu" no bairro da pessoa
// e os números do bairro (pedidos abertos, obras em andamento, avisos).
// Recebe { nome, para, seu, resumo } (resumo vem de resumirLugar).
export default function CardBairro({ nome, para, seu = false, resumo }) {
  const lista = [classes.card, classes.bairro];
  if (seu) lista.push(classes.sua);

  // [número, texto no singular, texto no plural]
  const linhas = [
    [resumo.pedidos, 'pedido aberto', 'pedidos abertos'],
    [resumo.obras, 'obra em andamento', 'obras em andamento'],
    [resumo.avisos, 'aviso', 'avisos'],
  ];

  return (
    <Link to={para} className={lista.join(' ')}>
      <span className={classes.iconeCaixa}>
        <Icone nome="holiday_village" />
      </span>
      <span className={classes.lugarNome}>
        <span className={classes.lugarNomeTexto}>{nome}</span>
        {seu && <span className={classes.selo}>Seu</span>}
      </span>
      <ul className={classes.bairroNumeros}>
        {linhas.map(([numero, singular, plural]) => (
          <li key={plural}>
            <strong>{numero}</strong> {numero === 1 ? singular : plural}
          </li>
        ))}
      </ul>
      <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
    </Link>
  );
}
