import Pagina from '../Pagina';
import CabecalhoPagina from '../CabecalhoPagina';
import ParaOndeIr from '../ParaOndeIr';
import Botao from '../Botao';
import BlocoAcontece from './BlocoAcontece';
import CardNumero from './CardNumero';
import CardQuemCuida from './CardQuemCuida';
import CardServico from './CardServico';
import EsqueletoCards from './EsqueletoCards';
import GradeHub from './GradeHub';
import SecaoHub from './SecaoHub';
import { useCarregamento } from './useCarregamento';
import { useLugarDaPessoa } from './useLugarDaPessoa';
import { BAIRROS } from '../../dados/bairros';
import { SUBPREFEITURAS } from '../../dados/subprefeituras';
import {
  buscarSubprefeitura,
  noLugar,
  perfilDoBairro,
  servicosDoBairro,
} from '../../logica/lugares';
import { cardsAcontece, contar, resumirLugar } from '../../logica/resumoLugar';
import { montarRecorte } from '../../logica/recorte';
import classes from './Hub.module.css';

// Página de um bairro (prancha 15 e 16): o bairro da pessoa (/meu-bairro, com o selo
// "Seu bairro" e "Perto de você") ou outro bairro (/minha-cidade/bairros/:id, com "No bairro").
// Seções: o que acontece, o bairro em números, serviços perto, quem cuida e "Para onde ir".
// Recebe o bairro (de BAIRROS_CIDADE) e seu (true em /meu-bairro: o bairro da conta ou o
// escolhido por quem não tem conta). O selo "Seu bairro" e o "Perto de você" só aparecem
// com conta; sem conta, o cabeçalho ganha o botão "Trocar bairro".
export default function PerfilBairro({ bairro, seu = false }) {
  const { pedidos, temConta, destinoMeusPedidos, destinoMeuBairro } = useLugarDaPessoa();
  const comSelo = seu && temConta;
  const tituloPerto = comSelo ? 'Perto de você' : 'No bairro';
  const { estado, tentarDeNovo } = useCarregamento();
  const sub = buscarSubprefeitura(bairro.subprefeitura);
  const perfil = perfilDoBairro(bairro.id);
  const servicos = servicosDoBairro(bairro, BAIRROS);

  // O bairro da pessoa leva às subpáginas de /meu-bairro (contadas pelo recorte do bairro,
  // como nessas páginas); os outros, às listas da cidade
  const cards = cardsAcontece(
    resumirLugar(pedidos, [bairro.nome], seu ? montarRecorte('bairro', bairro.nome) : null),
    seu ? '/meu-bairro' : '/minha-cidade',
    'Pedidos do bairro',
    sub.percentualPago,
  );
  const cidade = resumirLugar(pedidos);

  const destinos = seu
    ? [
        {
          icone: 'location_city',
          titulo: 'Cidade de São Paulo',
          meta: contar(cidade.alertas, 'alerta ativo', 'alertas ativos'),
          para: '/minha-cidade',
        },
        destinoMeusPedidos,
      ]
    : [
        destinoMeuBairro,
        {
          icone: 'location_city',
          titulo: 'Cidade de São Paulo',
          meta: `${SUBPREFEITURAS.length} subprefeituras`,
          para: '/minha-cidade',
        },
      ];

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="hub"
          titulo={bairro.nome}
          trilha={[
            { rotulo: 'Cidade de São Paulo', para: '/minha-cidade' },
            { rotulo: `Subprefeitura ${sub.nome}`, para: `/minha-cidade/subprefeituras/${sub.id}` },
            { rotulo: bairro.nome },
          ]}
          midia={<img src={perfil?.mapa ?? '/img/mapas/subprefeitura.svg'} alt="" />}
          categoria={
            comSelo
              ? { rotulo: <span className={classes.seloCabecalho}>Seu bairro</span> }
              : undefined
          }
          acoes={
            seu && !temConta ? (
              <Botao variante="secundario" icone="swap_horiz" para="/meu-bairro/escolher">
                Trocar bairro
              </Botao>
            ) : undefined
          }
        />
      }
    >
      <BlocoAcontece
        titulo={`O que acontece ${noLugar(bairro)}`}
        cards={cards}
        estado={estado}
        aoTentarDeNovo={tentarDeNovo}
        textoErro="Não conseguimos carregar os números do bairro agora."
        restoDaPagina={`${tituloPerto} e quem cuida continuam nesta página.`}
      />

      {perfil?.numeros && (
        <SecaoHub titulo="O bairro em números">
          {(idTitulo) =>
            estado === 'carregando' ? (
              <EsqueletoCards texto="Carregando os números do bairro…" itens={3} />
            ) : (
              <GradeHub dupla idTitulo={idTitulo}>
                {perfil.numeros.map((numero) => (
                  <li key={numero.rotulo}>
                    <CardNumero {...numero} />
                  </li>
                ))}
              </GradeHub>
            )
          }
        </SecaoHub>
      )}

      {servicos.length > 0 && (
        <SecaoHub titulo={tituloPerto}>
          {(idTitulo) => (
            <GradeHub colunas={2} idTitulo={idTitulo}>
              {servicos.map((servico) => (
                <li key={servico.nome}>
                  <CardServico {...servico} />
                </li>
              ))}
            </GradeHub>
          )}
        </SecaoHub>
      )}

      <SecaoHub titulo="Quem cuida">
        <CardQuemCuida subprefeitura={sub} />
      </SecaoHub>

      <ParaOndeIr destinos={destinos} />
    </Pagina>
  );
}
