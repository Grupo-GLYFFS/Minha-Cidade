import { useId } from 'react';
import Icone from '../Icone';
import classes from './LinhaAjuste.module.css';

// Uma linha de ajuste dentro de um card (Configurações e popups de canais), no estilo
// "Seus dados": ícone de 20 sem caixinha (opcional), rótulo 600, detalhe embaixo e,
// à direita, o controle. Divisória de borda a borda entre as linhas.
// Recebe:
// - icone, rotulo e detalhe (opcional);
// - controle: função que recebe o id do rótulo e devolve o controle (ex.: um Interruptor);
// - ou valor + aoClicar: a linha inteira vira um botão que abre um popup, com o valor
//   e o chevron_right à direita;
// - empilhar: no celular, o controle desce para baixo do rótulo (controles largos).
export default function LinhaAjuste({
  icone,
  rotulo,
  detalhe,
  controle,
  valor,
  aoClicar,
  empilhar = false,
}) {
  const idRotulo = useId();
  const lista = [classes.linha];
  if (icone) lista.push(classes.comIcone);
  if (empilhar) lista.push(classes.empilhar);
  const classeLinha = lista.join(' ');

  const texto = (
    <span className={classes.texto}>
      <span className={classes.rotulo} id={idRotulo}>
        {rotulo}
      </span>
      {detalhe && <span className={classes.detalhe}>{detalhe}</span>}
    </span>
  );
  const marca = icone && <Icone nome={icone} tamanho={20} className={classes.icone} />;

  if (aoClicar) {
    return (
      <li className={classes.item}>
        <button
          type="button"
          className={`${classeLinha} ${classes.botao}`}
          aria-haspopup="dialog"
          onClick={aoClicar}
        >
          {marca}
          {texto}
          <span className={classes.valor}>
            {valor}
            <Icone nome="chevron_right" tamanho={22} className={classes.chevron} />
          </span>
        </button>
      </li>
    );
  }

  return (
    <li className={classes.item}>
      <div className={classeLinha}>
        {marca}
        {texto}
        {controle?.(idRotulo)}
      </div>
    </li>
  );
}
