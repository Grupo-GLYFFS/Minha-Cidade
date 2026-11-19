import Icone from '../Icone';
import classes from './FatosServico.module.css';

// Card com os fatos rápidos da ficha: prazo, custo e onde ir (o que existir).
// Cada linha: ícone de 20, rótulo em 600 e o valor ao lado; divisórias de borda a borda.
// Recebe a ficha do serviço (servico.info).
export default function FatosServico({ info }) {
  const fatos = [
    { icone: 'schedule', rotulo: 'Prazo', valor: info.prazo },
    { icone: 'payments', rotulo: 'Custo', valor: info.custo },
    { icone: 'location_on', rotulo: 'Onde ir', valor: info.ondeIr },
  ].filter((fato) => fato.valor);

  return (
    <dl className={classes.fatos}>
      {fatos.map((fato) => (
        <div key={fato.rotulo} className={classes.linha}>
          <dt className={classes.rotulo}>
            <Icone nome={fato.icone} tamanho={20} className={classes.icone} />
            {fato.rotulo}
          </dt>
          <dd className={classes.valor}>{fato.valor}</dd>
        </div>
      ))}
    </dl>
  );
}
