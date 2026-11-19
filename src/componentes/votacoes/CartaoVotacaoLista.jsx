import { Link } from 'react-router-dom';
import { VisuallyHidden } from '@mantine/core';
import Icone from '../Icone';
import Botao from '../Botao';
import BotaoSeguir from '../obras/BotaoSeguir';
import VoceVotou from './VoceVotou';
import {
  caminhoVotacao,
  depoisCurto,
  resultadoCurto,
  textoFaltam,
  votacaoAberta,
} from '../../logica/votacao';
import { dataLista, dataListaComDia } from '../../logica/datasTexto';
import { formatarNumero, formatarValorCurto } from '../../logica/formatos';
import classes from './CartaoVotacaoLista.module.css';

// Card de uma votação em todo lugar (Votações da cidade e do bairro, Meus votos, Início e
// O que você segue).
// Faixa de cima: selo opcional (ex.: o tipo "Votação"), prazo (ou "Encerrada" e a data)
// e o selo "Você votou".
// Meio: tipo e lugar, título (link), resumo e a ilustração de 160 × 112 à direita.
// Faixa de baixo: os números (votos, custo e prazo; ou votos, resultado e o que veio depois)
// e as ações: Seguir e "Avaliar e votar" (ou "Ver o seu voto") nas abertas;
// "Ver a obra" ou "Ver o resultado" nas encerradas.
// Recebe o projeto, o resultado (de calcularResultado), o voto da pessoa ("sim", "nao" ou
// undefined), o texto do lugar (ex.: "Jabaquara" ou "Cidade toda · inclui a Vila Mariana")
// e o estado do Seguir (seguindo, aoAlternarSeguir, logado).
export default function CartaoVotacaoLista({
  projeto,
  resultado,
  voto,
  lugar,
  seguindo,
  aoAlternarSeguir,
  logado,
  selo,
}) {
  const aberta = votacaoAberta(projeto);
  const caminho = caminhoVotacao(projeto);
  const ehVerba = projeto.tipo === 'Mudança de verba';

  // Os três números da faixa de baixo
  const numeros = [{ rotulo: 'Votos', valor: formatarNumero(resultado.total) }];
  if (aberta && ehVerba) {
    numeros.push({ rotulo: 'Move', valor: formatarValorCurto(projeto.valor) });
    numeros.push({ rotulo: 'Para', valor: projeto.verba.para.nome });
  } else if (aberta) {
    numeros.push({ rotulo: 'Custa', valor: formatarValorCurto(projeto.valor) });
    numeros.push({ rotulo: 'Obra de', valor: projeto.prazoObra });
  } else {
    numeros.push({ rotulo: 'Resultado', valor: resultadoCurto(resultado) });
    const depois = depoisCurto(projeto, dataLista);
    if (depois) numeros.push({ rotulo: 'Depois', valor: depois });
  }

  // Botão de ação da faixa de baixo
  let acao = null;
  if (aberta && voto) {
    acao = (
      <Botao variante="secundario" compacto para={caminho}>
        Ver o seu voto<VisuallyHidden> em {projeto.titulo}</VisuallyHidden>
      </Botao>
    );
  } else if (aberta) {
    acao = (
      <Botao variante="principal" compacto para={caminho}>
        Avaliar e votar<VisuallyHidden> {projeto.titulo}</VisuallyHidden>
      </Botao>
    );
  } else if (projeto.obra) {
    acao = (
      <Botao
        variante="secundario"
        compacto
        icone="arrow_forward"
        iconeDireita
        para={`/minha-cidade/obras/${projeto.obra}`}
      >
        Ver a obra<VisuallyHidden> {projeto.titulo}</VisuallyHidden>
      </Botao>
    );
  } else if (voto) {
    acao = (
      <Botao variante="secundario" compacto para={caminho}>
        Ver o resultado<VisuallyHidden> {projeto.titulo}</VisuallyHidden>
      </Botao>
    );
  }

  return (
    <article className={classes.cartao}>
      <div className={classes.faixaTopo}>
        <p className={classes.prazo}>
          {selo}
          <Icone nome={aberta ? 'hourglass_bottom' : 'event_available'} tamanho={20} />
          <b className={aberta ? classes.prazoAberta : undefined}>
            {aberta ? textoFaltam(projeto.fimVotacao) : 'Encerrada'}
          </b>
          <span>
            · {aberta ? 'termina ' : ''}
            {dataListaComDia(projeto.fimVotacao)}
          </span>
        </p>
        {voto && <VoceVotou voto={voto} />}
      </div>

      <div className={classes.meio}>
        <div className={classes.texto}>
          <p className={classes.meta}>
            {projeto.tipo} · {lugar}
          </p>
          <h3 className={classes.titulo}>
            <Link to={caminho}>{projeto.titulo}</Link>
          </h3>
          <p className={classes.resumo}>{projeto.resumo}</p>
        </div>
        <span
          className={projeto.imagem ? classes.midia : `${classes.midia} ${classes.midiaIcone}`}
          aria-hidden="true"
        >
          {projeto.imagem ? (
            <img src={projeto.imagem} alt="" />
          ) : (
            <Icone nome={projeto.icone} tamanho={28} />
          )}
        </span>
      </div>

      <div className={classes.faixaPe}>
        <dl className={classes.numeros}>
          {numeros.map((numero) => (
            <div key={numero.rotulo}>
              <dt>{numero.rotulo}</dt>
              <dd>{numero.valor}</dd>
            </div>
          ))}
        </dl>
        {(aberta || acao) && (
          <div className={classes.acoes}>
            {aberta && (
              <BotaoSeguir
                compacto
                seguindo={seguindo}
                aoAlternar={aoAlternarSeguir}
                logado={logado}
                nome={`a votação ${projeto.titulo}`}
              />
            )}
            {acao}
          </div>
        )}
      </div>
    </article>
  );
}
