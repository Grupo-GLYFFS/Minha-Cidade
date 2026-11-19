import { useState } from 'react';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import SecaoCard from '../componentes/SecaoCard';
import ParaOndeIr from '../componentes/ParaOndeIr';
import PilhaCards from '../componentes/ajuda/PilhaCards';
import PerguntaFrequente from '../componentes/ajuda/PerguntaFrequente';
import { GRUPOS_PERGUNTAS } from '../dados/perguntas';
import { GRUPOS_TELEFONES } from '../dados/telefones';
import { SERVICOS } from '../dados/servicos';

// Quantos telefones a página Telefones úteis tem (meta do "Para onde ir")
const TOTAL_TELEFONES = GRUPOS_TELEFONES.reduce((soma, grupo) => soma + grupo.telefones.length, 0);

// Perguntas frequentes (/ajuda/perguntas-frequentes): um card por grupo, com a contagem,
// e as perguntas que abrem e fecham. A primeira pergunta começa aberta.
export default function PerguntasFrequentes() {
  const [abertas, setAbertas] = useState(() => [GRUPOS_PERGUNTAS[0].perguntas[0].id]);

  // Abre a pergunta fechada ou fecha a aberta. Recebe o id da pergunta.
  function alternar(id) {
    setAbertas((atual) =>
      atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id],
    );
  }

  return (
    <Pagina cabecalho={<CabecalhoPagina tipo="lista" titulo="Perguntas frequentes" icone="help" />}>
      <PilhaCards>
        {GRUPOS_PERGUNTAS.map((grupo) => (
          <SecaoCard key={grupo.id} titulo={grupo.titulo} contagem={grupo.perguntas.length} lista>
            {grupo.perguntas.map((item) => (
              <PerguntaFrequente
                key={item.id}
                pergunta={item.pergunta}
                resposta={item.resposta}
                aberta={abertas.includes(item.id)}
                aoAlternar={() => alternar(item.id)}
              />
            ))}
          </SecaoCard>
        ))}
      </PilhaCards>

      <ParaOndeIr
        destinos={[
          {
            icone: 'call',
            titulo: 'Telefones úteis',
            meta: `${TOTAL_TELEFONES} números, ligação grátis`,
            para: '/ajuda/telefones',
          },
          {
            icone: 'apps',
            titulo: 'Serviços',
            meta: `${SERVICOS.length} serviços da prefeitura`,
            para: '/servicos',
          },
        ]}
      />
    </Pagina>
  );
}
