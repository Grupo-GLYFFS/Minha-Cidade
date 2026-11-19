import { Link } from 'react-router-dom';
import Icone from './Icone';
import classes from './LinhaDado.module.css';

// Uma linha de dado dentro de um card (estilo "Seus dados" do Perfil, regra 17):
// ícone simples de 20 (sem caixinha), rótulo em 600 e valor à direita.
// Linhas seguidas ganham divisória de borda a borda do card.
// Recebe:
// - icone (opcional), rotulo e valor (texto ou elemento);
// - para: a linha inteira vira link, com chevron_right no fim;
// - acao: um botão no fim da linha (ex.: Copiar, Editar);
// - umaLinha: no celular, o valor fica numa linha só, com reticências.
// Use dentro de <SecaoCard lista> ou de <Cartao>.
export default function LinhaDado({ icone, rotulo, valor, para, acao, umaLinha = false }) {
  const conteudo = (
    <>
      {icone && <Icone nome={icone} tamanho={20} className={classes.icone} />}
      <span className={classes.rotulo}>{rotulo}</span>
      {valor !== undefined && (
        <span className={umaLinha ? `${classes.valor} ${classes.valorUmaLinha}` : classes.valor}>
          {valor}
        </span>
      )}
      {acao}
      {para && <Icone nome="chevron_right" tamanho={22} className={classes.chevron} />}
    </>
  );

  if (para) {
    return (
      <Link to={para} className={`${classes.linha} ${classes.link}`}>
        {conteudo}
      </Link>
    );
  }
  return <div className={classes.linha}>{conteudo}</div>;
}
