import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Chip from '../componentes/Chip';
import ParaOndeIr from '../componentes/ParaOndeIr';
import EstadoVazio from '../componentes/EstadoVazio';
import EstadoCarregando from '../componentes/EstadoCarregando';
import EstadoErro from '../componentes/EstadoErro';
import GruposObras from '../componentes/obras/GruposObras';
import { OBRAS } from '../dados/obras';
import { obrasDoRecorte } from '../logica/recorte';
import { destinoOrcamento, destinoVotacoes } from '../logica/destinos';
import { useRecorte } from '../contexto/useRecorte';
import { useOQueSegue } from '../contexto/useOQueSegue';
import { useCarregamentoSimulado } from '../contexto/useCarregamentoSimulado';
import classes from './Obras.module.css';

// Página Obras (/minha-cidade/obras e /meu-bairro/obras): obras agrupadas pela situação e o
// Seguir em cada card. As obras seguidas ficam em O que você segue: o atalho no alto da lista
// leva para lá, com a contagem da mesma regra (useOQueSegue).
// Recebe o escopo: "cidade" (todas as obras) ou "bairro" (as da subprefeitura do bairro da pessoa).
export default function Obras({ escopo = 'cidade' }) {
  const recorte = useRecorte(escopo);
  const { seguidos, seguirObras } = useOQueSegue();
  const { segue, alternar, logado } = seguirObras;
  const { estado, tentarDeNovo } = useCarregamentoSimulado();

  const visiveis = obrasDoRecorte(OBRAS, recorte);

  // O que aparece no painel da aba, conforme o estado da lista
  let conteudo;
  if (estado === 'carregando') {
    conteudo = <EstadoCarregando texto="Carregando as obras…" />;
  } else if (estado === 'erro') {
    conteudo = (
      <EstadoErro titulo="Não conseguimos carregar as obras agora" aoTentarDeNovo={tentarDeNovo} />
    );
  } else if (visiveis.length === 0) {
    conteudo = (
      <EstadoVazio
        icone="construction"
        titulo={`Nenhuma obra ${recorte.sufixo} agora`}
        texto="Quando a prefeitura começar uma obra, ela aparece aqui."
      />
    );
  } else {
    conteudo = (
      <GruposObras
        obras={visiveis}
        base={recorte.base}
        prefixo="obras"
        segue={segue}
        alternar={alternar}
        logado={logado}
      />
    );
  }

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo={`Obras ${recorte.sufixo}`}
          icone="construction"
          trilha={[...recorte.trilha, { rotulo: 'Obras' }]}
        />
      }
    >
      {logado && (
        <div className={classes.atalhos}>
          <Chip icone="bookmark" contagem={seguidos.obras.length} para="/perfil/seguindo?aba=obras">
            Obras que você segue
          </Chip>
        </div>
      )}
      {conteudo}
      <ParaOndeIr destinos={[destinoVotacoes(recorte), destinoOrcamento(recorte)]} />
    </Pagina>
  );
}
