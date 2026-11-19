import { Link } from 'react-router-dom';
import Icone from '../Icone';
import { dataCurta, juntarNomes } from '../../logica/avisos';
import classes from '../CardPedido.module.css';

// Card de um aviso em todo lugar (avisos da cidade e do bairro, avisos parecidos e Início).
// Mesmo molde do CardPedido: o card inteiro é o link, sem botões dentro.
// Ordem: miniatura 96 × 72 (ilustração do aviso ou ícone do assunto) · "órgão · data" ·
// título · "Até … · onde vale" · seta arrow_forward.
// Recebe o aviso, o caminho do detalhe, o nível do título (3 por padrão) e um selo opcional
// no começo da primeira linha (ex.: "Toda a cidade" nas páginas de um lugar).
export default function CardAviso({ aviso, caminho, nivelTitulo = 3, selo }) {
  const Titulo = `h${nivelTitulo}`;
  const onde = aviso.bairros.length === 0 ? 'Cidade toda' : juntarNomes(aviso.bairros);

  return (
    <Link to={caminho} className={classes.card}>
      <span
        className={aviso.imagem ? classes.midia : `${classes.midia} ${classes.midiaIcone}`}
        aria-hidden="true"
      >
        {aviso.imagem ? (
          <img src={aviso.imagem} alt="" />
        ) : (
          <Icone nome={aviso.assunto?.icone ?? 'campaign'} tamanho={32} />
        )}
      </span>
      <div className={classes.texto}>
        <span className={classes.topo}>
          {selo}
          {aviso.orgao.nome} · {dataCurta(aviso.data)}
        </span>
        <Titulo className={classes.titulo}>{aviso.titulo}</Titulo>
        <span className={classes.meta}>
          {/* Com o selo "Toda a cidade", o lugar já está no selo */}
          Até {dataCurta(aviso.validoAte)}
          {selo ? '' : ` · ${onde}`}
        </span>
      </div>
      <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
    </Link>
  );
}
