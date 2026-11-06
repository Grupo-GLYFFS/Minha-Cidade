import { Text } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import SecaoFicha from './SecaoFicha';
import classes from './FichaServico.module.css';

// Ficha completa do serviço: prazo e custo em destaque, o que é, quem pode usar,
// documentos, passo a passo e onde ir. Recebe as informações do serviço (servico.info).
export default function FichaServico({ info }) {
  return (
    <Cartao className={classes.ficha}>
      <dl className={classes.fatos}>
        <div className={classes.fato}>
          <span className={classes.iconeFato}>
            <Icone nome="schedule" tamanho={20} />
          </span>
          <div>
            <dt className={classes.rotuloFato}>Prazo</dt>
            <dd className={classes.valorFato}>{info.prazo}</dd>
          </div>
        </div>
        <div className={classes.fato}>
          <span className={classes.iconeFato}>
            <Icone nome="payments" tamanho={20} />
          </span>
          <div>
            <dt className={classes.rotuloFato}>Custo</dt>
            <dd className={classes.valorFato}>{info.custo}</dd>
          </div>
        </div>
      </dl>

      <SecaoFicha id="ficha-o-que-e" titulo="O que é">
        <Text>{info.oQueE}</Text>
      </SecaoFicha>

      <SecaoFicha id="ficha-quem-pode" titulo="Quem pode usar">
        <Text>{info.quemPode}</Text>
      </SecaoFicha>

      <SecaoFicha id="ficha-documentos" titulo="Documentos">
        {info.documentos.length > 0 ? (
          <ul className={classes.documentos}>
            {info.documentos.map((documento) => (
              <li key={documento} className={classes.documento}>
                <Icone nome="description" tamanho={20} />
                <span>{documento}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Text>Não precisa de documentos.</Text>
        )}
      </SecaoFicha>

      <SecaoFicha id="ficha-como-fazer" titulo="Como fazer">
        <ol className={classes.passos}>
          {info.comoFazer.map((passo) => (
            <li key={passo} className={classes.passo}>
              {passo}
            </li>
          ))}
        </ol>
      </SecaoFicha>

      {info.ondeIr && (
        <SecaoFicha id="ficha-onde-ir" titulo="Onde ir">
          <Text className={classes.comIcone}>
            <Icone nome="location_on" tamanho={20} />
            <span>{info.ondeIr}</span>
          </Text>
        </SecaoFicha>
      )}
    </Cartao>
  );
}
