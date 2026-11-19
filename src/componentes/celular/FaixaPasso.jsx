import classes from './FaixaPasso.module.css';

// Faixa "Passo x de N · nome da etapa" dos formulários no celular, logo abaixo da barra
// "‹ Voltar", com a barra dividida em N partes (as feitas e a atual em azul).
// No computador ela não aparece (lá as etapas ficam no cabeçalho).
// Recebe as etapas (nomes) e a atual (começa em 1).
export default function FaixaPasso({ etapas, atual = 1 }) {
  const total = etapas.length;
  return (
    <div className={classes.faixa}>
      <p className={classes.texto}>
        <b className={classes.passo}>
          Passo {atual} de {total}
        </b>{' '}
        · {etapas[atual - 1]}
      </p>
      <div className={classes.barra} aria-hidden="true">
        {etapas.map((nome, indice) => (
          <i key={nome} className={indice < atual ? classes.feita : classes.parte} />
        ))}
      </div>
    </div>
  );
}
