import classes from './BarraPe.module.css';

// Barra do pé do celular, presa logo acima da barra de abas (some no computador).
// Fundo branco, linha fina em cima, sem sombra, padding 16.
// Recebe:
// - children: o conteúdo. Dois botões dividem a linha 50/50 (ex.: Seguir | Apoiar);
// - passo: { nome, rotulo } para o pé de formulário: à esquerda, o nome da etapa com
//   "Passo x de N" embaixo; à direita, o children (o botão principal).
// Com ela na página, o aviso do rodapé sobe para ficar 16 acima dela.
export default function BarraPe({ children, passo }) {
  if (passo) {
    return (
      <div className={`${classes.barra} ${classes.passo}`} data-barra-pe="">
        <div className={classes.etapa}>
          <strong className={classes.etapaNome}>{passo.nome}</strong>
          <small className={classes.etapaRotulo}>{passo.rotulo}</small>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className={`${classes.barra} ${classes.botoes}`} data-barra-pe="">
      {children}
    </div>
  );
}
