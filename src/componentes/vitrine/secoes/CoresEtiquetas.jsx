import { SimpleGrid, Text } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import Etiqueta from '../../Etiqueta';
import EtiquetaSituacaoObra from '../../cidadeAberta/EtiquetaSituacaoObra';
import { useAcessibilidade } from '../../../contexto/useAcessibilidade';
import { STATUS_PEDIDO } from '../../../dados/statusPedido';
import { STATUS_SOLICITACAO } from '../../../dados/statusSolicitacao';
import { STATUS_PROJETO } from '../../../dados/statusProjeto';
import { TIPOS_SERVICO } from '../../../dados/tiposServico';
import { SITUACOES_OBRA } from '../../../dados/situacaoObra';
import { escurecerCor } from '../../../logica/cores';
import { resolverCor } from '../../../logica/variaveisCss';
import { formatarRazao, nivelContraste, razaoContraste } from '../../../logica/contraste';

// Grupos de etiquetas que guardam as cores no próprio dado
const GRUPOS = [
  { nome: 'STATUS_PEDIDO', arquivo: 'src/dados/statusPedido.js', itens: STATUS_PEDIDO },
  {
    nome: 'STATUS_SOLICITACAO',
    arquivo: 'src/dados/statusSolicitacao.js',
    itens: STATUS_SOLICITACAO,
  },
  { nome: 'STATUS_PROJETO', arquivo: 'src/dados/statusProjeto.js', itens: STATUS_PROJETO },
  { nome: 'TIPOS_SERVICO', arquivo: 'src/dados/tiposServico.js', itens: TIPOS_SERVICO },
];

// Valores de uma etiqueta em texto: fundo, texto e contraste entre os dois
function ValoresEtiqueta({ fundo, texto }) {
  const razao = razaoContraste(texto, fundo);
  return (
    <Text fz={12} c="var(--cor-texto-suave)" ff="monospace">
      fundo {fundo} · texto {texto} · {formatarRazao(razao)} {nivelContraste(razao)}
    </Text>
  );
}

// Etiquetas de status, tipo e situação, cada uma com as cores em texto e o contraste.
// No alto contraste, a Etiqueta escurece o texto (escurecerCor) e ganha borda: os valores acompanham.
export default function CoresEtiquetas() {
  const { altoContraste } = useAcessibilidade();

  return (
    <Subsecao
      id="cores-etiquetas"
      titulo="Status, tipos e situações"
      descricao="Etiquetas redondas com bolinha e texto: a cor nunca vem sozinha. No alto contraste o texto fica 30% mais escuro e a etiqueta ganha borda."
    >
      {GRUPOS.map((grupo) => (
        <Vitrine
          key={grupo.nome}
          nome={grupo.nome}
          arquivo={grupo.arquivo}
          props="Etiqueta texto corFundo corTexto"
        >
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
            {grupo.itens.map((item) => {
              const texto = altoContraste ? escurecerCor(item.corTexto) : item.corTexto;
              return (
                <div key={item.id}>
                  <Etiqueta texto={item.rotulo} corFundo={item.corFundo} corTexto={item.corTexto} />
                  <ValoresEtiqueta fundo={item.corFundo} texto={texto} />
                </div>
              );
            })}
          </SimpleGrid>
        </Vitrine>
      ))}

      <Vitrine
        nome="SITUACOES_OBRA"
        arquivo="src/dados/situacaoObra.js"
        props="EtiquetaSituacaoObra situacao (cores em variáveis do global.css)"
      >
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
          {SITUACOES_OBRA.map((situacao) => (
            <div key={situacao.id}>
              <EtiquetaSituacaoObra situacao={situacao.id} />
              <ValoresEtiqueta
                fundo={resolverCor(situacao.corFundo)}
                texto={resolverCor(situacao.corTexto)}
              />
            </div>
          ))}
        </SimpleGrid>
      </Vitrine>
    </Subsecao>
  );
}
