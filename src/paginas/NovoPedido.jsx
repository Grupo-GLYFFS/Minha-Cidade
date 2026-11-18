import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Anchor, Group, Stack } from '@mantine/core';
import CabecalhoAntigo from '../componentes/CabecalhoAntigo';
import Icone from '../componentes/Icone';
import FormularioPedido from '../componentes/novoPedido/FormularioPedido';
import AvisoDuplicado from '../componentes/novoPedido/AvisoDuplicado';
import PedidoEnviado from '../componentes/novoPedido/PedidoEnviado';
import { usePedidos } from '../contexto/usePedidos';
import { buscarPedido } from '../logica/pedidos';
import { prepararDadosDoFormulario, valoresIniciaisComCategoria } from '../logica/novoPedido';
import { buscarDuplicado } from '../logica/duplicados';

// Novo pedido: formulário para a pessoa relatar um problema na rua ou no bairro.
// A tela tem três momentos: o formulário; o aviso de pedido repetido (quando já existe
// um igual aberto) e a confirmação de envio, com o protocolo.
export default function NovoPedido() {
  const { pedidos, adicionarPedido } = usePedidos();
  // Categoria já escolhida quando a pessoa vem de um serviço (?categoria=iluminacao)
  const [parametros] = useSearchParams();
  // { tipo: 'formulario' | 'duplicado' | 'enviado', valores?, idPedido? }
  const [etapa, setEtapa] = useState({ tipo: 'formulario' });

  // Recebe os valores já validados. Se houver pedido igual aberto, mostra o aviso;
  // senão, salva o pedido e mostra a confirmação.
  function enviar(valores) {
    const dados = prepararDadosDoFormulario(valores);
    const duplicado = buscarDuplicado(dados, pedidos);
    if (duplicado) {
      setEtapa({ tipo: 'duplicado', valores, idPedido: duplicado.id });
      return;
    }
    const novo = adicionarPedido(dados);
    setEtapa({ tipo: 'enviado', idPedido: novo.id });
  }

  // O pedido vem sempre da lista, para o status aparecer atualizado ao vivo
  const pedidoDaEtapa = etapa.idPedido ? buscarPedido(pedidos, etapa.idPedido) : null;

  if (etapa.tipo === 'enviado' && pedidoDaEtapa) {
    return (
      <Stack gap="lg" maw={720}>
        <PedidoEnviado pedido={pedidoDaEtapa} />
      </Stack>
    );
  }

  return (
    <Stack gap="lg" maw={720}>
      <div>
        <Anchor
          component={Link}
          to="/minha-cidade/pedidos"
          fw={600}
          fz={14}
          c="var(--cor-link)"
          display="inline-flex"
          mih={44}
        >
          <Group gap={4} wrap="nowrap">
            <Icone nome="arrow_back" tamanho={20} />
            Voltar para pedidos
          </Group>
        </Anchor>
        <CabecalhoAntigo
          titulo="Abrir pedido"
          descricao="Conte o que precisa de conserto na sua rua. A prefeitura analisa e você acompanha cada etapa."
        />
      </div>

      {etapa.tipo === 'duplicado' && pedidoDaEtapa ? (
        <AvisoDuplicado
          existente={pedidoDaEtapa}
          aoEditar={() => setEtapa({ tipo: 'formulario', valores: etapa.valores })}
        />
      ) : (
        <FormularioPedido
          aoEnviar={enviar}
          valoresIniciais={
            etapa.valores ?? valoresIniciaisComCategoria(parametros.get('categoria'))
          }
        />
      )}
    </Stack>
  );
}
