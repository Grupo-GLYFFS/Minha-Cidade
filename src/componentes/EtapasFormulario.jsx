import Icone from './Icone';
import classes from './EtapasFormulario.module.css';

// Etapas de um formulário (Abrir pedido, Solicitar serviço), embaixo do título do cabeçalho.
// Recebe os nomes das etapas e a etapa atual (começa em 1).
// As etapas feitas mostram um check; a atual fica azul e leva aria-current="step".
export default function EtapasFormulario({ etapas, atual = 1 }) {
  return (
    <ol className={classes.etapas} aria-label="Etapas">
      {etapas.map((nome, indice) => {
        const numero = indice + 1;
        const feita = numero < atual;
        const ehAtual = numero === atual;
        const classesEtapa = [classes.etapa];
        if (feita) classesEtapa.push(classes.feita);
        if (ehAtual) classesEtapa.push(classes.atual);

        return (
          <li
            key={nome}
            className={classesEtapa.join(' ')}
            aria-current={ehAtual ? 'step' : undefined}
          >
            <span className={classes.numero}>
              {feita ? <Icone nome="check" tamanho={20} /> : numero}
            </span>
            {nome}
            {feita && <span className={classes.oculto}> (feita)</span>}
          </li>
        );
      })}
    </ol>
  );
}
