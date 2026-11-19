import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Botao from '../componentes/Botao';
import NaoEncontrado from '../componentes/NaoEncontrado';
import ParaOndeIr from '../componentes/ParaOndeIr';
import BlocoAcontece from '../componentes/hub/BlocoAcontece';
import CardBairro from '../componentes/hub/CardBairro';
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
import { SUBPREFEITURAS } from '../dados/subprefeituras';
import {
  bairrosDaSubprefeitura,
  buscarSubprefeitura,
  caminhoDoBairro,
  noLugar,
} from '../logica/lugares';
import { cardsAcontece, contar, resumirLugar } from '../logica/resumoLugar';
import { montarRecorteLugar } from '../logica/recorte';

// Quantos bairros cabem na seção antes de virar "Ver todos" (5 cards + o "Ver todos")
const MAXIMO_BAIRROS = 6;

// Hub de uma subprefeitura (/minha-cidade/subprefeituras/:id, prancha 14): sede, o que acontece,
// bairros (com popup de busca quando são muitos), números, quem cuida, telefone e "Para onde ir".
// Subprefeituras que o app ainda não conhece em detalhe mostram só as seções com dados.
export default function Subprefeitura() {
  const { id } = useParams();
  const sub = buscarSubprefeitura(id);
  const { bairro: bairroDaPessoa, pedidos, temConta, definido } = useLugarDaPessoa();
  const { estado, tentarDeNovo } = useCarregamento();
  const [popupAberto, setPopupAberto] = useState(false);

  if (!sub) {
    return (
      <Pagina>
        <NaoEncontrado
          titulo="Não encontramos esta subprefeitura"
          texto="O link pode estar incompleto. As 32 subprefeituras estão na página da cidade."
          icone="account_balance"
        >
          <Botao variante="principal" para="/minha-cidade">
            Ver as subprefeituras
          </Botao>
        </NaoEncontrado>
      </Pagina>
    );
  }

  const bairros = bairrosDaSubprefeitura(sub.id).map((bairro) => ({
    ...bairro,
    // O bairro da pessoa (da conta ou escolhido) leva a /meu-bairro; o selo "Seu" só com conta
    para: caminhoDoBairro(bairro, definido ? bairroDaPessoa.nome : null),
    seu: temConta && bairro.nome === bairroDaPessoa.nome,
    resumo: resumirLugar(pedidos, [bairro.nome]),
  }));
  // O bairro da pessoa vem primeiro nos cards; o resto continua de A a Z
  const ordenados = [...bairros].sort((a, b) => Number(b.seu) - Number(a.seu));
  // Os cards levam às subpáginas da subprefeitura (/minha-cidade/subprefeituras/:id/...),
  // contadas pelo mesmo recorte dessas páginas
  const recorte = montarRecorteLugar({ idSub: sub.id });
  const cards = cardsAcontece(
    resumirLugar(pedidos, recorte.bairros, recorte),
    recorte.base,
    'Pedidos',
    sub.percentualPago,
  );
  const muitos = bairros.length > MAXIMO_BAIRROS;
  const visiveis = muitos ? ordenados.slice(0, MAXIMO_BAIRROS - 1) : ordenados;
  const numeros = [
    {
      icone: 'home_work',
      valor: String(bairros.length),
      rotulo: bairros.length === 1 ? 'bairro' : 'bairros',
    },
    ...(sub.numeros ?? []),
  ];
  const nomeCompleto = `Subprefeitura ${sub.nome}`;

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="hub"
          titulo={nomeCompleto}
          trilha={[
            { rotulo: 'Cidade de São Paulo', para: '/minha-cidade' },
            { rotulo: nomeCompleto },
          ]}
          midia={<img src="/img/mapas/subprefeitura.svg" alt="" />}
        />
      }
    >
      {sub.endereco && <FichaSede endereco={sub.endereco} horario={sub.horario} />}

      <BlocoAcontece
        titulo={`O que acontece ${noLugar(sub)}`}
        cards={cards}
        estado={estado}
        aoTentarDeNovo={tentarDeNovo}
        textoErro="Não conseguimos carregar os números da subprefeitura agora."
        restoDaPagina="O endereço, quem cuida e os telefones continuam nesta página."
      />

      <SecaoHub titulo="Bairros">
        {(idTitulo) =>
          estado === 'carregando' ? (
            <EsqueletoCards texto="Carregando os bairros…" itens={3} />
          ) : (
            <GradeHub idTitulo={idTitulo}>
              {visiveis.map((bairro) => (
                <li key={bairro.id}>
                  <CardBairro
                    nome={bairro.nome}
                    para={bairro.para}
                    seu={bairro.seu}
                    resumo={bairro.resumo}
                  />
                </li>
              ))}
              {muitos && (
                <li>
                  <CardLugar
                    nome="Ver todos"
                    linha={`${bairros.length} bairros`}
                    aoClicar={() => setPopupAberto(true)}
                    rotulo={`Ver todos os ${bairros.length} bairros`}
                  />
                </li>
              )}
            </GradeHub>
          )
        }
      </SecaoHub>

      <SecaoHub titulo="A subprefeitura em números">
        {(idTitulo) => (
          <GradeHub dupla idTitulo={idTitulo}>
            {numeros.map((numero) => (
              <li key={numero.rotulo}>
                <CardNumero {...numero} />
              </li>
            ))}
          </GradeHub>
        )}
      </SecaoHub>

      {sub.subprefeito && (
        <QuemGoverna
          titulo="Quem cuida"
          pessoas={[
            {
              nome: sub.subprefeito.nome,
              cargo: `${sub.subprefeito.cargo} · ${nomeCompleto}`,
              iniciais: sub.subprefeito.iniciais,
            },
          ]}
          tituloGrupo="Coordenações"
          grupo={sub.coordenacoes}
        />
      )}

      {sub.telefone && (
        <SecaoHub titulo="Telefones">
          <CardTelefone
            numero={sub.telefone.numero}
            link={sub.telefone.link}
            titulo={nomeCompleto}
            texto={sub.telefone.texto}
          />
        </SecaoHub>
      )}

      <ParaOndeIr
        destinos={[
          {
            icone: 'location_city',
            titulo: 'Cidade de São Paulo',
            meta: `${SUBPREFEITURAS.length} subprefeituras`,
            para: '/minha-cidade',
          },
          {
            icone: 'assignment',
            titulo: 'Pedidos da cidade',
            meta: contar(resumirLugar(pedidos).pedidos, 'aberto', 'abertos'),
            para: '/minha-cidade/pedidos',
          },
        ]}
      />

      {muitos && (
        <PopupLugares
          aberto={popupAberto}
          aoFechar={() => setPopupAberto(false)}
          titulo={`Bairros da ${nomeCompleto}`}
          rotuloBusca="Buscar bairro"
          contagem={`${bairros.length} bairros, de A a Z`}
          nomeResultado={['bairro', 'bairros']}
          grupos={[
            {
              titulo: null,
              itens: bairros.map((bairro) => ({
                id: bairro.id,
                nome: bairro.nome,
                linha: contar(bairro.resumo.pedidos, 'pedido aberto', 'pedidos abertos'),
                para: bairro.para,
                selo: bairro.seu ? 'Seu' : undefined,
              })),
            },
          ]}
        />
      )}
    </Pagina>
  );
}
