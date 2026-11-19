import { useParams } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Botao from '../componentes/Botao';
import Icone from '../componentes/Icone';
import LinhaDado from '../componentes/LinhaDado';
import MetaCabecalho from '../componentes/MetaCabecalho';
import NaoEncontrado from '../componentes/NaoEncontrado';
import ParaOndeIr from '../componentes/ParaOndeIr';
import SecaoCard from '../componentes/SecaoCard';
import SeloSituacao from '../componentes/SeloSituacao';
import AtualizacoesAlerta from '../componentes/alertas/AtualizacoesAlerta';
import BarraAlerta from '../componentes/alertas/BarraAlerta';
import NiveisAlerta from '../componentes/alertas/NiveisAlerta';
import PassosAlerta from '../componentes/alertas/PassosAlerta';
import PontosApoio from '../componentes/alertas/PontosApoio';
import { useLugarDaPessoa } from '../componentes/hub/useLugarDaPessoa';
import { ALERTAS } from '../dados/alertas';
import { alertasDoLugar, buscarNivel } from '../logica/alertas';
import { juntarNomes } from '../logica/avisos';
import { buscarSubprefeitura, doLugar } from '../logica/lugares';
import { contar } from '../logica/resumoLugar';
import classes from '../componentes/alertas/Alertas.module.css';

// Passo que os alertas da Defesa Civil ganham no fim do "O que fazer" (só no detalhe)
const PASSO_199 = 'Em situação de risco, ligue 199.';

// Põe a primeira letra em minúscula ("Até 23h de hoje" vira "até 23h de hoje")
function comMinuscula(texto) {
  return texto.charAt(0).toLowerCase() + texto.slice(1);
}

// Detalhe de um alerta (/minha-cidade/alertas/:id, prancha 17, quadros 4 e 5): nível em degraus,
// o que está acontecendo, o que fazer (com o 199 na Defesa Civil), área, pontos de apoio,
// atualizações, a barra presa no pé (Compartilhar e Ligar 199) e "Para onde ir".
// Recebe doBairro (true em /meu-bairro/alertas/:id, que só muda a trilha).
export default function DetalheAlerta({ doBairro = false }) {
  const { id } = useParams();
  const { bairro, trilhaDoBairro } = useLugarDaPessoa();
  const alerta = ALERTAS.find((item) => item.id === id);

  if (!alerta) {
    return (
      <Pagina>
        <NaoEncontrado
          titulo="Não encontramos este alerta"
          texto="Ele pode ter sido encerrado e retirado, ou o link está incompleto."
          icone="warning"
        >
          <Botao variante="principal" para="/minha-cidade/alertas">
            Ver os alertas da cidade
          </Botao>
        </NaoEncontrado>
      </Pagina>
    );
  }

  const nivel = buscarNivel(alerta.nivel);
  // Endereço do alerta no recorte aberto (o do compartilhar): bairro ou cidade
  const caminho = `${doBairro ? '/meu-bairro' : '/minha-cidade'}/alertas/${alerta.id}`;
  const passos = alerta.tipo === 'defesa-civil' ? [...alerta.passos, PASSO_199] : alerta.passos;
  const subs = alerta.subprefeituras
    .map((idSub) => buscarSubprefeitura(idSub)?.nome)
    .filter(Boolean);
  const trilha = doBairro
    ? [
        ...trilhaDoBairro,
        { rotulo: 'Alertas', para: '/meu-bairro/alertas' },
        { rotulo: alerta.manchete },
      ]
    : [
        { rotulo: 'Cidade de São Paulo', para: '/minha-cidade' },
        { rotulo: 'Alertas', para: '/minha-cidade/alertas' },
        { rotulo: alerta.manchete },
      ];

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="detalhe"
          titulo={alerta.manchete}
          icone={alerta.icone}
          categoria={{ icone: 'shield', rotulo: alerta.orgao }}
          trilha={trilha}
        >
          <MetaCabecalho>
            {!alerta.ativo && <SeloSituacao cor="cinza">Encerrado</SeloSituacao>}
            <SeloSituacao cor={nivel.cor}>{nivel.rotulo}</SeloSituacao>
            {alerta.bairros.includes(bairro.nome) && (
              <span>
                <Icone nome="home" tamanho={18} preenchido />
                {bairro.nome}
              </span>
            )}
          </MetaCabecalho>
          <p className={classes.metaLinha}>
            {alerta.inicio} · {comMinuscula(alerta.fim)}
          </p>
        </CabecalhoPagina>
      }
    >
      <div className={classes.pilha}>
        <SecaoCard titulo="Nível">
          <NiveisAlerta atual={alerta.nivel} />
        </SecaoCard>

        <SecaoCard titulo="O que está acontecendo">
          <p className={classes.texto}>{alerta.descricao}</p>
        </SecaoCard>

        <SecaoCard titulo="O que fazer">
          <PassosAlerta passos={passos} />
        </SecaoCard>

        <SecaoCard titulo="Área afetada" lista>
          {alerta.bairros.length === 0 ? (
            <LinhaDado icone="location_city" rotulo="Onde" valor="Cidade toda" />
          ) : (
            <>
              <LinhaDado
                icone="home_work"
                rotulo="Bairros"
                valor={<span className={classes.quebra}>{juntarNomes(alerta.bairros)}</span>}
              />
              {subs.length > 0 && (
                <LinhaDado
                  icone="account_balance"
                  rotulo="Subprefeituras"
                  valor={<span className={classes.quebra}>{juntarNomes(subs)}</span>}
                />
              )}
            </>
          )}
        </SecaoCard>

        {alerta.pontosApoio && (
          <SecaoCard titulo="Pontos de apoio">
            <PontosApoio pontos={alerta.pontosApoio} />
          </SecaoCard>
        )}

        {alerta.atualizacoes && (
          <SecaoCard titulo="Atualizações">
            <AtualizacoesAlerta
              atualizacoes={alerta.atualizacoes}
              orgao={alerta.orgao}
              icone={alerta.icone}
            />
          </SecaoCard>
        )}

        <BarraAlerta alerta={alerta} caminho={caminho} />
      </div>

      <ParaOndeIr
        destinos={[
          {
            icone: 'warning',
            titulo: 'Alertas da cidade de São Paulo',
            meta: `${contar(alertasDoLugar(ALERTAS).ativos.length, 'ativo', 'ativos')} agora`,
            para: '/minha-cidade/alertas',
          },
          {
            icone: 'home_pin',
            titulo: `Alertas ${doLugar(bairro)}`,
            meta: `${contar(alertasDoLugar(ALERTAS, [bairro.nome]).ativos.length, 'ativo', 'ativos')} agora`,
            para: '/meu-bairro/alertas',
          },
        ]}
      />
    </Pagina>
  );
}
