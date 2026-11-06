import { Text } from '@mantine/core';
import CartaoObra from '../cidadeAberta/CartaoObra';
import EstadoVazio from '../EstadoVazio';
import SecaoCabecalho from '../SecaoCabecalho';
import { OBRAS } from '../../dados/obras';
import { naRegiao, pluralizar } from '../../logica/formatos';
import { obraEmAndamento, obrasDoBairro } from '../../logica/obras';
import classes from './SecoesMeuBairro.module.css';

// Seção "Obras no bairro" de Meu Bairro: todas as obras do bairro, em andamento ou concluídas,
// cada uma com a sua situação. Sem obras, mostra o aviso e o link para as obras da região.
// Recebe o nome do bairro e a região.
export default function SecaoObrasBairro({ bairro, regiao }) {
  const obras = obrasDoBairro(OBRAS, bairro);
  const emAndamento = obras.filter(obraEmAndamento).length;
  const caminhoRegiao = regiao
    ? `/cidade-aberta/obras?regiao=${encodeURIComponent(regiao)}`
    : '/cidade-aberta/obras';
  const rotuloRegiao = regiao ? `Ver obras ${naRegiao(regiao)}` : 'Ver obras da cidade';

  return (
    <section aria-labelledby="obras-bairro-titulo">
      <SecaoCabecalho
        id="obras-bairro-titulo"
        titulo="Obras no bairro"
        caminho={obras.length > 0 ? caminhoRegiao : undefined}
        rotuloLink={rotuloRegiao}
        rotuloLinkCurto="Ver da região"
      />
      {obras.length > 0 ? (
        <>
          <Text fz={14} c="var(--cor-texto-suave)" mb="sm">
            {pluralizar(obras.length, 'obra', 'obras')} no bairro,{' '}
            {pluralizar(emAndamento, 'em andamento', 'em andamento')}.
          </Text>
          <ul className={classes.grade} data-colunas="3">
            {obras.map((obra) => (
              <li key={obra.id}>
                <CartaoObra obra={obra} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <EstadoVazio
          texto="Nenhuma obra neste bairro agora."
          rotuloBotao={rotuloRegiao}
          caminho={caminhoRegiao}
        />
      )}
    </section>
  );
}
