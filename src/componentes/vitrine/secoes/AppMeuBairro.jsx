import { useState } from 'react';
import { Text } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import AlternarExemplos from '../AlternarExemplos';
import TituloCartao from '../../meuBairro/TituloCartao';
import CartaoColeta from '../../meuBairro/CartaoColeta';
import CartaoServicosReferencia from '../../meuBairro/CartaoServicosReferencia';
import CartaoAlertasRegiao from '../../meuBairro/CartaoAlertasRegiao';
import CartaoParticipe from '../../meuBairro/CartaoParticipe';
import SemDadosBairro from '../../meuBairro/SemDadosBairro';
import SeletorBairro from '../../meuBairro/SeletorBairro';
import SecaoPedidosBairro from '../../meuBairro/SecaoPedidosBairro';
import SecaoObrasBairro from '../../meuBairro/SecaoObrasBairro';
import { USUARIO } from '../../../dados/usuario';
import { PEDIDOS } from '../../../dados/pedidos';
import { buscarBairro } from '../../../logica/bairros';

const DADOS = buscarBairro(USUARIO.bairro);

// Cartões e seções da página Meu Bairro, com o bairro da Maria (Vila Mariana).
export default function AppMeuBairro() {
  const [bairro, setBairro] = useState('Pinheiros');

  return (
    <Subsecao id="app-meu-bairro" titulo="Meu Bairro">
      <Vitrine
        nome="SeletorBairro"
        arquivo="src/componentes/meuBairro/SeletorBairro.jsx"
        props="bairro · meuBairro · aoMudar (vendo outro bairro: link de voltar)"
        fundo="branco"
      >
        <SeletorBairro bairro={bairro} meuBairro={USUARIO.bairro} aoMudar={setBairro} />
      </Vitrine>

      <Vitrine
        nome="TituloCartao"
        arquivo="src/componentes/meuBairro/TituloCartao.jsx"
        props="id · icone · children (h2)"
        fundo="branco"
      >
        <TituloCartao id="vitrine-titulo-cartao" icone="local_shipping">
          Coleta de lixo
        </TituloCartao>
      </Vitrine>

      <Vitrine
        nome="CartaoColeta"
        arquivo="src/componentes/meuBairro/CartaoColeta.jsx"
        props="coleta { comum, horarioComum, seletiva }"
      >
        <CartaoColeta coleta={DADOS.coleta} />
      </Vitrine>

      <Vitrine
        nome="CartaoServicosReferencia"
        arquivo="src/componentes/meuBairro/CartaoServicosReferencia.jsx"
        props="dados { bairro, ubs, escola, cras }"
      >
        <CartaoServicosReferencia dados={DADOS} />
      </Vitrine>

      <Vitrine
        nome="CartaoAlertasRegiao"
        arquivo="src/componentes/meuBairro/CartaoAlertasRegiao.jsx"
        props="regiao (com alerta / sem alerta)"
      >
        <AlternarExemplos
          rotulo="Alertas da região"
          opcoes={[
            {
              valor: 'com',
              rotulo: 'Zona Sul (com alerta)',
              conteudo: <CartaoAlertasRegiao regiao="Zona Sul" />,
            },
            {
              valor: 'sem',
              rotulo: 'Centro (sem alerta)',
              conteudo: <CartaoAlertasRegiao regiao="Centro" />,
            },
          ]}
        />
      </Vitrine>

      <Vitrine
        nome="CartaoParticipe"
        arquivo="src/componentes/meuBairro/CartaoParticipe.jsx"
        props="regiao"
      >
        <AlternarExemplos
          rotulo="Mostrar o cartão Participe"
          opcoes={[
            {
              valor: 'fechado',
              rotulo: 'Esconder',
              conteudo: (
                <Text fz={14} c="var(--cor-texto-suave)">
                  Usa o mesmo id de título do cartão do Início (participe-titulo); por isso fica
                  escondido até você pedir.
                </Text>
              ),
            },
            {
              valor: 'aberto',
              rotulo: 'Mostrar',
              conteudo: <CartaoParticipe regiao={USUARIO.regiao} />,
            },
          ]}
        />
      </Vitrine>

      <Vitrine
        nome="SemDadosBairro"
        arquivo="src/componentes/meuBairro/SemDadosBairro.jsx"
        props="bairro (bairro que o app ainda não conhece)"
      >
        <SemDadosBairro bairro="Parelheiros" />
      </Vitrine>

      <Vitrine
        nome="SecaoPedidosBairro"
        arquivo="src/componentes/meuBairro/SecaoPedidosBairro.jsx"
        props="pedidos · bairro"
      >
        <SecaoPedidosBairro pedidos={PEDIDOS} bairro={USUARIO.bairro} />
      </Vitrine>

      <Vitrine
        nome="SecaoObrasBairro"
        arquivo="src/componentes/meuBairro/SecaoObrasBairro.jsx"
        props="bairro · regiao"
      >
        <SecaoObrasBairro bairro={USUARIO.bairro} regiao={USUARIO.regiao} />
      </Vitrine>
    </Subsecao>
  );
}
