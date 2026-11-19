import SecaoCard from '../SecaoCard';
import BarraPercentual from '../obras/BarraPercentual';
import { formatarValorCurto } from '../../logica/formatos';
import classes from './ComoFicaVerba.module.css';

// Seção "Como fica a verba de <ano>" (só nas votações de mudança de verba):
// dois quadros lado a lado, de onde o dinheiro sai e para onde vai, cada um com o valor
// de hoje e o valor se o Sim ganhar, em barras na mesma escala.
// Recebe o projeto (com verba: { ano, de, para } e valor).
export default function ComoFicaVerba({ projeto }) {
  const { verba, valor } = projeto;
  // A maior das duas verbas de hoje vira 100% da barra
  const escala = Math.max(verba.de.hoje, verba.para.hoje, 1);
  const lados = [
    {
      id: 'de',
      rotulo: 'Sai de',
      nome: verba.de.nome,
      sinal: '−',
      hoje: verba.de.hoje,
      depois: verba.de.hoje - valor,
    },
    {
      id: 'para',
      rotulo: 'Vai para',
      nome: verba.para.nome,
      sinal: '+',
      hoje: verba.para.hoje,
      depois: verba.para.hoje + valor,
    },
  ];

  return (
    <SecaoCard titulo={`Como fica a verba de ${verba.ano}`}>
      <div className={classes.lados}>
        {lados.map((lado) => (
          <div key={lado.id} className={lado.id === 'para' ? classes.ladoPara : classes.lado}>
            <p className={classes.rotulo}>{lado.rotulo}</p>
            <p className={classes.nome}>{lado.nome}</p>
            <p className={classes.diferenca}>
              {lado.sinal} {formatarValorCurto(valor)}
            </p>
            <div className={classes.linha}>
              <p>
                <span>Hoje</span>
                <b>{formatarValorCurto(lado.hoje)}</b>
              </p>
              <BarraPercentual percentual={(lado.hoje / escala) * 100} cor="cinza" altura={8} />
            </div>
            <div className={classes.linha}>
              <p>
                <span>Se o Sim ganhar</span>
                <b>{formatarValorCurto(lado.depois)}</b>
              </p>
              <BarraPercentual percentual={(lado.depois / escala) * 100} altura={8} />
            </div>
          </div>
        ))}
      </div>
    </SecaoCard>
  );
}
