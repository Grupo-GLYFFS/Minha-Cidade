import Botao from '../Botao';
import IconeServico from './IconeServico';
import classes from './FimServico.module.css';

// Faixa azul-clara no fim da ficha: ícone, nome do serviço, custo (e onde ir, quando
// não há botão) e o botão principal de novo, para quem leu tudo até aqui.
// Recebe o serviço e a ação ({ rotulo, para } ou null).
export default function FimServico({ servico, acao }) {
  const detalhe = acao
    ? servico.info.custo
    : [servico.info.custo, servico.info.ondeIr].filter(Boolean).join(' · ');

  return (
    <div className={classes.fim}>
      <IconeServico nome={servico.icone} />
      <div className={classes.texto}>
        <strong className={classes.nome}>{servico.nome}</strong>
        {detalhe && <span className={classes.detalhe}>{detalhe}</span>}
      </div>
      {acao && (
        <Botao variante="principal" compacto icone="arrow_forward" iconeDireita para={acao.para}>
          {acao.rotulo}
        </Botao>
      )}
    </div>
  );
}
