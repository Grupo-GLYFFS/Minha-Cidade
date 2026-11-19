import { Link } from 'react-router-dom';
import Icone from '../Icone';
import SeloSituacao from '../SeloSituacao';
import SeloTipo from '../seguindo/SeloTipo';
import BarraPercentual from '../obras/BarraPercentual';
import { buscarSituacaoObra, textoPrevisao } from '../../logica/obras';
import { dataLista, dataPrevisao } from '../../logica/datasTexto';
import base from '../CardPedido.module.css';
import classes from './CardObraSeguida.module.css';

// Card de uma obra seguida no Início, no molde do CardPedido (o card inteiro é o link).
// Ordem: ilustração da obra (ou ícone do tipo) · selo "Obra" e situação · título ·
// "bairro · previsão" · "62% feita" e a barra · seta arrow_forward.
// No celular, a imagem vai em cima, na largura do card × 160, como a da votação.
// Recebe a obra (de dados/obras.js).
export default function CardObraSeguida({ obra }) {
  const situacao = buscarSituacaoObra(obra.situacao);

  return (
    <Link to={`/minha-cidade/obras/${obra.id}`} className={`${base.card} ${classes.card}`}>
      <span
        className={
          obra.imagem
            ? `${base.midia} ${classes.midia}`
            : `${base.midia} ${base.midiaIcone} ${classes.midia}`
        }
        aria-hidden="true"
      >
        {obra.imagem ? <img src={obra.imagem} alt="" /> : <Icone nome={obra.icone} tamanho={32} />}
      </span>
      <div className={base.texto}>
        <span className={base.topo}>
          <SeloTipo tipo="obra" />
          {situacao && <SeloSituacao cor={situacao.cor}>{situacao.rotulo}</SeloSituacao>}
        </span>
        <h3 className={base.titulo}>{obra.titulo}</h3>
        <span className={base.meta}>
          <Icone nome="location_on" tamanho={18} />
          {obra.bairro ?? `Subprefeitura ${obra.subprefeitura}`}
          <span aria-hidden="true">·</span>
          {textoPrevisao(obra, { dataPrevisao, dataLista })}
        </span>
        <span className={classes.percentual}>
          <b>{obra.percentual}%</b> feita
        </span>
        <span className={classes.barra}>
          <BarraPercentual percentual={obra.percentual} cor={situacao?.cor} altura={8} />
        </span>
      </div>
      <Icone nome="arrow_forward" tamanho={22} className={`${base.seta} ${classes.seta}`} />
    </Link>
  );
}
