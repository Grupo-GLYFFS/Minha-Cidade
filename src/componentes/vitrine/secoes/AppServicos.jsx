import { useState } from 'react';
import { SimpleGrid, Text } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import AlternarExemplos from '../AlternarExemplos';
import AppFormularioServico from './AppFormularioServico';
import AcaoServico from '../../servicos/AcaoServico';
import CampoBuscaServicos from '../../servicos/CampoBuscaServicos';
import CartaoCategoria from '../../servicos/CartaoCategoria';
import CartaoTelefones from '../../servicos/CartaoTelefones';
import FichaServico from '../../servicos/FichaServico';
import GradeCategorias from '../../servicos/GradeCategorias';
import ListaServicos from '../../servicos/ListaServicos';
import SemResultadosBusca from '../../servicos/SemResultadosBusca';
import SugestoesBusca from '../../servicos/SugestoesBusca';
import { SERVICOS } from '../../../dados/servicos';
import { CATEGORIAS_SERVICOS } from '../../../dados/categoriasServicos';
import { servicosDaCategoria } from '../../../logica/servicos';
import { umDeCada } from '../../../logica/vitrine';

// Um serviço de cada tipo: com formulário online, só informativo e com tela própria no app
const [COM_FORMULARIO, INFORMATIVO, PROPRIO] = umDeCada(SERVICOS, 'tipo', [
  'solicitacao',
  'informativo',
  'proprio',
]);

// Catálogo de serviços: busca, assuntos, itens de lista, ficha, telefones e ações.
export default function AppServicos() {
  const [texto, setTexto] = useState('');
  const [escolhida, setEscolhida] = useState('');

  return (
    <Subsecao id="app-servicos" titulo="Serviços">
      <Vitrine
        nome="CampoBuscaServicos + SugestoesBusca"
        arquivo="src/componentes/servicos/"
        props="id · valor · aoMudar · aoEnviar · comBotao · SugestoesBusca aoEscolher"
      >
        <CampoBuscaServicos
          id="vitrine-busca"
          valor={texto}
          aoMudar={setTexto}
          aoEnviar={() => {}}
          comBotao
        />
        <SugestoesBusca
          aoEscolher={(termo) => {
            setTexto(termo);
            setEscolhida(termo);
          }}
        />
        {escolhida && (
          <Text fz={13} c="var(--cor-texto-suave)" mt="sm">
            Sugestão escolhida: {escolhida}
          </Text>
        )}
      </Vitrine>

      <Vitrine
        nome="CartaoCategoria"
        arquivo="src/componentes/servicos/CartaoCategoria.jsx"
        props="categoria · quantidade (o cartão inteiro é link)"
      >
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
          {CATEGORIAS_SERVICOS.slice(0, 3).map((categoria) => (
            <CartaoCategoria
              key={categoria.id}
              categoria={categoria}
              quantidade={servicosDaCategoria(categoria.id).length}
            />
          ))}
        </SimpleGrid>
      </Vitrine>

      <Vitrine
        nome="GradeCategorias"
        arquivo="src/componentes/servicos/GradeCategorias.jsx"
        props="sem props (todos os assuntos)"
      >
        <GradeCategorias />
      </Vitrine>

      <Vitrine
        nome="ListaServicos + ItemServico"
        arquivo="src/componentes/servicos/"
        props="servicos · colunas · etiqueta do tipo (Online, Informação, No app)"
      >
        <ListaServicos servicos={[COM_FORMULARIO, INFORMATIVO, PROPRIO].filter(Boolean)} />
      </Vitrine>

      <Vitrine
        nome="SemResultadosBusca"
        arquivo="src/componentes/servicos/SemResultadosBusca.jsx"
        props="texto"
      >
        <SemResultadosBusca texto="segunda via de multa de avião" />
      </Vitrine>

      <Vitrine
        nome="AcaoServico"
        arquivo="src/componentes/servicos/AcaoServico.jsx"
        props="servico (com formulário / tela própria; informativo não mostra nada)"
      >
        <AlternarExemplos
          rotulo="Tipo de serviço"
          opcoes={[
            {
              valor: 'solicitacao',
              rotulo: 'Com formulário',
              conteudo: <AcaoServico servico={COM_FORMULARIO} />,
            },
            {
              valor: 'proprio',
              rotulo: 'Tela própria',
              conteudo: <AcaoServico servico={PROPRIO} />,
            },
          ]}
        />
      </Vitrine>

      <Vitrine
        nome="FichaServico + SecaoFicha"
        arquivo="src/componentes/servicos/FichaServico.jsx"
        props="info (prazo, custo, o que é, quem pode, documentos, como fazer, onde ir)"
      >
        <FichaServico info={COM_FORMULARIO.info} />
      </Vitrine>

      <Vitrine
        nome="CartaoTelefones"
        arquivo="src/componentes/servicos/CartaoTelefones.jsx"
        props="telefones (sem lista: Central 156)"
      >
        <CartaoTelefones telefones={COM_FORMULARIO.info.telefones} />
      </Vitrine>

      <AppFormularioServico servico={COM_FORMULARIO} />
    </Subsecao>
  );
}
