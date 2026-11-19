import { useState } from 'react';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Abas from '../componentes/Abas';
import Botao from '../componentes/Botao';
import ParaOndeIr from '../componentes/ParaOndeIr';
import EstadoVazio from '../componentes/EstadoVazio';
import EstadoCarregando from '../componentes/EstadoCarregando';
import EstadoErro from '../componentes/EstadoErro';
import GruposObras from '../componentes/obras/GruposObras';
import { OBRAS } from '../dados/obras';
import { obrasDoRecorte } from '../logica/recorte';
import { destinoOrcamento, destinoVotacoes } from '../logica/destinos';
import { useRecorte } from '../contexto/useRecorte';
import { useSeguidos } from '../contexto/useSeguidos';
import { useCarregamentoSimulado } from '../contexto/useCarregamentoSimulado';
import classes from './Obras.module.css';

// Prefixo dos ids das abas e do painel
const PREFIXO = 'obras';

// Página Obras (/minha-cidade/obras e /meu-bairro/obras): abas "Todas" e "Que você segue",
// obras agrupadas pela situação e o Seguir em cada card.
// Recebe o escopo: "cidade" (todas as obras) ou "bairro" (as da subprefeitura do bairro da pessoa).
export default function Obras({ escopo = 'cidade' }) {
  const recorte = useRecorte(escopo);
  const { segue, alternar, seguidos, logado } = useSeguidos('obras');
  const { estado, tentarDeNovo } = useCarregamentoSimulado();
  const [aba, setAba] = useState('todas');

  const todas = obrasDoRecorte(OBRAS, recorte);
  const queSegue = todas.filter((obra) => seguidos.includes(obra.id));
  const visiveis = aba === 'todas' ? todas : queSegue;

  const abas = [
    { id: 'todas', rotulo: 'Todas', contagem: todas.length },
    { id: 'seguidas', rotulo: 'Que você segue', contagem: queSegue.length },
  ];

  // O que aparece no painel da aba, conforme o estado da lista
  let conteudo;
  if (estado === 'carregando') {
    conteudo = <EstadoCarregando texto="Carregando as obras…" />;
  } else if (estado === 'erro') {
    conteudo = (
      <EstadoErro titulo="Não conseguimos carregar as obras agora" aoTentarDeNovo={tentarDeNovo} />
    );
  } else if (visiveis.length === 0 && aba === 'seguidas') {
    conteudo = (
      <EstadoVazio
        icone="construction"
        titulo="Você ainda não segue nenhuma obra"
        texto={
          logado
            ? 'Quando você seguir uma obra, ela aparece aqui com as novidades.'
            : 'Entre na sua conta para seguir as obras.'
        }
      >
        {logado ? (
          <Botao variante="secundario" onClick={() => setAba('todas')}>
            Ver todas as obras
          </Botao>
        ) : (
          <Botao variante="principal" para={`/entrar?voltar=${recorte.base}/obras`}>
            Entrar
          </Botao>
        )}
      </EstadoVazio>
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
        prefixo={`${PREFIXO}-${aba}`}
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
      <div className={classes.abas}>
        <Abas abas={abas} ativa={aba} aoMudar={setAba} rotulo="Quais obras" prefixo={PREFIXO} />
      </div>
      <div
        id={`${PREFIXO}-painel-${aba}`}
        role="tabpanel"
        aria-labelledby={`${PREFIXO}-aba-${aba}`}
      >
        {conteudo}
      </div>
      <ParaOndeIr destinos={[destinoVotacoes(recorte), destinoOrcamento(recorte)]} />
    </Pagina>
  );
}
