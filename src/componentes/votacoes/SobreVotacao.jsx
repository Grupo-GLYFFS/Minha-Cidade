import { Link } from 'react-router-dom';
import SecaoCard from '../SecaoCard';
import Icone from '../Icone';
import { dataDetalhe } from '../../logica/datasTexto';
import classes from './SobreVotacao.module.css';

// Seção "O que muda": os parágrafos da proposta e, numa faixa embaixo, quem abriu a votação
// (link para a página da prefeitura ou da subprefeitura) e quando.
// Recebe o projeto.
export default function SobreVotacao({ projeto }) {
  const { responsavel } = projeto;

  return (
    <SecaoCard titulo="O que muda">
      <div className={classes.texto}>
        {projeto.descricao.map((paragrafo) => (
          <p key={paragrafo}>{paragrafo}</p>
        ))}
      </div>
      <div className={classes.quem}>
        <span className={classes.icone} aria-hidden="true">
          <Icone nome="account_balance" tamanho={22} />
        </span>
        <p>
          <Link to={responsavel.para} className={classes.link}>
            {responsavel.nome}
          </Link>
          <span>
            {responsavel.cargo} · aberta {dataDetalhe(projeto.inicioVotacao)}
          </span>
        </p>
      </div>
    </SecaoCard>
  );
}
