import { useState } from 'react';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import ParaOndeIr from '../componentes/ParaOndeIr';
import BlocoAcontece from '../componentes/hub/BlocoAcontece';
import CardLugar from '../componentes/hub/CardLugar';
import CardNumero from '../componentes/hub/CardNumero';
import CardTelefone from '../componentes/hub/CardTelefone';
import EsqueletoCards from '../componentes/hub/EsqueletoCards';
import FichaSede from '../componentes/hub/FichaSede';
import GradeHub from '../componentes/hub/GradeHub';
import PopupLugares from '../componentes/hub/PopupLugares';
import QuemGoverna from '../componentes/hub/QuemGoverna';
import SecaoHub from '../componentes/hub/SecaoHub';
import { useCarregamento } from '../componentes/hub/useCarregamento';
import { useLugarDaPessoa } from '../componentes/hub/useLugarDaPessoa';
import { PREFEITURA } from '../dados/prefeitura';
import { SUBPREFEITURAS } from '../dados/subprefeituras';
import { bairrosDaSubprefeitura } from '../logica/lugares';
import { cardsAcontece, resumirLugar } from '../logica/resumoLugar';

// Junta a subprefeitura com os nomes dos bairros dela, para os cards e a busca do popup
function comBairros(sub, idDaPessoa) {
  const bairros = bairrosDaSubprefeitura(sub.id).map((bairro) => bairro.nome);
  return {
    id: sub.id,
    nome: sub.nome,
    bairros,
    linha: bairros.join(', '),
    para: `/minha-cidade/subprefeituras/${sub.id}`,
    selo: sub.id === idDaPessoa ? 'Sua' : undefined,
  };
}

// Hub "Cidade de São Paulo" (/minha-cidade, prancha 13): sede da prefeitura, o que acontece
// na cidade, 8 subprefeituras + "Ver todas" (popup com busca das 32), números, quem governa,
// o 156 e "Para onde ir". Sem trilha (é página do menu).
export default function MinhaCidade() {
  const { subprefeitura, pedidos, temConta, destinoMeusPedidos, destinoMeuBairro } =
    useLugarDaPessoa();
  // O selo "Sua" e o grupo "A sua" só valem para quem tem conta (o endereço é dela)
  const idDaPessoa = temConta ? subprefeitura.id : null;
  const { estado, tentarDeNovo } = useCarregamento();
  const [popupAberto, setPopupAberto] = useState(false);

  const resumo = resumirLugar(pedidos);
  const cards = cardsAcontece(
    resumo,
    '/minha-cidade',
    'Pedidos da cidade',
    PREFEITURA.percentualPago,
  );
  const todas = SUBPREFEITURAS.map((sub) => comBairros(sub, idDaPessoa));
  // As 8 subprefeituras do card, na ordem do campo "destaque"
  const destaques = SUBPREFEITURAS.filter((sub) => sub.destaque)
    .sort((a, b) => a.destaque - b.destaque)
    .map((sub) => comBairros(sub, idDaPessoa));
  const daPessoa = todas.find((sub) => sub.id === subprefeitura.id);

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="hub"
          titulo="Cidade de São Paulo"
          subtitulo="Prefeitura de São Paulo · SP"
          midia={<img src="/img/mapas/cidade.svg" alt="" />}
        />
      }
    >
      <FichaSede endereco={PREFEITURA.endereco} horario={PREFEITURA.horario} />

      <BlocoAcontece
        titulo="O que acontece na cidade"
        cards={cards}
        estado={estado}
        aoTentarDeNovo={tentarDeNovo}
        textoErro="Não conseguimos carregar os números da cidade agora."
        restoDaPagina="O endereço e os telefones continuam nesta página."
      />

      <SecaoHub titulo="Subprefeituras">
        {(idTitulo) =>
          estado === 'carregando' ? (
            <EsqueletoCards texto="Carregando as subprefeituras…" itens={3} />
          ) : (
            <GradeHub idTitulo={idTitulo}>
              {destaques.map((sub) => (
                <li key={sub.id}>
                  <CardLugar
                    nome={sub.nome}
                    selo={sub.selo}
                    linha={sub.linha}
                    para={sub.para}
                    sua={Boolean(sub.selo)}
                  />
                </li>
              ))}
              <li>
                <CardLugar
                  nome="Ver todas"
                  linha={`${SUBPREFEITURAS.length} subprefeituras`}
                  aoClicar={() => setPopupAberto(true)}
                  rotulo={`Ver todas as ${SUBPREFEITURAS.length} subprefeituras`}
                />
              </li>
            </GradeHub>
          )
        }
      </SecaoHub>

      <SecaoHub titulo="A cidade em números">
        {(idTitulo) => (
          <GradeHub dupla idTitulo={idTitulo}>
            {PREFEITURA.numeros.map((numero) => (
              <li key={numero.rotulo}>
                <CardNumero {...numero} />
              </li>
            ))}
          </GradeHub>
        )}
      </SecaoHub>

      <QuemGoverna
        titulo="Quem governa"
        pessoas={PREFEITURA.governo}
        tituloGrupo="Secretarias"
        grupo={PREFEITURA.secretarias}
      />

      <SecaoHub titulo="Telefones">
        <CardTelefone {...PREFEITURA.telefone} />
      </SecaoHub>

      <ParaOndeIr destinos={[destinoMeuBairro, destinoMeusPedidos]} />

      <PopupLugares
        aberto={popupAberto}
        aoFechar={() => setPopupAberto(false)}
        titulo="Todas as subprefeituras"
        rotuloBusca="Buscar subprefeitura ou bairro"
        contagem={`${SUBPREFEITURAS.length} subprefeituras`}
        nomeResultado={['subprefeitura', 'subprefeituras']}
        grupos={[
          ...(temConta ? [{ titulo: 'A sua', itens: [daPessoa] }] : []),
          { titulo: 'Todas, de A a Z', itens: todas },
        ]}
      />
    </Pagina>
  );
}
