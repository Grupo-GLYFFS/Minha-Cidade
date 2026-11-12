import { useState } from 'react';
import { Box, SimpleGrid, Text } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import ContextoSimulado from '../ContextoSimulado';
import AlternarExemplos from '../AlternarExemplos';
import AmostraSobDemanda from '../AmostraSobDemanda';
import CartaoArea from '../../cidadeAberta/CartaoArea';
import CartaoProjeto from '../../cidadeAberta/CartaoProjeto';
import CabecalhoProjeto from '../../cidadeAberta/CabecalhoProjeto';
import DoisLados from '../../cidadeAberta/DoisLados';
import SobreProjeto from '../../cidadeAberta/SobreProjeto';
import FormularioVoto from '../../cidadeAberta/FormularioVoto';
import ResultadoVotacao from '../../cidadeAberta/ResultadoVotacao';
import BarraResultado from '../../cidadeAberta/BarraResultado';
import CartaoVotacao from '../../cidadeAberta/CartaoVotacao';
import AppObras from './AppObras';
import { AREAS_CIDADE_ABERTA } from '../../../dados/cidadeAberta';
import { PROJETOS } from '../../../dados/projetos';
import { calcularResultado, projetosEmVotacao, projetosEncerrados } from '../../../logica/votacao';

const ABERTO = projetosEmVotacao(PROJETOS)[0];
const ENCERRADO = projetosEncerrados(PROJETOS)[0];
const PLACAR = calcularResultado(ABERTO);

// Estados do cartão de votação da página do projeto
const ESTADOS_VOTACAO = [
  { valor: 'visitante', rotulo: 'Visitante', logado: false, projeto: ABERTO },
  { valor: 'votar', rotulo: 'Pode votar', projeto: ABERTO },
  { valor: 'votou', rotulo: 'Já votou', voto: 'nao', projeto: ABERTO },
  { valor: 'encerrada', rotulo: 'Encerrada', projeto: ENCERRADO },
];

// Cidade Aberta: áreas, projetos (aberto, com voto, encerrado), votação e obras.
// Votar aqui usa o voto simulado: o resultado muda só nesta caixa.
export default function AppCidadeAberta() {
  const [votoFormulario, setVotoFormulario] = useState(null);

  return (
    <Subsecao id="app-cidade-aberta" titulo="Cidade Aberta">
      <Vitrine
        nome="CartaoArea"
        arquivo="src/componentes/cidadeAberta/CartaoArea.jsx"
        props="area · destaque (o cartão inteiro é link)"
      >
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          {AREAS_CIDADE_ABERTA.slice(0, 2).map((area) => (
            <CartaoArea key={area.id} area={area} destaque="Texto de destaque" />
          ))}
        </SimpleGrid>
      </Vitrine>

      <Vitrine
        nome="CartaoProjeto"
        arquivo="src/componentes/cidadeAberta/CartaoProjeto.jsx + BarraResultado"
        props="projeto · nivelTitulo={4} (aberto sem voto / aberto com voto / encerrado)"
      >
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
          <ContextoSimulado>
            <CartaoProjeto projeto={ABERTO} nivelTitulo={4} />
          </ContextoSimulado>
          <ContextoSimulado voto="sim">
            <CartaoProjeto projeto={ABERTO} nivelTitulo={4} />
          </ContextoSimulado>
          <ContextoSimulado>
            <CartaoProjeto projeto={ENCERRADO} nivelTitulo={4} />
          </ContextoSimulado>
        </SimpleGrid>
      </Vitrine>

      <Vitrine
        nome="BarraResultado + ResultadoVotacao"
        arquivo="src/componentes/cidadeAberta/"
        props="resultado · voto (o texto traz os números; a barra é só desenho)"
        fundo="branco"
      >
        <BarraResultado resultado={PLACAR} voto="sim" />
        <Text fz={13} c="var(--cor-texto-suave)" my="md">
          ResultadoVotacao:
        </Text>
        <ResultadoVotacao resultado={PLACAR} voto="sim" />
      </Vitrine>

      <Vitrine
        nome="FormularioVoto"
        arquivo="src/componentes/cidadeAberta/FormularioVoto.jsx"
        props="aoConfirmar (aqui só mostra a escolha) · sem escolha mostra o erro"
        fundo="branco"
      >
        <FormularioVoto aoConfirmar={setVotoFormulario} />
        {votoFormulario && (
          <Text role="status" fz={14} fw={600} mt="sm">
            Voto simulado: {votoFormulario}. Nada foi salvo.
          </Text>
        )}
      </Vitrine>

      <Vitrine
        nome="CartaoVotacao"
        arquivo="src/componentes/cidadeAberta/CartaoVotacao.jsx"
        props="projeto (visitante / pode votar / já votou / encerrada)"
      >
        <AlternarExemplos
          rotulo="Estado da votação"
          opcoes={ESTADOS_VOTACAO.map((estado) => ({
            valor: estado.valor,
            rotulo: estado.rotulo,
            conteudo: (
              <ContextoSimulado logado={estado.logado ?? true} voto={estado.voto}>
                <CartaoVotacao projeto={estado.projeto} />
              </ContextoSimulado>
            ),
          }))}
        />
      </Vitrine>

      <Vitrine
        nome="DoisLados + SobreProjeto"
        arquivo="src/componentes/cidadeAberta/"
        props="projeto"
      >
        <DoisLados projeto={ABERTO} />
        <Box mt="md">
          <SobreProjeto projeto={ABERTO} />
        </Box>
      </Vitrine>

      <Vitrine
        nome="CabecalhoProjeto"
        arquivo="src/componentes/cidadeAberta/CabecalhoProjeto.jsx"
        props="projeto (topo da página do projeto)"
      >
        <AmostraSobDemanda aviso="Tem o título h1 da página do projeto, por isso só aparece quando você pede.">
          <CabecalhoProjeto projeto={ABERTO} />
        </AmostraSobDemanda>
      </Vitrine>

      <AppObras />
    </Subsecao>
  );
}
