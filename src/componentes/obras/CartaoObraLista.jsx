import { Link } from 'react-router-dom';
import Icone from '../Icone';
import SeloSituacao from '../SeloSituacao';
import BarraPercentual from './BarraPercentual';
import BotaoSeguir from './BotaoSeguir';
import OrigemObra from './OrigemObra';
import { buscarSituacaoObra, dataAtualizacao, textoPrevisao } from '../../logica/obras';
import { dataLista, dataPrevisao } from '../../logica/datasTexto';
import { tempoRelativo } from '../../logica/datas';
import miniatura from '../CardPedido.module.css';
import classes from './CartaoObraLista.module.css';

// Card de uma obra na lista de Obras (cidade ou bairro).
// Em cima: miniatura (ilustração ou ícone do tipo, com a regra de altura do CardPedido), tipo e data da última atualização, título
// (link para o detalhe, que cobre o card todo), situação, origem e onde fica.
// Embaixo, numa faixa separada por linha: barra de % feita, previsão e o botão Seguir
// (a obra concluída não tem Seguir).
// Recebe a obra, o caminho do detalhe (para), seguindo, aoAlternarSeguir, logado e um selo
// opcional no começo da primeira linha (o selo de tipo "Obra" em O que você segue).
export default function CartaoObraLista({ obra, para, seguindo, aoAlternarSeguir, logado, selo }) {
  const situacao = buscarSituacaoObra(obra.situacao);
  const concluida = obra.situacao === 'concluida';

  return (
    <article className={classes.cartao}>
      <div className={classes.corpo}>
        <span
          className={
            obra.miniatura ? miniatura.midia : `${miniatura.midia} ${miniatura.midiaIcone}`
          }
          aria-hidden="true"
        >
          {obra.miniatura ? (
            <img src={obra.imagem} alt="" />
          ) : (
            <Icone nome={obra.icone} tamanho={32} />
          )}
        </span>
        <div className={classes.texto}>
          <p className={classes.meta}>
            {selo}
            {obra.tipo}
            <span aria-hidden="true">·</span>
            Atualizada {tempoRelativo(dataAtualizacao(obra))}
          </p>
          <h3 className={classes.titulo}>
            <Link to={para} className={classes.link}>
              {obra.titulo}
            </Link>
          </h3>
          <div className={classes.linha}>
            <SeloSituacao cor={situacao.cor}>{situacao.rotulo}</SeloSituacao>
            <OrigemObra obra={obra} />
            <span className={classes.onde}>
              <Icone nome="location_on" tamanho={18} />
              {obra.bairro}
              <span aria-hidden="true">·</span>
              Subprefeitura {obra.subprefeitura}
            </span>
          </div>
        </div>
        <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
      </div>

      <div className={classes.pe}>
        <div className={classes.barra}>
          <BarraPercentual percentual={obra.percentual} cor={situacao.cor} />
        </div>
        <p className={classes.progresso}>
          <b>{obra.percentual}% feita</b>
          <span aria-hidden="true">·</span>
          {textoPrevisao(obra, { dataPrevisao, dataLista })}
        </p>
        {!concluida && (
          <div className={classes.acao}>
            <BotaoSeguir
              chave={`obra:${obra.id}`}
              compacto
              seguindo={seguindo}
              aoAlternar={aoAlternarSeguir}
              logado={logado}
              nome={`a obra ${obra.titulo}`}
            />
          </div>
        )}
      </div>
    </article>
  );
}
