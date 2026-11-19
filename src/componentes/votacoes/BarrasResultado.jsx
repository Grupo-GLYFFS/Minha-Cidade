import Icone from '../Icone';
import BarraPercentual from '../obras/BarraPercentual';
import { formatarNumero, pluralizar } from '../../logica/formatos';
import classes from './BarrasResultado.module.css';

// Barras do resultado (parcial ou final): uma por opção, com o nome, o percentual,
// a barra (Sim azul, Não cinza, as mesmas no parcial e no final) e o número de votos.
// Recebe o resultado (de calcularResultado), o voto da pessoa ("sim", "nao" ou undefined)
// e se é o resultado final. O leitor de tela ouve a mudança quando o voto entra.
export default function BarrasResultado({ resultado, voto, final = false }) {
  const tipo = final ? 'Resultado final' : 'Resultado parcial';

  return (
    <ul
      className={classes.lista}
      aria-live="polite"
      aria-label={`${tipo}, ${pluralizar(resultado.total, 'voto', 'votos')}`}
    >
      {resultado.opcoes.map((opcao) => (
        <li key={opcao.valor}>
          <p className={classes.topo}>
            <span className={classes.nome}>
              {opcao.rotulo}
              {voto === opcao.valor && (
                <span className={classes.seu}>
                  <Icone nome="check" tamanho={16} />
                  Seu voto
                </span>
              )}
            </span>
            <b>{opcao.percentual}%</b>
          </p>
          <BarraPercentual
            percentual={opcao.percentual}
            cor={opcao.valor === 'sim' ? 'azul' : 'cinza'}
            altura={10}
          />
          <p className={classes.votos}>
            {formatarNumero(opcao.quantidade)} {opcao.quantidade === 1 ? 'voto' : 'votos'}
          </p>
        </li>
      ))}
    </ul>
  );
}
